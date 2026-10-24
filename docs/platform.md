# Platform plan: poly-glot repo and infrastructure

## 2026-10-24: decoupled frontend

On `spike/nextjs-headless` the public site is the Next.js app in `next/`, and Drupal serves the Canvas editor and content API. What that changes below:

- Image: no `python3`, no `seed/`, no theme, no `static/assets`. The bootstrap job installs from `config/sync`, applies `recipes/meridian_content` on an empty database only, otherwise runs `drush deploy`, then `ensure-oauth.php`. The seed pusher and decision 4 (seed on every deploy) are retired: content belongs to editors after the first install.
- Workflows: `parity.yaml` is gone with the static contract. `verify.yaml` lints, type-checks and builds `next/`, validates `composer.json` and lints `ensure-oauth.php`.
- Not built: a Cloud Run service for `next/`, the Hosting rewrite pointing at it, and a production value for `canvas_headless.settings` frontends (`docs/status.md`). Until they exist this branch must not reach `main`.

The rest of this document is the record of the original Drupal-rendered deployment.

Status: proposed, awaiting approval. Nothing in this document has been created, pushed or applied.

The plan mirrors the agency WordPress platform (`firebase-cloud` Terraform, `wp-base` image, `wp-client-template`, Cloud Run behind Firebase Hosting, shared OCI HeatWave MySQL via `personal-cloud`) so that the Drupal site is run the same way as parley, wealth, legal and boxes. Where Drupal differs from WordPress the difference is named and a decision is listed in section 8.

## 1. Repositories

| Repo | Purpose | Status |
|---|---|---|
| `poly-glot/airport-drupal` | this code: `static/`, `scripts/`, `drupal/`, `.claude/`, docs. Cloud Run service, Artifact Registry image and bootstrap job all take the repo name, as the WordPress deploy workflow does | new; the local repo pushed on approval |
| `poly-glot/firebase-cloud` | adds `terraform/modules/drupal-cloudrun`, `terraform/apps/airport-drupal.tf`, a catalogue entry and outputs | one PR |
| `poly-glot/personal-cloud` | provisions the HeatWave database from the catalogue, as today; no code change | one workflow run |
| `poly-glot/drupal-base`, `poly-glot/drupal-client-template` | the two-layer split the WordPress platform has | deferred. One Drupal client does not justify a base image. The Dockerfile is kept in two halves, platform then client, so the top half lifts out unchanged when a second Drupal site appears |

Naming: `airport` is the project name across the sibling repos (the `airport` static site, the Umbraco port), so the Drupal repo, service and domain carry it, with `-drupal` separating this port from the others. Meridian stays the brand inside the site.

## 2. Runtime shape

```
airport.junaid.guru ──► Firebase Hosting site airport-drupal-junaid ──rewrite **──► Cloud Run service airport-drupal
                                                                                      │  FrankenPHP, PHP 8.3, Drupal 11, Canvas 1.12
                                                                                      ├─► OCI HeatWave MySQL (TLS, public NLB), db airport_drupal
                                                                                      └─► GCS bucket firebase-cloud-491613-airport-drupal-files mounted at /app/web/sites/default/files (Cloud Run volume, public files and Canvas media)
Cloud Run job airport-drupal-bootstrap  install or deploy, OAuth consumer, seed    (run by CI after every service deploy)
Cloud Run job airport-drupal-cron       drush cron                                 (Cloud Scheduler, hourly)
```

Project `firebase-cloud-491613`, region `europe-west2`, keyless CI through the existing WIF pool, as for every other app.

Editors use the Canvas editor on the `run.app` URL. Firebase Hosting forwards no cookie except `__session`, and Drupal's session cookie cannot be renamed to it, so the public domain is anonymous traffic only. This is the same constraint wp-admin lives with.

## 3. Terraform module `drupal-cloudrun`

Copied from `wordpress-cloudrun` and changed where Drupal needs it. Same inputs (`app_name`, `github_repo`, `database_name`, `wif_pool_*`, sizing, `extra_env`), same outputs (`wif_provider`, `ci_cd_sa_email`, `runtime_sa_email`, `service_url`, `uploads_bucket`, `db_app_entry`).

| Piece | WordPress module | Drupal module |
|---|---|---|
| identity, WIF, CI roles | `app-identity` | unchanged |
| database secrets | `app-with-mysql`: `db-host`, `<app>-db-{user,pass,name}` | unchanged, surfaced as `DRUPAL_DB_HOST`, `DRUPAL_DB_USER`, `DRUPAL_DB_PASSWORD`, `DRUPAL_DB_NAME` |
| extra secrets | `<app>-wp-admin-pass` | `<app>-hash-salt` (at least 32 characters: simple_oauth encrypts with it and refuses shorter salts with a 500 on the token endpoint, found in the local probe), `<app>-admin-pass`, `<app>-canvas-client-secret`, `<app>-oauth-private-key`, `<app>-oauth-public-key`. Secret shells created by Terraform, versions written once by hand, as the admin password is today. The two key secrets are env on the service and both jobs; the entrypoint writes them to `/tmp/keys` in every container |
| files bucket | `<project>-<app>-uploads`, public read, written by a mu-plugin | `<project>-<app>-files`, private, uniform access, mounted into the service and both jobs as a Cloud Run GCS volume at `/app/web/sites/default/files`. Drupal uses plain local file operations; Caddy serves the files; Firebase Hosting caches them. No storage module, no key, no public bucket |
| service | startup probe `/wp-includes/version.php` | startup probe `/health.php`, a one-line PHP file in the image that does not bootstrap Drupal. Never `/`, never TCP, for the reasons recorded in the WordPress skill |
| env | `WP_PUBLIC_HOST` | `DRUPAL_PUBLIC_HOST`; settings trust `X-Forwarded-Host` only when it equals this value, and `trusted_host_patterns` is derived from it and the `run.app` host |
| cron | Cloud Scheduler hits wp-cron over HTTP | Cloud Scheduler executes the `<app>-cron` Cloud Run job (`drush cron`) through the Cloud Run Jobs API; no public cron URL, no cron key |
| jobs | `<app>-bootstrap` created once by hand, updated by CI | `<app>-bootstrap` and `<app>-cron` declared in Terraform with `ignore_changes` on image, so the first CI run no longer fails on a missing job |
| warm ping | the wp-cron ping every 15 minutes keeps the instance up | the cron is a job and never touches the service, so a Scheduler HTTP job `<app>-warm` requests the front page every 15 minutes (`warm_schedule`, `warm_path`); added 2026-10-23 after the first visit after idle measured about 8 s. First ping observed: 200 in 51 ms against a warm instance |
| hosting | `hosting` module, custom domain, CI SA Firebase roles | unchanged |

`apps/airport-drupal.tf` is the parley file with the module source changed, `extra_env = { DRUPAL_PUBLIC_HOST = "airport.junaid.guru" }`, hosting site `airport-drupal-junaid`, custom domain `airport.junaid.guru`. `apps/mysql-catalog.tf` gains `airport-drupal = module.airport_drupal.db_app_entry`; `apps/outputs.tf` and root `outputs.tf` gain the four outputs.

## 4. Image

One Dockerfile in `drupal/`, two halves.

Platform half, the future `drupal-base`:
- `dunglas/frankenphp:1-php8.3`, extensions `apcu gd intl opcache pdo_mysql zip`, composer, `python3` (the seed pusher is stdlib Python and runs inside the bootstrap job).
- `composer install --no-dev` from the lock file, OPcache with `validate_timestamps=0` and a preload of `vendor/autoload.php`.
- Caddyfile serving `/app/web`, denying private paths, `encode zstd gzip`.
- `settings.cloudrun.php` driven by the env above: database over TLS without certificate verification (`DRUPAL_DB_SSL`, the same stance as the WordPress image's `DB_SSL`), `hash_salt`, `file_public_path = sites/default/files` which is the mounted bucket, `file_assets_path = sites/default/assets`, a local directory inside the docroot so CSS and JS aggregates stay on the instance and never touch the bucket (an absolute path outside the docroot is emitted as a protocol-relative URL and breaks every page), `php_storage` for `twig` and `default` on `/tmp/php` because Drupal otherwise compiles templates into `files/php` on the mounted bucket and a single API request exceeds PHP's 30-second limit, `file_temp_path = /tmp`, trusted hosts and the forwarded-host rule, reverse proxy settings for Cloud Run's load balancer.
- `/health.php`, the entrypoint, `bootstrap.sh`.

Client half:
- `COPY` recipe, `config/sync`, `seed/`, theme, custom modules, `static/assets` to `web/assets`, `static/favicon.svg`.

Entrypoint on the service: `drush deploy` is removed from the service start and moved to the bootstrap job, so a scaled-out instance never runs config import against a live database. The service starts FrankenPHP only.

`bootstrap.sh`, run by the `<app>-bootstrap` job after every service deploy:
1. `drush status --field=bootstrap`; if not `Successful`, `drush site:install --existing-config --account-pass="$DRUPAL_ADMIN_PASS" --yes` (the recipe installs Canvas, the theme and media types; config sync supplies the rest).
2. Otherwise `drush deploy` (updatedb, config import, cache rebuild, deploy hooks).
3. Ensure the OAuth plumbing that is not config: point `simple_oauth.settings` at `/tmp/keys` (written by the entrypoint), upsert the `canvas-cli` consumer with `DRUPAL_CANVAS_CLIENT_SECRET`, run the media scopes helper. One small drush script, `scripts/ensure-oauth.php`, replaces today's README steps.
4. `python3 scripts/seed_push.py` with `SEED_DRUSH=vendor/bin/drush` and `CANVAS_SITE_URL=http://127.0.0.1:8080` after starting FrankenPHP in the background inside the job, since the pusher talks HTTP. Hash skip keeps editor changes on untouched pages, as today.

## 5. CI in `airport-drupal`

`deploy.yaml` on push to `main`, copied from parley: WIF auth, amd64 build, push to Artifact Registry, `gcloud run deploy airport-drupal`, `gcloud run jobs update` and `execute --wait` on `airport-drupal-bootstrap`, `firebase deploy --only hosting:airport-drupal-junaid`.

`verify.yaml` on pull requests, the repo's own checks and nothing heavier: `python3 scripts/sync_static.py --check`, `python3 scripts/design_battery.py`, `php -l` over custom code, and seed freshness (`build_seed.py --target canvas --write` must leave `seed/` unchanged, so generated seed is always committed in step with static).

`parity.yaml` after a successful deploy: serve `static/` with `python3 -m http.server`, run `compare_port.py` and `visual_diff.py` with the Drupal side set to the `run.app` URL (`setup-chrome` provides the browser, `npm ci` provides puppeteer-core), upload the diff images as artifacts. This is the production form of the check that caught every defect in this port.

## 6. Order of work

1. Repo prep in `airport-drupal`. Done 2026-10-23: Dockerfile in two halves, `health.php`, `bootstrap.sh`, `ensure-oauth.php`, settings for TLS, assets path and forwarded host, `firebase.json`, the three workflows, the root `README.md`. Verified by building the image and running the bootstrap job and the service against an empty database: install from config, OAuth, seed, all pages 200, token issued, DOM and visual parity clean (canvas-reference section 8.1).
2. GCS spike. Done 2026-10-23, result: `drupal/gcs` 2.0.x-dev cannot work on Drupal 11. It registers its stream wrappers through `hook_stream_wrappers()` and `hook_stream_wrappers_alter()`, hooks that do not exist in Drupal 8 and later; with the module enabled and configured, `public://` still resolved to core's `PublicStream` and nothing reached the bucket. `drupal/flysystem_gcs` is pinned to a Flysystem 1 adapter. Both dropped; the module is removed from composer. Files are a Cloud Run GCS volume mount instead (decision 8), which needs no module and no key and works with uniform bucket access. Verified on Cloud Run in step 7, since FUSE cannot be exercised locally.
3. `firebase-cloud` PR: module, app file, catalogue, outputs. Opened 2026-10-23 as poly-glot/firebase-cloud#65 from branch `feat/airport-drupal` (worktree `../firebase-cloud-airport`, so the main checkout's uncommitted work was not touched); `terraform validate` clean; the CI plan passed: 43 creates for airport-drupal plus the catalogue secret version. The same plan also replaces the 10 existing `google_firebase_hosting_version` resources because their `config` block is absent from state (refresh drift, not from this branch: the hosting module last changed in March and provider versions are identical to the last apply). Merging applies both. Merged and applied 2026-10-23: the first apply failed on the service and both jobs as expected, the re-run after step 4 applied cleanly (6 added, 23 changed, 3 destroyed, the three being the tainted placeholders). First apply is expected to fail on the service because the database secret versions do not exist yet; the WordPress skill records the two recoveries.
4. `personal-cloud`: run `terraform-mysql-apps.yaml`, confirm the catalogue secret contains `airport-drupal` and the three database secret versions exist. Re-apply `firebase-cloud`. Done 2026-10-23: run 40005200096 succeeded, three versions present, database `airport_drupal`.
5. Secrets by hand: hash salt, admin password, Canvas client secret, RSA key pair. Done 2026-10-23: version 1 of each of the five `airport-drupal-*` secrets written from generated values; nothing printed, local copies deleted. Admin password: `gcloud secrets versions access latest --secret airport-drupal-admin-pass --project firebase-cloud-491613`.
6. GitHub repo `poly-glot/airport-drupal`: create, add `WIF_PROVIDER` and `GCP_SA_EMAIL`, add the remote, push `master` as `main`. Done 2026-10-23, created private (the public create was refused by the session's policy; flip visibility in GitHub settings if it should match the other client repos). Local branch is `master`, remote default is `main`; push with `git push origin master:main`.
7. First deploy runs from the push. Bootstrap job installs from config, seeds 29 pages, parity workflow runs against production. Done 2026-10-23 after two fixes found only on Cloud Run (jobs must pass `args`, compiled PHP must not live on the mounted bucket): bootstrap seeded all 29 pages, service URL https://airport-drupal-4peyon4phq-nw.a.run.app and hosting URL https://airport-drupal-junaid.web.app both serve every page with 200, `compare_port.py` 0 differ, `visual_diff.py` 0 of 58 renders differ, Chrome console clean with every asset 200, a file written by a job through the mounted bucket appeared in the bucket and was served by Drupal, the cron job executes. The parity workflow targets the hosting URL until the custom domain resolves. Its DOM check passes against production on every run; its screenshot step flakes on the GitHub runner (lazy images, phone-width table wrapping between two captures of the same markup) and is left as a known limitation by decision on 2026-10-23. The gate is `scripts/visual_diff.py` run locally before a push.
8. DNS: one CNAME `airport → airport-drupal-junaid.web.app` at the registrar. The Hosting API reports the current record is a CNAME to `cloud.junaid.guru` (an OCI address), state HOST_MISMATCH / OWNERSHIP_MISSING; replacing it is the owner's call and is not done by this plan.
9. Record the result in `docs/canvas-reference.md` and the project memory; update the WordPress-derived skill into a `drupal-cloudrun` skill with the grounded gotchas from steps 1 to 8.

## 7. Cost and sizing

Same envelope as a WordPress client: Cloud Run 1 vCPU, 1 GiB, min 0, max 1, concurrency 8; one scheduler; one bucket; one database on the shared HeatWave instance. The Canvas editor is a client-side React app, so editing adds API requests, not instance load. No load balancer, no Cloud CDN beyond what Firebase Hosting gives anonymous pages through `Cache-Control` from Drupal's page cache (`system.performance` max age set to 15 minutes in config).

## 8. Decisions to approve

| # | Decision | Recommendation | Alternative |
|---|---|---|---|
| 1 | Repo name and service name | `airport-drupal`, approved 2026-10-23 | |
| 2 | Public domain | `airport.junaid.guru`, approved 2026-10-23 | |
| 3 | Base image split now | No. One client. Keep the Dockerfile in two halves and extract on the second Drupal site, approved 2026-10-23 | |
| 4 | Seed in production | Inside the bootstrap job, with `python3` in the image, so content lands on every deploy exactly as WordPress seeds do, approved 2026-10-23 |  |
| 5 | Config import location | Bootstrap job only; the service never imports config at start, approved 2026-10-23 |  |
| 6 | Cron | Cloud Scheduler executing a `drush cron` job, approved 2026-10-23 |  |
| 7 | Verification in CI | Lean PR checks plus a post-deploy parity run against production with the diff images as artifacts, approved 2026-10-23 |  |
| 8 | Public files | Cloud Run GCS volume mount of the files bucket at `sites/default/files`; no storage module. Changed 2026-10-23 after the spike showed `drupal/gcs` is non-functional on Drupal 11 and `flysystem_gcs` is stale | `s3fs` against GCS interoperability with an HMAC key, if FUSE latency on image derivatives proves too slow |

On approval of the eight rows, step 1 and step 2 start in this repo with no external effect. Steps 3 to 8 each touch a shared repo or live infrastructure and are run one at a time, with the push in step 6 confirmed separately.
