// Use case UC8: Identity. Content and node placement. The narrative (nodes, links, steps) is looked up by id
// in ../stage/js/narrative.js because this file has no `narr` field. See atlas/AUTHORING.md.
export default {
  id: 'identity',
  code: 'UC8',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'Infrastructure',
  pillars: [ 'Security' ],
  short: 'Identity',
  name: 'Fast for the nurse, strong for the vendor',
  setting: 'Who signs in, the directories behind them and the break-glass desk',
  personas: [ 'CISO', 'CMIO', 'Identity and access lead', 'Chief nursing officer', 'Third-party risk manager' ],
  vision: 'Clinicians tap and go, vendors get scoped and logged access with a second factor, and one identity baseline spans three directories left by three mergers.',
  legacy: {
    banner: 'A hospitalist taps a badge and is in. A modality vendor uses a shared account with no second factor. Three directories from three mergers sit behind both, and break-glass is an envelope.',
    strip: 'Today: three directories, shared vendor accounts, an envelope for break-glass [H]',
    who: 'A normal Tuesday (sim)',
    silos: [
      [ 'Directory A', 'legacy hospital [H]', '', 'key' ],
      [ 'Directory B', 'acquired system [H]', '', 'key' ],
      [ 'Cloud identity provider', 'new apps only [H]', '', 'cloud' ],
      [ 'Vendor remote access', 'shared account [H]', 'p', 'lock' ],
      [ 'Badge SSO', 'its own logs [H]', '', 'badge' ],
      [ 'Break-glass envelope', 'on paper [H]', 'p', 'doc' ]
    ],
    gaps: [
      'Three directories, three password rules [H]',
      'Vendor access has no second factor [H]',
      'No one approves a vendor session [H]',
      'Break-glass use is not audited [H]',
      'Slow login pushes clinicians to workarounds'
    ],
    big: [ 'No MFA', 'Change Healthcare remote portal [public reporting]' ],
    recap: 'A badge tap is fast, a vendor uses a shared account, and three directories disagree.'
  },
  tobe: {
    banner: 'Cisco Identity gives one baseline over the three directories. A vendor session is requested, approved by a person and logged, and clinicians keep the badge tap.',
    strip: 'Cisco Identity, approvals, audit log, ISE and your IdP',
    who: 'A normal Tuesday (sim)',
    console: {
      title: 'Cloud Control | identity',
      body: 'One baseline across directories. Vendor access is scoped, approved and logged. The badge tap for clinicians is not changed.',
      foot: 'Clinicians keep the badge tap',
      rows: [
        [ 'Directories to reason about', '3', '1 baseline', 0, 'key' ],
        [ 'Vendor access', 'shared account', 'scoped, with MFA', 1, 'lock' ],
        [ 'Who approves', 'nobody', 'a named person', 1, 'person' ],
        [ 'Audit', 'scattered', 'one log', 2, 'doc' ],
        [ 'Clinician login', 'badge tap', 'badge tap, unchanged', 2, 'badge' ]
      ]
    },
    stays: 'Your directories and IdP stay in place. Break-glass remains a clinical safety path; the change is that it is logged and reviewed.',
    recap: [
      'One baseline over three directories; the vendor session needs a person to approve it.',
      'Outcomes are modeled: a scoped, logged vendor path and an unchanged clinician tap.'
    ]
  },
  hops: {
    legacy: [
      [ 'Badge tap', 'fast, local SSO', 'badge' ],
      [ 'Three directories', 'three rule sets', 'key' ],
      [ 'Vendor account', 'shared, no MFA', 'lock' ],
      [ 'Break-glass', 'an envelope', 'doc' ]
    ],
    tobe: [
      [ 'Cisco Identity', 'one baseline', 'key' ],
      [ 'Approval', 'a person decides', 'person' ],
      [ 'Scoped vendor session', 'with a second factor', 'lock' ],
      [ 'Audit log', 'one record', 'doc' ]
    ]
  },
  pathNote: { legacy: 'Different rules per directory [H]', tobe: 'One baseline, one approval, one log' },
  outcomes: {
    legacy: [
      [ '20.4 s', 'saved per reconnect with badge SSO, 19 hospitals [published study]', 'S' ],
      [ 'No MFA', 'Change Healthcare remote portal [public reporting]', 'S' ],
      [ 'Reported', 'Synnovis no two-factor is reported, not a primary forensic release', 'S' ]
    ],
    tobe: [
      [ '1 baseline', 'over three directories (modeled)', 'H' ],
      [ '1 approver', 'before a vendor session starts', 'H' ],
      [ '1 log', 'for vendor and break-glass use', 'H' ]
    ]
  },
  kpis: [ 'Vendor accounts with MFA', 'Time to approve a vendor session', 'Break-glass events reviewed', 'Login time at the bedside' ],
  ask: 'Today, who approves a vendor logging into a device, and where is that recorded?',
  tiles: [
    { l: 'Saved per reconnect, badge SSO [19 hospitals]', a: '20.4 s', b: '20.4 s', tag: 'S' },
    { l: 'Change Healthcare remote portal [reported]', a: 'No MFA', b: 'No MFA', tag: 'S' },
    { l: 'Directories to reason about', a: '3', b: '1 baseline', tag: 'H' },
    { l: 'Vendor access', a: 'Shared', b: 'Scoped + MFA', tag: 'H' },
    { l: 'Vendor session approval', a: 'None', b: 'A person', tag: 'H' },
    { l: 'Clinician login', a: 'Badge tap', b: 'Badge tap', tag: 'H' }
  ],
  scene: {
    decor: 'identity',
    pos: {
      nurse: [ 90, 142 ],
      vendor: [ 90, 292 ],
      ad1: [ 300, 142 ],
      ad2: [ 410, 142 ],
      okta: [ 520, 142 ],
      glass: [ 662, 292 ],
      cid: [ 110, 418 ],
      app: [ 365, 418 ],
      aud: [ 620, 418 ]
    }
  }
};
