<?php

// src/Validator/Constraints/UniqueSlot.php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class HasOneSlotWithEmployee extends Constraint
{
    public $message = "You don't have any slot with this employee yet.";

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
