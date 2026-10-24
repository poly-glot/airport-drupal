# Imagery register

## v1 images (survivors)

All v1 images were generated in Gemini (Flash-Lite image generation, one conversation, 9 generations including one retry). Source files are 1264x848 and are centre-cropped to 3:2 then resized to 960x640 and 1440x960 (1440 is a mild 1.14x upscale). Encodes: AVIF q50, WebP q78, JPEG q80, metadata stripped. Originals are kept outside the served tree.

Style preamble used on every v1 prompt:

> Editorial documentary photograph for a British airport website. Natural light, slightly cool blue-leaning colour grade with navy and slate tones, photorealistic, 35mm, high detail, 3:2 landscape. No text, no logos, no signage, no brands, no watermarks, no recognisable real landmarks, people only incidental and not identifiable.

### destinations/lisbon-hero

- Final prompt: preamble above, then Scene: a Lisbon-style hilly street at golden hour with tiled facades in blue and cream, a vintage tram-era feel with tram tracks, warm light on the tiles, sky turning cool blue.
- Shows: A tram climbs a cobbled hillside street lined with tiled facades in the golden evening light.
- Alt text suggestion: A tram climbs a cobbled hillside street lined with tiled facades in the golden evening light.
- Files (`next/public/assets/img/destinations/lisbon-hero-{960,1440}.{avif,webp,jpg}`, 960x640 and 1440x960): 960.avif 57 KB, 960.webp 94 KB, 960.jpg 130 KB, 1440.avif 80 KB, 1440.webp 143 KB, 1440.jpg 238 KB. Total 745 KB.

### destinations/reykjavik-hero

- Final prompt: preamble above, then Scene: an Icelandic landscape at night, green northern lights over a dark volcanic lava-field and distant mountains, a single small lit wooden cabin in the middle distance, stars, no people.
- Shows: Green northern lights arc over a dark lava field and a small lit cabin.
- Alt text suggestion: Green northern lights arc over a dark lava field and a small lit cabin.
- Files (`next/public/assets/img/destinations/reykjavik-hero-{960,1440}.{avif,webp,jpg}`, 960x640 and 1440x960): 960.avif 26 KB, 960.webp 46 KB, 960.jpg 81 KB, 1440.avif 38 KB, 1440.webp 73 KB, 1440.jpg 155 KB. Total 422 KB.

### destinations/marrakech-hero

- Final prompt: preamble above, then Scene: a Moroccan medina riad courtyard with a small tiled fountain, hanging brass lanterns, richly coloured woven textiles and rugs, warm lantern glow balanced against cool blue shade, carved plasterwork, no people.
- Shows: A riad courtyard with a tiled fountain, glowing brass lanterns and woven rugs hung from the balconies.
- Alt text suggestion: A riad courtyard with a tiled fountain, glowing brass lanterns and woven rugs hung from the balconies.
- Files (`next/public/assets/img/destinations/marrakech-hero-{960,1440}.{avif,webp,jpg}`, 960x640 and 1440x960): 960.avif 48 KB, 960.webp 80 KB, 960.jpg 119 KB, 1440.avif 68 KB, 1440.webp 123 KB, 1440.jpg 217 KB. Total 658 KB.

### airport/eat-and-drink-hero

- Final prompt: preamble above, then Scene: a modern airport cafe interior, a clean counter with a coffee machine, cups and a glass case of pastries, early morning light streaming through tall terminal glass, a couple of blurred seated travellers far in the background, unidentifiable.
- Shows: A coffee machine and a case of pastries on a cafe counter beside tall terminal windows.
- Alt text suggestion: A coffee machine and a case of pastries on a cafe counter beside tall terminal windows.
- Files (`next/public/assets/img/airport/eat-and-drink-hero-{960,1440}.{avif,webp,jpg}`, 960x640 and 1440x960): 960.avif 17 KB, 960.webp 34 KB, 960.jpg 74 KB, 1440.avif 24 KB, 1440.webp 53 KB, 1440.jpg 133 KB. Total 338 KB.

### airport/shopping-hero

- Final prompt: preamble above, then Scene: an airside retail walkway in a clean modern airport terminal, high ceiling with pale architecture, shopfronts with blank unbranded glass facades, a few blurred travellers with trolley bags walking away, unidentifiable, soft daylight from above.
- Shows: Travellers with wheeled bags walk along a bright airside shopping concourse.
- Alt text suggestion: Travellers with wheeled bags walk along a bright airside shopping concourse.
- Files (`next/public/assets/img/airport/shopping-hero-{960,1440}.{avif,webp,jpg}`, 960x640 and 1440x960): 960.avif 15 KB, 960.webp 30 KB, 960.jpg 70 KB, 1440.avif 21 KB, 1440.webp 47 KB, 1440.jpg 124 KB. Total 308 KB.

### airport/lounges-hero

- Final prompt: preamble above, then Scene: a quiet airport lounge at dawn, comfortable armchairs and low tables beside floor-to-ceiling windows overlooking an airport apron with parked aircraft in soft blue pre-dawn light, warm lamp glow, empty seats, no people.
- Shows: Armchairs and lamps in a quiet lounge look out through tall windows at aircraft on the apron at dawn.
- Alt text suggestion: Armchairs and lamps in a quiet lounge look out through tall windows at aircraft on the apron at dawn.
- Files (`next/public/assets/img/airport/lounges-hero-{960,1440}.{avif,webp,jpg}`, 960x640 and 1440x960): 960.avif 13 KB, 960.webp 28 KB, 960.jpg 65 KB, 1440.avif 19 KB, 1440.webp 46 KB, 1440.jpg 119 KB. Total 292 KB.

### about/terminal

- Final prompt: preamble above, then Scene: the exterior of a modern mid-size airport terminal at blue hour, glass and steel facade glowing warmly from inside, a slim air traffic control tower silhouetted against a deep blue twilight sky, an empty forecourt, no people.
- Shows: A glass airport terminal glows at blue hour beside a control tower.
- Alt text suggestion: A glass airport terminal glows at blue hour beside a control tower.
- Files (`next/public/assets/img/about/terminal-{960,1440}.{avif,webp,jpg}`, 960x640 and 1440x960): 960.avif 14 KB, 960.webp 29 KB, 960.jpg 65 KB, 1440.avif 20 KB, 1440.webp 47 KB, 1440.jpg 121 KB. Total 299 KB.

### about/careers

- Final prompt: preamble above, then Scene: a diverse group of four airport staff in conversation, two in plain high-visibility jackets and two in smart navy operations-room clothing, standing in a bright modern operations area with screens showing only abstract blurred shapes, faces soft, turned away or in profile, unidentifiable. Regenerated once with: whole scene in crisp focus, everyone seen from behind or in profile, screens showing plain dark abstract graphics with no maps or text.
- Shows: Airport staff in high-visibility jackets and navy uniforms talk together in an operations room.
- Alt text suggestion: Airport staff in high-visibility jackets and navy uniforms talk together in an operations room.
- Files (`next/public/assets/img/about/careers-{960,1440}.{avif,webp,jpg}`, 960x640 and 1440x960): 960.avif 12 KB, 960.webp 24 KB, 960.jpg 58 KB, 1440.avif 17 KB, 1440.webp 37 KB, 1440.jpg 106 KB. Total 255 KB.

## v2 images

Generated in Gemini (signed-in Chrome, Flash-Lite image generation, one conversation, 10 generations, no retries needed, no quota message seen). Each image downloaded with "Download full size image". Sources: 1376x768 for 16:9, 768x1376 for the 9:16 portraits, 848x1264 for the 2:3 portraits. Originals are kept outside the served tree.

Processing: centre crop to the exact aspect, Lanczos resize, `-unsharp 0x0.75+0.75+0.008`, metadata stripped. Encodes: AVIF q55 (avifenc speed 6), WebP q82, JPEG q85 (4:2:0).

Upscale rule: never above 1.25x. Dropped variants because the source is too small, with Gemini's output sizes fixed per aspect ratio:

- `home/hero-1920` and `home/parking-1920`: 1376 to 1920 is 1.40x. Only the 1440 variant ships (1.05x). Gemini's largest 16:9 output is 1376x768.
- `cities/*-1071`: crop width 768 to 1071 is 1.39x. Only the 714 variant ships (0.93x, a downscale).
- `airport/tower-*`: crop 842x1263 to 840x1260 is 1.00x; both 560 and 840 ship.

Style preamble used on the first prompt (later prompts prefixed with 'Next image in the same series, same style: Generate an image.'):

> Editorial documentary photograph for a British airport website, natural light, cool blue-leaning colour grade with navy and slate tones, photorealistic, 35mm, ultra sharp, no text, no logos, no brands, no watermarks, no identifiable faces, no recognisable real landmarks.

### home/hero

- Final prompt: preamble, 16:9 landscape, then Scene: dawn airfield panorama seen from inside a terminal window, wet apron with reflections, several aircraft tails silhouetted against a pale dawn, a slim air traffic control tower in the distance, dramatic layered sky with soft orange at the horizon, empty left third of the frame in darker tones.
- Shows: Dawn over a wet airfield seen through terminal glass, with aircraft tails and the control tower against a dramatic sky.
- Alt: Decorative, alt="" (heading text carries the meaning). Descriptive fallback: Dawn light over a wet apron with aircraft tails and the control tower seen from inside the terminal.
- Source 1376x768. Final 1440x810, upscale 1.05x. 1920 dropped.
- Files (`next/public/assets/img/home/hero-1440.{avif,webp,jpg}`): avif 41 KB, webp 63 KB, jpg 135 KB.

### home/parking

- Final prompt: preamble, 16:9 landscape, then Scene: the interior of a covered airport multi-storey car park at dusk, clean rows of parked cars, warm sodium lamps against the blue hour light entering from the open sides, a lone traveller with a wheeled suitcase walking away from camera towards an enclosed glass link bridge to the terminal, back turned, unidentifiable. Left half darker and uncluttered. No readable number plates.
- Shows: A traveller with a wheeled case walks through a covered car park at dusk towards the glass link bridge.
- Alt: Decorative, alt="". Descriptive fallback: A traveller with a wheeled case walks through a covered car park at dusk towards the glass link bridge to the terminal.
- Source 1376x768. Final 1440x810, upscale 1.05x. 1920 dropped.
- Files (`home/parking-1440.{avif,webp,jpg}`): avif 49 KB, webp 72 KB, jpg 152 KB.

### cities/cairo

- Final prompt: preamble, tall vertical portrait 9:16, then Scene: a Cairo dusk view, the Nile with felucca sails and the city lights beginning to glow, the Giza pyramids as small silhouettes far in the distance through warm golden haze, soft copper sky fading to blue at the top.
- Shows: Felucca sails on the Nile at dusk with the pyramids faint in the haze beyond the city lights.
- Alt: Felucca sails on the Nile at dusk, with the city lights glowing and the pyramids faint in the haze.
- Source 768x1376, cropped to 768x1117 (11:16). Final 714x1040, scale 0.93x (no upscale). 1071 dropped.
- Files (`cities/cairo-714.{avif,webp,jpg}`): avif 43 KB, webp 71 KB, jpg 116 KB.

### cities/new-york

- Final prompt: preamble, tall vertical portrait 9:16, then Scene: a Manhattan street canyon at blue hour looking up the avenue between tall glass and stone towers, a few lit windows, taillight streaks on the road, a steam plume rising, cool blue-navy grade with small warm accents.
- Shows: A wet avenue between tall towers at blue hour with light streaks and a plume of steam.
- Alt: A wet avenue between tall towers at blue hour, with light streaks from traffic and a plume of steam.
- Source 768x1376, cropped to 768x1117. Final 714x1040, scale 0.93x. 1071 dropped.
- Files (`cities/new-york-714.{avif,webp,jpg}`): avif 58 KB, webp 99 KB, jpg 153 KB.

### cities/beijing

- Final prompt: preamble, tall vertical portrait 9:16, then Scene: Beijing at dusk, in the foreground traditional curved temple rooflines with grey tiles and a few red hanging lanterns glowing, beyond them a modern glass skyline with lit windows under a deep blue sky.
- Shows: Grey tiled temple roofs with glowing red lanterns in front of a lit glass skyline at dusk.
- Alt: Grey tiled temple roofs with red lanterns glowing in front of a modern glass skyline at dusk.
- Source 768x1376, cropped to 768x1117. Final 714x1040, scale 0.93x. 1071 dropped.
- Files (`cities/beijing-714.{avif,webp,jpg}`): avif 77 KB, webp 137 KB, jpg 185 KB.

### cities/singapore

- Final prompt: preamble, tall vertical portrait 9:16, then Scene: a lush garden-city at dusk, tall tree-like vertical garden structures with glowing canopies silhouetted against a deep blue sky, tropical foliage in the foreground, a waterfront with three towers joined by a sky platform far in the background. Asked for generic and invented; the model rendered a recognisable skyline. Kept because the brief allows iconic scenery for the four city images.
- Shows: Glowing tree-like garden towers rise from tropical planting in front of three waterfront towers joined by a sky platform at dusk.
- Alt: Glowing tree-like garden towers above tropical planting, with three waterfront towers joined by a sky platform behind, at dusk.
- Source 768x1376, cropped to 768x1117. Final 714x1040, scale 0.93x. 1071 dropped.
- Files (`cities/singapore-714.{avif,webp,jpg}`): avif 94 KB, webp 166 KB, jpg 210 KB.

### airport/tower-security

- Final prompt: preamble, tall vertical portrait 2:3, then Scene: a modern airport security hall, a row of new CT baggage scanners with grey trays, a calm short queue of travellers seen from behind and blurred, cool white-blue light, polished floor, slightly dark and uncluttered lower half.
- Shows: A row of security scanners with empty grey trays and a short, calm queue of travellers seen from behind.
- Alt: A row of security scanners with grey trays and a short queue of travellers waiting calmly.
- Source 848x1264, cropped to 842x1263. Final 560x840 and 840x1260, scale 1.00x at the larger size.
- Files (`airport/tower-security-{560,840}.{avif,webp,jpg}`): 560 avif 35 KB, webp 63 KB, jpg 95 KB; 840 avif 64 KB, webp 111 KB, jpg 183 KB.

### airport/tower-eat-and-drink

- Final prompt: preamble, tall vertical portrait 2:3, then Scene: an espresso bar counter inside an airport terminal, close view of a barista's hands only (no face) tamping and pouring from a steel espresso machine, rising steam, ceramic cups, tall terminal glass behind with soft morning light, darker uncluttered lower half.
- Shows: A barista's hands tamp coffee beside a steaming espresso machine, with the apron in frame and aircraft beyond the terminal glass.
- Alt: A barista's hands prepare espresso at a terminal coffee bar, with steam rising and aircraft visible through the glass.
- Source 848x1264, cropped to 842x1263. Final 560x840 and 840x1260, scale 1.00x at the larger size.
- Files (`airport/tower-eat-and-drink-{560,840}.{avif,webp,jpg}`): 560 avif 23 KB, webp 36 KB, jpg 67 KB; 840 avif 38 KB, webp 59 KB, jpg 126 KB.

### airport/tower-baggage

- Final prompt: preamble, tall vertical portrait 2:3, then Scene: a baggage reclaim hall in a modern airport, a stainless steel carousel belt curving through the frame with a few plain dark suitcases on it, clean polished floor, soft diffuse cool light from above, no people, darker uncluttered lower half.
- Shows: A steel reclaim belt curves through an empty hall with a few dark suitcases riding it.
- Alt: A baggage reclaim belt in a clean hall with a few dark suitcases travelling round it.
- Source 848x1264, cropped to 842x1263. Final 560x840 and 840x1260, scale 1.00x at the larger size.
- Files (`airport/tower-baggage-{560,840}.{avif,webp,jpg}`): 560 avif 28 KB, webp 46 KB, jpg 78 KB; 840 avif 50 KB, webp 80 KB, jpg 150 KB.

### airport/tower-maps

- Final prompt: preamble, tall vertical portrait 2:3, then Scene: a wide airport terminal walkway with high ceiling and hanging directional sign panels that are completely blank and abstract (plain dark panels with no text, no arrows, no symbols), travellers walking in the distance as soft motion blur, cool daylight from skylights, polished floor, darker uncluttered lower half.
- Shows: A wide terminal walkway under skylights with blank hanging sign panels and travellers blurred by motion.
- Alt: A wide terminal walkway under skylights, with blank hanging sign panels and travellers walking in the distance.
- Source 848x1264, cropped to 842x1263. Final 560x840 and 840x1260, scale 1.00x at the larger size.
- Files (`airport/tower-maps-{560,840}.{avif,webp,jpg}`): 560 avif 30 KB, webp 52 KB, jpg 85 KB; 840 avif 54 KB, webp 92 KB, jpg 163 KB.

### home/hero (sky variants)

Twelve variants of one camera: view from inside the terminal through floor-to-ceiling glass, dark mullions and interior filling the left third, aircraft tails mid-frame, control tower on the right horizon. Only sky, light and weather change (brief section 2.1.3). Tool: Gemini (Flash-Lite image), one conversation per series, one image per message; `morning-rainy` was the reference shot, the other eleven were prompted "identical place, camera, framing and mullions as the earlier images, 16:9 landscape" plus the scene line. Every variant after the first drafts also carried "every aircraft must have a plain all-white unbranded livery, no airline logos, no tail designs, no lettering"; the first drafts of morning-sunny, morning-cloudy, afternoon-sunny and afternoon-cloudy showed real airline liveries and were regenerated with that line.

Pipeline: source 1376x768 (Gemini full-size download), centre-crop 16:9, Lanczos to 1440x810 (1.05x), `-unsharp 0x0.75+0.75+0.008`, strip; AVIF q55, WebP q82, JPEG q85. No variant needed darkening; the left-third mullions and dark interior carry the text zone. Sources are kept in `docs/design/hero-src/`.

| Variant | Scene | Contrast desktop / narrow | avif / webp / jpg KB | Total KB |
|---|---|---|---|---|
| morning-sunny | clear golden sunrise, low sun far right beside the tower, long shadows, dry apron | 9.96:1 / 8.79:1 | 30 / 38 / 97 | 165 |
| morning-cloudy | flat grey-blue overcast dawn, soft diffuse light, dry apron | 8.01:1 / 8.72:1 | 33 / 45 / 109 | 187 |
| morning-rainy | REFERENCE (shipped earlier): rainy blue-hour dawn, wet apron, pink-orange horizon | 7.11:1 / 9.60:1 | 41 / 63 / 135 | 239 |
| afternoon-sunny | bright clear afternoon, deep blue sky, hard light from upper right, crisp shadows | 7.63:1 / 10.88:1 | 34 / 48 / 112 | 194 |
| afternoon-cloudy | white-grey flat overcast, shadowless light | 6.22:1 / 6.93:1 | 35 / 50 / 115 | 200 |
| afternoon-rainy | heavy rain streaks and droplets on the glass, wet grey apron, grey sky | 7.21:1 / 7.69:1 | 58 / 85 / 157 | 300 |
| evening-sunny | golden-hour sunset, low orange sun far right beside the tower, long soft shadows | 7.85:1 / 8.08:1 | 35 / 47 / 114 | 196 |
| evening-cloudy | dusk under broken cloud, blue-purple sky, last orange glow, apron floodlights coming on | 11.19:1 / 9.89:1 | 36 / 45 / 113 | 194 |
| evening-rainy | rain at dusk, dark blue-grey sky, faint orange glow, lit wet reflections | 12.22:1 / 11.22:1 | 41 / 52 / 119 | 212 |
| night-sunny | clear starry night, crescent moon upper right, apron floodlights | 12.94:1 / 11.59:1 | 39 / 47 / 113 | 199 |
| night-cloudy | low orange-grey cloud ceiling lit from below by the floodlights, no stars | 11.55:1 / 10.39:1 | 32 / 42 / 104 | 178 |
| night-rainy | night rain, streaked glass, glowing floodlight and taxiway reflections | 12.42:1 / 10.97:1 | 44 / 54 / 118 | 216 |

Prompt scene lines (all prefixed with the identical-camera sentence and the unbranded-aircraft sentence, "no text, no logos"): see the Scene column; wording per variant is the scene text with "interior left third stays dark" appended. Alt text is empty (decorative; the hero text carries the meaning). Gate: `.venv/bin/python scripts/hero_contrast.py`, 12/12 pass at 4.5:1 desktop and narrow.
