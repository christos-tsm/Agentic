<?php

namespace App\Services;

use App\Repositories\InvoiceRepository;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

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

    public function getInvoice($invoice) {
        try {
            return $this->invoiceRepository->getInvoiceById($invoice);
        } catch (\Exception $e) {
            Log::error('Failed to fetch invoice: ' . $e->getMessage());
            return [];
        }
    }

    public function registerNewInvoice($data) {
        try {
            do {
                $data['invoice_number'] = $this->generateInvoiceNumber();

                try {
                    $this->invoiceRepository->create($data);
                    return true;
                } catch (QueryException $e) {
                    if ($e->errorInfo[1] !== 1062) { // not duplicate
                        throw $e;
                    }
                }
            } while (true);
        } catch (\Exception $e) {
            Log::error('Failed to create invoice: ' . $e->getMessage());
            return false;
        }
    }


    private function generateInvoiceNumber(): string {
        do {
            $number = 'INV-' . now()->format('Ymd') . '-' . Str::upper(Str::random(6));
        } while ($this->invoiceRepository->existsByInvoiceNumber($number));

        return $number;
    }
}
