#!/usr/bin/env python3
"""Turn a new photo of Sayed into the page's portrait, and re-measure the face
so the desktop name layout stays exact.

    python3 tools/portrait.py "/path/to/photo.jpg" [--bg auto|white|dark]

Does: subject lift with Apple Vision (tools/lift.swift, macOS 14+), removes the
background's colour from the edges, grades for the copper-lit room, crops to
the page's 848:990 frame (shoulders to the edges, 5% air above the hair),
exports AVIF + WebP + the rim mask, rebuilds the vCard photo, then prints the
three CSS numbers to paste into index.html (--hc, --band, --capy) and the two
fractions tools/qa.py uses for its head check.
Needs: pillow numpy (pip3 install --user pillow numpy).
"""
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img"
ASPECT = 848 / 990


def gblur(x, s):
    r = int(3 * s + 0.5)
    k = np.exp(-0.5 * (np.arange(-r, r + 1) / s) ** 2)
    k /= k.sum()
    y = np.apply_along_axis(lambda v: np.convolve(v, k, mode="same"), 0, x)
    return np.apply_along_axis(lambda v: np.convolve(v, k, mode="same"), 1, y)


def main():
    src_path = Path(sys.argv[1]).expanduser()
    tmp = Path(tempfile.mkdtemp())
    mask_path = tmp / "mask.png"
    subprocess.run(["swift", str(ROOT / "tools" / "lift.swift"), str(src_path), str(mask_path)], check=True)
    src = np.asarray(Image.open(src_path).convert("RGB")).astype(np.float32) / 255
    aI = Image.open(mask_path).convert("L")
    a = np.asarray(aI).astype(np.float32) / 255
    bg = src[a < 0.02]
    B = bg.mean(0) if len(bg) else np.array([0.95, 0.95, 0.95], np.float32)

    # un-mix the old background from the edge pixels, pull edges toward interior colour
    ae = np.maximum(a, 0.2)[..., None]
    F = np.clip((src - (1 - ae) * B) / ae, 0, 1)
    col = np.where(a[..., None] >= 0.99, src, F)
    I = (a > 0.985).astype(np.float32)
    den = gblur(I, 3.0)
    Cint = np.dstack([gblur(col[..., c] * I, 3.0) for c in range(3)]) / np.maximum(den, 1e-4)[..., None]
    wint = (np.clip(1 - a, 0, 1) ** 0.6 * 0.85)[..., None] * (den > 0.02)[..., None]
    col = np.where(a[..., None] < 0.99, col * (1 - wint) + Cint * wint, col)
    a2 = np.asarray(aI.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))).astype(np.float32) / 255
    a2 = np.clip((a2 - 0.08) / 0.92, 0, 1)

    # white/grey ground only: background showing between hair strands at the crown
    if B.mean() > 0.6:
        ys_, xs_ = np.where(a2 > 0.5)
        crown = np.zeros_like(a2)
        crown[: ys_.min() + int(0.17 * (ys_.max() - ys_.min())), :] = 1.0
        crown = gblur(crown, 5.0)
        lum0 = 0.2126 * col[..., 0] + 0.7152 * col[..., 1] + 0.0722 * col[..., 2]
        sat = col.max(-1) - col.min(-1)
        kill = gblur(np.clip((lum0 - 0.28) / 0.30, 0, 1) * np.clip((0.10 - sat) / 0.06, 0, 1) * crown, 0.8)
        a2 = a2 * (1 - np.clip(kill * 1.2, 0, 1))
        col = col * (1 - 0.6 * kill[..., None])

    # grade: tame whites, warm a touch (the room is lit copper)
    lum = 0.2126 * col[..., 0] + 0.7152 * col[..., 1] + 0.0722 * col[..., 2]
    lum2 = np.where(lum > 0.78, 0.78 + (lum - 0.78) * 0.55, lum)
    col = col * (lum2 / np.maximum(lum, 1e-4))[..., None] * np.array([1.035, 1.0, 0.935], np.float32)
    col = np.clip((col - 0.5) * 1.04 + 0.5 - 0.012, 0, 1)
    # one grade with the room: warm highlights, bronze in the shadows
    lum = 0.2126 * col[..., 0] + 0.7152 * col[..., 1] + 0.0722 * col[..., 2]
    hi = np.clip((lum - 0.45) / 0.4, 0, 1)[..., None]
    lo = np.clip((0.35 - lum) / 0.35, 0, 1)[..., None]
    col = np.clip(col * (1 + hi * np.array([0.03, 0.0, -0.05])) + lo * np.array([0.012, 0.007, 0.0]), 0, 1)

    # baked backlight: the key light sits behind and above the head, so only the
    # edges whose outward normal faces it catch light (hair crown, shoulder tops).
    # Built from the alpha itself, so it follows every strand; nothing is drawn around him.
    ab = gblur(a2, 2.0)
    gy_, gx_ = np.gradient(ab)
    mag = np.sqrt(gx_ ** 2 + gy_ ** 2) + 1e-6
    nx, ny = -gx_ / mag, -gy_ / mag
    Ld = np.array([-0.18, -1.0]); Ld /= np.linalg.norm(Ld)
    facing = np.clip(nx * Ld[0] + ny * Ld[1], 0, 1) ** 1.4
    edge = np.clip((a2 - gblur(a2, 3.5)) * 3.0, 0, 1)
    ys_, xs_ = np.where(a2 > 0.5)
    yy = (np.arange(a2.shape[0]) - ys_.min()) / max(1, ys_.max() - ys_.min())
    wy = np.clip(1 - (yy - 0.40) / 0.25, 0, 1)[:, None]
    rim = (edge * facing * wy * 0.95)[..., None]
    col = 1 - (1 - col) * (1 - rim * np.array([1.0, 0.72, 0.44]))

    # crop: shoulders to the frame edges, 5% air above the hair, page aspect
    ys, xs = np.where(a2 > 0.5)
    top, left, right = ys.min(), xs.min(), xs.max()
    w = int((right - left) * 1.08)
    h = int(w / ASPECT)
    cx = (left + right) // 2
    x0 = max(0, cx - w // 2)
    y0 = max(0, top - int(0.05 * h))
    H, W = a2.shape
    x1, y1 = min(W, x0 + w), min(H, y0 + h)
    if y1 - y0 < h:
        print(f"note: photo ends {h - (y1 - y0)}px short of the frame; the bottom fades out anyway")
    col_c, a_c = col[y0:y1, x0:x1], a2[y0:y1, x0:x1]
    hh = a_c.shape[0]
    t = np.clip((np.arange(hh) / hh - 0.58) / 0.42, 0, 1)
    col_c = col_c * (1 - 0.30 * t ** 1.4)[:, None, None]
    img = Image.fromarray((np.dstack([col_c, a_c]) * 255 + 0.5).astype(np.uint8))
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    canvas.paste(img, (0, 0))
    big = canvas.resize((848, 990), Image.LANCZOS)
    for wpx in (848, 600):
        im = big if wpx == 848 else big.resize((600, round(990 * 600 / 848)), Image.LANCZOS)
        im.save(OUT / f"sayed-{wpx}.webp", quality=86, method=6)
        im.save(OUT / f"sayed-{wpx}.avif", quality=68)
    m = Image.new("RGBA", (212, 248), (255, 255, 255, 0))
    m.putalpha(big.split()[3].resize((212, 248), Image.LANCZOS))
    m.save(OUT / "sayed-mask.png", optimize=True)
    if canvas.size[0] < 1500:
        print(f"note: source gives {canvas.size[0]}px of width; >=1700px keeps desktop retina sharp")

    # measure: the narrowest 11%-tall band between 25% and 50% (chin/neck), head centre
    al = np.asarray(big.split()[3]).astype(np.float32) / 255
    rows = []
    for fy in np.arange(0.25, 0.50, 0.005):
        r = np.where(al[int(fy * 990)] > 0.5)[0]
        rows.append((fy, r.min() / 848, r.max() / 848) if len(r) else (fy, 0.5, 0.5))
    best = None
    for i in range(len(rows)):
        band = [r for r in rows if rows[i][0] <= r[0] <= rows[i][0] + 0.11]
        lo, hi = min(r[1] for r in band), max(r[2] for r in band)
        if best is None or hi - lo < best[2] - best[1]:
            best = (rows[i][0], lo, hi)
    fy, lo, hi = best
    print("\nPaste into index.html (desktop block, .hero):")
    print(f"  --band:{hi - lo + 0.02:.3f}; --hc:{(lo + hi) / 2:.3f}; --capy:{fy + 0.055:.3f};")
    print("And in tools/qa.py (head check):")
    print(f"  fig.width * {lo:.3f}  …  fig.width * {hi:.3f}")
    subprocess.run([sys.executable, str(ROOT / "tools" / "build.py")], check=True)
    print("vCard photo rebuilt. Re-render og.jpg (README) and run tools/qa.py.")


if __name__ == "__main__":
    main()
