# RESUME: link.kovamedia.agency

Read this first in a new session.

## State (2026-09-20)
- Built and verified locally. Repo `sayedbusiness/Social-Site` (public), branch `main`.
- **Not deployed yet.** Sayed imports it on Vercel and adds `link.kovamedia.agency`.
  DNS lives on Cloudflare: CNAME `link` → Vercel target, proxy OFF.
- Verified: 24 viewport sizes from 320×568 to 2560×1440. Zero horizontal overflow and
  zero clipped elements, Save contact inside the first screen on every phone, and the
  desktop name never touching the face. Zero console errors. WCAG AA contrast measured
  against the brightest backdrop pixel behind every text element (lowest 4.6:1).

## Decisions Sayed made (2026-09-20)
- Vibe = his reference link page (portrait in a warm glow, big wide name, italic line),
  upgraded into Kova's colours with a creative, living background.
- Audience line covers ALL Kova lanes: e-com/DTC, streetwear, roofing & home services.
- The big button = **Save contact** (vCard). Apply lives lower on the page.
- Stack delegated: static HTML/CSS/JS, chosen for smooth animation on phones.
- Repo: use the existing `Social-Site` repo.

## The design in one breath
A portrait sitting in Kova's night studio. The backdrop is a painted canvas cloth in the
logo's grey #666464 and bronze #3B2812, painted once into a WebGL texture. One copper key
light follows the portrait, the scroll and the pointer, with dust floating in the beam.
On desktop the name frames the face: SAYED left of the head, SULTANI right of it.

## Rules that bind the copy (from the Kova site)
- The old company name never appears. There is no "we" or "team" (Kova is one person),
  no pricing or fee-model language, and no results, testimonials or client counts.
- The CTA wording is "Apply to work with us", and it goes to kovamedia.agency/apply.

## Gotchas already paid for
- The desktop name geometry is MEASURED. SAYED is 4.26em and SULTANI 5.27em (Archivo
  wdth 125 / wght 800 / -0.02em). The caps' centre sits .491em below the box top. The
  silhouette at 30-41% of the portrait's height spans x .463-.742. Re-measure if the
  portrait image or the font changes (`tools/qa.py` reports `nameHitsHead`).
- The head is not centred in the photo (x ≈ .60), so phones shift the figure with
  `translate:-10% 0`. The load animation uses `transform`, so the offset must use the
  separate `translate` property or the animation's fill wipes it.
- Never animate `opacity` on `.bar` itself. An animated ancestor becomes a backdrop
  root and the glass buttons stop blurring. Animate the children instead.
- `--dim` is #A89E91, lighter than the site's #958B7C, because this room is lit.
  The copper panel glow must not bleed through the panel body (body alpha .95).

## Open for Sayed
- Deploy + domain (see README).
- Optional image upgrades: prompts are in `docs/IMAGE-PROMPTS.md`.
- The empty-repo question is moot: this now lives in `Social-Site`.
