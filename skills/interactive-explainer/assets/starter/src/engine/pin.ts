import { rr } from "./iso";
import { drawIcon, type IconKind } from "../story/icons";

export type TileStyle = "white" | "warn" | "down" | "pending" | "unknown" | "cyan" | "cyanHot" | "dim";

const STYLE: Record<TileStyle, { a: string; b: string; ink: string; edge: string; glow: string }> = {
  white: { a: "#ffffff", b: "#dfe6f2", ink: "#12213f", edge: "rgba(255,255,255,0.9)", glow: "rgba(120,170,255,0.0)" },
  warn: { a: "#ffd27a", b: "#f59a0b", ink: "#2b1a00", edge: "rgba(255,236,190,0.95)", glow: "rgba(255,176,32,0.75)" },
  down: { a: "#ff8493", b: "#e11d48", ink: "#ffffff", edge: "rgba(255,200,208,0.95)", glow: "rgba(255,77,94,0.8)" },
  pending: { a: "#8ee0ff", b: "#1e9bf0", ink: "#04121f", edge: "rgba(210,244,255,0.95)", glow: "rgba(56,198,255,0.8)" },
  unknown: { a: "#46536f", b: "#262f47", ink: "#c7d2e8", edge: "rgba(160,175,205,0.8)", glow: "rgba(0,0,0,0)" },
  cyan: { a: "#13507f", b: "#0a2a4a", ink: "#e8f8ff", edge: "rgba(90,216,255,0.95)", glow: "rgba(0,188,235,0.45)" },
  cyanHot: { a: "#aeeeff", b: "#00bceb", ink: "#03121f", edge: "rgba(235,251,255,1)", glow: "rgba(0,188,235,0.9)" },
  dim: { a: "#34415f", b: "#222b42", ink: "#aab7d4", edge: "rgba(140,158,196,0.55)", glow: "rgba(0,0,0,0)" },
};

/** A rounded story tile with a line icon. Centre at (cx, cy). */
export function drawTile(c: CanvasRenderingContext2D, cx: number, cy: number, size: number, style: TileStyle, icon: IconKind, alpha = 1, pulse = 0) {
  const s = STYLE[style], h = size / 2, rad = size * 0.3;
  c.save(); c.globalAlpha *= alpha;
  // drop shadow, then glow
  c.shadowColor = "rgba(0,4,14,0.55)"; c.shadowBlur = size * 0.4; c.shadowOffsetY = size * 0.16;
  rr(c, cx - h, cy - h, size, size, rad); c.fillStyle = s.b; c.fill();
  c.shadowOffsetY = 0;
  if (s.glow !== "rgba(0,0,0,0)") { c.shadowColor = s.glow; c.shadowBlur = size * (0.45 + pulse * 0.5); rr(c, cx - h, cy - h, size, size, rad); c.fill(); }
  c.shadowBlur = 0; c.shadowColor = "transparent";
  const g = c.createLinearGradient(cx, cy - h, cx, cy + h); g.addColorStop(0, s.a); g.addColorStop(1, s.b);
  rr(c, cx - h, cy - h, size, size, rad); c.fillStyle = g; c.fill();
  // glassy top light
  const hi = c.createLinearGradient(cx, cy - h, cx, cy); hi.addColorStop(0, "rgba(255,255,255,0.34)"); hi.addColorStop(1, "rgba(255,255,255,0)");
  rr(c, cx - h + 1.5, cy - h + 1.5, size - 3, size * 0.5, rad * 0.9); c.fillStyle = hi; c.fill();
  rr(c, cx - h + 0.5, cy - h + 0.5, size - 1, size - 1, rad); c.strokeStyle = s.edge; c.lineWidth = 1; if (style === "unknown") c.setLineDash([3, 3]); c.stroke(); c.setLineDash([]);
  // icon
  c.translate(cx, cy); const k = size / 46; c.scale(k, k);
  c.strokeStyle = s.ink; c.lineWidth = 2; c.lineCap = "round"; c.lineJoin = "round";
  drawIcon(c, icon);
  c.restore();
}

/** Small status badge at a tile's corner. */
export function badge(c: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string, glyph: string) {
  c.save(); c.shadowColor = "rgba(0,0,0,0.4)"; c.shadowBlur = 4;
  c.beginPath(); c.arc(x, y, r, 0, 7); c.fillStyle = fill; c.fill(); c.shadowBlur = 0; c.strokeStyle = "#07101f"; c.lineWidth = 1.5; c.stroke();
  if (glyph) { c.fillStyle = "#07101f"; c.font = `800 ${r * 1.35}px Inter, system-ui, sans-serif`; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(glyph, x, y + r * 0.08); }
  c.restore();
}
