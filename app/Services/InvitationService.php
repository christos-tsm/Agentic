<?php

namespace App\Services;

use App\Enums\Role;
use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Repositories\InvitationRepository;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class InvitationService {
    protected $invitationRepository;

    public function __construct(InvitationRepository $invitationRepository) {
        $this->invitationRepository = $invitationRepository;
    }

    public function getInvitations(?string $search, ?string $status = null, ?string $role = null) {
        try {
            $invitations = $this->invitationRepository->getAllPaginated(12, $search, $status, $role);
            return $invitations;
        } catch (\Exception $e) {
            Log::error('Failed to fetch invitations: ' . $e->getMessage());
            return null;
        }
    }

    public function getInvitationById($invitationId): ?Invitation {
        try {
            return $this->invitationRepository->findById($invitationId);
        } catch (\Exception $e) {
            Log::error('Failed to fetch invitation: ' . $e->getMessage());
            return null;
        }
    }

    public function cancelInvitation($invitation): bool {
        try {
            $data = ['expires_at' => now()];
            $this->invitationRepository->update($invitation, $data);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to cancel invitation: ' . $e->getMessage());
            return false;
        }
    }

    public function createNewInvitation(array $data): bool {
        try {
            // Generate Token
            $token = $this->generateToken();
            $data['invitation_token'] = $token;
            // Add expires at value
            $data['expires_at'] = now()->addDays(2);
            // Create invitation record
            $this->invitationRepository->create($data);
            // Send invitation email
            $this->sendInvitationEmail($data['email'], $token, $data['role']);
            Log::info('New invitation: ' . $data['email'] . ' with token: ' . $token);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to create invitation: ' . $e->getMessage());
            return false;
        }
    }

    private function sendInvitationEmail(string $email, string $token, string $role): void {
        Mail::to($email)->send(new InvitationMail($email, $token, $role));
        Log::info("Invitation email sent to $email with role: $role");
    }

    public function updateInvitation($invitation, array $data): bool {
        try {
            $this->invitationRepository->update($invitation, $data);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to update invitation: ' . $e->getMessage());
            return false;
        }
    }

    public function resendInvitationEmail($invitation): bool {
        try {
            // Generate new token
            $newToken = $this->generateToken();

            // Prepare data for update
            $data = [
                'invitation_token' => $newToken,
                'expires_at' => now()->addDays(2)
            ];

            $this->invitationRepository->update($invitation, $data);

            $this->sendInvitationEmail(
                $invitation->email,
                $newToken,
                $invitation->role
            );

            Log::info("Invitation resent to {$invitation->email} with new token");
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to resend invitation email: ' . $e->getMessage());
            return false;
        }
    }

    public function deleteInvitation($invitation): bool {
        try {
            $this->invitationRepository->delete($invitation);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to delete invitation: ' . $e->getMessage());
            return false;
        }
    }

    private function generateToken(): string {
        do {
            $token = bin2hex(random_bytes(32));
        } while (Invitation::where('invitation_token', $token)->exists());

        return $token;
    }
}
