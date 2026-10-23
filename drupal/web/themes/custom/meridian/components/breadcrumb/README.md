# Breadcrumb

- Static source: `static/help/index.html` (`nav.breadcrumb.container`, line 44) and `static/parking/index.html` (`nav.breadcrumb.breadcrumb--on-dark`, line 47, on the photo band).
- Element: `nav.breadcrumb` with `aria-label="Breadcrumb"` and `ol.breadcrumb__list`.
- Spec: §2 (component/body type, 13px meta), §5 (link hover is colour and underline).
- CSS: `breadcrumb.css` split from `static/assets/css/components/page-hero.css` (`.breadcrumb*` rules, unchanged). The plan names `content.css`, but the breadcrumb rules are in `page-hero.css`.
- Container rule: 25 of 26 static breadcrumbs carry `container`. The one on the parking photo band has `breadcrumb--on-dark` and no `container`. The template ties the two: `on_dark` gives `breadcrumb breadcrumb--on-dark`, otherwise `breadcrumb container`.

| Prop | Type | Notes |
|---|---|---|
| `on_dark` | boolean | `breadcrumb--on-dark` colours and no container |

| Slot | Contents |
|---|---|
| `items` | `li.breadcrumb__item` leaves |

The leaf is not built. The brief did not list it and the scope said to create only the listed directories. The static markup it must reproduce:

```
<li class="breadcrumb__item"><a class="breadcrumb__link" href="/index.html">Home</a></li>
<li class="breadcrumb__item" aria-current="page">Help and contact</li>
```

Props for the leaf: `label` (string), `href` (uri-reference), `current` (boolean). A current item renders without the link and with `aria-current="page"`.
