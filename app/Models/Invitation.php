<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model {
    protected $fillable = [
        'email',
        'invitation_token',
        'registered_at',
        'role',
        'expires_at',
    ];

    protected $casts = [
        'registered_at' => 'datetime',
        'expires_at' => 'datetime',
    ];
}
