/* Use cases 1 to 4: EHR performance, medical devices, downtime and ransomware, clinical Wi-Fi. */

/* =============================== UC1 EHR =============================== */
UCS.push({
  id: 'ehr', code: 'UC1', n: 1, group: 'Use case', short: 'EHR slow', name: 'EHR is slow: prove which tier',
  setting: 'Nursing unit, network path and data center',
  personas: ['CIO', 'Chief nursing officer', 'Application and EHR team', 'Network operations', 'Virtualization and storage team'],
  vision: 'One investigation walks the path from the workstation to the storage, so the first call goes to the right tier and not to a bridge with five teams.',
  legacy: {
    banner: 'Nurses on 4 West say the EHR is spinning. Network, desktop virtualization, application, storage and the vendor each say it is not them, and the bridge call keeps running.',
    strip: 'Today: five dashboards, five owners, no timer on the bridge [H]', who: 'Morning med pass on 4 West (sim)',
    silos: [['Wi-Fi dashboard', 'says healthy [H]', '', 'wifi'], ['Network monitoring', 'links are up [H]', '', 'switch'], ['VDI or Citrix console', 'sessions look fine [H]', '', 'server'], ['EHR application monitor', 'vendor black box [H]', 'p', 'chat'], ['Storage array tool', 'latency in its own pane [H]', '', 'database'], ['Bridge call', 'five owners, no timer [H]', 'p', 'phone']],
    gaps: ['Every tier reports its own green [H]', 'No timeline across tiers [H]', 'The bridge call is the correlation engine [H]', 'Mean time to innocence is not measured', 'Clinicians see a spinner, not a tier'],
    big: ['5', 'teams each prove it is not them [H]'],
    tour: ['4 West says Hyperspace is spinning, and five dashboards each show their own green.'],
  },
  tobe: {
    banner: 'AI Canvas with ThousandEyes and Intersight walks the path one hop at a time. The tier at fault gets the ticket, and the other four teams are cleared with evidence.',
    strip: 'AI Canvas, ThousandEyes, Intersight, Nexus, data lake', who: 'Morning med pass on 4 West (sim)',
    console: { title: 'Cloud Control | EHR path', body: 'One investigation across Wi-Fi, WAN, VDI, application and storage. It narrows the tier and names the owner. Domain tools stay the systems of record.', foot: 'The stopwatch is a proposed KPI', rows: [['Teams on the bridge', '5', 'the owner of one tier', 0, 'people'], ['Consoles to open', '5', '1 canvas', 0, 'canvas'], ['Tier at fault', 'argued', 'shown with evidence', 1, 'topology'], ['Mean time to innocence', 'not measured', 'a stopwatch (proposed)', 2, 'clock'], ['Ticket', 'phone tree', 'goes to one team', 2, 'doc']] },
    stays: 'Citrix, the network controllers and the EHR vendor tools stay in place. Cloud Control narrows the tier; owners still make the fix.',
    tour: ['One investigation walks workstation, Wi-Fi, WAN, VDI, EHR and storage, and clears four of five teams.', 'Outcomes are modeled: a faster verdict on whose tier it is. The 12-minute value is illustrative.'],
  },
  hops: {
    legacy: [['Workstation and Wi-Fi', 'looks healthy', 'wifi'], ['Core and WAN', 'links are up', 'router'], ['VDI and EHR tier', 'its own console', 'server'], ['Storage path', 'latency elsewhere', 'database']],
    tobe: [['ThousandEyes', 'path and Wi-Fi hops', 'eye'], ['AI Canvas', 'one investigation', 'canvas'], ['Intersight / Nexus', 'compute and fabric', 'rack'], ['Machine Data Lake', 'the same timeline', 'database']],
  },
  pathNote: { legacy: 'Each tier proves its own green [H]', tobe: 'Hop by hop, one timeline' },
  outcomes: {
    legacy: [['300 ms', 'Citrix ICA round-trip warning; 400 ms is critical [Citrix defaults]', 'S'], ['$1M/hr', 'large-hospital downtime, 2018 estimate, not a study [industry]', 'S'], ['759', 'hospitals disrupted by CrowdStrike, 19 Jul 2024 [JAMA]', 'S']],
    tobe: [['1 tier', 'named with evidence, four teams cleared (modeled)', 'H'], ['1 timeline', 'across Wi-Fi, WAN, VDI and storage', 'H'], ['12 min', 'illustrative time to a verdict; a proposed KPI', 'I']],
  },
  kpis: ['Mean time to innocence', 'Teams pulled onto the bridge', 'Time to the right owner', 'Repeat incidents'],
  ask: 'Next time the EHR spins, how long until you know which tier it is?',
  tiles: tiles6([['Citrix ICA round-trip warning [defaults]', '300 ms', '300 ms', 'S'], ['Downtime estimate, large hospital [2018]', '$1M/hr', '$1M/hr', 'S'], ['Hospitals disrupted by CrowdStrike [JAMA]', '759', '759', 'S'], ['Teams on the bridge', '5', '1 owner', 'H'], ['Mean time to innocence', 'not measured', 'proposed KPI', 'H'], ['Illustrative time to verdict', '2 hours', '12 min', 'I']]),
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({ wow: [84, 142], wifi: [196, 142], bridge: [110, 296], wan: [337, 212], vdi: [490, 142], ehr: [615, 142], store: [615, 292] }, cisco4('canvas', 'te', 'dcv')),
  },
});

/* =============================== UC2 IOMT =============================== */
UCS.push({
  id: 'iomt', code: 'UC2', n: 2, group: 'Use case', short: 'Medical devices', name: 'See the pump before you patch it',
  setting: 'ICU bays, radiology, guest network and the teams that own the facts',
  personas: ['CISO', 'Clinical engineering (HTM)', 'Network operations', 'Chief medical officer', 'Compliance officer'],
  vision: 'Devices that cannot take an agent are identified by what they say on the network, risk is shared with the people who own the device, and segmentation is applied only after biomed and network approve.',
  legacy: {
    banner: 'Infusion pumps cannot take an agent and stay in service for a decade. They share a flat network with imaging and the guest bridge, and the facts about them sit in three teams.',
    strip: 'Today: flat clinical network, vulnerability scans and the CMMS never meet [H]', who: 'Quarterly vulnerability review (sim)',
    silos: [['Vulnerability scanner', 'safe-scan limits [H]', '', 'scan'], ['CMMS asset records', 'serial, not address [H]', '', 'gear'], ['NAC or switch tables', 'MAC and port [H]', '', 'switch'], ['Manufacturer advisories', 'by model, by email [H]', 'p', 'doc'], ['Security tools', 'no agent possible [H]', '', 'shield'], ['Clinical engineering', 'owns the device [H]', 'p', 'person']],
    gaps: ['Cannot see the pump, cannot patch it [H]', 'Three inventories, three owners [H]', 'Flat network: one pump, whole VLAN [H]', 'Patching waits on a clinical window [H]', 'No agreed risk score across teams'],
    big: ['99%', 'of orgs run a device with a known exploited vulnerability [Claroty 2025, vendor]'],
    tour: ['Pumps share a flat network with imaging and guests; the facts about each pump live in three teams.'],
  },
  tobe: {
    banner: 'Cisco Identity names the device by behavior, the Machine Data Lake joins CMMS and network facts, and segmentation is applied only after a person approves it.',
    strip: 'Identity, data lake, AI Canvas, ISE or Catalyst Center', who: 'Quarterly vulnerability review (sim)',
    console: { title: 'Cloud Control | device fleet', body: 'One joined view of what each device is, who owns it and what it talks to. Segmentation is proposed to Biomed and Network operations and executes only on approval.', foot: 'No agent on the pump', rows: [['Inventories', '3 disagree', '1 joined view', 0, 'database'], ['Device identity', 'MAC address', 'model and behavior', 0, 'badge'], ['Risk owner', 'unclear', 'biomed + security', 1, 'people'], ['Pump segment', 'none', 'applied after approval', 2, 'shield'], ['Patch', 'waits for a window', 'stays on the clinical calendar', 2, 'clock']] },
    stays: 'No agent goes on the pump and patching stays on the clinical engineering calendar. Segmentation limits exposure; it does not replace patching.',
    tour: ['Pumps get a name, an owner and a joined risk view without an agent.', 'Outcomes are modeled: fewer unknown devices and a segment after approval. No patient-harm event is claimed.'],
  },
  hops: {
    legacy: [['Device on the network', 'no agent possible', 'pump'], ['Scanner and CMMS', 'never joined', 'scan'], ['Flat VLAN', 'blast radius is wide', 'switch'], ['Clinical window', 'patch waits', 'clock']],
    tobe: [['Cisco Identity', 'by behavior, no agent', 'badge'], ['Machine Data Lake', 'CMMS + network facts', 'database'], ['Approval', 'biomed + network', 'person'], ['Device segment', 'limits exposure', 'shield']],
  },
  pathNote: { legacy: 'Facts about one pump live in three teams [H]', tobe: 'Identify, join, approve, segment' },
  outcomes: {
    legacy: [['99%', 'orgs with a device known exploited vulnerability [Claroty 2025, vendor]', 'S'], ['3.2 yr', 'device vulnerability dwell time [Trellix 2025, vendor]', 'S'], ['524B', 'FDA cyber-device rule covers new devices, not the installed base [FDA]', 'S']],
    tobe: [['1 view', 'of devices, owners and risk (modeled)', 'H'], ['1 segment', 'around the pump fleet after approval', 'H'], ['0 agents', 'installed on clinical devices', 'H']],
  },
  kpis: ['Share of devices with a known owner', 'Share of pumps segmented', 'Time from advisory to exposure map', 'Unmanaged device count'],
  ask: 'Can you list every infusion pump on your network and say who owns it, today?',
  tiles: tiles6([['Orgs with a known exploited device vuln [Claroty 2025]', '99%', '99%', 'S'], ['Vulnerability dwell time [Trellix 2025]', '3.2 yr', '3.2 yr', 'S'], ['FDA 524B scope', 'new devices', 'new devices', 'S'], ['Inventories to reconcile', '3', '1 joined', 'H'], ['Device identity', 'MAC only', 'model + behavior', 'H'], ['Pump network', 'Flat', 'Own segment', 'H']]),
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({ pumps: [88, 142], img: [88, 294], guest: [252, 294], net: [252, 150], scan: [420, 142], cmms: [540, 142], sec: [650, 142] }, cisco4('id', 'lake', 'app', 'seg')),
    extra(S, layer) {
      if (layer !== 'under') return;
      const a = S.alpha('seg'); if (a < 0.05) return;
      ctx.save(); ctx.globalAlpha *= a; D.box(26, 80, 126, 114, { fill: tint(COL.cisco, 0.07), stroke: COL.cisco, lw: 2, r: 8, dash: [7, 4] }); D.text('DEVICE SEGMENT', 89, 207, { size: 8.5, weight: 800, color: COL.cisco, align: 'center', halo: 3 }); ctx.restore();
    },
  },
});

/* =============================== UC3 RANSOM =============================== */
UCS.push({
  id: 'ransom', code: 'UC3', n: 3, group: 'Use case', short: 'Downtime', name: 'Downtime is a clinical procedure',
  setting: 'Health system and the region around it',
  personas: ['CEO and COO', 'CISO', 'Chief nursing officer', 'Emergency department director', 'Pharmacy and lab directors'],
  vision: 'The affected zone is drawn from one live topology, a person approves isolation, and restore comes from a clean copy with the order decided in advance.',
  legacy: {
    banner: 'EHR, phones, pharmacy, lab and imaging go down together. Paper starts, the emergency department diverts ambulances, and the region feels it within the hour.',
    strip: 'Today: dependencies are tribal knowledge, restore order is argued live [H]', who: 'Hour one of an outage (sim)',
    silos: [['Identity and directory', 'single point of entry [H]', '', 'key'], ['EHR and pharmacy', 'dependencies in heads [H]', '', 'server'], ['Lab and imaging', 'own downtime rules [H]', '', 'flask'], ['Backups', 'untested restore order [H]', '', 'database'], ['Ambulance diversion', 'a phone call [H]', 'p', 'ambulance'], ['Paper downtime kit', 'varies by unit [H]', 'p', 'doc']],
    gaps: ['Dependencies are not on one map [H]', 'Restore order is decided live [H]', 'Isolation and care share the same switches [H]', 'Backups may share the blast radius [H]', 'Nobody owns the clock'],
    big: ['192.7M', 'people affected by Change Healthcare [HHS OCR]'],
    tour: ['EHR, pharmacy and lab fail together, the ED diverts, and the region absorbs the patients.'],
  },
  tobe: {
    banner: 'AI Canvas draws the affected zone from the live topology. A person approves isolation, and restore starts from a clean copy in the order the clinical teams agreed in advance.',
    strip: 'AI Canvas, Layer 3 topology, approvals, isolated clean-room backups', who: 'Hour one of an outage (sim)',
    console: { title: 'Cloud Control | affected zone', body: 'The zone is drawn from live topology and dependencies. Isolation and restore are proposed, and a named approver decides. Care teams set the restore order beforehand.', foot: 'Human approval before isolation', rows: [['Affected zone', 'argued on a call', 'drawn from topology', 0, 'topology'], ['Isolation', 'pull the plug', 'proposed, approved', 1, 'person'], ['Restore source', 'live backups', 'clean-room copy', 2, 'database'], ['Restore order', 'decided live', 'agreed in advance', 2, 'doc'], ['Diversion call', 'late', 'earlier, with evidence', 2, 'ambulance']] },
    stays: 'Downtime procedures stay on paper and in the clinical teams. Cloud Control scopes and restores; it never decides care. The timing here is illustrative.',
    tour: ['The zone is drawn, isolation waits for a person, and restore comes from a clean copy.', 'Outcomes are modeled: a smaller zone and a faster, ordered restore. The clock is illustrative.'],
  },
  hops: {
    legacy: [['Identity', 'everything signs in here', 'key'], ['EHR, pharmacy, lab', 'fail together', 'server'], ['Backups', 'maybe in the blast radius', 'database'], ['Region', 'ambulances divert', 'ambulance']],
    tobe: [['AI Canvas', 'draws the zone', 'canvas'], ['Approval', 'a person isolates', 'person'], ['Clean-room backup', 'separate copy', 'database'], ['Ordered restore', 'agreed in advance', 'check']],
  },
  pathNote: { legacy: 'Dependencies live in people, not on a map [H]', tobe: 'Zone, approval, clean copy, ordered restore' },
  outcomes: {
    legacy: [['192.7M', 'people affected by Change Healthcare [HHS OCR]', 'S'], ['$3.09B', 'UnitedHealth 2024 cost of that incident [filings]', 'S'], ['20 to 35%', 'in-hospital mortality rise, Medicare admits [Minnesota working paper]', 'S']],
    tobe: [['1 zone', 'drawn from live topology (modeled)', 'H'], ['1 approver', 'named before isolation runs', 'H'], ['Clean copy', 'restore does not start from the blast radius', 'H']],
  },
  kpis: ['Time to a scoped zone', 'Time to isolation approval', 'Time to first clean restore', 'Diversion hours'],
  ask: 'In hour one of an outage, who decides which system comes back first?',
  tiles: tiles6([['People affected, Change Healthcare [HHS OCR]', '192.7M', '192.7M', 'S'], ['UnitedHealth 2024 cost of that incident', '$3.09B', '$3.09B', 'S'], ['In-hospital mortality rise [working paper]', '20 to 35%', '20 to 35%', 'S'], ['Affected zone', 'Argued', 'Drawn', 'H'], ['Isolation', 'Pull the plug', 'Approved', 'H'], ['Restore source', 'Live backups', 'Clean copy', 'H']]),
  scene: {
    modalPos: [292, 222], modalW: 290,
    pos: Object.assign({ idn: [90, 136], ehr: [215, 136], pharm: [340, 136], lab: [465, 136], ed: [260, 290], bak: [90, 290], amb: [635, 282] }, cisco4('canvas', 'zone', 'app', 'clean')),
  },
});

/* =============================== UC4 WIFI =============================== */
UCS.push({
  id: 'wifi', code: 'UC4', n: 4, group: 'Use case', short: 'Clinical Wi-Fi', name: 'The badge call has to roam',
  setting: '4 West corridor, stairwell and the clinical systems behind it',
  personas: ['Chief nursing officer', 'Rapid response lead', 'Wireless network engineer', 'Clinical communications owner', 'Facilities engineer'],
  vision: 'The badge, the AP, the closet and the nurse-call platform are one timeline, so a stairwell drop is attributed to a layer and not argued by two teams.',
  legacy: {
    banner: 'A voice badge drops in the stairwell during a rapid response. The laptop on the same access point was fine, so the wireless team and the nurse-call vendor each say it is not them.',
    strip: 'Today: radio, PoE closet and voice platform are three owners [H]', who: 'Rapid response, 4 West (sim)',
    silos: [['Wireless controller', 'signal looks fine [H]', '', 'wifi'], ['PoE closet and switch', 'power and ports [H]', '', 'switch'], ['Voice badge platform', 'its own logs [H]', 'p', 'badge'], ['Nurse call system', 'separate vendor [H]', 'p', 'bell'], ['RTLS platform', 'tag data only [H]', 'p', 'sensor'], ['Site survey PDF', 'last survey date [H]', '', 'doc']],
    gaps: ['Roam failures are not logged as clinical events [H]', 'Laptops pass, badges drop [H]', 'Closet power and radio never meet [H]', 'Survey age is unknown [H]', 'Nobody sees the stairwell'],
    big: ['-65 dBm', 'voice badge minimum, with 25 dB SNR [Vocera design guide]'],
    tour: ['The badge drops in the stairwell, the laptop on the same AP is fine, and two teams point at each other.'],
  },
  tobe: {
    banner: 'AI Canvas lines up the badge roam, the AP, the PoE closet and the nurse-call events on one timeline. Cisco Spaces here shows connector health only, never where a patient is.',
    strip: 'AI Canvas, Meraki, Catalyst Center, Spaces connector', who: 'Rapid response, 4 West (sim)',
    console: { title: 'Cloud Control | the roam', body: 'Wi-Fi, switch and clinical-system events in one view. The cause is attributed to a layer; changes go through the wireless and facilities owners.', foot: 'Spaces shows connector health only', rows: [['Teams that own the drop', '3', 'one timeline', 0, 'people'], ['Stairwell coverage', 'unknown', 'measured', 0, 'wifi'], ['Cause', 'argued', 'attributed to a layer', 1, 'topology'], ['Nurse-call link', 'separate', 'on the same timeline', 1, 'bell'], ['Patient location', 'not shown', 'not shown, by design', 2, 'lock']] },
    stays: 'The wireless controller, the voice platform and nurse call stay the systems of record. Spaces is not a patient-location source.',
    tour: ['One timeline lines up the badge, the AP and the closet.', 'Outcomes are modeled: a faster attribution of the drop. No patient-harm event is claimed.'],
  },
  hops: {
    legacy: [['Voice badge', 'drops on roam', 'badge'], ['Stairwell AP', 'weak edge coverage', 'wifi'], ['PoE closet', 'separate owner', 'switch'], ['Nurse call', 'separate vendor', 'bell']],
    tobe: [['Meraki / Catalyst', 'roam and radio', 'wifi'], ['ThousandEyes', 'path to services', 'eye'], ['AI Canvas', 'one timeline', 'canvas'], ['Spaces connector', 'health only', 'sensor']],
  },
  pathNote: { legacy: 'Three owners per drop [H]', tobe: 'One timeline from badge to nurse call' },
  outcomes: {
    legacy: [['-65 dBm', 'voice badge minimum, with 25 dB SNR [Vocera design guide]', 'S'], ['< 100 ms', 'acceptable voice roam [Vocera design guide]', 'S'], ['8.9 s', 'badge reconnect with SSO, down from 29.3 s [19-hospital study]', 'S']],
    tobe: [['1 timeline', 'badge, AP, closet and nurse call (modeled)', 'H'], ['1 layer', 'named as the cause with evidence', 'H'], ['0', 'patient locations drawn from Spaces', 'S']],
  },
  kpis: ['Time to attribute a roam drop', 'Stairwell and elevator coverage gaps', 'Badge reconnect time', 'Survey age by floor'],
  ask: 'When a badge drops in a stairwell, whose problem is it, and how do you know?',
  tiles: tiles6([['Voice badge minimum signal [Vocera]', '-65 dBm', '-65 dBm', 'S'], ['Acceptable voice roam [Vocera]', '< 100 ms', '< 100 ms', 'S'], ['Badge reconnect with SSO [19-hospital study]', '8.9 s', '8.9 s', 'S'], ['Owners of a drop', '3', '1 timeline', 'H'], ['Stairwell coverage', 'Unknown', 'Measured', 'H'], ['Patient location via Spaces', 'No', 'No', 'S']]),
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({ ap1: [130, 134], ap2: [420, 134], badge: [270, 168], idf: [130, 318], nc: [565, 142], rtls: [640, 286] }, cisco4('canvas', 'mer', 'spaces')),
  },
});
