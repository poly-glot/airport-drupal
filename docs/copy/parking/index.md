---
path: /parking/index.html
title: "Parking — Meridian Airport"
description: "Compare three car parks at Meridian Airport, from £8.50 a day. Pre-book for up to 40% off drive-up rates, with free cancellation up to 24 hours before."
h1: "Parking"
intro: "Three car parks, all step-free to check-in, from a 2-minute walk to an 8-minute shuttle. Pre-book for up to 40% off drive-up rates."
---

## Book parking

- Anchor: `#quote`
- Presentation: the page hero IS the homepage parking photo band (spec §10): breadcrumb, h1, the front-matter intro as the lede, the three stats (Closest walk 2 min · Pick-up wait 10 min free · Drop-off £3), "Compare car parks" link to `#compare`, and this form floating right as the band's card.

Choose a car park, then your dates.

Form fields (labels, hints and errors in `ui-labels.md` "Parking quote"). The homepage parking form sends its choices here as a GET request.

- Car park | radio, one per row from `data.md` `## Car parks`: name, then detail, then price | | required
  - P1 Short-stay · 2 min walk · pick-up and drop-off · from £4 / hr
  - P2 Long-stay · 5 min walk · covered · from £8.50 / day (checked by default)
  - Mid-Stay · 8 min shuttle · 10 min free wait · from £12 / day
- Arrive | date | | required
- Return | date | | required

Button: Check prices and availability

No payment until you confirm. Free cancellation up to 24 hours before arrival.

Fictional form note: This is a demonstration form for a fictional airport. No booking is made and nothing is charged.

## Compare car parks

- Anchor: `#compare`

Presentation: package cards (catalogue §7.7a) — tier name, "From £{price} per {unit}" as the big price, the getting-there line as the ruled meta, "What you get" as the tick list, Best for, and "Book {name}" -> `#quote` pinned at the bottom. P2 Long-stay carries the "Recommended" badge and the solid button (it is the form's checked default). The at-a-glance table follows the cards. Card fields per car park from `data.md` `## Car parks`:

- From (price line pattern: "From £{price} per hour" for P1, "From £{price} per day" for P2 and Mid-Stay)
- Getting to the terminal
- What you get
- Best for

Link pattern on each card: Book {car park name} -> `#quote`

Comparison table caption: Car parks at a glance

| Car park | To the terminal | From | Covered | Electric charging |
|---|---|---|---|---|
| P1 Short-stay | 2 min walk | £4 per hour | Walkway only | 6 bays |
| P2 Long-stay | 5 min walk | £8.50 per day | Yes | 40 bays |
| Mid-Stay | 8 min shuttle | £12 per day | No | 120 bays |

Link: See the car parks on the map -> /getting-here/index.html

## Drop-off and pick-up

### At the terminals

Drop-off zones are right outside both terminals. They cost £3 for up to 10 minutes, paid by card or phone at the exit barrier. You cannot leave your car unattended.

### Free at Mid-Stay

Use the free 10-minute zone at the Mid-Stay car park, for dropping off or picking up. Your passenger takes the shuttle bus to or from either terminal, which runs every 10 minutes, day and night.

### Picking someone up

Park in P1 Short-stay and walk across the covered walkway to arrivals, from £4 an hour. Or wait for free for 10 minutes at Mid-Stay and ask your passenger to take the shuttle out to you.

## Blue Badge holders

All three car parks have Blue Badge bays. The closest are in P1 Short-stay, next to the walkway to Terminal 1. You pay the normal rate. If you need help from the car park to check-in, book special assistance and we will meet you at your car.

Link: Special assistance -> /help/special-assistance.html

## Electric vehicles

There are 166 charging bays across all three car parks: 6 in P1, 40 in P2 and 120 in Mid-Stay. Charging costs 45p per kWh, paid at the charger by card. You can add a charging bay when you book.

## Good to know

- Your number plate is your ticket. Cameras read it on the way in and out.
- All three car parks are step-free to check-in, with lifts in each one.
- Shuttle buses have a ramp, space for a wheelchair and racks for big cases.
- If your return flight is delayed, the first 2 hours past your booked time are free.
- Height limit in P2 Long-stay is 2.1 metres. Vans and roof boxes should use Mid-Stay.

## Parking questions

Common questions about parking are answered in our FAQs.

Link: Parking FAQs -> /help/index.html#faqs
