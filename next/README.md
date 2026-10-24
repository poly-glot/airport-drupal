# Meridian frontend

Next.js 16 app on the Drupal Canvas Headless SDK (`@drupal-canvas/headless-next`). Drupal stores the pages; this app renders them with its own components and is what the Canvas editor previews through.

## Run

Production runs the standalone build from `Dockerfile` (port 8080; `/api/health` answers without touching Drupal). Never run `npm run build` in the folder a dev server is using: the build replaces `.next` underneath it and the dev server starts failing with client-manifest errors.

```bash
cp .env.example .env
npm install
npm run dev
```

`CANVAS_SITE_URL` in `.env` is the whole configuration. `npm run check` runs eslint, stylelint, Prettier and tsc; `npm run test:e2e` runs the Playwright smoke, axe and behaviour tests.

## How a page renders

1. `app/[[...slug]]/page.tsx` asks Drupal's `/canvas/content-api` what the path resolves to: published pages through the SDK's cookie-free `fetchPage` wrapped in `unstable_cache` under the `canvas-published-pages` tag (expired at once by `POST /api/revalidate` with `Authorization: Bearer $REVALIDATE_SECRET`, which Drupal's `meridian_revalidate` module sends on every publish; otherwise after an hour), draft previews through the adapter's draft-aware `fetchPage`, never cached. The answer is a tree of elements named `js-<machineName>` with props and slots, plus `head` (title and description, from Metatag) and `context`.
2. `lib/page-regions.ts` splits the root of the tree by component: `notice-bar` and `site-header` before `<main id="main" tabindex="-1">`, `site-footer` after, everything else inside. The page template in Drupal (`canvas.page_variant.*`) holds the chrome and a `marker.page_content` where the page goes.
3. Each region renders through `CanvasComponentTree`, which looks components up in the registry `withCanvas()` generates from `components/*/component.yml` (`.canvas/components.ts`, not committed).
4. In draft mode (inside the editor) the whole tree renders unsplit through `CanvasComponentTree`, which adds the markers the editor uses to select components.

## Canvas facts this app depends on

- Prop and slot names arrive camelCased, whatever `component.yml` says. Names are camelCase in `component.yml` so both sides agree.
- A page template containing a `theme_page_template.*` component is not headless-compatible: Canvas leaves the chrome out of the response. Ours hold the chrome components at the root.
- Components register when the editor loads (`ExternalComponentSync`, driven by the browser). Removing a component from the app deactivates it in Canvas; renaming its `machineName` creates a new one.
- Rich text props reach the component as HTML strings.
- `htmlLimitedBots: /.*/` in `next.config.ts` renders metadata in `<head>` instead of streaming it into a `<div hidden>` at the top of `<body>`.
- `canvas_headless` is experimental in Canvas 1.12: its APIs may change without a deprecation path. Editor preview over plain HTTP works in Chromium only.

## Decisions

- Behaviours run from `useEnhance` after mount, once per element, so server and client render the same markup and React never sees the enhanced DOM during hydration.
- Links are plain `<a>`: full page loads, so the behaviours' document-level listeners never accumulate. `@next/next/no-html-link-for-pages` is off.
- `drupal-canvas/component-prop-names` is off: it wants each prop name derived from its title, and our titles describe where the text sits on the page.
- Fonts load from Google Fonts by family name, because `styles/tokens.css` names the families; `next/font` would rename them.
