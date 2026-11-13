/* Boot: attach the shared narrative to each use case, start the app, optional ?check overflow sweep. */
(function boot() {
  UCS.forEach((c) => {
    c.scene.decor = DECOR[c.id]; if (!c.scene.decor) throw new Error('No floor plan for ' + c.id);
    c.N = NARR.find((s) => s.id === c.id);
    if (!c.N) throw new Error('No narrative for ' + c.id);
    ['legacy', 'tobe'].forEach((m) => { c[m].hops = c.hops[m]; c[m].outcomes = c.outcomes[m]; c[m].pathNote = c.pathNote[m]; });
    const seen = new Map();
    c.N.steps.forEach((s) => (s.chips || []).forEach((q) => seen.set(q[0], q[1])));
    c.chips = Array.from(seen.entries());
    c.tiles.forEach((k) => { k.color = k.tag === 'H' ? 'var(--cisco)' : 'var(--sub)'; });
  });
  const app = createApp({
    title: 'Healthcare infrastructure: interactive 2D models',
    subtitle: 'Thirteen stories on hospital floor plans. Today versus with Cisco Cloud Control (modeled). Click a step, hover anything, or start the guided tour.',
    cases: UCS, tour: tourFor, feed: feedFor,
    draw(c, mode, u, t, a) { drawPage(c, mode, u, t, a); },
  });
  if (new URLSearchParams(location.search).has('check')) {
    const bad = [];
    for (let k = 0; k < UCS.length; k++) {
      for (const m of ['story']) {
        for (const aud of ['exec', 'dir', 'eng']) {
          app.setUC(k); app.setFlow(m); app.setAud(aud); app.tourOn = false; app.playing = false;
          for (let f = 0; f < 18; f++) {
            app.t0 = app.t - ((f + 0.5) / 18) * app.span(); window.__rec.step(0.02);
            (window.__overflow || []).forEach((o) => bad.push(`${UCS[k].id}/${m}/${aud}@${f}: ${o}`));
          }
        }
      }
    }
    window.__check = Array.from(new Set(bad));
    console.log('CHECK overflow count', window.__check.length); window.__check.slice(0, 80).forEach((b) => console.log('OVF', b));
  }
})();
