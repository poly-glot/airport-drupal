#!/bin/sh
set -eu

cd /app
export PATH="/app/vendor/bin:$PATH"

if [ "$(drush status --field=bootstrap)" != "Successful" ]; then
    drush site:install --existing-config --account-pass="$DRUPAL_ADMIN_PASS" --yes
else
    drush deploy --yes
fi

drush php:script scripts/ensure-oauth.php

frankenphp run --config /etc/caddy/Caddyfile &
until curl -fs http://127.0.0.1:8080/health.php >/dev/null; do sleep 1; done

SEED_DRUSH=drush CANVAS_SITE_URL=http://127.0.0.1:8080 CANVAS_CLIENT_ID=canvas-cli CANVAS_CLIENT_SECRET="$DRUPAL_CANVAS_CLIENT_SECRET" python3 scripts/seed_push.py
