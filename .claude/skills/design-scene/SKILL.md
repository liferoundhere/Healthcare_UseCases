---
name: design-scene
description: "Design a new storyboard scene, or review an existing one, against this project's visual conventions: color states, status chips, metric overlays, approval modal, camera language and the per-frame rules. Use when asked to storyboard a use case, write scene descriptions for a 2D or 3D build, add a flagship sequence, choose how to show a state or a number on screen, or judge whether a frame \"follows the conventions\". For wiring a scene into the code, use edit-story afterwards."
---

# Design a scene

The canonical conventions are in `docs/part-c-storyboards.md`, section **4.0 Global visual conventions**, and the object library is section **4.5**. Existing scenes (4.1 to 4.4) are the worked examples. Read 4.0 and one flagship before writing a new scene:

```bash
grep -n "^## 4.0" -A 32 docs/part-c-storyboards.md
```

This skill is the short form and the order of work.

## What a scene is for

Each story shows the same event twice: Today, on any infrastructure, and With Cisco Cloud Control, modeled. The value is the contrast, and it has to be visible in the scene, not only in a caption. Every story belongs to a person in a place at a time, with something about to go wrong.

## Scene template

Write each scene with these fields, as the existing ones do:

- **Setting**: the real kind of place (ICU bay, IDF closet, SOC, plant room, patient's living room).
- **Camera**: one of the camera modes below, and the move.
- **Objects**: from the object library first. New objects only when the story needs them.
- **Data-flow overlay**: which lines appear, in what state. Shapes only.
- **Color state**: which objects are in which state.
- **Metric overlay**: the cited figure, the proposed KPI stopwatch, or the Modeled outcome.
- **People**: who is in frame and what they are doing.

Flagships run 6 scenes. Use cases run 4.

## Color states

| Color | Means | Notes |
|---|---|---|
| Green | Healthy | Steady glow, slow pulse on data lines |
| Amber | Degraded | Faster pulse, dashed lines, warning glyph |
| Red | Down | Solid red, broken line with a visible gap, object desaturated |
| Blue | A person's decision is pending | Only on the approval modal and objects waiting for approval. Never use blue for anything else |
| Gray | Unknown or not instrumented | Use it honestly for what no tool can see: a patient's home cellular link, a vendor's upstream model provider |

In code these are the states `ok`, `warn`, `down`, `pending`, `unknown`.

## On-screen honesty

- **Status chip on every Cisco panel**: GA (solid green outline), CA (amber outline, with "beta" or "alpha"), Roadmap (dotted gray outline). Cloud Control panels also carry "US". Roadmap items appear only in clearly labeled future frames.
- **Cited figures** show a small citation tag, for example `[C-37]`.
- **Proposed KPIs** (MTTA, MTTK, MTTInn) appear as a stopwatch labeled "measured locally; no industry benchmark".
- **Phase 2 outcomes** carry a MODELED watermark and no percentage. Example: "Modeled: one investigation instead of five consoles."
- **Clocks** (T+00:12 and similar) are pacing, not results. Put "illustrative timeline" under any clock.
- **Provenance in the showcase**: every item is tagged S (sourced), H (hypothesis) or I (illustrative). Which tools a given hospital runs is not public, so anything about a hospital's own stack is H.

## Rules for every frame

- No real patient data. "Patient A", "Bed 12", "Room 5E-14". No MRNs, names or dates of birth.
- No attacker procedures. Show a detection as an abstract shape ("unusual connection pattern"), with no commands, tools or exploit names.
- The approval modal appears before every change that can touch a clinical system.
- When a change happens, show an "executed in: Meraki / Catalyst Center / ISE / SD-WAN Manager / Security Cloud Control" chip. Never "executed by Cloud Control alone".
- Data Fabric panels are labeled "Machine data". Never "clinical data fabric".
- Cisco Spaces panels carry the caption "Connector health, not location".

## Camera

- **Isometric 3D** (default for 3D): 30 degree top-down cutaway with roofs and selected walls removed.
- **Over-the-shoulder**: any person working a screen.
- **Split screen**: Today on the left, desaturated; With Cloud Control on the right, full color.
- **2D**: flat floor plans and topology diagrams with callout bubbles, same color states.

## Three audiences

Narration and device captions are written three times: Executive (what it costs and who decides), IT director (which team owns it), Engineering (the mechanism). They are three points of view, not three lengths.

## Order of work

1. Pick the use case and read its Phase 1 journey in `docs/part-a1.md` and its Phase 2 mapping in `docs/part-b-phase2.md` section 3.3. The scene is built from those, not from general knowledge.
2. Write the Today scenes first, vendor-neutral, with the pain shown physically: the wrong console, the unit on paper, the outage that spreads.
3. Write the Cloud Control scenes as the same event. Mark where a person approves.
4. Attach a figure to each scene only if the pack has it, with its citation and label.
5. Run `check-cisco-claims` on the Phase 2 scenes.
6. To build it, continue with `edit-story`.

## Self-review

- Does something visibly change in the scene at every step, or is the narration doing the work?
- Is the Today version shown, or only described?
- Could every number be defended to a skeptical CFO, and is every unsourced one labeled?
- Is blue used only for a waiting decision, and gray for everything genuinely unseen?
