<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SlotRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Date;

#[ORM\Entity(repositoryClass: SlotRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['slot:read']],
    denormalizationContext: [ 'groups' => ['slot:read']]
)]
class Slot
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['slot:read'])]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'slots')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['slot:read'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'slots')]
    #[Groups(['slot:read', 'slot:read'])]
    private ?Employee $employee = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'slot:read', 'slot:read'])]
    private ?Date $date = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'slot:read', 'slot:read'])]
    private ?string $startTime = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'slot:read', 'slot:read'])]
    private ?string $endTime = null;

    #[ORM\Column(length: 255)]
    #[Groups(['slot:read', 'slot:read'])]
    private ?string $status = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

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
    
    public function getEmployee(): ?Employee
    {
        return $this->employee;
    }

    public function setEmployee(?Employee $employee): static
    {
        $this->employee = $employee;

        return $this;
    }

    public function getDate(): ?Date
    {
        return $this->date;
    }

    public function setDate(Date $date): static
    {
        $this->date = $date;

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
