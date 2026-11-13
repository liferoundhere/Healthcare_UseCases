#!/usr/bin/env python3
"""Tile screenshots into a contact sheet: sheet.py out.png a.png b.png ... (2 columns)."""
import sys
from PIL import Image
out, files = sys.argv[1], sys.argv[2:]
cols = 2; W, H = 800, 450
sheet = Image.new("RGB", (cols * W, ((len(files) + cols - 1) // cols) * H))
for i, f in enumerate(files): sheet.paste(Image.open(f).resize((W, H), Image.LANCZOS), ((i % cols) * W, (i // cols) * H))
sheet.save(out)
