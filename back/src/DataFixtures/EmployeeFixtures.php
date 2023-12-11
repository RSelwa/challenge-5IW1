<?php

namespace App\DataFixtures;

use App\Entity\Employee;
use App\DataFixtures\EstablishmentFixtures;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class EmployeeFixtures extends Fixture implements DependentFixtureInterface
{
    const EMPLOYEE_REFERENCE = "antoine-dupont";
    private $passwordHasher = null;
    
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function getDependencies()
    {
        return array(
            EstablishmentFixtures::class,
            ServiceFixtures::class,
        );
    }

    public function load(ObjectManager $manager): void
    {
        $employee = new Employee();
        $employee->setFirstname("Antoine");
        $employee->setLastname("Dupont");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE));
        $employee->setService($this->getReference(ServiceFixtures::SERVICE_REFERENCE));
        $employee->setEmail("employee@test.fr");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));

        $this->addReference(self::EMPLOYEE_REFERENCE, $employee);

        $manager->persist($employee);

        $manager->flush();
    }
}
