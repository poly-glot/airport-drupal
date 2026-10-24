# Next.js frontend (spike)

Spike branch `spike/nextjs-headless`: can a Next.js app built on Canvas Headless replace the Drupal-rendered site and remove `scripts/sync_static.py`?

## How it works

- Drupal stays the editor and the content API. `canvas_headless` (Canvas 1.12.0, experimental) serves `GET /canvas/content-api?requestUri=/path`.
- The 48 SDC components are not rewritten. Canvas renders each one through its Twig template and sends it as a `drupal-markup` HTML string.
- `lib/markup.tsx` lifts each string's root element into a React element and sets its inner HTML. The DOM matches static with no wrapper. Notice bar and site header go before `<main id="main" tabindex="-1">` and the site footer after it, picked by `data-component-id`.
- `public/assets` and `public/favicon.svg` are symlinks to `static/`. The layout loads `/assets/css/site.css` and `/assets/js/site.js` exactly as `static/index.html` does. Nothing is generated or synced.
- `site.js` runs before React hydrates and adds `--enhanced` classes to those root elements, so they carry `suppressHydrationWarning`.
- In draft mode (inside the Canvas editor) the page renders through the SDK's `CanvasComponentTree` instead, which carries the selection markers the editor needs.
- `htmlLimitedBots: /.*/` in `next.config.ts` makes metadata blocking. Without it Next streams metadata into a `<div hidden>` at the top of `<body>`, which breaks DOM parity on every page.

## Drupal side

- `drupal/custom_elements` added; `canvas_headless` and `custom_elements` enabled; frontend `http://localhost:3000` registered (config in `drupal/config/sync`).
- Page templates no longer wrap the chrome in `theme_page_template.meridian` (`scripts/canvas_emit.py`). `canvas_headless` refuses any page template holding a `theme_page_template.*` component, which left header, notice bar and footer out of the response.

## Run

```bash
cd drupal && ddev start
cd ../next && cp .env.example .env && npm install && npm run dev
PORT_BASE_URL=http://localhost:3000 .venv/bin/python scripts/compare_port.py
python3 scripts/visual_diff.py http://127.0.0.1:8788 http://localhost:3000 <shots-dir>
```

Open the editor on the `127.0.0.1` port `ddev describe` prints, in a Chromium browser.

## Results (2026-10-24)

| Check | Result |
|---|---|
| `compare_port.py` against Next | `0 page(s) differ` |
| `visual_diff.py` against Next, 1440 and 390 | `0 render(s) differ beyond the flap-animation noise ceiling` |
| Chrome, home and parking | no failed requests, no console errors, notice bar, header, board and city rail enhanced |
| Canvas editor | previews through `localhost:3000`, hero selectable, a heading edit re-rendered in the preview |
| `compare_port.py` against Drupal's own rendering | `29 page(s) differ`: without the page template wrapper Drupal no longer renders `<main>` |
| `design_battery.py` | `design battery ok: 48 components` |

## Open

- `<meta name="description">` is missing. The headless `head` holds only the title unless the `metatag` module is installed.
- In the editor, a component re-rendered after an edit is new DOM that `site.js` never saw, so its enhancement is gone until reload. Expected from how `site.js` initialises; not seen in this spike because the edited hero looks the same at 09:42.
- Drupal can render these page templates headless or through Twig, not both: the wrapper that gives the Twig site its `<main>` is the one headless refuses.
- `canvas_headless` is experimental. Its README says APIs, hooks and configuration may change without a deprecation path. Preview over plain HTTP needs a Chromium browser.
- The theme's generated per-component CSS and JS still exist, because the Canvas editor's component thumbnails and the Drupal-rendered fallback use them. Removing `sync_static.py` means deciding those can go.
