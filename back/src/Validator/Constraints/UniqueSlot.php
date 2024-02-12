<?php

// src/Validator/Constraints/UniqueSlot.php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class UniqueSlot extends Constraint
{
    public $message = 'This slot is already taken.';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
