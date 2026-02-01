<?php

namespace App\Services;

use App\Http\Requests\ClientRequest;
use App\Repositories\ClientRepository;
use Illuminate\Support\Facades\Log;

class ClientService {
    protected $clientRepository;

    public function __construct(ClientRepository $clientRepository) {
        $this->clientRepository = $clientRepository;
    }

    public function registerNewClient(array $data): bool {
        try {
            // send email maybe
            Log::info('New client: ' . $data['name']);
            Log::info('Company email: ' . $data['company_email']);
            $this->clientRepository->create($data);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to create client: ' . $e->getMessage());
            return false;
        }
    }

    public function getClientsForDashboard(?string $search, ?string $status = null) {
        return $this->clientRepository->getAllPaginated(12, $search, $status);
    }

    public function updateClient($client, array $data): bool {
        try {
            $this->clientRepository->update($client, $data);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to update client: ' . $e->getMessage());
            return false;
        }
    }

    public function deleteClient($client): bool {
        try {
            $this->clientRepository->delete($client);
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to delete client: ' . $e->getMessage());
            return false;
        }
    }
}
