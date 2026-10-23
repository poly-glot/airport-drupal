# city-card

Derived from `static/index.html (rail item) and static/destinations/index.html (`city-card--guide`)`, element ``a.city-card``. Governing rule: spec §3 media in the page plane has radius 0, §8 tower/city-card/photo media.

| Kind | Name | Notes |
|---|---|---|
| prop | city, meta, image_src, image_alt, image_width, image_height, href, variant (rail/guide), body | `rail` wraps in `li.city-rail__item`; `guide` renders the bare link with `city-card--guide` and the `city-card__body` line |

Deviations: `variant` and `body` added for the destinations guide cards. Image widths: guide passes `widths: 960,1440`; rail uses the single width in the stem.
