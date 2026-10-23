# section-head

Derived from `static/assets/css/components/section-head.css; used in static/index.html (help and at-the-airport bands)`, element ``div.section-head``. Governing rule: spec §2 type roles.

| Kind | Name | Notes |
|---|---|---|
| prop | title, intro, heading_level, title_id, link_label, link_href | with `intro` the heading and intro sit in `section-head__titles`; without it the heading stands alone |

Deviations: Decision: its own component, because `help-list` and `tower-grid` both render the identical grammar and it ships the `.section-title*` classes that photo-band, city-rail and getting-here also use. Those bands declare `core/components.meridian--section-head` in `libraryOverrides.dependencies` so the CSS loads wherever they render; the library name follows Drupal core's SDC convention and is unverified against a running site.
