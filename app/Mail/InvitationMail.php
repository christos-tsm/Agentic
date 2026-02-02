<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvitationMail extends Mailable {
    use Queueable, SerializesModels;

    public string $registrationUrl;
    public string $email;

    public function __construct(string $email, string $token, string $role) {
        $this->email = $email;
        $this->registrationUrl = url("/register?token={$token}&email=" . urlencode($email) . "&role=" . urlencode($role));
    }

    public function envelope(): Envelope {
        return new Envelope(
            subject: 'Πρόσκληση συμμετοχής',
        );
    }

    public function content(): Content {
        return new Content(
            view: 'emails.invitation',
        );
    }
}
