---
name: port-page
description: Use when turning one static page (for example static/help/index.html or static/parking/index.html) into a Canvas page tree on the Drupal site, mapping its sections and parts to components, seeding it and getting it to diff clean. Triggers on "port this page", "add the X page to Drupal", "build the page tree".
---

# Port one static page

Read `docs/components.md`, `docs/design/spec.md`, `docs/drupal-canvas.md` §3 to §6 first. Never write a comment in any file. The page is never retyped: copy comes from `static/` through `scripts/build_seed.py`.

## Steps

1. Read the static page. Identify the page hero variant (`page-hero` sky, band or photo), then each `<section>` and the parts inside it, in DOM order. Note the `<title>`, meta description and breadcrumb.
2. Map every part to a component using `docs/drupal-canvas.md` §4 and spec §7 order of preference: prose, ruled-list, data-table, facts, accordion, flat-block, package, tower and photo media. Sections are `section` containers; nesting is `group`. Forms, terminal maps and the site map are code-owned (`form`, `terminal-map` with a `kind` or `terminal` enum).
3. Confirm each component exists under `drupal/web/themes/custom/meridian/components/` and is listed at `/admin/appearance/component`. A missing one: use the new-component skill first. A part no component can express: stop and report rather than bending markup.
4. Entity data (flights, notices, FAQs, roles, releases, offers, facilities, car parks, airlines, routes) is written as leaf components inside the page in this phase, with the text from `docs/copy/data.md` through the seed. Views blocks follow the entity upsert (canvas-reference section 5).
5. Generate the seed for this page: `.venv/bin/python scripts/build_seed.py --target canvas --write`. The parser fails loudly on an unknown element; extend the emitter or the component, never skip the element. Seed paths are keyed by the static path (UUIDs derived from path plus element index), so reruns are stable.
6. Push: `.venv/bin/python scripts/seed_push.py` writes the page through the Canvas HTTP API (the CLI cannot carry pages that contain SDCs; canvas-reference sections 0 and 3), then `ddev drush cr` from `drupal/`.
7. Compare: `.venv/bin/python scripts/compare_port.py <path-prefix>` (for example `help/`), `PORT_BASE_URL` pointing at the ddev URL. See the parity-check skill.
8. Fix at the source of the difference: a markup mismatch is a Twig fix; a text mismatch is an emitter or prop-mapping fix; an element Canvas really adds is a narrow allow-list entry in `compare_port.py`, agreed with the coordinator (parity-check skill, Canvas markup). Never edit `static/` or the seed output. Repeat from step 5 until the diff is empty.
9. Run the grep battery from `CLAUDE.md` and screenshot at 1440 and 390 (parity-check skill). Report the path, components used, any plan table change. Commit nothing.

## Learning the tree shape

If `drupal/seed/pages/` has no emitted page yet, build the homepage by hand in the Canvas UI from the first components, then read it back with a GET on `/canvas/api/v0/content/canvas_page/{id}` (canvas-reference section 2a) to learn the flat component tree before touching the emitter. `npx canvas pull` skips pages that contain SDCs, so it teaches nothing here.
