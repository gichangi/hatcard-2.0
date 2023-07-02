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

    Route::post('/user/details', [\App\Http\Controllers\UserManagement\UserController::class, 'details']);

Route::middleware('auth:api')->group(function(){
    Route::get('/menu-items', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'index']);
    Route::post('/menu-items', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'store']);
    Route::delete('/menu-items', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'destroy']);
    Route::get('/menu-child-items/{id}', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'childItems']);
    Route::post('/menu-groups/order', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'orderItems']);
    Route::get('/menu-tree/{id?}', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'navigationTree']);
    Route::get('/menu-cards/{id?}', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'navigationCard']);

    Route::get('/menu-groups', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'getMenuGroups']);
    Route::prefix('organisations')->group(function () {
        Route::controller(\App\Http\Controllers\AdminControllers\Organisation\OrganisationController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
        });
    });
    Route::prefix('bi-platforms')->group(function () {
        Route::controller(\App\Http\Controllers\AdminControllers\BIPlatforms\BIPlatformsController::class)->group(function () {
            Route::get('/{platform_type?}/{config_status?}', 'index');
            Route::post('/', 'store');
            Route::post('/configs', 'saveConfiguration');
        });
    });
    Route::prefix('tableau')->group(function () {
        Route::controller(App\Http\Services\TableauServices\TableauServerServices::class)->group(function () {
            Route::post('/check', 'credentialCheck');
            Route::post('/projects', 'getProjects');
            Route::post('/workbooks', 'fetchWorkbooks');
        });
    });
});
