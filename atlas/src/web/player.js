/* Presenter view. One story on screen, and it never moves on by itself:
   a step changes only on Right / Space / PageDown, a click on Next, or a click on the progress strip.
   Inside a step the entry animation plays once (su runs 0 to 1) and settles; ambient motion keeps going.
   The approval is a real button and waits for a click or Enter. Auto (12 s per step) exists but is off by default. */
(function player() {
  const params = new URLSearchParams(location.search);
  const ucId = params.get('uc') || (ATLAS.catalog[0] && ATLAS.catalog[0].id);
  const meta = byId(ucId);
  if (!meta) return fatal('This use case is not in this edition.', [`Requested: "${ucId}". Go back to the library and pick a use case from the list.`]);
  const queueMode = params.has('queue');
  const s = document.createElement('script'); s.src = `data/uc-${ucId}.js`;
  s.onload = () => { try { start(prepareCase(ATLAS.cases[ucId])); } catch (e) { fatal('This use case cannot be shown.', String(e.message).split('; ')); } };
  s.onerror = () => fatal('The data file for this use case did not load.', [s.src]);
  document.head.appendChild(s);

  function start(c) {
    const AUTO_SECONDS = 12, ENTRY_SECONDS = 1.5;
    const AUD = { exec: 'Executive', dir: 'IT director', eng: 'Engineering' };
    const nL = phaseSteps(c, 'legacy').length, nT = phaseSteps(c, 'tobe').length, nSteps = nL + nT, SUMMARY = nSteps;
    const $ = (id) => document.getElementById(id);
    const st = { pos: 0, enter: 0, t: 0, dt: 0, aud: ['exec', 'dir', 'eng'].includes(params.get('aud')) ? params.get('aud') : store.get('aud', 'exec'), approved: new Set(), auto: false, fade: 0, drawer: false, lastMode: null };
    const stepAt = (p) => (p < nL ? { mode: 'legacy', i: p, s: phaseSteps(c, 'legacy')[p] } : { mode: 'tobe', i: p - nL, s: phaseSteps(c, 'tobe')[p - nL] });
    const queue = queueMode ? Queue.get() : [], qi = queue.indexOf(c.id);
    const nextInQueue = queueMode && qi >= 0 && qi < queue.length - 1 ? byId(queue[qi + 1]) : null;

    document.title = `${c.name} | ${ED.label}`;
    $('ucCode').textContent = c.code; $('ucName').textContent = c.name; $('ucName').title = c.name;
    $('qpos').textContent = queueMode && qi >= 0 ? `Queue ${qi + 1} of ${queue.length}` : '';
    $('qpos').hidden = !(queueMode && qi >= 0);

    /* ---------- progress strip ---------- */
    const strip = $('strip');
    const group = (cls, label, from, n, sum) => `<div class="grp ${cls}" style="flex:${n} 1 0"><div class="gl ${cls}">${label}</div><div class="segs">${Array.from({ length: n }, (_, k) => {
      const p = from + k, t = sum ? 'Summary' : `Step ${p + 1}: ${stepAt(p).s.title}`;
      return `<button data-p="${p}" title="${esc(t)}" aria-label="${esc(t)}">${sum ? 'Summary' : p + 1}</button>`;
    }).join('')}</div></div>`;
    strip.innerHTML = group('t', 'Today', 0, nL) + group('c', 'With Cisco Cloud Control (modeled)', nL, nT) + group('s', 'Close', SUMMARY, 1, true);
    strip.querySelectorAll('button').forEach((b) => (b.onclick = (e) => { go(+b.dataset.p); if (e.detail) b.blur(); }));

    /* ---------- the now card ---------- */
    function support(q, p) {
      const m = q.s.modal;
      if (m) {
        const done = st.approved.has(p);
        return `<div class="approval${done ? ' done' : ''}" id="approval"><div class="hd"><b>${esc(m.title)}</b><span>Simulated</span></div>
          <ul>${m.lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
          <div class="act"><button class="ok" id="bApprove" ${done ? 'disabled' : ''}>${done ? 'Approved' : esc(m.button || 'Approve')}</button>
          <span class="hint">${done ? 'Recorded in the audit log.' : 'A named person decides. Click or press Enter.'}</span></div></div>`;
      }
      const f = (q.s.facts || [])[0];
      if (f) {
        const k = /gap/i.test(f.s) ? 'H' : 'S', more = q.s.facts.length - 1;
        return `<div class="fact"><div class="v">${esc(f.v)}</div><div class="l">${esc(f.l)}</div><div class="s">${tagSpan(k)}<span>${esc(f.s)}</span></div>${more ? `<div class="s">${more} more sourced ${more === 1 ? 'figure' : 'figures'} for this step in Details.</div>` : ''}</div>`;
      }
      if (q.s.chips && q.s.chips.length) {
        return `<div class="status"><h4>${tagSpan('S')}Product status</h4>${q.s.chips.slice(0, 4).map((x) => `<div><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}</div>`;
      }
      return '';
    }
    function paintCard() {
      const p = st.pos;
      document.body.classList.toggle('sum', p === SUMMARY);
      strip.querySelectorAll('button').forEach((b) => { const k = +b.dataset.p; b.classList.toggle('cur', k === p); b.classList.toggle('done', k < p); if (k === p) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      $('bBack').disabled = p === 0;
      const bn = $('bNext');
      if (p === SUMMARY) {
        document.body.classList.remove('today', 'cc');
        bn.textContent = nextInQueue ? 'Next story' : 'Library'; bn.title = nextInQueue ? nextInQueue.name : 'Back to the use case library';
        paintSummary(); location.replace('#summary'); return;
      }
      const q = stepAt(p), tobe = q.mode === 'tobe';
      document.body.classList.toggle('today', !tobe); document.body.classList.toggle('cc', tobe);
      const blocked = q.s.modal && !st.approved.has(p);
      bn.textContent = blocked ? 'Approve first' : p === SUMMARY - 1 ? 'Summary' : 'Next'; bn.title = blocked ? 'This step waits for the approval. Click Approve or press Enter.' : 'Right arrow, Space or Page Down';
      bn.classList.toggle('primary', !blocked);
      const ph = tobe ? 'WITH CISCO CLOUD CONTROL' : 'TODAY';
      $('stagePh').textContent = tobe ? 'WITH CISCO CLOUD CONTROL (MODELED)' : 'TODAY';
      $('stageSet').textContent = c.setting; $('stageSet').title = c.setting;
      $('now').innerHTML = `<div class="row1"><span class="ph">${ph}</span><span class="cnt">Step ${p + 1} of ${nSteps}</span></div>
        <h2 id="stepTitle">${esc(q.s.title)}</h2>
        <div class="seg" id="aud" role="group" aria-label="Audience wording">${Object.entries(AUD).map(([k, v], n) => `<button data-v="${k}" class="${k === st.aud ? 'on' : ''}" aria-pressed="${k === st.aud}" title="${v} wording (${n + 1})">${v}</button>`).join('')}</div>
        <p class="say" id="say">${esc(q.s.say[st.aud])}</p>
        <div id="support">${support(q, p)}</div>
        <div class="more"><button id="bMore" title="Gaps, console, data path, outcomes, sources and legend (I)">Details</button><span>${tobe ? 'Modeled outcome' : c.legacy.who ? esc(c.legacy.who) : ''}</span></div>`;
      const ba = $('bApprove'); if (ba) ba.onclick = (e) => { approve(); };
      document.querySelectorAll('#aud button').forEach((b) => (b.onclick = () => setAud(b.dataset.v)));
      $('bMore').onclick = (e) => { setDrawer(true); if (e.detail) e.currentTarget.blur(); };
      location.replace('#' + (p + 1));
      fitCard();
    }
    /* The card never scrolls and never clips: if a long step does not fit, the type steps down, never under the floor. */
    function fitCard() {
      const now = $('now'), h2 = $('stepTitle'), say = $('say'); if (!h2) return;
      h2.style.fontSize = ''; say.style.fontSize = ''; now.classList.remove('tight');
      let a = parseFloat(getComputedStyle(h2).fontSize), b = parseFloat(getComputedStyle(say).fontSize), guard = 0;
      while (now.scrollHeight > now.clientHeight + 1 && guard++ < 12 && (a > 30 || b > 20)) {
        if (a > 30) a -= 1; if (b > 20) b -= 0.5;
        h2.style.fontSize = a + 'px'; say.style.fontSize = b + 'px';
      }
      // still too tall (a long approval on a small screen): the card closes up its spacing; no text goes under 14px
      if (now.scrollHeight > now.clientHeight + 1) now.classList.add('tight');
      window.__cardOverflow = now.scrollHeight > now.clientHeight + 1 ? `${c.id} step ${st.pos + 1}: the card content is taller than the card` : '';
    }

    function paintSummary() {
      const outs = (list) => list.map((o) => `<div class="out"><div class="v">${esc(o[0])}</div><div class="l">${esc(o[1])}</div>${tagSpan(o[2])}</div>`).join('');
      $('summary').innerHTML = `<div class="sh"><h2>Summary: ${esc(c.name)}</h2><span>${esc(c.pillars.join(', '))}</span></div>
        <div class="cols grow">
          <div class="col t"><h3>Today</h3><p class="recap">${withTags(c.legacy.recap || c.N.subtitle)}</p>${outs(c.outcomes.legacy)}</div>
          <div class="col c"><h3>With Cisco Cloud Control (modeled, not forecast)</h3><p class="recap">${withTags((c.tobe.recap || [c.vision])[0])}</p>${outs(c.outcomes.tobe)}</div>
        </div>
        <div class="cols grow">
          <div class="col q"><h3>The question to ask</h3><p class="big">${esc(c.ask)}</p></div>
          <div class="col k"><h3>Stays with the hospital and its vendors</h3><p class="body">${esc(c.tobe.stays)}</p><p class="kp"><b>KPIs to baseline in a pilot, no targets claimed:</b> ${esc(c.kpis.join('; '))}.</p></div>
        </div>
        <p class="cav">${tagSpan('S')} sourced figure. ${tagSpan('H')} hypothesis to validate with the customer. ${tagSpan('I')} illustrative. ${esc(c.N.caveat)} Layouts, IDs, timings and counts in the floor plan are simulated.</p>`;
    }

    /* ---------- details drawer ---------- */
    function paintDrawer() {
      const facts = []; c.N.steps.forEach((x) => (x.facts || []).forEach((f) => facts.push(f)));
      const ownerRows = Object.entries(OWNER).map(([k, v]) => `<div class="lg"><span class="sw${k === 'data' ? ' dot' : ''}" style="background:${v[1]()}"></span>${esc(v[0])}</div>`).join('');
      const stateRows = [['ok', 'Healthy'], ['warn', 'Warning'], ['down', 'Down, shown with a red cross'], ['pending', 'Waiting for a person to approve'], ['unknown', 'Unknown or not instrumented']].map(([k, n]) => `<div class="lg"><span class="sw dot" style="background:${sc(k)}"></span>${n}</div>`).join('');
      const cs = c.tobe.console;
      $('drawerBody').innerHTML = `
        <section><h4>The situation</h4><p>${withTags(c.legacy.banner)}</p><p class="note">Setting: ${esc(c.setting)}. Roles in this story: ${esc(c.personas.join(', '))}.</p></section>
        <section><h4 class="t">What is missing today</h4><ul class="x">${c.legacy.gaps.map((g) => `<li>${withTags(g)}</li>`).join('')}</ul><p class="note"><b>${esc(c.legacy.big[0])}</b> ${withTags(c.legacy.big[1])}</p><p class="note">${withTags(c.legacy.strip)}</p></section>
        <section><h4 class="t">Separate tools today ${tagSpan('H')}</h4><table><tr><th>Tool</th><th>What it sees</th></tr>${c.legacy.silos.map((x) => `<tr><td>${esc(x[0])}</td><td>${withTags(x[1])}</td></tr>`).join('')}</table><p class="note">Which tools a given hospital runs is not public. These are hypotheses to confirm in discovery.</p></section>
        <section><h4 class="c">With Cisco Cloud Control (modeled)</h4><p>${withTags(c.tobe.banner)}</p><p class="note">In this story: ${withTags(c.tobe.strip)}.</p><p class="note">${esc(c.vision)}</p></section>
        <section><h4 class="c">${esc(cs.title)} ${tagSpan('I')}</h4><table><tr><th>Item</th><th>Today</th><th>With Cloud Control</th></tr>${cs.rows.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td class="now">${esc(r[2])}</td></tr>`).join('')}</table><p class="note">${esc(cs.body)} Values on this screen are simulated.${cs.foot ? ' ' + esc(cs.foot) + '.' : ''}</p></section>
        <section><h4 class="t">Data path today</h4><div class="hops">${c.hops.legacy.map((h, k) => `<div>${k + 1}. <b>${esc(h[0])}</b> <span>${esc(h[1])}</span></div>`).join('')}</div><p class="note">${withTags(c.pathNote.legacy)}</p></section>
        <section><h4 class="c">Data path with Cloud Control</h4><div class="hops">${c.hops.tobe.map((h, k) => `<div>${k + 1}. <b>${esc(h[0])}</b> <span>${esc(h[1])}</span></div>`).join('')}</div><p class="note">${withTags(c.pathNote.tobe)}</p></section>
        <section><h4>Key figures</h4><table><tr><th>Figure</th><th>Today</th><th>Modeled</th><th></th></tr>${c.tiles.map((k) => `<tr><td>${esc(k.l)}</td><td>${esc(k.a)}</td><td class="${k.a !== k.b ? 'now' : ''}">${esc(k.b)}</td><td>${tagSpan(k.tag || 'I')}</td></tr>`).join('')}</table></section>
        ${facts.length ? `<section><h4>Sourced figures in this story</h4><table>${facts.map((f) => `<tr><td><b>${esc(f.v)}</b></td><td>${esc(f.l)}</td><td>${esc(f.s)}</td><td>${tagSpan(/gap/i.test(f.s) ? 'H' : 'S')}</td></tr>`).join('')}</table></section>` : ''}
        <section><h4>KPIs to baseline in a pilot (no targets claimed)</h4><ul>${c.kpis.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></section>
        <section><h4>Discovery question</h4><p><b>${esc(c.ask)}</b></p></section>
        <section><h4>Stays with the hospital and its vendors</h4><p>${esc(c.tobe.stays)}</p></section>
        <section><h4>Product status ${tagSpan('S')}</h4><table>${c.chips.map((x) => `<tr><td>${esc(x[0])}</td><td>${esc(x[1])}</td></tr>`).join('')}</table><p class="note">Cisco Cloud Control is generally available in the US only (from 25 Aug 2026).</p></section>
        <section><h4>Caveats</h4><p>${esc(c.N.caveat)}</p><p class="note">Outcomes are modeled. No savings, percentages or targets are forecast. Layouts, IDs, timings and animated counts are simulated.</p></section>
        <section><h4>Legend</h4>${ownerRows}${stateRows}
          <div class="lg">${tagSpan('S')}<span><b>Sourced</b>: public source cited in the research briefs</span></div>
          <div class="lg">${tagSpan('H')}<span><b>Hypothesis</b>: to validate with the customer</span></div>
          <div class="lg">${tagSpan('I')}<span><b>Illustrative</b>: simulated layout, IDs and timings</span></div></section>
        <section style="border:0"><h4>Keys</h4><p>Right arrow, Space or Page Down: next step. Left arrow or Page Up: back. Enter: approve. 1, 2, 3: audience. I: details. T: theme. A: auto. Home and End: first step and summary. Esc: close this panel.</p></section>`;
    }
    function setDrawer(open) { st.drawer = open; if (open) paintDrawer(); $('drawer').classList.toggle('open', open); $('bDetails').classList.toggle('on', open); $('drawer').setAttribute('aria-hidden', open ? 'false' : 'true'); }
    $('bDetails').onclick = (e) => { setDrawer(!st.drawer); if (e.detail) e.currentTarget.blur(); };
    $('bCloseDrawer').onclick = () => setDrawer(false);

    /* ---------- navigation: the only code that changes the step ---------- */
    function go(p) {
      p = clamp(p, 0, SUMMARY); if (p === st.pos && st.started) return;
      const before = st.pos < SUMMARY ? stepAt(st.pos).mode : null, after = p < SUMMARY ? stepAt(p).mode : null;
      st.pos = p; st.enter = st.t; st.started = true;
      if (after && before !== after) st.fade = 1;
      paintCard();
    }
    function next() {
      if (st.pos === SUMMARY) { if (nextInQueue) location.href = `play.html?uc=${nextInQueue.id}&queue=1`; return; }
      const q = stepAt(st.pos);
      if (q.s.modal && !st.approved.has(st.pos)) { const b = $('bApprove'); if (b) { b.classList.remove('nudge'); void b.offsetWidth; b.classList.add('nudge'); } return; }
      go(st.pos + 1);
    }
    const back = () => go(st.pos - 1);
    function approve() {
      if (st.pos === SUMMARY) return false;
      const q = stepAt(st.pos); if (!q.s.modal || st.approved.has(st.pos)) return false;
      st.approved.add(st.pos); paintCard(); return true;
    }
    function setAud(a) {
      st.aud = a; store.set('aud', a);
      if (st.started) paintCard();
    }
    function setAuto(v) { st.auto = v; st.autoFrom = st.t; $('bAuto').textContent = v ? `Auto: ${AUTO_SECONDS} s` : 'Auto: off'; $('bAuto').classList.toggle('on', v); }
    $('bNext').onclick = (e) => { if (st.pos === SUMMARY && !nextInQueue) { location.href = 'index.html'; return; } next(); if (e.detail) e.currentTarget.blur(); };
    $('bBack').onclick = (e) => { back(); if (e.detail) e.currentTarget.blur(); };
    $('bAuto').onclick = (e) => { setAuto(!st.auto); if (e.detail) e.currentTarget.blur(); };
    const theme = initTheme(() => { ANIM.key = ''; if (st.drawer) paintDrawer(); });

    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const onControl = e.target && e.target.closest && e.target.closest('button,a,input,textarea,select');
      if (e.key === 'Enter') { if (onControl) return; if (approve()) e.preventDefault(); return; }
      if (e.key === ' ' || e.code === 'Space') { if (onControl) return; next(); e.preventDefault(); return; }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { next(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { back(); e.preventDefault(); }
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(SUMMARY);
      else if (e.key === '1') setAud('exec'); else if (e.key === '2') setAud('dir'); else if (e.key === '3') setAud('eng');
      else if (e.key === 'i' || e.key === 'I') setDrawer(!st.drawer);
      else if (e.key === 't' || e.key === 'T') theme.toggle();
      else if (e.key === 'a' || e.key === 'A') setAuto(!st.auto);
      else if (e.key === 'Escape') { if (st.drawer) setDrawer(false); }
    });

    /* ---------- canvas ---------- */
    const cv = $('cv'), wrap = $('cvWrap'), tip = $('tip');
    ctx = cv.getContext('2d');
    let dpr = 1, cw = 0, ch = 0, fit = fitScene(100, 100);
    function resize() {
      const r = wrap.getBoundingClientRect(); if (r.width < 10 || r.height < 10) return;
      dpr = window.devicePixelRatio || 1; cw = r.width; ch = r.height;
      cv.width = Math.round(cw * dpr); cv.height = Math.round(ch * dpr);
      fit = fitScene(cw, ch, 4); fitCard(); draw();
    }
    window.addEventListener('resize', resize);
    if (window.ResizeObserver) new ResizeObserver(resize).observe(wrap);

    let mouse = null, tipFor = null;
    wrap.addEventListener('mousemove', (e) => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
    wrap.addEventListener('mouseleave', () => { mouse = null; });
    function tipHTML(info) {
      const o = OWNER[info.owner] || OWNER.hosp, k = info.tag || 'I';
      const stt = info.state && STATE_NAME[info.state] ? `<span class="chip2" style="background:${sc(info.state)};color:${info.state === 'warn' ? '#1d2327' : '#fff'}">${STATE_NAME[info.state]}</span>` : '';
      return `<div class="tt">${tagSpan(k)}${info.title}</div><div class="chips"><span class="chip2" style="background:${o[1]()}">${o[0]}</span>${stt}</div><div>${info.body || ''}</div><div class="src">${TAGTXT[k]}. Source: ${info.src || SRCNAME}</div>`;
    }
    function hover() {
      if (!mouse || st.pos === SUMMARY) { tip.classList.remove('show'); tipFor = null; return; }
      let hit = null;
      for (let i = HOTS.list.length - 1; i >= 0; i--) { const h = HOTS.list[i]; if (mouse.x >= h.x && mouse.x <= h.x + h.w && mouse.y >= h.y && mouse.y <= h.y + h.h) { hit = h; break; } }
      if (!hit) { tip.classList.remove('show'); tipFor = null; wrap.style.cursor = 'default'; return; }
      const key = hit.id + st.aud + THEME + st.pos;
      if (tipFor !== key) { tip.innerHTML = tipHTML(hit.info); tipFor = key; }
      const tw = tip.offsetWidth, th = tip.offsetHeight;
      let x = mouse.x + 18, y = mouse.y + 18;
      if (x + tw > cw - 8) x = mouse.x - tw - 18;
      if (y + th > ch - 8) y = ch - th - 8;
      tip.style.left = Math.max(8, x) + 'px'; tip.style.top = Math.max(8, y) + 'px'; tip.classList.add('show'); wrap.style.cursor = 'help';
    }

    function draw() {
      if (!cw) return;
      OVERFLOW.length = 0; HOTS.list.length = 0; HOTS.base = dpr; TEXTSTAT.min = 99; TEXTSTAT.dropped.length = 0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, cw, ch);
      if (st.pos === SUMMARY) return;
      const q = stepAt(st.pos), su = clamp((st.t - st.enter) / ENTRY_SECONDS, 0, 1);
      VIEWK = fit.k;
      ctx.save();
      ctx.translate(fit.ox - (SCENE_R[0] - SCENE_PAD[0]) * fit.k, fit.oy - (SCENE_R[1] - SCENE_PAD[1]) * fit.k); ctx.scale(fit.k, fit.k);
      const S = drawUCScene(c, q.mode, q.i, su, st.t, { dt: st.dt, aud: st.aud });
      ctx.restore();
      if (st.fade > 0.01) { ctx.save(); ctx.globalAlpha = st.fade; ctx.fillStyle = T.panel; ctx.fillRect(0, 0, cw, ch); ctx.restore(); }
      window.__audit = { overflow: OVERFLOW.slice(), overlaps: su >= 1 ? auditLabels(S) : [], missing: Array.from(MISSING), minText: TEXTSTAT.min, dropped: TEXTSTAT.dropped.slice(), k: fit.k, card: window.__cardOverflow || '' };
      hover();
    }
    function tick(dt) {
      st.dt = dt; st.t += dt; st.fade = Math.max(0, st.fade - dt * 3.2);
      if (st.auto && st.pos < SUMMARY && st.t - Math.max(st.enter, st.autoFrom || 0) >= AUTO_SECONDS) { st.autoFrom = st.t; next(); }
      draw();
    }
    let last = performance.now();
    function frame(now) { const dt = Math.min(0.1, (now - last) / 1000); last = now; tick(dt); requestAnimationFrame(frame); }

    /* Test and tooling hooks (tools/check.cjs, tools/shoot.cjs). */
    window.__atlas = {
      id: c.id, steps: nSteps, state: () => ({ pos: st.pos, summary: st.pos === SUMMARY, auto: st.auto, approved: Array.from(st.approved), modal: st.pos < SUMMARY && !!stepAt(st.pos).s.modal, aud: st.aud }),
      settle() { st.enter -= ENTRY_SECONDS; st.fade = 0; for (let k = 0; k < 14; k++) tick(0.1); return window.__audit; }, // finish the entry animation now
      go, next, back, approve,
    };

    setAud(st.aud); setAuto(false);
    const fromHash = () => { const h = location.hash.replace('#', ''); return h === 'summary' ? SUMMARY : clamp((parseInt(h, 10) || 1) - 1, 0, SUMMARY); };
    window.addEventListener('hashchange', () => go(fromHash())); // a deep link such as play.html?uc=wifi#4 or #summary
    go(fromHash()); resize();
    requestAnimationFrame(frame);
  }
})();
