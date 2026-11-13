import "./style.css";
import { Stage, SHOT } from "./engine/iso";
import { World, type View } from "./engine/world";
import { ALL, STAGING, code, sceneById } from "./story/staging";
import { computeView } from "./story/player";
import type { Aud, SceneDef, StepDef } from "./story/types";
import { CATALOG, ITEM, LAYER_NAME, TRUST, byLayer, type Item, type Layer } from "./data/catalog";
import { SRC, SOURCES } from "./data/sources";
import * as RESEARCH from "./data/research";
import { PROOF, LENS_FACTS, PORTFOLIO } from "./data/research";
import { ACCOUNTS, DEFAULT_ACCOUNT, accountById, type Account } from "./data/accounts";
import { store } from "./data/store";
import { Palette, type PalItem } from "./ui/palette";
import { buildPlan, planBlocksHtml, planMarkdown, planPanelHtml, planPrintHtml, stepsHtml } from "./ui/plan";
import { $, ICON, copyText, download, esc, isTyping, pickFile, tagCls } from "./ui/util";

// QUOTES (a customer quote for one story beat) and UPDATES (a later status note for one block) are optional in the
// generated research file: when a regeneration leaves them out, the interface shows nothing in their place.
const QUOTES = ((RESEARCH as unknown as Record<string, unknown>).QUOTES ?? {}) as Record<string, { text: string; who: string; src: string }>;
const UPDATES = ((RESEARCH as unknown as Record<string, unknown>).UPDATES ?? {}) as Record<string, string>;

type Mode = "home" | "story" | "platform" | "compose" | "plan";
type Group = SceneDef["group"];
const AUD: Record<Aud, string> = { exec: "Executive", dir: "IT director", eng: "Engineering" };
const AUD_SHORT: Record<Aud, string> = { exec: "Exec", dir: "IT dir", eng: "Eng" };
const q = new URLSearchParams(location.search);
/** The scene engine reads `view` once at load: `view=iso` is the isometric model, anything else the flat 2D plan. */
const ISO = q.get("view") === "iso";

const app = $("#app");
app.innerHTML = `
  <div id="stage"></div><div class="vignette"></div>
  <header class="top ui">
    <button class="brand" id="homeBtn" title="Home (Esc)"><span class="mark"><span style="height:7px"></span><span style="height:12px"></span><span style="height:18px"></span><span style="height:12px"></span><span style="height:7px"></span></span><span><b>Healthcare, connected</b><small>Operations today and with Cisco Cloud Control</small></span></button>
    <div class="crumb" id="crumb"></div><div class="sp"></div>
    <div class="seg" id="acct" role="group" aria-label="Account workspace"></div>
    <div class="seg" id="view" role="group" aria-label="Scene view"></div>
    <div class="seg" id="aud" role="group" aria-label="Audience"></div>
    <button class="btn" id="planBtn" title="Account plan for this workspace (A)">${ICON.plan}<span class="t">Plan</span><kbd>A</kbd></button>
    <button class="btn ic" id="findBtn" title="Search stories and platform blocks (/ or Ctrl+K)" aria-label="Search stories and platform blocks">${ICON.search}</button>
    <button class="btn ic" id="notesBtn" title="Presenter notes (N)" aria-label="Presenter notes">${ICON.notes}</button>
    <button class="btn ic" id="srcBtn" title="Sources (S)" aria-label="Sources">${ICON.sources}</button>
    <button class="btn ic" id="helpBtn" title="Controls (?)" aria-label="Controls">?</button>
    <button class="btn ic" id="fsBtn" title="Full screen (F)" aria-label="Full screen">${ICON.full}</button>
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
  <div class="toast" id="toast" role="status"></div>
  <article class="doc" id="printable" aria-hidden="true"></article>`;

const stage = new Stage($("#stage"));
const world = new World(stage);

const S = {
  mode: "home" as Mode,
  scene: undefined as SceneDef | undefined,
  step: 0,
  aud: (q.get("aud") as Aud) || ("exec" as Aud),
  /** Account workspace: the URL wins, then the last one chosen in this browser. */
  acct: accountById(q.get("acct"))?.id ?? accountById(store.lastWorkspace())?.id ?? DEFAULT_ACCOUNT,
  /** Story group shown in the home-page dock. */
  tab: "" as Group | "",
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
const show = (id: string, on: boolean) => $(id).classList.toggle("hidden", !on);
function toast(msg: string) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 1800); }
/** The current address with the workspace in `?acct=`; `set` adds or (null) removes other parameters. */
function urlFor(hash: string, set: Record<string, string | null> = {}) {
  const p = new URLSearchParams(location.search);
  if (S.acct === DEFAULT_ACCOUNT) p.delete("acct"); else p.set("acct", S.acct);
  for (const [k, v] of Object.entries(set)) { if (v === null) p.delete(k); else p.set(k, v); }
  const qs = p.toString().replace(/=(?=&|$)/g, "");
  return location.pathname + (qs ? "?" + qs : "") + hash;
}
function setHash() {
  const h = S.mode === "story" && S.scene ? `#/s/${S.scene.id}/${S.step + 1}` : S.mode === "platform" ? `#/platform/${S.sub}` : S.mode === "compose" ? "#/compose" : S.mode === "plan" ? "#/plan" : "#/";
  const u = urlFor(h);
  if (location.pathname + location.search + location.hash !== u) history.replaceState(null, "", u);
}

// ---------------------------------------------------------------- workspaces and story scope
const acct = (): Account => accountById(S.acct)!;
/** Account stories belong to one workspace only; every other story shows everywhere. */
const inScope = (s: SceneDef) => s.group !== "Account" || s.account === S.acct;
const stories = () => ALL.filter((s) => inScope(s) && STAGING[s.id]);
const shortOf = (s: SceneDef) => STAGING[s.id]?.short ?? s.title;
const recipeOf = (id: string) => STAGING[id]?.recipe ?? [];
const GROUP_ORDER: Group[] = ["Account", "Use case", "AI use case", "Flagship", "Operating lens"];
const groupName = (g: Group) => (g === "Account" ? `For ${acct().short}: hypotheses to validate` : g === "Use case" ? "Use cases" : g === "AI use case" ? "AI use cases" : g === "Flagship" ? "Flagship stories" : g === "Operating lens" ? "Operating lenses" : "Opening");
/** The groups that have at least one story in this workspace, in display order. */
const groups = () => GROUP_ORDER.map((g) => ({ g, name: groupName(g), list: stories().filter((s) => s.group === g) })).filter((x) => x.list.length);
const ratingBadge = (n: number) => (n ? `<span class="rt r${n}" title="Rated ${n} of 5 in this workspace">${n}<i>/5</i></span>` : "");

function paintAcct() {
  $("#acct").innerHTML = ACCOUNTS.map((a) => `<button data-acct="${a.id}" class="${a.id === S.acct ? "on" : ""}" aria-pressed="${a.id === S.acct}" title="Workspace: ${esc(a.name)}"><span class="lg">${esc(a.short)}</span><span class="sm">${esc(a.short.split(" ")[0])}</span></button>`).join("");
}
$("#acct").addEventListener("click", (e) => { const b = (e.target as HTMLElement).closest("[data-acct]") as HTMLElement | null; if (b) setAcct(b.dataset.acct!); });
/** Switch workspace: remember it, put it in the address, and repaint whatever is on screen. */
function setAcct(id: string, repaint = true) {
  if (!accountById(id) || id === S.acct) return;
  S.acct = id; store.rememberWorkspace(id); paintAcct();
  if (!repaint) return;
  if (S.mode === "home" || (S.mode === "story" && S.scene && !inScope(S.scene))) goHome();
  else if (S.mode === "story") paintStory(false);
  else if (S.mode === "compose") paintCompose();
  else if (S.mode === "plan") paintPlan();
  else setHash();
  toast(`Workspace: ${acct().name}`);
}

function paintView() {
  $("#view").innerHTML = `<button data-v="plan" class="${ISO ? "" : "on"}" aria-pressed="${!ISO}" title="Flat 2D plan (V)"><span class="lg">2D plan</span><span class="sm">2D</span></button><button data-v="iso" class="${ISO ? "on" : ""}" aria-pressed="${ISO}" title="Isometric model (V)"><span class="lg">Isometric</span><span class="sm">Iso</span></button>`;
}
$("#view").addEventListener("click", (e) => { const b = (e.target as HTMLElement).closest("[data-v]") as HTMLElement | null; if (b) setView(b.dataset.v === "iso"); });
/** The engine picks its projection at load, so switching the view reloads the page on the same route. */
function setView(iso: boolean) { if (iso === ISO) return; setHash(); location.assign(urlFor(location.hash || "#/", { view: iso ? "iso" : null })); }

// ---------------------------------------------------------------- chrome
function paintAud() {
  $("#aud").innerHTML = (Object.keys(AUD) as Aud[]).map((a, i) => `<button data-a="${a}" class="${a === S.aud ? "on" : ""}" aria-pressed="${a === S.aud}" title="${AUD[a]} (press ${i + 1})"><span class="lg">${AUD[a]}</span><span class="sm">${AUD_SHORT[a]}</span></button>`).join("");
}
$("#aud").addEventListener("click", (e) => { const a = ((e.target as HTMLElement).closest("[data-a]") as HTMLElement | null)?.dataset.a as Aud | undefined; if (a) setAud(a); });
function setAud(a: Aud) { S.aud = a; world.setAud(a); paintAud(); if (S.mode === "story") paintStory(false); if (S.sheet) paintSheet(); }

function setMode(m: Mode) {
  S.mode = m; stopPlay(); document.documentElement.dataset.mode = m;
  show("#home", m === "home"); show("#lower", m === "story"); show("#side", m === "story"); show("#rail", m === "story"); show("#phase", m === "story");
  show("#panel", m === "platform" || m === "compose" || m === "plan"); show("#panelR", m === "compose" || m === "plan"); show("#detail", false); show("#clock", false);
  show("#aud", m === "story"); show("#notesBtn", m === "story");
  $("#panel").classList.toggle("plan", m === "plan"); $("#panelR").classList.toggle("plan", m === "plan"); $("#planBtn").classList.toggle("on", m === "plan");
  if (m === "story") stage.setSafe(0.13, 0.29, 0.01, 0.01); else if (m === "home") stage.setSafe(0.07, 0.28, S.acct === DEFAULT_ACCOUNT ? 0.33 : 0.42, 0.0); else if (m === "platform") stage.setSafe(0.08, 0.2, 0.29, 0.0); else stage.setSafe(0.09, 0.03, 0.28, 0.28);
}

// ---------------------------------------------------------------- home
function goHome() {
  setMode("home"); S.scene = undefined; world.clear();
  world.apply({ ...blank({ mode: "ring", fabric: true, cards: true, partners: true, ghosts: false, labels: "none", lit: new Set() }, "hero"), hideSky: true }, SHOT);
  $("#crumb").innerHTML = "";
  paintHome();
  setHash();
}
/** The account brief: who they are, sourced facts, priorities, and the caveat. Empty sections are left out. */
function briefHtml(a: Account) {
  const src = (t: string | undefined, url?: string) => (t ? `<small>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(t)}</a>` : esc(t)}</small>` : "");
  const facts = a.facts.slice(0, 6).map((f) => `<div class="ft"><b>${esc(f.v)}</b><span>${esc(f.l)}</span>${src(f.s, f.url)}</div>`).join("");
  const prio = a.priorities.map((p) => `<li><b>${esc(p.title)}</b><span>${esc(p.detail)}</span>${src(p.s, p.url)}</li>`).join("");
  const rated = store.rated(a.id).filter(([, n]) => n.rating > 0).length;
  return `<section class="brief" aria-label="Account brief">
    <div class="bh"><div><div class="ly">Account workspace</div><h2>${esc(a.name)}</h2>${a.tagline && a.tagline !== "Account workspace" ? `<p class="tl">${esc(a.tagline)}</p>` : ""}</div><button class="btn" data-go="plan">${ICON.plan}Account plan${rated ? ` &middot; ${rated} rated` : ""}</button></div>
    <div class="bd"><p class="ab">${esc(a.about)}</p>
      ${facts ? `<div class="fts">${facts}</div>` : ""}
      ${prio ? `<h4>Priorities, from public sources</h4><ul class="prio">${prio}</ul>` : ""}
      ${facts || prio ? "" : `<p class="pend">Sourced facts and priorities for this account are not loaded yet. Rating stories, notes and the account plan already work in this workspace.</p>`}</div>
    <p class="caveat">${esc(a.caveat)}</p></section>`;
}
function dockHtml() {
  const gs = groups(); if (!gs.some((x) => x.g === S.tab)) S.tab = gs[0]?.g ?? "";
  if (!gs.length) return `<p class="none">No stories are available in this workspace.</p>`;
  const cur = gs.find((x) => x.g === S.tab)!; const n = cur.list.length;
  const cols = Math.max(5, Math.min(8, n <= 7 ? n : Math.ceil(n / 2)));
  const card = (s: SceneDef) => `<button class="sc" data-s="${s.id}" title="${esc(s.title)}"><small>${code(s)}</small><b>${esc(shortOf(s))}</b><span class="st">${esc(s.title)}</span>${ratingBadge(store.story(S.acct, s.id).rating)}</button>`;
  return `<div class="tabs" role="tablist" aria-label="Story groups">${gs.map((x) => `<button role="tab" id="tab-${x.g.replace(/\W+/g, "")}" aria-selected="${x.g === S.tab}" aria-controls="dockCards" class="${x.g === S.tab ? "on" : ""} ${x.g === "Account" ? "acct" : ""}" data-tab="${x.g}">${esc(x.name)}<span>${x.list.length}</span></button>`).join("")}</div>
    <div class="cards" id="dockCards" role="tabpanel" aria-labelledby="tab-${cur.g.replace(/\W+/g, "")}" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${cur.list.map(card).join("")}</div>`;
}
function paintHome() {
  const a = acct(), named = a.id !== DEFAULT_ACCOUNT;
  $("#home").innerHTML = `
    <div class="hero ${named ? "named" : ""}">
      <div class="eyebrow">Healthcare infrastructure &middot; interactive explainer</div>
      <h1>Every system in the hospital. <em>One operating picture.</em></h1>
      ${named ? "" : `<p>How care infrastructure is run today, and what changes when Cisco Cloud Control and Cisco Data Fabric connect it. Agents do the legwork. People approve.</p>`}
      <div class="cta">
        <button class="btn primary big" data-s="opening">&#9654;&nbsp; Start the story</button>
        <button class="btn big" data-go="platform">Explore the platform</button>
        <button class="btn big" data-go="compose">Build a combination</button>
      </div>
      ${named ? briefHtml(a) : ""}
    </div>
    <div>
      <div class="dock" id="dock">${dockHtml()}</div>
      <div class="foot"><span>Cisco Cloud Control is generally available in the United States only (25 Aug 2026). Outcomes are modeled; every number is sourced.</span><span>Arrow keys step &middot; 1 2 3 audience &middot; / search &middot; A account plan &middot; N notes &middot; S sources &middot; V view &middot; H hide interface &middot; drag to pan</span></div>
    </div>`;
}
$("#home").addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest("[data-s],[data-go],[data-tab]") as HTMLElement | null; if (!b) return;
  if (b.dataset.tab) { S.tab = b.dataset.tab as Group; $("#dock").innerHTML = dockHtml(); ($(`#dock [data-tab="${S.tab}"]`) as HTMLElement | null)?.focus(); }
  else if (b.dataset.s) openStory(b.dataset.s); else if (b.dataset.go === "platform") openPlatform(); else if (b.dataset.go === "plan") openPlan(); else openCompose();
});
$("#homeBtn").onclick = goHome;

// ---------------------------------------------------------------- story
function openStory(id: string, step = 0) {
  const sc = sceneById(id); if (!sc || !STAGING[sc.id]) return goHome();
  // A link to an account story opens that account's workspace: account stories never show in another one.
  if (!inScope(sc)) { if (!accountById(sc.account)) return goHome(); setAcct(sc.account!, false); toast(`Workspace: ${acct().name}`); }
  setMode("story"); S.scene = sc; S.step = Math.max(0, Math.min(sc.steps.length - 1, step)); S.approved.clear();
  world.load(sc, STAGING[sc.id].place); world.setAud(S.aud);
  $("#crumb").innerHTML = `${code(sc)} &nbsp;&middot;&nbsp; <b>${esc(shortOf(sc))}</b>`;
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
  if (last) {
    // The closing beat is where discovery is captured: a rating and what the room said, saved per workspace.
    const cap = store.story(S.acct, sc.id);
    side += `<div class="card ask"><h4>Ask the room</h4><p>${esc(sg.ask)}</p>
      <div class="rate"><span id="rateL">How much does this hurt? 1 to 5</span><div class="rb" role="group" aria-labelledby="rateL">${[1, 2, 3, 4, 5].map((i) => `<button data-rate="${i}" title="${i} of 5">${i}</button>`).join("")}</div></div>
      <label class="vh" for="askNote">What they said</label><textarea id="askNote" rows="2" placeholder="What they said" spellcheck="true">${esc(cap.note)}</textarea>
      <div class="sv"><span id="askSaved"></span><button class="lnk" data-go="plan">Account plan &rsaquo;</button></div></div><p class="caveat">${esc(sc.caveat)}</p>`;
  }
  if (st.modal) side = `<div class="modal" id="modal"></div>` + side;
  $("#side").innerHTML = side;
  if (last) paintRate();
  paintRail();
  paintModal(st); paintClock(st);
  if (S.sheet) paintSheet();
  setHash();
}
function paintRail() {
  const sc = S.scene!; const last = S.step === sc.steps.length - 1; const nx = nextScene();
  const segs = sc.steps.map((x, i) => `${i > 0 && x.phase !== sc.steps[i - 1].phase ? '<span class="gap">&rsaquo;</span>' : ""}<button class="s ${x.phase} ${i < S.step ? "done" : i === S.step ? "cur" : ""}" data-i="${i}" title="${esc(x.title)}"></button>`).join("");
  $("#rail").classList.toggle("playing", S.playing);
  $("#rail").innerHTML = `<button class="navb" data-nav="-1" title="Previous (left arrow)">&lsaquo;</button><button class="navb play ${S.playing ? "on" : ""}" data-nav="play" title="Autoplay (Space)">${S.playing ? "&#10073;&#10073;" : "&#9654;"}</button><div class="segs">${segs}</div><span class="hint">${last ? (nx && nx !== sc ? `Next: ${esc(shortOf(nx))}` : "End of the stories") : esc(sc.steps[S.step + 1].title)}</span><button class="navb" data-nav="1" title="Next (right arrow)">&rsaquo;</button>`;
}
/** Reflect the stored rating in the closing-beat card without re-rendering it (the note field keeps its focus). */
function paintRate() {
  if (!S.scene || !$("#askSaved")) return;
  const cap = store.story(S.acct, S.scene.id);
  document.querySelectorAll<HTMLElement>("#side [data-rate]").forEach((b) => { const i = +b.dataset.rate!; b.classList.toggle("on", i === cap.rating); b.classList.toggle("fill", i <= cap.rating); b.setAttribute("aria-pressed", String(i === cap.rating)); });
  $("#askSaved").textContent = cap.rating ? `Rated ${cap.rating} of 5. Saved for ${acct().short}.` : cap.note ? `Note saved for ${acct().short}. Not rated yet.` : `Saved in this browser for ${acct().short}.`;
}
$("#side").addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest("[data-rate],[data-go]") as HTMLElement | null; if (!b || !S.scene) return;
  if (b.dataset.go === "plan") return openPlan();
  const v = +b.dataset.rate!;
  store.setRating(S.acct, S.scene.id, store.story(S.acct, S.scene.id).rating === v ? 0 : v); paintRate();
});
$("#side").addEventListener("input", (e) => { const t = e.target as HTMLTextAreaElement; if (t.id === "askNote" && S.scene) { store.setNote(S.acct, S.scene.id, t.value); paintRate(); } });
// Autoplay must not carry the presenter off the closing beat while they type.
$("#side").addEventListener("focusin", (e) => { if ((e.target as HTMLElement).id === "askNote" && S.playing) { stopPlay(); paintRail(); } });

/** The next (or previous) story of this workspace; account stories of other workspaces are skipped. */
function nextScene(d = 1): SceneDef | undefined { const all = stories(); if (!all.length) return undefined; const i = all.indexOf(S.scene!); return i < 0 ? all[0] : all[(i + d + all.length) % all.length]; }
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
  if (i < 0) { const p = nextScene(-1); if (p) openStory(p.id, p.steps.length - 1); return; }
  if (i >= S.scene.steps.length) { const nx = nextScene(); if (!nx) return goHome(); toast(`Next: ${shortOf(nx)}`); openStory(nx.id); return; }
  S.step = i; paintStory(false);
}
$("#rail").addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest("button") as HTMLElement | null; if (!b) return;
  if (b.dataset.i) { S.step = +b.dataset.i; paintStory(false); }
  else if (b.dataset.nav === "play") togglePlay(); else if (b.dataset.nav) go(+b.dataset.nav);
});
function stepStory(d: number) { const nx = nextScene(d); if (nx && nx !== S.scene) openStory(nx.id); }
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
    else if (b.dataset.all) { if (b.dataset.all === "1") stories().forEach((s) => s.group !== "Opening" && S.pick.add(s.id)); else S.pick.clear(); paintCompose(); }
  } else if (S.mode === "plan") {
    if (b.dataset.open) openStory(b.dataset.open, +(b.dataset.step ?? 0));
    else if (b.dataset.act) void planAct(b.dataset.act);
  }
});
/** The platform explorer step that shows a block's layer. */
const subFor = (it: Item): typeof S.sub => (it.layer === "fabric" || it.layer === "ecosystem" ? "fabric" : it.layer === "roadmap" ? "future" : "ring");
/** Open the platform explorer with one block selected. */
function openBlock(id: string) { const it = ITEM.get(id); if (!it) return; openPlatform(subFor(it)); S.sel = id; paintPlatform(); }
// Clicking a chip in the 3D scene selects it.
$("#stage").addEventListener("click", (e) => {
  const c = (e.target as HTMLElement).closest(".chip") as HTMLElement | null; if (!c?.dataset.id) return;
  if (S.mode === "platform") { S.sel = S.sel === c.dataset.id ? "" : c.dataset.id; paintPlatform(); }
  else openBlock(c.dataset.id);
});

world.onPick = (kind, id) => {
  if (kind === "item") {
    const it = ITEM.get(id); if (!it) return;
    if (S.mode !== "platform") openPlatform(subFor(it));
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
/** Light the building blocks and the rooms of a set of stories. Shared by the combination builder and the account plan. */
function lightStories(list: SceneDef[], snap: boolean) {
  const lit = new Set<string>(); const zones = new Set<string>();
  for (const s of list) { recipeOf(s.id).forEach((r) => lit.add(r)); Object.values(STAGING[s.id]?.place ?? {}).forEach((z) => z !== "deck" && zones.add(z)); }
  world.apply(blank({ mode: "ring", fabric: true, cards: true, partners: true, ghosts: [...lit].some((x) => ITEM.get(x)?.layer === "roadmap"), labels: "lit", lit }, "stack", [...zones], 2), snap);
  return lit;
}
function paintCompose(snap = false) {
  // Only stories of this workspace can be picked; a pick left over from another workspace is ignored.
  const picks = stories().filter((s) => S.pick.has(s.id));
  const lit = lightStories(picks, snap);
  const grp = (x: ReturnType<typeof groups>[number]) => `<h5 class="${x.g === "Account" ? "acct" : ""}"><i></i>${esc(x.name)}</h5>${x.list.map((s) => `<button class="it ${S.pick.has(s.id) ? "on" : ""}" data-id="${s.id}" role="checkbox" aria-checked="${S.pick.has(s.id)}"><span class="ck">${S.pick.has(s.id) ? "&#10003;" : ""}</span><span class="nm">${esc(shortOf(s))}</span></button>`).join("")}`;
  $("#panel").innerHTML = `<h3>What do you need to fix?</h3><p class="lead">Tick one problem or several. The platform above the hospital lights the blocks that story uses.</p>
    <div style="display:flex;gap:8px"><button class="btn" data-all="1">Select all</button><button class="btn" data-all="0">Clear</button></div>
    <div class="scroll">${groups().map(grp).join("") || `<p class="lead">No stories are available in this workspace.</p>`}</div>`;
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
$("#panelR").addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest("[data-open],[data-own]") as HTMLElement | null; if (!b) return;
  if (b.dataset.open) openStory(b.dataset.open);
  else if (b.dataset.own && S.mode === "plan") { store.setOwned(S.acct, b.dataset.own, !store.isOwned(S.acct, b.dataset.own)); paintPlanBlocks(b.dataset.own); }
});

// ---------------------------------------------------------------- account plan
const planModel = () => buildPlan(acct(), stories(), store.get(S.acct), recipeOf, shortOf, code);
function openPlan() {
  setMode("plan"); S.scene = undefined; world.clear();
  paintPlan(true);
}
function paintPlan(snap = false) {
  const m = planModel();
  $("#crumb").innerHTML = `<b>Account plan</b> &nbsp;&middot;&nbsp; ${esc(acct().name)}`;
  // Same scene as the combination builder: the blocks and rooms of the rated stories are lit.
  lightStories(m.rated.map((s) => s.sc), snap);
  $("#panel").innerHTML = planPanelHtml(m, stories(), shortOf, code);
  $("#panelR").innerHTML = planBlocksHtml(m);
  setHash();
}
/** After an "already owns" toggle: redraw the block lists and the next steps, leave the fields alone. */
function paintPlanBlocks(focus?: string) {
  const m = planModel(); const top = $("#panelR .scroll")?.scrollTop ?? 0;
  $("#panelR").innerHTML = planBlocksHtml(m);
  const sc = $("#panelR .scroll"); if (sc) sc.scrollTop = top;
  const steps = $("#planSteps"); if (steps) steps.innerHTML = stepsHtml(m);
  if (focus) ($(`#panelR [data-own="${focus}"]`) as HTMLElement | null)?.focus({ preventScroll: true });
}
$("#panel").addEventListener("input", (e) => {
  const t = e.target as HTMLInputElement; if (S.mode !== "plan") return;
  if (t.id === "planContact") store.setMeta(S.acct, { contact: t.value }); else if (t.id === "planNext") store.setMeta(S.acct, { nextStep: t.value });
});
async function planAct(act: string) {
  const m = planModel(); const stamp = new Date().toISOString().slice(0, 10); const name = `account-plan-${S.acct}-${stamp}`;
  if (act === "copy") toast((await copyText(planMarkdown(m))) ? "Plan copied as Markdown" : "Copy was blocked by the browser: use Download Markdown");
  else if (act === "md") { download(`${name}.md`, planMarkdown(m), "text/markdown"); toast("Markdown downloaded"); }
  else if (act === "json") { download(`${name}.json`, store.exportJSON(S.acct), "application/json"); toast("JSON downloaded"); }
  else if (act === "print") { $("#printable").innerHTML = planPrintHtml(m); window.print(); }
  else if (act === "import") {
    const text = await pickFile(".json,application/json"); if (text === null) return;
    try {
      // An export carries its account: it is restored into that workspace, never mixed into another one.
      const from = store.peekAccount(text);
      if (from && from !== S.acct && accountById(from)) setAcct(from, false);
      const n = store.importJSON(S.acct, text);
      if (S.mode === "plan") paintPlan(); toast(`Imported ${n} ${n === 1 ? "story" : "stories"} into ${acct().short}`);
    } catch (err) { toast(err instanceof Error ? err.message : "Import failed"); }
  }
}
addEventListener("beforeprint", () => { if (S.mode === "plan") $("#printable").innerHTML = planPrintHtml(planModel()); });

// ---------------------------------------------------------------- command palette
function palItems(): PalItem[] {
  const out: PalItem[] = [];
  for (const s of stories()) {
    const r = store.story(S.acct, s.id).rating; const g = s.group === "Account" ? `Account ${acct().short} ${acct().name}` : groupName(s.group);
    out.push({ kind: "story", id: s.id, label: shortOf(s), sub: `${code(s)} \u00b7 ${s.title}`, hay: [shortOf(s), s.title, s.group, g, code(s)].join(" ").toLowerCase(), tag: r ? `rated ${r} of 5` : undefined, tagCls: "beta" });
  }
  for (const i of CATALOG) out.push({ kind: "block", id: i.id, label: i.name, sub: LAYER_NAME[i.layer].split(":")[0] + (i.group ? ` \u00b7 ${i.group}` : ""), hay: [i.name, i.short, i.group ?? "", i.generic ?? ""].join(" ").toLowerCase(), tag: i.tag, tagCls: tagCls(i.tag) });
  const go: [string, string, string][] = [["home", "Home", "Stories and the account brief"], ["plan", "Account plan", `Rated stories, blocks and next steps for ${acct().short}`], ["platform", "Platform explorer", "Every block above the hospital"], ["compose", "Combination builder", "Pick problems, see the blocks"], ["help", "Controls", "Keys and how to read the picture"], ["sources", "Sources", "Every source behind the numbers"]];
  for (const [id, label, sub] of go) out.push({ kind: "go", id, label, sub, hay: `${label} ${sub}`.toLowerCase() });
  return out;
}
const palette = new Palette(app, palItems, (it) => {
  if (it.kind === "story") openStory(it.id);
  else if (it.kind === "block") openBlock(it.id);
  else if (it.id === "home") goHome(); else if (it.id === "plan") openPlan(); else if (it.id === "platform") openPlatform(); else if (it.id === "compose") openCompose();
  else if (it.id === "help" || it.id === "sources") { if (S.sheet !== it.id) openSheet(it.id); }
});

// ---------------------------------------------------------------- sheets
function openSheet(k: typeof S.sheet) { S.sheet = S.sheet === k ? "" : k; paintSheet(); }
function paintSheet() {
  const el = $("#sheet"); el.classList.toggle("show", !!S.sheet); if (!S.sheet) return;
  const x = `<button class="btn x" id="xBtn">Close <kbd>Esc</kbd></button>`;
  if (S.sheet === "help") {
    const rows: [string, string][] = [["Right / Left", "Next or previous beat. Right also approves a waiting approval."], ["Down / Up", "Next or previous story."], ["1 2 3", "Audience: Executive, IT director, Engineering."], ["Space", "Autoplay. Pauses at approvals."], ["N", "Presenter notes for the current beat."], ["S", "Sources."], ["P / C", "Platform explorer / Combination builder."], ["A", "Account plan for the current workspace: rated stories, building blocks, next steps."], ["/ or Ctrl+K", "Search stories and platform blocks. Cmd+K on a Mac."], ["V", "Switch the scene between 2D plan and isometric. The page reloads on the same route."], ["H", "Hide the interface."], ["F", "Full screen."], ["Esc", "Close a panel, or go home."], ["Mouse", "Drag to pan, wheel to zoom, double-click to reset. Click a room to zoom in. Click a pin or a platform block for detail."]];
    el.innerHTML = `${x}<h3>Controls</h3><dl class="aud">${rows.map(([k, v]) => `<dt><code>${k}</code></dt><dd>${v}</dd>`).join("")}</dl><h5>Reading the picture</h5><ul><li><b>Amber</b> beats are today, on any infrastructure. <b>Blue</b> beats are with Cisco Cloud Control, and are modeled.</li><li>White tiles are hospital systems. Blue glass tiles are Cisco Cloud Control capabilities.</li><li>Green is healthy, amber needs attention, red is down, grey with a question mark is unknown, pulsing blue is waiting for a person.</li><li>Lit rooms are in the story. The others recede.</li></ul>
      <h5>Workspaces and capture</h5><ul><li>The workspace switch in the top bar keeps each account apart: its own stories, ratings, notes and plan. The choice is kept in this browser and in the address as <code>?acct=</code>.</li><li>On a story's closing beat, rate how much the problem hurts and type what the room said. It is saved as you type, in this browser only.</li><li>The account plan turns the ratings into building blocks and next steps. Copy or download it as Markdown, download or import the JSON, or print it.</li></ul>`;
  } else if (S.sheet === "sources") {
    el.innerHTML = `${x}<h3>Sources</h3><p>Every number on screen carries a short source tag. The full numbered bibliography is in <code>sources.md</code>; nine research briefs with status tags and gap lists are in <code>research/</code>. ${SOURCES.length} platform and evidence sources are listed here.</p><p>A press report (Network World, 10 Nov 2026) says Australia, the EU and the UK are scheduled for February 2027. Cisco documentation still says United States only, so this explainer does too.</p>
      ${[...new Set(SOURCES.map((x) => x.group))].map((g) => `<h5>${esc(g)}</h5><ul class="src">${SOURCES.filter((x) => x.group === g).map((x) => `<li><b>[${x.id}]</b> ${esc(x.title)}${x.url ? ` <a href="${x.url}" target="_blank" rel="noopener">link</a>` : ""}</li>`).join("")}</ul>`).join("")}
      <h5>Healthcare customer evidence (vendor-reported)</h5><ul>${PROOF.map((p) => `<li><b>${esc(p.customer)}</b>: ${esc(p.outcome)} <a href="${p.url}" target="_blank" rel="noopener">link</a></li>`).join("")}</ul>
      <h5>Rules this explainer follows</h5><ul><li>Cloud Control is generally available in the United States only. Outcomes are modeled; no percentage is claimed for Cloud Control in healthcare.</li><li>Data Fabric holds machine data. It is not a clinical data repository and does not replace the EHR.</li><li>Any action that can touch clinical systems waits for a named person.</li><li>Domain controllers stay the systems of record.</li><li>No attacker procedures are shown.</li></ul>`;
  } else if (S.scene) {
    const sc = S.scene, st = sc.steps[S.step], sg = STAGING[sc.id];
    const lens = LENS_FACTS[sc.id] ?? []; const cap = store.story(S.acct, sc.id);
    el.innerHTML = `${x}<h3>Presenter notes</h3><p>${esc(sc.title)} &middot; step ${S.step + 1} of ${sc.steps.length}: <b>${esc(st.title)}</b></p>
      <h5>Say it three ways</h5><dl class="aud">${(Object.keys(AUD) as Aud[]).map((a) => `<dt>${AUD[a]}</dt><dd>${esc(st.say[a])}</dd>`).join("")}</dl>
      ${st.facts?.length ? `<h5>Numbers on this step</h5><ul>${st.facts.map((f) => `<li><b>${esc(f.v)}</b> ${esc(f.l)} <i>(${esc(f.s)})</i></li>`).join("")}</ul>` : ""}
      <h5>The setup</h5><p>${esc(sc.subtitle)}</p>
      <h5>Ask the room</h5><p>${esc(sg.ask)}</p>${cap.rating || cap.note ? `<p><i>Captured for ${esc(acct().short)}:</i> ${cap.rating ? `rated ${cap.rating} of 5.` : "not rated."}${cap.note ? ` &ldquo;${esc(cap.note)}&rdquo;` : ""}</p>` : ""}
      <h5>What stays with the hospital</h5><p>${esc(sg.stays)}</p>
      <h5>Caveat to keep in mind</h5><p>${esc(sc.caveat)}</p>
      ${lens.length ? `<h5>More evidence for this lens</h5><ul>${lens.map((f) => `<li><b>${esc(f.value)}</b> ${esc(f.label)} <i>(${esc(f.source)}${f.vendor ? ", vendor-reported" : ""})</i> <a href="${f.url}" target="_blank" rel="noopener">link</a></li>`).join("")}</ul>` : ""}
      ${PORTFOLIO[sc.id] ? `<h5>Cisco's wider portfolio for this use case</h5><ul>${PORTFOLIO[sc.id].products.map((p) => `<li><b>${esc(p.name)}</b>: ${esc(p.role)}${p.url ? ` <a href="${p.url}" target="_blank" rel="noopener">link</a>` : ""}</li>`).join("")}</ul>${PORTFOLIO[sc.id].partners.length ? `<p><i>Partner systems commonly in the picture:</i> ${PORTFOLIO[sc.id].partners.map(esc).join(", ")}.</p>` : ""}` : ""}
      <h5>Building blocks in this story</h5><div class="pills">${sg.recipe.map((r) => ITEM.get(r)).filter(Boolean).map((i) => `<span class="pill ${i!.layer}">${esc(i!.short)} &middot; ${esc(i!.tag)}</span>`).join("")}</div>`;
  } else { S.sheet = ""; el.classList.remove("show"); return; }
  $("#xBtn").onclick = () => openSheet(S.sheet);
}
$("#notesBtn").onclick = () => openSheet("notes");
$("#planBtn").onclick = () => openPlan();
$("#findBtn").onclick = (e) => { if (e.detail > 0) $("#findBtn").blur(); palette.open(); };
$("#srcBtn").onclick = () => openSheet("sources");
$("#helpBtn").onclick = () => openSheet("help");
$("#fsBtn").onclick = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());

// ---------------------------------------------------------------- keys and routing
addEventListener("keydown", (e) => {
  const k = e.key;
  // Ctrl+K or Cmd+K opens the search from anywhere, including from a field.
  if ((e.metaKey || e.ctrlKey) && !e.altKey && k.toLowerCase() === "k") { e.preventDefault(); palette.toggle(); return; }
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  // Typing in a field never triggers a shortcut. Escape leaves the field.
  if (isTyping(e.target)) { if (k === "Escape") (e.target as HTMLElement).blur(); return; }
  // Enter and Space on a focused button or link activate it, and nothing else.
  if ((k === "Enter" || k === " ") && (e.target as HTMLElement | null)?.closest?.("button, a, summary")) return;
  if (k === "Escape") { if (S.sheet) openSheet(S.sheet); else goHome(); }
  else if (k === "ArrowRight" || k === "PageDown") go(1);
  else if (k === "ArrowLeft" || k === "PageUp") go(-1);
  else if (k === "ArrowDown" && S.mode === "story") stepStory(1);
  else if (k === "ArrowUp" && S.mode === "story") stepStory(-1);
  else if (k === "Enter") { if (S.mode === "story") go(1); }
  else if (k === " ") { e.preventDefault(); if (S.mode === "story") togglePlay(); else if (S.mode === "home") openStory("opening"); }
  else if (k === "1" || k === "2" || k === "3") setAud((["exec", "dir", "eng"] as Aud[])[+k - 1]);
  else if (k === "n" || k === "N") { if (S.mode === "story") openSheet("notes"); }
  else if (k === "s" || k === "S") openSheet("sources");
  else if (k === "h" || k === "H") document.body.classList.toggle("clean");
  else if (k === "/") { e.preventDefault(); palette.open(); }
  else if (k === "?") openSheet("help");
  else if (k === "f" || k === "F") $("#fsBtn").click();
  else if (k === "p" || k === "P") openPlatform();
  else if (k === "c" || k === "C") openCompose();
  else if (k === "a" || k === "A") openPlan();
  else if (k === "v" || k === "V") setView(!ISO);
});
// A button clicked with the mouse gives focus back, so Space and Enter keep driving the story.
addEventListener("click", (e) => { if (e.detail > 0) { const b = (e.target as HTMLElement | null)?.closest?.("button"); if (b && document.activeElement === b) b.blur(); } });

function route() {
  const h = location.hash.replace(/^#\/?/, "").split("/");
  if (h[0] === "s" && h[1]) openStory(h[1], (+h[2] || 1) - 1);
  else if (h[0] === "platform") openPlatform((h[1] as typeof S.sub) || "ring");
  else if (h[0] === "compose") openCompose();
  else if (h[0] === "plan") openPlan();
  else if (h[0] && sceneById(h[0])) openStory(h[0]);
  else goHome();
}
addEventListener("hashchange", route);
store.rememberWorkspace(S.acct);
paintAud(); paintAcct(); paintView();
route();
if (q.has("notes")) openSheet("notes");
if (q.has("sources")) openSheet("sources");
if (q.has("clean")) document.body.classList.add("clean");
// Test hook for the automated checks.
(window as unknown as Record<string, unknown>).__app = { S, ALL, STAGING, CATALOG, ACCOUNTS, store, world, stage, palette, openStory, openPlatform, openCompose, openPlan, openBlock, setAcct, goHome, go, approve, get acct() { return S.acct; } };
