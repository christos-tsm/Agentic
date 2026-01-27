<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Http\Requests\SearchRequest;
use App\Services\ClientService;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ClientController extends Controller {
    public function __construct(protected ClientService $clientService) {
    }

    public function index(SearchRequest $searchRequest) {
        // Log::info('search', [$searchRequest->search]);
        return Inertia::render('clients/index', [
            'clients' => $this->clientService->getClientsForDashboard($searchRequest->search, $searchRequest->status),
            'filters' => $searchRequest->only(['search', 'status'])
        ]);
    }

    public function store(ClientRequest $clientRequest) {
        $this->clientService->registerNewClient($clientRequest->validated());
        return redirect()->route('clients.index')->with('message', 'Ο πελάτης δημιουργήθηκε!');
    }
}
