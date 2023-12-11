<?php

namespace App\DataFixtures;

use App\Entity\Service;
use Symfony\Component\Uid\Uuid;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ServiceFixtures extends Fixture
{
    public const SERVICE_REFERENCE = "kine-service";

    public function load(ObjectManager $manager): void
    {
        $serviceNames = array("Dentiste", "Cardiologue", "Nutritionniste", "Généraliste", "Kinésithérapeute");

        foreach ($serviceNames as $serviceName) {
            $service = new Service();
            $service->setId(Uuid::v4());
            $service->setName($serviceName);
            $manager->persist($service);
        }

        $this->addReference(self::SERVICE_REFERENCE, $service);

        $manager->flush();
    }
}
