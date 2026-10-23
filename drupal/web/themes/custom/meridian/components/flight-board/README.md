# flight-board

Derives from `static/index.html` (`<section class="board board--overlapped tabs on-dark" id="live-flights">`, spec §2.1.5 in `docs/brief.md`) and `static/flights/index.html` (`<section class="board tabs on-dark" id="live-flights">` titled "Departures and arrivals"). Governed by the dark board rules in `docs/design/spec.md`.

The folder-tab grammar (`static/assets/css/components/tabs.css`, `enhanceTabs`) is used only by this board in `static/`, so there is no separate `tabs` component: `tabs.css` is copied here verbatim and attached through `libraryOverrides.css`, ahead of `flight-board.css` as in `static/assets/css/site.css`.

| Prop | Notes |
|---|---|
| `title`, `title_id` | heading text and its id; `aria-labelledby` points at `title_id` (`live-flights-title` on the home page, `board-title` on the flights page) |
| `meta` | text after "Updated hh:mm · "; the time is `clock_time` inside `.board__updated` |
| `clock_time` | the big clock, also the "Updated" time |
| `overlapped` | adds `board--overlapped` (home page only) |
| `show_search` | renders the two `.board__search` blocks |
| `departures_search_label`, `arrivals_search_label` | visually hidden labels; they differ between the two static pages |
| `departures_caption`, `arrivals_caption` | table captions; `enhanceBoardSearch` reads them for its messages, and they differ between pages |
| `all_departures_label/href`, `all_arrivals_label/href` | ghost buttons in each panel foot; omit the label to hide the button (flights page has none) |

Slots: `departures`, `arrivals`, each filled with `flight-row` leaves (they render `<tr>` inside the `<tbody>`).

JS: `flight-board.js` holds `enhanceTabs`, `enhanceBoardSearch`, `enhanceStatusTips` and the whole split-flap engine from `static/assets/js/site.js` lines 88 to 493, bodies unchanged apart from taking `TAB_KEY_OFFSETS`, `wrapIndex`, `normalise`, `reducedMotion` and `wait` from `Meridian`. `BOARD_EVENTS` is fetched once from `GET /api/board.json` (module `meridian_flights`); a failed fetch schedules nothing. `applyState` looks up `#status-<state>` in the document for the tip text, so the tip only changes where the flights page legend exists.

Deviations from `docs/drupal-canvas.md` §4: props `title_id`, the four captions and labels, and per-panel ghost button props were added because the two static instances differ there.
