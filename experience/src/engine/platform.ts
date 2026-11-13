import { C, IX, IY, K, Pen, clamp, damp, rgba, type V3 } from "./iso";
import { CATALOG, type Item } from "../data/catalog";
import { ZONES, RS } from "./rooms";
import { drawTile } from "./pin";
import type { IconKind } from "../story/icons";

/** The operating layer: Cloud Control deck at the top, Data Fabric beneath it, both above and behind the hospital. */
export const DECK: V3 = [-3, 6.6, -3];
export const DECK_R = 6.4, ORBIT_R = 7.6;
export const FAB: V3 = [-2.3, 4.3, -2.3];
export const FAB_R = 8.6;

export interface PlatformView {
  mode: "hidden" | "scattered" | "ring";
  fabric: boolean; cards: boolean; partners: boolean; ghosts: boolean;
  labels: "none" | "lit" | "all";
  lit: Set<string>;
  /** When labelling everything, restrict labels to these layers. */
  only?: string[];
}

interface RT { lx?: number; ly?: number; tether?: V3; item: Item; home: V3; scatter: V3; pos: V3; el: HTMLElement; vis: number; tVis: number; lit: number; tLit: number; phase: number; team: string; ang: number; sx: number; sy: number }

const TEAM = ["#ff8a4c", "#ffb020", "#b79cff", "#2fd28f", "#ff7ab8", "#5b8def", "#e9d36b"];
const ICON: Record<string, IconKind> = { canvas: "canvas", assistant: "chat", topology: "topology", inventory: "board", actions: "bell", workflows: "gear", identity: "badge", audit: "doc", deepreason: "scan" };

export class Platform {
  items = new Map<string, RT>();
  view: PlatformView = { mode: "hidden", fabric: false, cards: false, partners: false, ghosts: false, labels: "none", lit: new Set() };
  deck = 0; fab = 0; scat = 0;
  private tDeck = 0; private tFab = 0; private tScat = 0;
  private deckLbl: HTMLElement; private fabLbl: HTMLElement;
  private seeds: number[] = [];
  hoverId = "";

  constructor(private labels: HTMLElement) {
    const mk = (cls: string, html: string) => { const el = document.createElement("div"); el.className = cls; el.innerHTML = html; labels.appendChild(el); return el; };
    this.deckLbl = mk("plbl cc", "<b>Cisco Cloud Control</b><i>people and agents, one operating picture</i>");
    this.fabLbl = mk("plbl df", "<b>Cisco Data Fabric</b><i>machine data, powered by Splunk</i>");
    const by = (l: string) => CATALOG.filter((i) => i.layer === l);
    let n = 0;
    const ring = (items: Item[], c: V3, R: number, start: number, arc = Math.PI * 2, dy = 0) => items.forEach((it, i) => {
      const a = start + ((i + 0.5) / items.length) * arc; const home: V3 = [c[0] + Math.cos(a) * R, c[1] + dy, c[2] + Math.sin(a) * R];
      const rnd = (s: number) => { const v = Math.sin((n + 1) * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
      // Today's consoles hang in a loose grid above the hospital, each tethered to the room it manages.
      const col = i % 5, row = Math.floor(i / 5), ssx = (col - 2) * 13.5 + (row % 2 ? 3.5 : -3), ssy = -15 + row * 5.6 + (col % 2) * 1.5, sum = 2 * (ssy + 8), dif = ssx / IX;
      const scatter: V3 = [(sum + dif) / 2, 8, (sum - dif) / 2];
      const el = mk(`chip l-${it.layer}`, `<b>${it.short}</b>`); el.dataset.id = it.id;
      const tz = ZONES.find((z) => z.id === it.zones?.[0]);
      this.items.set(it.id, { tether: tz ? [tz.x + RS / 2, (tz.y ?? 0) + 0.6, tz.z + RS / 2] : undefined, item: it, home, scatter, pos: [...home] as V3, el, vis: 0, tVis: 0, lit: 0, tLit: 0, phase: rnd(4) * 6.28, team: TEAM[n % TEAM.length], ang: a, sx: 0, sy: 0 });
      n++;
    });
    ring(by("domain"), DECK, ORBIT_R, -Math.PI * 0.75, Math.PI * 2, -0.4);
    ring(by("experience"), DECK, 4.1, -Math.PI * 0.75, Math.PI * 2, 0.02);
    const fb = by("fabric");
    ring(fb, FAB, 6.9, -Math.PI * 0.32, Math.PI * 1.14, 0.05);
    ring(by("ecosystem"), FAB, FAB_R + 1.5, Math.PI * 0.3, Math.PI * 0.78, 0);
    ring(by("roadmap"), [DECK[0], DECK[1] + 7.6, DECK[2]], 4.6, 0, Math.PI * 2, 0);
    // Announced items float in a row above the deck.
    const rm = by("roadmap"); rm.forEach((it, i) => { const d = (i - (rm.length - 1) / 2) * 5.6, rt = this.items.get(it.id)!; rt.home = [DECK[0] + d / 2, DECK[1] + 7.6, DECK[2] - d / 2]; rt.ang = -Math.PI * 0.75; });
    for (let i = 0; i < 90; i++) this.seeds.push(Math.random());
  }

  set(v: Partial<PlatformView>) {
    Object.assign(this.view, v); const w = this.view;
    this.tDeck = w.mode === "ring" ? 1 : 0; this.tFab = w.fabric && w.mode !== "hidden" ? 1 : 0; this.tScat = w.mode === "scattered" ? 1 : 0;
    for (const rt of this.items.values()) {
      const L = rt.item.layer; let on = false;
      if (w.mode === "scattered") on = L === "domain";
      else if (w.mode === "ring") on = L === "domain" || (L === "experience" && w.cards) || (L === "fabric" && w.fabric) || (L === "ecosystem" && w.fabric && (w.partners || w.lit.has(rt.item.id))) || (L === "roadmap" && (w.ghosts || w.lit.has(rt.item.id)));
      rt.tVis = on ? 1 : 0; rt.tLit = w.lit.has(rt.item.id) ? 1 : 0;
      rt.el.classList.toggle("lit", rt.tLit > 0); rt.el.classList.toggle("generic", w.mode === "scattered");
      rt.el.firstElementChild!.textContent = w.mode === "scattered" ? rt.item.generic ?? rt.item.short : rt.item.short;
    }
  }

  deckPositions(n: number): V3[] {
    const span = n <= 1 ? 0 : Math.min(12.4, (n - 1) * 4.2), out: V3[] = [];
    for (let i = 0; i < n; i++) { const d = n <= 1 ? 0 : -span / 2 + (span / (n - 1)) * i, sum = DECK[0] + DECK[2] - 0.6 + (i % 2 ? -1.3 : 1.3) * (n > 2 ? 1 : 0); out.push([(sum + d) / 2, DECK[1] + 0.02, (sum - d) / 2]); }
    return out;
  }
  scatterPoints(): V3[] { return [...this.items.values()].filter((r) => r.item.layer === "domain").map((r) => r.scatter); }
  points(fabric = true): V3[] {
    const e = (c: V3, R: number, up = 0): V3[] => [[c[0] + R, c[1], c[2] - R], [c[0] - R, c[1], c[2] + R], [c[0] - R, c[1] + up, c[2] - R], [c[0] + R, c[1], c[2] + R]];
    const p = e(DECK, ORBIT_R * 0.74, 2.5);
    if (fabric) p.push(...e(FAB, FAB_R * 0.78));
    return p;
  }

  update(dt: number, t: number) {
    this.deck = damp(this.deck, this.tDeck, 2.8 * K, dt); this.fab = damp(this.fab, this.tFab, 2.4 * K, dt); this.scat = damp(this.scat, this.tScat, 2.2 * K, dt);
    for (const rt of this.items.values()) {
      rt.vis = damp(rt.vis, rt.tVis, 3.4 * K, dt); rt.lit = damp(rt.lit, rt.tLit, 5 * K, dt);
      const s = this.scat, bob = Math.sin(t * 0.8 + rt.phase) * (0.1 + s * 0.35);
      rt.pos = [rt.home[0] + (rt.scatter[0] - rt.home[0]) * s, rt.home[1] + (rt.scatter[1] - rt.home[1]) * s + bob + rt.lit * 0.35 + (1 - Math.max(this.deck, s)) * 4, rt.home[2] + (rt.scatter[2] - rt.home[2]) * s];
    }
  }

  /** Text lying flat on a horizontal surface, reading left to right. */
  private flat(c: CanvasRenderingContext2D, txt: string, x: number, y: number, size: number, col: string) {
    c.save(); c.translate(x, y); c.scale(1, 0.577); c.font = `700 ${size}px Inter, system-ui, sans-serif`; c.textAlign = "center"; c.textBaseline = "middle";
    try { (c as unknown as { letterSpacing: string }).letterSpacing = `${size * 0.2}px`; } catch { /* */ }
    c.fillStyle = col; c.fillText(txt, 0, 0); c.restore();
  }
  private ellipse(pen: Pen, c: V3, R: number, dy = 0): [number, number, number, number] { const [x, y] = pen.P(c[0], c[1] + dy, c[2]); return [x, y, R * 1.2247 * pen.s, R * 0.7071 * pen.s]; }

  /** Everything that sits behind the hospital: light cone, fabric, deck. */
  drawBack(pen: Pen, t: number) {
    const c = pen.c, d = this.deck, f = this.fab;
    if (d > 0.01) {
      // a quiet cone of light from the deck toward the hospital
      const [x, y, rx] = this.ellipse(pen, DECK, DECK_R), [bx, by] = pen.P(8, 0, 8);
      const g = c.createLinearGradient(0, y, 0, by); g.addColorStop(0, `rgba(0,188,235,${0.16 * d})`); g.addColorStop(1, "rgba(0,188,235,0)");
      c.beginPath(); c.moveTo(x - rx, y); c.lineTo(bx - rx * 2.1, by); c.lineTo(bx + rx * 2.1, by); c.lineTo(x + rx, y); c.closePath(); c.fillStyle = g; c.fill();
    }
    if (f > 0.01) {
      const [x, y, rx, ry] = this.ellipse(pen, FAB, FAB_R);
      c.save(); c.globalAlpha = f;
      c.beginPath(); c.ellipse(x, y + 0.5 * pen.s, rx, ry, 0, 0, 7); c.fillStyle = "rgba(4,7,16,0.55)"; c.fill();
      const g = c.createRadialGradient(x, y, rx * 0.1, x, y, rx); g.addColorStop(0, "rgba(64,52,150,0.55)"); g.addColorStop(1, "rgba(22,20,62,0.78)");
      c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, 7); c.fillStyle = g; c.fill();
      c.save(); c.clip();
      const sp = 1.15, N = Math.ceil(FAB_R / sp);
      for (let i = -N; i <= N; i++) {
        const o = i * sp, h = Math.sqrt(Math.max(0, FAB_R * FAB_R - o * o));
        pen.line([[FAB[0] + o, FAB[1], FAB[2] - h], [FAB[0] + o, FAB[1], FAB[2] + h]], "rgba(157,140,255,0.42)", Math.max(0.8, pen.s * 0.03));
        pen.line([[FAB[0] - h, FAB[1], FAB[2] + o], [FAB[0] + h, FAB[1], FAB[2] + o]], "rgba(157,140,255,0.42)", Math.max(0.8, pen.s * 0.03));
      }
      // light running along the threads
      c.shadowColor = "#b9adff"; c.shadowBlur = pen.s * 0.5;
      for (let i = -N; i <= N; i++) {
        const o = i * sp, h = Math.sqrt(Math.max(0, FAB_R * FAB_R - o * o)); if (h < 1) continue;
        const u = ((t * (0.16 + (Math.abs(i) % 3) * 0.05) + this.seeds[(i + N) % 90]) % 1) * 2 - 1, u2 = ((t * 0.2 + this.seeds[(i + N + 31) % 90]) % 1) * 2 - 1, L = 0.9;
        pen.line([[FAB[0] + o, FAB[1], FAB[2] + u * h - L], [FAB[0] + o, FAB[1], FAB[2] + u * h + L]], "rgba(236,232,255,0.95)", Math.max(1, pen.s * 0.06));
        pen.line([[FAB[0] + u2 * h - L, FAB[1], FAB[2] + o], [FAB[0] + u2 * h + L, FAB[1], FAB[2] + o]], "rgba(236,232,255,0.95)", Math.max(1, pen.s * 0.06));
      }
      c.restore();
      c.shadowColor = "#9d8cff"; c.shadowBlur = pen.s * 0.7; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, 7); c.strokeStyle = "rgba(185,173,255,0.95)"; c.lineWidth = Math.max(1.2, pen.s * 0.06); c.stroke();
      c.shadowBlur = 0;
      c.restore();
    }
    if (d > 0.01) {
      const lift = (1 - d) * 4; const [x, y0, rx, ry] = this.ellipse(pen, DECK, DECK_R, lift), y = y0, th = 0.55 * pen.s;
      c.save(); c.globalAlpha = d;
      // underside glow and body
      c.shadowColor = "rgba(0,188,235,0.55)"; c.shadowBlur = pen.s * 1.6;
      c.beginPath(); c.ellipse(x, y + th, rx, ry, 0, 0, 7); c.fillStyle = "#050c1a"; c.fill(); c.shadowBlur = 0;
      const sg = c.createLinearGradient(x - rx, 0, x + rx, 0); sg.addColorStop(0, "#0d2a4a"); sg.addColorStop(0.5, "#071a30"); sg.addColorStop(1, "#04101f");
      c.beginPath(); c.moveTo(x - rx, y); c.lineTo(x - rx, y + th); c.ellipse(x, y + th, rx, ry, 0, Math.PI, 0, true); c.lineTo(x + rx, y); c.closePath(); c.fillStyle = sg; c.fill();
      const g = c.createRadialGradient(x, y - ry * 0.2, rx * 0.05, x, y, rx); g.addColorStop(0, "#15497a"); g.addColorStop(0.6, "#0c2c50"); g.addColorStop(1, "#081b34");
      c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, 7); c.fillStyle = g; c.fill();
      // rotating sweep
      c.save(); c.clip(); c.translate(x, y); c.scale(1, ry / rx);
      if (typeof c.createConicGradient === "function") { const cg = c.createConicGradient(t * 0.5, 0, 0); cg.addColorStop(0, "rgba(90,216,255,0.34)"); cg.addColorStop(0.16, "rgba(90,216,255,0)"); cg.addColorStop(1, "rgba(90,216,255,0)"); c.fillStyle = cg; c.beginPath(); c.arc(0, 0, rx, 0, 7); c.fill(); }
      c.strokeStyle = "rgba(90,216,255,0.28)"; c.lineWidth = 1; [0.33, 0.64].forEach((k) => { c.beginPath(); c.arc(0, 0, rx * k, 0, 7); c.stroke(); });
      for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; c.beginPath(); c.moveTo(Math.cos(a) * rx * 0.64, Math.sin(a) * rx * 0.64); c.lineTo(Math.cos(a) * rx, Math.sin(a) * rx); c.strokeStyle = "rgba(90,216,255,0.12)"; c.stroke(); }
      c.setLineDash([rx * 0.016, rx * 0.034]); c.lineDashOffset = -t * 6; c.beginPath(); c.arc(0, 0, rx * 0.9, 0, 7); c.strokeStyle = "rgba(160,235,255,0.7)"; c.lineWidth = Math.max(1.5, rx * 0.014); c.stroke(); c.setLineDash([]);
      c.restore();
      this.flat(c, "CISCO CLOUD CONTROL", x, y + ry * 0.74, rx * 0.078, "rgba(190,240,255,0.92)");
      c.shadowColor = C.cyan; c.shadowBlur = pen.s * 0.9; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, 7); c.strokeStyle = "#7fe3ff"; c.lineWidth = Math.max(1.6, pen.s * 0.085); c.stroke();
      // orbit track
      c.shadowBlur = 0; const [ox, oy, orx, ory] = this.ellipse(pen, DECK, ORBIT_R, lift - 0.4);
      c.setLineDash([3, 7]); c.beginPath(); c.ellipse(ox, oy, orx, ory, 0, 0, 7); c.strokeStyle = "rgba(90,216,255,0.3)"; c.lineWidth = 1; c.stroke(); c.setLineDash([]);
      c.restore();
    }
  }

  /** Chips, cards and telemetry, drawn over the hospital because scattered consoles float above it. */
  drawFront(pen: Pen, t: number, toScreen: (x: number, y: number, z: number) => [number, number]) {
    const c = pen.c, w = this.view;
    // telemetry rising from every room into the fabric
    if (this.fab > 0.02) {
      const [fx, fy] = pen.P(FAB[0], FAB[1], FAB[2]);
      for (let i = 0; i < 60; i++) {
        const z = ZONES[i % ZONES.length]; const f = (this.seeds[i] + t * (0.1 + this.seeds[(i + 7) % 90] * 0.06)) % 1;
        const [ax, ay] = pen.P(z.x + RS * (0.2 + this.seeds[(i + 3) % 90] * 0.6), (z.y ?? 0) + 1.5, z.z + RS * (0.2 + this.seeds[(i + 5) % 90] * 0.6));
        const tx = fx + (ax - fx) * 0.32, ty = fy + 0.6 * pen.s, e = f * f * (3 - 2 * f);
        const x = ax + (tx - ax) * e, y = ay + (ty - ay) * f - Math.sin(f * Math.PI) * 2.4 * pen.s;
        c.beginPath(); c.arc(x, y, Math.max(1, pen.s * 0.055), 0, 7); c.fillStyle = `rgba(200,190,255,${Math.sin(f * Math.PI) * 0.8 * this.fab})`; c.fill();
      }
    }
    if (this.scat > 0.04) for (const rt of this.items.values()) {
      if (!rt.tether || rt.vis < 0.05 || rt.item.layer !== "domain") continue;
      const [ax, ay] = pen.P(rt.pos[0], rt.pos[1], rt.pos[2]), [bx, by] = pen.P(rt.tether[0], rt.tether[1], rt.tether[2]);
      c.save(); c.globalAlpha = this.scat * rt.vis * 0.75; c.setLineDash([2, 6]); c.lineCap = "round"; c.strokeStyle = rt.team; c.lineWidth = 1.6; c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke(); c.setLineDash([]);
      c.beginPath(); c.arc(bx, by, 3.2, 0, 7); c.fillStyle = rt.team; c.fill(); c.restore();
    }
    for (const rt of this.items.values()) {
      if (rt.lx === undefined || rt.vis < 0.5) continue;
      c.save(); c.globalAlpha = 0.7 * rt.vis; c.strokeStyle = "rgba(185,173,255,0.8)"; c.lineWidth = 1; const left = rt.item.layer === "ecosystem", sgn = left ? -1 : 1, y0 = rt.sy - (left ? 0.1 : 0.5) * pen.s; c.strokeStyle = left ? "rgba(235,240,250,0.7)" : "rgba(185,173,255,0.8)";
      c.beginPath(); c.moveTo(rt.sx, y0); const ex = rt.lx - 8 * sgn, ey = rt.ly!; c.lineTo(ex - sgn * (Math.abs(ey - y0) * 0.6 + 6), ey); c.lineTo(ex, ey); c.stroke();
      c.beginPath(); c.arc(ex, ey, 2, 0, 7); c.fillStyle = left ? "#eef2f8" : "#b9adff"; c.fill(); c.restore();
    }
    const list = [...this.items.values()].filter((r) => r.vis > 0.02).sort((a, b) => (a.pos[0] + a.pos[2]) - (b.pos[0] + b.pos[2]));
    for (const rt of list) {
      const [x, y] = pen.P(rt.pos[0], rt.pos[1], rt.pos[2]); const L = rt.item.layer, v = rt.vis, hot = Math.max(rt.lit, this.hoverId === rt.item.id ? 0.7 : 0);
      const dimmed = w.lit.size > 0 && w.mode === "ring" ? 0.42 + hot * 0.58 : 1;
      c.save(); c.globalAlpha = v * dimmed;
      const [ssx, ssy] = toScreen(rt.pos[0], rt.pos[1], rt.pos[2]); rt.sx = ssx; rt.sy = ssy;
      if (L === "domain") {
        const col = this.scat > 0.5 ? rt.team : C.cyan, R = 0.86 * pen.s * (1 + hot * 0.2), th = 0.3 * pen.s;
        const hexp = (dy: number) => { c.beginPath(); for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; const px = x + (Math.cos(a) - Math.sin(a)) * IX * R, py = y + dy + (Math.cos(a) + Math.sin(a)) * IY * R; i ? c.lineTo(px, py) : c.moveTo(px, py); } c.closePath(); };
        c.shadowColor = rgba(col, 0.25 + hot * 0.7); c.shadowBlur = pen.s * (0.5 + hot * 1.2);
        hexp(th); c.fillStyle = "#06101f"; c.fill(); c.shadowBlur = 0;
        c.beginPath(); c.rect(x - R * 1.3, y, R * 2.6, th); c.save(); c.clip(); hexp(th * 0.5); c.fillStyle = "#0a1d36"; c.fill(); c.restore();
        hexp(0); const g = c.createLinearGradient(x, y - R, x, y + R); g.addColorStop(0, hot > 0.5 ? "#eafaff" : rgba(col, 0.5)); g.addColorStop(1, hot > 0.5 ? rgba(col, 1) : "rgba(10,36,66,0.95)"); c.fillStyle = g; c.fill();
        c.strokeStyle = rgba(col, 0.95); c.lineWidth = Math.max(1, pen.s * 0.05); c.stroke();
        if (this.scat > 0.3) { // a console on its own: its own little screen
          c.globalAlpha = v * this.scat; c.fillStyle = rgba(rt.team, 0.9); c.fillRect(x - R * 0.34, y - R * 0.16, R * 0.68, R * 0.3);
        }
      } else if (L === "experience") {
        drawTile(c, x, y - 15 * clamp(pen.s / 22, 0.7, 1.2), 30 * clamp(pen.s / 22, 0.7, 1.2) * (1 + hot * 0.2), hot > 0.5 ? "cyanHot" : "cyan", ICON[rt.item.id] ?? "canvas", 1);
      } else if (L === "fabric") {
        const R = 0.5 * pen.s * (1 + hot * 0.3);
        c.shadowColor = "#b9adff"; c.shadowBlur = pen.s * (0.6 + hot); c.beginPath(); c.moveTo(x, y - R * 1.5); c.lineTo(x + R, y - R * 0.5); c.lineTo(x, y + R * 0.5); c.lineTo(x - R, y - R * 0.5); c.closePath();
        const g = c.createLinearGradient(x - R, 0, x + R, 0); g.addColorStop(0, "#d6ceff"); g.addColorStop(1, hot > 0.5 ? "#ffffff" : "#7d6bf0"); c.fillStyle = g; c.fill(); c.shadowBlur = 0;
        c.beginPath(); c.moveTo(x, y - R * 1.5); c.lineTo(x, y + R * 0.5); c.strokeStyle = "rgba(255,255,255,0.5)"; c.lineWidth = 1; c.stroke();
      } else if (L === "ecosystem") {
        const [X, Y, Z] = rt.pos;
        c.shadowColor = `rgba(255,255,255,${0.2 + hot * 0.6})`; c.shadowBlur = pen.s * (0.4 + hot);
        pen.box(X - 0.55, Z - 0.55, 1.1, 1.1, 0.26, hot > 0.5 ? "#ffffff" : "#d5dcea", Y);
        c.shadowBlur = 0; pen.poly([[X - 0.28, Y + 0.262, Z - 0.28], [X + 0.28, Y + 0.262, Z - 0.28], [X + 0.28, Y + 0.262, Z + 0.28], [X - 0.28, Y + 0.262, Z + 0.28]], "#2b3a5c");
      } else {
        const R = 0.8 * pen.s; c.setLineDash([4, 4]); c.beginPath(); for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; const px = x + (Math.cos(a) - Math.sin(a)) * IX * R, py = y + (Math.cos(a) + Math.sin(a)) * IY * R; i ? c.lineTo(px, py) : c.moveTo(px, py); } c.closePath();
        c.fillStyle = `rgba(159,228,255,${0.06 + hot * 0.2})`; c.fill(); c.strokeStyle = "rgba(159,228,255,0.9)"; c.lineWidth = 1.2; c.stroke(); c.setLineDash([]);
      }
      c.restore();
    }
  }

  /** Position the DOM labels. Called once per frame after drawing. */
  layout(pen: Pen, w: number) {
    const v = this.view;
    const place = (el: HTMLElement, on: boolean, x: number, y: number, ax: string, ay: string) => { el.classList.toggle("show", on); if (on) el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(${ax},${ay})`; };
    const [dx, dy, drx] = this.ellipse(pen, DECK, ORBIT_R + 1.2);
    void w;
    void dx; void dy; void drx; place(this.deckLbl, false, 0, 0, "0", "0");
    const [fx, fy, frx] = this.ellipse(pen, FAB, FAB_R + 0.6);
    this.fabLbl.innerHTML = "<b>Cisco Data Fabric</b><i>machine data, powered by Splunk</i>"; place(this.fabLbl, this.fab > 0.5, fx + frx * 0.86 + 12, fy + FAB_R * 0.42 * pen.s, "0", "-50%");
    // Data Fabric items are called out in a column to the right, with leader lines.
    const col = [...this.items.values()].filter((r) => r.item.layer === "fabric" && r.vis > 0.5 && v.labels === "all" && pen.s >= 13 && (!v.only || v.only.includes("fabric"))).sort((a, b) => a.sy - b.sy);
    const colX = fx + frx + 30, colY = fy - ((col.length - 1) / 2) * 25 + 34;
    if (col.length) { this.fabLbl.innerHTML = "<b>Inside the Data Fabric</b><i>machine data, powered by Splunk</i>"; place(this.fabLbl, this.fab > 0.5, colX, colY - 44, "0", "-50%"); }
    // Third-party systems are called out on the left.
    const colL = [...this.items.values()].filter((r) => r.item.layer === "ecosystem" && r.vis > 0.5 && v.labels === "all" && pen.s >= 13 && (!v.only || v.only.includes("ecosystem"))).sort((a, b) => a.sy - b.sy);
    const colLX = fx - frx - 40, colLY = fy - ((colL.length - 1) / 2) * 24 + 26;
    if (colL.length) { this.deckLbl.className = "plbl tp"; this.deckLbl.innerHTML = "<b>Third-party systems and data</b><i>connected, searched in place</i>"; place(this.deckLbl, this.fab > 0.5, colLX, colLY - 42, "-100%", "-50%"); }
    for (const rt of this.items.values()) {
      const L = rt.item.layer, hot = rt.tLit > 0 || this.hoverId === rt.item.id;
      const ci = col.indexOf(rt);
      if (ci >= 0) { rt.lx = colX; rt.ly = colY + ci * 25; place(rt.el, true, rt.lx, rt.ly, "0", "-50%"); continue; }
      const li = colL.indexOf(rt);
      if (li >= 0) { rt.lx = colLX; rt.ly = colLY + li * 24; place(rt.el, true, rt.lx, rt.ly, "-100%", "-50%"); continue; }
      rt.lx = undefined;
      const min = L === "experience" ? 24 : 13;
      const all = v.labels === "all" && (this.scat > 0.5 || (pen.s >= min && (!v.only || v.only.includes(L))));
      const on = rt.vis > 0.5 && (all || hot || (v.labels === "lit" && rt.tLit > 0));
      if (!on) { rt.el.classList.remove("show"); continue; }
      let x = rt.sx, y = rt.sy, ax = "-50%", ay = "-100%";
      const cx = Math.cos(rt.ang) - Math.sin(rt.ang), cy = Math.cos(rt.ang) + Math.sin(rt.ang);
      const side = () => { ax = cx > 0.45 ? "0" : cx < -0.45 ? "-100%" : "-50%"; ay = cx > 0.45 || cx < -0.45 ? "-50%" : cy > 0 ? "10%" : "-110%"; if (ax === "0") x += 6; else if (ax === "-100%") x -= 6; };
      if (this.scat > 0.5) { y -= 1.1 * pen.s; }
      else if (L === "roadmap") { y -= 1.1 * pen.s; }
      else if (L === "domain" || L === "ecosystem") { const off = (L === "ecosystem" ? 1.0 : 1.25) * pen.s; x += cx * 0.7 * off; y += cy * 0.42 * off; side(); }
      else if (L === "experience" && all && !hot) { const kk = clamp(pen.s / 22, 0.7, 1.2); y -= 15 * kk; x += cx * 14 * kk; y += cy * 11 * kk; side(); }
      else if (L === "experience") { y -= 36 * clamp(pen.s / 22, 0.7, 1.2); }
      else { y -= 1.0 * pen.s; }
      place(rt.el, true, x, y, ax, ay);
    }
  }

  /** Item under the pointer, if any. */
  hit(px: number, py: number, s: number): string {
    let best = "", bd = Math.max(16, s * 1.1);
    for (const rt of this.items.values()) { if (rt.vis < 0.5) continue; const d = Math.hypot(px - rt.sx, py - rt.sy + (rt.item.layer === "experience" ? 15 : 0)); if (d < bd) { bd = d; best = rt.item.id; } }
    return best;
  }
}
