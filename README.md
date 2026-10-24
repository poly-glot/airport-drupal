# Airport

Website for Meridian Airport, a fictional two-terminal airport in Birmingham. Decoupled Drupal: Drupal 11 with Canvas is the editor and the content API, and a Next.js app renders the site. The 48 Meridian components are React code components in the Next app; Canvas registers them from the running app and editors build pages with them in the Canvas editor, previewing through the app itself.

## What you own

| Path | Purpose |
|---|---|
| `next/` | The frontend: `components/` (one directory per Canvas code component), `styles/` (tokens, base, layout, utilities), `lib/` (behaviours, region split, helpers), `app/` (catch-all page and the Canvas draft and component routes), `public/assets/` (images and the flight board data) |
| `drupal/` | Composer project: `config/sync/` (all configuration, including the page templates and the registered components), `recipes/meridian_content/` (the 29 pages as content YAML), `Dockerfile` and `docker/` (the production image) |
| `docs/` | Component conventions, design law and catalogue, status, platform record, copy deck, imagery register, the original design brief |
| `scripts/` | `ensure-oauth.php` (production OAuth), `hero_contrast.py` and `contrast.py` (accessibility gates for the hero photos and colour pairs) |
| `.github/workflows/` | `verify.yaml` on pull requests, `deploy.yaml` on `main` |

## Local development

Drupal, once:

```bash
cd drupal
ddev start
ddev composer install
ddev drush site:install --existing-config --account-pass=admin --yes
ddev drush recipe ../recipes/meridian_content
```

OAuth keys, once per checkout. Canvas Headless signs editor preview sessions with them:

```bash
ddev exec 'mkdir -p /var/www/html/keys && cd /var/www/html/keys && openssl genrsa -out private.key 2048 && openssl rsa -in private.key -pubout -out public.key'
```

Next.js:

```bash
cd next
cp .env.example .env
npm install
npm run dev
```

| What | Where |
|---|---|
| Site | http://localhost:3000 |
| Canvas editor | http://airport-drupal.ddev.site/canvas, or the `127.0.0.1` port `ddev describe` prints if Chrome will not resolve the ddev hostname. Use Chrome: preview over plain HTTP needs a Chromium browser |
| Drupal admin | user `admin`, the password given to `site:install` above; `ddev drush uli` prints a one-time login link |
| Content API | `http://airport-drupal.ddev.site/canvas/content-api?requestUri=/cookies` |

The frontend `http://localhost:3000` is registered with Canvas in `config/sync` (`canvas_headless.settings`). Opening any page in the editor loads it, syncs the component list from `/api/canvas/components`, and previews drafts through it.

## How a change flows

- **Component**: edit `next/components/<name>/` (`docs/components.md`), `npm run check`, reload the editor so Canvas picks up metadata changes, look at it in Chrome at 1440 and 390.
- **Content**: edit in the Canvas editor and publish. To ship content changes with the code, export them: `ddev drush content:export canvas_page --dir=/var/www/html/recipes/meridian_content/content`, review the YAML diff, commit.
- **Configuration**: change it in the site, `ddev drush cex -y`, commit `drupal/config/sync`. Production imports it with `drush deploy`.

Quality gates, the same locally and in CI (`verify.yaml`):

| Gate | Command | What it runs |
|---|---|---|
| Frontend | `cd next && npm run check` | eslint, stylelint (standard config, alphabetical properties), `prettier --check`, tsc |
| Pages | `cd next && npm run test:e2e` | Playwright on every page in the content recipe at 1440 and 390: 200, one `<main>`, the expected title and description, no failed requests, no console errors, no axe WCAG 2.2 AA violations. `npm run a11y` runs only the axe half |
| Drupal | `cd drupal && ddev composer quality` | phpcs (Drupal and DrupalPractice, comment sniffs off), PHPStan level 8 with phpstan-drupal, drupal-rector dry run |

CI's e2e job builds the production Drupal image, runs its bootstrap against an empty MySQL, starts it, builds and starts Next against it, and runs `npm run test:e2e`: the same path a fresh production install takes.

## The hero

The homepage hero changes with the time of day and the weather. Twelve photo variants (morning, afternoon, evening, night, each sunny, cloudy and rainy) live in `next/public/assets/img/home/hero/`. The markup carries `morning-rainy` so the page is right without JavaScript; `enhanceHeroSky` reads the clock for the daypart and the hero's `defaultWeather` prop for the weather, then rewrites the picture sources, the weather line and the icon. `?sky=evening-sunny` forces a variant. Every variant must keep white text at 4.5:1 over the photo at both widths: `.venv/bin/python scripts/hero_contrast.py` prints 12/12 pass. Details in the hero-sky skill.

## Production

Two Cloud Run services in `firebase-cloud-491613`, `europe-west2`, both built from this repo on every push to `main` and both defined in `firebase-cloud` (`terraform/apps/airport-drupal.tf`):

| Service | Image | Serves |
|---|---|---|
| `airport-web` | `next/Dockerfile` (Next standalone, Node 24) | The public site. Firebase Hosting site `airport-drupal-junaid` rewrites every path of `airport.junaid.guru` to it. `CANVAS_SITE_URL` points it at `airport-drupal` |
| `airport-drupal` | `drupal/Dockerfile` (FrankenPHP) | The Canvas editor, the content API and the admin. `CANVAS_FRONTEND_URL` tells Canvas Headless which frontend to preview through, overriding the `localhost:3000` in `config/sync` (`settings.cloudrun.php`) |

The services reach each other on their deterministic URLs (`https://<service>-563789376070.europe-west2.run.app`), so neither waits for the other's Terraform output. `airport-web` caches every published page under one cache tag, so a cold Drupal never holds up a visitor once a page is cached; draft previews always fetch live. Publishing is instant: when a Canvas page or page template is saved, the `meridian_revalidate` module calls `airport-web`'s `POST /api/revalidate` after the save commits, authenticated with `REVALIDATE_SECRET` (Secret Manager `airport-web-revalidate-secret`), and the next visitor gets the new version. The cache also expires on its own after an hour in case a call is ever missed (logged as a warning in Drupal's `meridian_revalidate` channel). Two Cloud Scheduler pings every 15 minutes keep both warm: `airport-web-warm` requests `/`, `airport-drupal-warm` requests the content API.

Each deploy builds both images, deploys `airport-drupal`, runs the `airport-drupal-bootstrap` job (on an empty database `site:install --existing-config` then the content recipe, otherwise `drush deploy`; then `scripts/ensure-oauth.php`), updates the cron job, deploys `airport-web`, and finally deploys Hosting. Content is applied only on first install; after that it belongs to the editors.

Editors use the Canvas editor on the `airport-drupal` `run.app` URL: Hosting forwards no cookie except `__session`. The editor previews through the `airport-web` `run.app` URL, in a Chromium browser. The admin password lives in Secret Manager:

```bash
gcloud secrets versions access latest --secret airport-drupal-admin-pass --project firebase-cloud-491613
```

Public files are the GCS bucket mounted at `web/sites/default/files`. `drush cron` runs as the `airport-drupal-cron` job. Rehearse both production images locally against an empty database before changing them (then `docker run -d --network ddev_default -p 8090:8080` the Drupal image without the command, `docker run -d -p 3001:8080 -e CANVAS_SITE_URL=http://host.docker.internal:8090 airport-web:local`, and `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npm run test:e2e`):

```bash
docker build -f drupal/Dockerfile -t airport-drupal:local .
docker build -t airport-web:local next
docker exec ddev-airport-drupal-db mysql -uroot -proot -e "CREATE DATABASE airport_probe; GRANT ALL ON airport_probe.* TO 'db'@'%';"
docker run --rm --network ddev_default -e DRUPAL_DB_HOST=ddev-airport-drupal-db -e DRUPAL_DB_NAME=airport_probe -e DRUPAL_DB_USER=db -e DRUPAL_DB_PASSWORD=db \
  -e DRUPAL_HASH_SALT=$(openssl rand -hex 32) -e DRUPAL_ADMIN_PASS=admin -e DRUPAL_CANVAS_CLIENT_SECRET=probe \
  -e DRUPAL_OAUTH_PRIVATE_KEY="$(cat drupal/keys/private.key)" -e DRUPAL_OAUTH_PUBLIC_KEY="$(cat drupal/keys/public.key)" airport-drupal:local meridian-bootstrap
```

## Where the rest lives

- `CLAUDE.md`: the working agreement and the design law.
- `docs/components.md`: how a component is written, registered and checked.
- `docs/design/spec.md` and `docs/design/system.md`: the design law and the class catalogue it governs.
- `docs/brief.md`: the original design brief; section 2.1 describes every homepage element. Its file paths are from the static prototype that preceded this app.
- `docs/platform.md`: the infrastructure plan and what each step found.
- `docs/status.md`: what is open.
- `next/README.md`: how the Next app talks to Canvas.
