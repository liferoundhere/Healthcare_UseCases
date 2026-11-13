# Adding a use case to Atlas

A use case is **one data file plus one floor plan reference**.

1. Copy `atlas/usecases/_template.mjs` (a complete working example with an inline narrative) to a new name.
2. Change the content, set `editions`, and point `scene.decor` at a floor plan.
3. Give every node a position in `scene.pos`.
4. Run `node atlas/build.mjs`, then `node atlas/tools/check.cjs --ed=<edition>`.

Nothing else is registered anywhere. The build picks up every `atlas/usecases/*.mjs` file (files starting with `_`
are skipped) in file name order, which is also the order of the cards in the library.

## 1. File name and order

`NNN-id.mjs`. The number only sets the order. Suggested ranges: `010` to `199` shared stories, `200` to `299` AI
stories, `500` to `599` MSK account stories, `600` to `699` NYULH account stories.

## 2. Editions (who sees it)

| `editions` value | Where it appears |
| --- | --- |
| `['general', 'msk', 'nyulh']` | Shared: all three editions, in the "Use cases" section |
| `['msk']` | Only the MSK edition, in "For your organization: hypotheses to validate" |
| `['nyulh']` | Only the NYULH edition, in the same section there |

Any other combination is a build error. An account use case may name its own organization in its text. It must
never name the other one: the build scans every output file and fails if the MSK edition contains `NYU`,
`Langone` or `NYULH`, if the NYULH edition contains `MSK`, `Memorial Sloan` or `Sloan Kettering`, or if the
general edition contains any of them. Keep the use case `id` free of the other account's name too, because the id
becomes a file name (`data/uc-<id>.js`).

## 3. Required fields

```js
export default {
  id: 'msk-infusion-epic',            // lower case letters, digits, hyphens. Unique. Becomes data/uc-<id>.js
  code: 'M1',                          // short label on the card and in the header (F1, UC4, AI3, M1, N2 ...)
  editions: ['msk'],
  category: 'Account',                 // 'Flagship' | 'Infrastructure' | 'AI' | 'Account'  (library filter)
  pillars: ['Security', 'Facilities'], // one or more of 'Security', 'Facilities', 'AI'      (library filter)
  short: 'Regional infusion',          // two or three words
  name: 'The infusion site that depends on one circuit',   // card title and presenter title
  setting: 'Regional infusion suite, the WAN and the main campus',
  situation: 'One sentence for the library card.',          // optional; defaults to narr.subtitle
  personas: ['CIO', 'Pharmacy director'],
  vision: 'One or two sentences: the modeled outcome.',
  legacy: {                            // TODAY
    banner: 'The situation today, two sentences.',
    strip: 'Today: three owners, no shared view [H]',
    who: 'Tuesday clinic (sim)',       // optional, shown small in the card footer
    silos: [                           // 1 to 6 rows: [tool, what it sees, '' or 'p' (p = outside party), icon]
      ['WAN portal', 'circuit up or down [H]', 'p', 'globe'],
    ],
    gaps: ['Nobody owns the path end to end [H]'],
    big: ['3', 'owners for one infusion chair [H]'],        // [value, label]
    recap: 'One sentence for the summary step.',            // optional; defaults to narr.subtitle
  },
  tobe: {                              // WITH CISCO CLOUD CONTROL (modeled)
    banner: 'What changes, two sentences.',
    strip: 'AI Canvas, ThousandEyes, SD-WAN',
    console: { title: 'Cloud Control | infusion site', body: 'What the console shows.', foot: 'optional short note',
      rows: [['Item', 'today value', 'modeled value', 0, 'topology']] },   // [item, today, modeled, step, icon]
    stays: 'What stays with the hospital and its vendors.',
    recap: ['One sentence for the summary step.'],          // optional; defaults to vision
  },
  hops: {                              // exactly 4 hops each: [name, note, icon]
    legacy: [['A', 'note', 'pump'], ['B', 'note', 'globe'], ['C', 'note', 'server'], ['D', 'note', 'doc']],
    tobe:   [['A', 'note', 'eye'], ['B', 'note', 'canvas'], ['C', 'note', 'person'], ['D', 'note', 'gear']],
  },
  pathNote: { legacy: 'One line [H]', tobe: 'One line' },
  outcomes: {                          // exactly 3 rows each: [value, label, provenance tag]
    legacy: [['64 days', 'what it is [source, year]', 'S'], ['...', '...', 'S'], ['...', '...', 'H']],
    tobe:   [['1 view', 'what it is (modeled)', 'H'], ['...', '...', 'H'], ['...', '...', 'H']],
  },
  kpis: ['KPI to baseline in a pilot'],
  ask: 'The discovery question.',
  tiles: [{ l: 'Label [source]', a: 'today', b: 'modeled', tag: 'S' }],   // key figures table in Details
  scene: {
    decor: 'wifi',                     // the floor plan to draw on. See section 5.
    pos: { ap1: [130, 134], idf: [130, 320], canvas: [110, 418] },        // one entry per node. See section 6.
    zoneLabels: { floor: 'Infusion suite', sys: 'Main campus systems' },  // optional: rename the plan's zones
    noLegacyBand: true,                // optional: hide the "one tool per team" band in the Today phase
  },
  narr: { /* section 4 */ },
};
```

Provenance tags: `S` sourced (name the source and year in the label), `H` hypothesis to validate with the customer,
`I` illustrative. Write `[H]` or `[S]` at the end of a sentence in `gaps`, `silos`, `strip`, `banner` or `pathNote`
and it is drawn as the same tag. Keep "modeled" on anything that describes the Cisco Cloud Control outcome, and do
not forecast a percentage or a saving.

Text rules, enforced by the build: no em dash, no en dash, no emoji. Plain sentences, no marketing adjectives.

## 4. The narrative (nodes, links, steps)

The old showcase looked the narrative up in `stage/js/narrative.js` by id. Atlas resolves it in this order:

1. **Inline**: a `narr` object in the use case file. Use this for new use cases.
2. **A narrative file**: `atlas/narratives/<anything>.json` or `.mjs` (default export: one narrative or an array)
   whose `id` equals the use case `id`, or equals `narrId` if the use case sets one.
3. **The shared file** `stage/js/narrative.js`, by the same id. The 13 original use cases use this.

```js
narr: {
  subtitle: 'One sentence: the situation.',
  caveat: 'What is modeled, what is not claimed.',
  nodes: [   // devices, systems, people. `hidden: true` means it appears only when a step shows it.
    { id: 'ap1', icon: 'wifi', title: 'Hall AP', sub: { exec: 'Signal fine', dir: 'Wireless team', eng: '5 GHz, ch 36' }, hidden: false, r: 30 },
    { id: 'canvas', icon: 'canvas', title: 'AI Canvas', sub: { exec: 'One picture', dir: 'Shared view', eng: 'GA in the US' }, hidden: true, r: 30 },
  ],
  zones: [   // use the zone ids of the floor plan you picked (section 5); add the Cloud Control band as 'cc'
    { id: 'floor', label: 'Infusion suite', hidden: false, cisco: false },
    { id: 'cc', label: 'Cisco Cloud Control (modeled)', hidden: true, cisco: true },
  ],
  links: [{ id: 'ap1-idf', a: 'ap1', b: 'idf', bend: 0 }],   // bend: -0.3 to 0.3 bows the line
  steps: [   // all 'today' steps first, then the 'cisco' steps. 3 to 4 of each reads well.
    { phase: 'today', title: 'A call starts in the hallway',
      say: { exec: '...', dir: '...', eng: '...' },           // one or two sentences per audience, under 160 characters
      n: { ap1: 'ok' },                                       // node states: ok warn down pending unknown idle off
      l: { 'ap1-idf': 'ok' },                                 // link states, same values; 'off' hides the link
      label: { ap1: 'Roam fails' },                           // optional caption under a node from this step on ('' clears)
      show: ['x'], hide: ['y'],                               // node or zone ids to reveal or remove
      callout: { node: 'ap1', text: 'Up to about 75 characters.' },   // optional bubble; also sets the step's focus
      facts: [{ v: '8.9 s', l: 'what the number is', s: 'Source, year' }],   // optional; the first one shows in the card
      clock: { label: 'Time to a shared picture', mode: 'run' },      // optional: run | stop | hide
    },
    { phase: 'cisco', title: 'A person approves', say: { exec: '...', dir: '...', eng: '...' },
      show: ['cc', 'canvas'], n: { canvas: 'pending' },
      modal: { title: 'Approve the change', lines: ['What changes.', 'Approvers: ...', 'Executes in: ...'], button: 'Approve' },
    },
    { phase: 'cisco', title: 'What it does and does not do', say: { exec: '...', dir: '...', eng: '...' },
      chips: [['AI Canvas', 'GA (US)'], ['ThousandEyes', 'GA']],     // product status, shown on the step that has it
    },
  ],
},
```

What the presenter sees per step: the phase, the step counter, the title, the `say` sentence for the chosen audience,
and at most one supporting element, chosen in this order: the approval (`modal`), else the first `facts` entry, else
`chips`. The `callout` is drawn on the floor plan next to its node. A step with a `modal` holds the story until the
presenter clicks Approve or presses Enter. The closing Summary step is generated from `outcomes`, `ask`,
`tobe.stays`, `kpis` and the two `recap` lines; you do not write it as a step.

The With Cloud Control phase replays the same event: every node the Today steps revealed is already visible when
the first `cisco` step starts, so hide the Today-only nodes there (`hide: [...]`) and show `'cc'` plus the first
Cisco node.

Icons available: `pump monitor server database shield person people ambulance ct cloud clock badge wifi router rack
gear bell building home gpu mic chat doc eye lock canvas topology key scan board phone pill flask switch globe bed
heart sensor truck plug tower check cross`. An unknown icon is a build error.

## 5. Floor plans (decor) you can reuse

`scene.decor` names a drawing in `atlas/src/engine/44-decor.js`. A new use case reuses one of these 13 by id; the
rooms, racks and people are drawn for you and you only place nodes on top. Zone labels come from `scene.zoneLabels`
if you set it, else from your `narr.zones` (matching zone ids), else from the original story of that plan.

| decor id | Zones: id, original label, area (x range, y range) | Rooms drawn inside |
| --- | --- | --- |
| `security` | `floor` Clinical floor 20-270; `dc` Data center 282-520; `ext` Outside the hospital 532-720 (all y 56-362) | Room 412, Room 413, Supply, IDF closet, data hall, road and cloud |
| `facilities` | `tower` Main hospital tower 20-302, y 56-236; `imgz` imaging 312-452, y 56-236; `plant` Central plant 462-720, y 56-236; `remote` Off campus 20-720, y 246-362 | Room 412, IDF closet, NOC, Imaging suite, air handling, generator, clinic building, house |
| `ai` | `hosp` Hospital 20-520; `vend` Vendors and the internet 532-720 | Exam room, CT suite, Reading room, GPU rack row, Office, vendor clouds |
| `ehr` | `floor` Nursing unit 20-256; `path` Network path 266-408; `dc` Data center 418-720 | Room 408, Hallway, War room, data hall |
| `iomt` | `flat` One flat clinical network 20-350; `teams` Who knows what 362-720 | ICU bays, Core closet, Radiology, Guest Wi-Fi, three team desks |
| `ransom` | `hosp` Health system 20-580; `region` The region 592-720 | Identity, EHR data center, Pharmacy, Laboratory, Backup vault, Emergency department, neighbor hospital |
| `wifi` | `floor` 4 West and the stairwell 20-490; `sys` Clinical systems 502-720 | Corridor, Stairwell, Room 411, Room 412, IDF with PoE, data hall |
| `imaging` | `clinic` Outpatient imaging center 20-220; `wanz` WAN 232-468; `main` Main hospital 480-720 | CT suite, Control room, PACS and AI, Reading room |
| `home` | `house` Patient's home 20-220; `net` Internet 232-432; `hosp` Hospital 444-720 | Living room, Kitchen and entry, Command center, Data center |
| `wan` | `clin` Acquired clinic 20-240; `parent` Parent health system 400-720 | Clinic floor, Back office, Parent data center, Parent network and SOC |
| `identity` | `users` Who signs in 20-220; `dirs` Three directories 232-602 | Hospitalist workstation, Modality (vendor remote), ED desk |
| `compliance` | `ev` Evidence today 20-450; `ask` The ask 462-720 | Corkboard, binders, surveyor desk |
| `aiwork` | `clinic` Clinic 20-350; `out` Outside the hospital 362-720 | Exam room 3, Physician workroom, Wi-Fi closet, Physician laptop, Vendor GPU hall |

Open the matching original story in the presenter to see the plan before placing nodes
(`node atlas/tools/shoot.cjs --uc=wifi --steps=1`).

A few plans carry text or behaviour from their original story (for example `compliance` shows a surveyor quote,
`iomt` draws a "device segment" outline when a node called `seg` appears, `ransom` moves an ambulance when a node
called `ed` or `ehr` is down). Pick a plan whose rooms fit your story, or add a new one.

**A new floor plan** is a function `DECOR.<id> = (S) => { ... }` in `atlas/src/engine/44-decor.js` (or a new file
`atlas/src/engine/45-<name>.js`), built from the kit in `12-kit.js` (`K.ward`, `K.dataHall`, `K.rackRow`,
`K.corridor`, `K.cloud`, `room(...)`, `Z(S, zoneId, x, y, w, h, [nodes whose state shades the zone], drawFn)`).
If a plan must not ship in every edition, put it in its own file and start that file with `// @editions msk`.

## 6. The scene coordinate system and node positions

- The scene is 712 units wide and 424 units tall: **x from 14 to 726, y from 44 to 468**, origin top left, y grows
  downward. It is scaled to the window; at 1600x900 one unit is about 1.35 screen pixels.
- **Floor plan area: y 56 to 362.** Zones and rooms live here.
- **Band: y 372 to 462.** In the Today phase it shows the `legacy.silos`; in the Cloud Control phase it is the
  "Cisco Cloud Control (modeled)" band. Place the Cisco nodes on the row **y = 418**, spread between **x = 110 and
  x = 620** (four nodes: 110, 280, 450, 620). Today-only tool nodes may sit on the same row if you set
  `noLegacyBand: true` (see `010-security.mjs`).
- `pos: { id: [x, y] }` is the centre of the node. A node is a circle of radius 18 (`r: 30`) or 14 (`r: 24`).
  Keep centres at least 100 units apart horizontally or 80 vertically so labels have room.
- Labels place themselves: the title and caption go below the node, or above, right or left if that collides, and
  the callout bubble goes where it covers nothing. To pin a side: `id: [x, y, { lab: 't' }]` (`b`, `t`, `r`, `l`).
- Positions must be inside x 30 to 710 and y 70 to 440.

**A node without a position is a build error**, and so is a position for a node that does not exist, a link or a
step that refers to an unknown id, an unknown icon, a missing audience sentence, or a missing floor plan. The
presenter also refuses to start a use case with a missing position and shows which one.

## 7. Validate

```
node atlas/build.mjs                         # fields, positions, references, text rules, account names
node atlas/tools/check.cjs --ed=msk --fast   # opens every use case in a browser and walks every step
node atlas/tools/shoot.cjs --ed=msk --uc=<id> --steps=1,2,3,approval,summary   # screenshots in atlas/shots
```

`check.cjs` fails on: console errors, HTML text under 14px, canvas text under 12px at 1600x900, text that
overflows its box, labels that collide or leave the scene, a card whose text does not fit, a node without a
position, another account's name in the page, and a step that advances by itself. When it reports a collision,
move the node a little or pin its label side. Then read the screenshots at 1600x900 and 1280x720.

Limits that keep the card readable (the check enforces the result, not the numbers): step title up to about 45
characters, `say` up to about 160, callout up to about 75, modal up to 4 lines of about 60 characters, fact label up
to about 60.
