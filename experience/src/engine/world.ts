import { C, K, PLAN, SHOT, Stage, Pen, clamp, damp, rgba, type V3 } from "./iso";
import { Campus, EXT, HUB, RS } from "./rooms";
import { Platform, DECK, DECK_R, type PlatformView } from "./platform";
import { badge, drawTile, type TileStyle } from "./pin";
import type { Aud, LinkDef, NodeDef, SceneDef, St } from "../story/types";

export interface View {
  ns: Map<string, St>; vis: Map<string, boolean>; labels: Map<string, string>; ls: Map<string, St>;
  active: Set<string>; callout?: { node: string; text: string }; phase: "today" | "cisco";
  platform: Partial<PlatformView>; cam: "wide" | "campus" | "platform" | "stack" | "auto" | "hero"; zones: string[]; seed: number; withPlatform?: boolean;
  /** No story on stage: rooms stay fully lit. */
  ambient?: boolean;
  /** Hide the outside-world island (home page, where the headline sits there). */
  hideSky?: boolean;
  /** Fraction of the width to keep clear on the right (a tall side column on closing and approval beats). */
  padRight?: number;
}

interface NodeRT { def: NodeDef; zone: string; pos: V3; el: HTMLElement; state: St; vis: number; tVis: number; foc: number; tFoc: number; bump: number; override: string; callout: string; sx: number; sy: number; tx: number; ty: number; size: number; hover: number }
interface LinkRT { def: LinkDef; state: St; a: number; tA: number; foc: number; tFoc: number; phase: number }

const COL: Record<St, string> = { ok: C.green, warn: C.amber, down: C.red, pending: "#38c6ff", unknown: "#8d9bb8", idle: "#9fb4d8", off: "#000000" };

export class World {
  campus = new Campus(); platform: Platform;
  nodes = new Map<string, NodeRT>(); links = new Map<string, LinkRT>();
  aud: Aud = "exec";
  hover = ""; picked = "";
  onPick?: (kind: "node" | "item" | "zone" | "", id: string) => void;
  private view?: View;
  private settle = 0;
  private frameNo = 0;
  private offsets = new Map<string, number>();
  private ripples: { x: number; y: number; z: number; t: number; col: string }[] = [];

  constructor(public stage: Stage) {
    this.platform = new Platform(stage.labels);
    stage.onTick((dt, t) => this.update(dt, t));
    stage.onDraw((pen, t) => this.draw(pen, t));
    stage.onClick = (x, y) => this.click(x, y);
  }

  clear() { for (const n of this.nodes.values()) n.el.remove(); this.nodes.clear(); this.links.clear(); this.offsets.clear(); this.picked = ""; }

  load(scene: SceneDef, place: Record<string, string>) {
    this.clear();
    const byZone = new Map<string, NodeDef[]>();
    for (const n of scene.nodes) { const z = place[n.id] ?? "office"; if (!byZone.has(z)) byZone.set(z, []); byZone.get(z)!.push(n); }
    for (const [zone, list] of byZone) {
      const pts = zone === "deck" ? this.platform.deckPositions(list.length) : this.campus.positions(zone, list.length);
      list.forEach((def, i) => {
        const el = document.createElement("div"); el.className = "lbl"; this.stage.labels.appendChild(el);
        this.nodes.set(def.id, { def, zone, pos: pts[i], el, state: "ok", vis: 0, tVis: 0, foc: 0, tFoc: 0, bump: 0, override: "", callout: "", sx: 0, sy: 0, tx: 0, ty: 0, size: 0, hover: 0 });
      });
    }
    scene.links.forEach((def, i) => { if (this.nodes.has(def.a) && this.nodes.has(def.b)) this.links.set(def.id, { def, state: "idle", a: 0, tA: 0, foc: 1, tFoc: 1, phase: i * 0.37 }); });
  }

  setAud(a: Aud) { this.aud = a; for (const n of this.nodes.values()) this.paint(n); }

  private paint(n: NodeRT) {
    const hov = this.hover === n.def.id || this.picked === n.def.id;
    n.el.innerHTML = `<div class="lbl-in"><b>${n.def.title}</b><i>${n.override || n.def.sub[this.aud]}</i></div>${n.callout ? `<div class="bubble">${n.callout}</div>` : ""}`;
    let crowd = 0; for (const m of this.nodes.values()) if (m.zone === n.zone && m.tVis > 0.5 && m.tFoc > 0.5) crowd++;
    n.el.className = `lbl s-${n.state}${(n.tFoc > 0.5 || hov) && n.tVis > 0.5 ? " show" : ""}${n.callout ? " has-bubble" : ""}${n.override ? " over" : ""}${n.zone === "deck" ? " cc" : ""}${crowd >= 4 && !hov ? " tight" : ""}`;
  }

  apply(v: View, snap = false) {
    this.view = v;
    for (const n of this.nodes.values()) {
      const s = v.ns.get(n.def.id) ?? "ok", vis = v.vis.get(n.def.id) ?? !n.def.hidden;
      if ((s !== n.state && n.vis > 0.5) || (vis && n.vis < 0.1)) { n.bump = 1; if (!snap) this.ripples.push({ x: n.pos[0], y: n.pos[1], z: n.pos[2], t: 0, col: COL[s] }); }
      n.state = s; n.tVis = vis ? 1 : 0; n.tFoc = v.active.size === 0 || v.active.has(n.def.id) ? 1 : 0;
      n.override = v.labels.get(n.def.id) ?? ""; n.callout = v.callout?.node === n.def.id ? v.callout.text : "";
    }
    for (const n of this.nodes.values()) this.paint(n);
    for (const l of this.links.values()) {
      const s = v.ls.get(l.def.id) ?? "idle", A = this.nodes.get(l.def.a)!, B = this.nodes.get(l.def.b)!;
      l.state = s; l.tA = s !== "off" && A.tVis > 0 && B.tVis > 0 ? 1 : 0; l.tFoc = A.tFoc > 0 || B.tFoc > 0 ? 1 : 0.22;
    }
    this.campus.tMood = v.phase === "cisco" ? 1 : 0; this.campus.tSky = v.hideSky ? 0 : 1;
    this.platform.set(v.platform);
    const zones = new Set<string>(v.zones);
    for (const n of this.nodes.values()) if (n.tVis > 0 && n.tFoc > 0 && n.zone !== "deck") zones.add(n.zone);
    this.campus.setActive(v.ambient ? new Set(v.zones) : zones);
    this.frame(v);
    if (snap) { this.stage.snap(); }
  }

  frame(v: View) {
    const pts: V3[] = []; const C2 = this.campus, P = this.platform;
    const all = () => { for (const id of C2.zones.keys()) pts.push(...C2.corners(id)); };
    const main = ["plant", "dc", "imaging", "pharmlab", "net", "ward", "office", "ed"];
    let pad: [number, number, number, number] = [40, 50, 30, 50], maxS = 30;
    if (v.cam === "hero") { const homePage = PLAN && v.ambient; for (const id of homePage ? main : [...main, "clinic", "home"]) pts.push(...C2.corners(id)); if (PLAN && !homePage) pts.push(...C2.corners("outside")); pts.push(EXT, ...P.points(true)); pad = homePage ? [150, 30, 20, this.stage.w * 0.1] : [70, 40, 10, 40]; }
    else if (v.cam === "wide") { all(); pts.push(EXT); if (P.view.mode === "ring") pts.push(...P.points(P.view.fabric)); else if (P.view.mode === "scattered") pts.push(...P.scatterPoints()); pad = [70, 70, 20, 70]; }
    else if (v.cam === "campus") { for (const id of main) pts.push(...C2.corners(id)); pts.push(EXT); }
    else if (v.cam === "platform") { pts.push(...P.points(P.view.fabric)); if (P.view.ghosts) pts.push(...P.ghostPoints()); pad = [90, 250, 36, 240]; maxS = 36; }
    else if (v.cam === "stack") { pts.push(...P.points(true)); for (const id of PLAN ? main : ["plant", "dc", "imaging", "net", "pharmlab"]) pts.push(...C2.corners(id)); pad = [60, 130, 20, 130]; }
    else {
      const zs = new Set<string>(); let deck = false;
      const inc = (n: NodeRT) => { pts.push(n.pos); if (n.zone === "deck") deck = true; else zs.add(n.zone); };
      for (const n of this.nodes.values()) if (n.tVis > 0 && n.tFoc > 0) inc(n);
      // Keep both ends of a live link in frame: the decision up on the deck and the room it lands in.
      for (const l of this.links.values()) if (l.tA > 0 && l.tFoc >= 1 && l.state !== "idle") { const A = this.nodes.get(l.def.a)!, B = this.nodes.get(l.def.b)!; if ((A.zone === "deck") !== (B.zone === "deck")) { inc(A); inc(B); } }
      for (const z of zs) pts.push(...C2.corners(z));
      if (deck) pts.push([DECK[0] + DECK_R, DECK[1], DECK[2] - DECK_R], [DECK[0] - DECK_R, DECK[1], DECK[2] + DECK_R], [DECK[0] - DECK_R, DECK[1] + 1, DECK[2] - DECK_R]);
      pad = [deck ? 96 : 110, 90, 26, 90]; maxS = zs.size === 0 ? 24 : zs.size <= 1 && !deck ? 40 : 34;
    }
    for (const id of v.zones) if (C2.zones.has(id)) pts.push(...C2.corners(id));
    if (!pts.length) all();
    if (v.padRight) pad = [pad[0], pad[1] + v.padRight * this.stage.w, pad[2], pad[3]];
    this.stage.frame(pts, { pad, maxS, minS: 7.5 });
  }

  private click(x: number, y: number) {
    const n = this.nodeAt(x, y);
    if (n) { this.picked = this.picked === n.def.id ? "" : n.def.id; this.paint(n); this.onPick?.(this.picked ? "node" : "", n.def.id); return; }
    const it = this.platform.hit(x, y, this.stage.scale);
    if (it) { this.onPick?.("item", it); return; }
    const pen = this.pen();
    const z = this.campus.hit(x, y, pen);
    if (z) { this.stage.frame(this.campus.corners(z), { pad: [130, 70, 40, 70], maxS: 44 }); this.onPick?.("zone", z); return; }
    this.picked = ""; this.onPick?.("", "");
  }
  private pen() { const s = this.stage.scale, st = this.stage; return new Pen(st.ctx, s, st.w / 2 - st.cam.x * s + st.user.dx, st.h / 2 - st.cam.y * s + st.user.dy); }
  private nodeAt(x: number, y: number) { let best: NodeRT | undefined, bd = 1e9; for (const n of this.nodes.values()) { if (n.vis < 0.5) continue; const d = Math.hypot(x - n.tx, y - n.ty); if (d < n.size * 0.75 && d < bd) { bd = d; best = n; } } return best; }

  update(dt: number, t: number) {
    void t;
    const explore = PLAN && this.view?.ambient && this.view.cam === "platform";
    this.campus.quiet = damp(this.campus.quiet, this.view && !this.view.ambient && this.nodes.size ? 1 : explore ? 0.8 : 0, 4 * K, dt);
    this.campus.update(dt, K); this.platform.update(dt, this.stage.time);
    for (const n of this.nodes.values()) { n.vis = damp(n.vis, n.tVis, 6 * K, dt); n.foc = damp(n.foc, n.tFoc, 6 * K, dt); n.bump = damp(n.bump, 0, 4, dt); n.hover = damp(n.hover, this.hover === n.def.id || this.picked === n.def.id ? 1 : 0, 12, dt); }
    for (const l of this.links.values()) { l.a = damp(l.a, l.tA, 6 * K, dt); l.foc = damp(l.foc, l.tFoc, 6 * K, dt); }
    for (const r of this.ripples) r.t += dt; this.ripples = this.ripples.filter((r) => r.t < 1.1);
    // hover
    const st = this.stage, p = st.pointer;
    if (p.x >= 0 && !p.down) {
      const n = this.nodeAt(p.x, p.y); const id = n?.def.id ?? "";
      if (id !== this.hover) { const old = this.nodes.get(this.hover); this.hover = id; if (old) this.paint(old); if (n) this.paint(n); }
      const item = id ? "" : this.platform.hit(p.x, p.y, st.scale); this.platform.hoverId = item;
      this.campus.hoverId = id || item ? "" : this.campus.hit(p.x, p.y, this.pen());
      st.canvas.style.cursor = id || item ? "pointer" : this.campus.hoverId ? "zoom-in" : "grab";
    } else if (p.x < 0) { this.campus.hoverId = ""; this.platform.hoverId = ""; }
    const moving = Math.abs(Math.log(st.cam.s / st.tcam.s)) > 0.004;
    this.settle = moving ? 0 : this.settle + dt;
  }

  private bg(pen: Pen) {
    const c = pen.c, st = this.stage, w = st.w, h = st.h, m = this.campus.mood;
    c.fillStyle = "#050810"; c.fillRect(0, 0, w, h);
    const [cx, cy] = pen.P(HUB[0], 4, HUB[2]);
    const g = c.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.78);
    g.addColorStop(0, `rgb(${Math.round(20 - m * 6)},${Math.round(36 + m * 12)},${Math.round(74 + m * 22)})`); g.addColorStop(0.45, "#0a1226"); g.addColorStop(1, "#04070e");
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    // isometric dot field
    const step = 5; c.fillStyle = "#8fb0ea";
    for (let i = -14; i <= 22; i++) for (let j = -14; j <= 22; j++) {
      const [x, y] = pen.P(i * step, -1.45, j * step); if (x < -4 || y < -4 || x > w + 4 || y > h + 4) continue;
      const d = Math.hypot(i * step - HUB[0], j * step - HUB[2]); const a = clamp(0.5 - d / 150, 0, 0.5); if (a <= 0.01) continue;
      c.globalAlpha = a; c.beginPath(); c.arc(x, y, Math.max(0.8, pen.s * 0.045), 0, 7); c.fill();
    }
    c.globalAlpha = 1;
  }

  private draw(pen: Pen, t: number) {
    const st = this.stage, c = pen.c;
    this.bg(pen);
    // In the plan view the platform floats over the central court, so it is drawn after the rooms.
    if (!PLAN) this.platform.drawBack(pen, t);
    this.campus.drawGround(pen, t);
    this.campus.drawZones(pen, t, st.dpr, this.settle > 0.12 || SHOT);
    if (PLAN) this.platform.drawBack(pen, t);
    this.platform.drawFront(pen, t, (x, y, z) => st.toScreen(x, y, z));
    // ripples on the floor where something just changed
    for (const r of this.ripples) { const f = r.t / 1.1; pen.disc(r.x, r.z, 0.5 + f * 2.2, null, rgba(r.col, (1 - f) * 0.8), r.y + 0.03, Math.max(1.5, pen.s * 0.08) * (1 - f) + 0.5); }
    // screen positions for pins
    const k = clamp(pen.s / 24, 0.74, 1.12);
    for (const n of this.nodes.values()) {
      const [x, y] = st.toScreen(n.pos[0], n.pos[1], n.pos[2]); n.sx = x; n.sy = y;
      n.size = (34 + 20 * Math.max(n.foc, n.hover)) * k * (0.6 + 0.4 * n.vis) * (1 + n.bump * 0.14);
      n.ty = y - (30 + 8 * n.foc) * k - n.size / 2 + (n.zone === "outside" ? Math.sin(t * 0.9 + n.pos[0]) * 3 : 0);
      n.tx = x;
    }
    // On the deck, tiles fan out so their labels never collide when the camera pulls back.
    const dk = [...this.nodes.values()].filter((n) => n.zone === "deck" && n.tVis > 0).sort((a, b) => a.sx - b.sx);
    if (dk.length > 1) { const span = dk[dk.length - 1].sx - dk[0].sx, want = (dk.length - 1) * 112 * k; if (span < want) { const mid = (dk[0].sx + dk[dk.length - 1].sx) / 2; dk.forEach((n, i) => { n.tx = mid + (i - (dk.length - 1) / 2) * 112 * k; n.ty -= 10 * k; }); } }
    this.drawLinks(c, t, k);
    const list = [...this.nodes.values()].filter((n) => n.vis > 0.03).sort((a, b) => a.sy - b.sy);
    for (const n of list) this.drawPin(c, pen, n, t, k);
    this.layoutLabels(k);
    this.platform.layout(pen, st.w);
  }

  private drawLinks(c: CanvasRenderingContext2D, t: number, k: number) {
    for (const l of this.links.values()) {
      if (l.a < 0.02) continue;
      const A = this.nodes.get(l.def.a)!, B = this.nodes.get(l.def.b)!, col = COL[l.state];
      const x0 = A.tx, y0 = A.ty, x1 = B.tx, y1 = B.ty, dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy) || 1;
      const mx = (x0 + x1) / 2 + (-dy / d) * l.def.bend * d * 0.9, my = (y0 + y1) / 2 + (dx / d) * l.def.bend * d * 0.9 - Math.min(90, d * 0.2) - 8;
      const path = () => { c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo(mx, my, x1, y1); };
      const a = l.a * (0.25 + 0.75 * l.foc);
      c.save(); c.lineCap = "round";
      const s = l.state;
      if (s === "unknown") { c.globalAlpha = a * 0.85; c.setLineDash([2, 9 * k]); path(); c.strokeStyle = "#a9b7d3"; c.lineWidth = 2.6 * k; c.stroke(); }
      else {
        // casing keeps the line readable over light floors
        c.globalAlpha = a * 0.55; path(); c.strokeStyle = "#050a16"; c.lineWidth = 6.5 * k; c.stroke();
        c.globalAlpha = a * (s === "idle" ? 0.5 : 0.95); c.shadowColor = col; c.shadowBlur = s === "idle" ? 0 : 10 * k;
        if (s === "down") c.setLineDash([10 * k, 9 * k]);
        path(); c.strokeStyle = col; c.lineWidth = (s === "idle" ? 1.8 : 2.8) * k; c.stroke(); c.setLineDash([]);
        if (s === "ok" || s === "warn" || s === "pending") {
          const sp = s === "ok" ? 95 : s === "warn" ? 34 : 50, gap = s === "pending" ? 46 : 78;
          c.globalAlpha = a * (s === "pending" ? 0.6 + 0.4 * Math.sin(t * 5) : 1);
          c.setLineDash([11 * k, gap * k]); c.lineDashOffset = -(t * sp + l.phase * 90) * k; c.shadowBlur = 14 * k;
          path(); c.strokeStyle = "#ffffff"; c.lineWidth = 3.4 * k; c.stroke(); c.setLineDash([]);
        }
        if (s === "down") { // a break marker at the midpoint of the curve
          const bx = 0.25 * x0 + 0.5 * mx + 0.25 * x1, by = 0.25 * y0 + 0.5 * my + 0.25 * y1; c.globalAlpha = a; c.shadowBlur = 12 * k;
          c.beginPath(); c.arc(bx, by, 9 * k, 0, 7); c.fillStyle = C.red; c.fill(); c.shadowBlur = 0;
          c.strokeStyle = "#fff"; c.lineWidth = 2.2 * k; c.beginPath(); c.moveTo(bx - 3.6 * k, by - 3.6 * k); c.lineTo(bx + 3.6 * k, by + 3.6 * k); c.moveTo(bx + 3.6 * k, by - 3.6 * k); c.lineTo(bx - 3.6 * k, by + 3.6 * k); c.stroke();
        }
      }
      c.restore();
    }
  }

  private drawPin(c: CanvasRenderingContext2D, pen: Pen, n: NodeRT, t: number, k: number) {
    const s = n.state, col = COL[s], f = Math.max(n.foc, n.hover), deck = n.zone === "deck";
    const pulse = s === "warn" ? 0.5 + 0.5 * Math.sin(t * 4.2) : s === "down" ? 0.5 + 0.5 * Math.sin(t * 7) : s === "pending" ? 0.5 + 0.5 * Math.sin(t * 3.2) : 0;
    const a = n.vis * (0.5 + 0.5 * f);
    c.save(); c.globalAlpha = a;
    // anchor on the floor
    const R = (0.62 + 0.2 * f) * clamp(24 / pen.s, 0.8, 2.2);
    pen.disc(n.pos[0], n.pos[2], R, rgba(col, 0.2 + pulse * 0.14), null, n.pos[1] + 0.02);
    c.shadowColor = col; c.shadowBlur = 10 * k * f; pen.disc(n.pos[0], n.pos[2], R, null, rgba(col, 0.95), n.pos[1] + 0.02, 2 * k); c.shadowBlur = 0;
    if (pulse > 0 && f > 0.5) pen.disc(n.pos[0], n.pos[2], R * (1.15 + pulse * 0.6), null, rgba(col, (1 - pulse) * 0.7), n.pos[1] + 0.02, 1.5 * k);
    // stem
    const g = c.createLinearGradient(0, n.sy, 0, n.ty); g.addColorStop(0, rgba(col, 0.9)); g.addColorStop(1, rgba(col, 0.25));
    c.strokeStyle = g; c.lineWidth = 2 * k; c.beginPath(); c.moveTo(n.sx, n.sy); c.lineTo(n.tx, n.ty + n.size / 2 - 2); c.stroke();
    c.beginPath(); c.arc(n.sx, n.sy, 2.6 * k, 0, 7); c.fillStyle = col; c.fill();
    c.restore();
    // tile
    let style: TileStyle = s === "warn" ? "warn" : s === "down" ? "down" : s === "pending" ? "pending" : s === "unknown" ? "unknown" : deck ? "cyan" : "white";
    if (f < 0.35 && (style === "white" || style === "cyan")) style = "dim";
    drawTile(c, n.tx, n.ty, n.size, style, n.def.icon, n.vis * (0.62 + 0.38 * f), pulse);
    if (f > 0.5 && n.vis > 0.6) {
      const bx = n.tx + n.size * 0.42, by = n.ty - n.size * 0.42, br = 8 * k;
      if (s === "ok" && !deck) badge(c, bx, by, br * 0.66, C.green, "");
      else if (s === "unknown") badge(c, bx, by, br, "#c7d2e8", "?");
      else if (s === "down") badge(c, bx, by, br, "#ffffff", "×");
      else if (s === "warn") badge(c, bx, by, br, "#fff3d6", "!");
      else if (s === "ok" && deck) badge(c, bx, by, br * 0.66, C.cyan2, "");
    }
  }

  /** Place DOM labels above their tiles and push overlapping ones apart. */
  private layoutLabels(k: number) {
    const shown: { n: NodeRT; inner: HTMLElement }[] = [];
    for (const n of this.nodes.values()) {
      if (n.vis < 0.03) { n.el.classList.remove("show"); continue; }
      n.el.style.transform = `translate(${n.tx.toFixed(1)}px,${(n.ty - n.size / 2 - 8 * k).toFixed(1)}px) translate(-50%,-100%)`;
      if (n.el.classList.contains("show")) shown.push({ n, inner: n.el.firstElementChild as HTMLElement });
    }
    this.stage.labels.classList.toggle("far", this.stage.scale < 15.5);
    if (++this.frameNo % (SHOT ? 1 : 4)) return;
    const items = shown.map(({ n, inner }) => { const r = inner.getBoundingClientRect(), cur = this.offsets.get(n.def.id) ?? 0; return { n, inner, l: r.left, r: r.right, t: r.top - cur, b: r.bottom - cur, dy: 0 }; }).filter((x) => x.r > x.l).sort((a, b) => b.b - a.b);
    for (let i = 0; i < items.length; i++) for (let j = 0; j < i; j++) { const a = items[i], b = items[j]; if (a.l < b.r + 6 && a.r > b.l - 6 && a.t + a.dy < b.b + b.dy + 4 && a.b + a.dy > b.t + b.dy - 4) a.dy = b.t + b.dy - 5 - a.b; }
    for (const x of items) { const cur = this.offsets.get(x.n.def.id) ?? 0, nx = Math.abs(x.dy - cur) < 1.5 ? cur : x.dy; this.offsets.set(x.n.def.id, nx); x.inner.style.transform = nx ? `translateY(${nx.toFixed(0)}px)` : ""; }
  }
}

export { RS };
