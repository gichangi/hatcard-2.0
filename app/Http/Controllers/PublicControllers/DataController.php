<?php

namespace App\Http\Controllers\PublicControllers;

use App\Http\Controllers\Controller;
use App\Models\ProgressiveModel;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function progressiveModelData(): \Illuminate\Http\JsonResponse
    {
        //
        $data = ProgressiveModel::all('region','year','component','pillar','category', 'measure','measure_name', 'value');
        return response()->json(['progressive_model'=> $data],200);
    }


}
