// Use case UC6: Hospital at home. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'home',
  code: 'UC6',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Infrastructure',
  pillars: [ 'Facilities', 'Security', 'AI' ],
  short: 'Hospital at home',
  name: 'The hospital that is a living room',
  setting: "The patient's home, the public internet and the command center",
  personas: [ 'Chief medical officer', 'Hospital-at-home program director', 'Command center nurse', 'Network engineer', 'CISO' ],
  vision: 'The hospital shows the part of the path it owns, labels the part it does not, and gives the clinician evidence when a video visit fails, without calling the broadband provider blind.',
  legacy: {
    banner: "Acute Hospital Care at Home needs an audio link on demand and emergency personnel at the home within 30 minutes. The broadband in between is not the hospital's, and the kit has nowhere to fall back to.",
    strip: "Today: the patient's ISP is invisible, a failed visit is a phone call [H]",
    who: 'Evening video visit (sim)',
    silos: [
      [ 'Home RPM kit portal', 'device status only [H]', 'p', 'sensor' ],
      [ 'Video platform logs', 'session ended [H]', 'p', 'chat' ],
      [ 'Command center board', 'who is due [H]', '', 'board' ],
      [ 'Patient ISP', 'consumer circuit [H]', 'p', 'globe' ],
      [ 'EHR', 'the record only [H]', '', 'server' ],
      [ 'Escalation phone tree', 'manual [H]', 'p', 'phone' ]
    ],
    gaps: [
      "The ISP is outside the hospital's view [H]",
      'Failed visits look like patient error [H]',
      'No fallback path in the kit [H]',
      'Access to the EHR is a shared pipe [H]',
      'No end-to-end health for a home'
    ],
    big: [ '358', 'approved hospital-at-home CCNs [CMS, 19 Oct 2026]' ],
    recap: 'A patient at home loses video; the hospital does not own the broadband and cannot see where it broke.'
  },
  tobe: {
    banner: 'ThousandEyes labels each hop: the hospital side and the video platform green with evidence, the patient\'s ISP gray on purpose, never green by assumption. Secure Access protects the clinician path to the EHR, and a cellular gateway gives a fallback.',
    strip: 'ThousandEyes, Cisco Secure Access, AI Canvas, cellular gateway',
    who: 'Evening video visit (sim)',
    console: {
      title: 'Cloud Control | the home path',
      body: 'Hospital hops and the video platform are measured; the ISP hop stays gray on purpose, never green by assumption. Fallback to cellular is a design choice, not a promise.',
      foot: 'The ISP is never shown as green',
      rows: [
        [ 'Our side of the path', 'unknown', 'green', 0, 'check' ],
        [ 'The ISP hop', 'invisible', 'gray, labeled as not ours', 0, 'globe' ],
        [ 'Clinician access to EHR', 'shared pipe', 'zero-trust access', 1, 'lock' ],
        [ 'Fallback', 'none', 'cellular gateway', 1, 'wifi' ],
        [ 'Failed visit', 'a phone tree', 'a labeled hop', 1, 'topology' ]
      ]
    },
    stays: "The video platform, the RPM vendor and the EHR stay as they are. The patient's broadband is never the hospital's to fix.",
    recap: [
      'Each hop is labeled; the ISP is gray on purpose, never green by assumption.',
      "Outcomes are modeled: an evidence-based call to the right owner. One program's results are not generalized."
    ]
  },
  hops: {
    legacy: [
      [ 'RPM kit', 'device status only', 'sensor' ],
      [ 'Patient ISP', 'invisible to us', 'globe' ],
      [ 'Video visit', 'session ends', 'chat' ],
      [ 'Command center', 'phones the patient', 'phone' ]
    ],
    tobe: [
      [ 'ThousandEyes', 'labels every hop', 'eye' ],
      [ 'Cellular gateway', 'fallback path', 'wifi' ],
      [ 'Secure Access', 'clinician to EHR', 'lock' ],
      [ 'AI Canvas', 'one view of the visit', 'canvas' ]
    ]
  },
  pathNote: { legacy: 'The middle of the path is not ours [H]', tobe: 'Green where it is ours, gray where it is not' },
  outcomes: {
    legacy: [
      [ '358', 'approved hospital-at-home CCNs [CMS, 19 Oct 2026]', 'S' ],
      [ '2030', 'AHCAH waiver runs through 30 Sep 2030 [CMS]', 'S' ],
      [ '$536M', 'Medicare RPM payments in 2024, up 31% [HHS OIG]', 'S' ]
    ],
    tobe: [
      [ '1 view', 'of the visit path, labeled by owner (modeled)', 'H' ],
      [ 'Gray', 'for the ISP, labeled, never green', 'H' ],
      [ '1 fallback', 'a cellular path in the kit', 'H' ]
    ]
  },
  kpis: [ 'Video visit completion rate', 'Time to name the failing hop', 'Fallback activation rate', 'Visits needing a phone call' ],
  ask: 'When a home video visit fails, can you tell the clinician whose problem it is?',
  tiles: [
    { l: 'Approved hospital-at-home CCNs [CMS]', a: '358', b: '358', tag: 'S' },
    { l: 'AHCAH waiver through [CMS]', a: '2030', b: '2030', tag: 'S' },
    { l: 'Medicare RPM payments 2024 [HHS OIG]', a: '$536M', b: '$536M', tag: 'S' },
    { l: 'View of the home path', a: 'None', b: 'Labeled hops', tag: 'H' },
    { l: 'Fallback in the kit', a: 'None', b: 'Cellular', tag: 'H' },
    { l: 'Patient ISP shown as green', a: 'No', b: 'Never', tag: 'I' }
  ],
  narrPatch: {
    steps: { 2: { callout: { node: 'isp', text: 'Visit dropped. Not our circuit, no evidence.' } } },
    subtitle: 'Acute Hospital Care at Home needs an on-demand audio link and emergency personnel at the home within 30 minutes. The broadband is not the hospital\'s.',
  },
  scene: {
    hide: ['walkers'],
    decor: 'home',
    pos: {
      kit: [ 90, 150 ],
      cell: [ 90, 292 ],
      isp: [ 330, 150 ],
      video: [ 330, 296 ],
      cmd: [ 540, 150 ],
      ehr: [ 640, 296 ],
      te: [ 110, 418 ],
      zt: [ 365, 418 ],
      canvas: [ 620, 418 ]
    }
  }
};
