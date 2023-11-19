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
    normalizationContext: [ 'groups' => ['get:employee', 'get:booking']],
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

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Booking::class)]
    #[Groups(['get:establishment', 'get:employee'])]
    private Collection $bookings;
    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: EmployeeWeekTimeTable::class)]
    #[Groups(['get:establishment', 'get:employee'])]
    private Collection $employeeWeekTimeTables;
    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: EmployeeSpecificSchedule::class)]
    #[Groups(['get:establishment', 'get:employee'])]
    private Collection $employeeSpecificSchedules;

    public function __construct()
    {
        $this->bookings = new ArrayCollection();
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
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setEmployee($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getEmployee() === $this) {
                $booking->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, EmployeeWeekTimeTable>
     */
    public function getEmployeeWeekTimeTables(): Collection
    {
        return $this->employeeWeekTimeTables;
    }

    public function addEmployeeWeekTimeTable(EmployeeWeekTimeTable $employeeWeekTimeTable): static
    {
        if (!$this->employeeWeekTimeTables->contains($employeeWeekTimeTable)) {
            $this->employeeWeekTimeTables->add($employeeWeekTimeTable);
            $employeeWeekTimeTable->setEmployee($this);
        }

        return $this;
    }

    public function removeEmployeeWeekTimeTable(EmployeeWeekTimeTable $employeeWeekTimeTable): static
    {
        if ($this->employeeWeekTimeTables->removeElement($employeeWeekTimeTable)) {
            // set the owning side to null (unless already changed)
            if ($employeeWeekTimeTable->getEmployee() === $this) {
                $employeeWeekTimeTable->setEmployee(null);
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
}
