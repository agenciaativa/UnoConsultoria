<?php

namespace App\Http\Controllers;

use App\Case;
use App\Cases;
use Illuminate\Http\Request;

class CaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $case = Case::first();
        $cases = Cases::all();
        return response()->json(['text' => $case, 'cases' => $cases, 'message' => '']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Case  $case
     * @return \Illuminate\Http\Response
     */
    public function show(Case $case)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Case  $case
     * @return \Illuminate\Http\Response
     */
    public function edit(Case $case)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Case  $case
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Case $case)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Case  $case
     * @return \Illuminate\Http\Response
     */
    public function destroy(Case $case)
    {
        //
    }
}
