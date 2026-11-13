// MSK account use case M2: Epic slow at a regional infusion site.
// Sources: research/11-account-memorial-sloan-kettering.md and research/data/account-msk.json (use case 2).
// Narrative converted from experience/src/story/accounts.ts. Every Cisco beat is a hypothesis to validate.
// The slow-record scenario is illustrative, not a reported MSK incident.
const n = (id, icon, title, sub, hidden = false) => ({ id, icon, title, sub: { exec: sub[0], dir: sub[1], eng: sub[2] }, hidden, r: 30 });
const k = (a, b, bend = 0) => ({ id: `${a}-${b}`, a, b, bend });
const s = (exec, dir, eng) => ({ exec, dir, eng });
const f = (v, l, src) => ({ v, l, s: src });
const MSK_PROFILE = 'MSK Statistical Profile 2024';

export default {
  id: 'msk-regional-infusion-epic',
  code: 'M2',
  editions: ['msk'],
  category: 'Account',
  pillars: ['Facilities', 'AI'],
  short: 'Regional infusion site',
  name: 'Epic slow at a regional infusion site',
  setting: 'A regional infusion site, the WAN and carrier path, and the electronic health record',
  situation: 'Most MSK chemotherapy is given outside Manhattan, so a slow record, pharmacy or network path at one regional site delays infusion chairs that same day.',
  personas: ['Chief digital officer', 'Regional site operations lead', 'Infusion nursing lead', 'Pharmacy director', 'Network operations', 'Epic application team'],
  vision: 'Hypothesis to validate: one investigation shows where the delay sits between the infusion chair, the WAN and the record, and a named MSK approver signs any path change. Modeled, not measured.',
  legacy: {
    banner: 'MSK recorded 212,457 chemotherapy treatments in its regional network in 2024, against 129,857 in Manhattan [MSK Statistical Profile 2024]. When the record is slow at one site, the cause could be the device, the Wi-Fi, the WAN, the hosting environment or an interface, each with a different owner [H].',
    strip: 'Today: device, Wi-Fi, WAN and application each have an owner [H]',
    who: 'Infusion hours at a regional site (illustrative)',
    silos: [
      ['Workstation tools', 'client response times [H]', '', 'monitor'],
      ['Wireless console', 'site Wi-Fi statistics [H]', '', 'wifi'],
      ['WAN monitoring', 'path metrics [H]', '', 'router'],
      ['Carrier portal', 'circuit up or down [H]', 'p', 'globe'],
      ['Application logs', 'record response times [H]', '', 'server'],
      ['Bridge call', 'each layer proves innocence [H]', 'p', 'phone'],
    ],
    gaps: [
      'Consoles use different time bases [H]',
      'The site lead gets no reliable estimate [H]',
      'Root cause is written up days later [H]',
      'One site is hard to compare with another afterwards [H]',
      'The WAN vendor and the Epic hosting model are not public',
    ],
    big: ['212,457', 'chemotherapy treatments in the regional network in 2024 [MSK Statistical Profile 2024]'],
    recap: 'The chair is ready and the screen is not, and each layer reports healthy while the site waits.',
  },
  tobe: {
    banner: 'Hypothesis to validate: AI Canvas joins wireless, WAN, path and log data for the affected site, and ThousandEyes shows the path hop by hop. A named MSK approver signs any path change. The scenario is illustrative, not a reported MSK incident.',
    strip: 'AI Canvas, ThousandEyes, Deep Reasoning (beta), Catalyst SD-WAN',
    who: 'Infusion hours at a regional site (illustrative)',
    console: {
      title: 'Cloud Control | chair to record',
      body: 'One investigation for the affected site, compared with unaffected sites. It locates the delay and names the owner. Owners still make the fix. Modeled.',
      foot: 'Deep Reasoning is beta',
      rows: [
        ['Consoles to compare', '4 or more', '1 investigation', 0, 'canvas'],
        ['Where the delay sits', 'argued on a call', 'shown hop by hop', 0, 'eye'],
        ['Path change', 'ad hoc', 'approved by a named person', 1, 'person'],
        ['Other sites with the same signature', 'found later', 'same query rerun', 2, 'building'],
        ['Evidence for the carrier', 'partial', 'one record per incident', 2, 'doc'],
      ],
    },
    stays: "Epic and its hosting stay with MSK's Epic team and Epic, pharmacy and infusion systems with their owners, carrier circuits with the carriers, and scheduling decisions with the site.",
    recap: [
      'One investigation from the chair to the record, and a named approval before the path changes.',
      'Outcomes are modeled, not measured. Any saving needs a baseline from MSK.',
    ],
  },
  hops: {
    legacy: [
      ['Infusion chair', 'waiting on the screen', 'pump'],
      ['Site Wi-Fi and WAN', 'looks healthy', 'router'],
      ['Carrier circuits', "someone else's network", 'cloud'],
      ['Health record', 'its own logs', 'server'],
    ],
    tobe: [
      ['ThousandEyes', 'path hop by hop', 'eye'],
      ['AI Canvas', 'one investigation', 'canvas'],
      ['Named approver', 'network duty manager', 'person'],
      ['WAN controller', 'executes the change', 'router'],
    ],
  },
  pathNote: { legacy: 'Each layer proves its own health [H]', tobe: 'One timeline from chair to record (modeled)' },
  outcomes: {
    legacy: [
      ['212,457', 'regional chemotherapy treatments in 2024 [MSK Statistical Profile 2024]', 'S'],
      ['317,766', 'regional outpatient visits in 2024 [MSK Statistical Profile 2024]', 'S'],
      ['18,000+', 'staff on one Epic record, vendor-reported [Epic customer story, undated]', 'S'],
    ],
    tobe: [
      ['1 timeline', 'read by the site, network and Epic teams (modeled)', 'H'],
      ['1 approval', 'by a named MSK approver before a path change', 'H'],
      ['1 record', 'of evidence per incident for escalations (modeled)', 'H'],
    ],
  },
  kpis: ['Time to locate the delay by layer', 'Chair minutes lost to system delay', 'Repeat incidents across sites', 'Days to a written root cause'],
  ask: 'When a regional site says Epic is slow during infusion hours, how long until you know which layer it is, and who decides?',
  tiles: [
    { l: 'Chemotherapy treatments, regional network, 2024 [MSK Statistical Profile 2024]', a: '212,457', b: '212,457', tag: 'S' },
    { l: 'Chemotherapy treatments, Manhattan, 2024 [MSK Statistical Profile 2024]', a: '129,857', b: '129,857', tag: 'S' },
    { l: 'Regional outpatient visits, 2024 [MSK Statistical Profile 2024]', a: '317,766', b: '317,766', tag: 'S' },
    { l: 'Epic in use as the health record since [MSK public notice 2025]', a: 'Feb 1, 2025', b: 'Feb 1, 2025', tag: 'S' },
    { l: 'Staff on one Epic record, vendor-reported [Epic customer story, undated]', a: '18,000+', b: '18,000+', tag: 'S' },
    { l: 'Consoles compared for one slow session', a: '4 or more', b: '1 investigation', tag: 'H' },
    { l: 'Approval before a path change', a: 'Ad hoc', b: '1 named approver', tag: 'H' },
    { l: 'Floor plan, a composite based on public descriptions of MSK regional outpatient sites', a: 'Illustrative', b: 'Illustrative', tag: 'I' },
  ],
  scene: {
    decor: 'msk_infusion', // site (x 20 to 330), carriers (340 to 490), dc (500 to 720)
    pos: {
      chairs: [125, 170], pharm: [274, 150], wan: [262, 322], carrier: [415, 215], ehr: [610, 196], call: [610, 300],
      te: [110, 418], dr: [280, 418], canvas: [450, 418], appr: [620, 418],
    },
  },
  narr: {
    subtitle: 'Most MSK chemotherapy is given outside Manhattan, so a slow record, pharmacy or network path at one regional site delays infusion chairs that same day.',
    caveat: "All 'with Cisco' beats are hypotheses to validate. No public source names MSK's WAN, wireless or monitoring vendors or its Epic hosting. The scenario is illustrative, not a reported MSK incident. Outcomes are modeled, not measured.",
    nodes: [
      n('chairs', 'pump', 'Infusion chair bay', ['Patients wait in chairs', 'Regional site nursing', 'Workstations on site Wi-Fi']),
      n('pharm', 'pill', 'Infusion pharmacy', ['Doses prepared to schedule', 'Pharmacy', 'Needs record and orders']),
      n('wan', 'router', 'Site WAN edge', ["The site's way out", 'Network team', 'Primary and alternate path']),
      n('carrier', 'cloud', 'Carrier circuits', ["Someone else's network", 'Carriers', 'Loss and latency per path']),
      n('ehr', 'server', 'Electronic health record', ['One record, every site', 'Record team and host', 'Response times, own logs']),
      n('call', 'people', 'Bridge call', ['Each layer proves innocence', 'Device, Wi-Fi, WAN, app', 'Separate consoles and clocks'], true),
      n('te', 'eye', 'ThousandEyes', ['Path seen hop by hop', 'Site to record', 'Loss and latency per path'], true),
      n('dr', 'chat', 'Deep Reasoning', ['Compares with healthy sites', 'Hypotheses with evidence', 'Plan approved before run'], true),
      n('canvas', 'canvas', 'AI Canvas', ['One investigation', 'Site, network, record team', 'Wireless, WAN, path, logs'], true),
      n('appr', 'person', 'Network duty manager', ['A named MSK approver', 'Infusion lead informed', 'L3: execute after approve'], true),
    ],
    zones: [
      { id: 'site', label: 'Regional infusion site', hidden: false, cisco: false },
      { id: 'carriers', label: 'WAN and carriers', hidden: false, cisco: false },
      { id: 'dc', label: 'Electronic health record', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true },
    ],
    links: [k('chairs', 'wan', -0.12), k('pharm', 'wan'), k('wan', 'carrier'), k('carrier', 'ehr'), k('call', 'wan', 0.1), k('call', 'ehr', 0.12), k('te', 'carrier'), k('te', 'canvas', -0.42), k('dr', 'canvas'), k('canvas', 'wan'), k('canvas', 'appr'), k('appr', 'wan', 0.12)],
    steps: [
      {
        phase: 'today', title: 'The chair is ready, the screen is not',
        say: s(
          "When the record or pharmacy system is slow at a regional site, patients wait in infusion chairs and the day's schedule slips.",
          'The site reports that the record is slow. The cause could be the device, the Wi-Fi, the WAN, the hosting environment or an interface, each with its own owner.',
          'Engineers compare client response times, wireless statistics, WAN path metrics and application logs in separate consoles with different time bases.',
        ),
        n: { chairs: 'warn' }, l: { 'chairs-wan': 'ok', 'pharm-wan': 'ok', 'wan-carrier': 'ok', 'carrier-ehr': 'ok' },
        label: { chairs: 'Waiting on the screen' },
        facts: [f('212,457', 'chemotherapy treatments in the regional network in 2024', MSK_PROFILE), f('317,766', 'regional network outpatient visits in 2024', MSK_PROFILE)],
      },
      {
        phase: 'today', title: 'A bridge call per site',
        say: s(
          'Specialists join a call and each proves their own layer is healthy while the site keeps waiting.',
          'Without a shared timeline, mean time to innocence replaces mean time to repair, and the site lead gets no reliable estimate.',
          "Correlating one user's slow session across access point, circuit, data center and application hop is manual and rarely done before the symptom clears.",
        ),
        show: ['call'], n: { call: 'warn' },
        l: { 'chairs-wan': 'warn', 'wan-carrier': 'unknown', 'carrier-ehr': 'unknown', 'call-wan': 'unknown', 'call-ehr': 'unknown' },
        clock: { label: 'Time to locate the delay', mode: 'run' },
        callout: { node: 'chairs', text: 'Every layer reports healthy. The site is still waiting.' },
        facts: [f('18,000+', 'staff across hospitals and outpatient sites on one Epic record', 'Epic customer story, undated, vendor-reported')],
      },
      {
        phase: 'today', title: 'The pattern is found late',
        say: s(
          'The same fault can recur at another site because nobody had the whole picture the first time.',
          'Root cause is written up days later from partial evidence, so preventive changes are slow to reach other regional sites.',
          'Path and performance data are kept for different periods in different tools, so comparing one site with another after the fact is hard.',
        ),
        l: { 'pharm-wan': 'warn' },
        label: { chairs: "The day's schedule slips", call: 'Write-up comes days later' },
      },
      {
        phase: 'cisco', title: 'One investigation, chair to record (hypothesis)',
        say: s(
          'Hypothesis: one shared investigation could show where the delay sits between the infusion site, the network and the record, in language each team accepts.',
          'Hypothesis: the site lead, network team and Epic team would look at the same timeline instead of arguing from separate dashboards.',
          'Hypothesis: AI Canvas would join wireless, SD-WAN, path and log data for the affected site and compare it with unaffected sites.',
        ),
        hide: ['call'], show: ['cc', 'te', 'dr', 'canvas'], n: { wan: 'warn', carrier: 'warn', te: 'ok', dr: 'ok', canvas: 'ok' },
        label: { chairs: '', call: '' },
        l: { 'wan-carrier': 'warn', 'carrier-ehr': 'ok', 'call-wan': 'off', 'call-ehr': 'off', 'te-carrier': 'warn', 'te-canvas': 'ok', 'dr-canvas': 'ok', 'canvas-wan': 'ok' },
        clock: { label: '', mode: 'hide' },
        callout: { node: 'carrier', text: 'Modeled: loss on one carrier path to this site. The record is healthy.' },
      },
      {
        phase: 'cisco', title: 'A person approves the path change',
        say: s(
          'Hypothesis: any change to how an infusion site reaches the record would wait for a named MSK approver.',
          'Hypothesis: the workflow would propose one change, state the sites and applications it touches, and stop.',
          'Hypothesis: the change would execute in the WAN controller that owns the policy, and every step would be logged.',
        ),
        show: ['appr'], n: { appr: 'pending' }, l: { 'canvas-appr': 'pending' },
        modal: {
          title: "Shift one site's traffic path",
          lines: [
            'Move record and pharmacy traffic for one regional site to the alternate WAN path.',
            'Approver: MSK network duty manager (to confirm)',
            'Trust level: L3, execute after approve',
            'Executes in: Catalyst SD-WAN Manager (hypothesis)',
          ],
          button: 'Approve',
        },
      },
      {
        phase: 'cisco', title: 'Shorter delays, fewer repeats (modeled)',
        say: s(
          'Hypothesis: delays would be located sooner and the fix applied to similar sites before they are affected. Modeled, not measured.',
          'Hypothesis: one evidence record per incident would make vendor escalations to carriers or application owners faster and less contested.',
          'Modeled, not measured: the same query would be rerun across all regional sites to find the same signature. Savings need a baseline from MSK.',
        ),
        n: { appr: 'ok', wan: 'ok', chairs: 'ok' }, l: { 'canvas-appr': 'ok', 'appr-wan': 'ok', 'chairs-wan': 'ok', 'pharm-wan': 'ok' },
        label: { wan: 'On the alternate path' },
        chips: [['AI Canvas', 'GA (US)'], ['ThousandEyes', 'GA (US)'], ['Deep Reasoning', 'Beta'], ['Catalyst SD-WAN', 'GA (US)']],
      },
    ],
  },
};
