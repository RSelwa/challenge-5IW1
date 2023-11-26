<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private $passwordHasher = null;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setFirstname("user");
        $user->setLastname("test");
        $user->setEmail("user@test.fr");
        $user->setPassword("test");
        $user->setPassword($this->passwordHasher->hashPassword($user, "test"));

        $manager->persist($user);
        $manager->flush();

        $manager->flush();
    }
}
