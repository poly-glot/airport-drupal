# Structured data

All entities are fictional. Flight times and statuses are a fixed demonstration snapshot for Saturday 3 October 2026, "updated 09:42". Rows marked `home` are the homepage subset and are verbatim from the v2 design comp, with the comp's airline codes substituted to KW (Kestrel) and ZX (Azur Express). All other rows, gates and notes are invented to match.

## Notices

Entity: Notice. Verbatim from the v2 comp, in this order. The bar shows `{kind} · {text}` then the action sentence in weight 600.

| # | kind | text | action |
|---|---|---|---|
| 1 | Travel disruption | Fog is delaying some morning departures by up to 40 minutes. | What to do: check your flight below before setting off and allow extra time at security. |
| 2 | Roadworks | Lane closures on the A45 approach until 12 October. | What to do: allow an extra 15 minutes if you are driving to Terminal 2, or take the train. |
| 3 | Security | New scanners in Terminal 1. | What to do: nothing — liquids and laptops can now stay in your bag. |

## Departures

Entity: FlightRow. Column heading for `place` is "To" and for `gate` is "Gate". Gates are shown from 60 minutes before departure; until then `gate` is "—" and the note gives the time the gate will show. Terminal 1 uses gates 1 to 19, Terminal 2 gates 20 to 38. An empty note shows nothing.

| time | flightNo | airlineCode | airline | place | terminal | gate | status | note | home |
|---|---|---|---|---|---|---|---|---|---|
| 10:05 | MA 204 | MA | Meridian Air | Lisbon | T1 | 12 | Boarding | Closes 10:20 | home |
| 10:20 | NV 118 | NV | Nordvik | Reykjavík | T2 | 24 | Delayed | New time 10:58 · fog | home |
| 10:35 | MA 310 | MA | Meridian Air | Amsterdam | T1 | 7 | Gate open | | home |
| 10:50 | ZX 762 | ZX | Azur Express | Marrakech | T2 | 31 | On time | | home |
| 11:10 | MA 522 | MA | Meridian Air | Dublin | T1 | — | On time | Gate at 10:10 | home |
| 11:25 | KW 1430 | KW | Kestrel | Geneva | T2 | — | Cancelled | Rebook at desk 14 or in app | home |
| 11:40 | ZX 410 | ZX | Azur Express | Malaga | T2 | — | On time | Gate at 10:40 | |
| 11:55 | MA 118 | MA | Meridian Air | Paris | T1 | — | On time | Gate at 10:55 | |
| 12:15 | NV 204 | NV | Nordvik | Oslo | T2 | — | Delayed | New time 12:45 · late aircraft | |
| 12:30 | MA 640 | MA | Meridian Air | Barcelona | T1 | — | On time | Gate at 11:30 | |
| 12:50 | KW 1512 | KW | Kestrel | Salzburg | T2 | — | On time | Gate at 11:50 | |
| 13:05 | MA 702 | MA | Meridian Air | Faro | T1 | — | On time | Gate at 12:05 | |

## Arrivals

Entity: FlightRow. Column heading for `place` is "From" and for `gate` is "Bags". Once a flight has landed, `gate` shows the reclaim belt ("Belt n") and the note shows the exit. Terminal 1 uses belts 1 to 4 and exit Arrivals A; Terminal 2 uses belts 5 to 8 and exit Arrivals B. Until then `gate` is "—".

| time | flightNo | airlineCode | airline | place | terminal | gate | status | note | home |
|---|---|---|---|---|---|---|---|---|---|
| 09:48 | MA 205 | MA | Meridian Air | Lisbon | T1 | Belt 3 | Landed | Exit: Arrivals A | home |
| 09:55 | ZX 761 | ZX | Azur Express | Marrakech | T2 | Belt 6 | Landed | Exit: Arrivals B | home |
| 10:10 | NV 117 | NV | Nordvik | Reykjavík | T2 | — | Delayed | Expected 10:40 | home |
| 10:30 | MA 311 | MA | Meridian Air | Amsterdam | T1 | — | Expected | | home |
| 10:45 | KW 1429 | KW | Kestrel | Geneva | T2 | — | Expected | | home |
| 11:00 | MA 523 | MA | Meridian Air | Dublin | T1 | — | Expected | | home |
| 11:15 | ZX 409 | ZX | Azur Express | Malaga | T2 | — | Expected | | |
| 11:35 | MA 117 | MA | Meridian Air | Paris | T1 | — | Expected | | |
| 11:50 | NV 203 | NV | Nordvik | Oslo | T2 | — | Delayed | Expected 12:20 | |
| 12:10 | MA 641 | MA | Meridian Air | Barcelona | T1 | — | Expected | | |
| 12:25 | KW 1511 | KW | Kestrel | Salzburg | T2 | — | Expected | | |
| 12:40 | MA 703 | MA | Meridian Air | Faro | T1 | — | Expected | | |

Status words and their tone (dot colour token) are in `ui-labels.md`.

## Car parks

Entity: CarPark. Three car parks. Prices are the lowest pre-booked rate. Pre-booked rates are up to 40% below drive-up rates.

### P1 Short-stay

- walk/transfer: 2 min walk · pick-up and drop-off
- price from: £4 per hour
- features: Covered walkway to Terminal 1, 6 minutes on to Terminal 2; Blue Badge bays nearest the doors; 6 electric vehicle charging bays; Open 24 hours
- bestFor: Picking someone up, or a few hours at the airport

### P2 Long-stay

- walk/transfer: 5 min walk · covered
- price from: £8.50 per day
- features: Under cover on every level; Lifts to all floors; 40 electric vehicle charging bays; Height limit 2.1 metres; Pre-booked taxi pick-up on level 0
- bestFor: Weekends, short breaks and holidays

### Mid-Stay

- walk/transfer: 8 min shuttle · 10 min free wait
- price from: £12 per day
- features: Free shuttle to both terminals, every 10 minutes, 24 hours; Free 10-minute drop-off and pick-up zone; 120 electric vehicle charging bays; Space for vans and roof boxes; Shuttle buses have a ramp and space for a wheelchair
- bestFor: Free drop-off and pick-up, charging an electric car while you are away, and vehicles too tall for P2

## Airlines

Entity: Airline (feeds `/flights/airlines.html`). All four airlines are fictional.

### Meridian Air (MA)

- terminal: T1, check-in zone A and B
- summary: Our home airline. Short flights across Europe, most of them daily.
- destinations: Amsterdam, Barcelona, Dublin, Faro, Lisbon, Paris, Rome

### Nordvik (NV)

- terminal: T2, check-in zone D
- summary: Flights to Iceland, Norway and Denmark, with extra winter seats to Reykjavík.
- destinations: Bergen, Copenhagen, Oslo, Reykjavík

### Azur Express (ZX)

- terminal: T2, check-in zone E
- summary: Sunshine routes to Spain, France, the Balearics and Morocco.
- destinations: Agadir, Malaga, Marrakech, Nice, Palma

### Kestrel (KW)

- terminal: T2, check-in zone F
- summary: Flights to the Alps for skiers in winter and walkers in summer.
- destinations: Geneva, Innsbruck, Salzburg, Zurich

### Destination table

| Destination | Country | Airline | Terminal | Flight time | How often |
|---|---|---|---|---|---|
| Agadir | Morocco | Azur Express | T2 | 3h 55m | Twice a week |
| Amsterdam | Netherlands | Meridian Air | T1 | 1h 15m | Three times a day |
| Barcelona | Spain | Meridian Air | T1 | 2h 10m | Daily |
| Bergen | Norway | Nordvik | T2 | 1h 50m | Four times a week |
| Copenhagen | Denmark | Nordvik | T2 | 1h 50m | Daily |
| Dublin | Ireland | Meridian Air | T1 | 1h 05m | Four times a day |
| Faro | Portugal | Meridian Air | T1 | 2h 50m | Daily |
| Geneva | Switzerland | Kestrel | T2 | 1h 45m | Daily |
| Innsbruck | Austria | Kestrel | T2 | 2h 05m | Twice a week, 19 December 2026 to 3 April 2027 |
| Lisbon | Portugal | Meridian Air | T1 | 2h 45m | Twice a day |
| Malaga | Spain | Azur Express | T2 | 2h 50m | Daily |
| Marrakech | Morocco | Azur Express | T2 | 3h 40m | Daily |
| Nice | France | Azur Express | T2 | 2h 00m | Five times a week |
| Oslo | Norway | Nordvik | T2 | 2h 00m | Daily |
| Palma | Spain | Azur Express | T2 | 2h 25m | Daily |
| Paris | France | Meridian Air | T1 | 1h 15m | Three times a day |
| Reykjavík | Iceland | Nordvik | T2 | 3h 10m | Daily |
| Rome | Italy | Meridian Air | T1 | 2h 40m | Daily |
| Salzburg | Austria | Kestrel | T2 | 2h 00m | Four times a week |
| Zurich | Switzerland | Kestrel | T2 | 1h 45m | Daily |

## Destinations

Entity: Destination (summary). Full guide sections live in `destinations/*.md`.

| city | country | flightTime | airline(s) | title | teaser | heroImage |
|---|---|---|---|---|---|---|
| Lisbon | Portugal | 2h 45m | Meridian Air (MA) | Lisbon in a long weekend | Where to eat, which hills to climb and the tram worth queueing for. | /assets/img/destinations/lisbon-hero |
| Reykjavík | Iceland | 3h 10m | Nordvik (NV) | Chasing the northern lights | When to go, what to pack and how far from the city you really need to be. | /assets/img/destinations/reykjavik-hero |
| Marrakech | Morocco | 3h 40m | Azur Express (ZX) | Marrakech for first-timers | Riads, rooftops and how to find your way around the souks. | /assets/img/destinations/marrakech-hero |

## Where we fly

Entity: WhereWeFly. The homepage city rail (`home.md` `## Where we fly`), in this order. Verbatim from the v2 comp. Prices are the lowest return fare found this week; durations are the fastest journey, with one change on a partner airline. Every card links to `/destinations/index.html`. `image` is the slot stem; append `-714`/`-1071` and `.avif`/`.webp`/`.jpg`.

| city | priceFrom | duration | frequency | image |
|---|---|---|---|---|
| Cairo | £189 | 5h 10m | daily | /assets/img/cities/cairo |
| New York | £329 | 8h 05m | twice daily | /assets/img/cities/new-york |
| Beijing | £449 | 10h 30m | 4 a week | /assets/img/cities/beijing |
| Singapore | £479 | 13h 15m | daily | /assets/img/cities/singapore |

## Offers

Entity: Offer. Shown on `/at-the-airport/shopping.html#offers` under "Offers this week". All products are own-brand or venue items invented for this site. Valid Saturday 3 October to Friday 9 October 2026.

| title | venue | terminal | detail | ends |
|---|---|---|---|---|
| 20% off Meridian Reserve fragrances | Meridian Duty Free | T1 and T2 | Our own-label eau de parfum and aftershave, 20% off when you reserve online and collect at the gate. | Friday 9 October |
| Three for two on travel-size toiletries | Fernhill Pharmacy | T1 | Mix and match sun cream, toothpaste, shampoo and more, all in containers of 100 ml or less. | Friday 9 October |
| 15% off when you order ahead | Little Orchard | T2 | Order salads, wraps and juices in the app before security and pick them up from the Order ahead shelf, 15% off. | Friday 9 October |

## Terminal facilities

Entity: TerminalFacility. All venue names are invented. "Before" means before security; "after" means in the departure lounge, airside.

| venue | terminal | zone | hours | category | description |
|---|---|---|---|---|---|
| The Copper Kettle | T1 | before | 04:00–22:00 | eat | Tea, coffee and bacon rolls by the arrivals doors. A good place to meet people off a flight. |
| Platform Seven Bakery | T1 | before | 05:00–20:00 | eat | Fresh bread, pastries and sandwiches at the top of the station escalators. |
| Skyline Kitchen | T1 | after | 04:30–21:00 | eat | Full breakfasts until 11:30, then hot plates and salads. Table service with views of the runway. |
| Runway Noodle Bar | T1 | after | 10:00–21:30 | eat | Ramen, rice bowls and dumplings, cooked to order in about 8 minutes. |
| Northlight Coffee | T2 | before | 04:00–22:00 | eat | Coffee, porridge and toasties next to check-in zone D. |
| The Wayfarer | T2 | after | 04:30–last departure | eat | Bar and grill with a full menu all day and a children's menu. |
| Little Orchard | T2 | after | 04:30–20:30 | eat | Salads, wraps, fruit pots and juices to take on board. |
| Meridian Duty Free | T1 | after | 04:00–last departure | shop | Perfume, beauty, spirits and chocolate. Reserve and collect available. |
| Pocket and Plug | T1 | after | 05:00–21:00 | shop | Chargers, adaptors, headphones and travel pillows. |
| Fernhill Pharmacy | T1 | before | 05:00–21:00 | shop | Pharmacist on site, travel sickness remedies, sun cream and toiletries in travel sizes. |
| Meridian Duty Free | T2 | after | 04:00–last departure | shop | The full duty free range. Reserve and collect available. |
| Pages and Passports | T2 | after | 04:30–last departure | shop | Books, magazines, sweets and puzzle books for the flight. |
| Kit and Caboodle | T2 | after | 06:00–20:00 | shop | Toys, colouring sets and small games for children. |
| The Meridian Lounge | T1 | after | 04:00–21:00 | lounge | Hourly lounge with hot food, drinks, work desks and two shower rooms. |
| Horizon Lounge | T2 | after | 04:30–21:30 | lounge | Hourly lounge with a quiet room, family area, work desks and three shower rooms. |
| Quiet Room | T1 | after | 24 hours | lounge | A free, dim, quiet space near gate 4 for anyone who needs a break from the noise. |
| Quiet Room | T2 | after | 24 hours | lounge | A free, dim, quiet space near gate 24 for anyone who needs a break from the noise. |

## FAQs

Entity: FAQ. Sixteen questions, four per category. Render on `/help/index.html#faqs` grouped by category, in this order: security, baggage, parking, assistance.

### security

**How early should I get to the airport?**
Be at the terminal 2 hours before your flight. Bag drop closes 45 minutes before departure, and gates close 20 minutes before. Allow longer on Friday and Sunday mornings, when security is busiest.

**Do I need to take liquids out of my bag?**
In Terminal 1, no. The new scanners mean liquids in containers up to 2 litres and laptops can stay in your bag. In Terminal 2, liquids must be in containers of 100 ml or less, in one clear bag about 20 cm by 20 cm, and you take that bag and any laptop out for screening.

**Can I take medicine through security?**
Yes. Essential medicines, including liquids above the normal limit, are allowed. Carry them in their original packaging with a copy of your prescription or a letter from your doctor, and tell the security officer before your bag goes through.

**Can I book Fast Track security?**
Yes. Fast Track costs £7 per person when booked online at least 24 hours ahead, or £8 at the entrance on the day. It is free for anyone booked with special assistance and up to two companions.

### baggage

**How big can my cabin bag be?**
It depends on your airline and your ticket. Check the cabin and hold allowances table on our baggage page, then confirm with your airline before you pack.

**My bag did not arrive. What should I do?**
Go to your airline's baggage desk in the arrivals hall before you leave the building. Take your boarding pass and baggage tag. The airline will give you a reference number and deliver the bag once it is found.

**I left something on the plane. Who do I contact?**
Contact your airline. Items found on aircraft belong to the airline's lost property process, not ours.

**I left something in the terminal or a car park. How do I get it back?**
Report it to our lost property office using the form on our baggage and lost property page. We keep found items for 30 days and will contact you if we find a match.

### parking

**Can I change or cancel my parking booking?**
Yes. You can cancel free of charge up to 24 hours before your arrival time. You can change your dates at any time before you arrive. If the new price is higher, you pay the difference.

**What happens if my flight is delayed and I get back late?**
We do not charge for the first 2 hours past your booked return time. After that, extra time is charged at the drive-up daily rate for that car park.

**Is there parking for Blue Badge holders?**
Yes. Every car park has Blue Badge bays, and the closest are in P1 Short-stay, next to the covered walkway. You pay the normal rate. Mid-Stay shuttle buses have a ramp and space for a wheelchair.

**Can I charge an electric car while I am away?**
Yes. There are 6 charging bays in P1 Short-stay, 40 in P2 Long-stay and 120 in Mid-Stay. Charging costs 45p per kWh, paid at the charger by card.

### assistance

**How do I book special assistance?**
Tell your airline at least 48 hours before you fly. You can also use the request form on our special assistance page. Either way, we receive your request and plan your help from the moment you arrive.

**What is the sunflower lanyard for?**
It lets our staff know, quietly, that you have a disability that may not be obvious. We will offer more time, clear directions and help if you want it. Lanyards are free from any assistance desk.

**Can I use my own wheelchair to the gate?**
Yes. You can stay in your own wheelchair until the aircraft door, where the airline loads it into the hold. If it is powered, tell your airline the battery type when you book.

**Is there a quieter way through the airport?**
Yes. Both terminals have an assistance lane at security, which is calmer and never rushed, and a free Quiet Room after security. Ask at any assistance desk and we will walk the route with you.

## Roles

Entity: Role. Shown on `/about/careers.html`. All roles are fictional and not open for applications.

### Airside Operations Officer

- team: Operations
- closing date: 30 October 2026
- hours: Full time, rotating shifts including nights and weekends
- salary: £31,400 a year plus shift allowance
- summary: Keep the aircraft stands, taxiways and runway safe and clear. You will carry out daily inspections, manage wildlife and foreign object checks, and work with air traffic control and airline ground teams.

### Passenger Assistance Agent

- team: Passenger Services
- closing date: 13 November 2026
- hours: Full time or part time, early and late shifts
- salary: £24,800 a year, pro rata for part time
- summary: Help passengers with a disability or reduced mobility from the kerb to their seat and back again. Full training is given. What matters most is patience and good judgement.

### Electrical Engineer, Airfield Lighting

- team: Engineering
- closing date: 27 November 2026
- hours: Full time, Monday to Friday, with an on-call rota
- salary: £44,500 a year
- summary: Maintain and improve the runway, taxiway and approach lighting. You will hold an electrical qualification at level 3 or above and be comfortable working outside at night.

## Releases

Entity: Release. Shown on `/about/media-centre.html`, newest first.

### 1 October 2026: New security scanners open in Terminal 1

- summary: All six security lanes in Terminal 1 now use new scanners. Passengers can leave liquids in containers up to 2 litres, and laptops, in their bags. Average waits in the first week fell from 14 minutes to 8. Terminal 2 is next, with new lanes due by spring 2027.

### 15 September 2026: 120 electric vehicle charging bays open at Mid-Stay

- summary: The Mid-Stay car park now has 120 charging bays, bringing the airport total to 166. Drivers can book a charging bay with their parking and pay at the charger. Power comes from the airport's renewable electricity supply.

### 27 August 2026: Kestrel adds Innsbruck for the winter season

- summary: Kestrel will fly twice a week from Terminal 2 to Innsbruck between 19 December 2026 and 3 April 2027. The route joins its year-round flights to Geneva, Salzburg and Zurich, and is timed for Saturday and Wednesday ski changeovers.
