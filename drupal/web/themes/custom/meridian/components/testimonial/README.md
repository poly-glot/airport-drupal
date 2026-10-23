# Testimonial

- Static source: `static/about/index.html`, section `#what-passengers-say` ("What passengers say"), three `figure.testimonial` in a `grid grid--3`.
- Element: `figure.testimonial` > `blockquote.testimonial__quote` (one or more `p`) + `figcaption.testimonial__source` > `span.testimonial__name` + optional `span.testimonial__meta`.
- Spec: §3 flat surface (white, 1px `--line`, flush, no shadow), §2 serif for the quoted voice at 22px (20 narrow), §6 `--accent-blue` only on the 48px opening quote mark (large text rule), §7 a self-contained group, so a block rather than a ruled list.
- CSS: `static/assets/css/components/testimonial.css`, generated into this directory by `scripts/sync_static.py`.
- Seed: `scripts/canvas_emit.py` `emit_testimonial` maps the figure; the surrounding heading and grid are the existing `prose` and `group` components.

| Prop | Type | Notes |
|---|---|---|
| `quote` | string, `contentMediaType: text/html` | the `p` elements inside the blockquote, rendered with `|raw` |
| `name` | string | `span.testimonial__name` |
| `meta` | string | `span.testimonial__meta`, omitted when empty |

| Slot | Contents |
|---|---|
| none | |

Deviations: none. The component has no static-only variant, so there is no enum.
