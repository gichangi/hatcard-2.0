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
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "name"=>"Administration",
                "description"=>"Administration",
                "menu_icon"=>null,
                "menu_url"=>"#",
                "menu_type"=>"group",
                "menu_category"=>"system-group",
                "order_id"=>10,
                "parent_id"=>null,
                "menu_group_id"=>null,
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()

            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130003",
                "name"=>"Integrations",
                "description"=>"Custom Apps Integrations",
                "menu_icon"=>null,
                "menu_url"=>"#",
                "menu_type"=>"group",
                "menu_category"=>"system-group",
                "order_id"=>9,
                "parent_id"=>null,
                "menu_group_id"=>null,
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130004",
                "name"=>"Data Import",
                "description"=>"DHIS2 and databases",
                "menu_icon"=>null,
                "menu_url"=>"#",
                "menu_type"=>"group",
                "menu_category"=>"system-group",
                "order_id"=>8,
                "parent_id"=>null,
                "menu_group_id"=>null,
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130005",
                "name"=>"Organisations",
                "description"=>"Users Organisations",
                "menu_icon"=>"fa fa-building",
                "menu_url"=>"/admin/organisation",
                "menu_type"=>"item",
                "menu_category"=>"system-link",
                "order_id"=>1,
                "parent_id"=>'c5cce308-6acf-11eb-9439-0242ac130002',
                "menu_group_id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130006",
                "name"=>"Roles",
                "description"=>"create roles",
                "menu_icon"=>"fa fa-cogs",
                "menu_url"=>"/admin/roles",
                "menu_type"=>"item",
                "menu_category"=>"system-link",
                "order_id"=>2,
                "parent_id"=>'c5cce308-6acf-11eb-9439-0242ac130002',
                "menu_group_id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130007",
                "name"=>"Users",
                "description"=>"User management",
                "menu_icon"=>"fa fa-users",
                "menu_url"=>"/admin/users",
                "menu_type"=>"item",
                "menu_category"=>"system-link",
                "order_id"=>3,
                "parent_id"=>'c5cce308-6acf-11eb-9439-0242ac130002',
                "menu_group_id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130008",
                "name"=>"Sidebar Menus",
                "description"=>"Navigation Menu Management",
                "menu_icon"=>"fa fa-bars",
                "menu_url"=>"/admin/menu-management",
                "menu_type"=>"item",
                "menu_category"=>"system-link",
                "order_id"=>4,
                "parent_id"=>'c5cce308-6acf-11eb-9439-0242ac130002',
                "menu_group_id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130009",
                "name"=>"Configuration",
                "description"=>"System configuration",
                "menu_icon"=>"fa fa-wrench",
                "menu_url"=>"/admin/system-configuration",
                "menu_type"=>"collapse",
                "menu_category"=>"system-link",
                "order_id"=>5,
                "parent_id"=>'c5cce308-6acf-11eb-9439-0242ac130002',
                "menu_group_id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ],
            [
                "id"=>"c5cce308-6acf-11eb-9439-0242ac130010",
                "name"=>"BI Servers",
                "description"=>"BI Server",
                "menu_icon"=>"fa fa-server",
                "menu_url"=>"/admin/bi-servers",
                "menu_type"=>"item",
                "menu_category"=>"system-link",
                "order_id"=>1,
                "parent_id"=>'c5cce308-6acf-11eb-9439-0242ac130009',
                "menu_group_id"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "status"=>"active",
                "created_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "last_updated_by"=>"c5cce308-6acf-11eb-9439-0242ac130002",
                "created_at" =>\Carbon\Carbon::now(),
                "updated_at" =>\Carbon\Carbon::now()
            ]
        ]);
    }
}
