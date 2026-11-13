/* Floor plans for every use case, dressed with the set-dressing kit (12-kit.js).
   Node positions live in each use case file; this file only draws the physical space around them (rooms, racks, beds, clouds, fibre, people). */
const room = (x, y, w, h, label, kind = 'vinyl') => {
  K.floor(x, y, w, h, kind, 6); D.box(x, y, w, h, { stroke: T.wall, lw: 1.8, r: 6 });
  label = LBL(label);
  if (label) D.text(label.toUpperCase(), x + 8, y + 14, { size: 9.5, weight: 800, color: T.sub, maxW: w - 14, drop: true });
};
const person = (x, y, ang, kind, o = {}) => D.person(x, y, ang, null, Object.assign({ kind }, o));
const waves = (x, y, r = 58) => { for (let k = 0; k < 3; k++) { const q = mod(TT * 0.45 + k / 3, 1); D.circle(x, y, 10 + r * q, { stroke: tint(COL.cisco, 0.34 * (1 - q)), lw: 1.4 }); } };
const gantry = (x, y, s = 1, rot = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); K.gantry(0, 0, { rot }); ctx.restore(); };
const tag = (s, x, y, o = {}) => (s = LBL(s)) && D.text(s, x, y, Object.assign({ size: 10, weight: 700, color: T.sub, halo: 3, align: 'center', maxW: 120, drop: true }, o));
/* A cloud with a fibre drop: cloud connectivity leaving a data center. */
const cloudDrop = (x, y, s, to, o = {}) => { K.fiber([[x, y + 12 * s]].concat(to), { color: o.color, speed: o.speed }); K.cloud(x, y, s, o); };
/* A zone whose floor is dressed by fn; the state shading is drawn on top of the dressing so down areas still read. */
const Z = (S, id, x, y, w, h, watch, fn, o = {}) => {
  S.zone(id, x, y, w, h, Object.assign({ watch, late: true, deferText: true }, o)); fn();
  const an = ANIM.zones.get(id); ctx.save(); ctx.globalAlpha *= an ? an.a : 1; S.shade(x, y, w, h, watch, o.r ?? 10); ctx.restore();
  S.areaName(id); // the zone name goes on last, over the dressing
};
/* Dressing a use case can switch off with scene.hide: ['<id>'] when it reuses the plan for another story. */
const opt = (id, fn) => { if (!HID(id)) fn(); };
/* A line of text that belongs to the plan's original story; scene.labels can reword or hide it. */
const note = (s, x, y, o) => { s = LBL(s); if (s) D.text(s, x, y, o); };

const curtainV = (x, y, h) => { ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); for (let k = 0; k <= h; k += 3) ctx.lineTo(x + Math.sin(k * 0.7) * 1.5, y + k); ctx.strokeStyle = tint(COL.people, 0.7); ctx.lineWidth = 2.4; ctx.stroke(); ctx.restore(); };
const track = (x, y, h) => D.line([[x, y], [x, y + h]], { lw: 2.2, color: tint(COL.people, 0.75), dash: [5, 4] });

const DECOR = {};

/* F1: a clinical floor, the data center, and the internet edge */
DECOR.security = (S) => {
  Z(S, 'floor', 20, 56, 250, 306, ['pump', 'mon', 'phones'], () => {
    K.ward(30, 78, 104, 108, 'Room 412', { bx: 52, by: 150 }); K.ward(140, 78, 104, 108, 'Room 413', { bx: 162, by: 150 });
    K.corridor(30, 194, 214, 72); opt('nurse-station', () => K.nurseStation(36, 204, 66, 44));
    room(30, 290, 100, 62, 'Supply'); K.shelves(38, 316, 84, 30);
    room(140, 290, 104, 62, 'IDF closet'); K.rackRow(148, 312, 6); K.switchStack(150, 336, 1, 86);
    walker(S, [[112, 218], [236, 218]], { speed: 20, kind: 'nurse', loop: false });
    walker(S, [[236, 252], [112, 252]], { speed: 17, kind: 'doc', off: 0.4, loop: false });
  });
  Z(S, 'dc', 282, 56, 238, 306, ['lib', 'ehr'], () => { K.dataHall(288, 78, 226, 278, { ups: true }); });
  Z(S, 'ext', 532, 56, 188, 306, [], () => {
    K.road(540, 334, 172, 16); K.tree(566, 300, 9); K.tree(688, 296, 8); opt('tower', () => K.tower(690, 232, 1));
    opt('cloud', () => cloudDrop(690, 112, 0.9, [[690, 130]], { icon: 'globe' })); K.fiber([[514, 338], [560, 338], [560, 262], [612, 262]]); K.manhole(560, 300);
  });
};

/* F2: tower, imaging, plant, a clinic far away and a home */
DECOR.facilities = (S) => {
  Z(S, 'tower', 20, 56, 282, 180, ['room', 'idf', 'noc'], () => {
    K.ward(30, 76, 96, 92, 'Room 412', { bx: 48, by: 138 }); room(134, 76, 120, 92, 'IDF closet'); K.rackRow(142, 100, 7); K.cableTray(142, 122, 100);
    room(30, 176, 254, 52, 'NOC', 'carpet'); K.tv(64, 198, 56); K.desk(214, 198, 36, 12, { screens: 2, person: 'it' }); K.desk(258, 198, 24, 12, { screens: 1, chair: false });
  });
  Z(S, 'imgz', 312, 56, 140, 180, ['img'], () => { room(320, 76, 124, 152, 'Imaging suite'); opt('gantry', () => gantry(386, 196, 1, 0)); K.window(340, 76, 40); K.desk(420, 214, 36, 10, { screens: 2, chair: false }); }, { label: '' });
  Z(S, 'plant', 462, 56, 258, 180, ['bms', 'gen'], () => {
    opt('air-handling', () => { K.hvac(474, 172, 108, 48); tag('Air handling', 528, 232); }); opt('generator', () => { K.generator(604, 170, 104, 52); tag('Generator', 656, 232); }); K.cableTray(474, 160, 232);
  });
  Z(S, 'remote', 20, 246, 700, 116, ['clinic', 'home'], () => {
    K.road(30, 340, 680, 14); K.conduit([[30, 333], [710, 333]], { speed: 24 }); [90, 250, 410, 570, 690].forEach((x) => K.manhole(x, 347));
    opt('clinic', () => K.building(98, 262, 124, 68, { hvac: 1, cross: true })); K.tree(250, 280, 9); K.tree(272, 300, 8); K.tower(330, 292, 1.1);
    K.tree(410, 270, 9); opt('house', () => K.house(468, 262, 108, 66)); K.tree(604, 290, 9); K.tree(660, 280, 8);
    walker(S, [[240, 330], [300, 330]], { speed: 10, kind: 'visitor', loop: false });
  });
};

/* F3: exam room, CT, GPU rack, reading room and the vendor cloud */
DECOR.ai = (S) => {
  Z(S, 'hosp', 20, 56, 500, 306, ['mic', 'ct', 'gpu', 'pacs', 'md'], () => {
    K.ward(30, 78, 122, 118, 'Exam room', { bx: 132, by: 152 }); person(112, 176, -0.4, 'doc', { s: 0.9 });
    room(30, 226, 122, 126, 'CT suite'); opt('gantry', () => gantry(106, 322, 0.72, 0));
    room(180, 78, 170, 108, 'Reading room', 'carpet'); K.desk(224, 170, 44, 14, { screens: 2, person: 'doc' }); K.desk(310, 170, 44, 14, { screens: 3, person: 'doc' });
    room(180, 226, 170, 126, 'GPU rack row'); K.rackRow(190, 250, 10, { led: COL.cisco }); K.rackRow(190, 270, 10, { led: COL.cisco }); K.aisle(190, 291, 148, 8, 'hot');
    K.rackRow(190, 303, 10, { led: COL.cisco }); K.rackRow(190, 326, 10, { led: COL.cisco });
    room(362, 170, 150, 100, 'Office', 'wood'); K.desk(466, 250, 60, 14, { screens: 2, person: 'doc' }); K.shelves(434, 196, 70, 16); K.sofa(370, 244, 42, 18);
    walker(S, [[160, 204], [352, 204]], { speed: 18, kind: 'nurse', loop: false });
  });
  Z(S, 'vend', 532, 56, 188, 306, ['vendor', 'up'], () => {
    opt('clouds', () => { K.cloud(600, 98, 1.5, { fill: KP().cloud }); K.cloud(690, 214, 0.9); }); opt('tower', () => K.tower(700, 108, 0.9));
    K.fiber([[516, 236], [560, 236], [660, 236]]); K.manhole(560, 236); K.rackRow(546, 332, 11, { led: COL.cisco });
  }, { fill: THEME === 'dark' ? '#0a1626' : '#f0f3f6' });
};

/* UC1: slow EHR, from the bedside to the data center */
DECOR.ehr = (S) => {
  Z(S, 'floor', 20, 56, 236, 306, ['wow', 'wifi'], () => {
    K.ward(30, 78, 110, 108, 'Room 408', { bx: 52, by: 152 }); K.corridor(148, 78, 100, 108, 'Hallway'); opt('wifi-waves', () => waves(196, 142, 54));
    room(30, 236, 216, 116, 'War room', 'carpet'); opt('war-room', () => { K.tv(150, 256, 80);
    K.table(184, 306, 88, 28); [[160, 284], [184, 284], [208, 284]].forEach((q) => person(q[0], q[1], Math.PI / 2, ['doc', 'it', 'nurse'][(q[0] / 24) % 3 | 0] || 'it', { s: 0.9 })); [[160, 328], [184, 328], [208, 328]].forEach((q, k) => person(q[0], q[1], -Math.PI / 2, ['it', 'it', 'doc'][k], { s: 0.9 })); });
    walker(S, [[170, 100], [170, 170]], { speed: 14, kind: 'nurse' });
  });
  Z(S, 'path', 266, 56, 142, 306, ['wan'], () => { K.networkPath(268, 72, 138, 286); });
  Z(S, 'dc', 418, 56, 302, 306, ['vdi', 'ehr', 'store'], () => { K.dataHall(424, 80, 290, 274, { ups: true }); opt('cloud', () => cloudDrop(698, 72, 0.6, [[698, 96]])); });
};

/* UC2: medical devices on a flat network */
DECOR.iomt = (S) => {
  Z(S, 'flat', 20, 56, 330, 306, ['pumps', 'img', 'guest', 'net'], () => {
    K.ward(30, 78, 118, 112, 'ICU bays', { bx: 52, by: 150 }); K.bed(126, 150, {}); K.ecg(117, 116, 18, 8);
    room(160, 78, 180, 112, 'Core closet'); K.rackRow(170, 100, 11); K.rackRow(170, 122, 11); K.ups(318, 130);
    room(30, 226, 118, 126, 'Radiology'); gantry(110, 320, 0.7, 0);
    room(160, 226, 180, 126, 'Guest and visitor Wi-Fi', 'carpet'); K.sofa(170, 326, 70, 20); K.sofa(262, 326, 70, 20); opt('visitors', () => { person(300, 262, 0.5, 'visitor'); person(178, 272, -0.3, 'visitor'); }); opt('wifi-waves', () => waves(252, 294, 60));
  });
  Z(S, 'teams', 362, 56, 358, 306, ['scan', 'cmms', 'sec'], () => {
    room(370, 78, 342, 112, '', 'carpet'); room(370, 196, 342, 150, '', 'carpet');
    [[420, 'Vulnerability team'], [540, 'Clinical engineering'], [650, 'Security']].forEach((q, k) => { K.desk(q[0], 222, 70, 14, { screens: 2, person: ['it', 'it', 'it'][k] }); tag(q[1], q[0], 262, { maxW: 100 }); K.corkboard(q[0] - 24, 276, 48, 38, [[10, 10], [30, 24]]); });
    note('Three teams, three lists, no shared device record', 540, 334, { size: 10.5, weight: 600, color: T.sub, align: 'center', maxW: 320 });
  });  // once the segment is approved, the ICU bays get their own boundary
  const sa = HID('device-segment') ? 0 : S.alpha('seg'), segName = LBL('Device segment').toUpperCase();
  if (sa > 0.05) { ctx.save(); ctx.globalAlpha *= sa; D.box(26, 80, 126, 114, { fill: tint(COL.cisco, 0.07), stroke: COL.cisco, lw: 2, r: 8, dash: [7, 4] }); if (segName) D.text(segName, 89, 207, { size: 9.5, weight: 800, color: COL.cisco, align: 'center', halo: 3 }); ctx.restore(); }
};

/* UC3: downtime, with a neighbor hospital taking diversions */
DECOR.ransom = (S) => {
  Z(S, 'hosp', 20, 56, 560, 306, ['idn', 'ehr', 'pharm', 'lab', 'ed', 'bak'], () => {
    room(30, 78, 120, 108, 'Identity'); K.rackRow(42, 100, 7);
    room(156, 78, 120, 108, 'EHR data center'); K.rackRow(166, 100, 7); K.crac(250, 154, 0.6);
    room(282, 78, 120, 108, 'Pharmacy'); K.shelves(292, 100, 100, 24); K.cart(380, 168);
    room(408, 78, 120, 108, 'Laboratory'); K.bench(416, 100, 104, 22); K.bench(416, 160, 70, 18);
    room(30, 226, 120, 126, 'Backup vault'); K.vault(112, 242, 34, 34); K.rackRow(40, 330, 7);
    room(160, 226, 200, 126, 'Emergency department'); [[196, 324], [242, 324], [288, 324], [334, 324]].forEach((q, k) => { K.bed(q[0], q[1], { rot: 0 }); if (k < 3) track(q[0] + 23, 300, 50); }); K.crashCart(346, 252);
    walker(S, [[170, 252], [330, 252]], { speed: 16, kind: 'nurse', loop: false }); walker(S, [[330, 268], [170, 268]], { speed: 12, kind: 'doc', off: 0.3, loop: false });
  });
  Z(S, 'region', 592, 56, 128, 306, [], () => {
    opt('neighbor-hospital', () => { K.building(604, 84, 104, 78, { helipad: true, cross: true }); tag('Neighbor hospital', 656, 176, { maxW: 100 }); }); K.road(676, 188, 30, 164); K.tree(618, 230, 9); K.tree(626, 290, 8);
    const diverted = S.st('ed') === 'down' || S.st('ehr') === 'down'; const yy = diverted ? 192 + mod(S.t * 34, 150) : 330;
    opt('ambulance', () => K.car(691, yy, diverted ? Math.PI / 2 : -Math.PI / 2, { t: S.t, lights: true }));
  });
};

/* UC4: the badge call that has to roam */
DECOR.wifi = (S) => {
  Z(S, 'floor', 20, 56, 470, 306, ['ap1', 'ap2', 'badge', 'idf'], () => {
    K.corridor(30, 78, 330, 100); opt('wifi-waves', () => { waves(130, 134, 62); waves(420, 134, 62); });
    room(366, 78, 114, 100, 'Stairwell'); F.stairs(380, 100, 86, 66);
    K.ward(30, 192, 200, 84, 'Room 411', { bx: 100 }); K.ward(240, 192, 240, 84, 'Room 412', { bx: 340 });
    room(30, 290, 200, 62, 'IDF with PoE'); K.rackRow(150, 296, 4); K.switchStack(44, 322, 2, 92);
    walker(S, [[50, 106], [340, 106]], { speed: 18, kind: 'nurse', label: 'Nurse', ly: 16 });
    walker(S, [[340, 160], [60, 160]], { speed: 12, kind: 'doc', off: 0.5 });
  });
  Z(S, 'sys', 502, 56, 218, 306, ['nc', 'rtls'], () => { K.dataHall(508, 78, 206, 278, { ups: false }); opt('cloud', () => cloudDrop(690, 72, 0.6, [[690, 100]])); });
};

/* UC5: the study that has to reach the reader */
DECOR.imaging = (S) => {
  Z(S, 'clinic', 20, 56, 200, 306, ['ct'], () => {
    room(30, 78, 180, 160, 'CT suite'); opt('gantry', () => gantry(112, 204, 1, 0)); K.window(40, 250, 50);
    room(30, 250, 180, 102, 'Control room', 'carpet'); K.desk(100, 316, 70, 14, { screens: 3, person: 'it' }); person(176, 290, 3.14, 'nurse', { s: 0.9 });
  });
  Z(S, 'wanz', 232, 56, 236, 306, ['wan'], () => { K.networkPath(236, 72, 228, 286); });
  Z(S, 'main', 480, 56, 240, 306, ['pacs', 'ai', 'rad'], () => {
    room(488, 78, 224, 134, 'PACS and AI'); K.rackRow(498, 100, 13); K.rackRow(498, 122, 13, { led: COL.cisco }); K.crac(676, 150, 0.7); opt('cloud', () => cloudDrop(696, 72, 0.5, [[696, 92]]));
    room(488, 224, 224, 128, 'Reading room', 'carpet'); K.desk(530, 334, 44, 14, { screens: 3, person: 'doc' }); K.desk(626, 334, 44, 14, { screens: 3, person: 'doc' }); K.tv(520, 250, 80);
  });
};

/* UC6: the hospital that is a living room */
DECOR.home = (S) => {
  Z(S, 'house', 20, 56, 200, 306, ['kit', 'cell'], () => {
    room(30, 78, 180, 136, 'Living room', 'wood'); K.sofa(40, 188, 78, 22); K.tv(128, 86, 56); opt('patient-bed', () => { K.bed(186, 146, { rot: 0 }); K.ivPole(164, 160); }); K.tree(48, 120, 7);
    room(30, 228, 180, 124, 'Kitchen and entry', 'wood'); K.table(150, 304, 56, 34); person(150, 276, Math.PI / 2, 'visitor', { s: 0.9 }); K.doorArc(60, 352, 14, 1);
    walker(S, [[44, 252], [190, 252]], { speed: 12, kind: 'nurse', loop: false });
  });
  Z(S, 'net', 232, 56, 200, 306, ['isp', 'video'], () => {
    K.road(240, 214, 184, 16); K.conduit([[236, 222], [430, 222]], { speed: 26 }); K.manhole(300, 222); K.manhole(380, 222);
    opt('houses', () => { K.house(244, 78, 62, 40); K.house(356, 80, 58, 38); }); K.tree(330, 100, 8); K.tree(262, 336, 9); K.tree(404, 338, 8); K.tower(402, 256, 1);
  });
  Z(S, 'hosp', 444, 56, 276, 306, ['cmd', 'ehr'], () => {
    room(452, 78, 260, 130, 'Command center', 'carpet'); K.tv(580, 86, 100); K.desk(500, 188, 50, 14, { screens: 3, person: 'nurse' }); K.desk(600, 188, 50, 14, { screens: 3, person: 'doc' });
    room(452, 224, 260, 128, 'Data center'); K.rackRow(462, 246, 16); K.rackRow(462, 268, 16); K.rackRow(462, 326, 16); K.rackRow(462, 304, 16); K.crac(688, 268, 0.6); opt('cloud', () => cloudDrop(696, 72, 0.5, [[696, 92]]));
  });
};

/* UC7: the acquired clinic that arrives flat */
DECOR.wan = (S) => {
  Z(S, 'clin', 20, 56, 220, 306, ['clinic', 'rdp'], () => {
    room(30, 78, 200, 140, 'Clinic floor'); opt('exam-bed', () => K.bed(60, 184, { rot: Math.PI / 2 })); K.desk(192, 196, 56, 14, { screens: 2, person: 'doc' }); K.chair(212, 100, 0); K.chair(190, 100, 0); K.window(120, 78, 50);
    room(30, 232, 200, 120, 'Back office', 'carpet'); K.desk(176, 332, 56, 14, { screens: 2, person: 'it' }); D.box(40, 330, 20, 16, { fill: T.panel, stroke: T.wall, lw: 1.2, r: 2 }); D.box(64, 330, 20, 16, { fill: T.panel, stroke: T.wall, lw: 1.2, r: 2 });
    walker(S, [[44, 150], [220, 150]], { speed: 14, kind: 'nurse', loop: false });
  });
  S.area(250, 56, 140, 306, 'The circuit', { id: 'circuit', r: 10, watch: ['circ'], late: true });
  K.networkPath(252, 72, 136, 286); S.shade(250, 56, 140, 306, ['circ'], 10);
  Z(S, 'parent', 400, 56, 320, 306, ['ehr', 'ip', 'soc'], () => {
    room(408, 78, 304, 138, 'Parent data center'); K.rackRow(420, 100, 14); K.rackRow(420, 122, 14); K.crac(676, 150, 0.7); opt('cloud', () => cloudDrop(690, 72, 0.5, [[690, 92]]));
    room(408, 232, 304, 120, 'Parent network and SOC', 'carpet'); K.tv(500, 252, 190); K.desk(480, 338, 44, 12, { screens: 2, person: 'it' }); K.desk(570, 338, 44, 12, { screens: 2, person: 'it' }); K.desk(660, 338, 44, 12, { screens: 3, person: 'it' });
  });
};

/* UC8: fast for the nurse, strong for the vendor */
DECOR.identity = (S) => {
  Z(S, 'users', 20, 56, 200, 306, ['nurse', 'vendor'], () => {
    room(30, 78, 180, 128, 'Hospitalist workstation', 'carpet'); K.desk(166, 186, 58, 14, { screens: 2, person: 'doc' }); K.cart(52, 170);
    room(30, 224, 180, 128, 'Modality (vendor remote)'); opt('gantry', () => gantry(156, 322, 0.62, 0)); opt('vendor-person', () => person(70, 332, 0, 'vendor', { s: 0.95 }));
  });
  Z(S, 'dirs', 232, 56, 370, 306, ['ad1', 'ad2', 'okta'], () => {
    [300, 410, 520].forEach((x) => { room(x - 52, 78, 104, 90, ''); K.rackRow(x - 45, 92, 6); });
    K.cableTray(244, 204, 346); K.switchStack(374, 232, 3, 86); K.rackRow(250, 322, 5); K.rackRow(250, 300, 5); K.cableTray(246, 272, 130);
    opt('cloud', () => cloudDrop(540, 252, 1.0, [[540, 206]], { icon: 'cloud' })); note('Three mergers, three directories', 417, 226, { size: 11, weight: 600, color: T.sub, align: 'center', maxW: 340 });
  });
  S.area(612, 56, 108, 306, 'Break-glass', { id: 'break-glass-area', r: 10, watch: ['glass'], late: true });
  room(620, 78, 92, 150, 'ED desk', 'carpet'); K.desk(666, 190, 62, 14, { screens: 2, person: 'doc' }); opt('break-glass', () => { D.box(640, 100, 44, 30, { fill: tint(COL.pain, 0.12), stroke: COL.pain, lw: 1.6, r: 3 }); note('GLASS', 662, 115, { size: 9.5, weight: 800, color: COL.pain, align: 'center' }); });
  S.shade(612, 56, 108, 306, ['glass'], 10);
};

/* UC9: the map a surveyor asks for on a Tuesday */
DECOR.compliance = (S) => {
  Z(S, 'ev', 20, 56, 430, 306, ['cork', 'cmms', 'dhcp', 'nac', 'grc', 'shot'], () => {
    room(28, 76, 414, 276, '', 'carpet'); opt('corkboard', () => { K.corkboard(34, 150, 92, 120, [[18, 24], [56, 44], [30, 72], [74, 88], [70, 22]]); tag('Corkboard', 80, 284); });
    K.desk(262, 214, 56, 14, { screens: 2, person: 'it' }); K.shelves(240, 330, 130, 20); K.shelves(40, 322, 90, 22); K.crashCart(430, 330); K.tv(250, 84, 110);
    walker(S, [[240, 258], [380, 258]], { speed: 12, kind: 'it', loop: false });
  });
  Z(S, 'ask', 462, 56, 258, 306, ['surv'], () => {
    room(470, 78, 242, 274, '', 'wood'); opt('surveyor', () => { K.desk(592, 276, 84, 16, { screens: 1, person: 'visitor' }); tag('Surveyor, Tuesday', 592, 312); }); K.cart(690, 332);
    opt('surveyor-quote', () => { const q = LBL('"Show me the ePHI map and the isolation date."', 'quote'); if (q) D.wrap(q, 484, 100, 220, 14, { size: 11.5, weight: 600, color: T.sub, maxLines: 3 }); });
  });
};

/* UC10: the scribe that stops at 8:12 */
DECOR.aiwork = (S) => {
  Z(S, 'clinic', 20, 56, 330, 306, ['room', 'ap', 'md', 'chat'], () => {
    K.ward(30, 78, 140, 108, 'Exam room 3', { bx: 146, by: 152 }); person(120, 172, -0.3, 'doc', { s: 0.9 });
    room(180, 78, 160, 108, 'Physician workroom', 'carpet'); K.desk(296, 170, 58, 14, { screens: 2, person: 'doc' }); K.shelves(190, 100, 70, 16);
    room(30, 226, 140, 126, 'Wi-Fi closet'); K.rackRow(40, 332, 8); K.cableTray(40, 316, 100); opt('wifi-waves', () => waves(90, 294, 54));
    room(180, 226, 160, 126, 'Physician laptop', 'carpet'); K.desk(296, 332, 58, 14, { screens: 1, person: 'doc' });
    walker(S, [[174, 200], [340, 200]], { speed: 14, kind: 'nurse', loop: false });
  });
  Z(S, 'out', 362, 56, 358, 306, ['vendor', 'up'], () => {
    opt('clouds', () => { K.cloud(400, 100, 1.5); K.cloud(560, 80, 1.2); K.cloud(690, 112, 1.0); }); opt('tower', () => K.tower(386, 320, 1));
    K.fiber([[352, 300], [420, 300], [420, 232], [708, 232]]); K.manhole(420, 266);
    room(500, 262, 210, 90, 'Vendor GPU hall'); K.rackRow(512, 282, 12, { led: COL.cisco }); K.rackRow(512, 308, 12, { led: COL.cisco });
  }, { fill: THEME === 'dark' ? '#0a1626' : '#f0f3f6' });
};
