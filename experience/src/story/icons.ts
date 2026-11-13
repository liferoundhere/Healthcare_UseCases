export type IconKind =
  | "pump"
  | "monitor"
  | "server"
  | "database"
  | "shield"
  | "person"
  | "people"
  | "ambulance"
  | "ct"
  | "cloud"
  | "clock"
  | "badge"
  | "wifi"
  | "router"
  | "rack"
  | "gear"
  | "bell"
  | "building"
  | "home"
  | "gpu"
  | "mic"
  | "chat"
  | "doc"
  | "eye"
  | "lock"
  | "canvas"
  | "topology"
  | "key"
  | "scan"
  | "board"
  | "phone"
  | "pill"
  | "flask";

type C = CanvasRenderingContext2D;

function rr(c: C, x: number, y: number, w: number, h: number, r: number) {
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function circle(c: C, x: number, y: number, r: number) {
  c.moveTo(x + r, y);
  c.arc(x, y, r, 0, Math.PI * 2);
}

function line(c: C, x1: number, y1: number, x2: number, y2: number) {
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
}

function person(c: C, dx: number, s: number) {
  circle(c, dx, -6 * s, 5 * s);
  c.moveTo(dx - 10 * s, 12 * s);
  c.quadraticCurveTo(dx - 10 * s, 1 * s, dx, 1 * s);
  c.quadraticCurveTo(dx + 10 * s, 1 * s, dx + 10 * s, 12 * s);
}

export function drawIcon(c: C, kind: IconKind) {
  c.beginPath();
  switch (kind) {
    case "pump":
      rr(c, -9, -11, 16, 20, 3);
      rr(c, -6, -7, 10, 6, 1);
      line(c, -3, 3, 1, 3);
      line(c, 12, -15, 12, 14);
      line(c, 7, -2, 12, -2);
      break;
    case "monitor":
      rr(c, -13, -10, 26, 17, 2);
      line(c, 0, 7, 0, 12);
      line(c, -6, 12, 6, 12);
      c.moveTo(-9, -1);
      c.lineTo(-4, -1);
      c.lineTo(-2, -6);
      c.lineTo(1, 4);
      c.lineTo(3, -1);
      c.lineTo(9, -1);
      break;
    case "server":
      rr(c, -11, -12, 22, 7, 1.5);
      rr(c, -11, -3.5, 22, 7, 1.5);
      rr(c, -11, 5, 22, 7, 1.5);
      circle(c, 7, -8.5, 1);
      circle(c, 7, 0, 1);
      circle(c, 7, 8.5, 1);
      break;
    case "database":
      c.ellipse(0, -8, 11, 4, 0, 0, Math.PI * 2);
      line(c, -11, -8, -11, 8);
      line(c, 11, -8, 11, 8);
      c.moveTo(-11, 8);
      c.ellipse(0, 8, 11, 4, 0, Math.PI, 0, true);
      c.moveTo(-11, 0);
      c.ellipse(0, 0, 11, 4, 0, Math.PI, 0, true);
      break;
    case "shield":
      c.moveTo(0, -13);
      c.lineTo(11, -8);
      c.lineTo(11, 1);
      c.quadraticCurveTo(11, 9, 0, 13);
      c.quadraticCurveTo(-11, 9, -11, 1);
      c.lineTo(-11, -8);
      c.closePath();
      c.moveTo(-5, 0);
      c.lineTo(-1, 4);
      c.lineTo(6, -4);
      break;
    case "person":
      person(c, 0, 1);
      break;
    case "people":
      person(c, -6, 0.8);
      person(c, 6, 0.8);
      break;
    case "ambulance":
      rr(c, -14, -7, 18, 13, 2);
      rr(c, 4, -3, 9, 9, 2);
      circle(c, -8, 8, 3);
      circle(c, 7, 8, 3);
      line(c, -5, -4, -5, 3);
      line(c, -8.5, -0.5, -1.5, -0.5);
      break;
    case "ct":
      circle(c, 0, -2, 11);
      circle(c, 0, -2, 5);
      line(c, -15, 11, 15, 11);
      line(c, -4, 11, -4, 7);
      line(c, 4, 11, 4, 7);
      break;
    case "cloud":
      c.moveTo(-10, 8);
      c.arc(-7, 2, 6, Math.PI * 0.5, Math.PI * 1.5);
      c.arc(0, -3, 8, Math.PI * 1.1, Math.PI * 1.9);
      c.arc(8, 2, 6, Math.PI * 1.5, Math.PI * 0.5);
      c.closePath();
      break;
    case "clock":
      circle(c, 0, 0, 12);
      line(c, 0, 0, 0, -7);
      line(c, 0, 0, 5, 3);
      break;
    case "badge":
      rr(c, -8, -12, 16, 23, 3);
      circle(c, 0, -3, 4);
      line(c, -4, 5, 4, 5);
      line(c, -3, 8, 3, 8);
      line(c, 0, -12, 0, -15);
      break;
    case "wifi":
      c.moveTo(-12, -2);
      c.arc(0, 8, 15, Math.PI * 1.25, Math.PI * 1.75);
      c.moveTo(-7.5, 2);
      c.arc(0, 8, 9.5, Math.PI * 1.25, Math.PI * 1.75);
      c.moveTo(-3.5, 5.5);
      c.arc(0, 8, 4.5, Math.PI * 1.25, Math.PI * 1.75);
      circle(c, 0, 9, 1.4);
      break;
    case "router":
      rr(c, -13, -2, 26, 11, 2);
      line(c, -7, -2, -10, -12);
      line(c, 7, -2, 10, -12);
      circle(c, -6, 3.5, 1);
      circle(c, -1, 3.5, 1);
      circle(c, 4, 3.5, 1);
      break;
    case "rack":
      rr(c, -9, -13, 18, 26, 2);
      line(c, -9, -6, 9, -6);
      line(c, -9, 1, 9, 1);
      line(c, -9, 8, 9, 8);
      circle(c, 5, -9.5, 0.9);
      circle(c, 5, -2.5, 0.9);
      circle(c, 5, 4.5, 0.9);
      break;
    case "gear":
      circle(c, 0, 0, 6);
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        line(c, Math.cos(a) * 8, Math.sin(a) * 8, Math.cos(a) * 12, Math.sin(a) * 12);
      }
      break;
    case "bell":
      c.moveTo(-9, 7);
      c.quadraticCurveTo(-8, -11, 0, -11);
      c.quadraticCurveTo(8, -11, 9, 7);
      c.closePath();
      line(c, -11, 7, 11, 7);
      circle(c, 0, 10, 2);
      break;
    case "building":
      rr(c, -11, -12, 22, 25, 1.5);
      for (const y of [-7, -1, 5]) {
        rr(c, -7, y, 4, 3, 0.5);
        rr(c, 3, y, 4, 3, 0.5);
      }
      break;
    case "home":
      c.moveTo(-13, -1);
      c.lineTo(0, -12);
      c.lineTo(13, -1);
      rr(c, -9, -2, 18, 14, 1);
      rr(c, -3, 4, 6, 8, 0.5);
      break;
    case "gpu":
      rr(c, -14, -8, 28, 16, 2);
      circle(c, -6, 0, 4.5);
      circle(c, 6, 0, 4.5);
      line(c, -10, 8, -10, 11);
      line(c, 0, 8, 0, 11);
      line(c, 10, 8, 10, 11);
      break;
    case "mic":
      rr(c, -4.5, -13, 9, 15, 4.5);
      c.moveTo(-9, -2);
      c.quadraticCurveTo(-9, 8, 0, 8);
      c.quadraticCurveTo(9, 8, 9, -2);
      line(c, 0, 8, 0, 13);
      line(c, -5, 13, 5, 13);
      break;
    case "chat":
      rr(c, -13, -11, 26, 17, 4);
      c.moveTo(-5, 6);
      c.lineTo(-8, 12);
      c.lineTo(1, 6);
      line(c, -7, -4, 7, -4);
      line(c, -7, 1, 3, 1);
      break;
    case "doc":
      c.moveTo(-9, -13);
      c.lineTo(4, -13);
      c.lineTo(9, -8);
      c.lineTo(9, 13);
      c.lineTo(-9, 13);
      c.closePath();
      line(c, -5, -4, 5, -4);
      line(c, -5, 1, 5, 1);
      line(c, -5, 6, 2, 6);
      break;
    case "eye":
      c.moveTo(-14, 0);
      c.quadraticCurveTo(0, -13, 14, 0);
      c.quadraticCurveTo(0, 13, -14, 0);
      circle(c, 0, 0, 4.5);
      break;
    case "lock":
      rr(c, -10, -2, 20, 15, 2);
      c.moveTo(-6, -2);
      c.lineTo(-6, -6);
      c.arc(0, -6, 6, Math.PI, 0);
      c.lineTo(6, -2);
      line(c, 0, 4, 0, 8);
      break;
    case "canvas":
      rr(c, -13, -10, 26, 20, 2);
      rr(c, -10, -7, 9, 6, 1);
      rr(c, 1, -7, 9, 6, 1);
      rr(c, -10, 1, 20, 6, 1);
      break;
    case "topology":
      circle(c, 0, -9, 3);
      circle(c, -10, 7, 3);
      circle(c, 10, 7, 3);
      circle(c, 0, 2, 2.5);
      line(c, 0, -6, 0, -0.5);
      line(c, -2, 3.5, -8, 6);
      line(c, 2, 3.5, 8, 6);
      line(c, -7, 7, 7, 7);
      break;
    case "key":
      circle(c, -6, 0, 6);
      line(c, 0, 0, 13, 0);
      line(c, 9, 0, 9, 5);
      line(c, 13, 0, 13, 4);
      break;
    case "scan":
      c.moveTo(-12, 12);
      c.arc(-12, 12, 22, -Math.PI / 2, 0);
      c.moveTo(-12, 0);
      c.arc(-12, 12, 12, -Math.PI / 2, 0);
      line(c, -12, 12, 4, -4);
      break;
    case "board":
      rr(c, -13, -10, 26, 20, 1.5);
      rr(c, -9, -6, 8, 6, 0.5);
      rr(c, 2, -4, 7, 9, 0.5);
      line(c, -8, 4, -1, 4);
      circle(c, -5, -7, 1.3);
      circle(c, 5.5, -5, 1.3);
      break;
    case "phone":
      rr(c, -7, -13, 14, 26, 3);
      line(c, -3, 9, 3, 9);
      line(c, -7, -8, 7, -8);
      break;
    case "pill":
      c.save();
      c.rotate(-Math.PI / 4);
      rr(c, -12, -5, 24, 10, 5);
      line(c, 0, -5, 0, 5);
      c.restore();
      break;
    case "flask":
      c.moveTo(-4, -13);
      c.lineTo(-4, -4);
      c.lineTo(-11, 10);
      c.quadraticCurveTo(-11, 12, -8, 12);
      c.lineTo(8, 12);
      c.quadraticCurveTo(11, 12, 11, 10);
      c.lineTo(4, -4);
      c.lineTo(4, -13);
      line(c, -6, -13, 6, -13);
      line(c, -7, 4, 7, 4);
      break;
  }
  c.stroke();
}
