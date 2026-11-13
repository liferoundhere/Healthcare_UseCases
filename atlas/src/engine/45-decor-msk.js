// @editions msk
/* Floor plans for the four MSK account stories (M1 to M4). Only the MSK edition carries this file.
   The plans are illustrative. They follow public descriptions of MSK buildings (the Kenneth C. Griffin Pavilion
   on York Avenue between East 66th and East 67th Streets, joined to Memorial Hospital by an enclosed two-story
   patient bridge over 67th Street; regional outpatient sites with infusion suites and a pharmacy; digital
   pathology and research computing). Rooms, closets, server rooms and equipment positions are not MSK's real
   layout. Helpers from 44-decor.js (room, Z, opt, note, tag, person, walker, curtainV) are reused as is. */

/* An operating table seen from above: draped patient, two surgical lights, the anesthesia machine at the head
   and the instrument table at the foot. rot turns it; the head points up when rot is 0. */
const mskOrTable = (x, y, rot = 0) => {
  const p = KP();
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  D.circle(0, -2, 30, { fill: THEME === 'dark' ? 'rgba(255,240,170,.07)' : 'rgba(255,232,140,.25)' });
  D.box(-24, -46, 22, 15, { fill: p.metal, stroke: T.wall, lw: 1.1, r: 2, shadow: 2 }); K.ecg(-22, -44, 18, 8);
  D.box(-9, -28, 18, 54, { fill: p.steel, stroke: T.wall, lw: 1.2, r: 4, shadow: 2 });
  D.box(-8, -12, 16, 36, { fill: tint('#049FD9', 0.42), stroke: tint(T.wall, 0.5), lw: 0.6, r: 3 });
  D.circle(0, -19, 4.2, { fill: '#f1d3b8', stroke: 'rgba(0,0,0,.25)', lw: 0.6 });
  ctx.beginPath(); ctx.arc(0, -19.6, 4.4, Math.PI, 0); ctx.fillStyle = tint('#049FD9', 0.75); ctx.fill();
  D.box(8, 32, 24, 11, { fill: p.steel, stroke: T.wall, lw: 1, r: 2 });
  [12, 18, 24].forEach((q) => D.line([[q, 35], [q + 3, 40]], { lw: 1, color: T.wall }));
  [[-15, -6], [14, 10]].forEach((q) => {
    D.line([[q[0], q[1]], [q[0] * 0.3, q[1] - 14]], { lw: 1.6, color: tint(T.wall, 0.7) });
    D.circle(q[0], q[1], 8.5, { fill: T.panel, stroke: T.wall, lw: 1.1, shadow: 2 });
    D.circle(q[0], q[1], 5, { fill: 'rgba(255,214,90,.85)', stroke: tint(T.wall, 0.4), lw: 0.6 });
  });
  ctx.restore();
};
/* A surgical robot beside the table: a base and three arms reaching over the patient. */
const mskRobot = (x, y, tx, ty) => {
  const p = KP();
  [-0.35, 0, 0.35].forEach((a, k) => { const dx = tx - x, dy = ty - y, c = Math.cos(a), s = Math.sin(a); D.line([[x, y], [x + (dx * c - dy * s) * 0.8, y + (dx * s + dy * c) * 0.8]], { lw: 2.6, color: tint(COL.cisco, 0.6 + 0.1 * k) }); });
  D.circle(x, y, 7, { fill: p.metal, stroke: T.wall, lw: 1.2, shadow: 2 }); D.circle(x, y, 2.5, { fill: COL.cisco });
};
/* A treatment recliner with a patient, as in a private infusion bay. */
const mskRecliner = (x, y, rot = 0, occ = true) => {
  const p = KP();
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  D.box(-10, -12, 20, 26, { fill: tint(COL.people, 0.3), stroke: tint(COL.people, 0.85), lw: 1.1, r: 5, shadow: 2 });
  D.box(-9, -12, 18, 8, { fill: tint(COL.people, 0.5), r: 4 });
  D.box(-12, -5, 3, 16, { fill: tint(COL.people, 0.55), r: 1.5 }); D.box(9, -5, 3, 16, { fill: tint(COL.people, 0.55), r: 1.5 });
  D.box(-7, 14, 14, 6, { fill: tint(COL.people, 0.22), stroke: tint(COL.people, 0.6), lw: 0.8, r: 2 });
  if (occ) {
    ctx.beginPath(); ctx.ellipse(0, 3, 6, 8, 0, 0, Math.PI * 2); ctx.fillStyle = p.gown; ctx.fill();
    D.circle(0, -7, 3.8, { fill: '#f1d3b8', stroke: 'rgba(0,0,0,.25)', lw: 0.6 });
  }
  ctx.restore();
};
/* An infusion pump on its pole, with the drip running. */
const mskPump = (x, y) => { K.ivPole(x, y); D.box(x - 5, y - 11, 8, 6, { fill: T.panel, stroke: T.wall, lw: 0.8, r: 1 }); D.circle(x - 1, y - 8, 1.1, { fill: Math.sin(TT * 3 + x) > 0 ? COL.run : tint(COL.run, 0.3) }); };
/* A compounding hood (biological safety cabinet): steel body, glass sash, downward airflow. */
const mskHood = (x, y, w, h) => {
  const p = KP(); D.box(x, y, w, h, { fill: p.metal, stroke: T.wall, lw: 1.3, r: 3, shadow: 2 });
  for (let k = 0; k < Math.floor((w - 8) / 8); k++) D.line([[x + 8 + k * 8, y + 4], [x + 8 + k * 8, y + h * 0.5]], { lw: 1, color: tint(COL.cisco, 0.55), dash: [3, 3], offset: -TT * 10 });
  D.box(x + 3, y + h * 0.55, w - 6, h * 0.4, { fill: p.glass, stroke: T.wall, lw: 0.8, r: 2 });
};
/* A whole slide scanner: a slide rack on top and a light bar that sweeps across. */
const mskScanner = (x, y) => {
  const p = KP(); D.box(x, y, 26, 22, { fill: p.metal, stroke: T.wall, lw: 1.2, r: 3, shadow: 2 });
  for (let k = 0; k < 4; k++) D.box(x + 4 + k * 5, y + 3, 3, 8, { fill: p.sheet, stroke: tint(T.wall, 0.6), lw: 0.5, r: 0.5 });
  D.box(x + 3, y + 14, 20, 5, { fill: p.screen, r: 1 }); D.box(x + 3 + mod(TT * 9, 16), y + 14, 4, 5, { fill: tint(COL.cisco, 0.9), r: 1 });
};
/* An elevator: a car in its shaft with the doors on one side. */
const mskElevator = (x, y, s = 18) => { const p = KP(); D.box(x, y, s, s, { fill: p.metal, stroke: T.wall, lw: 1.2, r: 2 }); D.line([[x + 3, y + 3], [x + s - 3, y + s - 3]], { lw: 0.8, color: tint(T.wall, 0.6) }); D.line([[x + s - 3, y + 3], [x + 3, y + s - 3]], { lw: 0.8, color: tint(T.wall, 0.6) }); };
/* A street car seen from above. */
const mskCar = (x, y, ang, col) => {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  D.box(-13, -6.5, 26, 13, { fill: col, stroke: tint(T.wall, 0.8), lw: 1, r: 4, shadow: 2 });
  D.box(2, -5, 7, 10, { fill: KP().glass, r: 2 }); D.box(-10, -5, 5, 10, { fill: KP().glass, r: 2 });
  ctx.restore();
};
/* The enclosed bridge: glazed walls, a corridor floor and window mullions. */
const mskBridge = (x, y, w, h) => {
  const p = KP();
  D.box(x, y, w, h, { fill: p.glass, stroke: T.wall, lw: 2, r: 4, shadow: 5 });
  D.box(x + 3, y + 5, w - 6, h - 10, { fill: p.vinyl, r: 2 });
  for (let xx = x + 12; xx < x + w - 6; xx += 14) { D.line([[xx, y], [xx, y + 5]], { lw: 0.9, color: T.wall }); D.line([[xx, y + h - 5], [xx, y + h]], { lw: 0.9, color: T.wall }); }
  D.line([[x + 8, y + h / 2], [x + w - 8, y + h / 2]], { lw: 1, color: tint(COL.people, 0.35), dash: [8, 8] });
};
const mskOutside = () => ({ fill: THEME === 'dark' ? '#0a1626' : '#f0f3f6' });

/* M1: Memorial Hospital, the bridge over 67th Street and the Griffin Pavilion under commissioning. The pavilion
   is drawn south of the hospital (right of the street) as MSK describes it; rooms and equipment are illustrative. */
DECOR.msk_pavilion = (S) => {
  Z(S, 'hosp', 20, 56, 216, 306, ['care', 'clin'], () => {
    room(30, 78, 196, 122, 'Inpatient unit'); K.window(50, 78, 110);
    [[56, 150], [116, 150]].forEach((q) => { K.ecg(q[0] - 9, q[1] - 36, 18, 8); K.bed(q[0], q[1]); K.ivPole(q[0] + 19, q[1] - 4); });
    curtainV(86, 112, 70); curtainV(146, 112, 70); F.door(226, 132, 36, true);
    opt('nurse', () => person(62, 186, -Math.PI / 2, 'nurse', { s: 0.85 }));
    room(30, 214, 196, 138, 'Server room'); K.rackRow(40, 236, 12); K.rackRow(40, 258, 12); K.aisle(40, 281, 178, 8, 'hot');
    K.crac(40, 318, 0.7); K.ups(202, 320);
  });
  Z(S, 'street', 246, 56, 144, 306, ['bridge'], () => {
    K.road(290, 60, 56, 298); K.tree(262, 96, 8); K.tree(374, 230, 8); K.tree(262, 300, 9); K.tree(374, 336, 8);
    opt('traffic', () => { mskCar(304, 70 + mod(S.t * 26, 280), Math.PI / 2, THEME === 'dark' ? '#3b5576' : '#ffffff'); mskCar(332, 350 - mod(S.t * 20 + 140, 280), -Math.PI / 2, THEME === 'dark' ? '#4d5f73' : '#e2e8ee'); });
  }, mskOutside());
  Z(S, 'pav', 400, 56, 320, 190, ['suites'], () => {
    room(408, 76, 88, 160, 'Inpatient'); D.line([[448, 156], [496, 156]], { lw: 1.8, color: T.wall });
    [[472, 116], [472, 200]].forEach((q) => { K.bed(q[0], q[1], { patient: false }); K.chair(q[0] - 18, q[1] + 12, 0.4, tint(COL.people, 0.45)); });
    D.line([[448, 92], [448, 236]], { lw: 1.4, color: tint(T.wall, 0.6) });
    room(502, 76, 104, 160, 'OR suite'); room(612, 76, 100, 160, 'OR suite');
    mskOrTable(554, 140); mskOrTable(662, 140);
    opt('robot', () => { mskRobot(528, 162, 554, 140); K.desk(528, 214, 34, 12, { screens: 2, person: 'doc', chair: false }); });
    opt('or-team', () => { person(579, 120, Math.PI, 'doc', { s: 0.85 }); person(686, 120, Math.PI, 'nurse', { s: 0.85 }); });
  });
  Z(S, 'plant', 400, 256, 320, 106, ['bms', 'trades'], () => {
    room(408, 276, 156, 78, 'Mechanical room'); opt('air-handling', () => K.hvac(416, 302, 84, 40)); K.cableTray(416, 292, 140);
    room(572, 276, 140, 78, 'Site office', 'carpet'); K.table(598, 330, 22, 18);
    opt('contractors', () => { person(580, 330, 0, 'vendor', { s: 0.85 }); person(616, 330, Math.PI, 'it', { s: 0.85 }); });
  });
  // the enclosed two-story patient bridge over 67th Street, drawn last so it spans the street
  mskBridge(224, 132, 186, 36); F.door(408, 133, 34, true);
  opt('bridge-traffic', () => { const bx = 244 + mod(S.t * 16, 146); K.bed(bx, 150, { rot: Math.PI / 2, s: 0.75 }); D.person(bx - 20, 150, 0, null, { kind: 'nurse', s: 0.75 }); });
  tag('Patient bridge', 318, 182);
};

/* M2: a regional outpatient building with an infusion suite and pharmacy, the carrier circuits, and the data
   center that hosts the record. A composite, not one named site. */
DECOR.msk_infusion = (S) => {
  Z(S, 'site', 20, 56, 310, 306, ['chairs', 'pharm', 'wan'], () => {
    room(30, 78, 190, 166, 'Infusion suite'); K.window(60, 78, 130);
    [52, 96, 140, 184].forEach((x, k) => { mskRecliner(x, 124, 0, k !== 2); mskPump(x + 15, 118); if (k) curtainV(x - 22, 102, 42); });
    [[54, 222], [196, 222]].forEach((q) => { mskRecliner(q[0], q[1], Math.PI, true); mskPump(q[0] + 15, q[1] + 6); });
    opt('nurse', () => person(204, 166, Math.PI, 'nurse', { s: 0.85 }));
    room(228, 78, 92, 166, 'Pharmacy'); K.shelves(236, 100, 76, 22); mskHood(236, 196, 52, 36);
    opt('pharmacist', () => person(304, 214, Math.PI, 'nurse', { s: 0.85 })); K.cart(304, 138);
    room(30, 252, 190, 100, 'Waiting room', 'carpet'); K.sofa(40, 318, 64, 18); K.sofa(112, 318, 64, 18);
    K.desk(190, 280, 34, 12, { screens: 1, person: 'nurse' }); opt('visitors', () => { person(72, 300, 0.4, 'visitor', { s: 0.85 }); person(144, 300, -0.3, 'patient', { s: 0.85 }); });
    K.doorArc(186, 352, 14, 1);
    room(228, 252, 92, 100, 'IDF closet'); K.switchStack(236, 276, 2, 76); K.ups(296, 322);
  });
  Z(S, 'carriers', 340, 56, 150, 306, ['carrier'], () => {
    K.fiber([[336, 150], [494, 150]]); K.manhole(372, 150); K.manhole(460, 150); tag('Primary circuit', 415, 132);
    K.conduit([[336, 296], [494, 296]], { speed: 18 }); K.manhole(392, 296); tag('Alternate circuit', 415, 278);
    K.tree(360, 330, 8); K.tree(470, 96, 8); opt('tower', () => K.tower(462, 334, 0.8));
  }, mskOutside());
  Z(S, 'dc', 500, 56, 220, 306, ['ehr', 'call'], () => {
    room(508, 78, 204, 166, 'Data center'); K.rackRow(520, 100, 12); K.rackRow(520, 122, 12); K.aisle(520, 145, 178, 8, 'hot');
    K.crac(516, 204, 0.7); K.crac(678, 204, 0.7);
    room(508, 252, 204, 100, 'IT operations', 'carpet'); K.tv(626, 262, 74);
    K.desk(546, 334, 44, 12, { screens: 2, person: 'it' }); K.desk(676, 334, 44, 12, { screens: 2, person: 'it' });
  });
};

/* M3: image reading, digital pathology, data governance, research computing and the shared data center paths on
   campus, and a public cloud region. Rooms are illustrative. */
DECOR.msk_research = (S) => {
  Z(S, 'hosp', 20, 56, 500, 306, ['view', 'path', 'rev', 'fab', 'gpu'], () => {
    room(30, 78, 150, 118, 'Reading room', 'carpet'); K.desk(66, 108, 46, 14, { screens: 3, person: 'doc' }); K.desk(144, 108, 46, 14, { screens: 3, person: 'doc' });
    room(188, 78, 160, 118, 'Digital pathology');
    opt('scanners', () => { [198, 228, 258].forEach((x) => mskScanner(x, 100)); tag('Slide scanners', 241, 134, { maxW: 100 }); });
    K.shelves(298, 100, 42, 22); K.desk(318, 170, 40, 12, { screens: 2, person: 'doc', chair: false });
    room(356, 78, 156, 118, 'Data governance', 'wood'); K.table(434, 126, 70, 18); [[410, 112], [458, 112]].forEach((q) => person(q[0], q[1], Math.PI / 2, 'it', { s: 0.82 })); K.shelves(468, 160, 36, 22);
    room(30, 214, 220, 138, 'Research computing'); K.rackRow(40, 236, 13, { led: COL.cisco }); K.rackRow(40, 258, 13, { led: COL.cisco }); K.aisle(40, 281, 193, 8, 'hot'); K.crac(40, 318, 0.7);
    room(258, 214, 254, 138, 'Data center');
    K.switchStack(270, 238, 2, 92); tag('Fabric', 316, 266); K.rackRow(380, 236, 8); K.rackRow(380, 258, 8); tag('Storage', 439, 292); K.cableTray(270, 336, 230);
  });
  Z(S, 'vend', 532, 56, 188, 306, ['cloud'], () => {
    opt('clouds', () => { K.cloud(574, 98, 0.85, { fill: KP().cloud }); K.cloud(686, 92, 0.7); });
    K.fiber([[506, 300], [548, 300]]); K.manhole(530, 300);
    room(548, 262, 164, 90, 'Cloud region'); K.rackRow(560, 286, 9, { led: COL.cisco }); K.rackRow(560, 312, 9, { led: COL.cisco });
  }, mskOutside());
};

/* M4: a perioperative floor, the clinical systems behind it with the vendor access edge, and a supplier outside. */
DECOR.msk_supplier = (S) => {
  Z(S, 'floor', 20, 56, 240, 306, ['or', 'lead'], () => {
    room(30, 78, 110, 118, 'OR 1'); room(148, 78, 102, 118, 'OR 2');
    mskOrTable(84, 136); mskOrTable(200, 136);
    opt('or-team', () => { person(110, 116, Math.PI, 'doc', { s: 0.82 }); person(226, 116, Math.PI, 'nurse', { s: 0.82 }); });
    K.corridor(30, 204, 220, 30);
    walker(S, [[50, 219], [230, 219]], { speed: 14, kind: 'nurse', loop: false });
    room(30, 242, 96, 110, 'Recovery'); [[56, 306], [100, 306]].forEach((q) => { K.ecg(q[0] - 9, q[1] - 36, 18, 8); K.bed(q[0], q[1]); }); curtainV(78, 270, 70);
    room(134, 242, 116, 110, 'Control desk', 'carpet'); K.tv(150, 268, 84); K.desk(192, 330, 64, 12, { screens: 3, person: 'nurse', chair: false });
    opt('leaders', () => person(156, 312, 0.2, 'doc', { s: 0.85 }));
  });
  Z(S, 'dc', 270, 56, 260, 306, ['hosts', 'sec', 'acc'], () => {
    room(278, 78, 244, 118, 'Server room'); K.rackRow(290, 100, 15); K.rackRow(290, 122, 15); K.aisle(290, 145, 223, 8, 'hot');
    room(278, 214, 124, 138, 'IT and security', 'carpet');
    K.desk(310, 248, 40, 12, { screens: 2, person: 'it' }); K.desk(372, 248, 40, 12, { screens: 2, person: 'it' });
    room(410, 214, 112, 138, 'Vendor access'); K.switchStack(420, 232, 2, 92); tag('Firewall, VPN', 466, 262, { maxW: 96 }); K.rackRow(486, 320, 2);
  });
  Z(S, 'ext', 540, 56, 180, 306, ['sup'], () => {
    K.fiber([[522, 300], [580, 300], [580, 246]]); K.manhole(580, 300);
    opt('supplier-office', () => { K.building(566, 178, 128, 66, { hvac: 2 }); tag('Supplier office', 630, 256); });
    K.road(548, 330, 164, 16); K.tree(690, 300, 8); K.tree(560, 96, 8); opt('cloud', () => K.cloud(692, 92, 0.6));
  }, mskOutside());
};
