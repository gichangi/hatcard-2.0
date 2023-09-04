<?php

namespace App\Http\Controllers\VSPControllers;

use App\Http\Controllers\Controller;
use App\Models\ProgressiveModel;
use App\Models\RMNCAHLowHighData;
use App\Models\RMNCAHLowHighUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class RMNCAHLowHighController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        //
        $data =DB::table('rmncah_low_high_upload')
            ->join('users', 'rmncah_low_high_upload.created_by', '=', 'users.id')
            ->select('users.first_name','users.middle_name','users.last_name','users.email','rmncah_low_high_upload.*')
            ->orderBy('updated_at')
            ->get();
        return response()->json(['rmncah_low_high_uploads'=> $data],200);
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
        //dd([$request->data[0]]);
        try {
            $id = $request->upload_id;


            $upload = new RMNCAHLowHighUpload();
            $search = RMNCAHLowHighUpload::find($id);

            if(RMNCAHLowHighUpload::find($id) === null){
                $upload = RMNCAHLowHighUpload::updateOrCreate(
                    ["id"=>$id],
                    [
                        'created_by' => Auth::id(),
                        'last_updated_by' => Auth::id()
                    ]
                );
            }else{
                //update vsp upload
                $upload = RMNCAHLowHighUpload::updateOrCreate(
                    ["id"=>$id],
                    [
                        'last_updated_by' => Auth::id(),
                        'updated_at'=> now()
                    ]
                );
                //Delete upload data to upload new data
                $uploadData = RMNCAHLowHighData::where('upload_id', $id)->delete();
            }
            if($upload->save()){
                //$upload->RMNCAHLowHighData()->insert($request->data);

                foreach ($request->data as $row){

                    $rows= RMNCAHLowHighData::updateOrCreate(
                        ['id'=>null,'upload_id'=>$upload->id],
                        $row
                    );
                    $rows->save();
                }
            }
            return response()->json(['message' => ['type'=>'success']], 200);
        }catch (Throwable $e){
            return response()->json(['message' => ['type'=>'error','message'=>$e]], 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $data = RMNCAHLowHighData::where('upload_id',$request->id)->get();
        return response()->json(['rmncah_low_high_data'=> $data],200);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProgressiveModel $progressiveModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProgressiveModel $progressiveModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {

        //
        $id = $request->id;

        try {
            $uploadData = RMNCAHLowHighData::where('upload_id', $id)->delete();
            $uploadUpload = RMNCAHLowHighUpload::where('id', $id)->delete();
            return response()->json(['message' => ['type'=>'success']], 200);
        }catch (Throwable $e){
            return response()->json(['message' => ['type'=>'error','message'=>$e]], 200);
        }
    }
}
