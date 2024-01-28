<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\NotationsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NotationsRepository::class)]
#[ApiResource]
class Notations
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $note = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $comment = null;

    #[ORM\ManyToOne(inversedBy: 'notations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Employee $idNotationTarget = null;

    #[ORM\ManyToOne(inversedBy: 'notations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $idNotationFrom = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        $this->note = $note;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getIdNotationTarget(): ?Employee
    {
        return $this->idNotationTarget;
    }

    public function setIdNotationTarget(?Employee $idNotationTarget): static
    {
        $this->idNotationTarget = $idNotationTarget;

        return $this;
    }

    public function getIdNotationFrom(): ?User
    {
        return $this->idNotationFrom;
    }

    public function setIdNotationFrom(?User $idNotationFrom): static
    {
        $this->idNotationFrom = $idNotationFrom;

        return $this;
    }
}
