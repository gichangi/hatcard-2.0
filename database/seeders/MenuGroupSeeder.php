<?php

namespace Database\Seeders;

use App\Models\AdminModels\MenuGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('menu_groups')->insert([
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "name"=>"Administration",
                "description"=>"Administration",
                "group_icon"=>"fa fa-eye",
                "group_type"=>"group",
                "order_id"=>1,
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()

            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130003",
                "name"=>"Home",
                "description"=>"Home",
                "group_icon"=>"feather icon-home",
                "group_type"=>"group",
                "order_id"=>1,
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ]
        ]);
    }
}
