---
name: run-storyboard-app
description: "Run, build or change the animated 2D storyboard app in app/ (Vite, TypeScript, custom Canvas 2D engine). Use when asked to start the dev server, preview a story in the app, produce the static build in app/dist, link to a specific story, or modify the app's engine, icons, controls or styling (app/src/engine.ts, icons.ts, main.ts, style.css)."
---

# Run the 2D storyboard app

`app/` plays the same 13 stories as the showcase in a schematic view: traffic along links, devices changing state, a downtime clock, and an approval you click through before any change touches care.

## Commands

```bash
cd app && npm ci
```

```bash
cd app && npm run dev
```

```bash
cd app && npm run build
```

- Dev server: `http://localhost:5173`. In dev mode the app validates every story and logs `unknown node/zone` or `unknown link` warnings to the browser console. Read the console after any story edit.
- `npm run build` runs `tsc` then `vite build` and writes the static site to `app/dist` (git-ignored). A type error in `scenes.ts` fails here.
- Use `npm ci`, not `npm install`, so the lockfile is not rewritten.

## Files

| File | Role |
|---|---|
| `src/scenes.ts` | Story content. Shared with the showcase and the 3D stage through a generator. Editing it is `edit-story`, not this skill. |
| `src/types.ts` | Content model |
| `src/engine.ts` | Canvas engine: layout, links, traffic, states, camera |
| `src/icons.ts` | Icon set and the `IconKind` union. A new icon name used in `scenes.ts` must be added here, and the showcase draws icons by the same name. |
| `src/main.ts` | Navigation, keys, audience switch, autoplay, approval modal, dev validation |
| `src/style.css` | Layout and theme |

## Controls and links

Left and right arrows step. Up and down change story. 1, 2, 3 switch audience (Executive, IT director, Engineering). Space autoplays and pauses at each approval. Hover a device for all three audience views.

Deep links by hash: `#security`, `#facilities`, `#ai`, `#ehr`, `#iomt`, `#ransom`, `#wifi`, `#imaging`, `#home`, `#wan`, `#identity`, `#compliance`, `#aiwork`.

## When you change story data here

`scenes.ts` feeds two other builds. After any edit to it, regenerate `stage/js/narrative.js` and rebuild the showcase, as described in `edit-story`. A change that only looks right in the app is half done.

## Checking a change

- `npm run build` passes.
- Dev console shows no validation warnings.
- Step through the changed story in all three audiences, and click through each approval. Autoplay must stop at an approval and wait.
