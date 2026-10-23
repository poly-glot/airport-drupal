# Form

Derives from: static/index.html (hero `form.search-card`, `form.photo-band__form`), static/parking/index.html `#quote`, static/flights/alerts.html `#set-up-alerts`, static/help/special-assistance.html `#request`, static/help/index.html `#feedback`, static/help/baggage-and-lost-property.html `#report-lost-item`.

Governing rule: spec §8.

Props and slots: | `kind` flight-search/parking/alerts/assistance/feedback/lost-property | `compact` bool (parking only: true = homepage variant) |

Notes: One partial per kind in partials/<kind>.twig, included by form.twig; markup is the static `<form>` verbatim with `{{ attributes }}` added to the form tag. The homepage and parking page parking forms differ in id, heading level, required markers, demonstration note, input ids and the submit wrapper; `compact` selects the homepage copy, otherwise the inner-page copy. form.css is card.css (the `.card*` rules the forms use) followed by form.css, both unchanged. `.search-card` rules live in hero.css and are present because the flight-search form only appears in the hero. Buttons: `core/components.meridian--button` dependency.

Known deviations: plan enum (flight-search, parking, assistance, alerts, contact, careers) changed to flight-search, parking, alerts, assistance, feedback, lost-property: static has no careers form, `contact` is the help-page feedback form, and baggage page has a lost-property form.
