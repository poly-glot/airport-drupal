# Package

Derives from: static/parking/index.html, `div.package` in #compare.

Governing rule: spec §7.7, catalogue §7.7a.

Props and slots: | `tier` | `price_prefix` (From) | `price` | `unit` | `badge` | `meta` | `best_label` | `note` | `recommended` bool | `cta_label` | `href` | slot `features` (package-feature) |

Notes: package.css copied unchanged. The CTA is the static `a.button` markup; `recommended` drops `button--secondary`. Button styles come from the `button` component via `libraryOverrides.dependencies: core/components.meridian--button`. Deviations from the plan table: `meta` is a string prop, not a slot (a plain text line has no component to fill a slot, and a slot inside `<p>` would nest block elements); `price_prefix` added because "From" is a static literal the plan did not cover.

Known deviations: `meta` prop instead of slot; extra `price_prefix` prop.
