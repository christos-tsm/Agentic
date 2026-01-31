<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model {
    protected $fillable = [
        'client_id',
        'title',
        'description',
        'status',
        'budget',
        'deadline_at'
    ];

    protected $casts = [
        'deadline_at' => 'datetime:d/m/Y',
    ];

    public function client(): BelongsTo {
        return $this->belongsTo(Client::class);
    }

    public function invoices(): HasMany {
        return $this->hasMany(Invoice::class);
    }
}
