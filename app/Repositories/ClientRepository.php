<?php

namespace App\Repositories;

use App\Models\Client;

class ClientRepository {
    public function getAllPaginated(int $perPage = 10, ?string $search = null) {
        return Client::query()->when($search, function ($query, $search) {
            $query->where('name', 'like', '%{$search}%')->orWhere('company_name', 'like', '%{$search}%');
        })->withCount('projects')->latest()->paginate($perPage);
    }

    public function create(array $data): Client {
        return Client::create();
    }

    public function findById(int $id): Client {
        return Client::findOrFail($id);
    }
}
