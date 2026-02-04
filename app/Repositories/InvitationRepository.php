<?php

namespace App\Repositories;

use App\Enums\Role;
use App\Models\Invitation;
use App\Models\Project;
use Illuminate\Support\Facades\Log;

class InvitationRepository {
    public function getAllPaginated(int $perPage, ?string $search = null, ?string $status = null, ?string $role = null) {
        $query = Invitation::query();

        if ($search) {
            $query->where('email', 'like', "%{$search}%");
        }

        if ($role && $role !== 'all') {
            $query->where('role', $role);
        }

        if ($status && $status !== 'all' && $status === 'active') {
            $query->where('registered_at', '!=', null);
        } else if ($status && $status !== 'all' && $status === 'inactive') {
            $query->whereNull('registered_at');
        }

        return $query->paginate($perPage);
    }

    public function create(array $data): Invitation {
        Log::info('Creating invitation in repository: ' . $data['email']);
        return Invitation::create($data);
    }

    public function findById($invitationId): ?Invitation {
        return Invitation::find($invitationId);
    }

    public function update(Invitation $invitation, array $data): Invitation {
        $invitation->update($data);
        return $invitation->fresh();
    }

    public function delete(Invitation $invitation): bool {
        try {
            $invitation->deleteOrFail();
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to delete invitation: ' . $e->getMessage());
            return false;
        }
    }
}
