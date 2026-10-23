<?php

declare(strict_types=1);

namespace Drupal\meridian_slots;

use Drupal\canvas\Element\RenderSafeComponentContainer;
use Drupal\Core\Render\Markup;
use Drupal\Core\Security\TrustedCallbackInterface;
use Drupal\Component\Utility\Html;

final class PreviewWarning implements TrustedCallbackInterface {

  public static function trustedCallbacks(): array {
    return ['flagUnexpectedChildren'];
  }

  public static function flagUnexpectedChildren(array $element): array {
    $expectations = \Drupal::service(SlotExpectations::class);
    $parentPluginId = $element['#component'];

    foreach ($element['#slots'] ?? [] as $slot => $children) {
      if (!\is_array($children)) {
        continue;
      }

      foreach ($children as $uuid => $child) {
        if (!self::isPreviewChild($child)) {
          continue;
        }

        $childPluginId = $child['#component']['#component'];
        if ($expectations->allows($parentPluginId, $slot, $childPluginId)) {
          continue;
        }

        $message = \sprintf(
          '%s is not allowed in the %s slot of %s. This slot accepts %s. Publishing is refused until it is moved.',
          Html::escape($expectations->label($childPluginId)),
          Html::escape($slot),
          Html::escape($expectations->label($parentPluginId)),
          Html::escape($expectations->labels($expectations->expected($parentPluginId, $slot))),
        );
        $element['#slots'][$slot][$uuid]['#prefix'] = Markup::create('<div class="meridian-slot-warning" role="alert">' . $message . '</div>');
        $element['#attached']['library'][] = 'meridian_slots/warning';
      }
    }

    return $element;
  }

  private static function isPreviewChild(mixed $child): bool {
    return \is_array($child)
      && ($child['#type'] ?? NULL) === RenderSafeComponentContainer::PLUGIN_ID
      && ($child['#is_preview'] ?? FALSE)
      && \is_string($child['#component']['#component'] ?? NULL);
  }

}
