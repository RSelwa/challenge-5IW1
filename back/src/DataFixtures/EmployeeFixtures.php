<?php

namespace App\DataFixtures;

use App\Entity\Employee;
use App\DataFixtures\EstablishmentFixtures;
use Symfony\Component\Uid\Uuid;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class EmployeeFixtures extends Fixture implements DependentFixtureInterface
{
    const EMPLOYEE_REFERENCE = "antoine-dupont";
    
    public function getDependencies()
    {
        return array(
            EstablishmentFixtures::class,
        );
    }

    public function load(ObjectManager $manager): void
    {
        $employee = new Employee();
        $employee->setId(Uuid::v4());
        $employee->setFirstname("Antoine");
        $employee->setLastname("Dupont");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE));

        $this->addReference(self::EMPLOYEE_REFERENCE, $employee);

        $manager->persist($employee);

        $manager->flush();
    }
}