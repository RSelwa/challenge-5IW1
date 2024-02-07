<?php 

// src/Validator/Constraints/UniqueSlotValidator.php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use App\Repository\SlotRepository;

class UniqueSlotValidator extends ConstraintValidator
{
    private $slotRepository;

    public function __construct(SlotRepository $slotRepository)
    {
        $this->slotRepository = $slotRepository;
    }

    public function validate($value, Constraint $constraint)
    {
        // Calcul de l'heure de fin
        $startTime = $value->getStartTime();
        $duration = $value->getDuration() * 60;
        $endTime = $startTime + $duration;
        $service = $value->getService();

        // Vérification si le créneau est déjà pris
        $existingSlots = $this->slotRepository->findSlotByTime($startTime, $endTime, $service);
        if (!empty($existingSlots)) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}