# Healthcare Infrastructure Storyboard

Context pack for healthcare customer storyboards. Prepared 12 November 2026.

The pack describes how a health system runs network, security, facilities, and AI infrastructure today, then maps the same stories onto Cisco Cloud Control and Cisco Data Fabric. Phase 1 is vendor-neutral. Phase 2 is Cisco-specific and tags every capability GA, CA, or Roadmap.

## Start here

| File | What it is |
|---|---|
| [healthcare-storyboard-context.md](healthcare-storyboard-context.md) | Master context document. Use this as AI context for 3D and 2D builds. |
| [healthcare-storyboard-context.docx](healthcare-storyboard-context.docx) | Shareable Word copy of the master. |
| [sources.md](sources.md) | Numbered bibliography. Citations in the master are `[C-n]`, `[S-n]`, `[F-n]`, `[A-n]`, `[K-n]`. |

## Animated 2D storyboards (`app/`)

An interactive Vite + TypeScript app with a custom Canvas 2D engine. It plays 13 stories (3 flagships and the 10 use cases). Each story steps from "Today, any infrastructure" to "With Cisco Cloud Control, modeled", with traffic flowing along links, devices changing state, a downtime clock, and an approval you click through before any change touches care. Narration switches between Executive, IT director, and Engineering.

```
cd app
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in app/dist
```

Controls: left and right arrows step, up and down change story, 1, 2, 3 switch audience, Space autoplays (it pauses at each approval). Hover any device for all three audience views. Link directly to a story with `#security`, `#facilities`, `#ai`, `#ehr`, `#iomt`, `#ransom`, `#wifi`, `#imaging`, `#home`, `#wan`, `#identity`, `#compliance`, or `#aiwork`. Story content lives in `app/src/scenes.ts`.

## Interactive 2D hospital models (`showcase/`)

A single self-contained HTML file, in the format of a "store of the future" 2D showcase. It has 13 tabs (3 flagships, 10 use cases), each a hospital floor plan. **The story is the workflow:** a step rail across the top walks through the whole story, Today first and then With Cisco Cloud Control (modeled), and the floor plan plays whichever step is active. The element the step is about becomes the primary one: it grows, the rest of the scene is dimmed, and a soft spotlight and a slight push-in follow it. The floor plan takes all the space available, with larger type, a narration card, the gaps or the simulated console, the data path, outcomes and the discovery question beside it. Key figures, the event feed, roles and the legend live in a retractable panel (button, edge tab, or the P key), so the stage can use the full window.

The floor plans are dressed in detail: patient rooms with beds, patients, monitors and IV poles; nurse stations; data halls with racks, hot and cold aisles, cooling and UPS; cloud connectivity with fibre drops and clouds; network paths with duct, manholes and a radio tower; a CT suite, a plant with air handlers and a generator, houses, clinics and a neighbor hospital; and people who look like people (nurse, doctor, patient, vendor, IT and visitor) and walk the corridors. Provenance tags (S sourced, H hypothesis, I illustrative), hover tooltips with an owner chip, an Executive / IT director / Engineering switch, a guided tour, and light and dark themes are included.

```
cd showcase
node build.mjs                    # writes showcase/healthcare-2d-models.html (open it directly, no server)
npm install                       # only needed for the test tools below
node tools/check.mjs              # overflow sweep: 13 use cases x 3 audiences x 18 times through the whole story, both themes
node tools/smoke.mjs              # hover, rail click, story flow, panels, audience, theme, tab and tour checks
node tools/shoot.mjs --uc=1,2 --mode=tobe --theme=dark --u=0.8 --panel=0   # screenshots into showcase/shots (--mode is the flow: story, legacy or tobe)
```

The three tools find Chrome, Chromium or Edge in the usual install locations on Windows, macOS and Linux. Set `CHROME` to the executable path to use a different browser.

Controls: Space pauses, left and right change use case, M cycles the flow (Story, Today only, Cloud Control only), P shows or hides the side panel, 1, 2, 3 switch audience, D toggles dark. Click any step in the rail to replay from it. URL parameters: `uc`, `flow` (or `mode`), `u` (0 to 1 position in the flow), `aud`, `theme`, `panel` (0 or 1), `t`, `paused`, `tour`, `check`; `#ehr/tobe` also works.

How it is built: `stage/js/narrative.js` (generated from `app/src/scenes.ts`) is the single source of truth for nodes, links, step states, narration, facts and caveats. `showcase/src/10-engine.js` draws the scene (focus, camera, links, callouts), `12-kit.js` is the set-dressing kit, `20-page.js` is the layout, and `44-decor.js` draws the floor plan of each use case. Each use case file in `showcase/src/4x-*.js` adds only node placement and the authored Today and With Cloud Control content. The `stage/` 3D build is paused.

## How the pack is structured

1. **Part 0.** Macro picture (margins, breach cost, outages, AI adoption) and a glossary.
2. **Part 1.** Ten infrastructure use cases, each with patient, engineering, and clinical journeys, plus security / network / WAN / visibility / orchestration jargon, MTTx, cost, and compliance.
3. **Three pillars.** Healthcare security, healthcare facilities, and AI in healthcare. These are full sections, not a paragraph inside a use case.
4. **Part 2.** Personas, KPI tables, compliance recap.
5. **Part 3.** Cisco Cloud Control and Cisco Data Fabric mapping, including a Data Fabric-as-aggregation-layer story that stays on machine data (not the EHR).
6. **Part 4.** Storyboard scenes: flagship sequences for security, facilities, and AI, plus four scenes per use case, plus an object library.

## Research briefs

Underlying cited research lives in `research/`. Do not discard these; they hold full source lists, gap lists, and status tags.

- `research/01-clinical-ops.md`
- `research/02-security.md`
- `research/03-facilities.md`
- `research/04-ai-healthcare.md`
- `research/05-cisco-cloud-control-data-fabric.md`

Sectional drafts used to assemble the master live in `docs/`.

## Rules for anyone using this as context

The rules live in [CLAUDE.md](CLAUDE.md), which is the single copy: evidence labels, gaps, Modeled outcomes, Cisco status tags, the machine-data boundary, human approval, and what must never appear in a scene. Read it before deriving anything from this pack, with or without an AI assistant.

## Working in this repo with Claude Code

`CLAUDE.md` holds only the rules that apply to every task. Step-by-step procedures are skills in `.claude/skills/`, one per task:

| Task | Skill |
|---|---|
| Add or change a story, step, node, narration line or fact | `edit-story` |
| Design or review a scene against the visual conventions | `design-scene` |
| Build the showcase, run the overflow and smoke checks, take screenshots | `build-showcase` |
| Run or build the animated 2D app | `run-storyboard-app` |
| Add or update a source, figure, gap or status tag | `update-research` |
| Reassemble the master document, bibliography and Word copy | `rebuild-context-pack` |
| Check Cisco statements for overclaims | `check-cisco-claims` |
| Work on the paused 3D stage | `stage-3d` |

## Rebuild

```
python scripts/assemble_and_convert.py
```

Requires Python 3.12 and `python-docx`.
