// Use case F3: AI in care. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'ai',
  code: 'F3',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Flagship',
  pillars: [ 'AI', 'Security', 'Facilities' ],
  short: 'AI in care',
  name: 'The data path, the gate, and the clinician',
  setting: 'Exam room, CT suite, GPU rack, reading room and the vendor cloud',
  personas: [ 'Chief Medical Information Officer', 'Chief AI officer', 'CISO', 'Radiologist', 'Facilities engineer' ],
  vision: 'The path to every AI vendor is visible, unsanctioned AI meets a guardrail, and any AI-driven change that can touch care waits for a person. The clinical record stays in the EHR and the physician still signs.',
  legacy: {
    banner: 'Audio from an exam room and pixels from a CT are trying to reach two different models. A person still signs the note and the read, but nobody can see the path.',
    strip: 'Today: vendor hops dark, GPU racks unplanned [H]',
    who: 'Monday morning clinic (sim)',
    silos: [
      [ 'Scribe vendor status page', 'outside our map [H]', 'p', 'cloud' ],
      [ 'Wi-Fi dashboard', 'sees our edge only [H]', '', 'wifi' ],
      [ 'Imaging AI queue', 'worklist hides delay [H]', '', 'ct' ],
      [ 'Power and cooling', 'facilities learns last [H]', '', 'plug' ],
      [ 'DLP or egress policy', 'not AI-aware [H]', '', 'lock' ],
      [ 'AI policy document', 'not enforced [H]', '', 'doc' ]
    ],
    gaps: [
      'Vendor and upstream hops are dark [H]',
      'Shadow AI is the workaround [H]',
      'GPU racks need 10x the power [H]',
      'Inference queue time is invisible [H]',
      'No gate before an AI-driven change [H]'
    ],
    big: [ '81%', 'of physicians use AI at work [AMA 2026]' ],
    recap: 'AI is already in the visit: audio to a scribe vendor, images through a GPU model to PACS.'
  },
  tobe: {
    banner: 'ThousandEyes in AI Canvas shows the path to the vendor, AI Defense finds and guards unsanctioned AI, and an approval gate stands before any AI-driven change. The physician still signs.',
    strip: 'AI Canvas, ThousandEyes, AI Defense, Agent Observability, Data Fabric',
    who: 'Monday morning clinic (sim)',
    console: {
      title: 'Cloud Control | AI paths',
      body: 'Hospital hops green, vendor hop amber, sub-processor gray on purpose. AI Defense discovers unsanctioned apps; agents that change things wait for approval.',
      foot: 'The physician still signs the note',
      rows: [
        [ 'Our side of the path', 'unknown', 'green', 0, 'wifi' ],
        [ 'Vendor endpoint', 'unknown', 'amber, evidence in hand', 0, 'cloud' ],
        [ 'Vendor sub-processor', 'unknown', 'gray, by design', 0, 'lock' ],
        [ 'Unsanctioned chatbot', 'invisible', 'found, guardrail on', 1, 'shield' ],
        [ 'AI-driven change', 'ungated', 'waits for a person', 2, 'person' ]
      ]
    },
    stays: 'The clinical record stays in the EHR. AI Defense does not read the note. Agent Builder and App Builder are announced, not available.',
    recap: [
      'Now we can show the clinic that our side is green and the vendor is the delay.',
      'Outcomes are modeled: a guardrail on shadow AI and a gate before any change. No percentage is claimed.'
    ]
  },
  hops: {
    legacy: [
      [ 'Exam room audio', 'uplink to vendor', 'mic' ],
      [ 'Vendor and upstream', 'dark to us', 'cloud' ],
      [ 'GPU rack', 'queue invisible', 'gpu' ],
      [ 'Worklist', 'AI late or missing?', 'doc' ]
    ],
    tobe: [
      [ 'ThousandEyes in AI Canvas', 'path to the vendor', 'eye' ],
      [ 'AI Defense', 'discover and guard', 'shield' ],
      [ 'Agent Observability', 'trace and token cost', 'chat' ],
      [ 'Approval gate', 'a person decides', 'person' ]
    ]
  },
  pathNote: { legacy: 'Vendor path and GPU queue unseen [H]', tobe: 'Path, guardrail and gate in one view' },
  outcomes: {
    legacy: [
      [ '81%', 'physicians using AI at work [AMA 2026]', 'S' ],
      [ '11.2 min', 'door-to-groin cut with stroke AI triage [JAMA Neurology 2023]', 'S' ],
      [ '120 to 132 kW', 'one GPU rack, versus about 9 kW typical [vendor specs]', 'S' ]
    ],
    tobe: [
      [ 'Evidence', 'to call the vendor instead of guessing (modeled)', 'H' ],
      [ 'Guardrail', 'in front of unsanctioned AI apps', 'H' ],
      [ 'Gate', 'before any AI-driven change reaches care', 'H' ]
    ]
  },
  kpis: [ 'Time to say whose side the delay is on', 'Unsanctioned AI apps found', 'AI-driven changes approved vs blocked', 'GPU rack power headroom' ],
  ask: 'When the scribe stalls, who can prove whether it is our network, the vendor or their supplier?',
  tiles: [
    { l: 'Physicians using AI at work [AMA 2026]', a: '81%', b: '81%', tag: 'S' },
    { l: 'Stroke AI triage, door-to-groin [JAMA Neurol. 2023]', a: '-11.2 min', b: '-11.2 min', tag: 'S' },
    { l: 'GPU rack power vs typical [vendor specs]', a: '120 to 132 kW', b: '120 to 132 kW', tag: 'S' },
    { l: 'Path to the AI vendor', a: 'Dark', b: 'Visible, labeled', tag: 'H' },
    { l: 'Shadow AI', a: 'Unseen', b: 'Found, guarded', tag: 'H' },
    { l: 'AI-driven change', a: 'Ungated', b: 'Approval gate', tag: 'H' }
  ],
  narrPatch: {
    steps: {
      4: { callout: { node: 'gpu', text: '120 to 132 kW for one rack.' } },
      6: { say: { eng: 'Discovery of unsanctioned AI apps plus runtime policy. Agent Builder and App Builder are announced, not available.' } },
    },
  },
  scene: {
    decor: 'ai',
    pos: {
      mic: [ 82, 134 ],
      ct: [ 80, 290 ],
      gpu: [ 268, 290 ],
      pacs: [ 270, 150 ],
      md: [ 408, 222 ],
      vendor: [ 566, 146 ],
      up: [ 676, 146 ],
      chat: [ 628, 290 ],
      te: [ 110, 418 ],
      def: [ 280, 418 ],
      gate: [ 450, 418 ],
      tok: [ 620, 418 ]
    }
  }
};
