# Group

- Static source: `static/flights/airlines.html` (`div.grid.grid--2`, line 62), `static/flights/index.html` (`div.grid.grid--3`, line 160), `static/at-the-airport/index.html` (`div.split.split--main-aside`, line 102), `static/flights/index.html` and `static/destinations/index.html` (`div.stack`).
- Element: a plain `div` carrying the layout class(es) from `static/assets/css/base/layout.css`.
- Spec: §10 (rhythm), §7 (component order).
- CSS: none in this directory. The layout classes (`stack`, `stack--lg`, `grid`, `grid--2`, `grid--3`, `split`, `split--main-aside`) are in `static/assets/css/base/layout.css`, which is `meridian/base`, loaded by every page.

| Prop | Type | Class output |
|---|---|---|
| `layout` | enum (see below) | |

Enum to classes: `stack` → `stack`; `stack-lg` → `stack stack--lg`; `grid-2` → `grid grid--2`; `grid-3` → `grid grid--3`; `split` → `split`; `split-main-aside` → `split split--main-aside`.

| Slot | Contents |
|---|---|
| `parts` | the grouped components |

Deviations: the brief lists four enum values. `stack-lg` (39 static uses) and `split-main-aside` (2 static uses, at-the-airport) are added so that every static group class is reachable through the enum.
