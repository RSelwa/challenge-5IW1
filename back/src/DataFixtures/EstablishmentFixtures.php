<?php

namespace App\DataFixtures;

use App\Entity\Establishment;
use App\DataFixtures\OrganizationFixtures;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class EstablishmentFixtures extends Fixture implements DependentFixtureInterface
{
    public const ESTABLISHMENT_REFERENCE_1 = "establishment-1";
    public const ESTABLISHMENT_REFERENCE_2 = "establishment-2";
    public const ESTABLISHMENT_REFERENCE_3 = "establishment-3";
    public const ESTABLISHMENT_REFERENCE_4 = "establishment-4";

    public function getDependencies()
    {
        return array(
            OrganizationFixtures::class,
        );
    }

    public function load(ObjectManager $manager): void
    {
        $establishment = new Establishment();
        $establishment->setName("Etablissement 1");
        $establishment->setAddress("6 avenue Daniel Lesueur");
        $establishment->setCity("Paris");
        $establishment->setZipCode("75007");
        $establishment->setCountry("France");
        $establishment->setLat(48.8475271);
        $establishment->setLng(2.314554);
        $establishment->setOrganization($this->getReference(OrganizationFixtures::ORGANIZATION_REFERENCE));

        $this->addReference(self::ESTABLISHMENT_REFERENCE_1, $establishment);

        $manager->persist($establishment);

        $establishment = new Establishment();
        $establishment->setName("Etablissement 2");
        $establishment->setAddress("29 rue du Louvre");
        $establishment->setCity("Paris");
        $establishment->setZipCode("75002");
        $establishment->setCountry("France");
        $establishment->setLat(48.8660476);
        $establishment->setLng(2.3419182);
        $establishment->setOrganization($this->getReference(OrganizationFixtures::ORGANIZATION_REFERENCE));
        
        $this->addReference(self::ESTABLISHMENT_REFERENCE_2, $establishment);
        
        $manager->persist($establishment);

        $establishment = new Establishment();
        $establishment->setName("Etablissement 3");
        $establishment->setAddress("200 rue du Faubourg Saint-Antoine");
        $establishment->setCity("Paris");
        $establishment->setZipCode("75012");
        $establishment->setCountry("France");
        $establishment->setLat(48.8498179);
        $establishment->setLng(2.3846857);
        $establishment->setOrganization($this->getReference(OrganizationFixtures::ORGANIZATION_REFERENCE));

        $this->addReference(self::ESTABLISHMENT_REFERENCE_3, $establishment);
        
        $manager->persist($establishment);


        $establishment = new Establishment();
        $establishment->setName("Etablissement 4");
        $establishment->setAddress("211 rue du Faubourg Saint-Antoine");
        $establishment->setCity("Paris");
        $establishment->setZipCode("75012");
        $establishment->setCountry("France");
        $establishment->setLat(48.850227);
        $establishment->setLng(2.383329);
        $establishment->setOrganization($this->getReference(OrganizationFixtures::ORGANIZATION_REFERENCE));

        $this->addReference(self::ESTABLISHMENT_REFERENCE_4, $establishment);
        
        $manager->persist($establishment);
        $manager->flush();
    }
}
