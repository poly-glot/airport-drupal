# getting-here

Derived from `static/index.html (`#getting-here`) and static/getting-here/index.html (airport map section)`, element ``section.getting-here``. Governing rule: brief §2.1 item 10.

| Kind | Name | Notes |
|---|---|---|
| prop | title, intro, note_lead, note, note_icon (step-free), anchor, title_id | the getting-here page uses a different heading id and no section id, hence `anchor` and `title_id` |
| slot | rows | `row-link` leaves; the container renders `ul.row-links`, each leaf emits its own `li` |
| slot | map | a `map-pane` |

Deviations: plan table has a single `note`; static splits it into a bold lead and the rest, so `note_lead` is added. CSS is the `.getting-here*` rules split out of `map.css`.
