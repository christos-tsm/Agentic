<?php

namespace App\Repositories;

use App\Models\Invoice;

class InvoiceRepository {
    public function getAllPaginated(int $perPage, ?string $search = null, ?string $status = null, ?string $role = null) {
        $query = Invoice::query()->with('client')->with('project')->latest();

        if ($search) {
            $query->where('email', 'like', "%{$search}%");
        }

        return $query->paginate($perPage);
    }

    public function getInvoiceById(int $invoiceId) {
        return Invoice::query()->with('client')->with('project')->find($invoiceId);
    }

    public function create($data): Invoice {
        return Invoice::create($data);
    }

    public function existsByInvoiceNumber(string $number): bool {
        return Invoice::where('invoice_number', $number)->exists();
    }
}
