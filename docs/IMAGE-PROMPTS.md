# Image prompts: link.kovamedia.agency

The page already ships complete. The portrait is your founder photo, cut out and
graded. The backdrop is painted live in the browser. The link preview (`og.jpg`)
is rendered from the page itself. These prompts are **upgrades**, ranked by how
much each one lifts the page.

Every prompt names its slot (pixels, aspect, what must stay empty) and ends with
a negative list, because mood words don't steer the model. Paste each one exactly
as written.

---

## 1. The portrait (biggest upgrade)

**Why:** the current cut-out comes from a 1096×1436 photo. On a MacBook or large
desktop screen the portrait is shown bigger than its pixels, so it is slightly
soft. It was also lit flat against white, while the page lights you with a
copper key light. A photo lit the same way as the page makes the whole thing
look like one shot.

### 1A. Best: a real 15-minute reshoot (any phone on a tripod works)

- **Wear:** the same black suit, white shirt and striped tie. No phone in hand, no watch
  logo, nothing branded.
- **Background:** a plain wall, dark grey or black if possible, 1.5 m behind you.
  Dark is easier to cut out cleanly than white.
- **Light:** one warm lamp (2700-3200K) **behind you and above, to your right
  (camera-left)**, aimed at the back of your head and shoulders. That is the copper
  rim the page draws. Put a window or softbox **in front of you, 45° to camera-right**,
  as the main soft light on your face. No overhead room light.
- **Camera:** chest height, lens level with your chin. Portrait mode off.
  2× or 3× lens (about 50-77mm). Stand 2 m from the camera.
- **Frame:** vertical 4:5. Top of the hair about 5% below the top edge. Both
  shoulders fully in frame. Crop at mid-chest, above the hands.
- **Deliver:** the original full-size file (at least 2000 px wide), not a screenshot.

### 1B. AI relight of your existing photo (Gemini / Nano Banana, or Higgsfield image edit)

Attach `FOUNDER PHOTO.png` and paste:

> Edit the attached photograph of me. Keep my face, facial features, skin, hair,
> expression, head angle, suit, white shirt and striped tie exactly as they are:
> do not redraw, slim, smooth or beautify anything. Change only the lighting and
> the background. New background: seamless charcoal-black studio paper, #151210,
> perfectly even, no texture, no gradient, no objects. New lighting: a warm
> tungsten rim light, 3000K, placed behind me, high and slightly to camera-left,
> drawing a thin bright copper edge along the top of my hair and the tops of both
> shoulders. The key light is a large soft octabox at 45° camera-right, neutral
> 4500K, one stop under the rim. The shadow side of the face falls to about 30%
> brightness. The suit keeps visible fabric texture, not crushed to pure black.
> Photographic, 85mm at f/4 look, sharp focus on the eyes, fine natural film grain.
> Vertical 4:5, 2400×3000 px. Frame from the top of the hair (5% headroom) to
> mid-chest; both shoulders fully in frame; no hands, no phone.
> Negative: no new person, no face change, no teeth, no smile change, no jewelry,
> no logos, no text, no halo glow, no lens flare, no blue or teal light, no
> background bokeh shapes, no cartoon or illustration look.

Check the result against your real face at 100% before using it. If anything
about your face changed, don't use it: 1A is the honest version.

### Put a new portrait on the page (one command)

```sh
cd ~/Social-Site
python3 tools/portrait.py "/path/to/new-photo.jpg"
```

That cuts you out, grades you, exports the files and rebuilds the contact-card
photo. It then prints three numbers (`--band`, `--hc`, `--capy`). Paste them into
`index.html`, because the desktop layout places SAYED and SULTANI either side of
your face, measured from the photo. Then run `python3 tools/og.py` and
`python3 tools/qa.py`.

---

## 2. The painted backdrop cloth (optional)

**Why:** the page paints its cloth with code, and it already looks right. A
photographed hand-painted canvas adds real brush marks. The page still does all
the lighting, so the photo must be **flat and evenly lit**.

> Top-down flat copy-stand photograph of a hand-painted canvas photography
> backdrop, the old-master portrait-studio kind, filling the entire frame edge to
> edge. Mottled cloud-like brushwork in two colours only: warm grey #666464 and
> deep bronze-brown #3B2812, blended over a darker umber base #1A130D. Large soft
> cloud forms 20-40 cm across, some dry-brush texture, faint canvas weave visible
> up close. Lighting perfectly even and shadowless: two diffused lights at 45°
> either side, no hot spot, no vignette, no fall-off. Matte, no sheen. Vertical
> 3:4, 2400×3200 px, sharp across the whole frame.
> Negative: no light spot, no vignette, no folds, no wrinkles, no seams, no frame,
> no wall, no floor, no objects, no people, no text, no watermark, no blue, no
> green, no grain or noise.

**Put it on the page:**
1. Save it as `assets/img/cloth.jpg`: 1600×2133, JPEG quality 70, about 150KB.
   Ask Claude to convert it if needed.
2. In `index.html`, change `<div class="backdrop" aria-hidden="true">` to
   `<div class="backdrop" data-cloth="/assets/img/cloth.jpg" aria-hidden="true">`.

The page normalises its brightness automatically. Remove the attribute to go back
to the painted-by-code cloth.

---

## 3. Link preview (`og.jpg`): no prompt needed

It's rendered from the page's own fonts, portrait and light, so it always
matches. After a new portrait: `python3 tools/og.py`. Check it at 300px wide,
which is how it shows in iMessage.
