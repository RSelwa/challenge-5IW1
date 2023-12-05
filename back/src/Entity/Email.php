<?php

// src/Entity/Email.php

namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiResource;

#[ApiResource(
    collectionOperations: [
        'post' => [
            'method' => 'POST',
            'path' => '/email',
            'controller' => 'App\Controller\EmailController::sendEmail',
            'input' => 'App\Dto\EmailDto',
            'output' => false,
            'denormalization_context' => ['groups' => ['email']],
        ],
    ],
    itemOperations: [],
    normalizationContext: ['groups' => ['email']],
)]

class Email

{
    #[Groups(['email'])]
    private string $to;

    #[Groups(['email'])]
    private string $subject;

    #[Groups(['email'])]
    private string $body;

    public function getTo(): string
    {
        return $this->to;
    }

    public function setTo(string $to): void
    {
        $this->to = $to;
    }

    public function getSubject(): string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    public function getBody(): string
    {
        return $this->body;
    }

    public function setBody(string $body): void
    {
        $this->body = $body;
    }
}
