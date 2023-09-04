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
use App\Models\VSPRoutineView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataController extends Controller
{
    public function progressiveModelData(): \Illuminate\Http\JsonResponse
    {
        //
        //$data = ProgressiveModel::all('region','year','component','pillar','category', 'measure','measure_name', 'value');
        $data = DB::select("Select pd.region, pd.year,pd.components,pd.pillar,pd.category,pd.measure,pd.measure_name,pd.value from pms_data pd inner join(select distinct t.region,t.year, pms_data.upload_id, t.measure_name from (SELECT distinct measure_name, region,year, MAX(updated_at) OVER (PARTITION BY region,year,measure_name) FROM public.pms_data) as t inner join pms_data on t.region = pms_data.region and t.year = pms_data.year and t.max = pms_data.updated_at and t.measure_name = pms_data.measure_name )a on  pd.region = a.region  and pd.upload_id = a.upload_id and pd.measure_name = a.measure_name and pd.year = a.year");
        return response()->json($data,200);
    }
    public function vspData(): \Illuminate\Http\JsonResponse
    {
        //
        //$data = VSPData::all("value","county","period","indicator_on_khis","khis_uid","data_group","data_sub_group","indicator","definition","data_source","category");
        $data = DB::select('Select vsp.county, vsp.period, vsp.data_group, vsp.data_sub_group, vsp.indicator, vsp.value from vsp_data vsp  join (select distinct t.county,t.period,t.data_group,t.data_sub_group, t.data_source, t.indicator, vsp_data.upload_id from ( SELECT distinct  county,period,data_group,data_sub_group,data_source,indicator, MAX(updated_at) OVER (PARTITION BY county,period,data_group,data_sub_group,indicator,data_source) FROM public.vsp_data ) as t inner join vsp_data on t.county = vsp_data.county and t.period = vsp_data.period and t.data_group = vsp_data.data_group and t.data_sub_group = vsp_data.data_sub_group and (t.data_source = vsp_data.data_source OR (t.data_source IS NULL AND vsp_data.data_source IS NULL)) and t.indicator = vsp_data.indicator and t.max = vsp_data.updated_at)a on  vsp.county = a.county and vsp.period = a.period and vsp.data_group = a.data_group and vsp.data_sub_group = a.data_sub_group and (vsp.data_source = a.data_source OR (vsp.data_source IS NULL AND a.data_source IS NULL)) and vsp.indicator = a.indicator  and vsp.upload_id = a.upload_id');

        return response()->json($data,200);
    }
    public function vsproutineData(): \Illuminate\Http\JsonResponse
    {
        //
        $data =VSPRoutineView::select("*")
            ->get()
            ->toArray();
        return response()->json( $data,200);
    }
    public function causeofdeathData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = DB::select("Select cod.county cod.period cod.data_group cod.indicator cod.score from cause_of_death_data cod  join     ( select distinct t.county,t.period,t.data_group,t.indicator, cause_of_death_data.upload_id from ( 	SELECT distinct  county,period,data_group,indicator, MAX(updated_at) OVER (PARTITION BY county,period,data_group,indicator) 	FROM public.cause_of_death_data ) as t inner join cause_of_death_data on 		t.county = cause_of_death_data.county 		and t.period = cause_of_death_data.period 		and t.data_group = cause_of_death_data.data_group 		and t.indicator = cause_of_death_data.indicator 		and t.max = cause_of_death_data.updated_at 	)a on  cod.county = a.county and cod.period = a.period and cod.data_group = a.data_group and cod.indicator = a.indicator  and cod.upload_id = a.upload_id ");
        return response()->json($data,200);
    }
    public function financeData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = DB::select("Select fd.county, fd.period, fd.data_group, fd.indicator, fd.score from finance_data fd  join ( select distinct t.county,t.period,t.data_group,t.indicator, finance_data.upload_id from ( SELECT distinct  county,period,data_group,indicator, MAX(updated_at) OVER (PARTITION BY county,period,data_group,indicator) FROM public.finance_data ) as t inner join finance_data on  t.county = finance_data.county  and t.period = finance_data.period  and t.data_group = finance_data.data_group  and t.indicator = finance_data.indicator  and t.max = finance_data.updated_at )a on  fd.county = a.county and fd.period = a.period and fd.data_group = a.data_group and fd.indicator = a.indicator  and fd.upload_id = a.upload_id ");
        return response()->json( $data,200);
    }
    public function equityData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = DB::select("Select ed.county, ed.sub_county, ed.period, ed.indicator, ed.value from equity_data ed join ( select distinct t.county,t.sub_county,t.period,t.indicator, equity_data.upload_id from ( 	SELECT distinct county,sub_county,period,indicator, MAX(updated_at) OVER (PARTITION BY county,sub_county,period,indicator) 	FROM public.equity_data ) as t inner join equity_data on t.county = equity_data.county and t.sub_county = equity_data.sub_county and t.period = equity_data.period and t.indicator = equity_data.indicator and t.max = equity_data.updated_at 	)a on ed.county = a.county and ed.sub_county = a.sub_county and ed.period = a.period and ed.indicator = a.indicator and ed.upload_id = a.upload_id ");
        return response()->json( $data,200);
    }
    public function rmncahData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = DB::select("Select ed.county, ed.sub_county, ed.period, ed.indicator, ed.value from rmncah_data ed join ( select distinct t.county,t.sub_county,t.period,t.indicator, rmncah_data.upload_id from ( 	SELECT distinct county,sub_county,period,indicator, MAX(updated_at) OVER (PARTITION BY county,sub_county,period,indicator) 	FROM public.rmncah_data ) as t inner join rmncah_data on t.county = rmncah_data.county and t.sub_county = rmncah_data.sub_county and t.period = rmncah_data.period and t.indicator = rmncah_data.indicator and t.max = rmncah_data.updated_at 	)a on ed.county = a.county and ed.sub_county = a.sub_county and ed.period = a.period and ed.indicator = a.indicator and ed.upload_id = a.upload_id");
        return response()->json( $data,200);
    }
    public function rmncahlowhighData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = DB::select("Select fd.county, fd.period, fd.data_group, fd.indicator, fd.score from rmncah_low_high_data fd join ( select distinct t.organisationunitname,rmncah_low_high_data.upload_id from ( SELECT distinct period,organisationunitname, MAX(updated_at) OVER (PARTITION BY period,organisationunitname) FROM public.rmncah_low_high_data ) as t inner join rmncah_low_high_data on t.organisationunitname = rmncah_low_high_data.organisationunitname and t.period = rmncah_low_high_data.period and t.max = rmncah_low_high_data.updated_at )a on fd.organisationunitname = a.organisationunitname and fd.period = a.period and fd.upload_id = a.upload_id");
        return response()->json( $data,200);
    }
    public function dhisData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = DHISData::all("periodid","organisationunitname","dataid","dataname","total");
        return response()->json( $data,200);
    }
}
