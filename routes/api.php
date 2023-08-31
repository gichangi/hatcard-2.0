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



    Route::prefix('user')->group(function () {
        Route::controller(\App\Http\Controllers\UserManagement\UserController::class)->group(function () {
            Route::post('details', 'details');

        });
    });

Route::prefix('public/data')->group(function () {
    Route::controller(\App\Http\Controllers\PublicControllers\DataController::class)->group(function () {
        Route::get('progressive-model', 'progressiveModelData');
        Route::get('vsp', 'vspData');
        Route::get('vsp-routine', 'vsproutineData');
        Route::get('cause-of-death', 'causeofdeathData');
        Route::get('finance', 'financeData');
        Route::get('equity', 'equityData');
        Route::get('rmncah', 'rmncahData');
        Route::get('rmncah-low-high', 'rmncahlowhighData');
        Route::get('dhis', 'dhisData');
    });
});

Route::middleware('auth:api')->group(function(){
    Route::get('/menu-items', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'index']);
    Route::post('/menu-items', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'store']);
    Route::delete('/menu-items', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'destroy']);
    Route::get('/menu-child-items/{id}', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'childItems']);
    Route::post('/menu-groups/order', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'orderItems']);
    Route::get('/menu-tree/{id?}', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'navigationTree']);
    Route::get('/menu-cards/{request_id?}', [\App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController::class, 'navigationCard']);


    Route::prefix('user')->group(function () {
        Route::controller(\App\Http\Controllers\UserManagement\UserController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::post('archive', 'archive');
            Route::delete('/', 'destroy');
            Route::get('/account', 'account');
            Route::post('/checkpermission', 'checkPermission');

        });
    });

    Route::prefix('account')->group(function () {
        Route::controller(\App\Http\Controllers\UserManagement\UserController::class)->group(function () {
            Route::get('/', 'account');
            Route::post('/', 'password');
        });
    });

    Route::prefix('roles')->group(function () {
        Route::controller(\App\Http\Controllers\UserManagement\RoleController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::delete('/', 'destroy');
            Route::get('/permissions', 'getPermissions');
        });
    });

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
    Route::prefix('bi-dashboards')->group(function () {
        Route::controller(\App\Http\Controllers\AdminControllers\BIDashboards\BIDashboardsController::class)->group(function () {
            Route::post('/archive','archive');
            Route::post('/default','setHomepage');
            Route::post('/public','enablePublic');
            Route::get('/homepage','getHomepage');
            Route::get('/find/{id}', 'show');
            Route::get('/{id?}', 'index');
            Route::post('/', 'store');
            Route::delete('/','destroy');

        });
    });

    Route::prefix('tableau')->group(function () {
        Route::controller(App\Http\Services\TableauServices\TableauServerServices::class)->group(function () {
            Route::post('/check', 'credentialCheck');
            Route::post('/projects', 'getProjects');
            Route::post('/workbooks', 'getWorkbooks');
            Route::post('/workbook-views', 'getWorkbookViews');
            Route::post('/workbook-view-image', 'getViewImage');
            Route::post('/view-url', 'generateUrl');
        });
    });

    Route::prefix('vsp-data')->group(function () {
        Route::get('/', [\App\Http\Controllers\VSPControllers\VSPUploadsController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\VSPControllers\VSPUploadsController::class, 'store']);
        Route::delete('/{id?}', [\App\Http\Controllers\VSPControllers\VSPUploadsController::class, 'destroy']);
        Route::get('/data/{id?}', [\App\Http\Controllers\VSPControllers\VSPUploadsController::class, 'show']);
    });
    Route::prefix('pms-data')->group(function () {
        Route::get('/', [\App\Http\Controllers\VSPControllers\ProgressiveModelController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\VSPControllers\ProgressiveModelController::class, 'store']);
        Route::delete('/{id?}', [\App\Http\Controllers\VSPControllers\ProgressiveModelController::class, 'destroy']);
        Route::get('/data/{id?}', [\App\Http\Controllers\VSPControllers\ProgressiveModelController::class, 'show']);
    });
    Route::prefix('finance-data')->group(function () {
        Route::get('/', [\App\Http\Controllers\VSPControllers\FinanceController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\VSPControllers\FinanceController::class, 'store']);
        Route::delete('/{id?}', [\App\Http\Controllers\VSPControllers\FinanceController::class, 'destroy']);
        Route::get('/data/{id?}', [\App\Http\Controllers\VSPControllers\FinanceController::class, 'show']);
    });
    Route::prefix('cause-of-death-data')->group(function () {
        Route::get('/', [\App\Http\Controllers\VSPControllers\CauseOfDeathController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\VSPControllers\CauseOfDeathController::class, 'store']);
        Route::delete('/{id?}', [\App\Http\Controllers\VSPControllers\CauseOfDeathController::class, 'destroy']);
        Route::get('/data/{id?}', [\App\Http\Controllers\VSPControllers\CauseOfDeathController::class, 'show']);
    });
    Route::prefix('equity-data')->group(function () {
        Route::get('/', [\App\Http\Controllers\VSPControllers\EquityController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\VSPControllers\EquityController::class, 'store']);
        Route::delete('/{id?}', [\App\Http\Controllers\VSPControllers\EquityController::class, 'destroy']);
        Route::get('/data/{id?}', [\App\Http\Controllers\VSPControllers\EquityController::class, 'show']);
    });
    Route::prefix('rmncah-data')->group(function () {
        Route::get('/', [\App\Http\Controllers\VSPControllers\RMNCAHController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\VSPControllers\RMNCAHController::class, 'store']);
        Route::delete('/{id?}', [\App\Http\Controllers\VSPControllers\RMNCAHController::class, 'destroy']);
        Route::get('/data/{id?}', [\App\Http\Controllers\VSPControllers\RMNCAHController::class, 'show']);
    });
    Route::prefix('rmncah-low-high-data')->group(function () {
        Route::get('/', [\App\Http\Controllers\VSPControllers\RMNCAHLowHighController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\VSPControllers\RMNCAHLowHighController::class, 'store']);
        Route::delete('/{id?}', [\App\Http\Controllers\VSPControllers\RMNCAHLowHighController::class, 'destroy']);
        Route::get('/data/{id?}', [\App\Http\Controllers\VSPControllers\RMNCAHLowHighController::class, 'show']);
    });
    Route::prefix('dhis-data')->group(function () {
        Route::get('/', [\App\Http\Controllers\VSPControllers\DHISController::class, 'index']);
        Route::get('/indicators', [\App\Http\Controllers\VSPControllers\DHISController::class, 'indicators']);
        //Route::post('/refresh', [\App\Http\Controllers\VSPControllers\DHISController::class, 'refresh']);
        Route::post('/refresh', [\App\Http\Controllers\VSPControllers\DHISController::class, 'fetchAllData']);
        Route::get('/data/{period?}', [\App\Http\Controllers\VSPControllers\DHISController::class, 'periodData']);
        Route::get('/data/fetch-all', [\App\Http\Controllers\VSPControllers\DHISController::class, 'fetchAllData']);
    });
});

