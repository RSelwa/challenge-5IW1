<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\CreateOrganizationController;
use App\Repository\OrganizationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: OrganizationRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['get:organization', 'get:service']],
    denormalizationContext: [ 'groups' => ['post:organization']],
)]

class Organization
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['get:organization'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:organization', 'post:organization'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:organization', 'post:organization'])]
    private ?string $managerFirstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:organization', 'post:organization'])]
    private ?string $managerLastname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:organization'])]
    private ?string $kbis = null;

    #[Vich\UploadableField(mapping: 'kbis_upload', fileNameProperty: 'kbis')]
    #[Groups(['post:organization'])]
    private ?File $kbisFile = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['get:organization', 'post:organization'])]
    private ?string $siret = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:organization', 'post:organization'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(['post:organization'])]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['get:organization', 'put:admin'])]
    private ?string $status = 'PENDING';

    #[ORM\OneToMany(mappedBy: 'organization', targetEntity: Establishment::class)]
    #[Groups(['get:organization'])]
    private Collection $establishments;

    public function __construct()
    {
        $this->establishments = new ArrayCollection();
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

    public function getManagerFirstname(): ?string
    {
        return $this->managerFirstname;
    }

    public function setManagerFirstname(string $managerFirstname): static
    {
        $this->managerFirstname = $managerFirstname;

        return $this;
    }

    public function getManagerLastname(): ?string
    {
        return $this->managerLastname;
    }

    public function setManagerLastname(string $managerLastname): static
    {
        $this->managerLastname = $managerLastname;

        return $this;
    }

    public function getKbis(): ?string
    {
        return $this->kbis;
    }

    public function setKbis(string $kbis): static
    {
        $this->kbis = $kbis;

        return $this;
    }

    public function getKbisFile(): File
    {
        return $this->kbisFile;
    }

    public function setKbisFile(File $kbisFile): static
    {
        $this->kbisFile = $kbisFile;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(?string $siret): static
    {
        $this->siret = $siret;

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection<int, Establishment>
     */
    public function getEstablishments(): Collection
    {
        return $this->establishments;
    }

    public function addEstablishment(Establishment $establishment): static
    {
        if (!$this->establishments->contains($establishment)) {
            $this->establishments->add($establishment);
            $establishment->setOrganization($this);
        }

        return $this;
    }

    public function removeEstablishment(Establishment $establishment): static
    {
        if ($this->establishments->removeElement($establishment)) {
            // set the owning side to null (unless already changed)
            if ($establishment->getOrganization() === $this) {
                $establishment->setOrganization(null);
            }
        }

        return $this;
    }
}
