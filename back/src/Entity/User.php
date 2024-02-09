<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
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
use App\Validator\Constraints as AcmeAssert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: "\"user\"")]
#[ApiResource(
    normalizationContext: [ 'groups' => ['user:read']],
    operations: [
        new Get(
            security: "
                is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_USER') and object.getId() == user.getId())
            ",
        ),
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Post(
            processor: UserPasswordHasher::class,
            denormalizationContext: ['groups' => 'user:create'],
            validationContext: ['groups' => 'user:create']
        ),
        new Put(
            processor: UserPasswordHasher::class,
            security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_USER') and object.getId() == user.getId())",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'user:update'],
        ),
        new Patch(
            processor: UserPasswordHasher::class,
            security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_USER') and object.getId() == user.getId())",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'user:update'],
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: "Operation not permitted",
        )
    ],
)]

class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['user:read', 'slot:read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:create'])]
    #[AcmeAssert\UniqueEmail(groups: ['user:create'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Slot::class)]
    #[Groups(['user:read'])]
    private Collection $slots;

    private ?array $roles = ['ROLE_USER'];

    #[Groups(['user:create', 'user:update'])]
    private ?string $plainPassword = null;

    #[ORM\OneToMany(mappedBy: 'idNotationFrom', targetEntity: Notations::class, orphanRemoval: true)]
    #[Groups(['user:read'])]
    private Collection $notations;


    public function __construct()
    {
        $this->slots = new ArrayCollection();
        $this->notations = new ArrayCollection();
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
}
