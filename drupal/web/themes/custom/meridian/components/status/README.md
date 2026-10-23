# status

Derives from `<span class="status status--info"><span class="status__dot"></span>Gate open</span>` in the "What the status means" legend of `static/flights/index.html`. The rules are lines 219 to 266 of `static/assets/css/components/content.css`, moved unchanged into `status.css`.

| Prop | Notes |
|---|---|
| `word` | the status word |
| `tone` | enum `ok` (default, no modifier class), `info`, `neutral`, `warn`, `bad` |

The board rows do not use this component: their markup is `.board__state` and `.board__swatch`, styled by `flight-board.css`.
