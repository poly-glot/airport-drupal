# Paragraph

- Static source: loose `p` elements and `p > a.text-link` across the inner pages; `p.package__note` in `static/parking/index.html`; `p.form__small` in `static/index.html` and `static/parking/index.html`.
- Element: `p`, with `package__note` or `form__small` for those variants. Inline anchors stay inside `body`.
- Spec: §2 type roles (body text).
- CSS: none of its own. `.package__note` (`package.css`) and `.form__small` (`form.css`) load through `libraryOverrides` dependencies on those components.

| Prop | Type | Notes |
|---|---|---|
| `body` | string, `contentMediaType: text/html` | rendered `|raw`, author-controlled HTML |
| `variant` | enum `plain`, `package-note`, `form-small` | default `plain` |

| Slot | Contents |
|---|---|
| none | |

Deviations: none.

Added variants:

| Value | Static source |
|---|---|
| `card-text` | `p.card__text` (45 static instances) |
| `card-text-tabular` | `p.card__text.u-tabular` (3 instances) |
