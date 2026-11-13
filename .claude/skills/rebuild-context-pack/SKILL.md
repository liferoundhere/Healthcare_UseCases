---
name: rebuild-context-pack
description: "Reassemble the master context document (healthcare-storyboard-context.md), the bibliography (sources.md) and the Word copy (.docx) from docs/ and research/ using scripts/assemble_and_convert.py. Use after any edit to docs/part-*.md or research/*.md, or when asked to \"rebuild the master\", \"regenerate the docx\", \"update sources.md\" or \"refresh the context document\"."
---

# Rebuild the context pack

Three files at the repo root are generated. Never edit them by hand.

| Output | Built from |
|---|---|
| `healthcare-storyboard-context.md` | Cover and contents (strings inside the script), then `docs/part-a1.md`, `part-a2.md`, `part-b-phase2.md`, `part-c-storyboards.md`, then the Gaps section of each research brief |
| `sources.md` | The numbered source list at the end of each research brief |
| `healthcare-storyboard-context.docx` | The assembled master, converted with python-docx |

`docs/part-a-phase1.md` is an index page for humans and is not assembled.

## Run

```bash
python3 scripts/assemble_and_convert.py
```

Needs Python 3.12 or later and `python-docx` (`pip install python-docx`). It prints the three files it wrote with their sizes.

## Then review the diff before committing

```bash
git diff --stat
```

```bash
git diff healthcare-storyboard-context.md sources.md
```

Check three things:

1. **The diff matches your edit.** Only the passages you changed in `docs/` or `research/` should move in the master and in `sources.md`. The `.docx` is binary and always shows as changed.
2. **Nothing vanished.** If a Gaps block in the master now reads `_See research/0N-..._`, or a prefix section in `sources.md` is empty, a heading in that brief no longer matches what the script looks for. The table of required headings is in `update-research`.
3. **No unrelated churn.** On 13 November 2026, running the script on unchanged inputs added about 26 lines to the committed master: the title block of each `docs/part-*.md` file reappeared at each join. The script's `strip_leading_title` does not strip anything, so the committed master and the script had drifted. If you see those title blocks come back and that drift has not been resolved, stop and tell the user instead of committing it as part of an unrelated change.

## Dashes

The script exits with "Em dash or en dash found in assembled master" if either character is in the assembled text. Fix it in `docs/` or `research/`. In `sources.md` it replaces them itself and prints "Replaced dashes in sources.md"; treat that message as a prompt to clean the brief.

## Changing the cover, contents or Word styling

The cover text, the citation prefix table, the contents list and the footer (which carries the prepared date) are string constants and code in `scripts/assemble_and_convert.py`. If the structure of the pack changes (a new part, a new brief, a new prefix, a new date), update those constants, the mapping in `assemble_sources`, and the README section "How the pack is structured" in the same change.

## Commit

Commit the edited `docs/` or `research/` files together with all three outputs. A commit that changes a draft without the regenerated master leaves the pack inconsistent for anyone using the master as AI context.
