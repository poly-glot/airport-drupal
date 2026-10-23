<?php

declare(strict_types=1);

namespace Drupal\meridian_slots\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\meridian_slots\Plugin\Validation\Constraint\ExpectedSlotChildrenConstraint;
use Drupal\meridian_slots\PreviewWarning;

final class SlotHooks {

  #[Hook('field_info_alter')]
  public function fieldInfoAlter(array &$info): void {
    $info['component_tree']['constraints'][ExpectedSlotChildrenConstraint::PLUGIN_ID] = [];
  }

  #[Hook('element_info_alter')]
  public function elementInfoAlter(array &$info): void {
    \array_unshift($info['component']['#pre_render'], [PreviewWarning::class, 'flagUnexpectedChildren']);
  }

}
