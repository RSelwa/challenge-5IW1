<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\EmployeeRepository;
use App\State\UserPasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Validator\Constraints as AcmeAssert;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: [ 'groups' => ['employee:read', 'slot:read']],
        ),
        new Get(
            security: "
                is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_EMPLOYEE') and object.getId() == user.getId())
                or (is_granted('ROLE_ORGANIZATION') and object.getEstablishment().getOrganization().getId() == user.getId())
            ",
            normalizationContext: [ 'groups' => ['admin:employee:read']]
        ),
        new GetCollection(
            normalizationContext: [ 'groups' => ['employee:read', 'slot:read']]
        ),
        new Post(
            processor: UserPasswordHasher::class,
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_ORGANIZATION') and object.getEstablishment().getOrganization().getId() == user.getId())
            ",
            denormalizationContext: ['groups' => 'employee:create'],
            validationContext: ['groups' => 'employee:create'],
        ),
        new Patch(
            processor: UserPasswordHasher::class,
            security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_EMPLOYEE') and object.getId() == user.getId())",
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
    #[Groups(['organization:read', 'establishment:read', 'employee:read', 'admin:employee:read', 'slot:read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'employee:read', 'admin:employee:read', 'employee:create', 'employee:update'])]
    private ?string $category = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'employee:read', 'admin:employee:read', 'employee:create', 'employee:update'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'employee:read', 'admin:employee:read', 'employee:create', 'employee:update'])]
    private ?string $lastname = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'SET NULL')]
    #[Groups(['employee:read', 'admin:employee:read', 'employee:create'])]
    private ?Establishment $establishment = null;
    
    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: EmployeeSpecificSchedule::class)]
    #[Groups(['establishment:read', 'employee:read', 'admin:employee:read'])]
    private Collection $employeeSpecificSchedules;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:create'])]
    #[AcmeAssert\UniqueEmail(groups: ['employee:create'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    private ?array $roles = ['ROLE_EMPLOYEE'];

    #[Groups(['employee:create'])]
    #[Assert\Length(min: 4)]
    private ?string $plainPassword = null;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: EmployeeWeekSchedule::class)]
    #[Groups(['establishment:read', 'employee:read', 'admin:employee:read'])]
    private Collection $employeeWeekSchedules;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Service::class)]
    #[Groups(['establishment:read', 'employee:read', 'admin:employee:read'])]
    private Collection $services;

    #[ORM\OneToMany(mappedBy: 'idNotationTarget', targetEntity: Notations::class, orphanRemoval: true)]
    #[Groups(['employee:read'])]
    private Collection $notations;

    public function __construct()
    {
        $this->employeeSpecificSchedules = new ArrayCollection();
        $this->employeeWeekSchedules = new ArrayCollection();
        $this->services = new ArrayCollection();
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

    public function getNotations(): Collection
    {
        return $this->notations;
    }

    public function addNotations(Notations $notations): static
    {
        if (!$this->notations->contains($notations)) {
            $this->notations->add($notations);
            $notations->setIdNotationTarget($this);
        }

        return $this;
    }

    public function removeNotations(Notations $notations): static
    {
        if ($this->notations->removeElement($notations)) {
            // set the owning side to null (unless already changed)
            if ($notations->getIdNotationTarget() === $this) {
                $notations->setIdNotationTarget(null);
            }
        }

        return $this;
    }
}
