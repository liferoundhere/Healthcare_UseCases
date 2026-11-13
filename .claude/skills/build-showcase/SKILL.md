---
name: build-showcase
description: "Build and verify the interactive 2D hospital models (showcase/healthcare-2d-models.html): run the build, the overflow sweep, the smoke test, and take screenshots. Use after any change to showcase/src, app/src/scenes.ts or stage/js/narrative.js, when asked to \"build the showcase\", \"check for overflow\", \"run the smoke test\", \"screenshot use case N\", or to confirm a story change looks right. Also covers changes to the showcase engine, layout, kit and themes."
---

# Build and check the showcase

The showcase is one self-contained HTML file with 13 tabs. It opens from disk with no server.

## Build

```bash
node showcase/build.mjs
```

The build concatenates `showcase/src/NN-*.js` in filename order into `src/template.html`, inlines `stage/js/narrative.js`, and writes `showcase/healthcare-2d-models.html`. It throws on any em dash or en dash. If story content changed, regenerate the narrative first (see `edit-story`).

Source layout:

| File | Role |
|---|---|
| `00-core.js` | Themes, colors, math, the Canvas 2D drawing kit `D` |
| `10-engine.js` | Scene engine: state from the narrative, focus, camera, links, callouts, approvals, hotspots |
| `12-kit.js` | Set dressing `K`: rooms, beds, racks, clouds, fibre, people |
| `20-page.js` | Page layout, step rail, narration column, tour and feed |
| `30-app.js` | App shell: tabs, flow, audience, side panel, tooltips, keys, URL parameters |
| `40` to `43-uc-*.js` | One authored entry per story |
| `44-decor.js` | Floor plan per story |
| `90-boot.js` | Wires narrative to stories, starts the app, runs `?check` |

Engine and kit changes affect all 13 stories. Per story changes belong in the `4x` files.

## Check

```bash
cd showcase && npm ci
```

```bash
cd showcase && node tools/check.mjs
```

```bash
cd showcase && node tools/smoke.mjs
```

- `check.mjs` runs the `?check` overflow sweep: every story, three audiences, 18 points through the whole flow, light and dark. It exits non-zero and lists each distinct overflow. Expected result: `0 distinct overflow items` in both themes.
- `smoke.mjs` exercises hover tooltips, rail clicks, the story flow, panels, audience, theme, tabs and the tour. Expected result: every line starts with `PASS` and it ends with `no page errors`.

All three tools honor the `CHROME` environment variable for the browser path, fall back to the usual Chrome, Chromium and Edge install locations on Windows, macOS and Linux, and exit with a one-line message naming `CHROME` if no browser is found.

## Screenshots

```bash
cd showcase && node tools/shoot.mjs --uc=1,2 --mode=tobe --theme=dark --u=0.8 --panel=0
```

Writes PNGs to `showcase/shots/` (git-ignored) and prints console errors and the overflow list.

| Flag | Meaning | Default |
|---|---|---|
| `--uc` | Story numbers 1 to 13, comma separated | all |
| `--mode` | Flow: `story`, `legacy` (Today only), `tobe` (Cloud Control only) | `legacy,tobe` |
| `--theme` | `light`, `dark` | `light` |
| `--u` | Position in the flow, 0 to 1 | `0.9` |
| `--aud` | `exec`, `dir`, `eng` | `exec` |
| `--panel` | Side panel open, 0 or 1 | `0` |
| `--out`, `--vw`, `--vh` | Output folder and viewport | `shots`, 1900 x 1064 |

Story order: security, facilities, ai, ehr, iomt, ransom, wifi, imaging, home, wan, identity, compliance, aiwork.

Look at the screenshots. A sweep with zero overflows does not tell you whether the focus lands on the right element, whether a callout covers the thing it describes, or whether the Today and Cloud Control halves read as a contrast.

## Manual pass

Open the HTML directly. Keys: Space pauses, left and right change story, M cycles the flow, P toggles the side panel, 1 2 3 switch audience, D toggles dark. Click a rail step to replay from it.

URL parameters for deep links and tests: `uc`, `flow` (or `mode`), `u`, `aud`, `theme`, `panel`, `t`, `paused`, `tour`, `check`. A hash such as `#ehr/tobe` also works.

## Before calling it done

- Build is clean, overflow sweep is 0 in both themes, smoke is all PASS.
- You looked at the changed stories in both phases, and in dark if you touched colors or the kit.
- `showcase/healthcare-2d-models.html` is rebuilt and staged with the sources. `shots/` is not.
