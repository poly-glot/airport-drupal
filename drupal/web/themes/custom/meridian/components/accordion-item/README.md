# Accordion item

Derives from: static/help/index.html, `details.accordion__item`.

Governing rule: spec §7.5.

Props and slots: | `summary` string | `body` string, contentMediaType text/html |

Notes: No CSS of its own; it is always rendered inside `accordion`, whose library supplies the rules. `body` is output with `{{ body }}` (no `|raw`): Canvas supplies text/html props as safe markup. Verify in the first Canvas preview; if escaped, the coordinator should decide on `|raw`.

Known deviations: none.
