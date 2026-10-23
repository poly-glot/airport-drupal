# Meridian Airport: Drupal Canvas port

Second CMS port of the Meridian Airport site. `static/` is the finished site; `drupal/` reproduces it page for page on Drupal 11 and Canvas. Read in this order before any work: `README.md`, `docs/components.md` (conventions), `docs/drupal-canvas.md` (plan, §3 to §6), `docs/design/spec.md` (design law), `docs/status.md` (what is open). Local stack commands: `docs/canvas-reference.md`.

## Rules that do not bend

1. `static/` is the contract. Never edit it to make the port easier. If the port cannot match it, the port changes, or the problem is reported.
2. No comments in any code file: Twig, CSS, JS, PHP, YAML, Dockerfile, shell, Python. Explanation lives in component READMEs and `docs/`. Express intent through names and structure.
3. No new hex, no new tokens. `static/assets/css/base/tokens.css` is closed and `drupal/web/themes/custom/meridian/css/base/` is not extended.
4. Every component cites the homepage element or spec rule it derives from, in its README. "It was in v1" is not a derivation. Inner pages ask "what would this page do for that content", never "what does a generic site do".
5. The seed is generated: `scripts/build_seed.py --target canvas` writes `drupal/seed/{pages,regions,content}/`. Never hand-edit it. Fix the cause in `static/`-side parsing or the emitter and regenerate.
6. Parity is proven twice: `scripts/compare_port.py` for the DOM and `scripts/visual_diff.py` for the render, both against the ddev site, then a look in Chrome at 1440 and 390 with the network tab on 404. A DOM diff alone once passed a site with no images, an unstyled board and a dead API; never report a page done on it. A sentence that states a verification result is written only after that command has printed it, and quotes the printed number.
7. Editorial copy lives in Canvas pages seeded from `static/`, never in Twig. Literal Twig text is limited to UI chrome the static site hard-codes everywhere.
8. Anything not derivable from `static/`: stop and report. Do not invent.
9. Before deleting a symbol, file or library, search for its bare name and for destructuring, or ask codegraph for its references; a grep for one access pattern once called a consumed library unused. Run `scripts/visual_diff.py` after every deletion pass, not only at the end.

## Design law (docs/design/spec.md)

Flat editorial page: 1px rules, zero radius, zero shadow in the page plane. Radius and shadow exist only on the floating plane (hero search card r14 and wait panel, parking form card r8, map info card and chrome, mobile menu sheet). Radii: 0 content, 2 legend and status squares, 6 inputs and ghost buttons, 8 primary buttons, 10 large buttons, 12 top tabs, 14 hero floats, 50% dots. Hover is colour and underline, never movement; photography may `scale(1.04)` inside a flush frame. Serif for display, Plus Jakarta Sans for component titles, Public Sans for body. Forbidden: shadowed white cards, rounded media in the page plane, `translateY` hovers, hover shadows, left-border accents, gradient washes outside photo and tower overlays.

Design battery, run from the repo root before reporting:

```bash
python3 scripts/design_battery.py
```

It first runs `scripts/sync_static.py --check`, which fails if any theme CSS or JS differs from what `static/` generates or exists without being generated; then it checks every component directory: no comments in Twig or metadata, no raw hex in Twig, every prop has a title, examples and a scalar type, and a README exists. It prints nothing but `design battery ok` when clean.

## One component, one directory

`drupal/web/themes/custom/meridian/components/<name>/` holds exactly `<name>.component.yml`, `<name>.twig`, `<name>.css`, `<name>.js` (only if `static/assets/js/site.js` has an `enhance*` for it) and `README.md`. Machine names and props come from `docs/drupal-canvas.md` §4; if static markup forces a change, update that table too and say so in the README.

- Twig is the static element's markup: same nesting, class names, `aria-*`, `id`s, `hidden`, `data-*`. Text becomes props, repeated children become a slot (`{% block items %}{% endblock %}`). Root element ends with `{{ attributes }}`.
- CSS and JS are never edited in the theme. `static/assets/css` and `static/assets/js/site.js` are the single source; `python3 scripts/sync_static.py` generates every component stylesheet and behaviour from them (the owner table in that script says which static file, or which selector prefix of a split file, lands in which component). Change static, run the sync, commit both.
- component.yml: `status: stable`, `group` one of `Meridian · Bands`, `Meridian · Inner pages`, `Meridian · Parts`, `Meridian · Chrome`. Every prop has `title` and `examples` taken from the static site. Types: `string`, `integer`, `boolean`, `string` + `enum`, `string` + `format: uri-reference`, images as `$ref: json-schema-definitions://canvas.module/image`, formatted text as `string` + `contentMediaType: text/html`. No `array` or `object` props; a collection is a slot of child components. Template: `.claude/skills/new-component/SKILL.md`.
- Images go through `{{ include('meridian:picture', { image: image, sizes: '...', loading: 'lazy' }, with_context = false) }}`; the image field holds the slot stem.
- Icons are inline SVG copied from static, `currentColor`, selected by enum.

## JS behaviour pattern

One Drupal behaviour per component, generated by `scripts/sync_static.py` from the init lines at the end of `site.js`: each `document.querySelectorAll(selector).forEach(enhanceX)` becomes a `once` call, and every declaration the entry functions reference comes along. `libraryOverrides` lists `core/drupal`, `core/once` and the file with `defer: true`. A class rendered by one component inside another's markup is declared as a `core/components.meridian--<name>` dependency, never copied into a second stylesheet. Ownership of each `enhance*` is in `docs/components.md`. Full pattern in the new-component skill.

## Skills and agents

Skills (`.claude/skills/`): `new-component`, `port-page`, `hero-sky`, `parity-check`, `seed-content`, `design-review`, `platform-maintenance`. Agents (`.claude/agents/`): `component-builder`, `design-reviewer`, `parity-checker`, `content-seeder`. Use them; each reads `docs/components.md` and the spec first.

## Local stack

ddev project lives in `drupal/`. Run `ddev` commands from there; commands, URLs and the Canvas CLI setup are in `docs/canvas-reference.md`. Component library: `/admin/appearance/component`. Static preview: `python3 -m http.server 8788 -d static` (ports 8765, 8770, 8771 belong to other projects; never touch them). Python deps live in `.venv/`: `.venv/bin/python scripts/...` if `python3` lacks bs4 or PIL.

## Git

- Author and committer: `Junaid Ahmed <me@junaid.guru>`, set explicitly: `git -c user.name="Junaid Ahmed" -c user.email="me@junaid.guru" commit -m "..."`.
- Never add `Co-Authored-By`, "Generated with", a session link or any AI attribution to a commit, tag or PR body. Before any push, run `git log --format='%h %s' --grep='Co-Authored-By' --grep='Claude' -i` on the range.
- Never push without explicit permission for that specific push. Commit only when asked; builder agents commit nothing, the coordinator does.

## Content

British English in all copy and docs (colour, organisation, licence, never US spellings). Dates `Saturday 3 October`, 24-hour times, `£` prices.

## Ownership

Other agents may be writing under `drupal/` concurrently. Touch only the paths your assignment names. Generated: `drupal/seed/**`, `drupal/web/themes/custom/meridian/assets` (symlink to `static/assets`).
