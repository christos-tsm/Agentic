<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers {
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User {
        // First validate the invitation token
        $invitation = $this->validateInvitation($input);

        // Then validate user input
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            'invitation_token' => 'string',
        ])->validate();

        // Ensure email matches invitation
        if ($input['email'] !== $invitation->email) {
            throw ValidationException::withMessages([
                'email' => ['The email does not match the invitation.'],
            ]);
        }

        // Create user with role from invitation
        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        // Assign role from invitation
        $user->assignRole($invitation->role);

        // Mark invitation as used
        $invitation->update([
            'registered_at' => now()
        ]);

        return $user;
    }

    /**
     * Validate the invitation token and return the invitation.
     *
     * @param array $input
     * @return Invitation
     * @throws ValidationException
     */
    private function validateInvitation(array $input): Invitation {
        $invitation = Invitation::where('invitation_token', $input['invitation_token'] ?? null)
            ->where('email', $input['email'] ?? null)
            ->first();

        // Check if invitation exists
        if (!$invitation) {
            throw ValidationException::withMessages([
                'invitation_token' => ['Invalid invitation token or email.'],
            ]);
        }

        // Check if already used
        if ($invitation->registered_at !== null) {
            throw ValidationException::withMessages([
                'invitation_token' => ['This invitation has already been used.'],
            ]);
        }

        // Check if expired
        if ($invitation->expires_at && $invitation->expires_at < now()) {
            throw ValidationException::withMessages([
                'invitation_token' => ['This invitation has expired.'],
            ]);
        }

        return $invitation;
    }
}
