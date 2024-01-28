<?php

namespace App\Dto;


use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Controller\EmailController; 

#[ApiResource(
    denormalizationContext: ['groups' => ['email']],
    normalizationContext: ['groups' => ['email']],
    operations:[
        new Post(
            controller: EmailController::class,
            output: false,
        )
        ],
    
)]

class EmailDto

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




