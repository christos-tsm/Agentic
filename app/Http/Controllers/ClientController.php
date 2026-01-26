<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Http\Requests\SearchRequest;
use App\Services\ClientService;
use Inertia\Inertia;

class ClientController extends Controller {
    public function __construct(protected ClientService $clientService) {
    }

    public function index(SearchRequest $searchRequest) {
        return Inertia::render('clients/index', [
            'clients' => $this->clientService->getClientsForDashboard($searchRequest->search),
            'filters' => $searchRequest->only(['search'])
        ]);
    }

    public function store(ClientRequest $clientRequest) {
        $this->clientService->registerNewClient($clientRequest->validated());
        return redirect()->route('clients.index')->with('message', 'Ο πελάτης δημιουργήθηκε!');
    }
}
