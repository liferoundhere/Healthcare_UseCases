/* Shared by the library and the presenter: storage, theme, the queue, small HTML helpers.
   window.ATLAS is created by data/catalog.js (edition, catalog, decorZones). Nothing here names an organization;
   the edition label comes from the data the build wrote for this edition only. */
const ATLAS = window.ATLAS || (window.ATLAS = { edition: { id: 'none', label: '' }, catalog: [], decorZones: {}, cases: {} });
ATLAS.cases = ATLAS.cases || {};
const ED = ATLAS.edition;
const store = {
  key: (k) => `atlas.${ED.id}.${k}`,
  get(k, d) { try { const v = localStorage.getItem(store.key(k)); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(store.key(k), JSON.stringify(v)); } catch { /* storage may be blocked; the page still works */ } },
};
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const tagSpan = (k) => `<span class="tag ${k}" title="${esc(TAGTXT[k] || '')}">${k === 'I' ? 'i' : k}</span>`;
/* "[H]" or "[S]" written inside a sentence becomes the same provenance tag used everywhere else. */
const withTags = (s) => esc(s).replace(/\s*\[(S|H|I)\]/g, (m, k) => ' ' + tagSpan(k));
const byId = (id) => ATLAS.catalog.find((c) => c.id === id);

/* The presentation queue: an ordered list of use case ids, kept per edition in localStorage. */
const Queue = {
  get() { const q = store.get('queue', []); return Array.isArray(q) ? q.filter((id) => byId(id)) : []; },
  set(q) { store.set('queue', q); },
  has(id) { return Queue.get().includes(id); },
  toggle(id) { const q = Queue.get(), i = q.indexOf(id); if (i >= 0) q.splice(i, 1); else q.push(id); Queue.set(q); return q; },
  move(id, d) { const q = Queue.get(), i = q.indexOf(id), j = i + d; if (i < 0 || j < 0 || j >= q.length) return q; q.splice(j, 0, q.splice(i, 1)[0]); Queue.set(q); return q; },
};

function initTheme(onChange) {
  const p = new URLSearchParams(location.search).get('theme');
  setTheme(p || store.get('theme', 'light'));
  const b = document.getElementById('bTheme');
  const paint = () => { if (b) { b.textContent = THEME === 'dark' ? 'Light' : 'Dark'; b.setAttribute('aria-label', THEME === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'); } };
  if (b) b.onclick = (e) => { setTheme(THEME === 'dark' ? 'light' : 'dark'); store.set('theme', THEME); paint(); if (e.detail) b.blur(); onChange && onChange(); };
  paint();
  return { toggle() { b && b.click(); } };
}

function fatal(title, items) {
  const el = document.createElement('div'); el.className = 'fatal'; el.id = 'fatal';
  el.innerHTML = `<h2>${esc(title)}</h2><ul>${items.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`;
  document.body.innerHTML = ''; document.body.appendChild(el);
  console.error('ATLAS: ' + title + ' ' + items.join(' | '));
}

/* Prepares a use case for drawing and fails loudly when something the scene needs is missing.
   The build runs the same checks (build.mjs validateCase); this is the second line of defence. */
function prepareCase(c) {
  const errs = [];
  if (!c.N) errs.push(`${c.id}: no narrative`);
  if (!DECOR[c.scene.decor]) errs.push(`${c.id}: no floor plan called "${c.scene.decor}"`);
  if (c.N) c.N.nodes.forEach((n) => { if (!c.scene.pos[n.id]) errs.push(`${c.id}: node "${n.id}" has no position in scene.pos`); });
  if (errs.length) throw new Error(errs.join('; '));
  Object.assign(DECOR_ZONES, ATLAS.decorZones || {});
  return c;
}

/* Scene geometry for a canvas of w by h CSS pixels: scale and offset that fit the whole scene window. */
function fitScene(w, h, pad = 8) {
  const rw0 = SCENE_R[2] - SCENE_R[0] + 2 * SCENE_PAD[0], rh0 = SCENE_R[3] - SCENE_R[1] + 2 * SCENE_PAD[1];
  const k = Math.max(0.05, Math.min((w - 2 * pad) / rw0, (h - 2 * pad) / rh0));
  return { k, ox: (w - rw0 * k) / 2, oy: (h - rh0 * k) / 2, rw0, rh0 };
}
