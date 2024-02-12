<?php
// api/src/Controller/CreateOrganizationController.php

namespace App\Controller;

use App\Entity\Organization;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateOrganizationController extends AbstractController
{
    public function __invoke(Request $request): Organization
    {
        $uploadedFile = $request->files->get('kbisFile');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $organization = new Organization();

        $organization->setKbisFile($uploadedFile);

        $organization->setName($request->request->get('name'));
        $organization->setManagerFirstname($request->request->get('managerFirstname'));
        $organization->setManagerLastname($request->request->get('managerLastname'));
        $organization->setEmail($request->request->get('email'));
        $organization->setPassword($request->request->get('password'));
        $organization->setSiret($request->request->get('siret'));

        return $organization;
    }
}