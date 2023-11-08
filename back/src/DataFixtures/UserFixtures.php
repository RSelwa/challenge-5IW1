<?php

namespace App\DataFixtures;

use App\Entity\User;
use Symfony\Component\Uid\Uuid;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setId(Uuid::v4());
        $user->setFirstname("user");
        $user->setLastname("test");
        $user->setEmail("user@test.fr");
        $user->setPassword("test");

        $manager->persist($user);
        $manager->flush();

        $manager->flush();
    }
}
