# Lessons

## 2026-10-24: follow the platform's standard workflow, not a bespoke pipeline

- Correction: "the whole static frontend and visual diff is not how drupal developers work, align with standard development workflow".
- Pattern: a hand-built contract (static site, generated theme files, generated seed, custom parity scripts) was treated as the workflow, and every spike was judged by whether it kept that pipeline alive.
- Rule: before building process around a platform, name the platform's own way to do each job (components, content, config, checks) and use it: code components in the frontend codebase, `drush content:export` into a recipe, `drush cex` into `config/sync`, lint, type-check and build in CI. A bespoke pipeline needs the user's explicit choice.
- Rule: a migration check is evidence, not a workflow. Run it once, record the printed result in `docs/status.md`, then delete the tooling with the thing it compared against.
