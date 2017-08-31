<?php

namespace App\Http\Controllers;

use Validator;
use App\Contato;
use Illuminate\Http\Request;

class ContatoController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$contatos = Contato::all();
		return response()->json(['contatos' => $contatos, 'message' => '']);
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
		$input = $request->all();

		$rules = ['subject' => 'required'];

		$messages = ['required' => 'Campo obrigatório'];

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, ['subject' => 'required'], $messages);

		$message = 'Não foi possível alterar o assunto!';
		$classe = 'alert-danger';

		if (Contato::create($input)) {
			$message = 'Assunto adicionado com sucesso!';
			$classe = 'alert-success';
		}

		$contatos = Contato::all();

		return response()->json(['contatos' => $contatos, 'message' => $message]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Contato  $contato
	 * @return \Illuminate\Http\Response
	 */
	public function show(Contato $contato)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Contato  $contato
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Contato $contato)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Contato  $contato
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		$input = $request->all();

		$rules = ['subject' => 'required'];

		$messages = ['required' => 'Campo obrigatório'];

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, ['subject' => 'required'], $messages);

		$message = 'Não foi possível alterar o assunto!';
		$classe = 'alert-danger';

		if ($validator->fails()) 
		{
			$contatos = Contato::all();

			return response()->json(['contatos' => $contatos, 'message' => $validator->errors()->first(), 'classe' => $classe]);
		} 
		else 
		{
			$contato = Contato::find($id);
			$contato->subject = $input['subject'];

			if ($contato->save()) 
			{
				$message = 'Assunto alterado com sucesso!';
				$classe = 'alert-success';
			}

			$contatos = Contato::all();

			return response()->json(['contatos' => $contatos, 'message' => $message, 'classe' => $classe]);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Contato  $contato
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		$message = 'Não foi possível excluir o assunto!';
		$contato = Contato::find($id);

		if ($contato->delete())
			$message = 'Assunto excluído com sucesso!';

		$contatos = Contato::all();

		return response()->json(['contatos' => $contatos, 'message' => $message]);
	}
}
