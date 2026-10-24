# Status

What is open, then the record of what was settled. Open items are the honest list of what the site does not do yet.

## Open

- **No production frontend.** The Next app has no Cloud Run service and Firebase Hosting still rewrites every path to the Drupal service, which in decoupled mode serves the editor and API only. Needed before `spike/nextjs-headless` can reach `main`: a Cloud Run service built from `next/` with `CANVAS_SITE_URL` set to the Drupal service URL, the Hosting rewrite pointed at it, and the production frontend URL registered in `canvas_headless.settings`. That setting is in `config/sync` as `http://localhost:3000`, so production needs a per-environment override (for example `$config['canvas_headless.settings']['frontends']` in `settings.cloudrun.php`).
- **Drupal's own front end.** The default theme is Stark. Anyone who opens a page on the Drupal host sees it unstyled. Decide whether the Drupal host should redirect page routes to the frontend.
- **`canvas_headless` is experimental** in Canvas 1.12: APIs, hooks and configuration may change without a deprecation path. Editor preview over plain HTTP works in Chromium only.
- **Slot restrictions are not enforced.** Canvas 1.12 ignores a slot's `expected` children, and code component slots cannot declare it. The `meridian_slots` module that enforced it for SDCs is gone, so an editor can put any component in any slot.
- **Behaviours after an edit in the editor.** `useEnhance` runs once per element. A component whose DOM React replaces after an edit (for example a notice added to the bar) is not re-enhanced until the preview reloads. The published site is unaffected.
- **Content changes after the first install** are not deployed by the recipe: it is applied once, by the bootstrap job, on an empty database. Later content travels by editing in production, or by a migration.
- The flight-search "When" select has three hard-coded dates (3, 4, 5 October 2026) and the city-rail "1 – 3 / 4" count is literal. Decide whether they become props.
- Flights and notices are leaf components on the pages, not content types with Views.
- `drupal/web/modules/custom/meridian_flights/` is an untracked leftover directory (`src/` and `.DS_Store`, never in git). Delete it locally.
- The custom domain `airport.junaid.guru` waits for its DNS record (`docs/platform.md` step 8).

## Settled

- **2026-10-24, static contract retired.** The site moved from Drupal-rendered SDCs generated from a static prototype to React code components in Next.js. All 48 components were ported. Before `static/` was deleted, each one was checked against its Twig original by rendering both with the same props: every component printed `ok`, as did every enum and optional-prop branch Twig could render. The whole site was then checked against the static pages: `0 page(s) differ` on the DOM and `0 render(s) differ beyond the flap-animation noise ceiling` on screenshots at 1440 and 390. The content was migrated in place from `sdc.meridian.*` to `js.*`, with input and slot names camelCased: 10 page templates and 29 pages, `0 violations`. `static/`, the seed pipeline, the sync script, the parity scripts, the Meridian theme and `meridian_slots` were deleted.
- **2026-10-24, fresh install reproduces the site.** `site:install --existing-config` plus `drush recipe ../recipes/meridian_content`: 29 pages, config status clean, `30 of 30 pages identical after fresh install` against the HTML saved before it. The Canvas editor previewed through Next straight after.
- **Meta descriptions come from Metatag.** The headless `head` carries only the title unless Metatag is installed. `metatag.metatag_defaults.canvas_page` maps `[canvas_page:title]` and `[canvas_page:description]`; all 29 pages print the stored description with titles unchanged.
- **Prop names are camelCase** because the content API camelCases them on the wire. The first full render returned 500 on three pages with `imageSrc` undefined, until the names matched.
- **Core `content:export`, not contrib `default_content`.** `default_content` 2.0.0-beta1 crashes exporting a Canvas page (`parse_url()` on Canvas's `MaybeUrl`); core's exporter writes component trees cleanly.
- **Page templates hold the chrome at the root.** `canvas_headless` refuses a page template that contains a `theme_page_template.*` component, which had left the header, notice bar and footer out of every response.
