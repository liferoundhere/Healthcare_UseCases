/* Core: themes, math helpers, and the Canvas 2D drawing kit (D). No dependencies. */
const THEMES = {
  light: {
    t: { bg: '#fbfcfd', panel: '#ffffff', panel2: '#fafbfc', line: '#d5dbe0', line2: '#e6eaed', ink: '#1d2327', sub: '#5F6B73', faint: '#9aa6ae', floor: '#f4f6f8', wall: '#b9c4cc', rack: '#e3e8ec', green: '#eef5e6', shadow: 'rgba(20,30,40,.13)', halo: 'rgba(255,255,255,.92)', invert: '#ffffff' },
    c: { hosp: '#1B4F8A', cisco: '#049FD9', pain: '#C62828', people: '#00897B', data: '#F2A900', partner: '#8a959c', run: '#2E9E5B', warn: '#F5C518', stop: '#C62828', idle: '#9AA6AE', unknown: '#8a959c', pending: '#049FD9', amber: '#a07a00' },
  },
  dark: {
    t: { bg: '#050e1d', panel: '#0a1b33', panel2: '#0d2240', line: '#244a76', line2: '#1a3556', ink: '#e8f1fb', sub: '#9fb3c8', faint: '#5f7a99', floor: '#0b1f3a', wall: '#3a6290', rack: '#16355b', green: '#0f2f2a', shadow: 'rgba(0,0,0,.45)', halo: 'rgba(5,14,29,.9)', invert: '#050e1d' },
    c: { hosp: '#6aa6e8', cisco: '#2fc2f5', pain: '#ff6b64', people: '#2fc9b4', data: '#fbab18', partner: '#7f93ab', run: '#5ccf84', warn: '#ffd24a', stop: '#ff6b64', idle: '#5f7a99', unknown: '#7f93ab', pending: '#2fc2f5', amber: '#ffd24a' },
  },
};
const T = {}, COL = {};
let THEME = 'light';
function setTheme(name) {
  THEME = THEMES[name] ? name : 'light';
  Object.assign(T, THEMES[THEME].t); Object.assign(COL, THEMES[THEME].c);
  document.documentElement.dataset.theme = THEME;
}
setTheme('light');

const OWNER = {
  hosp: ['Hospital systems and teams', () => COL.hosp],
  cisco: ['Cisco technology (With Cloud Control, modeled)', () => COL.cisco],
  pain: ['Gap or pain point today', () => COL.pain],
  people: ['Clinicians, staff and patients', () => COL.people],
  partner: ['Vendor or outside party, stays in place', () => COL.partner],
  data: ['Data and event flow', () => COL.data],
};
const ownerColor = (k) => (OWNER[k] || OWNER.hosp)[1]();
const TAGTXT = {
  S: 'Sourced: public source cited in the research briefs',
  H: 'Hypothesis: to validate with the customer',
  I: 'Illustrative: simulated layout, values and timings',
};
const FONT = 'Inter, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
let ctx = null;
const OVERFLOW = [];
/* Legibility floor. VIEWK is the number of screen pixels per scene unit (set by the player every frame).
   Any canvas text that would render under MIN_PX on screen is raised to MIN_PX; a label marked { drop: true }
   that no longer fits its maxW is left out instead of shrunk. TEXTSTAT.min records the smallest size drawn. */
let VIEWK = 1;
const MIN_PX = 12;
const DECORLAB = { list: [], hide: new Set() };
const TEXTSTAT = { min: 99, dropped: [], mute: false }; // mute: draw no text at all (library thumbnails)
const fsz = (size) => Math.max(size, MIN_PX / VIEWK);

/* Per-use-case overrides for a reused floor plan: scene.labels renames or hides the text the plan draws,
   scene.hide removes dressing that belongs to the plan's original story.
     scene.labels: { 'Room 412': 'Operating room 1', 'War room': null, floor: 'Perioperative floor' }
     scene.hide:   ['cloud', 'ambulance']
   A label key is the text the plan draws (any letter case) or a zone id; null or '' hides the label.
   Every label a plan draws goes through LBL() and every optional piece of dressing through HID(), so the build
   can list what a plan offers (DECOR_OV.seen) and reject an override that matches nothing. */
const DECOR_OV = { labels: new Map(), hide: new Set(), texts: new Set(), used: new Set(), seen: null };
const ovKey = (s) => String(s == null ? '' : s).trim().replace(/\s+/g, ' ').toLowerCase();
function setDecorOverrides(scene) {
  DECOR_OV.labels = new Map(Object.entries((scene && scene.labels) || {}).map(([k, v]) => [ovKey(k), v == null ? '' : String(v)]));
  DECOR_OV.hide = new Set((scene && scene.hide) || []);
  DECOR_OV.texts = new Set(); DECOR_OV.labels.forEach((v) => { if (v) { DECOR_OV.texts.add(v); DECOR_OV.texts.add(v.toUpperCase()); } });
  DECOR_OV.used = new Set();
}
/* The text to draw for a floor plan label: the use case's override if it has one, else the plan's own text. '' means draw nothing. */
function LBL(text, id) {
  const keys = [id, text].filter((k) => k != null && k !== '').map(ovKey);
  if (DECOR_OV.seen) keys.forEach((k) => DECOR_OV.seen.labels.add(k));
  for (const k of keys) if (DECOR_OV.labels.has(k)) { DECOR_OV.used.add('label ' + k); return DECOR_OV.labels.get(k); }
  return text || '';
}
/* True when the use case hides this piece of dressing. */
function HID(id) {
  if (DECOR_OV.seen) DECOR_OV.seen.hide.add(id);
  if (DECOR_OV.hide.has(id)) { DECOR_OV.used.add('hide ' + id); return true; }
  return false;
}
/* Overrides that matched nothing in the plan that was just drawn (the build reports the same thing earlier). */
function unusedOverrides() {
  const out = [];
  DECOR_OV.labels.forEach((v, k) => { if (!DECOR_OV.used.has('label ' + k)) out.push(`scene.labels "${k}"`); });
  DECOR_OV.hide.forEach((k) => { if (!DECOR_OV.used.has('hide ' + k)) out.push(`scene.hide "${k}"`); });
  return out;
}

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, u) => a + (b - a) * u;
const smooth = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); };
const mod = (a, n) => ((a % n) + n) % n;
const ph = (u, a, b) => clamp((u - a) / (b - a), 0, 1);
const rnd = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
function tint(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
function mix(h1, h2, u) {
  const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16);
  const c = (s) => Math.round(lerp((a >> s) & 255, (b >> s) & 255, u));
  return '#' + [16, 8, 0].map((s) => c(s).toString(16).padStart(2, '0')).join('');
}

function Path(pts) {
  const segs = []; let L = 0;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    const l = Math.hypot(x1 - x0, y1 - y0);
    segs.push({ x0, y0, dx: x1 - x0, dy: y1 - y0, l, s0: L, a: Math.atan2(y1 - y0, x1 - x0) });
    L += l;
  }
  return {
    pts, segs, L,
    at(s) {
      if (!segs.length) return { x: pts[0][0], y: pts[0][1], a: 0 };
      if (s <= 0) { const g = segs[0]; return { x: g.x0, y: g.y0, a: g.a }; }
      if (s >= L) { const g = segs[segs.length - 1]; return { x: g.x0 + g.dx, y: g.y0 + g.dy, a: g.a }; }
      let lo = 0, hi = segs.length - 1;
      while (lo < hi) { const m = (lo + hi + 1) >> 1; if (segs[m].s0 <= s) lo = m; else hi = m - 1; }
      const g = segs[lo], u = g.l ? (s - g.s0) / g.l : 0;
      return { x: g.x0 + g.dx * u, y: g.y0 + g.dy * u, a: g.a };
    },
    atU(u) { return this.at(clamp(u, 0, 1) * L); },
  };
}
// A smooth path through two points with a sideways bow, sampled into a polyline.
function curve(a, b, bend = 0, n = 18) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend * len * 0.6, cy = my + (dx / len) * bend * len * 0.6;
  const pts = [];
  for (let i = 0; i <= n; i++) { const u = i / n, v = 1 - u; pts.push([v * v * a[0] + 2 * v * u * cx + u * u * b[0], v * v * a[1] + 2 * v * u * cy + u * u * b[1]]); }
  return Path(pts);
}

const PEOPLE = {
  nurse: { body: '#1aa39a', trim: '#e6fffb', hair: '#4a3426', cap: null },
  doc: { body: '#f4f7fa', trim: '#1B4F8A', hair: '#2c2c2c', badgeColor: '#1B4F8A' },
  patient: { body: '#cfe3f5', trim: '#9bbcdc', hair: '#8c8c8c', badge: false },
  vendor: { body: '#e8841a', trim: '#fff36b', hair: '#5a3a1a', skin: '#e2b08a' },
  it: { body: '#37424d', trim: '#049FD9', hair: '#1e1e1e', skin: '#d9a982' },
  visitor: { body: '#8b6fb3', trim: '#d9c8f0', hair: '#6b4a2a', badge: false },
};
const D = {
  rr(x, y, w, h, r = 6) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); },
  box(x, y, w, h, o = {}) {
    ctx.save();
    if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    if (o.shadow) { ctx.shadowColor = T.shadow; ctx.shadowBlur = o.shadow; ctx.shadowOffsetY = o.shadow / 3; }
    D.rr(x, y, w, h, o.r ?? 6);
    if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); }
    ctx.shadowColor = 'transparent';
    if (o.stroke) { ctx.lineWidth = o.lw || 1.2; ctx.strokeStyle = o.stroke; if (o.dash) ctx.setLineDash(o.dash); ctx.stroke(); }
    ctx.restore();
  },
  circle(x, y, r, o = {}) {
    ctx.save();
    if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    if (o.shadow) { ctx.shadowColor = T.shadow; ctx.shadowBlur = o.shadow; ctx.shadowOffsetY = o.shadow / 3; }
    ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, Math.PI * 2);
    if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); }
    ctx.shadowColor = 'transparent';
    if (o.stroke) { ctx.lineWidth = o.lw || 1.2; ctx.strokeStyle = o.stroke; if (o.dash) ctx.setLineDash(o.dash); ctx.stroke(); }
    ctx.restore();
  },
  line(pts, o = {}) {
    ctx.save();
    if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.lineWidth = o.lw || 1.5; ctx.strokeStyle = o.color || T.line;
    ctx.lineCap = o.cap || 'round'; ctx.lineJoin = 'round';
    if (o.dash) { ctx.setLineDash(o.dash); ctx.lineDashOffset = o.offset || 0; }
    ctx.stroke(); ctx.restore();
  },
  text(s, x, y, o = {}) {
    if (TEXTSTAT.mute) return;
    ctx.save();
    if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    const size = fsz(o.size || 12);
    ctx.font = `${o.italic ? 'italic ' : ''}${o.weight || 500} ${size}px ${FONT}`;
    ctx.fillStyle = o.color || T.ink; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle';
    if (o.maxW && ctx.measureText(s).width > o.maxW + 0.5) {
      // a plan's own label that does not fit is left out; a label a use case asked for must fit, so it is reported
      if (o.drop) { TEXTSTAT.dropped.push(s); if (DECOR_OV.texts.has(s)) OVERFLOW.push(s); ctx.restore(); return; }
      OVERFLOW.push(s);
    }
    if (o.drop) { // a set-dressing label: it gives way when a device label or the callout needs its place
      const key = s + '@' + Math.round(x) + ',' + Math.round(y);
      if (DECORLAB.hide.has(key)) { ctx.restore(); return; }
      const w = ctx.measureText(s).width, al = o.align || 'left';
      DECORLAB.list.push({ key, id: s, kind: 'room label', x: al === 'center' ? x - w / 2 : al === 'right' ? x - w : x, y: y - size / 2, w, h: size });
    }
    if (size * VIEWK < TEXTSTAT.min) TEXTSTAT.min = size * VIEWK;
    if (o.halo) { ctx.lineWidth = o.halo; ctx.strokeStyle = o.haloColor || T.halo; ctx.lineJoin = 'round'; ctx.strokeText(s, x, y); }
    ctx.fillText(s, x, y); ctx.restore();
  },
  measure(s, size = 12, weight = 500) { ctx.save(); ctx.font = `${weight} ${fsz(size)}px ${FONT}`; const w = ctx.measureText(s).width; ctx.restore(); return w; },
  wrap(s, x, y, maxW, lh, o = {}) {
    const lines = D.split(s, maxW, o.size || 12, o.weight || 500); lh = Math.max(lh, fsz(o.size || 12) * 1.25);
    const max = o.maxLines || 99;
    if (lines.length > max) OVERFLOW.push(s);
    lines.slice(0, max).forEach((l, i) => D.text(l, x, y + i * lh, o));
    return Math.min(lines.length, max);
  },
  split(s, maxW, size, weight) {
    const words = String(s).split(' '); let line = ''; const lines = [];
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (D.measure(test, size, weight) > maxW && line) { lines.push(line); line = w; } else line = test;
    }
    if (line) lines.push(line);
    return lines;
  },
  lines(s, maxW, size, weight) { return D.split(s, maxW, size, weight).length; },
  tag(x, y, kind) {
    const r = Math.max(7, fsz(9) * 0.8);
    if (kind === 'S') { D.circle(x, y, r, { fill: T.ink }); D.text('S', x, y + 0.5, { size: 9, weight: 700, color: T.invert, align: 'center' }); }
    else if (kind === 'H') { D.circle(x, y, r, { fill: COL.cisco }); D.text('H', x, y + 0.5, { size: 9, weight: 700, color: '#fff', align: 'center' }); }
    else { D.circle(x, y, r, { fill: T.panel, stroke: COL.partner, lw: 1.3, dash: [2, 2] }); D.text('i', x, y + 0.5, { size: 10, weight: 700, color: T.sub, align: 'center', italic: true }); }
  },
  pill(s, x, y, color, o = {}) {
    if (TEXTSTAT.mute) return 0;
    const size = fsz(o.size || 11), w = D.measure(s, size, 700) + 14, h = size + 8;
    if (o.maxW && w > o.maxW) OVERFLOW.push(s);
    const x0 = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
    D.box(x0, y - h / 2, w, h, { fill: color, r: h / 2, alpha: o.alpha });
    D.text(s, x0 + 7, y + 0.5, { size, weight: 700, color: o.textColor || '#fff', alpha: o.alpha });
    return w;
  },
  glow(x, y, r, color, a = 1) {
    D.circle(x, y, r * 2.4, { fill: tint(color, 0.18 * a) });
    D.circle(x, y, r, { fill: color, alpha: a, stroke: T.panel, lw: 1.2 });
  },
  // Dashed trail plus travelling packets along a Path.
  flow(path, t, o = {}) {
    const color = o.color || COL.data, a = o.alpha ?? 1;
    D.line(path.pts, { lw: o.lw || 1.6, color: tint(color, 0.55 * a), dash: [4, 5], offset: -t * 12 });
    const n = o.n || 2, speed = o.speed || 120;
    for (let i = 0; i < n; i++) {
      const s = mod(t * speed + (i * path.L) / n + (o.phase || 0) * path.L, path.L);
      const p = path.at(s); D.glow(p.x, p.y, o.r || 3.4, color, a);
    }
  },
  /* A top-down figure with shoulders, swinging arms, feet, hair and a lanyard. ang = facing direction.
     o.kind: nurse | doc | patient | vendor | it | visitor. o.swing in -1..1 animates a walk; o.seat hides the feet. */
  person(x, y, ang, color, o = {}) {
    const K = PEOPLE[o.kind] || {}, body = K.body || color || '#1aa39a', trim = o.vestColor || K.trim, hair = K.hair || '#3b2a20', skin = o.skin || K.skin || '#f1d3b8';
    const sw = o.swing || 0, sc = (o.s || 1) * 1.6;
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(sc, sc);
    if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    const ell = (cx, cy, rx, ry, fill, stroke, lw) => { ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 0.8; ctx.stroke(); } };
    ell(0.6, 1.6, 7.2, 10.2, 'rgba(0,0,0,.15)');
    if (!o.seat) { ell(-sw * 5.2 + 0.5, -3.3, 3.4, 1.9, '#2b2f33'); ell(sw * 5.2 + 0.5, 3.3, 3.4, 1.9, '#2b2f33'); }
    const arm = (sy, a) => { ctx.beginPath(); ctx.moveTo(0, sy * 6.4); ctx.lineTo(a * 5.4, sy * 9.6); ctx.lineCap = 'round'; ctx.lineWidth = 3.3; ctx.strokeStyle = body; ctx.stroke(); ctx.lineWidth = 3.3; ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.globalAlpha *= 0.5; ctx.stroke(); ctx.globalAlpha /= 0.5; ell(a * 5.4 + 0.6, sy * 10, 1.7, 1.7, skin); };
    arm(-1, sw); arm(1, -sw);
    ell(0, 0, 4.6, 8.1, body, 'rgba(0,0,0,.3)', 0.8);
    if (trim) { ctx.beginPath(); ctx.moveTo(1.6, -4.4); ctx.lineTo(3.2, 0); ctx.lineTo(1.6, 4.4); ctx.strokeStyle = trim; ctx.lineWidth = 1.3; ctx.stroke(); }
    if (K.badge !== false) { ctx.fillStyle = '#ffffff'; ctx.fillRect(2.6, -1.1, 2.2, 2.4); ctx.fillStyle = K.badgeColor || COL.cisco; ctx.fillRect(2.6, -1.1, 2.2, 0.8); }
    ell(0.4, 0, 4.5, 4.5, skin, 'rgba(0,0,0,.3)', 0.7);
    ctx.beginPath(); ctx.arc(0.4, 0, 4.6, Math.PI * 0.5, Math.PI * 1.5); ctx.closePath(); ctx.fillStyle = hair; ctx.fill();
    if (K.cap) { ctx.beginPath(); ctx.arc(0.4, 0, 4.7, Math.PI * 0.58, Math.PI * 1.42); ctx.strokeStyle = K.cap; ctx.lineWidth = 1.4; ctx.stroke(); }
    ctx.restore();
    if (o.dev) D.circle(x + 8, y - 8, 3.2, { fill: o.dev, stroke: T.panel, lw: 1 });
    if (o.label) D.text(o.label, x + (o.lx || 0), y + (o.ly || 19), { size: 10, weight: 700, color: o.lc || T.sub, align: o.la || 'center', halo: 3 });
  },  // Stroke icons on a 32 by 32 grid centred on 0,0 (ported from the 2D storyboard app).
  icon(name, x, y, s = 14, color) {
    color = color || T.ink;
    ctx.save(); ctx.translate(x, y); ctx.scale(s / 28, s / 28);
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2.1; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ICONS(name);
    ctx.restore();
  },
};

/* Icon paths. */
function ICONS(kind) {
  const c = ctx;
  const R = (x, y, w, h, r) => { c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); };
  const O = (x, y, r) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, Math.PI * 2); };
  const L = (a, b, d, e) => { c.moveTo(a, b); c.lineTo(d, e); };
  const P = (dx, s) => { O(dx, -6 * s, 5 * s); c.moveTo(dx - 10 * s, 12 * s); c.quadraticCurveTo(dx - 10 * s, 1 * s, dx, 1 * s); c.quadraticCurveTo(dx + 10 * s, 1 * s, dx + 10 * s, 12 * s); };
  c.beginPath();
  switch (kind) {
    case 'check': c.moveTo(-9, 0); c.lineTo(-3, 6); c.lineTo(9, -7); break;
    case 'cross': L(-7, -7, 7, 7); L(7, -7, -7, 7); break;
    case 'pump': R(-9, -11, 16, 20, 3); R(-6, -7, 10, 6, 1); L(-3, 3, 1, 3); L(12, -15, 12, 14); L(7, -2, 12, -2); break;
    case 'monitor': R(-13, -10, 26, 17, 2); L(0, 7, 0, 12); L(-6, 12, 6, 12); c.moveTo(-9, -1); c.lineTo(-4, -1); c.lineTo(-2, -6); c.lineTo(1, 4); c.lineTo(3, -1); c.lineTo(9, -1); break;
    case 'server': R(-11, -12, 22, 7, 1.5); R(-11, -3.5, 22, 7, 1.5); R(-11, 5, 22, 7, 1.5); O(7, -8.5, 1); O(7, 0, 1); O(7, 8.5, 1); break;
    case 'database': c.ellipse(0, -8, 11, 4, 0, 0, Math.PI * 2); L(-11, -8, -11, 8); L(11, -8, 11, 8); c.moveTo(-11, 8); c.ellipse(0, 8, 11, 4, 0, Math.PI, 0, true); c.moveTo(-11, 0); c.ellipse(0, 0, 11, 4, 0, Math.PI, 0, true); break;
    case 'shield': c.moveTo(0, -13); c.lineTo(11, -8); c.lineTo(11, 1); c.quadraticCurveTo(11, 9, 0, 13); c.quadraticCurveTo(-11, 9, -11, 1); c.lineTo(-11, -8); c.closePath(); c.moveTo(-5, 0); c.lineTo(-1, 4); c.lineTo(6, -4); break;
    case 'person': P(0, 1); break;
    case 'people': P(-6, 0.8); P(6, 0.8); break;
    case 'ambulance': R(-14, -7, 18, 13, 2); R(4, -3, 9, 9, 2); O(-8, 8, 3); O(7, 8, 3); L(-5, -4, -5, 3); L(-8.5, -0.5, -1.5, -0.5); break;
    case 'ct': O(0, -2, 11); O(0, -2, 5); L(-15, 11, 15, 11); L(-4, 11, -4, 7); L(4, 11, 4, 7); break;
    case 'cloud': c.moveTo(-10, 8); c.arc(-7, 2, 6, Math.PI * 0.5, Math.PI * 1.5); c.arc(0, -3, 8, Math.PI * 1.1, Math.PI * 1.9); c.arc(8, 2, 6, Math.PI * 1.5, Math.PI * 0.5); c.closePath(); break;
    case 'clock': O(0, 0, 12); L(0, 0, 0, -7); L(0, 0, 5, 3); break;
    case 'badge': R(-8, -12, 16, 23, 3); O(0, -3, 4); L(-4, 5, 4, 5); L(-3, 8, 3, 8); L(0, -12, 0, -15); break;
    case 'wifi': c.moveTo(-12, -2); c.arc(0, 8, 15, Math.PI * 1.25, Math.PI * 1.75); c.moveTo(-7.5, 2); c.arc(0, 8, 9.5, Math.PI * 1.25, Math.PI * 1.75); c.moveTo(-3.5, 5.5); c.arc(0, 8, 4.5, Math.PI * 1.25, Math.PI * 1.75); O(0, 9, 1.4); break;
    case 'router': R(-13, -2, 26, 11, 2); L(-7, -2, -10, -12); L(7, -2, 10, -12); O(-6, 3.5, 1); O(-1, 3.5, 1); O(4, 3.5, 1); break;
    case 'rack': R(-9, -13, 18, 26, 2); L(-9, -6, 9, -6); L(-9, 1, 9, 1); L(-9, 8, 9, 8); O(5, -9.5, 0.9); O(5, -2.5, 0.9); O(5, 4.5, 0.9); break;
    case 'gear': O(0, 0, 6); for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; L(Math.cos(a) * 8, Math.sin(a) * 8, Math.cos(a) * 12, Math.sin(a) * 12); } break;
    case 'bell': c.moveTo(-9, 7); c.quadraticCurveTo(-8, -11, 0, -11); c.quadraticCurveTo(8, -11, 9, 7); c.closePath(); L(-11, 7, 11, 7); O(0, 10, 2); break;
    case 'building': R(-11, -12, 22, 25, 1.5); for (const yy of [-7, -1, 5]) { R(-7, yy, 4, 3, 0.5); R(3, yy, 4, 3, 0.5); } break;
    case 'home': c.moveTo(-13, -1); c.lineTo(0, -12); c.lineTo(13, -1); R(-9, -2, 18, 14, 1); R(-3, 4, 6, 8, 0.5); break;
    case 'gpu': R(-14, -8, 28, 16, 2); O(-6, 0, 4.5); O(6, 0, 4.5); L(-10, 8, -10, 11); L(0, 8, 0, 11); L(10, 8, 10, 11); break;
    case 'mic': R(-4.5, -13, 9, 15, 4.5); c.moveTo(-9, -2); c.quadraticCurveTo(-9, 8, 0, 8); c.quadraticCurveTo(9, 8, 9, -2); L(0, 8, 0, 13); L(-5, 13, 5, 13); break;
    case 'chat': R(-13, -11, 26, 17, 4); c.moveTo(-5, 6); c.lineTo(-8, 12); c.lineTo(1, 6); L(-7, -4, 7, -4); L(-7, 1, 3, 1); break;
    case 'doc': c.moveTo(-9, -13); c.lineTo(4, -13); c.lineTo(9, -8); c.lineTo(9, 13); c.lineTo(-9, 13); c.closePath(); L(-5, -4, 5, -4); L(-5, 1, 5, 1); L(-5, 6, 2, 6); break;
    case 'eye': c.moveTo(-14, 0); c.quadraticCurveTo(0, -13, 14, 0); c.quadraticCurveTo(0, 13, -14, 0); O(0, 0, 4.5); break;
    case 'lock': R(-10, -2, 20, 15, 2); c.moveTo(-6, -2); c.lineTo(-6, -6); c.arc(0, -6, 6, Math.PI, 0); c.lineTo(6, -2); L(0, 4, 0, 8); break;
    case 'canvas': R(-13, -10, 26, 20, 2); R(-10, -7, 9, 6, 1); R(1, -7, 9, 6, 1); R(-10, 1, 20, 6, 1); break;
    case 'topology': O(0, -9, 3); O(-10, 7, 3); O(10, 7, 3); O(0, 2, 2.5); L(0, -6, 0, -0.5); L(-2, 3.5, -8, 6); L(2, 3.5, 8, 6); L(-7, 7, 7, 7); break;
    case 'key': O(-6, 0, 6); L(0, 0, 13, 0); L(9, 0, 9, 5); L(13, 0, 13, 4); break;
    case 'scan': c.moveTo(-12, 12); c.arc(-12, 12, 22, -Math.PI / 2, 0); c.moveTo(-12, 0); c.arc(-12, 12, 12, -Math.PI / 2, 0); L(-12, 12, 4, -4); break;
    case 'board': R(-13, -10, 26, 20, 1.5); R(-9, -6, 8, 6, 0.5); R(2, -4, 7, 9, 0.5); L(-8, 4, -1, 4); O(-5, -7, 1.3); O(5.5, -5, 1.3); break;
    case 'phone': R(-7, -13, 14, 26, 3); L(-3, 9, 3, 9); L(-7, -8, 7, -8); break;
    case 'pill': c.save(); c.rotate(-Math.PI / 4); R(-12, -5, 24, 10, 5); L(0, -5, 0, 5); c.restore(); break;
    case 'flask': c.moveTo(-4, -13); c.lineTo(-4, -4); c.lineTo(-11, 10); c.quadraticCurveTo(-11, 12, -8, 12); c.lineTo(8, 12); c.quadraticCurveTo(11, 12, 11, 10); c.lineTo(4, -4); c.lineTo(4, -13); L(-6, -13, 6, -13); L(-7, 4, 7, 4); break;
    case 'switch': R(-13, -5, 26, 10, 2); O(-8, 0, 1); O(-3, 0, 1); O(2, 0, 1); O(7, 0, 1); L(-8, 5, -8, 10); L(0, 5, 0, 10); L(8, 5, 8, 10); break;
    case 'globe': O(0, 0, 11); c.ellipse(0, 0, 5, 11, 0, 0, Math.PI * 2); L(-11, 0, 11, 0); break;
    case 'bed': R(-13, -4, 26, 11, 2); L(-13, -10, -13, 11); R(-9, -3, 8, 5, 2); break;
    case 'heart': c.moveTo(0, 10); c.bezierCurveTo(-16, -2, -8, -14, 0, -6); c.bezierCurveTo(8, -14, 16, -2, 0, 10); break;
    case 'sensor': O(0, 0, 2.5); c.moveTo(5.5, 0); c.arc(0, 0, 5.5, 0, 0.8); c.moveTo(-5.5, 0); c.arc(0, 0, 5.5, Math.PI, Math.PI + 0.8); c.moveTo(10, 0); c.arc(0, 0, 10, -0.7, 0.7); c.moveTo(-10, 0); c.arc(0, 0, 10, Math.PI - 0.7, Math.PI + 0.7); break;
    case 'truck': R(-14, -8, 18, 14, 1); R(4, -4, 10, 10, 1); O(-8, 8, 3); O(8, 8, 3); break;
    case 'plug': L(-4, -12, -4, -4); L(4, -12, 4, -4); R(-8, -4, 16, 9, 3); L(0, 5, 0, 12); break;
    case 'tower': R(-6, -13, 12, 26, 1); R(-12, 0, 6, 13, 1); R(6, -4, 6, 17, 1); for (const yy of [-9, -3, 3]) L(-2, yy, 2, yy); break;
    default: R(-10, -10, 20, 20, 3);
  }
  c.stroke();
}
