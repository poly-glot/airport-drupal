# Terminal map

Derives from: static/at-the-airport/index.html, `#maps`, the two `svg.map` inside `div.card`.

Governing rule: code-owned (brief: functionality, not content).

Props and slots: | `terminal` terminal-1/terminal-2 |

Notes: Each SVG is copied verbatim into maps/<terminal>.twig and included by the enum. The `div.card` wrapper is part of the component so the static DOM (`div.card > svg.map`) is reproduced and the split layout sees two children. terminal-map can render without map-pane, so terminal-map.css carries the shared selectors it uses from map.css (`.map`, `.map__ground`, `.map__zone`, `.map__zone--sand`, `.map__gate`, `.map__link`, `.map__security`, `.map__chip*`, `.map__label`), copied unchanged, plus the `.card` rule from card.css. No `.map-pane`, `.getting-here` or overlay rules.

Known deviations: none; selectors are intentionally duplicated with map-pane because Drupal attaches CSS per rendered component.
