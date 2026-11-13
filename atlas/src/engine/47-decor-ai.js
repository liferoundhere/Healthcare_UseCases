/* Floor plans for the AI stories (AI1 to AI7). Drawn with the helpers of 44-decor.js (room, Z, opt, note, tag, person,
   cloudDrop) and the kit in 12-kit.js. The few pieces the kit lacks (headset agent desk, ceiling camera, video wall,
   slide scanner, liquid-cooled GPU racks, coolant unit, filing cabinet) are small local helpers in the block below.
   Rooms are generic spaces as public descriptions of them read; no real hospital is drawn. */
{
const AIK = {
  /* A headset on a seated figure facing up: band over the head, ear cups and a boom mic. (x, y) = head centre. */
  headset(x, y) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y - 4, 7.6, 0.3, Math.PI - 0.3); ctx.strokeStyle = '#2b2f33'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
    D.box(x - 8.6, y - 2.6, 3.4, 5.2, { fill: '#2b2f33', r: 1.4 }); D.box(x + 5.2, y - 2.6, 3.4, 5.2, { fill: '#2b2f33', r: 1.4 });
    D.line([[x - 7, y - 2], [x - 5, y - 8]], { lw: 1.1, color: '#2b2f33' }); D.circle(x - 5, y - 8.6, 1.4, { fill: COL.cisco });
  },
  /* A contact center position: desk, screens and a seated agent with a headset. */
  agentDesk(x, y, kind = 'it', w = 30) { K.desk(x, y, w, 12, { screens: w >= 34 ? 2 : 1, person: kind }); AIK.headset(x, y + 12.5); },
  /* A ceiling dome camera with its field of view. */
  ceilCam(x, y, ang, r = 40) {
    ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, ang - 0.42, ang + 0.42); ctx.closePath(); ctx.fillStyle = tint(COL.cisco, 0.1); ctx.fill(); ctx.restore();
    D.circle(x, y, 4.8, { fill: T.panel, stroke: T.wall, lw: 1.1, shadow: 2 }); D.circle(x + Math.cos(ang) * 1.5, y + Math.sin(ang) * 1.5, 2.1, { fill: KP().screen });
    D.circle(x - Math.cos(ang) * 3.2, y - Math.sin(ang) * 3.2, 1.1, { fill: Math.sin(TT * 3 + x) > 0 ? COL.pain : tint(COL.pain, 0.3) });
  },
  /* A wall of room video tiles, each showing a bed. */
  videoWall(x, y, cols, rows, cw = 17, ch = 11) {
    const p = KP(); D.box(x - 2, y - 2, cols * (cw + 2) + 2, rows * (ch + 2) + 2, { fill: T.wall, r: 2 });
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const tx = x + c * (cw + 2), ty = y + r * (ch + 2), k = r * cols + c; D.box(tx, ty, cw, ch, { fill: p.screen, r: 1 });
      D.box(tx + cw * 0.3, ty + 2.5, cw * 0.4, ch - 5, { fill: tint(COL.cisco, 0.35 + 0.15 * Math.sin(TT * 1.5 + k)), r: 1 });
    }
  },
  /* A whole-slide scanner: optics window with a moving scan line, slide magazine and a status light. */
  slideScanner(x, y) {
    const p = KP(); D.box(x - 14, y - 11, 28, 22, { fill: p.metal, stroke: T.wall, lw: 1.2, r: 4, shadow: 2 });
    D.box(x - 10, y - 7, 12, 12, { fill: p.screen, r: 1.5 }); D.box(x - 10, y - 7 + mod(TT * 7 + x, 10.5), 12, 1.5, { fill: tint(COL.cisco, 0.9), r: 0.6 });
    D.box(x + 4, y - 8, 7, 15, { fill: T.panel, stroke: tint(T.wall, 0.6), lw: 0.6, r: 1 });
    for (let k = 0; k < 4; k++) D.line([[x + 5.5, y - 5 + k * 3.2], [x + 9.5, y - 5 + k * 3.2]], { lw: 0.9, color: tint('#C62828', 0.55) });
    D.circle(x + 10.5, y + 8.5, 1.3, { fill: COL.run });
  },
  /* A tray of glass slides waiting to be scanned. */
  slideTray(x, y, n = 8) { D.box(x, y, n * 5 + 4, 12, { fill: T.panel, stroke: T.wall, lw: 1, r: 2 }); for (let k = 0; k < n; k++) D.box(x + 2.5 + k * 5, y + 2, 3, 8, { fill: tint('#cdeaf8', 0.95), stroke: tint(T.wall, 0.5), lw: 0.4, r: 0.5 }); },
  microscope(x, y) { const p = KP(); D.box(x - 7, y - 3, 14, 11, { fill: p.metal, stroke: T.wall, lw: 1, r: 2 }); D.circle(x, y - 6, 3.6, { fill: T.panel, stroke: T.wall, lw: 1 }); D.line([[x - 2, y - 8], [x - 5, y - 14]], { lw: 1.8, color: T.wall }); D.line([[x + 2, y - 8], [x + 5, y - 14]], { lw: 1.8, color: T.wall }); },
  /* A row of liquid-cooled GPU racks with supply (blue) and return (orange) coolant lines on the side given by dy. */
  lcRacks(x, y, n, dy = 24) {
    K.rackRow(x, y, n, { led: COL.cisco }); const w = n * 15 - 2;
    D.line([[x, y + dy], [x + w, y + dy]], { lw: 2, color: tint('#049FD9', 0.8), dash: [5, 4], offset: -TT * 14 });
    D.line([[x, y + dy + 4], [x + w, y + dy + 4]], { lw: 2, color: tint('#F26B21', 0.75), dash: [5, 4], offset: TT * 14 });
  },
  /* Coolant distribution unit: pump, heat exchanger, the two loops. */
  cdu(x, y) {
    const p = KP(); D.box(x, y, 22, 30, { fill: p.metal, stroke: T.wall, lw: 1.2, r: 3, shadow: 2 });
    D.circle(x + 11, y + 11, 6.4, { fill: p.screen, stroke: tint('#049FD9', 0.7), lw: 1 });
    ctx.save(); ctx.translate(x + 11, y + 11); ctx.rotate(TT * 4); ctx.beginPath(); for (let b = 0; b < 3; b++) { ctx.moveTo(0, 0); ctx.arc(0, 0, 5, b * 2.09, b * 2.09 + 0.8); } ctx.fillStyle = tint('#049FD9', 0.7); ctx.fill(); ctx.restore();
    D.box(x + 3, y + 21, 7, 5, { fill: tint('#049FD9', 0.6), r: 1 }); D.box(x + 12, y + 21, 7, 5, { fill: tint('#F26B21', 0.6), r: 1 });
  },
  /* Electrical switchgear: a cabinet line with breaker windows. */
  switchgear(x, y, n = 3) { const p = KP(); for (let k = 0; k < n; k++) { const xx = x + k * 18; D.box(xx, y, 16, 26, { fill: p.metal, stroke: T.wall, lw: 1, r: 2 }); D.box(xx + 3, y + 4, 10, 6, { fill: p.screen, r: 1 }); D.box(xx + 4, y + 5, 8, 4, { fill: tint('#F2A900', 0.55 + 0.2 * Math.sin(TT * 2 + k)), r: 0.6 }); D.line([[xx + 5, y + 16], [xx + 11, y + 16]], { lw: 1.1, color: tint(T.wall, 0.8) }); } D.box(x, y - 4, n * 18 - 2, 3, { fill: '#F2A900', r: 1 }); },
  fileCab(x, y) { const p = KP(); D.box(x, y, 14, 22, { fill: p.metal, stroke: T.wall, lw: 1, r: 2 }); for (let k = 1; k < 3; k++) D.line([[x + 2, y + k * 7.3], [x + 12, y + k * 7.3]], { lw: 0.8, color: tint(T.wall, 0.8) }); for (let k = 0; k < 3; k++) D.line([[x + 5, y + 3.6 + k * 7.3], [x + 9, y + 3.6 + k * 7.3]], { lw: 1.2, color: T.wall }); },
  /* A wall chart of spend by month, the bars rising. */
  wallChart(x, y, w, h) {
    D.box(x, y, w, h, { fill: T.panel, stroke: T.wall, lw: 1.1, r: 2 }); const n = 6, bw = (w - 8) / n;
    for (let k = 0; k < n; k++) { const bh = (h - 6) * (0.25 + k * 0.13); D.box(x + 4 + k * bw + 1, y + h - 3 - bh, bw - 2, bh, { fill: tint(k === n - 1 ? COL.warn : COL.cisco, 0.55), r: 0.6 }); }
  },
  docStack(x, y) { for (let k = 2; k >= 0; k--) { D.box(x + k * 3, y - k * 3, 16, 20, { fill: '#ffffff', stroke: tint(T.wall, 0.7), lw: 0.7, r: 1 }); } for (let k = 0; k < 3; k++) D.line([[x + 3, y + 5 + k * 4], [x + 13, y + 5 + k * 4]], { lw: 0.7, color: tint(T.wall, 0.6) }); },
  fax(x, y) { const p = KP(); D.box(x, y, 26, 18, { fill: p.metal, stroke: T.wall, lw: 1.1, r: 3, shadow: 2 }); D.box(x + 4, y - 6 + mod(TT * 3, 6), 18, 8, { fill: '#ffffff', stroke: tint(T.wall, 0.6), lw: 0.6, r: 0.5 }); D.box(x + 3, y + 4, 20, 3, { fill: p.screen, r: 1 }); D.box(x + 16, y + 10, 6, 4, { fill: tint(COL.run, 0.7), r: 1 }); },
  /* A reception counter with the receptionist behind it. */
  counter(x, y, w) { D.box(x, y, w, 12, { fill: T.panel, stroke: T.wall, lw: 1.6, r: 4, shadow: 2 }); D.box(x + 6, y + 2, 10, 6, { fill: KP().screen, r: 1 }); D.person(x + w / 2, y - 8, Math.PI / 2, null, { kind: 'nurse', seat: true, s: 0.82 }); },
  /* A seated person (finance staff, a patient at home) in a custom colour. */
  seated(x, y, ang, color, kind) { D.person(x, y, ang, color, { kind, seat: true, s: 0.82 }); },
};

/* AI1: virtual nursing. Smart rooms with ceiling cameras, the PoE closet, the nurse station, the edge inference room,
   the virtual nursing hub and the vision vendor's cloud. */
DECOR.vnurse = (S) => {
  Z(S, 'floor', 20, 56, 320, 306, ['cam', 'bedn', 'closet'], () => {
    [30, 185].forEach((x) => {
      K.ward(x, 78, 145, 108, 'Smart room', { bx: x + 34, by: 142 });
      AIK.ceilCam(x + 128, 96, Math.PI - 0.6, 46);
    });
    K.corridor(30, 194, 300, 52); walker(S, [[50, 220], [310, 220]], { speed: 16, kind: 'nurse', loop: false });
    room(30, 256, 130, 96, 'PoE closet'); K.rackRow(40, 280, 3); K.switchStack(40, 306, 3, 72); K.ups(130, 280); K.cableTray(40, 342, 110);
    room(170, 256, 160, 96, 'Nurse station', 'carpet'); opt('nurse-station', () => K.nurseStation(178, 278, 70, 44));
  });
  Z(S, 'dc', 350, 56, 180, 124, ['edge'], () => {
    D.box(358, 142, 164, 32, { fill: KP().raised, r: 4 }); K.rackRow(368, 148, 3); AIK.lcRacks(414, 148, 2, -6); K.rackRow(446, 148, 4); K.ups(504, 146);
  });
  Z(S, 'hub', 350, 190, 180, 172, ['vn'], () => {
    AIK.videoWall(366, 216, 8, 1, 17, 14);
    [376, 504].forEach((x) => AIK.agentDesk(x, 334, 'nurse', 34));
  });
  Z(S, 'ext', 540, 56, 180, 306, ['relay'], () => {
    K.fiber([[530, 150], [600, 150]]); K.manhole(560, 150);
    opt('cloud', () => K.cloud(640, 146, 1.6)); K.tree(570, 270, 9); K.tree(700, 250, 8); K.road(548, 334, 164, 16);
  }, { fill: THEME === 'dark' ? '#0a1626' : '#f0f3f6' });
};

/* AI2: patient access. The patient's phone and carrier, the contact center and voice agent clouds, and in the hospital
   the patient access center (agents with headsets), an outpatient clinic and the EHR scheduling interface. */
DECOR.access = (S) => {
  Z(S, 'house', 20, 56, 170, 306, ['caller'], () => {
    room(28, 78, 154, 150, "Patient's home", 'wood'); K.sofa(40, 196, 70, 22); K.tree(160, 196, 8);
    opt('caller-figure', () => { AIK.seated(66, 192, -Math.PI / 2, null, 'visitor'); D.box(73, 182, 4, 7, { fill: KP().screen, r: 1 }); });
    opt('carrier', () => { K.tower(105, 288, 1.1); tag('Phone carrier', 105, 318); }); K.road(28, 338, 154, 14);
  });
  Z(S, 'net', 200, 56, 170, 306, ['ccx', 'agent'], () => {
    room(208, 78, 154, 134, 'Contact center'); K.rackRow(222, 184, 9);
    room(208, 222, 154, 130, 'Agent models'); AIK.lcRacks(222, 322, 9, 22);
  }, { fill: THEME === 'dark' ? '#0a1626' : '#f0f3f6' });
  Z(S, 'hosp', 380, 56, 340, 306, ['staff', 'desk', 'sched'], () => {
    room(388, 78, 324, 134, 'Patient access center', 'carpet'); K.tv(600, 86, 96);
    [420, 470, 650, 700].forEach((x) => AIK.agentDesk(x, 172, x < 600 ? 'nurse' : 'it', 32));
    room(388, 222, 160, 130, 'Outpatient clinic'); AIK.counter(398, 334, 52); [494, 510, 526].forEach((x) => K.chair(x, 340, Math.PI)); AIK.seated(526, 340, -Math.PI / 2, null, 'visitor');
    room(558, 222, 154, 130, 'EHR data center'); K.rackRow(572, 326, 9); K.crac(682, 246, 0.6);
  });
};

/* AI3: the hospital's own GPU cluster. Clinicians on one side; on the other a data center built for lighter racks,
   now holding model serving, liquid-cooled GPU racks, the fabric and storage, and the power and cooling plant. */
DECOR.aifactory = (S) => {
  Z(S, 'floor', 20, 56, 170, 306, ['app'], () => {
    room(28, 78, 154, 274, 'Physician workroom', 'carpet');
    [[66, 236, 'doc'], [140, 236, 'nurse'], [66, 316, 'doc'], [140, 316, 'doc']].forEach((q) => K.desk(q[0], q[1], 44, 14, { screens: 2, person: q[2] }));
  });
  Z(S, 'dc', 200, 56, 520, 306, ['serve', 'gpu', 'fab', 'store', 'cool'], () => {
    room(208, 78, 140, 160, 'Model serving'); K.rackRow(220, 196, 8, { led: COL.cisco }); K.cableTray(220, 222, 116);
    room(358, 78, 240, 160, 'GPU cluster'); AIK.lcRacks(372, 100, 14, 24); AIK.lcRacks(372, 216, 14, -8);
    room(608, 78, 104, 274, '');
    AIK.switchgear(618, 104, 4); K.ups(620, 146); K.ups(642, 146); K.ups(664, 146); AIK.cdu(622, 290); AIK.cdu(650, 290); K.hvac(618, 326, 84, 20);
    D.line([[608, 296], [598, 296], [598, 132]], { lw: 2, color: tint('#049FD9', 0.8), dash: [5, 4], offset: -TT * 14 });
    room(208, 248, 390, 104, 'Fabric and storage'); K.switchStack(222, 316, 3, 120); K.rackRow(410, 318, 12);
  });
};

/* AI4: the sepsis score. A nursing unit and the emergency department, the device network closet, and the data
   center rooms where the interface engine, the lab system and the model host run. */
DECOR.bedside = (S) => {
  Z(S, 'floor', 20, 56, 290, 306, ['mon', 'rn', 'edd'], () => {
    K.ward(30, 78, 120, 112, 'Patient room', { bx: 56, by: 146 });
    room(158, 78, 142, 112, 'Nurse station', 'carpet'); opt('nurse-station', () => K.nurseStation(164, 130, 66, 44));
    room(30, 200, 270, 152, 'Emergency department');
    [56, 104, 152].forEach((x, k) => { K.bed(x, 322, {}); track(x + 24, 298, 50); if (k === 0) K.ecg(x - 9, 290, 18, 8); });
    K.crashCart(282, 330); walker(S, [[44, 268], [200, 268]], { speed: 12, kind: 'nurse', loop: false });
  });
  Z(S, 'path', 320, 56, 130, 306, ['gw'], () => {
    room(328, 78, 114, 274, 'IDF closet'); K.rackRow(338, 104, 4, { vertical: true }); K.switchStack(338, 300, 3, 94); K.cableTray(344, 168, 104, true);
  });
  Z(S, 'dc', 460, 56, 260, 306, ['ie', 'lab', 'model'], () => {
    room(468, 78, 244, 120, 'Model host'); K.rackRow(480, 172, 15, { led: COL.cisco });
    room(468, 208, 130, 144, 'Integration'); K.rackRow(478, 324, 7);
    room(606, 208, 106, 144, 'Lab system'); K.rackRow(618, 324, 6);
  });
};

/* AI5: agents in the EHR. Departments that build agents, the identity team's directory, the EHR data center with
   the vendor's built-in agents, and outside the revenue-cycle vendor and the payer documents that reach it. */
DECOR.agents = (S) => {
  Z(S, 'hosp', 20, 56, 430, 306, ['diy', 'svc', 'ehr', 'ehra'], () => {
    room(28, 78, 170, 130, 'Department offices', 'carpet'); K.desk(62, 186, 44, 14, { screens: 2, person: 'nurse' }); K.desk(164, 186, 44, 14, { screens: 2, person: 'doc' });
    room(28, 218, 170, 134, 'Identity and access'); K.rackRow(40, 324, 4); K.switchStack(110, 324, 2, 76);
    room(208, 78, 234, 274, 'EHR data center'); K.rackRow(218, 100, 17, { vertical: true }); K.rackRow(412, 100, 17, { vertical: true });
  });
  Z(S, 'vend', 460, 56, 260, 306, ['rcm', 'inj'], () => {
    K.fiber([[442, 210], [476, 210]]);
    room(468, 78, 244, 130, 'Payer portals and fax', 'carpet'); AIK.fax(486, 176); AIK.docStack(668, 176); opt('cloud', () => K.cloud(678, 116, 0.7));
    room(468, 218, 244, 134, 'Revenue-cycle vendor'); K.rackRow(484, 330, 14, { led: COL.cisco });
  }, { fill: THEME === 'dark' ? '#0a1626' : '#f0f3f6' });
};

/* AI6: digital pathology. The lab with its slide scanners and the pathologist's office, the circuit between sites,
   image storage and the pathology AI servers on the main campus, and the cloud archive. */
DECOR.pathlab = (S) => {
  Z(S, 'clin', 20, 56, 220, 306, ['scan', 'path'], () => {
    room(28, 78, 204, 150, 'Slide scanning lab'); K.bench(40, 100, 64, 18); AIK.slideTray(150, 100, 9);
    [56, 104, 152, 200].forEach((x) => AIK.slideScanner(x, 204));
    room(28, 238, 204, 114, 'Pathologist office', 'carpet'); K.desk(204, 326, 44, 14, { screens: 3, person: 'doc' }); AIK.microscope(212, 284);
  });
  S.area(250, 56, 130, 306, 'Between sites', { id: 'circuit', r: 10, watch: ['wan'], late: true });
  K.networkPath(252, 72, 126, 286); S.shade(250, 56, 130, 306, ['wan'], 10);
  Z(S, 'parent', 390, 56, 190, 306, ['ims', 'ai'], () => {
    room(398, 78, 174, 134, 'Image storage'); K.rackRow(410, 184, 10);
    room(398, 222, 174, 130, 'Pathology AI servers'); AIK.lcRacks(410, 322, 10, 22);
  });
  Z(S, 'ext', 590, 56, 130, 306, ['arch'], () => {
    K.fiber([[572, 176], [620, 176]]); opt('cloud', () => K.cloud(655, 170, 1.3)); K.tree(630, 290, 9); K.tree(696, 312, 8);
  }, { fill: THEME === 'dark' ? '#0a1626' : '#f0f3f6' });
};

/* AI7: what the AI costs. The clinical rooms where AI is used, the finance office that pays the invoices, IT
   operations that sees the usage, the GPU cluster room, and the vendors that bill per seat, token or study. */
DECOR.aispend = (S) => {
  Z(S, 'hosp', 20, 56, 510, 306, ['scribe', 'img', 'fin', 'it', 'gpu'], () => {
    K.ward(28, 78, 150, 120, 'Exam room', { bx: 52, by: 146 }); person(84, 176, -1.2, 'doc', { s: 0.9 });
    room(28, 208, 150, 144, 'Reading room', 'carpet'); K.desk(62, 330, 44, 14, { screens: 3, person: 'doc' }); K.desk(140, 330, 44, 14, { screens: 3, person: 'doc' });
    room(188, 78, 160, 120, 'Finance office', 'wood'); AIK.wallChart(296, 86, 42, 24);
    [[220, 176], [300, 176]].forEach((q) => { K.desk(q[0], q[1], 44, 14, { screens: 2 }); AIK.seated(q[0], q[1] + 14, -Math.PI / 2, '#6b7c93', 'finance'); });
    room(188, 208, 160, 144, 'IT operations', 'carpet'); K.tv(290, 216, 50); K.desk(226, 330, 44, 14, { screens: 3, person: 'it' }); K.desk(308, 330, 44, 14, { screens: 3, person: 'it' });
    room(358, 78, 164, 274, 'GPU cluster room'); AIK.lcRacks(372, 104, 9, 24); AIK.lcRacks(372, 318, 9, -8); AIK.cdu(492, 150);
  });
  Z(S, 'vend', 540, 56, 180, 306, ['rcm'], () => {
    K.fiber([[522, 220], [560, 220]]);
    opt('clouds', () => { K.cloud(604, 128, 1.6); K.cloud(680, 230, 0.75); K.cloud(680, 300, 0.75); tag('Scribe vendor', 680, 262); tag('Imaging vendor', 680, 332); });
  }, { fill: THEME === 'dark' ? '#0a1626' : '#f0f3f6' });
};
}
