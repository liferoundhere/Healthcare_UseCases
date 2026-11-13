// Use case UC2: Medical devices. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'iomt',
  code: 'UC2',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Infrastructure',
  pillars: [ 'Security', 'Facilities' ],
  short: 'Medical devices',
  name: 'See the pump before you patch it',
  setting: 'ICU bays, radiology, guest network and the teams that own the facts',
  personas: [ 'CISO', 'Clinical engineering (HTM)', 'Network operations', 'Chief medical officer', 'Compliance officer' ],
  vision: 'Devices that cannot take an agent are identified by what they say on the network, risk is shared with the people who own the device, and segmentation is applied only after biomed and network approve.',
  legacy: {
    banner: 'Infusion pumps cannot take an agent and stay in service for a decade. They share a flat network with imaging and the guest bridge, and the facts about them sit in three teams.',
    strip: 'Today: flat clinical network, vulnerability scans and the CMMS never meet [H]',
    who: 'Quarterly vulnerability review (sim)',
    silos: [
      [ 'Vulnerability scanner', 'safe-scan limits [H]', '', 'scan' ],
      [ 'CMMS asset records', 'serial, not address [H]', '', 'gear' ],
      [ 'NAC or switch tables', 'MAC and port [H]', '', 'switch' ],
      [ 'Manufacturer advisories', 'by model, by email [H]', 'p', 'doc' ],
      [ 'Security tools', 'no agent possible [H]', '', 'shield' ],
      [ 'Clinical engineering', 'owns the device [H]', 'p', 'person' ]
    ],
    gaps: [
      'Cannot see the pump, cannot patch it [H]',
      'Three inventories, three owners [H]',
      'Flat network: one pump, whole VLAN [H]',
      'Patching waits on a clinical window [H]',
      'No agreed risk score across teams'
    ],
    big: [ '99%', 'of orgs run a device with a known exploited vulnerability [Claroty 2025, vendor]' ],
    recap: 'Pumps share a flat network with imaging and guests; the facts about each pump live in three teams.'
  },
  tobe: {
    banner: 'Cisco Identity names the device by behavior, the Machine Data Lake joins CMMS and network facts, and segmentation is applied only after a person approves it.',
    strip: 'Identity, data lake, AI Canvas, ISE or Catalyst Center',
    who: 'Quarterly vulnerability review (sim)',
    console: {
      title: 'Cloud Control | device fleet',
      body: 'One joined view of what each device is, who owns it and what it talks to. Segmentation is proposed to Biomed and Network operations and executes only on approval.',
      foot: 'No agent on the pump',
      rows: [
        [ 'Inventories', '3 disagree', '1 joined view', 0, 'database' ],
        [ 'Device identity', 'MAC address', 'model and behavior', 0, 'badge' ],
        [ 'Risk owner', 'unclear', 'biomed + security', 1, 'people' ],
        [ 'Pump segment', 'none', 'applied after approval', 2, 'shield' ],
        [ 'Patch', 'waits for a window', 'stays on the clinical calendar', 2, 'clock' ]
      ]
    },
    stays: 'No agent goes on the pump and patching stays on the clinical engineering calendar. Segmentation limits exposure; it does not replace patching.',
    recap: [
      'Pumps get a name, an owner and a joined risk view without an agent.',
      'Outcomes are modeled: fewer unknown devices and a segment after approval. No patient-harm event is claimed.'
    ]
  },
  hops: {
    legacy: [
      [ 'Device on the network', 'no agent possible', 'pump' ],
      [ 'Scanner and CMMS', 'never joined', 'scan' ],
      [ 'Flat VLAN', 'blast radius is wide', 'switch' ],
      [ 'Clinical window', 'patch waits', 'clock' ]
    ],
    tobe: [
      [ 'Cisco Identity', 'by behavior, no agent', 'badge' ],
      [ 'Machine Data Lake', 'CMMS + network facts', 'database' ],
      [ 'Approval', 'biomed + network', 'person' ],
      [ 'Device segment', 'limits exposure', 'shield' ]
    ]
  },
  pathNote: { legacy: 'Facts about one pump live in three teams [H]', tobe: 'Identify, join, approve, segment' },
  outcomes: {
    legacy: [
      [ '99%', 'orgs with a device known exploited vulnerability [Claroty 2025, vendor]', 'S' ],
      [ '3.2 yr', 'device vulnerability dwell time [Trellix 2025, vendor]', 'S' ],
      [ '524B', 'FDA cyber-device rule covers new devices, not the installed base [FDA]', 'S' ]
    ],
    tobe: [
      [ '1 view', 'of devices, owners and risk (modeled)', 'H' ],
      [ '1 segment', 'around the pump fleet after approval', 'H' ],
      [ '0 agents', 'installed on clinical devices', 'H' ]
    ]
  },
  kpis: [ 'Share of devices with a known owner', 'Share of pumps segmented', 'Time from advisory to exposure map', 'Unmanaged device count' ],
  ask: 'Can you list every infusion pump on your network and say who owns it, today?',
  tiles: [
    { l: 'Orgs with a known exploited device vuln [Claroty 2025]', a: '99%', b: '99%', tag: 'S' },
    { l: 'Vulnerability dwell time [Trellix 2025]', a: '3.2 yr', b: '3.2 yr', tag: 'S' },
    { l: 'FDA 524B scope', a: 'new devices', b: 'new devices', tag: 'S' },
    { l: 'Inventories to reconcile', a: '3', b: '1 joined', tag: 'H' },
    { l: 'Device identity', a: 'MAC only', b: 'model + behavior', tag: 'H' },
    { l: 'Pump network', a: 'Flat', b: 'Own segment', tag: 'H' }
  ],
  scene: {
    decor: 'iomt',
    pos: {
      pumps: [ 88, 142 ],
      img: [ 88, 294 ],
      guest: [ 252, 294 ],
      net: [ 252, 150 ],
      scan: [ 420, 142 ],
      cmms: [ 540, 142 ],
      sec: [ 650, 142 ],
      id: [ 110, 418 ],
      lake: [ 280, 418 ],
      app: [ 450, 418 ],
      seg: [ 620, 418 ]
    }
  }
};
