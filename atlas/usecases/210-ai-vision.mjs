// AI use case AI1: Virtual nursing. One data file: page copy, node placement and the inline narrative.
// Narrative source: experience/src/story/ai.ts. Facts and sources: research/data/ai-use-cases.json. See atlas/AUTHORING.md.
export default {
  id: 'ai-vision',
  code: 'AI1',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'AI',
  pillars: [ 'AI', 'Facilities' ],
  short: 'Virtual nursing',
  name: 'A camera in every room needs a network',
  setting: 'Patient rooms, the floor switch closet, the edge node and the vision vendor cloud',
  situation: 'Cameras and edge AI go into hundreds of patient rooms on switches and Wi-Fi sized for badge readers and phones.',
  personas: [ 'Chief nursing informatics officer', 'Network operations lead', 'Virtual nursing program manager', 'Facilities engineer', 'Privacy officer' ],
  vision: 'When a virtual nurse loses the picture, one investigation shows the room device, the closet, the edge node and the vendor path, and named network and nursing approvers sign any change to patient-room ports (modeled).',
  legacy: {
    banner: 'A virtual nurse loses the picture from a patient room and the bedside nurse is called back. The camera vendor, the network team and the video platform each see a healthy console.',
    strip: 'Today: rooms, closets and the vendor cloud have separate owners [H]',
    who: 'Night shift, one unit (sim)',
    silos: [
      [ 'Vision vendor console', 'camera and model status [H]', 'p', 'eye' ],
      [ 'Switch and PoE view', 'ports and power [H]', '', 'switch' ],
      [ 'Wireless controller', 'roaming and signal [H]', '', 'wifi' ],
      [ 'Video platform', 'session quality [H]', 'p', 'monitor' ],
      [ 'Rollout spreadsheet', 'rooms that are live [H]', '', 'doc' ],
      [ 'Nurse call log', 'alerts sent [H]', 'p', 'bell' ]
    ],
    gaps: [
      'No single list of live rooms, switch ports and PoE budget left per closet [H]',
      'A stalled inference node looks the same as a quiet room [H]',
      'No shared timestamped trace across switch, Wi-Fi and vendor relay [H]',
      'Privacy questions arrive with the rollout: who can view a room and where frames go [H]'
    ],
    big: [ '57%', 'of 880 hospital nurses said virtual nurses did not reduce their workload [JAMA Network Open 2025]' ],
    recap: 'The picture freezes, three consoles report healthy, and the bedside nurse is called back to the room.'
  },
  tobe: {
    banner: 'AI Canvas would put the room device, its switch port and PoE, wireless health and the path to the vision vendor in one investigation. A change to patient-room ports waits for the network change manager and the nursing informatics lead.',
    strip: 'AI Canvas, Topology, Inventory, ThousandEyes',
    console: {
      title: 'Cloud Control | room to cloud',
      body: 'Each room device is mapped to its switch port and closet, with path tests to the vision vendor. The change runs in Catalyst Center or the Meraki dashboard after approval.',
      foot: 'Rooms on unmanaged switches stay invisible',
      rows: [
        [ 'Consoles to check', '3 or more', '1 investigation', 0, 'canvas' ],
        [ 'Room to switch port map', 'spreadsheet', 'Topology and Inventory', 0, 'topology' ],
        [ 'Vendor cloud path', 'status page', 'tested from our edge', 0, 'eye' ],
        [ 'Port and QoS change', 'ad hoc', 'approved by two people', 1, 'people' ],
        [ 'Camera model accuracy', 'vendor', 'vendor', 2, 'lock' ]
      ]
    },
    stays: "Clinical protocols, consent and privacy policy, camera placement and the vision vendor's model accuracy stay with the hospital and its vendor.",
    recap: [
      'One investigation locates the fault between the room, the closet, the edge node and the vendor cloud.',
      'Outcomes are modeled. Whether virtual nursing reduces workload or falls is not settled by the network.'
    ]
  },
  hops: {
    legacy: [
      [ 'Room camera', 'PoE, continuous video', 'eye' ],
      [ 'Floor closet', 'PoE budget unknown', 'switch' ],
      [ 'Edge node', 'stalled or quiet', 'gpu' ],
      [ 'Vendor relay', 'outside our telemetry', 'cloud' ]
    ],
    tobe: [
      [ 'Topology', 'room to port to closet', 'topology' ],
      [ 'ThousandEyes', 'path to the vendor', 'eye' ],
      [ 'AI Canvas', 'one investigation', 'canvas' ],
      [ 'Approval', 'network and nursing', 'people' ]
    ]
  },
  pathNote: { legacy: 'Three consoles, each reports healthy [H]', tobe: 'Room, closet, edge and vendor path in one view' },
  outcomes: {
    legacy: [
      [ '57%', 'of 880 nurses saw no workload relief from virtual nurses [JAMA Network Open 2025]', 'S' ],
      [ '<150 ms', 'target video round trip in virtual care [American Telemedicine Association 2025]', 'S' ],
      [ '1.02 vs 1.29', 'falls per 1,000 patient-days with and without AI video, not significant [Healthcare (Basel) 2026]', 'S' ]
    ],
    tobe: [
      [ '1 investigation', 'from room device to vendor cloud (modeled)', 'H' ],
      [ '2 approvers', 'network and nursing, before room ports change (modeled)', 'H' ],
      [ 'Audit log', 'of who approved which change (modeled)', 'H' ]
    ]
  },
  kpis: [ 'Time to locate a frozen video session', 'PoE budget left per closet', 'Rooms live against rooms mapped to a port', 'Video round trip per unit' ],
  ask: "If a virtual nurse's video froze tonight, who would know first, and how long before you knew whether it was the camera, the closet or the vendor's cloud?",
  tiles: [
    { l: 'Nurses reporting no workload relief, 880 surveyed [JAMA Network Open 2025]', a: '57%', b: '57%', tag: 'S' },
    { l: 'Target video round trip [American Telemedicine Association 2025]', a: '<150 ms', b: '<150 ms', tag: 'S' },
    { l: 'Length of stay after virtual nursing, nine hospitals [Int J Med Inform 2026]', a: '-0.79 days', b: '-0.79 days', tag: 'S' },
    { l: 'Consoles per frozen session', a: '3 or more', b: '1 investigation', tag: 'H' },
    { l: 'PoE budget per closet', a: 'Unknown', b: 'Listed per closet', tag: 'H' },
    { l: 'Change to room ports', a: 'Ad hoc', b: 'Approved by two people', tag: 'H' }
  ],
  scene: {
    decor: 'vnurse',
    pos: {
      cam: [ 118, 140 ],
      bedn: [ 290, 312 ],
      closet: [ 100, 312 ],
      edge: [ 440, 106 ],
      vn: [ 440, 256 ],
      relay: [ 640, 152 ],
      canvas: [ 110, 418 ],
      appr: [ 280, 418 ],
      topo: [ 450, 418 ],
      te: [ 620, 418 ]
    }
  },
  narr: {
    subtitle: 'A health system puts cameras, microphones and edge AI in hundreds of patient rooms for virtual nurses and fall alerts, on switches and Wi-Fi sized for badge readers and phones.',
    caveat: 'Evidence is mixed: 57% of surveyed nurses saw no workload relief, and a 2026 matched study found no significant fall reduction. Cisco tooling addresses the infrastructure path only; the outcome shown is modeled, not measured.',
    nodes: [
      {
        id: 'cam',
        icon: 'eye',
        title: 'Room cameras',
        sub: { exec: 'One in every room', dir: 'Nursing project rollout', eng: 'PoE, continuous video' },
        hidden: false,
        r: 30
      },
      {
        id: 'bedn',
        icon: 'badge',
        title: 'Bedside nurse',
        sub: { exec: 'Called back to room', dir: 'Unit nursing staff', eng: 'Receives the fall alert' },
        hidden: false,
        r: 30
      },
      {
        id: 'vn',
        icon: 'monitor',
        title: 'Virtual nurse hub',
        sub: { exec: 'Watches many rooms', dir: 'Remote nursing team', eng: 'One video session per room' },
        hidden: false,
        r: 30
      },
      {
        id: 'closet',
        icon: 'router',
        title: 'Floor switch closet',
        sub: { exec: 'Power and uplinks', dir: 'Network team', eng: 'PoE budget, QoS marking' },
        hidden: false,
        r: 30
      },
      {
        id: 'edge',
        icon: 'gpu',
        title: 'Edge inference node',
        sub: { exec: 'Reads the video', dir: 'Vision vendor software', eng: 'Fall detection per room' },
        hidden: false,
        r: 30
      },
      {
        id: 'relay',
        icon: 'cloud',
        title: 'Vendor cloud relay',
        sub: { exec: 'Video leaves the building', dir: 'Vision vendor', eng: 'Outside hospital telemetry' },
        hidden: false,
        r: 30
      },
      {
        id: 'canvas',
        icon: 'canvas',
        title: 'AI Canvas',
        sub: { exec: 'One investigation', dir: 'Network, nursing, vendor path', eng: 'Port, PoE, path, events' },
        hidden: true,
        r: 30
      },
      {
        id: 'topo',
        icon: 'topology',
        title: 'Topology and Inventory',
        sub: { exec: 'Room to switch port', dir: 'Every closet mapped', eng: 'Meraki or Catalyst Center' },
        hidden: true,
        r: 30
      },
      {
        id: 'te',
        icon: 'eye',
        title: 'ThousandEyes',
        sub: { exec: 'Our side or theirs', dir: 'Path to the vendor', eng: 'Tests to vendor endpoints' },
        hidden: true,
        r: 30
      },
      {
        id: 'appr',
        icon: 'people',
        title: 'Network and nursing leads',
        sub: { exec: 'Two people decide', dir: 'Change manager, nursing informatics', eng: 'L3: execute after approve' },
        hidden: true,
        r: 30
      }
    ],
    zones: [
      { id: 'floor', label: 'Inpatient unit', hidden: false, cisco: false },
      { id: 'dc', label: 'Edge compute', hidden: false, cisco: false },
      { id: 'hub', label: 'Virtual nursing hub', hidden: false, cisco: false },
      { id: 'ext', label: 'Outside the hospital', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true }
    ],
    links: [
      { id: 'cam-closet', a: 'cam', b: 'closet', bend: 0 },
      { id: 'closet-edge', a: 'closet', b: 'edge', bend: 0 },
      { id: 'edge-relay', a: 'edge', b: 'relay', bend: 0.1 },
      { id: 'relay-vn', a: 'relay', b: 'vn', bend: -0.1 },
      { id: 'edge-bedn', a: 'edge', b: 'bedn', bend: 0.3 },
      { id: 'vn-bedn', a: 'vn', b: 'bedn', bend: 0 },
      { id: 'topo-closet', a: 'topo', b: 'closet', bend: 0 },
      { id: 'topo-cam', a: 'topo', b: 'cam', bend: 0.1 },
      { id: 'te-relay', a: 'te', b: 'relay', bend: 0 },
      { id: 'canvas-topo', a: 'canvas', b: 'topo', bend: 0 },
      { id: 'canvas-te', a: 'canvas', b: 'te', bend: 0.1 },
      { id: 'canvas-appr', a: 'canvas', b: 'appr', bend: 0 },
      { id: 'appr-closet', a: 'appr', b: 'closet', bend: 0.12 }
    ],
    steps: [
      {
        phase: 'today',
        title: 'Rooms go live faster than closets',
        say: {
          exec: 'Each smart room adds a camera, microphone and screen. The rollout is planned by the nursing project, not against switch power or uplink capacity.',
          dir: 'Nobody holds one list of which rooms are live, which switch ports feed them and how much PoE budget is left in each closet.',
          eng: 'Room devices draw PoE and send continuous video to an edge node or cloud, so port power class, uplink headroom and QoS marking decide picture quality.'
        },
        l: { 'cam-closet': 'ok', 'closet-edge': 'ok', 'edge-relay': 'ok', 'relay-vn': 'ok' },
        facts: [
          { v: '1,800+', l: 'Smart-room devices being installed across one academic health system', s: 'AHA Market Scan 2026, vendor-reported' },
          { v: '<150 ms', l: 'Target for the full video round trip in virtual care, to avoid service interruptions', s: 'American Telemedicine Association 2025' }
        ]
      },
      {
        phase: 'today',
        title: 'The virtual nurse sees a frozen picture',
        say: {
          exec: 'When video stalls, the virtual nurse loses sight of the patient and the bedside nurse is called back. That is the workload the program was meant to remove.',
          dir: 'The camera vendor, the network team and the video platform each check their own console, and each reports healthy.',
          eng: "Symptoms span switch PoE events, Wi-Fi roaming, QoS re-marking at the distribution layer and the vendor's cloud relay, with no shared timestamped trace."
        },
        n: { vn: 'warn', bedn: 'warn', closet: 'unknown', relay: 'unknown' },
        l: { 'cam-closet': 'warn', 'relay-vn': 'warn', 'vn-bedn': 'warn' },
        callout: { node: 'vn', text: 'The picture froze. Every console reports healthy.' },
        facts: [
          { v: '57%', l: 'Hospital nurses (880 surveyed) who said virtual nurses did not reduce their workload', s: 'JAMA Network Open 2025' },
          { v: '-0.79 days', l: 'Hospital length of stay after virtual nursing across nine hospitals (129,080 encounters)', s: 'Int J Med Inform 2026' }
        ],
        clock: { label: 'Time to locate the fault', mode: 'run' }
      },
      {
        phase: 'today',
        title: 'A fall alert arrives late or never',
        say: {
          exec: 'A fall alert that depends on an overloaded closet or a stalled edge node can arrive late, and a correct alert still fails if staff cannot arrive.',
          dir: 'Privacy questions land at the same time: who can view a room, what is recorded and where frames leave the building.',
          eng: 'Without per-room health checks, an inference node that has stopped processing looks identical to a quiet room.'
        },
        n: { edge: 'down', bedn: 'warn' },
        l: { 'closet-edge': 'warn', 'edge-bedn': 'down' },
        label: { edge: 'Stalled, or a quiet room?' },
        facts: [
          {
            v: '1.02 vs 1.29',
            l: 'Falls per 1,000 patient-days with and without AI video monitoring; difference not statistically significant',
            s: 'Healthcare (Basel) 2026'
          }
        ]
      },
      {
        phase: 'cisco',
        title: 'One view from room to cloud',
        say: {
          exec: "Same frozen picture. This time operations asks one question and sees room devices, switch power, wireless health and the vendor's cloud path on one canvas.",
          dir: 'AI Canvas in Cloud Control would pull Meraki or Catalyst Center port and PoE data, ThousandEyes path tests and Splunk events into one investigation.',
          eng: "Topology and Inventory would map each room device to its switch port and closet, with ThousandEyes tests to the vision vendor's endpoints and device logs in Splunk."
        },
        show: [ 'cc', 'canvas', 'topo', 'te' ],
        n: { vn: 'warn', bedn: 'ok', closet: 'warn', edge: 'ok', relay: 'ok', canvas: 'ok', topo: 'ok', te: 'ok' },
        l: {
          'cam-closet': 'warn',
          'closet-edge': 'ok',
          'edge-relay': 'ok',
          'relay-vn': 'ok',
          'vn-bedn': 'off',
          'edge-bedn': 'ok',
          'topo-closet': 'warn',
          'topo-cam': 'ok',
          'te-relay': 'ok',
          'canvas-topo': 'ok',
          'canvas-te': 'ok'
        },
        label: { edge: '' },
        callout: { node: 'topo', text: 'The vendor path tests clean. One closet is short of PoE for its rooms.' },
        clock: { label: '', mode: 'hide' }
      },
      {
        phase: 'cisco',
        title: 'Nursing informatics approves the change',
        say: {
          exec: 'Before a switch or QoS change reaches patient rooms, named network and nursing approvers see the change, the rooms affected and the rollback.',
          dir: 'The Actions queue would hold the change until it is approved, and the Audit log would record who approved what and when.',
          eng: 'The approved change (PoE priority, QoS policy or port move) is pushed by Catalyst Center or the Meraki dashboard, not by the agent directly.'
        },
        show: [ 'appr' ],
        n: { appr: 'pending' },
        l: { 'canvas-appr': 'pending' },
        modal: {
          title: 'Patient-room port change',
          lines: [
            "Raise PoE priority and apply the video QoS policy on one unit's closets.",
            'Approvers: network change manager, nursing informatics lead',
            'Executes in: Catalyst Center or Meraki'
          ],
          button: 'Approve'
        }
      },
      {
        phase: 'cisco',
        title: 'Modeled: faster isolation, same clinical questions',
        say: {
          exec: 'Modeled outcome: the fault is located in one investigation instead of a multi-team call. Whether virtual nursing reduces workload or falls is not something the network settles.',
          dir: 'The model assumes room devices, switches and the vendor path are all onboarded; rooms on unmanaged switches stay invisible.',
          eng: "This outcome is modeled, not measured. Camera firmware, model accuracy and the vendor's cloud stay outside Cisco telemetry except as measured from the network edge."
        },
        n: { appr: 'ok', closet: 'ok', vn: 'ok' },
        l: { 'canvas-appr': 'ok', 'appr-closet': 'ok', 'cam-closet': 'ok', 'topo-closet': 'ok' },
        chips: [ [ 'AI Canvas', 'GA (US)' ], [ 'Topology, Inventory', 'GA (US)' ], [ 'ThousandEyes', 'GA (US)' ], [ 'Actions, Audit log', 'GA (US)' ] ]
      }
    ]
  }
};
