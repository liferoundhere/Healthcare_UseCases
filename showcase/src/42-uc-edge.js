/* Use cases 5 to 7: imaging transport, hospital-at-home, acquired-clinic WAN. */

/* =============================== UC5 IMAGING =============================== */
UCS.push({
  id: 'imaging', code: 'UC5', n: 5, group: 'Use case', short: 'Imaging', name: 'The study has to reach the reader',
  setting: 'Outpatient imaging center, the WAN and the main hospital',
  personas: ['Chief medical officer', 'Radiology director', 'PACS administrator', 'Network engineer', 'Stroke program lead'],
  vision: 'The path from the scanner to the reader is measured on both sides, so a slow study is attributed to the clinic link, the PACS or the AI queue and not to a guess.',
  legacy: {
    banner: 'A stroke CT is the critical path. The scanner says sent, the radiologist says nothing arrived, and the clinic link, the PACS and the AI queue each look fine in their own tool.',
    strip: 'Today: scanner logs, WAN charts and PACS queues are three views [H]', who: 'Stroke code, 2 a.m. (sim)',
    silos: [['Modality logs', 'study sent [H]', '', 'ct'], ['WAN or ISP portal', 'circuit up [H]', 'p', 'globe'], ['PACS and VNA queue', 'its own timestamps [H]', '', 'database'], ['Imaging AI worklist', 'hides delay [H]', '', 'gpu'], ['Radiology worklist', 'reader view only [H]', '', 'monitor'], ['Transfer log export', 'manual, after the fact [H]', '', 'doc']],
    gaps: ['No timestamp spans scanner to reader [H]', 'Link health is not study health [H]', 'AI triage delay hides in a queue [H]', 'Clinics are outside the main dashboards [H]', 'Nobody owns end-to-end transfer time'],
    big: ['60 min', 'door-to-needle goal for 85% of eligible stroke patients [AHA Target: Stroke]'],
    tour: ['The CT is done, the study is in transit, and the reader is waiting without knowing why.'],
  },
  tobe: {
    banner: 'ThousandEyes and the Nexus and Intersight fabric are tied to the study transfer log in the Machine Data Lake. The delay is attributed to a hop and the owner is named.',
    strip: 'ThousandEyes, Nexus and Intersight, Machine Data Lake, AI Canvas', who: 'Stroke code, 2 a.m. (sim)',
    console: { title: 'Cloud Control | study transfer', body: 'Scanner, WAN, PACS and AI queue on one timeline. Transfer times in this story are labeled arithmetic, not measurements.', foot: 'Transfer times are arithmetic, not measured', rows: [['Timestamps that span the path', 'none', 'one timeline', 0, 'clock'], ['Delay attributed to', 'a guess', 'a named hop', 0, 'topology'], ['Clinic link', 'up or down', 'measured per study', 1, 'globe'], ['AI queue time', 'hidden', 'visible', 1, 'gpu'], ['Owner of the delay', 'unclear', 'named', 1, 'person']] },
    stays: 'PACS, VNA and the radiology worklist stay the systems of record. Imaging AI does not always speed the read; the point here is visibility.',
    tour: ['One timeline spans the scanner, the link, the PACS and the reader.', 'Outcomes are modeled: a delay attributed to a hop. Imaging AI is not claimed to always speed the read.'],
  },
  hops: {
    legacy: [['CT gantry', 'study sent', 'ct'], ['Clinic link', 'up, not measured', 'globe'], ['PACS / VNA', 'queue is separate', 'database'], ['Radiologist', 'waiting', 'monitor']],
    tobe: [['ThousandEyes', 'clinic link by study', 'eye'], ['Nexus / Intersight', 'fabric and compute', 'rack'], ['Transfer logs', 'in the data lake', 'database'], ['AI Canvas', 'one timeline', 'canvas']],
  },
  pathNote: { legacy: 'No timestamp spans scanner to reader [H]', tobe: 'Scanner to reader on one timeline' },
  outcomes: {
    legacy: [['60 min', 'door-to-needle goal, 85% of eligible patients [AHA Target: Stroke]', 'S'], ['22 min', 'PE report turnaround saved, day shift only [JACR 2025]', 'S'], ['147 vs 150', 'ICH AI triage, report minutes: no clear gain [AJR 2025]', 'S']],
    tobe: [['1 timeline', 'scanner to reader (modeled)', 'H'], ['1 hop', 'named as the delay', 'H'], ['Honest', 'AI is not promised to speed every read', 'H']],
  },
  kpis: ['Study transfer time, scanner to PACS', 'Time from scan to read', 'AI queue wait', 'Clinic link health per study'],
  ask: 'When a stroke study is slow, can you tell in minutes whether it is the link, the PACS or the AI queue?',
  tiles: tiles6([['Door-to-needle goal, 85% of eligible [AHA]', '60 min', '60 min', 'S'], ['PE report turnaround saved, day shift [JACR 2025]', '22 min', '22 min', 'S'], ['ICH AI triage report time [AJR 2025]', '147 vs 150', '147 vs 150', 'S'], ['Timestamps across the path', 'None', 'One timeline', 'H'], ['Delay attributed to', 'A guess', 'A hop', 'H'], ['AI queue wait', 'Hidden', 'Visible', 'H']]),
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({ ct: [100, 160], wan: [350, 200], pacs: [545, 128], ai: [660, 128], rad: [570, 296] }, cisco4('te', 'fab', 'lake')),
  },
});

/* =============================== UC6 HOME =============================== */
UCS.push({
  id: 'home', code: 'UC6', n: 6, group: 'Use case', short: 'Hospital at home', name: 'The hospital that is a living room',
  setting: "The patient's home, the public internet and the command center",
  personas: ['Chief medical officer', 'Hospital-at-home program director', 'Command center nurse', 'Network engineer', 'CISO'],
  vision: 'The hospital shows the part of the path it owns, labels the part it does not, and gives the clinician evidence when a video visit fails, without calling the broadband provider blind.',
  legacy: {
    banner: 'Acute Hospital Care at Home needs an audio link on demand and a clinician at the house within 30 minutes. The broadband in between is not the hospital\'s, and the kit has nowhere to fall back to.',
    strip: 'Today: the patient\'s ISP is invisible, a failed visit is a phone call [H]', who: 'Evening video visit (sim)',
    silos: [['Home RPM kit portal', 'device status only [H]', 'p', 'sensor'], ['Video platform logs', 'session ended [H]', 'p', 'chat'], ['Command center board', 'who is due [H]', '', 'board'], ['Patient ISP', 'consumer circuit [H]', 'p', 'globe'], ['EHR', 'the record only [H]', '', 'server'], ['Escalation phone tree', 'manual [H]', 'p', 'phone']],
    gaps: ['The ISP is outside the hospital\'s view [H]', 'Failed visits look like patient error [H]', 'No fallback path in the kit [H]', 'Access to the EHR is a shared pipe [H]', 'No end-to-end health for a home'],
    big: ['358', 'approved hospital-at-home CCNs [CMS, 19 Oct 2026]'],
    tour: ['A patient at home loses video; the hospital does not own the broadband and cannot see where it broke.'],
  },
  tobe: {
    banner: 'ThousandEyes labels each hop: the hospital side green, the ISP amber with evidence in hand, never green by assumption. Secure Access protects the clinician path to the EHR, and a cellular gateway gives a fallback.',
    strip: 'ThousandEyes, Cisco Secure Access, AI Canvas, cellular gateway', who: 'Evening video visit (sim)',
    console: { title: 'Cloud Control | the home path', body: 'Hospital hops are measured; the ISP hop is shown amber or gray with evidence, never green by assumption. Fallback to cellular is a design choice, not a promise.', foot: 'The ISP is never shown as green', rows: [['Our side of the path', 'unknown', 'green', 0, 'check'], ['The ISP hop', 'invisible', 'amber, with evidence', 0, 'globe'], ['Clinician access to EHR', 'shared pipe', 'zero-trust access', 1, 'lock'], ['Fallback', 'none', 'cellular gateway', 1, 'wifi'], ['Failed visit', 'a phone tree', 'a labeled hop', 1, 'topology']] },
    stays: 'The video platform, the RPM vendor and the EHR stay as they are. The patient\'s broadband is never the hospital\'s to fix.',
    tour: ['Each hop is labeled; the ISP is amber with evidence, not green by assumption.', 'Outcomes are modeled: an evidence-based call to the right owner. One program\'s results are not generalized.'],
  },
  hops: {
    legacy: [['RPM kit', 'device status only', 'sensor'], ['Patient ISP', 'invisible to us', 'globe'], ['Video visit', 'session ends', 'chat'], ['Command center', 'phones the patient', 'phone']],
    tobe: [['ThousandEyes', 'labels every hop', 'eye'], ['Cellular gateway', 'fallback path', 'wifi'], ['Secure Access', 'clinician to EHR', 'lock'], ['AI Canvas', 'one view of the visit', 'canvas']],
  },
  pathNote: { legacy: 'The middle of the path is not ours [H]', tobe: 'Green where it is ours, amber where it is not' },
  outcomes: {
    legacy: [['358', 'approved hospital-at-home CCNs [CMS, 19 Oct 2026]', 'S'], ['2030', 'AHCAH waiver runs through 30 Sep 2030 [CMS]', 'S'], ['$536M', 'Medicare RPM payments in 2024, up 31% [HHS OIG]', 'S']],
    tobe: [['1 view', 'of the visit path, labeled by owner (modeled)', 'H'], ['Amber', 'for the ISP, with evidence, never green', 'H'], ['1 fallback', 'a cellular path in the kit', 'H']],
  },
  kpis: ['Video visit completion rate', 'Time to name the failing hop', 'Fallback activation rate', 'Visits needing a phone call'],
  ask: 'When a home video visit fails, can you tell the clinician whose problem it is?',
  tiles: tiles6([['Approved hospital-at-home CCNs [CMS]', '358', '358', 'S'], ['AHCAH waiver through [CMS]', '2030', '2030', 'S'], ['Medicare RPM payments 2024 [HHS OIG]', '$536M', '$536M', 'S'], ['View of the home path', 'None', 'Labeled hops', 'H'], ['Fallback in the kit', 'None', 'Cellular', 'H'], ['Patient ISP shown as green', 'No', 'Never', 'S']]),
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({ kit: [90, 150], cell: [90, 292], isp: [330, 150], video: [330, 296], cmd: [540, 150], ehr: [640, 296] }, cisco4('te', 'zt', 'canvas')),
  },
});

/* =============================== UC7 WAN =============================== */
UCS.push({
  id: 'wan', code: 'UC7', n: 7, group: 'Use case', short: 'Acquired clinic', name: 'The acquired clinic arrives flat',
  setting: 'The acquired clinic, a single circuit and the parent health system',
  personas: ['CEO and CFO', 'CIO', 'CISO', 'Network engineer', 'Integration program manager'],
  vision: 'An acquired site gets an inventory, a topology and a trust gate before it reaches the parent EHR, with an identity baseline and an SD-WAN edge brought up in a planned order.',
  legacy: {
    banner: 'A distressed seller closes on Friday. Monday the clinic needs the EHR, and its network is one flat VLAN with an open remote desktop and a single circuit.',
    strip: 'Today: Monday morning access, no inventory, no gate [H]', who: 'Day one after close (sim)',
    silos: [['Seller IT documents', 'partial, stale [H]', 'p', 'doc'], ['Clinic router and ISP', 'single circuit [H]', 'p', 'router'], ['Remote desktop exposure', 'open to the internet [H]', 'p', 'lock'], ['Parent address plan', 'overlaps possible [H]', '', 'board'], ['Parent SOC', 'cannot see the clinic [H]', '', 'eye'], ['Integration spreadsheet', 'task list, not a map [H]', '', 'doc']],
    gaps: ['No inventory of what the clinic owns [H]', 'Flat VLAN with an open remote desktop [H]', 'Single circuit to the parent EHR [H]', 'Address overlap is found by outage [H]', 'The SOC learns of the clinic late'],
    big: ['43.5%', '2025 hospital deals with a distressed party [Kaufman Hall]'],
    tour: ['The clinic is flat, its remote desktop is exposed, and Monday it must reach the parent EHR.'],
  },
  tobe: {
    banner: 'Inventory and a Layer 3 map come first, a trust gate stands before the EHR, an identity baseline follows, and an SD-WAN edge replaces the single circuit, each step approved.',
    strip: 'Inventory and L3 map, trust gate, identity baseline, SD-WAN edge', who: 'Day one after close (sim)',
    console: { title: 'Cloud Control | onboarding', body: 'Inventory first, then a gate before the parent EHR, then an identity baseline and an SD-WAN edge. Each change waits for approval by the network and security leads.', foot: 'No access until the gate passes', rows: [['What the clinic owns', 'unknown', 'inventory and map', 0, 'topology'], ['Access to the parent EHR', 'open on Monday', 'after the trust gate', 1, 'lock'], ['Identity', 'shared accounts', 'baseline applied', 2, 'key'], ['Link', 'single circuit', 'SD-WAN edge', 2, 'router'], ['Parent SOC view', 'none', 'clinic visible', 2, 'eye']] },
    stays: 'The seller\'s equipment stays until the replacement is proven. Integration order and approvals remain a program decision.',
    tour: ['First the map, then the gate, then identity, then a second path.', 'Outcomes are modeled: a clinic onboarded in a planned order. A vendor case-study outage cut is not generalized.'],
  },
  hops: {
    legacy: [['Clinic network', 'flat, one VLAN', 'building'], ['Open remote desktop', 'exposed', 'lock'], ['Single circuit', 'no second path', 'router'], ['Parent EHR', 'reached on Monday', 'server']],
    tobe: [['Inventory + L3 map', 'know what is there', 'topology'], ['Trust gate', 'before the EHR', 'lock'], ['Identity baseline', 'one standard', 'key'], ['SD-WAN edge', 'a second path', 'router']],
  },
  pathNote: { legacy: 'Access first, knowledge later [H]', tobe: 'Map, gate, identity, edge' },
  outcomes: {
    legacy: [['43.5%', '2025 hospital deals with a distressed party [Kaufman Hall]', 'S'], ['46', 'announced hospital transactions in 2025, down from 72 [Kaufman Hall]', 'S'], ['85,000', 'patients, one OCR acquired-practice case [law firm summary]', 'S']],
    tobe: [['1 map', 'before any access (modeled)', 'H'], ['1 gate', 'between the clinic and the EHR', 'H'], ['2 paths', 'from the clinic to the parent', 'H']],
  },
  kpis: ['Days from close to inventory', 'Clinic devices unknown at go-live', 'Circuits per clinic', 'Time to parent SOC visibility'],
  ask: 'On the Monday after a close, what do you know about the clinic network before you give it EHR access?',
  tiles: tiles6([['2025 hospital deals with a distressed party [Kaufman Hall]', '43.5%', '43.5%', 'S'], ['Announced hospital transactions, 2025 [Kaufman Hall]', '46', '46', 'S'], ['Patients in one OCR case [law firm summary]', '85,000', '85,000', 'S'], ['Inventory of the clinic', 'None', 'Map first', 'H'], ['Access to the EHR', 'Open', 'Gated', 'H'], ['Paths to the parent', '1 circuit', '2 paths', 'H']]),
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({ clinic: [110, 150], rdp: [110, 292], circ: [320, 210], ehr: [535, 130], ip: [465, 296], soc: [650, 296] }, cisco4('inv', 'gate', 'idb', 'sdw')),
  },
});
