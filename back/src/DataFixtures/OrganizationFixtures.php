<?php

namespace App\DataFixtures;

use App\Entity\Organization;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class OrganizationFixtures extends Fixture
{
    public const ORGANIZATION_REFERENCE = "valid-organization";
    private $passwordHasher = null;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function load(ObjectManager $manager): void
    {
        $organization = new Organization();
        $organization->setName("Organization valid test");
        $organization->setManagerFirstname("manager");
        $organization->setManagerLastname("test");
        $organization->setKbisFile(new File(__DIR__ . "/../../public/uploads/file1-fixture"));
        $organization->setKbis("file1-fixture");
        $organization->setEmail("orga.valid@test.fr");
        $organization->setPassword($this->passwordHasher->hashPassword($organization, "test"));
        $organization->setStatus("VALIDATED");

        $this->addReference(self::ORGANIZATION_REFERENCE, $organization);

        $manager->persist($organization);

        $organization = new Organization();
        $organization->setName("Organization pending test");
        $organization->setManagerFirstname("manager");
        $organization->setManagerLastname("test");
        $organization->setKbisFile(new File(__DIR__ . "/../../public/uploads/file2-fixture"));
        $organization->setKbis("file2-fixture");
        $organization->setEmail("orga.pending@test.fr");
        $organization->setPassword($this->passwordHasher->hashPassword($organization, "test"));
        $organization->setStatus("PENDING");

        $manager->persist($organization);

        $manager->flush();
    }
}
