<?php

namespace App\Http\Controllers\PublicControllers;

use App\Http\Controllers\Controller;
use App\Models\CauseOfDeathData;
use App\Models\DHISData;
use App\Models\EquityData;
use App\Models\FinanceData;
use App\Models\ProgressiveModel;
use App\Models\RMNCAHData;
use App\Models\RMNCAHLowHighData;
use App\Models\VSPData;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function progressiveModelData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = ProgressiveModel::all('region','year','component','pillar','category', 'measure','measure_name', 'value');
        return response()->json($data,200);
    }
    public function vspData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = VSPData::all("value","county","period","indicator_on_khis","khis_uid","data_group","data_sub_group","indicator","definition","data_source","category");
        return response()->json($data,200);
    }
    public function vsproutineData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = RMNCAHLowHighData::all("period","county","lowest","highest");
        return response()->json( $data,200);
    }
    public function causeofdeathData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = CauseOfDeathData::all("period","county","data_group","indicator","score");
        return response()->json($data,200);
    }
    public function financeData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = FinanceData::all("period","county","data_group","indicator","definition","data_source","data_sub_group","score");
        return response()->json( $data,200);
    }
    public function equityData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = EquityData::all("period","county","sub_county","indicator","value");
        return response()->json( $data,200);
    }
    public function rmncahData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = RMNCAHData::all("period","county","sub_county","indicator","value");
        return response()->json( $data,200);
    }
    public function rmncahlowhighData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = RMNCAHLowHighData::all("period","county","lowest","highest");
        return response()->json( $data,200);
    }
    public function dhisData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = DHISData::all("periodid","organisationunitname","dataid","dataname","total");
        return response()->json( $data,200);
    }
}
