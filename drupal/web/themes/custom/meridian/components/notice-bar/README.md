# notice-bar and notice

Derived from `static/index.html` `section.notice-bar` (class `notice-bar__list`). Spec: brief §2.1.1, spec §6 (`--notice`, flat).

| Component | Props | Slot |
|---|---|---|
| `notice-bar` | `label` (aria-label of the region, default "Travel notices") | `notices` |
| `notice` | `kind`, `text`, `action`, `position`, `total`, `link_label`, `link_href` | none |

JS: `enhanceNotices` verbatim from `static/assets/js/site.js`, bound with `once` to `.notice-bar`. No-JS: all notices show and the prev/next links jump between `#notice-N` anchors.

## Deviations from the plan table

- The bar link ("Check my flight") sits inside each `li` in static, so `link_label` and `link_href` are props of `notice`, not of `notice-bar`. Default values are the static ones.
- `notice` needs `position` and `total` to emit `id="notice-N"`, the "N of M" count and the wrapping prev/next hrefs. The Views row template passes `loop.index` and the result count.
- `action` is the whole sentence including "What to do:", as in static; the span is omitted when empty.

## Attribute differences from static

None (rendered and compared for three notices and the full bar).
