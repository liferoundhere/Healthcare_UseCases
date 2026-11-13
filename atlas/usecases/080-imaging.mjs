// Use case UC5: Imaging. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'imaging',
  code: 'UC5',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Infrastructure',
  pillars: [ 'Facilities', 'AI', 'Security' ],
  short: 'Imaging',
  name: 'The study has to reach the reader',
  setting: 'Outpatient imaging center, the WAN and the main hospital',
  personas: [ 'Chief medical officer', 'Radiology director', 'PACS administrator', 'Network engineer', 'Stroke program lead' ],
  vision: 'The path from the scanner to the reader is measured on both sides, so a slow study is attributed to the clinic link, the PACS or the AI queue and not to a guess.',
  legacy: {
    banner: 'A stroke CT is the critical path. The scanner says sent, the radiologist says nothing arrived, and the clinic link, the PACS and the AI queue each look fine in their own tool.',
    strip: 'Today: scanner logs, WAN charts and PACS queues are three views [H]',
    who: 'Stroke code, 2 a.m. (sim)',
    silos: [
      [ 'Modality logs', 'study sent [H]', '', 'ct' ],
      [ 'WAN or ISP portal', 'circuit up [H]', 'p', 'globe' ],
      [ 'PACS and VNA queue', 'its own timestamps [H]', '', 'database' ],
      [ 'Imaging AI worklist', 'hides delay [H]', '', 'gpu' ],
      [ 'Radiology worklist', 'reader view only [H]', '', 'monitor' ],
      [ 'Transfer log export', 'manual, after the fact [H]', '', 'doc' ]
    ],
    gaps: [
      'No timestamp spans scanner to reader [H]',
      'Link health is not study health [H]',
      'AI triage delay hides in a queue [H]',
      'Clinics are outside the main dashboards [H]',
      'Nobody owns end-to-end transfer time'
    ],
    big: [ '60 min', 'door-to-needle goal for 85% of eligible stroke patients [AHA Target: Stroke]' ],
    recap: 'The CT is done, the study is in transit, and the reader is waiting without knowing why.'
  },
  tobe: {
    banner: 'ThousandEyes and the Nexus and Intersight fabric are tied to the study transfer log in the Machine Data Lake. The delay is attributed to a hop and the owner is named.',
    strip: 'ThousandEyes, Nexus and Intersight, Machine Data Lake, AI Canvas',
    who: 'Stroke code, 2 a.m. (sim)',
    console: {
      title: 'Cloud Control | study transfer',
      body: 'Scanner, WAN, PACS and AI queue on one timeline. Transfer times in this story are labeled arithmetic, not measurements.',
      foot: 'Transfer times are arithmetic, not measured',
      rows: [
        [ 'Timestamps that span the path', 'none', 'one timeline', 0, 'clock' ],
        [ 'Delay attributed to', 'a guess', 'a named hop', 0, 'topology' ],
        [ 'Clinic link', 'up or down', 'tested continuously', 1, 'globe' ],
        [ 'AI queue time', 'hidden', 'visible', 1, 'gpu' ],
        [ 'Owner of the delay', 'unclear', 'named', 1, 'person' ]
      ]
    },
    stays: 'PACS, VNA and the radiology worklist stay the systems of record. Imaging AI does not always speed the read; the point here is visibility.',
    recap: [
      'One timeline spans the scanner, the link, the PACS and the reader.',
      'Outcomes are modeled: a delay attributed to a hop. Imaging AI is not claimed to always speed the read.'
    ]
  },
  hops: {
    legacy: [
      [ 'CT gantry', 'study sent', 'ct' ],
      [ 'Clinic link', 'up, not measured', 'globe' ],
      [ 'PACS / VNA', 'queue is separate', 'database' ],
      [ 'Radiologist', 'waiting', 'monitor' ]
    ],
    tobe: [
      [ 'ThousandEyes', 'clinic link tested', 'eye' ],
      [ 'Nexus / Intersight', 'fabric and compute', 'rack' ],
      [ 'Transfer logs', 'in the data lake', 'database' ],
      [ 'AI Canvas', 'one timeline', 'canvas' ]
    ]
  },
  pathNote: { legacy: 'No timestamp spans scanner to reader [H]', tobe: 'Scanner to reader on one timeline' },
  outcomes: {
    legacy: [
      [ '60 min', 'door-to-needle goal, 85% of eligible patients [AHA Target: Stroke]', 'S' ],
      [ '22 min', 'PE report turnaround saved, day shift only [JACR 2025]', 'S' ],
      [ '147 vs 150', 'ICH AI triage, report minutes: no clear gain [AJR 2025]', 'S' ]
    ],
    tobe: [ [ '1 timeline', 'scanner to reader (modeled)', 'H' ], [ '1 hop', 'named as the delay', 'H' ], [ 'Honest', 'AI is not promised to speed every read', 'H' ] ]
  },
  kpis: [ 'Study transfer time, scanner to PACS', 'Time from scan to read', 'AI queue wait', 'Clinic link health per study' ],
  ask: 'When a stroke study is slow, can you tell in minutes whether it is the link, the PACS or the AI queue?',
  tiles: [
    { l: 'Door-to-needle goal, 85% of eligible [AHA]', a: '60 min', b: '60 min', tag: 'S' },
    { l: 'PE report turnaround saved, day shift [JACR 2025]', a: '22 min', b: '22 min', tag: 'S' },
    { l: 'ICH AI triage report time [AJR 2025]', a: '147 vs 150', b: '147 vs 150', tag: 'S' },
    { l: 'Timestamps across the path', a: 'None', b: 'One timeline', tag: 'H' },
    { l: 'Delay attributed to', a: 'A guess', b: 'A hop', tag: 'H' },
    { l: 'AI queue wait', a: 'Hidden', b: 'Visible', tag: 'H' }
  ],
  narrPatch: {
    steps: {
      4: { n: { wan: 'warn' }, label: { wan: 'Saturated' } },
      5: {
        say: { dir: 'Images that leave for a cloud model need a BAA unless they are de-identified. The pixel archive stays the VNA.' },
        label: { wan: 'Right-sized', rad: 'Reads the study' },
        callout: { node: 'rad', text: 'The study arrives. The radiologist reads it.' },
        chips: [['ThousandEyes', 'GA (US)'], ['Nexus Dashboard, Intersight', 'GA (US)'], ['Catalyst SD-WAN', 'GA (US)'], ['Machine Data Lake', 'GA, listed regions']],
      },
    },
  },
  scene: {
    decor: 'imaging',
    pos: { ct: [ 100, 160 ], wan: [ 350, 200 ], pacs: [ 545, 128 ], ai: [ 660, 128 ], rad: [ 570, 296 ], te: [ 110, 418 ], fab: [ 365, 418 ], lake: [ 620, 418 ] }
  }
};
