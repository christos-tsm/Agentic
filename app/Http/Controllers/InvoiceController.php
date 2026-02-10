<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceRequest;
use App\Http\Requests\InvoiceSearchRequest;
use App\Models\Invoice;
use App\Services\ClientService;
use App\Services\InvoiceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Pest\Support\Str;

class InvoiceController extends Controller {
    protected $invoiceService;
    protected $clientService;

    public function __construct(InvoiceService $invoiceService, ClientService $clientService) {
        $this->invoiceService = $invoiceService;
        $this->clientService = $clientService;
    }

    public function index(InvoiceSearchRequest $invoiceSearchRequest) {
        $invoices = $this->invoiceService->getInvoices($invoiceSearchRequest->search, $invoiceSearchRequest->status);
        return Inertia::render('invoices/index', [
            'invoices' => $invoices
        ]);
    }

    public function show(Invoice $invoice) {
        $invoice = $this->invoiceService->getInvoice($invoice->id);
        return Inertia::render('invoices/show', [
            'invoice' => $invoice
        ]);
    }

    public function create(Request $request) {
        return Inertia::render('invoices/create', [
            'initial_client_id' => $request->get('client_id'),
        ]);
    }

    public function store(InvoiceRequest $invoiceRequest) {
        Log::info(['invoiceRequest data', $invoiceRequest->validated()]);
        $created = $this->invoiceService->registerNewInvoice($invoiceRequest->validated());
        return redirect()->route('invoices.index')->with([
            'message' => $created ? 'Το τιμολόγιο εκδόθηκε!' : 'Αποτυχία έκδοσης τιμολογίου',
            'status' => $created ? 'success' : 'error'
        ]);
    }
}
