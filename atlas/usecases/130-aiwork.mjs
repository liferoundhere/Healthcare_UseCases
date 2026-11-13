// Use case UC10: AI at work. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'aiwork',
  code: 'UC10',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'AI',
  pillars: [ 'AI', 'Security', 'Facilities' ],
  short: 'AI at work',
  name: 'The scribe stops at 8:12',
  setting: 'A clinic, its Wi-Fi and the AI vendor outside the hospital',
  personas: [ 'Chief Medical Information Officer', 'Clinic operations manager', 'Network engineer', 'CISO', 'Vendor manager' ],
  vision: 'When the scribe stops, the team can say in minutes whether the clinic, the vendor or the upstream model is the cause, shadow AI meets a guardrail, and the cost of tokens is visible.',
  legacy: {
    banner: 'Monday clinic. Notes stop generating in four exam rooms. The network team spends two hours on Wi-Fi while the vendor status page names an upstream model. Meanwhile, a clinician opens an unapproved chatbot.',
    strip: 'Today: an AI vendor outside every dashboard, shadow AI is the workaround [H]',
    who: 'Monday 8:12 a.m. (sim)',
    silos: [
      [ 'Clinic Wi-Fi dashboard', 'all green [H]', '', 'wifi' ],
      [ 'Scribe vendor status page', 'names an upstream model [H]', 'p', 'cloud' ],
      [ 'Support ticket', 'two hours, no owner [H]', 'p', 'doc' ],
      [ 'DLP or egress policy', 'not AI-aware [H]', '', 'lock' ],
      [ 'Token and usage billing', 'monthly, late [H]', 'p', 'board' ],
      [ 'AI policy document', 'not enforced [H]', '', 'doc' ]
    ],
    gaps: [
      'The vendor path is outside the map [H]',
      'Wi-Fi gets blamed first [H]',
      'Shadow AI fills the gap [H]',
      'Token cost arrives a month late [H]',
      'No gate between a model change and a note'
    ],
    big: [ '17%', 'of clinicians admit unapproved AI use [Wolters Kluwer 2025]' ],
    recap: 'The scribe stops in four exam rooms; two hours go to Wi-Fi while the cause sits upstream.'
  },
  tobe: {
    banner: 'ThousandEyes shows the clinic side green and the vendor hop amber in minutes. AI Defense finds the unapproved chatbot and puts a guardrail on it. Tokenomics shows what the scribe costs.',
    strip: 'ThousandEyes, AI Defense, Tokenomics, AI Canvas',
    who: 'Monday 8:12 a.m. (sim)',
    console: {
      title: 'Cloud Control | AI at work',
      body: 'Clinic hops green, vendor hop amber, upstream gray by design. AI Defense finds unapproved apps; Tokenomics shows model and token cost per use.',
      foot: 'The physician still reviews every note',
      rows: [
        [ 'Time spent on Wi-Fi', '2 hours', 'minutes, with evidence', 0, 'clock' ],
        [ 'Vendor and upstream', 'unknown', 'labeled by owner', 0, 'cloud' ],
        [ 'Unapproved chatbot', 'invisible', 'found, guardrail on', 1, 'shield' ],
        [ 'Token cost per use', 'monthly bill', 'visible per use', 1, 'board' ],
        [ 'Clinical note', 'physician reviews', 'physician reviews', 1, 'person' ]
      ]
    },
    stays: 'The clinician reviews every note, and the scribe vendor remains the vendor. Cloud Control labels the path; it does not fix the vendor.',
    recap: [
      'Our side is green and the vendor is the delay, shown in minutes, not hours.',
      'Outcomes are modeled: a guardrail on shadow AI and token cost made visible. The 8-minute clear time is illustrative.'
    ]
  },
  hops: {
    legacy: [
      [ 'Exam room', 'audio uplink', 'mic' ],
      [ 'Clinic Wi-Fi', 'blamed first', 'wifi' ],
      [ 'Scribe vendor', 'status page only', 'cloud' ],
      [ 'Upstream model', 'named late', 'gpu' ]
    ],
    tobe: [
      [ 'ThousandEyes', 'path by owner', 'eye' ],
      [ 'AI Defense', 'finds shadow AI', 'shield' ],
      [ 'Tokenomics', 'cost per use', 'board' ],
      [ 'AI Canvas', 'one investigation', 'canvas' ]
    ]
  },
  pathNote: { legacy: 'The cause was upstream, outside every map [H]', tobe: 'Clinic green, vendor amber, upstream gray' },
  outcomes: {
    legacy: [
      [ '13.4 min', 'less EHR time per 8 scheduled hours, five systems [JAMA 2026]', 'S' ],
      [ '79%', 'organizations using ambient speech [KLAS via TechTarget]', 'S' ],
      [ '70%', 'simulated notes with an error, 31 of 44 [JMIR 2025]', 'S' ]
    ],
    tobe: [
      [ 'Minutes', 'to separate clinic, vendor and upstream (modeled)', 'H' ],
      [ 'Guardrail', 'in front of unapproved AI apps', 'H' ],
      [ 'Visible', 'token cost per use', 'H' ]
    ]
  },
  kpis: [ 'Time to attribute a scribe outage', 'Unapproved AI apps found', 'Token cost per visit', 'Notes edited by the physician' ],
  ask: 'When the scribe stops, how long until you know whether it is your network or someone upstream?',
  tiles: [
    { l: 'Less EHR time per 8 scheduled hours [JAMA 2026]', a: '13.4 min', b: '13.4 min', tag: 'S' },
    { l: 'Organizations using ambient speech [KLAS]', a: '79%', b: '79%', tag: 'S' },
    { l: 'Clinicians admitting unapproved AI use [Wolters Kluwer]', a: '17%', b: '17%', tag: 'S' },
    { l: 'Time spent on the wrong layer', a: '2 hours', b: 'minutes', tag: 'I' },
    { l: 'Unapproved AI', a: 'Unseen', b: 'Guardrail on', tag: 'H' },
    { l: 'Token cost', a: 'Monthly bill', b: 'Per use', tag: 'H' }
  ],
  narrPatch: {
    steps: {
      5: { say: { dir: 'AI Defense discovery controls the chatbot; it does not read the note. Agent Builder is announced, not available.' } },
    },
  },
  scene: {
    hide: ['walkers'],
    decor: 'aiwork',
    pos: {
      room: [ 90, 142 ],
      ap: [ 90, 294 ],
      md: [ 260, 142 ],
      chat: [ 260, 294 ],
      vendor: [ 450, 146 ],
      up: [ 630, 146 ],
      te: [ 110, 418 ],
      def: [ 365, 418 ],
      tok: [ 620, 418 ]
    }
  }
};
