<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\AuthCode;
use Laravel\Passport\Client;
use Laravel\Passport\PersonalAccessClient;
use Laravel\Passport\RefreshToken;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Paginator::useBootstrap();
        /* cast all the laravel UIDS to IDS */
        Client::creating(function (Client $client) {
            $client->incrementing = false;
            $client->id = \Ramsey\Uuid\Uuid::uuid4()->toString();
        });
        Client::retrieved(function (Client $client) {
            $client->incrementing = false;
        });

        AuthCode::creating(function(AuthCode $authCode){
            $authCode->incrementing=false;
            $authCode->id = \Ramsey\Uuid\Uuid::uuid4()->toString();
        });
        AuthCode::retrieved(function (AuthCode $authCode) {
            $authCode->incrementing = false;
        });

        Permission::creating(function (Permission $permission){
            $permission->incrementing=false;
            $permission->id=\Ramsey\Uuid\Uuid::uuid4()->toString();
        });
        Permission::retrieved(function(Permission $permission){
            $permission->incrementing=false;
        });

        Role::creating(function (Role $role){
            $role->incrementing=false;
            $role->id=\Ramsey\Uuid\Uuid::uuid4()->toString();
        });
        Role::retrieved(function(Role $role){
            $role->incrementing=false;
        });






        /*
                Acc::creating(function(AccessToken $accessToken){
                    $accessToken->incrementing=false;
                    $accessToken->id = \Ramsey\Uuid\Uuid::uuid4()->toString();
                });
                AccessToken::retrieved(function (AccessToken $accessToken) {
                    $accessToken->incrementing = false;
                });*/

/*        RefreshToken::creating(function(RefreshToken $refreshToken){
            $refreshToken->incrementing=false;
            $refreshToken->id = \Ramsey\Uuid\Uuid::uuid4()->toString();
        });
        RefreshToken::retrieved(function (RefreshToken $refreshToken) {
            $refreshToken->incrementing = false;
        });

        PersonalAccessClient::creating(function(PersonalAccessClient $personalAccessClient){
            $personalAccessClient->incrementing=false;
            $personalAccessClient->id = \Ramsey\Uuid\Uuid::uuid4()->toString();
        });
        PersonalAccessClient::retrieved(function (PersonalAccessClient $personalAccessClient) {
            $personalAccessClient->incrementing = false;
        });*/

    }


}
