#!/usr/bin/env python3
"""Contrast of every text element against the BRIGHTEST backdrop behind it.
Hides all text, screenshots, and takes the 98th-percentile luminance inside each
element's box (so a passing dust mote does not decide it), then computes the
WCAG ratio with the element's own colour. Optionally parks the pointer on the
text first, so the key light is pulled toward it (the worst case on desktop).

    python3 tools/contrast.py <w> <h> <mobile 0|1>
"""
import io, json, sys
import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright

w, h, mobile = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3] == "1"
TARGETS = [".name__first", ".name__last", ".role", ".pitch", "#h-links", ".seg button", ".lede",
           ".about p:not(.lede):not(.pull)", ".pull", ".who__list li", ".who p", ".step h3", ".step p",
           ".tile__txt b", ".tile__txt small", ".row__name", ".row__meta", ".foot p", ".foot p a", ".btn--primary span:last-child", ".panel--contact .row__meta", ".panel--contact .row__name"]

def lum(rgb):
    c = rgb / 255.0
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * c[..., 0] + 0.7152 * c[..., 1] + 0.0722 * c[..., 2]

def parse(col):
    nums = [float(x) for x in col[col.index("(") + 1:col.index(")")].replace("/", ",").split(",")[:3]]
    return np.array(nums)

rows = []
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True, args=["--enable-gpu", "--ignore-gpu-blocklist", "--use-angle=metal"])
    ctx = b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1, is_mobile=mobile, has_touch=mobile)
    pg = ctx.new_page()
    pg.goto("http://127.0.0.1:8787/?forcegl", wait_until="networkidle")
    pg.wait_for_timeout(2400)
    for sel in TARGETS:
        els = pg.query_selector_all(sel)
        for i, el in enumerate(els[:3]):
            vis = pg.evaluate("(el)=>{const r=el.getBoundingClientRect(); if(!r.width||!r.height||el.closest('[hidden]')) return false; el.scrollIntoView({block:'center'}); return true}", el)
            if not vis: continue
            if not mobile:
                bb = el.bounding_box()
                if bb:
                    pg.mouse.move(bb["x"] + bb["width"] / 2 - 3, bb["y"] + bb["height"] / 2)
                    pg.wait_for_timeout(120)
                    pg.mouse.move(bb["x"] + bb["width"] / 2, bb["y"] + bb["height"] / 2)
            pg.wait_for_timeout(1300)
            bb = el.bounding_box()
            if not bb or bb["width"] < 2: continue
            color = pg.evaluate("(el)=>getComputedStyle(el).color", el)
            pg.add_style_tag(content="*{color:transparent!important;-webkit-text-stroke-color:transparent!important;text-shadow:none!important;text-decoration-color:transparent!important} .ico,svg{visibility:hidden!important}")
            pg.wait_for_timeout(60)
            shot = Image.open(io.BytesIO(pg.screenshot())).convert("RGB")
            pg.evaluate("document.querySelectorAll('style').forEach(s=>{if(s.textContent.startsWith('*{color:transparent')) s.remove()})")
            x0, y0 = max(0, int(bb["x"])), max(0, int(bb["y"]))
            x1, y1 = min(w, int(bb["x"] + bb["width"])), min(h, int(bb["y"] + bb["height"]))
            if x1 <= x0 or y1 <= y0: continue
            crop = np.asarray(shot.crop((x0, y0, x1, y1))).astype(np.float64)
            L = lum(crop).ravel()
            bgL = float(np.percentile(L, 98))
            fg = lum(parse(color)[None, :])[0]
            ratio = (max(fg, bgL) + 0.05) / (min(fg, bgL) + 0.05)
            size = pg.evaluate("(el)=>parseFloat(getComputedStyle(el).fontSize)", el)
            weight = pg.evaluate("(el)=>parseFloat(getComputedStyle(el).fontWeight)", el)
            large = size >= 24 or (size >= 18.66 and weight >= 700)
            need = 3.0 if large else 4.5
            rows.append((sel, i, round(ratio, 2), need, color, round(size, 1)))
    b.close()
worst = sorted(rows, key=lambda r: r[2] / r[3])
for r in worst:
    flag = "FAIL" if r[2] < r[3] else "ok  "
    print(f"{flag} {r[2]:>6}:1 (need {r[3]})  {r[0]}[{r[1]}]  {r[4]}  {r[5]}px")
