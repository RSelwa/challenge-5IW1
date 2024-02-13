<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ServiceRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['service:read', 'employee:read', 'user:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_EMPLOYEE') and object.getEmployee().getId() == user.getId())
            ",
            securityPostDenormalizeMessage: "Operation not permitted",
            denormalizationContext: ['groups' => 'service:create'],
        ),
        new Patch(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_EMPLOYEE') and object.getEmployee().getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'service:update'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_EMPLOYEE') and object.getEmployee().getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
        )
    ]
)]
class Service
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['service:read', 'employee:read', 'user:read', 'slot:read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['service:read', 'employee:read', 'user:read', 'service:create', 'service:update'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['service:read', 'employee:read', 'user:read', 'service:create', 'service:update'])]
    private ?int $duration = null;

    #[ORM\ManyToOne(inversedBy: 'services')]
    #[Groups(['establishment:read', 'employee:read', 'user:read', 'service:create', 'slot:read'])]
    private ?Employee $employee = null;

    #[ORM\Column]
    #[Groups(['employee:read', 'user:read', 'service:update', 'service:create', 'slot:read'])]
    private ?int $price = null;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Slot::class)]
    #[Groups(['establishment:read', 'employee:read', 'slot:read'])]
    private Collection $slots;

    public function __construct()
    {
        $this->slots = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

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

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection<int, Slot>
     */
    public function getSlots(): Collection
    {
        return $this->slots;
    }

    public function addSlot(Slot $slot): static
    {
        if (!$this->slots->contains($slot)) {
            $this->slots->add($slot);
            $slot->setService($this);
        }

        return $this;
    }

    public function removeSlot(Slot $slot): static
    {
        if ($this->slots->removeElement($slot)) {
            // set the owning side to null (unless already changed)
            if ($slot->getService() === $this) {
                $slot->setService(null);
            }
        }

        return $this;
    }
}
