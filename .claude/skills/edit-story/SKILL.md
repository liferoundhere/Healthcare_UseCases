---
name: edit-story
description: "Add or change a storyboard story in this repo: a step, node, link, narration line, fact, caveat, approval modal, or a whole new use case. Use for any request that touches app/src/scenes.ts, the showcase use case files (showcase/src/4x-*.js), the floor plan decor, or \"the story\", \"the narration\", \"the Today / With Cloud Control flow\". Covers the regenerate chain so the app, the showcase and the 3D stage stay in step."
---

# Edit a story

All 13 stories (3 flagships, 10 use cases) are authored once and rendered three ways. Get the chain right and everything else follows.

```
app/src/scenes.ts            authored: nodes, zones, links, steps, narration, facts, caveats
        |  node stage/tools/gen_narrative.mjs
        v
stage/js/narrative.js        GENERATED. Read by the showcase build and the 3D stage.
        |  node showcase/build.mjs
        v
showcase/healthcare-2d-models.html   GENERATED single file.
```

The showcase adds a second authored layer per story, keyed by the same story `id`:

- `showcase/src/40-uc-flagships.js`, `41-uc-clinical.js`, `42-uc-edge.js`, `43-uc-trust.js`: one `UCS.push({...})` per story with banners, silos, gaps, console, hops, outcomes, tiles, KPIs, the discovery question (`ask`), tour lines, and `scene.pos` (node placement on the floor plan).
- `showcase/src/44-decor.js`: `DECOR.<id>` draws the floor plan around those nodes.

## What to edit for what

| Change | Edit |
|---|---|
| Narration, step title, step states, callout, clock, approval modal, facts, chips, caveat | `app/src/scenes.ts` only |
| Add, remove or rename a node, zone or link | `scenes.ts`, then `scene.pos` in the story's `4x` file, and `DECOR.<id>` if the room around it changes |
| Banner, silos, gaps, outcomes, tiles, KPIs, discovery question, tour | The story's `UCS.push` entry in `showcase/src/4x-*.js` |
| Floor plan drawing (rooms, racks, beds, people) | `showcase/src/44-decor.js`, using the kit in `12-kit.js` |
| A whole new story | All of the above, plus the hard-coded `ids` list in `showcase/tools/shoot.mjs` |

## Content model, in brief

Types are in `app/src/types.ts`. The parts that matter when writing:

- Every step has `phase: "today" | "cisco"`. Today steps come first and stay vendor-neutral. Cisco steps are the modeled future.
- `say` and node `sub` take three strings in fixed order: Executive, IT director, Engineering. Write all three; they are different readers, not three lengths of the same sentence.
- States (`n` for nodes, `l` for links): `ok`, `warn`, `down`, `pending`, `unknown`, `idle`, `off`. `pending` means waiting for a person and is reserved for approvals. `unknown` is the honest state for anything no tool can see.
- `facts` are `{ v, l, s }`: value, label, source. `s` holds the source name. If the source is a gap, say so in `s`; the showcase tags it H instead of S.
- `chips` are `[capability, status]` pairs and carry the GA, CA or Roadmap status of each Cisco capability named in the step.
- Any Cisco step that changes something on a clinical path needs a `modal` (the approval) before the change, and the node that executes the change is the domain controller, not Cloud Control.
- Ids are shared across files. A step that references an unknown node, zone or link id only warns in the app dev console, and the showcase boot throws if a story has no `DECOR` or no narrative.

Follow the rules in `CLAUDE.md` while writing. For anything that names a Cisco capability, load `check-cisco-claims`. For a new scene's look, load `design-scene`.

## Procedure

1. Find the figure or claim you need in `research/` or `docs/` first. If it is not there, it does not go into a story as a sourced fact. Use `update-research` to add it properly, or label it illustrative.
2. Edit `app/src/scenes.ts`, then the showcase layer if the change reaches it.
3. Regenerate and build:

   ```bash
   cd app && npm ci
   ```

   ```bash
   cd app && npm run build
   ```

   ```bash
   node stage/tools/gen_narrative.mjs
   ```

   ```bash
   node showcase/build.mjs
   ```

   `npm ci` matters twice: `gen_narrative.mjs` imports esbuild from `app/node_modules`, and `npm install` rewrites the lockfile on some npm versions. `npm run build` type-checks `scenes.ts`.
4. Verify with `build-showcase` (overflow sweep and smoke test), and look at the changed story in at least one screenshot per phase.
5. Commit `scenes.ts`, `stage/js/narrative.js` and `showcase/healthcare-2d-models.html` together with any showcase source you touched. `git status` should show no generated file left behind.

## Things that go wrong

- Both generators throw on an em dash or en dash. Fix the source text; do not work around the check.
- Longer narration can overflow its card in one audience or one theme only. The overflow sweep catches it; shorten the text rather than shrinking type.
- Editing `stage/js/narrative.js` or the HTML directly is lost on the next build.
- A story reads fine in the app and breaks in the showcase when a new node has no entry in `scene.pos`.
