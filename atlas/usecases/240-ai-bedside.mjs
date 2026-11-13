// AI use case AI4: Bedside prediction. One data file: page copy, node placement and the inline narrative.
// Narrative source: experience/src/story/ai.ts. Facts and sources: research/data/ai-use-cases.json. See atlas/AUTHORING.md.
export default {
  id: 'ai-bedside',
  code: 'AI4',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'AI',
  pillars: [ 'AI', 'Facilities' ],
  short: 'Bedside prediction',
  name: 'A sepsis score depends on fresh data',
  setting: 'A nursing unit, the device gateway, the interface engine and the model host',
  situation: 'A deterioration model scores every inpatient from vitals, labs and notes. If a feed lags, the score goes stale.',
  personas: [ 'Chief medical information officer', 'Clinical informatics lead', 'Integration team lead', 'Clinical engineering manager', 'Chief nursing officer' ],
  vision: 'A lagging monitor or lab feed is flagged before the score goes stale, and the clinical informatics lead approves any change that could alter alerts at the bedside (modeled).',
  legacy: {
    banner: 'A deterioration model scores every inpatient from vitals, labs and notes. When a feed lags, the model still produces a score, and nobody can say how old the inputs behind it are.',
    strip: 'Today: gateway, interface engine and model runtime have three owners [H]',
    who: 'Evening shift (sim)',
    silos: [
      [ 'Device gateway console', 'monitors connected [H]', '', 'router' ],
      [ 'Interface engine monitor', 'queues per channel [H]', '', 'server' ],
      [ 'Lab system', 'results sent [H]', '', 'flask' ],
      [ 'Model dashboard', 'scores, not feed latency [H]', 'p', 'gpu' ],
      [ 'EHR alert report', 'alerts fired [H]', '', 'bell' ],
      [ 'Network monitoring', 'links up or down [H]', '', 'topology' ]
    ],
    gaps: [
      'No dashboard shows how old the inputs behind a score are [H]',
      'A queue backlog delays model inputs without raising an error to the model [H]',
      'Drift, data quality and pipeline latency cannot be told apart without input timestamps [H]',
      'Feeds are watched as interfaces, not as a clinical dependency [H]',
      'No published measurement of feed latency for these models was found'
    ],
    big: [ '0.13-0.26', 'positive predictive value of the updated Epic Sepsis Model across 4 US health systems [JAMA Network Open 2026]' ],
    recap: 'A score is on screen and nobody can say how old the vitals behind it are.'
  },
  tobe: {
    banner: 'AI Canvas would join network telemetry with interface-engine and model-host logs in Splunk, so a lagging feed is placed on one layer. Any change that could alter bedside alerts waits for the clinical informatics lead.',
    strip: 'AI Canvas, Splunk, Federated Search, Catalyst Center',
    console: {
      title: 'Cloud Control | the data path',
      body: 'Gateway connectivity, interface queue depth and message timestamps sit next to each prediction. Interface restarts run in the hospital interface tooling through its change system.',
      foot: 'Shows whether inputs arrived, not whether the model is right',
      rows: [
        [ 'Age of inputs behind a score', 'not shown', 'logged per prediction', 0, 'clock' ],
        [ 'Queue backlog', 'interface team only', 'in the shared view', 0, 'server' ],
        [ 'Network or interface', 'argued', 'placed on one layer', 0, 'topology' ],
        [ 'Interface restart', 'ad hoc', 'approved, window agreed', 1, 'person' ],
        [ 'Thresholds and validation', 'clinical governance', 'clinical governance', 2, 'lock' ]
      ]
    },
    stays: 'Model choice, thresholds, validation, alert design and the clinical response stay with clinical governance and the model vendor.',
    recap: [
      'One investigation shows whether monitors, network, interface engine and model host deliver data on time.',
      'Outcomes are modeled. Nothing here validates the model; accuracy and alert burden stay with clinical governance.'
    ]
  },
  hops: {
    legacy: [
      [ 'Bedside monitor', 'source of the vitals', 'monitor' ],
      [ 'Device gateway', 'clinical engineering', 'router' ],
      [ 'Interface engine', 'queue backlog', 'server' ],
      [ 'Sepsis model', 'inputs of unknown age', 'gpu' ]
    ],
    tobe: [
      [ 'Catalyst Center', 'gateway connectivity', 'topology' ],
      [ 'Splunk', 'queues and timestamps', 'database' ],
      [ 'AI Canvas', 'one investigation', 'canvas' ],
      [ 'Approval', 'clinical informatics', 'person' ]
    ]
  },
  pathNote: { legacy: 'Three teams, no view of input age [H]', tobe: 'Input timestamps next to each prediction' },
  outcomes: {
    legacy: [
      [ '0.13-0.26', 'positive predictive value, updated Epic Sepsis Model [JAMA Network Open 2026]', 'S' ],
      [ '0.82-0.92', 'AUROC for the same model, by site [JAMA Network Open 2026]', 'S' ],
      [ '18.7%', 'relative mortality reduction, alert confirmed within 3 hours [Nature Medicine 2022]', 'S' ]
    ],
    tobe: [
      [ 'Flagged', 'a lagging feed, before scores go stale (modeled)', 'H' ],
      [ '1 layer', 'named: monitor, network, interface or model host (modeled)', 'H' ],
      [ '1 approval', 'before a bedside-facing change (modeled)', 'H' ]
    ]
  },
  kpis: [ 'Age of the newest vitals behind a score', 'Interface queue depth per channel', 'Time to place a lagging feed on a layer', 'Alerts per confirmed case' ],
  ask: 'For your sepsis or deterioration score, can anyone tell you right now how old the newest vitals and labs behind it are?',
  tiles: [
    { l: 'Positive predictive value, updated Epic Sepsis Model [JAMA Network Open 2026]', a: '0.13-0.26', b: '0.13-0.26', tag: 'S' },
    { l: 'Encounter-level AUROC, same model, by site [JAMA Network Open 2026]', a: '0.82-0.92', b: '0.82-0.92', tag: 'S' },
    { l: 'Alerts before clinical recognition, at 60% sensitivity [Am J Emerg Med 2025]', a: '33.5%', b: '33.5%', tag: 'S' },
    { l: 'Pooled AUROC, mostly first-generation model [J Gen Intern Med 2026]', a: '0.65', b: '0.65', tag: 'S' },
    { l: 'Age of inputs behind a score', a: 'Not shown', b: 'Logged per prediction', tag: 'H' },
    { l: 'Bedside-facing change', a: 'Ad hoc', b: 'Approved by a person', tag: 'H' }
  ],
  scene: {
    decor: 'ehr',
    zoneLabels: { floor: 'Nursing unit and ED', path: 'Device network', dc: 'Data center' },
    pos: {
      mon: [ 84, 134 ],
      rn: [ 205, 134 ],
      edd: [ 84, 300 ],
      gw: [ 337, 300 ],
      ie: [ 480, 290 ],
      lab: [ 640, 290 ],
      model: [ 550, 130 ],
      canvas: [ 240, 418 ],
      splunk: [ 430, 418 ],
      appr: [ 620, 418 ]
    }
  },
  narr: {
    subtitle: 'A deterioration model scores every inpatient from vitals, labs and notes. If a feed from monitors or the lab lags, the score goes stale and nurses see alerts they stop trusting.',
    caveat: 'The updated model discriminates better than the first, but alert burden stays high. No published measurement of feed latency for these models was found. Infrastructure visibility does not make a model accurate; the outcome shown is modeled.',
    nodes: [
      {
        id: 'mon',
        icon: 'monitor',
        title: 'Bedside monitors',
        sub: { exec: 'Source of the vitals', dir: 'Clinical engineering', eng: 'Via a device gateway' },
        hidden: false,
        r: 30
      },
      { id: 'rn', icon: 'badge', title: 'Charge nurse', sub: { exec: 'Sees the alerts', dir: 'Unit nursing staff', eng: 'Score shown in EHR' }, hidden: false, r: 30 },
      {
        id: 'edd',
        icon: 'person',
        title: 'ED clinician',
        sub: { exec: 'Acts on the alert', dir: 'Emergency department', eng: 'Alert shown in EHR' },
        hidden: false,
        r: 30
      },
      {
        id: 'gw',
        icon: 'router',
        title: 'Device gateway',
        sub: { exec: 'Collects monitor data', dir: 'Clinical engineering', eng: 'Device integration gateway' },
        hidden: false,
        r: 30
      },
      {
        id: 'ie',
        icon: 'server',
        title: 'Interface engine',
        sub: { exec: 'Moves every message', dir: 'Integration team', eng: 'HL7 and FHIR queues' },
        hidden: false,
        r: 30
      },
      {
        id: 'lab',
        icon: 'flask',
        title: 'Lab system feed',
        sub: { exec: 'Results behind the score', dir: 'Laboratory IT', eng: 'HL7 result messages' },
        hidden: false,
        r: 30
      },
      {
        id: 'model',
        icon: 'gpu',
        title: 'Sepsis model',
        sub: { exec: 'Scores every inpatient', dir: 'Model owner', eng: 'Input freshness not exposed' },
        hidden: false,
        r: 30
      },
      {
        id: 'canvas',
        icon: 'canvas',
        title: 'AI Canvas',
        sub: { exec: 'One investigation', dir: 'Network, interfaces, model host', eng: 'Telemetry joined to logs' },
        hidden: true,
        r: 30
      },
      {
        id: 'splunk',
        icon: 'database',
        title: 'Splunk',
        sub: { exec: 'Age of each input', dir: 'Queue depth, timestamps', eng: 'Federated Search, other stores' },
        hidden: true,
        r: 30
      },
      {
        id: 'appr',
        icon: 'person',
        title: 'Clinical informatics lead',
        sub: { exec: 'Approves bedside-facing change', dir: 'Agrees the window', eng: 'L3: execute after approve' },
        hidden: true,
        r: 30
      }
    ],
    zones: [
      { id: 'floor', label: 'Nursing unit and emergency department', hidden: false, cisco: false },
      { id: 'path', label: 'Device network', hidden: false, cisco: false },
      { id: 'dc', label: 'Data center', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true }
    ],
    links: [
      { id: 'mon-gw', a: 'mon', b: 'gw', bend: 0 },
      { id: 'gw-ie', a: 'gw', b: 'ie', bend: 0 },
      { id: 'lab-ie', a: 'lab', b: 'ie', bend: 0.12 },
      { id: 'ie-model', a: 'ie', b: 'model', bend: -0.12 },
      { id: 'model-rn', a: 'model', b: 'rn', bend: 0 },
      { id: 'model-edd', a: 'model', b: 'edd', bend: 0.12 },
      { id: 'splunk-ie', a: 'splunk', b: 'ie', bend: 0 },
      { id: 'splunk-model', a: 'splunk', b: 'model', bend: 0.1 },
      { id: 'canvas-splunk', a: 'canvas', b: 'splunk', bend: 0 },
      { id: 'canvas-gw', a: 'canvas', b: 'gw', bend: 0.1 },
      { id: 'canvas-appr', a: 'canvas', b: 'appr', bend: 0.1 },
      { id: 'appr-ie', a: 'appr', b: 'ie', bend: 0.12 }
    ],
    steps: [
      {
        phase: 'today',
        title: 'The model reads feeds nobody watches',
        say: {
          exec: 'The score depends on monitor, lab and EHR feeds arriving on time, and those feeds are watched as interfaces, not as a clinical dependency.',
          dir: 'The interface engine, device gateways and the model runtime belong to three teams; the model owner sees scores, not feed latency.',
          eng: 'Vitals arrive through device integration gateways and HL7 or FHIR interfaces; a queue backlog can delay model inputs without raising an error to the model.'
        },
        l: { 'mon-gw': 'ok', 'gw-ie': 'ok', 'lab-ie': 'ok', 'ie-model': 'ok', 'model-rn': 'ok', 'model-edd': 'ok' },
        facts: [
          { v: '0.82-0.92', l: 'Encounter-level AUROC for the updated Epic Sepsis Model, varying by site', s: 'JAMA Network Open 2026' },
          { v: '18.7%', l: 'Adjusted relative mortality reduction when a sepsis alert was confirmed within 3 hours (6,877 patients)', s: 'Nature Medicine 2022' }
        ]
      },
      {
        phase: 'today',
        title: 'Stale inputs, confident output',
        say: {
          exec: 'If a feed lags, the model can still produce a score, so a patient could look stable on screen while the latest readings are missing.',
          dir: 'No dashboard shows clinicians or IT how old the inputs behind a given score are.',
          eng: 'Most deployed models do not expose input freshness, so a missing lab or a delayed vitals batch could change the score silently.'
        },
        n: { ie: 'warn', model: 'unknown' },
        l: { 'gw-ie': 'warn', 'ie-model': 'unknown', 'model-rn': 'unknown' },
        label: { model: 'Inputs of unknown age' },
        callout: { node: 'model', text: 'A score is on screen. How old are the vitals behind it?' },
        clock: { label: 'Age of the newest vitals', mode: 'run' }
      },
      {
        phase: 'today',
        title: 'Alerts fire late or too often',
        say: {
          exec: 'Even the updated sepsis model, validated at four health systems in 2026, kept a low positive predictive value and a high alert burden, varying by site.',
          dir: "Alert fatigue rises, and with ONC's model-card requirement removed from December 28, 2026, local monitoring falls to the hospital.",
          eng: 'Model drift, data-quality drift and pipeline latency cannot be told apart unless input timestamps are logged next to each prediction.'
        },
        n: { rn: 'warn', edd: 'warn', model: 'warn' },
        l: { 'model-rn': 'warn', 'model-edd': 'warn' },
        label: { rn: 'Stops trusting the alerts' },
        facts: [
          { v: '0.13-0.26', l: 'Positive predictive value of the updated Epic Sepsis Model across 4 US health systems (227,091 encounters)', s: 'JAMA Network Open 2026' },
          { v: '33.5%', l: 'Cases at 60% sensitivity where the updated model alerted before clinical recognition (35,076 ED encounters)', s: 'Am J Emerg Med 2025' }
        ]
      },
      {
        phase: 'cisco',
        title: 'One view of the data path',
        say: {
          exec: 'Same lagging feed. This time one investigation shows whether monitors, the network, the interface engine and the model host are delivering data on time.',
          dir: 'AI Canvas would join Catalyst Center network telemetry with interface-engine and model-host logs in Splunk, using Federated Search for data left in place.',
          eng: 'Splunk would hold interface queue depth and message timestamps, Topology would show gateway connectivity, and Federated Search would reach logs kept in other stores.'
        },
        show: [ 'cc', 'canvas', 'splunk' ],
        n: { rn: 'ok', edd: 'ok', ie: 'warn', model: 'warn', gw: 'ok', canvas: 'ok', splunk: 'ok' },
        l: { 'gw-ie': 'warn', 'ie-model': 'warn', 'model-rn': 'ok', 'model-edd': 'ok', 'splunk-ie': 'warn', 'splunk-model': 'ok', 'canvas-splunk': 'ok', 'canvas-gw': 'ok' },
        label: { model: '', rn: '' },
        callout: { node: 'splunk', text: 'The network path is clean. Vitals are queuing at the interface engine.' },
        clock: { label: '', mode: 'hide' }
      },
      {
        phase: 'cisco',
        title: 'Clinical informatics approves any change',
        say: {
          exec: 'Any change that could alter alerts at the bedside, such as restarting an interface or rerouting a gateway, waits for clinical informatics approval.',
          dir: 'The Actions queue would hold the request and the Audit log would record the approver and the window agreed with the unit.',
          eng: "Network changes run in Catalyst Center; interface-engine restarts run in the hospital's own interface tooling through its change system."
        },
        show: [ 'appr' ],
        n: { appr: 'pending' },
        l: { 'canvas-appr': 'pending' },
        modal: {
          title: 'Restart the vitals interface feed',
          lines: [
            'Restart the monitor-to-EHR channel and replay queued vitals for two units.',
            'Approver: clinical informatics lead',
            'Executes in: the hospital interface engine'
          ],
          button: 'Approve'
        }
      },
      {
        phase: 'cisco',
        title: 'Modeled: stale feeds flagged, accuracy unchanged',
        say: {
          exec: "Modeled outcome: a lagging feed is flagged before scores go stale. The model's accuracy, thresholds and alert fatigue remain a clinical governance matter.",
          dir: 'The model assumes interface-engine and model-host logs are sent to Splunk or retained in Machine Data Lake, which is integration work the hospital must do.',
          eng: 'This outcome is modeled, not measured. Nothing here validates the model; it only shows whether the inputs arrived and when.'
        },
        n: { appr: 'ok', ie: 'ok', model: 'ok' },
        l: { 'canvas-appr': 'ok', 'appr-ie': 'ok', 'gw-ie': 'ok', 'ie-model': 'ok', 'splunk-ie': 'ok' },
        chips: [ [ 'AI Canvas', 'GA (US)' ], [ 'Splunk', 'GA (US)' ], [ 'Federated Search', 'GA' ], [ 'Machine Data Lake', 'GA' ] ]
      }
    ]
  }
};
