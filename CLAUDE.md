# Healthcare Infrastructure Storyboard

A context pack and three storyboard builds that show how a health system runs network, security, facilities and AI infrastructure today, and how Cisco Cloud Control and Cisco Data Fabric change the operating model. The audience is Cisco account teams presenting to healthcare executives, so every claim has to survive a skeptical CIO or CISO.

This file holds only the rules that apply to every task. Procedures live in skills (see the table at the end). Load the skill for the task before starting it.

## Where things live

| Path | What it is | Edit by hand? |
|---|---|---|
| `research/` | Five cited research briefs. Source of every figure, gap and status tag. | Yes |
| `docs/` | Sectional drafts (Parts A, B, C) that the master is assembled from. | Yes |
| `healthcare-storyboard-context.md`, `.docx`, `sources.md` | Master context document, Word copy and bibliography. | No, generated |
| `app/src/scenes.ts` | The 13 stories: nodes, links, steps, narration, facts, caveats. Single source of truth for story content. | Yes |
| `stage/js/narrative.js` | Story data shared by the showcase and the 3D stage. | No, generated from `scenes.ts` |
| `showcase/src/` | Sources of the 2D hospital models (engine, layout, per use case placement and decor). | Yes |
| `showcase/healthcare-2d-models.html` | The single-file showcase people open. | No, generated |
| `stage/` | 3D stage build. Paused. Only `stage/js/narrative.js` and `stage/tools/gen_narrative.mjs` are live. | Only when asked |

## Rules that always apply

**Evidence**

1. Keep the labels ESTIMATE, VENDOR-REPORTED, Analysis, Gap and Modeled on anything derived from the pack. In the showcase the same idea is the S (sourced), H (hypothesis) and I (illustrative) tags.
2. Never invent a number to close a Gap. Mean time to innocence (written MTTInn) has no published healthcare benchmark. Proposed KPIs are shown as "measured locally; no industry benchmark".
3. Never turn a Modeled outcome into a percentage. No Cisco healthcare customer metric for Cloud Control exists, and non-healthcare customer figures are not healthcare results.
4. Every figure carries its citation (`[C-n]`, `[S-n]`, `[F-n]`, `[A-n]`, `[K-n]`). When sources conflict, show both. Do not silently pick one.
5. Phase 1 content is vendor-neutral. Cisco appears only in Phase 2 content.

**Cisco claims**

6. Every Cisco capability is tagged GA, CA or Roadmap. Cloud Control is generally available in the United States only (from 25 August 2026).
7. Data Fabric is an aggregation layer for machine data. It is not a clinical data repository and does not replace the EHR. Never write "clinical data fabric".
8. "Reversible" means rollback of agent versions, not undo of network changes. Changes execute in the domain controller (Meraki, Catalyst Center, ISE, SD-WAN Manager, Security Cloud Control), never "by Cloud Control alone".
9. A named person approves any action that can touch a clinical system. No autonomous remediation in clinical networks.

**Safety**

10. No attacker procedures in any scene: no commands, tools or exploit names. No real patient data: use "Patient A", "Bed 12", "Room 5E-14".

**Writing**

11. No em dashes or en dashes anywhere, in content, code, comments or commit messages. The builds fail on them.

**Files**

12. Never hand-edit a generated file. Change the source, regenerate, and commit sources and outputs together.
13. Do not delete or thin out `research/`. It holds the full source lists and gap lists.
14. Do not extend the paused `stage/` build unless the request says so.

**Done means checked**

15. After a content or code change, regenerate what depends on it and run the checks in the matching skill. If a check cannot run in the current environment, say so. Do not report it as passed.

## Skills, by task

| Task | Skill |
|---|---|
| Add or change a story, step, node, narration line or fact | `edit-story` |
| Design a new scene or review one against the visual conventions | `design-scene` |
| Build the showcase HTML, run the overflow and smoke checks, take screenshots | `build-showcase` |
| Run or build the animated 2D app | `run-storyboard-app` |
| Add or update a source, figure, gap or status tag in the research | `update-research` |
| Reassemble the master document, bibliography and Word copy | `rebuild-context-pack` |
| Check any Cisco statement for overclaims before it ships | `check-cisco-claims` |
| Work on the paused 3D stage or its narrated edition | `stage-3d` |

Skills live in `.claude/skills/<name>/SKILL.md`.
