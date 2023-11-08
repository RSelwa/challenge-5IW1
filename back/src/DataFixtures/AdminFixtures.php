<?php

namespace App\DataFixtures;

use App\Entity\Admin;
use Symfony\Component\Uid\Uuid;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AdminFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $admin = new Admin();
        $admin->setId(Uuid::v4());
        $admin->setEmail("admin@test.fr");
        $admin->setPassword("test");

        $manager->persist($admin);
        $manager->flush();
    }
}
