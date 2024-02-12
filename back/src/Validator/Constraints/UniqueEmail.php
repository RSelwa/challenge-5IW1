<?php

// src/Validator/Constraints/UniqueSlot.php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class UniqueEmail extends Constraint
{
    public $message = 'Email already exist.';

}
