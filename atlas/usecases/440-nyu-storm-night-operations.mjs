// Account use case N4 (NYULH edition only): storm night, one view of plant and network.
// Sources: research/10-account-nyu-langone.md (section G4) and research/data/account-nyu-langone.json.
// Narrative converted from experience/src/story/accounts.ts. Floor plan: "nyulh_storm" in src/engine/46-decor-nyulh.js. See atlas/AUTHORING.md.
// The resilience program is published as a reference for other hospitals. This story must not imply a gap.
const n = (id, icon, title, sub, hidden = false) => ({ id, icon, title, sub: { exec: sub[0], dir: sub[1], eng: sub[2] }, hidden, r: 30 });
const k = (a, b, bend = 0) => ({ id: `${a}-${b}`, a, b, bend });
const s = (exec, dir, eng) => ({ exec, dir, eng });
const f = (v, l, src) => ({ v, l, s: src });

export default {
  id: 'nyu-storm-night-operations',
  code: 'N4',
  editions: ['nyulh'],
  category: 'Account',
  pillars: ['Facilities'],
  short: 'Storm night',
  name: 'Storm night: one view of plant and network',
  setting: 'The East River campus on a storm night: the central plant, one network closet and one inpatient unit',
  situation: 'A coastal storm threatens the East River campus. Facilities, network and clinical leaders need one picture.',
  personas: ['Hospital incident commander', 'Facilities and engineering lead', 'Network operations lead', 'Emergency management director', 'Nursing leadership'],
  vision: 'Hypothesis to validate: facilities, IT and clinical leaders read one picture of power, network and care areas during a storm, and the incident commander approves each step. Modeled, not measured.',
  legacy: {
    banner: 'After Hurricane Sandy in 2012 the campus was rebuilt, and in January 2025 its resiliency standards were published in the federal health care climate resilience toolkit [annual report 2025]. Plant and network are typically watched in separate rooms [H].',
    strip: 'Today: plant alarms and network alarms meet by phone [H]',
    who: 'Storm drill, night shift (sim)',
    silos: [
      ['Building management', 'plant alarms [H]', '', 'gear'],
      ['Generator and UPS panels', 'facilities screens [H]', '', 'plug'],
      ['Network monitoring', 'switches and circuits [H]', '', 'router'],
      ['Application health', 'IT operations [H]', '', 'server'],
      ['Riser drawings', 'paper and memory [H]', '', 'doc'],
      ['Phone, radio and chat', 'separate logs [H]', '', 'phone'],
    ],
    gaps: [
      'Plant alarms and network alarms are not on a common timeline [H]',
      'Which unit depends on which closet and power feed is held by a few staff [H]',
      'Deciding what to protect first relies on drawings and memory [H]',
      'Decisions made by phone and radio are hard to reconstruct later [H]',
    ],
    big: ['Jan 2025', 'resiliency standards published in the federal climate resilience toolkit [annual report 2025]'],
    recap: 'On a storm night the plant and the network are watched in separate rooms, and dependencies live in drawings.',
  },
  tobe: {
    banner: 'Hypothesis to validate: building and power telemetry is searched alongside network state and drawn on Topology, so an alarm shows the care area it puts at risk. The incident commander approves each step. Modeled; building system integration is unverified.',
    strip: 'AI Canvas, Topology, Machine Data Lake, Federated Search, audit log',
    who: 'Storm drill, night shift (sim)',
    console: {
      title: 'Cloud Control | storm night',
      body: 'One operating picture by building and floor for facilities, IT and clinical leaders. Whether the building systems can feed it is discovery work.',
      foot: 'Modeled. This story does not imply a gap in the resilience program.',
      rows: [
        ['Plant and network alarms', 'separate screens [H]', '1 timeline', 3, 'canvas'],
        ['Unit at risk from one alarm', 'drawings and memory [H]', 'drawn on the map', 3, 'topology'],
        ['Building and power data', 'facilities tools only [H]', 'searched where it lives', 3, 'database'],
        ['Step that affects a care area', 'agreed by phone [H]', 'approved by the commander', 4, 'person'],
        ['After-action record', 'interviews and exports [H]', 'one decision timeline', 5, 'doc'],
      ],
    },
    stays: 'Emergency management, incident command, the building management system, generators and switchgear, evacuation decisions and downtime procedures stay with NYU Langone and its facilities vendors.',
    recap: [
      'Hypothesis to validate: one operating picture of plant and network. Incident command approves each step.',
      'Modeled, not measured. Building system integration is unverified.',
    ],
  },
  hops: {
    legacy: [['Plant alarm', 'facilities screen', 'gear'], ['Phone call', 'to network operations', 'phone'], ['Riser drawings', 'which closet, which unit', 'doc'], ['Inpatient unit', 'risk not yet known', 'monitor']],
    tobe: [['Data Fabric search', 'plant and network data', 'database'], ['Topology', 'alarm on the map', 'topology'], ['AI Canvas', 'one picture', 'canvas'], ['Approval', 'incident commander', 'person']],
  },
  pathNote: { legacy: 'Two rooms, one phone line between them [H]', tobe: 'One picture, one approver (modeled)' },
  outcomes: {
    legacy: [
      ['About 300', 'patients evacuated in Hurricane Sandy [AP via CBS News 2012]', 'S'],
      ['59 days', 'until operating rooms and ICUs reopened [AP via NBC New York 2012]', 'S'],
      ['2 rooms', 'watch plant and network', 'H'],
    ],
    tobe: [
      ['1 picture', 'of plant and network (modeled)', 'H'],
      ['1 approver', 'the incident commander (modeled)', 'H'],
      ['1 record', 'of each decision (modeled)', 'I'],
    ],
  },
  kpis: ['Time from a plant alarm to knowing which units are at risk', 'Units with a mapped closet, riser and power feed', 'Hours to assemble the after-action review'],
  ask: 'Since the rebuild after Sandy, can your facilities command post and your network operations team see each other\'s alarms on one timeline during a storm drill?',
  tiles: [
    { l: 'Patients evacuated in Hurricane Sandy, 2012 [AP via CBS News 2012]', a: 'About 300', b: 'About 300', tag: 'S' },
    { l: 'Days before operating rooms and ICUs reopened [AP via NBC New York 2012]', a: '59', b: '59', tag: 'S' },
    { l: 'Estimated storm damage reported at the reopening [AP via NBC New York 2012]', a: '$1B', b: '$1B', tag: 'S' },
    { l: 'Resiliency standards in the federal toolkit [annual report 2025]', a: 'Jan 2025', b: 'Jan 2025', tag: 'S' },
    { l: 'Plant and network alarms', a: '2 rooms', b: '1 picture', tag: 'H' },
    { l: 'Decision record', a: 'Rebuilt later', b: '1 timeline', tag: 'I' },
  ],
  scene: {
    decor: 'nyulh_storm',
    pos: {
      unit: [134, 150], closet: [236, 146], noc: [124, 288],
      fac: [495, 302], power: [495, 154], storm: [673, 160],
      fabric: [110, 418], topo: [280, 418], canvas: [450, 418], appr: [620, 418],
    },
  },
  narr: {
    subtitle: 'A coastal storm threatens the East River campus; facilities, network and clinical leaders need the same picture of power, water, connectivity and the systems patients depend on.',
    caveat: "NYU Langone's resilience program is published as a reference for other hospitals; this story does not imply a gap. Built from public sources: every with-Cisco beat is a hypothesis to validate, any integration with its building systems is unverified and the outcome is modeled. The floor plan layout is illustrative and based on public descriptions of NYU Langone sites; rooms and equipment are not shown at real locations.",
    nodes: [
      n('storm', 'cloud', 'Coastal storm', ['Forecast for tonight', 'Outside the campus', 'Surge and wind warnings']),
      n('power', 'gear', 'Power and pumps', ['What the plant protects', 'Facilities', 'BMS, UPS, generator data']),
      n('fac', 'people', 'Facilities command post', ['Watches the plant', 'Facilities leads', 'Building alarms, own screens']),
      n('closet', 'router', 'Network closet', ['Feeds one inpatient unit', 'Campus network', 'Switches on one riser']),
      n('unit', 'monitor', 'Inpatient unit', ['Patients depend on it', 'Nursing leadership', 'Monitors, badges, carts']),
      n('noc', 'eye', 'Network operations', ['Watches circuits and servers', 'IT operations', 'Switch and circuit status']),
      n('fabric', 'database', 'Data Fabric search', ['Plant and network together', 'Building and power telemetry', 'Searched where it lives'], true),
      n('topo', 'topology', 'Topology', ['Alarm drawn on the map', 'By building and floor', 'Closets, risers, circuits'], true),
      n('canvas', 'canvas', 'AI Canvas', ['One operating picture', 'Facilities, IT, clinical', 'One timeline of decisions'], true),
      n('appr', 'person', 'Incident commander', ['Approves each step', 'Hospital incident command', 'L3: execute after approve'], true),
    ],
    zones: [
      { id: 'campus', label: 'East River campus', hidden: false, cisco: false },
      { id: 'plant', label: 'Central plant', hidden: false, cisco: false },
      { id: 'river', label: 'East River', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true },
    ],
    links: [k('storm', 'power'), k('power', 'closet'), k('closet', 'unit'), k('fac', 'power'), k('noc', 'closet'), k('fac', 'noc', 0.1), k('fabric', 'power'), k('topo', 'closet'), k('fabric', 'canvas'), k('topo', 'canvas', 0.1), k('canvas', 'appr'), k('appr', 'closet', 0.12)],
    steps: [
      {
        phase: 'today', title: 'Plant and IT watch separate screens',
        say: s(
          'Building systems, power, the network and clinical applications are monitored by different teams in different rooms.',
          "The facilities command post sees generators and pumps while IT sees circuits and servers. Each learns of the other's alarms by phone.",
          'Building management alarms, UPS and generator telemetry, switch and circuit status and application health are not on a common timeline.',
        ),
        n: { storm: 'ok', power: 'ok', fac: 'ok', closet: 'ok', unit: 'ok', noc: 'ok' },
        l: { 'power-closet': 'ok', 'closet-unit': 'ok', 'fac-power': 'ok', 'noc-closet': 'ok' },
        facts: [f('About 300', 'patients evacuated during Hurricane Sandy in 2012', 'AP via CBS News 2012'), f('Jan 2025', 'resiliency program and design standards published in the federal health care climate resilience toolkit', 'NYU Langone annual report 2025')],
      },
      {
        phase: 'today', title: "Dependencies live in people's heads",
        say: s(
          'Which clinical units depend on which closets, circuits and power feeds is knowledge held by a few experienced staff.',
          'During an event, deciding what to protect or move first relies on drawings and memory rather than a live dependency map.',
          'Mapping an electrical panel or riser to the switches, access points and clinical endpoints it feeds means cross-referencing drawings and inventories.',
        ),
        n: { storm: 'warn', power: 'warn' }, l: { 'storm-power': 'warn', 'power-closet': 'unknown', 'closet-unit': 'unknown' },
        label: { power: 'Alarm on one power feed' },
        clock: { label: 'Time to know which units are at risk', mode: 'run' },
        callout: { node: 'power', text: 'Which closets and units does this feed serve?' },
      },
      {
        phase: 'today', title: 'Communication fragments under stress',
        say: s(
          'As conditions change, updates travel by phone, radio and several chat threads, and decisions are hard to reconstruct later.',
          'Incident command lacks a single record of what was known, decided and done at each time.',
          'Paging, voice, messaging and conferencing run on separate platforms with separate logs.',
        ),
        n: { unit: 'unknown' }, l: { 'fac-noc': 'unknown' },
        label: { unit: 'Risk not yet known' },
        facts: [f('59 days', 'after the 2012 storm before operating rooms and ICUs reopened', 'AP via NBC New York 2012'), f('$1B', 'estimated damage from Hurricane Sandy, as reported at the reopening', 'AP via NBC New York 2012')],
      },
      {
        phase: 'cisco', title: 'One shared operating picture (hypothesis)',
        say: s(
          'Hypothesis to validate: facilities, IT and clinical leaders look at one view of power, environment, network and application health by building and floor.',
          'Hypothesis to validate: building and power telemetry brought into the Data Fabric alongside network state would show which care areas each alarm puts at risk.',
          'Hypothesis to validate: Meraki environmental sensors, switch and circuit telemetry and third-party building data in Splunk would be searched together and drawn on Topology.',
        ),
        show: ['cc', 'fabric', 'topo', 'canvas'], n: { closet: 'warn', unit: 'warn', fabric: 'ok', topo: 'ok', canvas: 'ok' },
        label: { power: '', unit: '' },
        l: { 'power-closet': 'warn', 'closet-unit': 'warn', 'fac-noc': 'off', 'fabric-power': 'ok', 'topo-closet': 'warn', 'fabric-canvas': 'ok', 'topo-canvas': 'ok' },
        clock: { label: '', mode: 'hide' },
        callout: { node: 'closet', text: 'Modeled: this alarm puts one closet and one inpatient unit at risk.' },
      },
      {
        phase: 'cisco', title: 'Incident command approves each step',
        say: s(
          "A step that affects a care area, such as moving a unit's traffic, waits for the incident commander.",
          'Each recommendation carries its evidence and expected effect, and the approval is logged with a time and a name.',
          'The reroute or pre-staged failover is executed by the WAN or campus controller after approval, with the prior state saved for rollback.',
        ),
        show: ['appr'], n: { appr: 'pending' }, l: { 'canvas-appr': 'pending' },
        modal: {
          title: "Move one unit's traffic to the backup path",
          lines: [
            "Shift one unit's traffic to the alternate riser before power is lost.",
            'Approver: hospital incident commander',
            'Trust level: L3, execute after approve',
            'Executes in: campus and WAN controllers (vendors to confirm)',
          ],
          button: 'Approve',
        },
      },
      {
        phase: 'cisco', title: 'Earlier warning, cleaner record (modeled)',
        say: s(
          'Modeled, not measured: teams see the clinical consequence of a plant alarm earlier and leave the event with a complete decision record.',
          'Modeled outcome: the after-action review is drawn from one timeline rather than from interviews and exported logs.',
          'Modeled outcome: one correlated event store links sensor, power, network and collaboration records. Integration with the building systems is unverified.',
        ),
        n: { appr: 'ok', closet: 'ok', unit: 'ok' }, l: { 'canvas-appr': 'ok', 'appr-closet': 'ok', 'closet-unit': 'ok', 'topo-closet': 'ok', 'power-closet': 'off' },
        label: { closet: 'Unit moved to backup path' },
        chips: [['AI Canvas', 'GA (US)'], ['Topology', 'GA (US)'], ['Machine Data Lake, Federated Search', 'GA'], ['Building systems data', 'To validate']],
      },
    ],
  },
};
