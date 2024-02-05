<?php

namespace App\DataFixtures;

use App\Entity\Employee;
use App\DataFixtures\EstablishmentFixtures;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class EmployeeFixtures extends Fixture implements DependentFixtureInterface
{
    public const EMPLOYEE_REFERENCE = "antoine-dupont";

    private $passwordHasher = null;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    
    public function getDependencies()
    {
        return array(
            EstablishmentFixtures::class,
        );
    }

    public function load(ObjectManager $manager): void
    {
        $employee = new Employee();
        $employee->setFirstname("Antoine");
        $employee->setLastname("Dupont");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE_1));
        $employee->setEmail("antoine-dupont@yopmail.com");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));
        $employee->setCategory("Kinésithérapeute");

        $this->addReference(self::EMPLOYEE_REFERENCE, $employee);

        $manager->persist($employee);

        $employee = new Employee();
        $employee->setFirstname("Gael");
        $employee->setLastname("Fickou");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE_2));
        $employee->setEmail("gael-fickou@yopmail.com");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));
        $employee->setCategory("Généraliste");

        $manager->persist($employee);

        $employee = new Employee();
        $employee->setFirstname("Damien");
        $employee->setLastname("Penaud");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE_3));
        $employee->setEmail("damien-penaud@yopmail.com");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));
        $employee->setCategory("Dentiste");

        $manager->persist($employee);

        $employee = new Employee();
        $employee->setFirstname("Thomas");
        $employee->setLastname("Ramos");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE_4));
        $employee->setEmail("thomas-ramos@yopmail.com");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));
        $employee->setCategory("Cardiologue");

        $manager->persist($employee);

        $employee = new Employee();
        $employee->setFirstname("Matthieu");
        $employee->setLastname("Jalibert");
        $employee->setEstablishment($this->getReference(EstablishmentFixtures::ESTABLISHMENT_REFERENCE_4));
        $employee->setEmail("matthieu-jalibert@yopmail.com");
        $employee->setPassword($this->passwordHasher->hashPassword($employee, "test"));
        $employee->setCategory("Radiologue");

        $manager->persist($employee);

        $manager->flush();
    }
}
