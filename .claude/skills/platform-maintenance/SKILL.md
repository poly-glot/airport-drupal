---
name: platform-maintenance
description: Use to upgrade Drupal core or Canvas, rebuild the drupal-base image tag, update config, or roll back a bad upgrade on the Meridian Drupal site. Triggers on "upgrade Drupal", "update Canvas", "composer update", "new base image", "roll back".
---

# Platform maintenance

Plan: `docs/drupal-canvas.md` §2 and §6. ddev commands and the local stack: `docs/canvas-reference.md` section 7; OAuth client and keys: section 4. Never write a comment in any file (Dockerfile and YAML included). Nothing secret is rotated here: tokens, DB credentials and service accounts are not touched, printed or committed.

## Upgrade core and Canvas

Work on a branch, from `drupal/`:

1. Baseline first: `ddev drush cr`, run the parity-check skill on the whole site and keep the result. Take a DB dump: `ddev export-db --file=/tmp/pre-upgrade.sql.gz` (outside the repo).
2. Read the release notes for the target Drupal core and Canvas versions. Canvas minors can change the page and page-template JSON the HTTP API accepts (canvas-reference sections 2a and 2c) and the scope list (section 4); note any change to either.
3. `ddev composer update "drupal/core-*" drupal/canvas drush/drush --with-all-dependencies`. For a major or minor core jump use `ddev composer require` with the exact constraint instead. Commit nothing yet.
4. `ddev drush updb -y`, `ddev drush cr`.
5. Export config: `ddev drush cex -y`. Review `git diff drupal/config/sync` and keep only changes the upgrade explains; unexplained config drift is reported, not committed.
6. Test: `cd next && npm run check && npm run build`, reload the Canvas editor (all 48 `js.*` components still registered and active), and walk the pages in Chrome at 1440 and 390 with the network tab filtered to errors. A Canvas or SDK upgrade can change the content API shape: compare one page's `/canvas/content-api` response before and after.
7. Parity must equal the baseline (clean). A new diff caused by Canvas output is fixed in the component, or recorded as a narrow allow-list per the parity-check skill.

## Rebuild the base image tag

The platform image is `drupal-base`, tagged `<drupal-version>-r<N>` (for example `11.2.5-r3`); clients own only modules, recipes and config (plan §2). Bump `N` for any change to PHP, extensions, FrankenPHP, drush, Canvas or the GCS stream wrapper without a core change; reset `N` to 1 on a core version change. Update the `FROM drupal-base:<tag>` line in `drupal/Dockerfile` in the same change as the new tag, rebuild, and repeat step 6 against the built image. Tags are never reused or moved.

## Roll back

- Not yet deployed: `git checkout` the branch back, `ddev composer install`, `ddev import-db --file=/tmp/pre-upgrade.sql.gz`, `ddev drush cr`.
- Deployed: redeploy the previous image tag (the Dockerfile `FROM` of the previous commit) through the normal deploy. Restore the database from backup only when `updb` already changed schema; config in `drupal/config/sync` must be reverted with the same commit.
- Never `git push` or force-push without the user's explicit permission for that push.

## Report

Versions before and after, composer lock changes, `updb` output, config drift, parity result against baseline, image tag, rollback point.
