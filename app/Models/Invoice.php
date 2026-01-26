<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model {
    protected $fillable = [];

    public function projects(): BelongsTo {
        return $this->belongsTo(Project::class);
    }
}
