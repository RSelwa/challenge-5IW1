<?php

// src/Validator/Constraints/UniqueSlot.php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class NotAlreadyNotated extends Constraint
{
    public $message = "You already notated this employee.";

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
