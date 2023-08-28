<?php

namespace App\Http\Controllers\VSPControllers;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\MenuItems;
use App\Models\VSPData;
use App\Models\VSPUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class VSPUploadsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data =DB::table('vsp_upload')
            ->join('users', 'vsp_upload.created_by', '=', 'users.id')
            ->select('users.first_name','users.middle_name','users.last_name','users.email','vsp_upload.*')
            ->get();
        return response()->json(['vsp_uploads'=> $data],200);
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


            $upload = new VSPUpload();
            $search = VSPUpload::find($id);

            if(VSPUpload::find($id) === null){
                $upload = VSPUpload::updateOrCreate(
                    ["id"=>$id],
                    [
                        'created_by' => Auth::id(),
                        'last_updated_by' => Auth::id()
                    ]
                );
            }else{
                //update vsp upload
                $upload = VSPUpload::updateOrCreate(
                    ["id"=>$id],
                    [
                        'last_updated_by' => Auth::id()
                    ]
                );
                //Delete upload data to upload new data
                $uploadData = VSPData::where('upload_id', $id)->delete();
            }
            if($upload->save()){
                //$upload->vspdata()->insert($request->data);

                foreach ($request->data as $row){

                    $rows= VSPData::updateOrCreate(
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
        $data = VSPData::where('upload_id',$request->id)->get();
        return response()->json(['vsp_data'=> $data],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VSPUpload $vSPUploads)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VSPUpload $vSPUploads)
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
            $uploadData = VSPData::where('upload_id', $id)->delete();
            $uploadUpload = VSPUpload::where('id', $id)->delete();
            return response()->json(['message' => ['type'=>'success']], 200);
        }catch (Throwable $e){
            return response()->json(['message' => ['type'=>'error','message'=>$e]], 200);
        }
    }
}
