---
name: new-component
description: Use when adding or changing a Single Directory Component (SDC) in the Meridian theme, building a Canvas component from a static element, or when asked to "build the X component", "add an SDC", or "port this section into a component". Covers deriving from static/, the five files, the grep battery, the Canvas component library check and the README.
---

# New component from a static element

Read `docs/components.md`, `docs/design/spec.md` and `docs/drupal-canvas.md` §4 first. Never write a comment in any file.

## Steps

1. Find the element. Look the component up in `docs/drupal-canvas.md` §4 for its machine name, props and slots, then locate it in `static/` (`grep -rn 'class="<root-class>' static --include=*.html`). Homepage elements live in `static/index.html`; inner-page vocabulary is in `static/assets/css/components/content.css` and the pages that use it. If the element is not in `static/`, stop and report.
2. Derive. Note the homepage element or spec rule that governs it (spec §3 to §8). Read the matching `static/assets/css/components/<name>.css` and the `enhance*` function in `static/assets/js/site.js`, if any.
3. Write the five files in `drupal/web/themes/custom/meridian/components/<name>/`:
   - `<name>.component.yml`, template below.
   - `<name>.twig`: the static markup, every class, `aria-*`, `id`, `hidden`, `data-*` kept; text as props, children as slots, `{{ attributes }}` last on the root.
   - `<name>.css`: never written by hand. Add the static file, or the selector prefix of a split file, to `CSS_OWNERS` in `scripts/sync_static.py` and run `python3 scripts/sync_static.py`; the battery fails on any stylesheet the sync did not produce.
   - `<name>.js`: only when static has an `enhance*` for it.
   - `README.md`: static file and element (path plus a distinctive class or heading), governing spec rule, a props and slots table, known deviations (should be none).
4. Examples. Each prop's `examples` come from the static text, so the Canvas preview reads as the static element. Enum values come from the variants actually present in static.
5. Grep battery: run the block in `CLAUDE.md`; fix everything it prints.
6. Check in Canvas: `ddev drush cr`, open `/admin/appearance/component`, confirm the component is listed without an incompatibility reason, its preview renders from the first examples, and drop it in a Canvas page to confirm slots accept children. Record any incompatibility in the README and `docs/drupal-canvas.md` §4.
7. Side-by-side: `sed -n` the static element next to the rendered output; every class and attribute present.
8. Report components written, plan deviations, anything not derivable. Commit nothing.

## component.yml template

```yaml
$schema: https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
name: Help item
status: stable
group: Meridian · Inner pages
description: One ruled row with icon, title and body, as on the homepage help band.
props:
  type: object
  required: [title]
  properties:
    icon:
      type: string
      title: Icon
      enum: [assistance, children, first-flight, alerts, lost-property, contact]
      examples: [assistance]
    title:
      type: string
      title: Title
      examples: [Special assistance]
    body:
      type: string
      title: Body
      examples: [Book help through the terminal at least 48 hours before you fly.]
    href:
      type: string
      format: uri-reference
      title: Link
      examples: [/help/special-assistance/]
slots:
  items:
    title: Items
    description: Help items, one per row.
libraryOverrides:
  dependencies:
    - core/components.meridian--section-head
```

Rules: no `object` props and no `array` props (Canvas accepts arrays, but collections are slots by house rule); formatted text is `string` with `contentMediaType: text/html`; images are scalar props, not media references: a component with an image carries `image_src` (static stem), `image_alt`, `image_width` and `image_height`, and renders through `meridian:picture`, which takes `src` (stem with width suffix), `alt`, `width`, `height`, `widths`, `sizes`, `loading`, `priority`, `css_class` and `picture_class` (canvas-reference section 0, row 3); every prop needs a `title` that names the text as it sits on the page (`Line under the heading`, not `Body`), because the Settings panel is the only place an editor can change it, and a first example that passes its schema, and a page write must carry every required prop (canvas-reference section 1); heading level varies via a `heading_level` enum rendered as `<{{ heading_level }}>`; groups are `Meridian · Bands`, `Meridian · Inner pages`, `Meridian · Parts`, `Meridian · Chrome`.

## JS pattern

```js
(function (Drupal, once) {
    function enhanceCityRail(rail) {
        ...the static function verbatim, shared helpers via Meridian.*...
    }

    Drupal.behaviors.meridianCityRail = {
        attach(context) {
            once('meridian-city-rail', '.city-rail', context).forEach(enhanceCityRail);
        },
    };
})(Drupal, once);
```

The `...` line above stands for the copied body; the shipped file contains no comments. `libraryOverrides` for a component with JS:

```yaml
libraryOverrides:
  dependencies:
    - core/drupal
    - core/once
  js:
    city-rail.js:
      attributes:
        defer: true
```

Ownership: `enhanceMenu` to site-header; `enhanceNotices` to notice-bar; `enhanceHeroSky` and `SKY_*` to hero (see the hero-sky skill); `enhanceTabs` to tabs; `enhanceBoardSearch`, `enhanceSplitFlap`, `enhanceStatusTips`, `advanceClock`, `FLAP_*`, the flap engine and `BOARD_EVENTS` to flight-board; `enhanceCityRail` and `fullyVisibleRange` to city-rail. Static runs `document.querySelectorAll(...).forEach(enhance*)` at load; the behaviour replaces that line.

## Boundaries

Entity-backed lists (notices, flights, destinations, FAQs and so on) expose a slot; Views are not built unless assigned. Forms, terminal maps and the site map are code-owned Twig chosen by a `kind` enum, copied from static.
