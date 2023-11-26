<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmployeeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['get:employee', 'get:slot']],
    denormalizationContext: [ 'groups' => ['post:employee']]
)]

class Employee
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['get:organization', 'get:establishment', 'get:employee'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:organization', 'get:establishment', 'get:employee', 'post:employee'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:organization', 'get:establishment', 'get:employee', 'post:employee'])]
    private ?string $lastname = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['get:employee', 'post:employee'])]
    private ?Establishment $establishment = null;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Slot::class)]
    #[Groups(['get:establishment', 'get:employee'])]
    private Collection $slots;
    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: EmployeeSpecificSchedule::class)]
    #[Groups(['get:establishment', 'get:employee'])]
    private Collection $employeeSpecificSchedules;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Service $service = null;

    public function __construct()
    {
        $this->slots = new ArrayCollection();
        $this->employeeSpecificSchedules = new ArrayCollection();
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
            $slot->setEmployee($this);
        }

        return $this;
    }

    public function removeSlot(Slot $slot): static
    {
        if ($this->slots->removeElement($slot)) {
            // set the owning side to null (unless already changed)
            if ($slot->getEmployee() === $this) {
                $slot->setEmployee(null);
            }
        }

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

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

        return $this;
    }
}
