#!/usr/bin/env python3
"""Re-render og.jpg (1200x630 link preview) from tools/og.html.
    python3 tools/serve.py 8787 &   then   python3 tools/og.py"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True, args=["--enable-gpu", "--ignore-gpu-blocklist", "--use-angle=metal"])
    pg = b.new_context(viewport={"width": 1200, "height": 630}, device_scale_factor=2).new_page()
    pg.goto("http://127.0.0.1:8787/tools/og.html?forcegl", wait_until="networkidle")
    pg.wait_for_function("document.documentElement.dataset.ready === '1'")
    pg.wait_for_timeout(900)
    tmp = ROOT / "tools" / ".og@2x.png"
    pg.screenshot(path=str(tmp))
    b.close()
Image.open(tmp).convert("RGB").resize((1200, 630), Image.LANCZOS).save(ROOT / "og.jpg", quality=88, optimize=True, progressive=True)
tmp.unlink()
print("og.jpg written")
