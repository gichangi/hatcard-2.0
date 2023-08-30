<?php

namespace App\Http\Controllers\VSPControllers;

use App\Http\Controllers\Controller;
use App\Models\DHISData;
use App\Models\ProgressiveModel;
use App\Models\EquityData;
use App\Models\EquityUpload;
use DateInterval;
use DatePeriod;
use DateTime;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class DHISController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        //
        $data =DB::table('dhis_data')
            ->select('periodid','created_at')
            ->distinct()
            ->get();
        return response()->json(['dhis_data_pulls'=> $data],200);
    }
    public function indicators(): \Illuminate\Http\JsonResponse
    {
        //
        $data =DB::table('dhis_data')
            ->select('dataid','datacode','dataname','datadescription')
            ->distinct()
            ->get();
        return response()->json(['dhis_indicators'=> $data],200);
    }

    public function periodData(Request $request)
    {

        $data =DB::table('dhis_data')
            ->where('periodid',$request->period)
            ->select('periodid','organisationunitname','dataid', 'dataname','total')
            ->get();
        return response()->json(['dhis_data'=> $data],200);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function refresh(Request $request)
    {
        try {
            $indicators =DB::table('vsp_data')
                ->whereNotNull('khis_uid')
                ->select('khis_uid')
                ->distinct()
                ->get()
                ->pluck('khis_uid');

            foreach ($indicators as $indicator){
                $dhis_data = $this->dhisDataPull('https://hiskenya.org/api/analytics.csv?dimension=pe:'.$request->period_id.'&dimension=dx:'.$indicator.'&dimension=ou:HfVjCurKxh2;LEVEL-JwTgQwgnl8h&tableLayout=true&rows=pe;dx;ou&skipRounding=false&completedOnly=false&hideEmptyRows=true','gichangijohn','Gigi@123');
                DHISData::where('periodid', $request->period_id)->delete();
                foreach ($dhis_data as $row){
                    $rows= DHISData::updateOrCreate($row);
                    $rows->save();
                }
            }
            $data =DB::table('dhis_data')
                ->where('periodid',$request->period_id)
                ->select('periodid','organisationunitname','dataid', 'dataname','total')
                ->get();
            return response()->json(["message"=>['type'=>'success','dhis_data'=>  $data]],200);
        }catch (\Exception $e){
            dd($e);
        }

    }

    public function fetchAllData(Request $request)
    {
        try {
            $indicators =DB::table('vsp_data')
                ->whereNotNull('khis_uid')
                ->select('khis_uid')
                ->distinct()
                ->get()
                ->pluck('khis_uid');

            $start    = (new DateTime('2022-01-01'))->modify('first day of this month');
            $end      = (new DateTime())->modify('first day of this month')->modify('-1 months');
            $interval = DateInterval::createFromDateString('1 month');
            foreach (new DatePeriod($start, $interval, $end) as $dt) {
                foreach ($indicators as $indicator){
                    $dhis_data = $this->dhisDataPull('https://hiskenya.org/api/analytics.csv?dimension=pe:'.$dt->format("Ym").'&dimension=dx:'.$indicator.'&dimension=ou:HfVjCurKxh2;LEVEL-JwTgQwgnl8h&tableLayout=true&rows=pe;dx;ou&skipRounding=false&completedOnly=false&hideEmptyRows=true','gichangijohn','Gigi@123');
                    //convert data to json
                    $json_output = json_encode($dhis_data);
                    //DB::table('dhis_data')->insert($dhis_data);
                    DHISData::where('periodid', $dt->format("Ym"))->delete();
                    foreach ($dhis_data as $row){
                        $rows= DHISData::updateOrCreate($row);
                        $rows->save();
                    }
                }
            }
            $data =DB::table('dhis_data')
                ->where('periodid',$request->period_id)
                ->select('periodid','organisationunitname','dataid', 'dataname','total')
                ->get();
            return response()->json(["message"=>['type'=>'success','dhis_data'=>  $data]],200);
        }catch (\Exception $e){
            dd($e);
        }

    }



    public function dhisDataPull($url, $username, $password)
    {
        try {
            $client = new Client();
            $res = $client->request('GET', $url, [
                'verify'=>false,
                'auth' => [$username, $password],
                'headers' => [
                    'Accept' => '*/*',
                    'Accept-Encoding' => 'gzip, deflate',
                    'Cache-Control' => 'no-cache',
                    'Connection' => 'keep-alive'
                ]
            ]);

            $data_array = explode("\n", $res->getBody()->getContents());
            $cols =   array_map('strtolower', explode(",", $data_array[0]));
            $output = [];
            foreach ($data_array as $line_index => $line) {
                if ($line_index > 0 && $line_index < sizeof($data_array)-1) { // I assume the the first line contains the column names.
                    $newLine = [];
                    $values = explode(',', $line);
                    foreach ($values as $col_index => $value) {
                        $newLine[$cols[$col_index]] = $value;
                    }
                    $output[] = $newLine;
                }
            }
            //Returns array of arrays with data
            return $output;
        }catch (\Exception $e){
            dd($e);
            return ["status"=>"error","data"=>$e];
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd([$request->data[0]]);
        try {
            $id = $request->upload_id;


            $upload = new EquityUpload();
            $search = EquityUpload::find($id);

            if(EquityUpload::find($id) === null){
                $upload = EquityUpload::updateOrCreate(
                    ["id"=>$id],
                    [
                        'created_by' => Auth::id(),
                        'last_updated_by' => Auth::id()
                    ]
                );
            }else{
                //update vsp upload
                $upload = EquityUpload::updateOrCreate(
                    ["id"=>$id],
                    [
                        'last_updated_by' => Auth::id()
                    ]
                );
                //Delete upload data to upload new data
                $uploadData = EquityData::where('upload_id', $id)->delete();
            }
            if($upload->save()){
                //$upload->EquityData()->insert($request->data);

                foreach ($request->data as $row){

                    $rows= EquityData::updateOrCreate(
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
        $data = EquityData::where('upload_id',$request->id)->get();
        return response()->json(['equity_data'=> $data],200);
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
            $uploadData = EquityData::where('upload_id', $id)->delete();
            $uploadUpload = EquityUpload::where('id', $id)->delete();
            return response()->json(['message' => ['type'=>'success']], 200);
        }catch (Throwable $e){
            return response()->json(['message' => ['type'=>'error','message'=>$e]], 200);
        }
    }
}
