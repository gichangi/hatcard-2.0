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
        $MenuTree = MenuItems::all();
        return response()->json(['menu_items' => $MenuTree], 200);
    }
    /**
     * Show menu with nested parenting using parent id field;
     */
    public function menuTree()
    {
        //pull all menu items
        $MenuTree = MenuItems::with('children')
            ->select('id','name as title','menu_type as type','menu_category as category','menu_url as url','menu_icon as icon','order_id')
            ->where('parent_id',null)
            ->orderBy('order_id')
            ->get();
        return response()->json(['navigation_menu_items' => $MenuTree], 200);
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
