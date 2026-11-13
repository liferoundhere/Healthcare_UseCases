import "./style.css";
import { Stage, SHOT } from "./engine/iso";
import { World, type View } from "./engine/world";
import { ALL, STAGING, code, sceneById } from "./story/staging";
import { computeView } from "./story/player";
import type { Aud, SceneDef, StepDef } from "./story/types";
import { CATALOG, ITEM, LAYER_NAME, TRUST, byLayer, type Item, type Layer } from "./data/catalog";
import { SRC, SOURCES } from "./data/sources";
import { PROOF, LENS_FACTS, UPDATES, QUOTES, PORTFOLIO } from "./data/research";

type Mode = "home" | "story" | "platform" | "compose";
const AUD: Record<Aud, string> = { exec: "Executive", dir: "IT director", eng: "Engineering" };
const q = new URLSearchParams(location.search);
const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector(s) as T;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

const app = $("#app");
app.innerHTML = `
  <div id="stage"></div><div class="vignette"></div>
  <header class="top ui">
    <button class="brand" id="homeBtn" title="Home (Esc)"><span class="mark"><span style="height:7px"></span><span style="height:12px"></span><span style="height:18px"></span><span style="height:12px"></span><span style="height:7px"></span></span><span><b>Healthcare, connected</b><small>Operations today and with Cisco Cloud Control</small></span></button>
    <div class="crumb" id="crumb"></div><div class="sp"></div>
    <div class="seg" id="aud"></div>
    <button class="btn" id="notesBtn">Presenter notes <kbd>N</kbd></button>
    <button class="btn" id="srcBtn">Sources <kbd>S</kbd></button>
    <button class="btn" id="helpBtn" title="Controls (?)">?</button>
    <button class="btn" id="fsBtn" title="Full screen (F)">&#x26F6;</button>
  </header>
  <div class="phase ui hidden" id="phase"></div>
  <div class="clock ui hidden" id="clock"><span></span><b></b><em>illustrative clock</em></div>
  <section class="lower ui hidden" id="lower"></section>
  <aside class="side ui hidden" id="side"></aside>
  <nav class="rail ui hidden" id="rail"></nav>
  <section class="home ui hidden" id="home"></section>
  <section class="panel left ui hidden" id="panel"></section>
  <section class="detail ui hidden" id="detail"></section>
  <section class="panel right ui hidden" id="panelR"></section>
  <aside class="sheet" id="sheet"></aside>
  <div class="sweep" id="sweep"></div>
  <div class="toast" id="toast"></div>`;

const stage = new Stage($("#stage"));
const world = new World(stage);

const S = {
  mode: "home" as Mode,
  scene: undefined as SceneDef | undefined,
  step: 0,
  aud: (q.get("aud") as Aud) || ("exec" as Aud),
  approved: new Set<string>(),
  playing: false,
  timer: 0,
  clockStart: 0, clockKey: "",
  sub: "ring" as "today" | "ring" | "fabric" | "future",
  sel: "" as string,
  pick: new Set<string>(["ehr"]),
  sheet: "" as "" | "notes" | "sources" | "help",
  lastPhase: "" as string,
};

// ---------------------------------------------------------------- helpers
const blank = (p: View["platform"], cam: View["cam"], zones: string[] = [], seed = 1): View => ({ ns: new Map(), ls: new Map(), vis: new Map(), labels: new Map(), active: new Set(), phase: p.mode === "ring" ? "cisco" : "today", platform: { only: undefined, ...p }, cam, zones, seed, ambient: true });
const tagCls = (t: string) => (/GA|Available/i.test(t) && !/beta|alpha/i.test(t.split(";")[0]) ? "ga" : /beta|alpha|controlled|license|separate/i.test(t) ? "beta" : "road");
const show = (id: string, on: boolean) => $(id).classList.toggle("hidden", !on);
function toast(msg: string) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 1800); }
function setHash() {
  const h = S.mode === "story" && S.scene ? `#/s/${S.scene.id}/${S.step + 1}` : S.mode === "platform" ? `#/platform/${S.sub}` : S.mode === "compose" ? "#/compose" : "#/";
  if (location.hash !== h) history.replaceState(null, "", location.pathname + location.search + h);
}

// ---------------------------------------------------------------- chrome
function paintAud() {
  $("#aud").innerHTML = (Object.keys(AUD) as Aud[]).map((a, i) => `<button data-a="${a}" class="${a === S.aud ? "on" : ""}" title="Press ${i + 1}">${AUD[a]}</button>`).join("");
}
$("#aud").addEventListener("click", (e) => { const a = (e.target as HTMLElement).dataset.a as Aud | undefined; if (a) setAud(a); });
function setAud(a: Aud) { S.aud = a; world.setAud(a); paintAud(); if (S.mode === "story") paintStory(false); if (S.sheet) paintSheet(); }

function setMode(m: Mode) {
  S.mode = m; stopPlay();
  show("#home", m === "home"); show("#lower", m === "story"); show("#side", m === "story"); show("#rail", m === "story"); show("#phase", m === "story");
  show("#panel", m === "platform" || m === "compose"); show("#panelR", m === "compose"); show("#detail", false); show("#clock", false);
  show("#aud", m === "story"); show("#notesBtn", m === "story");
  if (m === "story") stage.setSafe(0.13, 0.29, 0.01, 0.01); else if (m === "home") stage.setSafe(0.07, 0.28, 0.33, 0.0); else if (m === "platform") stage.setSafe(0.08, 0.2, 0.29, 0.0); else stage.setSafe(0.09, 0.03, 0.28, 0.28);
}

// ---------------------------------------------------------------- home
function goHome() {
  setMode("home"); S.scene = undefined; world.clear();
  world.apply({ ...blank({ mode: "ring", fabric: true, cards: true, partners: true, ghosts: false, labels: "none", lit: new Set() }, "hero"), hideSky: true }, SHOT);
  $("#crumb").innerHTML = "";
  const grp = (g: string) => ALL.filter((s) => s.group === g);
  const card = (s: SceneDef) => `<button class="sc" data-s="${s.id}"><small>${code(s)}</small><b>${esc(STAGING[s.id].short)}</b></button>`;
  $("#home").innerHTML = `
    <div class="hero">
      <div class="eyebrow">Healthcare infrastructure &middot; interactive explainer</div>
      <h1>Every system in the hospital. <em>One operating picture.</em></h1>
      <p>How care infrastructure is run today, and what changes when Cisco Cloud Control and Cisco Data Fabric connect it. Agents do the legwork. People approve.</p>
      <div class="cta">
        <button class="btn primary big" data-s="opening">&#9654;&nbsp; Start the story</button>
        <button class="btn big" data-go="platform">Explore the platform</button>
        <button class="btn big" data-go="compose">Build a combination</button>
      </div>
    </div>
    <div>
      <div class="dock">
        <div class="grp"><h4>Four operating lenses</h4><div class="cards g2">${grp("Operating lens").map(card).join("")}</div></div>
        <div class="grp"><h4>Flagship stories</h4><div class="cards g1">${grp("Flagship").map(card).join("")}</div></div>
        <div class="grp"><h4>Ten use cases</h4><div class="cards g5">${grp("Use case").map(card).join("")}</div></div>
      </div>
      <div class="foot"><span>Cisco Cloud Control is generally available in the United States only (25 Aug 2026). Outcomes are modeled; every number is sourced.</span><span>Arrow keys step &middot; 1 2 3 audience &middot; N notes &middot; S sources &middot; H hide interface &middot; drag to orbit</span></div>
    </div>`;
  setHash();
}
$("#home").addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest("[data-s],[data-go]") as HTMLElement | null; if (!b) return;
  if (b.dataset.s) openStory(b.dataset.s); else if (b.dataset.go === "platform") openPlatform(); else openCompose();
});
$("#homeBtn").onclick = goHome;

// ---------------------------------------------------------------- story
function openStory(id: string, step = 0) {
  const sc = sceneById(id); if (!sc) return goHome();
  setMode("story"); S.scene = sc; S.step = Math.max(0, Math.min(sc.steps.length - 1, step)); S.approved.clear();
  world.load(sc, STAGING[sc.id].place); world.setAud(S.aud);
  $("#crumb").innerHTML = `${code(sc)} &nbsp;&middot;&nbsp; <b>${esc(STAGING[sc.id].short)}</b>`;
  S.lastPhase = sc.steps[S.step].phase;
  paintStory(SHOT);
}

function paintStory(snap: boolean) {
  const sc = S.scene!; const st = sc.steps[S.step]; const sg = STAGING[sc.id];
  world.apply(computeView(sc, sg, S.step), snap || SHOT);
  const n = sc.steps.length;
  // The moment the story turns: a sweep of light when Cloud Control comes on.
  if (st.phase !== S.lastPhase) { const sw = $("#sweep"); sw.className = "sweep"; void sw.offsetWidth; sw.className = `sweep go ${st.phase}`; S.lastPhase = st.phase; }
  const ph = $("#phase"); ph.className = `phase ui ${st.phase}`;
  ph.innerHTML = st.phase === "today" ? `<i></i>Today <small>any infrastructure</small>` : `<i></i>With Cisco Cloud Control <small>modeled</small>`;
  $("#lower").innerHTML = `<div class="swap"><div class="eyebrow"><span class="num">${String(S.step + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}</span><span>${esc(sc.title)}</span></div><h2>${esc(st.title)}</h2><p>${esc(st.say[S.aud])}</p></div>`;
  // side column
  const last = S.step === n - 1;
  let side = "";
  for (const f of (st.facts ?? []).slice(0, 2)) side += `<div class="card ${st.phase}"><div class="fact"><b>${esc(f.v)}</b><span>${esc(f.l)}</span><small>${esc(f.s)}</small></div></div>`;
  const qt = QUOTES[`${sc.id}:${S.step}`];
  if (qt) side += `<div class="card quote"><p>&ldquo;${esc(qt.text)}&rdquo;</p><small>${esc(qt.who)} [${qt.src}]</small></div>`;
  if (st.chips) side += `<div class="card"><h4>The combination, and what is available today</h4>${st.chips.map(([a, b]) => `<div class="row"><span>${esc(a)}</span><span class="tag ${tagCls(b)}">${esc(b)}</span></div>`).join("")}</div>`;
  if (last) side += `<div class="card ask"><h4>Ask the room</h4><p>${esc(sg.ask)}</p></div><p class="caveat">${esc(sc.caveat)}</p>`;
  if (st.modal) side = `<div class="modal" id="modal"></div>` + side;
  $("#side").innerHTML = side;
  // rail
  const segs = sc.steps.map((x, i) => `${i > 0 && x.phase !== sc.steps[i - 1].phase ? '<span class="gap">&rsaquo;</span>' : ""}<button class="s ${x.phase} ${i < S.step ? "done" : i === S.step ? "cur" : ""}" data-i="${i}" title="${esc(x.title)}"></button>`).join("");
  $("#rail").classList.toggle("playing", S.playing);
  $("#rail").innerHTML = `<button class="navb" data-nav="-1" title="Previous (left arrow)">&lsaquo;</button><button class="navb play ${S.playing ? "on" : ""}" data-nav="play" title="Autoplay (Space)">${S.playing ? "&#10073;&#10073;" : "&#9654;"}</button><div class="segs">${segs}</div><span class="hint">${last ? `Next: ${esc(STAGING[nextScene().id].short)}` : esc(sc.steps[S.step + 1].title)}</span><button class="navb" data-nav="1" title="Next (right arrow)">&rsaquo;</button>`;
  paintModal(st); paintClock(st);
  if (S.sheet) paintSheet();
  setHash();
}

function nextScene(d = 1) { const i = ALL.indexOf(S.scene!); return ALL[(i + d + ALL.length) % ALL.length]; }
function key(i = S.step) { return `${S.scene!.id}:${i}`; }

function paintModal(st: StepDef) {
  if (!st.modal) return;
  const m = $("#modal");
  const done = S.approved.has(key());
  m.className = `modal${done ? " done" : ""}`;
  m.innerHTML = `<div class="k">${done ? "Approved and recorded" : "Approval required"}</div><h3>${esc(st.modal.title)}</h3><ul>${st.modal.lines.map((l) => `<li>${esc(l)}</li>`).join("")}</ul><div class="acts"><button class="btn primary" id="okBtn">${done ? "&#10003; Approved" : esc(st.modal.button)} ${done ? "" : "<kbd>Enter</kbd>"}</button><span class="note">${done ? "Recorded in the audit log" : "Nothing changes until a person approves."}</span></div>`;
  $("#okBtn").onclick = approve;
  if (SHOT || done) m.classList.add("show"); else setTimeout(() => m.isConnected && m.classList.add("show"), 900);
}
function approve() {
  if (!S.scene?.steps[S.step].modal || S.approved.has(key())) return;
  S.approved.add(key()); paintModal(S.scene.steps[S.step]);
  setTimeout(() => { if (S.mode === "story") go(1); }, 1100);
}

function paintClock(st: StepDef) {
  // The clock persists across steps until a step hides it.
  let c: StepDef["clock"]; for (let j = 0; j <= S.step; j++) if (S.scene!.steps[j].clock) c = S.scene!.steps[j].clock;
  const el = $("#clock");
  if (!c || c.mode === "hide") { el.classList.add("hidden"); S.clockKey = ""; return; }
  void st;
  const k2 = c.label + c.mode;
  if (k2 !== S.clockKey) { S.clockKey = k2; S.clockStart = performance.now(); }
  el.className = `clock ui ${c.mode === "stop" ? "stop" : ""}`;
  el.querySelector("span")!.textContent = c.label;
  el.dataset.mode = c.mode; el.dataset.value = c.value ?? "";
}
stage.onTick(() => {
  const el = $("#clock"); if (el.classList.contains("hidden")) return;
  const b = el.querySelector("b")!;
  if (el.dataset.mode === "stop") { b.textContent = el.dataset.value || "00:00"; return; }
  const sec = SHOT ? 47 * 60 + 12 : ((performance.now() - S.clockStart) / 1000) * 97 + 8 * 60;
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s2 = Math.floor(sec % 60);
  b.textContent = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s2).padStart(2, "0")}`;
});

function go(d: number) {
  if (S.mode !== "story" || !S.scene) return;
  const st = S.scene.steps[S.step];
  if (d > 0 && st.modal && !S.approved.has(key())) { approve(); return; }
  const i = S.step + d;
  if (i < 0) { const p = nextScene(-1); openStory(p.id, p.steps.length - 1); return; }
  if (i >= S.scene.steps.length) { const nx = nextScene(); toast(`Next: ${STAGING[nx.id].short}`); openStory(nx.id); return; }
  S.step = i; paintStory(false);
}
$("#rail").addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest("button") as HTMLElement | null; if (!b) return;
  if (b.dataset.i) { S.step = +b.dataset.i; paintStory(false); }
  else if (b.dataset.nav === "play") togglePlay(); else if (b.dataset.nav) go(+b.dataset.nav);
});
function togglePlay() { S.playing ? stopPlay() : startPlay(); if (S.mode === "story") paintStory(false); }
function startPlay() { S.playing = true; S.timer = window.setInterval(() => { if (S.mode !== "story") return stopPlay(); const st = S.scene!.steps[S.step]; if (st.modal && !S.approved.has(key())) return; go(1); }, 9000); }
function stopPlay() { S.playing = false; clearInterval(S.timer); }

// ---------------------------------------------------------------- platform explorer
const SUBS: [typeof S.sub, string][] = [["today", "Today: many consoles"], ["ring", "Cloud Control"], ["fabric", "+ Data Fabric"], ["future", "+ Announced"]];
function openPlatform(sub: typeof S.sub = "ring") {
  setMode("platform"); S.scene = undefined; world.clear(); S.sub = sub; S.sel = "";
  $("#crumb").innerHTML = "<b>The platform</b> &nbsp;&middot;&nbsp; what sits above the hospital";
  paintPlatform(true);
}
function paintPlatform(snap = false) {
  const sub = S.sub; const sel = S.sel ? ITEM.get(S.sel) : undefined;
  const lit = new Set(sel ? [sel.id] : []);
  const mode = sub === "today" ? "scattered" : "ring";
  world.apply(blank({ mode, fabric: sub === "fabric" || sub === "future", cards: sub !== "today", partners: sub === "fabric" || sub === "future", ghosts: sub === "future", labels: "all", lit, only: sub === "fabric" ? ["fabric", "ecosystem"] : sub === "future" ? ["fabric", "ecosystem", "roadmap"] : undefined }, sub === "today" ? "wide" : "platform", sel?.zones ?? [], 3), snap);
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("sel", (c as HTMLElement).dataset.id === S.sel));
  const layers: Layer[] = sub === "today" ? ["domain"] : sub === "ring" ? ["experience", "domain"] : sub === "fabric" ? ["experience", "domain", "fabric", "ecosystem"] : ["experience", "domain", "fabric", "ecosystem", "roadmap"];
  const lead: Record<typeof S.sub, string> = {
    today: `A hospital runs these <b>${byLayer("domain").length} domains</b> from separate consoles, each with its own login, alerts and change process. Names here are vendor-neutral.`,
    ring: "With one login, Cloud Control gives a single view of Cisco networking, security, compute, observability and collaboration. Each controller stays responsible for its own domain.",
    fabric: "Cisco Data Fabric, powered by Splunk, is the machine-data layer underneath. It reaches third-party stores where the data already lives. It is not a clinical record.",
    future: "Outlined blocks are announced, alpha or roadmap. They are shown so nobody mistakes direction for delivery.",
  };
  const list = layers.map((l) => `<h5 class="${l}"><i></i>${sub === "today" && l === "domain" ? "Consoles in use today" : LAYER_NAME[l]}</h5>${byLayer(l).map((i) => `<button class="it ${i.id === S.sel ? "on" : ""}" data-id="${i.id}"><span class="nm">${esc(sub === "today" ? i.generic ?? i.short : i.name)}</span>${sub === "today" ? "" : `<span class="tag ${tagCls(i.tag)}">${esc(i.tag)}</span>`}</button>`).join("")}`).join("");
  $("#panel").innerHTML = `<div class="seg" style="align-self:flex-start;flex-wrap:wrap">${SUBS.map(([k, t]) => `<button data-sub="${k}" class="${k === sub ? "on" : ""}">${t}</button>`).join("")}</div>
    <p class="lead">${lead[sub]}</p><div class="scroll">${list}</div>
    ${sub === "today" ? "" : `<div><h5 style="margin-top:0"><i></i>How much agents may do: Cisco's trust ladder</h5><div class="ladder">${TRUST.map((t) => `<div class="${t.level === "L3" ? "on" : ""}"><b>${t.level} ${t.name}</b>${t.line}</div>`).join("")}</div></div>`}`;
  paintDetail(sel);
  setHash();
}
function paintDetail(i?: Item) {
  show("#detail", !!i && S.sub !== "today"); if (!i || S.sub === "today") return;
  const srcs = [...new Set(i.src)].map((id) => SRC.get(id)).filter(Boolean).map((s) => `<a href="${s!.url}" target="_blank" rel="noopener">[${s!.id}] ${esc(s!.title)}</a>`).join("");
  const up = UPDATES[i.id];
  $("#detail").innerHTML = `<div class="hd"><div><div class="ly">${esc(LAYER_NAME[i.layer])}${i.group ? " &middot; " + esc(i.group) : ""}</div><h3>${esc(i.name)}</h3></div><span class="tag ${tagCls(i.tag)}">${esc(i.tag)}</span></div>
    <p>${esc(i.does)}</p><dl>${i.stays ? `<dt>Stays put</dt><dd>${esc(i.stays)}</dd>` : ""}<dt>Status</dt><dd>${esc(i.status)}${up ? " " + esc(up) : ""}</dd><dt>Sources</dt><dd class="srcs">${srcs}</dd></dl>`;
}
$("#panel").addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest("button") as HTMLElement | null; if (!b) return;
  if (S.mode === "platform") {
    if (b.dataset.sub) { S.sub = b.dataset.sub as typeof S.sub; S.sel = ""; paintPlatform(); }
    else if (b.dataset.id) { S.sel = S.sel === b.dataset.id ? "" : b.dataset.id; paintPlatform(); }
  } else if (S.mode === "compose") {
    if (b.dataset.id) { S.pick.has(b.dataset.id) ? S.pick.delete(b.dataset.id) : S.pick.add(b.dataset.id); paintCompose(); }
    else if (b.dataset.all) { if (b.dataset.all === "1") ALL.forEach((s) => s.id !== "opening" && S.pick.add(s.id)); else S.pick.clear(); paintCompose(); }
  }
});
// Clicking a chip in the 3D scene selects it.
$("#stage").addEventListener("click", (e) => {
  const c = (e.target as HTMLElement).closest(".chip") as HTMLElement | null; if (!c?.dataset.id) return;
  if (S.mode === "platform") { S.sel = S.sel === c.dataset.id ? "" : c.dataset.id; paintPlatform(); }
  else { openPlatform(ITEM.get(c.dataset.id)?.layer === "fabric" || ITEM.get(c.dataset.id)?.layer === "ecosystem" ? "fabric" : ITEM.get(c.dataset.id)?.layer === "roadmap" ? "future" : "ring"); S.sel = c.dataset.id; paintPlatform(); }
});

world.onPick = (kind, id) => {
  if (kind === "item") {
    const it = ITEM.get(id); if (!it) return;
    if (S.mode !== "platform") openPlatform(it.layer === "fabric" || it.layer === "ecosystem" ? "fabric" : it.layer === "roadmap" ? "future" : "ring");
    S.sel = S.sel === id && S.mode === "platform" ? "" : id; paintPlatform();
  } else if (kind === "node" && S.scene) {
    const n = S.scene.nodes.find((x) => x.id === id); if (!n) return;
    show("#detail", true);
    $("#detail").innerHTML = `<div class="hd"><div><div class="ly">In this story</div><h3>${esc(n.title)}</h3></div><button class="btn" id="dx">Close</button></div><dl>${(Object.keys(AUD) as Aud[]).map((a) => `<dt>${AUD[a]}</dt><dd>${esc(n.sub[a])}</dd>`).join("")}</dl>`;
    $("#dx").onclick = () => show("#detail", false);
  } else if (S.mode === "story") show("#detail", false);
};

// ---------------------------------------------------------------- composer
function openCompose() {
  setMode("compose"); S.scene = undefined; world.clear();
  $("#crumb").innerHTML = "<b>Build a combination</b> &nbsp;&middot;&nbsp; pick the problems, see the building blocks";
  paintCompose(true);
}
function paintCompose(snap = false) {
  const picks = ALL.filter((s) => S.pick.has(s.id));
  const lit = new Set<string>(); const zones = new Set<string>();
  for (const s of picks) { STAGING[s.id].recipe.forEach((r) => lit.add(r)); Object.values(STAGING[s.id].place).forEach((z) => z !== "deck" && zones.add(z)); }
  world.apply(blank({ mode: "ring", fabric: true, cards: true, partners: true, ghosts: [...lit].some((x) => ITEM.get(x)?.layer === "roadmap"), labels: "lit", lit }, "stack", [...zones], 2), snap);
  const grp = (g: string, t: string) => `<h5><i></i>${t}</h5>${ALL.filter((s) => s.group === g).map((s) => `<button class="it ${S.pick.has(s.id) ? "on" : ""}" data-id="${s.id}"><span class="ck">${S.pick.has(s.id) ? "&#10003;" : ""}</span><span class="nm">${esc(STAGING[s.id].short)}</span></button>`).join("")}`;
  $("#panel").innerHTML = `<h3>What do you need to fix?</h3><p class="lead">Tick one problem or several. The platform above the hospital lights the blocks that story uses.</p>
    <div style="display:flex;gap:8px"><button class="btn" data-all="1">Select all</button><button class="btn" data-all="0">Clear</button></div>
    <div class="scroll">${grp("Use case", "Ten use cases")}${grp("Flagship", "Flagship stories")}${grp("Operating lens", "Operating lenses")}</div>`;
  const items = [...lit].map((x) => ITEM.get(x)!).filter(Boolean);
  const total = CATALOG.filter((i) => i.layer !== "roadmap" && i.id !== "hospital").length;
  const combos = (2n ** BigInt(total) - 1n).toLocaleString("en-US");
  const sec = (l: Layer) => { const xs = items.filter((i) => i.layer === l); return xs.length ? `<h5 class="${l}"><i></i>${LAYER_NAME[l]}</h5><div class="pills">${xs.map((i) => `<span class="pill ${l}" title="${esc(i.status)}">${esc(i.short)}</span>`).join("")}</div>` : ""; };
  const proof = PROOF.filter((p) => p.products.some((pr) => items.some((i) => pr.toLowerCase().includes(i.short.toLowerCase()) || i.name.toLowerCase().includes(pr.toLowerCase())))).slice(0, 2);
  $("#panelR").innerHTML = picks.length ? `<h3>Your combination</h3>
    <div class="bigN"><b>${items.length}</b><span>building blocks cover ${picks.length === 1 ? "this problem" : `these ${picks.length} problems`}, behind one login.</span></div>
    <div class="scroll">${sec("experience")}${sec("domain")}${sec("fabric")}${sec("ecosystem")}${sec("roadmap")}
      ${proof.length ? `<h5><i></i>Where this has been done (vendor-reported)</h5>${proof.map((p) => `<p class="lead" style="margin-bottom:8px"><b>${esc(p.customer)}</b>: ${esc(p.outcome)} <a href="${p.url}" target="_blank" rel="noopener">source</a></p>`).join("")}` : ""}
      <h5><i></i>Play the story</h5>${picks.slice(0, 8).map((s) => `<button class="it" data-open="${s.id}"><span class="nm">${esc(s.title)}</span><span>&rsaquo;</span></button>`).join("")}
    </div>
    <div class="math">${total} blocks that ship today can be combined <b>${combos}</b> ways (2<sup>${total}</sup> &minus; 1). You do not need all of them: start with the blocks you already own.</div>`
    : `<h3>Your combination</h3><p class="lead">Nothing selected yet. Pick a problem on the left.</p>`;
  setHash();
}
$("#panelR").addEventListener("click", (e) => { const b = (e.target as HTMLElement).closest("[data-open]") as HTMLElement | null; if (b) openStory(b.dataset.open!); });

// ---------------------------------------------------------------- sheets
function openSheet(k: typeof S.sheet) { S.sheet = S.sheet === k ? "" : k; paintSheet(); }
function paintSheet() {
  const el = $("#sheet"); el.classList.toggle("show", !!S.sheet); if (!S.sheet) return;
  const x = `<button class="btn x" id="xBtn">Close <kbd>Esc</kbd></button>`;
  if (S.sheet === "help") {
    const rows: [string, string][] = [["Right / Left", "Next or previous beat. Right also approves a waiting approval."], ["Down / Up", "Next or previous story."], ["1 2 3", "Audience: Executive, IT director, Engineering."], ["Space", "Autoplay. Pauses at approvals."], ["N", "Presenter notes for the current beat."], ["S", "Sources."], ["P / C", "Platform explorer / Combination builder."], ["H", "Hide the interface."], ["F", "Full screen."], ["Esc", "Close a panel, or go home."], ["Mouse", "Drag to pan, wheel to zoom, double-click to reset. Click a room to zoom in. Click a pin or a platform block for detail."]];
    el.innerHTML = `${x}<h3>Controls</h3><dl class="aud">${rows.map(([k, v]) => `<dt><code>${k}</code></dt><dd>${v}</dd>`).join("")}</dl><h5>Reading the picture</h5><ul><li><b>Amber</b> beats are today, on any infrastructure. <b>Blue</b> beats are with Cisco Cloud Control, and are modeled.</li><li>White tiles are hospital systems. Blue glass tiles are Cisco Cloud Control capabilities.</li><li>Green is healthy, amber needs attention, red is down, grey with a question mark is unknown, pulsing blue is waiting for a person.</li><li>Lit rooms are in the story. The others recede.</li></ul>`;
  } else if (S.sheet === "sources") {
    el.innerHTML = `${x}<h3>Sources</h3><p>Every number on screen carries a short source tag. The full numbered bibliography is in <code>sources.md</code>; nine research briefs with status tags and gap lists are in <code>research/</code>. ${SOURCES.length} platform and evidence sources are listed here.</p><p>A press report (Network World, 10 Nov 2026) says Australia, the EU and the UK are scheduled for February 2027. Cisco documentation still says United States only, so this explainer does too.</p>
      ${[...new Set(SOURCES.map((x) => x.group))].map((g) => `<h5>${esc(g)}</h5><ul class="src">${SOURCES.filter((x) => x.group === g).map((x) => `<li><b>[${x.id}]</b> ${esc(x.title)}${x.url ? ` <a href="${x.url}" target="_blank" rel="noopener">link</a>` : ""}</li>`).join("")}</ul>`).join("")}
      <h5>Healthcare customer evidence (vendor-reported)</h5><ul>${PROOF.map((p) => `<li><b>${esc(p.customer)}</b>: ${esc(p.outcome)} <a href="${p.url}" target="_blank" rel="noopener">link</a></li>`).join("")}</ul>
      <h5>Rules this explainer follows</h5><ul><li>Cloud Control is generally available in the United States only. Outcomes are modeled; no percentage is claimed for Cloud Control in healthcare.</li><li>Data Fabric holds machine data. It is not a clinical data repository and does not replace the EHR.</li><li>Any action that can touch clinical systems waits for a named person.</li><li>Domain controllers stay the systems of record.</li><li>No attacker procedures are shown.</li></ul>`;
  } else if (S.scene) {
    const sc = S.scene, st = sc.steps[S.step], sg = STAGING[sc.id];
    const lens = LENS_FACTS[sc.id] ?? [];
    el.innerHTML = `${x}<h3>Presenter notes</h3><p>${esc(sc.title)} &middot; step ${S.step + 1} of ${sc.steps.length}: <b>${esc(st.title)}</b></p>
      <h5>Say it three ways</h5><dl class="aud">${(Object.keys(AUD) as Aud[]).map((a) => `<dt>${AUD[a]}</dt><dd>${esc(st.say[a])}</dd>`).join("")}</dl>
      ${st.facts?.length ? `<h5>Numbers on this step</h5><ul>${st.facts.map((f) => `<li><b>${esc(f.v)}</b> ${esc(f.l)} <i>(${esc(f.s)})</i></li>`).join("")}</ul>` : ""}
      <h5>The setup</h5><p>${esc(sc.subtitle)}</p>
      <h5>Ask the room</h5><p>${esc(sg.ask)}</p>
      <h5>What stays with the hospital</h5><p>${esc(sg.stays)}</p>
      <h5>Caveat to keep in mind</h5><p>${esc(sc.caveat)}</p>
      ${lens.length ? `<h5>More evidence for this lens</h5><ul>${lens.map((f) => `<li><b>${esc(f.value)}</b> ${esc(f.label)} <i>(${esc(f.source)}${f.vendor ? ", vendor-reported" : ""})</i> <a href="${f.url}" target="_blank" rel="noopener">link</a></li>`).join("")}</ul>` : ""}
      ${PORTFOLIO[sc.id] ? `<h5>Cisco's wider portfolio for this use case</h5><ul>${PORTFOLIO[sc.id].products.map((p) => `<li><b>${esc(p.name)}</b>: ${esc(p.role)}${p.url ? ` <a href="${p.url}" target="_blank" rel="noopener">link</a>` : ""}</li>`).join("")}</ul>${PORTFOLIO[sc.id].partners.length ? `<p><i>Partner systems commonly in the picture:</i> ${PORTFOLIO[sc.id].partners.map(esc).join(", ")}.</p>` : ""}` : ""}
      <h5>Building blocks in this story</h5><div class="pills">${sg.recipe.map((r) => ITEM.get(r)).filter(Boolean).map((i) => `<span class="pill ${i!.layer}">${esc(i!.short)} &middot; ${esc(i!.tag)}</span>`).join("")}</div>`;
  } else { S.sheet = ""; el.classList.remove("show"); return; }
  $("#xBtn").onclick = () => openSheet(S.sheet);
}
$("#notesBtn").onclick = () => openSheet("notes");
$("#srcBtn").onclick = () => openSheet("sources");
$("#helpBtn").onclick = () => openSheet("help");
$("#fsBtn").onclick = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());

// ---------------------------------------------------------------- keys and routing
addEventListener("keydown", (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if (k === "Escape") { if (S.sheet) openSheet(S.sheet); else goHome(); }
  else if (k === "ArrowRight" || k === "PageDown") go(1);
  else if (k === "ArrowLeft" || k === "PageUp") go(-1);
  else if (k === "ArrowDown" && S.mode === "story") openStory(nextScene().id);
  else if (k === "ArrowUp" && S.mode === "story") openStory(nextScene(-1).id);
  else if (k === "Enter") { if (S.mode === "story") go(1); }
  else if (k === " ") { e.preventDefault(); if (S.mode === "story") togglePlay(); else if (S.mode === "home") openStory("opening"); }
  else if (k === "1" || k === "2" || k === "3") setAud((["exec", "dir", "eng"] as Aud[])[+k - 1]);
  else if (k === "n" || k === "N") { if (S.mode === "story") openSheet("notes"); }
  else if (k === "s" || k === "S") openSheet("sources");
  else if (k === "h" || k === "H") document.body.classList.toggle("clean");
  else if (k === "?" || k === "/") openSheet("help");
  else if (k === "f" || k === "F") $("#fsBtn").click();
  else if (k === "p" || k === "P") openPlatform();
  else if (k === "c" || k === "C") openCompose();
});

function route() {
  const h = location.hash.replace(/^#\/?/, "").split("/");
  if (h[0] === "s" && h[1]) openStory(h[1], (+h[2] || 1) - 1);
  else if (h[0] === "platform") openPlatform((h[1] as typeof S.sub) || "ring");
  else if (h[0] === "compose") openCompose();
  else if (h[0] && sceneById(h[0])) openStory(h[0]);
  else goHome();
}
addEventListener("hashchange", route);
paintAud();
route();
if (q.has("notes")) openSheet("notes");
if (q.has("sources")) openSheet("sources");
if (q.has("clean")) document.body.classList.add("clean");
// Test hook for the automated checks.
(window as unknown as Record<string, unknown>).__app = { S, ALL, STAGING, CATALOG, world, stage, openStory, openPlatform, openCompose, goHome, go, approve };
