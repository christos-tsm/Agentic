<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Http\Requests\SearchRequest;
use App\Models\Client;
use App\Services\ClientService;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ClientController extends Controller {
    public function __construct(protected ClientService $clientService) {
    }

    public function index(SearchRequest $searchRequest) {
        return Inertia::render('clients/index', [
            'clients' => $this->clientService->getClientsForDashboard($searchRequest->search, $searchRequest->status),
            'filters' => $searchRequest->only(['search', 'status'])
        ]);
    }

    public function create() {
        return Inertia::render('clients/create', []);
    }

    public function store(ClientRequest $clientRequest) {
        Log::info(['clientRequest data', $clientRequest->validated()]);
        $created = $this->clientService->registerNewClient($clientRequest->validated());
        return redirect()->route('clients.index')->with([
            'message' => $created ? 'Ο πελάτης δημιουργήθηκε!' : 'Αποτυχία δημιουργίας πελάτη',
            'status' => $created ? 'success' : 'error'
        ]);
    }

    public function show(Client $client) {
        return Inertia::render('clients/show', [
            'client' => $client
        ]);
    }

    public function update(ClientRequest $clientRequest, Client $client) {
        $updated = $this->clientService->updateClient($client, $clientRequest->validated());
        return redirect()->route('clients.show', $client)->with([
            'message' => $updated ? 'Ο πελάτης ανανεώθηκε επιτυχώς' : 'Προέκυψε κάποιο σφάλμα',
            'status' => $updated ? 'success' : 'error'
        ]);
    }

    public function delete(Client $client) {
        $deleted = $this->clientService->deleteClient($client);
        return redirect()->route('clients.index')->with([
            'message' => $deleted ? 'Ο πελάτης διαγράφηκε επιτυχώς' : 'Προέκυψε κάποιο σφάλμα',
            'status' => $deleted ? 'success' : 'error'
        ]);
    }
}
