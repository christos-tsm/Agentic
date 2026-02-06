<?php

namespace App\Repositories;

use App\Models\Invoice;

class InvoiceRepository {
    public function getAllPaginated(int $perPage, ?string $search = null, ?string $status = null, ?string $role = null) {
        $query = Invoice::query()->with('client')->with('project');

        if ($search) {
            $query->where('email', 'like', "%{$search}%");
        }

        return $query->paginate($perPage);
    }
}
