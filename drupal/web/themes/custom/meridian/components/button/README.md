# Button

Derives from: static/assets/css/components/button.css, used by every form and the package CTA.

Governing rule: spec §8.

Props and slots: | `label` | `href` | `variant` primary/secondary | `block` | `large` |

Notes: button.css copied unchanged. Created here because no other component owned it. Form and package emit the static `.button` markup inline and depend on this component's library for the CSS. Contains `.button:active { transform: translateY(1px) }` from static, which the grep battery flags (the rule is a press state, not a hover).

Known deviations: `.button:active` translateY kept verbatim.
