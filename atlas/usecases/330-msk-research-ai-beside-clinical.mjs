// MSK account use case M3: research AI computing beside clinical systems.
// Sources: research/11-account-memorial-sloan-kettering.md and research/data/account-msk.json (use case 3).
// Narrative converted from experience/src/story/accounts.ts. Every Cisco beat is a hypothesis to validate.
// Dell figures are vendor-reported. Whether clinical and research traffic share paths at MSK is not public.
const n = (id, icon, title, sub, hidden = false) => ({ id, icon, title, sub: { exec: sub[0], dir: sub[1], eng: sub[2] }, hidden, r: 30 });
const k = (a, b, bend = 0) => ({ id: `${a}-${b}`, a, b, bend });
const s = (exec, dir, eng) => ({ exec, dir, eng });
const f = (v, l, src) => ({ v, l, s: src });
const MSK_PROFILE = 'MSK Statistical Profile 2024';

export default {
  id: 'msk-research-ai-beside-clinical',
  code: 'M3',
  editions: ['msk'],
  category: 'Account',
  pillars: ['AI', 'Security'],
  short: 'Research AI paths',
  name: 'Research AI computing beside clinical systems',
  setting: 'Image reading, the research GPU cluster, shared data center paths and public cloud',
  situation: 'Pathology slides, scans and genomic data feed both patient care and research AI, on premises and in public cloud, across infrastructure the two may share.',
  personas: ['Chief digital officer', 'Research computing lead', 'Imaging and pathology informatics', 'Information security', 'Research data governance', 'Infrastructure operations'],
  vision: 'Hypothesis to validate: clinical imaging and research AI traffic appear on one map, a named MSK approver signs any change on a path that also carries clinical imaging, and data-movement evidence is queried where it lives. Modeled, not measured.',
  legacy: {
    banner: 'MSK says its AI platform runs on premises and on public cloud, with two generative AI sandboxes approved by Information Security, Privacy and Compliance [NPJ Digital Medicine 2025]. Whether clinical and research traffic share paths at MSK is not public, so the shared-path picture here is a hypothesis to validate [H].',
    strip: 'Today: compute, storage, network and cloud each see part of the path [H]',
    who: 'A research transfer during reading hours (illustrative)',
    silos: [
      ['Fabric telemetry', 'links and ports [H]', '', 'switch'],
      ['Storage console', 'latency in its own pane [H]', '', 'database'],
      ['Job scheduler', 'queues and job logs [H]', '', 'gpu'],
      ['Cloud audit trail', 'provider identifiers [H]', 'p', 'cloud'],
      ['Firewall and flow logs', 'addresses, not datasets [H]', '', 'shield'],
      ['Identity logs', 'who signed in [H]', '', 'key'],
    ],
    gaps: [
      'Logs use different identifiers for one dataset [H]',
      'A fault and a capacity limit look the same [H]',
      'Review evidence is assembled by hand [H]',
      'Capacity decisions rest on partial evidence [H]',
      'Data center network and security vendors are not public',
    ],
    big: ['15+ PB', 'imaging data processed on research computing, vendor-reported [Dell Technologies 2025]'],
    recap: 'Care and research draw on the same images, and tracing one dataset from its source to a GPU node means reading several separate logs.',
  },
  tobe: {
    banner: 'Hypothesis to validate: Topology shows clinical imaging and research traffic on one map, and Federated Search queries fabric, compute, path and security data where it lives. A named MSK approver signs any change on a path that also carries clinical imaging.',
    strip: 'AI Canvas, Topology, Federated Search, AI Defense, Agent Observability',
    who: 'A research transfer during reading hours (illustrative)',
    console: {
      title: 'Cloud Control | shared paths',
      body: 'One investigation across the data center, the cloud path and identity. It shows what competes and where. Data stays in the systems that hold it. Modeled.',
      foot: 'Coverage must be tested against the actual stack',
      rows: [
        ['Tools to check a slow job', '4, one at a time', '1 investigation', 0, 'canvas'],
        ['Clinical and research traffic', 'separate views', 'one map', 0, 'topology'],
        ['Dataset path evidence', 'four sets of logs', 'queried in place', 0, 'database'],
        ['Change on a shared path', 'per team', 'approved by a named person', 1, 'person'],
        ['Record for a review', 'assembled by hand', 'one consistent record', 2, 'doc'],
      ],
    },
    stays: "Research clusters and storage stay with MSK research computing, PACS and pathology systems with their owners, cloud services with the provider, and data-use decisions with MSK's IRB and governance committees.",
    recap: [
      'One map for clinical and research paths, and a named approval before anything changes near care.',
      "Outcomes are modeled, not measured. Coverage must be tested against MSK's actual stack.",
    ],
  },
  hops: {
    legacy: [
      ['Image viewing', 'needs low delay', 'scan'],
      ['Shared paths', 'both worlds cross here', 'rack'],
      ['GPU cluster', 'scheduler logs', 'gpu'],
      ['Public cloud', 'separate audit trail', 'cloud'],
    ],
    tobe: [
      ['Topology', 'both traffic types', 'topology'],
      ['Federated Search', 'data stays in place', 'database'],
      ['AI Canvas', 'one investigation', 'canvas'],
      ['Named approver', 'infrastructure authority', 'person'],
    ],
  },
  pathNote: { legacy: 'Four teams each see part of the path [H]', tobe: 'One map, evidence queried in place (modeled)' },
  outcomes: {
    legacy: [
      ['15+ PB', 'imaging data on research computing, vendor-reported [Dell 2025]', 'S'],
      ['9 PB', 'allocated for pathology slide storage [J Pathol Inform 2023]', 'S'],
      ['790,378', 'radiology procedures in 2024 [MSK Statistical Profile 2024]', 'S'],
    ],
    tobe: [
      ['1 map', 'clinical imaging and research traffic together (modeled)', 'H'],
      ['1 approval', 'by a named MSK approver for a path that carries care', 'H'],
      ['1 record', 'of access and movement for reviews (modeled)', 'H'],
    ],
  },
  kpis: ['Time to tell a fault from a capacity limit', 'Time to assemble review evidence', 'Viewing delay during research transfers', 'Approvals recorded on shared paths'],
  ask: 'Where do clinical imaging, pathology and research AI share paths today, and how do you show reviewers where patient data did and did not travel?',
  tiles: [
    { l: 'Imaging data on research computing, vendor-reported [Dell Technologies 2025]', a: '15+ PB', b: '15+ PB', tag: 'S' },
    { l: 'Monthly computational jobs, vendor-reported [Dell Technologies 2025]', a: '6 million', b: '6 million', tag: 'S' },
    { l: 'Allocated for pathology slide storage [J Pathol Inform 2023]', a: '9 PB', b: '9 PB', tag: 'S' },
    { l: 'Pathology slides scanned [J Pathol Inform 2023]', a: '6.1 million+', b: '6.1 million+', tag: 'S' },
    { l: 'Radiology procedures, 2024 [MSK Statistical Profile 2024]', a: '790,378', b: '790,378', tag: 'S' },
    { l: 'AI models registered in the first governance year [NPJ Digital Medicine 2025]', a: '26', b: '26', tag: 'S' },
    { l: 'Log sets read to trace one dataset', a: '4', b: '1 query', tag: 'H' },
    { l: 'Approval before a change on a shared path', a: 'Per team', b: '1 named approver', tag: 'H' },
  ],
  scene: {
    decor: 'ai', // hosp (x 20 to 520): exam room, CT suite, reading room, GPU rack row, office; vend (532 to 720)
    zoneLabels: { hosp: 'Clinical and research computing', vend: 'Public cloud' },
    labels: { 'CT suite': 'Image reading', 'Reading room': 'Digital pathology', 'Office': 'Review office' },
    hide: ['gantry'],
    pos: {
      view: [90, 290], path: [265, 128], rev: [437, 208], fab: [437, 302], gpu: [265, 292], cloud: [626, 150],
      topo: [92, 418], fed: [212, 418], canvas: [335, 418], appr: [470, 418],
    },
  },
  narr: {
    subtitle: 'Pathology slides, scans and genomic data feed both patient care and research AI, on premises and in public cloud, across infrastructure the two worlds share.',
    caveat: "All 'with Cisco' beats are hypotheses to validate. Dell's figures are vendor-reported. Whether clinical and research traffic share paths at MSK is not public. Outcomes are modeled, not measured.",
    nodes: [
      n('view', 'scan', 'Clinical image viewing', ['Scans read for care', 'Imaging informatics', 'Large studies, low delay']),
      n('path', 'flask', 'Digital pathology slides', ['Feed care and research', 'Pathology informatics', 'Very large slide transfers']),
      n('rev', 'doc', 'Data-use review', ['Asks where data went', 'Security and governance', 'Evidence from four logs']),
      n('fab', 'rack', 'Shared data center paths', ['Both worlds cross here', 'Infrastructure team', 'Fabric and storage network']),
      n('gpu', 'gpu', 'Research GPU cluster', ['Trains research models', 'Research computing', 'Scheduler queues, own logs']),
      n('cloud', 'cloud', 'Public cloud', ['Second home for AI', 'Cloud team', 'Interconnect, audit trails']),
      n('topo', 'topology', 'Topology', ['Both traffic types, one map', 'Data center to cloud', 'Fabric paths and classes'], true),
      n('fed', 'database', 'Federated Search', ['Searches data in place', 'Fabric, compute, path, logs', 'No copy to another store'], true),
      n('canvas', 'canvas', 'AI Canvas', ['One investigation', 'Infra, research, security', 'What competes, and where'], true),
      n('appr', 'person', 'Infrastructure approver', ['A named MSK approver', 'Imaging informatics sign-off', 'L3: execute after approve'], true),
    ],
    zones: [
      { id: 'hosp', label: 'Clinical and research computing', hidden: false, cisco: false },
      { id: 'vend', label: 'Public cloud', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true },
    ],
    links: [k('view', 'fab', 0.1), k('path', 'fab', 0.1), k('fab', 'gpu'), k('fab', 'cloud'), k('rev', 'gpu', 0.1), k('rev', 'cloud', -0.1), k('topo', 'fab'), k('fed', 'cloud'), k('topo', 'canvas', -0.42), k('fed', 'canvas'), k('canvas', 'appr'), k('appr', 'fab', 0.12)],
    steps: [
      {
        phase: 'today', title: 'Two worlds on shared ground',
        say: s(
          'Research computing and clinical systems draw on the same images and data, so a surge in one can slow the other.',
          'Clinical imaging, digital pathology and research transfers often share data center paths, storage networks and cloud links run by different teams.',
          'Large slide and sequencing transfers, GPU training jobs and clinical image viewing compete on shared fabrics unless traffic classes are engineered and watched.',
        ),
        l: { 'view-fab': 'ok', 'path-fab': 'ok', 'fab-gpu': 'ok', 'fab-cloud': 'ok' },
        facts: [f('15+ PB', 'imaging data processed on research computing', 'Dell Technologies 2025, vendor-reported'), f('9 PB', 'allocated for digital pathology slide storage; more than 6.1 million slides scanned', 'J Pathol Inform 2023')],
      },
      {
        phase: 'today', title: 'Proving where sensitive data went',
        say: s(
          'Showing that patient data stayed inside approved environments takes effort across several teams.',
          'Evidence for a research data-use or security review is assembled from firewall, cloud, identity and storage logs held in separate systems.',
          'Flow records, cloud audit trails and job scheduler logs use different identifiers, so tracing one dataset from source to GPU node is manual.',
        ),
        l: { 'rev-gpu': 'unknown', 'rev-cloud': 'unknown' },
        callout: { node: 'rev', text: 'Which path did this dataset take to the GPU node?' },
        facts: [f('6 million', 'monthly computational jobs supported', 'Dell Technologies 2025, vendor-reported')],
      },
      {
        phase: 'today', title: 'Slow jobs, unclear cause',
        say: s(
          'When research jobs or image viewing slow down, it is hard to tell whether to add capacity or fix a fault.',
          'Compute, storage, network and cloud teams each see part of the path, so capacity decisions are made on partial evidence.',
          'Engineers check fabric telemetry, storage latency, scheduler queues and cloud interconnect metrics one tool at a time.',
        ),
        n: { fab: 'unknown' }, l: { 'view-fab': 'warn', 'fab-gpu': 'warn', 'fab-cloud': 'unknown' },
        clock: { label: 'Time to tell a fault from a capacity limit', mode: 'run' },
        facts: [f('790,378', 'diagnostic and interventional radiology procedures in 2024', MSK_PROFILE)],
      },
      {
        phase: 'cisco', title: 'One view of both kinds of path (hypothesis)',
        say: s(
          'Hypothesis: one shared view could show clinical imaging and research AI traffic on the same map, with what is competing and where.',
          'Hypothesis: infrastructure, research computing and security teams would work one investigation that spans data center, cloud path and identity.',
          'Hypothesis: Data Fabric search would query fabric, compute, path and security data where it lives instead of copying it into one more store.',
        ),
        show: ['cc', 'topo', 'fed', 'canvas'], n: { fab: 'warn', topo: 'ok', fed: 'ok', canvas: 'ok' },
        l: { 'rev-gpu': 'off', 'rev-cloud': 'off', 'view-fab': 'warn', 'fab-cloud': 'ok', 'topo-fab': 'warn', 'fed-cloud': 'ok', 'topo-canvas': 'ok', 'fed-canvas': 'ok' },
        clock: { label: '', mode: 'hide' },
        callout: { node: 'fab', text: 'Modeled: a research transfer and image viewing compete on one path.' },
      },
      {
        phase: 'cisco', title: 'A person approves anything near care',
        say: s(
          'Hypothesis: any change on a path that also carries clinical imaging would wait for a named MSK approver.',
          'Hypothesis: the workflow would state which clinical and research services share the path before any change.',
          'Hypothesis: the change would execute in the data center fabric controller that owns it, with an audit record.',
        ),
        show: ['appr'], n: { appr: 'pending' }, l: { 'canvas-appr': 'pending' },
        modal: {
          title: 'Change a shared imaging path',
          lines: [
            'Change traffic priority on a path that carries image viewing and research transfers.',
            'Approver: MSK infrastructure authority (to confirm)',
            'Trust level: L3, execute after approve',
            'Executes in: Nexus fabric controller (hypothesis)',
          ],
          button: 'Approve',
        },
      },
      {
        phase: 'cisco', title: 'Evidence on demand (modeled)',
        say: s(
          'Hypothesis: MSK could answer where a dataset travelled, and whether care was affected, without a multi-team evidence hunt. Modeled, not measured.',
          'Hypothesis: security and data governance reviews would draw on one consistent record of access and movement across environments.',
          "Modeled, not measured: AI workloads and agents would be observed for data exposure alongside telemetry. Coverage must be tested against MSK's actual stack.",
        ),
        n: { appr: 'ok', fab: 'ok' }, l: { 'canvas-appr': 'ok', 'appr-fab': 'ok', 'view-fab': 'ok', 'fab-gpu': 'ok', 'topo-fab': 'ok' },
        chips: [['AI Canvas', 'GA (US)'], ['Topology', 'GA (US)'], ['Federated Search', 'GA'], ['AI Defense, Agent Observability', 'GA']],
      },
    ],
  },
};
