<?php

namespace App\Repositories;

use App\Models\Client;
use Illuminate\Support\Facades\Log;

class ClientRepository {
    public function getAllPaginated(int $perPage = 10, ?string $search = null, ?string $status = null) {
        // Log::info(['search from getAllPaginated', $search]);
        return Client::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('company_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->withCount('projects')
            ->latest()
            ->paginate($perPage);
    }

    public function create(array $data): Client {
        return Client::create($data);
    }

    public function findById(int $id): Client {
        return Client::findOrFail($id);
    }

    public function update(Client $client, array $data): Client {
        $client->update($data);
        return $client;
    }

    public function delete(Client $client): void {
        $client->deleteOrFail();
    }
}
