# Status

What is open, then the record of what was settled on the way to the live site. Open items are the honest list of what this port still does not do; ticked items stay because each one records a decision or a gotcha that a later change could undo.

## Open

- Flight-search "When" select has three hard-coded dates (3, 4, 5 October 2026), verbatim from static, and the `city-rail` "1 – 3 / 4" count is literal filler. Decide whether they become props or stay literal UI.
- `scripts/hero_contrast.py` default path points at the sibling airport repo; pass `static/assets/img/home/hero` or change the default.
- When a seed page template changes, delete the template in the site, re-run the pusher, then `ddev drush cex -y`, so `config/sync` stays the source.
- `help-list` with an empty title crashes the Canvas preview (the section-head include receives null); mark `title`, `link_label` and `link_href` required or default them.
- Slot restriction is declared on `help-list` only; the other single-child slots (facts, accordion, breadcrumb, city-rail, tower-grid, flight-board, package, wait-panel, hero signs, notice-bar, site-header, site-footer) have no `expected` yet.
- The parity workflow's screenshot step flakes on the GitHub runner (lazy images, phone-width table wrapping between captures); its DOM check passes. The gate is `scripts/visual_diff.py` run locally before a push.
- Flights and notices are seeded as leaf components, not content types with Views.
- The custom domain `airport.junaid.guru` waits for its DNS record (docs/platform.md step 8).

## Settled

- `form.twig` and `terminal-map.twig` include partials as `@meridian/components/...`. Drupal maps `@meridian` to the theme's `templates/` directory, so these probably fail. Fix: move partials under `templates/components/form/<kind>.twig` and `templates/components/terminal-map/<terminal>.twig`, or verify the namespace resolves.
- `core/components.meridian--button` library name used by `form` and `package` to attach button.css: confirm against the running site's library list.
- `accordion-item` renders `{{ body }}` without `|raw`; `prose` and `data-table` from the Haiku agent may differ. Check how Canvas supplies `contentMediaType: text/html` props and make all four consistent.
- Only one `button/` component may exist; the forms agent created it. Check no other agent created a second.
- Hero uses its own `<picture>` (decision sent to the hero agent); every other image goes through `meridian:picture`.
- `scripts/compare_port.py` still imports `umbraco_url` and defaults to the Umbraco port; needs a Drupal URL mapping and the ddev base URL.
- `scripts/build_seed.py --target canvas` writes 29 pages and 10 page templates (one per header aria-current state) to drupal/seed; `scripts/seed_push.py` pushes them.
- `notice` needs `position` and `total` props for `id="notice-N"`, the "N of M" count and prev/next hrefs; the seed and later the Views row template must pass them.
- `picture` interface grew `widths` (comma list) and `picture_class`; `image.src` is the stem including the width suffix (for example `/assets/img/cities/cairo-714`). The seed emitter must produce exactly that.
- `site-footer` phone prop must contain the non-breaking spaces static uses in the number.
- `hero` has a third slot `wait` for the wait panel (static nests it in `div.hero__wait.container`); `aside` holds the flight-search `form`.
- `section` renders `section.section.container` (container on the section itself, as static); some static pages use `div.section.container`, which the comparer will flag; decide element per page or add a `tag` enum.
- `flat-block` had no static source and no user; deleted in the 2026-10-23 audit.
- `group` layout enum: stack, stack-lg, grid-2, grid-3, split, split-main-aside; classes come from base layout.css so group has no CSS.
- Every component root is written as `<tag class="..."{{ attributes }}>`. When Canvas or Drupal passes classes in `attributes` this yields two `class` attributes. Convert every root to `<tag{{ attributes.addClass('a', 'b') }}>` once the first Canvas render shows what it injects; the parity comparer will catch the difference either way.
- Library names `core/components.meridian--section-head` and `core/components.meridian--button` used in `libraryOverrides.dependencies` are unverified against a running Drupal.
- Image props are scalars (`image_src`, `image_alt`, `image_width`, `image_height`; picture takes `src`, `alt`, `width`, `height`). Decorative images omit alt; Canvas rejects an example of `""`.
- Page skeleton matches static on Canvas pages: `lang="en-GB"`, skip link, header, `<main id="main" tabindex="-1">`, footer; achieved with page.html.twig, html.html.twig, region.html.twig, off-canvas-page-wrapper.html.twig and canvas-page-variant.html.twig overrides. Side effect: no messages fallback div on Canvas pages.
- `<head>`: title is the exact static title (no site-name suffix), favicon is `/favicon.svg`, font preconnects and the Oswald face are in; meta description comes from the Canvas page description. Drupal's generator, canonical, shortlink and mobile metas remain.
- Enum props arrive as `''` when omitted and fail validation; the seed always emits them. Consider defaults in component.yml later.
- Seeded pages: PATCH replaces the tree; seed_push.py hash-skips unchanged pages via Drupal state so editor work on untouched pages survives (done; `--force` ignores hashes). Page templates are owned by config/sync; the pusher only verifies them.
- compare_port.py compares `<body>` only, ignores `<script>` elements and the `data-component-id` and `data-component-variant` attributes core SDC adds.
- `compare_port.py` prints ok for all 29 pages (body only).
- `ddev drush cex -y` done; `config:status` clean; `cim -y` is a no-op; plain `seed_push.py` prints all skip.
- Fresh install reproduces the site: the production image's bootstrap job ran `site:install --existing-config`, `ensure-oauth.php` and `seed_push.py` against an empty database on 2026-10-23; all 29 pages 200, token 200, `compare_port.py` 0 differ, `visual_diff.py` 0 differ.
- `meridian_flights` module replaced by `components/flight-board/board-events.json`; `js/shared.js` removed (no callers); duplicated `.card`, `.stats` and `.map` rules replaced by component dependencies (2026-10-23 audit).
- Visual parity: `scripts/visual_diff.py` reports 0 of 58 renders differing (29 pages at 1440 and 390) after fixing `flight-board.css` dropped by its own `libraryOverrides`, `status` and `button` CSS missing where their classes appear in another component's HTML, `/assets/` served from the `drupal/web/assets` symlink, `meridian_flights` enabled.
- Slot restriction: `help-list.items` declares `expected: [meridian:help-item]`; `meridian_slots` shows a banner in the editor preview the moment a wrong child lands and refuses save and publish (API 422, publish dialog shows the error). Other single-child slots not yet declared.
- Stale Canvas config caught by the fresh install: `canvas.component.sdc.meridian.flat-block` and its entry in the `Meridian · Inner pages` folder survived the component's deletion and broke `site:install --existing-config`; both removed and re-exported. Rule: after deleting a component, `drush cex` and grep `config/sync` for its id.
- `drupal/gcs` removed: its stream wrappers register through Drupal 7 hooks that never fire on Drupal 11. Files are a Cloud Run GCS volume mount (docs/platform.md decision 8).
- Live on Cloud Run 2026-10-23: `poly-glot/airport-drupal` deploys on push; bootstrap job installs or deploys, ensures OAuth and seeds; 29 pages at DOM and visual parity on the run.app and hosting URLs; files bucket mounted and writable. Custom domain waits for DNS (docs/platform.md step 8).
