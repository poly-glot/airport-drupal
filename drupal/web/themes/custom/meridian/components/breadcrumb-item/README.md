# Breadcrumb item

- Static source: `static/help/index.html` (`li.breadcrumb__item`, line 45 and 46): the link item `<a class="breadcrumb__link" href="/index.html">Home</a>` and the current item `<li class="breadcrumb__item" aria-current="page">Help and contact</li>`.
- Element: `li.breadcrumb__item`. Non-current items wrap the label in `a.breadcrumb__link`. The current item has `aria-current="page"` and no link.
- Spec: §5 (link hover is colour and underline; the current crumb is plain text).
- CSS: none. `breadcrumb/breadcrumb.css` owns `.breadcrumb__item` and `.breadcrumb__link`.

| Prop | Type | Notes |
|---|---|---|
| `label` | string | crumb text |
| `href` | string, uri-reference | link target, unused when current |
| `current` | boolean | `aria-current="page"`, no link |

| Slot | Contents |
|---|---|
| none | |

Deviations: none.
