# Design: Robert M. Herzog (experiment05)

The locked system. Every Hallmark run reads this first and pages share it (the home page, the reading pages and the not-found page). Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: kept from experiment04 (restyle): banner, hero with the name beside the portrait, the film band, Screen & Stage, Books, Writing, About, Newsletter and Follow, footer
- Theme: Specimen (warm oat paper, razor-hairline Bodoni Moda over Geist, square 1px rules, one ink-blue signal)
- Axes: light/high-contrast-serif/cool · posture: restrained · modes: light and dark, following the OS setting

## Tokens
`tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(96.5% 0.016 82);  --color-paper-2: oklch(93.5% 0.02 80);  --color-paper-3: oklch(89% 0.024 78);
  --color-ink: oklch(17% 0.012 60);  --color-ink-2: oklch(28% 0.014 60);  --color-muted: oklch(49% 0.014 65);
  --color-rule: oklch(80% 0.018 75);  --color-rule-2: oklch(66% 0.02 72);
  --color-accent: oklch(45% 0.18 262);  --color-accent-ink: oklch(97% 0.012 82);  --color-focus: oklch(50% 0.18 262);
  --color-band: oklch(17% 0.012 60);  --color-band-ink: oklch(96.5% 0.016 82);  /* the film band, dark in both modes */
  --font-display: "Bodoni Moda", ui-serif, Georgia, serif;  --font-body: "Geist", ui-sans-serif, system-ui, sans-serif;
  --radius-card: 0;  --radius-pill: 0;  --rule-hair: 1px;  --shadow-card: none;
  --wrap: 1180px;  /* the content width of the kept layout */
  --display-optical: 96;  --display-optical-section: 32;  --display-optical-text: 18;
}
```
The dark-mode values, the spacing scale, the type scale, the easings and the durations live in `tokens.css`. `base.css` holds the scaffold's base rules, minus its `[data-slot]` image-placeholder rules: on this site `data-slot` marks the containers `app.js` fills.

## Type
- Display: Bodoni Moda 400, never bold. `"opsz" 96` only on the two poster heads, the name (`h1`) and the film title; `"opsz" 32` on section heads (`h2`), because at 72 to 96 commas read as full stops and hyphens vanish; `"opsz" 18` on the film logline; optical size following the size on `h3`. Italic only in running text: the hero line, quotes, subtitles.
- Body: Geist 400 at 17px, 500 for labels and controls. Reading pages set the prose in Geist at 18px, line height 1.7; blockquotes and poems stay in Bodoni Moda at 20px, optical size auto.
- Labels: Geist 500 a step smaller, sentence case, untracked, `--color-muted`. Parts of a meta line are spans parted by a hairline (`.meta-row`), never middle dots.

## Controls
- Primary: ink fill, paper text · square · 48px tall
- Secondary: 1px ink outline, transparent · same radius and height
- On the film band the system inverts: oat fill with ink text, oat hairline outlines.
- Filters: square cells inside one ink hairline; the pressed one keeps the paper with a 2px ink rule beneath.
- Links: ink text, 1px ink-blue underline at 0.18em that thickens to 2px on hover.

## Motion
- Character: still. Nothing arrives; only state changes (colour, underline, a 1px press). Under reduced motion everything ends at once.

## Exports
`tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request.
