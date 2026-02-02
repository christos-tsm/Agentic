<?php

namespace App\Repositories;

use App\Models\Invitation;
use App\Models\Project;
use Illuminate\Support\Facades\Log;

class InvitationRepository {
    public function getAllPaginated(int $perPage, ?string $search = null, ?string $status = null) {
        $query = Invitation::query();
        if ($search) {
            $query->where('email', 'like', "%{$search}%");
        }
        if ($status) {
            $query->where('status', $status);
        }
        return $query->paginate($perPage);
    }

    public function create(array $data): Invitation {
        Log::info('Creating invitation in repository: ' . $data['email']);
        return Invitation::create($data);
    }

    public function update(Invitation $invitation, array $data): Invitation {
        $invitation->update($data);
        return $invitation->fresh();
    }

    public function delete(Invitation $invitation) {
        $invitation->deleteOrFail();
    }
}
