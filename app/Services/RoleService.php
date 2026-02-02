<?php

namespace App\Services;

use App\Enums\Role;
use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Repositories\InvitationRepository;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class RoleService {
    public function __construct() {
    }

    public function getRolesExcludingAdmin(): array {
        return array_filter(Role::values(), fn($role) => $role !== Role::ADMIN->value);
    }
}
