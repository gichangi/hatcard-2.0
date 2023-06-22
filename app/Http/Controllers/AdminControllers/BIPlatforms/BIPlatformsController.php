<?php

namespace App\Http\Controllers\AdminControllers\BIPlatforms;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\BIPlatforms;
use App\Models\AdminModels\Organisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class BIPlatformsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $platforms = BIPlatforms::all();
        return response()->json(['platforms'=> $platforms],200);
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
        try {

            //Check for item id. If id is present update if non create
            $itemId = array_key_exists("id",$request->all())?$request->id:null;
            //Use update or create method
            $biPlatform = BIPlatforms::updateOrCreate(['id'=>$itemId],$request->all());
            //if item id is null then add created by else only update last updated by
            if($itemId == null) {
                $biPlatform->created_by = Auth::id();
            }

            $biPlatform->last_updated_by =Auth::id();
            $biPlatform->save();
            return response()->json(['message' => ['type'=>'success']], 200);
        }catch (Throwable $e){
            return response()->json(['message' => ['type'=>'error','message'=>$e]], 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(BIPlatforms $bIPlatforms)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BIPlatforms $bIPlatforms)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BIPlatforms $bIPlatforms)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BIPlatforms $bIPlatforms)
    {
        //
    }
}
