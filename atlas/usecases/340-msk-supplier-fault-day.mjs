// MSK account use case M4: when a supplier fault reaches the operating room.
// Sources: research/11-account-memorial-sloan-kettering.md and research/data/account-msk.json (use case 4).
// Narrative converted from experience/src/story/accounts.ts. Every Cisco beat is a hypothesis to validate.
// The July 19, 2024 event was a faulty vendor software update, not an attack, and nothing here would have prevented it.
const n = (id, icon, title, sub, hidden = false) => ({ id, icon, title, sub: { exec: sub[0], dir: sub[1], eng: sub[2] }, hidden, r: 30 });
const k = (a, b, bend = 0) => ({ id: `${a}-${b}`, a, b, bend });
const s = (exec, dir, eng) => ({ exec, dir, eng });
const f = (v, l, src) => ({ v, l, s: src });
const MSK_PROFILE = 'MSK Statistical Profile 2024';

export default {
  id: 'msk-supplier-fault-day',
  code: 'M4',
  editions: ['msk'],
  category: 'Account',
  pillars: ['Security', 'Facilities'],
  short: 'Supplier fault day',
  name: 'When a supplier fault reaches the operating room',
  setting: 'Operating rooms, clinical hosts, vendor access paths and a supplier outside the hospital',
  situation: 'On July 19, 2024 a faulty vendor update suspended procedures requiring anesthesia at MSK, and three disclosed data incidents began at vendors.',
  personas: ['Chief digital officer', 'Security operations lead', 'Perioperative leadership', 'Clinical engineering', 'Network operations', 'Clinical operations administrator on call'],
  vision: "Hypothesis to validate: when a supplier incident lands, one view shows that supplier's accounts, connections and affected hosts, and a named MSK approver signs each containment step. It would not have prevented a faulty third-party software update. Modeled, not measured.",
  legacy: {
    banner: 'On July 19, 2024, during a global outage caused by a faulty vendor software update, procedures requiring anesthesia were suspended at MSK [STAT 2024]. It was not an attack, and MSK has not published how long the pause lasted or how many procedures were affected.',
    strip: 'Today: scope is pieced together from separate consoles [H]',
    who: 'A supplier incident on an operating day (illustrative)',
    silos: [
      ['Service desk', 'calls as they come in [H]', '', 'phone'],
      ['Endpoint tools', 'host by host [H]', '', 'monitor'],
      ['Network tools', 'connections and logs [H]', '', 'switch'],
      ['Vendor status page', "the supplier's own account [H]", 'p', 'globe'],
      ['Remote access records', 'VPN profiles and groups [H]', '', 'lock'],
      ['Firewall rule base', 'rules per vendor [H]', '', 'shield'],
    ],
    gaps: [
      'No single list shows what one supplier can reach [H]',
      'Containing one supplier takes several separate changes [H]',
      'Recovery is verified host by host [H]',
      'After-action evidence is rebuilt from many logs [H]',
      'The length of the July 2024 pause is not public',
    ],
    big: ['29,494', 'surgical cases in 2024 [MSK Statistical Profile 2024]'],
    recap: 'A supplier fault reaches clinical hosts, and clinical leaders decide whether to pause or resume while the technical picture is still forming.',
  },
  tobe: {
    banner: "Hypothesis to validate: Inventory, identity and log data are joined in one AI Canvas investigation, so one supplier's connections, accounts and affected hosts appear together. A named MSK approver signs each containment step, and clinicians decide the restart.",
    strip: 'AI Canvas, Inventory, Cisco Identity, Secure Access, ISE',
    who: 'A supplier incident on an operating day (illustrative)',
    console: {
      title: 'Cloud Control | supplier scope',
      body: 'One scope for one supplier: its accounts, its connections and the hosts it reaches, by site. It would not have prevented a faulty third-party update. Modeled.',
      foot: 'Pause and restart stay clinical decisions',
      rows: [
        ['Sources merged to find scope', '4 or more', '1 investigation', 0, 'canvas'],
        ['What the supplier can reach', 'known in pieces', 'one list', 0, 'lock'],
        ['Containment step', 'several changes', 'approved by a named person', 1, 'person'],
        ['Recovery check', 'host by host', 'queried across sites', 2, 'server'],
        ['After-action record', 'rebuilt later', 'scope, actions, approvals', 2, 'doc'],
      ],
    },
    stays: "Downtime procedures and the decision to pause or resume care stay with MSK clinical leadership, the supplier's software and its fix with the supplier, and breach notification with MSK privacy and legal.",
    recap: [
      'One view of what a supplier touches, and a named approval before its access is restricted.',
      'Outcomes are modeled, not measured. Nothing here would have prevented the faulty update of July 2024.',
    ],
  },
  hops: {
    legacy: [
      ['A supplier', 'fault or breach', 'cloud'],
      ['Vendor access paths', 'several owners', 'lock'],
      ['Clinical hosts', 'checked one by one', 'server'],
      ['Operating rooms', 'procedures paused', 'monitor'],
    ],
    tobe: [
      ['Inventory', 'affected hosts and sites', 'board'],
      ['Cisco Identity', "the supplier's accounts", 'badge'],
      ['AI Canvas', 'one scope', 'canvas'],
      ['Named approver', 'security operations lead', 'person'],
    ],
  },
  pathNote: { legacy: 'Scope is merged on a call [H]', tobe: 'One scope, one approval per containment step (modeled)' },
  outcomes: {
    legacy: [
      ['Jul 2024', 'the 19th: procedures requiring anesthesia suspended [STAT 2024]', 'S'],
      ['29,494', 'surgical cases in 2024 [MSK Statistical Profile 2024]', 'S'],
      ['3', 'data incidents that began at vendors [MSK notices 2020 to 2023]', 'S'],
    ],
    tobe: [
      ['1 scope', 'one supplier, its accounts and the hosts it reaches (modeled)', 'H'],
      ['1 approval', 'by a named MSK approver for each containment step', 'H'],
      ['1 record', 'of scope, actions and approvals for the review (modeled)', 'H'],
    ],
  },
  kpis: ['Time to know which clinical areas are affected', 'Time to list what one supplier can reach', 'Time to confirm an area is safe to restart', 'Containment steps with a recorded approval'],
  ask: 'On July 19, 2024, how long did it take to know which clinical areas were affected and when it was safe to restart?',
  tiles: [
    { l: 'Procedures requiring anesthesia suspended [STAT 2024]', a: 'Jul 19, 2024', b: 'Jul 19, 2024', tag: 'S' },
    { l: 'Surgical cases, 2024 [MSK Statistical Profile 2024]', a: '29,494', b: '29,494', tag: 'S' },
    { l: 'Nuance MOVEit notice; MSK systems not affected [MSK 2023]', a: 'Sept 2023', b: 'Sept 2023', tag: 'S' },
    { l: 'Accellion vulnerability; MSK IT systems not involved [MSK 2021]', a: 'Jan 2021', b: 'Jan 2021', tag: 'S' },
    { l: 'Blackbaud incident, on the vendor network [MSK 2020]', a: 'Jul 2020', b: 'Jul 2020', tag: 'S' },
    { l: 'Sources merged to find scope', a: '4 or more', b: '1 investigation', tag: 'H' },
    { l: 'Approval before supplier access is restricted', a: 'Per team', b: '1 named approver', tag: 'H' },
    { l: 'Floor plan, generic, not a real MSK layout or equipment placement', a: 'Illustrative', b: 'Illustrative', tag: 'I' },
  ],
  scene: {
    decor: 'msk_supplier', // floor (x 20 to 260), dc (270 to 530), ext (540 to 720)
    pos: {
      or: [144, 156], lead: [192, 296], sec: [340, 294], hosts: [405, 170], acc: [466, 290], sup: [630, 118],
      inv: [110, 418], cid: [280, 418], canvas: [450, 418], appr: [620, 418],
    },
  },
  narr: {
    subtitle: "MSK's public incident record is mostly about suppliers: a faulty vendor update suspended procedures needing anesthesia in July 2024, and three data incidents began at vendors.",
    caveat: "All 'with Cisco' beats are hypotheses to validate. July 2024 was a faulty software update, not an attack, and nothing here would have prevented it. The length of the pause is not public. Outcomes are modeled.",
    nodes: [
      n('sup', 'cloud', 'A supplier', ['Software and remote access', 'Third party', 'Updates, VPN, file transfer']),
      n('acc', 'lock', 'Vendor access paths', ['What the supplier reaches', 'Several owning teams', 'Firewall, VPN, groups, keys']),
      n('hosts', 'server', 'Clinical hosts', ['Workstations and servers', 'Clinical engineering and IT', 'Checked host by host']),
      n('or', 'monitor', 'Operating rooms', ['Procedures need live systems', 'Perioperative teams', 'Anesthesia workstations']),
      n('lead', 'people', 'Clinical leaders', ['Pause or resume care', 'Clinical operations', 'Waiting on IT facts']),
      n('sec', 'eye', 'Security and IT teams', ['Piece the scope together', 'Desk, endpoint, network', 'Separate consoles and lists']),
      n('inv', 'board', 'Inventory', ['Affected hosts and sites', 'One asset view', 'Joined with log data'], true),
      n('cid', 'badge', 'Cisco Identity', ["The supplier's accounts", 'Identity posture', 'Groups and sessions'], true),
      n('canvas', 'canvas', 'AI Canvas', ['One scope, one page', 'Security, network, biomed', 'Connections, accounts, hosts'], true),
      n('appr', 'person', 'Security operations lead', ['A named MSK approver', 'Clinical admin on call', 'L3: execute after approve'], true),
    ],
    zones: [
      { id: 'floor', label: 'Perioperative floor', hidden: false, cisco: false },
      { id: 'dc', label: 'Clinical systems', hidden: false, cisco: false },
      { id: 'ext', label: 'Outside: the supplier', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true },
    ],
    links: [k('sup', 'acc'), k('acc', 'hosts'), k('hosts', 'or', 0.1), k('lead', 'or'), k('sec', 'hosts', 0.1), k('sec', 'acc', 0.1), k('inv', 'hosts'), k('cid', 'acc'), k('inv', 'canvas', -0.42), k('cid', 'canvas'), k('canvas', 'lead', 0.1), k('canvas', 'appr'), k('appr', 'acc', 0.12)],
    steps: [
      {
        phase: 'today', title: 'The first hour is spent finding scope',
        say: s(
          "When a supplier's fault or breach lands, the first question is which clinical areas are affected, and the answer arrives slowly.",
          "Scope is pieced together from service desk calls, endpoint tools, network tools and the vendor's own status page.",
          'Engineers pull device lists, connection logs and vendor access records from separate consoles to see which hosts and sites are touched.',
        ),
        n: { sup: 'warn' }, l: { 'sup-acc': 'ok', 'acc-hosts': 'ok', 'hosts-or': 'ok', 'lead-or': 'ok' },
        label: { sup: 'Incident at the supplier' },
        facts: [f('29,494', 'surgical cases in 2024', MSK_PROFILE)],
      },
      {
        phase: 'today', title: 'Vendor connections are known in pieces',
        say: s(
          'A hospital depends on many suppliers, and no single list shows what each one can reach.',
          'Remote access, file transfer and cloud integrations are owned by different teams, so containing one supplier takes several separate changes.',
          'Firewall rules, VPN profiles, identity groups and API keys for one vendor live in different systems with different owners.',
        ),
        n: { acc: 'unknown', hosts: 'unknown' }, l: { 'sup-acc': 'unknown', 'acc-hosts': 'unknown', 'sec-hosts': 'unknown', 'sec-acc': 'unknown' },
        clock: { label: 'Time to know the scope', mode: 'run' },
        callout: { node: 'sec', text: 'No single list shows what this supplier can reach.' },
        facts: [f('Sept 2023', "notice of a Nuance MOVEit incident that did not affect MSK's own systems", 'MSK 2023'), f('Jan 2021', "Accellion file-sharing vulnerability; MSK's own IT systems were not involved", 'MSK 2021')],
      },
      {
        phase: 'today', title: 'Care decisions wait on IT facts',
        say: s(
          'Clinical leaders decide whether to pause or resume procedures while the technical picture is still forming.',
          'Downtime procedures start on judgement. Confirmation that systems are safe to use again comes area by area.',
          'Recovery is verified host by host, and evidence for the after-action review is rebuilt later from many logs.',
        ),
        n: { or: 'down' }, l: { 'hosts-or': 'down', 'lead-or': 'pending' },
        label: { or: 'Procedures paused' },
        facts: [f('Jul 19, 2024', 'procedures requiring anesthesia were suspended at MSK during the global outage', 'STAT 2024')],
      },
      {
        phase: 'cisco', title: 'One view of what the supplier touches',
        say: s(
          'Hypothesis: one shared view could show which sites, systems and clinical areas a supplier incident touches within minutes.',
          'Hypothesis: security, network and clinical engineering teams would work one investigation instead of merging separate scopes on a call.',
          "Hypothesis: Inventory, identity and log data would be joined so one vendor's connections, accounts and affected hosts appear together.",
        ),
        show: ['cc', 'inv', 'cid', 'canvas'], n: { acc: 'warn', hosts: 'warn', or: 'warn', inv: 'ok', cid: 'ok', canvas: 'ok' },
        label: { sup: '', or: '' },
        l: { 'sup-acc': 'warn', 'acc-hosts': 'warn', 'hosts-or': 'warn', 'sec-hosts': 'off', 'sec-acc': 'off', 'inv-hosts': 'ok', 'cid-acc': 'ok', 'inv-canvas': 'ok', 'cid-canvas': 'ok' },
        clock: { label: '', mode: 'hide' },
        callout: { node: 'sup', text: 'Modeled scope: one supplier, its accounts and the hosts it reaches.' },
      },
      {
        phase: 'cisco', title: 'A person approves containment',
        say: s(
          'Hypothesis: nothing that could interrupt care, such as cutting supplier access, would run without a named approver.',
          'Hypothesis: the workflow would list the clinical services that depend on the supplier before restricting its access.',
          'Hypothesis: the restriction would execute in the access and identity controls that own it, logged and reversible.',
        ),
        show: ['appr'], n: { appr: 'pending' }, l: { 'canvas-appr': 'pending' },
        modal: {
          title: 'Restrict supplier access',
          lines: [
            "Suspend one supplier's remote access and data transfer until it confirms containment.",
            'Approver: MSK security lead (to confirm)',
            'Trust level: L3, execute after approve',
            'Executes in: Secure Access, ISE (hypothesis)',
          ],
          button: 'Approve',
        },
      },
      {
        phase: 'cisco', title: 'Faster scope, clearer restart (modeled)',
        say: s(
          'Hypothesis: clinical leaders would get a current list of affected and recovered areas sooner, supporting pause and restart decisions. Modeled, not measured.',
          'Hypothesis: one record of scope, actions and approvals would serve the after-action review and any regulatory notification.',
          'Modeled, not measured: recovery checks would be queried across hosts and sites at once. This would not have prevented a faulty third-party software update.',
        ),
        n: { appr: 'ok', acc: 'ok', hosts: 'ok', or: 'ok' }, l: { 'canvas-appr': 'ok', 'appr-acc': 'ok', 'sup-acc': 'off', 'acc-hosts': 'ok', 'hosts-or': 'ok', 'lead-or': 'ok', 'canvas-lead': 'ok' },
        label: { acc: 'Supplier access suspended', or: 'Clinicians decide restart', hosts: 'Checked across sites at once', lead: 'Current list of areas' },
        chips: [['AI Canvas', 'GA (US)'], ['Inventory', 'GA (US)'], ['Cisco Identity', 'GA (US)'], ['Secure Access, ISE', 'GA (US)']],
      },
    ],
  },
};
