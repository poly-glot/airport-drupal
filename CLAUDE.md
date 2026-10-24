# Meridian Airport: decoupled Drupal Canvas and Next.js

Drupal 11 with Canvas is the editor and content API (`drupal/`); a Next.js app on the Canvas Headless SDK renders the site (`next/`). The Meridian components are React code components in `next/components/`. Read before any work: `README.md`, `docs/components.md` (how a component is written and registered), `docs/design/spec.md` (design law), `docs/status.md` (what is open), `next/README.md` (how the app talks to Canvas).

## Rules that do not bend

1. No comments in any code file: TSX, TS, JS, CSS, PHP, YAML, Dockerfile, shell, Python. Explanation lives in `docs/` and READMEs. Express intent through names and structure.
2. No new hex, no new tokens. `next/styles/tokens.css` is closed.
3. Editorial copy lives in Canvas pages, never in components. Literal text in a component is limited to UI chrome every page shares (skip link, legend labels, "Updated" prefixes, control labels).
4. Content ships as `drupal/recipes/meridian_content/content/` exported with `drush content:export`; configuration ships as `drupal/config/sync/` exported with `drush cex`. Never hand-edit either; change the site and export.
5. A component's prop and slot names are camelCase: Canvas sends them camelCased to the frontend.
6. Done means checked: `cd next && npm run check` (eslint, stylelint, Prettier, tsc) and `npm run test:e2e` (Playwright smoke and axe on every shipped page at 1440 and 390, against the running dev server) pass; `cd drupal && ddev composer quality` (phpcs, PHPStan level 8, Rector dry run) passes when PHP changed; the change is seen in the Canvas editor (reload it so it registers metadata changes). A sentence that states a check result is written only after the command printed it, and quotes it.
7. Anything the design docs and the existing components do not settle: stop and report. Do not invent.
8. Before deleting a symbol, file or library, search for its bare name and for destructuring; then run `npm run build`.

## Design law (docs/design/spec.md)

Flat editorial page: 1px rules, zero radius, zero shadow in the page plane. Radius and shadow exist only on the floating plane (hero search card r14 and wait panel, parking form card r8, map info card and chrome, mobile menu sheet). Radii: 0 content, 2 legend and status squares, 6 inputs and ghost buttons, 8 primary buttons, 10 large buttons, 12 top tabs, 14 hero floats, 50% dots. Hover is colour and underline, never movement; photography may `scale(1.04)` inside a flush frame. Serif for display, Plus Jakarta Sans for component titles, Public Sans for body. Forbidden: shadowed white cards, rounded media in the page plane, `translateY` hovers, hover shadows, left-border accents, gradient washes outside photo and tower overlays.

Hero photos must keep white text at 4.5:1: `.venv/bin/python scripts/hero_contrast.py` prints 12/12 pass.

## One component, one directory

`next/components/<name>/` holds `component.yml`, `index.tsx` and `index.css` (when it has rules). Full contract in `docs/components.md`.

- Markup keeps the class names catalogued in `docs/design/system.md` and every `aria-*`, `id`, `hidden` and `data-*` the behaviours rely on.
- A class rendered by one component inside another's markup is styled by importing the owner's stylesheet (`import '@/components/button/index.css';`), never by copying rules.
- Behaviours live in `next/lib/behaviours.js` and attach with `useEnhance` from `next/lib/use-enhance.ts` on the component root, in a `'use client'` component. Everything works without JavaScript.
- Images go through `components/picture` with the stem convention; files live in `next/public/assets/img/`.

## Skills and agents

Skills (`.claude/skills/`): `new-component`, `hero-sky`, `design-review`, `platform-maintenance`. Agents (`.claude/agents/`): `component-builder`, `design-reviewer`.

## Local stack

ddev project lives in `drupal/`; run `ddev` commands from there. Next app: `cd next && npm run dev` on port 3000. Ports 8765, 8770 and 8771 belong to other projects; never touch them. Python deps live in `.venv/`.

## Git

- Author and committer: `Junaid Ahmed <me@junaid.guru>`, set explicitly: `git -c user.name="Junaid Ahmed" -c user.email="me@junaid.guru" commit -m "..."`.
- Never add `Co-Authored-By`, "Generated with", a session link or any AI attribution to a commit, tag or PR body. Before any push, run `git log --format='%h %s' --grep='Co-Authored-By' --grep='Claude' -i` on the range.
- Never push without explicit permission for that specific push. Commit only when asked; builder agents commit nothing, the coordinator does.

## Content

British English in all copy and docs (colour, organisation, licence, never US spellings). Dates `Saturday 3 October`, 24-hour times, `£` prices.

## Ownership

Other agents may be writing concurrently. Touch only the paths your assignment names.
