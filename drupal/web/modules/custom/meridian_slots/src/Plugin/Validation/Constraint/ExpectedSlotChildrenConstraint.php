<?php

declare(strict_types=1);

namespace Drupal\meridian_slots\Plugin\Validation\Constraint;

use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\Validation\Attribute\Constraint;
use Symfony\Component\Validator\Constraint as SymfonyConstraint;

#[Constraint(
  id: self::PLUGIN_ID,
  label: new TranslatableMarkup('Slot children match the expected components', [], ['context' => 'Validation']),
)]
final class ExpectedSlotChildrenConstraint extends SymfonyConstraint {

  public const string PLUGIN_ID = 'MeridianExpectedSlotChildren';

  public string $message = 'A @child cannot be placed in the @slot slot of @parent, which only accepts @expected.';

}
