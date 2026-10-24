# Components

Every Meridian component is a Canvas code component in the Next.js app: React owns the markup, the component's stylesheet owns its look, and `component.yml` tells Canvas which props and slots an editor gets. Canvas registers the components from the running app; there is nothing to push, generate or sync.

Read with `docs/design/spec.md` (design law) and `docs/design/system.md` (class catalogue).

## One component, one directory

`next/components/<name>/`:

| File | Rule |
|---|---|
| `component.yml` | `name`, `machineName` (same as the directory), `status: true`, `required`, `props.properties`, `slots` |
| `index.tsx` | default export, a function component; props and slots arrive as React props of the same names |
| `index.module.css` | the component's rules as a CSS module, imported with `import styles from './index.module.css';` |
| extra modules | only when one component renders several fixed variants: `form/partials/*.tsx`, `terminal-map/maps/*.tsx` |

Global rules live in `next/styles/` (`tokens.css`, `base.css`, `layout.css`, `utilities.css`), imported once by `next/app/globals.css`. Tokens are closed: no new hex, no new custom properties.

Another component used as an element is imported as a component: `import Picture from '@/components/picture';`. When markup needs another component's classes, import that component's module under its own name and use its local names, never copy rules: `import card from '@/components/card/index.module.css';` then `card.title`.

### Class names

- Module classes are camelCase and local: the block root is `.root`, `block__element` is `.element`, `block--modifier` is `.modifier`, combined as `[styles.root, padded && styles.padded].filter(Boolean).join(' ')`. The DOM carries hashed names, so `docs/design/system.md` describes the design vocabulary, not the class strings in the page.
- Global classes, written as plain strings: the layout and utility classes in `next/styles/` (`container`, `on-dark`, `on-light`, `band`, `section`, `stack`, `grid`, `split`, `narrow`, `u-tabular`, `visually-hidden`, `skip-link` and their modifiers), and the `button`, `text-link` and `status` families. Editors write those three families inside rich text, so their stylesheets (`components/button/index.css`, `components/status/index.css`) stay global and `next/app/globals.css` loads them.
- Classes that only exist inside stored rich text or are created by behaviours are styled from the owning module with `:global(...)`: `.table :global(.table__num)` in data-table, `.root :global(.flap__tile)` in flight-board.

## component.yml

```yaml
name: Notice
machineName: notice
status: true
required:
  - kind
  - text
props:
  properties:
    kind:
      title: Bold notice kind, before the dot
      type: string
      examples:
        - Travel disruption
    linkHref:
      title: Link
      type: string
      format: uri-reference
      examples:
        - /flights
slots:
  notices:
    title: Notices
```

- Prop and slot names are camelCase. Canvas's content API sends every prop and slot name camelCased to the frontend (`image_src` arrives as `imageSrc`), so a snake_case name reaches React as `undefined`.
- Every prop has a `title` and at least one `examples` value. The title is what an editor reads in the Settings panel and Canvas has no in-place text editing, so it names the text as it sits on the page (`Link text on the right`), never `Title` or `Text`. Because of that, the `drupal-canvas/component-prop-names` lint rule, which wants a name derived from its title, is off in `next/eslint.config.mjs`.
- Types: `string`, `integer`, `boolean`, `string` + `enum` with `meta:enum`, `string` + `format: uri-reference` for links, `string` + `contentMediaType: text/html` for formatted text. No `array` or `object` props: a collection is a slot of child components.
- Images are plain props (`imageSrc` stem without extension and with the width suffix, `imageAlt`, `imageWidth`, `imageHeight`) rendered through `Picture`, which emits AVIF, WebP and JPEG sources. The files live in `next/public/assets/img/`.

## index.tsx

- Markup rules: keep the element nesting, `aria-*`, `id` and `hidden` attributes, and the `data-*` hooks the behaviours read.
- Adjacent text and expressions render as one string: ``{`${position} of ${total}`}``, not `{position} of {total}`, which React splits into separate text nodes.
- Spaces between inline elements are written `{' '}`.
- Formatted text goes on the element that holds it: `<div className="prose" dangerouslySetInnerHTML={{ __html: body }} />`. When formatted text shares its parent with a sibling (callout title, table caption), the sibling is escaped into the same string with `escapeHtml` from `next/lib/escape-html.ts`, so no wrapper element is added.
- Form controls use `defaultChecked` and `defaultValue`. Internal links are plain `<a>`: full page loads keep the document-level listeners in the behaviours from piling up, so `@next/next/no-html-link-for-pages` is off.
- No comments of any kind.

## Behaviours

`next/lib/behaviours.js` holds the progressive enhancements (`enhanceMenu`, `enhanceNotices`, `enhanceTabs`, `enhanceBoardSearch`, `enhanceSplitFlap`, `enhanceStatusTips`, `enhanceCityRail`, `enhanceHeroSky`). Behaviours never read class names: they find elements through `data-*` hooks (`data-notice-bar-item`, `data-board-row`, `data-city-rail-button="next"`) and record state as data attributes (`data-enhanced`, `data-open`, `data-dry`, `data-tone="warn"`), which the module styles as `.root[data-enhanced] .item`. A component with a behaviour starts with `'use client';` and attaches it to its root with `useEnhance` from `next/lib/use-enhance.ts`, which runs each enhancer once per element after mount and logs, rather than throws, if one fails, so a broken enhancement never takes the server-rendered page down:

```tsx
const ref = useEnhance<HTMLElement>(enhanceNotices);
return <section ref={ref} className={`${styles.root} on-dark`} aria-label={label}>…</section>;
```

Owners: `site-header` (menu), `notice-bar` (notices), `flight-board` (tabs, search, split-flap, status tips), `city-rail`, `hero` (sky). Every page works without JavaScript; the behaviours only enhance it.

## Adding or changing a component

1. Write or edit the directory as above.
2. `cd next && npm run check` (eslint, stylelint, Prettier, tsc), then `npm run test:e2e` with the dev server running.
3. With `npm run dev` running, reload the Canvas editor: it reads `/api/canvas/components` and registers the change. A changed prop list makes a new component version; existing instances keep working and pick it up when edited.
4. Place it on a page in the editor and look at it in Chrome at 1440 and 390 with the network tab filtered to errors.
5. If a prop is renamed or removed, stored content still holds the old key: change it in the editor, or migrate it and re-export the content recipe (`docs/status.md`, Content).
