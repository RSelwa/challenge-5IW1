<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmployeeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource]
class Employee
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $establishment = null;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Booking::class)]
    private Collection $bookings;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: EmployeeWeekTimeTable::class)]
    private Collection $employeeWeekTimeTable;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: EmployeeSpecificSchedule::class)]
    private Collection $employeeSpecificSchedules;

    public function __construct()
    {
        $this->bookings = new ArrayCollection();
        $this->employeeSpecificSchedules = new ArrayCollection();
    }

    public function getId(): ?int
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