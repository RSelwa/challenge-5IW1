<?php

namespace App\DataFixtures;

use App\Entity\Employee;
use App\DataFixtures\EstablishmentFixtures;
use Symfony\Component\Uid\Uuid;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

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
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE_1));
        $employee->setService($this->getReference(ServiceFixtures::SERVICE_REFERENCE));
        $employee->setEmail("employee@test.fr");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));

        $this->addReference(self::EMPLOYEE_REFERENCE, $employee);

        $manager->persist($employee);

        $employee = new Employee();
        $employee->setFirstname("Gael");
        $employee->setLastname("Fickou");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE_2));
        $employee->setService($this->getReference(ServiceFixtures::SERVICE_REFERENCE));
        $employee->setEmail("gael@fickou.fr");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));

        $manager->persist($employee);

        $employee = new Employee();
        $employee->setFirstname("Damien");
        $employee->setLastname("Penaud");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE_3));
        $employee->setService($this->getReference(ServiceFixtures::SERVICE_REFERENCE));
        $employee->setEmail("damien@penaud.fr");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));

        $manager->persist($employee);

        $employee = new Employee();
        $employee->setFirstname("Thomas");
        $employee->setLastname("Ramos");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE_4));
        $employee->setService($this->getReference(ServiceFixtures::SERVICE_REFERENCE));
        $employee->setEmail("thomas@ramos.fr");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));

        $manager->persist($employee);

        $employee = new Employee();
        $employee->setFirstname("Matthieu");
        $employee->setLastname("Jalibert");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE_4));
        $employee->setService($this->getReference(ServiceFixtures::SERVICE_REFERENCE));
        $employee->setEmail("matthieu@jalibert.fr");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));

        $manager->persist($employee);

        $manager->flush();
    }
}
