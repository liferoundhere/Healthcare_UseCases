// Use case UC7: Acquired clinic. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'wan',
  code: 'UC7',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Infrastructure',
  pillars: [ 'Facilities', 'Security' ],
  short: 'Acquired clinic',
  name: 'The acquired clinic arrives flat',
  setting: 'The acquired clinic, a single circuit and the parent health system',
  personas: [ 'CEO and CFO', 'CIO', 'CISO', 'Network engineer', 'Integration program manager' ],
  vision: 'An acquired site gets an inventory, a topology and a trust gate before it reaches the parent EHR, with an identity baseline and an SD-WAN edge brought up in a planned order.',
  legacy: {
    banner: 'A distressed seller closes on Friday. Monday the clinic needs the EHR, and its network is one flat VLAN with an open remote desktop and a single circuit.',
    strip: 'Today: Monday morning access, no inventory, no gate [H]',
    who: 'Day one after close (sim)',
    silos: [
      [ 'Seller IT documents', 'partial, stale [H]', 'p', 'doc' ],
      [ 'Clinic router and ISP', 'single circuit [H]', 'p', 'router' ],
      [ 'Remote desktop exposure', 'open to the internet [H]', 'p', 'lock' ],
      [ 'Parent address plan', 'overlaps possible [H]', '', 'board' ],
      [ 'Parent SOC', 'cannot see the clinic [H]', '', 'eye' ],
      [ 'Integration spreadsheet', 'task list, not a map [H]', '', 'doc' ]
    ],
    gaps: [
      'No inventory of what the clinic owns [H]',
      'Flat VLAN with an open remote desktop [H]',
      'Single circuit to the parent EHR [H]',
      'Address overlap is found by outage [H]',
      'The SOC learns of the clinic late'
    ],
    big: [ '43.5%', '2025 hospital deals with a distressed party [Kaufman Hall]' ],
    recap: 'The clinic is flat, its remote desktop is exposed, and Monday it must reach the parent EHR.'
  },
  tobe: {
    banner: 'Inventory and a Layer 3 map come first, a trust gate stands before the EHR, an identity baseline follows, and an SD-WAN edge adds a second path beside the single circuit, each step approved.',
    strip: 'Inventory and L3 map, trust gate, identity baseline, SD-WAN edge',
    who: 'Day one after close (sim)',
    console: {
      title: 'Cloud Control | onboarding',
      body: 'Inventory first, then a gate before the parent EHR, then an identity baseline and an SD-WAN edge. Each change waits for approval by the IAM and network leads.',
      foot: 'No access until the gate passes',
      rows: [
        [ 'What the clinic owns', 'unknown', 'inventory and map', 0, 'topology' ],
        [ 'Access to the parent EHR', 'open on Monday', 'after the trust gate', 1, 'lock' ],
        [ 'Identity', 'shared accounts', 'baseline applied', 2, 'key' ],
        [ 'Link', 'single circuit', 'SD-WAN edge', 2, 'router' ],
        [ 'Parent SOC view', 'none', 'clinic visible', 2, 'eye' ]
      ]
    },
    stays: "The seller's equipment stays until the replacement is proven. Integration order and approvals remain a program decision.",
    recap: [
      'First the map, then the gate, then identity, then a second path.',
      'Outcomes are modeled: a clinic onboarded in a planned order. A vendor case-study outage cut is not generalized.'
    ]
  },
  hops: {
    legacy: [
      [ 'Clinic network', 'flat, one VLAN', 'building' ],
      [ 'Open remote desktop', 'exposed', 'lock' ],
      [ 'Single circuit', 'no second path', 'router' ],
      [ 'Parent EHR', 'reached on Monday', 'server' ]
    ],
    tobe: [
      [ 'Inventory + L3 map', 'know what is there', 'topology' ],
      [ 'Trust gate', 'before the EHR', 'lock' ],
      [ 'Identity baseline', 'one standard', 'key' ],
      [ 'SD-WAN edge', 'a second path', 'router' ]
    ]
  },
  pathNote: { legacy: 'Access first, knowledge later [H]', tobe: 'Map, gate, identity, edge' },
  outcomes: {
    legacy: [
      [ '43.5%', '2025 hospital deals with a distressed party [Kaufman Hall]', 'S' ],
      [ '46', 'announced hospital transactions in 2025, down from 72 [Kaufman Hall]', 'S' ],
      [ '85,000', 'patients, one OCR acquired-practice case [law firm summary]', 'S' ]
    ],
    tobe: [ [ '1 map', 'before any access (modeled)', 'H' ], [ '1 gate', 'between the clinic and the EHR', 'H' ], [ '2 paths', 'from the clinic to the parent', 'H' ] ]
  },
  kpis: [ 'Days from close to inventory', 'Clinic devices unknown at go-live', 'Circuits per clinic', 'Time to parent SOC visibility' ],
  ask: 'On the Monday after a close, what do you know about the clinic network before you give it EHR access?',
  tiles: [
    { l: '2025 hospital deals with a distressed party [Kaufman Hall]', a: '43.5%', b: '43.5%', tag: 'S' },
    { l: 'Announced hospital transactions, 2025 [Kaufman Hall]', a: '46', b: '46', tag: 'S' },
    { l: 'Patients in one OCR case [law firm summary]', a: '85,000', b: '85,000', tag: 'S' },
    { l: 'Inventory of the clinic', a: 'None', b: 'Map first', tag: 'H' },
    { l: 'Access to the EHR', a: 'Open', b: 'Gated', tag: 'H' },
    { l: 'Paths to the parent', a: '1 circuit', b: '2 paths', tag: 'H' }
  ],
  narrPatch: {
    steps: {
      4: { say: { dir: 'Bring the clinic into inventory and topology first. One environment can hold several Meraki organizations.' } },
      5: { say: { eng: 'Close RDP, remove shared admin, enforce MFA. Human-approved changes execute in the firewall and the identity provider.' } },
    },
  },
  scene: {
    hide: ['walkers'],
    decor: 'wan',
    pos: {
      clinic: [ 110, 150 ],
      rdp: [ 110, 292 ],
      circ: [ 320, 210 ],
      ehr: [ 535, 130 ],
      ip: [ 465, 296 ],
      soc: [ 650, 296 ],
      inv: [ 110, 418 ],
      gate: [ 280, 418 ],
      idb: [ 450, 418 ],
      sdw: [ 620, 418 ]
    }
  }
};
