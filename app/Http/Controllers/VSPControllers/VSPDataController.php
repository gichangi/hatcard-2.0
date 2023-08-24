<?php

namespace App\Http\Controllers\VSPControllers;

use App\Http\Controllers\Controller;
use App\Models\ProgressiveModel;
use App\Models\VSPData;
use Illuminate\Http\Request;

class VSPDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        //
        $data = VSPData::all();
        return response()->json(['vsp_data'=> $data],200);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(VSPData $vSPData)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VSPData $vSPData)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VSPData $vSPData)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VSPData $vSPData)
    {
        //
    }
}
