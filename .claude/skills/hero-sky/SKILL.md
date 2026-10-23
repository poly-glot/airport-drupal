---
name: hero-sky
description: Use for anything touching the homepage hero sky behaviour, including the 12 daypart-by-weather variants, the hero component's JS, the ?sky= test override, changing the default weather, adding or regenerating a hero image variant, or the hero contrast gate (scripts/hero_contrast.py).
---

# Hero sky

Source of truth: `docs/brief.md` §2.1.3, `static/index.html` (`<section class="hero on-dark" data-weather="rainy">`), `enhanceHeroSky` and the `SKY_*` constants at the end of `static/assets/js/site.js`, `docs/imagery.md` ("home/hero (sky variants)"). The port lives in `components/hero/hero.js`, copied verbatim. Never write a comment.

## The matrix

12 assets at `assets/img/home/hero/{daypart}-{weather}-1440.{avif,webp,jpg}`; dayparts `morning`, `afternoon`, `evening`, `night`; weathers `sunny`, `cloudy`, `rainy` (`night-sunny` is a clear night). All 12 share one camera setup: apron view through terminal glass, dark mullioned interior filling the left third, aircraft tails mid-frame, control tower on the right horizon. Only light and sky change; the dark left third carries the text zone. Aircraft are plain white and unbranded; no text or logos in frame.

## Behaviour

- No-JS default, also the demo snapshot: `morning-rainy`. The static markup bakes `morning-rainy-1440.*` into every `<source>` and the `<img>`, and `data-weather="rainy"` on the section.
- Daypart from the local clock: 05 to 11 morning, 12 to 16 afternoon, 17 to 20 evening, anything else night (`SKY_DAYPART_HOURS`, `daypartFromHour`).
- Weather: the demo default read from `hero.dataset.weather` (`rainy`).
- Override for testing: `?sky=<daypart>-<weather>`, matched by `/^(morning|afternoon|evening|night)-(sunny|cloudy|rainy)$/`; the override also pins the displayed time to `SKY_PREVIEW_TIMES` (09:42, 14:30, 19:15, 23:50). Anything else is ignored.
- Picture rewrite: every `src` and `srcset` on the `<source>` elements and the `<img>` has the literal `morning-rainy` replaced by the variant (`replaceAll`). The URLs must therefore contain `morning-rainy` exactly once per stem, which the hero component must preserve.
- Icons: `.hero__weather-icon--day` for morning and afternoon, `--evening`, `--night`; the others get `hidden`.
- Weather block: `hero__weather--dry` toggled when weather is not rainy; `.hero__temp-value` set from `SKY_WEATHERS` (sunny 18°C, cloudy 14°C, rainy 12°C); `.hero__condition` is `sunny`/`clear` (night), `cloudy`, `light rain`.
- Date line `.hero__date`: `en-GB` weekday, day, month from the real clock, then `· HH:MM local`.
- `hero.dataset.sky` is set to the variant afterwards.

To test locally: open the Drupal homepage with `/?sky=evening-cloudy`, or all twelve in turn; confirm image, icon, word, temperature and date line.

## Port rules

- The hero component prop is `default_weather` (enum `sunny`, `cloudy`, `rainy`, default `rainy`), rendered as `data-weather`. The plan's `default_sky` enum was dropped because the static contract only carries `data-weather`; the daypart always comes from the clock. The no-JS image stays `morning-rainy` whatever the prop says, because that literal is the rewrite target.
- The hero image cannot use the generic `meridian:picture` stem convention without keeping the `morning-rainy` substring and the single `1440w` srcset the static uses; check `static/index.html` line for the `<picture class="hero__media">` and copy it exactly (AVIF, WebP, then JPEG `<img>`, `loading="eager"`, `fetchpriority="high"`, `width="1440" height="810"`, `alt=""`).
- Behaviour pattern: `Drupal.behaviors.meridianHero` with `once('meridian-hero', '.hero', context)`, body `enhanceHeroSky` verbatim with the `SKY_*` constants and `daypartFromHour`.
- The `signs` and `aside` slots hold `hero-sign` and the search card; the wait panel is its own component placed after.

## Change the default weather

Set the hero component's weather prop (`data-weather`) to `sunny`, `cloudy` or `rainy` on the page; the daypart still follows the clock. For the no-JS snapshot to match, the baked image stem must change in the same edit (for example `morning-sunny`), because the rewrite replaces only the literal `morning-rainy`; if the default is no longer `rainy`, the replace target in `enhanceHeroSky` must change in step. That is a deviation from `static/`, so it needs the coordinator's agreement and the change made in `static/` first.

## Add or regenerate a variant

1. Read the register in `docs/imagery.md`: tool (Gemini image), the shared prefix (identical place, camera, framing and mullions as the reference shot, 16:9 landscape, plain all-white unbranded aircraft, no text, no logos), the scene line for the variant, "interior left third stays dark" appended.
2. Pipeline: source 1376x768, centre-crop 16:9, Lanczos to 1440x810, `-unsharp 0x0.75+0.75+0.008`, strip metadata; AVIF q55, WebP q82, JPEG q85. Sources go in `docs/design/hero-src/`.
3. Gate: `python3 scripts/hero_contrast.py static/assets/img/home/hero` (or one `.jpg` path). Note the script's default directory is `~/Desktop/projects/airport/...`, the sibling repo, so always pass the path. It composites the exact CSS gradients (desktop stops 0.88, 0.62, 0.30 left to right; narrow stops 0.66, 0.78, 0.92 top to bottom) over the image and measures the brightest 32px window inside the text zone: desktop x 5.5 to 47 percent, y 14 to 78 percent; narrow x 5 to 95 percent, y 8 to 60 percent. White text needs at least 4.5:1 in both. Current register: 12/12 pass.
4. A failing image is regenerated or darkened at the source. The gradient is never weakened.
5. Record scene, contrast figures and file sizes in `docs/imagery.md`. Files land in `static/assets/img/home/hero/`; the theme sees them through the `assets` symlink. Because `static/` is the contract, a new or changed image is added there first; the port edits nothing.
