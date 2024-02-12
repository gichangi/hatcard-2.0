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

    Route::get('users', function () {
        return Inertia('admin/users/index');
    });


/*Route::middleware('auth')->group(function(){*/
    Route::get('home', function () {
        return Inertia('homepage/index');
    });
    Route::get('profile', function () {
        return Inertia('user-profile/index');
    });

    Route::prefix('dashboards')->group(function (){
        Route::get('view', function () {
            return Inertia('dashboards/index');
        });
        Route::get('view/{id}', function (string $id) {
            return Inertia('dashboards/index');
        });
    });
    Route::prefix('explore')->group(function (){
        Route::get('/', function () {
            return Inertia('menu-cards/index');
        });
        Route::get('/{id}', function () {
            return Inertia('menu-cards/index');
        });
    });
    Route::prefix('documents')->group(function (){
        Route::get('/', function () {
            return Inertia('documents/index');
        });
        Route::get('/{id}', function () {
            return Inertia('documents/index');
        });
    });


    Route::prefix('admin')->group(function (){

        Route::get('roles', function () {
            return Inertia('admin/roles/index');
        });
        Route::get('users', function () {
            return Inertia('admin/users/index');
        });
        Route::get('menu-management', function () {
            return Inertia('admin/menumanagement/index');
        });

        Route::get('organisation', function () {
            return Inertia('admin/organisations/index');
        });
        Route::prefix('bi-platforms')->group(function () {
            Route::get('/', function () {
                return Inertia('admin/bi-platforms/index');
            });
        });
        Route::prefix('bi-dashboards')->group(function () {
            Route::get('/', function () {
                return Inertia('admin/bi-dashboards/index');
            });
        });
        Route::get('explore', function () {
            return Inertia('menu-cards/index');
        });


  /*  });*/

});

