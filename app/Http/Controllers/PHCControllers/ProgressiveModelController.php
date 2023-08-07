<?php

namespace App\Http\Controllers\PHCControllers;

use App\Http\Controllers\Controller;
use App\Models\ProgressiveModel;
use Illuminate\Http\Request;

class ProgressiveModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        //
        $data = ProgressiveModel::all();
        return response()->json(['progressive_model'=> $data],200);
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
    public function show(ProgressiveModel $progressiveModel)
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
    public function destroy(ProgressiveModel $progressiveModel)
    {
        //
    }
}
