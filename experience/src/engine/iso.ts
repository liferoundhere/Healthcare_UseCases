/**
 * A small isometric vector renderer on Canvas 2D.
 * World axes: x runs down-right, z runs down-left, y is up. Light comes from the upper left,
 * so a box shows three tones: top (lightest), the +z face (mid) and the +x face (darkest).
 */
export const IX = 0.8660254, IY = 0.5;
export type V3 = [number, number, number];
export const iso = (x: number, y: number, z: number): [number, number] => [(x - z) * IX, (x + z) * IY - y];

export const SHOT = new URLSearchParams(location.search).has("shot");
export const K = SHOT ? 400 : 1;
export const damp = (cur: number, target: number, k: number, dt: number) => cur + (target - cur) * (1 - Math.exp(-k * dt));
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

// ---------------------------------------------------------------- colour
const cache = new Map<string, Pal>();
export interface Pal { t: string; l: string; r: string; e: string }
export function rgb(hex: string): [number, number, number] { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
export function mul(hex: string, f: number): string {
  const [r, g, b] = rgb(hex);
  const m = (v: number) => Math.round(f <= 1 ? v * f : v + (255 - v) * (f - 1));
  return `rgb(${m(r)},${m(g)},${m(b)})`;
}
export function rgba(hex: string, a: number) { const [r, g, b] = rgb(hex); return `rgba(${r},${g},${b},${a})`; }
export function mix(a: string, b: string, k: number) { const A = rgb(a), B = rgb(b); return `rgb(${Math.round(A[0] + (B[0] - A[0]) * k)},${Math.round(A[1] + (B[1] - A[1]) * k)},${Math.round(A[2] + (B[2] - A[2]) * k)})`; }
/** Three-tone palette for a base colour. Cool-shifted shadows keep the model looking like lit porcelain. */
export function tone(base: string): Pal {
  let p = cache.get(base);
  if (!p) {
    const [r, g, b] = rgb(base);
    const sh = (f: number, cool: number) => `rgb(${Math.round(r * f - cool)},${Math.round(g * f - cool * 0.4)},${Math.round(Math.min(255, b * f + cool * 0.6))})`;
    p = { t: base, l: sh(0.875, 6), r: sh(0.74, 10), e: sh(0.6, 12) };
    cache.set(base, p);
  }
  return p;
}

export const C = {
  bg: "#050810", ink: "#0d1524", navy: "#1c2a47", slate: "#2b3a5c", steel: "#93a1ba", grey: "#c7cfdd", porc: "#eef2f8", white: "#ffffff", wall: "#e6ebf4",
  cyan: "#00bceb", cyan2: "#5ad8ff", blue: "#2f6bff", teal: "#17b6a4", green: "#2fd28f", amber: "#ffb020", orange: "#ff8a4c", red: "#ff4d5e", violet: "#9d8cff", pink: "#ff7ab8",
  wood: "#d8b68c", warm: "#efe2cf", leaf: "#2f9e7a", leaf2: "#1f7f68", skin1: "#f0c8a4", skin2: "#c58a5c", skin3: "#8a5a3c",
};

// ---------------------------------------------------------------- pen
export class Pen {
  constructor(public c: CanvasRenderingContext2D, public s = 1, public ox = 0, public oy = 0, private wx = 0, private wy = 0, private wz = 0) {}
  /** A pen whose origin sits at a world offset (room-local drawing). */
  at(x: number, z: number, y = 0) { return new Pen(this.c, this.s, this.ox, this.oy, this.wx + x, this.wy + y, this.wz + z); }
  P(x: number, y: number, z: number): [number, number] {
    const X = x + this.wx, Y = y + this.wy, Z = z + this.wz;
    return [this.ox + (X - Z) * IX * this.s, this.oy + ((X + Z) * IY - Y) * this.s];
  }
  path(pts: V3[]) { const c = this.c; c.beginPath(); pts.forEach((p, i) => { const [x, y] = this.P(p[0], p[1], p[2]); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath(); }
  poly(pts: V3[], fill?: string | CanvasGradient | null, stroke?: string | null, lw = 1) {
    const c = this.c; this.path(pts);
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw; c.lineJoin = "round"; c.stroke(); }
  }
  line(pts: V3[], stroke: string, lw = 1, dash?: number[]) {
    const c = this.c; c.beginPath(); pts.forEach((p, i) => { const [x, y] = this.P(p[0], p[1], p[2]); i ? c.lineTo(x, y) : c.moveTo(x, y); });
    c.strokeStyle = stroke; c.lineWidth = lw; c.lineCap = "round"; c.lineJoin = "round"; if (dash) c.setLineDash(dash); c.stroke(); if (dash) c.setLineDash([]);
  }
  /** Soft contact shadow under a footprint. */
  shadow(x: number, z: number, w: number, d: number, y = 0, a = 0.16) {
    const g = 0.14, o = 0.22;
    this.poly([[x - g + o, y + 0.005, z - g - o * 0.4], [x + w + g + o, y + 0.005, z - g - o * 0.4], [x + w + g + o, y + 0.005, z + d + g], [x - g + o, y + 0.005, z + d + g]], `rgba(24,38,74,${a})`);
  }
  /** Axis-aligned box. (x,z) is the far corner, w runs along x, d along z, h up from y. */
  box(x: number, z: number, w: number, d: number, h: number, col: string | Pal, y = 0, o: { sh?: boolean; edge?: boolean; top?: string | CanvasGradient } = {}) {
    const p = typeof col === "string" ? tone(col) : col;
    if (o.sh) this.shadow(x, z, w, d, y);
    const e = o.edge === false ? null : p.e, lw = Math.max(0.5, this.s * 0.012);
    this.poly([[x + w, y, z], [x + w, y, z + d], [x + w, y + h, z + d], [x + w, y + h, z]], p.r, e, lw);
    this.poly([[x, y, z + d], [x + w, y, z + d], [x + w, y + h, z + d], [x, y + h, z + d]], p.l, e, lw);
    this.poly([[x, y + h, z], [x + w, y + h, z], [x + w, y + h, z + d], [x, y + h, z + d]], o.top ?? p.t, e, lw);
  }
  /** Upright cylinder. */
  cyl(cx: number, cz: number, r: number, h: number, col: string | Pal, y = 0, o: { sh?: boolean; top?: string } = {}) {
    const p = typeof col === "string" ? tone(col) : col, c = this.c;
    if (o.sh) this.disc(cx + 0.18, cz - 0.08, r * 1.12, "rgba(24,38,74,0.16)", null, y + 0.005);
    const [bx, by] = this.P(cx, y, cz), [, ty] = this.P(cx, y + h, cz);
    const rx = r * 1.2247 * this.s, ry = r * 0.7071 * this.s;
    const g = c.createLinearGradient(bx - rx, 0, bx + rx, 0); g.addColorStop(0, p.l); g.addColorStop(0.55, p.l); g.addColorStop(1, p.r);
    c.beginPath(); c.moveTo(bx - rx, ty); c.lineTo(bx - rx, by); c.ellipse(bx, by, rx, ry, 0, Math.PI, 0, true); c.lineTo(bx + rx, ty); c.ellipse(bx, ty, rx, ry, 0, 0, Math.PI, false); c.closePath();
    c.fillStyle = g; c.fill(); c.strokeStyle = p.e; c.lineWidth = Math.max(0.5, this.s * 0.012); c.stroke();
    c.beginPath(); c.ellipse(bx, ty, rx, ry, 0, 0, Math.PI * 2); c.fillStyle = o.top ?? p.t; c.fill(); c.stroke();
  }
  /** Flat disc lying on a horizontal plane. */
  disc(cx: number, cz: number, r: number, fill?: string | CanvasGradient | null, stroke?: string | null, y = 0, lw = 1) {
    const c = this.c, [x, yy] = this.P(cx, y, cz);
    c.beginPath(); c.ellipse(x, yy, r * 1.2247 * this.s, r * 0.7071 * this.s, 0, 0, Math.PI * 2);
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); }
  }
  sph(cx: number, cz: number, y: number, r: number, col: string) {
    const c = this.c, [x, yy] = this.P(cx, y, cz), R = r * this.s;
    const g = c.createRadialGradient(x - R * 0.35, yy - R * 0.4, R * 0.1, x, yy, R); g.addColorStop(0, mul(col, 1.35)); g.addColorStop(0.7, col); g.addColorStop(1, mul(col, 0.78));
    c.beginPath(); c.arc(x, yy, R, 0, Math.PI * 2); c.fillStyle = g; c.fill();
  }
  /** Rectangle on a plane of constant z (faces +z, the mid tone side). */
  fz(z: number, x0: number, x1: number, y0: number, y1: number, fill?: string | CanvasGradient | null, stroke?: string | null, lw = 1) { this.poly([[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], fill, stroke, lw); }
  /** Rectangle on a plane of constant x (faces +x, the dark side). */
  fx(x: number, z0: number, z1: number, y0: number, y1: number, fill?: string | CanvasGradient | null, stroke?: string | null, lw = 1) { this.poly([[x, y0, z0], [x, y0, z1], [x, y1, z1], [x, y1, z0]], fill, stroke, lw); }
  /** Circle drawn on a plane of constant z or x. */
  circ(plane: "z" | "x", k: number, a: number, cy: number, r: number, fill?: string | null, stroke?: string | null, lw = 1) {
    const c = this.c, [x, y] = plane === "z" ? this.P(a, cy, k) : this.P(k, cy, a);
    c.save(); c.translate(x, y); c.transform(plane === "z" ? IX : -IX, IY, 0, -1, 0, 0);
    c.beginPath(); c.arc(0, 0, r * this.s, 0, Math.PI * 2);
    if (fill) { c.fillStyle = fill; c.fill(); }
    c.restore();
    if (stroke) { c.save(); c.translate(x, y); c.transform(plane === "z" ? IX : -IX, IY, 0, -1, 0, 0); c.beginPath(); c.arc(0, 0, r * this.s, 0, Math.PI * 2); c.restore(); c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); }
  }
  /** Text painted flat on the ground, reading along the x axis (down-right) or z axis (down-left, mirrored to stay legible). */
  gtext(str: string, x: number, z: number, size: number, fill: string, o: { along?: "x" | "z"; align?: CanvasTextAlign; y?: number; weight?: number; ls?: number; font?: string } = {}) {
    const c = this.c, [px, py] = this.P(x, o.y ?? 0.01, z);
    c.save(); c.translate(px, py);
    if ((o.along ?? "x") === "x") c.transform(IX, IY, -IX, IY, 0, 0); else c.transform(-IX, IY, -IX, -IY, 0, 0);
    c.font = `${o.weight ?? 600} ${size * this.s}px ${o.font ?? "Inter, system-ui, sans-serif"}`; c.fillStyle = fill; c.textAlign = o.align ?? "left"; c.textBaseline = "middle";
    try { (c as unknown as { letterSpacing: string }).letterSpacing = `${(o.ls ?? 0.08) * size * this.s}px`; } catch { /* older browsers */ }
    c.fillText(str, 0, 0); c.restore();
  }
  /** Text on a wall of constant z. */
  wtext(str: string, x: number, y: number, z: number, size: number, fill: string, weight = 700) {
    const c = this.c, [px, py] = this.P(x, y, z);
    c.save(); c.translate(px, py); c.transform(IX, IY, 0, 1, 0, 0);
    c.font = `${weight} ${size * this.s}px Inter, system-ui, sans-serif`; c.fillStyle = fill; c.textBaseline = "middle";
    try { (c as unknown as { letterSpacing: string }).letterSpacing = `${0.1 * size * this.s}px`; } catch { /* */ }
    c.fillText(str, 0, 0); c.restore();
  }
}

// ---------------------------------------------------------------- stage
export interface Cam { x: number; y: number; s: number }

export class Stage {
  canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; labels: HTMLDivElement;
  cam: Cam = { x: 0, y: 6, s: 12 }; tcam: Cam = { x: 0, y: 6, s: 12 };
  user = { dx: 0, dy: 0, zoom: 1 };
  safe = { top: 0.12, bottom: 0.3, left: 0.02, right: 0.02 };
  dpr = 1; w = 1; h = 1; time = 0; speed = 2.6; maxS = 46;
  pointer = { x: -1, y: -1, down: false, moved: false };
  private last = performance.now();
  private tickers: ((dt: number, t: number) => void)[] = [];
  private drawers: ((pen: Pen, t: number, dt: number) => void)[] = [];
  onClick?: (x: number, y: number) => void;

  constructor(public host: HTMLElement) {
    this.canvas = document.createElement("canvas"); this.canvas.className = "gl"; host.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;
    this.labels = document.createElement("div"); this.labels.className = "labels"; host.appendChild(this.labels);
    this.bind();
    new ResizeObserver(() => this.resize()).observe(host); this.resize();
    requestAnimationFrame(this.loop);
  }
  onTick(fn: (dt: number, t: number) => void) { this.tickers.push(fn); }
  onDraw(fn: (pen: Pen, t: number, dt: number) => void) { this.drawers.push(fn); }
  setSafe(top: number, bottom: number, left: number, right: number) { this.safe = { top, bottom, left, right }; }

  /** World point to CSS pixels. */
  toScreen(x: number, y: number, z: number): [number, number] {
    const [sx, sy] = iso(x, y, z), s = this.cam.s * this.user.zoom;
    return [this.w / 2 + (sx - this.cam.x) * s + this.user.dx, this.h / 2 + (sy - this.cam.y) * s + this.user.dy];
  }
  get scale() { return this.cam.s * this.user.zoom; }

  /** Fit world points into the area the interface leaves free. Padding is in CSS pixels. */
  frame(pts: V3[], o: { pad?: [number, number, number, number]; maxS?: number; minS?: number } = {}) {
    if (!pts.length) return;
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of pts) { const [sx, sy] = iso(p[0], p[1], p[2]); x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy); }
    const [pt, pr, pb, pl] = o.pad ?? [40, 40, 40, 40];
    const L = this.w * this.safe.left + pl, R = this.w * (1 - this.safe.right) - pr, T = this.h * this.safe.top + pt, B = this.h * (1 - this.safe.bottom) - pb;
    const s = clamp(Math.min((R - L) / Math.max(1, x1 - x0), (B - T) / Math.max(1, y1 - y0)), o.minS ?? 6, o.maxS ?? this.maxS);
    // Place the box centre at the centre of the free area.
    this.tcam = { s, x: (x0 + x1) / 2 - ((L + R) / 2 - this.w / 2) / s, y: (y0 + y1) / 2 - ((T + B) / 2 - this.h / 2) / s };
    this.user = { dx: 0, dy: 0, zoom: 1 };
  }
  snap() { this.cam = { ...this.tcam }; }

  private bind() {
    const el = this.canvas; let lx = 0, ly = 0;
    el.addEventListener("pointerdown", (e) => { this.pointer.down = true; this.pointer.moved = false; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); });
    el.addEventListener("pointerup", (e) => { this.pointer.down = false; el.releasePointerCapture(e.pointerId); if (!this.pointer.moved) this.onClick?.(e.offsetX, e.offsetY); });
    el.addEventListener("pointermove", (e) => {
      this.pointer.x = e.offsetX; this.pointer.y = e.offsetY;
      if (!this.pointer.down) return;
      if (Math.abs(e.clientX - lx) + Math.abs(e.clientY - ly) > 3) this.pointer.moved = true;
      if (this.pointer.moved) { this.user.dx += e.clientX - lx; this.user.dy += e.clientY - ly; lx = e.clientX; ly = e.clientY; }
    });
    el.addEventListener("pointerleave", () => { this.pointer.x = -1; this.pointer.y = -1; });
    el.addEventListener("wheel", (e) => {
      e.preventDefault();
      const z0 = this.user.zoom, z1 = clamp(z0 * (1 - e.deltaY * 0.0012), 0.5, 3.2), k = z1 / z0;
      // Zoom about the pointer.
      this.user.dx = e.offsetX - this.w / 2 - (e.offsetX - this.w / 2 - this.user.dx) * k; this.user.dy = e.offsetY - this.h / 2 - (e.offsetY - this.h / 2 - this.user.dy) * k; this.user.zoom = z1;
    }, { passive: false });
    el.addEventListener("dblclick", () => { this.user = { dx: 0, dy: 0, zoom: 1 }; });
  }

  resize() {
    this.w = Math.max(2, this.host.clientWidth); this.h = Math.max(2, this.host.clientHeight);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.w * this.dpr); this.canvas.height = Math.round(this.h * this.dpr);
  }

  private loop = () => {
    const now = performance.now(), dt = Math.min(0.05, (now - this.last) / 1000); this.last = now; this.time += dt;
    for (const f of this.tickers) f(dt, this.time);
    const k = this.speed * K;
    this.cam.x = damp(this.cam.x, this.tcam.x, k, dt); this.cam.y = damp(this.cam.y, this.tcam.y, k, dt);
    this.cam.s = Math.exp(damp(Math.log(this.cam.s), Math.log(this.tcam.s), k, dt));
    const c = this.ctx; c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const s = this.scale;
    const pen = new Pen(c, s, this.w / 2 - this.cam.x * s + this.user.dx, this.h / 2 - this.cam.y * s + this.user.dy);
    for (const d of this.drawers) d(pen, this.time, dt);
    requestAnimationFrame(this.loop);
  };
}

/** Rounded rectangle path. */
export function rr(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
