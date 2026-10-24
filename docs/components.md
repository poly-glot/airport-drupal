# Components

Every Meridian component is a Canvas code component in the Next.js app: React owns the markup, the component's stylesheet owns its look, and `component.yml` tells Canvas which props and slots an editor gets. Canvas registers the components from the running app; there is nothing to push, generate or sync.

Read with `docs/design/spec.md` (design law) and `docs/design/system.md` (class catalogue).

## One component, one directory

`next/components/<name>/`:

| File | Rule |
|---|---|
| `component.yml` | `name`, `machineName` (same as the directory), `status: true`, `required`, `props.properties`, `slots` |
| `index.tsx` | default export, a function component; props and slots arrive as React props of the same names |
| `index.css` | the component's rules, imported by `index.tsx` with `import './index.css';` |
| extra modules | only when one component renders several fixed variants: `form/partials/*.tsx`, `terminal-map/maps/*.tsx` |

Global rules live in `next/styles/` (`tokens.css`, `base.css`, `layout.css`, `utilities.css`), imported once by `next/app/globals.css`. Tokens are closed: no new hex, no new custom properties.

A class rendered by one component inside another's markup is styled by importing the owner's stylesheet, never by copying rules: `import '@/components/button/index.css';` in `package`, `form`, `map-pane`, `flight-board` and `site-header`. Another component used as an element is imported as a module: `import Picture from '@/components/picture';`.

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

- Markup rules: keep the class names in `docs/design/system.md`, the `aria-*`, `id`, `hidden` and `data-*` attributes, and the element nesting.
- Adjacent text and expressions render as one string: ``{`${position} of ${total}`}``, not `{position} of {total}`, which React splits into separate text nodes.
- Spaces between inline elements are written `{' '}`.
- Formatted text goes on the element that holds it: `<div className="prose" dangerouslySetInnerHTML={{ __html: body }} />`. When formatted text shares its parent with a sibling (callout title, table caption), the sibling is escaped into the same string with `escapeHtml` from `next/lib/escape-html.ts`, so no wrapper element is added.
- Form controls use `defaultChecked` and `defaultValue`. Internal links are plain `<a>`: full page loads keep the document-level listeners in the behaviours from piling up, so `@next/next/no-html-link-for-pages` is off.
- No comments of any kind.

## Behaviours

`next/lib/behaviours.js` holds the progressive enhancements (`enhanceMenu`, `enhanceNotices`, `enhanceTabs`, `enhanceBoardSearch`, `enhanceSplitFlap`, `enhanceStatusTips`, `enhanceCityRail`, `enhanceHeroSky`). A component with a behaviour starts with `'use client';` and attaches it to its root with `useEnhance` from `next/lib/use-enhance.ts`, which runs each enhancer once per element after mount:

```tsx
const ref = useEnhance<HTMLElement>(enhanceNotices);
return <section ref={ref} className="notice-bar on-dark" aria-label={label}>…</section>;
```

Owners: `site-header` (menu), `notice-bar` (notices), `flight-board` (tabs, search, split-flap, status tips), `city-rail`, `hero` (sky). Every page works without JavaScript; the behaviours only enhance it.

## Adding or changing a component

1. Write or edit the directory as above.
2. `cd next && npm run check` (eslint and tsc).
3. With `npm run dev` running, reload the Canvas editor: it reads `/api/canvas/components` and registers the change. A changed prop list makes a new component version; existing instances keep working and pick it up when edited.
4. Place it on a page in the editor and look at it in Chrome at 1440 and 390 with the network tab filtered to errors.
5. If a prop is renamed or removed, stored content still holds the old key: change it in the editor, or migrate it and re-export the content recipe (`docs/status.md`, Content).
