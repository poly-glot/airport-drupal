# Canvas reference (verified against a running site)

Stack under test: Drupal 11.4.11, drupal/canvas 1.12.0, simple_oauth 6.1.3, default_content 2.0.0-beta1, `@drupal-canvas/cli` 0.26.2, PHP 8.3 (ddev), Node 24.22.1. Written 2026-10-23.

Labels: **OBSERVED** = executed against the local site and seen. **DERIVED** = read from the Canvas module or CLI source in `drupal/web/modules/contrib/canvas`, not executed. **UNVERIFIED** = neither.

## 0. Plan corrections (read first)

| # | Plan said | Fact | Status |
|---|---|---|---|
| 1 | Header, notice bar and footer are Regions pushed from `regions/*.json` | Canvas 1.12 removed global regions. They are replaced by **page templates** (config entity `page_variant`, HTTP `/canvas/api/v0/config/page_variant`). The CLI README states `regions/`, `regionsDir`, `sync.regions` are unsupported and nothing is pushed or pulled for them. The seed target for chrome is `seed/page-templates/<id>.json`, not `seed/regions/` | OBSERVED + DERIVED |
| 2 | `npx canvas push` / `pull` carries pages | CLI 0.26.2 only supports **code components** inside pages. Pull of a page holding SDCs prints `Skipped: contains unsupported components (sdc.meridian.section, sdc.meridian.prose). Only code components are supported.` Push validates elements against a catalogue of `js.*` components and rejects every `sdc.*` type with `Invalid input: expected "canvas:component-tree"`. The seed emitter must call the HTTP API directly (section 3) | OBSERVED |
| 3 | `image.src` holds a static slot stem, component emits `<picture>` | The Canvas image prop is a **media entity reference**. Stored input is `{"target_id": N}` or `{"target_uuid": "<uuid>"}`; a literal `{"src": "/assets/img/...", "alt": "", "width": 560, "height": 840}` is rejected with `The property image is required.` The resolved value Twig receives has `src` of the form `/sites/default/files/probe.jpg?alternateWidths=/sites/default/files/styles/canvas_parametrized_width--%7Bwidth%7D/public/probe.jpg.avif%3Fitok=...`, not a stem. A stem-based `picture` needs plain string props (for example `src`, `alt`, `width`, `height` as `string` and `integer`) instead of the image `$ref` | OBSERVED |
| 4 | No array props | Canvas accepts `type: array` (items string/integer, `maxItems` >= 2, required arrays need `minItems: 1`). The brief's "no array props" is a house rule, not a Canvas limit | DERIVED (`ComponentMetadataRequirementsChecker`) |
| 5 | Stable UUIDs from `build_seed.py` survive `npx canvas push` | The CLI never sends a UUID on create; it writes the server-assigned UUID back into the local file. The HTTP `POST` does accept `uuid` (section 3) | DERIVED (CLI) + OBSERVED (API) |

## 1. SDC prop shapes

Source for the table: Canvas docs Props / Slots / Validations pages (https://project.pages.drupalcode.org/canvas/sdc-components/) cross-checked with `ComponentMetadataRequirementsChecker.php` and the live `/canvas/api/v0/config/component` listing.

### Accepted

| Schema | Canvas field type (OBSERVED `propSources[].sourceType`) | Notes |
|---|---|---|
| `type: string` | `static:field_item:string` | 108 props across the 44 current components |
| `type: string` + `enum: [..]` | `static:field_item:list_string` | empty-string enum value rejected: `Prop "x" has an empty enum value.` `meta:enum` sets labels |
| `type: string` + `format: uri-reference` (or `uri`) | `static:field_item:link` | `uri` is absolute only |
| `type: string` + `contentMediaType: text/html` | `static:field_item:text_long`, text format `canvas_html_block` | **Yes, rich text editor.** Value is stored and passed to Twig as an HTML string. Optional `x-formatting-context: inline\|block`; any other value is rejected |
| `type: string` + `$ref: json-schema-definitions://canvas.module/textarea` | multi-line text | DERIVED (docs) |
| `type: string` + `format: date` | date picker | DERIVED (docs) |
| `type: boolean` | `static:field_item:boolean` | |
| `type: integer` (+ `minimum`/`maximum`) | `static:field_item:integer` | |
| `$ref: json-schema-definitions://canvas.module/image` | `static:field_item:entity_reference` to `media:image` | see section 0 row 3. Needs an `image` media type on the site (recipe installs it) |
| `type: array` with scalar `items` | multiple-cardinality field | `maxItems` must be >= 2; required array needs `minItems: 1`; non-required array must not set `minItems` |

All 44 components written by the theme agents were enabled and **none incompatible** (`/admin/appearance/component/status` read "No incompatible components detected"). OBSERVED. Two components expose no props (`accordion`, `ruled-list`): `propSources` is an empty list.

### Rejected (metadata-level, `ComponentDoesNotMeetRequirementsException`; DERIVED)

- Prop without `title`; slot without `title`.
- Required prop without `examples[0]`; first example failing the prop's own schema; example Canvas cannot store ("cannot be used as a default").
- Empty enum value (also inside array `items`).
- Group named `Elements` (reserved).
- Any prop shape with no matching field type: `Drupal Canvas does not know of a field type/widget to allow populating the <code>x</code> prop, with the shape <code>{...}</code>.` Nested `type: object` without a known `$ref` falls here.
- `status: obsolete`, or `noUi: true`.

### Slots

`slots.<name>` needs `title` (description optional, no `examples`). Output with `{% block <name> %}{% endblock %}` or `{{ <name> }}`. Core 11.4's SDC schema accepts `expected` (list of `provider:component` ids or tags), `minItems` and `maxItems` on a slot (core issue 3514072, fixed 2026-05). They are advisory: Canvas 1.12.0 reads none of them, so the editor still lets any component into any slot; the Canvas merge request 414 that enforces `expected` in the editor (drop zones refuse, library filters) is open against 1.x. Declare `expected` now so the restriction switches on with that release. OBSERVED 2026-10-23 on 1.12.0 with `help-list.items: expected: [meridian:help-item]`: the editor's component library listed every component while a child of that slot was selected, and `POST /canvas/api/v0/content/canvas_page` accepted a page whose help-list `items` slot held a `callout` (201, stored). Nothing in Canvas enforces the keyword yet, so `web/modules/custom/meridian_slots` adds the `MeridianExpectedSlotChildren` constraint to the `component_tree` field type (FieldType `constraints` are item-level: the validator receives one `ComponentTreeItem`, reads the parent's SDC slot metadata through `plugin.manager.sdc`, and compares `provider:component` ids). OBSERVED with it enabled: the content API returns 422 with the message; the editor's auto-save (`POST /canvas/api/v0/layout/...`) still accepts the draft, and `POST /canvas/api/v0/auto-saves/publish` returns 422 and the Unpublished changes dialog shows the message under "1 Error". Canvas prints violation messages as plain text, so use `@` placeholders, never `%`. Real-time feedback: the editor's auto-save never validates, but it re-renders the preview from `POST /canvas/api/v0/layout/...` on every change, so `meridian_slots` adds a `#pre_render` to the core `component` element (via `hook_element_info_alter`) that, for preview containers only (`#type component_container`, `#is_preview`), prefixes an unexpected child with a warning banner. OBSERVED: the banner is in the POST response html and visible in the editor the moment the child lands. Canvas stores slot definitions in `fallback_metadata` without `expected`, so the SDC plugin metadata is the only place to read it. OBSERVED: a `section` with slot `parts` holding `prose` renders the child inside the `section` markup.

### API input rules for props (OBSERVED)

- **Every required prop must be present in `inputs`** on a page or page template write; Canvas does not fill examples. Omission returns 422 `The property cta_label is required.` (site-header needed `cta_label, cta_href, basket_href, basket_label`; site-footer needed `enquiries, phone, phone_href, legal_line`).
- `component_version` is the hash from `/canvas/api/v0/config/component` (`version`, for example `5a5eeaf31c6de993` for `sdc.meridian.section`). It changes when the component's metadata changes. Always read it fresh.

## 2. Page and page template JSON

### 2a. Wire shape of a Canvas Page (OBSERVED, `POST/GET/PATCH /canvas/api/v0/content/canvas_page[/{id}]`)

```json
{
  "id": 1,
  "uuid": "031c5682-5560-42e8-85f9-07c4170f06fe",
  "title": "Probe",
  "status": false,
  "isNew": false,
  "hasUnsavedStatusChange": false,
  "path": "/probe",
  "internalPath": "/page/1",
  "autoSaveLabel": null,
  "autoSavePath": null,
  "description": "shape probe",
  "pageVariant": null,
  "components": [
    {
      "uuid": "11111111-1111-4111-8111-111111111111",
      "component_id": "sdc.meridian.section",
      "component_version": "5a5eeaf31c6de993",
      "parent_uuid": null,
      "slot": null,
      "label": null,
      "inputs": { "heading": "Our airlines", "heading_level": "h2", "last": false },
      "inputs_resolved": { "heading": "Our airlines", "heading_level": "h2", "last": false }
    },
    {
      "uuid": "22222222-2222-4222-8222-222222222222",
      "component_id": "sdc.meridian.prose",
      "component_version": "7fb36c8f8355cdfe",
      "parent_uuid": "11111111-1111-4111-8111-111111111111",
      "slot": "parts",
      "label": null,
      "inputs": { "body": "<p>Hello <strong>world</strong></p>" },
      "inputs_resolved": { "body": "<p>Hello <strong>world</strong></p>" }
    }
  ],
  "links": { "edit-form": "/canvas/editor/canvas_page/1", "delete-form": "/canvas/api/v0/content/canvas_page/1" },
  "entity_id": "1",
  "entity_type": "canvas_page"
}
```

| Field | Meaning |
|---|---|
| `id` | integer entity id, server assigned |
| `uuid` | page UUID. Server assigned unless the POST body supplies `uuid` (then used verbatim, 409 `An entity with UUID "..." already exists.` on a repeat) |
| `title`, `description` | page title; meta description (`""` when unset) |
| `status` | published flag. The CLI creates pages with `false`; the API accepts `true` on POST and PATCH. An anonymous request to an unpublished page does not render it |
| `path` | URL alias, set through the core `path` field (section 4) |
| `internalPath` | `/page/<id>`, always works |
| `pageVariant` | machine name of the page template rendering this page, `null` = site default |
| `components` | flat tree. `parent_uuid` and `slot` are `null` for top-level nodes; order of the array is render order within a slot |
| `components[].uuid` | node UUID, chosen by the caller and kept as given |
| `components[].component_id` | `sdc.<theme>.<name>`, `block.<plugin>`, `js.<name>`, `marker.page_content` |
| `components[].inputs` | the stored prop values: scalars as-is, rich text as an HTML string, image as `{target_id}` or `{target_uuid}` |
| `components[].inputs_resolved` | read-only, what Twig receives (image becomes `{src, alt, width, height}`) |
| `autoSaveLabel`, `autoSavePath`, `isNew`, `hasUnsavedStatusChange`, `links` | editor/auto-save state; ignore on write |

POST/PATCH body accepted: `title, description, status, path, pageVariant, components` (PATCH ignores absent keys). Page-level writes take `null` for `parent_uuid`, `slot`, `label`.

### 2b. Authored file shape the CLI reads and writes (DERIVED, `pages.ts`, `page-spec.schema.json`)

`seed/pages/<name>.json`, only meaningful for code components in 0.26.2:

```json
{
  "uuid": "optional, written back after create",
  "title": "required",
  "path": "required, alias or empty string",
  "description": "optional",
  "pageVariant": "optional machine name",
  "elements": {
    "<key>": { "type": "js.hero", "props": {}, "slots": { "<slot>": ["<child key>"] }, "_provenance": {} }
  }
}
```

`elements` keys that are not RFC 4122 UUIDs are replaced by random v4 UUIDs on push, so a non-UUID key is not stable across pushes. No `root` key allowed. Additional properties rejected. Top-level elements are those not named in any slot. The flat `components` array above is this map with `parent_uuid`/`slot` rebuilt from the `slots` lists. A seed emitter targeting the HTTP API can skip this format and write the flat array directly.

### 2c. Page template (the replacement for Regions) (OBSERVED, `/canvas/api/v0/config/page_variant`)

POST body (config entity: nulls rejected, omit `parent_uuid`, `slot`, `label` instead):

```json
{
  "id": "probe",
  "label": "Probe template",
  "description": null,
  "status": true,
  "component_tree": [
    { "uuid": "aaaaaaaa-0000-4000-8000-000000000001", "component_id": "sdc.meridian.site-header", "component_version": "bb0cd3588283f2c4",
      "inputs": { "cta_label": "Book", "cta_href": "/book/", "basket_href": "/basket/", "basket_label": "Basket" } },
    { "uuid": "aaaaaaaa-0000-4000-8000-000000000002", "component_id": "marker.page_content", "component_version": "3b12c0b99a6caecc", "inputs": {} },
    { "uuid": "aaaaaaaa-0000-4000-8000-000000000003", "component_id": "sdc.meridian.site-footer", "component_version": "4ad7d21254a444dc",
      "inputs": { "enquiries": "a@b.c", "phone": "0123", "phone_href": "tel:0123", "legal_line": "(c)" } }
  ]
}
```

The response echoes `component_tree` with `parent_uuid`, `slot`, `label`, `inputs_resolved` added. Rules:

- Exactly one `marker.page_content` node. Page content renders at that position.
- `PATCH /canvas/api/v0/settings/default-page-variant` with `{"default_page_variant": "<id>"}` sets the site default; `null` clears it. A page can override with its own `pageVariant`.
- OBSERVED render: with the template as default, `/probe` output was `<header class="header" ...>` + page content + `<footer class="footer on-dark" ...>` directly inside `div.dialog-off-canvas-main-canvas`. The core page-title block (an `<h1>` of the page title) and branding block that the theme's `page.html.twig` produces **disappear**, and there is **no `<main id="main">` wrapper**, so the skip link `#main` has no target unless a component provides `id="main"`.
- Without any template the theme's `page.html.twig` renders: branding block, a page-title block `<h1>Probe</h1>` (would duplicate the hero `h1`), then `<main id="main">`.
- `canvas_page_template_component` (enabled by the recipe) exposes `theme_page_template.meridian` with slots `notice, header, content, footer` (the theme regions). Using it keeps the plan's four region names inside a template.
- CLI file for templates (DERIVED): `seed/page-templates/<id>.json` = `{label, description?, status?, default?, elements}`; CLI push **deletes remote templates absent locally**. Do not use the CLI push for templates either until it knows `sdc.*`.

### 2d. What `npx canvas pull` produced

On the running site with SDC-only content: `Nothing to pull` (empty site), then `Pages: 1 pull (1 new)` followed by `Skipped: contains unsupported components`. No `pages/*.json` was written. The shape in 2b is therefore **derived from source**; the shape in 2a/2c is observed from the API.

## 3. Page identity, URL path, idempotent seeding

- Keys: integer `id` (unstable across installs) and `uuid` (stable if supplied on POST). The path alias is a core `path` field item `{alias, pid}`. OBSERVED: `path: "/probe"` served the page at `/probe` (200 once published) and `/page/1` also worked.
- Lookup by UUID: `GET /canvas/api/v0/content/canvas_page/by-uuid/{uuid}` (200 or 404). OBSERVED.
- **Idempotent upsert protocol (recommended for the emitter and the deploy job)**: `GET by-uuid`; if found `PATCH /canvas/api/v0/content/canvas_page/{id}` with `{title, description, status, path, components}`; else `POST /canvas/api/v0/content/canvas_page` with the same body plus `uuid`. OBSERVED: second POST of a taken UUID returns 409; PATCH replaces `components` in place and keeps id, uuid and alias.
- Duplicate aliases: POST does not check alias uniqueness (source `@todo`). OBSERVED: a second page POSTed with `/probe2` succeeded and both pages listed that path. Always upsert by UUID, never POST twice.
- PATCH with a changed `path` for an existing page updates the alias row in place (source reads the existing `pid`); the CLI forbids changing it, the API does not. DERIVED.
- `npx canvas push` idempotency: matches by UUID from the local file; no UUID or unknown UUID means **create**, and the server-assigned UUID is written back. So a clean checkout pushing to a fresh database creates new UUIDs and a second run of a file that was not written back creates duplicates. Existing pages are updated with their remote `status` preserved. Not tested twice because SDC pages cannot be pushed by it. DERIVED.
- Homepage: pages expose a `set-as-homepage` link; the underlying setting is `system.site:page.front`. `drush config:set system.site page.front /<alias>` is the scripted form. UNVERIFIED.

## 4. HTTP API access from scripts

OBSERVED working setup:

1. Modules: `simple_oauth`, `canvas_oauth` (shipped in the canvas package), `consumers`.
2. RSA keys in `drupal/keys/` (gitignored), `simple_oauth.settings` `public_key` and `private_key` set to the container paths.
3. Media types `image` and `document` must exist, otherwise the CLI default scope list includes `canvas:media:image:create` and `canvas:media:document:create` and the token request fails with `invalid_scope`. The recipe applies the core recipes; after creating media types call `\Drupal::classResolver(\Drupal\canvas_oauth\MediaScopesHelper::class)->ensureMediaScopes()` and add the new scopes to the consumer.
4. A consumer with `grant_types: client_credentials`, `confidential: true`, a `secret`, `user_id: 1` and all `oauth2_scope` ids.
5. `POST /oauth/token` with `grant_type=client_credentials&client_id=canvas-cli&client_secret=...` returns a bearer token valid 300 seconds. Scopes seen (the list still names `canvas:page_region`, a leftover from before page templates): `canvas:asset_library, canvas:brand_kit, canvas:content_template, canvas:js_component, canvas:media:view, canvas:media:image:create, canvas:media:document:create, canvas:page:create, canvas:page:read, canvas:page:edit, canvas:page:delete, canvas:page_region, canvas:page_variant`.
6. Calls send `Authorization: Bearer ...`, `Content-Type: application/json`, `Accept: application/json`.

CLI config that works (`drupal/canvas.config.json`, `drupal/.env`): `CANVAS_SITE_URL=http://airport-drupal.ddev.site`, `CANVAS_CLIENT_ID=canvas-cli`, `CANVAS_CLIENT_SECRET=<local secret>`. `canvas.config.json` keys in 0.26.2: `componentDir, pagesDir, contentTemplatesDir, pageTemplatesDir, aliasBaseDir, outputDir, globalCssPath, sync.{pages,contentTemplates,pageTemplates}`. There is no `regionsDir`. `npx @drupal-canvas/cli pull --yes --no-include-brand-kit` is the working invocation (the bin is `canvas`). Node must be >= 24.5 or 22.19.

## 5. Importing content entities

- Core has no content import. `drupal/default_content` 2.0.0-beta1 installs on Drupal 11.4 (needs `composer require 'drupal/default_content:^2.0@beta'`).
- **Not idempotent.** OBSERVED: `\Drupal::service('default_content.importer')->importContent('<module>')` run twice throws `SQLSTATE[23000] ... Duplicate entry '<uuid>' for key 'node_field__uuid__value'` (the importer does `enforceIsNew(TRUE)`). It is a one-shot on module install.
- **Export is broken with Canvas installed.** OBSERVED: `drush default-content:export node 2` fails `TypeError: parse_url(): Argument #1 ($url) must be of type string, Drupal\canvas\Plugin\DataType\MaybeUrl given` in `ContentEntityNormalizer.php:425`. Generate the YAML in `build_seed.py` instead of exporting.
- File format that imports (OBSERVED): `drupal/seed/content/<entity_type>/<uuid>.yml` with `_meta: {version: '1.0', entity_type, uuid, bundle, default_langcode}`, then `default:` mapping each field to a list of `{value: ...}` (reference fields use `entity: <uuid>`, dependencies listed under `_meta.depends: {<uuid>: <entity_type>}`).
- **Idempotent upsert that works (OBSERVED, run twice, one row, updated title):** parse the YAML with `Yaml::decode`, `\Drupal::service('default_content.content_entity_normalizer')->denormalize($data)`, `loadByProperties(['uuid' => $e->uuid()])`; if found copy every non-empty field except the id, revision id and uuid onto the existing entity and save, else `enforceIsNew()` and save. Run it as `ddev drush scr <script>` (script must start with `<?php`). Wrap it as a drush command in the custom module that owns the seed (not in `meridian_flights`).
- Entities referencing media need the file and media entities imported first; default_content orders by `_meta.depends`.

## 6. SDC JS and CSS in Canvas

OBSERVED on the rendered public page with `site-header` (has `libraryOverrides.js`):

- CSS: each rendered component's `<name>.css` is folded into Drupal's aggregated CSS (`/sites/default/files/css/css_*.css`). Only components present on the page contribute; `core/misc` CSS aggregation applies.
- JS: `<script src="/core/../themes/custom/meridian/components/site-header/site-header.js?..." defer></script>` is emitted in the footer scope, and the URL returns 200. The `defer` attribute comes from `libraryOverrides.js.<file>.attributes.defer`.
- Core SDC adds `data-component-id="meridian:<name>"` to the root element of every component that prints `{{ attributes }}`. The static markup has no such attribute, so `compare_port.py` ignores it (`IGNORED_ATTRIBUTES` in scripts/compare_port.py). No Canvas wrapper elements or comments appear in the anonymous page output; the `<!-- canvas-start-<uuid> -->` comments exist only in the editor's `default_markup` / preview HTML.
- Site-header was rendered with an empty nav: `<ul class="header__list">` was empty because the `nav` slot had no children. Menus come from slot children (`nav-link`), not a Drupal menu.

DERIVED (docs and Canvas source, not executed in a browser):

- Libraries needed by a component belong in `libraryOverrides` in its `.component.yml` (docs, SDC index page). Dependencies `core/drupal`, `core/once`, `meridian/shared` are available.
- Canvas editor previews re-render components by HTTP and re-run `Drupal.attachBehaviors` on new DOM, so each behaviour must use `once()` and tolerate being attached again to the same page. Behaviours must not assume `document` ready order or a single instance per page.
- BigPipe: JS libraries that are only attached to lazy-built placeholders arrive with the placeholder response; `Drupal.behaviors` + `once` covers that. The Meridian components sit in the main render, not in placeholders.
- Preview iframes load only the aggregated asset set for the components in the tree; a component that relies on a sibling component's CSS or on `meridian/base` classes must have `meridian/base` in the theme `libraries:` (it is) rather than in the component.

## 7. Local stack

Project: `drupal/` with ddev project `airport-drupal`, URL `http://airport-drupal.ddev.site`, PHP 8.3, MariaDB 10.11. Admin login: user `admin`, password `admin` (local only; `ddev drush uli` gives a one-time link). The CLI OAuth secret lives only in `drupal/.env` (gitignored).

Commands that worked, in order (all from `drupal/` unless noted):

```bash
ddev config --project-type=drupal11 --docroot=web --project-name=airport-drupal
ddev start
ddev exec 'cd /tmp && composer create-project drupal/recommended-project:^11 rp --no-install --no-interaction && cp rp/composer.json /var/www/html/composer.json'
ddev composer require drupal/canvas drush/drush drupal/simple_oauth:^6 'drupal/default_content:^2.0@beta' drupal/gcs:2.0.x-dev
ddev drush site:install minimal --account-name=admin --account-pass=admin --site-name="Meridian Airport" -y
ddev drush en canvas canvas_oauth canvas_page_template_component -y
ddev drush theme:enable meridian -y
ddev drush config:set system.theme default meridian -y
ddev drush recipe /var/www/html/web/core/recipes/image_media_type
ddev drush recipe /var/www/html/web/core/recipes/document_media_type
ddev drush cex -y
```

Resolved versions: `drupal/canvas ^1.12` (1.12.0), `drush/drush ^13.8`, Drupal 11.4.11.

Facts about the stack:

- `drupal/web/assets` is a symlink to `../../static/assets` and `drupal/web/favicon.svg` to `../../static/favicon.svg`, so the static `/assets/...` and `/favicon.svg` URLs resolve under the nginx docroot. Inside the ddev container the symlinks resolve to `/var/www/static/...`; `.ddev/docker-compose.static.yaml` mounts `../static` there read-only. Without them every image 404s. The earlier symlink inside the theme directory served nothing, because the markup uses root-relative `/assets/` URLs.
- `web/sites/default/settings.meridian.php` sets `config_sync_directory` to `../config/sync`, and is required from `settings.php` by a ddev `post-start` hook (`.ddev/config.meridian.yaml`), so a fresh clone gets it on `ddev start`.
- The recipe `drupal/recipes/meridian/recipe.yml` applies cleanly on top of the running site (`ddev drush recipe /var/www/html/recipes/meridian`). Core recipes are referenced as `../web/core/recipes/<name>`; the bare name does not resolve.
- OAuth plumbing is not in config (consumer is a content entity, keys are files). Steps to recreate it are in the root `README.md`.

## 8. Hosting draft (UNVERIFIED beyond a local build)

What was run: `docker build -f drupal/Dockerfile -t meridian-drupal:draft .` from the repo root (context must be the repo root because the image copies `static/assets`). The image built, started against the ddev MariaDB (`--network ddev_default`), ran `drush deploy` (updatedb: nothing, config import: no changes, cache rebuild, deploy hooks: none), and served `/` and a theme asset with 200. That is the whole extent of the verification.

Files: `drupal/Dockerfile`, `drupal/Dockerfile.dockerignore`, `drupal/docker/{entrypoint.sh,php.ini,Caddyfile}`, `drupal/web/sites/default/settings.cloudrun.php` (copied to `settings.php` in the image; reads `DRUPAL_DB_*`, `DRUPAL_HASH_SALT`).

Design: `dunglas/frankenphp:1-php8.3` with `apcu gd intl opcache pdo_mysql zip`; `composer install --no-dev` inside the image (git and unzip installed because `drupal/gcs` is `2.0.x-dev` with no dist archive); `opcache.validate_timestamps=0`; APCu 64M; the entrypoint runs `drush deploy --yes` then `exec`s FrankenPHP on port 8080; Caddy writes under `/tmp` so the non-root user works. Container runs as `www-data`.

Not done or not verified:

- **GCS file storage.** `drupal/gcs` (2.0.x-dev, requires `google/cloud-storage ^1.48`, Drupal ^11 or ^12) is installed by Composer but **not enabled and not configured**; no credentials were set. The alternative is `drupal/flysystem_gcs` (beta, declared for core up to ^11) on top of `drupal/flysystem`. Neither was activated. Cloud Run's filesystem is ephemeral, so uploaded files are lost until one of them is configured with workload identity.
- `drush deploy` on an **empty** database was not run: the site install and seed are not part of the entrypoint. A first-boot path (`site:install --existing-config`, then the seed job) is missing.
- Seeding on deploy (section 3 protocol and section 5 script) is not wired into the entrypoint. The seed emitter does not exist yet.
- No Cloud SQL / HeatWave connection, no secret manager wiring, no `trusted_host_patterns` tightening (`^.+$` is a placeholder), no health endpoint, no Cloud Run `PORT` mapping (port is fixed at 8080; Cloud Run's default matches), no multi-arch build (built arm64 on this Mac; Cloud Run needs `--platform linux/amd64`).
- The Caddyfile allows PHP execution for every `.php` under `web/`; the private-path rule is minimal.
- `COPY static/assets ./web/assets` and `COPY static/favicon.svg ./web/favicon.svg` replace the dev symlinks inside the image; the image holds a second copy of the assets.
- `private/` (`file_private_path`) is on the ephemeral disk.

### 8.1 Production rehearsal, 2026-10-23

The image in `drupal/Dockerfile` was built and run locally against an empty database in the ddev MariaDB. `meridian-bootstrap` installed from `config/sync` (`site:install --existing-config`), ran `scripts/ensure-oauth.php` (key paths, media scopes, `canvas-cli` consumer), started FrankenPHP and pushed the 29 pages and 10 page templates through the HTTP API. The service container then served every page with 200, issued a client-credentials token, and `compare_port.py` and `visual_diff.py` both reported zero differences. The visual result came only after a last fix: `file_assets_path` had been set to the absolute `/tmp/assets`, which made Drupal emit `//tmp/assets/...` stylesheet URLs and left every page unstyled (58 of 58 renders differed); the path must be web-served inside the docroot, now `sites/default/assets`, after which `visual_diff.py` printed `0 render(s) differ`. Other findings on the way: the installer needs `web/sites/default` writable by the runtime user even with complete settings; simple_oauth refuses a hash salt under 32 characters with a 500 on `/oauth/token`; the OAuth key files must exist in every container, so the entrypoint writes them from env; a Canvas component config entity and the folder that lists it survive a component's deletion and break the install until removed; the `drupal/gcs` module's hooks are Drupal 7 era and never run. On Cloud Run itself (first live bootstrap, 2026-10-23): Cloud Run `command` replaces the image entrypoint, so jobs must use `args`; and with the files bucket mounted at `sites/default/files`, Drupal's compiled Twig landed in `files/php` on the FUSE mount and `GET /canvas/api/v0/config/component` died at PHP's 30-second limit inside `PhpStorage/FileStorage.php`; `php_storage` for `twig` and `default` now points at `/tmp/php`. Plan and decisions: `docs/platform.md`.
