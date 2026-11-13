/* Scene engine: turns the shared narrative (nodes, links, step states) into an animated floor plan.
   Each use case supplies only placement and decor; state, links, callouts, approvals, clocks, focus and camera are generic. */
let SUF = '', TT = 0;
/* Hotspots are registered in page coordinates: the rectangle is mapped through the current canvas transform,
   so the scene scale and the camera are honoured. */
function HOT(id, x, y, w, h, info) {
  const m = ctx.getTransform(), b = APP.base || 1;
  APP.hot(id + SUF, (m.a * x + m.e) / b, (m.d * y + m.f) / b, (m.a * w) / b, (m.d * h) / b, info);
}
const SCENE_R = [14, 44, 726, 468]; // scene region in scene units: x0, y0, x1, y1
const SCENE_PAD = [24, 30]; // extra room around SCENE_R inside the panel, so the camera push-in never crops content
const CAM_Z = 1.07;
const SCENE_C = [(SCENE_R[0] + SCENE_R[2]) / 2, (SCENE_R[1] + SCENE_R[3]) / 2];

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
function makeScene(c, mode, u, t, app) {
  TT = t;
  const steps = phaseSteps(c, mode), n = steps.length;
  const i = Math.min(n - 1, Math.floor(u * n)), su = clamp(u * n - i, 0, 1);
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
      const r = RANK[S.st(nd.id)] || 0; if (r > best) { best = r; prim = nd.id; }
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
    a.dim += (((!prim || focus.has(nd.id)) ? 1 : 0.46) - a.dim) * k2;
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
    if (a < 0.02) return;
    ctx.save(); ctx.globalAlpha *= a;
    S.area(x, y, w, h, o.label || (z && z.label), Object.assign({}, o, { id }));
    ctx.restore();
  };
  /* state shading: red hatch when something inside is down, amber when warning, blue dashes while waiting for approval */
  S.shade = (x, y, w, h, watch, r = 10) => {
    const ws = watch && watch.length ? worst(watch.map((q) => S.st(q))) : 'ok';
    const pulse = 0.5 + 0.5 * Math.sin(t * 5);
    if (ws === 'down') {
      ctx.save(); D.rr(x, y, w, h, r); ctx.clip();
      ctx.fillStyle = tint(COL.pain, 0.06 + 0.03 * pulse); ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = tint(COL.pain, 0.14); ctx.lineWidth = 5;
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
    if (label) {
      const col = o.cisco ? COL.cisco : o.lc || T.sub;
      D.text(label.toUpperCase(), x + 10, y + 13, { size: 10, weight: 800, color: col, maxW: w - 16 });
    }
    if (o.id || o.info) HOT(o.id || label, x, y, w, h, o.info || { owner: o.cisco ? 'cisco' : 'hosp', tag: 'I', title: label || o.id, body: o.body || 'Illustrative layout. Shaded by the worst state among the devices inside it.', src: 'Storyboard ' + c.id });
  };
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
  const body = `${sub[S.lang]}. ${STATE_NAME[st] ? 'State in this step: ' + STATE_NAME[st].toLowerCase() + '.' : ''}<br><i>Executive: ${sub.exec}. IT director: ${sub.dir}. Engineering: ${sub.eng}.</i>`;
  return { owner: own, tag: own === 'cisco' ? 'S' : 'I', title: n.title, body, src: `Storyboard ${S.c.id}; placement is illustrative`, state: st };
}

function drawNode(S, n) {
  const p = S.pos[n.id]; if (!p) return;
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

  // label and caption (labels do not scale with the node, so they stay crisp)
  const side = o.lab || 'b';
  const cap = S.cur.labels.get(n.id) || (S.changed(n.id) && S.i > 0 ? n.sub[S.lang] : '') || (S.i === 0 && S.cur.step.callout && S.cur.step.callout.node === n.id ? n.sub[S.lang] : '') || (pk > 0.5 ? n.sub[S.lang] : '');
  ctx.save(); ctx.globalAlpha *= a * (0.55 + 0.45 * dim);
  const ts = 11.5 + 2.2 * pk, cs = 10.2 + 0.8 * pk;
  const ty = side === 't' ? y - Rl - 12 : y + Rl + 13;
  const align = side === 'r' ? 'left' : side === 'l' ? 'right' : 'center';
  let tx = side === 'r' ? x + Rl + 9 : side === 'l' ? x - Rl - 9 : x;
  if (align === 'center') { // keep centered labels inside the scene window
    const hw = Math.max(Math.min(190, D.measure(n.title, ts, 800)), cap ? D.measure(cap, cs, 600) + 14 : 0) / 2 + 3;
    tx = clamp(tx, SCENE_R[0] + hw, SCENE_R[2] - hw);
  }
  const ly = side === 'r' || side === 'l' ? y - 5 : ty;
  D.text(n.title, tx, ly, { size: ts, weight: 800, color: T.ink, align, halo: 4, maxW: 190 });
  if (cap) {
    const w = D.measure(cap, cs, 600) + 14, cy = side === 'r' || side === 'l' ? y + 12 : side === 't' ? ty - 16 : ty + 17;
    const bx = align === 'center' ? tx - w / 2 : align === 'left' ? tx : tx - w;
    D.box(bx, cy - 9, w, 18, { fill: T.panel, stroke: tint(col, 0.9), lw: 1.4, r: 9 });
    D.text(cap, bx + 7, cy + 0.5, { size: cs, weight: 600, color: T.ink, maxW: 230 });
  }
  ctx.restore();
  HOT('n_' + n.id, x - Rl - 4, y - Rl - 4, (Rl + 4) * 2, (Rl + 4) * 2 + 22, deviceInfo(S, n));
}

/* ---------- links ---------- */
function drawLinks(S) {
  const t = S.t;
  S.N.links.forEach((l) => {
    const pa = S.pos[l.a], pb = S.pos[l.b]; if (!pa || !pb) return;
    const A = ANIM.nodes.get(l.a), B = ANIM.nodes.get(l.b); if (!A || !B) return;
    const va = Math.min(A.a, B.a); if (va < 0.05) return;
    const state = S.cur.ls.get(l.id) || 'idle'; if (state === 'off') return;
    const hot = S.prim && (l.a === S.prim || l.b === S.prim);
    const a = [pa[0], pa[1]], b = [pb[0], pb[1]];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const off = 24, sa = [a[0] + (dx / len) * off, a[1] + (dy / len) * off], sb = [b[0] - (dx / len) * off, b[1] - (dy / len) * off];
    const path = curve(sa, sb, l.bend || 0), col = sc(state);
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
  g.addColorStop(0, tint(T.panel, 0)); g.addColorStop(0.45, tint(T.panel, 0.05 * cam.vk)); g.addColorStop(1, tint(T.panel, 0.34 * cam.vk));
  ctx.fillStyle = g; ctx.fillRect(SCENE_R[0] - 120, SCENE_R[1] - 80, SCENE_R[2] - SCENE_R[0] + 240, SCENE_R[3] - SCENE_R[1] + 160);
}

/* ---------- overlays: callout bubble, approval card, clock ---------- */
function drawCallout(S) {
  const co = S.cur.callout; if (!co) return;
  const p = S.pos[co.node], an = ANIM.nodes.get(co.node); if (!p || !an || an.a < 0.5) return;
  const k = smooth(ph(S.su, 0.05, 0.3)); if (k <= 0) return;
  const size = 12, maxW = 290, w = Math.min(maxW, D.measure(co.text, size, 600) + 22);
  const n = D.lines(co.text, w - 22, size, 600), lh = size + 4, h = n * lh + 14;
  const col = sc(S.st(co.node)), cb = (p[2] && p[2].cb) || [0, 0];
  let bx = clamp(p[0] - w / 2 + cb[0], 20, 722 - w), by = p[1] - 62 - h + cb[1];
  if (by < 50) by = p[1] + 66;
  ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 6);
  D.line([[clamp(p[0], bx + 14, bx + w - 14), by + (by > p[1] ? 0 : h)], [p[0], p[1] + (by > p[1] ? 26 : -26)]], { lw: 1.8, color: col });
  D.box(bx, by, w, h, { fill: T.panel, stroke: col === COL.warn ? COL.amber : col, lw: 2, r: 9, shadow: 8 });
  D.wrap(co.text, bx + 11, by + 8 + lh / 2, w - 22, lh, { size, weight: 600, color: T.ink });
  ctx.restore();
}

function drawModal(S) {
  const m = S.cur.modal; if (!m) return;
  const k = smooth(ph(S.su, 0.04, 0.22)); if (k <= 0) return;
  const pos = S.c.scene.modalPos || [330, 210], w = S.c.scene.modalW || 326, lh = 14.5, fs = 11.5;
  let h = 54; const lines = m.lines.map((l) => D.split(l, w - 36, fs, 500)); lines.forEach((ls) => { h += ls.length * lh + 3; }); h += 36;
  const x = pos[0], y = pos[1], done = S.su > 0.58;
  ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 8);
  D.box(x, y, w, h, { fill: T.panel, stroke: COL.cisco, lw: 2.2, r: 10, shadow: 16 });
  D.box(x, y, w, 28, { fill: tint(COL.cisco, 0.12), r: 10 }); D.box(x, y + 22, w, 8, { fill: tint(COL.cisco, 0.12), r: 0 });
  D.icon('person', x + 16, y + 14, 14, COL.cisco);
  fitText(m.title, x + 32, y + 14.5, w - 150, 12.5, { weight: 700 });
  D.pill('SIMULATED', x + w - 12, y + 14, COL.partner, { size: 8.5, align: 'right' });
  let yy = y + 46;
  m.lines.forEach((l, i) => { D.wrap(l, x + 18, yy, w - 36, lh, { size: fs, weight: i === 0 ? 600 : 500, color: i === 0 ? T.ink : T.sub }); yy += lines[i].length * lh + 3; });
  const by = y + h - 25;
  D.box(x + 16, by - 10, 120, 24, { fill: done ? COL.run : COL.cisco, r: 12, shadow: 3 });
  D.icon(done ? 'check' : 'person', x + 32, by + 2, 11, '#fff');
  D.text(done ? 'Approved' : m.button, x + 46, by + 2.5, { size: 11.5, weight: 700, color: '#fff' });
  D.text(done ? 'Recorded in the audit log' : 'A named person decides', x + 148, by + 2.5, { size: 10.5, weight: 600, color: done ? COL.run : T.sub, maxW: w - 160 });
  if (!done) { const q = mod(S.t * 1.2, 1); D.box(x + 14 - q * 6, by - 12 - q * 6, 124 + q * 12, 28 + q * 12, { stroke: tint(COL.cisco, 0.5 * (1 - q)), lw: 1.4, r: 18 }); }
  ctx.restore();
  HOT('modal', x, y, w, h, { owner: 'cisco', tag: 'S', title: m.title, body: m.lines.join('<br>') + '<br><i>The approval is simulated here. In the product a named person approves before anything executes.</i>', src: `Storyboard ${S.c.id}` });
}

function drawClock(S) {
  const ck = S.cur.clock; if (!ck || ck.mode === 'hide') return;
  const base = (S.i - S.cur.clockFrom + (ck.mode === 'run' ? S.su : 1)) * 600;
  const sec = Math.floor(base) % 3600, txt = `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
  const w = D.measure(ck.label, 11, 700) + 112, y = 47, x = SCENE_R[2] - 8 - w;
  const col = ck.mode === 'run' ? COL.pain : COL.run;
  D.box(x, y, w, 25, { fill: T.panel, stroke: col, lw: 1.6, r: 12.5, shadow: 6 });
  D.icon('clock', x + 15, y + 12.5, 13, col);
  D.text(ck.label, x + 29, y + 13, { size: 11, weight: 700, color: T.ink });
  D.text(txt + ' sim', x + w - 10, y + 13, { size: 11.5, weight: 700, color: col, align: 'right' });
  HOT('clock', x, y, w, 25, { owner: 'pain', tag: 'I', title: ck.label, body: 'A simulated clock for illustration. No duration is claimed; benchmarks such as mean time to innocence have no published healthcare value.', src: `Storyboard ${S.c.id}` });
}

/* Cloud Control band: the floating Cisco plane, drawn along the bottom of the scene when 'cc' is shown. */
const CC_BAND = [20, 372, 700, 90];
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
  D.text('CISCO CLOUD CONTROL (MODELED)', x + 12, y + 13, { size: 10, weight: 800, color: COL.cisco });
  D.icon('cloud', x + w - 18, y + 13, 14, COL.cisco);
  ctx.restore();
  HOT('cc', x, y, w, h, { owner: 'cisco', tag: 'S', title: 'Cisco Cloud Control (modeled)', body: S.c.chips.map((q) => `${q[0]}: ${q[1]}`).join('<br>') || 'One place to see, correlate and act, with a person approving changes that touch care.', src: `Storyboard ${S.c.id}; availability per the research brief` });
}

/* Legacy counterpart of the Cloud Control band: the separate tools that never share a view. */
function drawLegacyBand(S) {
  const [x, y, w, h] = CC_BAND, L = S.c.legacy.silos;
  D.box(x, y, w, h, { fill: tint(COL.pain, 0.03), stroke: tint(COL.pain, 0.5), lw: 1.6, r: 12, dash: [3, 5] });
  D.text('TODAY: ONE TOOL PER TEAM, NO SHARED VIEW [H]', x + 12, y + 13, { size: 10, weight: 800, color: COL.pain });
  const pw = (w - 24 - 16) / 3, ph2 = 28;
  L.forEach((s, i) => {
    const px = x + 12 + (i % 3) * (pw + 8), py = y + 27 + Math.floor(i / 3) * (ph2 + 6);
    D.box(px, py, pw, ph2, { fill: T.panel, stroke: T.line2, lw: 1.3, r: 8 });
    D.icon(s[3] || 'server', px + 15, py + ph2 / 2, 13, s[2] === 'p' ? COL.partner : COL.idle);
    D.text(s[0], px + 31, py + ph2 / 2 + 0.5, { size: 11, weight: 600, color: T.ink, maxW: pw - 38 });
    D.line([[px + pw + 1, py + ph2 / 2], [px + pw + 7, py + ph2 / 2]], { lw: 1.3, color: T.faint, dash: [2, 2] });
    HOT('silo' + i, px, py, pw, ph2, { owner: s[2] === 'p' ? 'partner' : 'pain', tag: 'H', title: s[0], body: `${s[1]}<br><i>Which tools a given hospital runs is not public; this is a hypothesis to confirm in discovery.</i>`, src: `Storyboard ${S.c.id} [H]` });
  });
  HOT('legacyband', x, y, w, h, { owner: 'pain', tag: 'H', title: 'Separate tools today', body: L.map((s) => `${s[0]}: ${s[1]}`).join('<br>') + '<br><i>Current tools at a given hospital are not public; items here are hypotheses to confirm in discovery.</i>', src: `Storyboard ${S.c.id}` });
}

/* One call draws a whole use case scene (decor, links, devices, overlays). */
function drawUCScene(c, mode, u, t, app) {
  const S = makeScene(c, mode, u, t, app), cam = ANIM.cam;
  ctx.save();
  ctx.translate(SCENE_C[0] + cam.px, SCENE_C[1] + cam.py); ctx.scale(cam.z, cam.z); ctx.translate(-SCENE_C[0], -SCENE_C[1]);
  c.scene.decor(S);
  if (mode === 'legacy' && !c.scene.noLegacyBand) drawLegacyBand(S);
  drawCCBand(S);
  drawVeil(S);
  drawLinks(S);
  c.scene.extra && c.scene.extra(S, 'under');
  S.N.nodes.filter((n) => n.id !== S.prim).forEach((n) => drawNode(S, n));
  const pn = S.N.nodes.find((n) => n.id === S.prim); if (pn) drawNode(S, pn);
  c.scene.extra && c.scene.extra(S, 'over');
  drawCallout(S);
  ctx.restore();
  drawClock(S); drawModal(S);
  return S;
}
