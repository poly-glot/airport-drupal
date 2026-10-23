# Meridian Airport — delivery brief v2 (the contract every agent works from)

Read completely before touching anything. If something is wrong or missing, stop and report; do not improvise around it. v2 replaces the v1 comp wholesale: the homepage was redesigned (serif display type, photo bands, dark board, towers). The sitemap and copy deck largely survive; the visual system does not. Delete v1-only code — a v2 tree with v1 leftovers is a failed delivery.

## 1. What we are building

Demonstration website for **Meridian Airport**, a fictional airport in Birmingham. Audience: travellers. Tone: plain, practical, British English. Two stages in one repo: `static/` (complete, verified in Chrome, WCAG 2.2 AA) then an Umbraco port (devcontainer, Azure App Service F1 + free Azure SQL). The static tree IS the contract for the port.

## 2. Design source (v2 comp: homepage desktop 1440 × 6160, mobile 390)

Source lives outside the repo, never committed. Everything needed is below.

### 2.1 Layout anatomy (homepage, top to bottom)

1. **Travel notice bar** — unchanged shell (`#8A1C1C`, prev/next + "N of 3"), but each notice now has kind + short text + an action sentence starting "What to do: …" (bold-weight 600), and the bar link reads "Check my flight" → `/flights/index.html`.
2. **Header** — white, 76px. Lockup unchanged. Nav (15px/500): Flights, Shop, Parking, Lounges, Getting here, Assistance. Right: EN label, search button, **basket icon link** (aria-label "Basket, 0 items") → `/at-the-airport/shopping.html`, "Book parking" primary CTA → `/parking/index.html`, hamburger <900px.
3. **Hero** — full-bleed photo, `background-color: #14213D` fallback, cover, `center 40%`; gradient overlay `linear-gradient(90deg, rgba(10,21,41,.88) 0%, rgba(10,21,41,.62) 45%, rgba(10,21,41,.3) 100%)` (narrow: `180deg .66/0 .78/55% .92/100%`) — strengthened from the comp's .82/.55/.25 so bright skies keep headroom; min-height 720px; white text.
   **Sky variants:** the hero photo reflects time of day and weather. 12 assets at `assets/img/home/hero/{daypart}-{weather}-1440.{avif,webp,jpg}`, dayparts `morning|afternoon|evening|night`, weathers `sunny|cloudy|rainy` (night-sunny is a clear night). One camera setup across all 12: apron view through the terminal glass, dark window-frame left third, control tower right — only light and sky change. No-JS default (also the demo snapshot): `morning-rainy`. JS (`enhanceHeroSky`) picks the daypart from the local clock (05–11 morning, 12–16 afternoon, 17–20 evening, else night) and the weather from the demo default `rainy`, overridable for testing with `?sky=<daypart>-<weather>`; it swaps the picture sources, the daypart icon (morning/afternoon share the day icon), the condition word (sunny/clear, cloudy, light rain) with its temperature (18°C/14°C/12°C), and sets the date line from the real clock (en-GB). **Accessibility gate:** every shipped variant must pass `python3 scripts/hero_contrast.py` — it composites the exact CSS gradients over the asset and requires ≥4.5:1 for white text in the desktop text zone (x 5.5–47%, y 14–78%) and the narrow text zone (x 5–95%, y 8–60%), measured on 32px windows against the brightest window. A failing render is regenerated or darkened at the source, never fixed by weakening the gradient. Left column (max 560): weather block (cloud icon 30px + "12°C light rain" 17px/700 + "Saturday 3 October · 09:42 local" 13px `#DCE3EF`), h1 **Source Serif 4 600 60px/1.04** "Welcome to Meridian Airport", sub 19px `#E3E9F4` "Your gateway to 112 destinations. Check your flight, pre-book parking and reserve duty free to collect at the gate.", then three "sign" quick links (top border `rgba(255,255,255,.4)`, icon 22 + 15px/700 title + 13px `#DCE3EF` sub): Reserve duty free/Collect at your gate → shopping; Book parking/From £8.50 a day → parking; Fast Track/£7 · skip the queue → lounges. Right: white search card (radius 14, max-width 440, justify-end): tab row (bottom border) "Flight tracking" active + "Fast Track" and "Lounges" links; Departures/Arrivals radio pair; "When" select (Today, 3 October / Tomorrow, 4 October / Monday, 5 October); labelled search input ("Flight number, airline or city", placeholder "e.g. MA 204 or Lisbon"); primary "Search flights" button with plane icon; "Meeting someone? Go to live arrivals" text link → `/flights/index.html#arrivals`. Static form: GET to `/flights/index.html`.
4. **Security wait panel** — white card overlapping the hero bottom edge by 40px (absolute, bottom −40): "Security wait times · updated 09:42" with green dot, then chips: Terminal 1 → `#E3F3E6`/`#1E6B2E` "8 min" with clock icon; Terminal 2 → `#FBEFD1`/`#8A4A00` "22 min"; divider; "Roads and rail — Running normally". On mobile the panel is static below the hero.
5. **Live flights (dark board)** — section `#0B1529`, white text. Header row: h2 Source Serif 4 36px + meta line (`#AEB8CC` 14px, green dot `#7FD48F`) "Updated 09:42 · refreshes every minute · gates shown from 60 min before departure"; right: big clock 40px Plus Jakarta Sans 700 tabular "09:42" over "LOCAL TIME" 12px uppercase. Tab bar: full-width 1px rule `rgba(255,255,255,.3)`; folder tabs (56px, radius 12 12 0 0, border 1px, selected bg `#111D38` white text, unselected transparent `#AEB8CC`): Departures (take-off icon), Arrivals (landing icon). Panel bg `#111D38`: board search input (max 520, dark: bg `rgba(11,21,41,.6)`, border `rgba(255,255,255,.3)`, placeholder `#AEB8CC`); table (top border 2px `rgba(255,255,255,.35)`): TIME (20px PJS 700 tabular) / TO|FROM (17px 700 uppercase ls .06em) / FLIGHT / AIRLINE (code chip 28px `rgba(255,255,255,.12)` + name `#D5DCEA`) / TERMINAL / GATE|BAGS (18px 700 centre) / STATUS (15px 700 uppercase coloured + 13px `#AEB8CC` note line). Row borders `rgba(255,255,255,.12)`. Status colours on dark: On time/Landed `#7FD48F`, Boarding/Gate open `#FFFFFF`, Delayed `#F2B544`, Cancelled `#FF7B72`, Expected `#AEB8CC`. Footer row: legend (8px squares radius 2 + labels 13px `#AEB8CC`) and ghost button "All departures" (border `rgba(255,255,255,.45)`). No-JS: departures/arrivals as `:target` panels (both tables in markup); board search enhanced by JS only.
6. **Parking** — full-bleed photo (`home/parking` slot), bg colour `#0F1B33`, gradient `90deg rgba(6,12,26,.94)→.45`, min-height 720. Left (max 520): h2 serif 44 "Park at the terminal from £8.50 a day", sub 17px `#D5DCEA`, stats `dl` 3-col (top border): CLOSEST WALK/2 min, PICK-UP WAIT/10 min free, DROP-OFF/£3 (labels 12px uppercase `#AEB8CC`, values 24px PJS 700), underlined link "Compare all car parks and the map" → `/parking/index.html#compare`. Right: white form card (radius 8, max 460, padding 32): h3 22 "Book parking" + "Choose a car park, then your dates."; radio rows (top borders): P1 Short-stay/2 min walk · pick-up and drop-off/from £4 / hr; P2 Long-stay (checked)/5 min walk · covered/from £8.50 / day; Mid-Stay/8 min shuttle · 10 min free wait/from £12 / day; Arrive/Return **date inputs** (comp shows text DD/MM/YYYY placeholders; static uses `type="date"` per native-first rule); primary "Check prices and availability" (52px, radius 6); note "No payment until you confirm. Free cancellation up to 24 hours before arrival." Static form: GET to `/parking/index.html#quote`.
7. **Where we fly (`#explore`)** — white band, min-height 760. Head: h2 serif 48 two-tone: "Where we fly" in brand + block span "Find your next holiday" in `#5B7FB5` (large text only); link "View all 112 destinations" → `/flights/airlines.html#destinations`; right: counter "1 – 3 / 4" + square 44px prev/next buttons (border `#C5CCD8`, SHARP corners — no radius). Card rail: horizontal scroll, scroll-snap, cards 357×520 flush square corners, photo cover + bottom gradient `rgba(6,12,26,0)→.85`, meta 14px `#DCE3EF` + city name 44px PJS 700: Cairo/from £189 · 5h 10m · daily; New York/from £329 · 8h 05m · twice daily; Beijing/from £449 · 10h 30m · 4 a week; Singapore/from £479 · 13h 15m · daily. All cards → `/destinations/index.html`. Rail padding-left aligns to container (`max(40px, calc((100% - 1200px)/2 + 40px))`). Below: 3px progress bar (`#E6EAF0` track, brand fill) reflecting scroll. Buttons + progress are JS enhancements of native scroll; without JS the rail simply scrolls.
8. **Help for the day you fly (`#help`)** — `#F4F7FB`, h2 serif 48 + "All passenger services" link → `/help/index.html`. Six ruled items in a 3-col grid (two rows, top border `#C9D1DE` per row, final bottom rule): icon 30 + title 24px PJS 700 (underlines on hover) + body 16px `#3F4859` indented 44px. Items → special assistance; **travelling with children** (NEW page); **first time flying?** (NEW page); flight alerts; lost property (→ baggage page `#lost-property`); info and contacts (→ help index; body includes the phone number).
9. **At the airport** — white, h2 serif 48 + intro + "Terminal maps" link → `/at-the-airport/index.html#maps`. Four **towers**: min-height 520, flush corners, navy `#14213D`, hover `#1C2E58`; top row icon 40 + number "01…04" (13px 700 ls .1em `#AEB8CC`); bottom: serif 28 title + 15px `#D5DCEA` body + CTA (top border `rgba(255,255,255,.3)`): 01 Security and customs/What to expect → security page; 02 Eat and drink/Order ahead → eat-and-drink; 03 Baggage and lost property/Read more → baggage page; 04 Terminal maps/Open the map → at-the-airport `#maps`. **v2 addition requested by the user: each tower carries a photo** (`airport/tower-*` slots) as a cover image under a navy gradient overlay `linear-gradient(180deg, rgba(20,33,61,.62) 0%, rgba(20,33,61,.9) 70%)` so text stays ≥AA on the darkened zone; the hover state lightens the overlay top stop to `.5`.
10. **Getting here** — `#F4F7FB`, min-height 680, split: copy left (h2 serif 44, intro, three row-links separated by `#C9D1DE` rules with brand icons 26: By train/18 min from Central · lifts from platform to check-in; By car or taxi/Drop-off £3 at the door, or free for 10 min at Mid-Stay; By bus or coach/Routes, timetables and the coach station; then step-free note with lanyard icon). Right half: **map pane filling to the page edge** (absolute left 50%→right 0; mobile: static 380px tall): schematic SVG (viewBox 760×680, slice) — `#EEF1F5` ground, river band `#C9DBF2` (label "River Meridian" italic `#3D5E91`), green areas `#DCE8DC` ("Meridian Country Park"), building blocks `#E3E7EE`, village labels (fictional: "Marston End", "Hollin Rise"), runway diagonal `#D5DCE6` + white dashes + "RUNWAY 09/27", A45 road curve `#D5DCE6` with `#F2DDB2` core + A45 chips (`#F2DDB2` bg, `#5B4A1E` text), rail line `#9AA3B2` + white dashes, Terminal 1 block brand/Terminal 2 `#2E3F66` with white labels, P1/P2/Mid-Stay white chips with walk times, station circle + label, red map pin `#B3261E`. Overlaid: info card top-left (white, radius 8: "Meridian Airport"/"Terminal 1, Birmingham B99 1MA" + primary "Directions" → getting-here + ghost "Larger map" → `#maps` on at-the-airport); zoom + / − buttons (40px, decorative controls: `disabled` with aria-label noting the map is schematic — or omit; owner decides, catalogue records); caption "Map data · Terms" 12px. All map text ≥12px (comp's 8–11px labels are bumped; keep hierarchy).
11. **Footer** — brand navy. Grid `1.6fr repeat(4, 1fr)`: lockup col (enquiries line with phone + "Live chat in the app." + socials); **Flights**: Live departures, Live arrivals, Destinations → `/destinations/index.html`, Flight alerts; **Shop & relax**: Reserve & collect → shopping, Offers this week → shopping `#offers`, Lounges & Fast Track → lounges, Order-ahead food → eat-and-drink; **Plan**: Parking, Getting here, Special assistance, Travelling with children; **Company**: Contact us → help, Careers, Media centre, Sustainability. Legal bar unchanged (verbatim fiction line + Accessibility/Privacy/Cookies/Terms/Site map).

Section order on mobile in the comp swaps `#explore` before `#parking`; the static site keeps ONE DOM order (desktop's) — deliberate deviation, do not reorder with CSS.

States: notice carousel; board dep/arr tabs + search filter ("No flights match …" row); hero search radios/select; city rail scroll + buttons + progress; tower/card/row hovers; `[role=tab]:hover` white; `.board-row:hover rgba(255,255,255,.05)`; city-card img `scale(1.04)` on hover (kill under reduced motion).

Inner pages reuse: slim page hero (v1 pattern restyled: serif h1, sky panel or navy band — owner decides once, catalogue records), prose/tables/forms/cards restyled to v2 (serif headings, flush-corner accents where v2 uses them).

### 2.2 Typography

- Display: **Source Serif 4** 600 (`opsz,wght@8..60,600`) — h1/h2/tower titles. Numbers/labels: **Plus Jakarta Sans** 600/700/800 — big clock, times, city names, component titles. Body: **Public Sans** 400/500/600/700. One `css2` link with all three, `display=swap`.
- Scale (desktop → ≤900px): h1 60→36; section h2 48→30/32; board h2 36→26; parking/getting-here h2 44→30/26; tower title 28; help title 24; city name 44; clock 40; body 16–17; small 15/14/13; micro-labels 12 uppercase ls .06–.12em. Serif line-height ≈1.05–1.1, letter-spacing −0.01/−0.015em. `tabular-nums` on times, clock, prices, counters.

### 2.3 Colour tokens (v2; computed contrast)

Everything from v1 that survives: `--brand #14213D`, `--brand-hover #0B1529`, `--navy-2 #2E3F66`, `--ink #1A1F2B`, `--ink-muted #3F4859`, `--ink-faint #5B6472`, `--sky #E8F0FA` (page heroes only), `--panel #F4F7FB`, `--line #E6EAF0`, `--line-input #C5CCD8`, `--footer-link #C9CFDA`, `--notice #8A1C1C`, light-status set (`--ok #2E7D32`, warn `#B45309`/`#8A4A00`, bad `#B3261E`/`#9C1F19`, `--neutral-dot #9AA3B2`), `--sand #F6EEDC`/`--sand-mid #F2DDB2`/`--sand-ink #6E5420` (map + accents only).

New:
| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--board` | `#0B1529` | dark board section | `#AEB8CC` on it 9.13 |
| `--board-panel` | `#111D38` | tab panel, selected tab | `#AEB8CC` 8.38, `#D5DCEA` 12.14 |
| `--board-muted` | `#AEB8CC` | dark-band meta/unselected | AAA on both darks |
| `--board-text-2` | `#D5DCEA` | dark-band secondary text | 11.6 on brand |
| `--on-dark-sub` | `#E3E9F4` | hero sub | 10.76 on overlay |
| `--on-dark-meta` | `#DCE3EF` | hero/card meta | 10.17 on overlay |
| `--ok-dark` | `#7FD48F` | board on-time | 9.32 on panel |
| `--warn-dark` | `#F2B544` | board delayed | 9.13 |
| `--bad-dark` | `#FF7B72` | board cancelled | 6.63 |
| `--chip-ok-bg/fg` | `#E3F3E6`/`#1E6B2E` | wait chip | 5.70 |
| `--chip-warn-bg/fg` | `#FBEFD1`/`#8A4A00` | wait chip | 6.00 |
| `--accent-blue` | `#5B7FB5` | two-tone subheading | 4.08 — **large text (≥24px) only** |
| `--rule-mid` | `#C9D1DE` | ruled lists | decorative |
| `--tower-hover` | `#1C2E58` | tower hover | white 13+ |
| `--grey-2` | `#4B5362` | small labels (replaces some v1 faint uses) | 7.74 white / 7.20 panel / 6.83 map bg |
| `--map-bg` | `#EEF1F5`, river `#C9DBF2`, green `#DCE8DC`, blocks `#E3E7EE`, roads `#D5DCE6` | map fills | DECORATIVE |
| `--map-river-ink` | `#3D5E91` | river label (comp's `#5B7FB5` fails at 2.89) | 4.64 on river |
| `--a45-ink` | `#5B4A1E` | A45 chips | 6.45 on `#F2DDB2` |

Gradients (exact): hero `90deg rgba(10,21,41,.82)/0 .55/45% .25/100%`; parking `90deg rgba(6,12,26,.94)/0 .88/40% .62/70% .45/100%`; city-card & tower `180deg rgba(6,12,26,0) 45%, rgba(6,12,26,.85) 100%` (tower: navy variant above). White text sits only over the ≥.55 zones or the gradient-darkened lower third. Shadows: hero card `0 2px 6px rgba(5,14,40,.18), 0 24px 60px rgba(5,14,40,.35)`; wait panel `0 2px 6px rgba(5,14,40,.10), 0 16px 40px rgba(5,14,40,.18)`. Radii: cards/forms 14/8, buttons 6–10 — but city cards, towers, and explore nav buttons are FLUSH (0).

## 3. Brand

Unchanged from v1 and overriding the comp where they conflict: phone `0121 496 0123` (comp's `0121 000 0000` is NOT valid — replace), email `hello@meridianairport.example`, address `Meridian Airport, Skyline Way, Birmingham B99 1MA` (comp's "Meridian MR1 2AP" → replace with the Birmingham address), airlines **MA / NV / ZX (Azur Express) / KW (Kestrel)** (comp reverted to KL/AZ — re-apply substitutions), legal line verbatim, fictional-site disclaimer on legal pages. Map village names must be invented: "Marston End", "Hollin Rise" (the comp's names are real villages).

## 4. Sitemap and content model

Sitemap = v1's 27 pages **plus two**:

| Path | Title (h1) |
|---|---|
| `/help/travelling-with-children.html` | Travelling with children |
| `/help/first-time-flying.html` | First time flying? |

Nav targets (aria-current="page" on exact page, "true" on section): Flights → `/flights/index.html` (section: flights/*); Shop → `/at-the-airport/shopping.html`; Parking → `/parking/index.html`; Lounges → `/at-the-airport/lounges.html`; Getting here → `/getting-here/index.html`; Assistance → `/help/index.html` (section: help/*). Pages not in nav (about/*, legal, destinations, other at-the-airport pages) mark nothing. Footer per §2.1.11. Shopping page gains an `#offers` section ("Offers this week", 3 fictional offers).

Entity changes:
- **CarPark** — now THREE: P1 Short-stay (2 min walk · pick-up and drop-off, from £4/hr), P2 Long-stay (5 min walk · covered, from £8.50/day), Mid-Stay (8 min shuttle · 10 min free wait, from £12/day). "Long Stay Meadow" is deleted everywhere. Parking page restructures around these (quote form `#quote`, compare `#compare`, drop-off £3/pick-up/Blue Badge/EV/good-to-know survive, renumbered to 3 car parks; homepage stats 2 min / 10 min free / £3 must agree).
- **FlightRow** — gains `gate` (departures; "—" until shown) and `note` (e.g. "Closes 10:20", "New time 10:58 · fog", "Rebook at desk 14 or in app"); arrivals' gate column shows `Belt n`/"—" under header "Bags" with notes like "Exit: Arrivals A", "Expected 10:40". All 24 rows need gate/note values; the comp's 6+6 (with KW/ZX applied) stay verbatim.
- **Notice** — kind, text, action ("What to do: …"). Three comp notices verbatim.
- **WhereWeFly** (new) — city, priceFrom, duration, frequency, image: Cairo £189 5h 10m daily; New York £329 8h 05m twice daily; Beijing £449 10h 30m 4 a week; Singapore £479 13h 15m daily.
- **HelpItem** (new, 6) and **Tower** (4) — copy verbatim from §2.1.8/9.
- Everything else (Destination guides, FAQs, venues, roles, releases) survives.

## 5. Static site — rules

All v1 rules stand (no comments; alphabetical CSS properties; BEM; hex only in tokens.css; no inline style; one JS file; `:target` tabs; WCAG 2.2 AA list; root-relative URLs; titles/descriptions; `lang="en-GB"`; honest links; width/height on img) plus:

- **Cleanup is part of the job**: delete v1-only CSS components (illustrations, status strip, old pill tabs, old guide cards, sand card headers), v1-only partials content, and any class with zero users after the restyle. The unused-class scan must come back clean (documented exceptions: `.field__error`, `.media--flush`).
- JS (`site.js`): menu, notice carousel, board tabs (existing patterns) + NEW: board search filter (client-side row filter + "No flights match" row) and city-rail enhancement (prev/next buttons scroll by one card; progress bar from `scrollLeft`; counter updates). All function without JS (buttons hidden when no JS via `--enhanced` class pattern; rail scrolls natively).
- Images (photographic; `<picture>` AVIF→WebP→JPEG; width/height set; alt per register):
  - `assets/img/home/hero/{morning,afternoon,evening,night}-{sunny,cloudy,rainy}-1440.*` (1440×810; the §2.1.3 sky matrix, every one passing `scripts/hero_contrast.py`) and `assets/img/home/parking-1440.*` — used as `<img>` with `object-fit: cover` inside the band (not CSS background); decorative alt="" (text carries meaning).
  - `assets/img/cities/{cairo,new-york,beijing,singapore}-{714,1071}.*` — PORTRAIT 11:16 (714×1040, 1071×1560).
  - `assets/img/airport/tower-{security,eat-and-drink,baggage,maps}-{560,840}.*` — PORTRAIT 2:3 (560×840, 840×1260).
  - v1 survivors stay: `destinations/*-hero-*` (guide pages), `airport/{eat-and-drink,shopping,lounges}-hero-*` (page heroes), `about/*`. Delete nothing in `img/` that a page still references; delete anything nothing references.
- Maps: the §2.1.10 schematic SVG is the canonical site map (getting-here + restyled copies' language for terminal maps at `#maps`). All map text ≥12px. Zoom buttons: omit or mark decorative — catalogue records the decision.
- Destinations index: guide cards adopt the city-card photo style (flush corners, gradient, photo = existing guide heroes); the old flat-SVG scene cards are deleted.
- Local server: `python3 -m http.server 8788 -d static` (8765/8770/8771 belong to other projects — never touch).

## 6. Umbraco port — rules (phase 2, unchanged)

Umbraco 13 LTS, devcontainer, document types mirror §4, templates reproduce `static/` 1:1, idempotent seed from `docs/copy/`, F1 constraints (no always-on, output caching). Anti-forgery cookie name `mer_form`.

## 7. Working agreements and ownership

As v1 (read brief + catalogue first; page agents write no CSS; copy verbatim from the deck; report with evidence; respect ownership):

| Owner | Paths |
|---|---|
| copy agent | `docs/copy/**` |
| design-system agent | `static/assets/css/**`, `static/assets/js/**`, `static/assets/logo.svg`, `static/favicon.svg`, `static/index.html`, `static/partials/**`, `docs/design/system.md` |
| pages-core agent | `static/flights/**`, `static/parking/**`, `static/getting-here/**` |
| pages-airport agent | `static/at-the-airport/**`, `static/destinations/**` |
| pages-corporate agent | `static/help/**`, `static/about/**`, `static/{accessibility,privacy,cookies,terms,sitemap}.html` |
| imagery agent | `static/assets/img/**`, `docs/imagery.md` |
