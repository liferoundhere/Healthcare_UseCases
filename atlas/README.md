# Atlas: healthcare infrastructure use case library and presenter

Atlas is the 2D showcase (`showcase/`) rebuilt for presenting. It keeps the hospital floor plans, the light
theme and the Today versus With Cisco Cloud Control story, and changes how it is shown:

- **The presenter sets the pace.** Nothing advances on a timer. A step changes on Right, Space, Page Down or a
  click on Next. Left or Page Up goes back. An approval waits for a click on Approve or for Enter.
- **One story on screen.** The floor plan takes two thirds of the width. Beside it one card shows the phase, the
  step counter, the step title, one narration sentence and at most one supporting element. Everything else is in
  the Details drawer (key I) and on the closing Summary step.
- **A use case library** is the home page: cards, search, filters by category and pillar, and a presentation
  queue that is saved in the browser.
- **Three editions, built separately**: general, MSK and NYULH. An edition's files contain only that edition's
  content. Nothing in one account's edition names the other account, and there is no edition switcher.

## Build, check, run

Needs Node 18 or later. The build and the server have no dependencies. The check and the screenshot tool use
Playwright with Chromium.

```
node atlas/build.mjs              # writes atlas/dist/general, atlas/dist/msk, atlas/dist/nyulh
node atlas/tools/check.cjs        # walks every edition, every use case, every step (about 6 minutes)
node atlas/tools/check.cjs --fast # same, without the two real-time waits (about 3 minutes)
node atlas/tools/selftest.mjs     # proves the build rejects bad data and keeps editions apart
node atlas/tools/shoot.cjs        # screenshots into atlas/shots (--uc=all --steps=all for every step)
node atlas/server.mjs             # http://localhost:8080/general/  /msk/  /nyulh/
```

Each edition is a self-contained static site. You can also open `atlas/dist/<edition>/index.html` straight from
disk, or copy one edition folder to any static host.

`atlas/dist` and `atlas/shots` are build output and are ignored by git (`dist/` and `shots/` in `.gitignore`).
Run the build after every change to `usecases/`, `narratives/` or `src/`.

## Layout

```
atlas/
  build.mjs            builds and verifies the three editions
  server.mjs           small host server with optional access codes
  AUTHORING.md         how to add a use case
  usecases/            one .mjs file per use case (content, editions, node positions)
    _template.mjs      a complete example, skipped by the build
  narratives/          optional extra narrative files (.json or .mjs)
  src/engine/          canvas engine, kept from the showcase: core, scene engine, set-dressing kit, floor plans
  src/web/             index.html (library), play.html (presenter), atlas.css, common.js, library.js, player.js
  tools/check.cjs      Playwright end to end check
  tools/shoot.cjs      Playwright screenshots
  tools/selftest.mjs   negative tests for the build
  tools/publish-herenow.mjs   publishes one built edition to here.now
  docs/                screenshots used by the root README
  dist/<edition>/      index.html, play.html, css/atlas.css, js/*.js, data/catalog.js, data/uc-<id>.js
```

The narrative of the 13 original use cases is read from `stage/js/narrative.js`, as in the showcase. That file is
not edited here: corrections to it live in each use case file under `narrPatch` (see AUTHORING.md, section 4).

## Presenting

| Key | Action |
| --- | --- |
| Right, Space, Page Down | Next step |
| Left, Page Up | Previous step |
| Enter | Approve (on an approval step) |
| Home, End | First step, Summary |
| 1, 2, 3 | Executive, IT director, Engineering wording |
| I | Details drawer |
| T | Light or dark theme |
| A | Auto: one step every 12 seconds. Off unless you turn it on. It never passes an approval. |
| Esc | Close the Details drawer |

The Library button returns to the library.

`play.html?uc=<id>#4` opens a use case on step 4, `#summary` on the summary. From the library, "Play queue" runs
the queued use cases in order: on a Summary, Next goes to the next story, and Back on the first step of a story
returns to the summary of the one before.

## Editions

| Edition | Header label | Content |
| --- | --- | --- |
| `general` | General edition | Shared use cases only |
| `msk` | Prepared for Memorial Sloan Kettering Cancer Center | Shared use cases, plus the account section |
| `nyulh` | Prepared for NYU Langone Health | Shared use cases, plus the account section |

Account use cases appear in their own section, first on the page, under a heading that names the organization
("For <organization>: hypotheses to validate"). The build fails if
the output of the MSK edition contains `NYU`, `Langone` or `NYULH`, if the output of the NYULH edition contains
`MSK`, `Memorial Sloan` or `Sloan Kettering`, or if the general edition contains any of them. It scans every
file it wrote, including file names.

## What the build verifies

Required fields; one position per node and no stray positions; every link, step, callout and zone reference;
icons and floor plans that exist; `scene.labels` and `scene.hide` overrides that match what the floor plan draws
(`node atlas/build.mjs --plans` lists it); no em dash, en dash or emoji; no reference to another host in HTML or CSS; no
other account named in an edition. A failure stops the build with the file and the reason.

## What the check verifies

For each edition: the library (label, cards, filters, search, account section, queue with reorder, reload and
play), then every use case and every step with the keyboard. It fails on console errors, HTML text under 14px,
canvas text under 12px at 1600x900, text that overflows, labels that collide, a callout bubble that hides a device or
a zone name, a link that runs behind a device on
the Cloud Control band, content that does not fit at
1600x900 or 1280x720, a node without a position, another account's name in the page, an approval that can be
skipped, a control that does nothing, and a step that advances by itself within 15 seconds.

## Hosting

`server.mjs` serves `dist/` and nothing else. The root path `/` and every unknown path return the same neutral
page; no path lists the editions.

```
PORT=8080 \
ATLAS_CODE_MSK='a long code for this customer' \
ATLAS_CODE_NYULH='a different long code' \
ATLAS_SECRET='32 or more random characters' \
node atlas/server.mjs
```

| Variable | Meaning |
| --- | --- |
| `PORT`, `HOST` | Where to listen. Defaults 8080 and 0.0.0.0 |
| `ATLAS_CODE_GENERAL`, `ATLAS_CODE_MSK`, `ATLAS_CODE_NYULH` | Access code per edition. Set: the edition shows a sign-in page and sets a cookie scoped to that edition's path. Unset: the edition is open |
| `ATLAS_SLUG_GENERAL`, `ATLAS_SLUG_MSK`, `ATLAS_SLUG_NYULH` | Optional path name in place of the edition id. With `ATLAS_SLUG_MSK=harbor` the edition is at `/harbor/` and `/msk/` returns the neutral page. Use this so that one customer cannot guess another customer's address |
| `ATLAS_SECRET` | Signs the cookies. Without it a random key is made at start and everyone signs in again after a restart |
| `ATLAS_SESSION_HOURS` | Cookie lifetime, default 12 |
| `ATLAS_DIST` | Folder with the built editions, default `atlas/dist` |

The server limits sign-in attempts to 10 per address every 10 minutes, sends `noindex` headers and a content
security policy, and has a `/healthz` endpoint. Sign out at `/<edition>/signout`.

Deploying:

- **Any Node host or container** (Render, Fly.io, Railway, Azure App Service, Cloud Run, a VM): run
  `node atlas/build.mjs` in the build step and `node atlas/server.mjs` as the start command. Set the variables
  above as secrets. Put it behind HTTPS; the cookie is marked `Secure` when the request arrives over HTTPS or with
  `X-Forwarded-Proto: https`.
- **Docker**, from the repository root:

  ```
  FROM node:20-alpine
  WORKDIR /app
  COPY atlas ./atlas
  COPY stage/js/narrative.js ./stage/js/narrative.js
  RUN node atlas/build.mjs
  ENV PORT=8080
  EXPOSE 8080
  CMD ["node", "atlas/server.mjs"]
  ```

- **Static hosting without the server**: upload one edition folder (`atlas/dist/msk`) to a bucket or a static
  site and protect it with the host's own access control. Upload only that customer's folder to that customer's
  site.

The access code is a shared secret for a demo site, not user management. For anything that needs named users,
put the server behind your identity provider or an authenticating proxy.

## Errors found in the showcase and fixed here

- The story ran on a 5.5 second clock and looped; the guided tour and the approval also ran on timers. All removed.
- Stale counts: "Thirteen stories", "FLAGSHIP 1 OF 3" and "USE CASE 4 OF 10" were typed in. Counts now come from the data.
- Text under the legibility floor: tab labels at 9.5px, facts at 10.5px, canvas labels down to 8.5 units. HTML is now
  14px or more and canvas text is raised to at least 12 screen pixels.
- Labels shrank until they fitted (`fitText` down to 9.5px). Set-dressing labels that do not fit are now left out.
- Callout bubbles covered device labels in 9 of the 13 stories. Callouts and device labels now place themselves,
  and the check fails on any collision.
- Captions overlapped neighbouring devices or labels (Security step 4, Facilities, EHR step 5).
- The gaps panel drew its large number on top of the fifth gap line, and the data path note was clipped on the right.
- A node without a position was skipped silently. It is now a build error and a presenter error.
- A use case with a missing narrative or floor plan threw at boot and left a blank page. The build now reports it.
- The right arrow and Prev/Next changed the use case, not the step; Space toggled a clock. Keys now move one step.
- Rail hit targets were drawn on the canvas with no keyboard access. The strip is now real buttons.
- The side panel tab overlapped the right column at 1600 pixels wide.
- The device tooltip listed all three audience wordings at 12px. It now shows the chosen audience at 14px.
- `tools/` used Windows browser paths and puppeteer-core, so the checks could not run elsewhere.
