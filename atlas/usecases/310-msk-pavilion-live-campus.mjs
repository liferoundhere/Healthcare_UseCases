// MSK account use case M1: bringing the Kenneth C. Griffin Pavilion onto a live campus.
// Sources: research/11-account-memorial-sloan-kettering.md and research/data/account-msk.json (use case 1).
// Narrative converted from experience/src/story/accounts.ts. Every Cisco beat is a hypothesis to validate.
const n = (id, icon, title, sub, hidden = false) => ({ id, icon, title, sub: { exec: sub[0], dir: sub[1], eng: sub[2] }, hidden, r: 30 });
const k = (a, b, bend = 0) => ({ id: `${a}-${b}`, a, b, bend });
const s = (exec, dir, eng) => ({ exec, dir, eng });
const f = (v, l, src) => ({ v, l, s: src });
const MSK_PROFILE = 'MSK Statistical Profile 2024';

export default {
  id: 'msk-pavilion-live-campus',
  code: 'M1',
  editions: ['msk'],
  category: 'Account',
  pillars: ['Facilities', 'Security'],
  short: 'Pavilion onboarding',
  name: 'Bringing a 2030 pavilion onto a live campus',
  setting: 'Memorial Hospital, the Griffin Pavilion site and the bridge over 67th Street',
  situation: 'A new inpatient and surgical building must join the network, security and building systems of Memorial Hospital while cancer care continues next door.',
  personas: ['Chief digital officer', 'Pavilion activation lead', 'Perioperative leadership', 'Biomedical engineering', 'Network and security operations', 'Facilities and plant operations'],
  vision: 'Hypothesis to validate: each pavilion floor has one readiness record that network, security, biomedical and facilities teams read the same way, and a named MSK owner approves each move into production. Modeled, not measured.',
  legacy: {
    banner: 'MSK expects the Kenneth C. Griffin Pavilion to be completed by 2030 and connected to Memorial Hospital by an enclosed two-story bridge over 67th Street [MSK 2025]. In a project of this kind, readiness is assembled from separate team checklists while the hospital next door keeps running [H].',
    strip: 'Today: four teams, four checklists, one opening date [H]',
    who: 'Pavilion commissioning (illustrative)',
    silos: [
      ['Network port maps', 'what is patched where [H]', '', 'switch'],
      ['Security policy export', 'groups and rules [H]', '', 'shield'],
      ['Biomedical inventory', 'device lists per room [H]', '', 'pump'],
      ['Building management', 'air, power, access [H]', 'p', 'gear'],
      ['Contractor handover', 'documents per trade [H]', 'p', 'doc'],
    ],
    gaps: [
      'No single definition of ready for a floor [H]',
      'Commissioning and live clinical traffic share links [H]',
      'Designed versus installed is reconciled by hand [H]',
      'Gaps surface late, at activation rehearsals [H]',
      'Pavilion technology vendors are not public',
    ],
    big: ['95.1%', 'bed occupancy in the existing hospital in 2024 [MSK Statistical Profile 2024]'],
    recap: 'A new tower is commissioned beside a hospital that ran at 95.1% bed occupancy in 2024, and readiness is read from separate checklists.',
  },
  tobe: {
    banner: 'Hypothesis to validate: Topology and Inventory show designed versus installed per floor in one AI Canvas investigation, and an Agentic Workflow prepares each production move and stops for a named MSK approver. No public source says which vendors the pavilion will use.',
    strip: 'AI Canvas, Topology, Inventory, Agentic Workflows, Audit log',
    who: 'Pavilion commissioning (illustrative)',
    console: {
      title: 'Cloud Control | pavilion readiness',
      body: 'One investigation per floor: which devices are connected, identified and placed in the right security group, shown against the design. Modeled. Domain controllers stay the systems of record.',
      foot: 'Hypothesis to validate with MSK',
      rows: [
        ['Readiness reports per floor', '4 checklists', '1 shared record', 0, 'doc'],
        ['Designed versus installed', 'reconciled by hand', 'shown per floor', 0, 'topology'],
        ['Hospital-side dependencies', 'traced by hand', 'listed before the change', 1, 'router'],
        ['Production move', 'negotiated window', 'approved by a named person', 1, 'person'],
        ['Change evidence', 'rebuilt afterwards', 'in the audit log', 2, 'check'],
      ],
    },
    stays: 'Construction and commissioning stay with MSK and its builders, medical devices with biomedical engineering and their manufacturers, and building systems with facilities and their vendors.',
    recap: [
      'One readiness view per floor, and one named approval before a floor joins the clinical network.',
      'Outcomes are modeled, not measured. Any time saving is a model to test with MSK.',
    ],
  },
  hops: {
    legacy: [
      ['New operating suites', 'a device list per room', 'ct'],
      ['Building controllers', 'staged trade by trade', 'gear'],
      ['Bridge and core links', 'shared with live care', 'router'],
      ['Memorial Hospital', 'must not be disturbed', 'monitor'],
    ],
    tobe: [
      ['Topology, Inventory', 'designed versus installed', 'topology'],
      ['AI Canvas', 'one investigation per floor', 'canvas'],
      ['Agentic Workflow', 'prepares, then stops', 'gear'],
      ['Named approver', 'MSK change authority', 'person'],
    ],
  },
  pathNote: { legacy: 'Four teams, four checklists per floor [H]', tobe: 'One record per floor, one approval per move (modeled)' },
  outcomes: {
    legacy: [
      ['2030', 'expected completion of the Griffin Pavilion [MSK 2025]', 'S'],
      ['95.1%', 'bed occupancy next door in 2024 [MSK Statistical Profile 2024]', 'S'],
      ['883,000', 'square feet, per the architect listing [Construction Dive 2026]', 'S'],
    ],
    tobe: [
      ['1 record', 'of readiness per floor, read by four teams (modeled)', 'H'],
      ['1 approval', 'by a named MSK owner before a floor joins production', 'H'],
      ['Audit log', 'of request, approver and result per change (modeled)', 'H'],
    ],
  },
  kpis: ['Time to prove one floor is ready', 'Devices that do not match the design', 'Unplanned effects on Memorial Hospital', 'Approvals recorded per move'],
  ask: 'Who owns technical readiness for the Griffin Pavilion, and how will you prove a floor is ready before it connects to Memorial Hospital?',
  tiles: [
    { l: 'Pavilion completion expected [MSK 2025]', a: '2030', b: '2030', tag: 'S' },
    { l: 'Size, per the architect listing in trade press [Construction Dive 2026]', a: '883,000 sq ft', b: '883,000 sq ft', tag: 'S' },
    { l: 'Bed occupancy, existing hospital, 2024 [MSK Statistical Profile 2024]', a: '95.1%', b: '95.1%', tag: 'S' },
    { l: 'Inpatient beds planned, sources differ [MSK 2025; Construction Dive 2026]', a: '206 or 208', b: '206 or 208', tag: 'S' },
    { l: 'Readiness records per floor', a: '4 checklists', b: '1 record', tag: 'H' },
    { l: 'Approval before a production move', a: 'Per team', b: '1 named owner', tag: 'H' },
  ],
  scene: {
    decor: 'facilities', // tower (x 20 to 302), imgz (312 to 452), plant (462 to 720), remote (y 246 to 362)
    zoneLabels: { tower: 'Memorial Hospital, live care', imgz: 'Pavilion suites', plant: 'Pavilion building systems', remote: 'Over 67th Street' },
    pos: {
      care: [78, 128], clin: [196, 128], suites: [382, 138], bms: [528, 126], trades: [656, 126], bridge: [340, 296],
      topo: [110, 418], canvas: [280, 418], wf: [450, 418], appr: [620, 418],
    },
  },
  narr: {
    subtitle: "A new inpatient and surgical building must join Memorial Hospital's network, security and building systems while cancer care continues in the hospital next door.",
    caveat: "All 'with Cisco' beats are hypotheses to validate. MSK has not said which network, security or building vendors the pavilion will use. Public sources conflict on operating suite count (28 in MSK's March 2025 page, 12 in June 2026 trade press); do not quote a count. Outcomes are modeled, not measured.",
    nodes: [
      n('suites', 'ct', 'New operating suites', ['Every room a device list', 'Perioperative and biomedical', 'Ports, VLANs, access policy']),
      n('bms', 'gear', 'Building controllers', ['Air, power, access', 'Facilities and contractors', 'Staged trade by trade']),
      n('trades', 'people', 'Commissioning teams', ['Four teams, four checklists', 'IT, security, biomed, plant', 'Spreadsheets, handover docs']),
      n('bridge', 'router', 'Bridge and core links', ['Joins new tower to old', 'Network team', 'Shared trunks and routing']),
      n('care', 'monitor', 'Memorial Hospital units', ['Cancer care continues', 'Clinical teams', 'Production segments']),
      n('clin', 'server', 'Live clinical systems', ['Must not be disturbed', 'Application owners', 'Reached through the core']),
      n('topo', 'topology', 'Topology and Inventory', ['Designed versus installed', 'One view per floor', 'Controller and identity data'], true),
      n('canvas', 'canvas', 'AI Canvas', ['One investigation per floor', 'IT, security, facilities', 'Gaps against the design'], true),
      n('wf', 'gear', 'Agentic Workflow', ['Prepares the change', 'Lists what it touches', 'Stops for approval'], true),
      n('appr', 'person', 'Pavilion change authority', ['A named MSK owner', 'Periop and biomed sign-off', 'L3: execute after approve'], true),
    ],
    zones: [
      { id: 'tower', label: 'Memorial Hospital, live care', hidden: false, cisco: false },
      { id: 'imgz', label: 'Pavilion suites', hidden: false, cisco: false },
      { id: 'plant', label: 'Pavilion building systems', hidden: false, cisco: false },
      { id: 'remote', label: 'Over 67th Street', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true },
    ],
    links: [k('suites', 'bridge'), k('bms', 'bridge', 0.1), k('bridge', 'care'), k('bridge', 'clin', -0.1), k('trades', 'suites', 0.1), k('trades', 'bms'), k('topo', 'suites'), k('topo', 'bms', 0.1), k('topo', 'canvas'), k('canvas', 'wf'), k('wf', 'appr'), k('appr', 'bridge', 0.12)],
    steps: [
      {
        phase: 'today', title: 'Thousands of new devices, one opening date',
        say: s(
          'Every operating suite, bed and building system in a new tower arrives as a device that someone must identify, place and secure before opening day.',
          'Onboarding usually runs through separate network, security, biomedical and facilities teams, each with its own inventory and acceptance checklist.',
          'Switch ports, VLANs, wireless coverage, access policy and building controllers are staged trade by trade from spreadsheets and handover documents.',
        ),
        l: { 'bridge-care': 'ok', 'bridge-clin': 'ok', 'trades-suites': 'ok', 'trades-bms': 'ok' },
        facts: [f('2030', 'expected completion of the Kenneth C. Griffin Pavilion', 'MSK 2025'), f('883,000', "square feet, per the architect's listing as reported in trade press", 'Construction Dive 2026')],
      },
      {
        phase: 'today', title: 'Commissioning beside live care',
        say: s(
          'Building next to an operating hospital means a change made for the new tower can reach the old one.',
          'Core, bridge and plant links carry commissioning traffic and live clinical traffic together, so change windows are scarce and heavily negotiated.',
          'A trunk, routing or policy change made for commissioning can leak into production segments unless every dependency is traced by hand first.',
        ),
        l: { 'suites-bridge': 'warn', 'bms-bridge': 'warn', 'bridge-care': 'unknown', 'bridge-clin': 'unknown' },
        callout: { node: 'bridge', text: 'Commissioning and live clinical traffic share these links.' },
        facts: [f('95.1%', 'bed occupancy rate in 2024, based on adjusted bed count', MSK_PROFILE)],
      },
      {
        phase: 'today', title: 'Readiness assembled from separate reports',
        say: s(
          'Leaders judge whether a floor is technically ready from several status reports that do not share one definition of ready.',
          'Each team reports against its own checklist, so gaps between network, security and clinical engineering surface late, often at activation rehearsals.',
          'Engineers reconcile device lists, port maps and policy exports manually to prove that what was designed is what was installed.',
        ),
        n: { suites: 'unknown' }, l: { 'trades-suites': 'unknown', 'trades-bms': 'unknown' },
        label: { suites: 'Ready? Depends who you ask' },
        clock: { label: 'Time to prove one floor is ready', mode: 'run' },
        facts: [f('208', "single-occupancy inpatient beds in 2026 trade press; MSK's March 2025 page said 206", 'Construction Dive 2026')],
      },
      {
        phase: 'cisco', title: 'One readiness view per floor (hypothesis)',
        say: s(
          'Hypothesis: one shared view could show, floor by floor, which pavilion devices are connected, identified and placed in the right security group.',
          'Hypothesis: network, security and facilities teams would work one investigation per floor instead of reconciling separate inventories before each rehearsal.',
          'Hypothesis: Topology and Inventory would join controller and identity data so a missing or misclassified device shows against the design, not in a spreadsheet.',
        ),
        show: ['cc', 'topo', 'canvas'], n: { suites: 'warn', topo: 'ok', canvas: 'ok' },
        label: { suites: '' },
        l: { 'suites-bridge': 'off', 'bms-bridge': 'off', 'bridge-care': 'ok', 'bridge-clin': 'ok', 'trades-suites': 'off', 'trades-bms': 'off', 'topo-suites': 'warn', 'topo-canvas': 'ok' },
        clock: { label: '', mode: 'hide' },
        callout: { node: 'suites', text: 'Modeled: two devices on this floor sit in the wrong security group.' },
      },
      {
        phase: 'cisco', title: 'A person approves each production move',
        say: s(
          'Hypothesis: no pavilion floor would join the clinical network until a named MSK owner approves that change.',
          'Hypothesis: an agentic workflow would prepare the change, list what it touches in the hospital, and stop.',
          'Hypothesis: the change would execute in the controller that owns it, with approver and result in the audit log.',
        ),
        show: ['wf', 'appr'], n: { wf: 'ok', appr: 'pending' }, l: { 'canvas-wf': 'ok', 'wf-appr': 'pending' },
        modal: {
          title: 'Move one floor to production',
          lines: [
            'Activate network access and segmentation policy for one commissioned pavilion floor.',
            'Approver: MSK pavilion change authority (to confirm)',
            'Trust level: L3, execute after approve',
            'Executes in: Catalyst Center, ISE (hypothesis)',
          ],
          button: 'Approve',
        },
      },
      {
        phase: 'cisco', title: 'Fewer surprises at activation (modeled)',
        say: s(
          'Hypothesis: activation risk would fall because dependencies on the existing hospital are visible before the change, not after it. Modeled, not measured.',
          'Hypothesis: readiness would become a shared, current record that perioperative, biomedical and IT leaders can all read the same way.',
          'Modeled, not measured: rollback steps and evidence would be attached to each change record. Any time saving is a model to test with MSK.',
        ),
        n: { appr: 'ok', suites: 'ok' }, l: { 'wf-appr': 'ok', 'appr-bridge': 'ok', 'suites-bridge': 'ok', 'topo-suites': 'ok' },
        chips: [['Topology, Inventory', 'GA (US)'], ['AI Canvas', 'GA (US)'], ['Agentic Workflows', 'GA (US); run from canvas is beta'], ['Audit log', 'GA (US)']],
      },
    ],
  },
};
