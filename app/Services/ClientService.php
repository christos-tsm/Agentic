<?php

namespace App\Services;

use App\Models\Client;
use App\Repositories\ClientRepository;
use Illuminate\Support\Facades\Log;

class ClientService {
    protected $clientRepository;

    public function __construct(ClientRepository $clientRepository) {
        $this->clientRepository = $clientRepository;
    }

    public function registerNewClient(array $data): Client {
        // send email maybe
        Log::info('New client: ' . $data['name']);
        return $this->clientRepository->create($data);
    }

    public function getClientsForDashboard(?string $search, ?string $status = null) {
        return $this->clientRepository->getAllPaginated(12, $search, $status);
    }
}
