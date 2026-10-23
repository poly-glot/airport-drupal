---
path: /index.html
title: "Flights, parking and travel information — Meridian Airport"
description: "Live flights, security wait times and parking at Meridian Airport, Birmingham. Check your flight, pre-book parking and reserve duty free."
h1: "Welcome to Meridian Airport"
intro: "Your gateway to 112 destinations. Check your flight, pre-book parking and reserve duty free to collect at the gate."
---

Homepage copy is fixed by the v2 design comp. Every line below is verbatim, with four substitutions (brief §3): the comp's airline codes substituted to KW (Kestrel) and ZX (Azur Express), the comp's placeholder phone number replaced by 0121 496 0123, the comp's placeholder address replaced by the Birmingham postcode, and the comp's two map village names replaced by invented ones.

The `##` headings in this file group the comp's sections and are not page headings. Page headings are the `H1`/`H2` values given inside each section; item titles are h3.

## Travel notice bar

- Region label: Travel notices
- Counter: "1 of 3" (pattern `{n} of {total}`)
- Notice layout: `{kind} · {text} {action}` (the action sentence is weight 600)
- Notices: see `data.md` `## Notices` (three, verbatim)
- Previous button label: Previous notice
- Next button label: Next notice
- Link: Check my flight -> /flights/index.html

## Header

- Logo link label: Meridian Airport home
- Lockup text: Meridian Airport
- Main nav label: Main
- Nav: Flights -> /flights/index.html; Shop -> /at-the-airport/shopping.html; Parking -> /parking/index.html; Lounges -> /at-the-airport/lounges.html; Getting here -> /getting-here/index.html; Assistance -> /help/index.html
- Language label: EN (visually hidden: "Language: English")
- Search button label: Search the site
- Basket link label: Basket, 0 items -> /at-the-airport/shopping.html
- Primary button: Book parking -> /parking/index.html
- Menu button label: Open menu (when open: Close menu)

## Hero

- Weather: 12°C light rain
- Date line: Saturday 3 October · 09:42 local
- H1: Welcome to Meridian Airport
- Sub: Your gateway to 112 destinations. Check your flight, pre-book parking and reserve duty free to collect at the gate.
- Image: `home/hero` slot, decorative (alt="")

### Sign links

| Title | Sub | Href |
|---|---|---|
| Reserve duty free | Collect at your gate | /at-the-airport/shopping.html |
| Book parking | From £8.50 a day | /parking/index.html |
| Fast Track | £7 · skip the queue | /at-the-airport/lounges.html#fast-track |

### Flight search card

- Tab row label: What are you looking for
- Tab row: Flight tracking (current) | Fast Track -> /at-the-airport/lounges.html#fast-track | Lounges -> /at-the-airport/lounges.html
- Radio group label: Direction
- Radios: Departures (checked) | Arrivals
- Select label: When
- Select options: Today, 3 October | Tomorrow, 4 October | Monday, 5 October
- Input label: Flight number, airline or city
- Placeholder: e.g. MA 204 or Lisbon
- Button: Search flights
- Form target: /flights/index.html (GET)
- Link: Meeting someone? Go to live arrivals -> /flights/index.html#arrivals

## Security wait panel

- Region label: Live security wait times
- Heading: Security wait times
- Stamp: · updated 09:42

| Label | Value | Tone |
|---|---|---|
| Terminal 1 | 8 min | ok |
| Terminal 2 | 22 min | warn |
| Roads and rail | Running normally | plain text after a divider |

## Live flights

- Anchor: `#live-flights`
- H2: Live flights
- Meta line: Updated 09:42 · refreshes every minute · gates shown from 60 min before departure
- Clock: 09:42
- Clock caption: Local time (rendered uppercase by CSS)
- Board label: Flight board
- Tabs: Departures | Arrivals
- Board search label (visually hidden): Search departures by flight or city (arrivals tab: Search arrivals by flight or city)
- Board search placeholder: Search departures by flight or city (arrivals tab: Search arrivals by flight or city)
- No-matches row: No flights match "{query}" on the departures board. Try the flight number (e.g. MA 204) or the city. (arrivals tab: "on the arrivals board")
- Columns (departures): Time | To | Flight | Terminal | Gate | Status | Info
- Columns (arrivals): Time | From | Flight | Terminal | Belt | Status | Info
- Board: split-flap tiles with a status lamp per row; the note sits in the Info column (may be empty)
- Rows: the six-row homepage subset in `data.md` (`## Departures` and `## Arrivals`, rows marked `home`), including `gate` and `note`
- Legend: On time / landed | Boarding / gate open | Delayed | Cancelled
- Link (departures tab): All departures -> /flights/index.html#departures
- Link (arrivals tab): All arrivals -> /flights/index.html#arrivals

## Parking

- Anchor: `#parking`
- H2: Park at the terminal from £8.50 a day
- Sub: Three car parks, all step-free to check-in. Pre-booked rates are up to 40% below drive-up, with free cancellation until 24 hours before you arrive.
- Image: `home/parking` slot, decorative (alt="")

Stats (`dl`):

| Label | Value |
|---|---|
| Closest walk | 2 min |
| Pick-up wait | 10 min free |
| Drop-off | £3 |

- Link: Compare all car parks and the map -> /parking/index.html#compare

### Book parking

- H3: Book parking
- Lead: Choose a car park, then your dates.
- Radio group label: Car park

| Option | Detail | Price | Default |
|---|---|---|---|
| P1 Short-stay | 2 min walk · pick-up and drop-off | from £4 / hr | |
| P2 Long-stay | 5 min walk · covered | from £8.50 / day | checked |
| Mid-Stay | 8 min shuttle · 10 min free wait | from £12 / day | |

- Fields:
  - Arrive | date | | required
  - Return | date | | required
- Button: Check prices and availability
- Note: No payment until you confirm. Free cancellation up to 24 hours before arrival.
- Form target: /parking/index.html#quote (GET)

## Where we fly

- Anchor: `#explore`
- H2: Where we fly
- H2 second line (block span, accent colour): Find your next holiday
- Link: View all 112 destinations -> /flights/airlines.html#destinations
- Counter: 1 – 3 / 4 (pattern `{first} – {last} / {total}`)
- Previous button label: Previous destinations
- Next button label: Next destinations
- Cards: the four cities in `data.md` `## Where we fly`. Meta pattern: `from £{priceFrom} · {duration} · {frequency}`, then the city name. Every card links to /destinations/index.html. Images decorative (alt="").

## Help for the day you fly

- Anchor: `#help`
- H2: Help for the day you fly
- Link: All passenger services -> /help/index.html

Help items (entity: HelpItem), in this order:

### Special assistance

- Icon: accessibility
- Body: Help from kerb to gate, step-free routes and sunflower lanyards. Book up to 48 hours before and we confirm within the hour.
- Href: /help/special-assistance.html

### Travelling with children

- Icon: family
- Body: Family security lane, prams to the aircraft door, baby-change in every zone and play areas by gates 12 and 30.
- Href: /help/travelling-with-children.html

### First time flying?

- Icon: plane
- Body: Check-in, bag drop, security, gate: a five-step walkthrough with how long each takes today.
- Href: /help/first-time-flying.html

### Flight alerts

- Icon: bell
- Body: Gate changes, delays and boarding calls by text or WhatsApp the moment they happen. Free.
- Href: /flights/alerts.html

### Lost property

- Icon: suitcase
- Body: Report a lost item in two minutes and track it. Most bags are reunited the same day.
- Href: /help/baggage-and-lost-property.html#lost-property

### Info and contacts

- Icon: info
- Body: Passenger enquiries 05:00–23:00 on 0121 496 0123, live chat in the app, and help desks in both terminals.
- Href: /help/index.html

## At the airport

- Anchor: `#at-the-airport`
- H2: At the airport
- Intro: Everything between the door and the gate.
- Link: Terminal maps -> /at-the-airport/index.html#maps

Towers (entity: Tower), in this order. Each has a photo slot `airport/tower-{slug}`, decorative (alt="").

| Number | Title | Body | CTA | Href | Image slug |
|---|---|---|---|---|---|
| 01 | Security and customs | New scanners in Terminal 1: liquids and laptops stay in your bag. Arrive two hours before short-haul, three for long-haul. | What to expect | /at-the-airport/security.html | security |
| 02 | Eat and drink | 24 cafés, restaurants and bars across both terminals. Order ahead and your coffee is waiting after security. | Order ahead | /at-the-airport/eat-and-drink.html | eat-and-drink |
| 03 | Baggage and lost property | Allowances by airline, what you can carry, and how to report and track a lost item. Most bags are reunited the same day. | Read more | /help/baggage-and-lost-property.html | baggage |
| 04 | Terminal maps | Shops, lounges, lifts, baby-change and every gate on an interactive map of both terminals. | Open the map | /at-the-airport/index.html#maps | maps |

- Hidden text after "Read more": about baggage and lost property

## Getting here

- Anchor: `#getting-here`
- H2: Getting here
- Intro: Trains from the city centre run every 10 minutes and stop under Terminal 1. Drop-off is outside both terminals, with a free 10-minute wait at Mid-Stay.

Rows:

- By train / 18 min from Central · lifts from platform to check-in -> /getting-here/index.html#train
- By car or taxi / Drop-off £3 at the door, or free for 10 min at Mid-Stay -> /getting-here/index.html#car
- By bus or coach / Routes, timetables and the coach station -> /getting-here/index.html#bus

Step-free note (lanyard icon):

- Lead (bold): Step-free throughout.
- Body: Lifts at the station, every car park and both terminals. Prams go all the way to the aircraft door.

### Map

This is the canonical site map, reused on `/getting-here/index.html`.

- Label: Map of Meridian Airport: the terminals, rail station, car parks and approach roads
- Terminal blocks: Terminal 1 / Rail station below; Terminal 2 / Gates 20–38
- Car park chips: P1 / 2 min walk; P2 / 5 min walk; Mid-Stay / 8 min shuttle
- Station label: Meridian Airport station
- Road chips: A45 (twice)
- River label: River Meridian
- Park label: Meridian Country Park
- Village labels: Marston End; Hollin Rise
- Runway label: RUNWAY 09/27
- Info card title: Meridian Airport
- Info card address: Terminal 1, Birmingham B99 1MA
- Info card buttons: Directions -> /getting-here/index.html; Larger map -> /at-the-airport/index.html#maps
- Zoom buttons: + (label "Zoom in"), − (label "Zoom out"), decorative on a schematic map
- Caption: Map data · Terms

## Footer

- Lockup: Meridian Airport
- Enquiries line: Open 24 hours. Passenger enquiries 0121 496 0123, every day 05:00–23:00. Live chat in the app.
  - The number links to `tel:+441214960123`.
- Social links (labels): Instagram, X, YouTube, LinkedIn. All link to `#` in the demo; they are not real accounts.

### Flights

- Live departures -> /flights/index.html#departures
- Live arrivals -> /flights/index.html#arrivals
- Destinations -> /destinations/index.html
- Flight alerts -> /flights/alerts.html

### Shop & relax

- Reserve & collect -> /at-the-airport/shopping.html
- Offers this week -> /at-the-airport/shopping.html#offers
- Lounges & Fast Track -> /at-the-airport/lounges.html
- Order-ahead food -> /at-the-airport/eat-and-drink.html

### Plan

- Parking -> /parking/index.html
- Getting here -> /getting-here/index.html
- Special assistance -> /help/special-assistance.html
- Travelling with children -> /help/travelling-with-children.html

### Company

- Contact us -> /help/index.html
- Careers -> /about/careers.html
- Media centre -> /about/media-centre.html
- Sustainability -> /about/sustainability.html

### Legal bar

- © 2026 Meridian Airport Ltd. A fictional airport.
- Accessibility -> /accessibility.html
- Privacy -> /privacy.html
- Cookies -> /cookies.html
- Terms -> /terms.html
- Site map -> /sitemap.html

Weather block variants (set by site.js; the comp snapshot is the no-JS default): sunny -> "18°C sunny" ("clear" at night), cloudy -> "14°C cloudy", rainy -> "12°C light rain". The date line follows the real clock; under a `?sky=` test override it shows 09:42 / 14:30 / 19:15 / 23:50 by daypart.
