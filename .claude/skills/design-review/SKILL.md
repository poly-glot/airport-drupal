---
name: design-review
description: Use to review components or pages for compliance with docs/design/spec.md - the grep battery, radius and elevation law, hover grammar, type roles, derivation citations and the slop tells in its section 4. Triggers on "review this component", "check the design", "is this slop", before any component batch is reported done.
---

# Design review

Read `docs/components.md`, `docs/design/spec.md` and `docs/status.md` first. A review is read-only: report fixes with file and line, do not make them unless asked. Never write a comment in any file.

## 1. Grep battery

Run the block in `CLAUDE.md` from the repo root. Anything printed is a defect, except a hex copied from a static CSS file that is already there (verify with `grep -n '<hex>' static/assets/css/components/*.css`). Add these review-only probes; each hit is a candidate, judge it against the spec:

```bash
T=drupal/web/themes/custom/meridian/components
grep -rnE 'border-radius' $T --include=*.css
grep -rnE 'border-(left|inline-start)' $T --include=*.css
grep -rnE 'transition[^;]*(shadow|transform)|:hover[^{]*\{[^}]*(transform|shadow)' $T --include=*.css
grep -rnE 'linear-gradient|radial-gradient' $T --include=*.css
grep -rnE ' style="' $T --include=*.twig
grep -rnP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' $T
```

## 2. Spec checks

- Elevation (§3): page plane has zero radius, zero shadow. Shadow only in hero, map-pane overlay, site-header menu sheet. Gradients only on photo and tower overlays.
- Radii (§4): each `border-radius` value is on the list for that element (0 content, 2 legend and status squares, 6 inputs and ghost buttons, 8 primary buttons and floating parking card and map card, 10 large buttons and wait chips, 12 top tabs, 14 hero floats, 50% dots).
- Hover (§5): colour, background or underline only; photography `scale(1.04)` inside a flush frame, disabled under `prefers-reduced-motion`. Focus: 2px outline, white inside `.on-dark`.
- Type (§2): serif for display only, Plus Jakarta Sans for component titles, Public Sans body, `tabular-nums` on times, prices and counters.
- Colour (§6): tokens only; status is dot or square plus a word; sand only for callouts and map accents.
- Inner-page vocabulary (§7): the component chosen is the highest in the order of preference that fits. A rounded shadowed card in the page plane is never right.
- Forms (§8): 48 to 50px inputs, `--line-input` border, radius 6, flat block max-width 720.
- Imagery (§9): no rounded photo corners in the page plane; hero text assets pass `scripts/hero_contrast.py`.
- Rhythm (§10): one h1 per page.

## 3. Derivation and structure

- Each component README names the static file and element and the governing spec rule. "Carried from v1" fails.
- Directory holds only the five permitted files; Twig keeps every static class, `aria-*`, `id`, `hidden`, `data-*`; root has `{{ attributes }}`.
- component.yml: every prop has `title` and `examples`; no `array` or `object` props; groups are the four named groups.
- JS and CSS are generated: `python3 scripts/sync_static.py --check` prints `theme css and js match static`.
- No comments in any file, no editorial text in Twig.

## 4. Slop tells (docs/design/spec.md)

box-shadow outside floating-overlay files; border-radius on content blocks or media; `translateY` or shadow transitions in hovers; left-border accents; generic `.card` carried over without a homepage derivation; boxed forms where the spec says flat block; gradient washes on plain bands.

## Report

Per component: pass, or the defects with file:line, the rule broken (spec section), and the minimal fix. Finish with an overall verdict.
