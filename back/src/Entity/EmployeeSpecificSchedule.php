<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\EmployeeSpecificScheduleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmployeeSpecificScheduleRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            securityPostDenormalize: "
                 is_granted('ROLE_ADMIN') 
                 or object.getEmployee().getId() == user.getId() 
                 or object.getEmployee().getEstablishment().getOrganization().getId() == user.getId()
            ",
            securityPostDenormalizeMessage: "Operation not permitted",
            denormalizationContext: ['groups' => 'employee-specific-schedule:create'],
        ),
        new Put(
            securityPostDenormalize: "
                 is_granted('ROLE_ADMIN')
                 or object.getEmployee().getEstablishment().getOrganization().getId() == user.getId()
            ",
            securityPostDenormalizeMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'employee-specific-schedule:update'],
        ),
        new Patch(
            securityPostDenormalize: "
                 is_granted('ROLE_ADMIN')
                 or object.getEmployee().getEstablishment().getOrganization().getId() == user.getId()
            ",
            securityPostDenormalizeMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'employee-specific-schedule:update'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or object.getEmployee().getEstablishment().getOrganization().getId() == user.getId()
            ",
            securityMessage: "Operation not permitted",
        )
    ],
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
    #[Groups(['employee-specific-schedule:create'])]
    private ?Employee $employee = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:create', 'employee-specific-schedule:update'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:create', 'employee-specific-schedule:update'])]
    private ?string $type = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:create', 'employee-specific-schedule:update'])]
    private ?string $startTimeMorning = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:create', 'employee-specific-schedule:update'])]
    private ?string $endTimeMorning = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:create', 'employee-specific-schedule:update'])]
    private ?string $startTimeAfternoon = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:create', 'employee-specific-schedule:update'])]
    private ?string $endTimeAfternoon = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'employee-specific-schedule:create', 'employee-specific-schedule:update'])]
    #[ApiProperty(
        securityPostDenormalize: "
            is_granted('ROLE_ADMIN') 
            or object.getEmployee().getEstablishment().getOrganization().getId() == user.getId()
        ",
    )]
    private ?string $status = "PENDING";

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }
}
