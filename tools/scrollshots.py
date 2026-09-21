#!/usr/bin/env python3
"""Scroll a real viewport down the page and capture each screen, so the fixed
backdrop, reveals and bar behave as they do on a phone. Stitches a strip.

    python3 tools/scrollshots.py <out_dir> <w> <h> <dpr> <mobile 0|1> [label]
"""
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

out = Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
w, h, dpr, mobile = int(sys.argv[2]), int(sys.argv[3]), float(sys.argv[4]), sys.argv[5] == "1"
label = sys.argv[6] if len(sys.argv) > 6 else f"{w}x{h}"
errors = []
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True, args=["--enable-gpu", "--ignore-gpu-blocklist", "--use-angle=metal"])
    ctx = b.new_context(viewport={"width": w, "height": h}, device_scale_factor=dpr, is_mobile=mobile, has_touch=mobile)
    page = ctx.new_page()
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.goto("http://127.0.0.1:8787/?forcegl", wait_until="networkidle")
    page.wait_for_timeout(2400)
    total = page.evaluate("document.documentElement.scrollHeight")
    y, i, files = 0, 0, []
    while True:
        page.evaluate(f"window.scrollTo(0,{y})")
        page.wait_for_timeout(1500)
        f = out / f"{label}-{i:02d}.png"
        page.screenshot(path=str(f))
        files.append(f)
        if y + h >= total:
            break
        y = min(y + int(h * 0.85), total - h)
        i += 1
    b.close()
ims = [Image.open(f) for f in files]
scale = 520 / ims[0].size[0] if mobile else 900 / ims[0].size[0]
ims = [im.resize((round(im.size[0] * scale), round(im.size[1] * scale)), Image.LANCZOS) for im in ims]
gap = 14
sheet = Image.new("RGB", (sum(i.size[0] for i in ims) + gap * (len(ims) + 1), ims[0].size[1] + 2 * gap), (40, 40, 40))
x = gap
for im in ims:
    sheet.paste(im, (x, gap)); x += im.size[0] + gap
sheet.save(out / f"{label}-strip.png")
print(label, "screens:", len(files), "doc height:", total, "errors:", errors or "none")
