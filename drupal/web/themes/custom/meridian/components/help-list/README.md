# help-list

Derived from `static/index.html (help band), static/help/index.html and static/at-the-airport/index.html (bare lists)`, element ``section.band--panel#help`, `ul.help-list``. Governing rule: spec §7.2 ruled list; brief §2.1 item 8.

| Kind | Name | Notes |
|---|---|---|
| prop | title, link_label, link_href, variant (band/plain), anchor, title_id | `band` renders the panel band with the section head; `plain` renders only `ul.help-list` for inner pages |
| slot | items | `help-item` leaves, each emitting its own `li.help-list__item` |

Deviations: plan table lists `columns` enum; static has no column modifier (the grid is `auto-fill`), so it is replaced by `variant`.
