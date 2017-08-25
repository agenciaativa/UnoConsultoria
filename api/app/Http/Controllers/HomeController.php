<?php

namespace App\Http\Controllers;

use App\Home;
use Illuminate\Http\Request;

class HomeController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$home = Home::first();
		return response()->json(['items' => $home, 'message' => '']);
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
		$message = 'Não foi possível salvar o registro!';
		if (Home::create($request->all())) 
			$message = 'Registro salvo com sucesso!';

		$home = Home::first();

		return response()->json(['items' => $home, 'message' => $message]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Home  $home
	 * @return \Illuminate\Http\Response
	 */
	public function show(Home $home)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Home  $home
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Home $home)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Home  $home
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Home $home)
	{
		$message = 'Não foi possível alterar o registro!';
		if ($home->fill($request->all())->save())
			$message = 'Registro alterado com sucesso!';

		$item = Home::first();

		return response()->json(['items' => $item, 'message' => $message]);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Home  $home
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Home $home)
	{
		//
	}
}