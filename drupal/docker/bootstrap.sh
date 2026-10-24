#!/bin/sh
set -eu

cd /app
export PATH="/app/vendor/bin:$PATH"

if [ "$(drush status --field=bootstrap)" != "Successful" ]; then
    drush site:install --existing-config --account-pass="$DRUPAL_ADMIN_PASS" --yes
    drush cache:rebuild
    drush recipe /app/recipes/meridian_content
else
    drush deploy --yes
fi

drush php:script scripts/ensure-oauth.php
