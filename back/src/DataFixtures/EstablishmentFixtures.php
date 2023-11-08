<?php

namespace App\DataFixtures;

use App\Entity\Establishment;
use App\DataFixtures\OrganizationFixtures;
use App\DataFixtures\ServiceFixtures;
use Symfony\Component\Uid\Uuid;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class EstablishmentFixtures extends Fixture implements DependentFixtureInterface
{
    public const ESTABLISHMENT_REFERENCE = "establishment-test";

    public function getDependencies()
    {
        return array(
            OrganizationFixtures::class,
            ServiceFixtures::class,
        );
    }

    public function load(ObjectManager $manager): void
    {
        $establishment = new Establishment();
        $establishment->setId(Uuid::v4());
        $establishment->setName("Etablissement test");
        $establishment->setAddress("200 rue du Faubourg Saint-Antoine");
        $establishment->setCity("Paris");
        $establishment->setZipCode("75012");
        $establishment->setCountry("France");
        $establishment->setOrganization($this->getReference(OrganizationFixtures::ORGANIZATION_REFERENCE));
        $establishment->setService($this->getReference(ServiceFixtures::SERVICE_REFERENCE));

        $this->addReference(self::ESTABLISHMENT_REFERENCE, $establishment);

        $manager->persist($establishment);
        $manager->flush();
    }
}
