<?php

namespace App\Http\Controllers\AdminControllers\BIDashboards;

use App\Http\Controllers\AdminControllers\MenuManagement\MenuItemController;
use App\Http\Controllers\Controller;
use App\Models\AdminModels\BIDashboards;
use App\Models\AdminModels\MenuItems;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use Throwable;

class BIDashboardsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id = null)
    {
        //Fetch all dashboards

        $dashboards = BIDashboards::where('id','like','%'.$id.'%')->with('menu')
            ->get();
        return response()->json(['dashboards'=> $dashboards],200);
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
    public function store(Request $request)
    {
        try {
            $id = array_key_exists("id",$request->all())?$request->id:null;
            $dashboard = BIDashboards::updateOrCreate(['id'=>$id],$request->all());
            //if item id is null then add created by else only update last updated by
            if($id == null) {
                $dashboard->created_by = Auth::id();
            }
            $dashboard->last_updated_by =Auth::id();
            $dashboard->save();

            if($dashboard->save()){
                $content = new Request();
                $content->data = [
                    "id" => $dashboard->id,
                    "name" => $request->name,
                    "description" => $request->description,
                    "menu_url" =>  "/dashboards/view/",
                    "menu_image"=> $request->config_json['preview_image'],
                    "menu_icon"=> "fa fa-bar-chart",
                    "parent_id"=>$request->parent_menu_uid,
                    "menu_type" => 'item',
                    "menu_category" => "dashboard",
                    "order_id" => 0,
                    "status" => 'active'
                ];
                $content->childItems = [];


                $menuController = new MenuItemController();
                $menuController->store($content);
            }
            return response()->json(['message' => ['type'=>'success']], 200);
        }catch (QueryException $e){
            return response()->json(["message"=>["type"=>"errord","message"=>$e]],200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dashboard = BIDashboards::find($id);
        return response()->json(['dashboard'=> $dashboard],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BIDashboards $bIDashboards)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BIDashboards $bIDashboards)
    {
        //
    }
    /**
     * archive the specified resource in storage.
     */
    public function archive(Request $request)
    {
        $dashboard = BIDashboards::find($request->id);
        $dashboard->status = $request->status;

        if($dashboard->save()){
            $menu = MenuItems::find($request->id);
            $menu->status = $request->status;
            if($menu->save()){
                return response()->json(['message' => ['type'=>'success']], 200);
            }
            return response()->json(['message' => ['type'=>'error','message'=>'Error occurred while updating dashboard menu']], 200);
        }
        return response()->json(['message' => ['type'=>'error','message'=>'Error occurred while updating dashboard']], 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        $dashboard = BIDashboards::find($request->id);
        if($dashboard->delete()){
            $menu = MenuItems::find($request->id);
            if($menu->delete()){
                return response()->json(['message' => ['type'=>'success']], 200);
            }
            return response()->json(['message' => ['type'=>'error','message'=>'Error occurred while deleting dashboard menu']], 200);
        }
        return response()->json(['message' => ['type'=>'error','message'=>'Error occurred while deleting dashboard']], 200);
    }
}
