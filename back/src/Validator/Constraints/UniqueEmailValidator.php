<?php 

// src/Validator/Constraints/UniqueSlotValidator.php
namespace App\Validator\Constraints;

use App\Repository\AdminRepository;
use App\Repository\EmployeeRepository;
use App\Repository\OrganizationRepository;
use App\Repository\UserRepository;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class NotAlreadyNotatedValidator extends ConstraintValidator
{
    private $userRepository;
    private $employeeRepository;
    private $organizationRepository;
    private $adminRepository;

    public function __construct(
      UserRepository $userRepository,
      EmployeeRepository $employeeRepository,
      OrganizationRepository $organizationRepository,
      AdminRepository $adminRepository,
    )
    {
        $this->userRepository = $userRepository;
        $this->employeeRepository = $employeeRepository;
        $this->organizationRepository = $organizationRepository;
        $this->adminRepository = $adminRepository;
    }

    public function validate($email, Constraint $constraint)
    {
        $existingUser = $this->userRepository->findNotationByUserAndEmployee($email);
        $existingEmployee = $this->employeeRepository->findNotationByUserAndEmployee($email);
        $existingOrganization = $this->organizationRepository->findNotationByUserAndEmployee($email);
        $existingAdmin = $this->adminRepository->findNotationByUserAndEmployee($email);

        if (!empty($existingUser) || !empty($existingEmployee) || !empty($existingOrganization) || !empty($existingAdmin)) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}