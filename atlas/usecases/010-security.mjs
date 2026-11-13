// Use case F1: Security. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'security',
  code: 'F1',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Flagship',
  pillars: [ 'Security', 'Facilities', 'AI' ],
  short: 'Security',
  name: 'Containment with a person still in the loop',
  setting: 'Clinical floor 4 West, the data center and the internet edge',
  personas: [ 'CISO', 'Biomed (HTM) lead', 'Network operations', 'Chief nursing officer', 'Charge nurse' ],
  vision: 'The same event, one investigation. SOC, network and biomed share one picture, the change is scoped to one segment, and a named person approves before anything executes. Care keeps running on the rest of the floor.',
  legacy: {
    banner: 'A pump on 4 West starts talking to an address nobody recognizes. Five teams each see one piece, and without segmentation the only safe containment is to turn more things off.',
    strip: 'Today: five consoles, a flat network, containment means unplugging [H]',
    who: 'Night shift on 4 West (sim)',
    silos: [
      [ 'SIEM alerts', 'alert ID only [H]', '', 'eye' ],
      [ 'NAC', 'sees a MAC address [H]', '', 'shield' ],
      [ 'Biomed CMMS', 'sees a serial number [H]', '', 'gear' ],
      [ 'Firewall logs', 'sees a 5-tuple [H]', '', 'lock' ],
      [ 'Endpoint tools', 'cannot see pumps [H]', '', 'scan' ],
      [ 'Downtime plan', 'paper MAR, runners [H]', 'p', 'doc' ]
    ],
    gaps: [
      'Five consoles hold five identifiers [H]',
      'No shared picture of the scope [H]',
      'Flat network: blast radius is the VLAN [H]',
      'Containment and care share one switch [H]',
      'Mean time to innocence is not measured'
    ],
    big: [ '5', 'consoles, one pump, five partial truths [H]' ],
    recap: 'One pump talks to an unknown address. Five consoles each hold a different identifier for it.'
  },
  tobe: {
    banner: 'One AI Canvas investigation scopes the event to one segment. Biomed and network approve the change, it executes in ISE or Catalyst Center, and the audit log records who approved it.',
    strip: 'AI Canvas, Security Cloud Control, ISE, Catalyst Center',
    who: 'Night shift on 4 West (sim)',
    console: {
      title: 'Cloud Control | pump segment',
      body: 'One shared investigation across SOC, network and biomed. The agent proposes; Biomed and Network operations approve; the change executes in ISE or Catalyst Center.',
      foot: 'Biomed and network approve',
      rows: [
        [ 'Consoles to open', '5', '1', 0, 'canvas' ],
        [ 'Scope of the event', 'unknown', '3 pumps, 1 segment', 0, 'topology' ],
        [ 'Proposed change', 'none', 'awaiting approval', 1, 'person' ],
        [ 'Hospital impact', 'whole house dark', 'one segment', 2, 'shield' ],
        [ 'Audit record', 'none', 'who approved what', 2, 'doc' ]
      ]
    },
    stays: 'ISE and Catalyst Center stay the systems of record. The SIEM stays with the SOC, and care decisions stay with the clinical teams. Plan an out-of-band path in case containment cuts cloud reach.',
    recap: [
      'The same alert, one canvas: scope is 3 pumps on one segment, and EHR, phones and monitors are not involved.',
      'Outcomes are modeled: a smaller downtime footprint and an audit trail. No percentage is claimed.'
    ]
  },
  hops: {
    legacy: [
      [ 'Pump egress', 'unseen, no agent', 'pump' ],
      [ 'Five consoles', 'five partial truths', 'eye' ],
      [ 'Flat network', 'unplug everything', 'switch' ],
      [ 'Downtime procedures', 'paper and runners', 'doc' ]
    ],
    tobe: [
      [ 'Security Cloud Control', 'detect and enforce', 'shield' ],
      [ 'AI Canvas', 'one shared picture', 'canvas' ],
      [ 'Approval by a person', 'biomed + network', 'person' ],
      [ 'ISE / Catalyst Center', 'executes, records', 'gear' ]
    ]
  },
  pathNote: { legacy: 'Each console sees one fragment [H]', tobe: 'Detection to approved change, on one path' },
  outcomes: {
    legacy: [
      [ '4+ weeks', 'offline planning horizon [Joint Commission SEA 67]', 'S' ],
      [ '64 days', 'global mean time to contain, all industries [IBM 2026]', 'S' ],
      [ '37 days', 'Ascension: EHR access restored system-wide, sources vary', 'S' ]
    ],
    tobe: [
      [ '1 picture', 'instead of five consoles, kept across shifts', 'H' ],
      [ '1 segment', 'downtime footprint, not the whole house (modeled)', 'H' ],
      [ 'Audit log', 'who approved what, kept where policy lives', 'H' ]
    ]
  },
  kpis: [ 'Time to a shared picture', 'Mean time to innocence (proposed KPI)', 'Segment blast radius', 'Approvals recorded' ],
  ask: 'If one pump misbehaves tonight, what is the first thing your teams turn off, and who decides?',
  tiles: [
    { l: 'Pumps in the story', a: '1 of 40', b: '1 of 40', tag: 'I' },
    { l: 'Consoles to reach one picture', a: '5', b: '1', tag: 'H' },
    { l: 'Downtime footprint', a: 'Whole floor', b: 'One segment', tag: 'H' },
    { l: 'Offline planning horizon [Joint Commission]', a: '4+ weeks', b: '4+ weeks', tag: 'S' },
    { l: 'Mean time to contain, all industries [IBM 2026]', a: '64 days', b: '64 days', tag: 'S' },
    { l: 'Change approval', a: 'Ad hoc', b: 'Named approvers', tag: 'H' }
  ],
  narrPatch: {
    // Corrections to the shared narrative in stage/js/narrative.js (see AUTHORING.md, narrPatch)
    steps: {
      2: { callout: { node: 'pump', text: 'One of 40 pumps on 4 West is sending traffic to an address nobody recognizes.' } },
      5: { say: { eng: 'AI Canvas correlates Security detections, Cisco Identity posture and topology. Identity in AI Canvas is beta.' } },
      7: { say: { eng: 'A rollback is another planned change in ISE or Catalyst Center. Plan an out-of-band path in case containment cuts cloud reach.' } },
    },
  },
  scene: {
    decor: 'security',
    pos: {
      pump: [ 82, 134 ],
      mon: [ 192, 134 ],
      phones: [ 150, 246 ],
      lib: [ 352, 266 ],
      ehr: [ 410, 150 ],
      dest: [ 628, 160 ],
      soc: [ 95, 418 ],
      nac: [ 235, 418 ],
      biomed: [ 375, 418 ],
      fw: [ 510, 418 ],
      edr: [ 640, 418 ],
      canvas: [ 110, 418 ],
      approve: [ 280, 418 ],
      ise: [ 450, 418 ],
      audit: [ 620, 418 ]
    },
    noLegacyBand: true
  }
};
