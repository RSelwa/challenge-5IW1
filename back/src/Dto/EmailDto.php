<?php

namespace App\Dto;


use ApiPlatform\Core\Annotation\ApiResource;

#[ApiResource(
    collectionOperations: [
        'post' => [
            'method' => 'POST',
            'path' => '/email',
            'controller' => 'App\Controller\EmailController::sendEmail',
            'output' => false,
            'denormalization_context' => ['groups' => ['email']],
        ],
    ],
    itemOperations: [],
    normalizationContext: ['groups' => ['email']],
)]

class EmailDto
{
    public string $to;

    public string $subject;

    public string $body;
}
