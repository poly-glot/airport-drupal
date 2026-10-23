# UI labels

Use these strings verbatim. Error messages follow one pattern: say what went wrong and how to fix it, in one sentence, without blame. The static site relies on native `required`/`type` validation; the error strings and confirmations below are for the CMS port, which validates on the server.

## Global

| Key | Text |
|---|---|
| skip link | Skip to main content |
| main nav label | Main |
| breadcrumb label | Breadcrumb |
| breadcrumb home | Home |
| logo link | Meridian Airport home |
| menu open | Open menu |
| menu close | Close menu |
| language button | EN |
| language button hidden text | Language: English |
| search button | Search the site |
| basket link | Basket, 0 items |
| primary header button | Book parking |
| back to top | Back to top |
| opens in new tab (hidden) | (opens in a new tab) |
| external link (hidden) | (external site) |
| fictional form note | This is a demonstration form for a fictional airport. Please do not enter real personal details. Nothing you type is sent anywhere. |
| required marker | (required) |
| optional marker | (optional) |

## Buttons and links

| Key | Text |
|---|---|
| search | Search |
| search flights | Search flights |
| check parking prices | Check prices and availability |
| book parking | Book parking |
| compare car parks | Compare all car parks and the map |
| meet arrivals | Meeting someone? Go to live arrivals |
| set up alerts | Set up alerts |
| send feedback | Send feedback |
| send request | Send request |
| report lost item | Report lost item |
| subscribe | Sign up for alerts |
| clear filters | Clear filters |
| show results | Show flights |
| read guide | Read the guide |
| all departures | All departures |
| all arrivals | All arrivals |
| all services | All passenger services |
| all destinations | All destinations |
| all destinations (homepage) | View all 112 destinations |
| terminal maps | Terminal maps |
| check my flight | Check my flight |
| read more | Read more |
| view role | View role |
| read release | Read release |
| previous notice | Previous notice |
| next notice | Next notice |
| notice counter | {n} of {total} |
| notice action prefix | What to do: |
| previous destinations | Previous destinations |
| next destinations | Next destinations |
| destinations counter | {first} – {last} / {total} (for example "1 – 3 / 4") |
| zoom in (decorative map) | Zoom in |
| zoom out (decorative map) | Zoom out |

## Flight board

| Key | Text |
|---|---|
| board label | Flight board |
| direction group label | Flight direction |
| tab departures | Departures |
| tab arrivals | Arrivals |
| column time | Time |
| column flight | Flight |
| column to | To |
| column from | From |
| column airline | Airline |
| column terminal | Terminal |
| column gate (departures) | Gate |
| column bags (arrivals) | Bags |
| column status | Status |
| gate not yet shown | — |
| meta line | Updated 09:42 · refreshes every minute · gates shown from 60 min before departure |
| clock caption | Local time |
| board search label (hidden) | Search the board by flight number, airline or city |
| board search placeholder | Search {departures/arrivals} by flight or city |
| board no matches | No flights match "{query}" on the {departures/arrivals} board. Try the flight number (e.g. MA 204) or the city. |
| legend | On time / landed; Boarding / gate open; Delayed; Cancelled |
| no results (Find your flight form) | No flights match your search. Check the spelling, or try the flight number on your booking. |
| results count | Showing {n} flights |

## Status words

Status is always dot plus word. Never colour alone.

| Status | Tone token | Meaning (for help text and screen-reader context) |
|---|---|---|
| On time | `--ok` | Running to schedule |
| Landed | `--ok` | On the ground |
| Boarding | `--brand` | Go to the gate now |
| Gate open | `--brand` | Make your way to the gate |
| Expected | `--neutral-dot` | Due at the time shown |
| Delayed | `--warn` | Later than scheduled; check again soon |
| Cancelled | `--bad` | Will not fly; contact your airline |

On the dark board the status word takes the dark-band colour (`--ok-dark`, white, `--warn-dark`, `--bad-dark`, `--board-muted`) and the legend groups them as above.

Security wait panel values: "8 min" (Terminal 1), "22 min" (Terminal 2), "Running normally" (Roads and rail). Other road and rail values, if needed: "Minor delays", "Severe delays", "Line closed". Hero weather: "12°C light rain".

## Form labels, hints and errors

### Flight search

| Field | Label | Hint | Error (empty) | Error (invalid) |
|---|---|---|---|---|
| query | Flight number, airline or city | placeholder: e.g. MA 204 or Lisbon | Enter a flight number, airline or city | Enter a flight number in the right format, like MA 204 |
| direction | Direction | Departures; Arrivals | | |
| when | When | Today, 3 October; Tomorrow, 4 October; Monday, 5 October | | |

### Parking quote

| Field | Label | Hint | Error (empty) | Error (invalid) |
|---|---|---|---|---|
| car park | Car park | | Choose a car park | |
| arrive date | Arrive | | Enter the date you arrive at the car park | Enter a date that is today or later |
| return date | Return | | Enter the date you return | The return date must be after the arrival date |

Car park options (radio rows: name, detail, price): P1 Short-stay · 2 min walk · pick-up and drop-off · from £4 / hr; P2 Long-stay · 5 min walk · covered · from £8.50 / day (checked); Mid-Stay · 8 min shuttle · 10 min free wait · from £12 / day.

Form note: No payment until you confirm. Free cancellation up to 24 hours before arrival.

### Flight alerts sign-up

| Field | Label | Hint | Error (empty) | Error (invalid) |
|---|---|---|---|---|
| flight | Flight number | For example, MA 204. It is on your booking confirmation. | Enter your flight number | Enter a flight number in the right format, like MA 204 |
| date | Date of flight | | Enter the date of your flight | Enter a date in the next 60 days |
| channel | How should we send alerts? | Choose one | Choose how you want to receive alerts | |
| mobile | Mobile number | A UK or international number, starting with 0 or + | Enter your mobile number | Enter a mobile number, like 07700 900123 |
| email | Email address (optional) | We send a copy of each alert here too | | Enter an email address in the right format, like name@example.com |
| which | Which alerts do you want? | Choose all that apply | Choose at least one alert | |
| consent | I agree to receive alerts about this flight | Alerts stop 2 hours after the flight lands or departs | Tick the box to agree to receive alerts | |

Channel options: Text message; WhatsApp.
Alert options: Gate changes; Delays and cancellations; Boarding calls; Bags on the belt (arrivals only).

### Special assistance request

| Field | Label | Hint | Error (empty) | Error (invalid) |
|---|---|---|---|---|
| name | Full name | As it appears on your booking | Enter your full name | |
| email | Email address | We send your confirmation here | Enter your email address | Enter an email address in the right format, like name@example.com |
| phone | Phone number (optional) | So we can reach you on the day | | Enter a phone number, like 0121 496 0123 |
| flight | Flight number | For example, MA 204 | Enter your flight number | Enter a flight number in the right format, like MA 204 |
| date | Date of flight | Requests need at least 48 hours' notice | Enter the date of your flight | The date must be at least 48 hours from now |
| journey | Help needed for | Choose one | Choose which part of your journey you need help with | |
| help | What help would you like? | Choose all that apply | Choose at least one type of help | |
| wheelchair | Are you bringing your own wheelchair or mobility aid? | | Choose yes or no | |
| notes | Anything else we should know? (optional) | For example, an assistance dog or a medical device | | Notes must be 1,000 characters or fewer |

Journey options: Departure; Arrival; Both.
Help options: Wheelchair to the aircraft; Help walking longer distances; Help through security; Help for a hidden disability; Help with sight loss; Help with hearing loss.
Wheelchair options: Yes; No.

### Lost property report

| Field | Label | Hint | Error (empty) | Error (invalid) |
|---|---|---|---|---|
| name | Full name | | Enter your full name | |
| email | Email address | We contact you here if we find a match | Enter your email address | Enter an email address in the right format, like name@example.com |
| date | Date you lost it | | Enter the date you lost the item | The date must be in the last 30 days |
| terminal | Where were you? | | Choose where you lost the item | |
| place | Where exactly? (optional) | For example, security lane 3 or the Skyline Kitchen | | |
| item | What did you lose? | Colour, brand, size and anything inside | Describe the item | Description must be 1,000 characters or fewer |
| flight | Flight number (optional) | If you were flying that day | | Enter a flight number in the right format, like MA 204 |

Where options: Terminal 1 before security; Terminal 1 after security; Terminal 2 before security; Terminal 2 after security; A car park or shuttle bus; Railway station; Not sure.

### Feedback

| Field | Label | Hint | Error (empty) | Error (invalid) |
|---|---|---|---|---|
| name | Your name (optional) | | | |
| email | Email address (optional) | Only if you would like a reply | | Enter an email address in the right format, like name@example.com |
| topic | What is it about? | | Choose a topic | |
| terminal | Which terminal? | | Choose a terminal | |
| date | Date of your visit (optional) | | | Enter a date in the past |
| message | Your feedback | Tell us what happened and what we could do better | Enter your feedback | Feedback must be 2,000 characters or fewer |

Topic options: Security; Parking; Shops and restaurants; Cleanliness; Special assistance; Getting here; Something else.
Terminal options: Terminal 1; Terminal 2; Both; Not sure.

### Error summary and confirmation

| Key | Text |
|---|---|
| error summary heading | There is a problem |
| error prefix (hidden) | Error: |
| quote confirmation heading | Your quote |
| alerts confirmation heading | Alerts set up |
| alerts confirmation body | This is a demonstration, so no alerts will be sent. On a real airport site, you would get a test message within a minute. |
| assistance confirmation heading | Request received |
| assistance confirmation body | This is a demonstration, so no request has been sent. On a real airport site, you would get a confirmation email within 1 working day. |
| lost property confirmation heading | Report received |
| lost property confirmation body | This is a demonstration, so no report has been sent. On a real airport site, we would email you if we found a match within 30 days. |
| feedback confirmation heading | Thank you for your feedback |
| feedback confirmation body | This is a demonstration, so nothing has been sent. On a real airport site, we would reply within 5 working days if you left an email address. |

## Destination cards

| Key | Text |
|---|---|
| meta pattern | {city} · from {flightTime} |
| city card meta pattern (homepage) | from £{priceFrom} · {duration} · {frequency} |
| guide link | Read the guide |
| guide link hidden | : {title} |

## Footer

| Key | Text |
|---|---|
| enquiries line | Open 24 hours. Passenger enquiries 0121 496 0123, every day 05:00–23:00. Live chat in the app. |
| social labels | Instagram; X; YouTube; LinkedIn |
| footer nav labels | Flights; Shop & relax; Plan; Company |
| legal line | © 2026 Meridian Airport Ltd. A fictional airport. |
| legal links | Accessibility; Privacy; Cookies; Terms; Site map |
