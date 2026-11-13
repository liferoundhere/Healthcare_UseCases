// Use case UC1: EHR slow. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'ehr',
  code: 'UC1',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Infrastructure',
  pillars: [ 'Security', 'Facilities', 'AI' ],
  short: 'EHR slow',
  name: 'EHR is slow: prove which tier',
  setting: 'Nursing unit, network path and data center',
  personas: [ 'CIO', 'Chief nursing officer', 'Application and EHR team', 'Network operations', 'Virtualization and storage team' ],
  vision: 'One investigation walks the path from the workstation to the storage, so the first call goes to the right tier and not to a bridge with five teams.',
  legacy: {
    banner: 'Nurses on 4 West say the EHR is spinning. Network, desktop virtualization, application, storage and the vendor each say it is not them, and the bridge call keeps running.',
    strip: 'Today: five dashboards, five owners, no timer on the bridge [H]',
    who: 'Morning med pass on 4 West (sim)',
    silos: [
      [ 'Wi-Fi dashboard', 'says healthy [H]', '', 'wifi' ],
      [ 'Network monitoring', 'links are up [H]', '', 'switch' ],
      [ 'VDI or Citrix console', 'sessions look fine [H]', '', 'server' ],
      [ 'EHR application monitor', 'vendor black box [H]', 'p', 'chat' ],
      [ 'Storage array tool', 'latency in its own pane [H]', '', 'database' ],
      [ 'Bridge call', 'five owners, no timer [H]', 'p', 'phone' ]
    ],
    gaps: [
      'Every tier reports its own green [H]',
      'No timeline across tiers [H]',
      'The bridge call is the correlation engine [H]',
      'Mean time to innocence is not measured',
      'Clinicians see a spinner, not a tier'
    ],
    big: [ '5', 'teams each prove it is not them [H]' ],
    recap: '4 West says Hyperspace is spinning, and five dashboards each show their own green.'
  },
  tobe: {
    banner: 'AI Canvas with ThousandEyes and Intersight walks the path one hop at a time. The tier at fault gets the ticket, and the other four teams are cleared with evidence.',
    strip: 'AI Canvas, ThousandEyes, Intersight, Nexus, data lake',
    who: 'Morning med pass on 4 West (sim)',
    console: {
      title: 'Cloud Control | EHR path',
      body: 'One investigation across Wi-Fi, WAN, VDI, application and storage. It narrows the tier and names the owner. Domain tools stay the systems of record.',
      foot: 'The stopwatch is a proposed KPI',
      rows: [
        [ 'Teams on the bridge', '5', 'the owner of one tier', 0, 'people' ],
        [ 'Consoles to open', '5', '1 canvas', 0, 'canvas' ],
        [ 'Tier at fault', 'argued', 'shown with evidence', 1, 'topology' ],
        [ 'Mean time to innocence', 'not measured', 'a stopwatch (proposed)', 2, 'clock' ],
        [ 'Ticket', 'phone tree', 'goes to one team', 2, 'doc' ]
      ]
    },
    stays: 'Citrix, the network controllers and the EHR vendor tools stay in place. Cloud Control narrows the tier; owners still make the fix.',
    recap: [
      'One investigation walks workstation, Wi-Fi, WAN, VDI, EHR and storage, and clears four of five teams.',
      'Outcomes are modeled: a faster verdict on whose tier it is. The 12-minute value is illustrative.'
    ]
  },
  hops: {
    legacy: [
      [ 'Workstation and Wi-Fi', 'looks healthy', 'wifi' ],
      [ 'Core and WAN', 'links are up', 'router' ],
      [ 'VDI and EHR tier', 'its own console', 'server' ],
      [ 'Storage path', 'latency elsewhere', 'database' ]
    ],
    tobe: [
      [ 'ThousandEyes', 'path and Wi-Fi hops', 'eye' ],
      [ 'AI Canvas', 'one investigation', 'canvas' ],
      [ 'Intersight / Nexus', 'compute and fabric', 'rack' ],
      [ 'Machine Data Lake', 'the same timeline', 'database' ]
    ]
  },
  pathNote: { legacy: 'Each tier proves its own green [H]', tobe: 'Hop by hop, one timeline' },
  outcomes: {
    legacy: [
      [ '300 ms', 'Citrix ICA round-trip warning; 400 ms is critical [Citrix defaults]', 'S' ],
      [ '$1M/hr', 'large-hospital downtime, 2018 estimate, not a study [industry]', 'S' ],
      [ '759', 'hospitals disrupted by CrowdStrike, 19 Jul 2024 [JAMA Network Open 2025]', 'S' ]
    ],
    tobe: [
      [ '1 tier', 'named with evidence, four teams cleared (modeled)', 'H' ],
      [ '1 timeline', 'across Wi-Fi, WAN, VDI and storage', 'H' ],
      [ '12 min', 'illustrative time to a verdict; a proposed KPI', 'I' ]
    ]
  },
  kpis: [ 'Mean time to innocence', 'Teams pulled onto the bridge', 'Time to the right owner', 'Repeat incidents' ],
  ask: 'Next time the EHR spins, how long until you know which tier it is?',
  tiles: [
    { l: 'Citrix ICA round-trip warning [defaults]', a: '300 ms', b: '300 ms', tag: 'S' },
    { l: 'Downtime estimate, large hospital [2018]', a: '$1M/hr', b: '$1M/hr', tag: 'S' },
    { l: 'Hospitals disrupted by CrowdStrike [JAMA Netw Open]', a: '759', b: '759', tag: 'S' },
    { l: 'Teams on the bridge', a: '5', b: '1 owner', tag: 'H' },
    { l: 'Mean time to innocence', a: 'not measured', b: 'proposed KPI', tag: 'H' },
    { l: 'Illustrative time to verdict', a: '2 hours', b: '12 min', tag: 'I' }
  ],
  narrPatch: {
    steps: {
      3: { facts: [{ v: '$1M/hr', l: 'Large-hospital downtime, 2018 estimate, not a study', s: 'Industry estimate' }, { v: '759', l: 'Hospitals disrupted by CrowdStrike, 19 Jul 2024', s: 'JAMA Network Open 2025' }] },
      5: { say: { exec: 'Wi-Fi, WAN, VDI and the application are cleared. Four teams go back to work.' }, label: { wifi: 'Cleared', wan: 'Cleared', vdi: 'Cleared', ehr: 'Cleared' } },
    },
  },
  scene: {
    decor: 'ehr',
    pos: {
      wow: [ 84, 142 ],
      wifi: [ 196, 142 ],
      bridge: [ 110, 296 ],
      wan: [ 337, 212 ],
      vdi: [ 490, 142 ],
      ehr: [ 615, 142 ],
      store: [ 615, 292 ],
      canvas: [ 110, 418 ],
      te: [ 365, 418 ],
      dcv: [ 620, 418 ]
    }
  }
};
