---
name: new-component
description: Use when adding or changing a Meridian component, a Canvas code component in next/components, or when asked to "build the X component", "add a prop", "add a slot" or "change how X renders". Covers component.yml, index.tsx, stylesheet ownership, behaviours, registering with Canvas and the checks.
---

# New or changed component

Read `docs/components.md`, `docs/design/spec.md` and the class catalogue in `docs/design/system.md` first. Never write a comment in any file.

## Steps

1. Derive. Name the homepage element or spec rule the component comes from (spec §3 to §8). If an existing component already renders the element, change that one instead. If the design docs do not settle it, stop and report.
2. Write `next/components/<name>/`:
   - `component.yml`: `name`, `machineName` equal to the directory, `status: true`, `required`, `props.properties`, `slots`. camelCase names. Every prop has a `title` naming the text where it sits on the page, and `examples` with real copy.
   - `index.tsx`: default export. Props and slots are React props of the same names; slots are `ReactNode`. Classes from the module (`styles.title`), global utilities as plain strings; adjacent text as one template string; `{' '}` for spaces between inline elements; formatted text through `dangerouslySetInnerHTML` on its own element.
   - `index.module.css`: the component's rules with camelCase local names (`.root`, `.title`), imported with `import styles from './index.module.css';`. Tokens only, no new hex. Classes another component owns: import its module (`import card from '@/components/card/index.module.css';`), never copy rules.
   - A behaviour: add the `enhance*` function to `next/lib/behaviours.js`, start the component with `'use client';`, attach with `const ref = useEnhance<HTMLElement>(enhanceX);` on the root. The behaviour finds elements through `data-*` hooks and records state in data attributes, never classes. The page must work without it.
3. Check: `cd next && npm run check && npm run test:e2e` (the dev server must be running).
4. Register: with `npm run dev` running, reload any page in the Canvas editor. Confirm the component appears in the library with its props.
5. Look: place it on a draft page, check it in Chrome at 1440 and 390 with the network tab filtered to errors, and against the spec. Discard the draft unless it is wanted.
6. Changed or removed prop names leave old keys in stored content. Update the affected pages in the editor, then re-export the content recipe if the pages ship with the code (README, How a change flows).

## Report

Components written or changed, the derivation for each, `npm run check` output, what was seen in the editor and in Chrome.
