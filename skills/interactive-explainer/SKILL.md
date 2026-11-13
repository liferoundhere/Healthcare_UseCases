---
name: interactive-explainer
description: Build an interactive, presentation-grade visual explainer that tells "how it works today" versus "how it works with a platform or product" as stepped stories on an illustrated scene (flat 2D plan or isometric), backed by cited research. Use this whenever someone wants a customer-facing explainer, an interactive storyboard, a use-case showcase, a "store/hospital/factory of the future" model, an animated architecture walkthrough, a 2D or 3D-looking solution demo for a sales or account team, or asks to make an existing explainer less busy and more visual, even if they only say "make a visual that explains our use cases". Also use it to add use cases, account-specific workspaces, or a research-backed source trail to an explainer that already exists.
---

# Interactive explainer

This skill captures a way of building explainers that a presenter can put in front of a customer: a hand-drawn-looking scene of the customer's world (a hospital, a store, a plant), stories that play on it beat by beat, and a platform layer that shows which building blocks each story uses. It was developed on a healthcare explainer for a networking vendor; the method is general.

A starter kit with the working renderer, story player, tools and checks is in `assets/starter/`. Copy it and change the content rather than writing a renderer from nothing. Read `references/renderer.md` before touching the drawing code and `references/story-schema.md` before writing stories.

## What good looks like

- **One idea on screen at a time.** The usual failure is a dashboard: a dozen panels, small type, everything lit. Here the scene is the whole screen, one caption sits in a lower third, and only the rooms and pins that belong to the current beat are lit. Everything else recedes. Most "it looks busy" feedback is solved by removing and dimming, not by restyling.
- **A story, not a diagram.** Each use case is five to seven beats: what normally happens, what goes wrong, what it costs, then the same event again with the product, a human decision, and the outcome. The presenter presses an arrow key and talks.
- **A picture people recognise.** Rooms with beds, racks, desks and people, drawn as a light model on a dark stage. Recognition does the explaining that labels would otherwise have to do.
- **Honesty built in.** Every number carries its source. Every product block carries its availability (shipping, beta, announced). Outcomes that are modeled say so. This is what lets a presenter survive the first hard question.
- **Useful in the room.** The presenter can switch audience (executive, director, engineer), open notes, capture what the customer said, and leave with a plan.

## The workflow

Work in this order. Each step feeds the next, and the early ones are where the quality comes from.

### 1. Read what exists and decide the frame

Look at any earlier explainer, deck or brief the person has. Note what they liked and what they called busy. Decide three things and say them back in a sentence or two before building:

1. **The world**: the eight to eleven places where the stories happen (for a hospital: patient floor, emergency department, imaging, data center, plant, network core, offices, pharmacy and lab, a clinic, a home, the outside world).
2. **The two phases**: "today, on any infrastructure" (vendor-neutral) and "with <platform>". Keep today neutral: a customer should recognise their own estate, whoever they bought it from.
3. **The platform layer**: the product's building blocks, grouped (where people work, connected domains, the data layer, third-party systems, announced items).

### 2. Research before writing a single beat

Stories without sources do not survive a customer meeting. Run research as parallel background agents, one per angle, each writing a cited brief plus a small JSON extract. `references/research.md` has the brief template and the output shapes. Rules that matter:

- Every claim gets a numbered citation with title, publisher, date and URL. Quotes for anything load-bearing.
- Tag every product capability with the availability wording its source uses. Do not upgrade "beta" to "available".
- Label vendor-funded numbers as vendor-reported.
- Keep a "claims that must not be made" list and a gaps list in every brief. Later briefs will correct earlier ones: record the corrections rather than silently overwriting.
- If there is no customer proof for the platform in this industry, say so, and label every platform outcome as modeled. Never invent a percentage.
- Tell each agent to write a first version of its files early. Sessions get interrupted, and an agent that only writes at the end loses everything.

For named accounts, research only public sources, anchor every account-specific use case on a cited public fact, and present each as a hypothesis to validate. Never state or imply what the account has bought.

### 3. Write the stories as data

Stories are plain data (`SceneDef`): nodes, links, and steps that change node and link states. The player folds steps cumulatively, so a step only lists what changes. Each step carries the same sentence written three ways (executive, director, engineer). See `references/story-schema.md`.

Writing rules that came from review feedback:

- Titles are human headlines ("The badge call has to roam"), not categories ("Clinical Wi-Fi").
- Today beats end on the failure or the cost. Platform beats start by replaying the same event.
- Anything that could touch the customer's core operation (care, production, money) stops for a named human approval. This is both truer and more persuasive than autonomy.
- End every story with the combination of blocks and their status, a question for the room, what stays with the customer, and a caveat to keep in mind.
- Plain words. No marketing adjectives. If a sentence would embarrass an engineer, cut it.

A separate small map (`staging.ts`) says which room each node stands in and which platform blocks the story uses. Keeping staging apart from narrative lets the same stories play on different layouts and renderers.

### 4. Draw the scene

Use the starter renderer: a small vector renderer on Canvas 2D with two projections that share one set of drawing primitives.

- **Flat plan (default)**: rooms seen from above in a wide band, the platform over a court in the middle. Start here. It fills a 16:9 screen, keeps the whole world in view, and is the easiest to read from the back of a room.
- **Isometric**: the same rooms as a three-tone model. More atmosphere, less room on screen.

Do not reach for a 3D engine. Flat-shaded WebGL primitives look like a tech demo, cost a megabyte, and are harder to art-direct than vectors. This was tried and thrown away.

What makes the picture look designed:

- A light model on a dark stage, cool shadows, one accent colour per phase (amber for today, the brand colour for the platform).
- Story pins at a fixed screen size, like map pins, so they stay legible at any zoom. The room gives context; the pin carries the story.
- Colour means state and nothing else: green healthy, amber attention, red down, grey unknown, pulsing blue waiting for a person.
- Rooms far enough apart that a front room never hides the one behind.
- The layout matched to the space the interface leaves free. A lower-third caption leaves a wide, short area, so a wide band of rooms beats a square grid.

### 5. Build the interface around the stage

Keep the chrome thin: a top bar, a phase pill, the lower-third caption, a progress rail, and a side column that only appears when it has something to say (a sourced number, the approval, the closing combination). Beyond the story player, the starter has a platform explorer (every block with status and sources), a combination builder, presenter notes, a sources sheet, account workspaces, discovery capture and an account plan export. Add the ones the person will use; do not add panels for their own sake.

### 6. Look at it, then check it

You cannot judge a visual from code. After every meaningful change, take screenshots and look at them:

```bash
node tools/shoot.cjs "#/s/<story>/<beat>" "#/platform/fabric"
```

Tile several into a contact sheet (`tools/sheet.py`) to review a whole story in one image. Expect three or four rounds: first framing, then crowding, then finish. When the person says the result is not good enough, believe them and change the approach rather than polishing the one that is not working.

Then run the automated check. It walks every beat at three screen sizes and exercises hover, click and zoom:

```bash
npm run check
```

It fails on console errors, nodes without a room, unknown block ids, captions that overlap, labels off screen or on top of each other, and an approval that does not advance. Add a check whenever a screenshot reveals a class of bug.

### 7. Hand it over

Give the person the running site (and a single-file build if they need to open it offline), a presenter guide with a timed run and a "which story for which conversation" table, and the research folder. State plainly what was verified and what was not (other browsers, touch, real projectors).

## Working with parallel agents

Research parallelises well; give each agent one angle, the files to read first, the exact output paths and shapes, and a short final-message format. Interface work can be delegated if file ownership is explicit ("you own these files, do not edit those") and each agent uses its own dev-server port. Keep the renderer and the art direction in one pair of hands: taste does not merge.

## Adapting to another industry

Change, in order: the rooms and their furniture (`rooms.ts`), the catalog of platform blocks (`catalog.ts`), the stories and staging, and the research. The projection, pins, links, camera, labels, player, checks and interface carry over unchanged. A retail version needs a sales floor, back room, registers and a distribution center; a factory needs lines, a control room and a warehouse. Keep eight to eleven rooms: fewer feels empty, more cannot be read.

## Reference files

- `references/renderer.md`: projections, primitives, baking, pins, links, camera, labels, layouts, and how to draw a new room.
- `references/story-schema.md`: the story data model, the cumulative step rules, staging, authoring checklist, and a complete worked story.
- `references/research.md`: agent brief template, JSON output shapes, guardrails, and how briefs feed the app data.
- `assets/starter/`: the working project to copy. Read its README first.
