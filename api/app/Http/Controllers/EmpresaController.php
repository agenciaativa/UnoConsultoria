<?php

namespace App\Http\Controllers;

use Validator;
use App\Empresa;

use App\Http\Requests\EmpresaRequest;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$empresa = Empresa::first();
		return response()->json(['item' => $empresa, 'message' => '']);
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
	public function store(EmpresaRequest $request)
	{
		$message = 'Não foi possível inserir o registro!';
		$ext = $request->file->getClientOriginalExtension();
		$filepath = upload_file($request->file, 'uploads/empresa', null, 'bg_empresa.'.$ext);
		$input = [
			'text_empresa' => $request->text_empresa,
			'text_empresa2' => $request->text_empresa2,
			'background_image_path' => $filepath
		];

		if (Empresa::create($input)) 
			$message = 'Registro inserido com sucesso!';

		$empresa = Empresa::first();

		return response()->json(['item' => $empresa, 'message' => $message]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Empresa  $empresa
	 * @return \Illuminate\Http\Response
	 */
	public function show(Empresa $empresa)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Empresa  $empresa
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Empresa $empresa)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Empresa  $empresa
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Empresa $empresa)
	{
		$input = $request->all();

		$rules = array(
			'text_empresa'  => 'required',
			'text_empresa2'  => 'required',
		);

		$messages = [
			'required' => 'Campo obrigatório',
		];

		if ($request->file) {
			$rules['file'] = 'required|image|mimes:jpeg,jpg,png,svg|max:2048|dimensions:height=723,width=850';
			$messages['max'] = 'Imagem excedeu o limite de tamanho';
			$messages['image'] = 'Arquivo não suportado';
			$messages['mimes'] = 'Extensão de arquivo inválida';
			$messages['uploaded'] = 'Falha ao enviar imagem';
			$messages['dimensions'] = 'Dimensões inválidas da imagem';
		}

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, $rules, $messages);

		$message = 'Não foi possível alterar o registro!';
		$classe = 'alert-danger';

		if ($validator->fails()) 
		{
			$empresa = Empresa::first();

			return response()->json(['item' => $empresa, 'message' => $validator->errors()->first(), 'classe' => $classe]);
		} 
		else 
		{
			$empresa = Empresa::first();
			$empresa->text_empresa = $input['text_empresa'];
			$empresa->text_empresa2 = $input['text_empresa2'];

			if ($file = $request->file('file')) {
				$stored_file = public_path('storage/').$empresa->background_image_path;
				$ext = $file->getClientOriginalExtension();
			
				$empresa->background_image_path = upload_file($file, 'uploads/empresa', $stored_file, 'bg_empresa.'.$ext);
			}

			if ($empresa->save()) 
			{
				$message = 'Registro alterado com sucesso!';
				$classe = 'alert-success';
			}

			$empresa = Empresa::first();

			return response()->json(['item' => $empresa, 'message' => $message, 'classe' => $classe]);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Empresa  $empresa
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Empresa $empresa)
	{
		//
	}
}
