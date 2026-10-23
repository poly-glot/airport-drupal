# city-rail

Derived from `static/index.html`, element ``section.city-rail#explore``. Governing rule: spec §5 interaction grammar; brief §2.1 item 7.

| Kind | Name | Notes |
|---|---|---|
| prop | title, subtitle, link_label, link_href, anchor, title_id | title and subtitle render as the two-tone heading |
| slot | cards | `city-card` leaves (rail variant), each emitting its own `li.city-rail__item` |
| js | city-rail.js | `enhanceCityRail` and `fullyVisibleRange` verbatim; counter, prev/next and progress bar stay hidden until the script adds `city-rail--enhanced`, so the native scroll works without JS |

Deviations: `Meridian.wrapIndex` is not used: the static `enhanceCityRail` never calls it. The count text `1 – 3 / 4` is server-side filler that the script overwrites; it is hidden without JS. The prev/next `aria-controls` target the fixed id `city-rail-track`, so one rail per page.
