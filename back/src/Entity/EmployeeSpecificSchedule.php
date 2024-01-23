<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmployeeSpecificScheduleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmployeeSpecificScheduleRepository::class)]
#[ApiResource(
    denormalizationContext: [ 'groups' => ['employee-specific-schedule:write']]
)]
class EmployeeSpecificSchedule
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['establishment:read', 'employee:read'])]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'employeeSpecificSchedules')]
    #[Groups(['employee-specific-schedule:write'])]
    private ?Employee $employee = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:write'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:write'])]
    private ?string $type = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:write'])]
    private ?string $startTimeMorning = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:write'])]
    private ?string $endTimeMorning = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:write'])]
    private ?string $startTimeAfternoon = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:write'])]
    private ?string $endTimeAfternoon = null;

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

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getStartTimeMorning(): ?string
    {
        return $this->startTimeMorning;
    }

    public function setStartTimeMorning(?string $startTimeMorning): static
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
}
