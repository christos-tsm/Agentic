<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class ClientSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // Δημιουργία κεντρικού User αν δεν υπάρχει
        $user = User::updateOrCreate(
            ['email' => 'christosgsd@gmail.com'],
            [
                'name' => 'Christos Tsamis',
                'password' => Hash::make('ct6982384256'),
                'email_verified_at' => now(),
            ]
        );

        $faker = Faker::create('el_GR');
        $statuses = ['active', 'inactive'];
        $doys = ['Α\' Αθηνών', 'Β\' Αθηνών', 'Χολαργού', 'Ψυχικού', 'Πειραιά', 'Θεσσαλονίκης'];
        $professions = ['Προγραμματιστής', 'Σύμβουλος Επιχειρήσεων', 'Γραφίστας', 'Έμπορος', 'Αρχιτέκτονας'];

        // Δημιουργία 30 πελατών
        for ($i = 0; $i < 30; $i++) {
            $isCompany = $faker->boolean(70); // 70% πιθανότητα να είναι εταιρεία
            $firstName = $faker->firstName;
            $lastName = $faker->lastName;
            $companyName = $isCompany ? $faker->company : null;

            Client::create([
                'is_company'    => $isCompany,
                'name'          => $firstName . ' ' . $lastName,
                'email'         => $faker->unique()->safeEmail,

                // Στοιχεία Επιχείρησης (μόνο αν is_company = true)
                'company_name'  => $companyName,
                'profession'    => $isCompany ? $faker->randomElement($professions) : null,
                'vat_number'    => $isCompany ? $faker->unique()->numerify('#########') : null, // 9 ψηφία
                'doy'           => $isCompany ? $faker->randomElement($doys) : null,
                'company_email' => $isCompany ? $faker->companyEmail() : null,

                // Κοινά Στοιχεία
                'phone'         => $faker->phoneNumber,
                'address'       => $faker->streetAddress,
                'city'          => $faker->city,
                'zip_code'      => $faker->postcode,
                'country'       => 'Ελλάδα',

                'status'        => $faker->randomElement($statuses),
            ]);
        }

        $this->command->info('Ο Seeder ολοκληρώθηκε: 1 User και 30 Clients δημιουργήθηκαν!');
    }
}
