# map-pane

Derived from `static/index.html and static/getting-here/index.html`, element ``div.map-pane` with `svg.map.map--fill``. Governing rule: spec §3 floating plane over the map (map card shadow), §8 schematic map language.

| Kind | Name | Notes |
|---|---|---|
| prop | name, address, directions_href, larger_href | the SVG, labels (Marston End, Hollin Rise, A45 chips, RUNWAY 09/27), Directions/Larger map labels and credit line are verbatim |

Deviations: no `show_zoom`: the static map has no zoom chrome, so there is nothing to toggle. No variant enum: the two static maps are identical apart from indentation and the Directions href. CSS is `map.css` minus the `.getting-here*` rules.
