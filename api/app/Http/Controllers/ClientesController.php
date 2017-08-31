<?php

namespace App\Http\Controllers;

use Storage;
use Validator;
use App\Clientes;
use App\Http\Requests\ClientesRequest;
use Illuminate\Http\Request;

class ClientesController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$clientes = Clientes::with('case')->get();
		return response()->json(['clientes' => $clientes, 'message' => '']);
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
	public function store(ClientesRequest $request)
	{
		$message = 'Não foi possível inserir o cliente!';
		$filepath = upload_file($request->file, 'uploads/clientes');
		$input = [
			'title_client' => $request->title_client,
			'image_client_path' => $filepath
		];
		if (Clientes::create($input)) 
			$message = 'Cliente inserido com sucesso!';

		$clientes = Clientes::all();

		return response()->json(['clientes' => $clientes, 'message' => $message]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Clientes  $clientes
	 * @return \Illuminate\Http\Response
	 */
	public function show(Clientes $clientes)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Clientes  $clientes
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Clientes $clientes)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Clientes  $clientes
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Clientes $clientes, $id)
	{
		$input = $request->all();

		$rules = array(
			'title_client'  => 'required',
		);

		$messages = [
			'required' => 'Campo obrigatório',
		];

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, [
			'title_client' => 'required'
		], $messages);

		$message = 'Não foi possível alterar o registro!';
		$classe = 'alert-danger';

		if ($validator->fails()) 
		{
			$clientes = Clientes::where('status', 1)->get();

			return response()->json(['clientes' => $clientes, 'message' => $validator->errors()->first(), 'classe' => $classe]);
		} 
		else 
		{
			$cliente = Clientes::find($id);
			$cliente->title_client = $input['title_client'];
			$cliente->image_client_path = $input['image_client_path'];

			if ($file = $request->file('file'))
			{
				$stored_file = public_path('storage/').$cliente->image_client_path;
				$cliente->image_client_path = upload_file($file, 'uploads/clientes', $stored_file);
			}
			

			if ($cliente->save()) 
			{
				$message = 'Registro alterado com sucesso!';
				$classe = 'alert-success';
			}

			$clientes = Clientes::where('status', 1)->get();

			return response()->json(['clientes' => $clientes, 'message' => $message, 'classe' => $classe]);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Clientes  $clientes
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Clientes $clientes, $id)
	{
		$message = 'Não foi possível excluir o cliente!';
		$cliente = $clientes::find($id);
		$stored_file = public_path('storage/').$cliente->image_client_path;
		if ($cliente->delete())
		{
			@unlink($stored_file);
			$message = 'Cliente excluído com sucesso!';
		}

		$clientes = Clientes::all();

		return response()->json(['clientes' => $clientes, 'message' => $message]);
	}
}