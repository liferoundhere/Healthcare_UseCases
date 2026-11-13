/* Scene engine: turns the shared narrative (nodes, links, step states) into an animated floor plan.
   Each use case supplies only placement and decor; state, links, callouts, approvals, clocks, focus and camera are generic. */
let SUF = '', TT = 0;
const HOTS = { base: 1, list: [], add(id, x, y, w, h, info) { HOTS.list.push({ id, x, y, w, h, info }); } };
/* Hotspots are registered in page coordinates: the rectangle is mapped through the current canvas transform,
   so the scene scale and the camera are honoured. */
function HOT(id, x, y, w, h, info) {
  const m = ctx.getTransform(), b = HOTS.base || 1;
  HOTS.add(id + SUF, (m.a * x + m.e) / b, (m.d * y + m.f) / b, (m.a * w) / b, (m.d * h) / b, info);
}
const SCENE_R = [14, 44, 726, 494]; // scene region in scene units: x0, y0, x1, y1
const SCENE_PAD = [24, 30]; // extra room around SCENE_R inside the panel, so the camera push-in never crops content
const CAM_Z = 1.05;
const DIM_OUT = 0.24; // opacity of devices that are not part of the current step (the original used 0.46)
const SCENE_C = [(SCENE_R[0] + SCENE_R[2]) / 2, (SCENE_R[1] + SCENE_R[3]) / 2];

const SRCNAME = 'Healthcare infrastructure storyboard';
const DECOR_ZONES = {}; // decor id -> { zone id: label }, filled from the edition data so a reused floor plan keeps its zone names
const STATE_NAME = { ok: 'Healthy', warn: 'Warning', down: 'Down', pending: 'Waiting for approval', unknown: 'Unknown', idle: 'Idle', off: 'Off' };
const RANK = { down: 5, warn: 4, pending: 3, unknown: 2, ok: 1, idle: 0, off: 0 };
const sc = (s) => ({ ok: COL.run, warn: COL.warn, down: COL.stop, pending: COL.pending, unknown: COL.unknown, idle: COL.idle, off: COL.idle }[s] || COL.idle);
const worst = (list) => list.reduce((w, s) => ((RANK[s] || 0) > (RANK[w] || 0) ? s : w), 'ok');

/* ---------- state from the narrative ---------- */
const phaseSteps = (c, mode) => c.N.steps.filter((s) => s.phase === (mode === 'tobe' ? 'cisco' : 'today'));
const stateMemo = new Map();
function computeState(c, mode, i) {
  const key = `${c.id}|${mode}|${i}`;
  if (stateMemo.has(key)) return stateMemo.get(key);
  const N = c.N, steps = phaseSteps(c, mode);
  const vis = new Map(), ns = new Map(), ls = new Map(), labels = new Map();
  N.nodes.forEach((n) => { vis.set(n.id, !n.hidden); ns.set(n.id, 'ok'); });
  N.zones.forEach((z) => vis.set(z.id, !z.hidden));
  N.links.forEach((l) => ls.set(l.id, 'idle'));
  const today = N.steps.filter((s) => s.phase === 'today');
  if (mode === 'tobe') {
    // The With Cloud Control story replays the same event: whatever the first story revealed is already on the map.
    today.forEach((s) => { (s.show || []).forEach((id) => vis.set(id, true)); (s.hide || []).forEach((id) => vis.set(id, false)); });
    Object.entries(today[0].l || {}).forEach(([k, v]) => ls.set(k, v));
  }
  let callout = null, modal = null, clock = null, from = 0;
  for (let s = 0; s <= i && s < steps.length; s++) {
    const st = steps[s];
    Object.entries(st.n || {}).forEach(([k, v]) => ns.set(k, v));
    Object.entries(st.l || {}).forEach(([k, v]) => ls.set(k, v));
    Object.entries(st.label || {}).forEach(([k, v]) => labels.set(k, v));
    (st.show || []).forEach((id) => vis.set(id, true));
    (st.hide || []).forEach((id) => vis.set(id, false));
    if (st.clock) { clock = st.clock; from = s; }
  }
  const cur = steps[Math.min(i, steps.length - 1)];
  callout = cur.callout || null; modal = cur.modal || null;
  const out = { vis, ns, ls, labels, callout, modal, clock, clockFrom: from, step: cur };
  stateMemo.set(key, out);
  return out;
}

function ciscoNodes(c) {
  if (c._cn) return c._cn;
  const set = new Set();
  c.N.steps.filter((s) => s.phase === 'cisco').forEach((s) => (s.show || []).forEach((id) => set.add(id)));
  c.N.nodes.forEach((n) => { if (n.hidden && !c.N.steps.some((s) => s.phase === 'today' && (s.show || []).includes(n.id))) set.add(n.id); });
  c._cn = set;
  return set;
}
function ownerOf(c, n) {
  if (c.owners && c.owners[n.id]) return c.owners[n.id];
  if (ciscoNodes(c).has(n.id)) return 'cisco';
  if (n.icon === 'cloud' || n.icon === 'ambulance') return 'partner';
  if (n.icon === 'person' || n.icon === 'people' || n.icon === 'badge') return 'people';
  return 'hosp';
}

/* ---------- animation memory (colours, fades, focus and camera ease between steps) ---------- */
const ANIM = { key: '', nodes: new Map(), zones: new Map(), cam: null };
function animFor(map, id, ta, color, snap) {
  let a = map.get(id);
  if (!a) { a = { a: snap ? ta : 0, col: color, rv: 0, bump: 0, state: '', dim: 1, pk: 0 }; map.set(id, a); }
  return a;
}

/* ---------- scene context handed to each use case ---------- */
/* i is the step index inside the phase; su runs 0..1 once when the presenter enters the step and then stays at 1.
   Nothing in here advances a step: the player owns i. */
function makeScene(c, mode, i, su, t, app) {
  TT = t;
  const steps = phaseSteps(c, mode), n = steps.length;
  i = clamp(i, 0, n - 1); su = clamp(su, 0, 1);
  const u = (i + su) / n;
  const cur = computeState(c, mode, i), prev = i > 0 ? computeState(c, mode, i - 1) : null;
  const key = `${c.id}|${mode}`;
  const snap = ANIM.key !== key;
  if (snap) { ANIM.key = key; ANIM.nodes.clear(); ANIM.zones.clear(); ANIM.cam = null; }
  const dt = app.dt || 0, k = snap ? 1 : 1 - Math.exp(-Math.min(dt, 0.1) * 6), k2 = snap ? 1 : 1 - Math.exp(-Math.min(dt, 0.1) * 4.5);
  const S = { c, mode, W: mode === 'tobe', i, n, su, u, t, dt, cur, prev, step: steps[i], steps, app, N: c.N, lang: app.aud };
  S.pos = c.scene.pos;
  S.st = (id) => cur.ns.get(id) || 'ok';
  S.visT = (id) => (cur.vis.get(id) ? 1 : 0);
  S.alpha = (id) => { const a = ANIM.nodes.get(id) || ANIM.zones.get(id); return a ? a.a : S.visT(id); };
  S.changed = (id) => !prev || prev.ns.get(id) !== cur.ns.get(id) || (cur.labels.get(id) || '') !== (prev.labels.get(id) || '') || prev.vis.get(id) !== cur.vis.get(id);

  /* primary element: the thing this step is about. It grows, everything else steps back. */
  const co = cur.callout;
  let prim = co && S.pos[co.node] && cur.vis.get(co.node) ? co.node : null;
  if (!prim) {
    let best = -1;
    c.N.nodes.forEach((nd) => {
      if (!cur.vis.get(nd.id) || !S.pos[nd.id] || (prev && !S.changed(nd.id))) return;
      const r = RANK[S.st(nd.id)] || 0;
      if (!prev && r <= RANK.ok) return; // an opening step where everything is healthy shows the whole floor, nothing dimmed
      if (r > best) { best = r; prim = nd.id; }
    });
  }
  const focus = new Set();
  if (prim) {
    focus.add(prim);
    if (prev) c.N.nodes.forEach((nd) => { if (cur.vis.get(nd.id) && S.changed(nd.id)) focus.add(nd.id); });
    c.N.links.forEach((l) => { const st = cur.ls.get(l.id); if ((l.a === prim || l.b === prim) && st && st !== 'idle' && st !== 'off') { focus.add(l.a); focus.add(l.b); } });
  }
  S.prim = prim; S.focus = focus;

  c.N.nodes.forEach((nd) => {
    const a = animFor(ANIM.nodes, nd.id, S.visT(nd.id), sc(S.st(nd.id)), snap);
    const col = sc(S.st(nd.id));
    if (a.state && a.state !== S.st(nd.id) && a.a > 0.5) a.rv = 1;
    if (!snap && S.visT(nd.id) && a.a < 0.1) a.bump = 1;
    a.state = S.st(nd.id); a.a += (S.visT(nd.id) - a.a) * k; a.col = snap ? col : mix(a.col, col, k);
    a.rv = Math.max(0, a.rv - dt * 0.9); a.bump = Math.max(0, a.bump - dt * 1.4);
    a.dim += (((!prim || focus.has(nd.id)) ? 1 : DIM_OUT) - a.dim) * k2;
    a.pk += ((nd.id === prim ? 1 : 0) - a.pk) * k2;
  });
  c.N.zones.forEach((z) => { const a = animFor(ANIM.zones, z.id, S.visT(z.id), COL.idle, snap); a.a += (S.visT(z.id) - a.a) * k; });

  /* camera: a gentle push-in toward the primary element (clamped so the scene always fills its panel) */
  const cam = ANIM.cam || (ANIM.cam = { z: 1, px: 0, py: 0, vk: 0, fx: SCENE_C[0], fy: SCENE_C[1] });
  const pp = prim && S.pos[prim], tz = pp ? CAM_Z : 1, kc = snap ? 1 : 1 - Math.exp(-Math.min(dt, 0.1) * 2.2);
  /* the visible window is SCENE_R plus SCENE_PAD, sized so a centered CAM_Z push-in never crops content; no pan */
  const tpx = 0, tpy = 0;
  cam.z += (tz - cam.z) * kc; cam.px += (tpx - cam.px) * kc; cam.py += (tpy - cam.py) * kc; cam.vk += ((pp ? 1 : 0) - cam.vk) * kc;
  if (pp) { cam.fx += (pp[0] - cam.fx) * Math.min(1, kc * 1.6); cam.fy += (pp[1] - cam.fy) * Math.min(1, kc * 1.6); }

  /* zone: a named area. Floor tint follows the worst state among watched devices. */
  S.zone = (id, x, y, w, h, o = {}) => {
    const z = c.N.zones.find((q) => q.id === id), a = ANIM.zones.get(id) ? ANIM.zones.get(id).a : 1;
    // label: the use case's own zone, then scene.zoneLabels, then the label the floor plan was first drawn with
    // scene.labels (keyed by the zone id) overrides all of them, and can hide the label with null
    const zl = LBL(o.label != null ? o.label : (c.scene.zoneLabels && c.scene.zoneLabels[id]) || (z && z.label) || ((DECOR_ZONES[c.scene.decor] || {})[id]) || '', id);
    if (a < 0.02) return;
    ctx.save(); ctx.globalAlpha *= a;
    S.area(x, y, w, h, zl, Object.assign({}, o, { id, resolved: true }));
    ctx.restore();
  };
  /* state shading: red hatch when something inside is down, amber when warning, blue dashes while waiting for approval */
  S.shade = (x, y, w, h, watch, r = 10) => {
    const ws = watch && watch.length ? worst(watch.map((q) => S.st(q))) : 'ok';
    const pulse = 0.5 + 0.5 * Math.sin(t * 5);
    if (ws === 'down') {
      ctx.save(); D.rr(x, y, w, h, r); ctx.clip();
      ctx.fillStyle = tint(COL.pain, 0.05 + 0.02 * pulse); ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = tint(COL.pain, 0.09); ctx.lineWidth = 5;
      for (let q = -h; q < w; q += 16) { ctx.beginPath(); ctx.moveTo(x + q, y); ctx.lineTo(x + q + h, y + h); ctx.stroke(); }
      ctx.restore();
      D.box(x, y, w, h, { stroke: COL.pain, lw: 1.8, r, dash: [6, 4] });
    } else if (ws === 'warn') {
      D.box(x, y, w, h, { fill: tint(COL.warn, 0.08), stroke: tint(COL.warn, 0.9), lw: 1.8, r, dash: [6, 4] });
    } else if (ws === 'pending') {
      D.box(x, y, w, h, { fill: tint(COL.cisco, 0.05), stroke: tint(COL.cisco, 0.7), lw: 1.6, r, dash: [3, 4] });
    }
  };
  S.area = (x, y, w, h, label, o = {}) => {
    D.box(x, y, w, h, { fill: o.fill || T.floor, stroke: o.stroke || T.wall, lw: o.lw || 1.8, r: o.r ?? 10, shadow: o.shadow ?? 0, dash: o.dash });
    if (!o.late) S.shade(x, y, w, h, o.watch, o.r ?? 10);
    if (!o.resolved) label = LBL(label, o.id);
    // the name of an area: drawn now, or after the area's dressing (o.deferText) so that no drawing covers it
    const drawName = (halo) => {
      const col = o.cisco ? COL.cisco : o.lc || T.sub;
      D.text(label.toUpperCase(), x + 10, y + 13, { size: 10, weight: 800, color: col, maxW: w - 16, halo });
      LABELS.push({ id: 'zone ' + (o.id || label), kind: 'zone', x: x + 10, y: y + 13 - fsz(10) / 2, w: D.measure(label.toUpperCase(), 10, 800), h: fsz(10) });
    };
    if (label && o.deferText) S.areaNames.set(o.id || label, { draw: () => drawName(3), a: ctx.globalAlpha });
    else if (label) drawName(0);
    if (o.id || o.info) HOT(o.id || label, x, y, w, h, o.info || { owner: o.cisco ? 'cisco' : 'hosp', tag: 'I', title: label || o.id, body: o.body || 'Illustrative layout. Shaded by the worst state among the devices inside it.', src: SRCNAME + ', ' + c.code });
  };
  S.areaNames = new Map();
  S.areaName = (id) => { const n = S.areaNames.get(id); if (!n) return; S.areaNames.delete(id); ctx.save(); ctx.globalAlpha = n.a; n.draw(); ctx.restore(); };
  S.room = (x, y, w, h, label, o = {}) => S.area(x, y, w, h, label, Object.assign({ fill: T.panel, r: 6, lw: 1.4 }, o));
  return S;
}

/* ---------- floor furniture (simple items; richer set dressing lives in 12-kit.js) ---------- */
const F = {
  bed(x, y, rot = 0, occ = true) { K.bed(x, y, { rot, patient: occ }); },
  desk(x, y, w = 40, h = 14, o = {}) { K.desk(x, y, w, h, o); },
  table(x, y, w, h, o = {}) { D.box(x - w / 2, y - h / 2, w, h, { fill: T.panel, stroke: T.wall, lw: 1.4, r: o.r ?? 8 }); },
  rackRow(x, y, n, o = {}) { K.rackRow(x, y, n, o); },
  tree(x, y, r = 8) { K.tree(x, y, r); },
  road(x, y, w, h) { K.road(x, y, w, h); },
  stairs(x, y, w, h) { D.box(x, y, w, h, { fill: T.panel, stroke: T.wall, lw: 1.4, r: 2 }); for (let k = 1; k < 8; k++) D.line([[x + 2, y + (h / 8) * k], [x + w - 2, y + (h / 8) * k]], { lw: 0.9, color: T.faint }); },
  car(x, y, ang, o = {}) { K.car(x, y, ang, o); },
  door(x, y, w, vertical) { D.line(vertical ? [[x, y], [x, y + w]] : [[x, y], [x + w, y]], { lw: 4, color: T.floor, cap: 'butt' }); },
  label(s, x, y, o = {}) { D.text(s, x, y, Object.assign({ size: 10, weight: 700, color: T.sub, halo: 3, align: 'center' }, o)); },
};

/* ---------- devices ---------- */
function deviceInfo(S, n) {
  const own = ownerOf(S.c, n), st = S.st(n.id);
  const sub = n.sub;
  const body = `${sub[S.lang]}. ${STATE_NAME[st] ? 'State in this step: ' + STATE_NAME[st].toLowerCase() + '.' : ''}`;
  return { owner: own, tag: own === 'cisco' ? 'S' : 'I', title: n.title, body, src: `${SRCNAME}, ${S.c.code}; placement is illustrative`, state: st };
}

function drawNode(S, n) {
  const p = S.pos[n.id]; if (!p) { MISSING.add(S.c.id + ': node "' + n.id + '" has no position'); return; }
  const an = ANIM.nodes.get(n.id); if (!an || an.a < 0.02) return;
  const [x, y, o = {}] = p, t = S.t, state = S.st(n.id), col = an.col, cisco = ciscoNodes(S.c).has(n.id);
  const pk = smooth(an.pk), dim = an.dim;
  const sz = (n.r || 30) / 30, a = smooth(an.a), grow = (0.78 + 0.22 * a) * (1 + 0.22 * Math.sin(an.bump * Math.PI)) * (o.s || 1) * (1 + 0.45 * pk);
  const R = 18 * sz, Rl = R * (1 + 0.45 * pk);
  ctx.save(); ctx.globalAlpha *= a * dim; ctx.translate(x, y); ctx.scale(grow, grow); ctx.translate(-x, -y);
  const pulse = 0.5 + 0.5 * Math.sin(t * (state === 'down' ? 6.5 : 3.5));
  if (pk > 0.02) {
    const fc = state === 'ok' ? (cisco ? COL.cisco : COL.run) : col;
    D.circle(x, y, R + 26 + pulse * 4, { fill: tint(fc, 0.10 * pk) });
    D.circle(x, y, R + 15 + pulse * 3, { fill: tint(fc, 0.13 * pk) });
    ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.8); D.circle(0, 0, R + 11, { stroke: tint(fc, 0.85 * pk), lw: 2.2, dash: [9, 7] }); ctx.restore();
  }
  if (state === 'warn' || state === 'down') {
    D.circle(x, y, R + 5 + pulse * 5, { fill: tint(col, 0.1 + 0.08 * pulse) });
    D.circle(x, y, R + 3 + pulse * 3, { stroke: tint(col, 0.55 * (0.5 + pulse * 0.5)), lw: 1.5 });
  }
  if (an.rv > 0) D.circle(x, y, R + (1 - an.rv) * 38, { stroke: tint(col, an.rv * 0.8), lw: 2.4 });
  if (cisco) D.box(x - R - 3, y - R + 1, (R + 3) * 2, (R - 1) * 2, { fill: T.panel, stroke: state === 'ok' ? COL.cisco : col, lw: 2.6, r: 9, shadow: 8 });
  else D.circle(x, y, R, { fill: state === 'down' ? tint(col, 0.14) : T.panel, stroke: col, lw: state === 'idle' || state === 'off' ? 1.8 : 3, shadow: 8, dash: state === 'unknown' ? [3, 3] : null });
  if (state === 'pending') { ctx.save(); ctx.translate(x, y); ctx.rotate(t * 1.4); D.circle(0, 0, R + 4, { stroke: COL.pending, lw: 2.2, dash: [5, 6] }); ctx.restore(); }
  const ic = state === 'ok' ? (cisco ? COL.cisco : T.ink) : state === 'idle' || state === 'off' ? COL.idle : state === 'pending' ? COL.cisco : col === COL.warn ? COL.amber : col;
  D.icon(n.icon, x, y, 20 * sz, ic);
  if (state === 'down') { D.circle(x + R * 0.8, y - R * 0.8, 7, { fill: COL.stop, stroke: T.panel, lw: 1.2 }); D.icon('cross', x + R * 0.8, y - R * 0.8, 8, '#fff'); }
  ctx.restore();

  HOT('n_' + n.id, x - Rl - 4, y - Rl - 4, (Rl + 4) * 2, (Rl + 4) * 2 + 22, deviceInfo(S, n));
  if (TEXTSTAT.mute) return;
  // label and caption (labels do not scale with the node, so they stay crisp). The side comes from layoutFor().
  const LY = layoutFor(S), side = LY.side.get(n.id) || o.lab || 'b';
  const g = labelGeom(S, n, side, pk);
  if (g.capR && LY.capDx.get(n.id)) g.capR.x += LY.capDx.get(n.id);
  // a device that is not part of this step gives up its label when the callout bubble needs the space
  if (LY.callout && n.id !== S.cur.callout.node && !S.focus.has(n.id) && (rOverlap(g.title, LY.callout, 3) > 0 || (g.capR && rOverlap(g.capR, LY.callout, 3) > 0))) return;
  ctx.save(); ctx.globalAlpha *= a * (0.55 + 0.45 * dim);
  D.text(n.title, g.tx, g.ly, { size: g.ts, weight: 800, color: T.ink, align: g.align, halo: 4, maxW: 200 });
  const vis = a * (0.55 + 0.45 * dim) > 0.5;
  if (vis) { LABELS.push(Object.assign({ id: n.id, kind: 'title' }, g.title)); LABELS.push({ id: n.id, kind: 'node', x: x - R, y: y - R, w: 2 * R, h: 2 * R }); }
  if (g.cap) {
    D.box(g.capR.x, g.capR.y, g.capR.w, g.capR.h, { fill: T.panel, stroke: tint(col, 0.9), lw: 1.4, r: g.capR.h / 2 });
    D.text(g.cap, g.capR.x + 7, g.capR.y + g.capR.h / 2 + 0.5, { size: g.cs, weight: 600, color: T.ink, maxW: 250 });
    if (vis) LABELS.push(Object.assign({ id: n.id, kind: 'caption' }, g.capR));
  }
  ctx.restore();
}

/* The caption under a device title: the step's own label, else the audience wording when the device changed or is in focus. */
function capOf(S, n, isPrim) {
  return S.cur.labels.get(n.id) || (S.changed(n.id) && S.i > 0 ? n.sub[S.lang] : '') || (S.i === 0 && S.cur.step.callout && S.cur.step.callout.node === n.id ? n.sub[S.lang] : '') || (isPrim ? n.sub[S.lang] : '');
}
/* Geometry of a device label on one side of the device: b (below), t (above), r (right), l (left). pk is 0..1, 1 when in focus. */
function labelGeom(S, n, side, pk) {
  const [x, y] = S.pos[n.id], R = 18 * ((n.r || 30) / 30), Rl = R * (1 + 0.45 * pk);
  const cap = capOf(S, n, pk > 0.5), ts = 11.5 + 2.2 * pk, cs = 10.2 + 0.8 * pk, th = fsz(ts);
  const tw = D.measure(n.title, ts, 800), ch = fsz(cs) + 8, cw = cap ? D.measure(cap, cs, 600) + 14 : 0, gap = th / 2 + ch / 2 + 3;
  const align = side === 'r' ? 'left' : side === 'l' ? 'right' : 'center';
  let tx = side === 'r' ? x + Rl + 9 : side === 'l' ? x - Rl - 9 : x;
  if (align === 'center') { const hw = Math.max(tw, cw) / 2 + 3; tx = clamp(tx, SCENE_R[0] - 8 + hw, SCENE_R[2] + 8 - hw); }
  const ty = side === 't' ? y - Rl - 6 - th / 2 : y + Rl + 7 + th / 2;
  const ly = side === 'r' || side === 'l' ? (cap ? y - gap / 2 : y) : ty;
  const title = { x: align === 'center' ? tx - tw / 2 : align === 'left' ? tx : tx - tw, y: ly - th / 2, w: tw, h: th };
  let capR = null;
  if (cap) {
    const cy = side === 't' ? ty - gap : ly + gap;
    let bx = align === 'center' ? tx - cw / 2 : align === 'left' ? tx : tx - cw;
    bx = clamp(bx, SCENE_R[0] - 10, SCENE_R[2] + 10 - cw);
    capR = { x: bx, y: cy - ch / 2, w: cw, h: ch };
  }
  return { tx, ly, align, ts, cs, cap, title, capR };
}

/* Automatic placement, worked out once per step, audience and scale:
   each device label goes on the side (below, above, right, left) where it covers the least, and the callout bubble
   goes where it covers no label and no device. A use case can still pin a side with pos: [x, y, { lab: 't' }]. */
const LAYOUTS = new Map();
const layoutKey = (S) => `${S.c.id}|${S.mode}|${S.i}|${S.lang}|${VIEWK.toFixed(3)}|${THEME}`;
const rOverlap = (a, b, m = 0) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + m) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + m);
const BOUNDS = () => ({ x0: SCENE_R[0] - SCENE_PAD[0] + 6, y0: SCENE_R[1] - SCENE_PAD[1] + 6, x1: SCENE_R[2] + SCENE_PAD[0] - 6, y1: SCENE_R[3] + SCENE_PAD[1] - 6 });
const outside = (r) => { const B = BOUNDS(); return Math.max(0, B.x0 - r.x) + Math.max(0, r.x + r.w - B.x1) + Math.max(0, B.y0 - r.y) + Math.max(0, r.y + r.h - B.y1); };
function layoutFor(S) {
  const key = layoutKey(S);
  if (LAYOUTS.has(key)) return LAYOUTS.get(key);
  if (LAYOUTS.size > 400) LAYOUTS.clear();
  const nodes = S.N.nodes.filter((n) => S.cur.vis.get(n.id) && S.pos[n.id]);
  const circ = nodes.map((n) => { const R = 18 * ((n.r || 30) / 30) * (n.id === S.prim ? 1.45 : 1) + 2; return { id: n.id, x: S.pos[n.id][0] - R, y: S.pos[n.id][1] - R, w: 2 * R, h: 2 * R }; });
  const zones = LABELS.filter((l) => l.kind === 'zone');
  const rooms = DECORLAB.list;
  const placed = [], side = new Map(), capDx = new Map();
  // the device in focus chooses first, then the devices that carry a caption, then the rest
  const order = nodes.slice().sort((a, b) => (b.id === S.prim) - (a.id === S.prim) || !!capOf(S, b, false) - !!capOf(S, a, false));
  order.forEach((n) => {
    const pin = (S.pos[n.id][2] || {}).lab, cands = pin ? [pin] : ['b', 't', 'r', 'l'];
    let best = null;
    cands.forEach((sd, k) => {
      const g = labelGeom(S, n, sd, n.id === S.prim ? 1 : 0), rects = [g.title].concat(g.capR ? [g.capR] : []);
      let cost = k * 2; // a mild preference for the earlier sides
      rects.forEach((r) => {
        circ.forEach((q) => { if (q.id !== n.id) cost += rOverlap(r, q, 2) * 3; });
        placed.forEach((q) => { cost += rOverlap(r, q, 3) * 4; });
        zones.forEach((q) => { cost += rOverlap(r, q, 2) * 2; });
        rooms.forEach((q) => { cost += rOverlap(r, q, 2) * 0.5; });
        cost += outside(r) * 400;
      });
      if (!best || cost < best.cost) best = { sd, cost, rects };
    });
    // a caption that still touches a neighbouring device slides sideways until it is clear
    const cr = best.rects[1];
    if (cr) {
      const B = BOUNDS(), others = circ.filter((q) => q.id !== n.id).concat(placed), bad = (r) => others.some((q) => rOverlap(r, q, 3) > 0);
      if (bad(cr)) {
        const tries = [];
        others.forEach((q) => { if (rOverlap(cr, q, 3) > 0) { tries.push(q.x - 4 - cr.w - cr.x); tries.push(q.x + q.w + 4 - cr.x); } });
        const okDx = tries.filter((dx) => Math.abs(dx) <= cr.w * 0.6 && cr.x + dx >= B.x0 && cr.x + dx + cr.w <= B.x1 && !bad(Object.assign({}, cr, { x: cr.x + dx }))).sort((p, q) => Math.abs(p) - Math.abs(q))[0];
        if (okDx != null) { cr.x += okDx; capDx.set(n.id, okDx); }
      }
    }
    side.set(n.id, best.sd); best.rects.forEach((r) => placed.push(Object.assign({ id: n.id }, r)));
  });
  // callout bubble: stacked under or over the device and its own label, or beside it; never on top of another label
  let callout = null; const co = S.cur.callout;
  if (co && S.pos[co.node] && S.cur.vis.get(co.node)) {
    const p = S.pos[co.node], size = 12.5, w = Math.min(300, D.measure(co.text, size, 600) + 24);
    const lh = fsz(size) + 4.5, h = D.lines(co.text, w - 22, size, 600) * lh + 15;
    const own = placed.filter((q) => q.id === co.node).concat(circ.filter((q) => q.id === co.node));
    const U = { x: Math.min(...own.map((q) => q.x)), y: Math.min(...own.map((q) => q.y)) }; U.w = Math.max(...own.map((q) => q.x + q.w)) - U.x; U.h = Math.max(...own.map((q) => q.y + q.h)) - U.y;
    const cx = p[0] - w / 2, cy = p[1] - h / 2, G = 16;
    const spots = [[cx, U.y - G - h], [cx, U.y + U.h + G], [U.x + U.w + G, cy], [U.x - G - w, cy], [U.x + U.w + G, U.y - G - h], [U.x - G - w, U.y - G - h], [U.x + U.w + G, U.y + U.h + G], [U.x - G - w, U.y + U.h + G], [cx, U.y - G - h - 60], [cx, U.y + U.h + G + 60], [U.x + U.w + G + 70, cy], [U.x - G - w - 70, cy]];
    spots.forEach((sp, k) => {
      const r = { x: clamp(sp[0], 18, 724 - w), y: clamp(sp[1], 48, SCENE_R[3] - 4 - h), w, h };
      let cost = k * 3 + (Math.abs(r.x - sp[0]) + Math.abs(r.y - sp[1])) * 0.5;
      // a bubble that hides another device, or cuts a zone name in half, reads as an error: both cost more than a long leader line
      circ.forEach((q) => { cost += rOverlap(r, q, 4) * (q.id === co.node ? 20 : 40); });
      placed.forEach((q) => { cost += rOverlap(r, q, 4) * (q.id === co.node ? 20 : 40); });
      zones.forEach((q) => { cost += rOverlap(r, q, 3) * 40; });
      if (S.mode === 'legacy' && !S.c.scene.noLegacyBand) cost += rOverlap(r, { x: CC_BAND[0], y: CC_BAND[1], w: CC_BAND[2], h: CC_BAND[3] }) * 2; // keep off the "one tool per team" band
      if (!callout || cost < callout.cost) callout = { x: r.x, y: r.y, w, h, lh, size, cost, U };
    });
  }
  // set-dressing labels (room names and the like) that a device label or the callout would sit on are left out
  const hide = new Set();
  DECORLAB.list.forEach((d) => { if (placed.some((q) => rOverlap(d, q, 2) > 0) || (callout && rOverlap(d, callout, 2) > 0)) hide.add(d.key); });
  // ... and so are the ones the focus ring of the device in focus would cut through
  const pp = S.prim && S.pos[S.prim] && S.cur.vis.get(S.prim) ? S.pos[S.prim] : null;
  if (pp) {
    const pn = S.N.nodes.find((n) => n.id === S.prim), rr = (18 * ((pn.r || 30) / 30) + 13) * 1.45;
    DECORLAB.list.forEach((d) => { const qx = clamp(pp[0], d.x, d.x + d.w), qy = clamp(pp[1], d.y, d.y + d.h); if (Math.hypot(qx - pp[0], qy - pp[1]) < rr) hide.add(d.key); });
  }
  const out = { side, callout, hide, capDx };
  LAYOUTS.set(key, out);
  return out;
}

/* ---------- links ---------- */
function drawLinks(S) {
  const t = S.t; LINKS.length = 0;
  S.N.links.forEach((l) => {
    const pa = S.pos[l.a], pb = S.pos[l.b]; if (!pa || !pb) return;
    const A = ANIM.nodes.get(l.a), B = ANIM.nodes.get(l.b); if (!A || !B) return;
    const va = Math.min(A.a, B.a); if (va < 0.05) return;
    const state = S.cur.ls.get(l.id) || 'idle'; if (state === 'off') return;
    const hot = S.prim && (l.a === S.prim || l.b === S.prim);
    const a = [pa[0], pa[1]], b = [pb[0], pb[1]];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const off = 24, sa = [a[0] + (dx / len) * off, a[1] + (dy / len) * off], sb = [b[0] - (dx / len) * off, b[1] - (dy / len) * off];
    // two devices on the band with a third between them: the link arcs over it, so it never runs behind a device
    let bend = l.bend || 0;
    if (pa[1] >= CC_BAND[1] && pb[1] >= CC_BAND[1]) {
      let need = 0;
      S.N.nodes.forEach((n) => {
        const p = S.pos[n.id]; if (!p || n.id === l.a || n.id === l.b || p[1] < CC_BAND[1]) return;
        const u = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (len * len); if (u <= 0.04 || u >= 0.96) return;
        if (Math.abs((p[0] - a[0]) * dy - (p[1] - a[1]) * dx) / len < 30) need = Math.max(need, 38 / (1.2 * u * (1 - u) * Math.max(40, len - 2 * 24)));
      });
      const up = dx >= 0 ? -1 : 1; // the sign that bows the line toward the top of the band
      if (need && bend * up < need) bend = up * Math.min(0.7, need);
    }
    const path = curve(sa, sb, bend), col = sc(state);
    if (va > 0.5) LINKS.push({ id: l.id, a: l.a, b: l.b, pts: path.pts });
    ctx.save(); ctx.globalAlpha *= va * Math.max(A.dim, B.dim);
    if (state === 'idle' || state === 'unknown') {
      D.line(path.pts, { lw: 1.6, color: tint(state === 'unknown' ? COL.unknown : COL.idle, 0.6), dash: [3, 4] });
    } else if (state === 'down') {
      D.line(path.pts, { lw: 2.4, color: tint(COL.stop, 0.5), dash: [4, 4] });
      const half = Path(path.pts.slice(0, Math.ceil(path.pts.length * 0.48)));
      if (half.L > 4) D.flow(half, t, { color: COL.stop, n: 1, speed: 50, r: 3.2 });
      const m = path.atU(0.5); D.circle(m.x, m.y, 9, { fill: T.panel, stroke: COL.stop, lw: 1.5 }); D.icon('cross', m.x, m.y, 10, COL.stop);
    } else {
      if (hot) D.line(path.pts, { lw: 7, color: tint(col, 0.14) });
      const speed = state === 'warn' ? 30 : state === 'pending' ? 40 : 75;
      D.flow(path, t + l.a.length * 0.17, { color: col, n: Math.max(1, Math.round(path.L / 100)), speed, r: hot ? 4 : 3.3, lw: hot ? 2.6 : 2 });
    }
    ctx.restore();
  });
}

/* ---------- spotlight veil: softens the floor plan everywhere except around the primary element ---------- */
function drawVeil(S) {
  const cam = ANIM.cam; if (!cam || cam.vk < 0.02 || !S.prim) return;
  const g = ctx.createRadialGradient(cam.fx, cam.fy, 50, cam.fx, cam.fy, 250);
  g.addColorStop(0, tint(T.panel, 0)); g.addColorStop(0.4, tint(T.panel, 0.06 * cam.vk)); g.addColorStop(1, tint(T.panel, 0.46 * cam.vk));
  ctx.fillStyle = g; ctx.fillRect(SCENE_R[0] - 120, SCENE_R[1] - 80, SCENE_R[2] - SCENE_R[0] + 240, SCENE_R[3] - SCENE_R[1] + 160);
}

/* ---------- overlays: callout bubble, approval card, clock ---------- */
function drawCallout(S) {
  const co = S.cur.callout; if (!co) return;
  const p = S.pos[co.node], an = ANIM.nodes.get(co.node); if (!p || !an || an.a < 0.5) return;
  const k = smooth(ph(S.su, 0.05, 0.3)); if (k <= 0) return;
  const L = layoutFor(S).callout; if (!L) return;
  const col = sc(S.st(co.node)), { x: bx, y: by, w, h } = L;
  CALLOUT.rect = { x: bx, y: by, w, h, node: co.node };
  // leader line: from the bubble toward the device, stopping where it meets the device or its own label
  const U = L.U, ex = clamp(p[0], bx + 12, bx + w - 12), ey = clamp(p[1], by, by + h);
  let q = 0; const inU = (t) => { const X = ex + (p[0] - ex) * t, Y = ey + (p[1] - ey) * t; return X >= U.x - 2 && X <= U.x + U.w + 2 && Y >= U.y - 2 && Y <= U.y + U.h + 2; };
  while (q < 1 && !inU(q)) q += 0.02;
  ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 6);
  if (q > 0.02) D.line([[ex, ey], [ex + (p[0] - ex) * q, ey + (p[1] - ey) * q]], { lw: 1.8, color: col === COL.warn ? COL.amber : col });
  D.box(bx, by, w, h, { fill: T.panel, stroke: col === COL.warn ? COL.amber : col, lw: 2, r: 9, shadow: 8 });
  D.wrap(co.text, bx + 12, by + 8 + L.lh / 2, w - 22, L.lh, { size: L.size, weight: 600, color: T.ink });
  ctx.restore();
}

function drawClock(S) {
  const ck = S.cur.clock; if (!ck || ck.mode === 'hide') return;
  // a running clock gains ten simulated minutes per step; a stopped clock holds still. `value` ("h:mm", as in
  // "00:12" for twelve minutes) sets what a stopped clock shows. The display is minutes and seconds.
  const fixed = ck.mode !== 'run' && /^\d+:\d\d$/.test(ck.value || '') ? ck.value.split(':').reduce((h, m) => +h * 60 + +m) * 60 : null;
  const base = fixed != null ? fixed : ck.mode === 'run' ? (S.i - S.cur.clockFrom + S.su) * 600 : 600;
  const sec = Math.floor(base) % 3600, txt = `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
  const w = D.measure(ck.label, 11, 700) + D.measure(txt + ' sim', 11.5, 700) + 52, y = 20, x = SCENE_R[2] + 14 - w;
  const col = ck.mode === 'run' ? COL.pain : COL.run;
  D.box(x, y, w, 25, { fill: T.panel, stroke: col, lw: 1.6, r: 12.5, shadow: 6 });
  D.icon('clock', x + 15, y + 12.5, 13, col);
  D.text(ck.label, x + 29, y + 13, { size: 11, weight: 700, color: T.ink });
  D.text(txt + ' sim', x + w - 10, y + 13, { size: 11.5, weight: 700, color: col, align: 'right' });
  HOT('clock', x, y, w, 25, { owner: 'pain', tag: 'I', title: ck.label, body: 'A simulated clock for illustration. No duration is claimed; benchmarks such as mean time to innocence have no published healthcare value.', src: `${SRCNAME}, ${S.c.code}` });
}

/* Cloud Control band: the floating Cisco plane, drawn along the bottom of the scene when 'cc' is shown. */
/* The band is tall enough for a device on the row y = 418 with its title and caption, also when it is the device in
   focus (drawn 45% larger), so nothing a band device says crosses the band's border. */
const CC_BAND = [20, 372, 700, 116];
function drawCCBand(S) {
  if (!S.N.zones.some((z) => z.id === 'cc')) return;
  const a = ANIM.zones.get('cc'); if (!a || a.a < 0.02) return;
  const [x, y, w, h] = CC_BAND;
  ctx.save(); ctx.globalAlpha *= a.a;
  D.box(x, y, w, h, { fill: tint(COL.cisco, 0.08), stroke: COL.cisco, lw: 1.9, r: 12, dash: [8, 5] });
  // a soft sheen sweeping across the control plane
  ctx.save(); D.rr(x, y, w, h, 12); ctx.clip();
  const sx = x + mod(S.t * 70, w + 160) - 80, g = ctx.createLinearGradient(sx - 60, 0, sx + 60, 0);
  g.addColorStop(0, tint(COL.cisco, 0)); g.addColorStop(0.5, tint(COL.cisco, 0.1)); g.addColorStop(1, tint(COL.cisco, 0));
  ctx.fillStyle = g; ctx.fillRect(x, y, w, h); ctx.restore();
  // the band's name sits on its top border, like a tab, so links that arc between band devices never run through it
  const bn = 'CISCO CLOUD CONTROL (MODELED)', bw = D.measure(bn, 10, 800), bh = fsz(10) + 6;
  D.box(x + 14, y - bh / 2, bw + 16, bh, { fill: T.panel, stroke: COL.cisco, lw: 1.4, r: bh / 2 });
  D.text(bn, x + 22, y + 0.5, { size: 10, weight: 800, color: COL.cisco });
  if (a.a > 0.5) LABELS.push({ id: 'zone cc', kind: 'zone', x: x + 14, y: y - bh / 2, w: bw + 16, h: bh });
  D.icon('cloud', x + w - 18, y + 13, 14, COL.cisco);
  ctx.restore();
  HOT('cc', x, y, w, h, { owner: 'cisco', tag: 'S', title: 'Cisco Cloud Control (modeled)', body: S.c.chips.map((q) => `${q[0]}: ${q[1]}`).join('<br>') || 'One place to see, correlate and act, with a person approving changes that touch care.', src: `${SRCNAME}, ${S.c.code}; availability per the research brief` });
}

/* Legacy counterpart of the Cloud Control band: the separate tools that never share a view. */
function drawLegacyBand(S) {
  const [x, y, w, h] = CC_BAND, L = S.c.legacy.silos;
  D.box(x, y, w, h, { fill: tint(COL.pain, 0.03), stroke: tint(COL.pain, 0.5), lw: 1.6, r: 12, dash: [3, 5] });
  D.text('TODAY: ONE TOOL PER TEAM, NO SHARED VIEW [H]', x + 12, y + 13, { size: 10, weight: 800, color: COL.pain });
  const pw = (w - 24 - 16) / 3, ph2 = 36;
  L.forEach((s, i) => {
    const px = x + 12 + (i % 3) * (pw + 8), py = y + 28 + Math.floor(i / 3) * (ph2 + 8);
    D.box(px, py, pw, ph2, { fill: T.panel, stroke: T.line2, lw: 1.3, r: 8 });
    D.icon(s[3] || 'server', px + 15, py + ph2 / 2, 13, s[2] === 'p' ? COL.partner : COL.idle);
    D.text(s[0], px + 31, py + ph2 / 2 + 0.5, { size: 11, weight: 600, color: T.ink, maxW: pw - 36 });
    D.line([[px + pw + 1, py + ph2 / 2], [px + pw + 7, py + ph2 / 2]], { lw: 1.3, color: T.faint, dash: [2, 2] });
    HOT('silo' + i, px, py, pw, ph2, { owner: s[2] === 'p' ? 'partner' : 'pain', tag: 'H', title: s[0], body: `${s[1]}<br><i>Which tools a given hospital runs is not public; this is a hypothesis to confirm in discovery.</i>`, src: `${SRCNAME}, ${S.c.code} [H]` });
  });
  HOT('legacyband', x, y, w, h, { owner: 'pain', tag: 'H', title: 'Separate tools today', body: L.map((s) => `${s[0]}: ${s[1]}`).join('<br>') + '<br><i>Current tools at a given hospital are not public; items here are hypotheses to confirm in discovery.</i>', src: `${SRCNAME}, ${S.c.code}` });
}

/* One call draws a whole use case scene (decor, links, devices, overlays). The approval is not drawn here:
   it is a real button in the presenter card. Returns the scene context. */
function drawUCScene(c, mode, i, su, t, app) {
  const S = makeScene(c, mode, i, su, t, app), cam = ANIM.cam;
  LABELS.length = 0; CALLOUT.rect = null; DECORLAB.list.length = 0;
  const known = LAYOUTS.get(layoutKey(S)); DECORLAB.hide = known ? known.hide : new Set();
  ctx.save();
  ctx.translate(SCENE_C[0] + cam.px, SCENE_C[1] + cam.py); ctx.scale(cam.z, cam.z); ctx.translate(-SCENE_C[0], -SCENE_C[1]);
  setDecorOverrides(c.scene);
  DECOR[c.scene.decor](S);
  unusedOverrides().forEach((m) => MISSING.add(`${c.id}: ${m} matches nothing in the floor plan "${c.scene.decor}"`));
  if (mode === 'legacy' && !c.scene.noLegacyBand) drawLegacyBand(S);
  drawCCBand(S);
  drawVeil(S);
  drawLinks(S);
  S.N.nodes.filter((n) => n.id !== S.prim).forEach((n) => drawNode(S, n));
  const pn = S.N.nodes.find((n) => n.id === S.prim); if (pn) drawNode(S, pn);
  drawCallout(S);
  ctx.restore();
  drawClock(S);
  return S;
}

/* Layout audit, read by tools/check.cjs: label boxes that collide, and labels or callouts that leave the scene. */
const LABELS = [], LINKS = [], CALLOUT = { rect: null }, MISSING = new Set();
function auditLabels(S) {
  const out = [], hit = (a, b, m) => a.x < b.x + b.w - m && b.x < a.x + a.w - m && a.y < b.y + b.h - m && b.y < a.y + a.h - m;
  const fixed = LABELS.filter((l) => l.kind === 'zone').concat(DECORLAB.list);
  const L = LABELS.filter((l) => l.kind !== 'zone');
  L.forEach((a) => { if (a.kind !== 'node') fixed.forEach((b) => { if (hit(a, b, 2.5)) out.push(`${S.c.id}: ${a.kind} of "${a.id}" overlaps the ${b.kind} label "${b.id}"`); }); });
  for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
    const a = L[i], b = L[j]; if (a.id === b.id || (a.kind === 'node' && b.kind === 'node')) continue;
    if (hit(a, b, 2.5)) out.push(`${S.c.id}: ${a.kind} of "${a.id}" overlaps ${b.kind} of "${b.id}"`);
  }
  L.concat(CALLOUT.rect ? [Object.assign({ id: 'callout', kind: 'callout' }, CALLOUT.rect)] : []).forEach((l) => {
    if (l.x < SCENE_R[0] - SCENE_PAD[0] + 2 || l.x + l.w > SCENE_R[2] + SCENE_PAD[0] - 2 || l.y < SCENE_R[1] - SCENE_PAD[1] + 2 || l.y + l.h > SCENE_R[3] + SCENE_PAD[1] - 2) out.push(`${S.c.id}: ${l.kind} of "${l.id}" leaves the scene`);
  });
  if (CALLOUT.rect) L.forEach((l) => { if (l.kind !== 'node' && l.id !== CALLOUT.rect.node && hit(l, CALLOUT.rect, 2.5)) out.push(`${S.c.id}: callout covers ${l.kind} of "${l.id}"`); });
  if (CALLOUT.rect) {
    LABELS.filter((l) => l.kind === 'zone').forEach((z) => { if (hit(z, CALLOUT.rect, 2.5)) out.push(`${S.c.id}: callout covers the zone name "${z.id}"`); });
    S.N.nodes.forEach((n) => {
      const p = S.pos[n.id]; if (!p || n.id === CALLOUT.rect.node || !S.cur.vis.get(n.id)) return;
      const R = 18 * ((n.r || 30) / 30) * 0.7, c = CALLOUT.rect;
      if (p[0] + R > c.x && p[0] - R < c.x + c.w && p[1] + R > c.y && p[1] - R < c.y + c.h) out.push(`${S.c.id}: callout hides the device "${n.id}"`);
    });
  }
  // a link must not run behind a device on the band: the devices there sit in one row, so a straight link between two of them hides behind a third
  const segD = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], u = clamp(((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1), 0, 1); return Math.hypot(p[0] - a[0] - dx * u, p[1] - a[1] - dy * u); };
  S.N.nodes.forEach((n) => {
    const p = S.pos[n.id]; if (!p || p[1] < CC_BAND[1] || !S.cur.vis.get(n.id)) return;
    const R = 18 * ((n.r || 30) / 30) * (n.id === S.prim ? 1.45 : 1) + 1;
    LINKS.forEach((l) => { if (l.a === n.id || l.b === n.id) return; for (let k = 1; k < l.pts.length; k++) if (segD(p, l.pts[k - 1], l.pts[k]) < R) { out.push(`${S.c.id}: link "${l.id}" passes behind "${n.id}" on the band`); break; } });
  });
  return out;
}
