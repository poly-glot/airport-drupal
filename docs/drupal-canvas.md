# Drupal Canvas port — plan

Second CMS port of the Meridian Airport site. Written 2026-10-23 from a review of `static/`, `docs/umbraco.md`, `docs/design/spec.md`, `docs/brief.md`, `docs/status.md`, and what the memory bank records about the agency WordPress platform (parley, wealth, oee, boxes, wp-client-template, wp-base). Canvas facts were checked against a running Canvas 1.12 site and the module source. `docs/canvas-reference.md` records what was observed and derived and overrides this plan where they differ (its section 0 lists the corrections already applied here); the links at the end are the original docs.

## 1. What stays fixed

- `static/` is the contract. Content is extracted from it, never retyped; `scripts/compare_port.py` proves parity page for page (the Umbraco rule, kept).
- `docs/design/spec.md` is normative. Every Canvas component cites the homepage element it derives from. The grep battery runs in CI: no `box-shadow` outside hero, map overlay and menu sheet; no `border-radius` beyond spec §4; no `translateY` in hovers; no hex outside `tokens.css`.
- Images stay static files under the theme. Image props are plain scalars holding the static stem (`/assets/img/airport/shopping-hero`), not media references, and a `picture` component emits AVIF, WebP, JPEG. Same as Umbraco (canvas-reference section 0, row 3).
- No Tailwind, no bundler, no framework. The static CSS is already one file per component; the port copies it.

## 2. WordPress platform, translated

The memory bank's platform pattern, part by part, with the Drupal equivalent:

| WordPress platform (parley, boxes, wealth, oee) | Drupal Canvas port |
|---|---|
| `static/` verified prototype, ported 1:1 | same `static/` |
| yacf YAML content model (`wp-content/yacf/*.yml`) declares fields once | Drupal config sync (`drupal/config/sync`) exported from one dev site, plus a Drupal recipe that applies it on install |
| `seed.php`, idempotent, runs via platform `run.php` in the CI bootstrap job | `scripts/build_seed.py --target canvas` emits Canvas page trees and page-template trees under `seed/`; `scripts/seed_push.py` writes them through the Canvas HTTP API on every deploy. Each run upserts by UUID and replaces a seeded page's components wholesale, so editor changes to a seeded page are overwritten on the next seed (canvas-reference section 3). Repeated content is leaf components inside pages until the entity upsert exists (section 5) |
| theme `template-parts/*.php` | theme `components/*/` single directory components |
| `wp-base` platform image, versioned `<wp-version>-r<N>`, clients only own theme and content | `drupal-base` image (FrankenPHP, Drupal 11, Canvas, drush, GCS file stream wrapper), versioned `<drupal-version>-r<N>` |
| `wp-client-template` scaffold: three-line Dockerfile, bootstrap runner, README | `drupal-client-template`: Dockerfile that copies theme, recipe, config and seed, then runs `drush deploy` and the seed |
| CSS concatenated at image build (`cat base/*.css components/*.css > main.css`) | not needed; each SDC ships its own CSS and Drupal aggregates |
| Cloud Run behind Firebase Hosting rewrite, `junaid.guru` subdomain | same, via the existing `firebase-cloud` Terraform module shape (`wordpress-cloudrun` becomes `drupal-cloudrun`) |
| Shared OCI HeatWave MySQL, per-app database from `mysql-app-catalog` | same catalogue entry |
| GCS media, APCu, OPcache warm-up for cold start | GCS public files, APCu, OPcache preload, page cache plus Firebase CDN headers for anonymous pages |

The Umbraco port targeted Azure F1 because the brief said so. This port follows the platform the memory bank says is the default (GCP Cloud Run plus firebase-cloud; AWS only for donation and txtlocal).

## 3. Canvas building blocks used

Canvas 1.0 composes three component sources in one tree: SDC (Twig), Blocks (PHP) and Code Components (React). In 1.12 it edits three things: **Pages** (its own entity type, not nodes), **Content Templates** (how a node type renders in its Full view mode, props bound to fields), and **page templates** (`page_variant`, the wrapper holding the header, notice bar and footer, edited once for the site). Page templates replaced the 1.0 Regions (canvas-reference section 0, row 1).

Decision per concern:

- **Design-system components: SDC in the theme.** The static markup becomes Twig almost verbatim, the per-component CSS file is copied, and the matching `enhance*` function from `site.js` becomes the component's JS. Code Components would mean rewriting every section in JSX and running the Tailwind build the CLI performs on push; nothing on this site needs React. Reserve Code Components for a future interactive widget that cannot be a Twig template plus a small script.
- **Editorial pages: Canvas Pages.** Home, the 27 inner pages, legal pages and the site map. Each is a flat component tree of SDCs written through the HTTP API by `scripts/seed_push.py`, because the CLI cannot carry pages that contain SDCs (canvas-reference section 0, row 2).
- **Repeated same-shape pages: one node type plus a Content Template.** `destination` (Lisbon, Marrakech, Reykjavik). Props bound to fields, so adding a fourth guide is a form, not a page build. Deferred: this phase places the guides as leaf components inside pages; content templates follow the entity upsert (canvas-reference section 5).
- **Data the brief calls entities: content types rendered by Views blocks.** Notices, departures and arrivals, car parks, airlines, routes, where-we-fly cards, offers, terminal facilities, FAQs, roles, releases, help items, towers. Each is entered once and placed on pages as a Block in the Canvas tree, which is the Umbraco "Entity list" part in Drupal terms. Where the static markup renders a Views result through an SDC, the view's row template calls the SDC so there is still one source of markup. Deferred the same way: `default_content` is not idempotent and its export fails with Canvas installed (canvas-reference section 5). In this phase each item is a leaf component inside the page that shows it; Views and entities follow the custom upsert.
- **Header, notice bar, footer: one page template.** Edited once as a `page_variant` (site-header, notice slot and site-footer around the page content marker), seeded from `seed/page-templates/<id>.json` through the HTTP API (canvas-reference sections 2c and 0).
- **Forms, terminal maps, site map: code-owned.** Twig partials chosen by an enum prop, as in Umbraco. The Umbraco rule stands: functionality, not editable content.

## 4. Component inventory

Derived from `static/assets/css/components/` (one file per component) and the Umbraco parts list. The left column is the SDC machine name, the derivation cites the homepage element per spec §11.

### Bands and sections (homepage grammar)

| SDC | Props | Slots | Derives from | JS |
|---|---|---|---|---|
| `notice-bar` | none (reads notices block) | `notices` | §2.1.1 travel notice bar | `enhanceNotices` |
| `site-header` | `cta_label`, `cta_href`, `basket_href`, `basket_label` (all required on write) | `nav` (menu leaves as `nav-link` children; no Drupal menu) | §2.1.2 | `enhanceMenu` |
| `hero` | `title`, `intro`, `default_weather` enum [sunny, cloudy, rainy] rendered as data-weather (plan said default_sky; see hero README) | `signs`, `aside` | §2.1.3 | `enhanceHeroSky` |
| `hero-sign` | `icon` enum, `title`, `meta`, `href` | | hero quick links | |
| `wait-panel` | `updated`, `road_status` | `chips` | §2.1.4 | |
| `wait-chip` | `label`, `minutes`, `tone` enum ok/warn | | | |
| `flight-board` | `title`, `title_id`, `meta`, `clock_time`, `overlapped`, `show_search`, per-board search labels, captions and all-flights links | `departures`, `arrivals` (flight-row leaves now, Views later) | §2.1.5; tabs folded in, the board is their only user | `enhanceSplitFlap`, `enhanceBoardSearch`, `enhanceTabs`, `enhanceStatusTips`, `advanceClock`; events fetched from `/api/board.json` |
| `photo-band` | `title`, `intro`, `image_src`, `image_alt`, `image_width`, `image_height`, `tone` | `facts`, `aside` | §2.1.6 parking band | |
| `city-rail` | `title`, `subtitle`, `link_label`, `link_href` | `cards` | §2.1.7 | `enhanceCityRail` |
| `city-card` | `city`, `meta`, `image_src`, `image_alt`, `image_width`, `image_height`, `href` | | | |
| `help-list` | `title`, `link_label`, `link_href`, `columns` enum | `items` | §2.1.8 | |
| `help-item` | `icon` enum, `title`, `body`, `href` | | | |
| `flight-row` | `time`, `place`, `flight`, `terminal`, `gate`, `gate_label`, `status` enum, `note`, `tip`, `tip_id` | | board rows; the static board has no airline column | |
| `tower-grid` | `title`, `intro`, `link_label`, `link_href` | `towers` | §2.1.9 | |
| `tower` | `number`, `title`, `body`, `cta_label`, `href`, `image_src`, `image_alt`, `image_width`, `image_height` | | | |
| `getting-here` | `title`, `intro`, `note` | `rows`, `map` | §2.1.10 | |
| `map-pane` | `name`, `address`, `directions_href`, `larger_href` | | §2.1.10 map | |
| `site-footer` | `enquiries`, `phone`, `phone_href`, `legal_line` (all required on write) | menu leaves as slot children, as in the header (no Drupal menu) | §2.1.11 | |

### Inner-page vocabulary (spec §7, in order of preference)

| SDC | Props | Slots | Spec rule |
|---|---|---|---|
| `page-hero` | `eyebrow`, `title`, `intro`, `variant` enum sky/band/photo, `image_src`, `image_alt`, `image_width`, `image_height` | `breadcrumb` | §10 |
| `section` | `heading`, `heading_level` enum, `anchor`, `tone` enum light/panel/dark, `last` bool | `parts` | container for everything below |
| `group` | `layout` enum stack/grid-2/grid-3/split | `parts` | nesting, as Umbraco groups |
| `prose` | `body` (formatted text) | | §7.1 |
| `ruled-list` | | `items` (help-item or row-link) | §7.2 |
| `row-link` | `icon`, `title`, `meta`, `href` | | §7.2 |
| `data-table` | `caption`, `numeric_columns`, `rows` (formatted text table) | | §7.3 |
| `facts` | | `items` | §7.4 |
| `fact` | `term`, `value` | | |
| `accordion` | | `items` | §7.5 |
| `accordion-item` | `summary`, `body` | | |
| `callout` | `title`, `body`, `tone` | | §7.6 |
| `testimonial` | `quote` (`text/html`), `name`, `meta` | none | §3 flat block, §2 serif quote; about page "What passengers say" | none |
| `package` | `tier`, `price_prefix`, `price`, `unit`, `badge`, `best_label`, `note`, `meta`, `recommended` bool, `cta_label`, `href` | `features` (package-feature leaves) | §7.7; meta is a text line so a prop, not a slot |
| `form` | `kind` enum (flight-search, parking, alerts, assistance, feedback, lost-property), `compact` bool for the homepage parking copy | | §8, code-owned; static has no careers form and the contact form is the help-page feedback form |
| `terminal-map` | `terminal` enum | | code-owned |
| `picture` | `src` (stem with width suffix), `alt`, `width`, `height`, `widths`, `sizes`, `loading` enum, `priority`, `css_class`, `picture_class` | | §9 |
| `nav-link` | `label`, `href`, `current` enum none/page/section | | header nav items; menus are slot children, not a Drupal menu |
| `notice` | `kind`, `text`, `action`, `link_label`, `link_href`, `position`, `total` | | notice bar items |
| `footer-link` | `label`, `href` | | footer columns |
| `stat` | `label`, `value` | | photo-band stats (`dl.stats`) |
| `card` | `tag` enum div/section, `heading`, `heading_level`, `heading_id`, `padded` | `parts` | 44 static card blocks on inner pages and the sitemap; static is the contract even where spec §11 calls `.card` a leftover |
| `heading` | `text`, `level` enum, `size` enum default/sm, `id` | | `.section-title` headings inside stacks |
| `paragraph` | `body` html, `variant` enum plain/package-note/form-small | | loose paragraphs |
| `breadcrumb-item` | `label`, `href`, `current` | | |
| `package-feature` | `text` | | package tick list |
| `status` | `word`, `tone` enum | | flights-page legend only; board rows use `.board__state` driven by flight-row's status enum |

Collections are slots, never array props. Canvas accepts `type: array` with scalar items (canvas-reference section 0, row 4), so this is a house rule, not a Canvas limit. Scalar, enum, boolean, integer, rich-text and link props are the compatible shapes, and image props are scalar stems (canvas-reference section 1). The 44 components already in the theme were enabled with none incompatible. A new component still has to appear in `/admin/appearance/component` without an incompatibility reason before the next one is built.

The split-flap board is the one risk. Its 218 `data-flap` cells and the drum animation live in `site.js` today. It stays an SDC with the board JS attached through `libraryOverrides`; its rows are leaf components in the page tree until the Views feed follows the entity upsert (canvas-reference section 5); the live update feed becomes a small JSON route in a custom module so the scripted updates survive the port.

## 5. Directory layout

```
airport/
  static/                                   contract, unchanged
  scripts/
    build_seed.py                           gains --target canvas (Umbraco target kept)
    compare_port.py                         unchanged; PORT_BASE_URL points at Drupal
    seed_push.py                            writes pages and page templates through the Canvas HTTP API
  drupal/
    composer.json                           drupal/core-recommended, drupal/canvas, drush, gcs stream wrapper
    Dockerfile                              FROM drupal-base:<ver>-r<N>; COPY theme, module, recipe, config, seed, scripts/seed_push.py; RUN drush deploy
    canvas.config.json                      CLI config for code components, only if any are added; pages and page templates do not go through the CLI
    config/sync/                            exported config: theme and Canvas settings; content types and views follow the entity upsert
    recipes/meridian/
      recipe.yml                            installs Canvas, theme and applies config; content types and views come with the entity upsert
    seed/                                   generated, never hand-edited
      pages/*.json                          one Canvas page tree per static page
      page-templates/*.json                  header, notice bar, footer (one page template)
      content/                               not generated this phase (canvas-reference section 5)
    web/modules/custom/meridian_slots/     rejects a save when a slot child is not in the slot's expected list
    web/themes/custom/meridian/
      meridian.info.yml                     regions: notice, header, content, footer (theme regions, filled by the page template's slots)
      meridian.libraries.yml                fonts, base
      css/base/{tokens,base,layout,utilities}.css  generated from static/assets/css by scripts/sync_static.py
      components/
        <sdc>/<sdc>.component.yml           props, slots, examples, group, libraryOverrides
        <sdc>/<sdc>.twig
        <sdc>/<sdc>.css, <sdc>.js           generated from static by scripts/sync_static.py; never edited
        <sdc>/<sdc>.js                      the matching enhance* function from site.js
      templates/
        page.html.twig                      regions only; Canvas owns the content region
        node--destination.html.twig         thin, Canvas content template renders the body
      assets/img/                           copied from static/assets/img at image build
      favicon.svg logo.svg
```

Rules that make the layout hold:

- `components/` mirrors `static/assets/css/components/` one to one. `content.css` is the exception and is split into `prose`, `data-table`, `facts`, `accordion`, `callout`, `breadcrumb`, `status`.
- `site.js` is split by its `enhance*` functions; each lands in the component it enhances. The scripted board events live in `components/flight-board/board-events.json`, fetched by the flight-board behaviour; no module serves them.
- `seed/` is a build artefact of `static/`. Editing it by hand is the same mistake as editing `seed.php` output.
- Nothing in `drupal/` holds copy. Copy comes from `static/` through `build_seed.py`, as it does for Umbraco.

## 6. Pipeline, in order

1. **Learn the page JSON once.** Install Drupal 11 plus Canvas locally with ddev (MariaDB 10.11, not SQLite; canvas-reference section 7), build the homepage by hand in the Canvas UI from the first few SDCs, then read it back with a GET on `/canvas/api/v0/content/canvas_page/{id}` (section 2a). `npx canvas pull` skips pages that contain SDCs (section 2d), so it teaches nothing here. Everything in step 3 depends on this shape, so it comes first.
2. **Theme and SDCs.** Tokens, base, layout, then the homepage components top to bottom, each checked against the live homepage before the next. Then the inner-page vocabulary. Grep battery green after every component.
3. **`build_seed.py --target canvas`.** Reuse its existing parser (it already recognises every static element and fails loudly on an unknown one); add an emitter that writes flat Canvas page trees and page-template trees (canvas-reference sections 2a and 2c). Idempotency comes from stable UUIDs derived from the static path and element index; the API keeps a UUID supplied on POST (section 3).
4. **Recipe and config export.** Canvas, `canvas_oauth`, `canvas_page_template_component` and the theme enabled, plus the image and document media types (canvas-reference section 7). Content types and Views wait for the entity upsert. Export to `config/sync`, wrap in `recipes/meridian`.
5. **Seed on deploy.** The bootstrap job runs `drush deploy`, then `scripts/seed_push.py` against the instance's own URL, with the OAuth client credentials from the environment (canvas-reference sections 3 and 4). The Dockerfile copies the script with the seed (section 5). Mirror of the WordPress platform bootstrap runner. The client_credentials token request is a plain POST (observed), so the job needs no interactive login.
6. **Parity.** `compare_port.py` against the Drupal site; fix until every page diffs clean. Then the hero contrast gate and the puppeteer screenshot checks already in `scripts/`.
7. **Platform.** `drupal-base` image, `drupal-client-template`, `drupal-cloudrun` Terraform module in `firebase-cloud`, `mysql-app-catalog` entry, Firebase Hosting site `airport.junaid.guru`.

## 7. Questions and their status

- **Resolved, no CLI.** Canvas Pages are entities, not config. `scripts/seed_push.py` upserts by UUID: GET `by-uuid`, then PATCH if found, else POST with the uuid. A repeat POST of a taken UUID returns 409, and POST does not check alias uniqueness, so the script never POSTs twice (canvas-reference section 3). PATCH replaces a page's components, so the seed owns the components of the pages it writes.
- **Resolved, no wrapper.** The anonymous page output has no Canvas wrapper elements. Core SDC adds `data-component-id` to component roots, which `compare_port.py` ignores (canvas-reference section 6). No allow-list entry is needed.
- **Resolved, rich text is native.** A string prop with `contentMediaType: text/html` is a rich text field (`text_long`, `canvas_html_block`), so `prose` and `data-table` do not need a Block wrapper (canvas-reference section 1).
- Multilingual is not in Canvas 1.0. The site is English only, so not a blocker; recorded so nobody plans a Welsh variant on this stack.

## Sources

- [Canvas docs: Local codebase](https://project.pages.drupalcode.org/canvas/code-components/local-codebase/) — `canvas.config.json` defaults, `npx canvas pull` / `push`, `@/` imports.
- [Canvas docs: Workbench](https://project.pages.drupalcode.org/canvas/code-components/workbench/) — discovered files (`component.yml`, `index.*`, `mocks.json`, `pages/*.json`, `content-templates/*.json`, `regions/*.json` in 1.0, since replaced by page templates in 1.12).
- [Canvas docs: Workbench content templates](https://project.pages.drupalcode.org/canvas/code-components/workbench/content-templates) — `{entityType}.{bundle}.{viewMode}.json`, build in UI then pull.
- [Canvas docs: SDC components](https://project.pages.drupalcode.org/canvas/sdc-components/) — theme `components/<name>/<name>.component.yml` + `.twig`, optional `.css` `.js`, `libraryOverrides`, image schema `json-schema-definitions://canvas.module/image` (not used; see canvas-reference section 0), slots for collections.
- [Canvas 1.0.0 milestone](https://git.drupalcode.org/project/canvas/-/work_items/3517885) — Pages as own entity type, Content Templates for Full view mode, Regions (replaced by page templates in 1.12), SDC + Blocks + Code Components, no multilingual or workspaces.
- [Drupal.org: code component discovery styles](https://www.drupal.org/i/3580749) — index-style vs named-file layout; a push bug with the named style. Only relevant if Code Components are ever added.
- [The Droptimes: Canvas 1.0 announcement](https://www.thedroptimes.com/node/64513) — contrib and custom theme integration still maturing at 1.0.
