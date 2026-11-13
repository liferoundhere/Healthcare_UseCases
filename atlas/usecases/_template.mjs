// TEMPLATE. The build skips files that start with "_". Copy this file to NNN-your-id.mjs and edit it.
// It is a complete, valid use case: inline narrative, the "wifi" floor plan reused, every node placed.
// tools/selftest.mjs builds it to prove the documented path works. See atlas/AUTHORING.md.
export default {
  id: 'template-nurse-call',
  code: 'T1',
  editions: ['general', 'msk', 'nyulh'], // or ['msk'] or ['nyulh'] for an account use case
  category: 'Infrastructure', // Flagship | Infrastructure | AI | Account
  pillars: ['Facilities', 'Security'],
  short: 'Nurse call delay',
  name: 'The nurse call that arrives late',
  setting: 'A medical floor, its access points and the nurse call platform',
  personas: ['Chief nursing officer', 'Wireless network engineer', 'Clinical communications owner'],
  vision: 'The access point, the closet and the nurse call platform share one timeline, so a late alert is traced to one layer.',
  legacy: {
    banner: 'A nurse call alert reaches the badge late. The wireless team and the nurse call vendor each see a healthy system.',
    strip: 'Today: radio, closet and platform have three owners [H]',
    who: 'Day shift (sim)',
    silos: [['Wireless controller', 'signal looks fine [H]', '', 'wifi'], ['PoE closet', 'power and ports [H]', '', 'switch'], ['Nurse call system', 'separate vendor [H]', 'p', 'bell']],
    gaps: ['Late alerts are not logged as network events [H]', 'Closet power and radio data never meet [H]'],
    big: ['3', 'owners for one alert [H]'],
    recap: 'One alert, three owners, and no shared record of where the delay was.',
  },
  tobe: {
    banner: 'Client health, access point health and closet power sit on one canvas, and the change to the voice profile waits for a named approver.',
    strip: 'AI Canvas, Catalyst Center, Meraki',
    console: { title: 'Cloud Control | nurse call path', body: 'One timeline for the badge, the access point and the closet.', rows: [['Views to open', '3', '1', 0, 'canvas'], ['Voice profile change', 'ad hoc', 'approved by a person', 1, 'person']] },
    stays: 'The nurse call platform stays with its vendor and remains the system of record for alerts.',
    recap: ['One timeline shows which layer delayed the alert, and a person approves the change.'],
  },
  hops: {
    legacy: [['Badge', 'alert arrives late', 'badge'], ['Access point', 'looks healthy', 'wifi'], ['PoE closet', 'other team', 'switch'], ['Nurse call', 'vendor logs', 'bell']],
    tobe: [['AI Canvas', 'one timeline', 'canvas'], ['Catalyst Center', 'client and AP health', 'topology'], ['Approval', 'a named person', 'person'], ['Nurse call', 'stays in place', 'bell']],
  },
  pathNote: { legacy: 'Three owners per alert [H]', tobe: 'One timeline, one approval' },
  outcomes: {
    legacy: [['3', 'teams to ask about one alert', 'H'], ['No log', 'of late alerts as network events', 'H'], ['Unknown', 'age of the last wireless survey', 'H']],
    tobe: [['1 timeline', 'for badge, access point and closet (modeled)', 'H'], ['1 approval', 'before the voice profile changes', 'H'], ['Audit log', 'of who approved the change', 'H']],
  },
  kpis: ['Time to name the layer that delayed an alert', 'Late alerts per week'],
  ask: 'When an alert reaches a badge late, who can show where the delay was?',
  tiles: [{ l: 'Owners per alert', a: '3', b: '1 timeline', tag: 'H' }],
  scene: {
    decor: 'wifi', // reuse the 4 West floor plan: zones "floor" (x 20 to 490) and "sys" (x 502 to 720)
    zoneLabels: { floor: 'Medical floor', sys: 'Clinical systems' },
    pos: { ap: [130, 134], badge: [300, 240], idf: [120, 320], nc: [610, 150], canvas: [110, 418], approve: [365, 418], cat: [620, 418] },
  },
  narr: {
    subtitle: 'A nurse call alert reaches the badge late, and three teams each see a healthy system.',
    caveat: 'Modeled outcome. No percentage is claimed. Layout, IDs and timings are simulated.',
    nodes: [
      { id: 'ap', icon: 'wifi', title: 'Hall AP', sub: { exec: 'Looks healthy', dir: 'Wireless team', eng: '5 GHz, voice SSID' }, hidden: false, r: 30 },
      { id: 'badge', icon: 'badge', title: 'Voice badge', sub: { exec: 'Alert is late', dir: 'Nursing', eng: 'Roams between APs' }, hidden: false, r: 30 },
      { id: 'idf', icon: 'rack', title: 'IDF PoE', sub: { exec: 'Powers the APs', dir: 'Facilities', eng: 'PoE budget' }, hidden: false, r: 30 },
      { id: 'nc', icon: 'bell', title: 'Nurse call', sub: { exec: 'Sends alerts', dir: 'Vendor system', eng: 'SIP to badges' }, hidden: false, r: 30 },
      { id: 'canvas', icon: 'canvas', title: 'AI Canvas', sub: { exec: 'One timeline', dir: 'Shared view', eng: 'GA in the US' }, hidden: true, r: 30 },
      { id: 'approve', icon: 'person', title: 'Approval', sub: { exec: 'A person decides', dir: 'Wireless lead', eng: 'Execute after approve' }, hidden: true, r: 30 },
      { id: 'cat', icon: 'topology', title: 'Catalyst Center', sub: { exec: 'Where it executes', dir: 'System of record', eng: 'RF profile' }, hidden: true, r: 30 },
    ],
    zones: [
      { id: 'floor', label: 'Medical floor', hidden: false, cisco: false },
      { id: 'sys', label: 'Clinical systems', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true },
    ],
    links: [
      { id: 'nc-badge', a: 'nc', b: 'badge', bend: 0.1 }, { id: 'ap-badge', a: 'ap', b: 'badge', bend: 0 }, { id: 'idf-ap', a: 'idf', b: 'ap', bend: 0 },
      { id: 'canvas-ap', a: 'canvas', b: 'ap', bend: 0 }, { id: 'canvas-approve', a: 'canvas', b: 'approve', bend: 0 }, { id: 'approve-cat', a: 'approve', b: 'cat', bend: 0 },
    ],
    steps: [
      { phase: 'today', title: 'An alert leaves the nurse call system', say: { exec: 'A patient presses the call button. The alert should reach the badge in a moment.', dir: 'Three teams own the path the alert takes.', eng: 'SIP from the nurse call server to the badge over the voice SSID.' },
        n: { ap: 'ok', badge: 'ok', idf: 'ok', nc: 'ok' }, l: { 'nc-badge': 'ok', 'ap-badge': 'ok', 'idf-ap': 'ok' },
        facts: [{ v: '3', l: 'owners between the call button and the badge', s: 'Research gap' }] },
      { phase: 'today', title: 'The alert is late and nobody sees why', say: { exec: 'The badge rings late. Each team checks its own screen and sees green.', dir: 'There is no shared record of the delay.', eng: 'The roam and the PoE event are in two different logs.' },
        n: { badge: 'warn' }, l: { 'nc-badge': 'warn' }, label: { badge: 'Alert late' }, callout: { node: 'badge', text: 'The alert arrived late. Three consoles all show healthy.' } },
      { phase: 'cisco', title: 'One timeline for the alert', say: { exec: 'The same alert, on one timeline that all three teams read.', dir: 'Badge, access point and closet events line up.', eng: 'Client health and AP health from Catalyst Center on one canvas.' },
        show: ['cc', 'canvas'], n: { canvas: 'ok', badge: 'warn' }, l: { 'canvas-ap': 'ok' }, callout: { node: 'canvas', text: 'The delay lines up with a roam on the hall access point.' } },
      { phase: 'cisco', title: 'A person approves the change', say: { exec: 'The fix is proposed. A named person approves it before anything changes.', dir: 'The wireless lead signs the change.', eng: 'RF profile change, execute after approve.' },
        show: ['approve', 'cat'], n: { approve: 'pending', cat: 'idle' }, l: { 'canvas-approve': 'pending' },
        modal: { title: 'Approve the voice profile change', lines: ['Raise the minimum data rate on the hall access points.', 'Approver: wireless lead', 'Executes in: Catalyst Center'], button: 'Approve' } },
      { phase: 'cisco', title: 'Executed where policy lives', say: { exec: 'The change runs in the system of record, and the alert arrives on time.', dir: 'The approval is in the audit log.', eng: 'Catalyst Center applies the profile; the canvas keeps the record.' },
        n: { approve: 'ok', cat: 'ok', badge: 'ok' }, l: { 'canvas-approve': 'ok', 'approve-cat': 'ok', 'nc-badge': 'ok' }, label: { badge: '' },
        chips: [['AI Canvas', 'GA (US)'], ['Catalyst Center', 'GA']] },
    ],
  },
};
