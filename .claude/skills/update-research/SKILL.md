---
name: update-research
description: "Add, correct or re-verify a source, figure, gap or Cisco status tag in the research briefs (research/01 to 05) and carry it into the sectional drafts in docs/. Use when asked to \"add a source\", \"update this number\", \"cite this\", \"check whether this is still true\", \"close a gap\", \"the status changed to GA\", or when a story needs a figure that is not in the pack yet. Defines the citation prefixes, the evidence labels and how conflicts and gaps are recorded."
---

# Update the research

The research briefs are the bottom of the evidence chain. A figure exists in this project only if a brief carries it with a numbered source.

```
research/0N-*.md   cited briefs, each with its own numbered source list and gap list
      v
docs/part-*.md     sectional drafts that quote the briefs with [X-n] citations
      v
master, sources.md, .docx   generated (see rebuild-context-pack)
      v
stories            scenes.ts facts and showcase tiles quote the same figures
```

## Citation prefixes

| Prefix | Brief | Scope |
|---|---|---|
| `[C-n]` | `research/01-clinical-ops.md` | Macro context, ten use cases, KPI table |
| `[S-n]` | `research/02-security.md` | Threats, architecture, identity, MTTx, compliance, incident file |
| `[F-n]` | `research/03-facilities.md` | Facility types, clinical spaces, building and OT, plant, M&A, hospital-at-home |
| `[A-n]` | `research/04-ai-healthcare.md` | AI landscape, failure modes, infrastructure, governance. 83 and up are Cisco AI (section F) |
| `[K-n]` | `research/05-cisco-cloud-control-data-fabric.md` | Cloud Control, Data Fabric, status, licensing, guardrails |

Section-level citations point at a brief's own synthesis rather than one source: `[C-1 jargon]`, `[C-gaps 3]`, `[S-gaps 1]`, `[F-gaps 1]`, `[A-gaps]`, `[S-B]` (security compliance matrix), `[K-E n]` (overclaim guardrail n), `[K-gaps n]`, `[K-PHI]`.

## Labels

| Label | Use it when |
|---|---|
| **ESTIMATE** | Arithmetic, planning ranges or third-party estimates, not measured results |
| **VENDOR-REPORTED** | A vendor's own research, survey, case study or benchmark. Directional only |
| **Analysis** | An inference drawn from cited facts |
| **Gap** | No published number exists or none could be verified |
| **Modeled** | Phase 2 only. A qualitative description of how work changes. Never a percentage |

Cisco capability status: **GA** (a Cisco or Splunk source says generally available or available now), **CA** (controlled availability, beta or alpha, with the source's word in parentheses), **Roadmap** (announced, coming, targeted, or no shipping evidence).

## Procedure

1. **Read the source itself.** Open the primary page, not a summary of it. Record the publisher, title, publication date and URL, and the date you checked it.
2. **Add the source to the right brief.** Append it to that brief's numbered source list with the next free number. Never renumber existing sources: `docs/`, the master and the stories cite them by number.
3. **Write the claim in the brief** with its citation and its label. Say what the number measures, the population and the year. A healthcare figure and an all-industry figure are different facts; say which one it is.
4. **Conflicts.** If the new source disagrees with one already in the pack, keep both with their citations and note the disagreement. For Cisco status, write it as the pack does: "CA (beta, June 2026); October 2026 deck says AVAILABLE; confirm."
5. **Gaps.** If you looked and found nothing, add or keep the entry in the brief's Gaps section. If a new source closes a gap, replace the gap entry with the sourced figure and remove "Gap" wherever `docs/` repeats it. Search for it:

   ```bash
   grep -rn "Gap" docs/ | grep -i "<topic>"
   ```

6. **Carry it into `docs/`.** Update every sectional draft that states the old figure. Search by the old value and by the citation number.
7. **Carry it into the stories.** `grep` `app/src/scenes.ts` and `showcase/src/` for the old value. Story facts and tiles repeat figures without the bracket citation, so search by value. Then follow `edit-story`.
8. **Reassemble** with `rebuild-context-pack`.

## Headings the assembler depends on

`scripts/assemble_and_convert.py` pulls the gap lists and source lists out of each brief by matching these exact headings. Renaming one silently drops that section from the master or from `sources.md`.

| Brief | Gaps heading starts with | Sources heading starts with |
|---|---|---|
| 01 | `## 4) Gaps` | `## 5) Full source list` |
| 02 | `## E) Gaps` | `## F) Sources` |
| 03 | `## G)` | `## H) Numbered sources` |
| 04 | `## G)` | `## H) Sources` |
| 05 | `## H)` | `## G) Sources` |

A source list is copied into `sources.md` from its heading up to the next `## ` heading, or to the end of the file. Do not put a `## ` heading inside a source list; it would cut the list short. Brief 05 keeps its Gaps section after its Sources; leave that order alone, because its sections are cited by letter.

## Do not

- Invent, round toward a nicer number, or extrapolate a healthcare figure from a general one.
- Reuse Cisco's non-healthcare customer figures as healthcare results.
- Upgrade a status tag on the strength of a slide, a blog headline or a demo. Quote the source's exact availability wording.
- Delete a superseded source. Mark it superseded and keep the number.
- Use an em dash or en dash. The assembler stops on them.
