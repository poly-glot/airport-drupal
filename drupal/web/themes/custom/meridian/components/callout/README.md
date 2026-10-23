# Callout

- Static source: `static/about/careers.html` (`div.callout` > `p.callout__title` "Demonstration note", line 58). Others: `static/accessibility.html`, `static/terms.html`, `static/privacy.html`, `static/cookies.html` ("Please note"), and `static/destinations/index.html` (callout with no title).
- Element: `div.callout` > optional `p.callout__title` + body HTML.
- Spec: §8 (the sand demonstration note is a flat sand block, flush, no accent border), §4 (radius 0).
- CSS: `callout.css` split from `content.css` (`.callout`, `.callout__title`, unchanged).

| Prop | Type | Notes |
|---|---|---|
| `title` | string | `p.callout__title`, omitted when empty |
| `body` | string, `contentMediaType: text/html` | the `p` elements, rendered with `|raw` |

| Slot | Contents |
|---|---|
| none | |

Deviations: the plan's `tone` prop is not built. Static has one callout style (sand) and no variants, so there is no tone to map.
