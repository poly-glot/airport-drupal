# Meridian Airport: design system catalogue (v2)

> Written for the agents that built the static prototype. The snippets and image table describe the design vocabulary `next/components` implements. Components are CSS modules, so apart from the utilities and the button, text-link and status families the class strings in the page are hashed local names (`.notice-bar__item` here is `styles.item` in `notice-bar/index.module.css`). The page-building instructions (partials to paste, `html-validate`, the local static server) describe that retired prototype; components are now written as in `docs/components.md`.

This is the only component reference for `static/`. Page agents copy the snippets **verbatim** and change only text, `href`, `id`, image slot names and data rows. The homepage `/index.html` is the live reference for every homepage component. **`docs/design/spec.md` is the normative design law derived from that homepage — read it first; where a snippet here and the spec disagree, the spec wins.** The short version: the page plane is flat (rules, not boxes; zero radius, zero shadow); radius and shadow exist only on elements floating over photo, dark or map surfaces; hover is colour and underline, never lift or shadow.

**Page agents may not write CSS.** No `<style>`, no `style=""`, no new class names, no new files under `static/assets/`. If a page needs something this catalogue does not cover, build it from the components below as closely as you can and list the gap in your final report. The design-system owner fixes all gaps in one pass.

House rules, repeated from the brief:

- No comments in any file (HTML, CSS, JS, SVG).
- Root-relative URLs only (`/flights/index.html`, never `../`). Never `href="#"`. In-page anchors are fine.
- One `h1` per page, no skipped heading levels: page `h1`, section `h2`, card/item `h3`. The footer's column headings are `h2`, valid after any level.
- Every `img` has `width` and `height`. Every SVG is `role="img"` + `aria-label` (informative) or `aria-hidden="true"` (decorative).
- Status is never colour alone: a coloured word (board) or a dot **and** a word (light pages).
- Figures that line up (times, prices, counters) use `.u-tabular` unless the component already sets it.
- Headings: `h1`/`h2` are Source Serif 4 600 by default; `h3`/`h4` are Plus Jakarta Sans 700. Body is Public Sans.

## 1. Files and breakpoint

| What | Where |
|---|---|
| Tokens (colours, gradients, shadows, radii, fonts, gutter) | `/assets/css/base/tokens.css` (the only file with hex) |
| Reset, focus, skip link, `[hidden]`, `.visually-hidden`, `.on-dark` / `.on-light`, reduced motion | `/assets/css/base/base.css` |
| `.container`, `.section`, `.band`, `.grid`, `.split`, `.stack`, `.narrow` | `/assets/css/base/layout.css` |
| Components | `/assets/css/components/*.css` |
| The single stylesheet link | `/assets/css/site.css` (`@import`s everything above) |
| The only script | `/assets/js/site.js` (`defer`, in `<head>`) |
| Logo mark / favicon | `/assets/logo.svg`, `/favicon.svg` |
| Canonical partials | `/partials/header.html`, `/partials/footer.html` |

One breakpoint: **900px**. Wide is `width > 900px` (desktop artboard 1440), narrow is `width <= 900px` (mobile artboard 390). Gutter is 40px wide, 16px narrow (`--gutter`).

Everything works without JavaScript. `site.js` enhances these: the mobile menu, the notice carousel, tabs, the board search filter, the split-flap board, status tooltip dismissal, the city-rail buttons/counter/progress and the hero sky.

## 2. Page shell (copy exactly)

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PAGE TITLE — Meridian Airport</title>
    <meta name="description" content="META DESCRIPTION">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600&amp;family=Plus+Jakarta+Sans:wght@600;700;800&amp;family=Public+Sans:wght@400;500;600;700&amp;display=swap">
    <link rel="stylesheet" href="/assets/css/site.css">
    <script src="/assets/js/site.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
PASTE /partials/header.html HERE
<main id="main" tabindex="-1">
    PAGE CONTENT
</main>
PASTE /partials/footer.html HERE
</body>
</html>
```

The notice bar (§7.14) is homepage-only. If a page ever uses it, it goes between the skip link and the header.

## 3. Header and footer paste rules

Paste `static/partials/header.html` and `static/partials/footer.html` byte for byte. The only permitted edit is adding **one** `aria-current` attribute to the header, from this table. Never add `aria-current` in the footer.

| Page | Element that gets it | Attribute |
|---|---|---|
| `/index.html` | `<a class="header__brand" …>` | `aria-current="page"` |
| `/flights/index.html` | header link "Flights" | `aria-current="page"` |
| `/flights/airlines.html`, `/flights/alerts.html` | "Flights" | `aria-current="true"` |
| `/at-the-airport/shopping.html` | "Shop" | `aria-current="page"` |
| `/parking/index.html` | "Parking" | `aria-current="page"` |
| `/at-the-airport/lounges.html` | "Lounges" | `aria-current="page"` |
| `/getting-here/index.html` | "Getting here" | `aria-current="page"` |
| `/help/index.html` | "Assistance" | `aria-current="page"` |
| `/help/special-assistance.html`, `/help/baggage-and-lost-property.html`, `/help/travelling-with-children.html` (new), `/help/first-time-flying.html` (new) | "Assistance" | `aria-current="true"` |
| `/at-the-airport/index.html`, `/at-the-airport/security.html`, `/at-the-airport/eat-and-drink.html`, `/destinations/**`, `/about/**`, `/accessibility.html`, `/privacy.html`, `/cookies.html`, `/terms.html`, `/sitemap.html` | none | none |

Add it as the last attribute, e.g. `<a class="header__link" href="/help/index.html" aria-current="true">Assistance</a>`. CSS underlines any header link with `aria-current`.

What the partials contain:

- **Header** (white, 76px; 60px narrow). Brand link; `nav#site-menu` "Main" with Flights, Shop, Parking, Lounges, Getting here, Assistance; an "EN" language marker (static text, not a control; hidden narrow and at 901–1180px); search icon → `/sitemap.html`; basket icon → `/at-the-airport/shopping.html` (`aria-label="Basket, 0 items"`); "Book parking" → `/parking/index.html` (hidden narrow); the menu toggle `a.header__menu-toggle[href="#site-menu"]`. Without JS the toggle opens the menu through `:target`; with JS it becomes `role="button"` + `aria-expanded`, Escape closes it.
- **Footer** (`footer.on-dark`, brand navy). Grid `1.6fr repeat(4, 1fr)`: lockup + enquiries line (`tel:+441214960123`, "Live chat in the app.") + four external social links; nav columns Flights, Shop &amp; relax, Plan, Company; legal bar with the fiction line and Accessibility / Privacy / Cookies / Terms / Site map. At 901–1100px the lockup spans a row above the four columns; narrow it is a 2×2 grid of columns under the lockup.

## 4. Anchors other pages link to (must exist)

| Page | Required `id`s |
|---|---|
| `/flights/index.html` | `departures`, `arrivals` (the two `.tabs__panel`s) |
| `/flights/airlines.html` | `destinations` |
| `/parking/index.html` | `quote` (booking form), `compare` |
| `/getting-here/index.html` | `train`, `car`, `bus` |
| `/at-the-airport/index.html` | `maps` |
| `/at-the-airport/shopping.html` | `offers` |
| `/help/index.html` | `faqs`, `feedback` |
| `/help/baggage-and-lost-property.html` | `lost-property` |

## 5. Layout primitives

```html
<section class="section container" aria-labelledby="SECTION-ID">
    <div class="split split--main-aside">
        <div class="stack stack--lg">…main column…</div>
        <div class="stack">…aside…</div>
    </div>
</section>
<section class="section section--last container" aria-labelledby="SECTION-ID-2">
    <div class="grid grid--2">…cards…</div>
</section>
```

| Class | Effect |
|---|---|
| `.container` | max-width 1200, side padding `--gutter` |
| `.section` | top padding 72 wide / 40 narrow. Add `.section--last` to the final section before the footer (bottom padding 96 / 48) |
| `.band` | full-bleed section with 96 / 48 vertical padding; put `.container` on its child. `.band--panel` tints it `--panel` (`#F4F7FB`) |
| `.stack`, `.stack--lg` | vertical flex, gap 16 / 28 |
| `.grid` + `.grid--2` / `.grid--3` | auto-fit grids (min column 360 / 280), gap 24 |
| `.split` | two equal columns, gap 64, centred. One column narrow. `.split--main-aside` makes it 2fr / 1fr, gap 40, top-aligned |
| `.narrow` | max-width 720. Put it on a `card--padded` holding a form in a stacked section so forms never span the full container |
| `.u-tabular` | tabular numerals |
| `.visually-hidden` | screen-reader-only text |

Card grids are `div`s whose children are the card links. Do not wrap them in `ul`/`li`.

### 5.1 Focus on dark surfaces

The default focus ring is 2px brand navy, offset 2. Any dark surface (navy, board, photo band) gets the class **`on-dark`** on its outermost element: every focus ring inside becomes **white**. A white card sitting inside a dark surface gets **`on-light`** to switch back to brand. The homepage uses `on-dark` on the notice bar, hero, board, parking band and footer, and `on-light` on the search card, wait panel and parking form. Focus rings on towers and city cards stay brand because they sit on white.

## 6. Tokens worth knowing

`--brand #14213D`, `--brand-hover #0B1529`, `--ink #1A1F2B`, `--ink-muted #3F4859`, `--grey-2 #4B5362` (small labels), `--sky #E8F0FA` (page heroes only), `--panel #F4F7FB`, `--line #E6EAF0`, `--rule-mid #C9D1DE` (ruled lists), `--board #0B1529`, `--board-panel #111D38`, `--board-muted #AEB8CC`, `--board-text-2 #D5DCEA` (inside `.board` these are overridden to the black split-flap theme in `board.css`), `--accent-blue #5B7FB5` (**large text ≥24px only**, 4.08:1), `--map-river-ink #3D5E91`. The full set, gradients and shadows are in `tokens.css`. Radii: cards and forms 8 (`--radius-form`), hero/wait cards 14, buttons 8, inputs 6; city cards, towers and rail buttons are **flush (0)**.

## 7. Components

### 7.1 Page hero (inner pages)

**Decision:** inner pages use the **sky panel** (`--sky`) with a serif brand `h1`, not a navy band. Every inner page opens `main` with it; its `h1` is the page's only `h1`. Eyebrow and breadcrumb are optional.

```html
<section class="page-hero" aria-labelledby="page-title">
    <nav class="breadcrumb container" aria-label="Breadcrumb">
        <ol class="breadcrumb__list">
            <li class="breadcrumb__item"><a class="breadcrumb__link" href="/index.html">Home</a></li>
            <li class="breadcrumb__item"><a class="breadcrumb__link" href="/help/index.html">Assistance</a></li>
            <li class="breadcrumb__item" aria-current="page">Travelling with children</li>
        </ol>
    </nav>
    <div class="page-hero__inner container">
        <div class="page-hero__content">
            <p class="page-hero__eyebrow">Assistance</p>
            <h1 class="page-hero__title" id="page-title">Travelling with children</h1>
            <p class="page-hero__intro">One or two sentences from the copy deck.</p>
        </div>
    </div>
</section>
```

With a photo, add `page-hero--with-art` and put the picture snippet (§8, "page hero") after `.page-hero__content`:

```html
<section class="page-hero page-hero--with-art" aria-labelledby="page-title">
    <div class="page-hero__inner container">
        <div class="page-hero__content">…</div>
        <picture>
            <source type="image/avif" srcset="/assets/img/airport/lounges-hero-960.avif 960w, /assets/img/airport/lounges-hero-1440.avif 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 491px">
            <source type="image/webp" srcset="/assets/img/airport/lounges-hero-960.webp 960w, /assets/img/airport/lounges-hero-1440.webp 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 491px">
            <img class="media" src="/assets/img/airport/lounges-hero-960.jpg" srcset="/assets/img/airport/lounges-hero-960.jpg 960w, /assets/img/airport/lounges-hero-1440.jpg 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 491px" width="1440" height="960" alt="ALT FROM docs/imagery.md" loading="eager" fetchpriority="high" decoding="async">
        </picture>
    </div>
</section>
```

`h1` is serif 52 wide / 36 narrow.

### 7.2 Section heading

```html
<div class="section-head">
    <div class="section-head__titles">
        <h2 class="section-title" id="SECTION-ID">At the airport</h2>
        <p class="section-head__intro">Everything between the door and the gate.</p>
    </div>
    <a class="text-link" href="/at-the-airport/index.html#maps">Terminal maps<svg class="text-link__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
</div>
```

| Title class | Size wide / narrow | Use |
|---|---|---|
| `section-title` | 48 / 32 | homepage bands |
| `section-title section-title--md` | 44 / 30 | split bands (parking, getting here) |
| `section-title section-title--sm` | 32 / 26 | inner-page section `h2`s |
| `section-title--brand` | brand colour | two-tone titles |

Two-tone title (the sub line is `--accent-blue`, large text only):

```html
<h2 class="section-title section-title--brand" id="explore-title">Where we fly<span class="section-title__sub">Find your next holiday</span></h2>
```

`.section-title` stands alone as an `h2` without the wrapper. Without the intro, put the `h2` directly in `.section-head` (as the homepage help band does).

### 7.3 Buttons and links

| Class | Look |
|---|---|
| `button` | 44px brand, radius 8 (header CTA, map "Directions") |
| `button button--lg` | 52px, radius 6, 700 (form submits) |
| `button--block` | full width |
| `button--secondary` | white, `--line-input` border, ink text |
| `button--ghost` | transparent, white text, translucent white border — **dark surfaces only** |
| `icon-button` | 44px square icon link/button; always needs `aria-label` |
| `text-link` | 16px/600 link, 44px target, underline on hover; add `text-link__icon` SVG |
| `text-link--underline` | permanently underlined, 700 |
| `text-link--on-dark` | white, for dark surfaces |
| `text-link--sm` | 14px, 24px target |

Arrow icon (section links): `<svg class="text-link__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>`. Chevron (inline/board): `<svg class="text-link__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg>`.

Use links styled `.button` for navigation and `<button type="submit">` for forms.

### 7.4 Card and form card

```html
<section class="card card--padded narrow" aria-labelledby="CARD-ID">
    <div class="card__head">
        <h2 class="card__title" id="CARD-ID">Book parking</h2>
        <p class="card__text">Choose a car park, then your dates.</p>
    </div>
    …content…
</section>
```

`.card` is a FLAT block per spec §3: white, 1px `--line` border, flush corners, no shadow. `.card--padded` adds 32 padding (20 narrow) and an 18 gap. `.card__title` is 22px Plus Jakarta Sans; use `h3` when the card sits under a section `h2`. Reach for a ruled list, table, facts or accordion before a block (spec §7); a block is for forms and self-contained groups only. There is no whole-card link block: link surfaces are towers, guide cards and ruled row links (spec §5).

A form can be the card itself: `<form class="card card--padded form" …>` (the homepage parking form).

### 7.5 Forms and fields

```html
<form class="card card--padded form narrow" id="quote" action="/parking/index.html#quote" method="get" aria-labelledby="quote-title">
    <div class="card__head">
        <h2 class="card__title" id="quote-title">Book parking</h2>
        <p class="card__text">Choose a car park, then your dates.</p>
    </div>
    <p class="form__note">This is a demonstration form for a fictional airport. Please do not enter real personal details. Nothing you type is sent anywhere.</p>
    <fieldset class="fieldset">
        <legend class="fieldset__legend">Car park</legend>
        <label class="choice"><input class="check__input" type="radio" name="carpark" value="p1"><span class="choice__text"><span class="choice__title">P1 Short-stay</span><span class="choice__meta">2 min walk · pick-up and drop-off</span></span><span class="choice__price">from £4 / hr</span></label>
        <label class="choice"><input class="check__input" type="radio" name="carpark" value="p2" checked><span class="choice__text"><span class="choice__title">P2 Long-stay</span><span class="choice__meta">5 min walk · covered</span></span><span class="choice__price">from £8.50 / day</span></label>
        <label class="choice"><input class="check__input" type="radio" name="carpark" value="mid-stay"><span class="choice__text"><span class="choice__title">Mid-Stay</span><span class="choice__meta">8 min shuttle · 10 min free wait</span></span><span class="choice__price">from £12 / day</span></label>
    </fieldset>
    <div class="field-grid form__rule">
        <div class="field"><label class="field__label field__label--caps" for="arrive">Arrive</label><input class="field__input" id="arrive" name="arrive" type="date"></div>
        <div class="field"><label class="field__label field__label--caps" for="return">Return</label><input class="field__input" id="return" name="return" type="date"></div>
    </div>
    <div class="field">
        <label class="field__label" for="email">Email address <span class="field__marker">(required)</span></label>
        <p class="field__hint" id="email-hint">We only use this to send your alerts.</p>
        <input class="field__input" id="email" name="email" type="email" autocomplete="email" aria-describedby="email-hint" required>
    </div>
    <div class="field">
        <label class="field__label" for="message">Message <span class="field__marker">(optional)</span></label>
        <textarea class="field__input field__input--multiline" id="message" name="message" rows="5"></textarea>
    </div>
    <div class="field">
        <label class="field__label" for="terminal">Terminal</label>
        <select class="field__input" id="terminal" name="terminal"><option value="t1">Terminal 1</option><option value="t2">Terminal 2</option></select>
    </div>
    <div class="field">
        <label class="field__label" for="q">Flight number, airline or city</label>
        <div class="field__control">
            <svg class="field__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>
            <input class="field__input field__input--with-icon" id="q" name="q" type="search" placeholder="e.g. MA 204 or Lisbon">
        </div>
    </div>
    <fieldset class="fieldset fieldset--inline">
        <legend class="fieldset__legend">How should we contact you?</legend>
        <label class="check"><input class="check__input" type="radio" name="channel" value="text" checked>Text message</label>
        <label class="check"><input class="check__input" type="radio" name="channel" value="whatsapp">WhatsApp</label>
    </fieldset>
    <label class="check"><input class="check__input" type="checkbox" name="consent" value="yes">Send me gate changes</label>
    <div class="form__actions">
        <button class="button button--lg" type="submit">Check prices and availability</button>
        <a class="text-link" href="/help/index.html">Contact us instead</a>
    </div>
    <p class="form__small">No payment until you confirm. Free cancellation up to 24 hours before arrival.</p>
</form>
```

- Inputs are 48px, radius 6 (`field__input--soft` makes radius 10, the hero search card style). `field__input--dark` is the dark-board input (only inside `.board`).
- `field__label` is 13px/600; `field__label--caps` is the 12px uppercase micro label used in the booking card.
- `.choice` is a ruled radio row (title, meta, right-aligned price). `.fieldset--inline` lays radios in a row.
- `.form__rule` puts a top rule and 18px padding above a block. `.form__small` is the 13px grey note under a submit.
- Errors: add `aria-invalid="true"` and a `<p class="field__error" id="…-error">` referenced from `aria-describedby`.
- Every input has a visible `label`. Repeated labels ("Time") get visually-hidden context. Dates are `type="date"` (native-first; the comp's DD/MM/YYYY text fields are deliberately not copied).

### 7.6 Dark board with tabs (`:target` pattern)

The homepage board is the reference: copy `section.board` from `/index.html`. On `/flights/index.html` drop `board--overlapped` (that modifier only adds the 104px top padding needed under the hero's wait panel), keep panel ids `departures` and `arrivals`, give the board a heading that differs from the page `h1` ("Departures and arrivals"), extend each `tbody` to the 12 rows in `docs/copy/data.md`, and drop the `.board__foot` ghost button (it would point at the same page) but keep the legend.

```html
<section class="board tabs on-dark" id="live-flights" aria-labelledby="board-title">
    <div class="board__head container">
        <div class="board__titles">
            <h2 class="board__title" id="board-title">Departures and arrivals</h2>
            <p class="board__meta"><span class="board__dot"></span><span>Updated <span class="board__updated">09:42</span> · refreshes every minute · gates shown from 60 min before departure</span></p>
        </div>
        <p class="board__clock"><span class="board__clock-time" data-flap="5">09:42</span><span class="board__clock-label">Local time</span></p>
    </div>
    <div class="board__tabbar">
        <div class="tabs__list container" data-tabs-label="Flight board">
            <a class="tabs__tab" href="#departures"><svg class="tabs__tab-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M4 15l16-5-3-5-5 2-5-4-2 1 3 5-4 1-2-2-2 1z"></path></svg>Departures</a>
            <a class="tabs__tab" href="#arrivals"><svg class="tabs__tab-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M4 11l16 5 1-5-5-2-3-6-2-1v6l-4-1-1-3-2 1z"></path></svg>Arrivals</a>
        </div>
    </div>
    <div>
        <div class="tabs__panel board__panel" id="departures" tabindex="-1">
            <div class="board__body container">
                <div class="board__search">
                    <label class="visually-hidden" for="departures-search">Search departures by flight or city</label>
                    <div class="field__control">
                        <svg class="field__icon board__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>
                        <input class="field__input field__input--with-icon field__input--dark" id="departures-search" type="search" placeholder="Search departures by flight or city" autocomplete="off">
                    </div>
                </div>
                <section class="board__scroll" aria-label="Departures board" tabindex="0">
                    <table class="board__table">
                        <caption class="visually-hidden">Departures</caption>
                        <thead>
                            <tr><th scope="col">Time</th><th scope="col">To</th><th scope="col">Flight</th><th scope="col">Terminal</th><th scope="col">Gate</th><th scope="col">Status</th><th scope="col">Info</th></tr>
                        </thead>
                        <tbody>
                            <tr class="board__row"><td class="board__time"><span class="flap-lamp flap-lamp--info" aria-hidden="true"></span><span data-flap="5">10:05</span></td><td class="board__place" data-flap="9">Lisbon</td><td class="board__flight" data-flap="7">MA 204</td><td class="board__terminal" data-flap="2">T1</td><td class="board__gate" data-flap="2">12</td><td class="board__status"><span class="board__state board__state--info" data-flap="9">Boarding</span></td><td class="board__info">Closes 10:20</td></tr>
                            <tr class="board__row"><td class="board__time"><span class="flap-lamp flap-lamp--ok" aria-hidden="true"></span><span data-flap="5">11:10</span></td><td class="board__place" data-flap="9">Dublin</td><td class="board__flight" data-flap="7">MA 522</td><td class="board__terminal" data-flap="2">T1</td><td class="board__gate" data-flap="2" data-flap-label="Not shown yet">—</td><td class="board__status"><span class="board__state board__state--ok" data-flap="9">On time</span></td><td class="board__info">Gate at 10:10</td></tr>
                        </tbody>
                    </table>
                </section>
                <div class="board__foot">
                    <ul class="board__legend">
                        <li class="board__legend-item"><span class="board__swatch board__swatch--ok"></span>On time / landed</li>
                        <li class="board__legend-item"><span class="board__swatch board__swatch--info"></span>Boarding / gate open</li>
                        <li class="board__legend-item"><span class="board__swatch board__swatch--warn"></span>Delayed</li>
                        <li class="board__legend-item"><span class="board__swatch board__swatch--bad"></span>Cancelled</li>
                    </ul>
                    <a class="button button--ghost" href="/flights/index.html#departures">All departures<svg class="text-link__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg></a>
                </div>
            </div>
        </div>
        <div class="tabs__panel board__panel" id="arrivals" tabindex="-1">… same, ids "arrivals-search", caption "Arrivals", headings "From" and "Belt", belt cells "3" or the "—" pattern …</div>
    </div>
    <p class="visually-hidden" role="status" data-flap-announcer></p>
</section>
```

| Status word | `board__state--…` |
|---|---|
| On time, Landed | `ok` (green) |
| Boarding, Gate open | `info` (white) |
| Expected | `neutral` (muted) |
| Delayed | `warn` (amber) |
| Cancelled | `bad` (red) |

Words are uppercase and the legend stays: status is never colour alone. The row lamp (`flap-lamp--{tone}`) uses the same tone as the status. Leave `board__info` empty when there is no note. A gate/belt value of "—" always carries `data-flap-label="Not shown yet"`.

**Split-flap contract:** any element with `data-flap="N"` becomes N flip tiles (Oswald 500, `aria-hidden`) plus a visually hidden copy of its text, or of `data-flap-label` when set; without JS the plain text shows. Widths: time and clock 5, place 9, flight 7, terminal and gate/belt 2, status 9. On load, and whenever a tab panel is shown, the visible board flips in from blank. `BOARD_EVENTS` in `site.js` then plays a scripted sequence of five updates, 6s apart, each advancing the clock a minute and announcing the change through `[data-flap-announcer]` when its panel is visible. `prefers-reduced-motion: reduce` swaps characters without animating. On `/flights/` the status spans also carry `tabindex="0"`, `data-tip` and `aria-describedby="status-…"` pointing at the "What the status means" definitions, and a state change rewires both from that definition.

**Tabs contract** (any `.tabs`): the root has `.tabs`; it contains `.tabs__list` with `a.tabs__tab[href="#PANEL-ID"]` children, and one wrapper `div` whose **direct children** are the `div.tabs__panel[id][tabindex="-1"]` elements, in tab order. At most 4 tabs, never nested. Without JS, panels are hidden, `:target` shows the targeted one, and with no target the first shows; the selected tab is matched by position. With JS, `site.js` adds `.tabs--enhanced`, `role="tablist|tab|tabpanel"`, `aria-selected`, roving `tabindex`, Left/Right/Home/End/Space, `hidden` on inactive panels, honours the hash, and `data-tabs-label` becomes the tablist's `aria-label`. Tabs are styled as dark folder tabs and only belong inside `.board`.

**Board search** (JS only): `.board__search` is hidden until `site.js` adds `.board--enhanced`. Typing filters that panel's rows by place, flight, airline (incl. code) and terminal, appends a "No flights match "…" on the departures board. Try the flight number (e.g. MA 204) or the city." row when nothing matches, and announces the result in a `role="status"` region.

Narrow: the table keeps its columns and scrolls sideways inside `.board__scroll` (min-width 720); the scroll region is focusable and labelled.

### 7.7 Photo band (parking)

Full-bleed photo under the parking gradient, content left, form card right. Copy `section.photo-band` from `/index.html`; on inner pages keep its structure with a different `h2` and form.

### 7.7a Package cards (priced products)

Live reference: `/parking/index.html` `#compare`. For a set of 2–4 priced products (car parks; lounges or Fast Track if ever productised): `grid grid--3` of `.package` — 1px `--brand` border (the board's brand-rule grammar), flush corners, no shadow. Anatomy, top to bottom: optional `p.package__badge` ("Recommended", flat navy tag centred on the top border) on ONE card at most; `h3.package__tier` (uppercase 13px ls .12em); `p.package__price` (`package__unit` "From" + `package__amount` 40px PJS 700 tabular + `package__unit` "per hour/day"); `p.package__meta` (ruled top); `ul.package__list` of `package__item`s with the brand `package__tick` check SVG; `p.package__best` (uppercase `package__best-label` + text); `p.package__cta` with a `button button--block` — `button--secondary` outline on standard tiers, solid primary on the recommended tier only. CTA is pinned to the card bottom (`margin-top: auto`), so cards in a row keep equal heights. A `p.package__note` reassurance line sits under the grid. Copy comes from the deck's per-product fields verbatim.

**Page-hero variant** (spec §10; live reference `/parking/index.html`): a page whose subject owns a homepage photo band promotes it to the page hero. Add `photo-band--hero`; put the breadcrumb (`breadcrumb breadcrumb--on-dark`) first inside `photo-band__content`; the h1 carries `section-title section-title--md photo-band__title`; the front-matter intro is the `photo-band__lede`; keep the stats `dl`; the floating form card carries the page's `#quote`-style anchor and `photo-band__form` (radius 8, no shadow — the floating-plane grant); the band image is that page's LCP, so `loading="eager" fetchpriority="high"`.

```html
<section class="photo-band on-dark" id="parking" aria-labelledby="parking-title">
    <picture class="photo-band__media">
        <source type="image/avif" srcset="/assets/img/home/parking-1440.avif 1440w" sizes="100vw">
        <source type="image/webp" srcset="/assets/img/home/parking-1440.webp 1440w" sizes="100vw">
        <img class="photo-band__img" src="/assets/img/home/parking-1440.jpg" srcset="/assets/img/home/parking-1440.jpg 1440w" sizes="100vw" width="1440" height="810" alt="" loading="lazy" decoding="async">
    </picture>
    <div class="photo-band__inner container">
        <div class="photo-band__content">
            <h2 class="section-title section-title--md photo-band__title" id="parking-title">Park at the terminal from £8.50 a day</h2>
            <p class="photo-band__lede">Lede.</p>
            <dl class="stats">
                <div class="stats__item"><dt class="stats__label">Closest walk</dt><dd class="stats__value">2 min</dd></div>
                <div class="stats__item"><dt class="stats__label">Pick-up wait</dt><dd class="stats__value">10 min free</dd></div>
                <div class="stats__item"><dt class="stats__label">Drop-off</dt><dd class="stats__value">£3</dd></div>
            </dl>
            <a class="text-link text-link--underline text-link--on-dark" href="/parking/index.html#compare">Compare all car parks and the map<svg class="text-link__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg></a>
        </div>
        <form class="card card--padded form photo-band__form on-light" action="/parking/index.html#quote" method="get" aria-labelledby="book-parking-title">… §7.5 …</form>
    </div>
</section>
```

The photo is an `<img>` with `object-fit: cover` and `alt=""` (the text carries the meaning); the band's own background colour plus the gradient hold the layout and contrast if the image is missing. The hero (`.hero`, `.hero__media`, `.hero__img`) follows the same pattern and is homepage-only.

### 7.8 City rail and city card

Copy `section.city-rail` from `/index.html`. It is a `band` with a heading row, a native horizontal scroll-snap list and a progress bar.

```html
<section class="band city-rail" id="explore" aria-labelledby="explore-title">
    <div class="city-rail__head container">
        <div class="city-rail__titles">
            <h2 class="section-title section-title--brand" id="explore-title">Where we fly<span class="section-title__sub">Find your next holiday</span></h2>
            <a class="text-link text-link--underline" href="/flights/airlines.html#destinations">View all 112 destinations ARROW ICON</a>
        </div>
        <div class="city-rail__nav">
            <p class="city-rail__count">1 – 3 / 4</p>
            <button class="city-rail__button city-rail__button--prev" type="button" aria-label="Previous destinations" aria-controls="city-rail-track">CHEVRON LEFT 18</button>
            <button class="city-rail__button city-rail__button--next" type="button" aria-label="Next destinations" aria-controls="city-rail-track">CHEVRON RIGHT 18</button>
        </div>
    </div>
    <ul class="city-rail__track" id="city-rail-track">
        <li class="city-rail__item">
            <a class="city-card" href="/destinations/index.html">
                <picture class="city-card__media">
                    <source type="image/avif" srcset="/assets/img/cities/cairo-714.avif 714w" sizes="(max-width: 900px) 260px, 357px">
                    <source type="image/webp" srcset="/assets/img/cities/cairo-714.webp 714w" sizes="(max-width: 900px) 260px, 357px">
                    <img class="city-card__img" src="/assets/img/cities/cairo-714.jpg" srcset="/assets/img/cities/cairo-714.jpg 714w" sizes="(max-width: 900px) 260px, 357px" width="714" height="1040" alt="" loading="lazy" decoding="async">
                </picture>
                <div class="city-card__text"><h3 class="city-card__name">Cairo</h3><p class="city-card__meta">from £189 · 5h 10m · daily</p></div>
            </a>
        </li>
    </ul>
    <div class="city-rail__progress container" aria-hidden="true"><span class="city-rail__bar"><span class="city-rail__fill"></span></span></div>
</section>
```

Cards are 357×520 (260×360 narrow), flush corners, photo under a bottom gradient. The name comes first in the DOM (so the link reads "Cairo, from £189…") and is shown below the meta line by CSS. Without JS the rail scrolls natively with a visible scrollbar and the buttons/counter/progress stay hidden. With JS (`.city-rail--enhanced`) the buttons scroll by one card, the counter reads "first – last / total" for fully visible cards, and the 3px bar fills to `(scrollLeft + clientWidth) / scrollWidth`. Hover zoom (`scale(1.04)`) and smooth scrolling are off under reduced motion.

**Guide card** (destinations index, replaces the deleted flat-SVG scene cards): the same photo style in a grid, using the existing 3:2 guide heroes and a teaser.

```html
<div class="grid grid--3">
    <a class="city-card city-card--guide" href="/destinations/lisbon.html">
        <picture class="city-card__media">
            <source type="image/avif" srcset="/assets/img/destinations/lisbon-hero-960.avif 960w, /assets/img/destinations/lisbon-hero-1440.avif 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 357px">
            <source type="image/webp" srcset="/assets/img/destinations/lisbon-hero-960.webp 960w, /assets/img/destinations/lisbon-hero-1440.webp 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 357px">
            <img class="city-card__img" src="/assets/img/destinations/lisbon-hero-960.jpg" srcset="/assets/img/destinations/lisbon-hero-960.jpg 960w, /assets/img/destinations/lisbon-hero-1440.jpg 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 357px" width="1440" height="960" alt="" loading="lazy" decoding="async">
        </picture>
        <div class="city-card__text"><h3 class="city-card__name">Lisbon in a long weekend</h3><p class="city-card__meta">Lisbon · from 2h 45m</p><p class="city-card__body">Where to eat, which hills to climb and the tram worth queueing for.</p></div>
    </a>
</div>
```

`city-card--guide` is 440px tall with a 28px (24 narrow) title; `city-card__body` sits under the meta line.

### 7.9 Help list (ruled grid)

```html
<ul class="help-list">
    <li class="help-list__item">
        <a class="help-item" href="/help/travelling-with-children.html">
            <div class="help-item__head"><svg class="help-item__icon" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">ICON PATHS</svg><h3 class="help-item__title">Travelling with children</h3></div>
            <p class="help-item__body">Family security lane, prams to the aircraft door, baby-change in every zone and play areas by gates 12 and 30.</p>
        </a>
    </li>
</ul>
```

Auto-fill grid (min column 300, three across at 1440), a `--rule-mid` rule above every item and one under the list, body indented 44px under the icon, title underlines on hover. One column narrow. Use it for any list of service links (help index, assistance pages). Icons from `/index.html`: accessibility, family, checklist, bell, suitcase, phone.

### 7.10 Towers

```html
<div class="towers">
    <a class="tower" href="/at-the-airport/security.html">
        <picture class="tower__media">
            <source type="image/avif" srcset="/assets/img/airport/tower-security-560.avif 560w, /assets/img/airport/tower-security-840.avif 840w" sizes="(max-width: 900px) calc(50vw - 22px), 265px">
            <source type="image/webp" srcset="/assets/img/airport/tower-security-560.webp 560w, /assets/img/airport/tower-security-840.webp 840w" sizes="(max-width: 900px) calc(50vw - 22px), 265px">
            <img class="tower__img" src="/assets/img/airport/tower-security-560.jpg" srcset="/assets/img/airport/tower-security-560.jpg 560w, /assets/img/airport/tower-security-840.jpg 840w" sizes="(max-width: 900px) calc(50vw - 22px), 265px" width="560" height="840" alt="" loading="lazy" decoding="async">
        </picture>
        <div class="tower__top"><svg class="tower__icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">ICON PATHS</svg><span class="tower__number" aria-hidden="true">01</span></div>
        <div class="tower__bottom">
            <h3 class="tower__title">Security and customs</h3>
            <p class="tower__body">Body.</p>
            <span class="tower__cta">What to expect ARROW ICON</span>
        </div>
    </a>
</div>
```

Four flush navy towers (two across at 901–1100px and narrow; 520 / 300 min-height), photo under the navy gradient (`.62 → .9`), hover lightens the top stop to `.5` and underlines the CTA. The body text is hidden narrow, as in the mobile comp. The number is decorative (`aria-hidden`) and white rather than the comp's `#AEB8CC`, so it stays legible over the lighter top of any photo. Generic CTAs ("Read more") are fine here because the title is part of the link name.

### 7.11 Row links (ruled)

```html
<ul class="row-links">
    <li>
        <a class="row-link" href="/getting-here/index.html#train">
            <svg class="row-link__icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">ICON PATHS</svg>
            <span class="row-link__text"><span class="row-link__title">By train</span><span class="row-link__meta">18 min from Central · lifts from platform to check-in</span></span>
            <svg class="row-link__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg>
        </a>
    </li>
</ul>
```

Rows separated by `--rule-mid` rules, 64px min height, brand icon optional. Icons from `/index.html`: train, car, bus.

### 7.12 Map pane and map language

The homepage getting-here band (`section.getting-here`) is the reference: copy, left; `.map-pane` filling the right half to the page edge (static 380px tall narrow) with the schematic SVG, an info card and a credit line.

**Decision:** the comp's zoom + / − buttons are **omitted** (the map is a static schematic; controls that do nothing would be dishonest).

```html
<div class="map-pane">
    <svg class="map map--fill" viewBox="0 0 760 680" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map of Meridian Airport: the terminals, rail station, car parks and approach roads">…</svg>
    <div class="map-pane__card">
        <p class="map-pane__place"><span class="map-pane__name">Meridian Airport</span><span class="map-pane__address">Terminal 1, Birmingham B99 1MA</span></p>
        <p class="map-pane__actions"><a class="button" href="/getting-here/index.html">Directions</a><a class="button button--secondary" href="/at-the-airport/index.html#maps">Larger map</a></p>
    </div>
    <p class="map-pane__credit">Map data · <a class="map-pane__credit-link" href="/terms.html">Terms</a></p>
</div>
```

On inner pages (getting-here, terminal maps at `#maps`) put the SVG in a card, without `map--fill` and without `preserveAspectRatio`:

```html
<div class="card map-card">
    <svg class="map" viewBox="0 0 760 680" width="760" height="680" role="img" aria-label="…">…</svg>
</div>
```

The raw-hex rule means SVG colours come from classes, never `fill="#…"`. Geometry (`stroke-width`, `stroke-dasharray`, `rx`, `font-size`, `letter-spacing`) stays as attributes. Copy the homepage SVG as the canonical site map.

| Element | Class | Geometry |
|---|---|---|
| Ground | `map__ground` | full `rect` |
| River band | `map__river` | path; label `map__label map__label--river` (italic, `#3D5E91`, 4.64:1) |
| Park / green | `map__green` | path or rect; label `map__label` |
| Building blocks | `g.map__block` > `rect`s | |
| Runway | `map__runway` + `map__dash` on the same path | `26` / dash `3`, `14 12`; label `map__label map__label--caps` with `letter-spacing="2"` |
| A-road | `map__road` + `map__road-core` | `22` / `14`; chip `rect.map__a45` + `text.map__a45-text` |
| Minor road | `map__road` + `map__lane` | `16` / `10` (or `12` / `7`) |
| Rail | `map__rail` + `map__dash` | `4` / dash `2`, `8 8` |
| Terminal block | `map__terminal` (T1) / `map__terminal map__terminal--alt` (T2), joined by `map__link` | `rect rx="6"`; text `map__block-title` (14) and `map__block-sub` (12) |
| Car park chip | `rect.map__chip` + `text.map__chip-title` (13) + `text.map__chip-sub` (12) | `rx="5"` |
| Station | `circle.map__station` + `text.map__station-label` | `r="7" stroke-width="3"` |
| Pin | `path.map__pin` + `circle.map__pin-dot` | |
| Zone (before/after security, lounge, shops) — terminal maps | `map__zone` or `map__zone map__zone--sand` | `rect rx="8" stroke-width="2"` |
| Gate — terminal maps | `map__gate` | small `rect rx="4" stroke-width="2"` |
| Security line — terminal maps | `map__security` | `stroke-width="6"` path |
| General label | `map__label` (`--grey-2`, 6.83:1 on the map ground) | |

Rules:

- **All map text is at least `font-size="12"`** in SVG units (the comp's 8–11px labels were bumped; hierarchy kept: 14 terminals/river, 13 chip titles, 12 everything else).
- Place names are fictional: "Marston End", "Hollin Rise", "River Meridian", "Meridian Country Park".
- Terminal maps also get a plain list of what is where next to the SVG, because the `aria-label` cannot hold it all.
- **pa11y false positive:** white `map__block-title` / `map__block-sub` text on the navy terminal rects (and any text on SVG shapes) can be reported as a contrast error because pa11y cannot resolve SVG fills; it compares against the HTML background. The real ratios are 10:1 or better (tokens). **Do not restyle maps to silence it**; note it in your report.

### 7.13 Content blocks

```html
<div class="prose">
    <h2>Heading</h2>
    <p>Body with <a href="/help/index.html">an honest link</a>.</p>
    <ul><li>List item</li></ul>
</div>
```

`.prose`: long-form text, max 720px; `h2` serif 30 / 24, `h3` sans 20 / 18. Use it for legal pages, guides and about pages.

```html
<div class="callout">
    <p class="callout__title">Please note</p>
    <p>Meridian Airport is a fictional airport created for this demonstration website. Nothing on this site describes a real place or service.</p>
</div>
```

```html
<dl class="facts">
    <div class="facts__item"><dt class="facts__term">Price from</dt><dd class="facts__value">£8.50 per day</dd></div>
    <div class="facts__item"><dt class="facts__term">Walk to terminal</dt><dd class="facts__value">5 minutes</dd></div>
</dl>
```

```html
<div class="accordion">
    <details class="accordion__item">
        <summary class="accordion__summary">How early should I arrive?<svg class="accordion__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg></summary>
        <div class="accordion__body"><p>Answer.</p></div>
    </details>
</div>
```

Use the accordion for FAQs; put the `h2` above `.accordion`, not inside `summary`.

```html
<div class="table-wrap">
    <table class="table">
        <caption class="table__caption">Compare car parks</caption>
        <thead><tr><th scope="col">Car park</th><th scope="col">Price from</th><th scope="col">To the terminal</th></tr></thead>
        <tbody><tr><th scope="row">P2 Long-stay</th><td class="table__num">£8.50 per day</td><td>5 minutes' walk, covered</td></tr></tbody>
    </table>
</div>
```

Tables: serif caption, uppercase micro headers over a 2px navy rule, `--rule-mid` row rules, first column flush left.

Light-page status (dot and word, e.g. the status glossary on `/flights/index.html`):

```html
<span class="status status--warn"><span class="status__dot"></span>Delayed</span>
```

Modifiers: none (On time, Landed), `status--info` (Boarding, Gate open), `status--neutral` (Expected), `status--warn` (Delayed), `status--bad` (Cancelled).

Inline photo in content:

```html
<picture>…<img class="media" … width="1440" height="960" alt="ALT"></picture>
```

`.media` is a 3:2 cover image, flush corners (spec §4: no rounded media in the page plane).

### 7.14 Notice bar (`:target` carousel, homepage only)

Copy `section.notice-bar` from `/index.html` verbatim. Each notice is `li.notice-bar__item#notice-N` with its own prev/next links (`href="#notice-N±1"`, wrapping), counter "N of 3", `{kind} · {text}` and a `span.notice-bar__action` "What to do: …" (weight 600), then "Check my flight" → `/flights/index.html`. Without JS the first notice shows and the links reveal the others through `:target`. With JS, `.notice-bar--enhanced`, `hidden` toggling, focus kept on the matching control, `aria-live="polite"`. Narrow: the previous link is hidden.

### 7.15 Homepage-only pieces

`hero` (photo band, weather, `sign` quick links, `search-card`), `wait-panel` + `wait-chip--ok|--warn`, and `getting-here` exist only on `/index.html`. Copy from there if a page ever needs them; do not restyle.

### 7.16 Testimonial

A passenger quote as a flat white block (spec §3): 1px `--line` border, flush corners, 32 padding (20 narrow), 20 gap. The quote is `--font-serif` 22px/600 (20 narrow) with a 48px `--accent-blue` opening quote mark drawn by `::before`; the source line is the display face at 14px/700 for the name and `--grey-2` 13px for the journey. Three to a `grid grid--3` under a section `h2`, as on the About page.

```html
<figure class="testimonial">
<blockquote class="testimonial__quote"><p>…</p></blockquote>
<figcaption class="testimonial__source"><span class="testimonial__name">Priya N.</span><span class="testimonial__meta">Flew to Lisbon, October 2026</span></figcaption>
</figure>
```

## 8. Photographs: picture snippet and image slots

Pages reference these exact paths (`/assets/img/…`, files in `next/public/assets/img/`). Only the variants listed exist; never reference a width that is not in this table.

| Slot | Files | Intrinsic size (`width`/`height`) | `sizes` | Used on |
|---|---|---|---|---|
| Home hero | `home/hero-1440.{avif,webp,jpg}` | 1440 × 810 | `100vw` | homepage hero, `alt=""`, `loading="eager" fetchpriority="high"` |
| Home parking | `home/parking-1440.{avif,webp,jpg}` | 1440 × 810 | `100vw` | homepage parking band, `alt=""`, lazy |
| City | `cities/{cairo,new-york,beijing,singapore}-714.{avif,webp,jpg}` | 714 × 1040 | `(max-width: 900px) 260px, 357px` | city rail cards, `alt=""` |
| Tower | `airport/tower-{security,eat-and-drink,baggage,maps}-{560,840}.{avif,webp,jpg}` | 560 × 840 (840 file is 840 × 1260) | `(max-width: 900px) calc(50vw - 22px), 265px` | towers, `alt=""` |
| Destination hero | `destinations/{lisbon,reykjavik,marrakech}-hero-{960,1440}.{avif,webp,jpg}` | 1440 × 960 | page hero: `(max-width: 900px) calc(100vw - 32px), 491px`; guide card: `(max-width: 900px) calc(100vw - 32px), 357px` | destination page heroes (alt from register); destinations index guide cards (`alt=""`) |
| Airport hero | `airport/{eat-and-drink,shopping,lounges}-hero-{960,1440}.{avif,webp,jpg}` | 1440 × 960 | `(max-width: 900px) calc(100vw - 32px), 491px` | those three page heroes |
| About | `about/{terminal,careers}-{960,1440}.{avif,webp,jpg}` | 1440 × 960 | `(max-width: 900px) calc(100vw - 32px), 720px` | `/about/index.html` (terminal), `/about/careers.html` (careers) |

Generic snippet (single-width slots list one entry per `srcset`):

```html
<picture>
    <source type="image/avif" srcset="/assets/img/SLOT-960.avif 960w, /assets/img/SLOT-1440.avif 1440w" sizes="SIZES">
    <source type="image/webp" srcset="/assets/img/SLOT-960.webp 960w, /assets/img/SLOT-1440.webp 1440w" sizes="SIZES">
    <img class="media" src="/assets/img/SLOT-960.jpg" srcset="/assets/img/SLOT-960.jpg 960w, /assets/img/SLOT-1440.jpg 1440w" sizes="SIZES" width="1440" height="960" alt="ALT TEXT" loading="lazy" decoding="async">
</picture>
```

Photos inside a link card, or under text that carries the meaning (hero, bands, cities, towers, guide cards), are decorative: `alt=""`. Standalone photos take the alt text from `docs/imagery.md`. Above-the-fold photos use `loading="eager" fetchpriority="high"` instead of `lazy`.

## 9. Unavailable actions (carried from v1)

- An action the demo cannot perform is either plain `card__text` with a visually-hidden "(not available in this demonstration)" note (informational cards: roles, releases, airline booking) or a `button button--secondary` with `disabled` (action CTAs: reserve, book). Never `href="#"` and never a link that points back to its own page.
- Board/table card titles must differ from the page `h1` (`unique-landmark`): the flights board heading is "Departures and arrivals".
- Forms are GET forms to a real page (`/flights/index.html`, `/parking/index.html#quote`); nothing is submitted anywhere.

## 10. Full class list

Base and layout: `skip-link`, `visually-hidden`, `on-dark`, `on-light`, `container`, `section`, `section--last`, `band`, `band--panel`, `stack`, `stack--lg`, `grid`, `grid--2`, `grid--3`, `split`, `split--main-aside`, `narrow`, `u-tabular`.

Header: `header`, `header__inner`, `header__brand`, `header__logo`, `header__name`, `header__nav`, `header__list`, `header__link`, `header__actions`, `header__lang`, `header__cta`, `header__menu-toggle` (JS: `header--enhanced`, `header--open`).

Footer: `footer`, `footer__main`, `footer__about`, `footer__brand`, `footer__logo`, `footer__name`, `footer__contact`, `footer__phone`, `footer__social`, `footer__social-link`, `footer__col`, `footer__heading`, `footer__links`, `footer__link`, `footer__legal`, `footer__legal-inner`, `footer__legal-links`.

Notice bar: `notice-bar`, `notice-bar__container`, `notice-bar__list`, `notice-bar__item`, `notice-bar__controls`, `notice-bar__step`, `notice-bar__step--prev`, `notice-bar__step--next`, `notice-bar__count`, `notice-bar__text`, `notice-bar__kind`, `notice-bar__separator`, `notice-bar__action`, `notice-bar__link` (JS: `notice-bar--enhanced`).

Hero (homepage): `hero`, `hero__media`, `hero__img`, `hero__inner`, `hero__content`, `hero__weather`, `hero__weather-icon`, `hero__weather-text`, `hero__temp`, `hero__condition`, `hero__date`, `hero__title`, `hero__lede`, `hero__signs`, `hero__signs-item`, `sign`, `sign__icon`, `sign__text`, `sign__title`, `sign__sub`, `search-card`, `search-card__tabs`, `search-card__tab`, `search-card__tab--current`, `search-card__submit`, `hero__wait`, `wait-panel`, `wait-panel__head`, `wait-panel__dot`, `wait-panel__title`, `wait-panel__updated`, `wait-panel__list`, `wait-panel__item`, `wait-panel__item--divided`, `wait-panel__label`, `wait-panel__value`, `wait-chip`, `wait-chip--ok`, `wait-chip--warn`.

Page hero: `page-hero`, `page-hero--with-art`, `page-hero__inner`, `page-hero__content`, `page-hero__eyebrow`, `page-hero__title`, `page-hero__intro`, `breadcrumb`, `breadcrumb__list`, `breadcrumb__item`, `breadcrumb__link`.

Section heads: `section-title`, `section-title--brand`, `section-title--md`, `section-title--sm`, `section-title__sub`, `section-head`, `section-head__titles`, `section-head__intro`.

Buttons: `button`, `button--lg`, `button--block`, `button--secondary`, `button--ghost`, `icon-button`, `text-link`, `text-link--underline`, `text-link--on-dark`, `text-link--sm`, `text-link__icon`.

Forms: `form`, `form__note`, `form__actions`, `form__rule`, `form__small`, `field`, `field__label`, `field__label--caps`, `field__marker`, `field__hint`, `field__error`, `field__control`, `field__icon`, `field__input`, `field__input--soft`, `field__input--with-icon`, `field__input--dark`, `field__input--multiline`, `field-grid`, `fieldset`, `fieldset--inline`, `fieldset__legend`, `check`, `check__input`, `choice`, `choice__text`, `choice__title`, `choice__meta`, `choice__price`.

Cards: `card`, `card--padded`, `card__head`, `card__title`, `card__text`.

Tabs and board: `tabs`, `tabs__list`, `tabs__tab`, `tabs__tab-icon`, `tabs__panel` (JS: `tabs--enhanced`), `board`, `board--overlapped`, `board__head`, `board__titles`, `board__title`, `board__meta`, `board__dot`, `board__clock`, `board__clock-time`, `board__clock-label`, `board__updated`, `board__tabbar`, `board__panel`, `board__body`, `board__search`, `board__search-icon`, `board__scroll`, `board__table`, `board__row`, `board__time`, `board__place`, `board__flight`, `board__terminal`, `board__gate`, `board__status`, `board__state`, `board__state--ok`, `board__state--info`, `board__state--warn`, `board__state--bad`, `board__state--neutral`, `board__info`, `board__foot`, `board__legend`, `board__legend-item`, `board__swatch`, `board__swatch--ok`, `board__swatch--info`, `board__swatch--warn`, `board__swatch--bad` (JS: `board--enhanced`, `board__empty`). Split-flap: `flap-lamp`, `flap-lamp--ok|info|warn|bad` (JS: `flap`, `flap__tile`, `flap__half`, `flap__half--top|bottom`, `flap__leaf`).

Photo band: `photo-band`, `photo-band__media`, `photo-band__img`, `photo-band__inner`, `photo-band__content`, `photo-band__title`, `photo-band__lede`, `photo-band__form`, `stats`, `stats__item`, `stats__label`, `stats__value`.

City rail: `city-rail`, `city-rail__head`, `city-rail__titles`, `city-rail__nav`, `city-rail__count`, `city-rail__button`, `city-rail__button--prev`, `city-rail__button--next`, `city-rail__track`, `city-rail__item`, `city-rail__progress`, `city-rail__bar`, `city-rail__fill` (JS: `city-rail--enhanced`), `city-card`, `city-card--guide`, `city-card__media`, `city-card__img`, `city-card__text`, `city-card__name`, `city-card__meta`, `city-card__body`.

Help list: `help-list`, `help-list__item`, `help-item`, `help-item__head`, `help-item__icon`, `help-item__title`, `help-item__body`.

Towers: `towers`, `tower`, `tower__media`, `tower__img`, `tower__top`, `tower__icon`, `tower__number`, `tower__bottom`, `tower__title`, `tower__body`, `tower__cta`.

Row links: `row-links`, `row-link`, `row-link__icon`, `row-link__text`, `row-link__title`, `row-link__meta`, `row-link__chevron`.

Getting here and maps: `getting-here`, `getting-here__inner`, `getting-here__copy`, `getting-here__intro`, `getting-here__note`, `getting-here__note-icon`, `getting-here__note-lead`, `map-pane`, `map-pane__card`, `map-pane__place`, `map-pane__name`, `map-pane__address`, `map-pane__actions`, `map-pane__credit`, `map-pane__credit-link`, `map-card`, `map`, `map--fill`, `map__ground`, `map__river`, `map__green`, `map__block`, `map__runway`, `map__road`, `map__road-core`, `map__lane`, `map__dash`, `map__rail`, `map__terminal`, `map__terminal--alt`, `map__link`, `map__zone`, `map__zone--sand`, `map__gate`, `map__security`, `map__chip`, `map__chip-title`, `map__chip-sub`, `map__a45`, `map__a45-text`, `map__station`, `map__station-label`, `map__label`, `map__label--river`, `map__label--caps`, `map__block-title`, `map__block-sub`, `map__pin`, `map__pin-dot`.

Content: `prose`, `media`, `table-wrap`, `table`, `table__caption`, `table__num`, `accordion`, `accordion__item`, `accordion__summary`, `accordion__icon`, `accordion__body`, `callout`, `callout__title`, `facts`, `facts__item`, `facts__term`, `facts__value`, `status`, `status__dot`, `status--info`, `status--neutral`, `status--warn`, `status--bad`.

**Deleted in v2** (do not use; they no longer exist): `hero__art`, `hero__svg`, `hero__scenery`, `hero__heading`, `status-strip*`, `quick-links*`, `icon-chip*`, `icon-card*`, `illustrated-card*`, `guide-card*`, `flight-search*`, `row-link--compact`, `grid--4`, `grid--stack-narrow`, `section--board`, `section-foot`, `tabs__panels`, `board__flight-wrap`, `board__flight-text`, `board__flight-no`, `u-wide-only`, `u-narrow-only`, all `u-fill-*` / `u-stroke-*`, `map__walkway`, `map__park`, `map__dropoff`, `map__centreline`, `map__label--sand`, `map__label--brand`, `map__label--park`, `getting-here__text`, `getting-here__map`, `getting-here__routes`, `footer__compact*`.

## 11. Verification every page agent runs

```bash
npx --yes html-validate "static/**/*.html"
npx --yes pa11y http://localhost:8788/PATH --standard WCAG2AA
grep -rnE "<!--|style=" static/YOUR-PATHS
```

The local server is `python3 -m http.server 8788 -d static` (ports 8765/8770/8771 belong to other projects; never touch them). Reuse a running server. Expected pa11y noise: only the SVG map contrast false positive (§7.12).

## 12. Recorded deviations from the v2 comp

- One DOM order for all widths (desktop's); mobile's `#explore`-before-`#parking` swap is not reproduced (brief §2.1).
- Comp substitutions: KW/ZX airline codes, `0121 496 0123`, `Birmingham B99 1MA`, villages "Marston End" / "Hollin Rise", river label `#3D5E91`, map text ≥12px.
- Parking dates are `type="date"`, not DD/MM/YYYY text fields.
- Map zoom buttons omitted; "Map data · Terms" keeps "Terms" as a real link to `/terms.html`.
- Narrow board keeps the table and scrolls sideways (the mobile comp's stacked list is not reproduced).
- Narrow hero keeps the three sign links instead of the mobile comp's separate "Quick actions" icon row; the wait panel is a white card, static under the search card (brief), not the comp's translucent strip.
- Narrow footer shows the four columns as a 2×2 grid instead of the comp's flat eight-link list; "Site map" stays in the legal bar.
- Tower numbers are white (comp `#AEB8CC`) for legibility over photos.
- Hero and parking photos are `<img>` + `object-fit` (not CSS backgrounds), with the band background colour as fallback.
- Search-card tabs "Fast Track" and "Lounges" and the "Fast Track" sign link to `/at-the-airport/lounges.html` (the comp's in-page anchors do not exist).
- Mobile hero and parking use the mobile comp's vertical gradients (`--gradient-hero-narrow`, `--gradient-parking-narrow`).

## 13. Hero sky variants

The homepage hero photo follows the clock and the weather. 12 assets at `assets/img/home/hero/{daypart}-{weather}-1440.{avif,webp,jpg}` — dayparts `morning|afternoon|evening|night` (05–11 / 12–16 / 17–20 / else), weathers `sunny|cloudy|rainy` (night-sunny reads as clear). The no-JS default and demo snapshot is `morning-rainy`. `enhanceHeroSky` in site.js swaps the picture sources, daypart icon, condition word, temperature and date line; the `.hero` section carries `data-weather` for the demo default. Test any state with `?sky=<daypart>-<weather>` — the override also pins a representative display time per daypart so screenshots stay coherent.

Accessibility: the hero gradients are `--gradient-hero` (.88/.62/.3) and `--gradient-hero-narrow` (.66/.78/.92), strengthened from the comp. Every shipped variant must pass `python3 scripts/hero_contrast.py`, which composites both gradients over the asset and requires >=4.5:1 for white text in the desktop and narrow text zones. Never weaken the gradients to fix a bright image; darken or regenerate the image.
