<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\EmployeeWeekScheduleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmployeeWeekScheduleRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_ORGANIZATION') and object.getEmployee().getEstablishment().getOrganization().getId() == user.getId())
            ",
            securityPostDenormalizeMessage: "Operation not permitted",
            denormalizationContext: ['groups' => 'employee-week-schedule:create'],
        ),
        new Put(
            security: "
                is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_ORGANIZATION') and object.getEmployee().getEstablishment().getOrganization().getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'employee-week-schedule:update'],
        ),
        new Patch(
            security: "
                is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_ORGANIZATION') and object.getEmployee().getEstablishment().getOrganization().getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'employee-week-schedule:update'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_ORGANIZATION') and object.getEmployee().getEstablishment().getOrganization().getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
        )
    ],
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
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:create'])]
    private ?Employee $employee = null;

    #[ORM\Column]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:create', 'employee-week-schedule:update'])]
    private ?int $startTimeMorning = null;

    #[ORM\Column]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:create', 'employee-week-schedule:update'])]
    private ?int $endTimeMorning = null;

    #[ORM\Column]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:create', 'employee-week-schedule:update'])]
    private ?int $startTimeAfternoon = null;

    #[ORM\Column]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:create', 'employee-week-schedule:update'])]
    private ?int $endTimeAfternoon = null;

    #[ORM\Column]
    #[Groups(['establishment:read', 'employee:read', 'employee-week-schedule:create', 'employee-week-schedule:update'])]
    private ?int $day = null;

    public function getId(): ?string
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

    public function getStartTimeMorning(): ?int
    {
        return $this->startTimeMorning;
    }

    public function setStartTimeMorning(int $startTimeMorning): static
    {
        $this->startTimeMorning = $startTimeMorning;

        return $this;
    }

    public function getEndTimeMorning(): ?int
    {
        return $this->endTimeMorning;
    }

    public function setEndTimeMorning(?int $endTimeMorning): static
    {
        $this->endTimeMorning = $endTimeMorning;

        return $this;
    }

    public function getStartTimeAfternoon(): ?int
    {
        return $this->startTimeAfternoon;
    }

    public function setStartTimeAfternoon(?int $startTimeAfternoon): static
    {
        $this->startTimeAfternoon = $startTimeAfternoon;

        return $this;
    }

    public function getEndTimeAfternoon(): ?int
    {
        return $this->endTimeAfternoon;
    }

    public function setEndTimeAfternoon(?int $endTimeAfternoon): static
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
