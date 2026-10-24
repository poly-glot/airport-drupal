FROM dunglas/frankenphp:1-php8.3

RUN install-php-extensions apcu gd intl opcache pdo_mysql zip

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl git unzip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

ENV APP_ENV=prod \
    COMPOSER_ALLOW_SUPERUSER=1 \
    SERVER_NAME=:8080 \
    XDG_CONFIG_HOME=/tmp/caddy-config \
    XDG_DATA_HOME=/tmp/caddy-data

WORKDIR /app

COPY drupal/composer.json drupal/composer.lock ./
COPY drupal/recipes ./recipes
RUN composer install --no-dev --no-interaction --optimize-autoloader

COPY drupal/docker/php.ini /usr/local/etc/php/conf.d/zz-meridian.ini
COPY drupal/docker/Caddyfile /etc/caddy/Caddyfile
COPY drupal/docker/health.php ./web/health.php
COPY drupal/docker/entrypoint.sh /usr/local/bin/meridian-entrypoint
COPY drupal/docker/bootstrap.sh /usr/local/bin/meridian-bootstrap
COPY drupal/web/sites/default/settings.meridian.php ./web/sites/default/settings.meridian.php
COPY drupal/web/sites/default/settings.cloudrun.php ./web/sites/default/settings.php

COPY drupal/config ./config
COPY drupal/web/modules/custom ./web/modules/custom
COPY drupal/scripts ./scripts

RUN mkdir -p private web/sites/default/files web/sites/default/assets /tmp/caddy-config /tmp/caddy-data \
    && chmod -R a+rX /app \
    && chmod +x /usr/local/bin/meridian-entrypoint /usr/local/bin/meridian-bootstrap \
    && chown -R www-data:www-data private web/sites/default /tmp/caddy-config /tmp/caddy-data

EXPOSE 8080

USER www-data

ENTRYPOINT ["meridian-entrypoint"]
CMD ["frankenphp", "run", "--config", "/etc/caddy/Caddyfile"]
