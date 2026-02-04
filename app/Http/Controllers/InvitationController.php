<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Http\Requests\InvitationRequest;
use App\Http\Requests\InvitationSearchRequest;
use App\Http\Requests\SearchRequest;
use App\Models\Invitation;
use App\Services\InvitationService;
use App\Services\RoleService;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class InvitationController extends Controller {
    public function __construct(protected InvitationService $invitationService, protected RoleService $roleService) {
    }

    public function index(InvitationSearchRequest $invitationSearchRequest) {
        return Inertia::render('invitation/index', [
            'invitations' => $this->invitationService->getInvitations($invitationSearchRequest->search, $invitationSearchRequest->status, $invitationSearchRequest->role),
            'roles' => array_values($this->roleService->getRolesExcludingAdmin()),
        ]);
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

    public function cancel($invitationId) {
        $invitation = $this->invitationService->getInvitationById($invitationId);
        if (!$invitation) {
            return redirect()->route('invitations.index')->with([
                'message' => 'Η πρόσκληση δεν βρέθηκε',
                'status' => 'error'
            ]);
        }

        $canceled = $this->invitationService->cancelInvitation($invitation);
        return redirect()->route('invitations.index')->with([
            'message' => $canceled ? 'Η πρόσκληση ακυρώθηκε!' : 'Αποτυχία ακύρωσης πρόσκλησης',
            'status' => $canceled ? 'success' : 'error'
        ]);
    }

    public function delete($invitationId) {
        $invitation = $this->invitationService->getInvitationById($invitationId);
        if (!$invitation) {
            return redirect()->route('invitations.index')->with([
                'message' => 'Η πρόσκληση δεν βρέθηκε',
                'status' => 'error'
            ]);
        }

        $deleted = $this->invitationService->deleteInvitation($invitation);
        return redirect()->route('invitations.index')->with([
            'message' => $deleted ? 'Η πρόσκληση διαγράφηκε!' : 'Αποτυχία διαγραφής πρόσκλησης',
            'status' => $deleted ? 'success' : 'error'
        ]);
    }

    public function resendEmail($invitationId) {
        $invitation = $this->invitationService->getInvitationById($invitationId);
        if (!$invitation) {
            return redirect()->route('invitations.index')->with([
                'message' => 'Η πρόσκληση δεν βρέθηκε',
                'status' => 'error'
            ]);
        }

        $resent = $this->invitationService->resendInvitationEmail($invitation);
        return redirect()->route('invitations.index')->with([
            'message' => $resent ? 'Το email της πρόσκλησης στάλθηκε ξανά!' : 'Αποτυχία επαναποστολής email πρόσκλησης',
            'status' => $resent ? 'success' : 'error'
        ]);
    }
}
