<?php

$settings['config_sync_directory'] = '../config/sync';

$settings['file_private_path'] = getenv('DRUPAL_PRIVATE_PATH') ?: '../private';

$settings['frontend_revalidate_secret'] = getenv('REVALIDATE_SECRET') ?: '';

$settings['frontend_revalidate_url'] = getenv('REVALIDATE_URL') ?: '';
