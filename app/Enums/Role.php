<?php

namespace App\Enums;

enum Role: string {
    case ADMIN = 'admin';
    case EMPLOYEE = 'employee';
    case SECRETARY = 'secretary';

    public static function values(): array {
        return array_column(self::cases(), 'value');
    }
}
