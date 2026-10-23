# site-footer and footer-link

Derived from `static/partials/footer.html` and the footer in `static/index.html` (`footer.footer`, `footer__main`, `footer__legal`). Brief §2.1.11. CSS verbatim from `footer.css`.

| Component | Props | Slots |
|---|---|---|
| `site-footer` | `enquiries`, `phone`, `phone_href`, `enquiries_suffix`, `legal_line` | `col_flights`, `col_shop`, `col_plan`, `col_company`, `legal` |
| `footer-link` | `label`, `href` | none |

Deviations: the enquiries paragraph is split into text before the phone link, the phone link and text after it, because static has an inline `tel:` link in the sentence; there is no email line in static so none is exposed. The four column headings (Flights, Shop & relax, Plan, Company) and their `id`/`aria-labelledby` pairs, the lockup and the social links are fixed chrome in the Twig. The phone number in static uses `&nbsp;`; put non-breaking spaces in the `phone` prop.

Attribute differences from static: none (full footer compared; the only delta is the `&nbsp;` entity versus the same character).
