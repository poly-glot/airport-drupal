# Fact

- Static source: `static/flights/index.html` (`div.facts__item` > `dt.facts__term` + `dd.facts__value#status-on-time`, line 192 onwards), `static/flights/airlines.html` (`div.facts__item` inside the airline cards), `static/about/careers.html` (role facts with `time`).
- Element: `div.facts__item` > `dt.facts__term` + `dd.facts__value`.
- Spec: §7.4.
- CSS: `fact.css` split from `content.css` (`.facts__item`, `.facts__term`, `.facts__value`, unchanged).

| Prop | Type | Notes |
|---|---|---|
| `term` | string, `contentMediaType: text/html` | `dt.facts__term`, HTML for status spans in legends |
| `value` | string, `contentMediaType: text/html` | `dd.facts__value`, HTML for `time` in careers |
| `id` | string | `id` on the `dd`, for the legend status ids |

| Slot | Contents |
|---|---|
| none | |

Deviations: careers role facts use `<time datetime="...">`. That works through `value` as HTML. Keep `term` and `value` as author-controlled HTML, not user input.
