<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Application;
use App\Models\User;
use App\Models\Patient;
use App\Models\QueueNumber;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Application::create([
            'name_app' => 'BioPhysio',
            'description_app' => 'Praktek Mandiri Fisioterapi BioPhysio.',
            'open_days' => '1',
            'close_days' => "5",
            'open_time' => '09:00',
            'close_time' => '18:00',
            'address' => 'Jl. Kebun Raya No.59, Rejowinangun, Kec. Kotagede, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55171'
        ]);

        Patient::factory(1250)->create();

        Patient::create([
            'name' => 'Stevia Putri',
            'Address' => 'Jl. Anak Muda No.9 Jepara',
            'old' => 19,
            'gender' => 'Perempuan',
            'queue_number_id' => 5
        ]);

        Patient::create([
            'name' => 'Park Junho',
            'Address' => 'Jl. Gangnam No.112 Korea Selatan',
            'old' => 26,
            'gender' => 'Laki-Laki',
            'queue_number_id' => 4
        ]);

        Patient::create([
            'name' => 'Andi Ardiansyah',
            'Address' => 'Jl. Raya No.22 Tangerang Selatan',
            'old' => 21,
            'gender' => 'Laki-Laki',
            'queue_number_id' => 3
        ]);

        Patient::create([
            'name' => 'Anatasya Marcheria',
            'Address' => 'Jl. Mawar No.13 Jakarta Pusat',
            'old' => 21,
            'gender' => 'Perempuan',
            'queue_number_id' => 2
        ]);

        Patient::create([
            'name' => 'Gresya Gabriella',
            'Address' => 'Jl. Pemuda No.88 Jakarta Selatan',
            'old' => 26,
            'gender' => 'Perempuan',
            'queue_number_id' => 1
        ]);

        QueueNumber::create([
            'number' => 1
        ]);
        QueueNumber::create([
            'number' => 2
        ]);
        QueueNumber::create([
            'number' => 3
        ]);
        QueueNumber::create([
            'number' => 4
        ]);
        QueueNumber::create([
            'number' => 5
        ]);

        User::create([
            'name' => 'Bubble',
            'email' => 'bubble@gmail.com',
            'username' => 'admin',
            'image' => 'profil-images/1.jpeg',
            'is_admin' => 1,
            'gender' => 'Laki-Laki',
            'password' => bcrypt('@Admin123')
        ]);
    }
}
