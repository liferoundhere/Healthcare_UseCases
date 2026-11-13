// Hospital world kit for the Cisco 3D stage.
// A "hospital world" is built from three things:
//   1. real layouts (wards, data halls, imaging suites, clinics, houses, campuses) made of
//      floor plates, glass walls, beds, desks and racks;
//   2. devices (pumps, EHR racks, CT, APs...) and data links, taken from the shared narrative
//      data so the 3D story and the 2D schematic never disagree;
//   3. a Cisco Cloud Control plane that floats above the building and only appears when the
//      story turns to "With Cisco Cloud Control".
import * as THREE from 'three';
import { C, damp, glowSprite, glowTexture, edgeLines, setOpacity, OVERLAY, roundRect, gridFloor, label } from './core.js';
import { NARR } from './narrative.js';
import { ui } from './ui.js';

export const ST = { ok: 0x6cc04a, warn: 0xfbab18, down: 0xe2231a, pending: 0x3d9bff, unknown: 0x7d8da6, idle: 0x2c4468, off: 0x2c4468 };
const RANK = { down: 5, warn: 4, pending: 3, unknown: 2, ok: 1, idle: 0, off: 0 };
const FONT = '"CiscoSansTT", Inter, "Segoe UI", Helvetica, Arial, sans-serif';
const HEX = (n) => '#' + n.toString(16).padStart(6, '0');

// ------------------------------------------------------------------ materials
const M = {
  body: new THREE.MeshStandardMaterial({ color: 0x0f2a4d, roughness: 0.5, metalness: 0.3, emissive: 0x04101f, emissiveIntensity: 1 }),
  floor: new THREE.MeshStandardMaterial({ color: 0x0b1d36, roughness: 0.85, metalness: 0.1 }),
  wall: new THREE.MeshStandardMaterial({ color: 0x1a4676, roughness: 0.3, metalness: 0.2, transparent: true, opacity: 0.32, depthWrite: false }),
  glass: new THREE.MeshStandardMaterial({ color: 0x2a6aa8, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.28, depthWrite: false }),
  linen: new THREE.MeshStandardMaterial({ color: 0x9db8d4, roughness: 0.8, emissive: 0x1d3552, emissiveIntensity: 0.6 }),
  steel: new THREE.MeshStandardMaterial({ color: 0x5f7e9f, roughness: 0.35, metalness: 0.7 }),
  road: new THREE.MeshStandardMaterial({ color: 0x0a1626, roughness: 0.95 }),
  lane: new THREE.MeshBasicMaterial({ color: 0x3a587c }),
  green: new THREE.MeshStandardMaterial({ color: 0x143c2c, roughness: 0.9, emissive: 0x0c2a1c, emissiveIntensity: 1 }),
};

const box = (w, h, d, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y + h / 2, z); return o; };
const cyl = (r, h, m, x = 0, y = 0, z = 0, seg = 20, r2 = r) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(r2, r, h, seg), m); o.position.set(x, y + h / 2, z); return o; };
const sph = (r, m, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); return o; };
const tor = (R, t, m, x = 0, y = 0, z = 0, rx = 0, ry = 0, arc = Math.PI * 2) => { const o = new THREE.Mesh(new THREE.TorusGeometry(R, t, 8, 36, arc), m); o.position.set(x, y, z); o.rotation.set(rx, ry, 0); return o; };
const rod = (a, b, r, m) => {
  const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b);
  const len = va.distanceTo(vb);
  const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 6), m);
  o.position.copy(va).add(vb).multiplyScalar(0.5);
  o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vb.clone().sub(va).normalize());
  return o;
};
const G = (...k) => { const g = new THREE.Group(); k.forEach((x) => g.add(x)); return g; };

// ------------------------------------------------------------------ device models
// Each model gets A (accent, glows in the state colour), B (dark body), L (glass).
const MODEL = {
  pump: (A, B) => G(cyl(0.06, 2.7, B, 0, 0, 0, 8), cyl(0.55, 0.08, B, 0, 0, 0, 16), box(1, 0.75, 0.55, B, 0, 1.25), box(0.75, 0.3, 0.03, A, 0, 1.55, 0.29), box(0.34, 0.5, 0.22, A, 0.7, 1.95)),
  monitor: (A, B) => G(cyl(0.07, 1.1, B, 0, 0, 0, 8), cyl(0.5, 0.08, B), box(1.7, 1.1, 0.14, B, 0, 1.1), box(1.5, 0.85, 0.03, A, 0, 1.22, 0.09)),
  server: (A, B) => G(box(1.2, 2.5, 1.0, B), ...[0.35, 0.8, 1.25, 1.7, 2.1].map((y) => box(0.95, 0.12, 0.03, A, 0, y, 0.52))),
  database: (A, B) => G(...[0, 0.5, 1.0].map((y) => cyl(0.85, 0.4, B, 0, y)), ...[0.4, 0.9, 1.4].map((y) => cyl(0.87, 0.06, A, 0, y))),
  shield: (A, B) => { const g = G(cyl(1, 0.3, B, 0, 0, 0, 6), cyl(0.7, 0.34, A, 0, 0, 0, 6)); g.children.forEach((c) => { c.rotation.x = Math.PI / 2; c.position.y = 1.4; }); return g; },
  person: (A) => G(cyl(0.32, 0.9, A, 0, 0.2, 0, 14), sph(0.3, A, 0, 1.45, 0)),
  people: (A) => G(cyl(0.28, 0.8, A, -0.45, 0.2, 0, 14), sph(0.26, A, -0.45, 1.3, 0), cyl(0.28, 0.8, A, 0.45, 0.2, 0, 14), sph(0.26, A, 0.45, 1.3, 0)),
  ambulance: (A, B) => G(box(2.8, 1.3, 1.3, B, 0, 0.35), box(1, 1, 1.25, B, 1.5, 0.35), box(2.84, 0.16, 1.34, A, 0, 0.9), box(0.5, 0.18, 0.9, A, -0.3, 1.65), cyl(0.3, 0.3, B, -0.9, 0, 0.7, 12), cyl(0.3, 0.3, B, 1.2, 0, 0.7, 12)),
  ct: (A, B) => G(tor(1.15, 0.4, B, 0, 1.55, 0), tor(0.78, 0.05, A, 0, 1.55, 0.05), box(0.9, 0.18, 3.2, B, 0, 0.75, 0.6), box(0.5, 0.04, 2.6, A, 0, 0.94, 0.6), box(0.2, 0.75, 0.2, B, 0, 0, 1.4)),
  cloud: (A, B, L) => G(sph(0.8, L, -1.0, 1.1, 0), sph(1.15, L, 0, 1.6, 0), sph(0.85, L, 1.1, 1.1, 0), sph(0.9, L, 0.1, 1.0, 0.4), tor(1.9, 0.06, A, 0, 0.15, 0, Math.PI / 2)),
  clock: (A, B) => { const face = cyl(1.05, 0.25, B); face.rotation.x = Math.PI / 2; face.position.set(0, 1.5, 0); return G(cyl(0.1, 0.5, B), face, tor(1.05, 0.07, A, 0, 1.5, 0.14), box(0.08, 0.75, 0.05, A, 0, 1.5, 0.17), box(0.55, 0.08, 0.05, A, 0.27, 1.46, 0.17)); },
  badge: (A, B) => G(box(0.7, 1.05, 0.1, B, 0, 1.0), box(0.45, 0.4, 0.03, A, 0, 1.55, 0.07), box(0.5, 0.08, 0.03, A, 0, 1.2, 0.07), cyl(0.03, 0.7, A, 0, 2.05, 0, 6)),
  wifi: (A, B) => G(cyl(0.04, 2.5, B, 0, 0.3, 0, 6), cyl(0.6, 0.16, B, 0, 2.7, 0, 24), tor(0.55, 0.05, A, 0, 2.7, 0, Math.PI / 2), tor(0.95, 0.03, A, 0, 2.2, 0, Math.PI / 2), tor(1.35, 0.03, A, 0, 1.7, 0, Math.PI / 2)),
  router: (A, B) => G(box(1.6, 0.4, 1.0, B, 0, 0.7), box(0.12, 0.08, 0.03, A, -0.5, 0.95, 0.51), box(0.12, 0.08, 0.03, A, -0.2, 0.95, 0.51), box(0.12, 0.08, 0.03, A, 0.1, 0.95, 0.51), rod([-0.6, 1.1, 0], [-0.9, 2.1, 0], 0.04, A), rod([0.6, 1.1, 0], [0.9, 2.1, 0], 0.04, A), cyl(0.5, 0.7, B)),
  gear: (A, B) => { const g = new THREE.Group(); const s = new THREE.Group(); s.add(cyl(0.7, 0.3, B)); for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; const t = box(0.3, 0.3, 0.3, B, Math.cos(a) * 0.85, 0, Math.sin(a) * 0.85); s.add(t); } s.add(cyl(0.3, 0.34, A)); s.rotation.x = Math.PI / 2; s.position.y = 1.4; g.add(s); return g; },
  bell: (A, B) => G(cyl(0.7, 0.2, B, 0, 0.1), new THREE.Mesh(new THREE.SphereGeometry(0.62, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), A), cyl(0.12, 0.3, B, 0, 0.8)),
  building: (A, B) => G(box(2, 2.4, 1.5, B), ...[0.4, 1.05, 1.7].flatMap((y) => [-0.55, 0.55].map((x) => box(0.5, 0.32, 0.03, A, x, y, 0.77)))),
  home: (A, B) => { const r = cyl(0, 1, B, 0, 1.3, 0, 4, 1.65); r.rotation.y = Math.PI / 4; return G(box(2, 1.4, 1.7, B), r, box(0.45, 0.8, 0.03, A, -0.4, 0, 0.87), box(0.5, 0.4, 0.03, A, 0.45, 0.6, 0.87)); },
  gpu: (A, B) => G(box(2, 1.1, 1.0, B, 0, 0.5), tor(0.34, 0.06, A, -0.5, 1.05, 0.52), tor(0.34, 0.06, A, 0.5, 1.05, 0.52), box(1.8, 0.05, 0.03, A, 0, 0.62, 0.52), box(0.5, 0.6, 0.5, B, 0, 0, 0)),
  mic: (A, B) => { const g = G(cyl(0.05, 1.5, B, 0, 0, 0, 6), cyl(0.4, 0.08, B)); const c = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.5, 4, 10), A); c.position.y = 1.9; g.add(c); return g; },
  chat: (A, B) => G(box(1.8, 1.1, 0.14, B, 0, 1.2), box(1.3, 0.1, 0.03, A, 0, 2.0, 0.09), box(1.0, 0.1, 0.03, A, -0.15, 1.7, 0.09), box(1.4, 0.1, 0.03, A, 0, 1.4, 0.09), cyl(0, 0.5, B, -0.5, 0.75, 0, 4, 0.3)),
  doc: (A, B) => G(box(1.1, 1.5, 0.09, B, 0, 0.9), ...[2.1, 1.8, 1.5, 1.2].map((y, i) => box(i === 3 ? 0.4 : 0.75, 0.07, 0.03, A, i === 3 ? -0.2 : 0, y, 0.06))),
  eye: (A, B) => G(sph(1, B, 0, 1.5, 0, 1, 0.55, 0.35), sph(0.38, A, 0, 1.5, 0.3), tor(0.9, 0.04, A, 0, 1.5, 0.1, 0, 0)),
  lock: (A, B) => { const s = tor(0.42, 0.08, A, 0, 1.75, 0, 0, 0, Math.PI); return G(box(1.3, 1.0, 0.55, B, 0, 0.9), s, box(0.12, 0.3, 0.03, A, 0, 1.15, 0.29)); },
  canvas: (A, B, L) => G(box(2.8, 1.8, 0.1, L, 0, 1.0), box(1.1, 0.7, 0.04, A, -0.6, 1.9, 0.07), box(1.1, 0.7, 0.04, A, 0.6, 1.9, 0.07), box(2.4, 0.5, 0.04, A, 0, 1.15, 0.07)),
  topology: (A, B) => { const P = [[0, 2.4, 0], [-1, 1.2, 0], [1, 1.2, 0], [0, 1.5, 0.4]]; return G(...P.map((p) => sph(0.22, A, ...p)), rod(P[0], P[1], 0.04, A), rod(P[0], P[2], 0.04, A), rod(P[1], P[2], 0.04, A), rod(P[3], P[0], 0.04, A)); },
  key: (A, B) => G(tor(0.42, 0.11, A, -0.6, 1.4, 0), box(1.2, 0.14, 0.14, A, 0.15, 1.33), box(0.14, 0.4, 0.14, A, 0.5, 1.0), box(0.14, 0.3, 0.14, A, 0.8, 1.05)),
  scan: (A, B) => G(tor(0.7, 0.09, A, 0, 1.6, 0), rod([0.5, 1.1, 0], [1.2, 0.2, 0], 0.1, B), box(1.4, 0.04, 1.0, B, 0, 0.9)),
  board: (A, B) => G(box(2.2, 1.5, 0.1, B, 0, 0.9), box(0.5, 0.4, 0.03, A, -0.6, 1.8, 0.07), box(0.6, 0.35, 0.03, A, 0.35, 1.5, 0.07), box(0.5, 0.4, 0.03, A, -0.2, 1.0, 0.07), cyl(0.04, 0.9, B, -1, 0, 0, 6), cyl(0.04, 0.9, B, 1, 0, 0, 6)),
  phone: (A, B) => G(box(0.6, 1.1, 0.1, B, 0, 0.9), box(0.46, 0.8, 0.03, A, 0, 1.05, 0.07)),
  pill: (A) => { const c = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.9, 4, 12), A); c.position.y = 1.3; c.rotation.z = Math.PI / 4; return G(c); },
  flask: (A, B) => G(cyl(0.7, 0.8, B, 0, 0, 0, 16, 0.2), cyl(0.18, 0.7, B, 0, 0.8, 0, 12), cyl(0.5, 0.36, A, 0, 0.1, 0, 16, 0.3)),
};
MODEL.rack = MODEL.server;

// ------------------------------------------------------------------ tags (crisp, on the overlay layer)
function makeTag() {
  const c = document.createElement('canvas');
  const g = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false, fog: false, toneMapped: false });
  const s = new THREE.Sprite(mat);
  s.layers.set(OVERLAY);
  let last = '';
  s.userData.set = (title, cap, hex, unit = 0.0145) => {
    const key = `${title}|${cap}|${hex}`;
    if (key === last) return;
    last = key;
    const T = 54, S = 38, P = 26;
    g.font = `700 ${T}px ${FONT}`;
    let w = g.measureText(title).width;
    if (cap) { g.font = `500 ${S}px ${FONT}`; w = Math.max(w, g.measureText(cap).width); }
    const W = Math.ceil(w + P * 2 + 14), H = cap ? T + S + P * 2 + 6 : T + P * 1.6;
    c.width = W; c.height = H;
    g.fillStyle = 'rgba(4,12,26,0.86)'; roundRect(g, 2, 2, W - 4, H - 4, 22); g.fill();
    g.strokeStyle = hex; g.lineWidth = 4; g.globalAlpha = 0.9; roundRect(g, 3, 3, W - 6, H - 6, 22); g.stroke(); g.globalAlpha = 1;
    g.fillStyle = hex; g.beginPath(); g.arc(P + 4, P + T / 2 - 2, 9, 0, Math.PI * 2); g.fill();
    g.textBaseline = 'middle'; g.fillStyle = '#ffffff'; g.font = `700 ${T}px ${FONT}`;
    g.fillText(title, P + 26, P + T / 2 - 2);
    if (cap) { g.fillStyle = '#b9ccdf'; g.font = `500 ${S}px ${FONT}`; g.fillText(cap, P + 6, P + T + S / 2 + 2); }
    tex.needsUpdate = true;
    s.scale.set(W * unit, H * unit, 1);
  };
  return s;
}

function areaTag(text, cisco) {
  const l = label(text.toUpperCase(), { size: 0.5, color: cisco ? '#7fe3ff' : '#8fb2d6', weight: 700, pad: 10, opacity: cisco ? 1 : 0.85 });
  return l;
}

// ------------------------------------------------------------------ the kit
function makeKit(root) {
  const kit = { root, areas: new Map(), walkers: [], tints: [] };

  kit.plate = (x, z, w, d, { color = 0x0b1d36, h = 0.25, y = 0, edge = 0x1f6fa8, edgeOp = 0.5, mat = null } = {}) => {
    const g = new THREE.Group();
    const geo = new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Mesh(geo, mat || new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.1, emissive: 0x000000 }));
    m.position.y = h / 2;
    g.add(m, Object.assign(edgeLines(geo, edge, edgeOp), { position: new THREE.Vector3(0, h / 2, 0) }));
    g.position.set(x, y, z);
    root.add(g);
    g.userData.mesh = m;
    return g;
  };

  // A stateful area: floor plate with a name, optionally tinted by the worst state of watched devices.
  kit.area = (id, x, z, w, d, name, o = {}) => {
    const cisco = !!o.cisco;
    const y = o.y ?? 0;
    const tone = o.tone ?? C.sky;
    const p = kit.plate(x, z, w, d, {
      h: cisco ? 0.16 : o.h ?? 0.25, y,
      color: cisco ? 0x0a3a66 : o.color ?? 0x0b1d36,
      edge: cisco ? tone : o.edge ?? 0x1f6fa8, edgeOp: cisco ? 0.95 : 0.5,
      mat: cisco ? new THREE.MeshStandardMaterial({ color: tone, transparent: true, opacity: 0.22, emissive: tone, emissiveIntensity: 0.35, depthWrite: false }) : null,
    });
    const a = { id, g: p, watch: o.watch || [], cisco, w, d, x, z, y, tint: new THREE.Color(0x000000), a: 0, ta: 0, hidden: !!(o.hidden || cisco) };
    if (name) {
      const t = areaTag(name, cisco);
      t.position.set(x - w / 2 + (t.scale.x / 2) + 0.4, y + (cisco ? 1.0 : 0.9), z + d / 2 - 0.5);
      root.add(t);
      a.tag = t;
    }
    if (cisco) {
      const pm = new THREE.LineBasicMaterial({ color: tone, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false });
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
        const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x + sx * w / 2, y, z + sz * d / 2), new THREE.Vector3(x + sx * w / 2, 0.3, z + sz * d / 2)]), pm);
        root.add(l); (a.extra ||= []).push(l);
      });
      a.glow = glowSprite(tone, Math.max(w, d) * 1.1, 0.12); a.glow.position.set(x, y + 0.3, z); root.add(a.glow);
    }
    kit.areas.set(id, a);
    return a;
  };

  kit.walls = (x, z, w, d, { h = 1.7, gaps = [], t = 0.16, y = 0 } = {}) => {
    // gaps: [{ s:'n'|'s'|'e'|'w', at: offset from centre, w: width }]
    const seg = (cx, cz, sw, sd) => {
      if (sw <= 0.01 || sd <= 0.01) return;
      const geo = new THREE.BoxGeometry(sw, h, sd);
      const m = new THREE.Mesh(geo, M.wall);
      m.position.set(cx, y + 0.25 + h / 2, cz);
      root.add(m, Object.assign(edgeLines(geo, 0x57b7f0, 0.55), { position: m.position.clone() }));
    };
    const sides = {
      n: [x, z - d / 2, w, t, 'x'], s: [x, z + d / 2, w, t, 'x'], w: [x - w / 2, z, t, d, 'z'], e: [x + w / 2, z, t, d, 'z'],
    };
    Object.entries(sides).forEach(([k, [cx, cz, sw, sd, ax]]) => {
      const gs = gaps.filter((g) => g.s === k);
      if (!gs.length) { seg(cx, cz, sw, sd); return; }
      const g0 = gs[0];
      const len = ax === 'x' ? sw : sd;
      const a0 = -len / 2, b0 = g0.at - g0.w / 2, b1 = g0.at + g0.w / 2, a1 = len / 2;
      if (ax === 'x') { seg(cx + (a0 + b0) / 2, cz, b0 - a0, sd); seg(cx + (b1 + a1) / 2, cz, a1 - b1, sd); }
      else { seg(cx, cz + (a0 + b0) / 2, sw, b0 - a0); seg(cx, cz + (b1 + a1) / 2, sw, a1 - b1); }
    });
  };

  // ---- furniture
  kit.bed = (x, z, rot = 0, occupied = true) => {
    const g = new THREE.Group();
    g.add(box(1.05, 0.4, 2.2, M.steel, 0, 0.28), box(0.95, 0.22, 2.05, M.linen, 0, 0.68), box(0.6, 0.16, 0.4, M.linen, 0, 0.9, -0.7), box(1.1, 0.8, 0.08, M.steel, 0, 0.3, -1.12));
    if (occupied) { const p = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.9, 4, 10), new THREE.MeshStandardMaterial({ color: 0x0b2a46, emissive: 0x2a8fc4, emissiveIntensity: 0.5, roughness: 0.6 })); p.rotation.x = Math.PI / 2; p.position.set(0, 1.08, 0.1); g.add(p); }
    g.position.set(x, 0.25, z); g.rotation.y = rot; root.add(g); return g;
  };
  kit.desk = (x, z, w = 3, rot = 0, screens = 1) => {
    const g = new THREE.Group();
    g.add(box(w, 0.1, 1.2, M.steel, 0, 0.9), box(0.1, 0.9, 1.0, M.body, -w / 2 + 0.2, 0), box(0.1, 0.9, 1.0, M.body, w / 2 - 0.2, 0));
    for (let i = 0; i < screens; i++) { const sx = screens === 1 ? 0 : (i - (screens - 1) / 2) * 1.1; g.add(box(0.9, 0.55, 0.06, M.body, sx, 1.05, -0.2), box(0.8, 0.45, 0.02, new THREE.MeshBasicMaterial({ color: 0x2aa8e0, transparent: true, opacity: 0.55 }), sx, 1.1, -0.16)); }
    g.position.set(x, 0.25, z); g.rotation.y = rot; root.add(g); return g;
  };
  kit.chair = (x, z, rot = 0) => { const g = G(box(0.6, 0.12, 0.6, M.body, 0, 0.5), box(0.6, 0.6, 0.1, M.body, 0, 0.55, -0.3), cyl(0.05, 0.5, M.steel, 0, 0, 0, 6)); g.position.set(x, 0.25, z); g.rotation.y = rot; root.add(g); return g; };
  kit.rackRow = (x, z, n, rot = 0, gap = 1.35) => {
    const g = new THREE.Group();
    for (let i = 0; i < n; i++) {
      const r = G(box(1.0, 2.6, 1.0, M.body), box(0.82, 0.07, 0.03, new THREE.MeshBasicMaterial({ color: 0x1cc8ff, transparent: true, opacity: 0.8 }), 0, 0.5, 0.52), box(0.82, 0.07, 0.03, new THREE.MeshBasicMaterial({ color: 0x6cc04a }), 0, 1.2, 0.52), box(0.82, 0.07, 0.03, new THREE.MeshBasicMaterial({ color: 0x1cc8ff, transparent: true, opacity: 0.6 }), 0, 1.9, 0.52));
      r.position.x = (i - (n - 1) / 2) * gap; g.add(r);
    }
    g.position.set(x, 0.25, z); g.rotation.y = rot; root.add(g); return g;
  };
  kit.stairs = (x, z, w = 3, d = 4, rot = 0) => { const g = new THREE.Group(); for (let i = 0; i < 8; i++) g.add(box(w, 0.18 * (i + 1), d / 8, M.steel, 0, 0, -d / 2 + (i + 0.5) * d / 8)); g.position.set(x, 0.25, z); g.rotation.y = rot; root.add(g); return g; };
  kit.tree = (x, z, s = 1) => { const g = G(cyl(0.12, 0.8, M.steel, 0, 0, 0, 6), sph(0.7, M.green, 0, 1.3, 0)); g.position.set(x, 0.25, z); g.scale.setScalar(s); root.add(g); return g; };
  kit.road = (x, z, w, d) => { const r = kit.plate(x, z, w, d, { mat: M.road, h: 0.12, edge: 0x24405f, edgeOp: 0.3 }); const horiz = w > d; const n = Math.floor((horiz ? w : d) / 3); for (let i = 0; i < n; i++) { const l = box(horiz ? 1.2 : 0.14, 0.02, horiz ? 0.14 : 1.2, M.lane); l.position.set(horiz ? x - w / 2 + 1.5 + i * 3 : x, 0.13, horiz ? z : z - d / 2 + 1.5 + i * 3); root.add(l); } return r; };
  kit.sign = (text, x, y, z, o = {}) => { const l = label(text, { size: 0.55, color: o.color || '#9fc4e6', weight: 600, pad: 8, bg: o.bg || null, border: o.border || null }); l.position.set(x, y, z); root.add(l); return l; };

  // ---- composite layouts
  // A nursing unit: central corridor, a nursing station, bed rooms on both sides, an IDF closet and a stairwell.
  kit.ward = (cx, cz, { rooms = 4, name = 'Nursing unit', prefix = '' } = {}) => {
    const rw = 4.6, rd = 5.4, corr = 4;
    const W = rooms * rw;
    const api = { cx, cz, W, rw, rd, corr, rooms };
    const roomAt = (side, i) => ({ x: cx - W / 2 + rw * (i + 0.5), z: cz + (side === 'n' ? -(corr / 2 + rd / 2) : corr / 2 + rd / 2) });
    kit.area(`${prefix}hall`, cx, cz, W + 7, rd * 2 + corr + 1, name, { color: 0x0a1b33 });
    for (const side of ['n', 's']) {
      for (let i = 0; i < rooms; i++) {
        const r = roomAt(side, i);
        const id = `${prefix}${side}${i + 1}`;
        const a = kit.area(id, r.x, r.z, rw - 0.3, rd - 0.3, null, { color: 0x0e2748, h: 0.28 });
        kit.walls(r.x, r.z, rw, rd, { h: 1.6, gaps: [{ s: side === 'n' ? 's' : 'n', at: 0.9, w: 1.4 }] });
        const dir = side === 'n' ? 1 : -1;
        kit.bed(r.x - 0.7, r.z - dir * 0.9, 0, (i + (side === 'n' ? 0 : 2)) % 5 !== 4);
        kit.chair(r.x + 1.3, r.z + dir * 1.0, side === 'n' ? Math.PI : 0);
        api[id] = { x: r.x, z: r.z, a };
      }
    }
    // nursing station
    kit.plate(cx, cz, 7.5, 1.7, { color: 0x15304f, h: 0.9, y: 0.2, edge: C.sky, edgeOp: 0.6 });
    for (let i = 0; i < 3; i++) kit.desk(cx - 2.2 + i * 2.2, cz + 0.2, 1.8, Math.PI, 1);
    // IDF closet, west end; stairwell, east end
    kit.walls(cx - W / 2 - 1.8, cz, 3.2, 3.6, { h: 2.0, gaps: [{ s: 'e', at: 0, w: 1.2 }] });
    kit.rackRow(cx - W / 2 - 1.8, cz - 0.9, 2, 0, 1.2);
    kit.walls(cx + W / 2 + 1.9, cz, 3.4, corr + 1.2, { h: 1.8, gaps: [{ s: 'w', at: 0, w: 1.6 }] });
    kit.stairs(cx + W / 2 + 1.9, cz, 2.6, 3.4);
    api.station = { x: cx, z: cz }; api.idf = { x: cx - W / 2 - 1.8, z: cz }; api.stairs = { x: cx + W / 2 + 1.9, z: cz };
    api.hall = (t) => ({ x: cx - W / 2 + t * W, z: cz + 1.5 });
    api.roomPos = (id, dx = 0, dz = 0) => [api[id].x + dx, api[id].z + dz];
    return api;
  };

  kit.dataHall = (cx, cz, { rows = 2, cols = 5, name = 'Data center', id = `dc-${cx}-${cz}`, watch = [] } = {}) => {
    const w = cols * 1.4 + 5, d = rows * 4.5 + 3;
    kit.area(id, cx, cz, w, d, name, { color: 0x081628, edge: 0x2aa8e0, watch });
    kit.walls(cx, cz, w, d, { h: 1.2 });
    for (let r = 0; r < rows; r++) kit.rackRow(cx, cz - d / 2 + 2.6 + r * 4.4, cols, r % 2 ? Math.PI : 0);
    return { w, d, cx, cz };
  };

  // Walkers: staff and patients that make the building feel lived in.
  kit.walker = (pts, { speed = 1.6, color = 0x9be7ff, off = 0, s = 0.8, y = 0.25 } = {}) => {
    const curve = new THREE.CatmullRomCurve3(pts.map(([x, z]) => new THREE.Vector3(x, 0, z)), true, 'catmullrom', 0.05);
    const mat = new THREE.MeshStandardMaterial({ color: 0x06182c, emissive: color, emissiveIntensity: 0.9, roughness: 0.5 });
    const g = G(cyl(0.24, 0.8, mat, 0, 0.3, 0, 12), sph(0.22, mat, 0, 1.28, 0));
    g.scale.setScalar(s * 1.1);
    root.add(g);
    kit.walkers.push({ g, curve, speed, t: off, len: curve.getLength(), y });
    return g;
  };
  kit.vehicle = (pts, { speed = 4, off = 0 } = {}) => {
    const curve = new THREE.CatmullRomCurve3(pts.map(([x, z]) => new THREE.Vector3(x, 0, z)), true, 'catmullrom', 0.02);
    const g = MODEL.ambulance(new THREE.MeshStandardMaterial({ color: 0, emissive: 0xe2231a, emissiveIntensity: 1.6 }), M.linen);
    g.scale.setScalar(0.8); root.add(g);
    kit.walkers.push({ g, curve, speed, t: off, len: curve.getLength(), y: 0.2, veh: true });
    return g;
  };
  return kit;
}

// ------------------------------------------------------------------ the world
function worstState(states) {
  let w = 'ok';
  for (const s of states) if ((RANK[s] || 0) > RANK[w]) w = s;
  return w;
}
const wrap = (text, n = 30) => { const out = []; let cur = ''; text.split(' ').forEach((w) => { if ((cur + ' ' + w).trim().length > n && cur) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }); if (cur) out.push(cur); return out.join('\n'); };

export function hospitalWorld(cfg) {
  const N = NARR.find((s) => s.id === cfg.id);
  if (!N) throw new Error(`no narrative for ${cfg.id}`);
  const nsteps = N.steps.length;
  const seq = cfg.seq || [];
  const CAM = cfg.cam;
  const cams = N.steps.map((_, i) => CAM[seq[Math.min(i, seq.length - 1)] || 'wide']);
  const alert = cfg.mood !== 'calm';
  const BG_TODAY = alert
    ? { a: '#0a0510', b: '#2b0f1c', c: '#fb7185', mix: [0.35, 0.8, 0, 0.35] }
    : { a: '#04070f', b: '#0f2038', c: '#9be7ff', mix: [0.5, 0.7, 0, 0.4] };
  const BG_CISCO = { a: '#020a14', b: '#06355a', c: '#00bceb', mix: [0.9, 0.6, 0.15, 0.5] };
  const bgSteps = N.steps.map((s, i) => (i === 0 ? BG_TODAY : s.phase !== N.steps[i - 1].phase ? (s.phase === 'cisco' ? BG_CISCO : BG_TODAY) : null));

  return {
    id: cfg.id,
    bg: BG_TODAY,
    bgSteps,
    cams,
    build() {
      const group = new THREE.Group();
      const root = new THREE.Group();
      group.add(root);
      const kit = makeKit(root);

      // ground
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(240, 160), new THREE.MeshStandardMaterial({ color: 0x050e1d, roughness: 1 }));
      ground.rotation.x = -Math.PI / 2; ground.position.y = -0.02; root.add(ground);
      root.add(gridFloor(160, 80, C.sky, 0.1));

      const place = cfg.layout(kit) || {};

      // ---- devices
      const devs = new Map();
      for (const n of N.nodes) {
        const p = place[n.id];
        if (!p) { console.warn(`[${cfg.id}] no placement for node "${n.id}"`); continue; }
        const [x, z, y = 0, o = {}] = p;
        const A = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: ST.ok, emissiveIntensity: 1.3, roughness: 0.4, transparent: false });
        const kind = o.k || n.icon;
        const model = (MODEL[kind] || MODEL.server)(A, M.body, M.glass);
        const scale = (n.r / 30) * (o.s || 1) * 1.15;
        const g = new THREE.Group();
        g.position.set(x, 0.25 + y, z);
        const inner = new THREE.Group();
        inner.add(model);
        inner.scale.setScalar(scale);
        if (o.rot) inner.rotation.y = o.rot;
        g.add(inner);
        const h = (kind === 'wifi' ? 3.1 : kind === 'canvas' ? 2.9 : kind === 'cloud' ? 2.9 : 2.7) * scale;
        const halo = glowSprite(ST.ok, 6 * scale, 0.4); halo.position.y = h * 0.5; g.add(halo);
        const ring = new THREE.Mesh(new THREE.RingGeometry(1.7 * scale, 1.95 * scale, 48), new THREE.MeshBasicMaterial({ color: ST.ok, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
        ring.rotation.x = -Math.PI / 2; ring.position.y = 0.06; g.add(ring);
        const pend = new THREE.Group();
        for (let i = 0; i < 8; i++) { const arc = new THREE.Mesh(new THREE.RingGeometry(2.05 * scale, 2.3 * scale, 12, 1, (i * Math.PI) / 4, Math.PI / 6), new THREE.MeshBasicMaterial({ color: ST.pending, transparent: true, opacity: 0.9, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); pend.add(arc); }
        pend.rotation.x = -Math.PI / 2; pend.position.y = 0.08; pend.visible = false; g.add(pend);
        const rip = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.05, 48), new THREE.MeshBasicMaterial({ color: ST.ok, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
        rip.rotation.x = -Math.PI / 2; rip.position.y = 0.1; g.add(rip);
        let cover = null;
        if (o.cover) { cover = new THREE.Mesh(new THREE.CircleGeometry(o.cover, 48), new THREE.MeshBasicMaterial({ color: ST.ok, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false })); cover.rotation.x = -Math.PI / 2; cover.position.y = -y + 0.06; g.add(cover); }
        const tag = makeTag();
        const [lx = 0, ly = 0] = o.lab || [];
        tag.position.set(lx, h + 0.9 + ly, 0);
        g.add(tag);
        root.add(g);
        const hidden = n.hidden;
        devs.set(n.id, { id: n.id, n, g, inner, A, halo, ring, pend, rip, cover, tag, h, scale, state: 'ok', color: new THREE.Color(ST.ok), a: hidden ? 0 : 1, ta: hidden ? 0 : 1, bump: 0, rv: 0, cap: '', active: true, dirty: true, pos: new THREE.Vector3(x, 0.25 + y, z), top: h * 0.9, first: true });
        if (hidden) { g.visible = false; }
      }

      // ---- links (curves between devices, with travelling packets)
      const links = new Map();
      const pktTex = glowTexture();
      for (const l of N.links) {
        const A = devs.get(l.a), B = devs.get(l.b);
        if (!A || !B) continue;
        const a = A.pos.clone(); a.y += A.top * 0.55;
        const b = B.pos.clone(); b.y += B.top * 0.55;
        const dist = a.distanceTo(b);
        const mid = a.clone().add(b).multiplyScalar(0.5);
        mid.y += 1.4 + dist * 0.16;
        const dx = b.x - a.x, dz = b.z - a.z, len = Math.hypot(dx, dz) || 1;
        mid.x += (-dz / len) * l.bend * dist * 1.2; mid.z += (dx / len) * l.bend * dist * 1.2;
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.07, 5, false), new THREE.MeshBasicMaterial({ color: ST.idle, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
        const NP = 9;
        const pg = new THREE.BufferGeometry();
        pg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NP * 3), 3));
        const pts = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.62, map: pktTex, color: ST.ok, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
        pts.frustumCulled = false;
        const xm = new THREE.Group();
        const xmat = new THREE.MeshBasicMaterial({ color: ST.down, transparent: true, opacity: 0.95 });
        const x1 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.14, 0.14), xmat), x2 = x1.clone();
        x1.rotation.z = Math.PI / 4; x2.rotation.z = -Math.PI / 4; xm.add(x1, x2);
        xm.position.copy(curve.getPoint(0.5)); xm.visible = false;
        const g = new THREE.Group(); g.add(tube, pts, xm); root.add(g);
        links.set(l.id, { l, A, B, curve, tube, pts, xm, xmat, g, state: 'idle', color: new THREE.Color(ST.idle), a: 0, ta: 0, ph: Math.random(), NP, first: true });
      }

      // ---- callout bubble
      let callout = null;

      // ---- state
      let cur = -1;
      let clockInfo = null;
      const api = { clock: null };

      function cumulative(step) {
        const ns = new Map(), vis = new Map(), ls = new Map(), labels = new Map();
        devs.forEach((d) => { ns.set(d.id, 'ok'); vis.set(d.id, !d.n.hidden); });
        kit.areas.forEach((a) => vis.set(a.id, !a.hidden));
        N.links.forEach((l) => ls.set(l.id, 'idle'));
        let clock = null;
        for (let s = 0; s <= step; s++) {
          const st = N.steps[s];
          for (const [k, v] of Object.entries(st.n || {})) ns.set(k, v);
          for (const [k, v] of Object.entries(st.l || {})) ls.set(k, v);
          for (const [k, v] of Object.entries(st.label || {})) labels.set(k, v);
          for (const id of st.show || []) vis.set(id, true);
          for (const id of st.hide || []) vis.set(id, false);
          if (st.clock) clock = st.clock;
        }
        return { ns, vis, ls, labels, clock };
      }

      function apply(step) {
        const now = cumulative(step);
        const prev = step > 0 ? cumulative(step - 1) : null;
        const st = N.steps[step];
        devs.forEach((d) => {
          const s = now.ns.get(d.id) || 'ok';
          const changed = !prev || prev.ns.get(d.id) !== s || (st.label && st.label[d.id] !== undefined) || prev.vis.get(d.id) !== now.vis.get(d.id);
          if (!d.first && s !== d.state && d.a > 0.5) { d.rv = 1; d.rc = ST[s]; }
          if (!d.first && now.vis.get(d.id) && d.a < 0.1) d.bump = 1;
          d.state = s;
          d.ta = now.vis.get(d.id) ? 1 : 0;
          d.cap = now.labels.get(d.id) || '';
          d.active = changed || (st.callout && st.callout.node === d.id);
          if (d.first) { d.color.setHex(ST[s]); d.a = d.ta; d.first = false; d.dirty = true; }
          if (d.ta > 0) d.g.visible = true;
        });
        links.forEach((k) => {
          const s = now.ls.get(k.l.id) || 'idle';
          k.state = s;
          const visible = s !== 'off' && now.vis.get(k.l.a) && now.vis.get(k.l.b);
          k.ta = visible ? 1 : 0;
          if (k.first) { k.color.setHex(ST[s]); k.a = k.ta; k.first = false; }
        });
        kit.areas.forEach((a) => { a.ta = now.vis.get(a.id) ? 1 : 0; if (!a._init) { a.a = a.ta; a._init = true; a.dirty = true; } });
        if (callout) { callout.parent && callout.parent.remove(callout); callout.material.map.dispose(); callout = null; }
        if (st.callout && devs.get(st.callout.node)) {
          const d = devs.get(st.callout.node);
          callout = label(wrap(st.callout.text), { size: 0.62, color: '#ffffff', bg: 'rgba(4,12,26,0.92)', border: '#3d9bff', pad: 22, weight: 600 });
          callout.position.set(0, d.h + 3.4, 0);
          callout.material.opacity = 0;
          d.g.add(callout);
          callout.userData.k = 0;
        }
        api.clock = now.clock && now.clock.mode !== 'hide' ? now.clock : null;
        cur = step;
      }

      const tmp = new THREE.Vector3(), tan = new THREE.Vector3();
      const colT = new THREE.Color();
      return {
        group,
        update(dt, t, step) {
          if (step !== cur) apply(step);
          const k = 1 - Math.exp(-dt * 6);
          // devices
          devs.forEach((d) => {
            colT.setHex(ST[d.state]);
            d.color.lerp(colT, k);
            const wasA = d.a;
            d.a += (d.ta - d.a) * k;
            d.A.emissive.copy(d.color);
            const flick = d.state === 'down' ? 0.75 + 0.25 * Math.sin(t * 9 + d.pos.x) : 1;
            d.A.emissiveIntensity = (d.state === 'unknown' ? 0.4 : d.state === 'idle' ? 0.2 : 1.35) * flick;
            d.halo.material.color.copy(d.color);
            d.ring.material.color.copy(d.color);
            if (d.cover) d.cover.material.color.copy(d.color);
            const pulse = 0.5 + 0.5 * Math.sin(t * (d.state === 'down' ? 6 : 3.5));
            const showRing = d.state === 'warn' || d.state === 'down';
            d.ring.material.opacity = showRing ? (0.25 + 0.5 * pulse) * d.a : 0;
            d.ring.scale.setScalar(1 + (showRing ? pulse * 0.25 : 0));
            d.pend.visible = d.state === 'pending' && d.a > 0.05;
            d.pend.rotation.z = t * 1.2;
            d.pend.children.forEach((c) => { c.material.opacity = 0.9 * d.a; });
            if (d.rv > 0) {
              d.rv = Math.max(0, d.rv - dt * 0.9);
              d.rip.material.color.setHex(d.rc || ST[d.state]);
              d.rip.material.opacity = d.rv * 0.8; d.rip.scale.setScalar(1 + (1 - d.rv) * 4.2 * d.scale);
            } else d.rip.material.opacity = 0;
            d.bump = Math.max(0, d.bump - dt * 1.4);
            const grow = d.a * d.a * (3 - 2 * d.a);
            d.inner.scale.setScalar(Math.max(0.001, d.scale * grow * (1 + 0.28 * Math.sin(d.bump * Math.PI))));
            d.inner.position.y = d.state === 'pending' ? Math.sin(t * 2) * 0.08 : 0;
            d.halo.material.opacity = 0.4 * d.a;
            d.tag.visible = d.a > 0.05;
            d.tag.material.opacity = d.a;
            if (d.a < 0.01 && d.ta === 0) d.g.visible = false;
            d.tag.userData.set(d.n.title, d.active ? (d.cap || d.n.sub[ui.aud]) : '', HEX(ST[d.state]));
          });
          // links
          links.forEach((lk) => {
            colT.setHex(ST[lk.state]);
            lk.color.lerp(colT, k);
            lk.a += (lk.ta - lk.a) * k;
            const idle = lk.state === 'idle' || lk.state === 'unknown';
            lk.tube.material.color.copy(lk.color);
            lk.tube.material.opacity = lk.a * (idle ? 0.35 : 0.6);
            lk.pts.material.color.copy(lk.color);
            const rate = lk.state === 'ok' ? 0.42 : lk.state === 'warn' ? 0.17 : lk.state === 'pending' ? 0.28 : lk.state === 'down' ? 0.36 : 0;
            lk.pts.material.opacity = rate > 0 ? lk.a : 0;
            lk.xm.visible = lk.state === 'down' && lk.a > 0.2;
            lk.xmat.opacity = 0.6 + 0.4 * Math.sin(t * 6);
            lk.g.visible = lk.a > 0.01;
            if (rate > 0 && lk.a > 0.05) {
              const pos = lk.pts.geometry.attributes.position.array;
              const maxT = lk.state === 'down' ? 0.48 : 1;
              for (let i = 0; i < lk.NP; i++) {
                const u = ((t * rate + lk.ph + i / lk.NP) % 1) * maxT;
                lk.curve.getPoint(u, tmp);
                pos[i * 3] = tmp.x; pos[i * 3 + 1] = tmp.y; pos[i * 3 + 2] = tmp.z;
              }
              lk.pts.geometry.attributes.position.needsUpdate = true;
            }
          });
          // areas: tint by worst watched state, fade, cisco glow
          kit.areas.forEach((a) => {
            a.a += (a.ta - a.a) * k;
            const ws = a.watch.length ? worstState(a.watch.map((id) => devs.get(id)?.state || 'ok')) : 'ok';
            const tint = ws === 'ok' ? 0x000000 : ST[ws];
            colT.setHex(tint); a.tint.lerp(colT, k);
            const mesh = a.g.userData.mesh;
            if (!a.cisco && mesh.material.emissive) { mesh.material.emissive.copy(a.tint); mesh.material.emissiveIntensity = ws === 'down' ? 0.35 + 0.15 * Math.sin(t * 5) : 0.28; }
            if (a.dirty || Math.abs(a.a - a.ta) > 0.003) {
              setOpacity(a.g, a.a); if (a.tag) { a.tag.material.opacity = a.a; a.tag.visible = a.a > 0.02; }
              if (a.extra) a.extra.forEach((l) => { l.visible = a.a > 0.02; l.material.opacity = 0.22 * a.a; });
              if (a.glow) a.glow.material.opacity = 0.12 * a.a;
              a.dirty = Math.abs(a.a - a.ta) > 0.003;
            }
          });
          // walkers
          kit.walkers.forEach((w) => {
            w.t = (w.t + (w.speed * dt) / w.len) % 1;
            w.curve.getPointAt(w.t, tmp); w.curve.getTangentAt(w.t, tan);
            w.g.position.set(tmp.x, w.y + (w.veh ? 0 : Math.abs(Math.sin(t * 7 + w.len)) * 0.05), tmp.z);
            w.g.rotation.y = Math.atan2(tan.x, tan.z) + (w.veh ? -Math.PI / 2 : 0);
          });
          if (callout) { callout.userData.k = damp(callout.userData.k, 1, 3, dt); callout.material.opacity = callout.userData.k; }
        },
        reset() { cur = -1; },
        get clock() { return api.clock; },
      };
    },
  };
}
