# Card

- Static source: `static/about/careers.html` (`div.card.card--padded` > `h3.card__title`, line 84, role cards), `static/sitemap.html` (`section.card.card--padded[aria-labelledby]` > `h2.card__title#home-title`), plus release, airline, offer and contact cards; 36 `div.card` instances and 8 sitemap sections.
- Element: `div.card` or `section.card`, `card--padded` when `padded`, optional `.card__title` heading, then the `parts` slot.
- Spec: §3 flat page plane (1px rule, zero radius, no shadow).
- CSS: `card.css` copied verbatim from `static/assets/css/components/card.css`. `form.css` carries the same rules for the form card; the duplication is identical text.
- `aria-labelledby` is emitted only when both `heading` and `heading_id` are set, pointing at the title id, as the sitemap does.

| Prop | Type | Notes |
|---|---|---|
| `tag` | enum `div`, `section` | root element, default `div` |
| `heading` | string | optional `.card__title` |
| `heading_level` | enum `h2`, `h3` | default `h3` |
| `heading_id` | string | id on the title and the `aria-labelledby` target |
| `padded` | boolean | default true, adds `card--padded` |

| Slot | Contents |
|---|---|
| `parts` | facts, paragraph, prose, button and other leaves |

Deviations: none.
