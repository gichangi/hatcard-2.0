<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        //Organisations Permissions
        $permission=Permission::create(["name"=>"View-Administration-Organisations-Menu"]);
        $permission=Permission::create(["name"=>"Organisations-view"]);
        $permission=Permission::create(["name"=>"Organisations-create"]);
        $permission=Permission::create(["name"=>"Organisations-edit"]);
        $permission=Permission::create(["name"=>"Organisations-delete"]);
        //Roles Permissions
        $permission=Permission::create(["name"=>"View-Administration-Roles-Menu"]);
        $permission=Permission::create(["name"=>"Roles-view"]);
        $permission=Permission::create(["name"=>"Roles-create"]);
        $permission=Permission::create(["name"=>"Roles-edit"]);
        $permission=Permission::create(["name"=>"Roles-delete"]);
        //User Permissions
        $permission=Permission::create(["name"=>"View-Administration-Users-Menu"]);
        $permission=Permission::create(["name"=>"Users-view"]);
        $permission=Permission::create(["name"=>"Users-create"]);
        $permission=Permission::create(["name"=>"Users-edit"]);
        $permission=Permission::create(["name"=>"Users-delete"]);

        //Sidebar Permissions
        $permission=Permission::create(["name"=>"View-Sidebar-Menu"]);
        $permission=Permission::create(["name"=>"Sidebar-view"]);
        $permission=Permission::create(["name"=>"Sidebar-create"]);
        $permission=Permission::create(["name"=>"Sidebar-edit"]);
        $permission=Permission::create(["name"=>"Sidebar-delete"]);

        //Bi-Platforms Permissions
        $permission=Permission::create(["name"=>"View-Embedding"]);
        $permission=Permission::create(["name"=>"Bi-Platforms-view"]);
        $permission=Permission::create(["name"=>"Bi-Platforms-create"]);
        $permission=Permission::create(["name"=>"Bi-Platforms-edit"]);
        $permission=Permission::create(["name"=>"Bi-Platforms-delete"]);


















        //Embedding Block
        $permission=Permission::create(["name"=>"View-Embedding"]);
        $permission=Permission::create(["name"=>"Embedding-Servers"]);
        $permission=Permission::create(["name"=>"Embedding-Servers-view"]);
        $permission=Permission::create(["name"=>"Embedding-Servers-create"]);
        $permission=Permission::create(["name"=>"Embedding-Servers-edit"]);
        $permission=Permission::create(["name"=>"Embedding-Servers-delete"]);
        $permission=Permission::create(["name"=>"Embedding-Dashboards"]);
        $permission=Permission::create(["name"=>"Embedding-Dashboards-view"]);
        $permission=Permission::create(["name"=>"Embedding-Dashboards-create"]);
        $permission=Permission::create(["name"=>"Embedding-Dashboards-edit"]);
        $permission=Permission::create(["name"=>"Embedding-Dashboards-delete"]);


        //Data Manager Block
        $permission=Permission::create(["name"=>"View-Data-Manager"]);
        $permission=Permission::create(["name"=>"Data-Manager-Data-Import"]);
        $permission=Permission::create(["name"=>"Data-Manager-Data-Import-Central-Lamis"]);
        $permission=Permission::create(["name"=>"Data-Manager-Data-Import-DHIS-Instances"]);
        $permission=Permission::create(["name"=>"Data-Manager-Data-Import-CSV-Import"]);
        $permission=Permission::create(["name"=>"Data-Manager-Data-Export"]);
        $permission=Permission::create(["name"=>"Data-Manager-External-Databases"]);
        $permission=Permission::create(["name"=>"Data-Manager-External-Databases-Connections"]);
        $permission=Permission::create(["name"=>"Data-Manager-External-Databases-Imported-Tables"]);
        $permission=Permission::create(["name"=>"Data-Manager-External-Databases-Data-Export"]);



        //Repository
        $permission=Permission::create(["name"=>"View-Repository-Menu"]);
        $permission=Permission::create(["name"=>"Repository-Document-Portal"]);
        $permission=Permission::create(["name"=>"Repository-Document-View"]);
        $permission=Permission::create(["name"=>"Repository-Document-Create"]);
        $permission=Permission::create(["name"=>"Repository-Document-Edit"]);
        $permission=Permission::create(["name"=>"Repository-Document-Delete"]);

        //Explore
        $permission=Permission::create(["name"=>"View-Explore-Menu"]);
        $permission=Permission::create(["name"=>"Explore-View"]);

        //Administration
        $permission=Permission::create(["name"=>"View-Administration-Menu"]);

        //Configurations
        $permission=Permission::create(["name"=>"View-System-Configuration-Menu"]);

        //Statistics
        $permission=Permission::create(["name"=>"View-Administration-Statistics-Menu"]);
        $permission=Permission::create(["name"=>"Administration-Statistics-visits"]);


        //Super admin Role
        $permission=Permission::create(["name"=>"ALL"]);



        //create Roles
        Role::create(["name"=>"Admin"]);

        $role=Role::findByName("Admin");
        $role->givePermissionTo([
            'ALL'
        ]);

        $user=User::all()->where('email','=','admin@usaid.org')->first();

        //Assign Admin
        $user->assignRole($role);


        //create roles
    }
}
