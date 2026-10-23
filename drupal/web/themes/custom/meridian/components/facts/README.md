# Facts

- Static source: `static/flights/index.html` (`dl.facts.facts--legend`, lines 192 and 202, the status legend). Plain `dl.facts` in `static/flights/airlines.html` (inside the airline cards) and in the at-the-airport and careers pages.
- Element: `dl.facts`, with `facts--legend` for the variant.
- Spec: §7.4 (facts, uppercase terms).
- CSS: `facts.css` split from `content.css` (`.facts`, `.facts--legend*` and the 600px legend media rule). `.facts__item`, `.facts__term`, `.facts__value` are in `fact/fact.css`.

| Prop | Type | Notes |
|---|---|---|
| `variant` | enum `default`, `legend` | `legend` adds `facts--legend` |

| Slot | Contents |
|---|---|
| `items` | `fact` leaves |

The legend terms in static contain `span.status` markup. The `status` component (already present as `components/status`) styles those spans; this component does not copy the `.status` rules.

Deviations: none.
