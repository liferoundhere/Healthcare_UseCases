// Account use case N1 (NYULH edition only): new hospitals and hubs, one operating standard.
// Sources: research/10-account-nyu-langone.md (section G1) and research/data/account-nyu-langone.json.
// Narrative converted from experience/src/story/accounts.ts. Floor plan reused: "wan". See atlas/AUTHORING.md.
const Q3 = 'NYU Langone Q3 report 2026';
const n = (id, icon, title, sub, hidden = false) => ({ id, icon, title, sub: { exec: sub[0], dir: sub[1], eng: sub[2] }, hidden, r: 30 });
const k = (a, b, bend = 0) => ({ id: `${a}-${b}`, a, b, bend });
const s = (exec, dir, eng) => ({ exec, dir, eng });
const f = (v, l, src) => ({ v, l, s: src });

export default {
  id: 'nyu-new-sites-one-standard',
  code: 'N1',
  editions: ['nyulh'],
  category: 'Account',
  pillars: ['Facilities', 'Security'],
  short: 'New sites',
  name: 'New hospitals and hubs, one operating standard',
  setting: 'A new ambulatory hub, a merged hospital and the system standard they must both reach',
  situation: 'A merged hospital and three hubs opening within weeks must all reach one network and security baseline.',
  personas: ['CIO', 'Network change owner', 'CISO', 'Clinical operations lead for the site', 'Facilities and construction lead'],
  vision: 'Hypothesis to validate: each new or merged site is compared with the system standard in one view before the first patient arrives, and a named person approves every remediation. Modeled, not measured.',
  legacy: {
    banner: 'Manhasset and Brooklyn hubs are expected in November 2026 and West Palm Beach in December 2026 [Q3 report 2026]. Each opening is typically run as its own project by four teams with four trackers [H].',
    strip: 'Today: four teams, four trackers, readiness reconciled by hand [H]',
    who: 'Week before a hub opens (sim)',
    silos: [
      ['Wireless survey', 'one site at a time [H]', '', 'wifi'],
      ['Firewall change list', 'security team tracker [H]', '', 'shield'],
      ['Clinical device build', 'application team list [H]', '', 'monitor'],
      ['Biomedical inventory', 'separate system [H]', '', 'pump'],
      ['Inherited asset list', 'from the merged hospital [H]', 'p', 'doc'],
      ['Bridge call', 'day-one problems [H]', '', 'phone'],
    ],
    gaps: [
      'Drift from the reference design is found by sampling [H]',
      'The inventory of a merged hospital takes months to establish [H]',
      'No single view spans WAN, wireless, identity and the application [H]',
      'Readiness is reassembled by hand for each opening [H]',
    ],
    big: ['3 hubs', 'expected to open in November and December 2026 [Q3 report 2026]'],
    recap: 'Three hubs open within weeks, a merged hospital is still being brought to the standard, and readiness is assembled by hand.',
  },
  tobe: {
    banner: 'Hypothesis to validate: Topology and Inventory show each site against the reference design, ThousandEyes tests the path to the record, and a named NYU Langone approver signs each remediation. Modeled.',
    strip: 'Topology, Inventory, ThousandEyes, AI Canvas, audit log',
    who: 'Week before a hub opens (sim)',
    console: {
      title: 'Cloud Control | site readiness',
      body: 'One readiness view per site, fed by whichever campus, branch and WAN controllers are connected. Which controllers those are is a discovery question.',
      foot: 'Modeled. No public source names the network vendor.',
      rows: [
        ['Readiness trackers per opening', '4 by hand [H]', '1 standing view', 3, 'canvas'],
        ['Drift from the reference design', 'found by sampling [H]', 'listed per site', 3, 'topology'],
        ['Merged hospital inventory', 'not yet known [H]', 'gaps listed', 3, 'doc'],
        ['Remediation at a clinical area', 'per team process [H]', 'approved by a named person', 4, 'person'],
        ['Record of the change', 'several trackers [H]', 'one audit log entry', 5, 'check'],
      ],
    },
    stays: 'EHR build and go-live, biomedical device onboarding, construction and commissioning, and the change advisory process stay with NYU Langone and its existing vendors.',
    recap: [
      'Hypothesis to validate: one readiness view per site against the standard, with a named approver for each remediation.',
      'Modeled, not measured: each opening reuses the same checks. No public source says NYU Langone has bought any Cisco product.',
    ],
  },
  hops: {
    legacy: [['New hub', 'its own checklist', 'building'], ['Four teams', 'four trackers', 'people'], ['Merged hospital', 'inventory unknown', 'router'], ['Bridge call', 'on day one', 'phone']],
    tobe: [['Topology, Inventory', 'each site in one view', 'topology'], ['ThousandEyes', 'path to the record', 'eye'], ['AI Canvas', 'drift listed', 'canvas'], ['Approval', 'a named person', 'person']],
  },
  pathNote: { legacy: 'Readiness assembled by hand for each site [H]', tobe: 'One view, one approval, one record (modeled)' },
  outcomes: {
    legacy: [
      ['306 beds', 'NYU Langone Suffolk, merged March 1, 2025 [Q3 report 2026]', 'S'],
      ['3 hubs', 'expected to open November and December 2026 [Q3 report 2026]', 'S'],
      ['4 trackers', 'to reconcile before one opening', 'H'],
    ],
    tobe: [
      ['1 view', 'of each site against the standard (modeled)', 'H'],
      ['1 approver', 'named for each remediation (modeled)', 'H'],
      ['Same checks', 'reused at every opening (modeled)', 'I'],
    ],
  },
  kpis: ['Days to confirm a site matches the standard before opening', 'Devices at a merged site not yet in the inventory', 'Day-one bridge calls per opening', 'Time to name the faulty layer on day one'],
  ask: 'For the Manhasset, Brooklyn and West Palm Beach openings, how do you confirm each site matches the system network and security standard before day one, and how long did that take at Suffolk?',
  tiles: [
    { l: 'Beds at NYU Langone Suffolk, merged March 1, 2025 [Q3 report 2026]', a: '306', b: '306', tag: 'S' },
    { l: 'Melville property for a new inpatient campus [Q3 report 2026]', a: '45 acres', b: '45 acres', tag: 'S' },
    { l: 'Manhasset hub with eight operating rooms [Q3 report 2026]', a: '162k sq ft', b: '162k sq ft', tag: 'S' },
    { l: 'Suffolk inpatient pavilion approved August 2026 [RiverheadLOCAL 2026]', a: '$650M', b: '$650M', tag: 'S' },
    { l: 'Readiness trackers per opening', a: '4', b: '1 view', tag: 'H' },
    { l: 'Drift from the reference design', a: 'Sampled', b: 'Listed per site', tag: 'H' },
  ],
  scene: {
    decor: 'wan',
    zoneLabels: { clin: 'New hub and merged hospital', parent: 'NYU Langone Health system' },
    labels: { 'Clinic floor': 'New ambulatory hub', 'Back office': 'Merged hospital', 'The circuit': 'WAN circuits', 'Parent data center': 'System data center', 'Parent network and SOC': 'Network and readiness teams' },
    hide: ['exam-bed'],
    pos: {
      hub: [84, 140], clin: [190, 140], merged: [110, 292],
      ehr: [535, 130], std: [465, 296], teams: [650, 296],
      topo: [110, 418], te: [280, 418], canvas: [450, 418], appr: [620, 418],
    },
  },
  narr: {
    subtitle: 'A merged hospital, a 45-acre future campus and three ambulatory hubs opening within weeks of each other must all reach the same record, network and security baseline.',
    caveat: "No public source names NYU Langone's network vendor or says it has bought any Cisco product; every with-Cisco beat is a hypothesis to validate and the outcome is modeled, not measured.",
    nodes: [
      n('hub', 'building', 'New ambulatory hub', ['Opens within weeks', 'Its own go-live checklist', 'Templates staged per site']),
      n('clin', 'badge', 'Clinician at the hub', ['First to notice', 'Day-one care team', 'EHR client on new Wi-Fi']),
      n('merged', 'router', 'Merged hospital network', ['Arrived with its history', 'Inherited gear and vendors', 'Flat VLANs, unknown devices']),
      n('std', 'doc', 'Reference design', ['The system standard', 'Network, security baseline', 'Templates and policy maps']),
      n('ehr', 'server', 'Electronic health record', ['One record, every site', 'Clinical application team', 'Reached over the WAN']),
      n('teams', 'people', 'Readiness teams', ['Four teams, four trackers', 'IT, security, apps, plant', 'Lists reconciled by hand']),
      n('topo', 'topology', 'Topology and Inventory', ['Every site, one view', 'Devices and policy gaps', 'Fed by connected controllers'], true),
      n('te', 'eye', 'ThousandEyes', ['Tests toward the record', 'Experience per site', 'Path tests to EHR'], true),
      n('canvas', 'canvas', 'AI Canvas', ['One readiness investigation', 'All teams, one page', 'Drift against the template'], true),
      n('appr', 'person', 'Network change owner', ['A named person decides', 'Existing change process', 'L3: execute after approve'], true),
    ],
    zones: [
      { id: 'clin', label: 'New hub and merged hospital', hidden: false, cisco: false },
      { id: 'parent', label: 'NYU Langone Health system', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true },
    ],
    links: [k('clin', 'hub'), k('hub', 'ehr'), k('merged', 'ehr', 0.1), k('std', 'hub'), k('std', 'merged', -0.1), k('teams', 'hub', 0.1), k('teams', 'merged'), k('topo', 'hub'), k('topo', 'merged', 0.1), k('te', 'ehr'), k('topo', 'canvas'), k('te', 'canvas', 0.1), k('canvas', 'appr'), k('appr', 'hub', 0.12)],
    steps: [
      {
        phase: 'today', title: 'Every opening is its own project',
        say: s(
          'Each new site is brought up by separate network, security, clinical application and facilities teams, each with its own checklist.',
          'Go-live readiness is assembled by hand from the wireless survey, the firewall change list, the clinical device build and the biomedical inventory.',
          'Switch templates, wireless networks, VLAN-to-policy mappings and WAN circuits are staged per site. Drift from the reference design is found by sampling.',
        ),
        n: { hub: 'ok', clin: 'ok', merged: 'ok', std: 'ok', ehr: 'ok', teams: 'ok' },
        l: { 'clin-hub': 'ok', 'hub-ehr': 'ok', 'merged-ehr': 'ok', 'std-hub': 'ok', 'teams-hub': 'ok' },
        facts: [f('162k sq ft', 'Manhasset hub with eight operating rooms, expected November 2026', Q3), f('45 acres', 'Melville property acquired in May 2026 for the new Long Island inpatient campus', Q3)],
      },
      {
        phase: 'today', title: 'Inherited networks carry unknowns',
        say: s(
          'A merged hospital arrives with its own equipment, vendors and exceptions, so the true inventory takes months to establish.',
          'Asset lists from an acquired site rarely match what is actually connected, which slows segmentation and audit readiness.',
          'Unknown endpoints, flat VLANs and overlapping address space have to be discovered from switch tables, DHCP logs and walk-throughs.',
        ),
        n: { merged: 'unknown' }, l: { 'std-merged': 'unknown', 'teams-merged': 'warn' },
        label: { merged: 'Inventory not yet known' },
        facts: [f('306 beds', 'NYU Langone Suffolk in Patchogue, merged on March 1, 2025', Q3), f('$650M', 'seven-story Suffolk inpatient pavilion approved by Brookhaven Town Board, August 2026', 'RiverheadLOCAL 2026')],
      },
      {
        phase: 'today', title: 'Day-one problems go to a bridge call',
        say: s(
          'When a clinician at a new hub reports a slow record, several teams join a call and each checks its own console.',
          'Time to identify the faulty layer depends on who is on the call. No single view spans WAN, wireless, identity and the application.',
          'Engineers correlate timestamps by hand across controller logs, firewall logs, circuit monitors and EHR client traces.',
        ),
        n: { hub: 'warn' }, l: { 'clin-hub': 'warn', 'hub-ehr': 'unknown', 'teams-hub': 'unknown' },
        clock: { label: 'Time to name the faulty layer', mode: 'run' },
        callout: { node: 'teams', text: 'Four teams on the call. Each checks its own console.' },
      },
      {
        phase: 'cisco', title: 'One readiness view per site (hypothesis)',
        say: s(
          "Hypothesis to validate: one shared view shows each new site's network, security and experience readiness against the standard before the first patient arrives.",
          'Hypothesis to validate: Topology and Inventory would show every site, device and policy gap in one place, fed by whichever campus, branch and WAN controllers are connected.',
          'Hypothesis to validate: inventories from connected Catalyst Center, Meraki and SD-WAN controllers plus ThousandEyes tests to the EHR would be joined in AI Canvas to flag template drift.',
        ),
        show: ['cc', 'topo', 'te', 'canvas'], n: { merged: 'warn', topo: 'ok', te: 'ok', canvas: 'ok' },
        label: { merged: 'Gaps listed against standard' },
        l: { 'hub-ehr': 'ok', 'std-merged': 'off', 'teams-hub': 'off', 'teams-merged': 'off', 'topo-hub': 'warn', 'topo-merged': 'warn', 'te-ehr': 'ok', 'topo-canvas': 'ok', 'te-canvas': 'ok' },
        clock: { label: '', mode: 'hide' },
        callout: { node: 'hub', text: 'Modeled: hub clinical ports differ from the reference policy.' },
      },
      {
        phase: 'cisco', title: 'A person approves each remediation',
        say: s(
          'A change that could affect a clinical area waits, with its evidence, for a named NYU Langone approver.',
          'The network change owner approves inside the existing change process. Approval, evidence and result go to the audit log.',
          'The template push is shown as a diff with affected ports and endpoints. The domain controller executes it only after approval.',
        ),
        show: ['appr'], n: { appr: 'pending' }, l: { 'canvas-appr': 'pending' },
        modal: {
          title: 'Apply the standard policy at the new hub',
          lines: [
            "Push the reference policy to the hub's clinical ports after hours.",
            'Approver: network change owner',
            'Trust level: L3, execute after approve',
            'Executes in: campus controller in place (vendor to confirm)',
          ],
          button: 'Approve',
        },
      },
      {
        phase: 'cisco', title: 'More repeatable openings (modeled)',
        say: s(
          'Modeled, not measured: readiness reconciliation that takes weeks by hand becomes a standing view, with fewer day-one bridge calls.',
          'Modeled outcome: each opening reuses the same checks, so the fifth site is audited the same way as the first.',
          'Modeled outcome: drift is detected continuously from controller data rather than by sampling, and every change carries a linked approval record.',
        ),
        n: { appr: 'ok', hub: 'ok' }, l: { 'canvas-appr': 'ok', 'appr-hub': 'ok', 'topo-hub': 'ok', 'clin-hub': 'ok' },
        chips: [['Topology, Inventory', 'GA (US)'], ['AI Canvas', 'GA (US)'], ['ThousandEyes', 'GA (US)'], ['Audit log', 'GA (US)']],
      },
    ],
  },
};
