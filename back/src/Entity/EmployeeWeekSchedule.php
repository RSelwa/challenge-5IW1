<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmployeeWeekScheduleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmployeeWeekScheduleRepository::class)]
#[ApiResource(
    denormalizationContext: [ 'groups' => ['employee-week-schedule:write','employee-week-schedule:update']],
)]
class EmployeeWeekSchedule
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'employeeWeekSchedules')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:write'])]
    private ?Employee $employee = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:write'])]
    private ?string $startTimeMorning = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:write'])]
    private ?string $endTimeMorning = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:write'])]
    private ?string $startTimeAfternoon = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:write'])]
    private ?string $endTimeAfternoon = null;

    #[ORM\Column]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:write'])]
    private ?int $day = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getStartTimeMorning(): ?string
    {
        return $this->startTimeMorning;
    }

    public function setStartTimeMorning(string $startTimeMorning): static
    {
        $this->startTimeMorning = $startTimeMorning;

        return $this;
    }

    public function getEndTimeMorning(): ?string
    {
        return $this->endTimeMorning;
    }

    public function setEndTimeMorning(?string $endTimeMorning): static
    {
        $this->endTimeMorning = $endTimeMorning;

        return $this;
    }

    public function getStartTimeAfternoon(): ?string
    {
        return $this->startTimeAfternoon;
    }

    public function setStartTimeAfternoon(?string $startTimeAfternoon): static
    {
        $this->startTimeAfternoon = $startTimeAfternoon;

        return $this;
    }

    public function getEndTimeAfternoon(): ?string
    {
        return $this->endTimeAfternoon;
    }

    public function setEndTimeAfternoon(?string $endTimeAfternoon): static
    {
        $this->endTimeAfternoon = $endTimeAfternoon;

        return $this;
    }

    public function getDay(): ?int
    {
        return $this->day;
    }

    public function setDay(int $day): static
    {
        $this->day = $day;

        return $this;
    }
}
