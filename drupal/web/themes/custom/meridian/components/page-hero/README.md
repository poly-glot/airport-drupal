# Page hero

- Static source: `static/help/index.html` (`<section class="page-hero">`, line 43) and `static/about/careers.html` (`<section class="page-hero page-hero--with-art">`, line 43).
- Element: `section.page-hero`, with optional `nav.breadcrumb` first, then `div.page-hero__inner.container` > `div.page-hero__content` (eyebrow, h1, intro) and the picture for the art variant.
- Spec: §10 (one h1 per page in the sky page-hero with breadcrumb), §2 (display type), §9 (imagery, no rounded photo corners).
- CSS: `page-hero.css` copied from `static/assets/css/components/page-hero.css`, with the `.breadcrumb*` rules moved to `breadcrumb/breadcrumb.css`. The `.media` rule from `content.css` is appended because the art variant renders `img.media`. The picture owner may carry the same rule.
- Image: rendered through `meridian:picture` with `css_class: media`, `priority: true`, `loading: eager`, `sizes` as in the careers static markup.

| Prop | Type | Notes |
|---|---|---|
| `eyebrow` | string | `p.page-hero__eyebrow`, omitted when empty |
| `title` | string | `h1.page-hero__title#page-title` |
| `intro` | string | `p.page-hero__intro`, omitted when empty |
| `variant` | enum `sky`, `art` | `art` adds `page-hero--with-art` |
| `image_src` | string | picture stem, for example `/assets/img/about/careers-960` |
| `image_alt` | string | alt text |
| `image_width` | integer | intrinsic width |
| `image_height` | integer | intrinsic height |
| `sizes` | string | `sizes` for the art picture after the mobile clause, default `720px`; destination pages use `491px` |
| `widths` | string | extra srcset widths, for example `960,1440` |

| Slot | Contents |
|---|---|
| `breadcrumb` | the breadcrumb component, above the inner container |

Deviations: the plan lists `variant` as sky/band/photo. This follows the brief (sky/art) because static has only sky and art.
