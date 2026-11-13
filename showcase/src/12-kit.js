/* Set dressing: rooms, beds, racks, clouds, fibre, towers, buildings and people. Pure drawing, theme aware, animated by TT. */
const KP = () => (THEME === 'dark'
  ? { vinyl: '#10294a', wood: '#1c2c3d', carpet: '#13284a', raised: '#0e2342', glass: '#1f5577', steel: '#456586', screen: '#050f1c', metal: '#294666', sheet: '#d9e6f2', blanket: '#2a8f93', roof: '#17304f', grass: '#12302a', asphalt: '#0b1626', gown: '#8fb4d6', cloud: '#12304f' }
  : { vinyl: '#eef3f6', wood: '#f2e9d9', carpet: '#e7ebf1', raised: '#e3e9ee', glass: '#cdeaf8', steel: '#c4ced6', screen: '#16212b', metal: '#d3dae0', sheet: '#ffffff', blanket: '#8fd0c8', roof: '#e6eaee', grass: '#e8f2df', asphalt: '#e6eaed', gown: '#b9d6ef', cloud: '#ffffff' });

function walker(S, pts, o = {}) {
  const p = Path(pts.concat(o.loop === false ? [] : [pts[0]])), dist = mod(S.t * (o.speed || 24) + (o.off || 0) * p.L, p.L), q = p.at(dist);
  D.person(q.x, q.y, q.a, o.color || COL.hosp, { kind: o.kind || 'nurse', swing: Math.sin(dist * 0.42), label: o.label, ly: o.ly, dev: o.dev, s: o.s });
}

const K = {
  grid(x, y, w, h, step, color, lw = 0.7) {
    ctx.save(); ctx.beginPath();
    for (let gx = x + step; gx < x + w - 1; gx += step) { ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); }
    for (let gy = y + step; gy < y + h - 1; gy += step) { ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); }
    ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.stroke(); ctx.restore();
  },
  stripes(x, y, w, h, step, color, lw = 0.8) {
    ctx.save(); ctx.beginPath(); for (let gy = y + step; gy < y + h - 1; gy += step) { ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); }
    ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.stroke(); ctx.restore();
  },
  floor(x, y, w, h, kind = 'vinyl', r = 6) {
    const p = KP(); D.box(x, y, w, h, { fill: p[kind] || p.vinyl, r });
    ctx.save(); D.rr(x, y, w, h, r); ctx.clip();
    if (kind === 'wood') K.stripes(x, y, w, h, 7, tint('#a07a4a', THEME === 'dark' ? 0.25 : 0.2));
    else if (kind === 'carpet') K.grid(x, y, w, h, 6, tint(T.wall, 0.12), 0.5);
    else K.grid(x, y, w, h, 14, tint(T.wall, 0.2), 0.6);
    ctx.restore();
  },
  window(x, y, w) { const p = KP(); D.box(x, y - 2, w, 4, { fill: p.glass, stroke: T.wall, lw: 0.8, r: 1 }); D.line([[x + w / 2, y - 2], [x + w / 2, y + 2]], { lw: 0.8, color: T.wall }); },
  doorArc(x, y, r, flip = 1) {
    D.line([[x, y], [x + flip * r, y]], { lw: 1.4, color: T.wall });
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, flip > 0 ? -Math.PI / 2 : Math.PI, flip > 0 ? 0 : Math.PI * 1.5); ctx.strokeStyle = tint(T.wall, 0.6); ctx.lineWidth = 1; ctx.setLineDash([2, 2]); ctx.stroke(); ctx.restore();
    D.line([[x, y], [x, y - r]], { lw: 1.4, color: T.wall });
  },
  bed(x, y, o = {}) {
    const p = KP();
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); if (o.s) ctx.scale(o.s, o.s);
    D.box(-11, -20, 22, 40, { fill: T.panel, stroke: T.wall, lw: 1.4, r: 5, shadow: 3 });
    D.box(-9, -18, 18, 36, { fill: p.sheet, stroke: tint(T.wall, 0.5), lw: 0.6, r: 4 });
    D.box(-7, -17, 14, 7, { fill: '#ffffff', stroke: tint(T.wall, 0.7), lw: 0.7, r: 3.5 });
    if (o.patient !== false) {
      ctx.beginPath(); ctx.ellipse(0, -8.4, 6.8, 3.1, 0, 0, Math.PI * 2); ctx.fillStyle = p.gown; ctx.fill();
      ctx.beginPath(); ctx.arc(0, -12.9, 4.1, 0, Math.PI * 2); ctx.fillStyle = '#f1d3b8'; ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 0.6; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, -13.4, 4.2, Math.PI, 0); ctx.fillStyle = '#8c8c8c'; ctx.fill();
    }
    ctx.beginPath(); ctx.roundRect(-9, -4, 18, 22, [0, 0, 4, 4]); ctx.fillStyle = o.blanket || p.blanket; ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 0.7; ctx.stroke();
    D.box(-9, -4, 18, 4, { fill: 'rgba(255,255,255,.4)', r: 0 });
    D.line([[-11.8, -9], [-11.8, 6]], { lw: 1.8, color: p.steel }); D.line([[11.8, -9], [11.8, 6]], { lw: 1.8, color: p.steel });
    ctx.restore();
  },
  ivPole(x, y) {
    const p = KP();
    D.circle(x, y, 2.6, { fill: p.steel, stroke: T.wall, lw: 0.8 }); D.line([[x, y], [x, y - 15]], { lw: 1.3, color: T.wall });
    D.box(x + 1.5, y - 19, 6.5, 10, { fill: tint('#9bd7f0', 0.8), stroke: T.wall, lw: 0.7, r: 2 });
    D.circle(x + 4.7, y - 7.5 + mod(TT * 1.6, 1) * 6, 0.9, { fill: '#6cc3e8' });
  },
  ecg(x, y, w, h) {
    const p = KP();
    D.box(x, y, w, h, { fill: p.screen, stroke: T.wall, lw: 1, r: 2 });
    ctx.save(); ctx.beginPath();
    for (let i = 2; i < w - 2; i += 1) {
      const q = mod((i / w) * 2 - TT * 1.1, 1);
      const v = q < 0.3 ? 0 : q < 0.34 ? -((q - 0.3) / 0.04) * 0.9 : q < 0.38 ? -0.9 + ((q - 0.34) / 0.04) * 1.5 : q < 0.42 ? 0.6 - ((q - 0.38) / 0.04) * 0.6 : 0;
      const yy = y + h * 0.58 + v * h * 0.4; if (i === 2) ctx.moveTo(x + i, yy); else ctx.lineTo(x + i, yy);
    }
    ctx.strokeStyle = '#47e08a'; ctx.lineWidth = 1.1; ctx.stroke(); ctx.restore();
  },
  chair(x, y, rot = 0, col) {
    const p = KP();
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    D.box(-4.6, -4.6, 9.2, 9.2, { fill: col || p.metal, stroke: T.wall, lw: 0.9, r: 3 }); D.box(-5.2, -7, 10.4, 2.8, { fill: col || p.metal, stroke: T.wall, lw: 0.8, r: 1.4 });
    ctx.restore();
  },
  desk(x, y, w = 40, h = 14, o = {}) {
    const p = KP();
    D.box(x - w / 2, y - h / 2, w, h, { fill: T.panel, stroke: T.wall, lw: 1.4, r: 3, shadow: 2 });
    for (let k = 0; k < (o.screens ?? 1); k++) {
      const px = x - w / 2 + 6 + k * 14; D.box(px, y - h / 2 + 2, 10, 6.5, { fill: p.screen, stroke: T.wall, lw: 0.7, r: 1 });
      D.box(px + 1, y - h / 2 + 3, 8, 4.5, { fill: tint(COL.cisco, 0.5 + 0.2 * Math.sin(TT * 2 + k)), r: 0.6 });
    }
    D.box(x - 6, y + h / 2 - 5, 12, 3, { fill: p.metal, stroke: tint(T.wall, 0.6), lw: 0.5, r: 1 });
    if (o.chair !== false) K.chair(x, y + h / 2 + 8, 0);
    if (o.person) D.person(x, y + h / 2 + 7, -Math.PI / 2, null, { kind: o.person, seat: true, s: 0.82 });
  },
  sofa(x, y, w, h, col) {
    const c = col || COL.people;
    D.box(x, y, w, h, { fill: tint(c, 0.28), stroke: tint(c, 0.8), lw: 1.2, r: 5 }); D.box(x + 2, y + 2, w - 4, h * 0.3, { fill: tint(c, 0.45), r: 3 });
    for (let k = 1; k < Math.max(2, Math.round(w / 22)); k++) D.line([[x + (w / Math.round(w / 22)) * k, y + h * 0.35], [x + (w / Math.round(w / 22)) * k, y + h - 2]], { lw: 0.8, color: tint(c, 0.6) });
  },
  tv(x, y, w) { const p = KP(); D.box(x, y, w, 5, { fill: p.screen, stroke: T.wall, lw: 1, r: 1.5 }); D.box(x + 1, y + 1, w - 2, 3, { fill: tint(COL.cisco, 0.35 + 0.15 * Math.sin(TT * 3)), r: 1 }); },
  table(x, y, w, h, o = {}) { D.box(x - w / 2, y - h / 2, w, h, { fill: T.panel, stroke: T.wall, lw: 1.4, r: o.r ?? 8, shadow: 2 }); },
  rackRow(x, y, n, o = {}) {
    const p = KP(), vert = !!o.vertical, rw = 13, rh = 20;
    for (let k = 0; k < n; k++) {
      const px = vert ? x : x + k * (rw + 2), py = vert ? y + k * (rw + 2) : y, bw = vert ? rh : rw, bh = vert ? rw : rh;
      D.box(px, py, bw, bh, { fill: p.metal, stroke: T.wall, lw: 0.9, r: 2 });
      ctx.save(); ctx.beginPath();
      for (let s = 1; s < 4; s++) { if (vert) { ctx.moveTo(px + (rh / 4) * s, py + 1); ctx.lineTo(px + (rh / 4) * s, py + bh - 1); } else { ctx.moveTo(px + 1.5, py + (rh / 4) * s); ctx.lineTo(px + bw - 1.5, py + (rh / 4) * s); } }
      ctx.strokeStyle = tint(T.wall, 0.55); ctx.lineWidth = 0.7; ctx.stroke(); ctx.restore();
      const r1 = rnd(k * 3.1 + px * 0.37 + py), on = Math.sin(TT * (2 + r1 * 5) + k * 1.9) > -0.25, amber = Math.sin(TT * (1 + r1 * 3) + k) > 0.8;
      const lx = vert ? px + bw - 3 : px + bw / 2 - 2.6, ly = vert ? py + bh / 2 - 2.6 : py + 2.6;
      D.circle(lx, ly, 1.25, { fill: on ? (o.led || COL.run) : tint(o.led || COL.run, 0.25) });
      D.circle(lx + (vert ? 0 : 5), ly + (vert ? 5 : 0), 1.25, { fill: amber ? COL.warn : tint(COL.warn, 0.18) });
    }
  },
  aisle(x, y, w, h, kind = 'cold') {
    const c = kind === 'cold' ? '#049FD9' : '#F26B21';
    D.box(x, y, w, h, { fill: tint(c, 0.1), r: 3 });
    D.line([[x + 5, y + h / 2], [x + w - 5, y + h / 2]], { lw: 1.6, color: tint(c, 0.55), dash: [6, 8], offset: kind === 'cold' ? -TT * 16 : TT * 16 });
  },
  crac(x, y, s = 1) {
    const p = KP(), z = 26 * s;
    D.box(x, y, z, z, { fill: p.metal, stroke: T.wall, lw: 1.3, r: 4, shadow: 2 });
    D.circle(x + z / 2, y + z / 2, z * 0.34, { fill: p.screen, stroke: tint(COL.cisco, 0.6), lw: 1 });
    ctx.save(); ctx.translate(x + z / 2, y + z / 2); ctx.rotate(TT * 5); ctx.beginPath();
    for (let b = 0; b < 4; b++) { ctx.moveTo(0, 0); ctx.arc(0, 0, z * 0.3, b * Math.PI / 2, b * Math.PI / 2 + 0.7); }
    ctx.fillStyle = tint(COL.cisco, 0.7); ctx.fill(); ctx.restore();
  },
  ups(x, y) {
    D.box(x, y, 17, 25, { fill: THEME === 'dark' ? '#1a2f4a' : '#cfd7de', stroke: T.wall, lw: 1.2, r: 3 });
    D.circle(x + 5, y + 5, 1.4, { fill: COL.run }); D.circle(x + 11, y + 5, 1.4, { fill: COL.run });
    D.box(x + 3, y + 11, 11, 10, { stroke: tint(T.wall, 0.8), lw: 0.8, r: 1.5 }); D.line([[x + 6, y + 16], [x + 11, y + 16]], { lw: 1.2, color: COL.run });
  },
  cableTray(x, y, w, vert = false) {
    ctx.save(); ctx.beginPath();
    if (vert) { ctx.moveTo(x, y); ctx.lineTo(x, y + w); ctx.moveTo(x + 6, y); ctx.lineTo(x + 6, y + w); for (let k = 4; k < w; k += 7) { ctx.moveTo(x, y + k); ctx.lineTo(x + 6, y + k); } }
    else { ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.moveTo(x, y + 6); ctx.lineTo(x + w, y + 6); for (let k = 4; k < w; k += 7) { ctx.moveTo(x + k, y); ctx.lineTo(x + k, y + 6); } }
    ctx.strokeStyle = tint(T.wall, 0.75); ctx.lineWidth = 0.9; ctx.stroke(); ctx.restore();
  },
  /* A data hall: raised floor, hot and cold aisles, two rack rows top and bottom, cable tray, cooling, UPS. The middle band stays free for devices. */
  dataHall(x, y, w, h, o = {}) {
    const p = KP(), n = Math.floor((w - 34) / 15), rx = x + 17;
    D.box(x + 3, y + 3, w - 6, h - 6, { fill: p.raised, r: 8 });
    ctx.save(); D.rr(x + 3, y + 3, w - 6, h - 6, 8); ctx.clip(); K.grid(x, y, w, h, 12, tint(T.wall, 0.2), 0.6); ctx.restore();
    K.cableTray(x + 14, y + 17, w - 28, false);
    K.rackRow(rx, y + 27, n, { led: o.led }); K.rackRow(rx, y + 49, n, { led: o.led }); K.aisle(rx, y + 71, n * 15 - 2, 9, 'hot');
    K.rackRow(rx, y + h - 69, n, { led: o.led }); K.rackRow(rx, y + h - 47, n, { led: o.led }); K.aisle(rx, y + h - 80, n * 15 - 2, 9, 'cold');
    if (o.crac !== false) { K.crac(x + 6, y + h / 2 - 13); K.crac(x + w - 32, y + h / 2 - 13); }
    if (o.ups) { K.ups(x + w - 24, y + 85); K.ups(x + w - 24, y + h - 112); }
  },
  switchStack(x, y, n = 3, w = 90) {
    const p = KP();
    for (let k = 0; k < n; k++) {
      const yy = y + k * 11; D.box(x, yy, w, 9, { fill: p.metal, stroke: T.wall, lw: 0.9, r: 2 });
      for (let q = 0; q < Math.floor((w - 8) / 5); q++) D.circle(x + 5 + q * 5, yy + 4.5, 1, { fill: Math.sin(TT * (3 + rnd(q + k * 9) * 4) + q) > -0.3 ? COL.run : tint(COL.run, 0.2) });
    }
  },
  cloud(x, y, s = 1, o = {}) {
    const col = o.color || COL.cisco, by = y + Math.sin(TT * 1.1 + x) * 1.6;
    ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
    const path = () => { ctx.beginPath(); [[-17, 4, 10], [-5, -5, 14], [11, -1, 12], [23, 6, 8], [-8, 8, 9], [8, 9, 9]].forEach((c2) => { ctx.moveTo(c2[0] + c2[2], c2[1]); ctx.arc(c2[0], c2[1], c2[2], 0, Math.PI * 2); }); ctx.rect(-17, 4, 40, 13); };
    ctx.shadowColor = T.shadow; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
    path(); ctx.lineWidth = 4; ctx.strokeStyle = tint(col, 0.9); ctx.stroke();
    ctx.shadowColor = 'transparent'; path(); ctx.fillStyle = o.fill || KP().cloud; ctx.fill();
    path(); ctx.fillStyle = tint(col, 0.1); ctx.fill();
    for (let k = 0; k < 3; k++) { const q = mod(TT * 0.6 + k / 3, 1); D.circle(0, 4, 18 + q * 26, { stroke: tint(col, 0.35 * (1 - q)), lw: 1.2 }); }
    ctx.restore();
    if (o.icon) D.icon(o.icon, x, by + 4 * s, 12 * s, col);
  },
  fiber(pts, o = {}) {
    const col = o.color || COL.cisco, w = o.w || 6;
    D.line(pts, { lw: w + 3, color: tint(T.wall, 0.55) }); D.line(pts, { lw: w, color: T.panel });
    D.line(pts, { lw: 1.9, color: tint(col, 0.95), dash: [7, 9], offset: -TT * (o.speed || 28) });
  },
  conduit(pts, o = {}) {
    const col = o.color || COL.cisco;
    D.line(pts, { lw: 7, color: tint(T.wall, 0.28), dash: [10, 6] });
    D.line(pts, { lw: 1.7, color: tint(col, 0.85), dash: [6, 10], offset: -TT * (o.speed || 24) });
  },
  manhole(x, y) { const p = KP(); D.circle(x, y, 5.4, { fill: p.steel, stroke: T.wall, lw: 1 }); D.line([[x - 3, y - 3], [x + 3, y + 3]], { lw: 0.8, color: T.wall }); D.line([[x - 3, y + 3], [x + 3, y - 3]], { lw: 0.8, color: T.wall }); },
  tower(x, y, s = 1) {
    for (let k = 0; k < 3; k++) { const q = mod(TT * 0.7 + k / 3, 1), r = q * 34 * s; D.circle(x, y, r, { stroke: tint(COL.cisco, 0.55 * (1 - q)), lw: 1.5 }); }
    const r = 9 * s; ctx.save(); ctx.beginPath(); ctx.moveTo(x, y - r * 1.3); ctx.lineTo(x + r * 1.1, y + r * 0.8); ctx.lineTo(x - r * 1.1, y + r * 0.8); ctx.closePath();
    ctx.strokeStyle = T.wall; ctx.lineWidth = 1.5; ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y - r * 1.3); ctx.lineTo(x, y + r * 0.8); ctx.moveTo(x - r * 0.55, y - r * 0.25); ctx.lineTo(x + r * 0.55, y - r * 0.25); ctx.stroke(); ctx.restore();
    D.circle(x, y - r * 0.2, 2, { fill: Math.sin(TT * 4) > 0 ? COL.pain : tint(COL.pain, 0.3) });
  },
  building(x, y, w, h, o = {}) {
    const p = KP();
    D.box(x, y, w, h, { fill: p.roof, stroke: T.wall, lw: 1.8, r: 4, shadow: 4 }); D.box(x + 3, y + 3, w - 6, h - 6, { stroke: tint(T.wall, 0.5), lw: 0.9, r: 2 });
    const n = o.hvac ?? 2;
    for (let k = 0; k < n; k++) {
      const hx = x + 9 + k * ((w - 30) / Math.max(1, n)), hy = y + h - 22; D.box(hx, hy, 16, 14, { fill: p.metal, stroke: T.wall, lw: 0.9, r: 2 });
      ctx.save(); ctx.translate(hx + 8, hy + 7); ctx.rotate(TT * 4 + k); ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(5, 0); ctx.moveTo(0, -5); ctx.lineTo(0, 5); ctx.strokeStyle = tint(T.wall, 0.9); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
    }
    D.box(x + 8, y + 8, 22, 12, { fill: p.glass, stroke: T.wall, lw: 0.8, r: 2 });
    if (o.helipad) { D.circle(x + w - 24, y + 24, 16, { stroke: COL.pain, lw: 1.6, fill: tint(COL.pain, 0.06) }); D.text('H', x + w - 24, y + 24.5, { size: 14, weight: 800, color: COL.pain, align: 'center' }); }
    if (o.cross) { D.box(x + w - 22, y + 8, 14, 14, { fill: '#fff', stroke: COL.pain, lw: 1, r: 2 }); D.line([[x + w - 15, y + 11], [x + w - 15, y + 19]], { lw: 2.4, color: COL.pain, cap: 'butt' }); D.line([[x + w - 19, y + 15], [x + w - 11, y + 15]], { lw: 2.4, color: COL.pain, cap: 'butt' }); }
  },
  house(x, y, w, h) {
    ctx.save(); D.box(x, y, w, h, { fill: THEME === 'dark' ? '#2a3550' : '#e7d6c4', stroke: T.wall, lw: 1.6, r: 3, shadow: 3 });
    D.rr(x, y, w, h, 3); ctx.clip(); K.stripes(x, y, w, h, 5, tint('#8a6a4a', 0.25));
    D.line([[x, y + h / 2], [x + w, y + h / 2]], { lw: 2.4, color: tint('#7a5a3a', 0.6) }); ctx.restore();
    D.box(x + w - 16, y + 7, 7, 7, { fill: T.panel, stroke: T.wall, lw: 1, r: 1 });
  },
  gantry(x, y, o = {}) {
    const p = KP();
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
    D.box(-38, -8, 70, 16, { fill: p.steel, stroke: T.wall, lw: 1.1, r: 4 });
    ctx.beginPath(); ctx.ellipse(-12, 0, 17, 5, 0, 0, Math.PI * 2); ctx.fillStyle = p.gown; ctx.fill();
    ctx.beginPath(); ctx.arc(-30, 0, 4.6, 0, Math.PI * 2); ctx.fillStyle = '#f1d3b8'; ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 0.6; ctx.stroke();
    D.box(2, -27, 16, 54, { fill: p.metal, stroke: T.wall, lw: 1.3, r: 6, shadow: 3 }); D.box(7, -22, 6, 44, { fill: p.screen, r: 3 });
    D.box(8, -22 + mod(TT * 26, 38), 4, 6, { fill: tint(COL.cisco, 0.9), r: 2 });
    ctx.restore();
  },
  hvac(x, y, w, h) {
    const p = KP(); D.box(x, y, w, h, { fill: p.metal, stroke: T.wall, lw: 1.3, r: 3, shadow: 2 });
    const n = Math.max(1, Math.floor(w / 28));
    for (let k = 0; k < n; k++) {
      const cx = x + (w / n) * (k + 0.5), cy = y + h / 2; D.circle(cx, cy, Math.min(11, h / 2 - 3), { fill: p.screen, stroke: tint(T.wall, 0.8), lw: 0.9 });
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(TT * 6 + k); ctx.beginPath(); for (let b = 0; b < 3; b++) { ctx.moveTo(0, 0); ctx.arc(0, 0, Math.min(9, h / 2 - 4), b * 2.09, b * 2.09 + 0.9); } ctx.fillStyle = tint(COL.cisco, 0.65); ctx.fill(); ctx.restore();
    }
  },
  generator(x, y, w, h) {
    const p = KP(); D.box(x, y, w, h, { fill: p.metal, stroke: T.wall, lw: 1.4, r: 4, shadow: 3 });
    D.box(x, y, w, 7, { fill: '#F2A900', r: 3 });
    for (let k = 0; k < 3; k++) D.circle(x + 14 + k * 16, y + h * 0.58, 5.5, { fill: p.screen, stroke: T.wall, lw: 0.9 });
    D.box(x + w - 24, y + 13, 18, h - 22, { stroke: tint(T.wall, 0.8), lw: 0.9, r: 2 });
    D.circle(x + w - 7, y + h - 6, 1.8, { fill: Math.sin(TT * 2) > 0 ? COL.run : tint(COL.run, 0.3) });
  },
  shelves(x, y, w, h) {
    D.box(x, y, w, h, { fill: T.panel, stroke: T.wall, lw: 1.3, r: 3 });
    const rows = Math.max(2, Math.floor(h / 9));
    for (let r = 0; r < rows; r++) {
      D.line([[x + 2, y + 4 + r * (h - 8) / (rows - 1 || 1)], [x + w - 2, y + 4 + r * (h - 8) / (rows - 1 || 1)]], { lw: 0.8, color: tint(T.wall, 0.7) });
      for (let q = 0; q < Math.floor(w / 8); q++) D.box(x + 3 + q * 8, y + 4 + r * (h - 8) / (rows - 1 || 1) - 4, 5, 4, { fill: tint(['#e8841a', '#049FD9', '#2E9E5B', '#C62828'][(q + r) % 4], 0.8), r: 1 });
    }
  },
  bench(x, y, w, h) {
    D.box(x, y, w, h, { fill: T.panel, stroke: T.wall, lw: 1.3, r: 3 });
    for (let k = 0; k < Math.floor(w / 22); k++) { D.circle(x + 10 + k * 22, y + h / 2, 4, { fill: tint(['#049FD9', '#2E9E5B', '#e8841a'][k % 3], 0.55), stroke: T.wall, lw: 0.8 }); }
    D.box(x + w - 16, y + 3, 11, h - 6, { fill: KP().metal, stroke: T.wall, lw: 0.8, r: 2 });
  },
  vault(x, y, w, h) {
    const p = KP(); D.box(x, y, w, h, { fill: p.metal, stroke: T.wall, lw: 2.2, r: 5 });
    D.circle(x + w / 2, y + h / 2, Math.min(w, h) * 0.3, { fill: p.screen, stroke: T.wall, lw: 1.6 });
    ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate(TT * 0.4); ctx.beginPath(); for (let k = 0; k < 4; k++) { ctx.moveTo(0, 0); ctx.lineTo(Math.cos(k * Math.PI / 2) * Math.min(w, h) * 0.3, Math.sin(k * Math.PI / 2) * Math.min(w, h) * 0.3); } ctx.strokeStyle = tint(COL.cisco, 0.8); ctx.lineWidth = 1.8; ctx.stroke(); ctx.restore();
  },
  cart(x, y) {
    const p = KP(); D.box(x - 8, y - 10, 16, 20, { fill: T.panel, stroke: T.wall, lw: 1.1, r: 3 });
    D.box(x - 6, y - 8, 12, 8, { fill: p.screen, r: 1.5 }); D.box(x - 5, y - 7, 10, 6, { fill: tint(COL.cisco, 0.5), r: 1 });
    [[-6, -9], [6, -9], [-6, 9], [6, 9]].forEach((q) => D.circle(x + q[0], y + q[1], 1.6, { fill: T.wall }));
  },
  crashCart(x, y) { D.box(x - 8, y - 9, 16, 18, { fill: '#c62828', stroke: T.wall, lw: 1, r: 3 }); D.line([[x, y - 5], [x, y + 5]], { lw: 2.2, color: '#fff', cap: 'butt' }); D.line([[x - 5, y], [x + 5, y]], { lw: 2.2, color: '#fff', cap: 'butt' }); },
  curtain(x, y, w) {
    ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); for (let k = 0; k <= w; k += 3) ctx.lineTo(x + k, y + Math.sin(k * 0.7) * 1.6); ctx.strokeStyle = tint(COL.people, 0.7); ctx.lineWidth = 2.4; ctx.stroke(); ctx.restore();
  },
  corkboard(x, y, w, h, pins = []) {
    D.box(x, y, w, h, { fill: THEME === 'dark' ? '#3a3524' : '#d9b97c', stroke: T.wall, lw: 2, r: 3, shadow: 3 });
    [[6, 8, 16, 12], [30, 14, 18, 14], [14, 36, 17, 12], [42, 40, 16, 13], [24, 62, 18, 12]].forEach((q) => { if (q[0] + q[2] < w - 3 && q[1] + q[3] < h - 3) D.box(x + q[0], y + q[1], q[2], q[3], { fill: '#fffdf4', stroke: 'rgba(0,0,0,.15)', lw: 0.6, r: 1 }); });
    if (pins.length > 1) { ctx.save(); ctx.beginPath(); pins.forEach((q, i) => { if (i) ctx.lineTo(x + q[0], y + q[1]); else ctx.moveTo(x + q[0], y + q[1]); }); ctx.strokeStyle = tint(COL.pain, 0.65); ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); }
    pins.forEach((q) => D.circle(x + q[0], y + q[1], 2.6, { fill: COL.pain, stroke: 'rgba(0,0,0,.25)', lw: 0.6 }));
  },
  tree(x, y, r = 8) {
    const f = tint('#4c9a5a', THEME === 'dark' ? 0.26 : 0.38), s = tint('#3f8a50', 0.7);
    D.circle(x + 1.5, y + 2, r * 1.05, { fill: 'rgba(0,0,0,.1)' });
    [[-0.5, 0.3, 0.78], [0.55, 0.25, 0.72], [0, -0.45, 0.88]].forEach((q) => D.circle(x + q[0] * r, y + q[1] * r, r * q[2], { fill: f, stroke: s, lw: 0.9 }));
    D.circle(x - r * 0.15, y - r * 0.2, r * 0.3, { fill: tint('#6fbf7c', 0.35) });
  },
  road(x, y, w, h) {
    const p = KP(); D.box(x, y, w, h, { fill: p.asphalt, stroke: tint(T.wall, 0.5), lw: 1, r: 3 });
    const horiz = w > h; ctx.save(); ctx.beginPath();
    for (let k = 0; k < (horiz ? w : h) / 22 - 1; k++) { if (horiz) { ctx.moveTo(x + 10 + k * 22, y + h / 2); ctx.lineTo(x + 20 + k * 22, y + h / 2); } else { ctx.moveTo(x + w / 2, y + 10 + k * 22); ctx.lineTo(x + w / 2, y + 20 + k * 22); } }
    ctx.strokeStyle = tint(T.wall, 0.8); ctx.lineWidth = 1.4; ctx.stroke(); ctx.restore();
  },
  car(x, y, ang, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    D.box(-15, -7.5, 30, 15, { fill: o.body || '#fff', stroke: o.color || COL.pain, lw: 1.5, r: 5, shadow: 3 });
    D.box(3, -5.5, 9, 11, { fill: tint(o.color || COL.pain, 0.25), r: 2 }); D.line([[-8, -4], [-8, 4]], { lw: 2.4, color: o.color || COL.pain, cap: 'butt' }); D.line([[-11, 0], [-5, 0]], { lw: 2.4, color: o.color || COL.pain, cap: 'butt' });
    if (o.lights) { const b = Math.sin((o.t || TT) * 12) > 0; D.circle(0, -9, 2.6, { fill: b ? COL.pain : COL.cisco }); D.circle(0, 9, 2.6, { fill: b ? COL.cisco : COL.pain }); }
    ctx.restore();
  },
  /* Patient room: vinyl floor, window, bed with patient, headwall monitor, IV pole, bedside table, chair and a door. */
  ward(x, y, w, h, label, o = {}) {
    K.floor(x, y, w, h, o.floor || 'vinyl', 6); D.box(x, y, w, h, { stroke: T.wall, lw: 1.8, r: 6 });
    K.window(x + w * 0.2, y, w * 0.6);
    if (label) D.text(label.toUpperCase(), x + 8, y + 14, { size: 9.5, weight: 800, color: T.sub, maxW: w - 14 });
    if (o.bed !== false) {
      const bx = o.bx ?? x + w * 0.42, by = o.by ?? y + h * 0.6;
      K.ecg(bx - 9, by - 33, 18, 8); K.bed(bx, by, { patient: o.occ !== false, blanket: o.blanket });
      K.ivPole(bx + 19, by - 4); D.box(bx - 26, by - 13, 9, 11, { fill: T.panel, stroke: T.wall, lw: 0.9, r: 2 });
    }
    K.chair(x + w - 14, y + h - 16, -0.6, tint(COL.people, 0.45));
    K.doorArc(x + w - 38, y + h, 13, 1);
  },
  corridor(x, y, w, h, label) {
    const p = KP(); K.floor(x, y, w, h, 'vinyl', 6); D.box(x, y, w, h, { stroke: T.wall, lw: 1.8, r: 6 });
    D.line([[x + 6, y + 5], [x + w - 6, y + 5]], { lw: 2, color: p.steel }); D.line([[x + 6, y + h - 5], [x + w - 6, y + h - 5]], { lw: 2, color: p.steel });
    for (let xx = x + 40; xx < x + w - 24; xx += 58) D.box(xx, y + h / 2 - 3, 20, 6, { fill: THEME === 'dark' ? 'rgba(255,240,170,.16)' : 'rgba(255,224,120,.55)', r: 3 });
    D.line([[x + 12, y + h / 2], [x + w - 12, y + h / 2]], { lw: 1, color: tint(COL.people, 0.35), dash: [8, 8] });
    if (label) D.text(label.toUpperCase(), x + 8, y + 14, { size: 9.5, weight: 800, color: T.sub, maxW: w - 14 });
  },
  nurseStation(x, y, w, h, o = {}) {
    const p = KP();
    D.box(x, y, w, h, { fill: T.panel, stroke: T.wall, lw: 2.2, r: 12, shadow: 3 }); D.box(x + 6, y + 6, w - 12, h - 12, { fill: p.vinyl, stroke: tint(T.wall, 0.5), lw: 0.8, r: 8 });
    for (let k = 0; k < Math.max(2, Math.floor(w / 36)); k++) { const px = x + 14 + k * 30; D.box(px, y + 9, 12, 8, { fill: p.screen, stroke: T.wall, lw: 0.7, r: 1.5 }); D.box(px + 1, y + 10, 10, 6, { fill: tint(COL.cisco, 0.5 + 0.2 * Math.sin(TT * 2 + k)), r: 1 }); }
    D.person(x + w * 0.3, y + h * 0.62, -Math.PI / 2, null, { kind: 'nurse', seat: true, s: 0.85 });
    D.person(x + w * 0.62, y + h * 0.62, -Math.PI / 2, null, { kind: 'doc', seat: true, s: 0.85 });
    if (o.label) D.text(o.label, x + w / 2, y + h + 9, { size: 9, weight: 700, color: T.sub, align: 'center', halo: 3 });
  },
  /* The carrier path between sites: a switch stack, two fibre trunks in duct with manholes, and a radio tower. */
  networkPath(x, y, w, h) {
    const cx = x + w / 2; K.switchStack(cx - 45, y + 28, 3, 90);
    const f1 = x + w * 0.32, f2 = x + w * 0.68;
    K.conduit([[f1, y + 66], [f1, y + h - 70]], { speed: 30 }); K.conduit([[f2, y + 66], [f2, y + h - 70]], { speed: -30 });
    K.manhole(f1, y + h * 0.42); K.manhole(f2, y + h * 0.62); K.manhole(f1, y + h * 0.82 - 20);
    K.switchStack(cx - 45, y + h - 64, 2, 90); K.tower(x + w - 24, y + h - 20, 0.8);
  },
  /* A thin lane of road with a manhole: cloud connectivity leaving a building. */
  uplink(pts, o = {}) { K.fiber(pts, o); },
};
