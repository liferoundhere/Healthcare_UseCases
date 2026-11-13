/* App shell: tabs, story flow, audience, retractable side panel, tooltips, guided tour, deterministic stepping.
   The scenario clock runs in "steps" of SD seconds. Flow 'story' plays Today then With Cloud Control as one continuous story;
   'legacy' and 'tobe' loop one phase only. */
function createApp(cfg) {
  const H = 900;
  const params = new URLSearchParams(location.search);
  const N = cfg.cases.length;
  const saved = (k) => { try { return localStorage.getItem('hcs.' + k); } catch { return null; } };
  const keep = (k, v) => { try { localStorage.setItem('hcs.' + k, v); } catch { /* ignore */ } };
  const flowParam = params.get('flow') || params.get('mode');
  const app = {
    t: +(params.get('t') || 0), dt: 0, speed: 1, playing: !params.has('paused'), tourOn: false, tourT0: 0, hots: [], stepBoxes: [], focus: null,
    uc: clamp((+(params.get('uc') || 1) - 1) | 0, 0, N - 1), flow: ['story', 'legacy', 'tobe'].includes(flowParam) ? flowParam : 'story', mode: 'legacy', t0: 0, W: 1600, H, cfg,
    cur: { mode: 'legacy', i: 0, u: 0, g: 0 }, fade: 0, base: 1,
    aud: ['exec', 'dir', 'eng'].includes(params.get('aud')) ? params.get('aud') : saved('aud') || 'exec',
  };
  window.APP = app;
  setTheme(params.get('theme') || saved('theme') || 'light');

  const root = document.createElement('div'); root.id = 'app';
  const tagSpan = (k) => `<span class="tag ${k}">${k === 'I' ? 'i' : k}</span>`;
  const ownerRows = Object.entries(OWNER).map(([k, [n]]) => `<div class="r"><span class="sw${k === 'data' ? ' dot' : ''}" data-own="${k}"></span>${n}</div>`).join('');
  const stateRows = [['ok', 'Healthy'], ['warn', 'Warning'], ['down', 'Down, shown with a red cross'], ['pending', 'Waiting for a person to approve'], ['unknown', 'Unknown or not instrumented']]
    .map(([k, n]) => `<div class="r"><span class="sw dot" data-st="${k}"></span>${n}</div>`).join('');
  const sec = (k, title, body) => `<details data-k="${k}"><summary id="sum_${k}">${title}</summary>${body}</details>`;
  root.innerHTML = `
  <header><div class="brand"><div class="mark"></div><div style="min-width:0"><h1>${cfg.title}</h1></div></div>
  <div class="hdr-right">${cfg.subtitle}</div></header>
  <nav id="tabs">${cfg.cases.map((c, i) => `<button data-i="${i}" title="${c.name}"><span class="k">${c.code} | ${c.group === 'Flagship' ? 'Flagship' : 'Use case'}</span><span class="n">${c.short}</span></button>`).join('')}</nav>
  <main><div id="stage"><canvas id="cv"></canvas><div id="tip"></div><div id="caption"><div class="st"></div><div class="cx"></div><div class="bar"><i></i></div></div></div>
  <button id="sideTab" title="Show or hide key figures and legend (P)"><span id="sideTabTxt"></span></button>
  <aside id="side">
    ${sec('kpi', 'Key figures', '<div class="kpis" id="kpis"></div>')}
    ${sec('feed', 'Event feed (simulated)', '<div class="feed" id="feed"></div>')}
    ${sec('who', 'Roles and the question', '<div id="who" class="who"></div>')}
    ${sec('legend', 'Legend', `<div class="legend">${ownerRows}${stateRows}
      <div class="r">${tagSpan('S')}<span><b>Sourced</b>: public source in the research briefs</span></div>
      <div class="r">${tagSpan('H')}<span><b>Hypothesis</b>: to validate with the customer</span></div>
      <div class="r">${tagSpan('I')}<span><b>Illustrative</b>: simulated layout, IDs and timings</span></div></div>`)}
    <div class="srcnote" id="srcnote"></div>
  </aside></main>
  <footer>
    <button id="bPlay" class="on">Pause</button>
    <button id="bRestart">Restart</button>
    <div class="grp" id="gSpeed">${[0.5, 1, 2].map((s) => `<button data-s="${s}" class="${s === 1 ? 'on' : ''}">${s}x</button>`).join('')}</div>
    <button id="bTour">Guided tour</button>
    <span class="lbl">Flow</span><div class="grp" data-tg="mode"><button data-v="story" title="Today, then With Cloud Control, as one story (M)">Story</button><button data-v="legacy">Today</button><button data-v="tobe">With Cloud Control</button></div>
    <span class="lbl">Audience</span><div class="grp" data-tg="aud"><button data-v="exec">Executive</button><button data-v="dir">IT director</button><button data-v="eng">Engineering</button></div>
    <div class="grp"><button id="bPrev" title="Previous (left arrow)">Prev</button><button id="bNext" title="Next (right arrow)">Next</button></div>
    <button id="bPanels" title="Key figures, feed and legend (P)">Panels</button>
    <button id="bTheme" title="Light or dark (D)">Dark</button>
    <span class="sp"></span><span class="clock" id="clock"></span>
  </footer>`;
  document.body.appendChild(root);

  const cv = document.getElementById('cv'), stage = document.getElementById('stage'), tip = document.getElementById('tip'), cap = document.getElementById('caption');
  ctx = cv.getContext('2d');
  let scale = 1, dpr = 1;
  function resize() {
    const r = stage.getBoundingClientRect(); if (r.width < 10 || r.height < 10) return;
    const avH = Math.max(100, r.height - 2);
    app.W = Math.round(clamp((H * r.width) / avH, 1500, 1900));
    scale = Math.max(0.1, Math.min(r.width / app.W, avH / H));
    dpr = window.devicePixelRatio || 1; app.base = scale * dpr;
    cv.style.width = app.W * scale + 'px'; cv.style.height = H * scale + 'px';
    cv.width = Math.round(app.W * scale * dpr); cv.height = Math.round(H * scale * dpr);
    render();
  }
  window.addEventListener('resize', resize);
  if (window.ResizeObserver) new ResizeObserver(() => resize()).observe(stage);

  const paintLegend = () => document.querySelectorAll('.sw[data-own]').forEach((e) => { e.style.background = ownerColor(e.dataset.own); });
  const paintStates = () => document.querySelectorAll('.sw[data-st]').forEach((e) => { e.style.background = sc(e.dataset.st); });
  function applyTheme(name) {
    setTheme(name); keep('theme', name); paintLegend(); paintStates();
    const b = document.getElementById('bTheme'); if (b) b.textContent = THEME === 'dark' ? 'Light' : 'Dark';
    ANIM.key = ''; render();
  }
  app.setTheme = applyTheme;

  /* Retractable side panel and its sections */
  const setSide = (open, persist = true) => {
    root.classList.toggle('side-open', open); app.sideOpen = open; if (persist) keep('side', open ? 1 : 0);
    document.getElementById('sideTabTxt').textContent = open ? 'Hide panels  \u25B8' : '\u25C2  Key figures and legend';
    document.getElementById('bPanels').classList.toggle('on', open);
  };
  const sv = saved('side'); setSide(params.has('panel') ? params.get('panel') === '1' : sv === null ? window.innerWidth >= 1800 : sv === '1', false);
  document.getElementById('sideTab').onclick = () => setSide(!app.sideOpen);
  document.getElementById('bPanels').onclick = () => setSide(!app.sideOpen);
  document.querySelectorAll('#side details').forEach((d) => {
    const v = saved('d_' + d.dataset.k); d.open = v === null ? d.dataset.k !== 'legend' : v === '1';
    d.addEventListener('toggle', () => keep('d_' + d.dataset.k, d.open ? 1 : 0));
  });

  const bPlay = document.getElementById('bPlay');
  const setPlaying = (p) => { app.playing = p; bPlay.textContent = p ? 'Pause' : 'Play'; bPlay.classList.toggle('on', p); };
  bPlay.onclick = () => setPlaying(!app.playing);
  document.getElementById('bRestart').onclick = () => { app.t0 = app.t; app.tourT0 = app.t; feedKey = ''; render(); };
  document.querySelectorAll('#gSpeed button').forEach((b) => (b.onclick = () => { app.speed = +b.dataset.s; document.querySelectorAll('#gSpeed button').forEach((x) => x.classList.toggle('on', x === b)); }));
  const bTour = document.getElementById('bTour');
  let flowBefore = null;
  function setTour(v) {
    if (v && !app.tourOn) flowBefore = app.flow;
    app.tourOn = v; app.tourT0 = app.t; bTour.classList.toggle('on', v); bTour.textContent = v ? 'Stop tour' : 'Guided tour';
    if (!v) { cap.classList.remove('show'); if (flowBefore && flowBefore !== app.flow) setFlow(flowBefore); flowBefore = null; }
  }
  bTour.onclick = () => setTour(!app.tourOn);
  document.getElementById('bTheme').onclick = () => applyTheme(THEME === 'dark' ? 'light' : 'dark');

  const kpiEl = document.getElementById('kpis'), srcEl = document.getElementById('srcnote'), whoEl = document.getElementById('who');
  let kEls = [];
  function buildSide() {
    const c = cfg.cases[app.uc];
    document.getElementById('sum_kpi').textContent = `Key figures | ${c.code}`;
    kpiEl.innerHTML = c.tiles.map((k, i) => `<div class="kpi" id="kb_${i}" style="--c:${k.color || 'var(--sub)'}"><div class="v" id="k_${i}"></div><div class="l">${k.l}</div><span class="tg">${tagSpan(k.tag || 'I')}</span></div>`).join('');
    kEls = c.tiles.map((k, i) => [document.getElementById('k_' + i), document.getElementById('kb_' + i)]);
    whoEl.innerHTML = `<div class="pl">${c.personas.map((p) => `<span>${p}</span>`).join('')}</div><p><b>Discovery question.</b> ${c.ask}</p><p><b>KPIs to baseline (no targets claimed).</b> ${c.kpis.join('; ')}.</p>`;
    srcEl.innerHTML = `<b>Source of truth:</b> ${SRCNAME} (${c.code}, ${c.name}); research briefs 01 to 05 and sources.md. <b>Availability and caveats:</b> ${c.N.caveat} <b>Boundary:</b> ${c.tobe.stays} Layouts, IDs, timings and animated counts are simulated.`;
  }
  const hash = () => history.replaceState(null, '', `${location.pathname}${location.search.replace(/[?&]t=[^&]*/, '')}#${cfg.cases[app.uc].id}/${app.flow}`);

  /* The scenario clock. Steps of SD seconds; 'story' = Today steps then Cloud Control steps. */
  const counts = () => { const c = cfg.cases[app.uc]; return [phaseSteps(c, 'legacy').length, phaseSteps(c, 'tobe').length]; };
  const spanSteps = (flow = app.flow) => { const [a, b] = counts(); return flow === 'story' ? a + b : flow === 'legacy' ? a : b; };
  app.span = () => spanSteps() * SD;
  function timeline() {
    const [nL, nT] = counts(), total = spanSteps(), g = mod((app.t - app.t0) / SD, total);
    let mode, local, n;
    if (app.flow === 'legacy') { mode = 'legacy'; local = g; n = nL; }
    else if (app.flow === 'tobe') { mode = 'tobe'; local = g; n = nT; }
    else if (g < nL) { mode = 'legacy'; local = g; n = nL; } else { mode = 'tobe'; local = g - nL; n = nT; }
    // a short fade at every story seam hides the switch between phases
    let fade = 0;
    if (app.flow === 'story') { const d = Math.min(Math.abs(g - nL), Math.min(g, total - g)); fade = clamp(1 - d / 0.11, 0, 1); }
    return { mode, u: local / n, i: Math.min(n - 1, Math.floor(local)), g, fade };
  }
  app.u = () => timeline().u;

  function setUC(i) {
    app.uc = mod(i, N); app.t0 = app.t; feedKey = '';
    document.querySelectorAll('#tabs button').forEach((b) => b.classList.toggle('on', +b.dataset.i === app.uc));
    const on = document.querySelector('#tabs button.on'); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    buildSide(); hash();
  }
  function setFlow(f) {
    if (app.flow !== f) { app.flow = f; app.t0 = app.t; feedKey = ''; }
    document.querySelectorAll('[data-tg="mode"] button').forEach((x) => x.classList.toggle('on', x.dataset.v === app.flow)); hash();
  }
  function setAud(a) {
    app.aud = a; keep('aud', a); feedKey = '';
    document.querySelectorAll('[data-tg="aud"] button').forEach((x) => x.classList.toggle('on', x.dataset.v === a));
  }
  app.setUC = setUC; app.setMode = setFlow; app.setFlow = setFlow; app.setAud = setAud;
  document.querySelectorAll('#tabs button').forEach((b) => (b.onclick = () => { if (app.tourOn) setTour(false); setUC(+b.dataset.i); }));
  document.querySelectorAll('[data-tg="mode"] button').forEach((b) => (b.onclick = () => { if (app.tourOn) setTour(false); setFlow(b.dataset.v); }));
  document.querySelectorAll('[data-tg="aud"] button').forEach((b) => (b.onclick = () => setAud(b.dataset.v)));
  document.getElementById('bPrev').onclick = () => setUC(app.uc - 1);
  document.getElementById('bNext').onclick = () => setUC(app.uc + 1);
  const FLOWS = ['story', 'legacy', 'tobe'];
  window.addEventListener('keydown', (e) => {
    if (e.target && /input|textarea/i.test(e.target.tagName)) return;
    if (e.code === 'Space') { setPlaying(!app.playing); e.preventDefault(); }
    if (e.key === 'ArrowRight') setUC(app.uc + 1);
    if (e.key === 'ArrowLeft') setUC(app.uc - 1);
    if (e.key === 'm' || e.key === 't') setFlow(FLOWS[(FLOWS.indexOf(app.flow) + 1) % 3]);
    if (e.key === '1') setAud('exec'); if (e.key === '2') setAud('dir'); if (e.key === '3') setAud('eng');
    if (e.key === 'd') applyTheme(THEME === 'dark' ? 'light' : 'dark');
    if (e.key === 'p') setSide(!app.sideOpen);
  });

  let mouse = null;
  stage.addEventListener('mousemove', (e) => { const r = cv.getBoundingClientRect(); mouse = { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale, cx: e.clientX, cy: e.clientY }; });
  stage.addEventListener('mouseleave', () => { mouse = null; });
  stage.addEventListener('click', (e) => {
    const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / scale, y = (e.clientY - r.top) / scale;
    const hit = app.stepBoxes.find((b) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h);
    if (hit) {
      const [nL] = counts(), isT = hit.i >= nL;
      if (app.tourOn) setTour(false);
      if ((isT && app.flow === 'legacy') || (!isT && app.flow === 'tobe')) setFlow('story');
      const local = app.flow === 'tobe' ? hit.i - nL : hit.i;
      app.t0 = app.t - (local + 0.02) * SD; feedKey = ''; render();
    }
  });

  app.hot = (id, x, y, w, h, info) => { app.hots.push({ id, x, y, w, h, info }); };
  app.find = (id) => { for (let i = app.hots.length - 1; i >= 0; i--) if (app.hots[i].id === id) return app.hots[i]; return null; };

  function tipHTML(info) {
    const o = OWNER[info.owner] || OWNER.hosp, k = info.tag || 'I';
    const st = info.state && STATE_NAME[info.state] ? `<span class="chip" style="background:${sc(info.state)};color:${info.state === 'warn' ? '#1d2327' : '#fff'}">${STATE_NAME[info.state]}</span>` : '';
    return `<div class="tt">${tagSpan(k)}${info.title}</div><div class="chips"><span class="chip" style="background:${o[1]()}">${o[0]}</span>${st}<span class="chip" style="background:${k === 'S' ? 'var(--ink)' : k === 'H' ? COL.cisco : '#8a959c'}">${TAGTXT[k]}</span></div><div>${info.body || ''}</div>${info.src ? `<div class="src">Source: ${info.src}</div>` : ''}`;
  }
  let tipFor = null;
  function showTip(h, px, py) {
    const html = tipHTML(h.info), key = h.id + app.aud + THEME;
    if (tipFor !== key) { tip.innerHTML = html; tipFor = key; }
    const sr = stage.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    let x = px + 16, y = py + 16;
    if (x + tw > sr.width - 8) x = px - tw - 16;
    if (y + th > sr.height - 8) y = sr.height - th - 8;
    tip.style.left = Math.max(8, x) + 'px'; tip.style.top = Math.max(8, y) + 'px'; tip.classList.add('show');
  }
  const hideTip = () => { tip.classList.remove('show'); tipFor = null; };

  let feedKey = '';
  const feedEl = document.getElementById('feed'), clockEl = document.getElementById('clock');
  const tourSteps = () => cfg.tour(cfg.cases[app.uc]);
  function tourStep() {
    if (!app.tourOn) return null;
    const tour = tourSteps(), len = tour.reduce((a, s) => a + s.dur, 0);
    let tt = mod(app.t - app.tourT0, len), i = 0;
    while (tt >= tour[i].dur) { tt -= tour[i].dur; i++; }
    return { i, n: tour.length, s: tour[i], u: tt / tour[i].dur };
  }

  function render() {
    const ts = tourStep();
    if (ts && ts.s.mode && ts.s.mode !== app.flow) setFlow(ts.s.mode);
    const tl = timeline(); app.mode = tl.mode; app.cur = tl; app.fade = tl.fade;
    app.focus = ts ? ts.s.focus + '_' + app.mode : null;
    OVERFLOW.length = 0; app.hots = []; app.stepBoxes = [];
    ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
    ctx.clearRect(0, 0, app.W, H);
    ctx.fillStyle = T.bg; ctx.fillRect(0, 0, app.W, H);
    const c = cfg.cases[app.uc];
    cfg.draw(c, app.mode, tl.u, app.t, app);
    window.__overflow = OVERFLOW.slice();
    if (app.focus) {
      const h = app.find(app.focus);
      if (h) {
        const p = 0.5 + 0.5 * Math.sin(app.t * 5);
        D.box(h.x - 6, h.y - 6, h.w + 12, h.h + 12, { stroke: COL.data, lw: 3, r: 10, dash: [8, 5] });
        D.box(h.x - 10 - p * 3, h.y - 10 - p * 3, h.w + 20 + p * 6, h.h + 20 + p * 6, { stroke: tint(COL.data, 0.35), lw: 2, r: 13 });
        const cr = cv.getBoundingClientRect(), sr = stage.getBoundingClientRect();
        const right = (h.x + h.w) * scale + (cr.left - sr.left);
        const px = right + 360 < sr.width ? right + 4 : h.x * scale + (cr.left - sr.left) - 380;
        showTip(h, px, Math.max(70, (h.y + h.h * 0.3) * scale + (cr.top - sr.top) - 60));
      } else hideTip();
    } else if (mouse) {
      let hit = null;
      for (let i = app.hots.length - 1; i >= 0; i--) { const h = app.hots[i]; if (mouse.x >= h.x && mouse.x <= h.x + h.w && mouse.y >= h.y && mouse.y <= h.y + h.h) { hit = h; break; } }
      const onStep = app.stepBoxes.some((b) => mouse.x >= b.x && mouse.x <= b.x + b.w && mouse.y >= b.y && mouse.y <= b.y + b.h);
      if (hit) { const sr = stage.getBoundingClientRect(); showTip(hit, mouse.cx - sr.left, mouse.cy - sr.top); stage.style.cursor = onStep ? 'pointer' : 'help'; }
      else { hideTip(); stage.style.cursor = 'default'; }
    } else hideTip();
    if (ts) {
      cap.querySelector('.st').textContent = `Step ${ts.i + 1} of ${ts.n} | ${ts.s.title}`;
      cap.querySelector('.cx').textContent = ts.s.cap(app.aud);
      cap.querySelector('.bar i').style.width = (ts.u * 100).toFixed(1) + '%';
      cap.classList.add('show');
    }
    c.tiles.forEach((k, i) => {
      const v = app.mode === 'tobe' ? k.b : k.a;
      if (kEls[i] && kEls[i][0].textContent !== v) { kEls[i][0].textContent = v; kEls[i][0].title = v; }
      if (kEls[i]) kEls[i][1].classList.toggle('hl', app.mode === 'tobe' && k.a !== k.b);
    });
    const items = cfg.feed(c, app).slice(-6);
    const key = app.uc + app.mode + app.aud + items.map((m) => m.k).join('|');
    if (key !== feedKey) {
      feedKey = key;
      feedEl.innerHTML = items.slice().reverse().map((m, i) => `<div class="m${i ? '' : ' new'}" style="--c:${m.color || COL.data}"><span class="ts">${m.ts}</span><b>${m.src}</b> ${m.msg}</div>`).join('');
    }
    clockEl.textContent = `${c.code} | ${AUDNAME[app.aud]} | ${app.flow === 'story' ? 'Story' : app.flow === 'legacy' ? 'Today only' : 'Cloud Control only'} | sim t = ${app.t.toFixed(1)} s`;
  }

  function step(dt) { app.dt = dt; app.t += dt; render(); }
  let last = performance.now();
  function frame(now) {
    const rdt = Math.min(0.1, (now - last) / 1000); last = now;
    if (app.playing) step(rdt * app.speed); else { app.dt = 0; render(); }
    requestAnimationFrame(frame);
  }
  window.__rec = { step(dt) { step(dt); return app.t; }, ready: true };
  const hs = location.hash.match(/^#([a-z0-9]+)(?:\/(story|legacy|tobe))?/);
  if (hs && !params.has('uc')) { const k = cfg.cases.findIndex((c) => c.id === hs[1]); if (k >= 0) app.uc = k; if (hs[2] && !flowParam) app.flow = hs[2]; }
  app.t0 = 0; app.t = +(params.get('t') || 0);
  setUC(app.uc); setFlow(app.flow); setAud(app.aud);
  if (params.has('u')) app.t0 = app.t - clamp(+params.get('u'), 0, 0.9999) * spanSteps() * SD;
  paintLegend(); paintStates(); document.getElementById('bTheme').textContent = THEME === 'dark' ? 'Light' : 'Dark';
  if (params.has('tour')) setTour(true);
  if (!app.playing) setPlaying(false);
  resize();
  requestAnimationFrame(frame);
  return app;
}
