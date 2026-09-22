---
name: "Sayed Sultani · Kova Media"
description: "Sayed Sultani's link page for Kova Media, a portrait sitting in Kova's after-hours studio."
colors:
  night: "#0A0908"
  night-2: "#12100D"
  bone: "#F3F1EF"
  bone-2: "#C4BBAE"
  dim: "#A89E91"
  ring: "rgba(243,241,239,.1)"
  copper: "#D39E5A"
  copper-hot: "#E8B676"
  on-copper: "#1A1006"
  paper: "#EFE8DC"
  paper-ink: "#3B2812"
  paper-mut: "#5E4B35"
  cloth-grey: "#666464"
typography:
  display:
    fontFamily: "Archivo Display, Archivo, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.55rem, min(15.4vw, 8.4svh), 7rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  display-list:
    fontFamily: "Archivo Display, Archivo, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.375rem, 5.9vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  numeral:
    fontFamily: "Archivo Display, Archivo, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 9vw, 3.1rem)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Instrument Serif, Iowan Old Style, Charter, Georgia, serif"
    fontSize: "clamp(2.125rem, 6.2vw + .5rem, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.012em"
  voice:
    fontFamily: "Instrument Serif, Iowan Old Style, Charter, Georgia, serif"
    fontSize: "clamp(1.25rem, 5.3vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.22
  quote:
    fontFamily: "Instrument Serif, Iowan Old Style, Charter, Georgia, serif"
    fontSize: "clamp(1.625rem, 5.4vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.008em"
  lede:
    fontFamily: "Archivo, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.1875rem, 4.2vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
  title:
    fontFamily: "Archivo, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  control:
    fontFamily: "Archivo, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    letterSpacing: "0.005em"
  meta:
    fontFamily: "Archivo, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
  label:
    fontFamily: "Archivo, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.06em"
  scale:
    letterhead: "0.6875rem"
    label: "0.8125rem"
    meta: "0.875rem"
    ui: "0.9375rem"
    row: "1rem"
    body: "1.0625rem"
    title: "1.125rem"
    card-name: "1.25rem"
    voice: "1.5rem"
    sheet-title: "1.75rem"
    voice-cover: "1.875rem"
rounded:
  grip: "3px"
  focus: "6px"
  control-inner: "10px"
  control: "14px"
  card: "18px"
  surface-inner: "19px"
  surface: "20px"
  popover: "24px"
  sheet: "26px"
  round: "999px"
spacing:
  gutter: "clamp(16px, 5vw, 40px)"
  section: "clamp(96px, 15vw, 168px)"
  heading-gap: "clamp(20px, 3.4vw, 32px)"
  panel-gap: "16px"
  control-gap: "10px"
  column: "600px"
  column-wide: "880px"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.on-copper}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.copper-hot}"
  button-ghost:
    backgroundColor: "rgba(243,241,239,.07)"
    textColor: "{colors.bone}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "rgba(243,241,239,.12)"
  share-pill:
    backgroundColor: "rgba(22,19,16,.42)"
    textColor: "{colors.bone}"
    rounded: "{rounded.round}"
    padding: "0 17px 0 14px"
    height: "42px"
  share-pill-hover:
    backgroundColor: "rgba(52,45,37,.55)"
  segmented:
    backgroundColor: "rgba(15,13,11,.82)"
    rounded: "{rounded.control}"
    padding: "4px"
  segmented-thumb:
    backgroundColor: "rgba(243,241,239,.11)"
    textColor: "{colors.bone}"
    rounded: "{rounded.control-inner}"
    height: "44px"
  panel:
    backgroundColor: "rgba(15,13,11,.84)"
    rounded: "{rounded.surface}"
    padding: "1px"
  row:
    textColor: "{colors.bone}"
    padding: "12px 18px"
    height: "62px"
  row-hover:
    backgroundColor: "rgba(243,241,239,.045)"
  row-stacked:
    textColor: "{colors.bone}"
    padding: "12px 18px"
    height: "68px"
  card-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.card}"
    padding: "18px 18px 16px"
    width: "300px"
  sheet:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.bone-2}"
    rounded: "26px 26px 0 0"
    padding: "10px 20px 22px"
  popover:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.bone-2}"
    rounded: "{rounded.popover}"
    padding: "16px 20px 20px"
    width: "380px"
---

# Design System: Sayed Sultani · Kova Media

## Overview

**Creative North Star: "The After-Hours Sitting"**

The page is a portrait sitting in Kova's studio after hours. Sayed stands in front of a hand-painted canvas cloth mottled in the Kova logo's grey and bronze. One copper key light hangs behind his head, catches the crown of his hair and drifts toward the visitor's hand. Everything else is the room: a warm near-black ground, bone type, film grain and a vignette. It is dark because of where it is used: a phone opened mid-conversation, often in a dim room, where it has to feel expensive, warm, quiet and very smooth.

Density is low and the order follows the job. The first screen is face, name, one line in his voice, and Save contact. Scrolling gives the accounts, a short about, who it is for, how the work runs, and the ways to start. Three voices carry the page: expanded Archivo caps name things, Instrument Serif italic is Sayed talking, and Archivo at 400 and 600 does the work. Copper is the only hue, and it behaves like light.

Motion happens once and then gets out of the way: a load sequence that ends at rest, three scroll entrances, springs on the controls, and a living backdrop that calms as reading starts. Every effect is a layer over a complete page. Without WebGL the CSS paints the same room, without JavaScript nothing is hidden, and reduced motion gets one still frame. Confirmed rejections: the link-page default (avatar circle, stacked pill links, gradient wallpaper) and any blue.

**Key Characteristics:**
- Night room, bone type, one copper light, no blue.
- A living, hand-painted cloth backdrop (WebGL, one draw call per frame) lit by a copper key light that follows the portrait, the scroll and the pointer.
- The name as a masthead: Archivo 800 at width 125, framing the face on desktop.
- Serif italic for the voice, never for reading text.
- Smoked-glass panels with lit hairline edges; frosted blur only on the controls that float over the room.
- Three measured layout modes: stacked, short landscape, desktop cover.
- Contrast measured against the brightest backdrop pixel behind every text element.

## Colors

One warm light in a dark room: warm near-black grounds, bone type in three steps, a single copper accent with a hotter step for light and hover, and a paper stock for the one physical object.

### Primary
- **Copper Key Light** (#D39E5A): the Save contact fill, the role line on phones and tablets, the copper ampersands in the audience list, the stroke of the step numerals, the head of the pull-quote rule, and text selection. It is the page's light source as a colour, and it sits on only a handful of elements per screen.
- **Hot Copper** (#E8B676): copper under more light. The primary button on hover, the keyboard focus ring, the pull-quote text, the role line on the desktop cover (where it sits on the lit cloth), the Apply row's icon and arrow, and a row icon under the pointer.
- **Umber Label** (#1A1006): text and icons on a copper fill (7.9:1 on Copper Key Light, 10.2:1 on Hot Copper).

### Secondary
- **Paper Stock** (#EFE8DC): the business card in the share sheet, with a fractal-noise paper grain tinted bronze at 9%.
- **Bronze Ink** (#3B2812): the card's ink (QR code, K mark, name). This is the logo's bronze, the same bronze painted into the backdrop cloth (11.5:1 on Paper Stock).
- **Faded Ink** (#5E4B35): the card's letterhead line and URL (6.8:1 on Paper Stock).

### Tertiary
- **Logo Grey** (#666464): the grey end of the logo gradient (#666464 to #3B2812). The backdrop shader paints it with Bronze Ink as cloud forms over a dark umber ground (about #17110C). It never appears as a flat fill or a text colour. The painted cloth is its only home.

### Neutral
- **Studio Night** (#0A0908): the page ground, `theme-color`, and the floor of the room.
- **Raised Night** (#12100D): the base of the share sheet (lighter #1C1813 at its top edge, settling to Raised Night by 40% of its height), and the solid fill that replaces smoked glass under reduced transparency.
- **Bone** (#F3F1EF): primary type. The name, headings, lede, pitch, row names, step titles, the K mark and the wordmark.
- **Worn Bone** (#C4BBAE): body copy, step descriptions, the footer line, the sheet's default text.
- **Dim Stone** (#A89E91): metadata. Row handles, panel titles, the sheet hint, row arrows. It is lighter than the Kova site's #958B7C on purpose: this room is lit.
- **Hairline Ring** (rgba(243,241,239,.1)): the inset 1px ring on floating controls, the segmented track and the ghost button. Panel edges and row separators use the same bone at other strengths (16% to 7%, and 7%).

### Tonal Ramps
Every translucent or tinted value on the page is a strength of one of these five families; nothing sits outside them. The sidecar (`.impeccable/design.json`) carries each family as a `tonalRamp`, darkest first, listing only steps the build actually uses.
- **Night ramp** (#000000, #040302, #060504, #080604, #0A0908, #0F0D0B): shadow black (drop shadows at 35% to 85%; in the portrait's fade mask black is only an alpha channel), the copper press shadow (50% to 90%), the sheet backdrop (62%), the voice scrim (60%), Studio Night (the bar scrim, 96% fading to 0), and smoked glass (the segmented track at 82%, panel bodies at 84%).
- **Raised-night ramp** (#100D0A, #12100D, #161310, #17120D, #1B1814, #342D25): the fallback room's middle and top stops, Raised Night, the frosted fill under the Share pill and the scrolled K mark (42%), Night 3 (the solid glass fill under reduced transparency, and the sheet's top edge), and the hover smoke on the Share pill (55%).
- **Bone ladder** (#A89E91, #B9AE9F, #C4BBAE, #D8D0C5, #F3F1EF, #FFFFFF): Dim Stone, Dim Stone under more contrast, Worn Bone, the Apply row's meta line, Bone, and pure white, which appears only as light: inset top-edge highlights at 6% to 8%, the card's top edge at 70%, and the card glint at 55%. Bone itself is the page's tint ladder: 4.5% row hover, 5% panel sheen, 6% row press, 7% separators, the ghost fill and the foot of a panel edge, 8% audience hairlines and the sheet ring, 9% the popover ring, 10% the Hairline Ring, 11% the segmented thumb, 12% ghost hover, 16% the head of a panel edge, 22% the grip, 35% the footer underline, and 40% the ring under more contrast.
- **Copper ramp** (#281B0F, #5A3714, #603E1E, #966434, #D39E5A, #E8B676, #FFECD0, #FFF0D8): the fallback glow's edge (0%) and middle (26%), the press shade on the primary button's lower inner edge (30% to 35%), the fallback key glow (50%), Copper Key Light (washes at 4% to 24%, the pull-quote rule's tail at 15%, numeral strokes at 85%), Hot Copper, and the copper-lit bevel highlight on the primary button (50% at rest, 60% on hover).
- **Paper ramp** (#3B2812, #5E4B35, #EFE8DC): Bronze Ink, Faded Ink and Paper Stock. The paper grain is Bronze Ink at 9%, and the fallback room's bronze pool is Bronze Ink at 34%. Logo Grey appears in the fallback room only as a 10% pool.

### Named Rules
**The One Light Rule.** Copper is the only hue on the page, and it behaves like light. It marks the one primary action, a few typographic accents, and hover. There is no second accent and no blue anywhere, in UI or in imagery.

**The Lit Room Rule.** Text is tested against the brightest part of the room behind it, not against Studio Night. `tools/contrast.py` hides the text, takes the 98th-percentile luminance of the backdrop inside each text box (with the pointer parked on the element on desktop, pulling the light toward it), and computes the WCAG ratio. Every element passes AA; the lowest recorded is 4.99:1 (phone, tablet and desktop, final build). On flat Studio Night the ratios are far higher (Bone 17.7:1, Worn Bone 10.5:1, Dim Stone 7.5:1, Copper 8.4:1), which is exactly why flat Night is not the test. Under `prefers-contrast: more`, Dim Stone lifts to #B9AE9F, the ring to 40%, and row metadata switches to Worn Bone.

## Typography

**Display Font:** Archivo (variable, self-hosted `archivo-vf.woff2`, weight 400 to 800, width 100 to 125), declared twice from one file: as "Archivo Display" with `font-display: block` for the name, so it never flashes a fallback face, and as "Archivo" with `swap` for everything else. Fallback: system-ui, -apple-system, Helvetica Neue, Arial.
**Body Font:** Archivo at width 100.
**Voice Font:** Instrument Serif Italic (self-hosted, weight 400), with Iowan Old Style, Charter and Georgia behind it.

**Character:** A wide, heavy grotesque in capitals is the masthead and the list of who it is for. A narrow, soft italic serif is a person talking. Between them, plain Archivo at 400 and 600 does the work without asking for attention.

### Hierarchy
- **Display, the name** (Archivo 800, width 125, uppercase, -0.02em): stacked at `clamp(2.55rem, min(15.4vw, 8.4svh), 7rem)` with line-height 0.86 (60px on a 390 by 844 phone). Short landscape uses `clamp(2rem, min(7.6vw, 16svh), 4.25rem)`. On the desktop cover the size is computed from the portrait geometry and capped at 190px (112px at 1440 by 900, 190px at 2560 by 1440), line-height 1. Each word reveals inside its own clipped line.
- **Display list, audience lines** (Archivo 800, width 125, uppercase, `clamp(1.375rem, 5.9vw, 2.6rem)`, line-height 1.02, -0.01em): the three audience lines, each between bone hairlines at 8%, with the ampersands in Copper Key Light.
- **Numeral** (Archivo 800, width 125, `clamp(2.4rem, 9vw, 3.1rem)`, line-height 0.8): step numbers only, drawn as outlines (1.2px Copper Key Light stroke at 85%, transparent fill).
- **Headline** (Instrument Serif italic 400, `clamp(2.125rem, 6.2vw + .5rem, 3.25rem)`, 34px to 52px, line-height 1.04, -0.012em, Bone, balanced): every section heading. The sheet's "Share" title uses the same face at 1.75rem, line-height 1.
- **Voice** (Instrument Serif italic 400, `clamp(1.25rem, 5.3vw, 1.5rem)`, line-height 1.22, Bone, 30ch, balanced): the pitch under the name, with a soft dark scrim (see Elevation). On the desktop cover it is `clamp(1.5rem, 1.9vw, 1.875rem)` at 19ch, and 1.5rem when the window is 620px to 760px tall.
- **Quote** (Instrument Serif italic 400, `clamp(1.625rem, 5.4vw, 2.25rem)`, line-height 1.16, -0.008em, Hot Copper, balanced): the one pull quote.
- **Lede** (Archivo 400, `clamp(1.1875rem, 4.2vw, 1.375rem)`, line-height 1.5, Bone): the opening paragraph of a section that needs one.
- **Body** (Archivo 400, 1.0625rem (17px), line-height 1.62, Worn Bone, 60ch): reading text. At 60ch Archivo sets about 65 to 75 characters per line.
- **Title** (Archivo 600, 1.125rem, line-height 1.3, Bone): step titles.
- **Control** (Archivo 600, +0.005em): Save contact at 1.0625rem; ghost and sheet buttons and row names at 1rem; the Share pill and the tabs at 0.9375rem. The role line ("Founder, Kova Media") uses the same face at `clamp(.9375rem, 3.9vw, 1.0625rem)`, line-height 1.3, +0.01em, in copper.
- **Meta** (Archivo 400, 0.875rem): row handles and addresses, the sheet hint, the footer.
- **Label** (Archivo 600, 0.8125rem, +0.06em, uppercase, Dim Stone): the title that names a group of rows (the two link panels, from 900px). The card's letterhead uses the same treatment at 0.6875rem, +0.08em, in Faded Ink.

**Fixed steps.** Besides the fluid roles, the page uses eleven fixed sizes, recorded as `typography.scale` in the frontmatter: 0.6875rem (the card letterhead), 0.8125rem (Label), 0.875rem (Meta), 0.9375rem (the Share pill, the tabs, and the role line's minimum), 1rem (row names, ghost and sheet buttons, step text), 1.0625rem (Body and Save contact), 1.125rem (Title), 1.25rem (the name on the card), 1.5rem (the cover pitch on short windows), 1.75rem (the sheet title) and 1.875rem (the cover pitch's maximum). A new size joins this ladder or a fluid role.

### Named Rules
**The Three Voices Rule.** Width-125 capitals name things: the person, the audience, the steps, the name on the card. Serif italic is Sayed speaking: the pitch, section headings, the pull quote, the sheet title. Archivo 400 and 600 does everything else. A new element joins one of the three voices; it never mixes them.

**The Three Weights Rule.** 400, 600 and 800 only. Nothing light, and no 700: headings get their weight from the italic face and size, not from bold.

**The Italic Voice Rule.** Instrument Serif appears only in italic. The upright cut is declared in the stylesheet but unused; do not start using it.

## Layout

A single centred column over a fixed room. The hero has three measured modes, and the rest of the page is one column.

- **Gutter and column.** Gutter `clamp(16px, 5vw, 40px)`, respecting the safe-area insets on the bar and in the landscape hero. The column is `min(100% - 2 × gutter, 600px)`, widening to 880px from 900px. Nothing overflows horizontally at any width: `html` and `body` clip overflow-x, and the hero grid uses `minmax(0, 1fr)`, because an auto column grows to the oversized portrait and silently pushes the name off centre.
- **Rhythm.** Each section opens with `clamp(96px, 15vw, 168px)` above its heading and `clamp(20px, 3.4vw, 32px)` below it. The footer takes `clamp(96px, 14vw, 150px)` above. Controls group at 10px, the two link panels sit 16px apart, and the segmented control sits 12px above its panel.
- **Top bar.** Fixed, 60px tall on phones, 68px from 600px wide, and 76px on the desktop cover, plus the top safe-area inset. It holds the K mark on the left and Share on the right, and nothing else. Once the page leaves the top, a Studio Night scrim fades in under it (96% down to 0 over the bar height plus 44px), so scrolled copy never collides with the controls.

**Hero modes**

1. **Stacked** (phones, tablets, and any window that is neither short landscape nor cover). A three-row grid, `minmax(0, 1fr) auto auto`, at 100svh (minimum 540px). The portrait takes all the spare height (at most 680px, aspect 848:990, bottom-aligned) and shifts left 10% so the head, which sits at x ≈ 0.60 of the photo, lands on centre. The name overlaps the fading torso by 0.62 of its own size. Role, pitch and Save contact follow, centred, in a block up to 380px wide.
2. **Short landscape** (landscape and under 620px tall: phones held sideways, short laptop windows). Two columns: the portrait on the left at full hero height, and the name and info on the right in a column up to 560px, left-aligned, with a gap of `clamp(20px, 4vw, 52px)`.
3. **Desktop cover** (at least 1180px wide, aspect at least 5/4, at least 620px tall). The name frames the face: SAYED to the left of the head, SULTANI to the right, with the capitals' centre on the mouth-to-chin band where the silhouette is narrowest. Every number is measured:
   - SAYED is 4.26em wide and SULTANI 5.27em (Archivo width 125, weight 800, -0.02em). The capitals' centre sits 0.491em below the top of the line box (ascender 878, descender 210, cap height 686).
   - From `tools/portrait.py`: `--band .29` (the head's width at that height, as a fraction of the portrait width), `--hc .601` (head centre), `--capy .345` (the cap line, as a fraction of the portrait height).
   - Portrait height is `min(82svh, 860px, 100svh - 110px)` and width is height × 0.8566. Name size is `min(190px, (100vw - 2m - band × pw) / (4.26 + 5.27 + .7))`, with margin m = `clamp(40px, 4vw, 80px)`. The gap between the words is `band × pw + .7em`, and the whole line is centred.
   - Role, pitch and Save contact sit bottom right (bottom `clamp(40px, 7svh, 72px)`, at most 380px wide), with their right edge on the I of SULTANI. The bar's K lines up with the S of SAYED (allowing for the S's side bearing), and Share lines up with the I.
   - Re-measure with `tools/portrait.py` whenever the portrait or the font changes; `tools/qa.py` reports `nameHitsHead`.

**Below the hero**
- From 900px the segmented control is removed. The Kova Media and Personal panels sit side by side, 16px apart, each with its Label title. The contact panel takes the width of one link panel, and the steps cap at 720px.
- Share opens as a bottom sheet under 700px, and as a popover anchored under the Share button from 700px.

### Named Rules
**The Name Frames the Face Rule.** On the desktop cover, the name's position comes from the photograph, not from a grid. Change the portrait or the face and you re-measure; never nudge the numbers by eye.

**The Spare Height Rule.** On phones the portrait gets whatever height the name, pitch and Save contact leave over. Save contact never leaves the first screen, on any phone from 320px wide.

## Elevation & Depth

Depth comes from light in a room, not from shadows on surfaces.

**The room.** The backdrop is fixed behind everything, at 100lvh so mobile toolbars never reveal an edge. CSS paints it first, and this is the complete room when WebGL is unavailable: a warm glow centred at 50% 27% (rgba(150,100,52,.5) fading out), a Logo Grey pool lower left at 10%, a bronze pool on the right at 34%, over a vertical fade from #17120D through #100D0A to Studio Night, and fractal-noise grain at 7%.

After first paint, `assets/backdrop.js` takes over with one full-screen triangle per frame:
- **The cloth.** A domain-warped noise field of Logo Grey and Bronze Ink clouds on umber, with hanging vertical folds and short dry brushstrokes in two directions. It is painted once into a texture 38% taller than the screen, then sampled with a slow drift. An optional photographed cloth (`data-cloth` on the backdrop) can replace it; its brightness is normalised to match the painted one.
- **The key light.** A copper light (about rgb(255,191,125)) with a soft falloff and a brighter core. The cloth is painted lighter under it, the way studio backdrops are. It warms up over 1.8s on load.
- **What the light follows.** The portrait's head, the scroll and the pointer. As the hero scrolls away the light slides to the centre, 36% down the screen, widens by 30% and dims by 40%. The pointer pulls it 24% of the way on fine pointers, and 12% for 1.4s after a tap. Critically damped springs smooth all of it (0.9s for position, 0.5s for brightness), with a slow drift on top.
- **Dust, vignette and grain.** Dust drifts only inside a beam from the lamp at upper camera-left, and never twinkles. A vignette darkens the corners to 32%, per-pixel grain sits on top, and a warm floor light rises over the last screen of the page. The canvas fades in over 1.4s, and only once a real frame exists.
- **Budget and fallbacks.** About 340,000 pixels per frame, rendered soft and upscaled. If the device can't hold about 40fps the pixel count halves, and if it still can't, the light freezes into one still frame. The backdrop drops to 30fps after 3.5s without scrolling, pauses while the share sheet is open, refuses software rendering, and falls back to the CSS room if the context is lost.

**Surfaces** are smoked glass, not shadow. A panel body is 84% Studio Night with a 5% bone sheen fading out by 42% of its height. Its 1px edge is a gradient from 16% bone at the top to 7% at the bottom, and a 6% white highlight sits inset on the top edge. Hairline rings (`inset 0 0 0 1px`) replace borders everywhere. Frosted blur (`blur(16px) saturate(150%)` over 42% warm night) is used only on the Share pill, and on the K mark once the page scrolls.

### Shadow Vocabulary
- **Float** (`box-shadow: inset 0 0 0 1px var(--ring), inset 0 1px 0 rgba(255,255,255,.07), 0 8px 22px -12px rgba(0,0,0,.7)`): the Share pill and the scrolled K mark.
- **Copper press** (`box-shadow: 0 1px 0 rgba(255,236,208,.5) inset, 0 -1px 0 rgba(90,55,20,.35) inset, 0 14px 26px -12px rgba(4,3,2,.85), 0 2px 5px rgba(4,3,2,.5)`): the primary button. Hover deepens the drop to `0 18px 30px -12px rgba(4,3,2,.9), 0 3px 7px rgba(4,3,2,.5)`.
- **Thumb** (`box-shadow: inset 0 0 0 1px rgba(243,241,239,.1), inset 0 1px 0 rgba(255,255,255,.08), 0 6px 16px -8px rgba(0,0,0,.6)`): the selected thumb of the segmented control.
- **Paper** (`box-shadow: 0 1px 0 rgba(255,255,255,.7) inset, 0 22px 40px -18px rgba(0,0,0,.75), 0 2px 6px rgba(0,0,0,.35)`): the business card.
- **Sheet** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.07), inset 0 0 0 1px rgba(243,241,239,.08), 0 -30px 80px -20px rgba(0,0,0,.7)`): the phone bottom sheet, casting upward.
- **Popover** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.07), inset 0 0 0 1px rgba(243,241,239,.09), 0 30px 70px -20px rgba(0,0,0,.85), 0 8px 20px -8px rgba(0,0,0,.6)`): the desktop share popover.
- **Voice scrim** (`text-shadow: 0 1px 18px rgba(8,6,4,.6)`): the pitch only, where it crosses the lit cloth.

### Named Rules
**The Light, Not Shadow Rule.** The room and its key light create the depth. Shadows are soft, offset downward (upward for the bottom sheet) and pulled in with negative spread. No coloured glows around objects and no hard offsets; the only text shadow is the dark scrim under the pitch.

**The Frost Only Floats Rule.** Backdrop blur is only for controls floating over the moving room. Content panels are smoked glass at 84%, dense enough that the moving light only tints what people are reading.

**The Calm Reading Rule.** Nothing busy moves behind body copy. The dust is gone by 60% of the hero's scroll, the cloth's drift drops to a fifth, the pointer's pull on the light halves, and no pointer effect ever runs on a panel. The light stays alive behind the copy, but slow.

## Shapes

Soft, consistent corners; hairlines instead of borders; forms cut by masks.

- **Corners.** One scale, smallest first: the sheet grip at 3px (a capsule on a 5px bar); the focus outline at 6px; the inner corner of a control at 10px (the segmented thumb and tabs, concentric with the 14px track, and the skip link); controls at 14px (buttons, the segmented track); the business card at 18px; a panel body at 19px (concentric with its 20px edge, written as `calc(var(--r-surface) - 1px)` so it follows the surface radius); surfaces at 20px (panels); the popover at 24px; the phone sheet at 26px on its top corners; and fully round for floating controls (the Share pill at 999px; the K mark and the close button are circles).
- **Lines.** Every edge and divider is 1px. Row separators start at the text column (54px in) and stop 18px short of the right edge. Audience lines sit between 8% bone hairlines. The pull quote has a 1px rule that fades from Copper Key Light to 15% copper.
- **Masks.** The portrait fades out at the bottom through a mask (solid to 66%, 55% at 84%, gone by 99% on phones; 72%, 88% and 100% on the cover). The K mark and the Kova wordmark are PNG masks filled with the current colour, so they recolour for the paper card and for forced colours.
- **QR.** Rounded modules (corner radius 0.3 of a module) and rounded-square finder patterns, in Bronze Ink.
- **Outlined numerals.** The step numbers are stroke only.

### Named Rules
**The Concentric Corners Rule.** An inner radius equals the outer radius minus the inset: the segmented track is 14px with 4px of padding, so its thumb is 10px; a panel is 20px with a 1px edge, so its body is 19px.

**The Hairline Rule.** Edges and dividers are 1px of bone at 7% to 16%. The only coloured side rule is the pull quote's, and it is 1px.

## Components

Motion grammar for every component: state changes use the standard ease-out (`cubic-bezier(.23,1,.32,1)`); entrances use an exponential ease-out (`cubic-bezier(.16,1,.3,1)`); the phone sheet uses the drawer curve (`cubic-bezier(.32,.72,0,1)`); and small moves use damped springs rendered with `linear()`: a snap spring with about 1% overshoot for the segmented thumb, and a soft spring with almost none for icons, the card tilt and the popover. Press states scale down (0.97 for buttons, 0.96 for the Share pill, 0.92 for the close button). Hover styles exist only for `(hover: hover) and (pointer: fine)`.

### Buttons
Character: one warm, solid, tactile action per screen.
- **Shape:** gently rounded (14px), at least 56px tall (52px inside the share sheet), 0 22px of padding, and the label never wraps.
- **Primary (Save contact, Send):** Copper Key Light fill, Umber Label text at 600, a Phosphor icon at 21px, and the Copper press shadow. One per screen.
- **Hover / Focus:** Hot Copper with a deeper drop on hover. Press scales to 0.97 in 0.16s. Keyboard focus is a 2px Hot Copper outline at a 3px offset (the global focus style).
- **Done state:** after Save contact is tapped, the user-plus icon cross-fades into a check (the outgoing icon blurs 3px and shrinks to 60%), holds for 2.4s, and gives an 8ms haptic tick where supported.
- **Ghost (Copy link):** 7% bone fill, a hairline ring, Bone text at 1rem, 12% on hover. Its label swaps from "Copy link" to "Copied" with a 6px vertical slide and a blur, holds for 1.8s, and is announced politely to screen readers.

### Floating bar controls
- **Share pill:** 42px tall, fully round, padding 0 17px 0 14px, a Phosphor export icon at 18px and "Share" at 0.9375rem/600, frosted with the Float shadow. Hover rgba(52,45,37,.55), press 0.96. The hit area extends 4px beyond the pill.
- **K mark:** a 44px circle holding the Kova K (19 by 24) as a Bone mask. It is bare at the top of the page and frosted like the Share pill once the page scrolls. On hover the K scales to 1.08 on the soft spring.

### Segmented control (under 900px)
- A track (82% night, hairline ring, 14px, 4px inset) holding two 44px tabs at 0.9375rem/600. The selected thumb (11% bone, Thumb shadow, 10px) springs across in 0.43s. Inactive labels are a warm grey (#ADA396); the active label is Bone.
- Switching animates the panel height (420ms) while the incoming panel slides 28px in from the direction of travel with a 4px blur (460ms). Arrow keys, Home and End move between tabs.
- From 900px it is removed, and both panels show side by side with Label titles.

### Panels and rows
Character: the row is the page's one list pattern, for every destination and every way to get in touch.
- **Panel:** a 20px smoked-glass surface (see Elevation & Depth). Rows run full-bleed inside it.
- **Link row:** at least 62px tall, padding 12px 18px, a grid of `22px | name | meta | 16px` with 14px gaps. The Phosphor icon is 22px in Bone, the name 1rem/600 in Bone, the handle 0.875rem in Dim Stone (right-aligned, truncating with an ellipsis), then a 16px arrow in Dim Stone.
- **Two-line row (contact):** at least 68px tall, with the name above the value, left-aligned, so a phone number or an email address never truncates.
- **Hover / Press:** on hover a 4.5% bone wash, the icon turns Hot Copper, the arrow nudges 2px up and right and brightens to Bone, and the handle brightens to Worn Bone. Press is a 6% bone wash.
- **Separators:** 1px bone at 7%, from the text column to 18px short of the right edge.
- **Apply row (the one distinguished row):** first in the contact panel. A copper wash from 16% to 4%, left to right (24% to 7% on hover), with a Hot Copper icon and arrow, a 1.0625rem name, and a light warm meta line (#D8D0C5). The separator below it starts at the row's edge (18px in), not at the text column.
- **Entrance:** when the links panel first scrolls into view, its rows deal in, rising 12px and fading in, 45ms apart.

### Pull quote
- Serif italic in Hot Copper, with a 1px copper rule on its left that fades downward, and a left inset of `clamp(18px, 4vw, 28px)`. On entrance the quote fades in (0.9s) while the rule draws from the top down (1.2s, after 0.12s). One per page.
- From 900px it is held to `max-width: 24ch` (`.section .pull`, which outranks the 60ch paragraph measure), so it balances onto two lines: the campaign, then the relationship.

### Audience list
- Width-125 capitals at `clamp(1.375rem, 5.9vw, 2.6rem)`, each line between 8% bone hairlines, with Copper Key Light ampersands. On entrance each line rises out of its own clip the way the name does (1s, 90ms apart).

### Steps
- An ordered list. Each step is an outlined copper numeral in a column 48px to 64px wide, then a Title, then Body text at 1rem/1.6 in Worn Bone. The numerals are hidden from screen readers; the list carries the order.

### Share sheet and business card
- **Phone:** a bottom sheet (#1C1813 at the top edge settling to Raised Night, 26px top corners, a 40 by 5 grip at 22% bone) that rises in 0.5s on the drawer curve over a 62% night backdrop. It follows the finger one to one and rubber-bands upward. On release it closes if the drag plus its projected travel passes half the sheet's height, or if the flick is faster than 1100px/s; otherwise it settles back.
- **700px and up:** a 380px popover (24px corners) that grows out of the Share button's corner from 94% scale (soft spring over 0.34s, fading in over 0.18s).
- **Header:** "Share" in serif italic at 1.75rem, and a 44px round close button.
- **Business card:** Paper Stock (up to 300px wide, 18px corners, padding 18px 18px 16px, with paper grain). A letterhead of the K mark and "KOVA MEDIA" in Label type in Faded Ink, the QR code in Bronze Ink, then the name in width-125 capitals at 1.25rem and the URL at 0.8125rem/600. On fine pointers it leans toward the pointer (up to 6° and 7°) on the soft spring, with a soft-light glint that follows.
- **Actions:** a Dim Stone hint, then Copy link and Send. Send appears only where the Web Share API exists; otherwise Copy link spans both columns.

### The hero sitting
- **The portrait** comes from `tools/portrait.py`: an Apple Vision cut-out, graded into the room (whites tamed above 0.78 luminance, warm highlights, bronze in the shadows), with a backlight baked into the hair crown only (the edges whose normal faces the lamp; the jacket edge stays matte). The lower 42% is darkened by up to 30%, and the crop is 848:990 with 5% of air above the hair. It ships as AVIF and WebP at 600px and 848px. There is no CSS rim, outline or drop shadow.
- **The load sequence** (CSS only, runs once, ends at rest, skipped under reduced motion): the room fades in (1.2s); the portrait rises 28px from 98.5% scale and a 10px blur (1.1s, from 0.08s); SAYED then SULTANI slide up inside their clipped lines (0.95s, at 0.22s and 0.30s); the role, pitch and Save contact rise 14px at 0.46s, 0.54s and 0.62s; the bar controls fade in at 0.7s. Everything that moves uses the exponential ease-out; the two plain fades (the room and the bar) use the standard ease-out.
- **The contact photo** inside the vCard is the same portrait on Studio Night with a blurred copper glow behind the head, 480 by 480.

### Footer
- The Kova wordmark as a 112 by 46 Bone mask at 92%, then the copyright line in Meta, with an underlined Bone link (underline at 35%, offset 3px).

### Link preview
- `og.jpg` (1200 by 630) is rendered from the page itself (`tools/og.html`): the backdrop as a still frame, the portrait on the right, the name in width-125 capitals at 112px, the role in copper at 30px, and the pitch in serif italic at 32px. Re-render it after any portrait or type change.

### Named Rules
**The Arrow Tells Where Rule.** `arrow-up-right` means the link leaves the page (Kova, the socials, Apply); `arrow-right` means an action on the phone (call, text, email).

**The Rest State Rule.** Every animation starts from, and ends in, the page as it reads with no JavaScript. Scroll entrances arm only for content still below the fold at load, and remove their classes once they settle.

**The Effects Are a Layer Rule.** No WebGL, no JavaScript, reduced motion and reduced transparency each still render the complete page: the CSS room, visible content, one still frame of light, and solid Night fills instead of glass.

## Do's and Don'ts

### Do:
- **Do** keep every screen to Studio Night, the three bone steps, Copper Key Light and Hot Copper, with Paper Stock only on the card.
- **Do** run `tools/contrast.py` at a phone size and a desktop size after any colour, type or backdrop change. AA against the brightest backdrop pixel behind the text is the bar.
- **Do** put any new destination in the row family (icon, name, handle, arrow) inside a smoked-glass panel, with `arrow-up-right` for a link that leaves the page and `arrow-right` for an action on the phone.
- **Do** set new section headings in the Headline style (serif italic 400, 34px to 52px) with the section rhythm above them.
- **Do** re-run `tools/portrait.py` when the portrait changes, paste its `--band`, `--hc` and `--capy` into the desktop block, then re-render `og.jpg` and run `tools/qa.py`.
- **Do** offset an element that also runs a transform animation with the separate `translate` property (as the phone portrait's -10% shift does); otherwise the animation's fill wipes the offset.
- **Do** keep hover styles behind `(hover: hover) and (pointer: fine)`, and give every control a target of at least 44px.
- **Do** keep the fallbacks whole: reduced motion (one still frame, content shown), reduced transparency (solid Night fills), more contrast (a 40% ring, Dim Stone at #B9AE9F), forced colours (CanvasText borders and marks).

### Don't:
- **Don't** introduce blue, teal or any second accent hue, in the UI or in imagery.
- **Don't** fall back to the link-page default this page refuses: an avatar circle, a stack of pill-shaped link buttons, or a decorative gradient wallpaper. The CSS gradients in the backdrop are the no-WebGL rendering of the same lit room, not wallpaper.
- **Don't** draw a rim, outline or drop shadow around the portrait. The copper rim read as a sticker, and the portrait's mask clipped its drop shadow into a straight seam. Light lives in the photo and in the room.
- **Don't** put a text-shadow on the name. Each line reveals through a clip, and a clipped blur shows as a box.
- **Don't** animate `opacity` on the top bar itself. An animated ancestor becomes a backdrop root and the frosted controls stop blurring; animate its children instead.
- **Don't** put moving light behind reading: no pointer spotlight on panels and no shine sweep on buttons (both were removed from this build).
- **Don't** add frosted blur to content panels, or one identical entrance to every block. The page has one load sequence and three entrances, each designed for its content.
- **Don't** place a small uppercase label above a heading. Label type only names a group of rows or the card's letterhead.
- **Don't** number sections. Numerals mark the steps of a real sequence only.
- **Don't** use Unicode glyphs or emoji as icons. Icons are Phosphor Regular, built into the sprite by `tools/build.py`.
