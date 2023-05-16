<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\MenuGroup;

class MenuGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //pull all menu items
        $menu_groups = MenuGroup::all();
        return response()->json(['navigation_menu_items' => $menu_groups], 200);
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
