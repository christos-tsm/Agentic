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
        // Δημιουργία ενός user
        $user = User::create([
            'name' => 'Christos Tsamis',
            'email' => 'christosgsd@gmail.com',
            'password' => Hash::make('ct6982384256'),
            'email_verified_at' => now(),
        ]);

        $faker = Faker::create('el_GR');
        $statuses = ['active', 'inactive'];

        // Δημιουργία 30 πελατών
        for ($i = 0; $i < 30; $i++) {
            $firstName = $faker->firstName;
            $lastName = $faker->lastName;
            $fullName = $firstName . ' ' . $lastName;
            $companyName = $faker->company;
            
            Client::create([
                'name' => $fullName,
                'email' => strtolower($firstName) . '.' . strtolower($lastName) . '@example.com',
                'company_name' => $companyName,
                'company_email' => 'info@' . strtolower(str_replace(' ', '', $companyName)) . '.gr',
                'phone' => '210' . $faker->numerify('#######'),
                'status' => $faker->randomElement($statuses),
            ]);
        }

        $this->command->info('Δημιουργήθηκε 1 user με 30 clients!');
    }
}
