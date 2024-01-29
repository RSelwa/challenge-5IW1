<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ServiceRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['service:read', 'employee:read']]
)]

class Service
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['service:read', 'employee:read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['service:read', 'employee:read'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'services')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['service:write', 'employee:read', ])]
    private ?Service $employee = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['service:read', 'employee:read'])]
    private ?string $type = null;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Employee::class)]
    private Collection $employees;

    #[ORM\ManyToOne(inversedBy: 'services')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Employee $employeeId = null;

    public function __construct()
    {
        $this->employees = new ArrayCollection();
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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Collection<int, Employee>
     */
    public function getEmployees(): Collection
    {
        return $this->employees;
    }

    public function addEmployee(Employee $employee): static
    {
        if (!$this->employees->contains($employee)) {
            $this->employees->add($employee);
            $employee->setService($this);
        }

        return $this;
    }

    public function removeEmployee(Employee $employee): static
    {
        if ($this->employees->removeElement($employee)) {
            // set the owning side to null (unless already changed)
            if ($employee->getService() === $this) {
                $employee->setService(null);
            }
        }

        return $this;
    }

    public function getEmployeeId(): ?Employee
    {
        return $this->employeeId;
    }

    public function setEmployeeId(?Employee $employeeId): static
    {
        $this->employeeId = $employeeId;

        return $this;
    }
}
