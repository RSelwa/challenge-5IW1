<?php

namespace App\DataFixtures;

use App\Entity\Organization;
use Symfony\Component\Uid\Uuid;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class OrganizationFixtures extends Fixture
{
    public const ORGANIZATION_REFERENCE = "valid-organization";

    public function load(ObjectManager $manager): void
    {
        $organization = new Organization();
        $organization->setId(Uuid::v4());
        $organization->setName("Organization valid test");
        $organization->setManagerFirstname("manager");
        $organization->setManagerLastname("test");
        $organization->setKbis("kbis link");
        $organization->setEmail("orga.valid@test.fr");
        $organization->setPassword("test");
        $organization->setStatus("VALIDATED");

        $this->addReference(self::ORGANIZATION_REFERENCE, $organization);

        $manager->persist($organization);

        $organization = new Organization();
        $organization->setId(Uuid::v4());
        $organization->setName("Organization pending test");
        $organization->setManagerFirstname("manager");
        $organization->setManagerLastname("test");
        $organization->setKbis("kbis link");
        $organization->setEmail("orga.pending@test.fr");
        $organization->setPassword("test");
        $organization->setStatus("PENDING");

        $manager->persist($organization);

        $manager->flush();
    }
}
