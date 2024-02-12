<?php 

// src/Validator/Constraints/UniqueSlotValidator.php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use App\Repository\SlotRepository;

class HasOneSlotWithEmployeeValidator extends ConstraintValidator
{
    private $slotRepository;

    public function __construct(SlotRepository $slotRepository)
    {
        $this->slotRepository = $slotRepository;
    }

    public function validate($value, Constraint $constraint)
    {
        $user = $value->getIdNotationFrom();
        $employee = $value->getIdNotationTarget();
        $now = time();

        $existingSlot = $this->slotRepository->findByUserAndEmployee($user, $employee, $now);
        if (empty($existingSlot)) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}