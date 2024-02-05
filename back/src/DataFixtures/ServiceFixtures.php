<?php

namespace App\DataFixtures;

use App\Entity\Service;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ServiceFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies()
    {
        return array(
            EmployeeFixtures::class,
        );
    }

    public function load(ObjectManager $manager): void
    {
        $serviceNames = array("Préstation 1", "Préstation 2", "Préstation 3");
        $serviceDurations = array(1, 2, 1);
        $servicePrices = array(50, 70, 70);

        foreach ($serviceNames as  $index => $serviceName) {
            $service = new Service();
            $service->setName($serviceName);
            $service->setDuration($serviceDurations[$index]);
            $service->setPrice($servicePrices[$index]);
            $service->setEmployee($this->getReference(EmployeeFixtures::EMPLOYEE_REFERENCE));
            $manager->persist($service);
        }

        $manager->flush();
    }
}
