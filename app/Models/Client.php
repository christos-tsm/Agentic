<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model {
    protected $fillable = [
        'name',
        'is_company',
        'company_name',
        'company_email',
        'profession',
        'vat_number',
        'doy',
        'email',
        'phone',
        'address',
        'city',
        'zip_code',
        'country',
        'status'
    ];

    public function projects(): HasMany {
        return $this->hasMany(Project::class);
    }
}
