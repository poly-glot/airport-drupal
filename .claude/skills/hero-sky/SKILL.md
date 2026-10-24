---
name: hero-sky
description: Use for anything touching the homepage hero sky behaviour, including the 12 daypart-by-weather variants, enhanceHeroSky, the ?sky= test override, changing the default weather, adding or regenerating a hero image variant, or the hero contrast gate (scripts/hero_contrast.py).
---

# Hero sky

Code: `next/components/hero/index.tsx` (markup, `defaultWeather` prop) and `enhanceHeroSky` with the `SKY_*` constants in `next/lib/behaviours.js`. Images: `next/public/assets/img/home/hero/`. Design source: `docs/brief.md` §2.1.3 and `docs/imagery.md` ("home/hero (sky variants)"). Never write a comment.

## The matrix

12 assets at `assets/img/home/hero/{daypart}-{weather}-1440.{avif,webp,jpg}`; dayparts `morning`, `afternoon`, `evening`, `night`; weathers `sunny`, `cloudy`, `rainy` (`night-sunny` is a clear night). All 12 share one camera setup: apron view through terminal glass, dark mullioned interior filling the left third, aircraft tails mid-frame, control tower on the right horizon. Only light and sky change; the dark left third carries the text zone. Aircraft are plain white and unbranded; no text or logos in frame.

## Behaviour

- Without JavaScript the hero shows `morning-rainy`: the component writes `morning-rainy-1440.*` into every `<source>` and the `<img>`, and `data-weather` from `defaultWeather` (default `rainy`).
- Daypart from the local clock: 05 to 11 morning, 12 to 16 afternoon, 17 to 20 evening, anything else night (`SKY_DAYPART_HOURS`, `daypartFromHour`).
- Weather: `hero.dataset.weather`.
- Override for testing: `?sky=<daypart>-<weather>`, matched by `/^(morning|afternoon|evening|night)-(sunny|cloudy|rainy)$/`; it also pins the displayed time to `SKY_PREVIEW_TIMES` (09:42, 14:30, 19:15, 23:50).
- Picture rewrite: every `src` and `srcset` has the literal `morning-rainy` replaced by the variant, so the URLs must contain `morning-rainy` exactly once per stem.
- Icons: `.hero__weather-icon--day` for morning and afternoon, `--evening`, `--night`; the others get `hidden`.
- Weather block: `hero__weather--dry` when weather is not rainy; `.hero__temp-value` from `SKY_WEATHERS` (sunny 18°C, cloudy 14°C, rainy 12°C); `.hero__condition` is `sunny` or `clear` at night, `cloudy`, `light rain`.
- Date line `.hero__date`: `en-GB` weekday, day and month from the real clock, then `· HH:MM local`.
- `hero.dataset.sky` is set to the variant afterwards.

To test: open `http://localhost:3000/?sky=evening-cloudy`, or each of the twelve in turn; confirm image, icon, word, temperature and date line.

## Change the default weather

Set the hero's Default weather prop in the Canvas editor. The daypart still follows the clock. The no-JavaScript image stays `morning-rainy` whatever the prop says, because that literal is what `enhanceHeroSky` rewrites; changing the no-JavaScript image means changing the stem in the component and the replace target in `enhanceHeroSky` in the same commit.

## Add or regenerate a variant

1. Read the register in `docs/imagery.md`: tool (Gemini image), the shared prefix (identical place, camera, framing and mullions as the reference shot, 16:9 landscape, plain all-white unbranded aircraft, no text, no logos), the scene line for the variant, "interior left third stays dark" appended.
2. Pipeline: source 1376x768, centre-crop 16:9, Lanczos to 1440x810, `-unsharp 0x0.75+0.75+0.008`, strip metadata; AVIF q55, WebP q82, JPEG q85. Sources go in `docs/design/hero-src/`. Files land in `next/public/assets/img/home/hero/`.
3. Gate: `.venv/bin/python scripts/hero_contrast.py` (defaults to the hero folder; pass one `.jpg` path to check a single file). It composites the exact CSS gradients (desktop stops 0.88, 0.62, 0.30 left to right; narrow stops 0.66, 0.78, 0.92 top to bottom) over the image and measures the brightest 32px window inside the text zone: desktop x 5.5 to 47 percent, y 14 to 78 percent; narrow x 5 to 95 percent, y 8 to 60 percent. White text needs at least 4.5:1 in both. Current register: 12/12 pass.
4. A failing image is regenerated or darkened at the source. The gradient is never weakened.
5. Record scene, contrast figures and file sizes in `docs/imagery.md`.
