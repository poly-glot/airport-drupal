<?php

declare(strict_types=1);

namespace Drupal\meridian_slots;

use Drupal\canvas\Entity\Component;
use Drupal\Core\Theme\ComponentPluginManager;

final class SlotExpectations {

  private const string SDC_PREFIX = 'sdc.';

  public function __construct(private readonly ComponentPluginManager $componentPluginManager) {}

  public function expected(string $parentPluginId, string $slot): array {
    if (!$this->componentPluginManager->hasDefinition($parentPluginId)) {
      return [];
    }

    $entries = $this->componentPluginManager->find($parentPluginId)->metadata->slots[$slot]['expected'] ?? [];

    return \array_values(\array_filter($entries, static fn (string $entry): bool => \str_contains($entry, ':')));
  }

  public function allows(string $parentPluginId, string $slot, string $childPluginId): bool {
    $expected = $this->expected($parentPluginId, $slot);

    return $expected === [] || \in_array($childPluginId, $expected, TRUE);
  }

  public function label(string $pluginId): string {
    return Component::load(self::SDC_PREFIX . \str_replace(':', '.', $pluginId))?->label() ?? $pluginId;
  }

  public function labels(array $pluginIds): string {
    return \implode(', ', \array_map($this->label(...), $pluginIds));
  }

  public static function pluginIdFromComponentId(string $componentId): ?string {
    if (!\str_starts_with($componentId, self::SDC_PREFIX)) {
      return NULL;
    }

    [$provider, $machineName] = \explode('.', \substr($componentId, \strlen(self::SDC_PREFIX)), 2);

    return "$provider:$machineName";
  }

}
