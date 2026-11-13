// Use case UC9: Compliance. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'compliance',
  code: 'UC9',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Infrastructure',
  pillars: [ 'Security', 'Facilities' ],
  short: 'Compliance',
  name: 'The map they ask for on a Tuesday',
  setting: 'Evidence the team keeps today and what the surveyor asks for',
  personas: [ 'Compliance officer', 'CISO', 'Privacy officer', 'Network architect', 'Internal audit' ],
  vision: "Evidence is a live view that a person annotates, not a screenshot gathered the week before. The platform helps; compliance remains the customer's to prove.",
  legacy: {
    banner: 'A surveyor wants the ePHI network map and proof the pump segment was isolated on a given date. Four inventories disagree, and the answer is a corkboard and screenshots.',
    strip: 'Today: four inventories, point-in-time screenshots [H]',
    who: 'Surveyor visit on a Tuesday (sim)',
    silos: [
      [ 'Network diagram', 'a corkboard [H]', 'p', 'board' ],
      [ 'CMMS asset list', 'serial numbers [H]', '', 'gear' ],
      [ 'DHCP lease table', 'live, not kept [H]', '', 'server' ],
      [ 'NAC report', 'device types [H]', '', 'shield' ],
      [ 'GRC tool', 'attestations [H]', '', 'doc' ],
      [ 'Screenshots folder', 'point in time [H]', 'p', 'monitor' ]
    ],
    gaps: [
      'Four inventories disagree [H]',
      'Evidence is a screenshot, not a record [H]',
      'ePHI scope is a human judgement [H]',
      'Isolation on a date is hard to prove [H]',
      'Nobody owns evidence between audits'
    ],
    big: [ '710', 'large healthcare breaches in 2025 [HIPAA Journal, from OCR data]' ],
    recap: 'The surveyor asks for the ePHI map, and four inventories and a corkboard are the answer.'
  },
  tobe: {
    banner: 'A live topology, the audit log and that day\'s telemetry in the Machine Data Lake give a dated record. A person annotates which parts hold ePHI. Cloud Control helps with evidence; it is not HIPAA certified.',
    strip: 'Live topology, audit log, Machine Data Lake, human ePHI annotation',
    who: 'Surveyor visit on a Tuesday (sim)',
    console: {
      title: 'Cloud Control | evidence',
      body: "A live topology and a dated audit log. A person marks which segments carry ePHI. HIPAA alignment remains the customer's responsibility.",
      foot: 'Not HIPAA certified; evidence only',
      rows: [
        [ 'Network map', 'corkboard', 'live topology', 0, 'topology' ],
        [ 'Isolation on a date', 'a screenshot', 'a dated audit record', 1, 'doc' ],
        [ 'ePHI scope', 'human guess', 'human annotation', 2, 'person' ],
        [ 'Inventories', '4 disagree', '1 joined', 2, 'database' ],
        [ 'Compliance claim', 'on the customer', 'on the customer', 2, 'lock' ]
      ]
    },
    stays: 'The compliance program, the risk analysis and the attestation stay with you. Splunk guidance puts HIPAA alignment on the customer.',
    recap: [
      'A live topology and a dated record replace the corkboard and the screenshots.',
      'Outcomes are modeled: faster evidence for the surveyor. The rule update dates are proposals, not in force.'
    ]
  },
  hops: {
    legacy: [
      [ 'Corkboard and diagrams', 'a point in time', 'board' ],
      [ 'Four inventories', 'disagree', 'database' ],
      [ 'Screenshots', 'the evidence', 'monitor' ],
      [ 'Surveyor', 'asks Tuesday', 'person' ]
    ],
    tobe: [
      [ 'Live topology', 'always current', 'topology' ],
      [ 'Audit log', 'dated, signed in', 'doc' ],
      [ 'Machine Data Lake', 'one joined record', 'database' ],
      [ 'ePHI annotation', 'a person decides', 'person' ]
    ]
  },
  pathNote: { legacy: 'Evidence is assembled by hand [H]', tobe: 'Live view, dated record, human scope' },
  outcomes: {
    legacy: [
      [ '710', 'large healthcare breaches in 2025 [HIPAA Journal]', 'S' ],
      [ 'July 2027', 'projected final action on the HIPAA Security Rule update [regulatory agenda]', 'S' ],
      [ '72 hours', 'proposed restore target; not in force [HIPAA NPRM]', 'S' ]
    ],
    tobe: [
      [ '1 map', 'live, not drawn for the audit (modeled)', 'H' ],
      [ '1 record', 'dated, with who approved what', 'H' ],
      [ 'Customer', 'owns the compliance claim', 'S' ]
    ]
  },
  kpis: [ 'Time to produce an ePHI map', 'Inventories that agree', 'Isolation changes with a dated record', 'Evidence gathered between audits' ],
  ask: 'If a surveyor asks tomorrow, how long does it take to prove what you isolated, and when?',
  tiles: [
    { l: 'Large healthcare breaches in 2025 [HIPAA Journal]', a: '710', b: '710', tag: 'S' },
    { l: 'HIPAA Security Rule final action, projected', a: 'July 2027', b: 'July 2027', tag: 'S' },
    { l: 'Proposed restore target, not in force [NPRM]', a: '72 hours', b: '72 hours', tag: 'S' },
    { l: 'Inventories that agree', a: '0 of 4', b: '1 joined', tag: 'H' },
    { l: 'Isolation evidence', a: 'Screenshot', b: 'Dated record', tag: 'H' },
    { l: 'Compliance claim', a: 'Customer', b: 'Customer', tag: 'S' }
  ],
  narrPatch: {
    steps: { 2: { callout: null } },
  },
  scene: {
    labels: { Corkboard: null, 'Surveyor, Tuesday': null },
    decor: 'compliance',
    pos: {
      cork: [ 80, 206 ],
      cmms: [ 190, 118 ],
      dhcp: [ 310, 118 ],
      nac: [ 190, 296 ],
      grc: [ 310, 296 ],
      shot: [ 400, 206 ],
      surv: [ 592, 206 ],
      topo: [ 110, 418 ],
      audit: [ 280, 418 ],
      lake: [ 450, 418 ],
      human: [ 620, 418 ]
    }
  }
};
