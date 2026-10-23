# Row link

Derives from: static/getting-here/index.html, `a.row-link` ("By train", "By car or taxi", "By bus or coach"); same rows on static/index.html.

Governing rule: spec §7.2.

Props and slots: | `icon` train/car/bus | `title` | `meta` | `href` |

Notes: Renders the `<li>` wrapper plus the anchor so a bare ruled-list slot stays valid. row-link.css copied from static/assets/css/components/row-link.css unchanged. Icon paths are the three static SVGs.

Known deviations: icon is an enum of the three icons that exist in static.
