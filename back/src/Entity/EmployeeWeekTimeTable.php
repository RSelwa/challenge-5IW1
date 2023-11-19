<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmployeeWeekTimeTableRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmployeeWeekTimeTableRepository::class)]
#[ApiResource(
    denormalizationContext: [ 'groups' => ['post:employee-week-time-table']]
)]
class EmployeeWeekTimeTable
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['get:establishment', 'get:employee'])]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'employeeWeekTimeTables')]
    #[Groups(['post:employee-week-time-table'])]
    private ?Employee $employee = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:establishment', 'get:employee', 'post:employee-week-time-table'])]
    private ?string $dayOfTheWeek = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:establishment', 'get:employee', 'post:employee-week-time-table'])]
    private ?string $startTime = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:establishment', 'get:employee', 'post:employee-week-time-table'])]
    private ?string $endTime = null;

    public function getId(): ?string
    {
        return $this->id;
    }
    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getEmployee(): ?Employee
    {
        return $this->employee;
    }

    public function setEmployee(?Employee $employee): static
    {
        $this->employee = $employee;

        return $this;
    }

    public function getDayOfTheWeek(): ?string
    {
        return $this->dayOfTheWeek;
    }

    public function setDayOfTheWeek(string $dayOfTheWeek): static
    {
        $this->dayOfTheWeek = $dayOfTheWeek;

        return $this;
    }

    public function getStartTime(): ?string
    {
        return $this->startTime;
    }

    public function setStartTime(string $startTime): static
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?string
    {
        return $this->endTime;
    }

    public function setEndTime(string $endTime): static
    {
        $this->endTime = $endTime;

        return $this;
    }
}
