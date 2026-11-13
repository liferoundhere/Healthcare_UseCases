// AI use case AI3: Private clinical AI. One data file: page copy, node placement and the inline narrative.
// Narrative source: experience/src/story/ai.ts. Facts and sources: research/data/ai-use-cases.json. See atlas/AUTHORING.md.
export default {
  id: 'ai-factory',
  code: 'AI3',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'AI',
  pillars: [ 'AI', 'Facilities' ],
  short: 'Private clinical AI',
  name: 'The hospital buys its own GPUs',
  setting: 'A GPU cluster, its fabric and storage, power and cooling, and the clinical apps that depend on it',
  situation: 'A GPU cluster for language and imaging models goes into a data center built for far lighter racks.',
  personas: [ 'Chief information officer', 'Research computing director', 'Infrastructure lead', 'Facilities engineer', 'Clinical AI owner' ],
  vision: 'When a clinical AI tool slows down, one investigation shows GPU load, fabric health and storage next to the app, and the infrastructure lead and the clinical AI owner approve any node drain (modeled).',
  legacy: {
    banner: 'A cluster bought for research now serves models that clinicians use daily. When a tool is slow, the application, model and cluster teams each point at another layer.',
    strip: 'Today: compute, fabric, storage and serving sit in separate tools [H]',
    who: 'Weekday clinic hours (sim)',
    silos: [
      [ 'Compute manager', 'node and firmware state [H]', '', 'server' ],
      [ 'Fabric controller', 'links up or down [H]', '', 'switch' ],
      [ 'Storage tool', 'capacity and latency [H]', '', 'database' ],
      [ 'Serving stack logs', 'data science, no on-call [H]', '', 'gpu' ],
      [ 'Facilities BMS', 'power and cooling [H]', '', 'gear' ],
      [ 'Capacity spreadsheet', 'GPU requests in a queue [H]', '', 'doc' ]
    ],
    gaps: [
      'No team runs an on-call rota for model serving [H]',
      'Fabric congestion shows up as slow tokens, not as a link-down alarm [H]',
      'GPU, power and cooling capacity are planned in spreadsheets [H]',
      'The cluster team has no view of the application [H]',
      'No statistic on how many hospitals run their own GPU clusters was found'
    ],
    big: [ '120-132 kW', 'per rack for a current GPU design, against an industry average near 9 kW [NVIDIA; Uptime Institute 2025]' ],
    recap: 'A slow model looks like a broken app, and nobody can name the layer quickly.'
  },
  tobe: {
    banner: 'AI Canvas would bring Intersight compute and GPU telemetry, Nexus fabric data and Splunk application logs into one investigation. Draining a node that serves clinical models waits for two named approvers.',
    strip: 'AI Canvas, Intersight, Nexus Dashboard, Splunk',
    console: {
      title: 'Cloud Control | GPU to clinical app',
      body: 'Node, GPU and firmware state from Intersight, fabric congestion from Nexus and inference latency from Splunk in one view. Maintenance runs in Intersight after approval.',
      foot: 'Assumes Cisco compute and fabric',
      rows: [
        [ 'Tools to open for a slow model', '4 or more', '1 investigation', 0, 'canvas' ],
        [ 'GPU and firmware state', 'compute tool only', 'next to app latency', 0, 'gpu' ],
        [ 'Fabric congestion', 'no alarm', 'visible in fabric telemetry', 0, 'rack' ],
        [ 'Node drain', 'ad hoc', 'approved by two people', 1, 'people' ],
        [ 'Power and cooling build-out', 'facilities', 'facilities', 2, 'gear' ]
      ]
    },
    stays: 'Power and cooling build-out, the choice of models, clinical validation and the staffing of the platform team stay with the hospital and its facilities partners.',
    recap: [
      'One investigation names the layer: app, model serving, GPU node, fabric or storage.',
      'Outcomes are modeled and assume Cisco compute and fabric. Power, cooling and model quality stay with the hospital.'
    ]
  },
  hops: {
    legacy: [
      [ 'Clinical AI app', 'slow or timing out', 'monitor' ],
      [ 'Serving stack', 'no on-call rota', 'server' ],
      [ 'GPU cluster', 'separate tool', 'gpu' ],
      [ 'Fabric and storage', 'no link-down alarm', 'switch' ]
    ],
    tobe: [
      [ 'Intersight', 'node and GPU state', 'server' ],
      [ 'Nexus Dashboard', 'fabric congestion', 'rack' ],
      [ 'AI Canvas', 'one investigation', 'canvas' ],
      [ 'Approval', 'infrastructure and clinical', 'people' ]
    ]
  },
  pathNote: { legacy: 'Three teams, each blames another layer [H]', tobe: 'GPU, fabric, storage and app in one view' },
  outcomes: {
    legacy: [
      [ '120-132 kW', 'per current GPU rack, average near 9 kW [NVIDIA; Uptime Institute 2025]', 'S' ],
      [ '26%', 'report robust GPU capacity [Cisco AI Readiness Index 2025, vendor-reported]', 'S' ],
      [ '322', 'users of an on-premises language model, one hospital [JMIR AI 2026]', 'S' ]
    ],
    tobe: [
      [ '1 investigation', 'from GPU node to clinical app (modeled)', 'H' ],
      [ 'Earlier', 'saturation seen before clinicians feel it (modeled)', 'H' ],
      [ '2 approvers', 'before a clinical workload moves (modeled)', 'H' ]
    ]
  },
  kpis: [ 'Time to name the layer behind a slow model', 'GPU utilization per node', 'Inference latency per clinical app' ],
  ask: 'Who is on call at 2 a.m. for the GPU cluster your clinicians now depend on, and what would they look at first?',
  tiles: [
    { l: 'Power per current GPU rack [NVIDIA; Uptime Institute 2025]', a: '120-132 kW', b: '120-132 kW', tag: 'S' },
    { l: 'Organizations with robust GPU capacity [Cisco AI Readiness Index 2025, vendor-reported]', a: '26%', b: '26%', tag: 'S' },
    { l: 'Users saving 30 minutes a week or more, 91 surveyed [JMIR AI 2026]', a: '44%', b: '44%', tag: 'S' },
    { l: 'Tools per slow-model incident', a: '4 or more', b: '1 investigation', tag: 'H' },
    { l: 'On call for model serving', a: 'Nobody', b: 'A hospital decision', tag: 'H' },
    { l: 'Node drain', a: 'Ad hoc', b: 'Approved by two people', tag: 'H' }
  ],
  scene: {
    decor: 'ehr',
    zoneLabels: { floor: 'Clinical floor', path: 'Cluster fabric', dc: 'Data center built for lighter racks' },
    labels: { 'Room 408': 'Patient room', 'War room': 'Staff workroom' },
    hide: ['wifi-waves', 'cloud'],
    pos: {
      app: [ 86, 134 ],
      serve: [ 480, 124 ],
      gpu: [ 622, 196 ],
      fab: [ 337, 250 ],
      store: [ 480, 300 ],
      cool: [ 640, 312 ],
      nexus: [ 70, 418 ],
      canvas: [ 200, 418 ],
      isight: [ 330, 418 ],
      appr: [ 460, 418 ]
    }
  },
  narr: {
    subtitle: 'To keep patient data in-house and costs predictable, a health system installs a GPU cluster for language and imaging models in a data center built for far lighter racks.',
    caveat: 'No statistic on how many hospitals run their own GPU clusters was found; published examples are surveys and implementation reports, not outcome studies. What Cisco products would show is a hypothesis; the outcome is modeled.',
    nodes: [
      {
        id: 'gpu',
        icon: 'gpu',
        title: 'GPU cluster',
        sub: { exec: 'Bought for research', dir: 'Research computing', eng: 'GPU nodes, firmware cycles' },
        hidden: false,
        r: 30
      },
      {
        id: 'fab',
        icon: 'router',
        title: 'Cluster fabric',
        sub: { exec: 'Links the GPU nodes', dir: 'Infrastructure team', eng: 'Low-loss, east-west' },
        hidden: false,
        r: 30
      },
      { id: 'store', icon: 'database', title: 'Shared storage', sub: { exec: 'Models and data', dir: 'Infrastructure team', eng: 'Its own tool' }, hidden: false, r: 30 },
      {
        id: 'serve',
        icon: 'server',
        title: 'Inference serving stack',
        sub: { exec: 'Runs the models', dir: 'Data science', eng: 'No on-call rota' },
        hidden: false,
        r: 30
      },
      { id: 'cool', icon: 'gear', title: 'Power and cooling', sub: { exec: 'Sets the ceiling', dir: 'Facilities', eng: 'Liquid cooling for GPUs' }, hidden: false, r: 30 },
      {
        id: 'app',
        icon: 'monitor',
        title: 'Clinical AI apps',
        sub: { exec: 'What clinicians use daily', dir: 'Application team', eng: 'Slow tokens, timeouts' },
        hidden: false,
        r: 30
      },
      {
        id: 'canvas',
        icon: 'canvas',
        title: 'AI Canvas',
        sub: { exec: 'One investigation', dir: 'GPU, fabric, storage, apps', eng: 'Latency joined to both' },
        hidden: true,
        r: 30
      },
      {
        id: 'isight',
        icon: 'server',
        title: 'Cisco Intersight',
        sub: { exec: 'Node and GPU health', dir: 'Compute telemetry', eng: 'Node, GPU, firmware state' },
        hidden: true,
        r: 30
      },
      { id: 'nexus', icon: 'rack', title: 'Nexus Dashboard', sub: { exec: 'Fabric health', dir: 'Congestion in view', eng: 'Fabric telemetry' }, hidden: true, r: 30 },
      {
        id: 'appr',
        icon: 'people',
        title: 'Infrastructure, AI owners',
        sub: { exec: 'Two people decide', dir: 'Infrastructure lead, AI owner', eng: 'L3: execute after approve' },
        hidden: true,
        r: 30
      }
    ],
    zones: [
      { id: 'floor', label: 'Clinical floor', hidden: false, cisco: false },
      { id: 'path', label: 'Cluster fabric', hidden: false, cisco: false },
      { id: 'dc', label: 'Data center built for lighter racks', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true }
    ],
    links: [
      { id: 'gpu-fab', a: 'gpu', b: 'fab', bend: 0 },
      { id: 'fab-store', a: 'fab', b: 'store', bend: 0 },
      { id: 'serve-gpu', a: 'serve', b: 'gpu', bend: 0.1 },
      { id: 'app-serve', a: 'app', b: 'serve', bend: 0 },
      { id: 'cool-gpu', a: 'cool', b: 'gpu', bend: 0 },
      { id: 'isight-gpu', a: 'isight', b: 'gpu', bend: 0 },
      { id: 'nexus-fab', a: 'nexus', b: 'fab', bend: 0.1 },
      { id: 'canvas-isight', a: 'canvas', b: 'isight', bend: 0 },
      { id: 'canvas-nexus', a: 'canvas', b: 'nexus', bend: 0 },
      { id: 'canvas-appr', a: 'canvas', b: 'appr', bend: 0.1 },
      { id: 'appr-gpu', a: 'appr', b: 'gpu', bend: 0.12 }
    ],
    steps: [
      {
        phase: 'today',
        title: 'Research hardware becomes clinical infrastructure',
        say: {
          exec: 'A cluster bought for research starts serving models that clinicians use daily, without the uptime design or staffing of a clinical system.',
          dir: 'Ownership is split between research computing, infrastructure and data science, and none runs an on-call rota for model serving.',
          eng: 'GPU nodes, a low-loss east-west fabric, shared storage and the inference serving stack are managed in separate tools with separate firmware cycles.'
        },
        l: { 'gpu-fab': 'ok', 'fab-store': 'ok', 'serve-gpu': 'ok', 'app-serve': 'ok', 'cool-gpu': 'ok' },
        facts: [
          { v: '4 wk to 1', l: "Pathology model work on one academic medical center's GPU system, by its own account", s: 'AHA Market Scan 2025, vendor-reported' },
          { v: '322', l: 'Registered users of an on-premises language model at one German university hospital', s: 'JMIR AI 2026' }
        ]
      },
      {
        phase: 'today',
        title: 'Power and cooling set the ceiling',
        say: {
          exec: 'A current GPU rack can draw more than ten times a typical rack, so facilities limits, not budget, decide how much AI the hospital can run.',
          dir: 'Capacity planning for GPUs, power and cooling lives in spreadsheets, and requests from clinical teams queue without a shared view.',
          eng: 'Racks of 120 to 132 kW need liquid cooling, against an industry average near 9 kW per rack.'
        },
        n: { cool: 'warn', gpu: 'warn' },
        l: { 'cool-gpu': 'warn' },
        label: { cool: 'Built for lighter racks' },
        facts: [
          { v: '120-132 kW', l: 'Per rack for a current NVIDIA GPU design, against an industry average near 9 kW', s: 'NVIDIA; Uptime Institute 2025' },
          { v: '26%', l: 'Organizations that report robust GPU capacity for AI (cross-industry, n=8,000+)', s: 'Cisco AI Readiness Index 2025, vendor-reported' }
        ]
      },
      {
        phase: 'today',
        title: 'A slow model looks like a broken app',
        say: {
          exec: 'When the cluster is saturated or a node fails, clinicians see a slow or failed tool, and nobody can say quickly which layer is at fault.',
          dir: 'The application team blames the model, the model team blames the cluster, and the cluster team has no view of the application.',
          eng: 'Fabric congestion or a failing optic shows up as slow tokens and timeouts, not as a link-down alarm.'
        },
        n: { app: 'down', serve: 'unknown', fab: 'unknown' },
        l: { 'app-serve': 'down', 'serve-gpu': 'unknown', 'gpu-fab': 'unknown' },
        callout: { node: 'app', text: 'Is it the app, the model or the cluster?' },
        clock: { label: 'Time to name the layer', mode: 'run' }
      },
      {
        phase: 'cisco',
        title: 'One view from GPU to clinical app',
        say: {
          exec: 'Same slow tool. This time one investigation shows GPU load, fabric health, storage and the applications that depend on the cluster in a single view.',
          dir: 'AI Canvas would bring Intersight compute and GPU telemetry, Nexus fabric data and Splunk application logs into one investigation.',
          eng: 'Intersight would report node, GPU and firmware state, Nexus telemetry would show fabric congestion, and Splunk would correlate inference latency with both.'
        },
        show: [ 'cc', 'canvas', 'isight', 'nexus' ],
        n: { cool: 'ok', gpu: 'warn', fab: 'ok', serve: 'ok', app: 'warn', canvas: 'ok', isight: 'ok', nexus: 'ok' },
        l: {
          'cool-gpu': 'ok',
          'app-serve': 'warn',
          'serve-gpu': 'warn',
          'gpu-fab': 'ok',
          'isight-gpu': 'warn',
          'nexus-fab': 'ok',
          'canvas-isight': 'ok',
          'canvas-nexus': 'ok'
        },
        label: { cool: '' },
        callout: { node: 'isight', text: 'The fabric is clear. One GPU node needs a firmware fix.' },
        clock: { label: '', mode: 'hide' }
      },
      {
        phase: 'cisco',
        title: 'Approval before clinical workloads move',
        say: {
          exec: "Before a node is drained or a clinical model is moved, the infrastructure lead and the model's clinical owner approve the change and its timing.",
          dir: 'The Actions queue would hold the change for both approvers and the Audit log would record the decision.',
          eng: 'The approved action executes in Intersight (firmware, node maintenance) or the Nexus controller, not from the agent.'
        },
        show: [ 'appr' ],
        n: { appr: 'pending' },
        l: { 'canvas-appr': 'pending' },
        modal: {
          title: 'Drain a GPU node serving clinical models',
          lines: [
            'Drain one node for a firmware fix and move imaging inference overnight.',
            'Approvers: infrastructure lead, clinical AI owner',
            'Executes in: Cisco Intersight'
          ],
          button: 'Approve'
        }
      },
      {
        phase: 'cisco',
        title: 'Modeled: saturation seen before clinicians feel it',
        say: {
          exec: "Modeled outcome: saturation is seen before clinicians feel it. Power, cooling, model quality and who staffs the platform remain the hospital's decisions.",
          dir: "The model assumes Cisco compute and fabric; clusters built on other vendors' hardware would appear only through Splunk data.",
          eng: 'Modeled, not measured. Serving software, schedulers and the models are outside Intersight and Nexus telemetry. AI Defense would test models for safety and security, not uptime.'
        },
        n: { appr: 'ok', gpu: 'ok', app: 'ok' },
        l: { 'canvas-appr': 'ok', 'appr-gpu': 'ok', 'isight-gpu': 'ok', 'serve-gpu': 'ok', 'app-serve': 'ok' },
        chips: [ [ 'AI Canvas', 'GA (US)' ], [ 'Cisco Intersight', 'GA (US)' ], [ 'Nexus Dashboard', 'GA (US)' ], [ 'AI Defense', 'GA' ] ]
      }
    ]
  }
};
