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

Route::middleware('auth')->group(function(){
    Route::get('/sample-page', function () {
        return Inertia('extra/SamplePage');
    });
    Route::get('/admin/menu-management', function () {
        return Inertia('admin/MenuManagement');
    });

});

