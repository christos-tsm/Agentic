<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Http\Requests\InvitationRequest;
use App\Services\InvitationService;
use App\Services\RoleService;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class InvitationController extends Controller {
    public function __construct(protected InvitationService $invitationService, protected RoleService $roleService) {
    }

    public function create() {
        return Inertia::render('invitation/create', [
            'roles' => array_values($this->roleService->getRolesExcludingAdmin())
        ]);
    }

    public function store(InvitationRequest $invitationRequest) {
        Log::info('Storing new invitation: ' . $invitationRequest->validated()['email']);
        $created = $this->invitationService->createNewInvitation($invitationRequest->validated());
        return redirect()->route('invitations.create')->with([
            'message' => $created ? 'Η πρόσκληση στάλθηκε!' : 'Αποτυχία αποστολής πρόσκλησης',
            'status' => $created ? 'success' : 'error'
        ]);
    }
}
