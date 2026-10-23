# Prose

- Static source: `static/about/careers.html` (`div.prose` with h2, h3, p, ul under "Working at Meridian"), and the other inner pages' `div.prose`.
- Element: `div.prose`.
- Spec: §7.1 (prose under a serif heading, 720px measure).
- CSS: `prose.css` split from `static/assets/css/components/content.css` (`.prose*` rules and their 900px media rules, unchanged).

| Prop | Type | Notes |
|---|---|---|
| `body` | string, `contentMediaType: text/html` | rendered with `|raw` inside the div |

| Slot | Contents |
|---|---|
| none | |

Deviations: none.
