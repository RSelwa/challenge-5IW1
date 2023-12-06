<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EstablishmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EstablishmentRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['establishment:read', 'service:read, employee:read']],
    denormalizationContext: [ 'groups' => ['post:establishment']]
)]

class Establishment
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['organization:read', 'establishment:read', 'employee:read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'post:establishment', 'employee:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'post:establishment', 'employee:read'])]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'post:establishment', 'employee:read'])]
    private ?string $zipCode = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'post:establishment', 'employee:read'])]
    private ?string $city = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'establishment:read', 'post:establishment', 'employee:read'])]
    private ?string $country = null;

    #[ORM\ManyToOne(inversedBy: 'establishments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['post:establishment', 'employee:read'])]
    private ?Organization $organization = null;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Employee::class)]
    #[Groups(['organization:read', 'establishment:read'])]
    private Collection $employees;

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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): static
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getOrganization(): ?Organization
    {
        return $this->organization;
    }

    public function setOrganization(?Organization $organization): static
    {
        $this->organization = $organization;

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
            $employee->setEstablishment($this);
        }

        return $this;
    }

    public function removeEmployee(Employee $employee): static
    {
        if ($this->employees->removeElement($employee)) {
            // set the owning side to null (unless already changed)
            if ($employee->getEstablishment() === $this) {
                $employee->setEstablishment(null);
            }
        }

        return $this;
    }
}
