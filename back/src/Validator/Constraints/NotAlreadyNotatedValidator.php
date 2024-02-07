<?php 

// src/Validator/Constraints/UniqueSlotValidator.php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use App\Repository\NotationsRepository;

class NotAlreadyNotatedValidator extends ConstraintValidator
{
    private $notationsRepository;

    public function __construct(NotationsRepository $notationsRepository)
    {
        $this->notationsRepository = $notationsRepository;
    }

    public function validate($value, Constraint $constraint)
    {
        $user = $value->getIdNotationFrom();
        $employee = $value->getIdNotationTarget();

        $existingNotations = $this->notationsRepository->findNotationByUserAndEmployee($user, $employee);
        if (!empty($existingNotations)) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}