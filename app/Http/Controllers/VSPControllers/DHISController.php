<?php

namespace App\Http\Controllers\VSPControllers;

use App\Http\Controllers\Controller;
use App\Jobs\DHISPullJob;
use App\Models\DHISData;
use App\Models\ProgressiveModel;
use App\Models\EquityData;
use App\Models\EquityUpload;
use DateInterval;
use DatePeriod;
use DateTime;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
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
        $data =DB::select('SELECT distinct periodid, created_at ::timestamp::date from public.dhis_data order by periodid desc');

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

    public function  periodData(Request $request): \Illuminate\Http\JsonResponse
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
                $url = 'https://hiskenya.org/api/analytics.csv?dimension=pe:'.$request->period_id.'&dimension=dx:'.$indicator.'&dimension=ou:HfVjCurKxh2;LEVEL-JwTgQwgnl8h&tableLayout=true&rows=pe;dx;ou&skipRounding=false&completedOnly=false&hideEmptyRows=true';
                $username = 'gichangijohn';
                $password = 'Gigi@123';
                DHISPullJob::dispatch($url,$request->period_id,$username,$password);
            }
            $data =DB::table('dhis_data')
                ->where('periodid',$request->period_id)
                ->select('periodid','organisationunitname','dataid', 'dataname','total')
                ->get();
            return response()->json(["message"=>['type'=>'success','dhis_data'=>  $data]],200);
        }catch (\Exception $e){
            error_log("exception -> ".$e);
        }

    }

    public function fetchAllData()
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
                error_log('period pull -> '.$dt->format("Ym"));
                foreach ($indicators as $indicator){
                    $url = 'https://hiskenya.org/api/analytics.csv?dimension=pe:'.$dt->format("Ym").'&dimension=dx:'.$indicator.'&dimension=ou:HfVjCurKxh2;LEVEL-JwTgQwgnl8h&tableLayout=true&rows=pe;dx;ou&skipRounding=false&completedOnly=false&hideEmptyRows=true';
                    $username = 'gichangijohn';
                    $password = 'Gigi@123';
                    DHISPullJob::dispatch($url,$dt->format("Ym"),$username,$password);
                }
            }
            return 'jobs ran successfully';
        }
        catch (\Exception $e){
            error_log("exception -> ".$e);
            return 'jobs ran failed';
        }

    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd([$request->data[0]]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        //
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
    }
}
