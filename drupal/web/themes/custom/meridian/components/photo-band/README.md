# photo-band

Derived from `static/index.html (parking band) and static/parking/index.html (`photo-band--hero`)`, element ``section.photo-band``. Governing rule: spec §3 floating plane (form over photo), §8 photography under navy gradient; brief §2.1 item 6.

| Kind | Name | Notes |
|---|---|---|
| prop | title, intro, image_src, image_alt, image_width, image_height, variant (band/hero), heading_level (h1/h2), anchor, title_id, link_label, link_href | `variant: hero` adds `photo-band--hero`, loads the picture eagerly with `priority`, and expects `heading_level: h1`, `title_id: page-title` |
| slot | breadcrumb | breadcrumb nav above the heading, hero variant only |
| slot | facts | `stat` leaves inside `<dl class="stats">`; the `dl` wrapper is rendered by photo-band |
| slot | aside | the parking form card |

Deviations: plan table lists `tone`; static has only `on-dark`, so `tone` is replaced by `variant`. `breadcrumb`, `anchor`, `title_id`, `heading_level` added because the two static usages differ in them. CSS depends on `core/components.meridian--section-head` for `.section-title`.
