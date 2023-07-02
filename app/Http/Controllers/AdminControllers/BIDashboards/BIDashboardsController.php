<?php

namespace App\Http\Controllers\AdminControllers\BIDashboards;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\BIDashboards;
use Illuminate\Http\Request;

class BIDashboardsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Fetch all dashboards
        $dashbords = BIDashboards::all();
        return response()->json(['dashboards'=> $dashbords],200);
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
    public function show(BIDashboards $bIDashboards)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BIDashboards $bIDashboards)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BIDashboards $bIDashboards)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BIDashboards $bIDashboards)
    {
        //
    }
}
