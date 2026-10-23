<?php

declare(strict_types=1);

namespace Drupal\meridian_slots\Plugin\Validation\Constraint;

use Drupal\canvas\Plugin\Field\FieldType\ComponentTreeItem;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\meridian_slots\SlotExpectations;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

final class ExpectedSlotChildrenConstraintValidator extends ConstraintValidator implements ContainerInjectionInterface {

  public function __construct(private readonly SlotExpectations $expectations) {}

  public static function create(ContainerInterface $container): self {
    return new self($container->get(SlotExpectations::class));
  }

  public function validate(mixed $value, Constraint $constraint): void {
    \assert($constraint instanceof ExpectedSlotChildrenConstraint);
    if (!$value instanceof ComponentTreeItem) {
      return;
    }

    $parent = $value->getParentComponentTreeItem();
    $slot = $value->getSlot();
    if ($parent === NULL || $slot === NULL) {
      return;
    }

    $parentPluginId = SlotExpectations::pluginIdFromComponentId($parent->getComponentId());
    $childPluginId = SlotExpectations::pluginIdFromComponentId($value->getComponentId());
    if ($parentPluginId === NULL || $childPluginId === NULL || $this->expectations->allows($parentPluginId, $slot, $childPluginId)) {
      return;
    }

    $this->context->buildViolation($constraint->message, [
      '@child' => $this->expectations->label($childPluginId),
      '@slot' => $slot,
      '@parent' => $this->expectations->label($parentPluginId),
      '@expected' => $this->expectations->labels($this->expectations->expected($parentPluginId, $slot)),
    ])->addViolation();
  }

}
