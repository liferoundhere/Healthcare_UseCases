// AI use case AI7: AI cost. One data file: page copy, node placement and the inline narrative.
// Narrative source: experience/src/story/ai.ts. Facts and sources: research/data/ai-use-cases.json. See atlas/AUTHORING.md.
export default {
  id: 'ai-cost',
  code: 'AI7',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'AI',
  pillars: [ 'AI' ],
  short: 'AI cost',
  name: 'Nobody can say what the AI costs',
  setting: 'Finance, IT operations, the AI vendors and the GPU cluster',
  situation: 'Scribes, agents, imaging tools and a GPU cluster each bill differently. Finance sees invoices, IT sees usage, and no one sees both.',
  personas: [ 'Chief financial officer', 'Chief information officer', 'AI program owner', 'IT operations lead', 'Revenue cycle director' ],
  vision: 'Token and GPU use is attributed to applications and owners each month, and the AI program owner approves any cap or model change (modeled).',
  legacy: {
    banner: 'Scribes, agents, imaging tools and a GPU cluster bill per user, per token, per study and per watt. Finance sees invoices and IT sees usage, and no one sees both.',
    strip: 'Today: four billing models and no common usage record [H]',
    who: 'Budget review (sim)',
    silos: [
      [ 'Vendor invoices', 'amount per contract [H]', '', 'doc' ],
      [ 'Scribe admin portal', 'seats, no usage export [H]', 'p', 'mic' ],
      [ 'Agent vendor billing', 'tokens, monthly [H]', 'p', 'chat' ],
      [ 'Imaging AI portal', 'studies processed [H]', 'p', 'ct' ],
      [ 'GPU cluster tool', 'utilization per node [H]', '', 'gpu' ],
      [ 'Budget spreadsheet', 'set per contract [H]', '', 'board' ]
    ],
    gaps: [
      'Usage, cost and outcome data sit in different systems [H]',
      'Each tool calls models through its own gateway, so there is no common usage record [H]',
      'Retries and agent loops raise cost with no forecast [H]',
      'Per-seat tools often expose no usage data [H]',
      'No health-system figure for token or inference spend was found'
    ],
    big: [ '18%', 'of AI-scaling health systems and plans report mature financial attribution, 64 CFOs surveyed [Deloitte Healthcare CFO Survey 2026]' ],
    recap: 'Finance sees invoices, IT sees usage, and the next budget is argued on anecdotes.'
  },
  tobe: {
    banner: 'In AI Canvas, Agent Observability would report token use per agent, Intersight would report GPU utilization, and Machine Data Lake would keep the usage history. A cap or a lower-cost model waits for the AI program owner.',
    strip: 'AI Canvas, Agent Observability, Tokenomics, Machine Data Lake',
    console: {
      title: 'Cloud Control | usage and cost drivers',
      body: 'Token use by application and agent sits beside GPU utilization per node, with raw records kept for later attribution. Limits are applied in the agent platform or model gateway after approval.',
      foot: 'Shows usage, not value',
      rows: [
        [ 'Usage by application', 'not available', 'per agent and per app', 0, 'database' ],
        [ 'GPU utilization', 'cluster tool only', 'beside token use', 0, 'gpu' ],
        [ 'Usage history', 'vendor portals', 'kept in one store', 0, 'rack' ],
        [ 'Cap or model change', 'vendor setting', 'approved by a person', 1, 'person' ],
        [ 'Whether the AI is worth it', 'finance, clinical leaders', 'finance, clinical leaders', 2, 'lock' ]
      ]
    },
    stays: 'Contracts, pricing, the decision to keep or retire a tool and the measure of clinical value stay with finance, clinical leaders and each vendor.',
    recap: [
      'One view shows which applications and agents consume tokens and GPU time.',
      'Outcomes are modeled and depend on vendors exposing usage data. Value stays a clinical and financial judgment.'
    ]
  },
  hops: {
    legacy: [
      [ 'AI tool', 'its own model gateway', 'chat' ],
      [ 'Vendor invoice', 'per seat, token or study', 'doc' ],
      [ 'Finance', 'invoices, no usage', 'board' ],
      [ 'IT operations', 'usage, no cost', 'person' ]
    ],
    tobe: [
      [ 'Agent Observability', 'tokens per agent', 'database' ],
      [ 'Intersight', 'GPU use per node', 'server' ],
      [ 'Machine Data Lake', 'usage history', 'rack' ],
      [ 'Approval', 'AI program owner', 'person' ]
    ]
  },
  pathNote: { legacy: 'Four billing models, two partial views [H]', tobe: 'Usage by application beside capacity' },
  outcomes: {
    legacy: [
      [ '18%', 'report mature financial attribution, 64 CFOs [Deloitte Healthcare CFO Survey 2026]', 'S' ],
      [ '55%', 'cannot control AI costs, cross-industry [Splunk 2026, vendor-reported]', 'S' ],
      [ '4%', 'report scaled AI with measurable outcomes [Qventus CIO report 2026, vendor-reported]', 'S' ]
    ],
    tobe: [
      [ 'Attributed', 'token and GPU use by application each month (modeled)', 'H' ],
      [ '1 view', 'usage beside the infrastructure it runs on (modeled)', 'H' ],
      [ '1 approval', 'before a cap or model change (modeled)', 'H' ]
    ]
  },
  kpis: [ 'Token use per application per month', 'GPU utilization per node', 'Share of AI tools that expose usage data' ],
  ask: 'If your AI bill doubled next quarter, could you say which application, which agent and which department drove it?',
  tiles: [
    { l: 'Health systems and plans with mature financial attribution [Deloitte Healthcare CFO Survey 2026]', a: '18%', b: '18%', tag: 'S' },
    { l: 'Organizations that cannot control AI costs [Splunk State of Observability 2026, vendor-reported]', a: '55%', b: '55%', tag: 'S' },
    { l: 'IT leaders spending 11% to 25% of IT bandwidth on vendors and integrations [Qventus CIO report 2026, vendor-reported]', a: '51%', b: '51%', tag: 'S' },
    { l: "Tokens for one two-week file analysis task at one health system [DistilINFO, citing Becker's, 2026]", a: '$75', b: '$75', tag: 'S' },
    { l: 'Spend by application', a: 'Not available', b: 'Attributed monthly', tag: 'H' },
    { l: 'Usage cap', a: 'Vendor setting', b: 'Approved by a person', tag: 'H' }
  ],
  scene: {
    decor: 'ai',
    zoneLabels: { hosp: 'Hospital', vend: 'AI vendors' },
    pos: {
      scribe: [ 88, 134 ],
      img: [ 88, 290 ],
      fin: [ 266, 134 ],
      gpu: [ 266, 290 ],
      it: [ 437, 215 ],
      rcm: [ 600, 140 ],
      lake: [ 110, 418 ],
      canvas: [ 280, 418 ],
      obs: [ 450, 418 ],
      appr: [ 620, 418 ]
    }
  },
  narr: {
    subtitle: 'Scribes, agents, imaging tools and a GPU cluster each bill differently: per user, per token, per study, per watt. Finance sees invoices; IT sees usage; no one sees both.',
    caveat: 'No health-system figure for token or inference spend was found; cost-control statistics are cross-industry and vendor-reported. Cisco tooling would show usage, not value, and the outcome is modeled.',
    nodes: [
      { id: 'fin', icon: 'doc', title: 'Finance and invoices', sub: { exec: 'Sees the invoices', dir: 'Budget per contract', eng: 'No usage data' }, hidden: false, r: 30 },
      { id: 'it', icon: 'person', title: 'IT operations', sub: { exec: 'Sees the usage', dir: 'Vendors and integrations', eng: 'No cost data' }, hidden: false, r: 30 },
      {
        id: 'scribe',
        icon: 'mic',
        title: 'Ambient scribe',
        sub: { exec: 'Billed per user', dir: 'Clinical departments', eng: 'Per-seat, no usage export' },
        hidden: false,
        r: 30
      },
      {
        id: 'rcm',
        icon: 'chat',
        title: 'Revenue-cycle agent',
        sub: { exec: 'Billed per token', dir: 'Revenue cycle', eng: 'Retries and agent loops' },
        hidden: false,
        r: 30
      },
      { id: 'img', icon: 'ct', title: 'Imaging AI tools', sub: { exec: 'Billed per study', dir: 'Radiology', eng: 'Their own model gateway' }, hidden: false, r: 30 },
      { id: 'gpu', icon: 'gpu', title: 'GPU cluster', sub: { exec: 'Billed per watt', dir: 'Infrastructure team', eng: 'Utilization per node' }, hidden: false, r: 30 },
      {
        id: 'canvas',
        icon: 'canvas',
        title: 'AI Canvas',
        sub: { exec: 'One view of usage', dir: 'Applications, agents, infrastructure', eng: 'Usage beside capacity' },
        hidden: true,
        r: 30
      },
      {
        id: 'obs',
        icon: 'database',
        title: 'Agent Observability',
        sub: { exec: 'Cost per agent', dir: 'Token use by application', eng: 'Token and model metadata' },
        hidden: true,
        r: 30
      },
      {
        id: 'lake',
        icon: 'rack',
        title: 'Machine Data Lake',
        sub: { exec: 'Keeps the usage history', dir: 'For later attribution', eng: 'Raw records retained' },
        hidden: true,
        r: 30
      },
      {
        id: 'appr',
        icon: 'person',
        title: 'AI program owner',
        sub: { exec: 'Accepts the trade-off', dir: 'With a finance partner', eng: 'L3: execute after approve' },
        hidden: true,
        r: 30
      }
    ],
    zones: [
      { id: 'hosp', label: 'Hospital', hidden: false, cisco: false },
      { id: 'vend', label: 'AI vendors', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true }
    ],
    links: [
      { id: 'scribe-fin', a: 'scribe', b: 'fin', bend: -0.12 },
      { id: 'rcm-fin', a: 'rcm', b: 'fin', bend: 0 },
      { id: 'img-fin', a: 'img', b: 'fin', bend: 0.12 },
      { id: 'gpu-it', a: 'gpu', b: 'it', bend: 0 },
      { id: 'fin-it', a: 'fin', b: 'it', bend: 0 },
      { id: 'obs-rcm', a: 'obs', b: 'rcm', bend: 0 },
      { id: 'canvas-gpu', a: 'canvas', b: 'gpu', bend: 0.1 },
      { id: 'canvas-obs', a: 'canvas', b: 'obs', bend: 0 },
      { id: 'canvas-lake', a: 'canvas', b: 'lake', bend: 0 },
      { id: 'canvas-appr', a: 'canvas', b: 'appr', bend: 0.1 },
      { id: 'appr-rcm', a: 'appr', b: 'rcm', bend: 0.1 }
    ],
    steps: [
      {
        phase: 'today',
        title: 'AI spend moves from seats to tokens',
        say: {
          exec: 'AI is increasingly billed by consumption, so cost rises with every agent step and no longer tracks headcount or licenses.',
          dir: 'Budgets are set per contract, while usage is driven by workflows nobody forecasts.',
          eng: 'Token counts, model choice, retries and agent loops drive cost; without per-request telemetry tagged to an application, spend cannot be attributed.'
        },
        l: { 'scribe-fin': 'ok', 'rcm-fin': 'ok', 'img-fin': 'ok', 'gpu-it': 'ok' },
        facts: [
          { v: '$75', l: 'In tokens for one task at one health system: about two weeks of file analysis done in a day', s: "DistilINFO, citing Becker's, 2026" },
          { v: '55%', l: 'Organizations that cannot accurately control AI costs (cross-industry)', s: 'Splunk State of Observability 2026, vendor-reported' }
        ]
      },
      {
        phase: 'today',
        title: 'Tools multiply faster than oversight',
        say: {
          exec: 'Each department adds AI tools, and IT spends a growing share of its time on vendors and integrations instead of outcomes.',
          dir: 'In a 2026 vendor-run survey, 51% of health-system IT leaders spent 11% to 25% of IT bandwidth on vendor management, integrations and implementations.',
          eng: 'Overlapping tools call different models through different gateways, so there is no common usage record.'
        },
        n: { it: 'warn', scribe: 'unknown', img: 'unknown' },
        l: { 'gpu-it': 'warn', 'scribe-fin': 'unknown', 'img-fin': 'unknown' },
        callout: { node: 'it', text: 'Every tool has its own gateway. There is no common usage record.' },
        facts: [
          {
            v: '51%',
            l: 'Health-system IT leaders who spend 11% to 25% of IT bandwidth on vendor management, integrations and implementations',
            s: 'Qventus CIO report 2026, vendor-reported'
          }
        ]
      },
      {
        phase: 'today',
        title: 'Value is asserted, not measured',
        say: {
          exec: 'Leaders approve more AI spend while few can tie it to measured results, so the next budget cycle is argued on anecdotes.',
          dir: 'Only 18% of AI-scaling organizations in a 2026 healthcare CFO survey reported mature financial attribution.',
          eng: 'Before-and-after comparisons stand in for attribution because usage, cost and outcome data sit in different systems.'
        },
        n: { fin: 'warn', rcm: 'warn' },
        l: { 'fin-it': 'down', 'rcm-fin': 'warn' },
        label: { fin: 'Invoices, no usage', it: 'Usage, no cost' },
        facts: [
          { v: '18%', l: 'AI-scaling health systems and plans that report mature financial attribution (n=64 CFOs)', s: 'Deloitte Healthcare CFO Survey 2026' },
          { v: '4%', l: 'Health-system IT leaders (60+ surveyed) who report scaled AI with measurable outcomes', s: 'Qventus CIO report 2026, vendor-reported' }
        ]
      },
      {
        phase: 'cisco',
        title: 'One view of usage, capacity and cost drivers',
        say: {
          exec: 'Same invoices. This time one view shows which applications and agents consume tokens and GPU time, alongside the infrastructure they run on.',
          dir: 'In AI Canvas, Agent Observability would report token use and cost per agent, Intersight would report GPU utilization, and Splunk with Machine Data Lake would keep the usage history.',
          eng: 'Agent traces carry token and model metadata; Intersight exposes GPU utilization per node; Machine Data Lake retains the raw records for later attribution.'
        },
        show: [ 'cc', 'canvas', 'obs', 'lake' ],
        n: { fin: 'ok', it: 'ok', rcm: 'warn', img: 'ok', scribe: 'unknown', gpu: 'ok', canvas: 'ok', obs: 'ok', lake: 'ok' },
        l: {
          'fin-it': 'idle',
          'rcm-fin': 'warn',
          'gpu-it': 'ok',
          'img-fin': 'idle',
          'scribe-fin': 'idle',
          'obs-rcm': 'warn',
          'canvas-gpu': 'ok',
          'canvas-obs': 'ok',
          'canvas-lake': 'ok'
        },
        label: { fin: '', it: '', scribe: 'Per-seat: no usage exposed' },
        callout: { node: 'obs', text: "The revenue-cycle agent's token use is rising. Its summarization step is the driver." }
      },
      {
        phase: 'cisco',
        title: 'The AI program owner approves limits',
        say: {
          exec: "A cap on an agent's usage, or a move to a cheaper model, is approved by the AI program owner, with clinical sign-off where care is touched.",
          dir: 'The Actions queue would hold the change and the Audit log would record who accepted the trade-off.',
          eng: 'The limit is applied in the agent platform or model gateway; Cisco tooling records the request, the approval and the usage afterwards.'
        },
        show: [ 'appr' ],
        n: { appr: 'pending' },
        l: { 'canvas-appr': 'pending' },
        modal: {
          title: "Cap an agent's daily token budget",
          lines: [
            'Set a daily token limit on the revenue-cycle agent and use a lower-cost model.',
            'Approver: AI program owner with a finance partner',
            'Executes in: the agent platform or gateway'
          ],
          button: 'Approve'
        }
      },
      {
        phase: 'cisco',
        title: 'Modeled: spend attributed by application',
        say: {
          exec: 'Modeled outcome: spend is attributed to applications and owners each month. Whether the AI is worth it is still a clinical and financial judgment.',
          dir: 'The model assumes vendors expose usage data; per-seat SaaS tools often expose none.',
          eng: 'This outcome is modeled, not measured. Vendor invoices and contract terms are not in machine telemetry and must be joined from finance systems.'
        },
        n: { appr: 'ok', rcm: 'ok' },
        l: { 'canvas-appr': 'ok', 'appr-rcm': 'ok', 'obs-rcm': 'ok', 'rcm-fin': 'ok' },
        chips: [ [ 'AI Canvas', 'GA (US)' ], [ 'Agent Observability, Tokenomics', 'GA' ], [ 'Machine Data Lake', 'GA' ], [ 'Cisco Intersight', 'GA (US)' ] ]
      }
    ]
  }
};
