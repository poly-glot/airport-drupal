# Heading

- Static source: `static/flights/index.html` (`h2.section-title.section-title--sm#reading-the-board-title` inside `div.stack.stack--lg`, line 159) and the same headings on the destination, airport, parking and help pages; 78 instances.
- Element: `h2`, `h3` or `h4` with `section-title`, plus `section-title--sm` when `size` is `sm`, and an optional `id`.
- Spec: §2 type roles (display serif titles).
- CSS: none of its own. `.section-title*` rules are the verbatim ones in `section-head.css`, loaded through `libraryOverrides` dependency `core/components.meridian--section-head`.

| Prop | Type | Notes |
|---|---|---|
| `text` | string | heading text |
| `level` | enum `h2`, `h3`, `h4` | default `h2` |
| `size` | enum `default`, `sm` | `sm` adds `section-title--sm` |
| `id` | string | optional heading id |

| Slot | Contents |
|---|---|
| none | |

Deviations: no CSS file in the directory; the dependency replaces the copy.

Added variants:

| Value | Static source |
|---|---|
| `card` | `h3.card__title` outside a card: media-centre release titles, flights legend headings |
