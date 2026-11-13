/* Page layout. The story is the workflow: a step rail across the top drives everything.
   Below it, a large floor plan (scaled to the space available) sits beside a column that narrates the current step. */
const SD = 5.5;                       // seconds per story step at 1x
const UCS = [];
const SRCNAME = 'Healthcare infrastructure storyboard';
const AUDNAME = { exec: 'Executive', dir: 'IT director', eng: 'Engineering' };
const modeColor = (m) => (m === 'tobe' ? COL.cisco : COL.pain);
const MODENAME = { legacy: 'TODAY | ANY INFRASTRUCTURE', tobe: 'WITH CISCO CLOUD CONTROL | MODELED' };
const M = 18;

function fitText(s, x, y, maxW, size, o = {}) {
  let sz = size; while (sz > 9.5 && D.measure(s, sz, o.weight || 500) > maxW) sz -= 0.5;
  D.text(s, x, y, Object.assign({}, o, { size: sz, maxW }));
}
const allSteps = (c) => phaseSteps(c, 'legacy').map((s) => ({ s, mode: 'legacy' })).concat(phaseSteps(c, 'tobe').map((s) => ({ s, mode: 'tobe' })));

function factsOf(c, mode) {
  if (mode === 'tobe') return [['Cisco Cloud Control is generally available in the US only (from 25 Aug 2026) [S]', 'S']].concat(c.chips.map((q) => [`${q[0]}: ${q[1]}`, 'S']));
  const out = [];
  c.N.steps.filter((s) => s.phase === 'today').forEach((s) => (s.facts || []).forEach((f) => out.push([`${f.v} ${f.l} [${f.s}]`, /gap/i.test(f.s) ? 'H' : 'S'])));
  return out;
}

/* All regions in one place; the logical canvas is 900 tall and as wide as the window allows. */
function layout(app) {
  const VW = app.W, mainY = 168, mainH = 680, headH = 38, areaH = mainH - headH - 8;
  const rw0 = SCENE_R[2] - SCENE_R[0] + 2 * SCENE_PAD[0], rh0 = SCENE_R[3] - SCENE_R[1] + 2 * SCENE_PAD[1];
  const kmax = areaH / rh0;
  const need = rw0 * kmax + 12;
  const rw = clamp(VW - 2 * M - 14 - need, 450, 720), sw = VW - 2 * M - 14 - rw;
  const k = Math.min(kmax, (sw - 12) / rw0);
  const scW = rw0 * k, scH = rh0 * k;
  return { VW, sx: M, sy: mainY, sw, sh: mainH, headH, k, ox: M + (sw - scW) / 2, oy: mainY + headH + (areaH - scH) / 2 + 2, scW, scH, rx: M + sw + 14, rw, railY: 108, railH: 52, mainY, mainH, factsY: 870 };
}

function drawBanner(c, mode, L) {
  const M2 = c[mode], ok = mode === 'tobe', col = modeColor(mode);
  const label = c.group === 'Flagship' ? `FLAGSHIP ${c.n} OF 3` : `USE CASE ${c.n} OF 10`;
  const w = D.pill(`${label} | ${c.N.pillars.toUpperCase()}`, M, 19, COL.hosp, { size: 10.5, textColor: THEME === 'dark' ? '#04101f' : '#fff' });
  D.text(c.name, M + w + 14, 19.5, { size: 19, weight: 800, maxW: 560 });
  const nw = Math.min(560, D.measure(c.name, 19, 800));
  fitText(c.setting, M + w + 26 + nw, 20, L.VW - 2 * M - w - 26 - nw, 13.5, { weight: 500, color: T.sub });
  D.box(M, 38, L.VW - 2 * M, 52, { fill: tint(col, 0.07), stroke: tint(col, 0.45), lw: 1.4, r: 10 });
  D.box(M, 38, 6, 52, { fill: col, r: 3 });
  let sz = 15.5; while (sz > 12.5 && D.lines(M2.banner, L.VW - 2 * M - 40, sz, 600) > 2) sz -= 0.5;
  D.wrap(M2.banner, M + 20, 56, L.VW - 2 * M - 40, sz + 5, { size: sz, weight: 600, color: T.ink, maxLines: 2 });
  HOT('band', M, 38, L.VW - 2 * M, 52, { owner: ok ? 'cisco' : 'pain', tag: ok ? 'H' : 'S', title: ok ? `${c.short}: the modeled outcome` : `${c.short}: the situation today`, body: (ok ? c.vision : c.N.subtitle) + `<br><i>Roles in this scene: ${c.personas.join(', ')}.</i>`, src: `${SRCNAME}, ${c.id}` });
}

/* The workflow rail: every step of the story, Today first, then With Cloud Control. The active step fills in. */
function drawRail(c, mode, S, app, L) {
  const steps = allSteps(c), n = steps.length, nL = steps.filter((q) => q.mode === 'legacy').length;
  const gap = 8, pg = 30, total = L.VW - 2 * M, cw = (total - (n - 1) * gap - (pg - gap)) / n, y = L.railY, h = L.railH;
  const cur = (mode === 'tobe' ? nL : 0) + S.i;
  const xs = []; let x = M;
  steps.forEach((q, g) => { if (g === nL) x += pg - gap; xs.push(x); x += cw + gap; });
  // phase labels
  [['legacy', 0, nL - 1, MODENAME.legacy, COL.pain], ['tobe', nL, n - 1, MODENAME.tobe, COL.cisco]].forEach(([, a, b, name, col]) => {
    if (b < a) return; const x0 = xs[a], x1 = xs[b] + cw;
    D.text(name, x0 + 2, y - 9, { size: 10.5, weight: 800, color: col });
    D.line([[x0, y - 3], [x1, y - 3]], { lw: 2, color: tint(col, 0.5) });
  });
  steps.forEach((q, g) => {
    const x0 = xs[g], act = g === cur, done = g < cur, pc = q.mode === 'legacy' ? COL.pain : COL.cisco;
    D.box(x0, y, cw, h, { fill: act ? pc : done ? tint(pc, 0.1) : T.panel, stroke: act ? pc : done ? tint(pc, 0.55) : T.line2, lw: act ? 2 : 1.4, r: 11, shadow: act ? 10 : 0 });
    const ccx = x0 + 22, ccy = y + h / 2;
    if (done) { D.circle(ccx, ccy, 11, { fill: pc }); D.icon(q.mode === 'legacy' ? 'cross' : 'check', ccx, ccy, 10, '#fff'); }
    else D.circle(ccx, ccy, 11, { fill: act ? 'rgba(255,255,255,.25)' : T.panel, stroke: act ? '#fff' : T.faint, lw: 1.6 });
    if (!done) D.text(String(g + 1), ccx, ccy + 0.5, { size: 12, weight: 800, color: act ? '#fff' : T.faint, align: 'center' });
    const tc = act ? '#fff' : done ? T.ink : T.sub;
    let fs = 14; while (fs > 10 && D.lines(q.s.title, cw - 52, fs, 800) > 2) fs -= 0.5;
    D.wrap(q.s.title, x0 + 40, y + h / 2 - (D.lines(q.s.title, cw - 52, fs, 800) > 1 ? 8.5 : 0), cw - 52, fs + 3, { size: fs, weight: act ? 800 : 700, color: tc, maxLines: 2 });
    if (act) { D.box(x0 + 10, y + h - 7, cw - 20, 3.5, { fill: 'rgba(255,255,255,.28)', r: 2 }); D.box(x0 + 10, y + h - 7, (cw - 20) * S.su, 3.5, { fill: '#fff', r: 2 }); }
    if (g < n - 1 && g !== nL - 1) D.line([[x0 + cw + 2, ccy - 5], [x0 + cw + 6, ccy], [x0 + cw + 2, ccy + 5]], { lw: 1.6, color: T.faint });
    app.stepBoxes.push({ i: g, x: x0, y, w: cw, h });
    HOT('rail' + g, x0, y, cw, h, { owner: q.mode === 'legacy' ? 'pain' : 'cisco', tag: 'I', title: `Step ${g + 1}: ${q.s.title}`, body: `<b>Executive:</b> ${q.s.say.exec}<br><b>IT director:</b> ${q.s.say.dir}<br><b>Engineering:</b> ${q.s.say.eng}<br><i>Click to replay from this step.</i>`, src: `${SRCNAME}, ${c.id}` });
  });
}

function panel(x, y, w, h, col, o = {}) {
  D.box(x, y, w, h, { fill: o.fill || T.panel, stroke: o.stroke || T.line2, lw: o.lw || 1.4, r: 12, shadow: o.shadow ?? 4 });
  if (col) D.box(x, y + 10, 5, h - 20, { fill: col, r: 2.5 });
}

function drawScenePanel(c, mode, u, t, app, L) {
  const ec = modeColor(mode);
  panel(L.sx, L.sy, L.sw, L.sh, null, { shadow: 6 });
  D.box(L.sx, L.sy, L.sw, L.headH, { fill: tint(ec, 0.09), r: 12 }); D.box(L.sx, L.sy + L.headH - 12, L.sw, 12, { fill: tint(ec, 0.09), r: 0 });
  const pw = D.pill(mode === 'tobe' ? 'WITH CLOUD CONTROL' : 'TODAY', L.sx + 16, L.sy + 19, ec, { size: 11 });
  const st = phaseSteps(c, mode), i = Math.min(st.length - 1, Math.floor(u * st.length));
  const right = `Step ${i + 1} of ${st.length} | ${st[i].title}`, rw = Math.min(520, D.measure(right, 14, 700));
  fitText(c[mode].strip, L.sx + 28 + pw, L.sy + 19.5, L.sw - 56 - pw - rw - 12, 13.5, { weight: 600, color: T.ink });
  D.text(right, L.sx + L.sw - 16, L.sy + 19.5, { size: 14, weight: 700, color: ec, align: 'right', maxW: 520 });
  HOT('scene', L.sx, L.sy, L.sw, L.sh, { owner: mode === 'tobe' ? 'cisco' : 'pain', tag: 'I', title: c.setting, body: mode === 'tobe' ? c.vision : c.N.subtitle, src: `${SRCNAME}, ${c.id}` });
  ctx.save(); D.rr(L.ox, L.oy, L.scW, L.scH, 10); ctx.clip();
  ctx.translate(L.ox - (SCENE_R[0] - SCENE_PAD[0]) * L.k, L.oy - (SCENE_R[1] - SCENE_PAD[1]) * L.k); ctx.scale(L.k, L.k);
  const S = drawUCScene(c, mode, u, t, app);
  ctx.restore();
  if (app.fade > 0.01) { ctx.save(); ctx.globalAlpha = app.fade * 0.94; D.box(L.ox - 2, L.oy - 2, L.scW + 4, L.scH + 4, { fill: T.bg, r: 10 }); ctx.restore(); }
  return S;
}

function drawRight(c, mode, u, t, app, S, L) {
  const ec = modeColor(mode), M2 = c[mode], ok = mode === 'tobe', x = L.rx, w = L.rw, aud = app.aud;
  const hs = [176, 178, 78, 140, 72], gap = (L.mainH - hs.reduce((a, b) => a + b, 0)) / 4;
  const ys = []; let yy = L.mainY; hs.forEach((h) => { ys.push(yy); yy += h + gap; });
  const nL = phaseSteps(c, 'legacy').length, nAll = nL + phaseSteps(c, 'tobe').length, g = (ok ? nL : 0) + S.i;

  // 1. NOW: the narration of the active step
  { const y = ys[0], h = hs[0], say = S.step.say[aud];
    panel(x, y, w, h, ec, { fill: T.panel2, stroke: tint(ec, 0.55), lw: 1.7, shadow: 8 });
    D.pill(`${AUDNAME[aud].toUpperCase()} VIEW`, x + 20, y + 20, ec, { size: 10 });
    D.text(`STEP ${g + 1} OF ${nAll}`, x + w - 16, y + 20, { size: 11, weight: 800, color: ec, align: 'right' });
    fitText(S.step.title, x + 20, y + 46, w - 40, 18, { weight: 800, color: T.ink });
    D.wrap(say, x + 20, y + 74, w - 40, 21, { size: 15.5, weight: 500, color: T.ink, maxLines: 5 });
    HOT('now', x, y, w, h, { owner: ok ? 'cisco' : 'pain', tag: 'I', title: S.step.title, body: `<b>Executive:</b> ${S.step.say.exec}<br><b>IT director:</b> ${S.step.say.dir}<br><b>Engineering:</b> ${S.step.say.eng}<br><i>Switch audience in the footer (keys 1, 2, 3).</i>`, src: `${SRCNAME}, ${c.id}` }); }

  // 2. What is missing (today) or the console (with Cloud Control)
  { const y = ys[1], h = hs[1], L2 = c.legacy;
    panel(x, y, w, h, ec);
    if (!ok) {
      D.text('WHAT IS MISSING TODAY', x + 20, y + 20, { size: 11.5, weight: 800, color: COL.pain }); D.tag(x + w - 18, y + 20, 'H');
      L2.gaps.forEach((b, i) => { D.icon('cross', x + 28, y + 43 + i * 23, 11, COL.pain); fitText(b, x + 44, y + 43.5 + i * 23, w - 62, 13.5, { weight: 500, color: T.ink }); });
      D.text(L2.big[0], x + 20, y + h - 22, { size: 24, weight: 800, color: COL.pain, maxW: 150 });
      const bw = Math.min(150, D.measure(L2.big[0], 24, 800));
      D.wrap(L2.big[1], x + 30 + bw, y + h - 28, w - 48 - bw, 13.5, { size: 11.5, color: T.sub, maxLines: 2 });
      HOT('mode', x, y, w, h, { owner: 'pain', tag: 'H', title: 'Gaps and pain points today', body: L2.gaps.join('<br>') + `<br><i>Discovery question: ${L2.ask || c.ask}</i>`, src: `${SRCNAME}, ${c.id}` });
    } else {
      const cs = M2.console;
      D.text(cs.title.toUpperCase(), x + 20, y + 20, { size: 11.5, weight: 800, color: COL.cisco, maxW: w - 150 }); D.pill('SIMULATED', x + w - 16, y + 20, COL.partner, { size: 9, align: 'right' });
      cs.rows.forEach((r, i) => {
        const ry = y + 36 + i * 25, done = S.i >= r[3] && (S.i > r[3] || S.su > 0.35);
        D.box(x + 14, ry, w - 28, 22, { fill: done ? tint(COL.run, 0.1) : tint(COL.data, 0.1), stroke: T.line2, lw: 1, r: 6 });
        D.icon(r[4] || 'check', x + 28, ry + 11, 12, done ? COL.run : COL.amber);
        D.text(r[0], x + 44, ry + 11.5, { size: 12.5, weight: 700, maxW: 200 });
        D.text(done ? r[2] : r[1], x + w - 24, ry + 11.5, { size: 12.5, weight: 700, color: done ? COL.run : COL.amber, align: 'right', maxW: w - 270 });
      });
      if (cs.foot) D.text(cs.foot, x + 20, y + h - 11, { size: 11, weight: 600, italic: true, color: COL.cisco, maxW: w - 40 });
      HOT('mode', x, y, w, h, { owner: 'cisco', tag: 'I', title: cs.title, body: cs.body + ' Values on this screen are simulated for illustration.', src: `${SRCNAME}, ${c.id}` });
    } }

  // 3. The data path, four hops
  { const y = ys[2], h = hs[2];
    panel(x, y, w, h, ec);
    D.text(ok ? 'WITH CLOUD CONTROL: ONE DATA PATH' : 'TODAY: SEPARATE SYSTEMS', x + 20, y + 15, { size: 10.5, weight: 800, color: T.sub, maxW: w * 0.55 });
    fitText(M2.pathNote, x + w - 14, y + 15, w - 240, 10.5, { weight: 700, color: ec, align: 'right' });
    const cw = (w - 28) / 4;
    M2.hops.forEach((hp, i) => {
      const cx = x + 14 + cw * i + cw / 2, cy = y + 38;
      D.circle(cx, cy, 14, { fill: ok ? tint(COL.cisco, 0.1) : T.panel2, stroke: ok ? COL.cisco : COL.idle, lw: 1.8 });
      D.icon(hp[2] || 'server', cx, cy, 15, ok ? COL.cisco : COL.idle);
      D.wrap(hp[0], cx, y + 62, cw - 8, 12, { size: 11, weight: 700, align: 'center', maxLines: 2 });
      if (i < 3) {
        const p2 = Path([[cx + 17, cy], [cx + cw - 17, cy]]);
        if (ok) D.flow(p2, t + i * 0.3, { n: 1, speed: 40, r: 3, color: COL.cisco, lw: 1.8 });
        else { D.line(p2.pts, { lw: 2, color: tint(COL.pain, 0.5), dash: [3, 3] }); D.icon('cross', cx + cw / 2, cy, 9, COL.pain); }
      }
    });
    HOT('path', x, y, w, h, { owner: ok ? 'cisco' : 'pain', tag: ok ? 'S' : 'H', title: ok ? 'Data path with Cloud Control' : 'Separate path today', body: (ok ? c.chips.map((q) => `${q[0]}: ${q[1]}`).join('<br>') : 'Each hop is a separate system with its own console and team; signals do not flow from one to the next. Current tools are not public [H].') + '<br>' + M2.hops.map((hp) => `<b>${hp[0]}</b>: ${hp[1]}`).join('<br>'), src: `${SRCNAME}, ${c.id}` }); }

  // 4. Outcomes
  { const y = ys[3], h = hs[3];
    panel(x, y, w, h, ec);
    D.text(ok ? 'OUTCOMES (MODELED, NOT FORECAST)' : 'IMPACT TODAY', x + 20, y + 16, { size: 10.5, weight: 800, color: T.sub });
    M2.outcomes.forEach((o, i) => {
      const ry = y + 28 + i * 37;
      let vs = 21; while (vs > 13 && D.measure(o[0], vs, 800) > 118) vs -= 1;
      D.text(o[0], x + 20, ry + 17, { size: vs, weight: 800, color: ec, maxW: 122 });
      D.wrap(o[1], x + 150, ry + 10, w - 150 - 40, 13.5, { size: 12, color: T.sub, maxLines: 2 });
      D.tag(x + w - 20, ry + 17, o[2]);
      if (i < 2) D.line([[x + 20, ry + 35], [x + w - 20, ry + 35]], { lw: 0.8, color: T.line2 });
    });
    HOT('outs', x, y, w, h, { owner: ok ? 'cisco' : 'pain', tag: 'S', title: ok ? 'Outcomes and KPIs' : 'Where the hospital starts', body: ok ? 'Figures tagged S are public. Items tagged H are hypotheses to measure in a pilot. No savings, percentages or targets are forecast; no Cisco healthcare customer metric for Cloud Control exists yet.<br><b>KPIs to baseline in a pilot (no targets claimed):</b><br>' + c.kpis.join('<br>') : c.N.subtitle, src: `${SRCNAME}, ${c.id}` }); }

  // 5. Discovery question (today) or the boundary (with Cloud Control)
  { const y = ys[4], h = hs[4];
    panel(x, y, w, h, ec, { fill: T.panel2 });
    D.text(ok ? 'STAYS WITH THE HOSPITAL AND ITS VENDORS' : 'DISCOVERY QUESTION', x + 20, y + 15, { size: 10.5, weight: 800, color: T.sub });
    if (ok) D.wrap(M2.stays, x + 20, y + 33, w - 38, 14, { size: 11.5, color: T.ink, maxLines: 3 });
    else D.wrap(c.ask, x + 20, y + 36, w - 38, 18, { size: 14, weight: 600, color: T.ink, maxLines: 2 });
    HOT('ask', x, y, w, h, { owner: ok ? 'partner' : 'pain', tag: 'H', title: ok ? 'Stays in place' : 'Discovery question', body: ok ? M2.stays : c.ask, src: `${SRCNAME}, ${c.id}` }); }
}

function drawFacts(c, mode, L) {
  let facts = factsOf(c, mode), fs = 13;
  const avail = L.VW - 2 * M, total = (list, f) => list.reduce((a, q) => a + D.measure(q[0], f) + 40 * f / 12, 0);
  while (facts.length > 1 && total(facts, 11) > avail) facts = facts.slice(0, -1);
  while (fs > 11 && total(facts, fs) > avail) fs -= 0.25;
  let fx = M;
  facts.forEach(([f, tg]) => { D.tag(fx + 7, L.factsY, tg); D.text(f, fx + 20, L.factsY + 0.5, { size: fs, color: T.ink }); fx += D.measure(f, fs) + 40 * fs / 12; });
  if (fx > L.VW - 4) OVERFLOW.push('facts ' + c.id);
  D.text('Layout, IDs, timings and counts are simulated. Outcomes are modeled; no percentage is claimed for Cloud Control.', M, L.factsY + 20, { size: 10.5, italic: true, color: T.faint, maxW: avail });
}

function drawPage(c, mode, u, t, app) {
  const L = layout(app); SUF = '_' + mode;
  drawBanner(c, mode, L);
  const S = drawScenePanel(c, mode, u, t, app, L);
  drawRail(c, mode, S, app, L);
  drawRight(c, mode, u, t, app, S, L);
  drawFacts(c, mode, L);
  SUF = '';
  return S;
}

function tourFor(c) {
  const L = c.N.steps.filter((s) => s.phase === 'today'), W = c.N.steps.filter((s) => s.phase === 'cisco');
  const pick = (list, k) => list[Math.min(list.length - 1, k)];
  return [
    { dur: 7, mode: 'legacy', focus: 'scene', title: `${c.short} | Today`, cap: () => c.N.subtitle },
    { dur: 6, mode: 'legacy', focus: 'legacyband', title: `${c.short} | Separate tools`, cap: () => c.legacy.tour[0] },
    { dur: 6, mode: 'legacy', focus: 'mode', title: `${c.short} | Gaps`, cap: (a) => pick(L, L.length - 1).say[a] },
    { dur: 8, mode: 'tobe', focus: 'scene', title: `${c.short} | With Cloud Control`, cap: (a) => pick(W, 0).say[a] },
    { dur: 7, mode: 'tobe', focus: 'path', title: `${c.short} | One data path`, cap: () => c.tobe.tour[0] },
    { dur: 7, mode: 'tobe', focus: 'outs', title: `${c.short} | Outcomes and KPIs`, cap: () => c.tobe.tour[1] },
  ];
}

/* Event feed: every step reached so far, Today first, then With Cloud Control. */
function feedFor(c, app) {
  const p = app.cur, out = [];
  const add = (mode, upto) => phaseSteps(c, mode).forEach((s, i) => { if (i <= upto) out.push({ k: `${mode}-${i}-${app.aud}`, ts: `Step ${i + 1}`, src: mode === 'tobe' ? 'Cloud Control' : 'Today', msg: s.title, color: mode === 'tobe' ? COL.cisco : COL.pain }); });
  add('legacy', p.mode === 'tobe' ? 99 : p.i); if (p.mode === 'tobe') add('tobe', p.i);
  return out;
}
