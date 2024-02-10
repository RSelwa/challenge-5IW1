<?php



namespace App\Controller;

use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class EmailController
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $to = $data['to'];
        $subject = $data['subject'];
        $body = $data['body'];

        $email = (new Email())
            ->from('no-reply@doctoges.com <esgi.challenge.s2@gmail.com>')
            ->to($to)
            ->subject($subject)
            ->text($body);

        $this->mailer->send($email);

        return new JsonResponse(['message' => 'Email sent successfully']);
    }
}