---
name: design-review
description: Use to review components or pages for compliance with docs/design/spec.md - the grep battery, radius and elevation law, hover grammar, type roles, derivation citations and the slop tells in its section 4. Triggers on "review this component", "check the design", "is this slop", before any component batch is reported done.
---

# Design review

Read `docs/components.md`, `docs/design/spec.md` and `docs/status.md` first. A review is read-only: report fixes with file and line, do not make them unless asked. Never write a comment in any file.

## 1. Probes

Run `cd next && npm run check` first; anything it prints is a defect. Then these review probes from the repo root; each hit is a candidate, judge it against the spec:

```bash
T=next/components
grep -rnE '#[0-9a-fA-F]{3,8}\b' $T --include=*.css --include=*.tsx
grep -rnE 'border-radius' $T --include=*.css
grep -rnE 'border-(left|inline-start)' $T --include=*.css
grep -rnE 'transition[^;]*(shadow|transform)|:hover[^{]*\{[^}]*(transform|shadow)' $T --include=*.css
grep -rnE 'linear-gradient|radial-gradient' $T --include=*.css
grep -rnE 'style=\{' $T --include=*.tsx
grep -rnE '//|/\*' $T next/lib next/app
grep -rnP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' $T
```

A hex is allowed only in `next/styles/tokens.css` and the eight board palette variables at the top of `next/components/flight-board/index.module.css`, which the original board stylesheet defined.

## 2. Spec checks

- Elevation (§3): page plane has zero radius, zero shadow. Shadow only in hero, map-pane overlay, site-header menu sheet. Gradients only on photo and tower overlays.
- Radii (§4): each `border-radius` value is on the list for that element (0 content, 2 legend and status squares, 6 inputs and ghost buttons, 8 primary buttons and floating parking card and map card, 10 large buttons and wait chips, 12 top tabs, 14 hero floats, 50% dots).
- Hover (§5): colour, background or underline only; photography `scale(1.04)` inside a flush frame, disabled under `prefers-reduced-motion`. Focus: 2px outline, white inside `.on-dark`.
- Type (§2): serif for display only, Plus Jakarta Sans for component titles, Public Sans body, `tabular-nums` on times, prices and counters.
- Colour (§6): tokens only; status is dot or square plus a word; sand only for callouts and map accents.
- Inner-page vocabulary (§7): the component chosen is the highest in the order of preference that fits. A rounded shadowed card in the page plane is never right.
- Forms (§8): 48 to 50px inputs, `--line-input` border, radius 6, flat block max-width 720.
- Imagery (§9): no rounded photo corners in the page plane; hero text assets pass `.venv/bin/python scripts/hero_contrast.py`.
- Rhythm (§10): one h1 per page.

## 3. Derivation and structure

- The component's derivation is stated (homepage element or spec rule). "It was in v1" fails.
- Directory holds `component.yml`, `index.tsx` and `index.module.css` (plus `partials/` or `maps/` where one component renders fixed variants). Module classes are camelCase; only the utilities and the button, text-link and status families are global. `aria-*`, `id`, `hidden` and the `data-*` hooks the behaviours read are present.
- component.yml: camelCase names, every prop has `title` and `examples`; no `array` or `object` props.
- Another component's classes come from importing its module, not copied rules.
- No comments in any file, no editorial text in components.

## 4. Slop tells (docs/design/spec.md)

box-shadow outside floating-overlay files; border-radius on content blocks or media; `translateY` or shadow transitions in hovers; left-border accents; generic `.card` carried over without a homepage derivation; boxed forms where the spec says flat block; gradient washes on plain bands.

## Report

Per component: pass, or the defects with file:line, the rule broken (spec section), and the minimal fix. Finish with an overall verdict.
