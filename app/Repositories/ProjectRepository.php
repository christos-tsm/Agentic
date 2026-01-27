<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Support\Facades\Log;

class ProjectRepository {
    public function getAllPaginated(int $perPage = 10, ?string $search = null, ?string $status = null) {
        Log::info('projects:', [$search, $status]);
        return Project::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->with('client')
            ->latest()
            ->paginate($perPage);
    }

    public function create(array $data): Project {
        return Project::create($data);
    }

    public function findById(int $id): Project {
        return Project::findOrFail($id);
    }
}
