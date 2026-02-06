<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceSearchRequest;
use App\Services\InvoiceService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller {
    protected $invoiceService;

    public function __construct(InvoiceService $invoiceService) {
        $this->invoiceService = $invoiceService;
    }

    public function index(InvoiceSearchRequest $invoiceSearchRequest) {
        $invoices = $this->invoiceService->getInvoices($invoiceSearchRequest->search, $invoiceSearchRequest->status);
        return Inertia::render('invoices/index', [
            'invoices' => $invoices
        ]);
    }
}
