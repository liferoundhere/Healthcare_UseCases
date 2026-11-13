import { SCENES } from "./scenes";
import { EXTRA } from "./extra";
import { AI_SCENES, AI_STAGING } from "./ai";
import { ACCOUNT_SCENES, ACCOUNT_STAGING } from "./accounts";
import type { SceneDef } from "./types";

/** Where each story node stands in the 3D hospital, which building blocks it uses, and the presenter's closing question. */
export interface Staging {
  short: string;
  place: Record<string, string>;
  recipe: string[];
  ask: string;
  stays: string;
}

const deck = (...ids: string[]) => Object.fromEntries(ids.map((i) => [i, "deck"]));

export const STAGING: Record<string, Staging> = {
  opening: {
    short: "The story so far",
    place: { bed: "ward", ehr: "dc", plantn: "plant", clinicn: "clinic", homen: "home", vendor: "outside", team: "office", ...deck("agent", "canvas", "human") },
    recipe: ["canvas", "assistant", "topology", "inventory", "workflows", "audit"],
    ask: "Which of these rooms would you most like to stop walking between?",
    stays: "Every domain controller, the EHR and your clinical teams stay exactly where they are.",
  },
  netops: {
    short: "Network operations",
    place: { ap: "ward", core: "net", dcf: "dc", wanr: "clinic", eng: "office", tick: "office", ...deck("asst", "topo", "wf", "appr") },
    recipe: ["topology", "assistant", "workflows", "actions", "meraki", "catc", "sdwan", "nexus", "twin"],
    ask: "How many consoles does your on-call engineer open before the first useful answer?",
    stays: "Meraki, Catalyst Center, SD-WAN Manager and Nexus Dashboard stay the systems of record. Engineers still own design and change approval.",
  },
  secops: {
    short: "Security operations",
    place: { dev: "ward", ident: "office", fw: "net", soc: "office", ext: "outside", ...deck("cid", "canvas", "sccn", "appr", "aud") },
    recipe: ["canvas", "identity", "scc", "ise", "duo", "splunk", "audit", "workflows", "okta", "msad"],
    ask: "In the first hour of an event, how do your teams agree on how big it is?",
    stays: "Your SIEM, firewalls and identity providers stay in place. Containment decisions stay with security and clinical leadership.",
  },
  clinops: {
    short: "Clinical operations",
    place: { nurse: "ward", devs: "ward", ehrn: "dc", scribe: "clinic", help: "office", vend: "outside", ...deck("te", "canvas", "obs", "gate") },
    recipe: ["canvas", "te", "agentobs", "aidefense", "sdwan", "meraki", "workflows"],
    ask: "Who finds out first when a clinical tool stalls: your operations team or a nurse?",
    stays: "The EHR, the scribe vendor and the clinical record are untouched. Clinicians review every note and every read.",
  },
  workops: {
    short: "Workplace operations",
    place: { desk: "office", access: "office", rooms: "office", it: "office", bldg: "plant", staffai: "outside", ...deck("inv", "spc", "asst", "def") },
    recipe: ["inventory", "assistant", "webex", "spaces", "aidefense", "agentobs", "meraki"],
    ask: "Can anyone list the AI tools your staff used this week, and what they cost?",
    stays: "Webex Control Hub, Cisco Spaces and your building systems stay the systems of record.",
  },
  security: {
    short: "Security",
    place: { pump: "ward", mon: "ward", lib: "dc", ehr: "dc", phones: "net", dest: "outside", soc: "office", nac: "office", biomed: "office", fw: "office", edr: "office", ...deck("canvas", "approve", "ise", "audit") },
    recipe: ["canvas", "workflows", "scc", "ise", "catc", "identity", "audit", "splunk"],
    ask: "If one pump misbehaves tonight, what is the first thing your teams turn off, and who decides?",
    stays: "ISE and Catalyst Center stay the systems of record, along with the SIEM and clinical teams. Plan an out-of-band path in case containment cuts cloud reach.",
  },
  facilities: {
    short: "Facilities",
    place: { room: "ward", idf: "net", img: "imaging", noc: "office", bms: "plant", gen: "plant", clinic: "clinic", home: "home", ...deck("topo", "inv", "lake", "spaces") },
    recipe: ["topology", "inventory", "meraki", "catc", "sdwan", "lake", "spaces", "hospital"],
    ask: "When a room loses a call, who owns the closet, the power and the switch at 3 a.m.?",
    stays: "Domain controllers stay the systems of record. The patient's home internet is not the hospital's, and Spaces here is not a location system.",
  },
  ai: {
    short: "AI in care",
    place: { mic: "clinic", md: "clinic", ct: "imaging", gpu: "dc", pacs: "dc", vendor: "outside", up: "outside", chat: "outside", ...deck("te", "def", "gate", "tok") },
    recipe: ["te", "aidefense", "agentobs", "canvas", "intersight", "nexus"],
    ask: "When the scribe stalls, who can prove whether it is our network, the vendor or their supplier?",
    stays: "The clinical record stays in the EHR. AI Defense does not read the note. Agent Builder and App Builder are not GA.",
  },
  ehr: {
    short: "EHR slow",
    place: { wow: "ward", bridge: "office", wifi: "net", wan: "net", vdi: "dc", ehr: "dc", store: "dc", ...deck("te", "canvas", "dcv") },
    recipe: ["canvas", "deepreason", "te", "intersight", "nexus", "meraki", "catc", "lake", "splunk"],
    ask: "Next time the EHR spins, how long until you know which tier it is?",
    stays: "Citrix, the network controllers and the EHR vendor tools stay in place. Cloud Control narrows the tier; owners still make the fix.",
  },
  iomt: {
    short: "Medical devices",
    place: { pumps: "ward", img: "imaging", guest: "net", net: "net", scan: "office", cmms: "office", sec: "office", ...deck("id", "lake", "app", "seg") },
    recipe: ["identity", "ise", "lake", "catalog", "workflows", "catc", "canvas", "hospital"],
    ask: "Can you list every infusion pump on your network and say who owns it, today?",
    stays: "No agent goes on the pump and patching stays on the clinical engineering calendar. Segmentation limits exposure; it does not replace patching.",
  },
  ransom: {
    short: "Downtime",
    place: { idn: "office", ehr: "dc", bak: "dc", clean: "dc", pharm: "pharmlab", lab: "pharmlab", ed: "ed", amb: "ed", ...deck("canvas", "zone", "app") },
    recipe: ["canvas", "scc", "topology", "ise", "workflows", "audit", "splunk"],
    ask: "In hour one of an outage, who decides which system comes back first?",
    stays: "Downtime procedures stay on paper and in the clinical teams. Cloud Control scopes and restores; it never decides care. The timing here is illustrative.",
  },
  wifi: {
    short: "Clinical Wi-Fi",
    place: { ap1: "ward", ap2: "ward", badge: "ward", nc: "ward", idf: "net", rtls: "net", ...deck("canvas", "mer", "spaces") },
    recipe: ["canvas", "meraki", "catc", "spaces", "webex"],
    ask: "When a badge drops in a stairwell, whose problem is it, and how do you know?",
    stays: "The wireless controller, the voice platform and nurse call stay the systems of record. Spaces is not a patient-location source.",
  },
  imaging: {
    short: "Imaging",
    place: { ct: "clinic", wan: "net", pacs: "dc", ai: "dc", rad: "imaging", ...deck("te", "fab", "lake") },
    recipe: ["te", "nexus", "intersight", "lake", "sdwan", "canvas"],
    ask: "When a stroke study is slow, can you tell in minutes whether it is the link, the PACS or the AI queue?",
    stays: "PACS, VNA and the radiology worklist stay the systems of record. Imaging AI does not always speed the read; the point here is visibility.",
  },
  home: {
    short: "Hospital at home",
    place: { kit: "home", cell: "home", isp: "outside", video: "office", cmd: "office", ehr: "dc", ...deck("te", "canvas", "zt") },
    recipe: ["te", "secureaccess", "canvas", "sdwan", "duo"],
    ask: "When a home video visit fails, can you tell the clinician whose problem it is?",
    stays: "The video platform, the RPM vendor and the EHR stay as they are. The patient's broadband is never the hospital's to fix.",
  },
  wan: {
    short: "Acquired clinic",
    place: { clinic: "clinic", rdp: "clinic", circ: "clinic", ehr: "dc", soc: "office", ip: "office", ...deck("inv", "gate", "idb", "sdw") },
    recipe: ["inventory", "topology", "scc", "duo", "sdwan", "meraki", "infoblox", "ciscoiq"],
    ask: "On the Monday after a close, what do you know about the clinic network before you give it EHR access?",
    stays: "The seller's equipment stays until the replacement is proven. Integration order and approvals remain a program decision.",
  },
  identity: {
    short: "Identity",
    place: { nurse: "ward", glass: "ed", vendor: "outside", okta: "outside", ad1: "dc", ad2: "dc", ...deck("cid", "app", "aud") },
    recipe: ["identity", "duo", "ise", "okta", "msad", "workflows", "audit"],
    ask: "Today, who approves a vendor logging into a device, and where is that recorded?",
    stays: "Your directories and IdP stay in place. Break-glass remains a clinical safety path; the change is that it is logged and reviewed.",
  },
  compliance: {
    short: "Compliance",
    place: { cork: "office", cmms: "office", grc: "office", shot: "office", surv: "office", dhcp: "net", nac: "net", ...deck("topo", "audit", "lake", "human") },
    recipe: ["topology", "inventory", "audit", "lake", "fedsearch", "servicenow", "s3"],
    ask: "If a surveyor asks tomorrow, how long does it take to prove what you isolated, and when?",
    stays: "The compliance program, the risk analysis and the attestation stay with you. Splunk guidance puts HIPAA alignment on the customer.",
  },
  aiwork: {
    short: "AI at work",
    place: { room: "clinic", ap: "clinic", md: "clinic", vendor: "outside", up: "outside", chat: "outside", ...deck("te", "def", "tok") },
    recipe: ["te", "aidefense", "agentobs", "meraki", "canvas"],
    ask: "When the scribe stops, how long until you know whether it is your network or someone upstream?",
    stays: "The clinician reviews every note, and the scribe vendor remains the vendor. Cloud Control labels the path; it does not fix the vendor.",
  },
};

Object.assign(STAGING, AI_STAGING, ACCOUNT_STAGING);

/** Order: opening, lenses, flagships, use cases, AI use cases, then account stories (shown only in their workspace). */
export const ALL: SceneDef[] = [...EXTRA, ...SCENES, ...AI_SCENES, ...ACCOUNT_SCENES];
export const sceneById = (id: string) => ALL.find((s) => s.id === id);

/** Display number inside its group, e.g. "UC 4". */
export function code(sc: SceneDef): string {
  const same = ALL.filter((s) => s.group === sc.group);
  const i = same.indexOf(sc) + 1;
  return sc.group === "Use case" ? `Use case ${i}` : sc.group === "Flagship" ? `Flagship ${i}` : sc.group === "Operating lens" ? `Lens ${i}` : sc.group === "AI use case" ? `AI ${i}` : sc.group === "Account" ? `Account ${ALL.filter((s) => s.group === "Account" && s.account === sc.account).indexOf(sc) + 1}` : "Opening";
}
