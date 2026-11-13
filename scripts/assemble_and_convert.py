"""Assemble the master context document, sources.md, and a Word copy."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
RESEARCH = ROOT / "research"
OUT_MD = ROOT / "healthcare-storyboard-context.md"
OUT_SOURCES = ROOT / "sources.md"
OUT_DOCX = ROOT / "healthcare-storyboard-context.docx"

COVER = """# Healthcare Infrastructure Storyboard: Context Document

**Prepared November 12, 2026.** Master file for 3D and 2D storyboard development.

This document is the assembled context pack. Use it as AI context when you design 3D and 2D examples of how a health system runs infrastructure today, and how Cisco Cloud Control and Cisco Data Fabric change the operating model.

**How to read it**
- **Phase 1** (Parts 0 and 1, plus the three pillars) is vendor-neutral. It describes the customer, engineering, and clinical experience with any technology stack.
- **Phase 2** (Parts 2 and 3) maps Cisco Cloud Control and Cisco Data Fabric onto those problems. Every Cisco capability is tagged GA, CA (Controlled Availability, beta, or alpha), or Roadmap. Cloud Control general availability is the United States only as of this date.
- **Part 4** is the scene-by-scene storyboard, including flagship sequences for Security, Facilities, and AI.

**Three pillars.** Security protects the facility and the clinical workflow. The facility is where care and infrastructure live. AI depends on that infrastructure and creates new risk inside it. Every use case names which pillars it touches.

**Citation prefixes**

| Prefix | File | Scope |
|---|---|---|
| [C-n] | `research/01-clinical-ops.md` | Macro context, ten use cases, KPI table |
| [S-n] | `research/02-security.md` | Threats, architecture, identity, MTTx, compliance, incident file |
| [F-n] | `research/03-facilities.md` | Facility types, clinical spaces, building/OT, plant, M&A, hospital-at-home |
| [A-n] | `research/04-ai-healthcare.md` | AI landscape, failure modes, infrastructure, governance, Cisco AI section F |
| [K-n] | `research/05-cisco-cloud-control-data-fabric.md` | Cloud Control, Data Fabric, status, licensing, guardrails |

Full URLs live in `sources.md` and in the research briefs. Labels **ESTIMATE**, **VENDOR-REPORTED**, **Analysis**, **Gap**, and **Modeled** must be preserved in any derived storyboard. Do not invent numbers to fill a Gap. Do not turn a Modeled outcome into a percentage.

**Companion files**
- `sources.md`: numbered bibliography by prefix.
- `research/`: the underlying research briefs (do not discard; they hold the full source lists and gaps).
- `docs/`: the sectional drafts this master was assembled from.

---

"""

TOC = """## Contents

1. How to use this document (Phase 1 conventions)
2. Part 0: Executive framing and glossary
3. Part 1: Ten use cases (today, vendor-neutral)
4. Pillar: Healthcare security
5. Pillar: Healthcare facilities
6. Pillar: AI in healthcare (today state)
7. Part 2: Personas, KPI tables, compliance recap
8. Part 3: Phase 2, Cisco Cloud Control and Cisco Data Fabric
9. Part 4: Storyboard scenes and visual cues
10. Gaps and unverified claims (end of this file)
11. `sources.md` (bibliography)

---

"""


def strip_leading_title(text: str) -> str:
    """Drop the first H1 and its immediate subtitle/intro if they duplicate the cover."""
    lines = text.splitlines()
    # Keep content; just leave the file's own H1 in place for navigation.
    return "\n".join(lines).strip() + "\n\n"


def assemble_master() -> str:
    a1 = (DOCS / "part-a1.md").read_text(encoding="utf-8")
    a2 = (DOCS / "part-a2.md").read_text(encoding="utf-8")
    b = (DOCS / "part-b-phase2.md").read_text(encoding="utf-8")
    c = (DOCS / "part-c-storyboards.md").read_text(encoding="utf-8")
    gaps = extract_gaps()
    return COVER + TOC + strip_leading_title(a1) + "\n---\n\n" + strip_leading_title(a2) + "\n---\n\n" + strip_leading_title(b) + "\n---\n\n" + strip_leading_title(c) + "\n---\n\n" + gaps


def extract_section_after(text: str, heading_re: str) -> str:
    m = re.search(heading_re, text, re.M)
    if not m:
        return ""
    start = m.start()
    nxt = re.search(r"^## ", text[m.end():], re.M)
    if nxt:
        return text[start : m.end() + nxt.start()]
    return text[start:]


def extract_gaps() -> str:
    clinical = (RESEARCH / "01-clinical-ops.md").read_text(encoding="utf-8")
    security = (RESEARCH / "02-security.md").read_text(encoding="utf-8")
    facilities = (RESEARCH / "03-facilities.md").read_text(encoding="utf-8")
    ai = (RESEARCH / "04-ai-healthcare.md").read_text(encoding="utf-8")
    cisco = (RESEARCH / "05-cisco-cloud-control-data-fabric.md").read_text(encoding="utf-8")

    parts = ["# Gaps and unverified claims\n"]
    parts.append("These items could not be verified with a published figure, or sources conflict. Do not invent numbers to close them. Full gap lists sit in the research briefs.\n")
    parts.append("## Clinical and operations gaps\n")
    parts.append(extract_section_after(clinical, r"^## 4\) Gaps.*") or "_See research/01-clinical-ops.md._\n")
    parts.append("\n## Security gaps\n")
    parts.append(extract_section_after(security, r"^## E\) Gaps") or "_See research/02-security.md._\n")
    parts.append("\n## Facilities gaps\n")
    # facilities may use G) Gaps
    g = extract_section_after(facilities, r"^## G\)")
    parts.append(g or "_See research/03-facilities.md._\n")
    parts.append("\n## AI gaps\n")
    parts.append(extract_section_after(ai, r"^## G\)") or "_See research/04-ai-healthcare.md._\n")
    parts.append("\n## Cisco Cloud Control and Data Fabric gaps\n")
    parts.append(extract_section_after(cisco, r"^## H\)") or "_See research/05-cisco-cloud-control-data-fabric.md._\n")
    return "\n".join(parts)


def extract_sources_block(text: str, heading_re: str) -> str:
    m = re.search(heading_re, text, re.M)
    if not m:
        return ""
    return text[m.end():].strip() + "\n"


def assemble_sources() -> str:
    blocks = []
    mapping = [
        ("C", "Clinical operations and infrastructure use cases", "01-clinical-ops.md", r"^## 5\) Full source list"),
        ("S", "Healthcare security pillar", "02-security.md", r"^## F\) Sources"),
        ("F", "Healthcare facilities pillar", "03-facilities.md", r"^## H\) Numbered sources"),
        ("A", "AI in healthcare pillar", "04-ai-healthcare.md", r"^## H\) Sources"),
        ("K", "Cisco Cloud Control and Cisco Data Fabric", "05-cisco-cloud-control-data-fabric.md", r"^## G\) Sources"),
    ]
    header = """# Sources

Numbered bibliography for the Healthcare Infrastructure Storyboard context document. Prepared November 12, 2026.

Cite in the master document as `[C-n]`, `[S-n]`, `[F-n]`, `[A-n]`, or `[K-n]`. Each prefix maps to one research brief. Prefer the research brief if a URL here and a URL there ever disagree; the briefs were checked against live pages on November 12, 2026.

Items marked VENDOR-REPORTED, ESTIMATE, or secondary in the briefs keep those labels in any derived work.

---

"""
    for prefix, title, fname, heading in mapping:
        text = (RESEARCH / fname).read_text(encoding="utf-8")
        body = extract_sources_block(text, heading)
        blocks.append(f"## {prefix}: {title}\n\nFrom `research/{fname}`.\n\n{body.strip()}\n")
    return header + "\n---\n\n".join(blocks)


# --- markdown to docx ---

def md_to_docx(md: str, dest: Path) -> None:
    from docx import Document
    from docx.oxml.ns import qn
    from docx.oxml import OxmlElement
    from docx.shared import Inches, Pt, RGBColor
    from docx.enum.text import WD_LINE_SPACING

    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(1)
    section.bottom_margin = Inches(1)
    section.left_margin = Inches(1)
    section.right_margin = Inches(1)

    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(11)
    style.paragraph_format.space_after = Pt(8)
    rpr = style.element.get_or_add_rPr()
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.append(rfonts)
    rfonts.set(qn("w:ascii"), "Calibri")
    rfonts.set(qn("w:hAnsi"), "Calibri")

    for i in range(1, 4):
        hs = doc.styles[f"Heading {i}"]
        hs.font.color.rgb = RGBColor(0x1B, 0x3A, 0x4B)
        hs.font.name = "Calibri"

    lines = md.replace("\r\n", "\n").split("\n")
    i = 0
    in_code = False
    code_lines: list[str] = []
    in_table = False
    table_rows: list[list[str]] = []

    def flush_code():
        nonlocal code_lines
        if not code_lines:
            return
        p = doc.add_paragraph()
        run = p.add_run("\n".join(code_lines))
        run.font.name = "Consolas"
        run.font.size = Pt(9)
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(10)
        code_lines = []

    def flush_table():
        nonlocal table_rows, in_table
        rows = [r for r in table_rows if not is_separator_row(r)]
        table_rows = []
        in_table = False
        if not rows:
            return
        cols = max(len(r) for r in rows)
        t = doc.add_table(rows=len(rows), cols=cols)
        t.style = "Table Grid"
        for ri, row in enumerate(rows):
            for ci in range(cols):
                cell = t.rows[ri].cells[ci]
                text = row[ci].strip() if ci < len(row) else ""
                cell.text = ""
                p = cell.paragraphs[0]
                add_runs(p, text)
                if ri == 0:
                    for run in p.runs:
                        run.bold = True

    def is_separator_row(cells: list[str]) -> bool:
        return all(re.fullmatch(r":?-{3,}:?", c.strip()) for c in cells if c.strip())

    def add_runs(paragraph, text: str):
        # Split on **bold**, `code`, and [links](url) lightly.
        pattern = re.compile(r"(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))")
        pos = 0
        for m in pattern.finditer(text):
            if m.start() > pos:
                paragraph.add_run(text[pos:m.start()])
            token = m.group(0)
            if token.startswith("**"):
                run = paragraph.add_run(token[2:-2])
                run.bold = True
            elif token.startswith("`"):
                run = paragraph.add_run(token[1:-1])
                run.font.name = "Consolas"
                run.font.size = Pt(10)
            else:
                label = re.match(r"\[([^\]]+)\]\(([^)]+)\)", token)
                run = paragraph.add_run(label.group(1) if label else token)
                run.italic = True
            pos = m.end()
        if pos < len(text):
            paragraph.add_run(text[pos:])

    while i < len(lines):
        line = lines[i]
        if line.startswith("```"):
            if in_code:
                flush_code()
                in_code = False
            else:
                if in_table:
                    flush_table()
                in_code = True
            i += 1
            continue
        if in_code:
            code_lines.append(line)
            i += 1
            continue

        if line.strip().startswith("|"):
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            table_rows.append(cells)
            in_table = True
            i += 1
            continue
        else:
            if in_table:
                flush_table()

        if not line.strip() or line.strip() == "---":
            i += 1
            continue

        if line.startswith("# "):
            p = doc.add_heading(line[2:].strip(), level=1)
        elif line.startswith("## "):
            doc.add_heading(line[3:].strip(), level=2)
        elif line.startswith("### "):
            doc.add_heading(line[4:].strip(), level=3)
        elif line.startswith("#### "):
            doc.add_heading(line[5:].strip(), level=4)
        elif re.match(r"^[-*] ", line):
            p = doc.add_paragraph(style="List Bullet")
            add_runs(p, line[2:].strip())
        elif re.match(r"^\d+\.\s", line):
            p = doc.add_paragraph(style="List Number")
            add_runs(p, re.sub(r"^\d+\.\s", "", line).strip())
        else:
            p = doc.add_paragraph()
            add_runs(p, line.strip())
        i += 1

    if in_code:
        flush_code()
    if in_table:
        flush_table()

    # Footer note
    footer = section.footer
    fp = footer.paragraphs[0]
    fp.text = "Healthcare Infrastructure Storyboard Context  |  12 November 2026  |  Citations in sources.md"
    for run in fp.runs:
        run.font.size = Pt(8)
        run.font.color.rgb = RGBColor(0x66, 0x66, 0x66)

    dest.parent.mkdir(parents=True, exist_ok=True)
    doc.save(dest)


def main() -> None:
    master = assemble_master()
    # Em-dash / en-dash scan before write
    if "\u2014" in master or "\u2013" in master:
        raise SystemExit("Em dash or en dash found in assembled master. Fix before writing.")
    OUT_MD.write_text(master, encoding="utf-8")
    print(f"Wrote {OUT_MD} ({len(master):,} chars)")

    sources = assemble_sources()
    if "\u2014" in sources or "\u2013" in sources:
        # Replace any that slipped in from research files
        sources = sources.replace("\u2014", ", ").replace("\u2013", "-")
        print("Replaced dashes in sources.md")
    OUT_SOURCES.write_text(sources, encoding="utf-8")
    print(f"Wrote {OUT_SOURCES} ({len(sources):,} chars)")

    md_to_docx(master, OUT_DOCX)
    print(f"Wrote {OUT_DOCX} ({OUT_DOCX.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
