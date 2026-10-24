<?php

use Drupal\canvas_oauth\MediaScopesHelper;
use Drupal\consumers\Entity\Consumer;

$key_dir = getenv('DRUPAL_OAUTH_KEY_DIR') ?: '/tmp/keys';
$secret = getenv('DRUPAL_CANVAS_CLIENT_SECRET');

if ($secret === FALSE || !is_file("$key_dir/private.key") || !is_file("$key_dir/public.key")) {
  throw new RuntimeException("DRUPAL_CANVAS_CLIENT_SECRET must be set and $key_dir must hold private.key and public.key (the entrypoint writes them from DRUPAL_OAUTH_PRIVATE_KEY and DRUPAL_OAUTH_PUBLIC_KEY).");
}

\Drupal::configFactory()->getEditable('simple_oauth.settings')
  ->set('private_key', "$key_dir/private.key")
  ->set('public_key', "$key_dir/public.key")
  ->save();

\Drupal::classResolver(MediaScopesHelper::class)->ensureMediaScopes();

$scope_ids = array_keys(\Drupal::entityTypeManager()->getStorage('oauth2_scope')->loadMultiple());
$existing = \Drupal::entityTypeManager()->getStorage('consumer')->loadByProperties(['client_id' => 'canvas-cli']);
$consumer = reset($existing);
if (!$consumer instanceof Consumer) {
  $consumer = Consumer::create(['client_id' => 'canvas-cli', 'label' => 'Canvas CLI']);
}

$consumer
  ->set('secret', $secret)
  ->set('grant_types', [['value' => 'client_credentials']])
  ->set('confidential', TRUE)
  ->set('is_default', FALSE)
  ->set('user_id', 1)
  ->set('scopes', array_map(static fn (string $id): array => ['scope_id' => $id], $scope_ids))
  ->save();

print 'oauth ready: consumer canvas-cli with ' . count($scope_ids) . " scopes\n";
