// AI use case AI6: Digital pathology. One data file: page copy, node placement and the inline narrative.
// Narrative source: experience/src/story/ai.ts. Facts and sources: research/data/ai-use-cases.json. See atlas/AUTHORING.md.
export default {
  id: 'ai-pathology',
  code: 'AI6',
  editions: [ 'general', 'msk', 'nyulh' ],
  category: 'AI',
  pillars: [ 'AI', 'Facilities' ],
  short: 'Digital pathology',
  name: 'Every glass slide becomes gigabytes on the network',
  setting: 'A pathology lab site, the circuit between sites, the image management system and the cloud archive',
  situation: 'The lab scans every slide so pathologists and AI can read them at any site. Each slide is gigabytes.',
  personas: [ 'Laboratory medical director', 'Pathology informatics lead', 'Network lead', 'Storage and cloud architect', 'Chief information officer' ],
  vision: 'When the viewer is slow, one investigation shows the scanner site, the circuit, the cloud path and storage errors, and the laboratory medical director and the network lead approve any reroute (modeled).',
  legacy: {
    banner: 'The lab scans every slide so pathologists and AI can read them at any site. When a circuit degrades, the viewer slows and cases queue while network, storage and cloud each show green.',
    strip: 'Today: scanners, circuits, storage and cloud have four owners [H]',
    who: 'Morning sign-out (sim)',
    silos: [
      [ 'Scanner console', 'slides scanned [H]', 'p', 'scan' ],
      [ 'Image management system', 'transfer and storage logs [H]', 'p', 'server' ],
      [ 'WAN or carrier portal', 'circuit up or down [H]', 'p', 'globe' ],
      [ 'Storage tool', 'tiers and capacity [H]', '', 'database' ],
      [ 'Cloud console', 'archive jobs [H]', 'p', 'cloud' ],
      [ 'AI vendor worklist', 'overlays produced [H]', 'p', 'gpu' ]
    ],
    gaps: [
      'Storage growth, WAN capacity and cloud transfer cost are found after go-live [H]',
      'Bulk archive jobs compete with interactive viewing on the same circuits [H]',
      'A failed transfer shows up as a missing AI overlay, with no alarm [H]',
      'Each cleared algorithm is tied to specific scanners and viewers [H]',
      'No peer-reviewed 2025 to 2026 figure for end-to-end turnaround with pathology AI was found'
    ],
    big: [ '2-4 GB', 'typical size of one high-resolution pathology image [CLP Magazine 2025, vendor-reported]' ],
    recap: 'The viewer is slow, cases queue, and network, storage and cloud each show green.'
  },
  tobe: {
    banner: 'AI Canvas would combine Catalyst SD-WAN path data, ThousandEyes tests to the cloud archive and transfer logs in Splunk. Rerouting slide traffic waits for the laboratory medical director and the network lead.',
    strip: 'AI Canvas, Catalyst SD-WAN, ThousandEyes, Splunk',
    console: {
      title: 'Cloud Control | scanner to archive',
      body: 'Per-application path choice between sites, loss and latency to the cloud archive, and transfer and storage logs in one view. Policy changes run in Catalyst SD-WAN Manager after approval.',
      foot: 'Assumes the image management logs can be collected',
      rows: [
        [ 'Teams to ask about a slow viewer', '4', '1 investigation', 0, 'canvas' ],
        [ 'Circuit between sites', 'up or down', 'path quality per application', 0, 'router' ],
        [ 'Cloud archive path', 'unknown', 'loss and latency tested', 0, 'eye' ],
        [ 'Reroute of slide traffic', 'ad hoc', 'approved by two people', 1, 'people' ],
        [ 'Scanner and viewer validation', 'laboratory', 'laboratory', 2, 'lock' ]
      ]
    },
    stays: 'Scanner and viewer validation, slide retention policy, storage spend and the choice of AI algorithms stay with the laboratory and its vendors.',
    recap: [
      'One investigation shows which of the scanner site, the circuit, the cloud path or storage is degraded.',
      'Outcomes are modeled. Network visibility does not validate a diagnostic chain.'
    ]
  },
  hops: {
    legacy: [
      [ 'Slide scanner', 'gigabytes per slide', 'scan' ],
      [ 'Site circuit', 'bulk and interactive share', 'router' ],
      [ 'Image management', 'vendor logs', 'server' ],
      [ 'Cloud archive', 'separate console', 'cloud' ]
    ],
    tobe: [
      [ 'Catalyst SD-WAN', 'path per application', 'router' ],
      [ 'ThousandEyes', 'path to the archive', 'eye' ],
      [ 'AI Canvas', 'one investigation', 'canvas' ],
      [ 'Approval', 'lab and network', 'people' ]
    ]
  },
  pathNote: { legacy: 'Four owners, each shows green [H]', tobe: 'Sites, cloud path and storage logs in one view' },
  outcomes: {
    legacy: [
      [ '800-1,000', 'routine slides scanned a day at one academic pathology institute [Virchows Archiv 2025]', 'S' ],
      [ '2-4 GB', 'typical size of one high-resolution pathology image [CLP Magazine 2025, vendor-reported]', 'S' ],
      [ '10 of 10', 'large US labs interviewed reported IT process issues during adoption [CAP Today 2025]', 'S' ]
    ],
    tobe: [
      [ '1 investigation', 'from scanner to archive (modeled)', 'H' ],
      [ 'Earlier', 'a degrading path found before sign-out slips (modeled)', 'H' ],
      [ '2 approvers', 'lab director and network lead (modeled)', 'H' ]
    ]
  },
  kpis: [ 'Time to locate a slow viewer', 'Round-trip time for tile streaming per site', 'Failed or partial slide transfers per day', 'Archive job overlap with reading hours' ],
  ask: 'When a pathologist says the viewer is slow, how long does it take to learn whether it is the scanner, the link, the cloud or the storage?',
  tiles: [
    { l: 'Slides scanned a day, one academic institute [Virchows Archiv 2025]', a: '800-1,000', b: '800-1,000', tag: 'S' },
    { l: 'Size of one pathology image [CLP Magazine 2025, vendor-reported]', a: '2-4 GB', b: '2-4 GB', tag: 'S' },
    { l: 'FDA-authorized AI-flagged pathology devices through April 2026 [Innolitics analysis of FDA data 2026]', a: '51', b: '51', tag: 'S' },
    { l: 'Glass and digital report concordance, one institute [Virchows Archiv 2025]', a: '99%', b: '99%', tag: 'S' },
    { l: 'Owners of a slow viewer', a: '4', b: '1 investigation', tag: 'H' },
    { l: 'Reroute of slide traffic', a: 'Ad hoc', b: 'Approved by two people', tag: 'H' }
  ],
  scene: {
    decor: 'wan',
    zoneLabels: { clin: 'Pathology lab site', parent: 'Main campus' },
    pos: {
      scan: [ 130, 150 ],
      path: [ 112, 296 ],
      wan: [ 320, 200, { lab: 't' } ],
      ims: [ 455, 176 ],
      ai: [ 570, 140 ],
      arch: [ 675, 176 ],
      sdw: [ 110, 418 ],
      canvas: [ 280, 418 ],
      appr: [ 450, 418 ],
      te: [ 620, 418 ]
    }
  },
  narr: {
    subtitle: 'The lab scans every slide so pathologists and AI can read them anywhere. Each slide is gigabytes, and scanners, storage, links between sites and the cloud must all keep pace.',
    caveat: 'No peer-reviewed 2025 to 2026 figure for end-to-end turnaround from pathology AI or for petabyte-scale storage was found. Network visibility does not validate a diagnostic chain, and the outcome shown is modeled.',
    nodes: [
      {
        id: 'scan',
        icon: 'scan',
        title: 'Slide scanners',
        sub: { exec: 'Every slide, every day', dir: 'Pathology lab', eng: 'Multi-gigabyte image files' },
        hidden: false,
        r: 30
      },
      {
        id: 'path',
        icon: 'monitor',
        title: "Pathologist's viewer",
        sub: { exec: 'Reads from any site', dir: 'Pathologists', eng: 'Streams image tiles' },
        hidden: false,
        r: 30
      },
      {
        id: 'wan',
        icon: 'router',
        title: 'Site-to-site circuit',
        sub: { exec: 'Links the lab sites', dir: 'Network team', eng: 'Bulk and interactive share' },
        hidden: false,
        r: 30
      },
      {
        id: 'ims',
        icon: 'server',
        title: 'Image management system',
        sub: { exec: 'Holds every slide', dir: 'Lab IT and vendor', eng: 'Transfer and storage logs' },
        hidden: false,
        r: 30
      },
      {
        id: 'ai',
        icon: 'gpu',
        title: 'Pathology AI',
        sub: { exec: 'Needs the whole slide', dir: 'Tied to validated scanners', eng: 'Overlay in the viewer' },
        hidden: false,
        r: 30
      },
      { id: 'arch', icon: 'cloud', title: 'Cloud archive', sub: { exec: 'Kept for years', dir: 'Cloud team', eng: 'Bulk archive jobs' }, hidden: false, r: 30 },
      {
        id: 'canvas',
        icon: 'canvas',
        title: 'AI Canvas',
        sub: { exec: 'One investigation', dir: 'Sites, cloud, data center', eng: 'Paths joined to logs' },
        hidden: true,
        r: 30
      },
      {
        id: 'sdw',
        icon: 'router',
        title: 'Catalyst SD-WAN',
        sub: { exec: 'Which path slides take', dir: 'Per-application path choice', eng: 'Policy stays in Manager' },
        hidden: true,
        r: 30
      },
      {
        id: 'te',
        icon: 'eye',
        title: 'ThousandEyes',
        sub: { exec: 'Our side or theirs', dir: 'Path to cloud archive', eng: 'Loss and latency tests' },
        hidden: true,
        r: 30
      },
      {
        id: 'appr',
        icon: 'people',
        title: 'Lab and network approvers',
        sub: { exec: 'Two people decide', dir: 'Medical director, network lead', eng: 'L3: execute after approve' },
        hidden: true,
        r: 30
      }
    ],
    zones: [
      { id: 'clin', label: 'Pathology lab site', hidden: false, cisco: false },
      { id: 'parent', label: 'Main campus', hidden: false, cisco: false },
      { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true }
    ],
    links: [
      { id: 'scan-wan', a: 'scan', b: 'wan', bend: 0 },
      { id: 'wan-ims', a: 'wan', b: 'ims', bend: 0 },
      { id: 'path-wan', a: 'path', b: 'wan', bend: 0.12 },
      { id: 'ims-arch', a: 'ims', b: 'arch', bend: 0.1 },
      { id: 'ims-ai', a: 'ims', b: 'ai', bend: 0 },
      { id: 'sdw-wan', a: 'sdw', b: 'wan', bend: 0 },
      { id: 'te-arch', a: 'te', b: 'arch', bend: 0 },
      { id: 'canvas-sdw', a: 'canvas', b: 'sdw', bend: 0 },
      { id: 'canvas-te', a: 'canvas', b: 'te', bend: 0.1 },
      { id: 'canvas-appr', a: 'canvas', b: 'appr', bend: 0 },
      { id: 'appr-wan', a: 'appr', b: 'wan', bend: 0.12 }
    ],
    steps: [
      {
        phase: 'today',
        title: 'Scanners outrun the network plan',
        say: {
          exec: 'Digitizing the lab turns a courier problem into a data problem: each slide is gigabytes, every day, kept for years.',
          dir: 'Scanner purchases are led by pathology; storage growth, WAN capacity and cloud transfer costs are discovered after go-live.',
          eng: 'Scanners write multi-gigabyte image files to an image management system, and viewers stream tiles, so latency and loss show up as slow pan and zoom.'
        },
        l: { 'scan-wan': 'ok', 'wan-ims': 'ok', 'path-wan': 'ok', 'ims-arch': 'ok', 'ims-ai': 'ok' },
        facts: [
          { v: '800-1,000', l: 'Routine slides scanned every day at one academic pathology institute, on eight scanners', s: 'Virchows Archiv 2025' },
          { v: '2-4 GB', l: 'Typical size of one high-resolution pathology image', s: 'CLP Magazine 2025, vendor-reported' }
        ]
      },
      {
        phase: 'today',
        title: 'A slow viewer means a waiting diagnosis',
        say: {
          exec: 'When a link between sites or to the cloud degrades, pathologists wait for images and cases queue, cancer cases included.',
          dir: 'The lab reports the viewer is slow; the network, storage and cloud teams each see green.',
          eng: 'Tile streaming is sensitive to round-trip time, and bulk archive jobs compete with interactive viewing on the same circuits.'
        },
        n: { path: 'warn', wan: 'unknown', ims: 'unknown', arch: 'unknown' },
        l: { 'path-wan': 'warn', 'wan-ims': 'warn', 'ims-arch': 'unknown' },
        callout: { node: 'path', text: 'The viewer is slow. Network, storage and cloud all show green.' },
        facts: [ { v: '10 of 10', l: 'Large US labs interviewed that reported IT process issues during digital pathology adoption', s: 'CAP Today 2025' } ],
        clock: { label: 'Time waiting for images', mode: 'run' }
      },
      {
        phase: 'today',
        title: 'AI results depend on the whole chain',
        say: {
          exec: 'AI tools need each slide to arrive complete and on time; a stalled transfer or a full storage tier delays the result without a clear alarm.',
          dir: 'Few AI algorithms are cleared, each tied to specific scanners and viewers, so every site-to-site move must preserve a validated chain.',
          eng: 'Failed or partial transfers surface as missing AI overlays in the viewer, with the cause in transfer or storage logs.'
        },
        n: { ai: 'down' },
        l: { 'ims-ai': 'down', 'scan-wan': 'warn' },
        label: { ai: 'No overlay, no alarm' },
        facts: [
          {
            v: '51',
            l: 'FDA-authorized AI-flagged pathology devices through April 2026; only 7 are whole-slide imaging algorithms',
            s: 'Innolitics analysis of FDA data 2026'
          }
        ]
      },
      {
        phase: 'cisco',
        title: 'One view from scanner to archive',
        say: {
          exec: 'Same slow viewer. This time one investigation shows scanner connectivity, the links between sites, the cloud path and storage-side errors together.',
          dir: 'AI Canvas would combine Catalyst SD-WAN path data, ThousandEyes tests to the cloud archive, Nexus and Intersight data-center telemetry and Splunk logs.',
          eng: 'ThousandEyes would measure loss and latency to the image archive, Catalyst SD-WAN would show per-application path choice, and Splunk would hold transfer and storage logs.'
        },
        show: [ 'cc', 'canvas', 'sdw', 'te' ],
        n: { path: 'warn', wan: 'warn', ims: 'ok', arch: 'ok', ai: 'warn', canvas: 'ok', sdw: 'ok', te: 'ok' },
        l: {
          'path-wan': 'warn',
          'wan-ims': 'warn',
          'scan-wan': 'warn',
          'ims-arch': 'ok',
          'ims-ai': 'warn',
          'sdw-wan': 'warn',
          'te-arch': 'ok',
          'canvas-sdw': 'ok',
          'canvas-te': 'ok'
        },
        label: { ai: '' },
        callout: { node: 'sdw', text: 'The cloud path tests clean. One circuit between sites is degraded.' },
        clock: { label: '', mode: 'hide' }
      },
      {
        phase: 'cisco',
        title: 'The lab director approves traffic changes',
        say: {
          exec: "Before slide traffic is rerouted or a transfer window is moved, the lab's medical director and the network lead approve it.",
          dir: "The Actions queue would hold the change and the Audit log would record the approval for the lab's quality file.",
          eng: 'Approved policy changes are executed by the Catalyst SD-WAN controller, not by the agent.'
        },
        show: [ 'appr' ],
        n: { appr: 'pending' },
        l: { 'canvas-appr': 'pending' },
        modal: {
          title: 'Reroute slide traffic between sites',
          lines: [
            'Move slide transfers to the secondary path and run the archive job overnight.',
            'Approvers: laboratory medical director, network lead',
            'Executes in: Catalyst SD-WAN Manager'
          ],
          button: 'Approve'
        }
      },
      {
        phase: 'cisco',
        title: 'Modeled: a degrading path found before sign-out slips',
        say: {
          exec: 'Modeled outcome: a degrading path is found before sign-out slips. Storage cost, retention policy and AI validation stay with the lab and its vendors.',
          dir: "The model assumes the image management vendor's logs can be collected; some are closed.",
          eng: 'This outcome is modeled, not measured. Scanner throughput, compression and viewer performance are outside network telemetry.'
        },
        n: { appr: 'ok', wan: 'ok', path: 'ok', ai: 'ok' },
        l: { 'canvas-appr': 'ok', 'appr-wan': 'ok', 'path-wan': 'ok', 'wan-ims': 'ok', 'scan-wan': 'ok', 'sdw-wan': 'ok', 'ims-ai': 'ok' },
        chips: [ [ 'AI Canvas', 'GA (US)' ], [ 'Catalyst SD-WAN', 'GA (US)' ], [ 'ThousandEyes', 'GA (US)' ], [ 'Nexus, Intersight', 'GA (US)' ] ]
      }
    ]
  }
};
