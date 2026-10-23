# picture

Shared responsive image renderer. Every component with an image calls it as:

```twig
{{ include('meridian:picture', {
    src: image_src,
    alt: image_alt,
    width: image_width,
    height: image_height,
    sizes: '(max-width: 900px) 260px, 357px',
    loading: 'lazy',
    css_class: 'city-card__img',
    picture_class: 'city-card__media'
}, with_context = false) }}
```

Derived from the `<picture>` elements in `static/index.html` (`.hero__media`, `.photo-band__media`, `.city-card__media`, `.tower__media`) and `static/parking/index.html` (`.photo-band__media`, eager and high priority).

## Interface (stable)

| Prop | Type | Default | Meaning |
|---|---|---|---|
| `src` | string | required | slot STEM including the width suffix of the base file and no extension, for example `/assets/img/cities/cairo-714`. |
| `alt` | string | empty | alt text. |
| `width` | integer | none | intrinsic width of the base file; omitted when absent. |
| `height` | integer | none | intrinsic height of the base file; omitted when absent. |
| `sizes` | string | `100vw` | emitted verbatim on both `<source>` elements and the `<img>`. |
| `widths` | string | none | optional comma separated list of widths with no spaces, for example `560,840`. Each becomes a srcset entry `<prefix><w>.<ext> <w>w`. Without it the only entry is the width found after the last `-` of the stem. |
| `loading` | `lazy` or `eager` | `lazy` | `loading` attribute. |
| `priority` | boolean | false | adds `fetchpriority="high"`. |
| `css_class` | string | none | class on the `<img>`. |
| `picture_class` | string | none | class on the `<picture>` (not in the original brief; the static markup puts `hero__media`, `photo-band__media`, `city-card__media`, `tower__media` there). |

Output, one line with no whitespace between tags:

```html
<picture class="PICTURE_CLASS"><source type="image/avif" srcset="PREFIX{w}.avif {w}w, ..." sizes="SIZES"><source type="image/webp" srcset="PREFIX{w}.webp {w}w, ..." sizes="SIZES"><img class="CSS_CLASS" src="STEM.jpg" srcset="PREFIX{w}.jpg {w}w, ..." sizes="SIZES" width="W" height="H" alt="" loading="lazy" [fetchpriority="high"] decoding="async"></picture>
```

`PREFIX` is the stem without its trailing number. The `class` attributes are omitted when the props are empty. `{{ attributes }}` is on `<picture>`. Examples: tower stem `/assets/img/airport/tower-security-560` with `widths: '560,840'`; parking `/assets/img/home/parking-1440` with `loading: eager`, `priority: true`.

## Verified against static

Rendered with Twig and compared as normalised DOM to the static markup: tower (two widths), city card, parking eager with fetchpriority. Identical. No attribute differences.

## Not derivable

The hero does not use this component (see `hero/README.md`). Static has no picture with a `<source media>` or a width list other than `560,840`.
