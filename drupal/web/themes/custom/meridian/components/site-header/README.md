# site-header and nav-link

Derived from `static/partials/header.html` (`header.header`, `header__inner`). Brief §2.2. CSS copied verbatim from `static/assets/css/components/header.css`; the only shadow is the mobile menu sheet (`--shadow-card`).

| Component | Props | Slot |
|---|---|---|
| `site-header` | `cta_label`, `cta_href`, `basket_href`, `basket_label`, `brand_current` (boolean) | `nav` |
| `nav-link` | `label`, `href`, `current` enum none/page/section | none |

`nav-link` current maps to `aria-current`: `page` gives `"page"`, `section` gives `"true"` (static uses both; none emits nothing). `brand_current` adds `aria-current="page"` on the lockup, which static does only on the homepage (an addition to the plan table). The language label, search button, lockup and menu toggle are fixed chrome copied from static.

JS: `enhanceMenu` verbatim, `once` on `.header`.

Attribute differences from static: none (compared with `brand_current` on and six nav links).
