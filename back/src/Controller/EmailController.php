<?php



namespace App\Controller;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use ApiPlatform\Core\Annotation\ApiResource; 



#[ApiResource]
class EmailController
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    #[Route('/email', name: 'send_email', methods: ['POST'])]
    public function sendEmail(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $to = $data['to'];
        $subject = $data['subject'];
        $body = $data['body'];

        $email = (new Email())
            ->from('your_email@example.com')
            ->to($to)
            ->subject($subject)
            ->text($body);

        $this->mailer->send($email);

        return new JsonResponse(['message' => 'Email sent successfully']);
    }
}