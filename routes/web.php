<?php

use Illuminate\Support\Facades\Route;

    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register web routes for your application. These
    | routes are loaded by the RouteServiceProvider and all of them will
    | be assigned to the "web" middleware group. Make something great!
    |
    */


Route::get('/', function () {
    return Inertia('landing/LandingPage');
});
Route::get('/login', function () {
    return Inertia('auth/signin/SignIn');
})->name('login');

Route::get('/landing', function () {
    return Inertia('landing/LandingPage');
});

Route::get('/vsp', function () {
    return Inertia('landing/VspPage');
});
Route::get('/pms', function () {
    return Inertia('landing/ProgressiveModelPage');
});




Route::middleware('auth')->group(function(){
    Route::get('home', function () {
        return Inertia('user-profile');
    });
    Route::get('profile', function () {
        return Inertia('user-profile');
    });

    Route::prefix('admin')->group(function (){

        Route::get('roles', function () {
            return Inertia('admin/roles');
        });
        Route::get('menu-management', function () {
            return Inertia('admin/menu-management');
        });
        Route::get('users', function () {
            return Inertia('admin/users');
        });
        Route::get('menu-management/menu', function () {
            return Inertia('admin/menu-management/menu');
        });

        Route::get('organisations', function () {
            return Inertia('admin/organisations');
        });
        Route::prefix('bi-platforms')->group(function () {
            Route::get('/', function () {
                return Inertia('admin/bi-platforms');
            });
        });
        Route::prefix('bi-dashboards')->group(function () {
            Route::get('/', function () {
                return Inertia('admin/BI-Dashboards/index');
            });
        });


    });

});

