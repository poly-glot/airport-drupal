# Airport

Website for Meridian Airport, a fictional two-terminal airport in Birmingham, on the agency Cloud Run platform. This is
the Drupal port: Drupal 11 with Canvas as the page editor, the Meridian design system as 48 single directory components,
and the pages seeded through the Canvas HTTP API. The static site in `static/` is the finished, verified design and
remains the contract; the Drupal site reproduces it page for page, and every change is proven against it twice, once on
the DOM and once on the rendered page. A page is not done until both pass: the first delivery of this repo passed the
DOM check with no stylesheets, no images and a dead API.

## What you own

| Path                                                 | Purpose                                                                                                                                                                                                                                                                 |
|------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `static/`                                            | The contract: 29 verified pages, one stylesheet per component, `site.js`, images, `assets/data/board-events.json`. Single source for every theme stylesheet and behaviour                                                                                               |
| `drupal/web/themes/custom/meridian/components/`      | 48 components, one directory each: `.component.yml`, `.twig`, `README.md`, and a generated `.css` (and `.js` where static has a behaviour). Twig is hand-written; CSS and JS are never edited here                                                                      |
| `drupal/web/themes/custom/meridian/{css,templates}/` | Generated base stylesheets; the page, html and region templates that give Canvas pages the static page skeleton                                                                                                                                                         |
| `drupal/web/modules/custom/meridian_slots/`          | Shows a banner in the editor preview and refuses save and publish when a slot holds a component its definition does not expect                                                                                                                                          |
| `drupal/config/sync/`, `drupal/recipes/meridian/`    | Exported configuration and the recipe a fresh install applies. Config owns the page templates                                                                                                                                                                           |
| `drupal/seed/`                                       | Generated from `static/` by `scripts/build_seed.py --target canvas`. Never edited                                                                                                                                                                                       |
| `scripts/`                                           | `sync_static.py` (static to theme), `build_seed.py` and `seed_push.py` (static to pages), `compare_port.py` (DOM check), `visual_diff.py` (render check), `design_battery.py` (design law), `hero_contrast.py` (hero legibility), `ensure-oauth.php` (production OAuth) |
| `drupal/Dockerfile`, `drupal/docker/`                | The production image in two halves, platform then client. The top half becomes a `drupal-base` image when a second Drupal site exists; until then there is no base image to look for                                                                                    |
| `firebase.json`, `.github/workflows/`                | Hosting rewrite for `airport.junaid.guru` and the deploy, verify and parity workflows                                                                                                                                                                                   |

## Static prototype

Every page, string and image in `static/` is final. Serve it with:

```bash
python3 -m http.server 8765 -d static
```

Theme CSS and JS are generated from it, not copied by hand. The owner table in `scripts/sync_static.py` says which
static file, or which selector prefix of a split file such as `content.css`, lands in which component, and the
behaviours come from the init lines at the end of `site.js`. The design battery fails on any theme stylesheet or script
that differs from what static generates, or exists without being generated.

## How a change flows

```bash
python3 scripts/sync_static.py                                   # static css/js -> theme
.venv/bin/python scripts/build_seed.py --target canvas --write    # static pages -> drupal/seed
.venv/bin/python scripts/seed_push.py                            # seed -> Canvas, hash-skips unchanged pages
python3 scripts/design_battery.py                                # sync drift, comments, props, READMEs
PORT_BASE_URL=http://airport-drupal.ddev.site .venv/bin/python scripts/compare_port.py
python3 scripts/visual_diff.py http://127.0.0.1:8765 http://airport-drupal.ddev.site /tmp/meridian-shots
```

Edit static first. If the markup changed, edit the component's Twig and, if a new element appears, the emitter in
`scripts/canvas_emit.py`. The comparer must print `0 page(s) differ` and the visual diff `0 render(s) differ`, then look
at the page in Chrome at 1440 and 390 with the network tab filtered to 404. The visual diff needs `npm install` once
(puppeteer-core) and ImageMagick; its 1% noise ceiling is the split-flap board animating between captures.

## Local development

```bash
cd drupal
ddev start
ddev composer install
ddev drush site:install --existing-config --account-pass=admin --yes
```

Site http://airport-drupal.ddev.site, login `admin` / `admin`, Canvas editor under `/canvas`, component library at
`/admin/appearance/component`. If Chrome will not resolve the ddev hostname, `ddev describe` prints a `127.0.0.1` port
that works.

The seed pusher talks to the Canvas HTTP API with an OAuth client. Once per checkout:

```bash
ddev exec 'cd /var/www/html/keys && openssl genrsa -out private.key 2048 && openssl rsa -in private.key -pubout -out public.key'
ddev drush config:set simple_oauth.settings public_key /var/www/html/keys/public.key -y
ddev drush config:set simple_oauth.settings private_key /var/www/html/keys/private.key -y
ddev drush ev '\Drupal::classResolver(\Drupal\canvas_oauth\MediaScopesHelper::class)->ensureMediaScopes();'
cp .env.example .env
```

Create the consumer `canvas-cli` as `docs/canvas-reference.md` section 4 describes and put its secret in `drupal/.env`.
`keys/` and `.env` are ignored by git.

## The hero

The homepage hero changes with the time of day and the weather. Twelve picture variants (morning, afternoon, evening,
night, each sunny, cloudy and rainy) sit in `static/assets/img/home/hero/`. The markup bakes in `morning-rainy` so the
page is right without JavaScript; the hero behaviour reads the clock for the daypart, the component's `default_weather`
prop for the weather, and rewrites the picture sources, the weather line and the icon. `?sky=evening-sunny` forces a
variant for review. Every variant must keep white text at 4.5:1 over the photo at both widths:
`python3 scripts/hero_contrast.py static/assets/img/home/hero` prints 12 of 12 pass. Details in the hero-sky skill.

## Onboarding checklist

Done once for this site on 2026-10-23; recorded here because the next Drupal site follows the same steps.

1. `firebase-cloud`: `terraform/apps/<app>.tf` from `modules/drupal-cloudrun`, the catalogue entry in
   `apps/mysql-catalog.tf`, the outputs in `apps/outputs.tf` and the root `outputs.tf`. Open a PR; the plan should show
   only your creates. The first apply fails on the service and jobs because the database secret versions do not exist
   yet.
2. `personal-cloud`: `gh workflow run terraform-mysql-apps.yaml --repo poly-glot/personal-cloud --ref main`, confirm the
   three `<app>-db-*` secret versions exist, re-run the Terraform workflow.
3. Secret versions, never printed: `<app>-hash-salt` (64 hex characters; the OAuth library refuses fewer than 32),
   `<app>-admin-pass`, `<app>-canvas-client-secret`, `<app>-oauth-private-key` and `<app>-oauth-public-key` (PEM).
4. Repo secrets `WIF_PROVIDER` and `GCP_SA_EMAIL` from the Terraform outputs.
5. Push to `main`. The deploy workflow builds, deploys the service, runs the bootstrap job, updates the cron job image
   and deploys Hosting. Both jobs exist from Terraform, so nothing is created by hand.
6. DNS: `CNAME <app> -> <app>-junaid.web.app`. The Hosting custom domains API lists what it needs and what it currently
   sees.

## Production

Service `airport-drupal` in `firebase-cloud-491613`, `europe-west2`, behind Firebase Hosting site
`airport-drupal-junaid` for `airport.junaid.guru`. Every push to `main` deploys and then runs the
`airport-drupal-bootstrap` job: install from `config/sync` on an empty database, otherwise `drush deploy`; then
`scripts/ensure-oauth.php` points `simple_oauth` at the keys the entrypoint wrote to `/tmp/keys`, ensures the media
scopes and upserts the `canvas-cli` consumer; then the seed pusher runs against the local instance. Editor changes on
pages whose seed is unchanged survive, because the pusher skips them by hash.

Editors use the Canvas editor on the `run.app` URL, not the public domain: Hosting forwards no cookie except
`__session`, and Drupal's session cookie cannot be renamed to it. User `admin`; the password lives only in Secret
Manager:

```bash
gcloud secrets versions access latest --secret airport-drupal-admin-pass --project firebase-cloud-491613
```

Public files are the GCS bucket mounted at `web/sites/default/files` as a Cloud Run volume on the service and both jobs,
so Drupal uses plain file operations and no storage module. Compiled Twig and CSS and JS aggregates stay on the instance
(`/tmp/php`, `sites/default/assets`): on the mounted bucket a single API request exceeded PHP's 30-second limit.
`drush cron` runs as the `airport-drupal-cron` job from Cloud Scheduler, and a second Scheduler job, `airport-drupal-warm`, requests the front page every 15 minutes so an instance stays up between visitors; a cold start otherwise costs about 8 seconds on the first page. The service starts FrankenPHP only and never
imports configuration.

Rehearse the production path locally against an empty database before changing any of it:

```bash
docker build -f drupal/Dockerfile -t airport-drupal:local .
docker exec ddev-airport-drupal-db mysql -uroot -proot -e "CREATE DATABASE airport_probe; GRANT ALL ON airport_probe.* TO 'db'@'%';"
docker run --rm --network ddev_default -e DRUPAL_DB_HOST=ddev-airport-drupal-db -e DRUPAL_DB_NAME=airport_probe -e DRUPAL_DB_USER=db -e DRUPAL_DB_PASSWORD=db \
  -e DRUPAL_HASH_SALT=$(openssl rand -hex 32) -e DRUPAL_ADMIN_PASS=admin -e DRUPAL_CANVAS_CLIENT_SECRET=probe \
  -e DRUPAL_OAUTH_PRIVATE_KEY="$(cat drupal/keys/private.key)" -e DRUPAL_OAUTH_PUBLIC_KEY="$(cat drupal/keys/public.key)" airport-drupal:local meridian-bootstrap
```

Then run the same image without the command on port 8090 with the same database and key variables, and point
`compare_port.py` and `visual_diff.py` at `http://127.0.0.1:8090`.

## Where the rest lives

- `CLAUDE.md`: the working agreement, the rules that do not bend, the design law.
- `docs/components.md`: the component contract, one component one directory, the yml shape, Twig and JS rules.
- `docs/brief.md`: the original delivery brief, with every homepage element and the hero sky variants in section 2.1.
- `docs/design/spec.md` and `docs/design/system.md`: the normative design law and the catalogue it governs.
- `docs/drupal-canvas.md`: the plan for this port and the component inventory.
- `docs/canvas-reference.md`: every Canvas 1.12 fact observed against the running site, including the ones that
  overturned the plan.
- `docs/platform.md`: the infrastructure plan, its eight decisions and what each step found.
- `docs/status.md`: what is still open, then the record of what was settled and why.
