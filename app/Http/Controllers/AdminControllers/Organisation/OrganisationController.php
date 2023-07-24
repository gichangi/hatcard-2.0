<?php

namespace App\Http\Controllers\AdminControllers\Organisation;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\MenuItems;
use App\Models\AdminModels\Organisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Psy\Util\Json;
use Throwable;

class OrganisationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $organisations = Organisation::orderByDesc('updated_at')->get();
        return response()->json(['organisations'=>$organisations],200);
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
        //
        try {

            //Check for item id. If id is present update if non create
            $itemId = array_key_exists("id",$request->all())?$request->id:null;
            //Use update or create method
            $organisation = Organisation::updateOrCreate(['id'=>$itemId],$request->all());
            //if item id is null then add created by else only update last updated by
            if($itemId == null) {
                $organisation->created_by = Auth::id();
            }
            $organisation->last_updated_by =Auth::id();
            $organisation->save();
            return response()->json(['message' => ['type'=>'success']], 200);
        }catch (Throwable $e){
            return response()->json(['message' => ['type'=>'error','message'=>$e]], 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Organisation $organisation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Organisation $organisation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Organisation $organisation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organisation $organisation)
    {
        //
    }
}
