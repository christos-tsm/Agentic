<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model {
    protected $fillable = [
        'client_id',
        'project_id',
        'amount',
        'due_date',
        'status'
    ];

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }

    public function client(): BelongsTo {
        return $this->belongsTo(Client::class);
    }
}
