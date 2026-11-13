import { drawIcon } from "./icons";
import type { Aud, ClockDef, LinkDef, NodeDef, SceneDef, St, ZoneDef } from "./types";

export const WORLD_W = 1600;
export const WORLD_H = 900;

export const STATE_HEX: Record<St, string> = {
  ok: "#34d399",
  warn: "#fbbf24",
  down: "#fb7185",
  pending: "#60a5fa",
  unknown: "#64748b",
  idle: "#334155",
  off: "#334155",
};

const CISCO_BLUE = "#049fd9";
const NS = 1.3;

type RGB = [number, number, number];

const rgb = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const css = (c: RGB, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

interface NodeRT {
  def: NodeDef;
  label: string;
  state: St;
  color: RGB;
  alpha: number;
  targetAlpha: number;
  bump: number;
}

interface LinkRT {
  def: LinkDef;
  state: St;
  color: RGB;
  alpha: number;
  targetAlpha: number;
  acc: number;
}

interface ZoneRT {
  def: ZoneDef;
  alpha: number;
  targetAlpha: number;
}

interface Particle {
  link: LinkRT;
  t: number;
  speed: number;
  state: St;
}

interface Ripple {
  x: number;
  y: number;
  life: number;
  color: RGB;
}

interface Pt {
  x: number;
  y: number;
}

export class Engine {
  private ctx: CanvasRenderingContext2D;
  private dpr = 1;
  private vw = 0;
  private vh = 0;
  private scene: SceneDef | null = null;
  private nodes = new Map<string, NodeRT>();
  private links = new Map<string, LinkRT>();
  private zones = new Map<string, ZoneRT>();
  private particles: Particle[] = [];
  private ripples: Ripple[] = [];
  private cam = { x: 0, y: 0, w: WORLD_W, h: WORLD_H };
  private camT = { x: 0, y: 0, w: WORLD_W, h: WORLD_H };
  private callout: { node: string; text: string } | null = null;
  private calloutAlpha = 0;
  private last = performance.now();
  private time = 0;
  private clockStart = 0;
  private hover: string | null = null;

  aud: Aud = "exec";
  clock: ClockDef | null = null;
  onHover: ((node: NodeDef | null, x: number, y: number) => void) | null = null;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
    new ResizeObserver(() => this.resize()).observe(canvas.parentElement!);
    this.resize();
    canvas.addEventListener("mousemove", (e) => this.move(e));
    canvas.addEventListener("mouseleave", () => {
      this.hover = null;
      this.onHover?.(null, 0, 0);
    });
    requestAnimationFrame(this.frame);
  }

  private resize() {
    const r = this.canvas.parentElement!.getBoundingClientRect();
    this.dpr = window.devicePixelRatio || 1;
    this.vw = r.width;
    this.vh = r.height;
    this.canvas.width = Math.max(1, Math.round(r.width * this.dpr));
    this.canvas.height = Math.max(1, Math.round(r.height * this.dpr));
    this.canvas.style.width = `${r.width}px`;
    this.canvas.style.height = `${r.height}px`;
  }

  load(scene: SceneDef) {
    this.scene = scene;
    this.nodes.clear();
    this.links.clear();
    this.zones.clear();
    this.particles = [];
    this.ripples = [];
    for (const n of scene.nodes) {
      this.nodes.set(n.id, {
        def: n,
        label: "",
        state: "ok",
        color: rgb(STATE_HEX.ok),
        alpha: 0,
        targetAlpha: 0,
        bump: 0,
      });
    }
    for (const l of scene.links) {
      this.links.set(l.id, {
        def: l,
        state: "idle",
        color: rgb(STATE_HEX.idle),
        alpha: 0,
        targetAlpha: 0,
        acc: Math.random(),
      });
    }
    for (const z of scene.zones) {
      this.zones.set(z.id, { def: z, alpha: 0, targetAlpha: 0 });
    }
    this.apply(0, true);
  }

  go(index: number) {
    this.apply(index, false);
  }

  private apply(index: number, instant: boolean) {
    const scene = this.scene!;
    const ns = new Map<string, St>();
    const vis = new Map<string, boolean>();
    const ls = new Map<string, St>();
    for (const n of scene.nodes) {
      ns.set(n.id, "ok");
      vis.set(n.id, !n.hidden);
    }
    for (const z of scene.zones) vis.set(z.id, !z.hidden);
    for (const l of scene.links) ls.set(l.id, "idle");

    let clock: ClockDef | null = null;
    const labels = new Map<string, string>();
    for (let s = 0; s <= index; s++) {
      const st = scene.steps[s];
      for (const [k, v] of Object.entries(st.n ?? {})) ns.set(k, v);
      for (const [k, v] of Object.entries(st.label ?? {})) labels.set(k, v);
      for (const [k, v] of Object.entries(st.l ?? {})) ls.set(k, v);
      for (const id of st.show ?? []) vis.set(id, true);
      for (const id of st.hide ?? []) vis.set(id, false);
      if (st.clock) clock = st.clock;
    }

    const nextClock = clock && clock.mode !== "hide" ? clock : null;
    if (
      !this.clock ||
      !nextClock ||
      this.clock.label !== nextClock.label ||
      this.clock.mode !== nextClock.mode
    ) {
      this.clockStart = this.time;
    }
    this.clock = nextClock;

    for (const rt of this.nodes.values()) {
      const s = ns.get(rt.def.id) ?? "ok";
      const visible = vis.get(rt.def.id) ?? true;
      if (!instant && s !== rt.state && rt.alpha > 0.5) {
        this.ripples.push({ x: rt.def.x, y: rt.def.y, life: 1, color: rgb(STATE_HEX[s]) });
        rt.bump = 1;
      }
      if (!instant && visible && rt.alpha < 0.1) rt.bump = 1;
      rt.state = s;
      rt.label = labels.get(rt.def.id) ?? "";
      rt.targetAlpha = visible ? 1 : 0;
      if (instant) {
        rt.color = rgb(STATE_HEX[s]);
        rt.alpha = rt.targetAlpha;
      }
    }

    for (const rt of this.links.values()) {
      const s = ls.get(rt.def.id) ?? "idle";
      const visible = s !== "off" && (vis.get(rt.def.a) ?? true) && (vis.get(rt.def.b) ?? true);
      rt.state = s;
      rt.targetAlpha = visible ? 1 : 0;
      if (instant) {
        rt.color = rgb(STATE_HEX[s]);
        rt.alpha = rt.targetAlpha;
      }
    }

    for (const rt of this.zones.values()) {
      rt.targetAlpha = vis.get(rt.def.id) ? 1 : 0;
      if (instant) rt.alpha = rt.targetAlpha;
    }

    this.particles = this.particles.filter((p) => p.link.targetAlpha > 0);

    const step = scene.steps[index];
    this.callout = step.callout ?? null;
    this.calloutAlpha = 0;
    const fit = this.visibleBounds(vis);
    if (step.focus) {
      const w = fit.w / step.focus.zoom;
      const h = fit.h / step.focus.zoom;
      this.camT = { x: step.focus.x - w / 2, y: step.focus.y - h / 2, w, h };
    } else {
      this.camT = fit;
    }
    if (instant) this.cam = { ...this.camT };
  }

  private visibleBounds(vis: Map<string, boolean>) {
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const z of this.scene!.zones) {
      if (!vis.get(z.id)) continue;
      x0 = Math.min(x0, z.x);
      y0 = Math.min(y0, z.y);
      x1 = Math.max(x1, z.x + z.w);
      y1 = Math.max(y1, z.y + z.h);
    }
    for (const n of this.scene!.nodes) {
      if (!vis.get(n.id)) continue;
      const r = (n.r ?? 30) * NS;
      x0 = Math.min(x0, n.x - r - 80);
      y0 = Math.min(y0, n.y - r);
      x1 = Math.max(x1, n.x + r + 80);
      y1 = Math.max(y1, n.y + r + 60);
    }
    if (!isFinite(x0)) return { x: 0, y: 0, w: WORLD_W, h: WORLD_H };
    const padX = 40;
    const padTop = 70;
    const padBottom = 30;
    return { x: x0 - padX, y: y0 - padTop, w: x1 - x0 + padX * 2, h: y1 - y0 + padTop + padBottom };
  }

  clockText(): string {
    if (!this.clock) return "";
    if (this.clock.mode === "stop") return this.clock.value ?? "00:00";
    const minutes = Math.floor((this.time - this.clockStart) * 6);
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  private transform() {
    const s = Math.min(this.vw / this.cam.w, this.vh / this.cam.h, (this.vw / WORLD_W) * 1.9);
    const ox = this.vw / 2 - (this.cam.x + this.cam.w / 2) * s;
    const oy = this.vh / 2 - (this.cam.y + this.cam.h / 2) * s;
    return { s, ox, oy };
  }

  private move(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const { s, ox, oy } = this.transform();
    const wx = (mx - ox) / s;
    const wy = (my - oy) / s;
    let best: NodeRT | null = null;
    let bestD = Infinity;
    for (const rt of this.nodes.values()) {
      if (rt.alpha < 0.5) continue;
      const r = (rt.def.r ?? 30) * NS + 10;
      const d = Math.hypot(rt.def.x - wx, rt.def.y - wy);
      if (d < r && d < bestD) {
        best = rt;
        bestD = d;
      }
    }
    const id = best?.def.id ?? null;
    if (id !== this.hover) {
      this.hover = id;
      this.canvas.style.cursor = id ? "pointer" : "default";
    }
    this.onHover?.(best?.def ?? null, mx, my);
  }

  private ctrl(a: Pt, b: Pt, bend: number): Pt {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: mx + (-dy / len) * bend * len, y: my + (dx / len) * bend * len };
  }

  private bez(a: Pt, c: Pt, b: Pt, t: number): Pt {
    const u = 1 - t;
    return {
      x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
      y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
    };
  }

  private ends(rt: LinkRT) {
    const a = this.nodes.get(rt.def.a)!.def;
    const b = this.nodes.get(rt.def.b)!.def;
    return { a: { x: a.x, y: a.y }, b: { x: b.x, y: b.y }, c: this.ctrl(a, b, rt.def.bend) };
  }

  private frame = (now: number) => {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.time += dt;
    if (this.scene) {
      this.update(dt);
      this.draw();
    }
    requestAnimationFrame(this.frame);
  };

  private update(dt: number) {
    const k = 1 - Math.exp(-dt * 6);
    const kc = 1 - Math.exp(-dt * 2.6);
    for (const rt of this.nodes.values()) {
      rt.color = mix(rt.color, rgb(STATE_HEX[rt.state]), k);
      rt.alpha += (rt.targetAlpha - rt.alpha) * k;
      rt.bump = Math.max(0, rt.bump - dt * 1.6);
    }
    for (const rt of this.zones.values()) rt.alpha += (rt.targetAlpha - rt.alpha) * k;
    for (const rt of this.links.values()) {
      rt.color = mix(rt.color, rgb(STATE_HEX[rt.state]), k);
      rt.alpha += (rt.targetAlpha - rt.alpha) * k;
      const rate =
        rt.state === "ok" ? 1.4 : rt.state === "warn" ? 0.7 : rt.state === "pending" ? 1.0 : rt.state === "down" ? 0.9 : 0;
      if (rate > 0 && rt.targetAlpha > 0 && rt.alpha > 0.4) {
        rt.acc += dt * rate;
        while (rt.acc >= 1) {
          rt.acc -= 1;
          const speed =
            rt.state === "ok" ? 0.42 : rt.state === "warn" ? 0.18 : rt.state === "pending" ? 0.3 : 0.36;
          this.particles.push({ link: rt, t: 0, speed: speed * (0.85 + Math.random() * 0.3), state: rt.state });
        }
      }
    }
    for (const p of this.particles) p.t += p.speed * dt;
    this.particles = this.particles.filter((p) => p.t < (p.state === "down" ? 0.5 : 1) && p.link.alpha > 0.05);
    for (const r of this.ripples) r.life -= dt * 1.2;
    this.ripples = this.ripples.filter((r) => r.life > 0);
    this.cam.x += (this.camT.x - this.cam.x) * kc;
    this.cam.y += (this.camT.y - this.cam.y) * kc;
    this.cam.w += (this.camT.w - this.cam.w) * kc;
    this.cam.h += (this.camT.h - this.cam.h) * kc;
    if (this.callout) this.calloutAlpha = Math.min(1, this.calloutAlpha + dt * 1.6);
  }

  private draw() {
    const c = this.ctx;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.fillStyle = "#070d1a";
    c.fillRect(0, 0, this.vw, this.vh);
    const { s, ox, oy } = this.transform();
    c.setTransform(this.dpr * s, 0, 0, this.dpr * s, this.dpr * ox, this.dpr * oy);

    c.fillStyle = "rgba(148,163,184,0.07)";
    for (let x = 0; x <= WORLD_W; x += 40) {
      for (let y = 0; y <= WORLD_H; y += 40) {
        c.fillRect(x - 1, y - 1, 2, 2);
      }
    }

    for (const z of this.zones.values()) this.drawZone(z);
    for (const l of this.links.values()) this.drawLink(l);
    this.drawParticles();
    for (const r of this.ripples) {
      c.globalAlpha = Math.max(0, r.life) * 0.7;
      c.strokeStyle = css(r.color);
      c.lineWidth = 2;
      c.beginPath();
      c.arc(r.x, r.y, 30 + (1 - r.life) * 55, 0, Math.PI * 2);
      c.stroke();
    }
    c.globalAlpha = 1;
    for (const n of this.nodes.values()) this.drawNode(n);
    this.drawCallout();
    c.globalAlpha = 1;
  }

  private drawZone(z: ZoneRT) {
    if (z.alpha < 0.01) return;
    const c = this.ctx;
    const d = z.def;
    c.globalAlpha = z.alpha;
    c.beginPath();
    c.roundRect(d.x, d.y, d.w, d.h, 14);
    c.fillStyle = d.cisco ? "rgba(4,159,217,0.07)" : "rgba(148,163,184,0.045)";
    c.fill();
    c.strokeStyle = d.cisco ? "rgba(4,159,217,0.55)" : "rgba(148,163,184,0.16)";
    c.lineWidth = 1.5;
    c.setLineDash(d.cisco ? [8, 6] : []);
    c.stroke();
    c.setLineDash([]);
    c.fillStyle = d.cisco ? CISCO_BLUE : "rgba(203,213,225,0.62)";
    c.font = "600 16px Inter, 'Segoe UI', system-ui, sans-serif";
    c.textAlign = "left";
    c.textBaseline = "top";
    c.fillText(d.label.toUpperCase(), d.x + 16, d.y + 14);
    c.globalAlpha = 1;
  }

  private drawLink(rt: LinkRT) {
    if (rt.alpha < 0.01) return;
    const c = this.ctx;
    const { a, b, c: cp } = this.ends(rt);
    c.globalAlpha = rt.alpha;
    c.strokeStyle = css(rt.color, rt.state === "idle" ? 0.45 : 0.55);
    c.lineWidth = rt.state === "idle" ? 1.5 : 2.5;
    if (rt.state === "unknown") c.setLineDash([5, 7]);
    else if (rt.state === "pending") {
      c.setLineDash([10, 8]);
      c.lineDashOffset = -this.time * 30;
    } else c.setLineDash([]);

    if (rt.state === "down") {
      const seg = (t0: number, t1: number) => {
        c.beginPath();
        for (let i = 0; i <= 24; i++) {
          const p = this.bez(a, cp, b, t0 + ((t1 - t0) * i) / 24);
          if (i === 0) c.moveTo(p.x, p.y);
          else c.lineTo(p.x, p.y);
        }
        c.stroke();
      };
      seg(0, 0.43);
      seg(0.57, 1);
      const m = this.bez(a, cp, b, 0.5);
      c.setLineDash([]);
      c.lineWidth = 3;
      c.strokeStyle = css(rt.color, 0.95);
      c.beginPath();
      c.moveTo(m.x - 7, m.y - 7);
      c.lineTo(m.x + 7, m.y + 7);
      c.moveTo(m.x + 7, m.y - 7);
      c.lineTo(m.x - 7, m.y + 7);
      c.stroke();
    } else {
      c.beginPath();
      c.moveTo(a.x, a.y);
      c.quadraticCurveTo(cp.x, cp.y, b.x, b.y);
      c.stroke();
    }
    c.setLineDash([]);
    c.lineDashOffset = 0;
    c.globalAlpha = 1;
  }

  private drawParticles() {
    const c = this.ctx;
    for (const p of this.particles) {
      const { a, b, c: cp } = this.ends(p.link);
      const pt = this.bez(a, cp, b, p.t);
      let alpha = p.link.alpha;
      if (p.state === "down") alpha *= Math.max(0, 1 - Math.max(0, p.t - 0.32) / 0.18);
      const col = rgb(STATE_HEX[p.state]);
      c.globalAlpha = alpha * 0.22;
      c.fillStyle = css(col);
      c.beginPath();
      c.arc(pt.x, pt.y, 9, 0, Math.PI * 2);
      c.fill();
      c.globalAlpha = alpha;
      c.beginPath();
      c.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 1;
  }

  private drawNode(rt: NodeRT) {
    if (rt.alpha < 0.01) return;
    const c = this.ctx;
    const d = rt.def;
    const r = (d.r ?? 30) * NS * (1 + rt.bump * 0.18 * Math.sin(rt.bump * Math.PI));
    const hovered = this.hover === d.id;
    c.globalAlpha = rt.alpha;

    if (rt.state === "warn" || rt.state === "down") {
      const p = 0.5 + 0.5 * Math.sin(this.time * (rt.state === "down" ? 6 : 3.5));
      c.strokeStyle = css(rt.color, 0.25 + 0.35 * p);
      c.lineWidth = 2;
      c.beginPath();
      c.arc(d.x, d.y, r + 8 + p * 6, 0, Math.PI * 2);
      c.stroke();
    }
    if (rt.state === "pending") {
      c.save();
      c.translate(d.x, d.y);
      c.rotate(this.time * 1.2);
      c.strokeStyle = css(rt.color, 0.85);
      c.lineWidth = 2.5;
      c.setLineDash([8, 7]);
      c.beginPath();
      c.arc(0, 0, r + 9, 0, Math.PI * 2);
      c.stroke();
      c.restore();
      c.setLineDash([]);
    }

    c.beginPath();
    c.arc(d.x, d.y, r, 0, Math.PI * 2);
    c.fillStyle = hovered ? "#1e293b" : "#0f172a";
    c.fill();
    c.lineWidth = hovered ? 4 : 3;
    c.strokeStyle = css(rt.color);
    if (rt.state === "unknown") c.setLineDash([5, 5]);
    c.stroke();
    c.setLineDash([]);

    c.save();
    c.translate(d.x, d.y);
    const sc = r / 30;
    c.scale(sc, sc);
    c.strokeStyle = rt.state === "unknown" ? "#94a3b8" : "#e2e8f0";
    c.lineWidth = 1.9;
    c.lineJoin = "round";
    c.lineCap = "round";
    drawIcon(c, d.icon);
    c.restore();

    c.textAlign = "center";
    c.textBaseline = "alphabetic";
    c.font = "600 20px Inter, 'Segoe UI', system-ui, sans-serif";
    c.fillStyle = "#e2e8f0";
    c.fillText(d.title, d.x, d.y + r + 26);
    c.font = "16.5px Inter, 'Segoe UI', system-ui, sans-serif";
    c.fillStyle = css(rt.color, 0.95);
    c.fillText(rt.label || d.sub[this.aud], d.x, d.y + r + 48);
    c.globalAlpha = 1;
  }

  private drawCallout() {
    if (!this.callout || this.calloutAlpha < 0.01) return;
    const rt = this.nodes.get(this.callout.node);
    if (!rt || rt.alpha < 0.3) return;
    const c = this.ctx;
    const d = rt.def;
    c.font = "500 19px Inter, 'Segoe UI', system-ui, sans-serif";
    const maxW = 340;
    const words = this.callout.text.split(" ");
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (c.measureText(test).width > maxW && cur) {
        lines.push(cur);
        cur = w;
      } else cur = test;
    }
    if (cur) lines.push(cur);
    const w = Math.max(...lines.map((l) => c.measureText(l).width)) + 28;
    const h = lines.length * 26 + 24;
    const right = d.x < WORLD_W * 0.62;
    let bx = right ? d.x + 70 : d.x - 70 - w;
    let by = d.y - 130;
    if (by < 20) by = d.y + 80;
    bx = Math.max(16, Math.min(WORLD_W - w - 16, bx));
    const t = this.calloutAlpha;
    c.globalAlpha = t;
    c.strokeStyle = "rgba(96,165,250,0.8)";
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(d.x, d.y);
    c.lineTo(right ? bx : bx + w, by + h / 2);
    c.stroke();
    c.beginPath();
    c.roundRect(bx, by + (1 - t) * 10, w, h, 10);
    c.fillStyle = "rgba(2,6,23,0.94)";
    c.fill();
    c.stroke();
    c.fillStyle = "#e2e8f0";
    c.textAlign = "left";
    c.textBaseline = "top";
    lines.forEach((l, i) => c.fillText(l, bx + 14, by + (1 - t) * 10 + 12 + i * 26));
    c.globalAlpha = 1;
  }
}
