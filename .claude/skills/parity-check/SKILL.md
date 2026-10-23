---
name: parity-check
description: Use to prove the Drupal site matches static/ - running scripts/compare_port.py against the ddev site, reading and acting on its diff, and running the hero contrast and screenshot checks. Triggers on "check parity", "does the port match", "run compare_port", "diff the homepage".
---

# Parity check

`static/` is the contract. The port passes only when `scripts/compare_port.py` diffs clean **and** `scripts/visual_diff.py` reports zero renders differing. A clean DOM diff with the wrong stylesheets attached looks finished to a script and broken to a person; on 2026-10-23 the site was reported done at 0 DOM differences while the board was unstyled, every image 404ed and the flights API was off. Never write a comment in any file; never edit `static/` to clear a diff.

## Run

1. Stack up and seeded: the site is `http://airport-drupal.ddev.site` (canvas-reference section 7). Run `ddev drush cr` from `drupal/`. If pages are missing, use the seed-content skill first.
2. Whole site or a prefix:

```bash
PORT_BASE_URL=http://airport-drupal.ddev.site .venv/bin/python scripts/compare_port.py
PORT_BASE_URL=http://airport-drupal.ddev.site .venv/bin/python scripts/compare_port.py help/ parking/
```

The script parses each static page and its Drupal twin into canonical lines (attribute and class order and whitespace ignored; links compared after the `.html` to clean-URL mapping; comments dropped), prints a unified diff per page and a failure count. `PORT_BASE_URL` defaults to `http://localhost:8831`, the Umbraco port, so always set it.

## Read the diff

- `-` lines are static, `+` lines are Drupal. Fix by cause, in this order of likelihood: a missing class or attribute in Twig; a prop that drops or reflows text; a seed mapping that put text in the wrong prop; a missing `data-*`/`aria-*`; DOM order; image `srcset`/`sizes` pattern; link mapping.
- Edit the component or the emitter, regenerate the seed, push, rerun. Never patch the seed JSON or the static page.
- Fetch failures (`FAIL <url>`) mean the page is not seeded or the path mapping differs: check the clean URL (`/flights/`, not `/flights/index.html`).

## Canvas markup

The anonymous page has no Canvas wrapper elements. Core SDC adds `data-component-id="meridian:<name>"` to each component root, and `compare_port.py` already ignores that attribute (canvas-reference section 6). An extra element in the diff is therefore a real difference: fix the Twig or the seed. If `curl -s <url>` shows an element that Canvas does add, add the narrowest allow-list entry in `scripts/compare_port.py` (the element and attribute signature only), record it with its reason in `docs/canvas-reference.md` section 6, and tell the coordinator, because `scripts/compare_port.py` is shared.

## Hero contrast

`python3 scripts/hero_contrast.py static/assets/img/home/hero` must print 12/12 pass (4.5:1 desktop and narrow). Pass the directory explicitly: the default points at the sibling repo. Details in the hero-sky skill.

## Visual diff

`npm install` once (puppeteer-core, Chrome at the macOS default path) and ImageMagick (`magick`). Serve static, then diff every page at 1440 and 390:

```bash
python3 -m http.server 8765 -d static &
python3 scripts/visual_diff.py http://127.0.0.1:8765 http://airport-drupal.ddev.site /tmp/meridian-shots
```

It screenshots both sites full page, pads each pair to the taller height, and prints the percentage of differing pixels per page and width with both heights. A height difference or more than 0.5% differing pixels is `DIFFERS`; up to 0.3% on `home` and `flights` is the split-flap animation. For a `DIFFERS` row open `/tmp/meridian-shots/diff/<page>-<width>.png` (red marks the difference) and crop both originals at that row before guessing. Causes seen so far: a component whose `libraryOverrides.css` lists an extra file and so drops its own (`flight-board.css`); markup that uses another component's class inside a `text/html` prop without depending on it (`status` inside `fact`, `button` inside `site-header`, `flight-board`, `map-pane`); `/assets/` not served (`drupal/web/assets` symlink); a module left disabled (`meridian_flights`).

Then look at the page in Chrome yourself, at both widths, with the network tab filtered to 404 and the console open. Report what you saw, not what the scripts printed.

## Report

Per path: pass or diff, with the first lines of each diff and the cause; the hero gate result; overflow results. Do not fix in the report role unless asked.
