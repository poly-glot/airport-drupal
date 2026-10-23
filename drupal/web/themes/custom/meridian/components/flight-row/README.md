# flight-row

Derives from `<tr class="board__row">` in `static/index.html` and `static/flights/index.html` (for example the "Lisbon / MA 204" row). Styles live in `flight-board.css`.

| Prop | Notes |
|---|---|
| `time`, `place`, `flight`, `terminal` | the four flap cells (widths 5, 9, 7, 2) |
| `gate` | gate on departures, belt on arrivals; an em dash when not shown yet |
| `gate_label` | `data-flap-label` for the em dash gate ("Not shown yet") |
| `status` | enum `on-time`, `boarding`, `gate-open`, `delayed`, `cancelled`, `landed`, `expected`; the word and the tone (lamp colour and `board__state--*`) come from it: ok, info, info, warn, bad, ok, neutral |
| `note` | the Info column |
| `tip`, `tip_id` | optional `data-tip` and `aria-describedby` (flights page rows only; home page rows have neither) |

Deviation: the brief listed `airline_code` and `airline_name`; the static board has no airline column, so they are not props. Delayed rows carry a different `tip_id` on departures (`status-delayed-departure`) and arrivals (`status-delayed-arrival`).
