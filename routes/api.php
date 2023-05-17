<?php

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;

    /*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider and all of them will
    | be assigned to the "api" middleware group. Make something great!
    |
    */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [\App\Http\Controllers\UserManagement\UserController2::class, 'register']);
Route::post('/login', [\App\Http\Controllers\UserManagement\AuthController::class, 'login']);
Route::get('/users', [\App\Http\Controllers\UserManagement\UserController2::class, 'all_users']);



Route::middleware('auth:api')->group(function(){
    Route::get('/menu-items', [\App\Http\Controllers\AdminControllers\MenuItemsController::class, 'index']);
    Route::get('/menu-tree', [\App\Http\Controllers\AdminControllers\MenuItemsController::class, 'menuTree']);
    Route::post('/user/details', [\App\Http\Controllers\UserManagement\UserController::class, 'details']);
});
