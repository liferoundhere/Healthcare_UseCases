// @editions nyulh
/* Floor plans for the four NYU Langone Health account stories (N1 to N4). This file ships only in that edition.
   Every layout is illustrative and drawn from public, high-level descriptions (building names, what a building
   holds, publicly described resilience features). Network closets, data halls, the SOC and every desk are placed
   for the story, not at real locations. Helpers come from 44-decor.js (room, Z, opt, note, tag, person, waves) and
   the kit in 12-kit.js; the few pieces the kit lacks are local to this file and prefixed NYU. */
const NYU = {
  /* A service desk agent: desk, two screens, a seated agent and a headset (band over the head, ear cups, mic boom). */
  agent(x, y, w = 44) {
    K.desk(x, y, w, 14, { screens: 2, person: 'it' });
    const hy = y + 14, dark = THEME === 'dark' ? '#e3eaf2' : '#1d2730';
    ctx.save(); ctx.beginPath(); ctx.arc(x + 0.4, hy, 7.6, Math.PI * 1.05, Math.PI * 1.95); ctx.strokeStyle = dark; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    D.box(x - 9.6, hy - 3.2, 4, 6.4, { fill: dark, r: 1.5 }); D.box(x + 6.4, hy - 3.2, 4, 6.4, { fill: dark, r: 1.5 });
    D.line([[x - 7.6, hy - 2], [x - 5, hy - 9]], { lw: 1.4, color: dark }); D.circle(x - 4.8, hy - 9.6, 2, { fill: COL.cisco });
  },
  /* Open water with slow animated swell. */
  water(x, y, w, h) {
    const c = '#049FD9'; D.box(x, y, w, h, { fill: tint(c, THEME === 'dark' ? 0.2 : 0.13), r: 4 });
    ctx.save(); D.rr(x, y, w, h, 4); ctx.clip(); ctx.strokeStyle = tint(c, 0.4); ctx.lineWidth = 1;
    for (let yy = y + 10; yy < y + h; yy += 13) {
      ctx.beginPath();
      for (let xx = x; xx <= x + w; xx += 3) { const v = Math.sin(xx * 0.18 + TT * 1.4 + yy * 0.7) * 1.6; if (xx === x) ctx.moveTo(xx, yy + v); else ctx.lineTo(xx, yy + v); }
      ctx.stroke();
    }
    ctx.restore();
  },
  /* A flood barrier line: a wall with posts, the way a deployable barrier reads in plan. */
  barrier(pts) {
    const c = THEME === 'dark' ? '#7fb2e5' : '#1B4F8A';
    D.line(pts, { lw: 4.4, color: tint(c, 0.85), cap: 'butt' });
    for (let i = 1; i < pts.length; i++) {
      const [ax, ay] = pts[i - 1], [bx, by] = pts[i], L = Math.hypot(bx - ax, by - ay);
      for (let d = 0; d <= L; d += 16) D.box(ax + ((bx - ax) * d) / L - 3, ay + ((by - ay) * d) / L - 3, 6, 6, { fill: T.panel, stroke: c, lw: 1.2, r: 1 });
    }
  },
  /* A small exam room inside an outpatient hub: walls on three sides, an exam table and a stool. */
  exam(x, y, w, h) {
    D.box(x, y, w, h, { stroke: T.wall, lw: 1.2, r: 3 });
    D.line([[x + w * 0.62, y + h], [x + w, y + h]], { lw: 2.2, color: T.floor, cap: 'butt' });
    ctx.save(); ctx.translate(x + w * 0.36, y + h * 0.48); ctx.scale(0.62, 0.62); K.bed(0, 0, { patient: false }); ctx.restore();
    K.chair(x + w * 0.76, y + h * 0.4, 0.4);
  },
  /* A device nobody has recorded yet: a dashed box with a question mark. */
  unknown(x, y) {
    D.box(x - 7, y - 6, 14, 12, { fill: T.panel, stroke: COL.warn, lw: 1.1, r: 2, dash: [2, 2] });
    D.text('?', x, y + 0.5, { size: 9.5, weight: 800, color: COL.amber || COL.warn, align: 'center' });
  },
  /* A vertical riser shaft with a cable tray. */
  riser(x, y, h) { D.box(x - 9, y, 18, h, { fill: KP().raised, stroke: T.wall, lw: 1.1, r: 3 }); K.cableTray(x - 3, y + 4, h - 8, true); },
};

/* N1: a new ambulatory hub and a merged hospital, the WAN, and the system standard they must reach */
DECOR.nyulh_sites = (S) => {
  Z(S, 'sites', 20, 56, 280, 306, ['hub', 'clin', 'merged'], () => {
    room(30, 78, 260, 134, 'New ambulatory hub');
    opt('waiting-area', () => { K.sofa(38, 190, 88, 16); person(112, 176, -Math.PI / 2, 'visitor', { s: 0.8 }); });
    [[132, 92], [184, 92], [236, 92]].forEach((q) => NYU.exam(q[0], q[1], 48, 52));
    K.corridor(132, 152, 152, 52); K.window(60, 78, 50);
    walker(S, [[146, 186], [270, 186]], { speed: 14, kind: 'doc', loop: false });
    room(30, 222, 122, 130, 'Merged hospital');
    K.bed(62, 300, {}); K.ivPole(80, 296); K.bed(120, 300, {}); K.ecg(53, 266, 18, 8); K.ecg(111, 266, 18, 8);
    room(160, 222, 130, 130, 'Inherited closet');
    K.rackRow(170, 246, 5); K.rackRow(170, 270, 3, { led: COL.warn }); K.switchStack(170, 330, 1, 60);
    opt('unknown-devices', () => { [[250, 254], [270, 276], [246, 318], [272, 334]].forEach((q) => NYU.unknown(q[0], q[1])); });
  });
  Z(S, 'wan', 310, 56, 120, 306, [], () => {
    K.conduit([[340, 80], [340, 236]], { speed: 30 }); K.conduit([[400, 80], [400, 236]], { speed: -30 });
    K.manhole(340, 150); K.manhole(400, 196); K.tower(400, 102, 0.7);
    opt('melville', () => {
      D.box(320, 252, 100, 100, { fill: KP().grass, stroke: tint(T.wall, 0.7), lw: 1.3, r: 6, dash: [6, 4] });
      K.tree(338, 316, 8); K.tree(402, 330, 7); K.tree(392, 300, 6);
      tag('Melville site', 370, 270, { maxW: 92 }); note('Planned campus', 370, 286, { size: 9.5, weight: 600, color: T.sub, align: 'center', maxW: 92, halo: 3, drop: true });
    });
  });
  Z(S, 'sys', 440, 56, 280, 306, ['ehr', 'std', 'teams'], () => {
    room(448, 78, 264, 126, 'System data center');
    K.rackRow(462, 100, 15); K.rackRow(462, 122, 15); K.aisle(462, 145, 223, 8, 'cold'); K.rackRow(462, 158, 15); K.crac(680, 172, 0.6);
    room(448, 214, 124, 138, 'Standards', 'carpet');
    K.shelves(458, 236, 56, 16); K.desk(476, 330, 44, 12, { screens: 2, person: 'it', chair: false });
    opt('template-board', () => K.corkboard(530, 236, 34, 46, [[8, 10], [24, 30]]));
    room(580, 214, 132, 138, 'Readiness room', 'carpet');
    K.tv(600, 236, 92);
    opt('readiness-table', () => {
      K.table(646, 330, 76, 18);
      [[618, 'it'], [646, 'doc'], [674, 'nurse']].forEach((q) => person(q[0], 314, Math.PI / 2, q[1], { s: 0.85 }));
      person(696, 330, Math.PI, 'it', { s: 0.85 });
    });
  });
};

/* N2: an emergency department ambient note, the data center and model operations, and the cloud */
DECOR.nyulh_ai = (S) => {
  Z(S, 'ed', 20, 56, 250, 306, ['note', 'wifi'], () => {
    room(30, 78, 230, 122, 'ED exam bays');
    K.bed(58, 150, {}); K.ivPole(78, 150); K.ecg(49, 116, 18, 8); track(92, 96, 96);
    K.bed(232, 150, {}); K.ecg(223, 116, 18, 8); track(212, 96, 96);
    opt('physician', () => person(190, 116, Math.PI, 'doc', { s: 0.9 }));
    K.corridor(30, 208, 230, 58, 'ED corridor');
    opt('wifi-waves', () => waves(145, 237, 44));
    room(30, 274, 230, 78, 'ED workroom', 'carpet');
    K.desk(72, 334, 44, 12, { screens: 2, person: 'doc' }); K.desk(196, 334, 44, 12, { screens: 2, person: 'doc' }); K.desk(242, 334, 30, 12, { screens: 1, chair: false });
    walker(S, [[44, 254], [104, 254]], { speed: 12, kind: 'nurse', loop: false });
  });
  Z(S, 'dc', 280, 56, 220, 306, ['gpu', 'ehr', 'inv'], () => {
    room(288, 78, 100, 130, 'GPU cluster');
    K.rackRow(296, 100, 6, { led: COL.cisco }); K.aisle(296, 124, 88, 8, 'hot'); K.rackRow(296, 176, 6, { led: COL.cisco });
    room(394, 78, 98, 130, 'Integration');
    K.rackRow(402, 100, 5); K.rackRow(402, 176, 5); K.crac(462, 136, 0.6);
    room(288, 216, 204, 136, 'Model operations', 'carpet');
    K.tv(318, 238, 144);
    K.desk(316, 334, 44, 12, { screens: 3, person: 'it' }); K.desk(462, 334, 44, 12, { screens: 3, person: 'doc' });
    opt('review-shelf', () => K.shelves(296, 254, 40, 16));
  });
  Z(S, 'cloud', 510, 56, 210, 306, ['cloud'], () => {
    opt('clouds', () => { K.cloud(560, 104, 0.8); K.cloud(686, 112, 0.7); K.cloud(690, 262, 0.75); });
    opt('tower', () => K.tower(556, 262, 0.8));
    K.fiber([[496, 326], [588, 326]]); K.manhole(540, 326);
    room(588, 298, 124, 54, 'Internet edge'); K.rackRow(608, 322, 6);
  }, { fill: THEME === 'dark' ? '#0a1626' : '#f0f3f6' });
};

/* N3: a phone call from outside, the IT service desk, an inpatient unit, and identity, security and clinical systems */
DECOR.nyulh_helpdesk = (S) => {
  Z(S, 'ext', 20, 56, 162, 306, ['caller'], () => {
    K.road(28, 326, 146, 18); K.tree(46, 100, 9); K.tree(160, 250, 8); K.tree(40, 284, 7);
    opt('tower', () => K.tower(150, 104, 0.9));
    K.manhole(110, 335);
  });
  Z(S, 'desk', 192, 56, 238, 140, ['desk'], () => {
    room(200, 76, 222, 112, '', 'carpet');
    opt('queue-board', () => K.tv(256, 84, 110));
    NYU.agent(230, 112); NYU.agent(392, 112); NYU.agent(230, 156); NYU.agent(392, 156);
  });
  Z(S, 'unit', 192, 206, 238, 156, ['rn'], () => {
    K.ward(200, 226, 106, 126, 'Patient room', { bx: 236, by: 300 });
    room(314, 226, 108, 126, 'Nurse station');
    opt('nurse-station', () => K.nurseStation(324, 248, 90, 38));
  });
  Z(S, 'dc', 440, 56, 280, 306, ['idp', 'nac', 'soc', 'sys'], () => {
    room(448, 78, 264, 114, 'Identity and access');
    K.rackRow(462, 100, 6); K.rackRow(596, 100, 6); K.cableTray(462, 176, 236);
    opt('identity-icons', () => { D.icon('key', 506, 172, 11, tint(COL.cisco, 0.8)); D.icon('lock', 640, 172, 11, tint(COL.cisco, 0.8)); });
    room(448, 202, 160, 150, 'Security operations', 'carpet');
    K.tv(470, 222, 116);
    K.desk(480, 336, 44, 12, { screens: 3, person: 'it' }); K.desk(576, 336, 44, 12, { screens: 3, person: 'it' });
    room(616, 202, 96, 150, 'Data hall');
    K.rackRow(624, 226, 5); K.rackRow(624, 326, 5); K.crac(680, 262, 0.55);
  });
};

/* N4: the East River campus on a storm night: an inpatient unit and its closet, the raised energy plant, the river edge */
DECOR.nyulh_storm = (S) => {
  Z(S, 'campus', 20, 56, 380, 306, ['unit', 'closet', 'noc'], () => {
    K.ward(30, 78, 140, 140, 'Inpatient unit', { bed: false });
    [52, 88].forEach((bx) => { K.ecg(bx - 9, 130, 18, 8); K.bed(bx, 164, {}); }); K.ivPole(106, 176);
    room(178, 78, 104, 140, 'Network closet');
    K.rackRow(188, 100, 5); K.cableTray(188, 196, 84); K.ups(258, 166);
    room(290, 78, 100, 140, 'Risers');
    NYU.riser(318, 100, 96); NYU.riser(362, 100, 96);
    tag('A', 318, 206, { size: 9.5 }); tag('B', 362, 206, { size: 9.5 });
    room(30, 228, 200, 124, 'Network operations', 'carpet');
    K.tv(48, 248, 120);
    K.desk(58, 334, 40, 12, { screens: 2, person: 'it' }); K.desk(190, 334, 40, 12, { screens: 3, person: 'it' });
    room(238, 228, 152, 124, 'Emergency department');
    K.bed(268, 300, {}); K.bed(316, 300, {}); K.crashCart(364, 262);
    opt('ed-flood-wall', () => NYU.barrier([[240, 352], [388, 352]]));
    walker(S, [[44, 196], [104, 196]], { speed: 12, kind: 'nurse', loop: false });
  });
  Z(S, 'plant', 410, 56, 170, 306, ['power', 'fac'], () => {
    room(418, 78, 154, 162, 'Raised energy plant');
    opt('cogeneration', () => K.hvac(428, 98, 134, 24));
    K.generator(424, 132, 50, 44); K.generator(516, 132, 50, 44);
    tag('Above flood level', 495, 226, { maxW: 140 });
    room(418, 248, 154, 104, 'Facilities command post', 'carpet');
    K.tv(440, 268, 110);
    K.desk(446, 336, 40, 12, { screens: 2, person: 'it' }); K.desk(544, 336, 40, 12, { screens: 2, person: 'it' });
  });
  Z(S, 'river', 590, 56, 130, 306, ['storm'], () => {
    K.road(606, 70, 22, 284);
    const fdr = LBL('FDR Drive');
    if (fdr) { ctx.save(); ctx.translate(617, 300); ctx.rotate(-Math.PI / 2); D.text(fdr.toUpperCase(), 0, 0, { size: 9.5, weight: 800, color: T.sub, align: 'center', halo: 3 }); ctx.restore(); }
    NYU.water(632, 70, 82, 284);
    opt('flood-barrier', () => { NYU.barrier([[597, 82], [597, 354]]); tag('Flood barrier', 672, 342, { maxW: 80 }); });
  });
};
