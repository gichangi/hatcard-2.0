<?php

namespace Database\Seeders;

use App\Models\AdminModels\MenuItems;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('menu_items')->insert([
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130012",
                "name"=>"Configuration",
                "description"=>"Configuration",
                "menu_level"=>"base_parent",
                "menu_type"=>"default",
                "menu_icon"=>"feather feather-settings link-icon",
                "order_id"=>1,
                "status"=>"active",
                "parent_id"=>null,
                "menu_group_id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130013",
                "name"=>"Sidebar Menus",
                "description"=>"Sidebar Menus",
                "menu_level"=>"child",
                "menu_type"=>"default",
                "menu_icon"=>null,
                "order_id"=>1,
                "status"=>"active",
                "parent_id"=>"c5cce308-6acf-11eb-9439-0242ac130012",
                "menu_group_id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130014",
                "name"=>"Analytics Servers",
                "description"=>"Analytics Servers",
                "menu_level"=>"child",
                "menu_type"=>"default",
                "menu_icon"=>null,
                "order_id"=>2,
                "status"=>"active",
                "parent_id"=>"c5cce308-6acf-11eb-9439-0242ac130012",
                "menu_group_id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130015",
                "name"=>"Home",
                "description"=>"Home",
                "menu_level"=>"base_parent",
                "menu_type"=>"default",
                "menu_icon"=>"feather feather-home link-icon",
                "order_id"=>1,
                "status"=>"active",
                "parent_id"=>null,
                "menu_group_id"=>"c5cce308-6acf-11eb-9439-0242ac130003",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ]
        ]);
    }
}
