/* Use cases 8 to 10: identity, compliance evidence, AI assistants at work. */

/* =============================== UC8 IDENTITY =============================== */
UCS.push({
  id: 'identity', code: 'UC8', n: 8, group: 'Use case', short: 'Identity', name: 'Fast for the nurse, strong for the vendor',
  setting: 'Who signs in, the directories behind them and the break-glass desk',
  personas: ['CISO', 'CMIO', 'Identity and access lead', 'Chief nursing officer', 'Third-party risk manager'],
  vision: 'Clinicians tap and go, vendors get scoped and logged access with a second factor, and one identity baseline spans three directories left by three mergers.',
  legacy: {
    banner: 'A hospitalist taps a badge and is in. A modality vendor uses a shared account with no second factor. Three directories from three mergers sit behind both, and break-glass is an envelope.',
    strip: 'Today: three directories, shared vendor accounts, an envelope for break-glass [H]', who: 'A normal Tuesday (sim)',
    silos: [['Directory A', 'legacy hospital [H]', '', 'key'], ['Directory B', 'acquired system [H]', '', 'key'], ['Cloud identity provider', 'new apps only [H]', '', 'cloud'], ['Vendor remote access', 'shared account [H]', 'p', 'lock'], ['Badge SSO', 'its own logs [H]', '', 'badge'], ['Break-glass envelope', 'on paper [H]', 'p', 'doc']],
    gaps: ['Three directories, three password rules [H]', 'Vendor access has no second factor [H]', 'No one approves a vendor session [H]', 'Break-glass use is not audited [H]', 'Slow login pushes clinicians to workarounds'],
    big: ['No MFA', 'Change Healthcare remote portal [public reporting]'],
    tour: ['A badge tap is fast, a vendor uses a shared account, and three directories disagree.'],
  },
  tobe: {
    banner: 'Cisco Identity gives one baseline over the three directories. A vendor session is requested, approved by a person and logged, and clinicians keep the badge tap.',
    strip: 'Cisco Identity, approvals, audit log, ISE and your IdP', who: 'A normal Tuesday (sim)',
    console: { title: 'Cloud Control | identity', body: 'One baseline across directories. Vendor access is scoped, approved and logged. The badge tap for clinicians is not changed.', foot: 'Clinicians keep the badge tap', rows: [['Directories to reason about', '3', '1 baseline', 0, 'key'], ['Vendor access', 'shared account', 'scoped, with MFA', 1, 'lock'], ['Who approves', 'nobody', 'a named person', 1, 'person'], ['Audit', 'scattered', 'one log', 2, 'doc'], ['Clinician login', 'badge tap', 'badge tap, unchanged', 2, 'badge']] },
    stays: 'Your directories and IdP stay in place. Break-glass remains a clinical safety path; the change is that it is logged and reviewed.',
    tour: ['One baseline over three directories; the vendor session needs a person to approve it.', 'Outcomes are modeled: a scoped, logged vendor path and an unchanged clinician tap.'],
  },
  hops: {
    legacy: [['Badge tap', 'fast, local SSO', 'badge'], ['Three directories', 'three rule sets', 'key'], ['Vendor account', 'shared, no MFA', 'lock'], ['Break-glass', 'an envelope', 'doc']],
    tobe: [['Cisco Identity', 'one baseline', 'key'], ['Approval', 'a person decides', 'person'], ['Scoped vendor session', 'with a second factor', 'lock'], ['Audit log', 'one record', 'doc']],
  },
  pathNote: { legacy: 'Different rules per directory [H]', tobe: 'One baseline, one approval, one log' },
  outcomes: {
    legacy: [['20.4 s', 'saved per reconnect with badge SSO, 19 hospitals [published study]', 'S'], ['No MFA', 'Change Healthcare remote portal [public reporting]', 'S'], ['Reported', 'Synnovis no two-factor is reported, not a primary forensic release', 'S']],
    tobe: [['1 baseline', 'over three directories (modeled)', 'H'], ['1 approver', 'before a vendor session starts', 'H'], ['1 log', 'for vendor and break-glass use', 'H']],
  },
  kpis: ['Vendor accounts with MFA', 'Time to approve a vendor session', 'Break-glass events reviewed', 'Login time at the bedside'],
  ask: 'Today, who approves a vendor logging into a device, and where is that recorded?',
  tiles: tiles6([['Saved per reconnect, badge SSO [19 hospitals]', '20.4 s', '20.4 s', 'S'], ['Change Healthcare remote portal [reported]', 'No MFA', 'No MFA', 'S'], ['Directories to reason about', '3', '1 baseline', 'H'], ['Vendor access', 'Shared', 'Scoped + MFA', 'H'], ['Vendor session approval', 'None', 'A person', 'H'], ['Clinician login', 'Badge tap', 'Badge tap', 'H']]),
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({ nurse: [90, 142], vendor: [90, 292], ad1: [300, 142], ad2: [410, 142], okta: [520, 142], glass: [662, 292] }, cisco4('cid', 'app', 'aud')),
  },
});

/* =============================== UC9 COMPLIANCE =============================== */
UCS.push({
  id: 'compliance', code: 'UC9', n: 9, group: 'Use case', short: 'Compliance', name: 'The map they ask for on a Tuesday',
  setting: 'Evidence the team keeps today and what the surveyor asks for',
  personas: ['Compliance officer', 'CISO', 'Privacy officer', 'Network architect', 'Internal audit'],
  vision: 'Evidence is a live view that a person annotates, not a screenshot gathered the week before. The platform helps; compliance remains the customer\'s to prove.',
  legacy: {
    banner: 'A surveyor wants the ePHI network map and proof the pump segment was isolated on a given date. Four inventories disagree, and the answer is a corkboard and screenshots.',
    strip: 'Today: four inventories, point-in-time screenshots [H]', who: 'Surveyor visit on a Tuesday (sim)',
    silos: [['Network diagram', 'a corkboard [H]', 'p', 'board'], ['CMMS asset list', 'serial numbers [H]', '', 'gear'], ['DHCP lease table', 'live, not kept [H]', '', 'server'], ['NAC report', 'device types [H]', '', 'shield'], ['GRC tool', 'attestations [H]', '', 'doc'], ['Screenshots folder', 'point in time [H]', 'p', 'monitor']],
    gaps: ['Four inventories disagree [H]', 'Evidence is a screenshot, not a record [H]', 'ePHI scope is a human judgement [H]', 'Isolation on a date is hard to prove [H]', 'Nobody owns evidence between audits'],
    big: ['710', 'large healthcare breaches in 2025 [HIPAA Journal, from OCR data]'],
    tour: ['The surveyor asks for the ePHI map, and four inventories and a corkboard are the answer.'],
  },
  tobe: {
    banner: 'A live topology and an audit log in the Machine Data Lake give a dated record. A person annotates which parts hold ePHI. Cloud Control helps with evidence; it is not HIPAA certified.',
    strip: 'Live topology, audit log, Machine Data Lake, human ePHI annotation', who: 'Surveyor visit on a Tuesday (sim)',
    console: { title: 'Cloud Control | evidence', body: 'A live topology and a dated audit log. A person marks which segments carry ePHI. HIPAA alignment remains the customer\'s responsibility.', foot: 'Not HIPAA certified; evidence only', rows: [['Network map', 'corkboard', 'live topology', 0, 'topology'], ['Isolation on a date', 'a screenshot', 'a dated audit record', 1, 'doc'], ['ePHI scope', 'human guess', 'human annotation', 2, 'person'], ['Inventories', '4 disagree', '1 joined', 2, 'database'], ['Compliance claim', 'on the customer', 'on the customer', 2, 'lock']] },
    stays: 'The compliance program, the risk analysis and the attestation stay with you. Splunk guidance puts HIPAA alignment on the customer.',
    tour: ['A live topology and a dated record replace the corkboard and the screenshots.', 'Outcomes are modeled: faster evidence for the surveyor. The rule update dates are proposals, not in force.'],
  },
  hops: {
    legacy: [['Corkboard and diagrams', 'a point in time', 'board'], ['Four inventories', 'disagree', 'database'], ['Screenshots', 'the evidence', 'monitor'], ['Surveyor', 'asks Tuesday', 'person']],
    tobe: [['Live topology', 'always current', 'topology'], ['Audit log', 'dated, signed in', 'doc'], ['Machine Data Lake', 'one joined record', 'database'], ['ePHI annotation', 'a person decides', 'person']],
  },
  pathNote: { legacy: 'Evidence is assembled by hand [H]', tobe: 'Live view, dated record, human scope' },
  outcomes: {
    legacy: [['710', 'large healthcare breaches in 2025 [HIPAA Journal]', 'S'], ['July 2027', 'projected final action on the HIPAA Security Rule update [regulatory agenda]', 'S'], ['72 hours', 'proposed restore target; not in force [HIPAA NPRM]', 'S']],
    tobe: [['1 map', 'live, not drawn for the audit (modeled)', 'H'], ['1 record', 'dated, with who approved what', 'H'], ['Customer', 'owns the compliance claim', 'S']],
  },
  kpis: ['Time to produce an ePHI map', 'Inventories that agree', 'Isolation changes with a dated record', 'Evidence gathered between audits'],
  ask: 'If a surveyor asks tomorrow, how long does it take to prove what you isolated, and when?',
  tiles: tiles6([['Large healthcare breaches in 2025 [HIPAA Journal]', '710', '710', 'S'], ['HIPAA Security Rule final action, projected', 'July 2027', 'July 2027', 'S'], ['Proposed restore target, not in force [NPRM]', '72 hours', '72 hours', 'S'], ['Inventories that agree', '0 of 4', '1 joined', 'H'], ['Isolation evidence', 'Screenshot', 'Dated record', 'H'], ['Compliance claim', 'Customer', 'Customer', 'S']]),
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({ cork: [80, 206], cmms: [190, 118], dhcp: [310, 118], nac: [190, 296], grc: [310, 296], shot: [400, 206], surv: [592, 206] }, cisco4('topo', 'audit', 'lake', 'human')),
  },
});

/* =============================== UC10 AI WORK =============================== */
UCS.push({
  id: 'aiwork', code: 'UC10', n: 10, group: 'Use case', short: 'AI at work', name: 'The scribe stops at 8:12',
  setting: 'A clinic, its Wi-Fi and the AI vendor outside the hospital',
  personas: ['Chief Medical Information Officer', 'Clinic operations manager', 'Network engineer', 'CISO', 'Vendor manager'],
  vision: 'When the scribe stops, the team can say in minutes whether the clinic, the vendor or the upstream model is the cause, shadow AI meets a guardrail, and the cost of tokens is visible.',
  legacy: {
    banner: 'Monday clinic. Notes stop generating in four exam rooms. The network team spends two hours on Wi-Fi while the vendor status page names an upstream model. Meanwhile, a clinician opens an unapproved chatbot.',
    strip: 'Today: an AI vendor outside every dashboard, shadow AI is the workaround [H]', who: 'Monday 8:12 a.m. (sim)',
    silos: [['Clinic Wi-Fi dashboard', 'all green [H]', '', 'wifi'], ['Scribe vendor status page', 'names an upstream model [H]', 'p', 'cloud'], ['Support ticket', 'two hours, no owner [H]', 'p', 'doc'], ['DLP or egress policy', 'not AI-aware [H]', '', 'lock'], ['Token and usage billing', 'monthly, late [H]', 'p', 'board'], ['AI policy document', 'not enforced [H]', '', 'doc']],
    gaps: ['The vendor path is outside the map [H]', 'Wi-Fi gets blamed first [H]', 'Shadow AI fills the gap [H]', 'Token cost arrives a month late [H]', 'No gate between a model change and a note'],
    big: ['17%', 'of clinicians admit unapproved AI use [Wolters Kluwer 2025]'],
    tour: ['The scribe stops in four exam rooms; two hours go to Wi-Fi while the cause sits upstream.'],
  },
  tobe: {
    banner: 'ThousandEyes shows the clinic side green and the vendor hop amber in minutes. AI Defense finds the unapproved chatbot and puts a guardrail on it. Tokenomics shows what the scribe costs.',
    strip: 'ThousandEyes, AI Defense, Tokenomics, AI Canvas', who: 'Monday 8:12 a.m. (sim)',
    console: { title: 'Cloud Control | AI at work', body: 'Clinic hops green, vendor hop amber, upstream gray by design. AI Defense finds unapproved apps; Tokenomics shows model and token cost per use.', foot: 'The physician still reviews every note', rows: [['Time spent on Wi-Fi', '2 hours', 'minutes, with evidence', 0, 'clock'], ['Vendor and upstream', 'unknown', 'labeled by owner', 0, 'cloud'], ['Unapproved chatbot', 'invisible', 'found, guardrail on', 1, 'shield'], ['Token cost per use', 'monthly bill', 'visible per use', 1, 'board'], ['Clinical note', 'physician reviews', 'physician reviews', 1, 'person']] },
    stays: 'The clinician reviews every note, and the scribe vendor remains the vendor. Cloud Control labels the path; it does not fix the vendor.',
    tour: ['Our side is green and the vendor is the delay, shown in minutes, not hours.', 'Outcomes are modeled: a guardrail on shadow AI and token cost made visible. The 8-minute clear time is illustrative.'],
  },
  hops: {
    legacy: [['Exam room', 'audio uplink', 'mic'], ['Clinic Wi-Fi', 'blamed first', 'wifi'], ['Scribe vendor', 'status page only', 'cloud'], ['Upstream model', 'named late', 'gpu']],
    tobe: [['ThousandEyes', 'path by owner', 'eye'], ['AI Defense', 'finds shadow AI', 'shield'], ['Tokenomics', 'cost per use', 'board'], ['AI Canvas', 'one investigation', 'canvas']],
  },
  pathNote: { legacy: 'The cause was upstream, outside every map [H]', tobe: 'Clinic green, vendor amber, upstream gray' },
  outcomes: {
    legacy: [['13.4 min', 'less EHR time per 8 scheduled hours, five systems [JAMA 2026]', 'S'], ['79%', 'organizations using ambient speech [KLAS via TechTarget]', 'S'], ['70%', 'simulated notes with an error, 31 of 44 [JMIR 2025]', 'S']],
    tobe: [['Minutes', 'to separate clinic, vendor and upstream (modeled)', 'H'], ['Guardrail', 'in front of unapproved AI apps', 'H'], ['Visible', 'token cost per use', 'H']],
  },
  kpis: ['Time to attribute a scribe outage', 'Unapproved AI apps found', 'Token cost per visit', 'Notes edited by the physician'],
  ask: 'When the scribe stops, how long until you know whether it is your network or someone upstream?',
  tiles: tiles6([['Less EHR time per 8 scheduled hours [JAMA 2026]', '13.4 min', '13.4 min', 'S'], ['Organizations using ambient speech [KLAS]', '79%', '79%', 'S'], ['Clinicians admitting unapproved AI use [Wolters Kluwer]', '17%', '17%', 'S'], ['Time spent on the wrong layer', '2 hours', 'minutes', 'I'], ['Unapproved AI', 'Unseen', 'Guardrail on', 'H'], ['Token cost', 'Monthly bill', 'Per use', 'H']]),
  scene: {
    modalPos: [392, 222],
    pos: Object.assign({ room: [90, 142], ap: [90, 294], md: [260, 142], chat: [260, 294], vendor: [450, 146], up: [630, 146] }, cisco4('te', 'def', 'tok')),
  },
});
