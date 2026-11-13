/* Library (home page): cards for every use case in this edition, search, filters by category and pillar,
   and a presentation queue the presenter builds and plays in order. The queue is kept in localStorage. */
(function library() {
  const $ = (id) => document.getElementById(id);
  const cat = ATLAS.catalog, hasAccount = ED.id !== 'general';
  const CATS = ['Flagship', 'Infrastructure', 'AI'].concat(hasAccount ? ['Account'] : []);
  const PILLARS = ['Security', 'Facilities', 'AI'];
  const f = { q: '', cat: 'All', pillar: 'All' };
  const total = cat.length;
  $('lead').textContent = `${total} ${total === 1 ? 'story' : 'stories'} on hospital floor plans. Each one shows today, then the same event with Cisco Cloud Control (modeled). You set the pace: nothing advances until you press Next.`;

  const chips = (el, list, key) => {
    el.innerHTML = ['All'].concat(list).map((v) => `<button class="chip${f[key] === v ? ' on' : ''}" data-v="${v}" aria-pressed="${f[key] === v}">${v}</button>`).join('');
    el.querySelectorAll('button').forEach((b) => (b.onclick = () => { f[key] = b.dataset.v; chips(el, list, key); render(); }));
  };
  chips($('fCat'), CATS, 'cat'); chips($('fPillar'), PILLARS, 'pillar');
  $('q').addEventListener('input', (e) => { f.q = e.target.value.trim().toLowerCase(); render(); });

  const match = (c) => {
    if (f.cat !== 'All' && (f.cat === 'Account' ? !c.account : c.category !== f.cat || c.account)) return false;
    if (f.pillar !== 'All' && !c.pillars.includes(f.pillar)) return false;
    if (f.q) { const hay = [c.name, c.short, c.situation, c.setting, c.code, c.category, c.pillars.join(' '), (c.keywords || []).join(' ')].join(' ').toLowerCase(); if (!f.q.split(/\s+/).every((w) => hay.includes(w))) return false; }
    return true;
  };
  const card = (c) => `<article class="card" data-id="${c.id}">
    <a class="open" href="play.html?uc=${c.id}" aria-label="Present: ${esc(c.name)}">
      <canvas data-thumb="${c.id}" width="730" height="330"></canvas>
      <div class="body"><div class="meta"><span class="pill ${c.account ? 'acct' : 'cat'}">${c.account ? 'Your organization' : c.category}</span><span class="code">${esc(c.code)} | ${esc(c.short)}</span></div>
      <h3>${esc(c.name)}</h3><p class="sit">${esc(c.situation)}</p>
      <div class="meta">${c.pillars.map((p) => `<span class="pill">${p}</span>`).join('')}</div></div></a>
    <div class="foot"><span class="steps">${c.steps} steps: ${c.today} today, ${c.cisco} with Cloud Control</span>
      <button class="btn qbtn" data-q="${c.id}"></button></div></article>`;

  function render() {
    const shown = cat.filter(match), shared = shown.filter((c) => !c.account), acct = shown.filter((c) => c.account);
    const anyAcct = cat.some((c) => c.account);
    const sharedHtml = f.cat !== 'Account' ? `<h2>Use cases</h2><p class="note">Shared stories. Figures tagged S are public sources, H are hypotheses to validate, and floor plan layouts are illustrative.</p>${shared.length ? `<div class="grid">${shared.map(card).join('')}</div>` : '<div class="empty">No use case matches these filters.</div>'}` : '';
    const acctHtml = hasAccount ? `<h2 id="acctHead">For ${esc(ED.org || 'your organization')}: hypotheses to validate</h2><p class="note">These stories are written from public information about your organization and are hypotheses to confirm with you, not findings.</p>${acct.length ? `<div class="grid acct">${acct.map(card).join('')}</div>` : `<div class="empty" id="acctEmpty">${anyAcct ? 'No account use case matches these filters.' : 'No account use cases have been added to this edition yet.'}</div>`}` : '';
    // the account section leads once it has stories; while it is empty it stays below the shared ones
    const html = anyAcct ? acctHtml + sharedHtml : sharedHtml + acctHtml;
    $('lists').innerHTML = html;
    $('count').textContent = `Showing ${shown.length} of ${total} use cases`;
    document.querySelectorAll('[data-q]').forEach((b) => (b.onclick = () => { Queue.toggle(b.dataset.q); paintQueue(); }));
    paintQueue(); thumbs();
  }

  function paintQueue() {
    const q = Queue.get();
    // the list is redrawn: keep keyboard focus on the same control, or on the nearest one that still exists
    const a = document.activeElement, inList = a && a.closest && a.closest('#qList');
    const keep = inList ? { m: a.dataset.m, d: a.dataset.d, x: a.dataset.x, i: Array.from($('qList').children).indexOf(a.closest('li')) } : null;
    document.querySelectorAll('[data-q]').forEach((b) => { const on = q.includes(b.dataset.q); b.textContent = on ? 'In queue: remove' : 'Add to queue'; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    $('qList').innerHTML = q.map((id, i) => { const c = byId(id); return `<li><span class="n">${i + 1}</span><span class="t">${esc(c.name)}</span>
      <button data-m="${id}" data-d="-1" title="Move up" aria-label="Move up" ${i === 0 ? 'disabled' : ''}>&#8593;</button><button data-m="${id}" data-d="1" title="Move down" aria-label="Move down" ${i === q.length - 1 ? 'disabled' : ''}>&#8595;</button><button data-x="${id}" title="Remove" aria-label="Remove from queue">&times;</button></li>`; }).join('');
    $('qEmpty').hidden = q.length > 0;
    $('qPlay').disabled = !q.length; $('qClear').disabled = !q.length;
    $('qPlay').textContent = q.length ? `Play queue (${q.length})` : 'Play queue';
    $('qList').querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => { Queue.move(b.dataset.m, +b.dataset.d); paintQueue(); }));
    $('qList').querySelectorAll('[data-x]').forEach((b) => (b.onclick = () => { Queue.toggle(b.dataset.x); paintQueue(); }));
    if (keep) {
      const same = keep.m ? $('qList').querySelector(`[data-m="${keep.m}"][data-d="${keep.d}"]`) : null;
      const li = $('qList').children[Math.min(keep.i, q.length - 1)];
      const t = same && !same.disabled ? same : same ? $('qList').querySelector(`[data-m="${keep.m}"]:not([disabled])`) : li ? li.querySelector('[data-x]') : $('qPlay').disabled ? $('q') : $('qPlay');
      if (t) t.focus();
    }
  }
  $('qPlay').onclick = () => { const q = Queue.get(); if (q.length) location.href = `play.html?uc=${q[0]}&queue=1`; };
  $('qClear').onclick = () => { Queue.set([]); paintQueue(); };

  /* Thumbnails: the floor plan of each story at its first step, drawn once with all text muted. */
  function thumbs() {
    document.querySelectorAll('canvas[data-thumb]').forEach((cv) => {
      const c = ATLAS.cases[cv.dataset.thumb]; if (!c) return;
      try {
        prepareCase(c);
        const W = cv.width, H = cv.height, k = W / 730;
        ctx = cv.getContext('2d'); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = T.bg; ctx.fillRect(0, 0, W, H);
        ctx.save(); ctx.scale(k, k); ctx.translate(-5, -44);
        TEXTSTAT.mute = true; VIEWK = 1; ANIM.key = '';
        const sv = c.scene.noLegacyBand; c.scene.noLegacyBand = true;
        drawUCScene(c, 'legacy', 0, 1, 3, { dt: 0, aud: 'exec' });
        c.scene.noLegacyBand = sv;
        ctx.restore();
      } catch (e) { console.error('thumbnail ' + cv.dataset.thumb + ': ' + e.message); }
      TEXTSTAT.mute = false;
    });
  }
  initTheme(() => render());
  render();
})();
