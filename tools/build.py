#!/usr/bin/env python3
"""Regenerate the page's generated parts. Run from the repo root:

    python3 tools/build.py

It rewrites, in place and idempotently:
  * the icon sprite inside index.html   (between <!-- sprite:start/end -->)
  * the QR code inside index.html        (between <!-- qr:start/end -->)
  * sayed-sultani.vcf                    (contact card, photo embedded)

Needs: pip3 install --user segno pillow numpy
Icons are Phosphor Regular (MIT), vendored in tools/icons/.
"""
import base64
import io
import re
from pathlib import Path

import segno
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
URL = "https://link.kovamedia.agency"

# ---------------------------------------------------------------- contact facts
PERSON = {
    "first": "Sayed",
    "last": "Sultani",
    "org": "Kova Media",
    "title": "Founder",
    "tel": "+19168236820",
    "email": "contact@kovamedia.agency",
    "site": "https://www.kovamedia.agency",
    "note": "Founder of Kova Media. Paid media, creative and the tracking that connects them.",
    "social": [
        ("instagram", "https://www.instagram.com/sayedsalez"),
        ("linkedin", "https://www.linkedin.com/in/sayed-sultani"),
        ("tiktok", "https://www.tiktok.com/@sayedsvj"),
        ("youtube", "https://www.youtube.com/@Sayedsvj"),
    ],
}

ICONS = [
    "instagram-logo", "tiktok-logo", "linkedin-logo", "youtube-logo", "x-logo",
    "facebook-logo", "globe-simple", "phone", "chat-circle-text", "envelope-simple",
    "user-plus", "export", "copy", "check", "x", "arrow-up-right", "arrow-right",
]


def sprite() -> str:
    out = ['<svg class="sprite" aria-hidden="true" focusable="false"><defs>']
    for name in ICONS:
        svg = (ROOT / "tools" / "icons" / f"{name}.svg").read_text()
        inner = re.search(r"<svg[^>]*>(.*)</svg>", svg, re.S).group(1).strip()
        out.append(f'<symbol id="i-{name}" viewBox="0 0 256 256">{inner}</symbol>')
    out.append("</defs></svg>")
    return "".join(out)


def qr_svg() -> str:
    """Rounded-module QR in paper ink. Finder patterns drawn as rounded squares."""
    q = segno.make(URL, error="q", micro=False)
    m = [list(row) for row in q.matrix]
    n = len(m)
    finders = [(0, 0), (0, n - 7), (n - 7, 0)]

    def in_finder(r, c):
        return any(fr <= r < fr + 7 and fc <= c < fc + 7 for fr, fc in finders)

    parts = []
    for r in range(n):
        for c in range(n):
            if m[r][c] and not in_finder(r, c):
                parts.append(f'<rect x="{c + .06:.2f}" y="{r + .06:.2f}" width=".88" height=".88" rx=".3"/>')
    for fr, fc in finders:
        parts.append(
            f'<path fill-rule="evenodd" d="M{fc + 1.6},{fr} h3.8 a1.6,1.6 0 0 1 1.6,1.6 v3.8 a1.6,1.6 0 0 1 -1.6,1.6 '
            f'h-3.8 a1.6,1.6 0 0 1 -1.6,-1.6 v-3.8 a1.6,1.6 0 0 1 1.6,-1.6z M{fc + 1.9},{fr + 1} h3.2 a.9,.9 0 0 1 .9,.9 '
            f'v3.2 a.9,.9 0 0 1 -.9,.9 h-3.2 a.9,.9 0 0 1 -.9,-.9 v-3.2 a.9,.9 0 0 1 .9,-.9z"/>'
        )
        parts.append(f'<rect x="{fc + 2}" y="{fr + 2}" width="3" height="3" rx=".9"/>')
    qz = 2  # quiet zone in modules; the paper card around it adds more
    size = n + 2 * qz
    return (
        f'<svg class="qr" viewBox="{-qz} {-qz} {size} {size}" role="img" '
        f'aria-label="QR code for link.kovamedia.agency"><g fill="currentColor">{"".join(parts)}</g></svg>'
    )


def contact_photo() -> str:
    """Square head-and-shoulders crop on the page's copper-lit ground, base64 JPEG."""
    src = Image.open(ROOT / "assets" / "img" / "sayed-848.webp").convert("RGBA")
    box = (140, 10, 720, 590)  # face centred; crop coords of the 848x990 cutout
    face = src.crop(box)
    s = face.size[0]
    ground = Image.new("RGB", (s, s), (10, 9, 8))
    glow = Image.new("L", (s, s), 0)
    ImageDraw.Draw(glow).ellipse((s * .12, s * .02, s * .88, s * .78), fill=255)
    glow = glow.filter(ImageFilter.GaussianBlur(s * .16))
    ground.paste(Image.new("RGB", (s, s), (92, 60, 30)), (0, 0), glow)
    ground.paste(face, (0, 0), face)
    ground = ground.resize((480, 480), Image.LANCZOS)
    buf = io.BytesIO()
    ground.save(buf, "JPEG", quality=82, optimize=True, progressive=False)
    return base64.b64encode(buf.getvalue()).decode()


def fold(line: str) -> str:
    """RFC 6350 line folding: 75 octets, continuation lines start with a space."""
    b = line.encode()
    if len(b) <= 75:
        return line
    chunks, first = [], True
    while b:
        take = 75 if first else 74
        chunks.append(b[:take].decode("utf-8", "ignore"))
        b = b[take:]
        first = False
    return "\r\n ".join(chunks)


def vcard() -> str:
    p = PERSON
    lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        f"N:{p['last']};{p['first']};;;",
        f"FN:{p['first']} {p['last']}",
        f"ORG:{p['org']}",
        f"TITLE:{p['title']}",
        f"TEL;TYPE=CELL,VOICE,pref:{p['tel']}",
        f"EMAIL;TYPE=INTERNET,WORK:{p['email']}",
        f"URL;TYPE=WORK:{p['site']}",
        f"URL:{URL}",
    ]
    for kind, url in p["social"]:
        lines.append(f"X-SOCIALPROFILE;TYPE={kind}:{url}")
    lines.append(f"NOTE:{p['note']}")
    lines.append(f"PHOTO;ENCODING=b;TYPE=JPEG:{contact_photo()}")
    lines.append("END:VCARD")
    return "\r\n".join(fold(l) for l in lines) + "\r\n"


def inject(html: str, key: str, payload: str) -> str:
    pat = re.compile(rf"(<!-- {key}:start -->).*?(<!-- {key}:end -->)", re.S)
    if not pat.search(html):
        raise SystemExit(f"marker {key} missing from index.html")
    return pat.sub(lambda mo: mo.group(1) + payload + mo.group(2), html)


if __name__ == "__main__":
    html = INDEX.read_text()
    html = inject(html, "sprite", sprite())
    html = inject(html, "qr", qr_svg())
    INDEX.write_text(html)
    (ROOT / "sayed-sultani.vcf").write_bytes(vcard().encode())
    print("index.html: sprite + qr injected; sayed-sultani.vcf written")
