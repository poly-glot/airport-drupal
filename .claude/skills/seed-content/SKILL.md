---
name: seed-content
description: Use to regenerate the Canvas seed from static/ and load it into the Drupal site - running scripts/build_seed.py --target canvas, writing pages and page templates through the Canvas HTTP API with scripts/seed_push.py, and checking idempotency. Triggers on "reseed", "regenerate the seed", "push the pages", "the site is empty".
---

# Seed content

The seed is a build artefact of `static/` and `docs/copy/data.md`. `drupal/seed/{pages,page-templates}/` is never hand-edited; editing it is the same mistake as editing generated PHP. Never write a comment in any file.

## Generate

```bash
.venv/bin/python scripts/build_seed.py --target canvas --write
```

Outputs: `drupal/seed/pages/*.json` (one flat Canvas component tree per static page, canvas-reference section 2a) and `drupal/seed/page-templates/*.json` (the header, notice bar and footer template, section 2c). No entity JSON is generated in this phase: repeated content is leaf components inside the pages (section 5). The parser fails loudly on any element it does not recognise; fix the emitter or add the component, never skip the element. UUIDs derive from the static path plus element index, so reruns produce byte-identical files unless `static/` changed.

If `--target canvas` is not implemented yet, `scripts/build_seed.py` still only writes the Umbraco `seed.json`; implementing the emitter comes first (plan §6 step 3). The tree shape comes from a page GET (canvas-reference section 2a), not from `npx canvas pull`, which skips pages that contain SDCs.

## Load

Pages and page templates go through the Canvas HTTP API, never the CLI (canvas-reference section 0, row 2). `scripts/seed_push.py` (not written yet) reads `CANVAS_SITE_URL`, `CANVAS_CLIENT_ID` and `CANVAS_CLIENT_SECRET` from `drupal/.env` and takes a client_credentials token (section 4). Run it from the repo root:

```bash
ddev drush cr
.venv/bin/python scripts/seed_push.py
ddev drush cr
```

The script pushes page templates before pages, so each page's `pageVariant` exists when the page is written. Each page is upserted by UUID: `GET .../by-uuid/{uuid}`, then `PATCH` if found, else `POST` with the same uuid (section 3). Never POST twice for one page: alias uniqueness is not checked, so a second POST creates a duplicate.

## Idempotency expectations

- A second run creates nothing. Every page and template is reported as updated, none as created, and the page count is the same before and after. Count through the Canvas admin listing or the API, not the database.
- `PATCH` replaces a seeded page's components wholesale. Editor changes to a seeded page are overwritten by the next load; pages the seed does not own are not touched.
- If a second run creates a page, stop and report: the upsert is broken. Do not fall back to `default_content`, which is not idempotent (canvas-reference section 5).

## After loading

Run the parity-check skill on the paths you seeded. Report counts of pages and page templates loaded, and any warning from the parser or the script. Commit nothing.
