# wait-panel and wait-chip

Derived from `static/index.html` `section.wait-panel` (`wait-panel__list`). Brief §2.1.4. Spec §3: floating plane over the hero, radius 14, `--shadow-wait`.

CSS: there is no `wait-panel.css`. The panel rules live in `hero.css` (copied into `hero/`) because the panel floats over the hero; `wait-panel.component.yml` therefore declares `libraryOverrides: {dependencies: []}`. The panel must be placed in the hero `wait` slot, inside `.hero__wait`.

| Component | Props | Slot |
|---|---|---|
| `wait-panel` | `updated` (for example `09:42`), `road_status` | `chips` |
| `wait-chip` | `label`, `minutes` (integer), `tone` ok/warn | none |

`wait-chip` renders the whole `.wait-panel__item` row (`dt` label plus the `dd` chip with its clock icon); `.wait-panel__item--divided` roads row is emitted by the panel itself. The title "Security wait times" is fixed chrome.

Attribute differences from static: none (compared with two chips).
