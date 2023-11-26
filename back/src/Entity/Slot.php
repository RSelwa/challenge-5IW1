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
    normalizationContext: [ 'groups' => ['get:slot']],
    denormalizationContext: [ 'groups' => ['post:slot']]
)]
class Slot
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['get:slot'])]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'slots')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['post:slot'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'slots')]
    #[Groups(['get:slot', 'post:slot'])]
    private ?Employee $employee = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:establishment', 'get:employee', 'get:slot', 'post:slot'])]
    private ?Date $date = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:establishment', 'get:employee', 'get:slot', 'post:slot'])]
    private ?string $startTime = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:establishment', 'get:employee', 'get:slot', 'post:slot'])]
    private ?string $endTime = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:slot', 'post:slot'])]
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
