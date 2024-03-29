<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\OrganizationRepository;
use App\State\UserPasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use App\Validator\Constraints as AcmeAssert;
use Symfony\Component\Validator\Constraints as Assert;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: OrganizationRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['organization:read', 'service:read']],
    operations: [
        new Get(),
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Post(
            processor: UserPasswordHasher::class,
            denormalizationContext: ['groups' => 'organization:create'],
            validationContext: ['groups' => 'organization:create'],
        ),
        new Patch(
            processor: UserPasswordHasher::class,
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_ORGANIZATION') and object.getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'organization:update'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_ORGANIZATION') and object.getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
        )
    ],
)]

class Organization implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: Types::GUID)]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups(['organization:read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'organization:create', 'organization:update'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'organization:create', 'organization:update'])]
    private ?string $managerFirstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'organization:create', 'organization:update'])]
    private ?string $managerLastname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read'])]
    #[ApiProperty(
        security: "
            is_granted('ROLE_ADMIN') 
            or (is_granted('ROLE_ORGANIZATION') and object.getId() == user.getId())
        ",
    )]
    private ?string $kbis = null;

    #[Vich\UploadableField(mapping: 'kbis_upload', fileNameProperty: 'kbis')]
    #[Groups(['organization:create'])]
    private ?File $kbisFile = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['organization:read', 'organization:create'])]
    private ?string $siret = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'organization:create'])]
    #[AcmeAssert\UniqueEmail(groups: ['organization:create'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['organization:read', 'put:admin', 'organization:update'])]
    #[ApiProperty(security: "is_granted('ROLE_ADMIN')")]
    private ?string $status = 'PENDING';

    #[ORM\OneToMany(mappedBy: 'organization', targetEntity: Establishment::class)]
    #[Groups(['organization:read'])]
    private Collection $establishments;

    private ?array $roles = ['ROLE_ORGANIZATION'];

    #[Groups(['organization:create'])]
    #[Assert\Length(min: 4)]
    private ?string $plainPassword = null;

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

    public function getKbis(): ?File
    {
        $filePath = __DIR__ . '/../../public/uploads/' . $this->kbis;
        $response = new BinaryFileResponse($filePath);

        return $response->getFile();
    }

    public function setKbis(string $kbis): static
    {
        $this->kbis = $kbis;

        return $this;
    }

    public function getKbisFile(): ?File
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

        $roles[] = 'ROLE_ORGANIZATION';

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
}
