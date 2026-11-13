// Use case F2: Facilities. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'facilities',
  code: 'F2',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Flagship',
  pillars: [ 'Facilities', 'Security' ],
  short: 'Facilities',
  name: 'One estate, from the patient room to the clinic',
  setting: 'Hospital tower, imaging suite, central plant, an off-campus clinic and a home',
  personas: [ 'CIO', 'Facilities and plant director', 'NOC', 'Clinical engineering', 'Chief nursing officer' ],
  vision: "The tower, the plant, the clinic and the home appear in one inventory and one topology, so building events and network events land on the same timeline. The edges that are not the hospital's stay gray on purpose.",
  legacy: {
    banner: 'A tower, an IDF on every floor, an imaging suite, a central plant, a clinic 40 miles away and a patient at home. Today those are different maps with different owners.',
    strip: 'Today: a map per site, plant and IT in separate silos [H]',
    who: 'Rapid response at 3 a.m. (sim)',
    silos: [
      [ 'Campus controller', 'tower and wings [H]', '', 'server' ],
      [ 'Clinic SD-WAN', 'its own console [H]', '', 'cloud' ],
      [ 'Building management', 'BACnet, plant team [H]', '', 'gear' ],
      [ 'Nurse call and RTLS', 'separate vendors [H]', 'p', 'bell' ],
      [ 'Home ISP', 'consumer circuit [H]', 'p', 'globe' ],
      [ 'Site spreadsheets', 'asset lists [H]', '', 'doc' ]
    ],
    gaps: [
      'Four underlays, four consoles [H]',
      'Nobody owns the IDF closet at 3 a.m. [H]',
      'Building systems share a clinical VLAN [H]',
      'New sites arrive outside every dashboard [H]',
      'Plant and network events never meet'
    ],
    big: [ '4', 'different underlays across one estate [H]' ],
    recap: 'A badge call drops in a patient room, the air handler sits on a clinical VLAN, and the clinic is a blind spot.'
  },
  tobe: {
    banner: 'One topology and one inventory across campus, clinics and edge. Plant telemetry and network events share a timeline, and Spaces shows connector health only, never patient location.',
    strip: 'Inventory, L3 topology, Meraki, SD-WAN, data lake',
    who: 'Rapid response at 3 a.m. (sim)',
    console: {
      title: 'Cloud Control | the estate',
      body: 'One inventory and a Layer 3 topology across Catalyst Center, Meraki and SD-WAN domains. Domain controllers stay the systems of record.',
      foot: 'Domain controllers remain the record',
      rows: [
        [ 'Sites in one inventory', 'by campus', 'tower to clinic', 0, 'topology' ],
        [ 'Which building is broken', 'ask four teams', 'one inventory', 0, 'building' ],
        [ 'Plant and network events', 'separate', 'one timeline', 1, 'gear' ],
        [ 'Incident hour data', 'siloed', 'promoted to the lake', 1, 'database' ],
        [ 'Patient location', 'not shown', 'not shown, by design', 2, 'lock' ]
      ]
    },
    stays: "Domain controllers stay the systems of record. The patient's home internet is not the hospital's, and Spaces here is not a location system.",
    recap: [
      'Campus, clinic and edge sit in one topology; plant events and network events arrive on the same timeline.',
      'Outcomes are modeled: one answer to which building is actually broken. The home hop stays gray by design.'
    ]
  },
  hops: {
    legacy: [
      [ 'Badge or AP', 'dropped call', 'badge' ],
      [ 'IDF closet', 'power vs switch owners', 'rack' ],
      [ 'Building controls', 'on a clinical VLAN', 'gear' ],
      [ 'Clinic and home', 'outside every map', 'home' ]
    ],
    tobe: [
      [ 'Inventory', 'every site, one list', 'board' ],
      [ 'Layer 3 topology', 'VLAN, VRF, subnet', 'topology' ],
      [ 'Machine Data Lake', 'plant and network events', 'database' ],
      [ 'Cisco Spaces', 'connector health only', 'wifi' ]
    ]
  },
  pathNote: { legacy: 'A map per site, an owner per map [H]', tobe: 'One estate view, honest at the edges' },
  outcomes: {
    legacy: [
      [ '6,100', 'U.S. hospitals [AHA 2024 survey, published 2026]', 'S' ],
      [ '358', 'hospital-at-home CCNs [CMS, 19 Oct 2026]', 'S' ],
      [ '10 s', 'critical-branch power restore [NEC / NFPA 99]', 'S' ]
    ],
    tobe: [
      [ '1 inventory', 'answers which building is actually broken', 'H' ],
      [ '1 timeline', 'plant and network events side by side (modeled)', 'H' ],
      [ 'Gray', 'where the hospital cannot see, and says so', 'H' ]
    ]
  },
  kpis: [ 'Sites in one inventory', 'Time to identify the failing building', 'IDF closets with power and switch ownership', 'Onboarding time for a new site' ],
  ask: 'When a room loses a call, who owns the closet, the power and the switch at 3 a.m.?',
  tiles: [
    { l: 'U.S. hospitals [AHA]', a: '6,100', b: '6,100', tag: 'S' },
    { l: 'Hospital-at-home CCNs [CMS]', a: '358', b: '358', tag: 'S' },
    { l: 'Views of the estate', a: '4 maps', b: '1 inventory', tag: 'H' },
    { l: 'Critical-branch power restore [NEC / NFPA 99]', a: '10 s', b: '10 s', tag: 'S' },
    { l: 'Plant and network events', a: 'Separate', b: 'One timeline', tag: 'H' },
    { l: 'Patient location from Spaces', a: 'No', b: 'No', tag: 'S' }
  ],
  scene: {
    decor: 'facilities',
    pos: {
      room: [ 75, 134 ],
      idf: [ 200, 134 ],
      noc: [ 176, 206 ],
      img: [ 385, 150 ],
      bms: [ 535, 140 ],
      gen: [ 655, 140 ],
      clinic: [ 160, 308 ],
      home: [ 520, 308 ],
      topo: [ 110, 418 ],
      inv: [ 280, 418 ],
      lake: [ 450, 418 ],
      spaces: [ 620, 418 ]
    }
  }
};
