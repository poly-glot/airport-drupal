# Copy deck: how to read it

Single source for the static pages and the Umbraco seed. Use every line verbatim.

## File conventions

- One file per page, mirroring the sitemap path: `/flights/airlines.html` lives in `flights/airlines.md`. The homepage is `home.md`. Section index pages are `index.md`.
- Front matter at the top of each page file:
  - `path`: the static URL.
  - `title`: the `<title>` text, always "Page — Meridian Airport".
  - `description`: the meta description, 155 characters or fewer.
  - `h1`: the page heading.
  - `intro`: the hero sub-line under the h1.
  - `hero_image` / `hero_alt`: only on pages with a photographic hero. `hero_image` is the slot stem from brief §5; append `-960`/`-1440` and `.avif`/`.webp`/`.jpg`. `hero_alt` is the final alt text; `hero_art_direction` is for the imagery agent only and never appears on the page.
  - Destination guides also carry `city`, `country`, `flight_time` and `airlines`.
- `Demonstration note:` and `Fictional form note:` lines are body copy and must render.
- In the body, `##` is an h2 and `###` is an h3. Never skip a level.
- Lines starting `Link:` are calls to action, written as `Link: Visible text -> /path.html`.
- Lines starting `Hidden:` are visually hidden text to append to a link so it makes sense out of context.
- Form blocks list each field as `Label | type | hint | required`. Error messages for each field are in `ui-labels.md`.

## Where the entities live

| Entity | File | Anchor |
|---|---|---|
| Notice (kind, text, action) | `data.md` | `## Notices` |
| FlightRow (with gate, note) | `data.md` | `## Departures`, `## Arrivals` |
| CarPark | `data.md` | `## Car parks` |
| Airline | `data.md` | `## Airlines` |
| Destination (summary) | `data.md` | `## Destinations` |
| Destination (guide) | `destinations/{lisbon,reykjavik,marrakech}.md` | front matter + sections |
| WhereWeFly | `data.md` | `## Where we fly` |
| Offer | `data.md` | `## Offers` |
| HelpItem | `home.md` | `## Help for the day you fly` |
| Tower | `home.md` | `## At the airport` |
| TerminalFacility | `data.md` | `## Terminal facilities` |
| FAQ | `data.md` | `## FAQs` |
| Role | `data.md` | `## Roles` |
| Release | `data.md` | `## Releases` |
| UI labels, statuses, errors | `ui-labels.md` | |

## Fixed facts used across the deck

- Contact set: phone `0121 496 0123`, email `hello@meridianairport.example`, address `Meridian Airport, Skyline Way, Birmingham B99 1MA`.
- Passenger enquiries line hours: every day 05:00–23:00. The airport is open 24 hours.
- Terminal 1: check-in zones A to C, gates 1 to 19, railway station below. Meridian Air flies from Terminal 1.
- Terminal 2: check-in zones D to F, gates 20 to 38, coach station alongside. Nordvik, Azur Express and Kestrel fly from Terminal 2.
- The terminals are linked by a covered walkway, about 5 minutes on foot.
- Runway 09/27. Approach road: the A45.
- Three car parks: P1 Short-stay (2 min walk, from £4 an hour), P2 Long-stay (5 min walk, covered, from £8.50 a day), Mid-Stay (8 min shuttle, free 10-minute wait, from £12 a day). Drop-off outside the terminals costs £3 for up to 10 minutes. 166 charging bays: 6 in P1, 40 in P2, 120 in Mid-Stay.
- Security waits today: 8 min in Terminal 1, 22 min in Terminal 2. Fast Track from £7. Gates show 60 minutes before departure; reclaim belts 1 to 4 are in Terminal 1, 5 to 8 in Terminal 2.
- 112 destinations in all: 20 direct on our four airlines, the rest with one change on a partner airline.
- Play areas by gate 12 (Terminal 1) and gate 30 (Terminal 2). Prams go to the aircraft door.
- The comp's placeholder phone number, address and map village names never appear: use the contact set above and the invented villages Marston End and Hollin Rise.
- Pages added in v2: `help/travelling-with-children.md` and `help/first-time-flying.md`.
- "Today" on the site is Saturday 3 October 2026. Live data is a fixed demonstration snapshot, "updated 09:42".
