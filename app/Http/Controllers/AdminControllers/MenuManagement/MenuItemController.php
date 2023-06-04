<?php

namespace App\Http\Controllers\AdminControllers\MenuManagement;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\MenuItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        //pull all menu items
        $menuItems = MenuItems::orderByDesc('updated_at')->get();
        return response()->json(['menu_items' => $menuItems], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $navItem = MenuItems::updateOrCreate(['id'=>$request->id],$request->all());
        //Check if object is
        if($request->id == null) {
            $navItem->created_by = Auth::id();
        }
        $navItem->last_updated_by =Auth::id();
        $navItem->save();
        return response()->json(['message' => ['type'=>'success']], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getMenuGroups(){
        $menuGroups = MenuItems::where([['menu_type','=','group'],['status','=','active']])->get();
        return response()->json(['menu_groups'=>$menuGroups],200);
    }

    //Provide nested object for navigation menu
    public function navigationTree()
    {
        //pull all menu items
        $MenuTree = MenuItems::with('children')
            ->select('id','name as title','menu_type as type','menu_category as category','menu_url as url','menu_icon as icon','order_id')
            ->where('parent_id',null)
            ->orderBy('order_id')
            ->get();
        return response()->json(['navigation_menu_items' => $MenuTree], 200);
    }
}