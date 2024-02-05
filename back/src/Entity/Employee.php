<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\EmployeeRepository;
use App\State\UserPasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['employee:read', 'slot:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            processor: UserPasswordHasher::class,
            denormalizationContext: ['groups' => 'employee:create'],
        ),
        new Put(
            processor: UserPasswordHasher::class,
            security: "is_granted('ROLE_ADMIN') or object.getId() == user.getId()",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'employee:update'],
        ),
        new Patch(
            processor: UserPasswordHasher::class,
            security: "is_granted('ROLE_ADMIN') or object.getId() == user.getId()",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'employee:update'],
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: "Operation not permitted",
        )
    ],
)]

class Employee implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['organization:read', 'establishment:read', 'employee:read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'employee:read', 'employee:create', 'employee:update'])]
    private ?string $category = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'employee:read', 'employee:create', 'employee:update'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'employee:read', 'employee:create', 'employee:update'])]
    private ?string $lastname = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['employee:read', 'employee:create', 'employee:update'])]
    private ?Establishment $establishment = null;
    
    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: EmployeeSpecificSchedule::class)]
    #[Groups(['establishment:read', 'employee:read'])]
    private Collection $employeeSpecificSchedules;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'employee:create', 'employee:update'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    private ?array $roles = ['ROLE_EMPLOYEE'];

    #[Groups(['employee:create'])]
    private ?string $plainPassword = null;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: EmployeeWeekSchedule::class)]
    #[Groups(['establishment:read', 'employee:read'])]
    private Collection $employeeWeekSchedules;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Service::class)]
    #[Groups(['establishment:read', 'employee:read'])]
    private Collection $services;

    public function __construct()
    {
        $this->employeeSpecificSchedules = new ArrayCollection();
        $this->employeeWeekSchedules = new ArrayCollection();
        $this->services = new ArrayCollection();
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

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): static
    {
        $this->category = $category;

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

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }

    /**
     * @return Collection<int, EmployeeSpecificSchedule>
     */
    public function getEmployeeSpecificSchedules(): Collection
    {
        return $this->employeeSpecificSchedules;
    }

    public function addEmployeeSpecificSchedule(EmployeeSpecificSchedule $employeeSpecificSchedule): static
    {
        if (!$this->employeeSpecificSchedules->contains($employeeSpecificSchedule)) {
            $this->employeeSpecificSchedules->add($employeeSpecificSchedule);
            $employeeSpecificSchedule->setEmployee($this);
        }

        return $this;
    }

    public function removeEmployeeSpecificSchedule(EmployeeSpecificSchedule $employeeSpecificSchedule): static
    {
        if ($this->employeeSpecificSchedules->removeElement($employeeSpecificSchedule)) {
            // set the owning side to null (unless already changed)
            if ($employeeSpecificSchedule->getEmployee() === $this) {
                $employeeSpecificSchedule->setEmployee(null);
            }
        }

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

        $roles[] = 'ROLE_EMPLOYEE';

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
     * @return Collection<int, EmployeeWeekSchedule>
     */
    public function getEmployeeWeekSchedules(): Collection
    {
        return $this->employeeWeekSchedules;
    }

    public function addEmployeeWeekSchedule(EmployeeWeekSchedule $employeeWeekSchedule): static
    {
        if (!$this->employeeWeekSchedules->contains($employeeWeekSchedule)) {
            $this->employeeWeekSchedules->add($employeeWeekSchedule);
            $employeeWeekSchedule->setEmployee($this);
        }

        return $this;
    }

    public function removeEmployeeWeekSchedule(EmployeeWeekSchedule $employeeWeekSchedule): static
    {
        if ($this->employeeWeekSchedules->removeElement($employeeWeekSchedule)) {
            // set the owning side to null (unless already changed)
            if ($employeeWeekSchedule->getEmployee() === $this) {
                $employeeWeekSchedule->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Service>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
            $service->setEmployee($this);
        }

        return $this;
    }

    public function removeService(Service $service): static
    {
        if ($this->services->removeElement($service)) {
            // set the owning side to null (unless already changed)
            if ($service->getEmployee() === $this) {
                $service->setEmployee(null);
            }
        }

        return $this;
    }
}
