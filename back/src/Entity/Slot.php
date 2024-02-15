<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\SlotRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Validator\Constraints as AcmeAssert;

#[ORM\Entity(repositoryClass: SlotRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['slot:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_USER') and (object == null or (object.getUser() != null and object.getUser().getId() == user.getId())))
            ",
            securityPostDenormalizeMessage: "Operation not permitted",
            denormalizationContext: ['groups' => 'slot:create'],
            normalizationContext: ['groups' => 'slot:response'],
        ),
        new Patch(
            security: "
                is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_EMPLOYEE') and object.getService().getEmployee().getId() == user.getId())
                or (is_granted('ROLE_USER') and object.getUser().getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'slot:update'],
            normalizationContext: ['groups' => 'slot:response'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_EMPLOYEE') and object.getService().getEmployee().getId() == user.getId())
                or (is_granted('ROLE_USER') and object.getUser().getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
        )
    ]
)]
#[AcmeAssert\UniqueSlot]
class Slot
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['slot:read', 'slot:response', 'user:read'])]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'slots')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['slot:read', 'slot:response', 'slot:create'])]
    #[ApiProperty(
        security: "
            is_granted('ROLE_ADMIN')
            or (is_granted('ROLE_USER') and (object == null or (object.getUser() != null and object.getUser().getId() == user.getId())))
            or (is_granted('ROLE_EMPLOYEE') and object.getService().getEmployee().getId() == user.getId())
            or (is_granted('ROLE_ORGANIZATION') and object.getService().getEmployee().getEstablishment().getOrganization().getId() == user.getId())
        ",
        securityPostDenormalize: "
            is_granted('ROLE_ADMIN') 
            or (is_granted('ROLE_USER') and object.getUser().getId() == user.getId())
            or (is_granted('ROLE_EMPLOYEE') and object.getService().getEmployee().getId() == user.getId())
            or (is_granted('ROLE_ORGANIZATION') and object.getService().getEmployee().getEstablishment().getOrganization().getId() == user.getId())
        ",
    )]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'slot:read', 'slot:response', 'user:read', 'slot:create', 'slot:update'])]
    #[Assert\GreaterThanOrEqual('today')]
    private ?int $startTime = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'slot:read', 'slot:response', 'user:read', 'slot:create'])]
    private ?int $duration = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'slot:read', 'slot:response', 'user:read', 'slot:create', 'slot:update'])]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'slots')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['establishment:read', 'employee:read', 'slot:read', 'slot:create', 'user:read'])]
    private ?Service $service = null;

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
    
    public function getStartTime(): ?string
    {
        return $this->startTime;
    }

    public function setStartTime(int $startTime): static
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getDuration(): ?string
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

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
