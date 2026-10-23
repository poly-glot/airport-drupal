# Data table

- Static source: `static/parking/index.html` (`div.table-wrap` > `table.table`, line 133, caption "Car parks at a glance"). Other instances: `static/flights/airlines.html` (line 110), `static/at-the-airport/lounges.html` (line 71).
- Element: `div.table-wrap` > `table.table` > `caption` + the thead/tbody HTML.
- Spec: §3 (page plane tables are flat), §2 (table caption is serif 24px).
- CSS: `data-table.css` split from `static/assets/css/components/content.css` (`.table*` rules and their 900px media rules, unchanged). `.table__num` lives here because the numeric cells are in the body HTML.

| Prop | Type | Notes |
|---|---|---|
| `caption` | string | `caption.table__caption`, omitted when empty |
| `caption_hidden` | boolean | `caption.visually-hidden` (10 of 13 static tables) |
| `body` | string, `contentMediaType: text/html` | thead and tbody HTML, rendered with `|raw` |

| Slot | Contents |
|---|---|
| none | |

Deviations: the brief asks for a `numeric` boolean. It is not built: static marks numeric cells per cell (`td.table__num`) inside the body HTML, so a Twig template cannot apply it without parsing the body. Authors put `table__num` on the cell in the body, as static does. The plan's `numeric_columns` and `rows` props are replaced by `body`, per the brief. `caption_hidden` is added because most static tables use a visually hidden caption.
