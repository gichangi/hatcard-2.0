<?php

namespace App\Http\Controllers\AdminControllers\BIPlatforms;

use App\Http\Controllers\Controller;
use App\Http\Services\TableauServices\TableauServerServices;
use App\Models\AdminModels\BIPlatforms;
use App\Models\AdminModels\Organisation;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class BIPlatformsController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(String $platform_type= '%' , String $config_status='%')
    {
        //use the collection to hide credentials
        $platforms = PlatformResource::collection(BIPlatforms::where([['platform_type','Like',$platform_type],['config_status','Like',$config_status]])->get()->toArray());
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
    public function saveConfiguration(Request $request): \Illuminate\Http\JsonResponse
    {
        try {


            $platform = BIPlatforms::find($request->id);

            $config =  json_decode(json_encode($request->config));

            switch ($platform->platform_type){
                case 'tableau_server':
                    $tableau_service = new TableauServerServices();

                    $config->credentials = $tableau_service->getCredentials($config)['credentials'];
                    break;
            }
            $platform->config_status = 'Configured';
            $platform->config_json = json_encode($config);
            $platform->last_updated_by =Auth::id();
            $platform->save();
            return response()->json(['message'=>['type'=>'success'],200]);
        }catch ( QueryException $e){
            dd($e);
            return response()->json(['message'=>['type'=>'error','message'=>$e],200]);
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
