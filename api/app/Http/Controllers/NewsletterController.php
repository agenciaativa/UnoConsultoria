<?php

namespace App\Http\Controllers;

use Validator;
use App\Newsletter;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$newsletters = Newsletter::all();
		return response()->json(['news' => $newsletters, 'message' => '']);
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

		$rules = array(
			'email'  => 'required|email',
		);

		$messages = [
			'required' => 'Campo obrigatório',
			'email' => 'E-mail inválido',
		];

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, [
			'email' => 'required|email'
		], $messages);

		$message = 'Não foi possível adicionar o e-mail!';
		$classe = 'alert-danger';

		if ($validator->fails()) 
			return response()->json(['message' => $validator->errors()->first(), 'classe' => $classe]);
		else 
		{
			if (Newsletter::updateOrCreate($input)) 
			{
				$message = 'E-mail adicionado com sucesso!';
				$classe = 'alert-success';
			}

			return response()->json(['message' => $message, 'classe' => $classe]);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Newsletter  $newsletter
	 * @return \Illuminate\Http\Response
	 */
	public function show(Newsletter $newsletter)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Newsletter  $newsletter
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Newsletter $newsletter)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Newsletter  $newsletter
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Newsletter  $newsletter
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		$message = 'Não foi possível excluir o e-mail!';
		$newsletter = Newsletter::find($id);
		if ($newsletter->delete())
			$message = 'E-mail excluído com sucesso!';

		$newsletters = Newsletter::all();

		return response()->json(['news' => $newsletters, 'message' => $message]);
	}
}
