---
name: Robert M. Herzog
description: Novelist, screenwriter, essayist and filmmaker. The site runs like a silent picture, with words on framed title cards and pictures on tinted reels.
colors:
  carbon: "#0c0b0a"
  carbon-card: "#141210"
  silver: "#ebe8e0"
  silver-2: "#c8c4b9"
  silver-lift: "#fff6e4"
  dim: "#9c937f"
  keyline: "rgb(236 229 212 / 0.34)"
  keyline-strong: "rgb(236 229 212 / 0.6)"
  ember: "#eb8c48"
  ember-lift: "#f5a065"
  on-ember: "#170c04"
  night: "#0c2230"
  night-card: "#122d3d"
  night-2: "#bccbd0"
  night-muted: "#8fa3ab"
  rose: "#2a111d"
  rose-card: "#381829"
  rose-2: "#dcc0c8"
  rose-muted: "#ad929b"
  sepia: "#22180b"
  sepia-card: "#2d2112"
  sepia-2: "#d6c6a6"
  sepia-muted: "#a8977a"
  lit: "#e3e1da"
  lit-card: "#eeede9"
  lit-ink: "#16130f"
  lit-2: "#4a4236"
  lit-muted: "#6a604f"
  gate-black: "#050404"
typography:
  display:
    fontFamily: "IM Fell English, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(48px, 5.6vw, 84px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  display-film:
    fontFamily: "IM Fell English, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(54px, 8.4vw, 96px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "IM Fell English, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(36px, 5vw, 62px)"
    fontWeight: 400
    lineHeight: 1.04
  title:
    fontFamily: "IM Fell English, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(27px, 2.4vw, 32px)"
    fontWeight: 400
    lineHeight: 1.08
  title-sm:
    fontFamily: "IM Fell English, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(23px, 2vw, 27px)"
    fontWeight: 400
    lineHeight: 1.15
  intertitle:
    fontFamily: "IM Fell English, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(20px, 2vw, 27px)"
    fontWeight: 400
    lineHeight: 1.35
  quote:
    fontFamily: "IM Fell English, Iowan Old Style, Georgia, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.4
  wordmark:
    fontFamily: "IM Fell English SC, IM Fell English, Georgia, serif"
    fontSize: "23px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  body:
    fontFamily: "Libre Caslon Text, Georgia, Times New Roman, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  prose:
    fontFamily: "Libre Caslon Text, Georgia, Times New Roman, serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.78
  label:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.2em"
  label-control:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.14em"
  meta:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
  credits:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.02em"
rounded:
  none: "0px"
  gate-inner: "4px"
  gate: "9px"
  iris: "50%"
spacing:
  keyline-inset: "7px"
  frame-inset: "8px"
  gutter: "clamp(16px, 4vw, 44px)"
  section-y: "clamp(72px, 9vw, 128px)"
  card-gap: "clamp(48px, 6vw, 80px)"
  wrap: "1240px"
  card-max: "820px"
  reading-max: "760px"
components:
  button-primary:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.carbon}"
    typography: "{typography.label-control}"
    rounded: "{rounded.none}"
    padding: "12px 22px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.silver-lift}"
    textColor: "{colors.carbon}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.silver}"
    typography: "{typography.label-control}"
    rounded: "{rounded.none}"
    padding: "12px 22px"
    height: "46px"
  button-secondary-active:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.carbon}"
  button-ember:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.on-ember}"
    typography: "{typography.label-control}"
    rounded: "{rounded.none}"
    padding: "12px 22px"
    height: "46px"
  button-ember-hover:
    backgroundColor: "{colors.ember-lift}"
    textColor: "{colors.on-ember}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.sepia-2}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
  chip-selected:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.sepia}"
  input-search:
    backgroundColor: "{colors.sepia-card}"
    textColor: "{colors.silver}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 14px 0 40px"
    height: "42px"
    width: "230px"
  nav-link:
    textColor: "{colors.silver-2}"
    padding: "8px 0"
  nav-cta:
    backgroundColor: "transparent"
    textColor: "{colors.silver}"
    padding: "10px 16px"
  nav-cta-hover:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.carbon}"
  title-card:
    backgroundColor: "{colors.carbon-card}"
    textColor: "{colors.silver}"
    rounded: "{rounded.none}"
    padding: "clamp(34px, 4.4vw, 56px) clamp(24px, 5vw, 64px)"
  section-plate:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.silver-2}"
    typography: "{typography.label}"
    padding: "9px 18px"
  film-frame:
    backgroundColor: "{colors.gate-black}"
    rounded: "{rounded.gate}"
  platform-link:
    backgroundColor: "transparent"
    textColor: "{colors.sepia-2}"
    rounded: "{rounded.none}"
    padding: "7px 12px"
  platform-read:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.sepia}"
    padding: "7px 12px"
  film-status:
    backgroundColor: "rgb(12 11 10 / 0.6)"
    textColor: "{colors.ember}"
    padding: "8px 16px"
---

<!-- This file documents the experiment06 iteration of the site ("Intertitle & Tinted Reel"), extracted from experiment06/styles.css, index.html, app.js and templates/. The other experimentNN/ folders are earlier design iterations and are not described here. -->

# Design System: Robert M. Herzog

## Overview

**Creative North Star: "Intertitle & Tinted Reel"**

The site runs like a silent picture. Words appear on framed black title cards set in a historic intertitle serif, and pictures run as reels laid on tinted film base, so the author's words and the producer's pictures share one projection. The page reads as one continuous reel from top to bottom: a carbon film-black opening, an untinted ember reel for the film being championed, then night-blue, rose and sepia reels, a single bright silver-screen section, and back to carbon for the close. A thin progress strip under the header fills as the reel runs.

Density is cinematic rather than editorial: each section opens on a centred title card, then lets its work breathe in wide grids with generous vertical gaps. Type carries the period voice (IM Fell English for anything spoken from the screen, Libre Caslon Text for reading, Jost for credits and controls), while images keep their own colours inside academy-ratio frames with softly rounded gate corners. Ornament is built from one unit: a fine double keyline with small diamond corner marks, repeated at every width.

State is strict and one-bit. A pressed button or selected chip inverts silver and black; hovering or focusing one work in Screen & Stage dims its siblings; images open through a round iris as they enter the view. Motion is slow and eased, and it switches off entirely under reduced motion.

**Key Characteristics:**
- Carbon film-black ground with silver projected type; whole sections laid on night, rose and sepia tint fields; one bright silver-screen section.
- Title cards: square panels with a fine double keyline and four diamond corner units, often carrying a jumping projector grain.
- Images in academy-ratio (4:3) frames with rounded gate corners, opening through an iris.
- Ember appears only for the featured film and its primary action.
- Three typefaces with fixed jobs: intertitle serif (display, quotes, ledes), book serif (reading), geometric sans (labels, credits, controls).
- Pressed and selected states invert ink and ground.

## Colors

A projection palette: near-black film base, warm silver light, three dark tint fields with their own pale inks, and a single hot ember.

### Primary
- **Projector Silver** (silver): the projected light. Body text, headings, wordmark, the filled primary button, selected chips, focus rings, the reel progress strip and text selection on carbon.
- **Ember** (ember): the one hot colour, kept for *No Kidding Around*: its status tag ("moving toward production"), the status dot and the "Support the film" button. Text on ember is **Ember Char** (on-ember); its hover lift is **Lit Ember** (ember-lift).

### Secondary (tint fields)
Each tint is a full section ground with a card shade one step lighter, a pale second ink and a muted ink. Components never name these directly; they read the section's role variables.
- **Night Reel** (night, night-card, night-2, night-muted): Screen & Stage.
- **Rose Reel** (rose, rose-card, rose-2, rose-muted): Books, including the rose vignette over the open-book photograph.
- **Sepia Reel** (sepia, sepia-card, sepia-2, sepia-muted): Writing.

### Tertiary
- **Silver Screen** (lit, lit-card, lit-ink, lit-2, lit-muted): the About section, the only bright ground. Ink flips to near-black; its quote card is the one carbon title card on a light field.

### Neutral
- **Carbon** (carbon): the film base. Page ground, header (at 82% with a 10px blur), opening, film feature, Follow, footer and reading pages.
- **Carbon Card** (carbon-card): title-card fill on carbon.
- **Silver Dust** (silver-2): secondary ink on carbon: nav links, roles line, film body copy, credits.
- **Dim Base** (dim): tertiary ink: index labels, metadata, sponsor line, footer, social handles.
- **Keyline / Keyline Strong** (keyline, keyline-strong): warm silver at 34% and 60%, for card keylines, rules, frame outlines and button borders on carbon. On a tint the keylines take that tint's second ink at 32% and 60%; on the silver screen they are lit-ink at 30% and 60%.
- **Gate Black** (gate-black): the fill behind an image frame before the picture lands.
- **Silver Lift** (silver-lift): hover fill of the silver primary button.

### Named Rules
**The One Ember Rule.** Ember belongs to the film being championed and its primary action only. Every other emphasis is silver, inversion or size.

**The Role Variable Rule.** Components read `--bg`, `--card`, `--ink`, `--ink-2`, `--muted`, `--frame` and `--frame-strong`, never a raw tint. A section changes reel by adding one tint class (`tint-night`, `tint-rose`, `tint-sepia`, `screen-lit`); everything inside re-inks itself.

**The One Bright Screen Rule.** Only one section is lit (About). The rest of the reel stays dark.

## Typography

**Display Font:** IM Fell English (with Iowan Old Style, Georgia), plus IM Fell English SC for the wordmark and article byline
**Body Font:** Libre Caslon Text (with Georgia, Times New Roman)
**Label/Mono Font:** Jost (with Futura, Century Gothic, system-ui)

**Character:** IM Fell's irregular, historic letterforms speak like silent-film title cards. Libre Caslon gives long reading a steady book face, and Jost's wide, tracked capitals read like credits on a reel can.

### Hierarchy
- **Display** (400, clamp(48px, 5.6vw, 84px), 0.95, -0.01em): the hero name only, split either side of the portrait. The film title runs larger (display-film, up to 96px) over its still, with a soft 30px text shadow.
- **Headline** (400, clamp(36px, 5vw, 62px), 1.04): section title-card headings. Book and lead-work headings sit near this size (up to 60px); article titles reach 66px.
- **Title** (400, clamp(27px, 2.4vw, 32px), 1.08): screen-work headings; writing-card headings use title-sm (23 to 27px). Index entries and list titles run 17 to 21px in the same face.
- **Intertitle** (italic 400, clamp(20px, 2vw, 27px), 1.35): ledes, loglines, deks, blurbs, book subtitles, imageless frame cards. Quotes and reviews use the same italic at 18 to 22px.
- **Body** (400, 17px, 1.65): general copy, measured at 60 to 64ch. Reading pages use **Prose** (19px, 1.78; poems 20px, 1.85) in a 760px column.
- **Label** (500, 12px, 0.2em to 0.26em, uppercase): section plates, kinds, index labels, group titles, roles line. Controls (buttons, nav, chips) use 12.5 to 13px at 0.14em to 0.18em.
- **Meta** (400, 12.5px, 0.04em to 0.06em): dates, venues, citations, handles. Credits blocks use 14.5px.

### Named Rules
**The Three Voices Rule.** IM Fell speaks from the screen (names, headings, ledes, quotes), Caslon is for reading, Jost is for credits and controls. Never set paragraph copy in Jost or labels in a serif.

**The Credit Line Rule.** Roles and credits sit under the name or title they describe, never above a heading.

## Layout

A centred 1240px wrap with a fluid gutter (16 to 44px). Sections are full-bleed grounds with 72 to 128px of vertical padding. Each tinted section opens on a centred section title card (max 820px) followed by a 48 to 80px gap before its content.

- **Opening:** one full title card. A three-column name row (first name, round portrait, last name), then the roles line, italic lede and two centred buttons, then a four-column ruled index along the card's foot (1.15fr 1.15fr 0.9fr 1fr, books and film set loudest). The index drops to two columns at 1020px and one at 640px, where the portrait stacks above the name.
- **Film feature:** full-bleed still (440 to 760px tall) with vignette and the title over it, then a 1.45fr / 1fr body with a title-card sidebar. One column below 900px.
- **Screen & Stage:** two-column grid with the lead work spanning both columns; each work is image beside text. One column below 900px; image stacks above text below 520px.
- **Books:** alternating cover-and-text rows (cover column 180 to 330px), then a four-across review row (two at 1020px, one at 520px). The section opens on a full-bleed photograph with the title card laid over it.
- **Writing:** a contact sheet, three columns (two at 1020px, one at 600px), with filter chips and search centred above.
- **About and Follow:** two-column splits (copy plus quote card; newsletter card plus social grid), one column below 900px.
- **Reading pages:** 760px column, a title card for the head, lead image up to 1100px wide shown whole.

The mobile menu takes over at 760px. Rhythm comes from fluid `clamp()` pairs rather than a fixed step scale; the recurring fixed values are the 7px keyline inset, the 8px frame inset, and gaps of 8, 14, 16, 18 and 22px inside components.

## Elevation & Depth

Depth is mostly light, not lift: the system is flat and layered by tint, with projector light standing in for elevation. Title cards sit flat on their ground and are separated by their keyline frame and a one-step lighter fill. The shadows that exist are soft and long, like a picture hanging in a beam, and sit under images and the occasional card laid over a picture.

### Shadow Vocabulary
- **Gate shadow** (`box-shadow: 0 0 0 1px var(--frame), 0 22px 40px -24px rgb(0 0 0 / 0.8)`): every image frame; the 1px ring doubles as the frame outline.
- **Cover drop** (`box-shadow: 0 2px 3px rgb(0 0 0 / 0.35), 0 34px 60px -22px rgb(0 0 0 / 0.85)`): book covers, over a radial pool of projector light (`radial-gradient(closest-side, rgb(255 232 222 / 0.13), transparent)`).
- **Laid-over card** (`box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.8)`): the Books title card resting on the open-book photo (fill rose-card at 90%).
- **Screen hang** (`box-shadow: 0 40px 70px -40px rgb(22 19 15 / 0.7)`): the carbon quote card on the silver screen.
- **Vignettes:** film still and books opening carry radial-plus-linear gradient vignettes that fade into the next ground.

### Named Rules
**The Light Not Lift Rule.** Do not raise title cards with shadows. A card that sits over a photograph or a light ground may take one long, soft shadow; everything else stays flat.

## Shapes

Two shape families, never mixed. **Words are square:** title cards, buttons, chips, inputs, platform links, plates and badges have no radius. **Pictures are gated:** image frames have a 9px gate radius (4px for the inner keyline of an imageless frame), and the hero portrait and iris reveal are circles.

The signature form is the title-card frame: a 1px outer keyline, a second 1px keyline inset 7px, and a 11px diamond at each corner masked from the strong keyline colour. Buttons echo it with a 1px border plus a 1px outline offset 3px. The book-cover stand-in uses an outline inset 8px, and imageless frames an inner rule inset 8px. The hero portrait has a doubled ring (7px padding, inner ring inset 3px). The Writing disclosure chevron is a 7px rotated corner, and the prose section break is an asterism (⁂).

## Components

### Buttons
Tracked uppercase Jost on square plates, double-ruled like a title card.
- **Shape:** square (0px), 1px strong-keyline border plus a 1px keyline outline offset 3px; min height 46px; padding 12px 22px; 13px label at 0.14em.
- **Primary:** filled with the section ink, label in the section ground (silver on carbon, near-black on the silver screen). Hover lifts to Silver Lift on dark grounds and to pure black on the silver screen.
- **Secondary:** transparent with ink label. Hover adds an 8% silver wash and brings the border to full ink.
- **Pressed:** any button inverts to ink fill and ground-coloured label.
- **Focus:** 2px ink outline, offset 4px.
- **Ember (film only):** "Support the film" fills with ember, Ember Char label at weight 600, ember outline at 45%; hover lifts to Lit Ember; press goes silver.
- **Transitions:** background, colour and border over 0.25s on the house ease.

### Chips
- **Style:** square, 1px keyline, transparent, 12.5px tracked uppercase Jost in the section's second ink, with a smaller tabular count at 70% opacity.
- **State:** hover brings the strong keyline and full ink. Selected (`aria-pressed`) inverts to ink fill with a ground-coloured label.

### Platform links
Small square tags (7px 12px, 11.5px label) with an inline 13px icon for Read, Substack, Medium and similar. The Read tag is filled with ink; on hover it empties, while the others fill their border with ink.

### Cards / Containers (Title cards)
- **Corner Style:** square, with diamond corner units.
- **Background:** the section's card shade (carbon-card, night-card, rose-card, sepia-card; lit-card on the silver screen).
- **Shadow Strategy:** flat (see Elevation & Depth).
- **Border:** outer keyline plus an inner keyline inset 7px. Title cards proper (opening, film sidebar, reviews, About quote, newsletter, article head and subscribe band) add the four diamond corner units; section header cards carry the double keyline and the plate without diamonds.
- **Internal Padding:** about 34 to 56px vertical and 24 to 64px horizontal on section cards; 28 to 40px on sidebars; 30px 26px on review cards.
- **Grain:** cards that carry the voice of the screen (opening, film sidebar, Books opening card, About quote, newsletter, article head) add a 240px tiled grain that jumps position five times every 0.9s.

### Section plate
The label on a section card's bottom rule, like the plate on a reel can: 12px Jost at 0.24em in the second ink, on a ground-coloured patch (9px 18px) with a 1px keyline, centred and straddling the card's bottom edge. One per section card. It names the section in the nav's words and always sits below the heading, never above it.

### Film frame
An academy-ratio (4:3) image frame with a 9px gate, a gate-black fill and the gate shadow. Linked frames zoom the image to 1.035 on hover. A work or piece without an image gets a text frame instead: the card shade, an inner 1px keyline inset 8px with a 4px radius, and its title centred in italic IM Fell (24 to 34px).

### Inputs / Fields
- **Style:** the Writing search: square, 230px by 42px, card fill, 1px keyline, 15px Caslon, 16px search icon in the muted ink inset 14px.
- **Focus:** the border goes to full ink; keyboard focus adds the 2px ink outline offset 3px.

### Navigation
- **Style:** a sticky 64px carbon header at 82% opacity with a 10px blur, and a 1px rule at 14%. Wordmark in IM Fell English SC at 23px. Links in 12.5px Jost at 0.18em, Silver Dust, turning silver on hover. "Subscribe" is a bordered plate that inverts to silver on hover.
- **Reel progress:** a 2px silver strip on the header's bottom edge that scales from 0 to 1 with scroll.
- **Mobile:** below 760px a 24px three-line toggle opens a full-width stacked list with 14px links on 14% rules. Reading pages have no script and keep a short inline row (Writing and Subscribe).

### Status tag
For the film's status only: ember 1px border, carbon at 60%, ember 12px Jost at weight 600 and 0.2em, led by a 7px ember dot with a 4px ember halo at 18%.

### Laurels
A custom inline SVG laurel with a star (22 to 34px) in the current ink, set before award lines in the hero index, the film sidebar and screen works. Award lines are ruled lists in IM Fell or Jost. Festival and sponsor marks are shown only as the supplied logo images (the Gotham logo inverted to read on carbon).

### Iris reveal
Images (`.iris`) start as a closed circle and open to a full circle over 1.4s on the house ease as they enter the view. Without IntersectionObserver, or under reduced motion, they are simply shown.

## Do's and Don'ts

### Do:
- **Do** set a section's reel with one tint class and let components read the role variables (`--bg`, `--card`, `--ink`, `--ink-2`, `--muted`, `--frame`, `--frame-strong`).
- **Do** open every tinted section with a centred section card: double keyline, IM Fell heading, section plate on the bottom rule. Keep the diamond corner units for title cards that carry the screen's voice.
- **Do** put pictures in 4:3 gate frames (9px radius) with the gate shadow, and give imageless works a text frame instead of a placeholder graphic.
- **Do** show pressed and selected states by inverting ink and ground.
- **Do** dim sibling works to 50% when one is hovered or focused in a grid of works.
- **Do** keep motion on the house ease (`cubic-bezier(0.16, 1, 0.3, 1)`) and remove all transitions, animation and iris clipping under `prefers-reduced-motion`.
- **Do** keep award proof as laurel-marked lines next to the work they support.

### Don't:
- **Don't** use ember anywhere except the featured film's status and primary action.
- **Don't** round title cards, buttons, chips or inputs; the gate radius belongs to pictures only.
- **Don't** set a label, kicker or credit line above a heading; credits and plates sit below.
- **Don't** add a second lit section; the silver screen is About alone.
- **Don't** put colour filters or duotones on pictures. Images keep their own colours; a tint reaches a picture only as an edge vignette that fades it into its section's ground.
- **Don't** add shadows to title cards that sit flat on their own ground.
