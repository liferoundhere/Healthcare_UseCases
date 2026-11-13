// Account use case N3 (NYULH edition only): stopping a help desk identity attack.
// Sources: research/10-account-nyu-langone.md (section G3) and research/data/account-nyu-langone.json.
// Narrative converted from experience/src/story/accounts.ts. Floor plan reused: "security". See atlas/AUTHORING.md.
// The scenario is illustrative: no public record of such an attack at NYU Langone was found.
const Q3 = 'NYU Langone Q3 report 2026';
const n = (id, icon, title, sub, hidden = false) => ({ id, icon, title, sub: { exec: sub[0], dir: sub[1], eng: sub[2] }, hidden, r: 30 });
const k = (a, b, bend = 0) => ({ id: `${a}-${b}`, a, b, bend });
const s = (exec, dir, eng) => ({ exec, dir, eng });
const f = (v, l, src) => ({ v, l, s: src });

export default {
  id: 'nyu-help-desk-identity-attack',
  code: 'N3',
  editions: ['nyulh'],
  category: 'Account',
  pillars: ['Security'],
  short: 'Help desk attack',
  name: 'Stopping a help desk identity attack',
  setting: 'A phone call to the help desk, the identity and access systems behind it, and a clinician on shift',
  situation: 'A caller posing as a clinician gets a credential reset and signs in. Illustrative scenario.',
  personas: ['Security operations lead', 'Identity and access lead', 'Service desk manager', 'Network operations lead', 'Clinical supervisor'],
  vision: 'Hypothesis to validate: the reset, the sign-in, the device and the network session of one suspect account sit on one timeline, and a named security lead approves containment. Modeled, not measured.',
  legacy: {
    banner: 'The Q3 2026 disclosure lists "robust user verification to prevent social engineering attacks on the Help Desk" as a priority. The ticket, the identity log and the network session of one such call typically sit in separate tools [H].',
    strip: 'Today: one caller, four tools, four user identifiers [H]',
    who: 'Illustrative scenario, weekday evening (sim)',
    silos: [
      ['Service desk system', 'the ticket [H]', '', 'chat'],
      ['Identity provider', 'reset and enrollment [H]', '', 'key'],
      ['SIEM', 'detections [H]', '', 'eye'],
      ['Network access control', 'session by MAC [H]', '', 'lock'],
      ['Shift schedule', 'who is on duty [H]', '', 'clock'],
      ['Incident report', 'written afterwards [H]', '', 'doc'],
    ],
    gaps: [
      'A reset, a new device and a sign-in are separate queries with different identifiers [H]',
      'No quick way to see whether the account owner is on shift [H]',
      'Quarantine differs at each control point and needs its own change record [H]',
      'The incident timeline is rebuilt from exports after the event [H]',
    ],
    big: ['54,000+', 'staff members whose identities and devices are in scope [Q3 report 2026]'],
    recap: 'One phone call leaves evidence in four tools, and disabling a clinician mid-shift is a judgment call.',
  },
  tobe: {
    banner: 'Hypothesis to validate: Cisco Identity signals and Federated Search put the reset, the device and the session on one AI Canvas timeline. The security lead on call approves containment of one account and one device. Modeled.',
    strip: 'AI Canvas, Cisco Identity, Federated Search, audit log',
    who: 'Illustrative scenario, weekday evening (sim)',
    console: {
      title: 'Cloud Control | suspect identity',
      body: 'One timeline keyed to one user and one device, read by security, identity and network teams. Which identity, SIEM and access products are in place is a discovery question.',
      foot: 'Modeled. No such attack at NYU Langone is on public record.',
      rows: [
        ['Queries to rebuild one timeline', 'four, by hand [H]', '1 timeline', 3, 'canvas'],
        ['Is the owner on shift', 'not known quickly [H]', 'shown with the evidence', 3, 'badge'],
        ['Containment decision', 'analyst judgment [H]', 'approved by a named lead', 4, 'person'],
        ['Scope of the action', 'varies by console [H]', 'one account, one device', 5, 'lock'],
        ['Incident report', 'written afterwards [H]', 'generated first draft', 5, 'doc'],
      ],
    },
    stays: 'The help desk verification procedure, the identity provider, HR and credentialing records, incident command and any regulatory notification stay with NYU Langone.',
    recap: [
      'Hypothesis to validate: one identity timeline for the suspect account, and a named security lead who approves containment.',
      'Modeled, not measured: containment starts sooner and the report begins as a first draft. The scenario is illustrative.',
    ],
  },
  hops: {
    legacy: [['Phone call', 'caller not verified', 'phone'], ['Help desk', 'resets the credential', 'chat'], ['Identity provider', 'new device enrolled', 'key'], ['Network access', 'session admitted', 'lock']],
    tobe: [['Cisco Identity', 'user and device', 'badge'], ['AI Canvas', 'one timeline', 'canvas'], ['Approval', 'security lead on call', 'person'], ['Audit log', 'who approved what', 'doc']],
  },
  pathNote: { legacy: 'Four tools, four identifiers [H]', tobe: 'One timeline, one approver (modeled)' },
  outcomes: {
    legacy: [
      ['54,000+', 'staff identities and devices in scope [Q3 report 2026]', 'S'],
      ['330+', 'ambulatory locations from which staff sign in [Q3 report 2026]', 'S'],
      ['4 queries', 'to rebuild the timeline of one account', 'H'],
    ],
    tobe: [
      ['1 timeline', 'reset, device, sign-in and session (modeled)', 'H'],
      ['1 approver', 'before a session is revoked (modeled)', 'H'],
      ['First draft', 'of the incident report, generated (modeled)', 'I'],
    ],
  },
  kpis: ['Time from a suspicious reset to seeing what the identity touched', 'Time from first signal to a contained account', 'Consoles used per containment', 'Hours to write the incident report'],
  ask: 'Your disclosure names help desk social engineering as a threat: when a reset looks suspicious, how long does it take to see what that identity then touched on the network?',
  tiles: [
    { l: 'Staff members in scope [Q3 report 2026]', a: '54,000+', b: '54,000+', tag: 'S' },
    { l: 'Doctors on the professional staff [Q3 report 2026]', a: '6,537', b: '6,537', tag: 'S' },
    { l: 'Ambulatory locations [Q3 report 2026]', a: '330+', b: '330+', tag: 'S' },
    { l: 'Queries for one timeline', a: '4', b: '1 timeline', tag: 'H' },
    { l: 'Containment approval', a: 'Judgment call', b: 'Named lead', tag: 'H' },
    { l: 'Incident report', a: 'By hand', b: 'First draft', tag: 'I' },
  ],
  scene: {
    decor: 'security',
    zoneLabels: { floor: 'Clinical floor and help desk', dc: 'Data center and SOC', ext: 'Outside the hospital' },
    labels: { 'Room 412': 'Patient room' },
    pos: {
      rn: [82, 132], desk: [160, 236], caller: [626, 190],
      idp: [336, 126], nac: [468, 172], soc: [342, 292], sys: [470, 292],
      cid: [110, 418], canvas: [365, 418], appr: [620, 418],
    },
  },
  narr: {
    subtitle: 'An attacker phones the help desk posing as a clinician, gets a credential reset and signs in; security, identity and network teams must join the evidence before clinical systems are reached.',
    caveat: "No public source names NYU Langone's identity, SIEM or firewall vendors, and we found no public record of such an attack there. The scenario is illustrative, every with-Cisco beat is a hypothesis to validate and the outcome is modeled.",
    nodes: [
      n('caller', 'phone', 'Caller posing as clinician', ['Asks for a reset', 'Social engineering', 'Unverified phone call']),
      n('desk', 'chat', 'Help desk', ['Resets the credential', 'Service desk', 'Ticket, no identity context']),
      n('idp', 'key', 'Identity provider', ['Issues the new sign-in', 'Identity team', 'Reset, then new device']),
      n('nac', 'lock', 'Network access control', ['Admits the new device', 'Network team', 'Session keyed by MAC']),
      n('sys', 'server', 'Clinical systems', ['What the attacker wants', 'Application owners', 'East-west traffic']),
      n('rn', 'badge', 'Clinician on shift', ['Real owner of account', 'May be mid-shift', 'Same username, new device']),
      n('soc', 'eye', 'SOC analyst', ['Rebuilds one timeline', 'Security operations', 'Four queries, four IDs']),
      n('cid', 'badge', 'Cisco Identity', ['Who and which device', 'Duo and ISE signals', 'Posture and session data'], true),
      n('canvas', 'canvas', 'AI Canvas', ['One identity timeline', 'Security, identity, network', 'Keyed to user and device'], true),
      n('appr', 'person', 'Security lead on call', ['A named person decides', 'Clinical supervisor informed', 'L3: execute after approve'], true),
    ],
    zones: [
      { id: 'floor', label: 'Clinical floor and help desk', hidden: false, cisco: false },
      { id: 'dc', label: 'Data center and SOC', hidden: false, cisco: false },
      { id: 'ext', label: 'Outside the hospital', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true },
    ],
    links: [k('caller', 'desk'), k('desk', 'idp'), k('idp', 'nac'), k('nac', 'sys'), k('rn', 'idp', 0.1), k('soc', 'desk', 0.1), k('soc', 'idp', -0.1), k('soc', 'nac', 0.12), k('cid', 'canvas'), k('canvas', 'idp'), k('canvas', 'nac', 0.1), k('canvas', 'appr'), k('appr', 'idp', 0.12), k('appr', 'nac', -0.12)],
    steps: [
      {
        phase: 'today', title: 'Signals sit in separate tools',
        say: s(
          'The help desk ticket, the identity log, the remote access session and the network record of one attack are held by different teams.',
          "Analysts pivot between the service desk system, the identity provider, the SIEM and network access control to rebuild one user's timeline.",
          'Correlating a password reset, a new device enrollment, an unusual sign-in location and east-west traffic means separate queries with different user identifiers.',
        ),
        n: { caller: 'ok', desk: 'ok', idp: 'ok', nac: 'ok', sys: 'ok', rn: 'ok', soc: 'ok' },
        l: { 'caller-desk': 'ok', 'desk-idp': 'ok', 'idp-nac': 'ok', 'nac-sys': 'ok', 'rn-idp': 'ok' },
        facts: [f('54,000+', 'staff members whose identities and devices are in scope', Q3), f('330+', 'ambulatory locations from which staff sign in', Q3)],
      },
      {
        phase: 'today', title: 'Containment is a judgment call',
        say: s(
          "Disabling a clinician's account in the middle of a shift can interrupt care, so analysts hesitate while they gather proof.",
          'There is no quick way to see whether the account belongs to someone on shift and which clinical systems the session has touched.',
          'Quarantine options differ at each control point, and each needs its own console and its own change record.',
        ),
        n: { caller: 'warn' },
        l: { 'caller-desk': 'warn', 'desk-idp': 'warn', 'soc-desk': 'unknown', 'soc-idp': 'unknown', 'soc-nac': 'unknown', 'rn-idp': 'unknown' },
        clock: { label: 'Time to contain one account', mode: 'run' },
        callout: { node: 'rn', text: 'Is the real owner on shift right now? Nobody can tell quickly.' },
        facts: [f('6,537', 'doctors on the professional staff, 2,051 of them in private practice', Q3)],
      },
      {
        phase: 'today', title: 'The report is written afterwards',
        say: s(
          'The incident summary for leadership is assembled by hand after the event.',
          'Evidence for the timeline is exported from several tools and reconciled in a document.',
          'Log retention and field naming differ by source, so the final timeline is rebuilt from exports.',
        ),
        l: { 'idp-nac': 'warn', 'nac-sys': 'warn' },
        label: { soc: 'Timeline from exports', sys: 'Did the session reach it?' },
      },
      {
        phase: 'cisco', title: 'One identity timeline (hypothesis)',
        say: s(
          'Hypothesis to validate: one shared view shows the reset, the sign-in, the device and the network activity for the suspect account.',
          'Hypothesis to validate: Duo and Cisco Identity signals, ISE session data and Splunk detections would appear in one investigation that security, identity and network teams all see.',
          'Hypothesis to validate: Federated Search would query identity, access and network logs where they live, keyed to one user and device, and AI Canvas would assemble the timeline.',
        ),
        show: ['cc', 'cid', 'canvas'], n: { idp: 'warn', nac: 'warn', cid: 'ok', canvas: 'ok' },
        label: { soc: '', sys: '' },
        l: { 'nac-sys': 'ok', 'rn-idp': 'ok', 'soc-desk': 'off', 'soc-idp': 'off', 'soc-nac': 'off', 'cid-canvas': 'ok', 'canvas-idp': 'ok', 'canvas-nac': 'ok' },
        clock: { label: '', mode: 'hide' },
        callout: { node: 'canvas', text: 'One timeline: reset, new device, sign-in, network session.' },
      },
      {
        phase: 'cisco', title: 'A named person approves containment',
        say: s(
          'Revocation or quarantine waits for the security lead. The clinical supervisor is told if the user is on shift.',
          'The approval, the approver and the action are recorded, and the action is limited to the one account and device.',
          'After approval the identity platform revokes the session and network access control quarantines the device, with a one-step rollback.',
        ),
        show: ['appr'], n: { appr: 'pending' }, l: { 'canvas-appr': 'pending' },
        modal: {
          title: 'Revoke sessions and quarantine one device',
          lines: [
            "Revoke the suspect account's sessions and restrict its new device.",
            'Approver: security operations lead on call',
            'Trust level: L3, execute after approve',
            'Executes in: identity provider and NAC (vendors to confirm)',
          ],
          button: 'Approve',
        },
      },
      {
        phase: 'cisco', title: 'Contained sooner, first draft written (modeled)',
        say: s(
          'Modeled, not measured: the time from first signal to a contained account falls, and the incident report starts as a generated first draft.',
          'Modeled outcome: analyst time moves from collecting evidence to judging it, which is the aim the disclosure itself states.',
          'Modeled outcome: one correlated record per incident, with linked approvals, replaces manual exports.',
        ),
        n: { appr: 'ok', idp: 'ok', nac: 'ok', caller: 'off' }, l: { 'canvas-appr': 'ok', 'appr-idp': 'ok', 'appr-nac': 'ok', 'idp-nac': 'ok', 'desk-idp': 'ok', 'caller-desk': 'off' },
        label: { nac: 'One device quarantined' },
        chips: [['AI Canvas', 'GA (US)'], ['Cisco Identity', 'GA (US)'], ['Federated Search', 'GA'], ['Audit log', 'GA (US)']],
      },
    ],
  },
};
