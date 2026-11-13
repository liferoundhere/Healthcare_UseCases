import type { IconKind } from "./icons";
import type { Aud, LinkDef, NodeDef, SceneDef } from "./types";

/**
 * Scenes written for the 3D experience: the opening film and four operating lenses.
 * Same rules as scenes.ts: outcomes are modeled, no percentage is claimed for Cloud Control,
 * every number carries its source, and anything that can touch care waits for a person.
 */
const n = (id: string, icon: IconKind, title: string, sub: [string, string, string], hidden = false): NodeDef => ({ id, x: 0, y: 0, icon, title, sub: { exec: sub[0], dir: sub[1], eng: sub[2] }, hidden });
const k = (a: string, b: string, bend = 0): LinkDef => ({ id: `${a}-${b}`, a, b, bend });
const s = (exec: string, dir: string, eng: string): Record<Aud, string> => ({ exec, dir, eng });

export const EXTRA: SceneDef[] = [
  {
    id: "opening",
    group: "Opening",
    title: "The hospital behind the hospital",
    pillars: "The whole story in eight beats",
    subtitle: "Every bedside depends on infrastructure the patient never sees. This is how it is run today, and what changes.",
    zones: [],
    nodes: [
      n("bed", "monitor", "The bedside", ["Where it all lands", "Clinical floor", "Monitors, pumps, badges"]),
      n("ehr", "server", "EHR and clinical apps", ["The record of care", "Application team", "Hosted or on premises"]),
      n("plantn", "gear", "Building systems", ["Air, power, access", "Facilities", "BMS and OT"]),
      n("clinicn", "building", "Clinics", ["Care, 40 miles out", "Ambulatory", "One circuit each"]),
      n("homen", "home", "Patients at home", ["A ward without walls", "Hospital at home", "Someone else's broadband"]),
      n("vendor", "cloud", "Vendors and cloud", ["Scribes, imaging AI, SaaS", "Third parties", "Outside your map"]),
      n("team", "people", "The bridge call", ["People as the integration layer", "Five teams, one phone line", "Swivel-chair correlation"], true),
      n("agent", "chat", "Cisco agents", ["Do the legwork", "One per domain", "Called on in AI Canvas"], true),
      n("canvas", "canvas", "AI Canvas", ["One shared investigation", "People and agents together", "Reasoning kept on the page"], true),
      n("human", "person", "A named approver", ["Decides what changes", "Clinical or IT owner", "L3: execute after approve"], true),
    ],
    links: [k("bed", "ehr"), k("clinicn", "ehr", -0.1), k("homen", "clinicn"), k("ehr", "vendor", 0.12), k("plantn", "ehr", 0.15), k("team", "ehr"), k("team", "bed", 0.1), k("agent", "canvas"), k("canvas", "human"), k("canvas", "ehr"), k("human", "bed", 0.1)],
    steps: [
      {
        phase: "today", title: "A hospital is a network with a pulse",
        say: s(
          "Every bedside, clinic and living room in a health system depends on infrastructure the patient never sees.",
          "Clinical floors, the data center, the plant, the clinics and the home are one estate. They are rarely run as one.",
          "Campus fabric, WAN, data center, OT, cloud and a consumer ISP at the patient's home: different underlays, one care pathway.",
        ),
        l: { "bed-ehr": "ok", "clinicn-ehr": "ok", "homen-clinicn": "ok", "ehr-vendor": "ok", "plantn-ehr": "ok" },
        facts: [{ v: "6,100", l: "U.S. hospitals", s: "AHA 2024 survey, published 2026" }, { v: "358", l: "Hospital-at-home sites approved by CMS", s: "CMS, 19 Oct 2026" }],
        fx: { cam: "wide", platform: "hidden" },
      },
      {
        phase: "today", title: "It is run from many rooms",
        say: s(
          "Each part of that estate grew its own console and its own team. Nobody set out to build fifteen control rooms.",
          "Wireless, WAN, data center, firewall, identity, monitoring, collaboration: each has an owner, a tool and a queue.",
          "Every console is the system of record for its own domain, with its own identifiers, alerts and change process.",
        ),
        fx: { cam: "wide", platform: "scattered", chipLabels: true },
      },
      {
        phase: "today", title: "When something breaks, people become the integration layer",
        say: s(
          "The first hour of an incident goes to working out whose problem it is. The care team waits while that happens.",
          "Each team proves it is not them. Mean time to innocence has no published healthcare benchmark, so measure your own.",
          "Correlation happens on a bridge call: an alert ID, a MAC address, a serial number and a flow, matched by hand.",
        ),
        show: ["team"], n: { ehr: "warn", bed: "warn", team: "warn" },
        l: { "bed-ehr": "warn", "team-ehr": "unknown", "team-bed": "unknown" },
        clock: { label: "Time to a shared picture", mode: "run" },
        facts: [{ v: "No benchmark", l: "Mean time to innocence: measure it locally", s: "Research gap" }, { v: "64 days", l: "Global mean time to contain a breach, all industries", s: "IBM 2026" }],
        fx: { cam: "wide", platform: "scattered", chipLabels: true },
      },
      {
        phase: "cisco", title: "Cisco Cloud Control: one place where the work connects",
        say: s(
          "Cisco Cloud Control puts networking, security, compute, observability and collaboration behind one login and one view.",
          "It connects the work between the domain controllers. Each controller stays responsible for its own domain.",
          "Generally available to US customers since 25 Aug 2026, included with eligible Essential and Advantage subscriptions. Other regions follow.",
        ),
        hide: ["team"], n: { ehr: "ok", bed: "ok" }, l: { "bed-ehr": "ok", "team-ehr": "off", "team-bed": "off" },
        clock: { label: "", mode: "hide" },
        fx: { cam: "platform", platform: "ring", chipLabels: true, fabric: false, labelLayers: ["domain"] },
      },
      {
        phase: "cisco", title: "Cisco Data Fabric: the machine data underneath",
        say: s(
          "Underneath sits Cisco Data Fabric, powered by Splunk: network, security, identity and device telemetry in one layer.",
          "It reaches third-party stores where the data already lives. It is machine data. The clinical record stays in the EHR.",
          "Machine Data Lake and Catalog are GA; Federated Search reaches Amazon S3, Azure storage, Snowflake and Databricks from Splunk Cloud.",
        ),
        fx: { cam: "platform", platform: "ring", chipLabels: true, fabric: true, labelLayers: ["fabric", "ecosystem"] },
      },
      {
        phase: "cisco", title: "Agents do the legwork. A person approves.",
        say: s(
          "Agents gather the evidence and propose the fix. A named person decides. That is the operating model in a hospital.",
          "People and agents share one AI Canvas, so the investigation survives the shift change and the escalation.",
          "Cisco's trust ladder runs L1 diagnose, L2 recommend, L3 execute after approval, L4 act within policy. Care-affecting change stays at L3.",
        ),
        show: ["agent", "canvas", "human"], n: { human: "pending" },
        l: { "agent-canvas": "ok", "canvas-human": "pending", "canvas-ehr": "ok" },
        fx: { platform: "ring", fabric: true, zones: ["dc"] },
      },
      {
        phase: "cisco", title: "The change runs where policy lives",
        say: s(
          "Once approved, the change executes in the system that owns it, and the record shows who approved what.",
          "Cloud Control does not replace Meraki, Catalyst Center, ISE or Splunk. They stay the systems of record.",
          "Rollback in Cisco's material refers to agent versions. A network rollback is still a planned change in the domain controller.",
        ),
        n: { human: "ok" }, l: { "canvas-human": "ok", "human-bed": "ok" },
        fx: { platform: "ring", fabric: true, lit: ["ise", "catc", "scc", "audit", "workflows"], chipLabels: false, zones: ["ward"] },
      },
      {
        phase: "cisco", title: "Many combinations, one way of working",
        say: s(
          "Every story that follows is a different combination of the same building blocks. Start with the problem you have.",
          "Thirteen use cases, four operating lenses. Each ends with what is available today and what stays with your teams.",
          "Status tags are on every block: generally available, beta, alpha or announced. Outcomes shown are modeled, not measured.",
        ),
        fx: { cam: "hero", platform: "ring", fabric: true },
        chips: [["Cisco Cloud Control", "GA, US only"], ["AI Canvas, AI Assistant", "GA (US)"], ["Data Fabric: lake, catalog, federated search", "GA, listed regions"], ["Studio, Marketplace, autonomous loop", "Announced"]],
      },
    ],
    caveat: "Cisco Cloud Control is generally available in the United States only (25 Aug 2026). Outcomes in this explainer are modeled. No Cisco healthcare customer metric for Cloud Control was found.",
  },

  {
    id: "netops",
    group: "Operating lens",
    title: "Network operations: from four consoles to one conversation",
    pillars: "Network operations",
    subtitle: "Campus, wireless, WAN and data center each have a tool and an expert. The engineer joins them up by hand.",
    zones: [],
    nodes: [
      n("ap", "wifi", "Clinical Wi-Fi", ["Badges, carts, pumps", "Wireless team", "Its own controller"]),
      n("core", "router", "Campus core", ["Every floor meets here", "Campus team", "Its own controller"]),
      n("dcf", "rack", "Data center fabric", ["Where the EHR lives", "Data center team", "Its own dashboard"]),
      n("wanr", "router", "Clinic WAN", ["40 miles away", "WAN team", "Its own manager"]),
      n("eng", "person", "Network engineer", ["The correlation engine", "On call", "Four logins, one brain"]),
      n("tick", "doc", "Ticket queue", ["Where the day goes", "Service desk", "Copy, paste, reassign"]),
      n("topo", "topology", "One topology", ["Every site, one map", "Campus to clinic", "Layer 3: VLAN, VRF, subnet"], true),
      n("asst", "chat", "AI Assistant", ["Ask in plain language", "Front door", "Answers across products"], true),
      n("wf", "gear", "Agentic Workflow", ["A fix, made repeatable", "Reusable runbook", "Waits for approval"], true),
      n("appr", "person", "Change approver", ["A person decides", "Network lead", "L3: execute after approve"], true),
    ],
    links: [k("ap", "core"), k("core", "dcf"), k("wanr", "core", -0.1), k("eng", "tick"), k("eng", "core", 0.1), k("topo", "core"), k("topo", "wanr", -0.08), k("asst", "topo"), k("asst", "wf"), k("wf", "appr"), k("appr", "wanr", 0.1)],
    steps: [
      {
        phase: "today", title: "Four networks, four consoles",
        say: s(
          "The network that carries care is really four networks, each with its own tool and its own expert.",
          "Wireless, campus, data center and WAN teams each see their own slice. No one sees the path a nurse's click takes.",
          "Separate controllers, separate alert streams, separate topologies. Cross-domain questions have no single place to be asked.",
        ),
        l: { "ap-core": "ok", "core-dcf": "ok", "wanr-core": "ok" },
        facts: [{ v: "77%", l: "IT leaders who faced a major network outage from congestion, attack or misconfiguration (cross-industry)", s: "Cisco networking research 2025, vendor-reported" }, { v: "21%", l: "Healthcare IT professionals who say they are critically understaffed", s: "Nile via IT Brew 2026, vendor-reported" }],
        fx: { zones: ["ward", "dc"] },
      },
      {
        phase: "today", title: "The engineer is the correlation engine",
        say: s(
          "A clinic says the EHR is slow. One engineer opens four consoles and a ticket queue to find out where.",
          "The skill that resolves it is tribal: knowing which console to trust, and who to call when it is not yours.",
          "Path, interface, client and fabric data sit in four tools. The join happens in one person's head.",
        ),
        n: { wanr: "warn", eng: "warn", tick: "unknown" }, l: { "wanr-core": "warn", "eng-tick": "unknown", "eng-core": "unknown" },
        clock: { label: "Time to find the tier", mode: "run" },
        callout: { node: "eng", text: "Four logins before the first useful answer." },
      },
      {
        phase: "today", title: "A hospital never closes, so change waits",
        say: s(
          "Known fixes queue behind change windows, because nobody wants to learn at 2 p.m. what a change does to a clinical floor.",
          "Every change carries clinical risk, so it is batched, reviewed and delayed. The backlog becomes its own risk.",
          "There is no safe place to rehearse a change against the live topology. Validation is a maintenance window.",
        ),
        n: { core: "pending", eng: "warn" }, l: { "eng-core": "pending" },
        facts: [{ v: "31%", l: "Network teams that call themselves completely successful at monitoring and managing the network", s: "EMA Megatrends 2026, vendor-reported" }],
        fx: { zones: ["net"] },
      },
      {
        phase: "cisco", title: "One topology, asked in plain language",
        say: s(
          "The engineer asks one question in plain language and sees which site needs attention first, with the reasoning shown.",
          "Topology spans Meraki, Catalyst Center, SD-WAN and Nexus. AI Insights rank the sites and show the evidence.",
          "Layer 3 topology across domains shipped 11 Aug 2026; AI Insights in Topology on 25 Aug 2026. Controllers stay authoritative.",
        ),
        show: ["topo", "asst"], n: { wanr: "warn", eng: "ok", tick: "ok", core: "ok", topo: "ok", asst: "ok" },
        l: { "topo-core": "ok", "topo-wanr": "warn", "asst-topo": "ok", "wanr-core": "warn", "eng-core": "off", "eng-tick": "idle" },
        clock: { label: "", mode: "hide" },
      },
      {
        phase: "cisco", title: "The fix becomes a workflow, and waits for a person",
        say: s(
          "The recommended fix is packaged as a workflow. It does nothing until a named person approves it.",
          "A good fix is captured once and reused. The approval and the result are recorded where everyone can see them.",
          "Agentic Workflows are GA. Running one from inside AI Canvas is beta. Digital Twin, for rehearsing a change, is alpha.",
        ),
        show: ["wf", "appr"], n: { appr: "pending", wf: "ok" }, l: { "asst-wf": "ok", "wf-appr": "pending" },
        modal: { title: "Approve the clinic WAN fix", lines: ["Move clinic traffic for the EHR to the healthy transport and correct the path preference.", "Approver: Network operations lead", "Trust level: L3, execute after approve", "Executes in: Catalyst SD-WAN Manager"], button: "Approve" },
      },
      {
        phase: "cisco", title: "The engineer reviews exceptions, not dashboards",
        say: s(
          "The clinic is back to normal, and the engineer's day is spent on judgment calls rather than on four dashboards.",
          "What changes is the operating model: fewer swivel-chair hours, more time on design, and one record of what was done.",
          "The change executed in SD-WAN Manager, which stays the system of record. This outcome is modeled, not measured.",
        ),
        n: { appr: "ok", wanr: "ok" }, l: { "wf-appr": "ok", "appr-wanr": "ok", "wanr-core": "ok", "topo-wanr": "ok" },
        chips: [["Topology, AI Insights", "GA (US)"], ["AI Assistant", "GA (US)"], ["Agentic Workflows", "GA; run from canvas is beta"], ["Digital Twin", "Alpha"]],
      },
    ],
    caveat: "Modeled operating model. Domain controllers stay the systems of record. Digital Twin is alpha and the autonomous loop is roadmap.",
  },

  {
    id: "secops",
    group: "Operating lens",
    title: "Security operations: scope first, then contain",
    pillars: "Security operations",
    subtitle: "More alerts than people, and every tool holds a different identifier for the same device.",
    zones: [],
    nodes: [
      n("dev", "pump", "Devices with no agent", ["Pumps, monitors, imaging", "Clinical engineering", "Cannot run endpoint software"]),
      n("ident", "badge", "Clinician and vendor sign-ins", ["Who is on the network", "Identity team", "Several directories"]),
      n("fw", "lock", "Firewalls", ["Sees a flow", "Network security", "5-tuple, no owner"]),
      n("soc", "eye", "SOC queue", ["Sees an alert", "Analysts on shift", "Alert ID, no context"]),
      n("ext", "cloud", "The internet", ["Where it is going", "Outside", "Unknown destination"]),
      n("canvas", "canvas", "AI Canvas", ["One investigation", "SOC, network, biomed", "Shared, persistent"], true),
      n("cid", "badge", "Cisco Identity", ["Who and what", "Okta, ISE, AD in one view", "Posture and risk"], true),
      n("sccn", "shield", "Security Cloud Control", ["Policy context", "Firewall and access", "Stays system of record"], true),
      n("appr", "people", "CISO and clinical lead", ["Two people decide", "Security and care", "L3: execute after approve"], true),
      n("aud", "doc", "Audit log", ["Who approved what", "Evidence", "Recorded"], true),
    ],
    links: [k("dev", "fw"), k("ident", "fw", 0.1), k("fw", "ext"), k("soc", "fw", 0.1), k("soc", "dev", -0.1), k("canvas", "dev"), k("cid", "canvas"), k("sccn", "canvas"), k("canvas", "appr"), k("appr", "aud"), k("appr", "dev", 0.12)],
    steps: [
      {
        phase: "today", title: "More alerts than people",
        say: s(
          "Healthcare is breached often, and containment takes weeks. The SOC has more alerts than hours.",
          "Tool sprawl is the baseline: each control was bought for a good reason and each one raises its own alerts.",
          "Devices that cannot take an agent are invisible to the endpoint stack, so the SOC works from network shadows.",
        ),
        l: { "dev-fw": "ok", "ident-fw": "ok", "fw-ext": "ok" },
        facts: [{ v: "710", l: "Large healthcare breaches reported in 2025", s: "HIPAA Journal from OCR data" }, { v: "64 days", l: "Global mean time to contain, all industries", s: "IBM 2026" }],
      },
      {
        phase: "today", title: "Every tool holds a different name for the same thing",
        say: s(
          "The same pump is an alert in one tool, an address in another and a serial number in a third. Joining them takes hours.",
          "This is where the first hour goes. Nobody can say how big the problem is, so the safe answer is to turn more off.",
          "SIEM alert ID, NAC MAC address, CMMS serial, firewall 5-tuple. No shared key, no shared timeline.",
        ),
        n: { dev: "warn", soc: "warn", fw: "unknown", ext: "unknown" }, l: { "dev-fw": "warn", "fw-ext": "warn", "soc-fw": "unknown", "soc-dev": "unknown" },
        clock: { label: "Time to scope the event", mode: "run" },
        facts: [{ v: "59%", l: "Security teams that say they have too many alerts (cross-industry)", s: "Splunk State of Security 2025, vendor-reported" }, { v: "46%", l: "Spend more time maintaining tools than defending the organization", s: "Splunk State of Security 2025, vendor-reported" }],
        callout: { node: "soc", text: "Is this one pump, or forty?" },
      },
      {
        phase: "today", title: "Containment by unplugging",
        say: s(
          "Without scope, containment means switching off whole networks. Care goes to paper while security does its job.",
          "The containment decision becomes a clinical decision made without clinical information.",
          "Flat east-west networks make the VLAN the blast radius. Containment and care share the same switch.",
        ),
        n: { dev: "down", ident: "down", fw: "down" }, l: { "dev-fw": "down", "ident-fw": "down", "fw-ext": "off" },
        label: { dev: "Unplugged with the rest", ident: "Locked out" },
        facts: [{ v: "37 days", l: "Ascension, EHR access restored system-wide (sources vary)", s: "Ascension 2024" }],
      },
      {
        phase: "cisco", title: "One investigation, with identity and policy in view",
        say: s(
          "Same event. This time security, network and clinical engineering look at one picture before anyone unplugs anything.",
          "AI Canvas brings identity posture and security context into the same investigation as the network view.",
          "Cisco Identity draws on Okta, ISE and Active Directory. Splunk detections join in when Splunk Cloud is connected.",
        ),
        show: ["canvas", "cid", "sccn"], n: { dev: "warn", ident: "ok", fw: "ok", soc: "ok", ext: "unknown" },
        label: { dev: "", ident: "" },
        l: { "dev-fw": "warn", "ident-fw": "ok", "fw-ext": "warn", "soc-fw": "off", "soc-dev": "off", "canvas-dev": "ok", "cid-canvas": "ok", "sccn-canvas": "ok" },
        clock: { label: "", mode: "hide" },
        callout: { node: "canvas", text: "Scope: three devices on one segment. Everything else is clear." },
      },
      {
        phase: "cisco", title: "Scoped containment waits for two people",
        say: s(
          "The proposed containment covers three devices, not the hospital. Security and a clinical lead both approve it.",
          "The agent proposes; people decide. Approval sits with the owners of the risk and of the care.",
          "Supervised autonomy, L3. Autonomous remediation in a clinical network is not the supported model.",
        ),
        show: ["appr"], n: { appr: "pending" }, l: { "canvas-appr": "pending" },
        modal: { title: "Approve scoped containment", lines: ["Restrict three devices on one segment to their clinical server only.", "Approvers: CISO and clinical engineering lead", "Trust level: L3, execute after approve", "Executes in: Cisco ISE"], button: "Approve" },
      },
      {
        phase: "cisco", title: "Contained, recorded, reviewable",
        say: s(
          "Three devices are contained. Everything else kept working. The record shows who approved it and when.",
          "The post-incident review starts from one timeline, not from five screenshots.",
          "The change executed in ISE. Splunk Enterprise Security is a separate license. Plan an out-of-band path to the cloud.",
        ),
        show: ["aud"], n: { appr: "ok", dev: "ok", aud: "ok" }, l: { "canvas-appr": "ok", "appr-aud": "ok", "appr-dev": "ok", "fw-ext": "off", "dev-fw": "ok" },
        chips: [["AI Canvas", "GA (US)"], ["Cisco Identity", "GA (US), license gate"], ["Security Cloud Control", "GA (US)"], ["Audit log", "GA (US)"]],
      },
    ],
    caveat: "Modeled outcome. No percentage is claimed. If containment cuts internet access, Cloud Control itself may be unreachable: plan an out-of-band path.",
  },

  {
    id: "clinops",
    group: "Operating lens",
    title: "Clinical operations: the care team should not be the monitoring system",
    pillars: "Clinical operations",
    subtitle: "Care already runs on software and AI. When it stalls, a nurse usually finds out first.",
    zones: [],
    nodes: [
      n("nurse", "badge", "Nurse on 4 West", ["Finds the outage first", "Care team", "Badge, cart, pump"]),
      n("devs", "pump", "Bedside devices", ["Still infusing", "Clinical engineering", "Connected, unmanaged"]),
      n("ehrn", "server", "EHR", ["Orders and notes", "Application team", "Every click is a round trip"]),
      n("scribe", "mic", "Ambient scribe", ["Writes the note", "Clinic operations", "Audio to a vendor cloud"]),
      n("help", "phone", "Help desk", ["Hears about it last", "Service desk", "Ticket, then triage"]),
      n("vend", "cloud", "AI and EHR vendors", ["Outside your walls", "Third parties", "And their suppliers"]),
      n("canvas", "canvas", "AI Canvas", ["IT sees it first", "One investigation", "Evidence, not opinion"], true),
      n("te", "eye", "ThousandEyes", ["Our side or theirs", "Path to every vendor", "Hop-by-hop evidence"], true),
      n("obs", "database", "Agent Observability", ["What agents did", "And what they cost", "Traces and tokens"], true),
      n("gate", "person", "Clinical owner", ["Approves what touches care", "CMIO or nursing lead", "L3 for changes"], true),
    ],
    links: [k("nurse", "ehrn"), k("devs", "ehrn", 0.1), k("scribe", "vend", -0.1), k("ehrn", "vend", 0.1), k("nurse", "help", 0.12), k("te", "vend"), k("te", "scribe", 0.1), k("canvas", "te"), k("obs", "canvas"), k("canvas", "gate"), k("gate", "ehrn", 0.1)],
    steps: [
      {
        phase: "today", title: "Care already runs on software and AI",
        say: s(
          "Most physicians now use AI at work, and most organizations run ambient documentation. Care depends on it being up.",
          "Every one of these tools rides the same Wi-Fi, WAN and vendor path. Clinical operations is an infrastructure outcome.",
          "Audio to a vendor cloud, orders to the EHR, device data to the record. Different data classes, shared transport.",
        ),
        l: { "nurse-ehrn": "ok", "devs-ehrn": "ok", "scribe-vend": "ok", "ehrn-vend": "ok" },
        facts: [{ v: "81%", l: "Physicians using AI at work", s: "AMA 2026" }, { v: "79%", l: "Organizations using ambient speech", s: "KLAS via TechTarget" }],
      },
      {
        phase: "today", title: "The clinician finds the outage first",
        say: s(
          "The note stops generating. The cart spins. A nurse calls the help desk, and that call is the first alert IT receives.",
          "The care team has become the monitoring system. By the time a ticket exists, the unit is already behind.",
          "No synthetic test on the vendor path, no experience metric per floor. Detection is a phone call.",
        ),
        n: { scribe: "warn", nurse: "warn", help: "unknown", vend: "unknown" }, l: { "scribe-vend": "warn", "nurse-help": "warn", "nurse-ehrn": "warn" },
        clock: { label: "Time before IT knows", mode: "run" },
        callout: { node: "nurse", text: "The first alert is a phone call from the floor." },
      },
      {
        phase: "today", title: "Workarounds become the risk",
        say: s(
          "When the approved tool stalls, people find another. That is how patient details end up in a consumer chatbot.",
          "Shadow AI is a symptom of unreliable sanctioned AI. Policy alone does not close the gap.",
          "No AI-aware egress control in the path, no record of which agents ran, no view of what they cost.",
        ),
        n: { vend: "down", scribe: "down" }, l: { "scribe-vend": "down" },
        facts: [{ v: "17%", l: "Clinicians admitting unapproved AI use", s: "Wolters Kluwer 2025" }, { v: "70%", l: "Simulated ambient notes with an error, 31 of 44", s: "JMIR 2025" }],
      },
      {
        phase: "cisco", title: "IT knows before the nurse calls",
        say: s(
          "Now the path to every vendor is watched. IT sees the stall, and can say whose side it is on, before the floor calls.",
          "ThousandEyes evidence sits inside the same AI Canvas as the network view. The vendor call starts with proof.",
          "ThousandEyes in AI Canvas is GA in the US. Expanded Experience Metrics, for per-user experience, is beta.",
        ),
        show: ["canvas", "te"], n: { scribe: "warn", vend: "warn", nurse: "ok", help: "ok", te: "ok", canvas: "ok" },
        l: { "scribe-vend": "warn", "nurse-help": "off", "nurse-ehrn": "ok", "te-vend": "warn", "te-scribe": "ok", "canvas-te": "ok" },
        clock: { label: "", mode: "hide" },
        callout: { node: "te", text: "Hospital side is clean. The delay is upstream of the vendor." },
      },
      {
        phase: "cisco", title: "Agents are watched like any other clinical system",
        say: s(
          "Every agent run is traced: what it did, which tools it used and what it cost. AI becomes something you can govern.",
          "Agent Observability with Tokenomics shows activity and spend. Guardrails on unsanctioned AI sit in AI Defense.",
          "Agent Observability is GA (15 Sep 2026) and also surfaces in Cloud Control. It watches agents, not the clinical record.",
        ),
        show: ["obs"], n: { obs: "ok" }, l: { "obs-canvas": "ok" },
        facts: [{ v: "5.3%", l: "Audited ambient AI notes with an error rated serious risk if uncorrected", s: "JMIR Medical Informatics 2026" }, { v: "84% vs 10%", l: "Healthcare organizations with an AI governance committee, versus automated monitoring of AI in use", s: "Censinet and CHIME Foundation 2025, vendor-reported" }],
        fx: { fabric: true },
      },
      {
        phase: "cisco", title: "Anything that can touch care waits for a clinical owner",
        say: s(
          "Infrastructure can propose. A clinical owner approves anything that could change how care is delivered.",
          "That approval gate is the difference between agentic operations and automation that surprises a nursing unit.",
          "L3: execute after approve. The clinician still signs every note and every read.",
        ),
        show: ["gate"], n: { gate: "pending" }, l: { "canvas-gate": "pending" },
        modal: { title: "Approve the failover for ambient notes", lines: ["Route clinic scribe traffic to the vendor's secondary region until the upstream issue clears.", "Approver: CMIO delegate for ambulatory", "Trust level: L3, execute after approve", "Executes in: Catalyst SD-WAN Manager"], button: "Approve" },
        chips: [["ThousandEyes in AI Canvas", "GA (US)"], ["Agent Observability, Tokenomics", "GA, 15 Sep 2026"], ["AI Defense", "GA"], ["Expanded Experience Metrics", "Beta"]],
      },
    ],
    caveat: "Modeled. Cloud Control and Data Fabric hold machine data, not the clinical record. Clinicians review every note; vendors remain accountable for their service.",
  },

  {
    id: "workops",
    group: "Operating lens",
    title: "Workplace operations: offices, access centers and staff AI",
    pillars: "Workplace and office operations",
    subtitle: "The other half of a health system: scheduling, revenue cycle, meeting rooms and the AI assistants staff already use.",
    zones: [],
    nodes: [
      n("desk", "monitor", "Administrative offices", ["Finance, HR, revenue cycle", "Corporate IT", "Hybrid work"]),
      n("access", "phone", "Patient access center", ["Scheduling and billing calls", "Contact center", "Voice and chat"]),
      n("rooms", "board", "Meeting and huddle rooms", ["Video everywhere", "Workplace team", "Devices and room systems"]),
      n("bldg", "gear", "Smart building", ["Occupancy, air, power", "Facilities", "Sensors and PoE"]),
      n("staffai", "chat", "Staff AI assistants", ["Already in use", "Every department", "Sanctioned or not"]),
      n("it", "person", "Workplace IT", ["Three more consoles", "A small team", "Different tools again"]),
      n("inv", "board", "One inventory", ["Rooms, phones, switches", "Clinical and corporate", "Collaboration included"], true),
      n("spc", "wifi", "Cisco Spaces", ["Is the service healthy", "Connector health", "Not people tracking"], true),
      n("def", "shield", "AI Defense", ["Guardrails on AI use", "Which apps, which data", "Policy, enforced"], true),
      n("asst", "chat", "AI Assistant", ["Ask across the estate", "One front door", "Authorized actions only"], true),
    ],
    links: [k("desk", "rooms"), k("access", "desk", 0.1), k("bldg", "rooms", 0.12), k("desk", "staffai", -0.1), k("it", "rooms"), k("it", "access", 0.1), k("inv", "rooms"), k("inv", "access", 0.08), k("spc", "bldg"), k("def", "staffai", -0.08), k("asst", "inv"), k("asst", "def")],
    steps: [
      {
        phase: "today", title: "The other half of the health system",
        say: s(
          "Behind the clinical floors sits a large office estate: patient access, revenue cycle, finance, HR and every meeting room.",
          "It has its own collaboration tools, room systems and building sensors, usually run by a different, smaller team.",
          "Calling, meetings, devices, room booking and building telemetry each have their own admin console.",
        ),
        l: { "desk-rooms": "ok", "access-desk": "ok", "bldg-rooms": "ok" },
        facts: [{ v: "$265.6B", l: "Estimated annual US cost of administrative complexity in health care (2019 dollars)", s: "JAMA 2019" }, { v: "40 a week", l: "Prior authorizations per physician, taking 13 hours of physician and staff time", s: "AMA survey 2026" }],
      },
      {
        phase: "today", title: "A missed call is a missed appointment",
        say: s(
          "When the access center has a bad day, patients cannot book. It rarely shows up on a clinical dashboard.",
          "Voice quality, room devices and the office network are diagnosed separately from the clinical network they share.",
          "Collaboration telemetry and network telemetry are not on one timeline, so voice issues become finger-pointing.",
        ),
        n: { access: "warn", it: "warn", rooms: "unknown" }, l: { "access-desk": "warn", "it-access": "unknown", "it-rooms": "unknown" },
        callout: { node: "access", text: "Calls are dropping. Is it the carrier, the network or the app?" },
      },
      {
        phase: "today", title: "Staff AI arrives faster than policy",
        say: s(
          "Staff already use AI assistants to draft, summarize and code. Many of those tools were never approved.",
          "Nobody can list which AI tools are in use, what data they see, or what they cost each month.",
          "No inventory of AI apps, no egress policy that understands them, no cost attribution.",
        ),
        n: { staffai: "warn", desk: "ok" }, l: { "desk-staffai": "warn" },
        facts: [{ v: "89%", l: "Healthcare generative-AI data policy violations that involve regulated data", s: "Netskope Threat Labs 2026, vendor-reported" }, { v: "60%", l: "Organizations not confident they can detect unregulated AI in use (cross-industry)", s: "Cisco Cybersecurity Readiness Index 2025, vendor-reported" }],
        callout: { node: "staffai", text: "Which assistants are in use, and what do they see?" },
      },
      {
        phase: "cisco", title: "Collaboration and workplace in the same picture",
        say: s(
          "Phones, rooms and switches appear in one inventory beside the clinical network. One team can see both halves.",
          "Webex Control Hub inventory appears in Cloud Control without extra setup. Spaces adds the health of its connectors.",
          "Cisco Spaces in Cloud Control is connector health, added 10 Nov 2026. It does not show where people are.",
        ),
        show: ["inv", "spc"], n: { access: "ok", it: "ok", rooms: "ok", inv: "ok", spc: "ok", staffai: "warn" },
        facts: [{ v: "40%", l: "Appointment calls contained by Webex AI Agent at Community Health Network", s: "Cisco Webex customer story 2026, vendor-reported" }],
        l: { "access-desk": "ok", "it-access": "off", "it-rooms": "off", "inv-rooms": "ok", "inv-access": "ok", "spc-bldg": "ok", "desk-staffai": "warn" },
      },
      {
        phase: "cisco", title: "Guardrails on AI use, in plain view",
        say: s(
          "Unsanctioned AI use becomes visible and governed. Approved assistants keep working; risky ones are stopped by policy.",
          "AI Defense is the guardrail. Agent Observability shows what the sanctioned agents did and what they cost.",
          "AI Defense is a shipping product. Agent policy through Cloud Control Studio is announced, not generally available.",
        ),
        show: ["def"], n: { def: "ok", staffai: "ok" }, l: { "def-staffai": "ok", "desk-staffai": "ok" },
        fx: { zones: ["outside"] },
      },
      {
        phase: "cisco", title: "One operating model for clinical and office space",
        say: s(
          "The same way of working covers the ward and the office: ask in plain language, see evidence, approve the change.",
          "Clinical and corporate IT keep their own domains and share one front door, one inventory and one audit trail.",
          "AI Assistant is GA in the US and takes supported, authorized actions only. Outcomes here are modeled.",
        ),
        show: ["asst"], n: { asst: "ok" }, l: { "asst-inv": "ok", "asst-def": "ok" },
        chips: [["Webex Control Hub inventory", "GA (US)"], ["Cisco Spaces", "GA, connector health only"], ["AI Defense", "GA"], ["AI Assistant", "GA (US)"]],
      },
    ],
    caveat: "Modeled. Cisco Spaces in Cloud Control shows connector health, not the location of staff, patients or assets.",
  },
];
