<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmployeeWeekTimeTableRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EmployeeWeekTimeTableRepository::class)]
#[ApiResource]
class EmployeeWeekTimeTable
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'employeeWeekTimeTables')]
    private ?Employee $employee = null;

    #[ORM\Column(length: 255)]
    private ?string $dayOfTheWeek = null;

    #[ORM\Column(length: 255)]
    private ?string $startTime = null;

    #[ORM\Column(length: 255)]
    private ?string $endTime = null;

    public function __construct()
    {
        $this->employee = new ArrayCollection();
    }

    public function getId(): ?int
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
