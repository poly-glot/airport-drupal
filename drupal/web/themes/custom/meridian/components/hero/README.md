# hero

Derived from `static/index.html` `section.hero` (`hero__media`, `hero__inner`, `hero__wait`). Brief §2.1.3. Spec §3 (hero search card and wait panel are the floating plane; `hero.css` is the only file of this set allowed `box-shadow`), spec §9 (every shipped sky passes the contrast gate). CSS is `hero.css` copied verbatim; it also holds the search card and the wait panel rules.

| Prop / slot | Meaning |
|---|---|
| `title`, `intro` | h1 and lede |
| `default_weather` | enum sunny/cloudy/rainy, default rainy, emitted as `data-weather` exactly as static |
| slot `signs` | `hero-sign` leaves |
| slot `aside` | the white search card, `form` kind flight-search (empty in the preview) |
| slot `wait` | the `wait-panel`, rendered inside `div.hero__wait.container` |

Deviations from the plan table: `default_sky` is replaced by `default_weather` (coordinator decision), and the extra slot `wait` is added because static wraps the panel in the hero section.

## Sky behaviour (authoritative)

- No-JS default, also the demo snapshot: the picture is hard-baked to `morning-rainy` (`/assets/img/home/hero/morning-rainy-1440.{avif,webp,jpg}`), the day icon is visible, and the weather block reads the `default_weather` temperature and word (rainy: "12°C light rain"; cloudy "14°C cloudy"; sunny "18°C sunny") with the static snapshot date "Saturday 3 October · 09:42 local". The `hero__weather--dry` class is added in Twig when the weather is not rainy.
- The hero copies its own static `<picture>` markup verbatim and does not call `meridian:picture`, because its single 1440w srcset with the variant in the filename does not fit the generic stem convention.
- `enhanceHeroSky` (verbatim from `site.js`, `once` on `.hero`) runs on load. Daypart always comes from the browser clock via `daypartFromHour` (05 to 11 morning, 12 to 16 afternoon, 17 to 20 evening, otherwise night). Weather is `data-weather`.
- `?sky=<daypart>-<weather>` (regex `^(morning|afternoon|evening|night)-(sunny|cloudy|rainy)$`) overrides both and uses the preview clock time from `SKY_PREVIEW_TIMES`.
- It rewrites the literal `morning-rainy` to the variant in `src` and `srcset` of both `<source>` elements and the `<img>`, toggles `hidden` on the three weather icons (morning and afternoon share the day icon, evening and night have their own), toggles `hero__weather--dry`, sets `.hero__temp-value` and `.hero__condition` from the constant `SKY_WEATHERS` (sunny/clear 18°C, cloudy 14°C, light rain 12°C; night uses `nightLabel`), writes the date line from the real clock in en-GB ("Saturday 3 October · 09:42 local"), and sets `data-sky` to the variant.
- All twelve variants `{morning,afternoon,evening,night}-{sunny,cloudy,rainy}` exist as assets. Each shipped variant must pass `python3 scripts/hero_contrast.py`: it composites the exact CSS hero gradients over the asset and requires at least 4.5:1 for white text in the desktop text zone (x 5.5 to 47%, y 14 to 78%) and the narrow zone (x 5 to 95%, y 8 to 60%), on 32px windows against the brightest one. A failing render is regenerated or darkened at the source, never fixed by weakening the gradient.

## Attribute differences from static

None. The rendered hero (with signs, search form and wait panel slotted) compares identical to the static section as normalised DOM.
