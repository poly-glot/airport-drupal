---
path: /flights/index.html
title: "Live flights — Meridian Airport"
description: "Today's departures and arrivals at Meridian Airport, with terminal, gate, bags belt and status for every flight. Search by flight number or city."
h1: "Live flights"
intro: "Today's departures and arrivals, with the terminal, gate and latest status for every flight."
---

Board card title (h2, must differ from the page h1): Departures and arrivals

- Meta line: Updated 09:42 · refreshes every minute · gates shown from 60 min before departure
- Clock: 09:42, caption "Local time"
- Board search label (visually hidden): Search the board by flight number or city
- Board search placeholder: Search departures by flight or city (arrivals tab: Search arrivals by flight or city)
- No-matches row: No flights match "{query}" on the departures board. Try the flight number (e.g. MA 204) or the city. (arrivals tab: "on the arrivals board")
- Legend: On time / landed | Boarding / gate open | Delayed | Cancelled

The board search filters the rows as you type and needs JavaScript. Without it, use the "Find your flight" form above.

## Departures

- Anchor: `#departures`
- Tab label: Departures
- Table caption (visually hidden): Departures from Meridian Airport today
- Columns: Time | To | Flight | Terminal | Gate | Status | Info
- Rows: all 12 rows in `data.md` `## Departures`, with the note in the Info column

## Arrivals

- Anchor: `#arrivals`
- Tab label: Arrivals
- Table caption (visually hidden): Arrivals at Meridian Airport today
- Columns: Time | From | Flight | Terminal | Belt | Status | Info
- Rows: all 12 rows in `data.md` `## Arrivals`, with the note in the Info column

## Reading the board

### Gate

Your gate number appears 60 minutes before departure. Until then the gate tiles are blank, and the Info column tells you when to look again, for example "Gate at 10:10". Gates 1 to 19 are in Terminal 1 and gates 20 to 38 are in Terminal 2.

### Belt

Once a flight has landed, the Belt column shows the reclaim belt for its bags, for example 3. Belts 1 to 4 are in Terminal 1 and belts 5 to 8 are in Terminal 2. The Info column tells you which arrivals exit to wait at: Arrivals A in Terminal 1, Arrivals B in Terminal 2.

### Info

The Info column tells you what to do next. For example:

- Closes 10:20: the gate closes at this time. Be there before it.
- New time 10:58 · fog: the flight is delayed to the new time, and why.
- Gate at 10:10: the gate will show at this time.
- Rebook at desk 14 or in app: the flight is cancelled. Your airline will rebook you at that desk or in its app.
- Exit: Arrivals A: meet your passenger at this exit.
- Expected 10:40: the delayed flight is now due at this time.

## What the status means

### Departures

- Gate open: make your way to the gate. It can take up to 15 minutes to walk to the furthest gates in Terminal 2.
- Boarding: go to the gate now.
- Delayed: the new time will appear here as soon as your airline confirms it. Stay close to a screen.
- Cancelled: your airline will contact you about a new flight or a refund. Do not go through security.

### Arrivals

- Expected: due at the time shown.
- Landed: on the ground. Allow about 30 minutes for passengers to clear passport control and collect bags.
- Delayed: we update the time as soon as the airline tells us.

## Meeting someone off a flight

Arrivals halls are on the ground floor of both terminals. The Copper Kettle in Terminal 1 and Northlight Coffee in Terminal 2 both look out over the arrivals doors. P1 Short-stay is the closest car park for a quick pick-up, or use the free 10-minute zone at Mid-Stay and meet your passenger off the shuttle.

Link: Parking and pick-up -> /parking/index.html

## Get updates on your phone

Set up free alerts for gate changes, delays and boarding calls by text or WhatsApp.

Link: Set up alerts -> /flights/alerts.html

## About this board

Flight times and statuses come from the airlines. If your airline tells you something different, follow your airline. This is a demonstration site, so the board plays a short, scripted set of changes when the page opens and does not show real flights.
