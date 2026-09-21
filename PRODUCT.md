# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: static HTML/CSS/JS, no framework and no build step, deployed on Vercel.
Chosen because the brief asks for very smooth animation on phones: the load
choreography runs as CSS keyframes on the compositor, interactions use
transform/opacity with spring easing, and the backdrop is one WebGL draw call
per frame. No framework bundle has to download and hydrate before any of it
can move, which matters for a link opened from AirDrop on cellular.

## Users

People Sayed Sultani meets, in person or online, who receive this page by
AirDrop, QR code, text or a bio link: brand owners and operators (e-commerce,
DTC, streetwear, roofing and home services), other founders, creators, and
friends. They are almost always on a phone, often at an event or in a
conversation, and give the page a few seconds.

## Product Purpose

`link.kovamedia.agency` is Sayed's personal link page. In one screen a
stranger should know who he is (face, name, founder of Kova Media), be able to
save him to their contacts in one tap, and find him on the platforms they use
(Kova's business accounts and his personal ones). Scrolling explains what Kova
does and for whom, and ends at a way to start working together.

Success: the contact gets saved and the follow happens during the
conversation, not later.

## Positioning

Sayed runs Kova Media, a growth agency in Sacramento, as one person: paid
media, creative, and the tracking that connects the two, so an owner can see
what the spend bought. He came up through sales before marketing.

## Operating Context

- Shared by AirDrop, QR (shown from Sayed's own phone), iMessage/DM links and
  social bios. Link previews (Open Graph) are the first impression in
  Messages.
- Primary action: **Save contact** (a vCard with name, phone, email, Kova,
  socials, photo).
- Secondary: follow on socials, call or text, email, apply to work with Kova
  at `https://www.kovamedia.agency/apply`.

## Capabilities and Constraints

- Two link sets: Business (Kova Media) and Personal (Sayed).
- Audience line covers every Kova lane: e-commerce/DTC, streetwear, roofing and
  home services.
- Contact: (916) 823-6820 (call or text), contact@kovamedia.agency.
- Must fit every phone and desktop width with no horizontal overflow.

## Brand Commitments

- Name is **Kova Media**. The previous company name must never appear, and no
  copy may hint that the agency had other names.
- Voice on this page: Sayed speaks as "I" (it is his personal page). Never
  "we" or "our team": Kova is one person. Do not dodge the pronoun with passive
  voice.
- Honesty rule: no client results, ROAS or revenue figures, client counts,
  testimonials, ratings, badges, guarantees or implied staff.
- No pricing and no fee-model language (no "retainer", "flat fee", markups).
- Kova's CTA wording is "Apply to work with us" and it goes to `/apply`.
- Visual identity lives in Kova's Atelier system (kovamedia.agency): night
  ground, bone type, copper light, no blue. Faces: Archivo and Instrument Serif.
  Logo colours: #666464 grey to #3B2812 bronze.
- Direction pinned by Sayed on 2026-09-20: keep the vibe of his reference link
  page (portrait lit by a warm glow, big wide name, italic pitch, glassy link
  rows) and upgrade the background into something beautiful and creative in
  Kova's colours, with very smooth animation.

## Evidence on Hand

- Portrait: `~/Downloads/FOUNDER PHOTO.png` (1096x1436, white seamless),
  cut out with Apple Vision into `assets/img/sayed-*.{avif,webp}`.
- Brand marks: `assets/brand/` (K mark, wordmark white/black), copied from the
  Kova site repo.
- Verified links: kovamedia.agency; Instagram/TikTok/YouTube
  `@kovamedia.agency`; X `@Kovamediaagency`; LinkedIn company `kova-media`;
  Facebook `Kovamedia.agency`. Personal: Instagram `sayedsalez`, TikTok and
  YouTube `sayedsvj`, LinkedIn `sayed-sultani`.
- None of: testimonials, client logos, case studies, published prices. Do not
  fabricate them.

## Product Principles

1. Save-the-contact is the job. Everything above the fold serves it.
2. The page must feel expensive on a phone in a dim room: smooth, warm, quiet.
3. Every claim is true of one person running Kova today.
4. It works with no WebGL, no JavaScript and reduced motion; effects are a
   layer, never a dependency.

## Accessibility & Inclusion

WCAG 2.2 AA: text contrast measured against the brightest point of the
backdrop behind it, visible keyboard focus, reduced motion and reduced
transparency honoured, 44px minimum touch targets.
