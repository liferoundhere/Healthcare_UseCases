// Use case UC3: Downtime. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'ransom',
  code: 'UC3',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Infrastructure',
  pillars: [ 'Security', 'Facilities' ],
  short: 'Downtime',
  name: 'Downtime is a clinical procedure',
  setting: 'Health system and the region around it',
  personas: [ 'CEO and COO', 'CISO', 'Chief nursing officer', 'Emergency department director', 'Pharmacy and lab directors' ],
  vision: 'The affected zone is drawn from one live topology, a person approves isolation, and restore comes from a clean copy with the order decided in advance.',
  legacy: {
    banner: 'EHR, phones, pharmacy, lab and imaging go down together. Paper starts, the emergency department diverts ambulances, and the region feels it within the hour.',
    strip: 'Today: dependencies are tribal knowledge, restore order is argued live [H]',
    who: 'Hour one of an outage (sim)',
    silos: [
      [ 'Identity and directory', 'single point of entry [H]', '', 'key' ],
      [ 'EHR and pharmacy', 'dependencies in heads [H]', '', 'server' ],
      [ 'Lab and imaging', 'own downtime rules [H]', '', 'flask' ],
      [ 'Backups', 'untested restore order [H]', '', 'database' ],
      [ 'Ambulance diversion', 'a phone call [H]', 'p', 'ambulance' ],
      [ 'Paper downtime kit', 'varies by unit [H]', 'p', 'doc' ]
    ],
    gaps: [
      'Dependencies are not on one map [H]',
      'Restore order is decided live [H]',
      'Isolation and care share the same switches [H]',
      'Backups may share the blast radius [H]',
      'Nobody owns the clock'
    ],
    big: [ '192.7M', 'people affected by Change Healthcare [HHS OCR]' ],
    recap: 'EHR, pharmacy and lab fail together, the ED diverts, and the region absorbs the patients.'
  },
  tobe: {
    banner: 'AI Canvas draws the affected zone from the live topology. A person approves isolation, and restore starts from a clean copy in the order the clinical teams agreed in advance.',
    strip: 'AI Canvas, Layer 3 topology, approvals, isolated clean-room backups',
    who: 'Hour one of an outage (sim)',
    console: {
      title: 'Cloud Control | affected zone',
      body: 'The zone is drawn from live topology and dependencies. Isolation and restore are proposed, and a named approver decides. Care teams set the restore order beforehand.',
      foot: 'Human approval before isolation',
      rows: [
        [ 'Affected zone', 'argued on a call', 'drawn from topology', 0, 'topology' ],
        [ 'Isolation', 'pull the plug', 'proposed, approved', 1, 'person' ],
        [ 'Restore source', 'live backups', 'clean-room copy', 2, 'database' ],
        [ 'Restore order', 'decided live', 'agreed in advance', 2, 'doc' ],
        [ 'Diversion call', 'late', 'earlier, with evidence', 2, 'ambulance' ]
      ]
    },
    stays: 'Downtime procedures stay on paper and in the clinical teams. Cloud Control scopes and restores; it never decides care. The timing here is illustrative.',
    recap: [
      'The zone is drawn, isolation waits for a person, and restore comes from a clean copy.',
      'Outcomes are modeled: a smaller zone and a faster, ordered restore. The clock is illustrative.'
    ]
  },
  hops: {
    legacy: [
      [ 'Identity', 'everything signs in here', 'key' ],
      [ 'EHR, pharmacy, lab', 'fail together', 'server' ],
      [ 'Backups', 'maybe in the blast radius', 'database' ],
      [ 'Region', 'ambulances divert', 'ambulance' ]
    ],
    tobe: [
      [ 'AI Canvas', 'draws the zone', 'canvas' ],
      [ 'Approval', 'a person isolates', 'person' ],
      [ 'Clean-room backup', 'separate copy', 'database' ],
      [ 'Ordered restore', 'agreed in advance', 'check' ]
    ]
  },
  pathNote: { legacy: 'Dependencies live in people, not on a map [H]', tobe: 'Zone, approval, clean copy, ordered restore' },
  outcomes: {
    legacy: [
      [ '192.7M', 'people affected by Change Healthcare [HHS OCR]', 'S' ],
      [ '$3.09B', 'UnitedHealth 2024 cost of that incident [filings]', 'S' ],
      [ '20 to 35%', 'in-hospital mortality rise, Medicare admits [Minnesota working paper]', 'S' ]
    ],
    tobe: [
      [ '1 zone', 'drawn from live topology (modeled)', 'H' ],
      [ '1 approver', 'named before isolation runs', 'H' ],
      [ 'Clean copy', 'restore does not start from the blast radius', 'H' ]
    ]
  },
  kpis: [ 'Time to a scoped zone', 'Time to isolation approval', 'Time to first clean restore', 'Diversion hours' ],
  ask: 'In hour one of an outage, who decides which system comes back first?',
  tiles: [
    { l: 'People affected, Change Healthcare [HHS OCR]', a: '192.7M', b: '192.7M', tag: 'S' },
    { l: 'UnitedHealth 2024 cost of that incident', a: '$3.09B', b: '$3.09B', tag: 'S' },
    { l: 'In-hospital mortality rise [working paper]', a: '20 to 35%', b: '20 to 35%', tag: 'S' },
    { l: 'Affected zone', a: 'Argued', b: 'Drawn', tag: 'H' },
    { l: 'Isolation', a: 'Pull the plug', b: 'Approved', tag: 'H' },
    { l: 'Restore source', a: 'Live backups', b: 'Clean copy', tag: 'H' }
  ],
  scene: {
    decor: 'ransom',
    pos: {
      idn: [ 90, 136 ],
      ehr: [ 215, 136 ],
      pharm: [ 340, 136 ],
      lab: [ 465, 136 ],
      ed: [ 260, 290 ],
      bak: [ 90, 290 ],
      amb: [ 635, 282 ],
      canvas: [ 110, 418 ],
      zone: [ 280, 418 ],
      app: [ 450, 418 ],
      clean: [ 620, 418 ]
    }
  }
};
