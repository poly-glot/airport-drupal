#!/bin/sh
set -eu

if [ -n "${DRUPAL_OAUTH_PRIVATE_KEY:-}" ]; then
    mkdir -p /tmp/keys
    printf '%s' "$DRUPAL_OAUTH_PRIVATE_KEY" > /tmp/keys/private.key
    printf '%s' "$DRUPAL_OAUTH_PUBLIC_KEY" > /tmp/keys/public.key
    chmod 600 /tmp/keys/private.key /tmp/keys/public.key
fi

exec "$@"
