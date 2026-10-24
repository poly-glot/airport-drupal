<?php

declare(strict_types=1);

namespace Drupal\meridian_revalidate\Hook;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\meridian_revalidate\FrontendRevalidator;

final class RevalidateHooks {

  public function __construct(
    private readonly FrontendRevalidator $revalidator,
  ) {}

  #[Hook('entity_insert')]
  #[Hook('entity_update')]
  #[Hook('entity_delete')]
  public function entityChanged(EntityInterface $entity): void {
    $this->revalidator->entityChanged($entity);
  }

}
