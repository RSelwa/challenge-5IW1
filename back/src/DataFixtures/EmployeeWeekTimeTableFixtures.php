<?php

namespace App\DataFixtures;

use App\Entity\EmployeeWeekTimeTable;
use App\DataFixtures\EmployeeFixtures;
use Symfony\Component\Uid\Uuid;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class EmployeeWeekTimeTableFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies()
    {
        return array(
            EmployeeFixtures::class
        );
    }

    public function load(ObjectManager $manager): void
    {
        $days = array("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY");

        foreach($days as $day) {
            $employeeWeekTimeTable = new EmployeeWeekTimeTable();
            $employeeWeekTimeTable->setId(Uuid::v4());
            $employeeWeekTimeTable->setEmployee($this->getReference(EmployeeFixtures::EMPLOYEE_REFERENCE));
            $employeeWeekTimeTable->setDayOfTheWeek($day);
            $employeeWeekTimeTable->setStartTime("9:00");
            $employeeWeekTimeTable->setEndTime("13:00");

            $manager->persist($employeeWeekTimeTable);
        }
        foreach($days as $day) {
            $employeeWeekTimeTable = new EmployeeWeekTimeTable();
            $employeeWeekTimeTable->setId(Uuid::v4());
            $employeeWeekTimeTable->setEmployee($this->getReference(EmployeeFixtures::EMPLOYEE_REFERENCE));
            $employeeWeekTimeTable->setDayOfTheWeek($day);
            $employeeWeekTimeTable->setStartTime("14:00");
            $employeeWeekTimeTable->setEndTime("17:00");

            $manager->persist($employeeWeekTimeTable);
        }

        $manager->flush();
    }
}
