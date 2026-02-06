<?php

namespace App\Services;

use App\Repositories\InvoiceRepository;
use Illuminate\Support\Facades\Log;

class InvoiceService {
    protected $invoiceRepository;

    public function __construct(InvoiceRepository $invoiceRepository) {
        $this->invoiceRepository = $invoiceRepository;
    }

    public function getInvoices(?string $search, ?string $status = null) {
        try {
            return $this->invoiceRepository->getAllPaginated(12, $search, $status);
        } catch (\Exception $e) {
            Log::error('Failed to fetch invoices: ' . $e->getMessage());
            return [];
        }
    }
}
