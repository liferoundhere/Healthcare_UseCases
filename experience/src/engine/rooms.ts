import { C, Pen, rgba, tone, mul, type V3 } from "./iso";

/**
 * The hospital as a porcelain model: eight rooms on the main campus around the network core,
 * a clinic and a home off campus, and the outside world. Every room is 9 x 9 units with two back walls.
 */
export interface ZoneSpec { id: string; label: string; x: number; z: number; y?: number; kind: "campus" | "remote" | "sky" }
export const RS = 9, WALL = 2.15;
/** Distance between room origins: a 9-unit room plus a lane wide enough that a front room never hides the one behind. */
export const G = 11.6;
const E = 2 * G + RS; // far edge of the campus
export const ZONES: ZoneSpec[] = [
  { id: "plant", label: "Central plant", x: 0, z: 0, kind: "campus" },
  { id: "dc", label: "Data center", x: G, z: 0, kind: "campus" },
  { id: "imaging", label: "Imaging", x: 0, z: G, kind: "campus" },
  { id: "pharmlab", label: "Pharmacy & lab", x: 2 * G, z: 0, kind: "campus" },
  { id: "net", label: "Network core", x: G, z: G, kind: "campus" },
  { id: "ward", label: "Patient floor · 4 West", x: 0, z: 2 * G, kind: "campus" },
  { id: "office", label: "IT, security & admin", x: 2 * G, z: G, kind: "campus" },
  { id: "ed", label: "Emergency department", x: G, z: 2 * G, kind: "campus" },
  { id: "clinic", label: "Clinic · 40 miles out", x: E + 4.6, z: -18, kind: "remote" },
  { id: "home", label: "Patient's home", x: E + 4.6, z: -6.4, kind: "remote" },
  { id: "outside", label: "Internet & vendors", x: -17, z: E + 4, y: 2.6, kind: "sky" },
];

type Q = (key: number, fn: () => void) => void;
interface Ctx { r: Pen; q: Q; t: number }

const lw = (r: Pen, k = 0.02) => Math.max(0.6, r.s * k);

// ---------------------------------------------------------------- furniture
function person({ r, q }: Ctx, x: number, z: number, shirt: string, skin = C.skin1, hair = "#2a2233") {
  q(x + z, () => {
    const c = r.c, [fx, fy] = r.P(x, 0, z), u = r.s;
    c.fillStyle = "rgba(24,38,74,0.2)"; c.beginPath(); c.ellipse(fx + 0.06 * u, fy, 0.3 * u, 0.15 * u, 0, 0, 7); c.fill();
    const rrect = (X: number, Y: number, W: number, H: number, R: number, f: string | CanvasGradient) => { c.beginPath(); c.roundRect(X, Y, W, H, R); c.fillStyle = f; c.fill(); };
    rrect(fx - 0.14 * u, fy - 0.52 * u, 0.28 * u, 0.52 * u, 0.08 * u, "#243150");
    const g = c.createLinearGradient(fx - 0.2 * u, 0, fx + 0.2 * u, 0); g.addColorStop(0, mul(shirt, 1.12)); g.addColorStop(1, mul(shirt, 0.82));
    rrect(fx - 0.21 * u, fy - 1.08 * u, 0.42 * u, 0.66 * u, 0.17 * u, g);
    const hg = c.createRadialGradient(fx - 0.05 * u, fy - 1.3 * u, 0.02 * u, fx, fy - 1.25 * u, 0.18 * u); hg.addColorStop(0, mul(skin, 1.15)); hg.addColorStop(1, mul(skin, 0.86));
    c.beginPath(); c.arc(fx, fy - 1.25 * u, 0.175 * u, 0, 7); c.fillStyle = hg; c.fill();
    c.beginPath(); c.arc(fx, fy - 1.28 * u, 0.18 * u, Math.PI * 1.02, Math.PI * 1.98); c.fillStyle = hair; c.fill();
  });
}

function bed({ r, q }: Ctx, x: number, z: number, o: { patient?: boolean; blanket?: string; skin?: string } = {}) {
  q(x + z + 1.4, () => {
    r.box(x, z, 1.2, 2.35, 0.42, "#b7c2d6", 0, { sh: true });
    r.box(x, z - 0.02, 1.2, 0.1, 0.95, "#9fadc6");
    r.box(x + 0.05, z + 0.08, 1.1, 2.22, 0.18, C.white, 0.42);
    r.box(x + 0.2, z + 0.18, 0.8, 0.46, 0.1, "#f7f9fd", 0.6);
    const bl = o.blanket ?? "#8ed0c9";
    r.box(x + 0.05, z + 0.78, 1.1, 1.52, 0.07, bl, 0.6);
    if (o.patient !== false) { r.box(x + 0.32, z + 0.82, 0.56, 1.25, 0.13, mul(bl, 0.95), 0.67, { edge: false }); r.sph(x + 0.6, z + 0.44, 0.82, 0.17, o.skin ?? C.skin1); }
  });
}

function monitorPole({ r, q, t }: Ctx, x: number, z: number, col = C.green) {
  q(x + z + 0.2, () => {
    r.cyl(x, z, 0.035, 1.25, C.steel); r.disc(x, z, 0.2, "#aab5c9", null, 0.01);
    r.box(x - 0.3, z - 0.05, 0.6, 0.1, 0.44, "#1b2742", 1.15);
    r.fz(z + 0.052, x - 0.25, x + 0.25, 1.2, 1.54, "#06202b");
    const pts: V3[] = []; for (let i = 0; i <= 14; i++) { const u = i / 14, ph = (u * 2 + t * 0.9) % 1; const spike = ph > 0.42 && ph < 0.5 ? 0.13 : ph > 0.5 && ph < 0.56 ? -0.06 : 0; pts.push([x - 0.22 + u * 0.44, 1.36 + spike, z + 0.053]); }
    r.line(pts, col, lw(r, 0.022));
  });
}

function ivPump({ r, q }: Ctx, x: number, z: number) {
  q(x + z + 0.2, () => {
    r.disc(x, z, 0.22, "#aab5c9", null, 0.01); r.cyl(x, z, 0.028, 1.95, C.steel);
    r.box(x - 0.17, z - 0.02, 0.34, 0.2, 0.4, C.white, 0.95); r.fz(z + 0.181, x - 0.12, x + 0.06, 1.12, 1.28, C.cyan2);
    r.box(x - 0.12, z - 0.04, 0.24, 0.07, 0.34, "#cfeaff", 1.58, { edge: false }); r.line([[x - 0.2, 1.95, z], [x + 0.2, 1.95, z]], C.steel, lw(r, 0.03));
  });
}

function desk({ r, q }: Ctx, x: number, z: number, w = 1.7, o: { screens?: number; col?: string; d?: number; face?: "z" | "x" } = {}) {
  const d = o.d ?? 0.85;
  q(x + z + (w + d) / 2, () => {
    r.shadow(x, z, w, d);
    r.box(x + 0.07, z + 0.07, w - 0.14, d - 0.14, 0.7, "#d3dbe8");
    r.box(x, z, w, d, 0.07, C.white, 0.7);
    const n = o.screens ?? 1;
    for (let i = 0; i < n; i++) {
      const mx = x + (w / (n + 1)) * (i + 1);
      r.box(mx - 0.04, z + 0.2, 0.08, 0.08, 0.16, C.steel, 0.77, { edge: false });
      r.box(mx - 0.34, z + 0.17, 0.68, 0.06, 0.44, "#1b2742", 0.9);
      const g = r.c.createLinearGradient(0, r.P(mx, 1.3, z)[1], 0, r.P(mx, 0.94, z)[1]); g.addColorStop(0, o.col ?? "#59b7ff"); g.addColorStop(1, mul(o.col ?? "#2f6bff", 0.9));
      r.fz(z + 0.232, mx - 0.3, mx + 0.3, 0.94, 1.3, g);
      r.box(mx - 0.22, z + 0.45, 0.44, 0.16, 0.02, "#c4ccdb", 0.77, { edge: false });
    }
  });
}

function chair({ r, q }: Ctx, x: number, z: number, col = "#3b4a6b") {
  q(x + z + 0.3, () => { r.cyl(x + 0.22, z + 0.22, 0.04, 0.4, C.steel); r.box(x, z, 0.44, 0.44, 0.08, col, 0.4, { sh: true }); r.box(x, z + 0.38, 0.44, 0.07, 0.5, col, 0.48); });
}

function rack({ r, q, t }: Ctx, x: number, z: number, o: { led?: string; body?: string; h?: number; seed?: number; glow?: string } = {}) {
  q(x + z + 0.9, () => {
    const h = o.h ?? 2.1, b = o.body ?? "#1c2843";
    r.box(x, z, 0.82, 1.0, h, b, 0, { sh: true });
    r.fz(z + 1.001, x + 0.07, x + 0.75, 0.12, h - 0.1, "#0c1528");
    const rows = Math.floor((h - 0.3) / 0.17);
    for (let i = 0; i < rows; i++) {
      const y = 0.18 + i * 0.17;
      r.fz(z + 1.002, x + 0.1, x + 0.72, y, y + 0.11, i % 4 === 3 ? "#182641" : "#24365a");
      const on = Math.sin(t * (2 + ((i * 7 + (o.seed ?? 0)) % 5)) + i * 1.7 + (o.seed ?? 0)) > -0.3;
      r.fz(z + 1.003, x + 0.14, x + 0.2, y + 0.03, y + 0.08, on ? o.led ?? C.green : "#2c4a4a");
      r.fz(z + 1.003, x + 0.24, x + 0.3, y + 0.03, y + 0.08, i % 3 ? o.led ?? C.cyan2 : C.amber);
    }
    if (o.glow) { const c = r.c; c.save(); c.shadowColor = o.glow; c.shadowBlur = r.s * 0.5; r.fz(z + 1.004, x + 0.07, x + 0.75, h - 0.14, h - 0.1, o.glow); c.restore(); }
  });
}

function cabinet({ r, q }: Ctx, x: number, z: number, w: number, d: number, h: number, col = "#dfe5ef", lights?: string[]) {
  q(x + z + (w + d) / 2, () => {
    r.box(x, z, w, d, h, col, 0, { sh: true });
    const n = Math.max(1, Math.round(w / 0.7));
    for (let i = 1; i < n; i++) r.line([[x + (w / n) * i, 0.1, z + d + 0.002], [x + (w / n) * i, h - 0.1, z + d + 0.002]], "rgba(60,80,120,0.25)", lw(r, 0.012));
    (lights ?? []).forEach((c, i) => r.fz(z + d + 0.003, x + 0.15 + i * 0.22, x + 0.27 + i * 0.22, h - 0.36, h - 0.26, c));
  });
}

function plantPot({ r, q }: Ctx, x: number, z: number, s = 1) {
  q(x + z + 0.2, () => { r.cyl(x, z, 0.2 * s, 0.34 * s, "#c9d1df", 0, { sh: true }); r.sph(x, z, 0.72 * s, 0.34 * s, C.leaf); r.sph(x - 0.12 * s, z + 0.1 * s, 0.95 * s, 0.24 * s, "#3fb48c"); r.sph(x + 0.14 * s, z - 0.05 * s, 0.56 * s, 0.22 * s, C.leaf2); });
}

export function tree(r: Pen, x: number, z: number, s = 1, y = 0) {
  r.disc(x + 0.2, z - 0.05, 0.62 * s, "rgba(4,8,18,0.35)", null, y + 0.01);
  r.cyl(x, z, 0.08 * s, 0.6 * s, "#6a5546", y);
  r.sph(x, z, y + 1.0 * s, 0.62 * s, C.leaf2); r.sph(x - 0.22 * s, z + 0.18 * s, y + 1.3 * s, 0.46 * s, C.leaf); r.sph(x + 0.2 * s, z - 0.1 * s, y + 1.55 * s, 0.36 * s, "#46bd93");
}

function screenWall({ r }: Ctx, plane: "z" | "x", a0: number, a1: number, y0: number, y1: number, tiles: string[]) {
  const k = 0.305;
  if (plane === "z") { r.fz(k, a0, a1, y0, y1, "#101a30", "#2a3a5c", lw(r, 0.02)); } else { r.fx(k, a0, a1, y0, y1, "#0e172b", "#2a3a5c", lw(r, 0.02)); }
  const n = tiles.length, w = (a1 - a0 - 0.2) / n;
  tiles.forEach((col, i) => {
    const s0 = a0 + 0.1 + i * w + 0.05, s1 = s0 + w - 0.1;
    if (plane === "z") r.fz(k + 0.002, s0, s1, y0 + 0.12, y1 - 0.12, rgba(col, 0.9)); else r.fx(k + 0.002, s0, s1, y0 + 0.12, y1 - 0.12, rgba(col, 0.8));
  });
}

// ---------------------------------------------------------------- shell
function shell(r: Pen, o: { floor?: string; wall?: string; grid?: string; tile?: number; slab?: string } = {}) {
  const floor = o.floor ?? C.porc, wall = tone(o.wall ?? C.wall);
  r.box(0, 0, RS, RS, 0.4, tone(o.slab ?? "#c3ccdc"), -0.4, { top: floor });
  const step = o.tile ?? 1, gc = o.grid ?? "rgba(110,132,176,0.16)";
  for (let i = step; i < RS; i += step) { r.line([[i, 0.003, 0.3], [i, 0.003, RS]], gc, lw(r, 0.012)); r.line([[0.3, 0.003, i], [RS, 0.003, i]], gc, lw(r, 0.012)); }
  // Soft occlusion where the floor meets the walls.
  const c = r.c; const [ax, ay] = r.P(0.3, 0, 0.3), [bx, by] = r.P(1.5, 0, 1.5);
  const g = c.createLinearGradient(ax, ay, bx, by); g.addColorStop(0, "rgba(40,60,110,0.16)"); g.addColorStop(1, "rgba(40,60,110,0)");
  r.poly([[0.3, 0.004, 0.3], [RS, 0.004, 0.3], [RS, 0.004, 1.4], [1.4, 0.004, 1.4], [1.4, 0.004, RS], [0.3, 0.004, RS]], g);
  r.box(0, 0, RS, 0.3, WALL, wall); r.box(0, 0.3, 0.3, RS - 0.3, WALL, wall);
  r.line([[0.3, 0.02, 0.3], [RS, 0.02, 0.3]], "rgba(60,80,130,0.25)", lw(r, 0.02)); r.line([[0.3, 0.02, 0.3], [0.3, 0.02, RS]], "rgba(60,80,130,0.25)", lw(r, 0.02));
}
const windowZ = (r: Pen, x0: number, x1: number, y0 = 0.95, y1 = 1.85) => { r.fz(0.302, x0, x1, y0, y1, "rgba(120,178,255,0.42)", "#f7f9fd", lw(r, 0.03)); r.line([[(x0 + x1) / 2, y0, 0.303], [(x0 + x1) / 2, y1, 0.303]], "#f7f9fd", lw(r, 0.02)); };
const windowX = (r: Pen, z0: number, z1: number, y0 = 0.95, y1 = 1.85) => { r.fx(0.302, z0, z1, y0, y1, "rgba(96,150,230,0.42)", "#eef2f8", lw(r, 0.03)); r.line([[0.303, y0, (z0 + z1) / 2], [0.303, y1, (z0 + z1) / 2]], "#eef2f8", lw(r, 0.02)); };

// ---------------------------------------------------------------- rooms
const ROOMS: Record<string, (k: Ctx) => void> = {
  ward(k) {
    const { r, q } = k; shell(r);
    windowX(r, 1.2, 3.4); windowX(r, 5.4, 7.6);
    // headwall with gases and lights
    r.fz(0.302, 0.6, 8.4, 1.25, 1.5, "#cfd8e8"); [1.3, 3.9, 6.5].forEach((x) => { r.fz(0.304, x + 0.3, x + 0.42, 1.31, 1.44, C.green); r.fz(0.304, x + 0.5, x + 0.62, 1.31, 1.44, C.cyan); r.fz(0.304, x + 0.7, x + 0.82, 1.31, 1.44, C.amber); });
    [1.0, 3.6, 6.2].forEach((x, i) => {
      bed(k, x, 0.55, { blanket: ["#8ed0c9", "#a9bff2", "#f3c9a8"][i], skin: [C.skin1, C.skin3, C.skin2][i], patient: i !== 1 });
      monitorPole(k, x + 1.62, 0.8, i === 2 ? C.amber : C.green);
      q(x + 2.3 + 1.6, () => r.fx(x + 2.28, 0.32, 3.0, 0.25, 1.75, "rgba(23,182,164,0.22)", "rgba(23,182,164,0.55)", lw(r, 0.015)));
    });
    ivPump(k, 0.72, 1.5); ivPump(k, 5.9, 1.6);
    // nurse station
    q(8.6, () => { r.shadow(0.9, 4.6, 1.0, 3.2); r.box(0.9, 4.6, 1.0, 3.2, 1.0, "#dde4ef"); r.box(0.85, 4.55, 1.1, 3.3, 0.08, C.white, 1.0); r.box(1.9, 4.6, 1.3, 0.9, 1.0, "#dde4ef"); r.box(1.85, 4.55, 1.4, 1.0, 0.08, C.white, 1.0);
      [5.2, 6.3].forEach((z) => { r.box(1.1, z, 0.06, 0.62, 0.42, "#1b2742", 1.18); r.fx(1.162, z + 0.04, z + 0.58, 1.22, 1.56, "#3aa0ff"); }); r.fx(1.901, 4.9, 7.6, 0.3, 0.42, C.cyan); });
    person(k, 0.62, 6.0, C.teal, C.skin2); person(k, 4.4, 4.1, C.teal, C.skin1, "#7a4a2b"); person(k, 7.4, 3.6, "#f4f6fb", C.skin3);
    // workstation on wheels
    q(6.0 + 6.2, () => { r.cyl(6.0, 6.2, 0.05, 1.0, C.steel, 0, { sh: true }); r.disc(6.0, 6.2, 0.26, "#aab5c9", null, 0.01); r.box(5.7, 5.95, 0.6, 0.5, 0.06, C.white, 1.0); r.box(5.72, 5.98, 0.56, 0.05, 0.4, "#1b2742", 1.1); r.fz(6.032, 5.76, 6.24, 1.14, 1.46, "#3aa0ff"); });
    plantPot(k, 8.3, 8.3); chair(k, 3.1, 3.3, "#6f86b8"); chair(k, 8.2, 1.0, "#6f86b8");
  },
  ed(k) {
    const { r, q } = k; shell(r);
    r.fz(0.302, 2.6, 7.4, 1.55, 2.05, "#e11d48"); r.wtext("EMERGENCY", 2.95, 1.8, 0.304, 0.34, "#ffffff", 800);
    windowX(r, 5.6, 7.8);
    bed(k, 0.9, 0.55, { blanket: "#f3c9a8", skin: C.skin2 }); monitorPole(k, 2.5, 0.8, C.red);
    q(3.3 + 1.7, () => r.fx(3.2, 0.32, 3.0, 0.25, 1.75, "rgba(255,138,76,0.2)", "rgba(255,138,76,0.5)", lw(r, 0.015)));
    bed(k, 3.6, 0.55, { patient: false, blanket: "#a9bff2" });
    q(5.9 + 1.7, () => r.fx(5.8, 0.32, 3.0, 0.25, 1.75, "rgba(255,138,76,0.2)", "rgba(255,138,76,0.5)", lw(r, 0.015)));
    // crash cart
    q(6.6 + 1.6, () => { r.box(6.4, 0.8, 0.7, 0.5, 0.95, "#e5484d", 0, { sh: true }); r.box(6.4, 0.8, 0.7, 0.5, 0.06, "#f1f4f9", 0.95); [0.25, 0.5, 0.72].forEach((y) => r.line([[6.45, y, 1.302], [7.05, y, 1.302]], "rgba(255,255,255,0.6)", lw(r, 0.02))); r.box(6.55, 0.9, 0.36, 0.26, 0.2, "#1b2742", 1.01); });
    // triage desk
    q(8.4, () => { r.shadow(0.8, 5.0, 1.0, 2.6); r.box(0.8, 5.0, 1.0, 2.6, 1.0, "#dde4ef"); r.box(0.75, 4.95, 1.1, 2.7, 0.08, C.white, 1.0); r.box(1.0, 5.9, 0.06, 0.62, 0.42, "#1b2742", 1.18); r.fx(1.062, 5.94, 6.48, 1.22, 1.56, "#3aa0ff"); r.fx(1.801, 5.2, 7.4, 0.3, 0.42, C.red); });
    person(k, 0.55, 6.3, "#3b62d9", C.skin1); person(k, 4.9, 3.9, "#f4f6fb", C.skin2, "#3b2a1e"); person(k, 2.6, 4.6, C.teal, C.skin3);
    // waiting chairs
    [0, 0.62, 1.24].forEach((d) => chair(k, 5.6 + d, 7.9, "#5b78b5"));
    // wheelchair-ish gurney
    q(7.2 + 4.8, () => { r.box(6.6, 4.4, 0.9, 1.9, 0.1, "#eef2f8", 0.72, { sh: true }); r.box(6.65, 4.45, 0.8, 0.5, 0.08, C.white, 0.82); [[6.7, 4.5], [7.4, 4.5], [6.7, 6.2], [7.4, 6.2]].forEach(([x, z]) => r.cyl(x, z, 0.03, 0.72, C.steel)); });
  },
  imaging(k) {
    const { r, q } = k; shell(r, { floor: "#e9eef7" });
    // CT gantry, bore facing the room
    q(4.2, () => {
      r.shadow(2.2, 0.9, 3.0, 1.0);
      r.box(2.2, 0.9, 3.0, 1.0, 2.5, "#f8fafd");
      r.circ("z", 1.901, 3.7, 1.25, 0.92, "#c9d3e3", "#aeb9cc", lw(r, 0.02));
      r.circ("z", 1.902, 3.7, 1.25, 0.72, "#15203a");
      const c = r.c; c.save(); c.shadowColor = C.cyan; c.shadowBlur = r.s * 0.4; r.circ("z", 1.903, 3.7, 1.25, 0.72, null, C.cyan2, lw(r, 0.035)); c.restore();
      r.fz(1.903, 2.4, 2.75, 2.05, 2.25, C.cyan); r.fz(1.903, 4.7, 5.0, 2.05, 2.25, C.green);
    });
    q(4.4 + 3.4, () => { r.box(3.4, 2.6, 0.6, 2.2, 0.72, "#c9d1df", 0, { sh: true }); r.box(3.25, 1.5, 0.9, 3.6, 0.12, "#eef2f8", 0.72); r.box(3.32, 2.3, 0.76, 1.9, 0.08, "#a9bff2", 0.84); r.sph(3.7, 2.05, 1.0, 0.17, C.skin2); });
    // control room behind glass
    q(13.6, () => r.fx(6.4, 4.4, 8.7, 0.0, 1.9, "rgba(120,178,255,0.2)", "rgba(200,225,255,0.7)", lw(r, 0.02)));
    desk(k, 6.9, 5.0, 1.8, { screens: 2, col: "#7fe3d2" }); person(k, 7.8, 6.4, "#f4f6fb", C.skin1, "#5b3b22");
    q(0, () => { r.fx(0.302, 1.2, 2.8, 0.0, 2.0, "#cfd8e8", "#aeb9cc", lw(r, 0.02)); r.fx(0.304, 1.9, 2.1, 1.3, 1.5, C.amber); screenWall(k, "x", 4.6, 7.6, 0.9, 1.9, ["#2f6bff", "#9d8cff", "#17b6a4"]); });
    cabinet(k, 0.6, 7.2, 0.9, 1.4, 1.5, "#dfe5ef", [C.green, C.cyan]);
    plantPot(k, 8.4, 0.9, 0.9); person(k, 1.9, 5.3, C.teal, C.skin3);
  },
  dc(k) {
    const { r, q } = k; shell(r, { floor: "#e3e9f3", tile: 0.75, grid: "rgba(90,112,160,0.22)" });
    // perforated cold-aisle tiles
    q(0.1, () => { for (let i = 0; i < 9; i++) r.poly([[1.5 + i * 0.75, 0.004, 3.0], [2.25 + i * 0.75, 0.004, 3.0], [2.25 + i * 0.75, 0.004, 3.75], [1.5 + i * 0.75, 0.004, 3.75]], i % 2 ? "rgba(0,188,235,0.13)" : "rgba(0,188,235,0.06)"); });
    for (let i = 0; i < 8; i++) rack(k, 1.0 + i * 0.88, 0.9, { seed: i, led: i === 6 ? C.amber : C.green });
    for (let i = 0; i < 5; i++) rack(k, 1.0 + i * 0.88, 4.6, { seed: i + 9, led: C.cyan2 });
    // GPU pod
    rack(k, 5.9, 4.6, { seed: 30, body: "#2a2350", led: C.violet, glow: C.violet, h: 2.25 }); rack(k, 6.78, 4.6, { seed: 31, body: "#2a2350", led: C.violet, glow: C.violet, h: 2.25 });
    // cooling unit and cable tray
    cabinet(k, 0.5, 6.4, 0.9, 2.0, 1.9, "#dfe5ef", [C.cyan, C.green]);
    q(30, () => { r.line([[1.0, 2.5, 1.4], [8.1, 2.5, 1.4]], "rgba(255,176,32,0.9)", lw(r, 0.05)); r.line([[1.0, 2.62, 1.4], [8.1, 2.62, 1.4]], "rgba(0,188,235,0.9)", lw(r, 0.035)); for (let i = 0; i < 6; i++) r.line([[1.4 + i * 1.3, 2.1, 1.4], [1.4 + i * 1.3, 2.5, 1.4]], "#8493b0", lw(r, 0.02)); });
    person(k, 7.9, 7.6, "#3b62d9", C.skin2); q(15.2, () => { r.box(7.0, 7.9, 0.6, 0.45, 0.9, "#c9d1df", 0, { sh: true }); r.box(7.02, 7.92, 0.56, 0.05, 0.36, "#1b2742", 0.96); r.fz(7.972, 7.06, 7.54, 1.0, 1.28, "#3aa0ff"); });
  },
  plant(k) {
    const { r, q, t } = k; shell(r, { floor: "#e1e6ef", grid: "rgba(90,104,140,0.18)", wall: "#dfe4ee" });
    const chiller = (x: number, z: number, i: number) => q(x + z + 1.6, () => {
      r.box(x, z, 2.4, 1.5, 1.35, "#e6ebf3", 0, { sh: true });
      for (let j = 0; j < 9; j++) r.line([[x + 0.2 + j * 0.25, 0.25, z + 1.502], [x + 0.2 + j * 0.25, 1.1, z + 1.502]], "rgba(60,80,120,0.3)", lw(r, 0.018));
      [0.65, 1.75].forEach((dx, n) => { r.disc(x + dx, z + 0.75, 0.48, "#9aa6bc", "#6f7d98", 1.36, lw(r, 0.02)); r.disc(x + dx, z + 0.75, 0.4, "#1b2742", null, 1.362);
        for (let b = 0; b < 3; b++) { const a = t * 3 + i + n + (b * Math.PI * 2) / 3; r.line([[x + dx, 1.365, z + 0.75], [x + dx + Math.cos(a) * 0.36, 1.365, z + 0.75 + Math.sin(a) * 0.36]], "#c7cfdd", lw(r, 0.06)); } });
      r.fz(z + 1.503, x + 0.15, x + 0.45, 1.15, 1.25, i ? C.green : C.amber);
    });
    chiller(0.9, 0.8, 0); chiller(3.8, 0.8, 1);
    // pipework along the wall
    q(0, () => { r.line([[0.6, 1.9, 0.5], [8.6, 1.9, 0.5]], "#5b8def", lw(r, 0.1)); r.line([[0.6, 1.6, 0.5], [8.6, 1.6, 0.5]], "#ff7a59", lw(r, 0.1)); [1.6, 4.4, 7.2].forEach((x) => { r.line([[x, 1.9, 0.5], [x, 1.2, 0.5]], "#5b8def", lw(r, 0.08)); }); screenWall(k, "x", 5.2, 7.8, 1.0, 1.9, ["#17b6a4", "#ffb020"]); });
    // generator with exhaust
    q(14.4, () => { r.box(6.5, 3.6, 1.8, 2.6, 1.5, "#f0c64a", 0, { sh: true }); r.box(6.5, 3.6, 1.8, 2.6, 0.12, "#3b4a6b", 1.5); r.cyl(7.9, 4.0, 0.14, 1.3, "#8f9bb3", 1.62); for (let j = 0; j < 6; j++) r.line([[6.7 + j * 0.28, 0.3, 6.202], [6.7 + j * 0.28, 1.2, 6.202]], "rgba(40,40,20,0.35)", lw(r, 0.02)); r.fz(6.203, 6.65, 7.4, 1.26, 1.4, "#1b2742"); });
    // switchgear
    cabinet(k, 0.55, 3.4, 0.8, 3.6, 1.9, "#c9d1df", [C.green, C.green, C.amber]);
    q(9.6, () => { r.box(2.6, 6.6, 1.2, 0.8, 0.9, "#3b4a6b", 0, { sh: true }); r.box(2.62, 6.62, 1.16, 0.06, 0.5, "#1b2742", 0.9); r.fz(6.684, 2.68, 3.74, 0.96, 1.36, "#17b6a4"); });
    person(k, 4.4, 6.9, C.amber, C.skin1); person(k, 5.6, 4.0, "#ff8a4c", C.skin3);
  },
  net(k) {
    const { r, q } = k; shell(r, { floor: "#e6ecf6", tile: 0.75, grid: "rgba(0,150,210,0.18)" });
    // open racks with patch panels
    for (let i = 0; i < 4; i++) rack(k, 1.1 + i * 0.95, 0.9, { seed: i + 40, body: "#31436b", led: C.green });
    rack(k, 5.4, 0.9, { seed: 50, body: "#0e3a5c", led: C.cyan2, glow: C.cyan }); rack(k, 6.3, 0.9, { seed: 51, body: "#0e3a5c", led: C.cyan2, glow: C.cyan });
    // core switch pair in the middle of the room
    q(9.4, () => { [0, 0.34, 0.68].forEach((y, i) => { r.box(3.2, 4.0, 2.6, 1.3, 0.28, i === 2 ? "#f4f7fb" : "#dbe2ee", 0.5 + y, { sh: i === 0 }); for (let p = 0; p < 16; p++) r.fz(5.302, 3.35 + p * 0.15, 3.45 + p * 0.15, 0.58 + y, 0.68 + y, p % 5 === 0 ? C.amber : p % 2 ? C.cyan : C.green); }); r.box(3.3, 4.1, 2.4, 1.1, 0.5, "#b7c2d6"); });
    cabinet(k, 0.55, 5.6, 0.9, 2.6, 1.7, "#dfe5ef", [C.green, C.green]);
    // overhead tray and fibre drops
    q(40, () => { r.line([[1.2, 2.55, 1.4], [8.4, 2.55, 1.4]], "rgba(255,176,32,0.95)", lw(r, 0.06)); r.line([[4.5, 2.55, 1.4], [4.5, 2.55, 4.6], [4.5, 1.5, 4.6]], "rgba(255,176,32,0.95)", lw(r, 0.05)); r.line([[1.2, 2.66, 1.4], [8.4, 2.66, 1.4]], "rgba(0,188,235,0.95)", lw(r, 0.04)); });
    // access point on a mast
    q(15.4, () => { r.cyl(7.7, 7.7, 0.04, 1.9, C.steel, 0, { sh: true }); r.cyl(7.7, 7.7, 0.34, 0.1, C.white, 1.9); r.disc(7.7, 7.7, 0.1, C.cyan, null, 2.01); });
    person(k, 6.4, 5.6, "#3b62d9", C.skin1, "#b9772f"); desk(k, 6.6, 6.6, 1.3, { col: "#17b6a4" });
  },
  office(k) {
    const { r, q } = k; shell(r, { floor: "#eef1f6" });
    q(0, () => { screenWall(k, "z", 1.0, 6.2, 0.75, 2.05, ["#2f6bff", "#17b6a4", "#ffb020", "#9d8cff", "#2f6bff"]); windowX(r, 1.0, 3.0); windowX(r, 5.6, 7.6); r.wtext("OPERATIONS", 6.5, 1.75, 0.304, 0.24, "#7c8aa8", 700); });
    // carpet zone
    q(0.2, () => r.poly([[1.4, 0.005, 1.6], [6.6, 0.005, 1.6], [6.6, 0.005, 6.0], [1.4, 0.005, 6.0]], "rgba(47,107,255,0.07)"));
    [[1.6, 2.0], [3.6, 2.0], [5.6, 2.0], [1.6, 4.4], [3.6, 4.4], [5.6, 4.4]].forEach(([x, z], i) => { desk(k, x, z, 1.6, { screens: i % 3 === 1 ? 2 : 1, col: ["#59b7ff", "#7fe3d2", "#59b7ff", "#ffb86b", "#59b7ff", "#b3a6ff"][i] }); chair(k, x + 0.58, z + 1.0, i % 2 ? "#3b4a6b" : "#5b78b5"); });
    person(k, 2.4, 3.25, "#3b62d9", C.skin1); person(k, 4.4, 3.25, "#ff8a4c", C.skin3, "#1f1a17"); person(k, 6.4, 5.65, "#2a3a5c", C.skin2, "#7a4a2b"); person(k, 2.4, 5.65, "#3b62d9", C.skin2);
    // meeting table
    q(15.4, () => { r.cyl(7.6, 7.4, 0.08, 0.7, C.steel, 0, { sh: true }); r.cyl(7.6, 7.4, 0.85, 0.07, C.white, 0.7); });
    chair(k, 6.5, 7.9, "#5b78b5"); plantPot(k, 8.4, 0.9); plantPot(k, 0.85, 8.3, 0.9);
  },
  pharmlab(k) {
    const { r, q } = k; shell(r, { floor: "#edf2f6" });
    // pharmacy shelving on the back wall
    q(0, () => { windowX(r, 5.0, 7.4); });
    const shelf = (x: number) => q(x + 1.6, () => { r.box(x, 0.4, 1.7, 0.55, 2.0, "#dfe5ef", 0, { sh: true }); const cols = ["#2fd28f", "#ffb020", "#5b8def", "#ff7ab8", "#f4f6fb", "#9d8cff"]; for (let s = 0; s < 4; s++) { r.line([[x + 0.05, 0.3 + s * 0.45, 0.952], [x + 1.65, 0.3 + s * 0.45, 0.952]], "rgba(60,80,120,0.4)", lw(r, 0.02)); for (let b = 0; b < 7; b++) r.fz(0.953, x + 0.1 + b * 0.22, x + 0.27 + b * 0.22, 0.33 + s * 0.45, 0.33 + s * 0.45 + 0.2 + ((b * 3 + s) % 3) * 0.05, cols[(b + s * 2) % 6]); } });
    shelf(0.9); shelf(2.8);
    // dispensing cabinet
    cabinet(k, 4.9, 0.5, 1.5, 0.8, 1.9, "#f4f7fb", [C.green, C.cyan]); q(6.9, () => r.fz(1.304, 5.2, 6.1, 1.05, 1.5, "#0d2a44", "#5ad8ff", lw(r, 0.02)));
    // lab bench with analysers
    q(13.4, () => { r.shadow(2.2, 5.2, 4.2, 1.1); r.box(2.3, 5.3, 4.0, 0.9, 0.85, "#cfd7e5"); r.box(2.2, 5.2, 4.2, 1.1, 0.08, C.white, 0.85);
      r.box(2.5, 5.4, 0.9, 0.6, 0.55, "#eef2f8", 0.93); r.fz(6.002, 2.6, 3.0, 1.1, 1.36, "#17b6a4"); r.box(3.8, 5.4, 0.7, 0.6, 0.75, "#eef2f8", 0.93); r.fz(6.002, 3.9, 4.4, 1.25, 1.55, "#2f6bff");
      [[5.0, C.cyan], [5.3, C.pink], [5.6, C.amber], [5.9, C.violet]].forEach(([x, c2]) => { r.cyl(x as number, 5.75, 0.09, 0.3, c2 as string, 0.93); r.cyl(x as number, 5.75, 0.045, 0.12, "#eef2f8", 1.23); }); });
    person(k, 4.2, 7.0, "#f4f6fb", C.skin2); person(k, 1.4, 3.4, C.teal, C.skin1, "#d9b382");
    // fridge
    cabinet(k, 0.55, 5.8, 0.9, 1.6, 2.0, "#f4f7fb", [C.cyan]); plantPot(k, 8.3, 8.2, 0.9);
    q(15, () => { r.box(7.2, 2.8, 1.0, 1.0, 0.9, "#dfe5ef", 0, { sh: true }); r.box(7.3, 2.9, 0.8, 0.8, 0.5, "#b3a6ff", 0.9); });
  },
  clinic(k) {
    const { r, q } = k; shell(r, { floor: "#f0f3f8" });
    q(0, () => { windowX(r, 1.0, 3.2); windowX(r, 5.4, 7.6); r.fz(0.302, 0.9, 3.6, 1.45, 1.95, "#0e3a5c"); r.wtext("CLINIC", 1.2, 1.7, 0.304, 0.32, "#5ad8ff", 800); });
    // exam room partition and table
    q(11.3, () => r.fx(4.6, 0.32, 4.2, 0, 2.0, "rgba(160,190,235,0.28)", "rgba(210,225,250,0.8)", lw(r, 0.02)));
    q(9.6, () => { r.box(5.4, 1.0, 1.0, 2.1, 0.75, "#c9d1df", 0, { sh: true }); r.box(5.35, 0.95, 1.1, 2.2, 0.14, "#a9bff2", 0.75); r.box(5.45, 1.05, 0.9, 0.5, 0.1, C.white, 0.89); });
    q(11.6, () => { r.cyl(7.4, 1.2, 0.035, 1.5, C.steel); r.box(7.15, 1.15, 0.5, 0.08, 0.36, "#1b2742", 1.3); r.fz(1.232, 7.19, 7.61, 1.34, 1.62, "#17b6a4"); r.box(7.6, 2.2, 0.7, 0.7, 0.8, "#dfe5ef", 0, { sh: true }); });
    person(k, 6.8, 3.4, "#f4f6fb", C.skin3); person(k, 5.0, 3.9, "#ffb86b", C.skin1, "#5b3b22");
    // reception
    q(8.6, () => { r.shadow(0.9, 4.6, 1.0, 3.0); r.box(0.9, 4.6, 1.0, 3.0, 1.0, "#dde4ef"); r.box(0.85, 4.55, 1.1, 3.1, 0.08, C.white, 1.0); r.box(1.05, 5.6, 0.06, 0.62, 0.42, "#1b2742", 1.18); r.fx(1.112, 5.64, 6.18, 1.22, 1.56, "#3aa0ff"); r.fx(1.901, 4.8, 7.4, 0.3, 0.42, C.cyan); });
    person(k, 0.6, 6.0, C.teal, C.skin2);
    [0, 0.62, 1.24, 1.86].forEach((d) => chair(k, 4.2 + d, 7.8, "#5b78b5"));
    q(17, () => { r.cyl(8.3, 8.3, 0.04, 1.9, C.steel, 0, { sh: true }); r.cyl(8.3, 8.3, 0.3, 0.1, C.white, 1.9); r.disc(8.3, 8.3, 0.09, C.cyan, null, 2.01); });
    plantPot(k, 3.2, 8.4, 0.9);
  },
  home(k) {
    const { r, q } = k; shell(r, { floor: "#f1e6d6", grid: "rgba(140,110,70,0.16)", tile: 0.6, wall: "#f0ece6", slab: "#cdbfae" });
    q(0, () => { windowZ(r, 4.8, 7.2); windowX(r, 4.6, 7.0); r.fz(0.302, 1.3, 2.5, 1.0, 1.8, "#d9a066", "#fff", lw(r, 0.03)); r.fz(0.304, 1.45, 2.35, 1.12, 1.68, "#7cc4a0"); });
    // rug
    q(0.2, () => { r.poly([[2.6, 0.006, 3.8], [6.8, 0.006, 3.8], [6.8, 0.006, 7.0], [2.6, 0.006, 7.0]], "#c7d8f5"); r.poly([[3.0, 0.007, 4.2], [6.4, 0.007, 4.2], [6.4, 0.007, 6.6], [3.0, 0.007, 6.6]], null, "rgba(255,255,255,0.8)", lw(r, 0.03)); });
    bed(k, 0.9, 0.55, { blanket: "#f3b99a", skin: C.skin2 });
    // home monitoring kit on a side table
    q(3.6, () => { r.box(2.4, 0.6, 0.8, 0.7, 0.6, C.wood, 0, { sh: true }); r.box(2.5, 0.7, 0.6, 0.45, 0.22, C.white, 0.6); r.fz(1.152, 2.56, 2.9, 0.64, 0.78, C.green); r.cyl(3.05, 0.78, 0.03, 0.35, C.steel, 0.6); r.sph(3.05, 0.78, 0.98, 0.05, C.cyan); });
    // sofa
    q(10.6, () => { r.box(0.7, 4.2, 1.1, 3.0, 0.45, "#6f86b8", 0, { sh: true }); r.box(0.7, 4.2, 0.35, 3.0, 0.55, "#5d74a6", 0.45); r.box(0.7, 4.2, 1.1, 0.3, 0.3, "#5d74a6", 0.45); r.box(0.7, 6.9, 1.1, 0.3, 0.3, "#5d74a6", 0.45); r.box(1.1, 4.7, 0.6, 0.6, 0.14, "#ffd58a", 0.45); });
    person(k, 1.95, 5.6, "#ffb86b", C.skin2, "#bfc5d2");
    // tablet on a stand: the video visit
    q(10.2, () => { r.cyl(4.6, 5.2, 0.035, 1.1, C.steel, 0, { sh: true }); r.disc(4.6, 5.2, 0.22, "#aab5c9", null, 0.01); r.box(4.57, 4.8, 0.06, 0.8, 0.55, "#1b2742", 0.95); r.fx(4.632, 4.85, 5.55, 1.0, 1.45, "#3aa0ff"); r.sph(4.64, 5.2, 1.27, 0.09, C.skin1); });
    // lamp and router
    q(16.2, () => { r.cyl(8.2, 8.1, 0.03, 1.6, "#8a7256", 0, { sh: true }); const c = r.c; c.save(); c.shadowColor = "#ffd58a"; c.shadowBlur = r.s * 0.9; r.cyl(8.2, 8.1, 0.3, 0.36, "#ffe2a8", 1.5); c.restore(); });
    q(9.6, () => { r.box(7.3, 0.6, 1.2, 0.6, 0.7, C.wood, 0, { sh: true }); r.box(7.5, 0.7, 0.7, 0.4, 0.1, "#f4f7fb", 0.7); r.line([[7.6, 0.8, 0.8], [7.6, 1.25, 0.8]], "#31436b", lw(r, 0.03)); r.line([[8.1, 0.8, 0.8], [8.1, 1.25, 0.8]], "#31436b", lw(r, 0.03)); r.fz(1.102, 7.6, 7.7, 0.73, 0.77, C.green); });
    plantPot(k, 3.6, 8.3, 1.1);
  },
};

// ---------------------------------------------------------------- outside world (a floating island of clouds and vendor buildings)
function outside(r: Pen, t: number) {
  const c = r.c, [cx, cy] = r.P(4.5, 0, 4.5), rx = 6.4 * 1.2247 * r.s, ry = 6.4 * 0.7071 * r.s;
  c.save(); c.shadowColor = "rgba(0,188,235,0.35)"; c.shadowBlur = r.s * 1.4;
  const g = c.createRadialGradient(cx, cy - ry * 0.3, rx * 0.1, cx, cy, rx); g.addColorStop(0, "#1a2c50"); g.addColorStop(1, "#0d1830");
  c.beginPath(); c.ellipse(cx, cy + 0.5 * r.s, rx, ry, 0, 0, 7); c.fillStyle = "#070d1c"; c.fill(); c.restore();
  c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, 0, 7); c.fillStyle = g; c.fill(); c.strokeStyle = "rgba(90,216,255,0.55)"; c.lineWidth = Math.max(1, r.s * 0.04); c.stroke();
  c.beginPath(); c.ellipse(cx, cy, rx * 0.66, ry * 0.66, 0, 0, 7); c.strokeStyle = "rgba(90,216,255,0.16)"; c.lineWidth = 1; c.stroke();
  // vendor buildings
  const tower = (x: number, z: number, w: number, h: number, col: string, win: string) => { r.box(x, z, w, w, h, col, 0, { sh: false }); for (let y = 0.3; y < h - 0.2; y += 0.42) for (let i = 0; i < 3; i++) { r.fz(z + w + 0.002, x + 0.14 + i * (w / 3.3), x + 0.14 + i * (w / 3.3) + w / 5.4, y, y + 0.22, Math.sin(i * 3 + y * 5 + t * 0.6) > 0.2 ? win : "rgba(255,255,255,0.14)"); } };
  tower(1.2, 1.8, 1.3, 2.6, "#33456e", "#9fd8ff"); tower(3.2, 0.9, 1.5, 3.6, "#3b4f7e", "#b9adff"); tower(5.6, 2.0, 1.2, 2.0, "#33456e", "#7fe3d2");
  const cloud = (x: number, z: number, y: number, s: number, ph: number) => { const yy = y + Math.sin(t * 0.5 + ph) * 0.14; r.disc(x + 0.3, z, 0.9 * s, "rgba(0,0,0,0.22)", null, 0.02); r.sph(x - 0.7 * s, z, yy, 0.52 * s, "#dfe8f7"); r.sph(x, z, yy + 0.2 * s, 0.72 * s, "#f3f7fd"); r.sph(x + 0.72 * s, z, yy, 0.56 * s, "#e6edf9"); r.sph(x + 0.2 * s, z + 0.3, yy - 0.1 * s, 0.5 * s, "#eef3fb"); };
  cloud(6.6, 6.0, 2.4, 1.0, 0); cloud(2.0, 6.4, 3.3, 0.8, 2); cloud(7.6, 2.6, 4.0, 0.7, 4);
}

// ---------------------------------------------------------------- campus
const LAYOUT: Record<number, [number, number][]> = {
  1: [[0, 10.4]],
  2: [[-3.4, 10.4], [3.4, 10.4]],
  3: [[-5.4, 10.8], [0, 9.2], [5.4, 10.8]],
  4: [[-3.0, 6.0], [3.0, 6.0], [-3.8, 13.2], [3.8, 13.2]],
  5: [[-3.0, 5.6], [3.0, 5.6], [-4.3, 13.4], [0, 13.9], [4.3, 13.4]],
  6: [[-4.6, 6.2], [0, 5.2], [4.6, 6.2], [-4.3, 13.4], [0, 13.9], [4.3, 13.4]],
};

export interface Zone extends ZoneSpec { y: number; act: number; tAct: number; hover: number; bake?: HTMLCanvasElement; bakeS: number; order: number }

export class Campus {
  zones = new Map<string, Zone>();
  mood = 0; tMood = 0; quiet = 0; sky = 1; tSky = 1;
  hoverId = "";
  constructor() {
    for (const z of ZONES) this.zones.set(z.id, { ...z, y: z.y ?? 0, act: 0, tAct: 0, hover: 0, bakeS: 0, order: z.x + z.z });
  }
  list() { return [...this.zones.values()].sort((a, b) => a.order - b.order); }
  positions(id: string, n: number): V3[] {
    const z = this.zones.get(id) ?? this.zones.get("office")!;
    return LAYOUT[clampN(n)].slice(0, n).concat(n > 6 ? LAYOUT[6] : []).slice(0, n).map(([d, sum]) => [z.x + (sum + d) / 2, z.y + 0.02, z.z + (sum - d) / 2] as V3);
  }
  corners(id: string): V3[] {
    const z = this.zones.get(id)!; return [[z.x, z.y + WALL + 0.4, z.z], [z.x + RS, z.y, z.z], [z.x, z.y, z.z + RS], [z.x + RS, z.y - 0.4, z.z + RS]];
  }
  setActive(ids: Set<string>) { for (const z of this.zones.values()) z.tAct = ids.has(z.id) ? 1 : 0; }
  /** Which room is under a screen point, given a projector from world to screen. */
  hit(px: number, py: number, pen: Pen): string {
    for (const z of this.list().reverse()) {
      const [ox, oy] = pen.P(z.x, z.y, z.z); const sx = (px - ox) / pen.s, sy = (py - oy) / pen.s;
      const a = sx / (2 * 0.8660254) + sy, b = sy - sx / (2 * 0.8660254);
      if (a >= 0 && a <= RS && b >= 0 && b <= RS) return z.id;
    }
    return "";
  }

  drawGround(pen: Pen, t: number) {
    const c = pen.c;
    const slab = (x: number, z: number, w: number, d: number, glow: string) => {
      const [gx, gy] = pen.P(x + w / 2, -1.2, z + d / 2);
      const g = c.createRadialGradient(gx, gy, 0, gx, gy, (w + d) * 0.62 * pen.s); g.addColorStop(0, glow); g.addColorStop(1, "rgba(0,0,0,0)");
      c.save(); c.translate(gx, gy); c.scale(1, 0.58); c.translate(-gx, -gy); c.fillStyle = g; c.beginPath(); c.arc(gx, gy, (w + d) * 0.62 * pen.s, 0, 7); c.fill(); c.restore();
      pen.box(x, z, w, d, 1.0, { t: "#121b2e", l: "#0c1423", r: "#080e1a", e: "rgba(70,100,160,0.35)" }, -1.42);
      pen.poly([[x, -0.42, z], [x + w, -0.42, z], [x + w, -0.42, z + d], [x, -0.42, z + d]], null, "rgba(120,160,235,0.3)", Math.max(1, pen.s * 0.03));
    };
    const glow = `rgba(${Math.round(20 + this.mood * -10)},${Math.round(70 + this.mood * 60)},${Math.round(150 + this.mood * 60)},${0.3 + this.mood * 0.12})`;
    slab(-1.3, -1.3, E + 2.6, E + 2.6, glow);
    slab(E + 3.3, -19.3, 11.6, 23.4, glow);
    // lanes: fibre from the network core to every room, lit when Cloud Control is on
    const m = G + RS / 2, n0 = RS / 2, n2 = 2 * G + RS / 2, e0 = G - 0.4, e1 = G + RS + 0.4;
    const lanes: V3[][] = [[[m, -0.4, e0], [m, -0.4, n0 + 4.5]], [[e0, -0.4, m], [n0 + 4.5, -0.4, m]], [[e1, -0.4, m], [n2 - 4.5, -0.4, m]], [[m, -0.4, e1], [m, -0.4, n2 - 4.5]],
      [[e0, -0.4, e0], [RS + 0.2, -0.4, RS + 0.2]], [[e1, -0.4, e0], [2 * G - 0.2, -0.4, RS + 0.2]], [[e0, -0.4, e1], [RS + 0.2, -0.4, 2 * G - 0.2]], [[e1, -0.4, e1], [2 * G - 0.2, -0.4, 2 * G - 0.2]]];
    for (const [i, l] of lanes.entries()) {
      pen.line(l, `rgba(${this.mood > 0.5 ? "0,188,235" : "120,150,210"},${0.16 + this.mood * 0.3})`, Math.max(1, pen.s * 0.05));
      const f = (t * 0.35 + i * 0.13) % 1, a = l[0], b = l[1];
      const p: V3 = [a[0] + (b[0] - a[0]) * f, -0.4, a[2] + (b[2] - a[2]) * f]; const [x, y] = pen.P(p[0], p[1], p[2]);
      c.beginPath(); c.arc(x, y, Math.max(1.2, pen.s * 0.07), 0, 7); c.fillStyle = `rgba(${this.mood > 0.5 ? "140,230,255" : "190,205,240"},${0.5 + this.mood * 0.4})`; c.fill();
    }
    // the road to remote care
    pen.line([[E + 1.3, -1.2, 8], [E + 3.3, -1.2, 3]], "rgba(120,150,210,0.4)", Math.max(1, pen.s * 0.05), [pen.s * 0.3, pen.s * 0.3]);
    this.plaza(pen.at(2 * G, 2 * G, -0.42), t);
  }

  private plaza(r: Pen, t: number) {
    const c = r.c;
    r.poly([[0.2, 0, 0.2], [9, 0, 0.2], [9, 0, 9], [0.2, 0, 9]], "#16223a", "rgba(120,160,235,0.18)", 1);
    // driveway
    r.poly([[0.2, 0.002, 3.2], [9, 0.002, 3.2], [9, 0.002, 5.6], [0.2, 0.002, 5.6]], "#1f2e4d");
    r.line([[0.6, 0.004, 4.4], [8.6, 0.004, 4.4]], "rgba(255,255,255,0.35)", Math.max(1, r.s * 0.04), [r.s * 0.4, r.s * 0.4]);
    // helipad
    r.disc(6.6, 7.4, 1.25, "#1f2e4d", "rgba(255,255,255,0.5)", 0.003, Math.max(1, r.s * 0.05)); r.gtext("H", 6.25, 7.75, 0.9, "rgba(255,255,255,0.75)", { weight: 800, ls: 0 });
    // lawn
    r.poly([[0.5, 0.003, 6.2], [4.6, 0.003, 6.2], [4.6, 0.003, 8.7], [0.5, 0.003, 8.7]], "#17413f"); r.poly([[0.5, 0.003, 0.5], [8.7, 0.003, 0.5], [8.7, 0.003, 2.6], [0.5, 0.003, 2.6]], "#17413f");
    tree(r, 1.2, 1.2, 1.0); tree(r, 3.4, 1.7, 0.8); tree(r, 6.0, 1.3, 1.1); tree(r, 8.0, 1.8, 0.85); tree(r, 1.3, 7.2, 1.0); tree(r, 3.6, 8.0, 0.8);
    // ambulance on the driveway
    const ax = 2.2 + ((Math.sin(t * 0.25) + 1) / 2) * 0.6;
    r.shadow(ax, 3.5, 3.3, 1.25, 0, 0.4);
    [[0.6, 3.5], [2.6, 3.5]].forEach(([dx, z]) => r.circ("z", z + 1.26, ax + dx, 0.3, 0.3, "#0b1220"));
    r.box(ax, 3.5, 2.35, 1.25, 1.2, "#f4f7fb", 0.28); r.box(ax + 2.35, 3.5, 0.95, 1.25, 0.85, "#f4f7fb", 0.28);
    r.fx(ax + 3.301, 3.62, 4.63, 0.72, 1.08, "#7fb8e6"); r.fz(4.751, ax + 2.45, ax + 3.15, 0.74, 1.08, "#7fb8e6");
    r.fz(4.751, ax + 0.1, ax + 2.3, 0.62, 0.8, "#e11d48"); r.fz(4.752, ax + 0.9, ax + 1.02, 0.98, 1.3, C.blue); r.fz(4.752, ax + 0.8, ax + 1.12, 1.08, 1.2, C.blue);
    const on = Math.sin(t * 9) > 0; c.save(); c.shadowColor = on ? "#ff4d5e" : "#2f6bff"; c.shadowBlur = r.s * 0.8; r.box(ax + 2.0, 3.85, 0.3, 0.55, 0.14, on ? "#ff4d5e" : "#2f6bff", 1.48, { edge: false }); c.restore();
    // totem sign
    r.box(8.0, 8.0, 0.5, 0.5, 2.4, "#0e3a5c", 0, { sh: false }); c.save(); c.shadowColor = C.cyan; c.shadowBlur = r.s * 0.5; r.fz(8.502, 8.06, 8.44, 1.5, 2.2, "#eaf7ff"); c.restore(); r.wtext("H", 8.12, 1.86, 8.504, 0.5, "#0e3a5c", 800);
  }

  /** Draw every room back to front. Rooms are baked to bitmaps at the current zoom and re-baked when the camera settles. */
  drawZones(pen: Pen, t: number, dpr: number, settled: boolean) {
    const c = pen.c; let baked = false;
    for (const z of this.list()) {
      const live = z.kind === "sky";
      const [ox, oy] = pen.P(z.x, z.y, z.z);
      if (live) { if (this.sky < 0.02) continue; c.globalAlpha = this.sky; outside(pen.at(z.x, z.z, z.y), t); c.globalAlpha = 1; }
      else {
        const want = pen.s * dpr;
        if (!z.bake || (settled && !baked && Math.abs(Math.log(want / z.bakeS)) > 0.04)) { this.bake(z, want); baked = true; }
        const k = pen.s / (z.bakeS / dpr) / dpr, bw = z.bake!.width * k, bh = z.bake!.height * k;
        const dimA = (1 - Math.max(z.act, z.hover)) * this.quiet;
        // a soft shadow grounds the room on the plinth
        pen.poly([[z.x + 0.5, z.y - 0.41, z.z + RS + 0.45], [z.x + RS + 0.5, z.y - 0.41, z.z + RS + 0.45], [z.x + RS + 0.5, z.y - 0.41, z.z + 0.2], [z.x + RS, z.y - 0.41, z.z], [z.x, z.y - 0.41, z.z + RS]], "rgba(2,5,12,0.5)");
        c.imageSmoothingQuality = "high";
        c.globalAlpha = 1 - dimA * 0.62;
        c.drawImage(z.bake!, ox - (RS * 0.8660254 + 0.8) * pen.s, oy - 3.4 * pen.s, bw, bh);
        c.globalAlpha = 1;
        if (dimA < 0.6) this.live(pen.at(z.x, z.z, z.y), z.id, t);
      }
      if (z.act > 0.02 || z.hover > 0.02) {
        const col = this.mood > 0.5 ? "0,188,235" : "255,180,84", a = Math.max(z.act, z.hover * 0.7);
        c.save(); c.shadowColor = `rgba(${col},${0.9 * a})`; c.shadowBlur = pen.s * 0.5;
        pen.line([[z.x, z.y, z.z + RS], [z.x + RS, z.y, z.z + RS], [z.x + RS, z.y, z.z]], `rgba(${col},${0.95 * a})`, Math.max(1.5, pen.s * 0.07));
        pen.line([[z.x, z.y + WALL, z.z + RS], [z.x, z.y + WALL, z.z], [z.x + RS, z.y + WALL, z.z]], `rgba(${col},${0.8 * a})`, Math.max(1, pen.s * 0.045));
        c.restore();
      }
      // floor label, painted along the front edge
      const la = z.kind === "sky" ? 0.5 + z.act * 0.5 : 0.42 + Math.max(z.act, z.hover) * 0.58;
      if (z.kind === "sky") { if (this.sky > 0.5) pen.gtext(z.label.toUpperCase(), z.x + 1.0, z.z + 10.4, 0.52, `rgba(190,225,255,${la})`, { y: z.y, weight: 700 }); }
      else pen.gtext(z.label.toUpperCase(), z.x + 0.15, z.z + RS + 0.95, 0.5, `rgba(${z.act > 0.5 ? (this.mood > 0.5 ? "150,230,255" : "255,214,160") : "150,170,210"},${la})`, { y: z.y - 0.42, weight: 700 });
    }
  }

  private silhouette(z: Zone): V3[] {
    const { x, y, z: Z } = z; const H = WALL + 0.02;
    return [[x, y - 0.4, Z + RS], [x + RS, y - 0.4, Z + RS], [x + RS, y - 0.4, Z], [x + RS, y + H, Z], [x, y + H, Z], [x, y + H, Z + RS]];
  }

  private bake(z: Zone, S: number) {
    const cv = z.bake ?? document.createElement("canvas");
    cv.width = Math.ceil((RS * 2 * 0.8660254 + 1.6) * S); cv.height = Math.ceil((3.4 + RS + 0.9) * S);
    const c = cv.getContext("2d")!; c.clearRect(0, 0, cv.width, cv.height);
    const r = new Pen(c, S, (RS * 0.8660254 + 0.8) * S, 3.4 * S);
    const items: [number, () => void][] = [];
    const k: Ctx = { r, q: (key, fn) => items.push([key, fn]), t: 0 };
    ROOMS[z.id]?.(k);
    items.sort((a, b) => a[0] - b[0]).forEach((i) => i[1]());
    z.bake = cv; z.bakeS = S;
  }

  /** Small moving details drawn live over a baked room. */
  private live(r: Pen, id: string, t: number) {
    const c = r.c, blink = (p: number, sp = 3) => Math.sin(t * sp + p) > 0;
    if (id === "dc" || id === "net") {
      for (let i = 0; i < 10; i++) { const x = 1.14 + ((i * 0.88) % 7) + (id === "net" ? 0.07 * i : 0), y = 0.22 + ((i * 5) % 9) * 0.17; if (blink(i * 2.1, 4 + (i % 3))) r.fz(1.905, x, x + 0.06, y, y + 0.05, id === "dc" ? "#b8ffe0" : "#bff3ff"); }
    }
    if (id === "ward") { [2.62, 5.22, 7.82].forEach((x, i) => { const u = (t * 0.9 + i * 0.3) % 1; const [px, py] = r.P(x - 0.22 + u * 0.44, 1.36, 0.853); c.beginPath(); c.arc(px, py, Math.max(1, r.s * 0.035), 0, 7); c.fillStyle = i === 2 ? "#ffd27a" : "#9dffcf"; c.fill(); }); }
    if (id === "plant") { [0, 1].forEach((i) => { const x = 0.9 + i * 2.9; [0.65, 1.75].forEach((dx, n) => { for (let b = 0; b < 3; b++) { const a = t * 3 + i + n + (b * Math.PI * 2) / 3; r.line([[x + dx, 1.366, 1.55], [x + dx + Math.cos(a) * 0.36, 1.366, 1.55 + Math.sin(a) * 0.36]], "rgba(225,232,245,0.9)", Math.max(1, r.s * 0.05)); } }); }); }
    if (id === "net" || id === "clinic") { const [x, z] = id === "net" ? [7.7, 7.7] : [8.3, 8.3]; for (let i = 0; i < 2; i++) { const f = (t * 0.5 + i * 0.5) % 1; r.disc(x, z, 0.4 + f * 1.4, null, `rgba(0,188,235,${(1 - f) * 0.5})`, 2.02, Math.max(1, r.s * 0.03)); } }
  }

  update(dt: number, k: number) {
    this.mood += (this.tMood - this.mood) * (1 - Math.exp(-2.4 * k * dt)); this.sky += (this.tSky - this.sky) * (1 - Math.exp(-5 * k * dt));
    for (const z of this.zones.values()) { z.act += (z.tAct - z.act) * (1 - Math.exp(-5 * k * dt)); z.hover += ((this.hoverId === z.id ? 1 : 0) - z.hover) * (1 - Math.exp(-10 * k * dt)); }
  }
}
const clampN = (n: number) => Math.max(1, Math.min(6, n));
