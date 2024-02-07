<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\NotationsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Validator\Constraints as AcmeAssert;

#[ORM\Entity(repositoryClass: NotationsRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            securityPostDenormalize: "is_granted('ROLE_ADMIN') or object.getIdNotationFrom().getId() == user.getId()",
            securityPostDenormalizeMessage: "Operation not permitted",
            denormalizationContext: ['groups' => 'notation:create'],
        ),
        new Put(
            security: "is_granted('ROLE_ADMIN') or object.getIdNotationFrom().getId() == user.getId()",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'notation:update'],
        ),
        new Patch(
            security: "is_granted('ROLE_ADMIN') or object.getIdNotationFrom().getId() == user.getId()",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'notation:update'],
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN') or object.getIdNotationFrom().getId() == user.getId()",
            securityMessage: "Operation not permitted",
        )
    ],
)]
#[AcmeAssert\HasOneSlotWithEmployee]
#[AcmeAssert\NotAlreadyNotated]
class Notations
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['employee:read', 'user:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['employee:read', 'user:read', 'notation:create', 'notation:update'])]
    private ?int $note = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['employee:read', 'user:read', 'notation:create', 'notation:update'])]
    private ?string $comment = null;

    #[ORM\ManyToOne(inversedBy: 'notations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['employee:read', 'user:read', 'notation:create'])]
    private ?Employee $idNotationTarget = null;

    #[ORM\ManyToOne(inversedBy: 'notations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['employee:read', 'user:read', 'notation:create'])]
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
