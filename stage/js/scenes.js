// Scenes for the healthcare infrastructure stage.
//   title + close: hero scenes (Cisco bridge bars).
//   13 hospital worlds: one real layout per scenario, built with hospitalWorld() from hospital.js.
// Every world reads its story (node ids, link ids, step states, callouts) from narrative.js, which is
// generated from the 2D app's scenes.ts, so the 3D and 2D versions never disagree. Here we only decide
// WHERE each node stands in the building, and where the camera goes on each step.
import * as THREE from 'three';
import { C, damp, smooth, glowSprite, gridFloor, points, rr, wireBox, emissiveMat } from './core.js';
import { bridgeBars, makePyramid } from './kit.js';
import { hospitalWorld } from './hospital.js';

// Kept so main.js can stay generic; this deck has no workshop.
export const workshopState = { filled: new Array(8).fill(0), timer: 0 };

// ---- camera helpers (world units; the engine adds the scene origin)
const camW = (x, z, h = 38, b = 44) => ({ p: [x, h, z + b], t: [x, 2, z] });
const camN = (x, z, h = 17, b = 21) => ({ p: [x, h, z + b], t: [x, 0.5, z] });
const camC = (x, z, h = 36, b = 38) => ({ p: [x, h, z + b], t: [x, 6, z] });

// The floating Cisco Cloud Control plane (only revealed on "cisco" steps via show:['cc']).
const CC_Y = 11.9;
const ccPlane = (kit, x, z, w, d) => kit.area('cc', x, z, w, d, 'Cisco Cloud Control (modeled)', { cisco: true, y: 12 });
const watch = (kit, id, ids) => { const a = kit.areas.get(id); if (a) a.watch = ids; return a; };
const glassMat = () => new THREE.MeshStandardMaterial({ color: 0x1a4676, transparent: true, opacity: 0.22, roughness: 0.3, depthWrite: false });

// ---------------------------------------------------------------------------
// Hero: Cisco bridge bars rising out of a reflective grid, with a campus skyline behind.
export const title = {
  id: 'title',
  bg: { a: '#01040b', b: '#062a4d', c: '#00bceb', mix: [1, 0.6, 0, 0.5] },
  cams: [{ p: [0, 6, 30], t: [0, 5, 0] }],
  build() {
    const group = new THREE.Group();
    const bars = bridgeBars({ spacing: 2.0, unit: 2.4, radius: 0.42 });
    group.add(bars);
    const refl = bridgeBars({ spacing: 2.0, unit: 2.4, radius: 0.42, color: C.blue });
    refl.scale.y = -1;
    refl.traverse((n) => { if (n.material) { n.material = n.material.clone(); n.material.transparent = true; n.material.opacity = 0.18; n.material.emissiveIntensity = 0.5; } });
    group.add(refl);
    group.add(gridFloor(220, 110, C.sky, 0.16));

    // A wireframe health system on the horizon: tower, wings, clinics, a data center.
    const sky = new THREE.Group(); sky.position.set(0, 0, -46); group.add(sky);
    const blocks = [[-30, 6, 8], [-22, 10, 7], [-14, 18, 9], [-5, 26, 10], [5, 14, 9], [14, 9, 8], [22, 12, 7], [30, 6, 8], [-38, 4, 6], [38, 5, 6]];
    blocks.forEach(([x, h, w], i) => {
      const b = wireBox(w, h, 6, i === 3 ? C.ice : C.sky, 0.05, i === 3 ? 0.95 : 0.55);
      b.position.set(x, h / 2, 0); sky.add(b);
    });
    const cross = new THREE.Group();
    cross.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 5, 0.3), emissiveMat(C.green, 1.4)), new THREE.Mesh(new THREE.BoxGeometry(5, 1.6, 0.3), emissiveMat(C.green, 1.4)));
    cross.position.set(-5, 32, 3.2); sky.add(cross);
    const crossGlow = glowSprite(C.green, 22, 0.3); crossGlow.position.copy(cross.position); sky.add(crossGlow);

    const rings = [];
    for (let i = 0; i < 3; i++) {
      const r = new THREE.Mesh(new THREE.TorusGeometry(13 + i * 4.5, 0.03, 8, 200), new THREE.MeshBasicMaterial({ color: i === 1 ? C.teal : C.sky, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }));
      r.rotation.x = Math.PI / 2 + 0.18 * (i - 1); r.position.y = 5; group.add(r); rings.push(r);
    }
    const dust = points(1600, () => { const a = rr(0, Math.PI * 2), rad = rr(8, 70); return [Math.cos(a) * rad, rr(0, 30), Math.sin(a) * rad]; }, { size: 0.35, color: C.sky, opacity: 0.55 });
    group.add(dust);
    const core = glowSprite(C.sky, 36, 0.35); core.position.set(0, 5, -4); group.add(core);

    let k = 0;
    return {
      group,
      update(dt, t) {
        k = damp(k, 1, 1.6, dt);
        bars.userData.setHeights(smooth(k), t);
        refl.userData.setHeights(smooth(k), t);
        rings.forEach((r, i) => { r.rotation.z = t * (0.05 + i * 0.03) * (i % 2 ? -1 : 1); });
        dust.rotation.y = t * 0.02;
        cross.rotation.y = Math.sin(t * 0.4) * 0.3;
        crossGlow.material.opacity = 0.22 + 0.1 * Math.sin(t * 1.6);
      },
      reset() { k = 0; },
    };
  },
};

// ---------------------------------------------------------------------------
// 1. SECURITY: 4 West, the data center, five consoles that each hold one truth.
export const security = hospitalWorld({
  id: 'security', mood: 'alert',
  cam: {
    wide: camW(3.5, 2), pump: camN(-1, 9, 15, 15), consoles: camW(10, 4, 34, 40), cc: camC(3, 4),
  },
  seq: ['wide', 'pump', 'consoles', 'wide', 'cc', 'cc', 'cc'],
  layout(kit) {
    const w = kit.ward(-4, 6, { rooms: 4, name: 'Clinical floor, 4 West' });
    watch(kit, 'hall', ['mon', 'pump', 'phones']);
    watch(kit, 's3', ['pump']); watch(kit, 'n2', ['mon']);
    kit.dataHall(-6, -9, { rows: 2, cols: 5, name: 'Data center', id: 'dc', watch: ['lib', 'ehr'] });
    kit.area('ext', 13, -9, 12, 10, 'Outside the hospital', { color: 0x0a1626 });
    kit.area('consoles', 18, 6, 12, 14, 'Five consoles, five truths', { hidden: true });
    kit.desk(14.5, 5.2, 2.2, 0, 1); kit.desk(18.5, 5.2, 2.2, 0, 1); kit.desk(14.5, 9.5, 2.2, 0, 1); kit.desk(18.5, 9.5, 2.2, 0, 1);
    ccPlane(kit, 3, 4, 40, 22);
    kit.walker([[-14, 4.4], [5, 4.4], [5, 7.6], [-14, 7.6]], { speed: 1.9 });
    kit.walker([[5, 7.6], [-14, 7.6], [-14, 4.4], [5, 4.4]], { speed: 1.5, off: 0.4, color: 0x6cc04a });
    const [px, pz] = w.roomPos('s3', 0.9, 0.2);
    const [mx, mz] = w.roomPos('n2', 0.95, -0.2);
    return {
      pump: [px, pz, 0, { lab: [0, 0.4] }],
      mon: [mx, mz],
      phones: [-1.5, 6, 0.9, { s: 0.9 }],
      lib: [-8.5, -10.2],
      ehr: [-3.2, -10.2],
      dest: [13, -9],
      soc: [14, 2.8], nac: [19, 2.8], biomed: [14, 7.4], fw: [19, 7.4], edr: [16.5, 11.2],
      canvas: [-9, 4, CC_Y], approve: [0, 4, CC_Y], ise: [9, 4, CC_Y], audit: [17, 4, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 2. FACILITIES: the tower, the central plant, the clinic and the home, one estate.
export const facilities = hospitalWorld({
  id: 'facilities', mood: 'alert',
  cam: {
    wide: camW(3, -4, 40, 40), tower: camN(-10, 1, 20, 22), plant: camN(12, 0, 15, 18), remote: camW(7, -14, 28, 26), cc: camC(3, -4, 38, 34),
  },
  seq: ['wide', 'tower', 'plant', 'remote', 'cc', 'cc', 'cc'],
  layout(kit) {
    kit.area('tower', -10, 2, 14, 12, 'Main hospital tower', { watch: ['room', 'idf', 'noc'] });
    const gm = glassMat();
    [2.8, 5.7].forEach((y) => { kit.plate(-10, 2, 14, 12, { y: y + 0.1, h: 0.15, mat: gm, edge: 0x57b7f0, edgeOp: 0.8 }); kit.walls(-10, 2, 14, 12, { h: 2.6, y }); });
    kit.walls(-10, 2, 14, 12, { h: 2.6 });
    kit.sign('FLOOR 3', -16.2, 6.2, 8.4); kit.sign('FLOOR 2', -16.2, 3.4, 8.4); kit.sign('GROUND', -16.2, 0.7, 8.4);
    kit.bed(-14.5, 0.5, 0, true).position.y = 3.05;
    kit.area('wing', 3, 3, 10, 8, 'Imaging wing', { watch: ['img'] }); kit.walls(3, 3, 10, 8, { h: 2 });
    kit.area('plant', 14.5, 1, 11, 10, 'Central plant', { watch: ['bms', 'gen'] }); kit.walls(14.5, 1, 11, 10, { h: 2.2 });
    kit.area('remote', 3, -15, 40, 12, 'Off campus', { watch: ['clinic', 'home'], h: 0.08 });
    kit.road(3, -7.5, 44, 3);
    kit.walls(-2, -15, 8, 7, { h: 1.8 }); kit.walls(15, -15, 7, 6, { h: 1.4 });
    kit.tree(8, -12.5, 1.1); kit.tree(10, -17, 0.9); kit.tree(22, -13, 1); kit.tree(-12, -13, 1);
    ccPlane(kit, 3, -4, 42, 30);
    kit.walker([[-6, 7], [-1, 7], [-1, 10], [-6, 10]], { speed: 1.3 });
    return {
      room: [-13.5, -0.5, 2.8, { lab: [0, 0.3] }], idf: [-6.5, -0.5, 2.8],
      noc: [-9.5, 5.5, 0],
      img: [3, 3.2],
      bms: [11.8, 1.2], gen: [17, 1.2],
      clinic: [-2, -15], home: [15, -15],
      topo: [-9, -4, CC_Y], inv: [1, -4, CC_Y], lake: [10, -4, CC_Y], spaces: [18, -4, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 3. AI: the data path from the exam room to a GPU rack, and the vendor cloud outside.
export const ai = hospitalWorld({
  id: 'ai', mood: 'alert',
  cam: {
    wide: camW(8, 0, 40, 42), vend: camN(25, 0, 22, 24), gpu: camN(1, -7, 18, 18), cc: camC(8, 0, 36, 36),
  },
  seq: ['wide', 'wide', 'vend', 'gpu', 'cc', 'cc', 'cc'],
  layout(kit) {
    kit.area('hosp', -2, 0, 34, 28, 'Hospital', { h: 0.08, watch: ['mic', 'ct', 'gpu', 'pacs', 'md'] });
    kit.area('exam', -13, 5, 7, 8, 'Exam room', { h: 0.2, color: 0x0e2748 }); kit.walls(-13, 5, 7, 8, { h: 1.6, gaps: [{ s: 'e', at: 1.5, w: 1.4 }] });
    kit.bed(-14.6, 6, 0, true); kit.chair(-10.8, 6.5, Math.PI / 2);
    kit.area('ctsuite', -13, -9, 7, 8, 'CT suite', { h: 0.2, color: 0x0e2748 }); kit.walls(-13, -9, 7, 8, { h: 1.6 });
    kit.dataHall(0, -9, { rows: 1, cols: 4, name: 'GPU data hall', id: 'gpuhall' });
    kit.area('read', 9.5, -9, 7, 8, 'Reading room', { h: 0.2, color: 0x0e2748 }); kit.walls(9.5, -9, 7, 8, { h: 1.6 });
    kit.desk(11, -6.4, 2.4, 0, 2);
    kit.area('office', -1, 6, 9, 8, 'Physician office', { h: 0.2, color: 0x0e2748 }); kit.walls(-1, 6, 9, 8, { h: 1.6 });
    kit.desk(1, 7.8, 2.6, Math.PI, 2); kit.chair(1, 6.8, 0);
    kit.area('vend', 25, 0, 18, 24, 'Vendors and the internet', { color: 0x0a1626 });
    ccPlane(kit, 8, -1, 46, 24);
    kit.walker([[-8, 1], [-4, 1], [-4, 3], [-8, 3]], { speed: 1.3 });
    return {
      mic: [-11.6, 3.4, 0, { lab: [0, 0.2] }], ct: [-13, -9], gpu: [0, -6.8], pacs: [9, -10.6], md: [-2, 5],
      vendor: [21, -5], up: [29, -5], chat: [25, 7],
      te: [-8, -1, CC_Y], def: [2, -1, CC_Y], gate: [13, -1, CC_Y], tok: [23, -1, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 4. EHR: nursing unit, wireless, core, VDI and EHR hosting, and the bridge call.
export const ehr = hospitalWorld({
  id: 'ehr', mood: 'alert',
  cam: {
    wide: camW(3, -1, 38, 42), wow: camN(-9, 4, 15, 17), bridge: camN(-9, -7, 17, 19), cc: camC(4, 0, 36, 38), dc: camN(14, 1, 18, 20),
  },
  seq: ['wide', 'wow', 'bridge', 'cc', 'cc', 'dc'],
  layout(kit) {
    kit.ward(-12, 4, { rooms: 3, name: 'Nursing unit' });
    watch(kit, 'hall', ['wow', 'wifi']);
    kit.area('path', 3, 4, 7, 7, 'Network path', { color: 0x0a1b33, watch: ['wan'] });
    kit.walls(3, 4, 7, 7, { h: 1.6 });
    kit.rackRow(3, 2.5, 3, 0, 1.2);
    kit.dataHall(15, 3, { rows: 2, cols: 6, name: 'Data center', id: 'dc', watch: ['vdi', 'ehr', 'store'] });
    kit.area('bridge_a', -9, -8, 10, 6, 'War room', { h: 0.2, color: 0x0e2748, hidden: false }); kit.walls(-9, -8, 10, 6, { h: 1.6 });
    kit.plate(-9, -8, 4, 1.6, { y: 0.25, h: 0.5, color: 0x15304f, edge: C.sky, edgeOp: 0.6 });
    ccPlane(kit, 4, 0, 36, 22);
    kit.walker([[-18, 3.2], [-8, 3.2], [-8, 6.8], [-18, 6.8]], { speed: 1.6 });
    return {
      wow: [-8.6, 6.9, 0, { lab: [0, 0.3] }],
      wifi: [-14.5, 4.6, 0, { cover: 5 }],
      wan: [3, 4.5, 0, { k: 'router' }],
      vdi: [10.5, 1, 0], ehr: [15, 1], store: [19.5, 1],
      bridge: [-9, -8, 0.7],
      canvas: [-8, 0, CC_Y], te: [2, 0, CC_Y], dcv: [12, 0, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 5. IoMT: pumps on the ward, guest Wi-Fi in the lounge, a scanner in the security office.
export const iomt = hospitalWorld({
  id: 'iomt', mood: 'alert',
  cam: {
    wide: camW(2, -1, 38, 42), guest: camN(6, -8, 16, 18), scan: camN(14, 2, 17, 19), cc: camC(2, -1, 36, 38),
  },
  seq: ['wide', 'guest', 'scan', 'cc', 'cc', 'cc'],
  layout(kit) {
    const w = kit.ward(-10, 4, { rooms: 3, name: 'Clinical network, flat' });
    watch(kit, 'hall', ['pumps']);
    watch(kit, 'n2', ['pumps']);
    kit.area('imaging_a', -10, -9, 9, 6, 'Imaging suite', { h: 0.2, color: 0x0e2748, watch: ['img'] }); kit.walls(-10, -9, 9, 6, { h: 1.6 });
    kit.area('lounge', 6, -9, 9, 6, 'Guest lounge', { h: 0.2, color: 0x0e2748, watch: ['guest'] }); kit.walls(6, -9, 9, 6, { h: 1.6 });
    kit.chair(3.8, -8, 1.2); kit.chair(8.2, -10, -1.5); kit.chair(5, -10.2, 0);
    kit.area('secoffice', 14, 4, 8, 7, 'Security office', { h: 0.2, color: 0x0e2748, watch: ['scan', 'sec'] }); kit.walls(14, 4, 8, 7, { h: 1.6 });
    kit.desk(16, 6.2, 2.2, Math.PI, 1);
    kit.area('shop', 14, -9, 8, 6, 'Biomed shop', { h: 0.2, color: 0x0e2748, watch: ['cmms'] }); kit.walls(14, -9, 8, 6, { h: 1.6 });
    kit.desk(15, -7.5, 2.4, Math.PI, 1);
    kit.area('seg', -10, 4, 21, 15, 'Medical device segment', { cisco: true, y: 2.6, tone: 0x6cc04a, hidden: true });
    ccPlane(kit, 2, -1, 36, 24);
    kit.walker([[-18, 4.4], [-3, 4.4], [-3, 7.6], [-18, 7.6]], { speed: 1.7 });
    const [p1, p2] = w.roomPos('n2', 0.8, 0.5);
    return {
      pumps: [p1, p2, 0, { lab: [0, 0.3] }],
      img: [-10, -9],
      guest: [6, -9, 0, { cover: 4.5 }],
      scan: [12.5, 2.5], net: [2, 4, 0, { k: 'router' }], cmms: [14, -9.5], sec: [16.5, 3, 0],
      id: [-11, -1, CC_Y], lake: [-1, -1, CC_Y], app: [9, -1, CC_Y],
      seg: [-10, 4, 2.5, { s: 0.9 }],
    };
  },
});

// ---------------------------------------------------------------------------
// 6. RANSOMWARE: ED, pharmacy, lab, identity, backups, and the road the ambulances use.
export const ransom = hospitalWorld({
  id: 'ransom', mood: 'alert',
  cam: {
    wide: camW(4, 1, 40, 44), road: camN(14, 12, 16, 22), cc: camC(4, 1, 38, 38),
  },
  seq: ['wide', 'wide', 'road', 'cc', 'cc', 'cc'],
  layout(kit) {
    kit.area('hosp', 0, 0, 40, 30, 'Health system', { h: 0.08, color: 0x0a1626 });
    kit.area('ed_a', -10, 6, 10, 8, 'Emergency department', { h: 0.2, color: 0x0e2748, watch: ['ed'] }); kit.walls(-10, 6, 10, 8, { h: 1.6, gaps: [{ s: 's', at: 2, w: 2.2 }] });
    kit.bed(-12.5, 4.6, 0, true); kit.bed(-8.3, 4.6, 0, true); kit.chair(-10.4, 8, 3.1);
    kit.area('pharm_a', 2, 6, 8, 8, 'Pharmacy', { h: 0.2, color: 0x0e2748, watch: ['pharm'] }); kit.walls(2, 6, 8, 8, { h: 1.6 });
    kit.area('lab_a', 11.5, 6, 8, 8, 'Laboratory', { h: 0.2, color: 0x0e2748, watch: ['lab'] }); kit.walls(11.5, 6, 8, 8, { h: 1.6 });
    kit.dataHall(-8, -8, { rows: 1, cols: 5, name: 'Data center', id: 'dc', watch: ['idn', 'bak'] });
    kit.area('ehrhost', 4, -8, 8, 8, 'EHR hosting', { h: 0.2, color: 0x0e2748, watch: ['ehr'] }); kit.walls(4, -8, 8, 8, { h: 1.6 });
    kit.rackRow(4, -9.5, 3, 0, 1.4);
    kit.area('region', 22.5, 0, 12, 30, 'The region', { color: 0x08121f });
    kit.road(2, 13.8, 46, 3);
    kit.road(24, 4, 3, 22);
    kit.walls(23, -8, 8, 7, { h: 2 });
    kit.tree(18, -6, 1); kit.tree(19, -10, 1.1);
    kit.vehicle([[-20, 14.4], [20, 14.4], [24, 14.4], [24, 4], [24, 14.4], [-20, 13.2]], { speed: 3.4 });
    kit.vehicle([[24, 14.4], [-20, 13.2], [-20, 14.4], [24, 13.2]], { speed: 2.6, off: 0.5 });
    ccPlane(kit, 4, 1, 42, 26);
    kit.walker([[-14, 11], [-6, 11], [-6, 12.5], [-14, 12.5]], { speed: 1.4 });
    return {
      idn: [-11, -8.4], bak: [-5, -8.4], ehr: [4, -6.2], pharm: [2, 6.5], lab: [11.5, 6.5], ed: [-10, 6.5],
      amb: [20, 11.6],
      canvas: [-11, 1, CC_Y], zone: [0, 1, CC_Y], app: [10, 1, CC_Y], clean: [20, 1, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 7. WI-FI: the unit, the stairwell, and the badge call that has to roam.
export const wifi = hospitalWorld({
  id: 'wifi', mood: 'alert',
  cam: {
    wide: camW(0, 2, 36, 40), stair: camN(6, 4, 17, 19), cc: camC(0, 2, 36, 36),
  },
  seq: ['wide', 'stair', 'wide', 'cc', 'stair', 'cc'],
  layout(kit) {
    const w = kit.ward(-6, 4, { rooms: 4, name: '4 West and the stairwell' });
    watch(kit, 'hall', ['badge', 'ap1', 'ap2']);
    kit.area('sys', 12, -9, 12, 8, 'Clinical systems', { color: 0x0a1b33, watch: ['nc'] });
    kit.walls(12, -9, 12, 8, { h: 1.4 });
    kit.rackRow(12, -10.5, 4, 0, 1.4);
    kit.walker([[-15, 4.4], [4, 4.4], [4, 7.6], [-15, 7.6]], { speed: 1.9 });
    kit.walker([[-15, 7.6], [4, 7.6], [4, 4.4], [-15, 4.4]], { speed: 1.4, off: 0.5, color: 0x6cc04a });
    ccPlane(kit, 0, 2, 34, 20);
    const [rx, rz] = w.roomPos('s3', 0.9, 0.3);
    return {
      ap1: [-10, 4.2, 0, { cover: 6.5 }],
      ap2: [w.stairs.x - 0.2, 3.6, 0, { cover: 4.5 }],
      badge: [-1.5, 8.1, 0, { s: 0.9 }],
      idf: [w.idf.x - 0.5, w.idf.z + 3.2],
      nc: [-6, 6.1, 0.9, { s: 0.85 }],
      rtls: [rx, rz, 0, { s: 0.9 }],
      canvas: [-9, 2, CC_Y], mer: [0, 2, CC_Y], spaces: [9, 2, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 8. IMAGING: an outpatient center, the WAN, and the reading room at the main hospital.
export const imaging = hospitalWorld({
  id: 'imaging', mood: 'alert',
  cam: {
    wide: camW(0, 1, 38, 42), wan: camN(0, 3, 17, 24), cc: camC(0, 1, 36, 38),
  },
  seq: ['wide', 'wan', 'wide', 'cc', 'cc'],
  layout(kit) {
    kit.area('clinic', -14, 2, 13, 12, 'Outpatient imaging center', { watch: ['ct'] }); kit.walls(-14, 2, 13, 12, { h: 1.8, gaps: [{ s: 'e', at: 2, w: 2 }] });
    kit.desk(-18.4, 6, 2.6, 0, 2); kit.chair(-18.4, 7.4, Math.PI);
    kit.area('wanz', 0, 2, 12, 5, 'WAN', { h: 0.08, color: 0x0a1626, watch: ['wan'] });
    kit.road(0, 9, 30, 2.4); kit.tree(-3, 12, 1); kit.tree(4, 12.3, 0.9);
    kit.area('main', 14.5, 0, 15, 22, 'Main hospital', { h: 0.08, watch: ['pacs', 'rad'] });
    kit.dataHall(14.5, -4, { rows: 1, cols: 4, name: 'PACS and AI', id: 'pacsdc', watch: ['pacs', 'ai'] });
    kit.area('read', 14.5, 6.5, 10, 7, 'Reading room', { h: 0.2, color: 0x0e2748 }); kit.walls(14.5, 6.5, 10, 7, { h: 1.6 });
    kit.desk(14.5, 8.4, 3, Math.PI, 3);
    ccPlane(kit, 0, 1, 40, 22);
    return {
      ct: [-13, 1.5], wan: [0, 2.5, 0, { k: 'router' }], pacs: [11.8, -2.6], ai: [17, -2.6], rad: [14.5, 6],
      te: [-10, 1, CC_Y], fab: [0, 1, CC_Y], lake: [10, 1, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 9. HOME: a living room that is part of the hospital, across the internet.
export const home = hospitalWorld({
  id: 'home', mood: 'alert',
  cam: {
    wide: camW(2, 1, 38, 42), house: camN(-14, 4, 15, 17), cc: camC(3, 1, 36, 38),
  },
  seq: ['wide', 'house', 'wide', 'cc', 'cc'],
  layout(kit) {
    kit.area('house', -14, 4, 11, 9, "Patient's home", { watch: ['kit'] }); kit.walls(-14, 4, 11, 9, { h: 1.8, gaps: [{ s: 'e', at: 0, w: 1.4 }] });
    kit.bed(-17.6, 5, 0, true);
    kit.chair(-11, 2.4, 1); kit.desk(-14, 7.6, 2.4, Math.PI, 1);
    kit.tree(-19.5, 9, 1.2); kit.tree(-8.2, 10.2, 1);
    kit.area('net', -1, -3, 14, 10, 'Internet', { color: 0x0a1626, watch: ['isp', 'video'] });
    kit.area('hosp', 14, 2, 16, 14, 'Hospital', { watch: ['cmd', 'ehr'] }); kit.walls(14, 2, 16, 14, { h: 1.6 });
    kit.desk(11, 4.2, 2.6, Math.PI, 2); kit.desk(14.5, 4.2, 2.6, Math.PI, 2); kit.desk(11, 7.4, 2.6, Math.PI, 2);
    kit.road(-3, 11.5, 22, 2.4);
    ccPlane(kit, 3, 1, 40, 22);
    kit.walker([[-22, 11.6], [4, 11.6]], { speed: 1.6, color: 0xfbab18 });
    return {
      kit: [-14.8, 4.4, 0, { lab: [0, 0.2] }], cell: [-17, 2, 0, { s: 0.9 }],
      isp: [-4, -3], video: [3.5, -3],
      cmd: [12, 6.3], ehr: [19, 1],
      te: [-8, 1, CC_Y], zt: [3, 1, CC_Y], canvas: [14, 1, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 10. WAN: the acquired clinic arrives flat on a single circuit.
export const wan = hospitalWorld({
  id: 'wan', mood: 'alert',
  cam: {
    wide: camW(1, 2, 38, 42), rdp: camN(-6, 3, 16, 19), cc: camC(2, 2, 36, 38),
  },
  seq: ['wide', 'rdp', 'wide', 'cc', 'cc', 'cc'],
  layout(kit) {
    kit.area('clin', -12, 4, 14, 11, 'Acquired clinic', { watch: ['clinic', 'rdp'] }); kit.walls(-12, 4, 14, 11, { h: 1.8, gaps: [{ s: 'e', at: 1.5, w: 1.6 }] });
    kit.walls(-14, 4, 0.2, 11, { h: 1.8 }); kit.desk(-9, 7.6, 2.8, Math.PI, 2);
    kit.bed(-17, 3, 0, false);
    kit.area('parent', 14, 2, 15, 15, 'Parent health system', { watch: ['ehr', 'soc', 'ip'] });
    kit.walls(14, 2, 15, 15, { h: 1.6 });
    kit.rackRow(14, -3.8, 4, 0, 1.4);
    kit.plate(0, 4, 8, 1.1, { y: 0.1, h: 0.1, color: 0x0b2a4a, edge: C.sky, edgeOp: 0.7 });
    kit.sign('ONE CIRCUIT', 0, 1.6, 5.4);
    ccPlane(kit, 2, 2, 40, 22);
    kit.walker([[-16, 6], [-8, 6], [-8, 8.6], [-16, 8.6]], { speed: 1.3 });
    return {
      clinic: [-13, 3.5], rdp: [-5.2, -3.2, 0, { s: 0.95 }], circ: [-1.2, 4.2, 0, { k: 'router' }],
      ehr: [14, 0.2], soc: [18.5, 7], ip: [9, 6.5],
      inv: [-10, 2, CC_Y], gate: [-2, 2, CC_Y], idb: [7, 2, CC_Y], sdw: [15, 2, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 11. IDENTITY: a nursing unit, a vendor at the door, three directories, and the ED break-glass desk.
export const identity = hospitalWorld({
  id: 'identity', mood: 'alert',
  cam: {
    wide: camW(1, 0, 38, 42), vendor: camN(-12, -6, 18, 22), dirs: camN(9, -5, 16, 19), ed: camN(6, 8, 15, 17), cc: camC(2, 0, 36, 38),
  },
  seq: ['wide', 'vendor', 'dirs', 'cc', 'cc', 'ed'],
  layout(kit) {
    kit.area('users', -12, 3, 11, 10, 'Who signs in', { watch: ['nurse', 'vendor'] });
    kit.walls(-12, 3, 11, 10, { h: 1.7, gaps: [{ s: 'n', at: 0, w: 1.6 }] });
    kit.desk(-13.5, 6, 2.6, Math.PI, 2); kit.desk(-9.8, 6, 2.6, Math.PI, 2); kit.chair(-13.5, 4.9, 0);
    kit.area('vend_a', -12, -10, 11, 7, 'Vendor remote support', { color: 0x0a1626, watch: ['vendor'] });
    kit.road(-12, -5.2, 12, 1.8);
    kit.dataHall(8, -6, { rows: 1, cols: 6, name: 'Three directories from three mergers', id: 'dirs', watch: ['ad1', 'ad2', 'okta'] });
    kit.area('ed_a', 6, 8, 11, 7, 'Emergency department', { h: 0.2, color: 0x0e2748, watch: ['glass'] }); kit.walls(6, 8, 11, 7, { h: 1.6 });
    kit.bed(3.2, 9.2, 0, true); kit.desk(9, 10, 2.6, Math.PI, 1);
    ccPlane(kit, 2, 0, 36, 22);
    kit.walker([[-18, 0.4], [-6, 0.4], [-6, 1.6], [-18, 1.6]], { speed: 1.5 });
    return {
      nurse: [-12, 2.4, 0, { lab: [0, 0.3] }], vendor: [-12, -10],
      ad1: [4.2, -6.6], ad2: [8.4, -6.6], okta: [12.6, -6.6],
      glass: [6.8, 7.8, 0, { s: 0.9 }],
      cid: [-8, 0, CC_Y], app: [2, 0, CC_Y], aud: [12, 0, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 12. COMPLIANCE: the compliance office on a Tuesday, a corkboard of four inventories and a surveyor.
export const compliance = hospitalWorld({
  id: 'compliance', mood: 'alert',
  cam: {
    wide: camW(0, 0, 36, 40), board: camN(-8, -2, 17, 20), cc: camC(0, 0, 36, 36),
  },
  seq: ['wide', 'board', 'wide', 'cc', 'cc', 'cc'],
  layout(kit) {
    kit.area('ev', -4, 0, 28, 17, 'Evidence today', { watch: ['cork', 'cmms', 'dhcp', 'nac', 'grc'] });
    kit.walls(-4, 0, 28, 17, { h: 1.8, gaps: [{ s: 'e', at: 0, w: 2.4 }] });
    kit.area('ask', 18, 0, 10, 17, 'The ask', { h: 0.2, color: 0x0e2748, watch: ['surv', 'shot'] });
    kit.plate(-7, 1, 14, 1.8, { y: 0.2, h: 0.6, color: 0x15304f, edge: C.sky, edgeOp: 0.5 });
    [-12, -7, -2].forEach((x) => kit.chair(x, 3, Math.PI));
    [-12, -7, -2].forEach((x) => kit.chair(x, -1, 0));
    kit.desk(3.5, 6, 2.6, Math.PI, 1);
    ccPlane(kit, 0, 0, 40, 22);
    kit.walker([[12, -6], [12, 6], [16, 6], [16, -6]], { speed: 1.2, color: 0xfbab18 });
    return {
      cork: [-15, -5, 0, { s: 1.15, lab: [0, 0.3] }],
      cmms: [-9, 0.8], dhcp: [-5, 0.8], nac: [-1, 0.8], grc: [3, 0.8],
      shot: [8, 3, 0, { s: 0.95 }], surv: [18, 0.5],
      topo: [-12, 0, CC_Y], audit: [-3, 0, CC_Y], lake: [6, 0, CC_Y], human: [15, 0, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// 13. AI AT WORK: the exam room scribe that stops at 8:12 because of a Wi-Fi gap.
export const aiwork = hospitalWorld({
  id: 'aiwork', mood: 'alert',
  cam: {
    wide: camW(5, 2, 38, 42), clinic: camN(-9, 3, 16, 18), chat: camN(18, 4, 20, 22), cc: camC(4, 1, 36, 38),
  },
  seq: ['wide', 'clinic', 'chat', 'cc', 'cc'],
  layout(kit) {
    kit.area('clinic', -9, 3, 18, 12, 'Clinic', { watch: ['room', 'md', 'ap'] });
    [-13.5, -9, -4.5].forEach((x, i) => {
      kit.walls(x, -0.2, 4.5, 5.6, { h: 1.6, gaps: [{ s: 's', at: 0.9, w: 1.4 }] });
      kit.bed(x - 0.8, -0.9, 0, i !== 2);
    });
    kit.walls(-9, 8, 18, 0.2, { h: 1.2 });
    kit.desk(-9, 7.2, 2.8, Math.PI, 2);
    kit.area('out', 20, 3, 14, 14, 'Outside the hospital', { color: 0x0a1626, watch: ['vendor', 'up'] });
    ccPlane(kit, 5, 1, 40, 22);
    kit.walker([[-16, 4.4], [-2, 4.4], [-2, 5.8], [-16, 5.8]], { speed: 1.7 });
    return {
      room: [-13, 1.2, 0, { lab: [0, 0.2] }], md: [-9.2, 2.2], ap: [-9, 5, 0, { cover: 5.5 }],
      vendor: [16, 0], up: [24, 0], chat: [20, 8],
      te: [-4, 1, CC_Y], def: [6, 1, CC_Y], tok: [16, 1, CC_Y],
    };
  },
});

// ---------------------------------------------------------------------------
// Hero close: the bridge bars return and an ECG answers at the last step.
export const close = {
  id: 'close',
  bg: { a: '#01040b', b: '#062a4d', c: '#00bceb', mix: [1, 0.6, 0, 0.5] },
  bgSteps: [null, { a: '#02070a', b: '#0c2a24', c: '#6cc04a', mix: [1, 0.6, 0.2, 0.6] }],
  cams: [{ p: [0, 5, 34], t: [0, 2, 0] }, { p: [0, 6, 38], t: [0, 2.6, 0] }],
  build() {
    const group = new THREE.Group();
    const bars = bridgeBars({ spacing: 2.0, unit: 2.4, radius: 0.42 });
    const lift = new THREE.Group(); lift.position.y = 3.8; lift.add(bars); group.add(lift);
    group.add(gridFloor(220, 110, C.sky, 0.14));
    const pyr = makePyramid([C.green, C.sky, C.ice], ['', '', ''], { scale: 0.5 }).pivot;
    pyr.rotation.z = Math.PI; pyr.position.set(0, 18.5, -8); group.add(pyr);
    const wave = [];
    for (let i = 0; i < 64; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1, 0.18), emissiveMat(i % 2 ? C.sky : C.green, 1.4));
      b.position.set((i - 31.5) * 0.5, 0, 4); group.add(b); wave.push(b);
    }
    let k = 0, wk = 0;
    return {
      group,
      update(dt, t, step) {
        k = damp(k, 1, 1.4, dt); wk = damp(wk, step >= 1 ? 1 : 0, 2, dt);
        bars.userData.setHeights(smooth(k), t);
        pyr.rotation.y = t * 0.3; pyr.scale.setScalar(Math.max(0.001, 0.5 * (1 - wk * 0.6)));
        wave.forEach((b, i) => {
          // An ECG-like trace: a flat line with a sharp spike that travels across.
          const u = ((i / 64 - t * 0.12) % 1 + 1) % 1;
          const beat = Math.exp(-Math.pow((u - 0.5) * 24, 2)) * 2.8 - Math.exp(-Math.pow((u - 0.44) * 30, 2)) * 0.6;
          const h = 0.1 + wk * (0.15 + Math.max(0, beat));
          b.scale.y = h; b.position.y = h / 2;
        });
      },
      reset() { k = 0; },
    };
  },
};
