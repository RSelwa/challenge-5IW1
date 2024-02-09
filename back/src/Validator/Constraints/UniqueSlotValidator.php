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
        $id = $value->getId() ?? "83149663-a49e-4527-80d7-8e0a3a881435";

        // Vérification si le créneau est déjà pris
        $existingSlots = $this->slotRepository->findByTime($startTime, $endTime, $service, $id);
        if (!empty($existingSlots)) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}