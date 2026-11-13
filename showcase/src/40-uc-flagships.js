/* Flagship stories: Security, Facilities, AI. Each entry = content + a floor plan (placement and decor).
   Step states, links, callouts and approvals come from the shared narrative (NARR) by id. */
const CY = 418; // node row inside the Cloud Control band
const cisco4 = (...ids) => Object.fromEntries(ids.map((id, i) => [id, [110 + (ids.length > 1 ? (i * 510) / (ids.length - 1) : 0), CY]]));
const tiles6 = (rows) => rows.map((r) => ({ l: r[0], a: r[1], b: r[2], tag: r[3] }));

/* =============================== F1 SECURITY =============================== */
UCS.push({
  id: 'security', code: 'F1', n: 1, group: 'Flagship', short: 'Security', name: 'Containment with a person still in the loop',
  setting: 'Clinical floor 4 West, the data center and the internet edge',
  personas: ['CISO', 'Biomed (HTM) lead', 'Network operations', 'Chief nursing officer', 'Charge nurse'],
  vision: 'The same event, one investigation. SOC, network and biomed share one picture, the change is scoped to one segment, and a named person approves before anything executes. Care keeps running on the rest of the floor.',
  legacy: {
    banner: 'A pump on 4 West starts talking to an address nobody recognizes. Five teams each see one piece, and without segmentation the only safe containment is to turn more things off.',
    strip: 'Today: five consoles, a flat network, containment means unplugging [H]', who: 'Night shift on 4 West (sim)',
    silos: [['SIEM alerts', 'alert ID only [H]', '', 'eye'], ['NAC', 'sees a MAC address [H]', '', 'shield'], ['Biomed CMMS', 'sees a serial number [H]', '', 'gear'], ['Firewall logs', 'sees a 5-tuple [H]', '', 'lock'], ['Endpoint tools', 'cannot see pumps [H]', '', 'scan'], ['Downtime plan', 'paper MAR, runners [H]', 'p', 'doc']],
    gaps: ['Five consoles hold five identifiers [H]', 'No shared picture of the scope [H]', 'Flat network: blast radius is the VLAN [H]', 'Containment and care share one switch [H]', 'Mean time to innocence is not measured'],
    big: ['5', 'consoles, one pump, five partial truths [H]'],
    tour: ['One pump talks to an unknown address. Five consoles each hold a different identifier for it.'],
  },
  tobe: {
    banner: 'One AI Canvas investigation scopes the event to one segment. Biomed and network approve the change, it executes in ISE or Catalyst Center, and the audit log records who approved it.',
    strip: 'AI Canvas, Security Cloud Control, ISE, Catalyst Center', who: 'Night shift on 4 West (sim)',
    console: { title: 'Cloud Control | pump segment', body: 'One shared investigation across SOC, network and biomed. The agent proposes; Biomed and Network operations approve; the change executes in ISE or Catalyst Center.', foot: 'Biomed and network approve', rows: [['Consoles to open', '5', '1', 0, 'canvas'], ['Scope of the event', 'unknown', '3 pumps, 1 segment', 0, 'topology'], ['Proposed change', 'none', 'awaiting approval', 1, 'person'], ['Hospital impact', 'whole house dark', 'one segment', 2, 'shield'], ['Audit record', 'none', 'who approved what', 2, 'doc']] },
    stays: 'ISE and Catalyst Center stay the systems of record, along with the SIEM and clinical teams. Plan an out-of-band path in case containment cuts cloud reach.',
    tour: ['The same alert, one canvas: scope is 3 pumps on one segment, and EHR, phones and monitors are not involved.', 'Outcomes are modeled: a smaller downtime footprint and an audit trail. No percentage is claimed.'],
  },
  hops: {
    legacy: [['Pump egress', 'unseen, no agent', 'pump'], ['Five consoles', 'five partial truths', 'eye'], ['Flat network', 'unplug everything', 'switch'], ['Downtime procedures', 'paper and runners', 'doc']],
    tobe: [['Security Cloud Control', 'detect and enforce', 'shield'], ['AI Canvas', 'one shared picture', 'canvas'], ['Approval by a person', 'biomed + network', 'person'], ['ISE / Catalyst Center', 'executes, records', 'gear']],
  },
  pathNote: { legacy: 'Each console sees one fragment [H]', tobe: 'Detection to approved change, on one path' },
  outcomes: {
    legacy: [['4+ weeks', 'offline planning horizon [Joint Commission SEA 67]', 'S'], ['64 days', 'global mean time to contain, all industries [IBM 2026]', 'S'], ['37 days', 'Ascension: EHR access restored system-wide, sources vary', 'S']],
    tobe: [['1 picture', 'instead of five consoles, kept across shifts', 'H'], ['1 segment', 'downtime footprint, not the whole house (modeled)', 'H'], ['Audit log', 'who approved what, kept where policy lives', 'H']],
  },
  kpis: ['Time to a shared picture', 'Mean time to innocence (proposed KPI)', 'Segment blast radius', 'Approvals recorded'],
  ask: 'If one pump misbehaves tonight, what is the first thing your teams turn off, and who decides?',
  tiles: [
    { l: 'Pumps in the story', a: '1 of 40', b: '1 of 40', tag: 'I', color: COL.hosp }, { l: 'Consoles to reach one picture', a: '5', b: '1', tag: 'H', color: COL.cisco },
    { l: 'Downtime footprint', a: 'Whole floor', b: 'One segment', tag: 'H', color: COL.cisco }, { l: 'Offline planning horizon [Joint Commission]', a: '4+ weeks', b: '4+ weeks', tag: 'S', color: COL.hosp },
    { l: 'Mean time to contain, all industries [IBM 2026]', a: '64 days', b: '64 days', tag: 'S', color: COL.hosp }, { l: 'Change approval', a: 'Ad hoc', b: 'Named approvers', tag: 'H', color: COL.cisco },
  ],
  scene: {
    modalPos: [392, 222], noLegacyBand: true,
    pos: Object.assign({
      pump: [82, 134], mon: [192, 134], phones: [150, 246], lib: [352, 266], ehr: [410, 150], dest: [628, 160],
      soc: [95, CY], nac: [235, CY], biomed: [375, CY], fw: [510, CY], edr: [640, CY],
    }, cisco4('canvas', 'approve', 'ise', 'audit')),
  },
});

/* =============================== F2 FACILITIES =============================== */
UCS.push({
  id: 'facilities', code: 'F2', n: 2, group: 'Flagship', short: 'Facilities', name: 'One estate, from the patient room to the clinic',
  setting: 'Hospital tower, imaging suite, central plant, an off-campus clinic and a home',
  personas: ['CIO', 'Facilities and plant director', 'NOC', 'Clinical engineering', 'Chief nursing officer'],
  vision: 'The tower, the plant, the clinic and the home appear in one inventory and one topology, so building events and network events land on the same timeline. The edges that are not the hospital\'s stay gray on purpose.',
  legacy: {
    banner: 'A tower, an IDF on every floor, an imaging suite, a central plant, a clinic 40 miles away and a patient at home. Today those are different maps with different owners.',
    strip: 'Today: a map per site, plant and IT in separate silos [H]', who: 'Rapid response at 3 a.m. (sim)',
    silos: [['Campus controller', 'tower and wings [H]', '', 'server'], ['Clinic SD-WAN', 'its own console [H]', '', 'cloud'], ['Building management', 'BACnet, plant team [H]', '', 'gear'], ['Nurse call and RTLS', 'separate vendors [H]', 'p', 'bell'], ['Home ISP', 'consumer circuit [H]', 'p', 'globe'], ['Site spreadsheets', 'asset lists [H]', '', 'doc']],
    gaps: ['Four underlays, four consoles [H]', 'Nobody owns the IDF closet at 3 a.m. [H]', 'Building systems share a clinical VLAN [H]', 'New sites arrive outside every dashboard [H]', 'Plant and network events never meet'],
    big: ['4', 'different underlays across one estate [H]'],
    tour: ['A badge call drops in a patient room, the air handler sits on a clinical VLAN, and the clinic is a blind spot.'],
  },
  tobe: {
    banner: 'One topology and one inventory across campus, clinics and edge. Plant telemetry and network events share a timeline, and Spaces shows connector health only, never patient location.',
    strip: 'Inventory, L3 topology, Meraki, SD-WAN, data lake', who: 'Rapid response at 3 a.m. (sim)',
    console: { title: 'Cloud Control | the estate', body: 'One inventory and a Layer 3 topology across Catalyst Center, Meraki and SD-WAN domains. Domain controllers stay the systems of record.', foot: 'Domain controllers remain the record', rows: [['Sites in one inventory', 'by campus', 'tower to clinic', 0, 'topology'], ['Which building is broken', 'ask four teams', 'one inventory', 0, 'building'], ['Plant and network events', 'separate', 'one timeline', 1, 'gear'], ['Incident hour data', 'siloed', 'promoted to the lake', 1, 'database'], ['Patient location', 'not shown', 'not shown, by design', 2, 'lock']] },
    stays: 'Domain controllers stay the systems of record. The patient\'s home internet is not the hospital\'s, and Spaces here is not a location system.',
    tour: ['Campus, clinic and edge sit in one topology; plant events and network events arrive on the same timeline.', 'Outcomes are modeled: one answer to which building is actually broken. The home hop stays gray by design.'],
  },
  hops: {
    legacy: [['Badge or AP', 'dropped call', 'badge'], ['IDF closet', 'power vs switch owners', 'rack'], ['Building controls', 'on a clinical VLAN', 'gear'], ['Clinic and home', 'outside every map', 'home']],
    tobe: [['Inventory', 'every site, one list', 'board'], ['Layer 3 topology', 'VLAN, VRF, subnet', 'topology'], ['Machine Data Lake', 'plant and network events', 'database'], ['Cisco Spaces', 'connector health only', 'wifi']],
  },
  pathNote: { legacy: 'A map per site, an owner per map [H]', tobe: 'One estate view, honest at the edges' },
  outcomes: {
    legacy: [['6,100', 'U.S. hospitals [AHA 2024 survey, published 2026]', 'S'], ['358', 'hospital-at-home CCNs [CMS, 19 Oct 2026]', 'S'], ['10 s', 'critical-branch power restore [NEC / NFPA 99]', 'S']],
    tobe: [['1 inventory', 'answers which building is actually broken', 'H'], ['1 timeline', 'plant and network events side by side (modeled)', 'H'], ['Gray', 'where the hospital cannot see, and says so', 'H']],
  },
  kpis: ['Sites in one inventory', 'Time to identify the failing building', 'IDF closets with power and switch ownership', 'Onboarding time for a new site'],
  ask: 'When a room loses a call, who owns the closet, the power and the switch at 3 a.m.?',
  tiles: [
    { l: 'U.S. hospitals [AHA]', a: '6,100', b: '6,100', tag: 'S', color: COL.hosp }, { l: 'Hospital-at-home CCNs [CMS]', a: '358', b: '358', tag: 'S', color: COL.hosp },
    { l: 'Views of the estate', a: '4 maps', b: '1 inventory', tag: 'H', color: COL.cisco }, { l: 'Critical-branch power restore [NEC / NFPA 99]', a: '10 s', b: '10 s', tag: 'S', color: COL.hosp },
    { l: 'Plant and network events', a: 'Separate', b: 'One timeline', tag: 'H', color: COL.cisco }, { l: 'Patient location from Spaces', a: 'No', b: 'No', tag: 'S', color: COL.cisco },
  ],
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({
      room: [75, 134], idf: [200, 134], noc: [140, 206], img: [385, 150], bms: [535, 140], gen: [655, 140], clinic: [160, 308], home: [520, 308],
    }, cisco4('topo', 'inv', 'lake', 'spaces')),
  },
});

/* =============================== F3 AI =============================== */
UCS.push({
  id: 'ai', code: 'F3', n: 3, group: 'Flagship', short: 'AI in care', name: 'The data path, the gate, and the clinician',
  setting: 'Exam room, CT suite, GPU rack, reading room and the vendor cloud',
  personas: ['Chief Medical Information Officer', 'Chief AI officer', 'CISO', 'Radiologist', 'Facilities engineer'],
  vision: 'The path to every AI vendor is visible, unsanctioned AI meets a guardrail, and any AI-driven change that can touch care waits for a person. The clinical record stays in the EHR and the physician still signs.',
  legacy: {
    banner: 'Audio from an exam room and pixels from a CT are trying to reach two different models. A person still signs the note and the read, but nobody can see the path.',
    strip: 'Today: vendor hops dark, GPU racks unplanned [H]', who: 'Monday morning clinic (sim)',
    silos: [['Scribe vendor status page', 'outside our map [H]', 'p', 'cloud'], ['Wi-Fi dashboard', 'sees our edge only [H]', '', 'wifi'], ['Imaging AI queue', 'worklist hides delay [H]', '', 'ct'], ['Power and cooling', 'facilities learns last [H]', '', 'plug'], ['DLP or egress policy', 'not AI-aware [H]', '', 'lock'], ['AI policy document', 'not enforced [H]', '', 'doc']],
    gaps: ['Vendor and upstream hops are dark [H]', 'Shadow AI is the workaround [H]', 'GPU racks need 10x the power [H]', 'Inference queue time is invisible [H]', 'No gate before an AI-driven change [H]'],
    big: ['81%', 'of physicians use AI at work [AMA 2026]'],
    tour: ['AI is already in the visit: audio to a scribe vendor, images through a GPU model to PACS.'],
  },
  tobe: {
    banner: 'ThousandEyes in AI Canvas shows the path to the vendor, AI Defense finds and guards unsanctioned AI, and an approval gate stands before any AI-driven change. The physician still signs.',
    strip: 'AI Canvas, ThousandEyes, AI Defense, Agent Observability, Data Fabric', who: 'Monday morning clinic (sim)',
    console: { title: 'Cloud Control | AI paths', body: 'Hospital hops green, vendor hop amber, sub-processor gray on purpose. AI Defense discovers unsanctioned apps; agents that change things wait for approval.', foot: 'The physician still signs the note', rows: [['Our side of the path', 'unknown', 'green', 0, 'wifi'], ['Vendor endpoint', 'unknown', 'amber, evidence in hand', 0, 'cloud'], ['Vendor sub-processor', 'unknown', 'gray, by design', 0, 'lock'], ['Unsanctioned chatbot', 'invisible', 'found, guardrail on', 1, 'shield'], ['AI-driven change', 'ungated', 'waits for a person', 2, 'person']] },
    stays: 'The clinical record stays in the EHR. AI Defense does not read the note. Agent Builder and App Builder are not GA.',
    tour: ['Now we can show the clinic that our side is green and the vendor is the delay.', 'Outcomes are modeled: a guardrail on shadow AI and a gate before any change. No percentage is claimed.'],
  },
  hops: {
    legacy: [['Exam room audio', 'uplink to vendor', 'mic'], ['Vendor and upstream', 'dark to us', 'cloud'], ['GPU rack', 'queue invisible', 'gpu'], ['Worklist', 'AI late or missing?', 'doc']],
    tobe: [['ThousandEyes in AI Canvas', 'path to the vendor', 'eye'], ['AI Defense', 'discover and guard', 'shield'], ['Agent Observability', 'trace and token cost', 'chat'], ['Approval gate', 'a person decides', 'person']],
  },
  pathNote: { legacy: 'Vendor path and GPU queue unseen [H]', tobe: 'Path, guardrail and gate in one view' },
  outcomes: {
    legacy: [['81%', 'physicians using AI at work [AMA 2026]', 'S'], ['11.2 min', 'door-to-groin cut with stroke AI triage [JAMA Neurology 2023]', 'S'], ['120 to 132 kW', 'one GPU rack, versus about 9 kW typical [vendor specs]', 'S']],
    tobe: [['Evidence', 'to call the vendor instead of guessing (modeled)', 'H'], ['Guardrail', 'in front of unsanctioned AI apps', 'H'], ['Gate', 'before any AI-driven change reaches care', 'H']],
  },
  kpis: ['Time to say whose side the delay is on', 'Unsanctioned AI apps found', 'AI-driven changes approved vs blocked', 'GPU rack power headroom'],
  ask: 'When the scribe stalls, who can prove whether it is our network, the vendor or their supplier?',
  tiles: [
    { l: 'Physicians using AI at work [AMA 2026]', a: '81%', b: '81%', tag: 'S', color: COL.hosp }, { l: 'Stroke AI triage, door-to-groin [JAMA Neurol. 2023]', a: '-11.2 min', b: '-11.2 min', tag: 'S', color: COL.hosp },
    { l: 'GPU rack power vs typical [vendor specs]', a: '120 to 132 kW', b: '120 to 132 kW', tag: 'S', color: COL.hosp }, { l: 'Path to the AI vendor', a: 'Dark', b: 'Visible, labeled', tag: 'H', color: COL.cisco },
    { l: 'Shadow AI', a: 'Unseen', b: 'Found, guarded', tag: 'H', color: COL.cisco }, { l: 'AI-driven change', a: 'Ungated', b: 'Approval gate', tag: 'H', color: COL.cisco },
  ],
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({
      mic: [82, 134], ct: [80, 290], gpu: [268, 290], pacs: [270, 150], md: [408, 222], vendor: [566, 146], up: [676, 146], chat: [628, 290],
    }, cisco4('te', 'def', 'gate', 'tok')),
  },
});
