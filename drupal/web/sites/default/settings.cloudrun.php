<?php

use Symfony\Component\HttpFoundation\Request;
use Drupal\Component\PhpStorage\MTimeProtectedFastFileStorage;

$databases['default']['default'] = [
  'database' => getenv('DRUPAL_DB_NAME'),
  'driver' => 'mysql',
  'host' => getenv('DRUPAL_DB_HOST'),
  'password' => getenv('DRUPAL_DB_PASSWORD'),
  'pdo' => getenv('DRUPAL_DB_SSL') ? [
    PDO::MYSQL_ATTR_SSL_CA => '/etc/ssl/certs/ca-certificates.crt',
    PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => FALSE,
  ] : [],
  'port' => getenv('DRUPAL_DB_PORT') ?: '3306',
  'prefix' => '',
  'username' => getenv('DRUPAL_DB_USER'),
];

$settings['hash_salt'] = getenv('DRUPAL_HASH_SALT');
$settings['update_free_access'] = FALSE;
$settings['file_assets_path'] = 'sites/default/assets';
$settings['file_temp_path'] = '/tmp';
foreach (['twig', 'default'] as $php_storage_bin) {
  $settings['php_storage'][$php_storage_bin] = [
    'class' => MTimeProtectedFastFileStorage::class,
    'directory' => '/tmp/php',
    'secret' => $settings['hash_salt'],
  ];
}
$settings['file_public_path'] = getenv('DRUPAL_FILES_PATH') ?: 'sites/default/files';
$settings['reverse_proxy'] = TRUE;
$settings['reverse_proxy_addresses'] = [$_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'];
$settings['reverse_proxy_trusted_headers'] = Request::HEADER_X_FORWARDED_FOR | Request::HEADER_X_FORWARDED_PROTO;

$public_host = getenv('DRUPAL_PUBLIC_HOST');
$forwarded_host = $_SERVER['HTTP_X_FORWARDED_HOST'] ?? '';
if ($public_host && $forwarded_host === $public_host) {
  $_SERVER['HTTP_HOST'] = $public_host;
}
$settings['trusted_host_patterns'] = array_filter([
  '^127\.0\.0\.1$',
  '^localhost$',
  '^[a-z0-9-]+\.[a-z0-9-]+\.run\.app$',
  $public_host ? '^' . preg_quote($public_host, '/') . '$' : NULL,
]);

require __DIR__ . '/settings.meridian.php';
