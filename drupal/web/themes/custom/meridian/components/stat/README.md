# Stat

- Static source: `static/index.html` parking band and `static/parking/index.html` photo band hero (`dl.stats` > `div.stats__item` > `dt.stats__label` + `dd.stats__value`).
- Element: `div.stats__item`, lives in the `facts` slot of `photo-band`, which renders the `dl.stats` wrapper.
- Spec: §2 type roles (display serif value, uppercase label), §8 photography under navy gradient (on-dark rule colour).
- CSS: `.stats*` rules copied verbatim from `static/assets/css/components/photo-band.css`, plus the `width <= 900px` overrides.

| Prop | Type | Notes |
|---|---|---|
| `label` | string | `dt.stats__label` |
| `value` | string | `dd.stats__value` |

| Slot | Contents |
|---|---|
| none | |

Deviations: none.
