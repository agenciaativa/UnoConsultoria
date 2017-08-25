<?php

namespace App\Http\Controllers;

use File;
use Storage;
use Validator;
use App\Servicos;

use App\Http\Requests\ServicosRequest;
use Illuminate\Http\Request;

class ServicosController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$servicos = Servicos::orderBy('position', 'asc')->get();
		$next = collect($servicos)->max('position') + 1;
		$find = '<svg';
		$dtd = '<?xml version="1.0" encoding="iso-8859-1"?>
		<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
		foreach ($servicos as $servico) {
			$image = File::get(public_path('storage/').$servico->image_item_path);
			$pos = strpos($image, $find);
			$out = substr($image, $pos);
			$svg_file = <<<END
$dtd
$out
END;
			$doc = new \DOMDocument();
			$doc->LoadXML($svg_file);
			$tags = $doc->getElementsByTagName('path');
			foreach ($tags as $tag) {
				$fill = '#00343a';			//#55a1a8 (azul claro) || #00343a (azul escuro);
				$tag->setAttribute('fill', $fill);
				
				if ($tag->getAttribute('stroke'))
					$tag->setAttribute('stroke', $fill);
			}
			$servico['image2'] = $doc->saveXML();
		}
		
		return response()->json(['servicos' => $servicos, 'next' => $next, 'message' => '']);
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
	public function store(ServicosRequest $request)
	{
		$message = 'Não foi possível inserir o item!';
		$filepath = upload_file($request->file, 'uploads/servicos-solucoes');
		$input = [
			'title_item' => $request->title_item,
			'text_item' => $request->text_item,
			'image_item_path' => $filepath,
			'link' => $request->link,
			'position' => $request->position
		];
		if (Servicos::create($input)) 
			$message = 'Item inserido com sucesso!';

		$servicos = Servicos::orderBy('position', 'asc')->get();
		$next = collect($servicos)->max('position') + 1;

		return response()->json(['servicos' => $servicos, 'next' => $next, 'message' => $message]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Servicos  $servicos
	 * @return \Illuminate\Http\Response
	 */
	public function show(Servicos $servicos)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Servicos  $servicos
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Servicos $servicos)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Servicos  $servicos
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Servicos $servicos, $id)
	{
		$input = $request->all();

		$rules = array(
			'title_item'  => 'required',
			'text_item'  => 'required',
			'link' => 'required',
			'position' => 'required'
		);

		$messages = [
			'required' => 'Campo obrigatório',
		];

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, [
			'title_item' => 'required',
			'text_item' => 'required',
			'link' => 'required',
			'position' => 'required'
		], $messages);

		$message = 'Não foi possível alterar o registro!';
		$classe = 'alert-danger';

		if ($validator->fails()) 
		{
			$servicos = Servicos::orderBy('position', 'asc')->get();
			$next = collect($servicos)->max('position') + 1;

			return response()->json(['servicos' => $servicos, 'next' => $next, 'message' => $validator->errors()->first(), 'classe' => $classe]);
		} 
		else 
		{
			$servico = Servicos::find($id);
			$servico->title_item = $input['title_item'];
			$servico->text_item = $input['text_item'];
			$servico->link = $input['link'];
			$servico->position = $input['position'];
			$stored_file = public_path('storage/').$servico->image_item_path;
			$file = $request->file('file');

			if ($file)
				$servico->image_item_path = upload_file($file, 'uploads/servicos-solucoes', $stored_file);

			if ($servico->save()) 
			{
				$message = 'Registro alterado com sucesso!';
				$classe = 'alert-success';
			}

			$servicos = Servicos::orderBy('position', 'asc')->get();
			$next = collect($servicos)->max('position') + 1;

			return response()->json(['servicos' => $servicos, 'next' => $next, 'message' => $message, 'classe' => $classe]);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Servicos  $servicos
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Servicos $servicos, $id)
	{
		$message = 'Não foi possível excluir o item!';
		$servico = $servicos::find($id);
		$stored_file = public_path('storage/').$servico->image_item_path;
		if ($servico->delete())
		{
			@unlink($stored_file);
			$message = 'Item excluído com sucesso!';
		}

		$servicos = Servicos::orderBy('position', 'asc')->get();
		$next = collect($servicos)->max('position') + 1;

		return response()->json(['servicos' => $servicos, 'next' => $next, 'message' => $message]);
	}
}
