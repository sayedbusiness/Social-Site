#!/usr/bin/env python3
"""Render the page at every size that matters and measure what a screenshot
cannot show: horizontal overflow, elements past the edge, console errors,
whether Save contact is inside the first screen, and whether the desktop name
collides with the face.

    python3 tools/serve.py 8787 &          # in one shell
    python3 tools/qa.py [out_dir] [--only name,name] [--shots]

Exit code 1 if any size fails.
"""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8787/?forcegl"
SIZES = [
    # name, width, height, dpr, mobile
    ("se1-320", 320, 568, 2, True),
    ("android-360", 360, 800, 3, True),
    ("se-375", 375, 667, 2, True),
    ("iphone-390", 390, 844, 3, True),
    ("iphone-393", 393, 852, 3, True),
    ("iphone-402", 402, 874, 3, True),
    ("pixel-412", 412, 915, 2.625, True),
    ("promax-430", 430, 932, 3, True),
    ("promax-440", 440, 956, 3, True),
    ("ipad-768", 768, 1024, 2, True),
    ("ipad-820", 820, 1180, 2, True),
    ("ipadpro-1024p", 1024, 1366, 2, True),
    ("ipad-1024l", 1024, 768, 2, True),
    ("ipad-1180l", 1180, 820, 2, True),
    ("laptop-1180s", 1180, 660, 2, False),
    ("desk-1280", 1280, 800, 2, False),
    ("desk-1280x1024", 1280, 1024, 1, False),
    ("desk-1366", 1366, 768, 1, False),
    ("mac-1440", 1440, 900, 2, False),
    ("mac-1512", 1512, 982, 2, False),
    ("desk-1536", 1536, 864, 1.25, False),
    ("desk-1440tall", 1440, 1200, 1, False),
    ("desk-1920", 1920, 1080, 1, False),
    ("desk-2560", 2560, 1440, 1, False),
]

PROBE = r"""
() => {
  const vw = innerWidth, vh = innerHeight;
  const out = {vw, vh, scrollW: document.documentElement.scrollWidth, docH: document.documentElement.scrollHeight};
  const skip = (el) => el.closest('.backdrop, .sprite, .sr, dialog:not([open]), .skip, [hidden]');
  const bad = [];
  for (const el of document.querySelectorAll('body *')) {
    if (skip(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r0 = el.getBoundingClientRect();
    if (r0.width === 0 || r0.height === 0) continue;
    // intersect with every clipping ancestor: a clipped paint is not overflow
    let L = r0.left, R = r0.right;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const o = getComputedStyle(a).overflowX;
      if (o === 'hidden' || o === 'clip') { const ar = a.getBoundingClientRect(); L = Math.max(L, ar.left); R = Math.min(R, ar.right); }
    }
    if (R <= L) continue;
    const r = {left: L, right: R, width: R - L};
    if (r.right > vw + 0.5 || r.left < -0.5) {
      bad.push({el: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width)});
    }
  }
  out.outside = bad.slice(0, 12);
  const cta = document.querySelector('[data-save]').getBoundingClientRect();
  out.ctaBottom = Math.round(cta.bottom); out.ctaTop = Math.round(cta.top); out.ctaW = Math.round(cta.width);
  const fig = document.querySelector('.figure').getBoundingClientRect();
  out.fig = {l: Math.round(fig.left), t: Math.round(fig.top), w: Math.round(fig.width), h: Math.round(fig.height), b: Math.round(fig.bottom)};
  const n1 = document.querySelector('.name__first').getBoundingClientRect();
  const n2 = document.querySelector('.name__last').getBoundingClientRect();
  out.nameRect = {first: [Math.round(n1.left), Math.round(n1.right), Math.round(n1.top), Math.round(n1.bottom)], last: [Math.round(n2.left), Math.round(n2.right), Math.round(n2.top), Math.round(n2.bottom)], size: parseFloat(getComputedStyle(document.querySelector('.name')).fontSize)};
  // head band: hair width at eye level, fraction of the portrait box
  const hl = fig.left + fig.width * 0.463, hr = fig.left + fig.width * 0.742;
  out.headBand = [Math.round(hl), Math.round(hr)];
  out.nameHitsHead = Math.max(0, Math.round(n1.right - hl)) + Math.max(0, Math.round(hr - n2.left));
  out.cover = getComputedStyle(document.querySelector('.name')).position === 'absolute';
  const info = document.querySelector('.hero__info').getBoundingClientRect();
  out.info = {l: Math.round(info.left), r: Math.round(info.right), t: Math.round(info.top), b: Math.round(info.bottom)};
  out.infoOverFig = out.cover ? Math.max(0, Math.round(fig.left + fig.width * 0.915 - info.left)) : 0;
  out.gl = document.documentElement.classList.contains('gl');
  out.fonts = document.fonts.check('800 40px "Archivo Display"') && document.fonts.check('italic 20px "Instrument Serif"');
  const pitch = document.querySelector('.pitch');
  out.pitchLines = Math.round(pitch.getBoundingClientRect().height / parseFloat(getComputedStyle(pitch).lineHeight));
  out.overflowX = out.scrollW - vw;
  return out;
}
"""


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    out = Path(args[0] if args else "/tmp/kova-qa")
    out.mkdir(parents=True, exist_ok=True)
    only = None
    for a in sys.argv[1:]:
        if a.startswith("--only="):
            only = set(a.split("=", 1)[1].split(","))
    shots = "--shots" in sys.argv
    full = "--full" in sys.argv
    results = []
    failed = False
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True, args=["--enable-gpu", "--ignore-gpu-blocklist", "--use-angle=metal"])
        for name, w, h, dpr, mobile in SIZES:
            if only and name not in only:
                continue
            ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=dpr, is_mobile=mobile, has_touch=mobile)
            page = ctx.new_page()
            errors = []
            page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
            page.on("console", lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type in ("error", "warning") else None)
            page.on("requestfailed", lambda r: errors.append(f"requestfailed: {r.url}"))
            page.goto(BASE, wait_until="networkidle")
            page.wait_for_timeout(2600)
            data = page.evaluate(PROBE)
            data["size"] = name
            data["errors"] = errors
            problems = []
            if data["overflowX"] > 0:
                problems.append(f"horizontal overflow {data['overflowX']}px")
            if data["outside"]:
                problems.append(f"{len(data['outside'])} element(s) past the edge")
            if data["ctaBottom"] > h:
                problems.append(f"Save contact below the fold ({data['ctaBottom']} > {h})")
            if data["cover"] and data["nameHitsHead"] > 0:
                problems.append(f"name overlaps the head by {data['nameHitsHead']}px")
            if data["infoOverFig"] > 0:
                problems.append(f"info block overlaps portrait by {data['infoOverFig']}px")
            if not data["fonts"]:
                problems.append("fonts not loaded")
            if errors:
                problems.append(f"{len(errors)} console/page error(s)")
            data["problems"] = problems
            failed = failed or bool(problems)
            if shots:
                page.screenshot(path=str(out / f"{name}.png"))
            if full:
                page.screenshot(path=str(out / f"{name}-full.png"), full_page=True)
            results.append(data)
            ctx.close()
        browser.close()
    for r in results:
        flag = "FAIL" if r["problems"] else "ok  "
        nr = r["nameRect"]
        print(f"{flag} {r['size']:<16} {r['vw']}x{r['vh']} cover={'Y' if r['cover'] else 'n'} gl={'Y' if r['gl'] else 'n'} "
              f"cta={r['ctaTop']}-{r['ctaBottom']} nf={nr['size']:.0f} fig={r['fig']['w']}x{r['fig']['h']}@{r['fig']['l']},{r['fig']['t']} "
              f"name={nr['first'][:2]}|{nr['last'][:2]} head={r['headBand']} pitch={r['pitchLines']}l")
        for pr in r["problems"]:
            print("      -", pr)
        for o in r["outside"][:6]:
            print("        outside:", o)
        for e in r["errors"][:6]:
            print("        ", e)
    (out / "qa.json").write_text(json.dumps(results, indent=1))
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
