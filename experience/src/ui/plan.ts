import type { Account } from "../data/accounts";
import type { AccountState } from "../data/store";
import { CATALOG, ITEM, type Item } from "../data/catalog";
import type { SceneDef } from "../story/types";
import { ICON, esc, isGA, list, plural, tagCls } from "./util";

/** One story the customer rated or commented on. */
export interface PlanStory { sc: SceneDef; short: string; code: string; rating: number; note: string; teams: string; last: number }
export interface PlanModel {
  account: Account; date: string;
  /** Rated or annotated stories, highest rating first. */
  stories: PlanStory[];
  /** The ones with a rating: these drive the blocks and the next steps. */
  rated: PlanStory[];
  /** Union of the building blocks the rated stories need, in catalog order. */
  blocks: Item[]; toAdd: Item[]; owned: Item[]; ga: Item[]; notGa: Item[];
  /** How many rated stories use each block. */
  uses: Map<string, string[]>;
  steps: string[]; contact: string; nextStep: string;
  /** Stories in this workspace that have no rating yet. */
  unrated: number;
}

const TEAM: Record<string, string> = {
  security: "security operations", facilities: "infrastructure operations", ai: "the AI platform owners",
  "network operations": "network operations", "security operations": "security operations", "clinical operations": "clinical operations", "workplace and office operations": "workplace IT",
};
/** The teams to invite, read from a story's pillars ("Security, with Facilities and AI"). */
export function teamList(sc: SceneDef): string[] {
  if (TEAM[sc.pillars.trim().toLowerCase()]) return [TEAM[sc.pillars.trim().toLowerCase()]];
  const parts = sc.pillars.split(/,|\bwith\b|\band\b|&/i).map((p) => p.trim().toLowerCase()).filter(Boolean);
  const known = [...new Set(parts.map((p) => TEAM[p]).filter(Boolean))];
  if (known.length) return known;
  return parts.length > 1 && parts.every((p) => p.split(" ").length <= 3) ? parts.map((p) => `the ${p} team`) : ["the infrastructure, security and clinical operations leads"];
}
export const teamsFor = (sc: SceneDef) => list(teamList(sc));

export function buildPlan(account: Account, scoped: SceneDef[], state: AccountState, recipeOf: (id: string) => string[], shortOf: (s: SceneDef) => string, codeOf: (s: SceneDef) => string): PlanModel {
  const stories: PlanStory[] = scoped.filter((s) => state.stories[s.id] && (state.stories[s.id].rating > 0 || state.stories[s.id].note.trim()))
    .map((sc) => ({ sc, short: shortOf(sc), code: codeOf(sc), rating: state.stories[sc.id].rating, note: state.stories[sc.id].note.trim(), teams: teamsFor(sc), last: sc.steps.length }))
    .sort((a, b) => b.rating - a.rating || state.stories[b.sc.id].updated.localeCompare(state.stories[a.sc.id].updated));
  const rated = stories.filter((s) => s.rating > 0);
  const uses = new Map<string, string[]>();
  for (const s of rated) for (const r of recipeOf(s.sc.id)) if (ITEM.has(r)) uses.set(r, [...(uses.get(r) ?? []), s.short]);
  const blocks = CATALOG.filter((i) => uses.has(i.id));
  const own = new Set(state.owned);
  const toAdd = blocks.filter((i) => !own.has(i.id)), owned = blocks.filter((i) => own.has(i.id));
  const ga = blocks.filter((i) => isGA(i.tag)), notGa = blocks.filter((i) => !isGA(i.tag));
  const m: PlanModel = { account, date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), stories, rated, blocks, toAdd, owned, ga, notGa, uses, steps: [], contact: state.contact.trim(), nextStep: state.nextStep.trim(), unrated: scoped.length - rated.length };
  m.steps = nextSteps(m);
  return m;
}

/** Three plain next steps, generated from the top-rated stories and the blocks they need. */
export function nextSteps(m: PlanModel): string[] {
  const [a, b, c] = m.rated; if (!a) return [];
  const out: string[] = [];
  out.push(`Run a 60-minute working session on "${a.sc.title}" (rated ${a.rating} of 5) with ${a.teams}. Agree who owns the problem today and what a fix would be measured by.`);
  if (b) {
    const rest = [b, c].filter(Boolean) as PlanStory[];
    const teams = [...new Set(rest.flatMap((s) => teamList(s.sc)))];
    out.push(`Follow with ${rest.map((s) => `"${s.sc.title}" (${s.rating} of 5)`).join(" and ")}${rest.length > 1 ? ", in that order," : ""} with ${list(teams)}.`);
  } else {
    out.push(`Confirm what was said about "${a.sc.title}" with ${m.contact || "the customer sponsor"}, then rate more stories: ${plural(m.unrated, "story", "stories")} in this workspace ${m.unrated === 1 ? "has" : "have"} no rating yet.`);
  }
  const add = m.toAdd;
  if (add.length) {
    const first = [...add].sort((x, y) => Number(isGA(y.tag)) - Number(isGA(x.tag)) || (m.uses.get(y.id)?.length ?? 0) - (m.uses.get(x.id)?.length ?? 0)).slice(0, 3).map((i) => i.short);
    const wait = add.filter((i) => !isGA(i.tag));
    out.push(`Check which of the ${plural(add.length, "block")} still to add the customer already licenses, starting with ${list(first)}.${wait.length ? ` ${list(wait.map((i) => `${i.short} (${i.tag})`))} ${wait.length === 1 ? "is" : "are"} not generally available: present ${wait.length === 1 ? "it" : "them"} as direction, not as something to deploy now.` : ""}`);
  } else {
    out.push(`All ${plural(m.blocks.length, "block")} these stories need are marked as already in place. Ask which of them are connected to Cisco Cloud Control today, and who would approve connecting the rest.`);
  }
  return out;
}

const availLine = (m: PlanModel) => `${m.ga.length} of ${m.blocks.length} generally available${m.notGa.length ? `; ${m.notGa.length} not yet (${m.notGa.map((i) => `${i.short}: ${i.tag}`).join(", ")})` : ""}.`;

// ---------------------------------------------------------------- on screen
const rt = (n: number) => (n ? `<span class="rt r${n}" title="Rated ${n} of 5">${n}<i>/5</i></span>` : `<span class="rt r0" title="Note without a rating">&ndash;</span>`);

export function stepsHtml(m: PlanModel) { return m.steps.map((s) => `<li>${esc(s)}</li>`).join(""); }

/** Left panel: what hurts, the next steps, the fields and the actions. */
export function planPanelHtml(m: PlanModel, scoped: SceneDef[], shortOf: (s: SceneDef) => string, codeOf: (s: SceneDef) => string): string {
  const head = `<div><div class="ly">Account plan &middot; ${esc(m.date)}</div><h3>${esc(m.account.name)}</h3></div>`;
  const fields = `<h5><i></i>Agreed with the customer</h5>
    <label class="fld"><span>Customer contact</span><input type="text" id="planContact" value="${esc(m.contact)}" placeholder="Name and role" autocomplete="off" /></label>
    <label class="fld"><span>Agreed next step</span><textarea id="planNext" rows="2" placeholder="What both sides agreed to do, and by when">${esc(m.nextStep)}</textarea></label>`;
  const acts = (empty: boolean) => `<div class="acts" role="group" aria-label="Share the plan">
      <button class="btn primary" data-act="copy" ${empty ? "disabled" : ""}>Copy as Markdown</button><button class="btn" data-act="md" ${empty ? "disabled" : ""}>Download Markdown</button>
      <button class="btn" data-act="json">Download JSON</button><button class="btn" data-act="import">Import JSON</button><button class="btn" data-act="print" ${empty ? "disabled" : ""}>Print</button></div>`;
  if (!m.stories.length) {
    return `${head}<p class="lead">Nothing is rated yet in this workspace. The plan builds itself from what the room tells you.</p>
      <div class="scroll"><div class="empty"><ol><li>Play a story to its closing beat.</li><li>Ask the room the question on the card, then rate how much it hurts, 1 to 5.</li><li>Type what they said. Come back here: the stories, the building blocks and the next steps are filled in.</li></ol></div>
      <h5><i></i>Go to a closing beat</h5>${scoped.map((s) => `<button class="it" data-open="${s.id}" data-step="${s.steps.length - 1}"><span class="nm">${esc(shortOf(s))}</span><small>${esc(codeOf(s))}</small><span>&rsaquo;</span></button>`).join("")}
      ${fields}</div>${acts(true)}`;
  }
  return `${head}<p class="lead">${plural(m.rated.length, "story", "stories")} rated${m.stories.length > m.rated.length ? `, ${m.stories.length - m.rated.length} with a note only` : ""}. Kept in this browser only: export to share.</p>
    <div class="scroll">
      <h5><i></i>What hurts most</h5>
      ${m.stories.map((s) => `<div class="pr">${rt(s.rating)}<div class="pb"><b>${esc(s.sc.title)}</b><small>${esc(s.code)} &middot; ${esc(s.short)}</small>${s.note ? `<p>${esc(s.note)}</p>` : `<p class="none">No note yet.</p>`}</div><button class="btn ic" data-open="${s.sc.id}" data-step="${s.last - 1}" title="Play the closing beat of ${esc(s.short)}" aria-label="Play ${esc(s.short)}">${ICON.play}</button></div>`).join("")}
      <h5><i></i>Suggested next steps</h5>
      ${m.steps.length ? `<ol class="steps" id="planSteps">${stepsHtml(m)}</ol>` : `<p class="lead">Rate at least one story to get next steps.</p>`}
      ${fields}
    </div>${acts(false)}`;
}

/** Right panel: the blocks the rated stories need, split by what the customer already owns. */
export function planBlocksHtml(m: PlanModel): string {
  if (!m.blocks.length) return `<h3>Building blocks</h3><p class="lead">No blocks yet. They appear here once a story has a rating, with the availability of each one.</p>`;
  const row = (i: Item, on: boolean) => `<button class="it ${on ? "on" : ""}" data-own="${i.id}" role="checkbox" aria-checked="${on}" title="${esc(i.name)}. Used by: ${esc((m.uses.get(i.id) ?? []).join(", "))}"><span class="ck">${on ? "&#10003;" : ""}</span><span class="nm">${esc(i.short)}</span><small>${m.uses.get(i.id)?.length ?? 0}&times;</small><span class="tag ${tagCls(i.tag)}">${esc(i.tag)}</span></button>`;
  const pct = Math.round((m.ga.length / m.blocks.length) * 100);
  return `<h3>Building blocks</h3>
    <div class="bigN"><b>${m.blocks.length}</b><span>${m.blocks.length === 1 ? "block is" : "blocks are"} needed by ${m.rated.length === 1 ? "the rated story" : `the ${m.rated.length} rated stories`}. ${m.owned.length} already in place, ${m.toAdd.length} to add.</span></div>
    <div class="avail"><div class="bar" role="img" aria-label="${m.ga.length} of ${m.blocks.length} blocks generally available"><i style="width:${pct}%"></i></div>
      <p><b class="g">${m.ga.length} generally available</b>${m.notGa.length ? ` &middot; <b class="b">${m.notGa.length} not yet</b>: ${m.notGa.map((i) => `${esc(i.short)} (${esc(i.tag)})`).join(", ")}` : " &middot; none in beta or announced only"}</p></div>
    <div class="scroll">
      <h5><i></i>To add (${m.toAdd.length})</h5>${m.toAdd.map((i) => row(i, false)).join("") || `<p class="lead">Nothing to add: every block is marked as already in place.</p>`}
      <h5 class="own"><i></i>Already in place (${m.owned.length})</h5>${m.owned.map((i) => row(i, true)).join("") || `<p class="lead">Tick a block above when the customer already owns it.</p>`}
    </div>
    <div class="math">The number after each block is how many rated stories use it. Availability is the catalog's wording; Cisco Cloud Control is generally available in the United States only.</div>`;
}

// ---------------------------------------------------------------- export
export function planMarkdown(m: PlanModel): string {
  const L: string[] = [];
  const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ");
  L.push(`# Account plan: ${m.account.name}`, "", `Date: ${m.date}  `, `Customer contact: ${m.contact || "not recorded"}  `, `Agreed next step: ${m.nextStep.replace(/\s*\n\s*/g, " ") || "not recorded"}`, "");
  L.push("## What hurts most", "");
  if (m.stories.length) { L.push("| Rating | Story | What they said |", "|---|---|---|"); for (const s of m.stories) L.push(`| ${s.rating ? `${s.rating} of 5` : "not rated"} | ${cell(s.sc.title)} (${cell(s.code)}) | ${cell(s.note) || "No note."} |`); }
  else L.push("No story is rated yet.");
  L.push("", "## Suggested next steps", ""); m.steps.forEach((s, i) => L.push(`${i + 1}. ${s}`)); if (!m.steps.length) L.push("Rate at least one story to get next steps.");
  L.push("", `## Building blocks (${m.blocks.length})`, "");
  if (m.blocks.length) {
    L.push(availLine(m), "");
    const row = (i: Item) => `- ${i.name} (${i.tag}), used by ${plural(m.uses.get(i.id)?.length ?? 0, "rated story", "rated stories")}`;
    L.push(`### To add (${m.toAdd.length})`, "", ...(m.toAdd.length ? m.toAdd.map(row) : ["- None."]), "", `### Already in place (${m.owned.length})`, "", ...(m.owned.length ? m.owned.map(row) : ["- None recorded."]));
  } else L.push("None yet.");
  L.push("", "---", "", `${m.account.caveat} Outcomes with Cisco Cloud Control are modeled. Cisco Cloud Control is generally available in the United States only.`, "");
  return L.join("\n");
}

/** The plan as a plain document for the print stylesheet. */
export function planPrintHtml(m: PlanModel): string {
  const blockList = (xs: Item[], none: string) => (xs.length ? `<ul>${xs.map((i) => `<li><b>${esc(i.name)}</b> <span class="t">${esc(i.tag)}</span> <span class="u">used by ${plural(m.uses.get(i.id)?.length ?? 0, "rated story", "rated stories")}</span></li>`).join("")}</ul>` : `<p>${none}</p>`);
  return `<header><p class="k">Account plan &middot; ${esc(m.date)}</p><h1>${esc(m.account.name)}</h1>
      <dl><dt>Customer contact</dt><dd>${esc(m.contact) || "Not recorded"}</dd><dt>Agreed next step</dt><dd>${esc(m.nextStep) || "Not recorded"}</dd></dl></header>
    <h2>What hurts most</h2>
    ${m.stories.length ? `<table><thead><tr><th>Rating</th><th>Story</th><th>What they said</th></tr></thead><tbody>${m.stories.map((s) => `<tr><td class="r">${s.rating ? `${s.rating} of 5` : "Not rated"}</td><td><b>${esc(s.sc.title)}</b><br /><span class="u">${esc(s.code)}</span></td><td>${esc(s.note) || "No note."}</td></tr>`).join("")}</tbody></table>` : "<p>No story is rated yet.</p>"}
    <h2>Suggested next steps</h2>${m.steps.length ? `<ol>${stepsHtml(m)}</ol>` : "<p>Rate at least one story to get next steps.</p>"}
    <h2>Building blocks (${m.blocks.length})</h2>
    ${m.blocks.length ? `<p>${esc(availLine(m))}</p><h3>To add (${m.toAdd.length})</h3>${blockList(m.toAdd, "None.")}<h3>Already in place (${m.owned.length})</h3>${blockList(m.owned, "None recorded.")}` : "<p>None yet.</p>"}
    <footer>${esc(m.account.caveat)} Outcomes with Cisco Cloud Control are modeled. Cisco Cloud Control is generally available in the United States only.</footer>`;
}
