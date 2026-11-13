// Account use case N2 (NYULH edition only): keeping production AI models dependable.
// Sources: research/10-account-nyu-langone.md (section G2) and research/data/account-nyu-langone.json.
// Narrative converted from experience/src/story/accounts.ts. Floor plan: "nyulh_ai" in src/engine/46-decor-nyulh.js. See atlas/AUTHORING.md.
const Q3 = 'NYU Langone Q3 report 2026';
const n = (id, icon, title, sub, hidden = false) => ({ id, icon, title, sub: { exec: sub[0], dir: sub[1], eng: sub[2] }, hidden, r: 30 });
const k = (a, b, bend = 0) => ({ id: `${a}-${b}`, a, b, bend });
const s = (exec, dir, eng) => ({ exec, dir, eng });
const f = (v, l, src) => ({ v, l, s: src });

export default {
  id: 'nyu-ai-in-production',
  code: 'N2',
  editions: ['nyulh'],
  category: 'Account',
  pillars: ['AI', 'Security'],
  short: 'AI in production',
  name: 'Keeping 128 production AI models dependable',
  setting: 'An emergency department ambient note, the wireless and cloud path behind it, and the local GPU cluster',
  situation: 'More than 128 AI models sit in clinical workflow, so a slow AI tool is a care-delivery problem.',
  personas: ['Chief health informatics officer', 'CIO', 'AI governance lead', 'Network and cloud operations lead', 'Emergency department physician lead'],
  vision: 'Hypothesis to validate: one investigation shows the device, network, cloud path and AI service behind a slow clinical AI tool, and the informatics owner approves any change. Modeled, not measured.',
  legacy: {
    banner: 'NYU Langone reports more than 128 AI models in production and 150 in development [Q3 report 2026]. When an ambient note is slow, wireless, cloud, vendor and informatics teams typically each check their own tool [H].',
    strip: 'Today: one slow note, four teams, separate tools and time bases [H]',
    who: 'Evening shift in the emergency department (sim)',
    silos: [
      ['Wireless console', 'roaming events [H]', '', 'wifi'],
      ['Cloud console', 'API errors [H]', '', 'cloud'],
      ['AI vendor status page', 'outside party [H]', 'p', 'globe'],
      ['EHR integration logs', 'FHIR calls [H]', '', 'server'],
      ['GPU monitoring', 'research computing [H]', '', 'gpu'],
      ['Model inventory', 'rebuilt per review [H]', '', 'doc'],
    ],
    gaps: [
      'No service map links a model to its GPU, path, cloud endpoint and EHR integration [H]',
      'Latency, GPU use, API errors and FHIR failures have different time bases [H]',
      'Triage moves between four teams before the faulty layer is named [H]',
      'Governance evidence is collected again for each AI product review [H]',
    ],
    big: ['128+', 'AI models in production, with 150 more in development [Q3 report 2026]'],
    recap: 'More than 128 models are in production, and a slow ambient note has four possible owners.',
  },
  tobe: {
    banner: 'Hypothesis to validate: ThousandEyes path tests and Splunk telemetry meet on one AI Canvas timeline, and the informatics owner of the tool approves any change. Modeled; no source names Cisco in this AI stack.',
    strip: 'AI Canvas, ThousandEyes, Splunk, Agent Observability, audit log',
    who: 'Evening shift in the emergency department (sim)',
    console: {
      title: 'Cloud Control | clinical AI path',
      body: 'One investigation for the device, the wireless network, the cloud path and the AI service. Integration with the EHR and with each AI vendor platform is discovery work.',
      foot: 'Modeled. Model oversight stays with NYU Langone.',
      rows: [
        ['Tools opened for one slow note', 'several [H]', '1 investigation', 3, 'canvas'],
        ['Path to AI vendor endpoints', 'vendor status page [H]', 'tested continuously', 3, 'eye'],
        ['Inference and GPU telemetry', 'separate time bases [H]', 'one time base', 3, 'database'],
        ['Change to a clinical AI tool', 'per team process [H]', 'two named approvers', 4, 'people'],
        ['Evidence for a governance review', 'rebuilt each time [H]', 'drawn from one place', 5, 'doc'],
      ],
    },
    stays: 'Model development, validation, bias assessment, clinical oversight, the AI governance framework, the EHR and each AI vendor platform stay with NYU Langone and those vendors.',
    recap: [
      'Hypothesis to validate: one investigation across device, network, cloud path and AI service. Informatics approves any change.',
      'Modeled, not measured: the faulty layer is named sooner. No time saving is claimed.',
    ],
  },
  hops: {
    legacy: [['Ambient note', 'slow for the physician', 'mic'], ['ED wireless', 'its own console', 'wifi'], ['Cloud AI service', 'vendor status page', 'cloud'], ['EHR integration', 'its own logs', 'server']],
    tobe: [['ThousandEyes', 'path to AI vendors', 'eye'], ['Splunk', 'inference and GPU logs', 'database'], ['AI Canvas', 'one timeline', 'canvas'], ['Approval', 'informatics and network', 'people']],
  },
  pathNote: { legacy: 'Four teams investigate in parallel [H]', tobe: 'One timeline, two approvers (modeled)' },
  outcomes: {
    legacy: [
      ['128+', 'AI models in production, 150 in development [Q3 report 2026]', 'S'],
      ['1,500+', 'providers using ambient AI documentation [Q3 report 2026]', 'S'],
      ['4 teams', 'between a slow note and a named layer', 'H'],
    ],
    tobe: [
      ['1 timeline', 'for device, network, cloud path and model (modeled)', 'H'],
      ['2 approvers', 'informatics and network (modeled)', 'H'],
      ['1 place', 'for model inventory and access evidence (modeled)', 'I'],
    ],
  },
  kpis: ['Time to name the faulty layer for a slow AI tool', 'Tools opened per investigation', 'Hours to assemble evidence for one AI product review'],
  ask: 'When an ambient note or an AI answer inside the record is slow for an emergency physician, who owns finding the faulty layer today, and how many tools do they open?',
  tiles: [
    { l: 'AI models in production [Q3 report 2026]', a: '128+', b: '128+', tag: 'S' },
    { l: 'AI models in development [Q3 report 2026]', a: '150', b: '150', tag: 'S' },
    { l: 'Providers using ambient AI documentation [Q3 report 2026]', a: '1,500+', b: '1,500+', tag: 'S' },
    { l: 'Outpatient visits a year reached by evidence search [NYU Langone news 2026]', a: '12.4M', b: '12.4M', tag: 'S' },
    { l: 'Views for one slow note', a: 'Several', b: '1 timeline', tag: 'H' },
    { l: 'Governance evidence', a: 'Rebuilt', b: 'One place', tag: 'I' },
  ],
  scene: {
    decor: 'nyulh_ai',
    pos: {
      note: [145, 138], wifi: [145, 237], gpu: [338, 150], ehr: [443, 150], inv: [390, 278],
      cloud: [615, 170],
      te: [110, 418], splunk: [280, 418], canvas: [450, 418], appr: [620, 418],
    },
  },
  narr: {
    subtitle: 'Ambient notes, evidence search inside the record and prediction models now sit in clinical workflow, so a slow or misbehaving AI tool is a care-delivery problem.',
    caveat: "Vendors named publicly in NYU Langone's AI work are Epic, Microsoft Azure OpenAI, Abridge and OpenEvidence; no public source names Cisco in that stack. Every with-Cisco beat is a hypothesis to validate and every outcome here is modeled. The floor plan layout is illustrative and based on public descriptions of NYU Langone sites; rooms and equipment are not shown at real locations.",
    nodes: [
      n('note', 'mic', 'ED ambient note', ['Physician waits for it', 'Emergency department', 'Client on clinical Wi-Fi']),
      n('wifi', 'wifi', 'ED wireless', ['Carries every AI request', 'Wireless team', 'Roaming events, own console']),
      n('cloud', 'cloud', 'Cloud AI services', ['Models hosted outside', 'Cloud team and vendors', 'API errors, status pages']),
      n('ehr', 'server', 'EHR integration', ['Where AI answers land', 'Informatics team', 'FHIR calls, own logs']),
      n('gpu', 'gpu', 'Local GPU cluster', ['Runs home-grown models', 'Research computing', 'Utilization in another tool']),
      n('inv', 'doc', 'Model inventory', ['What runs where', 'Reviewed per AI product', 'Rebuilt from many consoles']),
      n('te', 'eye', 'ThousandEyes', ['Path to AI vendors', 'Internet and cloud path', 'Tests to vendor endpoints'], true),
      n('splunk', 'database', 'Splunk telemetry', ['Inference and GPU logs', 'One time base', 'Indexed inference logs'], true),
      n('canvas', 'canvas', 'AI Canvas', ['One investigation', 'Every team, one timeline', 'Device, net, cloud, model'], true),
      n('appr', 'people', 'Two named approvers', ['Informatics and network', 'Tool owner, change owner', 'L3: execute after approve'], true),
    ],
    zones: [
      { id: 'ed', label: 'Emergency department', hidden: false, cisco: false },
      { id: 'dc', label: 'Data center', hidden: false, cisco: false },
      { id: 'cloud', label: 'Cloud', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true },
    ],
    links: [k('note', 'wifi'), k('wifi', 'cloud'), k('cloud', 'ehr', 0.1), k('gpu', 'ehr'), k('inv', 'gpu', 0.1), k('inv', 'cloud', -0.1), k('te', 'cloud'), k('splunk', 'gpu'), k('te', 'canvas'), k('splunk', 'canvas', 0.1), k('canvas', 'wifi'), k('canvas', 'appr'), k('appr', 'wifi', 0.12)],
    steps: [
      {
        phase: 'today', title: 'AI runs across many platforms',
        say: s(
          'Models run on local GPUs, a research supercomputer, cloud AI services and vendor platforms, each with its own monitoring and owner.',
          'No single service map links a model to the GPU, network path, cloud endpoint and EHR integration it depends on.',
          'Inference latency, GPU utilization, API errors and FHIR call failures live in separate tools with different retention and time bases.',
        ),
        n: { note: 'ok', wifi: 'ok', cloud: 'ok', ehr: 'ok', gpu: 'ok', inv: 'ok' },
        l: { 'note-wifi': 'ok', 'wifi-cloud': 'ok', 'cloud-ehr': 'ok', 'gpu-ehr': 'ok' },
        facts: [f('128+', 'AI models in production, with 150 more in development', Q3), f('1,500+', 'inpatient and emergency department providers using ambient AI documentation', Q3)],
      },
      {
        phase: 'today', title: 'A slow note has many suspects',
        say: s(
          'When an ambient note or an AI answer is slow, clinicians see only a delay and several teams investigate in parallel.',
          'Triage moves between the wireless team, the cloud team, the vendor and the informatics team before the faulty layer is named.',
          'Engineers compare client roaming events, internet path loss, vendor status pages and application logs by hand.',
        ),
        n: { note: 'warn' }, l: { 'note-wifi': 'warn', 'wifi-cloud': 'unknown', 'cloud-ehr': 'unknown' },
        clock: { label: 'Time to name the faulty layer', mode: 'run' },
        callout: { node: 'note', text: 'The note is slow. Wi-Fi, cloud path or model?' },
        facts: [f('12.4M', 'outpatient visits a year, the stated reach of evidence search in the record', 'NYU Langone news 2026')],
      },
      {
        phase: 'today', title: 'Governance evidence is gathered by hand',
        say: s(
          'Each new AI product needs a security and architecture review, and the evidence is collected again for every review.',
          'Role-based access, logging and data-flow evidence for AI tools is compiled from several systems for the governance board.',
          'Prompt logging, egress destinations and the model inventory are reconciled manually across proxies, cloud consoles and application logs.',
        ),
        l: { 'inv-gpu': 'unknown', 'inv-cloud': 'unknown' },
        label: { inv: 'Rebuilt for each review' },
      },
      {
        phase: 'cisco', title: 'One investigation across the AI path (hypothesis)',
        say: s(
          'Hypothesis to validate: one shared investigation shows the device, network, cloud path and AI service behind a slow clinical AI tool.',
          'Hypothesis to validate: AI Canvas would bring ThousandEyes path tests, Splunk application and GPU telemetry and data center network state into one timeline.',
          'Hypothesis to validate: Nexus and Intersight telemetry, ThousandEyes tests to AI vendor endpoints and Splunk-indexed inference logs would be correlated on one time base.',
        ),
        show: ['cc', 'te', 'splunk', 'canvas'], n: { wifi: 'warn', te: 'ok', splunk: 'ok', canvas: 'ok' },
        label: { inv: '' },
        l: { 'wifi-cloud': 'ok', 'cloud-ehr': 'ok', 'inv-gpu': 'off', 'inv-cloud': 'off', 'te-cloud': 'ok', 'splunk-gpu': 'ok', 'te-canvas': 'ok', 'splunk-canvas': 'ok', 'canvas-wifi': 'warn' },
        clock: { label: '', mode: 'hide' },
        callout: { node: 'note', text: 'Modeled: cloud path and model are healthy. The delay is on ED wireless.' },
      },
      {
        phase: 'cisco', title: 'Informatics approves any change',
        say: s(
          'Anything that would reroute, throttle or restrict a clinical AI tool waits, with evidence, for a named approver.',
          'The informatics owner of the tool and the infrastructure change owner approve together. The decision goes to the audit log.',
          'The traffic priority, path or AI Defense policy change is shown as a diff. The owning controller applies it after approval.',
        ),
        show: ['appr'], n: { appr: 'pending' }, l: { 'canvas-appr': 'pending' },
        modal: {
          title: 'Prioritize ambient AI traffic in the ED',
          lines: [
            'Prioritize the ambient documentation service on ED access points for one shift.',
            'Approvers: informatics owner, network change owner',
            'Trust level: L3, execute after approve',
            'Executes in: wireless controller in place (vendor to confirm)',
          ],
          button: 'Approve',
        },
      },
      {
        phase: 'cisco', title: 'Faster to name the faulty layer (modeled)',
        say: s(
          'Modeled, not measured: the team learns whether the device, network, cloud or model is at fault in minutes rather than across several handoffs.',
          'Modeled outcome: governance reviews draw model inventory and access evidence from one place instead of rebuilding it for each product.',
          'Modeled outcome: inference, network and security events share one searchable store, so a regression is traced without exporting logs between tools.',
        ),
        n: { appr: 'ok', wifi: 'ok', note: 'ok' }, l: { 'canvas-appr': 'ok', 'appr-wifi': 'ok', 'note-wifi': 'ok', 'canvas-wifi': 'ok' },
        chips: [['AI Canvas', 'GA (US)'], ['ThousandEyes', 'GA (US)'], ['Splunk', 'GA (US)'], ['Agent Observability', 'GA']],
      },
    ],
  },
};
