# Meridian Airport — design specification (normative)

Derived from the reviewed homepage of the static prototype that preceded this app; its markup and CSS now live in `next/components` and `next/styles`, which are the source of truth for look, feel and branding. Every page must read as a page of THIS site. Where the catalogue (`system.md`) or any page disagrees with this spec, this spec wins and the catalogue gets corrected. Rules cite the homepage element that establishes them.

## 1. Brand character

Editorial and operational, like a well-set timetable: serif display headings over calm, ruled content; navy as the single brand anchor; photography full-bleed under navy gradients; information carried by rules, tables and typography — not by boxes. The site should feel printed, not "app-like". Nothing bounces, lifts or glows.

## 2. Type roles (established by: hero, section heads, board, towers, help list)

| Role | Face | Sizes (desktop → ≤900px) | Used for |
|---|---|---|---|
| Display | Source Serif 4 600 | 60→36 h1 · 48→30/32 section h2 · 44→30/26 band h2 · 36→26 board h2 · 28 tower title · 24 table caption | page + section headings, tower-scale titles |
| Component | Plus Jakarta Sans 700/800 | 44 city name · 24 help title · 22 card-scale title · 20 board time · 17 wait title · 15 sign title · 13 tower number | titles inside components, numerals, lockup |
| Body | Public Sans 400–700 | 19/17/16 body · 15/14 small · 13 meta · 12 uppercase micro-labels (ls .06–.12em) | everything else |

Serif is reserved for display; component titles are Plus Jakarta Sans; no third treatment. `tabular-nums` on every time, price and counter.

## 3. Surfaces and elevation (established by: hero search card, wait panel, parking form, map pane, towers, city cards)

The page is FLAT. There are exactly two planes:

1. **The page plane** — white or `--panel` bands, content organised by 1px rules (`--line` on white, `--rule-mid` for list/table rules). Zero border-radius, zero box-shadow. This is where ALL ordinary content lives: prose, tables, ruled lists, facts, accordions, forms, callouts, venue tables, role/release/contact groups.
2. **The floating plane** — an element overlapping a photo, dark band or the map pane. Only these may carry radius and shadow, and only these tokens:
   - over hero photo: radius 14, `--shadow-hero-card` (search card) / `--shadow-wait` (wait panel)
   - over photo band: radius 8, NO shadow (parking form card — note: even floating forms carry no shadow)
   - over the map pane: radius 8, `--shadow-map-card` (map info card, zoom chrome)
   - browser-overlay UI: the mobile menu sheet (`--shadow-card`)

**Forbidden everywhere** (the AI-slop markers): shadowed white cards on white/panel backgrounds; border-radius on content blocks, images or media in the page plane; hover `translateY` lifts; hover shadow changes; left-border accent strips; gradient washes outside the photo/tower overlays.

Boxed content in the page plane, when a box is genuinely needed (a form, a demonstration note), is a **flat block**: `--panel` or `--sand` background OR a 1px `--line` border — flush corners, no shadow.

## 4. Corner radii (complete law)

| Radius | Where (and nowhere else) |
|---|---|
| 0 | every content surface: blocks, media/photos in content, city cards, towers, rail buttons, tables, callouts |
| 2px | legend squares, status dots (squares) |
| 6px | inputs (board search included), secondary/ghost buttons, map overlay buttons |
| 8px | primary buttons, notice-bar controls, floating parking-form card, map info card |
| 10px | large buttons (hero search submit, wait chips) |
| 12px top | board folder tabs |
| 14px | hero-floating cards only (search card, wait panel) |
| 50% | radio visuals, live dots, station circle |

## 5. Interaction grammar (established by: towers, signs, city cards, buttons, tabs, accordion)

Hover is colour and underline, never motion of the element itself:
- Link surfaces (tower, ruled row, card-scale link): background shifts (`--tower-hover` on navy, `--panel` on white) and/or the TITLE gains an underline (`text-underline-offset` 3–4px).
- Buttons: background shift only (`--brand-hover`, `--panel`, `--white-wash`).
- Tabs/nav: border-bottom colour.
- Photography: image `scale(1.04)` inside its flush frame (city card) — disabled under reduced motion.
- Focus: 2px outline, brand on light, white inside `.on-dark`.

## 6. Colour roles

As `tokens.css`: navy `--brand` is the only brand colour; `--accent-blue` large-text subheadings only; dark-band set (`--board*`, `--on-dark-*`) for dark sections; status always dot/square + word; sand (`--sand`, `--sand-ink`) only for callout blocks and map accents. No new colours, no hex outside tokens.

## 7. Component vocabulary for inner pages (what to reach for, in order)

1. **Prose** under a serif heading (720px measure).
2. **Ruled list** (`help-list` grammar: icon + PJS title + body, 1px `--rule-mid` row rules) — for services, contact routes, who-to-contact, step lists.
3. **Table** (flat, uppercase 12px heads, 2px brand rule under the header row) — for venues, allowances, comparisons.
4. **Facts** (`dl`, uppercase terms) — for key figures, role fields.
5. **Accordion** (ruled `details`) — for FAQs.
6. **Flat block** (§3) — for forms and demonstration notes.
7. **Package card** (catalogue §7.7a) — for 2–4 priced products only: 1px `--brand` border, flush, no shadow; uppercase tier, 40px tabular price, ruled meta, tick list, bottom-pinned CTA (solid primary on at most one recommended tier, outline on the rest), flat navy badge.
8. **Tower / city-card / photo media** — flush photography with gradient text zones, where a page earns imagery.
A rounded shadowed "card" is never the answer in the page plane. Grids of blocks on white use 1px-bordered flat blocks or ruled columns, not floating panels.

## 8. Forms (established by: hero search card, parking form)

Field grammar exactly as the homepage: 12px uppercase or 13px/600 labels; hints under labels; inputs 48–50px, white, `--line-input` 1px border, radius 6; choice rows as ruled radio/checkbox lines (parking-form pattern); primary submit full-width in the block. On light pages the form sits in a flat block (§3, `--panel` preferred), max-width 720. The sand demonstration note is a flat sand block, flush, no accent border.

## 9. Imagery

Photography: full-bleed or flush-framed, cool/blue grade, under navy gradients when text sits on it; every hero-text asset passes `.venv/bin/python scripts/hero_contrast.py`. No rounded photo corners in the page plane. Illustration: schematic map language only (map tokens, labels ≥12px). Icons: 1.4–1.9 stroke outline SVGs, `currentColor`, no filled blobs, no emoji.

## 10. Rhythm

Bands: 96px block padding (48 narrow); sections 72px top (40 narrow); 1200px container, 40px gutters (20 narrow). Full-height feature bands (min-height 680–760) are a homepage device; inner pages use normal flow. One h1 per page in the sky page-hero with breadcrumb — except a page whose subject owns a homepage photo band, which may promote that band to its page hero (parking: photo band + stats + the floating booking form as `#quote`, h1 at the band's 44px serif scale, breadcrumb in its `--on-dark` colours, image `eager` + `fetchpriority=high` since it is that page's LCP).

## 11. Enforcement

`.card`'s radius/shadow/lift and rounded `.media` are v1 leftovers and non-compliant; they get flattened to §3/§4 and the catalogue's affected sections (§7.4 card, §7.1 media snippet, map-card scope) corrected to cite this spec. Any future component must name the homepage element or spec rule it derives from. Checks: the grep battery (no hex/comments/inline styles) plus: no `box-shadow` outside hero.css, map.css overlay, header.css menu sheet; no `border-radius` on content blocks beyond §4; no `translateY` in any hover.
