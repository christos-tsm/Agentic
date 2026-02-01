<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Υπεύθυνος επικοινωνίας

            $table->boolean('is_company')->default(true);
            $table->string('company_name')->nullable(); // Επωνυμία Επιχείρησης
            $table->string('company_email')->nullable(); // Email Επιχείρησης
            $table->string('profession')->nullable(); // Επάγγελμα (Απαραίτητο για Τιμολόγιο)

            $table->string('vat_number')->nullable(); // ΑΦΜ
            $table->string('doy')->nullable(); // ΔΟΥ

            $table->string('email')->unique();
            $table->string('phone')->nullable();

            // Στοιχεία Διεύθυνσης
            $table->string('address')->nullable(); // Οδός και Αριθμός
            $table->string('city')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('country')->default('Greece');

            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('clients');
    }
};
