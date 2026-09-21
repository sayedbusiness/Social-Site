# link.kovamedia.agency

Sayed Sultani's link page for Kova Media. It gets shared by AirDrop, QR, text
and social bios. In one screen a stranger sees who he is, saves him to their
phone in one tap, and finds him on every platform.

Static HTML/CSS/JS. There is no framework, no build step and no npm. Vercel
serves the repo root as-is.

## What's in it

| Path | What |
|---|---|
| `index.html` | The page. All CSS is inlined in `<head>` so the first paint is styled. |
| `assets/app.js` | Interactions: tabs, reveals, share sheet (QR, copy, AirDrop), drag-to-dismiss, card tilt. |
| `assets/backdrop.js` | The living studio backdrop (WebGL, one draw call per frame). It loads after first paint, and the page falls back to the CSS backdrop without WebGL. |
| `sayed-sultani.vcf` | The contact card behind **Save contact** (photo embedded). |
| `og.jpg` | The link-preview image (1200×630) for iMessage, WhatsApp, LinkedIn and X. |
| `assets/img/` | Portrait cut-outs (AVIF + WebP), the rim-light mask and app icons. |
| `assets/fonts/` | Archivo (wide axis) and Instrument Serif, self-hosted. |
| `tools/` | Dev-only scripts: asset build, local server, QA, contrast and OG render. `.vercelignore` keeps them off the site. |

## Preview locally

```sh
python3 tools/serve.py 8787      # http://127.0.0.1:8787
```

## Change a link, the phone number or the email

1. Links: edit the `<a class="row">` lines in `index.html`, under "Everywhere else".
2. Contact card: edit `PERSON` in `tools/build.py`, then run `python3 tools/build.py`.
   That rebuilds `sayed-sultani.vcf`, the icon sprite and the QR code.

## Deploy (Vercel)

1. Vercel → Add New → Project → import `sayedbusiness/Social-Site`.
2. Framework preset **Other**. Leave the build command and output directory empty.
3. Deploy, then Settings → Domains → add `link.kovamedia.agency`.
4. The DNS for kovamedia.agency is on **Cloudflare**. Add the record Vercel shows,
   normally `CNAME  link  →  cname.vercel-dns.com`, with the proxy **off**
   (grey cloud, "DNS only") so Vercel can issue the certificate.

## Check it before shipping

```sh
python3 tools/serve.py 8787 &
python3 tools/qa.py /tmp/kova-qa --shots      # 24 sizes: overflow, fold, name vs face, errors
python3 tools/contrast.py 390 844 1           # WCAG contrast against the brightest backdrop pixel
python3 tools/contrast.py 1440 900 0
```
