# Ruled list

Derives from: static/getting-here/index.html and static/index.html, `<ul class="row-links">` (getting-here section).

Governing rule: spec §7.2.

Props and slots: | `items` slot | row-link children |

Notes: `.row-links` and `.help-list` are different grammars (single-column flex rows with chevron vs auto-fill grid of help items). They are kept as separate components; `ruled-list` holds only `row-link`. CSS ships with `row-link` (the `.row-links` rules live in row-link.css, copied once); a ruled-list rendered with row-link children always has the CSS. An empty ruled-list in Canvas preview is unstyled until a child is added.

Known deviations: none.
