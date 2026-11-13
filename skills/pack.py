#!/usr/bin/env python3
"""Refresh the skill's starter kit from experience/ and package it as interactive-explainer.skill.

Run from the repository root:  python3 skills/pack.py
The starter is the working project minus build output, screenshots and account-specific content.
"""
import pathlib, shutil, zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "experience"
SKILL = ROOT / "skills" / "interactive-explainer"
DST = SKILL / "assets" / "starter"

KEEP = ["index.html", "package.json", "tsconfig.json", "vite.config.ts", ".gitignore", "README.md", "PRESENTER-GUIDE.md", "src", "tools"]
SKIP_NAMES = {"node_modules", "dist", "dist-single", "dist-ui", "shots", "docs"}
# Account research stays out of an exported skill: it belongs to the account team, not to the method.
SKIP_FILES = {"src/data/account-content.ts", "src/story/accounts.ts"}

if DST.exists():
    shutil.rmtree(DST)
DST.mkdir(parents=True)
for name in KEEP:
    p = SRC / name
    if not p.exists():
        continue
    if p.is_dir():
        shutil.copytree(p, DST / name, ignore=shutil.ignore_patterns(*SKIP_NAMES))
    else:
        shutil.copy2(p, DST / name)
for rel in SKIP_FILES:
    f = DST / rel
    if f.exists():
        f.unlink()
# Stubs so the starter still compiles without the account content.
(DST / "src/story/accounts.ts").write_text('import type { SceneDef } from "./types";\nimport type { Staging } from "./staging";\n\n/** Account-specific stories go here: group "Account", account: "<workspace id>". */\nexport const ACCOUNT_SCENES: SceneDef[] = [];\nexport const ACCOUNT_STAGING: Record<string, Staging> = {};\n')
(DST / "src/data/account-content.ts").write_text('/** Generated from research/data/account-*.json by tools/gen-data.py. Empty in the starter. */\nexport interface AccountContent { tagline: string; about: string; facts: { v: string; l: string; s: string; url?: string }[]; priorities: { title: string; detail: string; s?: string; url?: string }[] }\nexport const ACCOUNT_CONTENT: Record<string, AccountContent> = {};\n')

out = ROOT / "skills" / "interactive-explainer.skill"
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(SKILL.rglob("*")):
        if f.is_file() and "__pycache__" not in f.parts:
            z.write(f, pathlib.Path("interactive-explainer") / f.relative_to(SKILL))
n = sum(1 for _ in DST.rglob("*") if _.is_file())
print(f"starter: {n} files; packaged {out.relative_to(ROOT)} ({out.stat().st_size // 1024} kB)")
