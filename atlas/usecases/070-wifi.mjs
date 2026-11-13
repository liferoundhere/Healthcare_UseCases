// Use case UC4: Clinical Wi-Fi. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'wifi',
  code: 'UC4',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Infrastructure',
  pillars: [ 'Facilities', 'Security' ],
  short: 'Clinical Wi-Fi',
  name: 'The badge call has to roam',
  setting: '4 West corridor, stairwell and the clinical systems behind it',
  personas: [ 'Chief nursing officer', 'Rapid response lead', 'Wireless network engineer', 'Clinical communications owner', 'Facilities engineer' ],
  vision: 'The badge, the AP, the closet and the nurse-call platform are one timeline, so a stairwell drop is attributed to a layer and not argued by two teams.',
  legacy: {
    banner: 'A voice badge drops in the stairwell during a rapid response. The laptop on the same access point was fine, so the wireless team and the nurse-call vendor each say it is not them.',
    strip: 'Today: radio, PoE closet and voice platform are three owners [H]',
    who: 'Rapid response, 4 West (sim)',
    silos: [
      [ 'Wireless controller', 'signal looks fine [H]', '', 'wifi' ],
      [ 'PoE closet and switch', 'power and ports [H]', '', 'switch' ],
      [ 'Voice badge platform', 'its own logs [H]', 'p', 'badge' ],
      [ 'Nurse call system', 'separate vendor [H]', 'p', 'bell' ],
      [ 'RTLS platform', 'tag data only [H]', 'p', 'sensor' ],
      [ 'Site survey PDF', 'last survey date [H]', '', 'doc' ]
    ],
    gaps: [
      'Roam failures are not logged as clinical events [H]',
      'Laptops pass, badges drop [H]',
      'Closet power and radio never meet [H]',
      'Survey age is unknown [H]',
      'Nobody sees the stairwell'
    ],
    big: [ '-65 dBm', 'voice badge minimum, with 25 dB SNR [Vocera design guide]' ],
    recap: 'The badge drops in the stairwell, the laptop on the same AP is fine, and two teams point at each other.'
  },
  tobe: {
    banner: 'AI Canvas lines up the badge roam, the AP, the PoE closet and the nurse-call events on one timeline. Cisco Spaces here shows connector health only, never where a patient is.',
    strip: 'AI Canvas, Meraki, Catalyst Center, Spaces connector',
    who: 'Rapid response, 4 West (sim)',
    console: {
      title: 'Cloud Control | the roam',
      body: 'Wi-Fi, switch and clinical-system events in one view. The cause is attributed to a layer; changes go through the wireless and facilities owners.',
      foot: 'Spaces shows connector health only',
      rows: [
        [ 'Teams that own the drop', '3', 'one timeline', 0, 'people' ],
        [ 'Stairwell coverage', 'unknown', 'measured', 0, 'wifi' ],
        [ 'Cause', 'argued', 'attributed to a layer', 1, 'topology' ],
        [ 'Nurse-call link', 'separate', 'on the same timeline', 1, 'bell' ],
        [ 'Patient location', 'not shown', 'not shown, by design', 2, 'lock' ]
      ]
    },
    stays: 'The wireless controller, the voice platform and nurse call stay the systems of record. Spaces is not a patient-location source.',
    recap: [ 'One timeline lines up the badge, the AP and the closet.', 'Outcomes are modeled: a faster attribution of the drop. No patient-harm event is claimed.' ]
  },
  hops: {
    legacy: [
      [ 'Voice badge', 'drops on roam', 'badge' ],
      [ 'Stairwell AP', 'weak edge coverage', 'wifi' ],
      [ 'PoE closet', 'separate owner', 'switch' ],
      [ 'Nurse call', 'separate vendor', 'bell' ]
    ],
    tobe: [
      [ 'Meraki / Catalyst', 'roam and radio', 'wifi' ],
      [ 'ThousandEyes', 'path to services', 'eye' ],
      [ 'AI Canvas', 'one timeline', 'canvas' ],
      [ 'Spaces connector', 'health only', 'sensor' ]
    ]
  },
  pathNote: { legacy: 'Three owners per drop [H]', tobe: 'One timeline from badge to nurse call' },
  outcomes: {
    legacy: [
      [ '-65 dBm', 'voice badge minimum, with 25 dB SNR [Vocera design guide]', 'S' ],
      [ '< 100 ms', 'acceptable voice roam [Vocera design guide]', 'S' ],
      [ '8.9 s', 'badge reconnect with SSO, down from 29.3 s [19-hospital study]', 'S' ]
    ],
    tobe: [
      [ '1 timeline', 'badge, AP, closet and nurse call (modeled)', 'H' ],
      [ '1 layer', 'named as the cause with evidence', 'H' ],
      [ '0', 'patient locations drawn from Spaces', 'S' ]
    ]
  },
  kpis: [ 'Time to attribute a roam drop', 'Stairwell and elevator coverage gaps', 'Badge reconnect time', 'Survey age by floor' ],
  ask: 'When a badge drops in a stairwell, whose problem is it, and how do you know?',
  tiles: [
    { l: 'Voice badge minimum signal [Vocera]', a: '-65 dBm', b: '-65 dBm', tag: 'S' },
    { l: 'Acceptable voice roam [Vocera]', a: '< 100 ms', b: '< 100 ms', tag: 'S' },
    { l: 'Badge reconnect with SSO [19-hospital study]', a: '8.9 s', b: '8.9 s', tag: 'S' },
    { l: 'Owners of a drop', a: '3', b: '1 timeline', tag: 'H' },
    { l: 'Stairwell coverage', a: 'Unknown', b: 'Measured', tag: 'H' },
    { l: 'Patient location via Spaces', a: 'No', b: 'No', tag: 'S' }
  ],
  scene: {
    decor: 'wifi',
    pos: {
      ap1: [ 130, 134 ],
      ap2: [ 420, 134 ],
      badge: [ 270, 168 ],
      idf: [ 130, 318 ],
      nc: [ 565, 142 ],
      rtls: [ 640, 286 ],
      canvas: [ 110, 418 ],
      mer: [ 365, 418 ],
      spaces: [ 620, 418 ]
    }
  }
};
