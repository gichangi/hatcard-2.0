<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\MenuItems;
use App\Models\User;

class MenuItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //pull all menu items
        $menu_items = MenuItems::all();
        return response()->json(['menu_items' => $menu_items], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Register a new system user
     */
}
