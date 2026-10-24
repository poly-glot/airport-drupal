<?php

declare(strict_types=1);

namespace Drupal\meridian_revalidate;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Site\Settings;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

final class FrontendRevalidator {

  private const array PUBLISHED_ENTITY_TYPES = ['canvas_page', 'page_variant'];

  private const int TIMEOUT_SECONDS = 5;

  private bool $scheduled = FALSE;

  public function __construct(
    private readonly ClientInterface $httpClient,
    private readonly ConfigFactoryInterface $configFactory,
    #[Autowire(service: 'logger.channel.meridian_revalidate')]
    private readonly LoggerInterface $logger,
  ) {}

  public function entityChanged(EntityInterface $entity): void {
    if ($this->scheduled || !in_array($entity->getEntityTypeId(), self::PUBLISHED_ENTITY_TYPES, TRUE)) {
      return;
    }

    $this->scheduled = TRUE;
    drupal_register_shutdown_function([$this, 'revalidate']);
  }

  public function revalidate(): void {
    $secret = (string) Settings::get('frontend_revalidate_secret', '');
    $frontend = $this->frontendUrl();

    if ($secret === '' || $frontend === '') {
      return;
    }

    try {
      $this->httpClient->request('POST', rtrim($frontend, '/') . '/api/revalidate', [
        'headers' => ['Authorization' => 'Bearer ' . $secret],
        'timeout' => self::TIMEOUT_SECONDS,
      ]);
    }
    catch (GuzzleException $exception) {
      $this->logger->warning('Could not revalidate the frontend at @url: @message', [
        '@url' => $frontend,
        '@message' => $exception->getMessage(),
      ]);
    }
  }

  private function frontendUrl(): string {
    $override = (string) Settings::get('frontend_revalidate_url', '');
    if ($override !== '') {
      return $override;
    }

    $frontends = $this->configFactory->get('canvas_headless.settings')->get('frontends');

    return is_array($frontends) ? (string) ($frontends[0]['url'] ?? '') : '';
  }

}
