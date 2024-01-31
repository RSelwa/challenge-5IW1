<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Get;
use App\Repository\UserRepository;
use App\State\UserPasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: "\"user\"")]
#[ApiResource(
    normalizationContext: [ 'groups' => ['user:read', 'slot:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(processor: UserPasswordHasher::class),
        new Put(processor: UserPasswordHasher::class),
        new Patch(
            normalizationContext: ['groups' => 'user-read-update'],
            denormalizationContext: ['groups' => 'user-update'],
            validationContext: ['groups' => 'user-update']
        ),
    ],
)]

class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['user:read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user-read-update', 'user-update'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user-read-update', 'user-update'])]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user-read-update', 'user-update'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Slot::class)]
    #[Groups(['user:read'])]
    private Collection $slots;

    private ?array $roles = ['ROLE_USER'];

    #[Groups(['user:write'])]
    private ?string $plainPassword = null;

    #[ORM\OneToMany(mappedBy: 'idNotationFrom', targetEntity: Notations::class, orphanRemoval: true)]
    private Collection $notations;

    #[ORM\OneToMany(mappedBy: 'user_id', targetEntity: Reservation::class)]
    private Collection $reservations;


    public function __construct()
    {
        $this->slots = new ArrayCollection();
        $this->notations = new ArrayCollection();
        $this->reservations = new ArrayCollection();
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

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

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
            $slot->setUser($this);
        }

        return $this;
    }

    public function removeSlot(Slot $slot): static
    {
        if ($this->slots->removeElement($slot)) {
            // set the owning side to null (unless already changed)
            if ($slot->getUser() === $this) {
                $slot->setUser(null);
            }
        }

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->id;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Notations>
     */
    public function getNotations(): Collection
    {
        return $this->notations;
    }

    public function addNotation(Notations $notation): static
    {
        if (!$this->notations->contains($notation)) {
            $this->notations->add($notation);
            $notation->setIdNotationFrom($this);
        }

        return $this;
    }

    public function removeNotation(Notations $notation): static
    {
        if ($this->notations->removeElement($notation)) {
            // set the owning side to null (unless already changed)
            if ($notation->getIdNotationFrom() === $this) {
                $notation->setIdNotationFrom(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setUserId($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getUserId() === $this) {
                $reservation->setUserId(null);
            }
        }

        return $this;
    }
}
