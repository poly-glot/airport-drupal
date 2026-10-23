# Section

- Static source: `static/flights/airlines.html` (`section.section.container#airlines`, line 58), `static/help/index.html` (`section.section.container#contact`), `static/about/careers.html` (`section.section.container#working-at-meridian`, `#current-roles`).
- Element: `section.section.container` with `section--last` when last. The static wrapper is one element carrying both `section` and `container`, not a child div. Some static pages use `div.section.container` (for example the careers callout) or `section.section.section--last.container`; the component renders `section` by default and `div` when `tag` is `div`.
- Heading: `h2.section-title.section-title--sm` with `id` `{anchor}-title`, referenced by `aria-labelledby` on the section, as static does.
- Spec: §10 (72px top, 40px narrow, 1200px container), §7 (component order).
- CSS: `section.css` holds the `.section-title*` rules copied verbatim from `static/assets/css/components/section-head.css`, because the heading needs them. The `section-head` component carries the same rules; the duplication is identical text.
- `.section` and `.section--last` are in `static/assets/css/base/layout.css`, already loaded by `meridian/base`, so no separate `.section` rules are in this directory.
- Stack spacing: static often wraps section children in `div.stack.stack--lg`. The component puts the heading and the parts directly inside the section. Use a `group` with `layout: stack-lg` in `parts` to reproduce that gap.

| Prop | Type | Notes |
|---|---|---|
| `heading` | string | `h2` by default |
| `heading_level` | enum `h2`, `h3` | |
| `anchor` | string | the section `id`, and the heading id prefix |
| `tone` | enum `light`, `panel` | `panel` adds `band--panel` |
| `labelled_by` | string | `aria-labelledby` target when the heading lives inside the prose in `parts`; overrides the `{anchor}-title` default |
| `tag` | enum `section`, `div` | root element, default `section`; `div` for the 9 static `div.section.container` callout notes |
| `last` | boolean | adds `section--last` |

| Slot | Contents |
|---|---|
| `parts` | prose, group, data-table, callout, flat-block and other leaves |

Deviations: the brief says the wrapper is `section` + child `div.container`. Static puts `container` on the section itself, and this component copies that. `tone: panel` maps to `band--panel`, which sets background only; the `band` padding is not added. `dark` is removed: static has no dark inner-page section.
