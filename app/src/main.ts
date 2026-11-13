import "./style.css";
import { Engine } from "./engine";
import { SCENES } from "./scenes";
import type { Aud, SceneDef } from "./types";

const AUD_LABEL: Record<Aud, string> = { exec: "Executive", dir: "IT director", eng: "Engineering" };

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <aside class="side">
    <div class="brand">
      <div class="brand-mark"></div>
      <div>
        <div class="brand-title">Healthcare infrastructure</div>
        <div class="brand-sub">Animated storyboards</div>
      </div>
    </div>
    <nav id="nav"></nav>
    <div class="keys">
      <div><kbd>&larr;</kbd><kbd>&rarr;</kbd> step</div>
      <div><kbd>&uarr;</kbd><kbd>&darr;</kbd> story</div>
      <div><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> audience</div>
      <div><kbd>Space</kbd> play</div>
    </div>
  </aside>
  <main class="main">
    <header class="head">
      <div class="head-text">
        <div class="pillars" id="pillars"></div>
        <h1 id="title"></h1>
        <p id="subtitle"></p>
      </div>
      <div class="aud" id="aud"></div>
    </header>
    <section class="stage-wrap">
      <div class="stage" id="stage">
        <canvas id="cv"></canvas>
        <div class="phase" id="phase"></div>
        <div class="clock" id="clock"><div class="clock-label"></div><div class="clock-val"></div><div class="clock-note">illustrative</div></div>
        <div class="tip" id="tip"></div>
        <div class="modal-back" id="modal">
          <div class="modal">
            <div class="modal-kicker">Approval required</div>
            <h3 id="modal-title"></h3>
            <ul id="modal-lines"></ul>
            <div class="modal-actions">
              <button class="btn ghost" id="modal-later">Not yet</button>
              <button class="btn primary" id="modal-ok"></button>
            </div>
          </div>
        </div>
      </div>
      <div class="controls">
        <button class="btn" id="prev" title="Previous step">&#9664;</button>
        <button class="btn" id="play" title="Autoplay">&#9654; Play</button>
        <div class="dots" id="dots"></div>
        <button class="btn" id="next" title="Next step">&#9654;</button>
        <div class="jump">
          <button class="btn ghost" id="j-today">Today</button>
          <button class="btn ghost cisco" id="j-cisco">With Cloud Control</button>
        </div>
      </div>
    </section>
  </main>
  <aside class="panel">
    <div class="step-kicker" id="kicker"></div>
    <h2 id="step-title"></h2>
    <p class="say" id="say"></p>
    <div class="facts" id="facts"></div>
    <div class="chips" id="chips"></div>
    <div class="legend">
      <span><i style="background:#34d399"></i>Healthy</span>
      <span><i style="background:#fbbf24"></i>Degraded</span>
      <span><i style="background:#fb7185"></i>Down</span>
      <span><i style="background:#60a5fa"></i>Awaiting a person</span>
      <span><i style="background:#64748b"></i>Unknown / not ours</span>
    </div>
    <div class="caveat"><b>Guardrail</b><span id="caveat"></span></div>
  </aside>
`;

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const engine = new Engine($<HTMLCanvasElement>("cv"));

let sceneIdx = 0;
let stepIdx = 0;
let aud: Aud = "exec";
let playing = false;
let playTimer = 0;
const facts = new Map<string, string>();

function validate(sc: SceneDef) {
  const ids = new Set([...sc.nodes.map((x) => x.id), ...sc.zones.map((x) => x.id)]);
  const links = new Set(sc.links.map((x) => x.id));
  for (const st of sc.steps) {
    for (const id of [...Object.keys(st.n ?? {}), ...Object.keys(st.label ?? {}), ...(st.show ?? []), ...(st.hide ?? [])])
      if (!ids.has(id)) console.warn(`[${sc.id}] unknown node/zone "${id}" in "${st.title}"`);
    for (const id of Object.keys(st.l ?? {})) if (!links.has(id)) console.warn(`[${sc.id}] unknown link "${id}" in "${st.title}"`);
  }
}
if (import.meta.env.DEV) SCENES.forEach(validate);

function buildNav() {
  const nav = $("nav");
  nav.innerHTML = "";
  let group = "";
  SCENES.forEach((sc, i) => {
    if (sc.group !== group) {
      group = sc.group;
      const g = document.createElement("div");
      g.className = "nav-group";
      g.textContent = group === "Flagship" ? "Flagship stories" : "Top 10 use cases";
      nav.appendChild(g);
    }
    const b = document.createElement("button");
    b.className = "nav-item";
    b.innerHTML = `<span class="nav-num">${sc.group === "Flagship" ? "&#9733;" : i - 2}</span><span>${sc.title}</span>`;
    b.onclick = () => loadScene(i);
    nav.appendChild(b);
  });
}

function buildAud() {
  const el = $("aud");
  el.innerHTML = "";
  (Object.keys(AUD_LABEL) as Aud[]).forEach((a) => {
    const b = document.createElement("button");
    b.textContent = AUD_LABEL[a];
    b.className = a === aud ? "on" : "";
    b.onclick = () => setAud(a);
    el.appendChild(b);
  });
}

function setAud(a: Aud) {
  aud = a;
  engine.aud = a;
  buildAud();
  renderPanel();
}

function loadScene(i: number) {
  sceneIdx = (i + SCENES.length) % SCENES.length;
  stepIdx = 0;
  facts.clear();
  const sc = SCENES[sceneIdx];
  history.replaceState(null, "", `#${sc.id}`);
  engine.load(sc);
  document.querySelectorAll(".nav-item").forEach((el, j) => el.classList.toggle("on", j === sceneIdx));
  $("pillars").textContent = sc.pillars;
  $("title").textContent = sc.title;
  $("subtitle").textContent = sc.subtitle;
  $("caveat").textContent = sc.caveat;
  render();
}

function goStep(i: number) {
  const sc = SCENES[sceneIdx];
  stepIdx = Math.max(0, Math.min(sc.steps.length - 1, i));
  engine.go(stepIdx);
  render();
}

function render() {
  const sc = SCENES[sceneIdx];
  const st = sc.steps[stepIdx];
  const dots = $("dots");
  dots.innerHTML = "";
  sc.steps.forEach((x, j) => {
    const d = document.createElement("button");
    d.className = `dot ${x.phase} ${j === stepIdx ? "on" : ""} ${j < stepIdx ? "past" : ""}`;
    d.title = x.title;
    d.onclick = () => goStep(j);
    dots.appendChild(d);
  });
  const ph = $("phase");
  ph.className = `phase ${st.phase}`;
  ph.textContent = st.phase === "today" ? "Today, any infrastructure" : "With Cisco Cloud Control, modeled";
  const modal = $("modal");
  if (st.modal) {
    $("modal-title").textContent = st.modal.title;
    $("modal-lines").innerHTML = st.modal.lines.map((l) => `<li>${l}</li>`).join("");
    $("modal-ok").textContent = st.modal.button;
    setTimeout(() => modal.classList.add("show"), 700);
  } else modal.classList.remove("show");
  renderPanel();
}

function renderPanel() {
  const sc = SCENES[sceneIdx];
  const st = sc.steps[stepIdx];
  $("kicker").textContent = `Step ${stepIdx + 1} of ${sc.steps.length} \u00b7 ${st.phase === "today" ? "Today" : "With Cloud Control"}`;
  $("kicker").className = `step-kicker ${st.phase}`;
  $("step-title").textContent = st.title;
  const say = $("say");
  say.classList.remove("fade");
  void say.offsetWidth;
  say.textContent = st.say[aud];
  say.classList.add("fade");

  for (let j = 0; j <= stepIdx; j++) for (const f of sc.steps[j].facts ?? []) facts.set(f.v, JSON.stringify(f));
  const all = [...facts.values()].map((x) => JSON.parse(x) as { v: string; l: string; s: string });
  const current = new Set((st.facts ?? []).map((f) => f.v));
  $("facts").innerHTML = all
    .slice(-4)
    .map(
      (f) =>
        `<div class="fact ${current.has(f.v) ? "new" : ""}"><div class="fact-v">${f.v}</div><div class="fact-l">${f.l}</div><div class="fact-s">${f.s}</div></div>`,
    )
    .join("");

  const chips = st.chips ?? [];
  $("chips").innerHTML = chips.length
    ? `<div class="chips-title">What Cisco shows here, and its status</div>` +
      chips
        .map(
          ([a, b]) =>
            `<div class="chip"><span>${a}</span><em class="${/beta|separate|not/i.test(b) ? "warn" : "ok"}">${b}</em></div>`,
        )
        .join("")
    : "";
}

function next() {
  const sc = SCENES[sceneIdx];
  if (sc.steps[stepIdx].modal) return approve();
  if (stepIdx < sc.steps.length - 1) goStep(stepIdx + 1);
  else if (playing) loadScene(sceneIdx + 1);
}

function prev() {
  if (stepIdx > 0) goStep(stepIdx - 1);
}

function approve() {
  $("modal").classList.remove("show");
  const sc = SCENES[sceneIdx];
  if (stepIdx < sc.steps.length - 1) goStep(stepIdx + 1);
  if (playing) schedule();
}

function schedule() {
  clearTimeout(playTimer);
  if (!playing) return;
  playTimer = window.setTimeout(() => {
    if (!playing) return;
    if (SCENES[sceneIdx].steps[stepIdx].modal) return;
    next();
    schedule();
  }, 6500);
}

function togglePlay() {
  playing = !playing;
  $("play").innerHTML = playing ? "&#10074;&#10074; Pause" : "&#9654; Play";
  $("play").classList.toggle("on", playing);
  schedule();
}

$("next").onclick = () => {
  next();
  schedule();
};
$("prev").onclick = () => {
  prev();
  schedule();
};
$("play").onclick = togglePlay;
$("modal-ok").onclick = approve;
$("modal-later").onclick = () => $("modal").classList.remove("show");
$("j-today").onclick = () => goStep(0);
$("j-cisco").onclick = () => {
  const i = SCENES[sceneIdx].steps.findIndex((x) => x.phase === "cisco");
  if (i >= 0) goStep(i);
};

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  else if (e.key === "ArrowLeft") prev();
  else if (e.key === "ArrowDown") loadScene(sceneIdx + 1);
  else if (e.key === "ArrowUp") loadScene(sceneIdx - 1);
  else if (e.key === "1") setAud("exec");
  else if (e.key === "2") setAud("dir");
  else if (e.key === "3") setAud("eng");
  else if (e.key === " ") togglePlay();
  else if (e.key === "Enter" && $("modal").classList.contains("show")) approve();
  else return;
  e.preventDefault();
  if (e.key !== " ") schedule();
});

const tip = $("tip");
engine.onHover = (node, x, y) => {
  if (!node) {
    tip.classList.remove("show");
    return;
  }
  tip.innerHTML = `<b>${node.title}</b><div><span>Executive</span>${node.sub.exec}</div><div><span>IT director</span>${node.sub.dir}</div><div><span>Engineering</span>${node.sub.eng}</div>`;
  tip.style.left = `${x + 16}px`;
  tip.style.top = `${y + 16}px`;
  tip.classList.add("show");
};

function tickClock() {
  const el = $("clock");
  if (engine.clock) {
    el.classList.add("show");
    el.classList.toggle("stopped", engine.clock.mode === "stop");
    (el.querySelector(".clock-label") as HTMLElement).textContent = engine.clock.label;
    (el.querySelector(".clock-val") as HTMLElement).textContent = engine.clockText();
  } else el.classList.remove("show");
  requestAnimationFrame(tickClock);
}

buildNav();
buildAud();
const hash = location.hash.slice(1);
const fromHash = SCENES.findIndex((x) => x.id === hash);
loadScene(fromHash >= 0 ? fromHash : 0);
tickClock();
