<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create(
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "first_name"=>"admin",
                "middle_name"=>"admin",
                "last_name"=>"admin",
                "email"=>"admin@usaid.org",
                "phone"=>"+256777777777",
                "password"=>bcrypt("P@55w0rd"),
            ]);
    }
}
/*first_name:admin
middle_name:admin
last_name:admin
email:admin@usaid.org
phone:+256777777777*/
