<?php

namespace App\Entity;

use App\Repository\NotationsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NotationsRepository::class)]
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

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $idNotationTarget = null;

    #[ORM\ManyToOne(inversedBy: 'notations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $idNotationFrom = null;

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

    public function getIdNotationTarget(): ?user
    {
        return $this->idNotationTarget;
    }

    public function setIdNotationTarget(?user $idNotationTarget): static
    {
        $this->idNotationTarget = $idNotationTarget;

        return $this;
    }

    public function getIdNotationFrom(): ?user
    {
        return $this->idNotationFrom;
    }

    public function setIdNotationFrom(?user $idNotationFrom): static
    {
        $this->idNotationFrom = $idNotationFrom;

        return $this;
    }
}
