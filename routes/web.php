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
    Route::get('/sample-page', function () {
        return Inertia('extra/SamplePage');
    });
    Route::get('/admin/menu-management', function () {
        return Inertia('admin/MenuManagement');
    });
    Route::get('/admin/users', function () {
        return Inertia('admin/MenuManagement');
    });
    Route::get('/admin/menu-management/menu', function () {
        return Inertia('admin/menu-management/menu');
    });
});

