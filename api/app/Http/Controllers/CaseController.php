<?php

namespace App\Http\Controllers;

use Validator;
use App\Cases;
use App\CaseText;
use Illuminate\Http\Request;
use App\Http\Requests\CaseRequest;

class CaseController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$case = CaseText::first();
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
	public function store(CaseRequest $request)
	{
		$message = 'Não foi possível inserir o registro!';

		if (CaseText::create($request->all())) 
			$message = 'Registro inserido com sucesso!';

		$case = CaseText::first();

		return response()->json(['text' => $case, 'message' => $message]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\CaseText  $case
	 * @return \Illuminate\Http\Response
	 */
	public function show(CaseText $case)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\CaseText  $case
	 * @return \Illuminate\Http\Response
	 */
	public function edit(CaseText $case)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\CaseText  $case
	 * @return \Illuminate\Http\Response
	 */
	public function update(CaseRequest $request, CaseText $case)
	{
		$input = $request->all();

		$rules = array(
			'title'  => 'required',
			'subtitle'  => 'required',
		);

		$messages = [
			'required' => 'Campo obrigatório',
		];

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, [
			'title' => 'required',
			'subtitle' => 'required'
		], $messages);

		$message = 'Não foi possível alterar o registro!';
		$classe = 'alert-danger';

		if ($validator->fails()) 
		{
			$case = CaseText::first();

			return response()->json(['text' => $case, 'message' => $validator->errors()->first(), 'classe' => $classe]);
		} 
		else 
		{
			$message = 'Não foi possível alterar o registro!';
			if ($case->fill($request->all())->save())
				$message = 'Registro alterado com sucesso!';

			$case_text = CaseText::first();

			return response()->json(['text' => $case_text, 'message' => $message]);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\CaseText  $case
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(CaseText $case)
	{
		//
	}
}
