<?php

namespace App\Http\Controllers;

use File;
use Validator;
use App\Cases;
use App\Clientes;
use App\Http\Requests\CasesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Intervention\Image\ImageManagerStatic as Image;

class CasesController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$cases = Cases::with('cliente')->get();
		return response()->json(['cases' => $cases, 'message' => '']);
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
	public function store(CasesRequest $request)
	{
		$message = 'Não foi possível inserir case!';
		$thumbs_path = 'uploads/cases/thumbs/';
		$fullpath = storage_path('app/public/').$thumbs_path;
		$file = $request->file;
		$filepath = upload_file($file, 'uploads/cases');
		$thumb = Image::make($file->getRealPath());
		$ext = $file->getClientOriginalExtension();
		$filename = Str::random(40).'.'.$ext;
		$thumb_filepath = $thumbs_path.$filename;

		if(!File::exists($fullpath)) 
			File::makeDirectory($fullpath, 0777, true, true);

		$thumb->fit(360, 244)->save($fullpath.$filename);

		$input = [
			'title' => $request->title,
			'description' => $request->description,
			'text' => $request->text,
			'filepath' => $filepath,
			'thumbnail' => $thumb_filepath,
			'slug' => str_slug($request->title, '-')
		];

		if ($case = Cases::create($input))
		{
			$message = 'Case inserido com sucesso!';
			
			if (isset($request->cliente['id'])) 
			{
				$cliente = Clientes::find($request->cliente['id']);
				$case->cliente()->associate($cliente);
				$case->save();
			}
		} 

		$cases = Cases::with('cliente')->get();

		return response()->json(['cases' => $cases, 'message' => $message]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Cases  $cases
	 * @return \Illuminate\Http\Response
	 */
	public function show($param)
	{
		$case = Cases::where('id', $param)->orWhere('slug', $param)->first();
		return response()->json(['case' => $case, 'message' => '']);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Cases  $cases
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Cases $cases)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Cases  $cases
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Cases $cases, $id)
	{
		$input = $request->all();

		$rules = array(
			'title'  => 'required',
			'description'  => 'required',
			'text'  => 'required',
		);

		$messages = [
			'required' => 'Campo obrigatório',
		];

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, [
			'title' => 'required',
			'description'  => 'required',
			'text' => 'required'
		], $messages);

		$message = 'Não foi possível alterar o registro!';
		$classe = 'alert-danger';

		if ($validator->fails()) 
		{
			$cases = Cases::with('cliente')->get();

			return response()->json(['cases' => $cases, 'message' => $validator->errors()->first(), 'classe' => $classe]);
		} 
		else 
		{
			$case = Cases::find($id);
			$case->title = $input['title'];
			$case->description = $input['description'];
			$case->text = $input['text'];
			$case->slug = str_slug($input['title'], '-');
			
			if ($file = $request->file('file'))
			{
				$stored_file = public_path('storage/').$case->filepath;
				$case->filepath = upload_file($file, 'uploads/cases', $stored_file);
				
				if ($stored_thumb = public_path('storage/').$case->thumbnail)
				{
					$thumbs_path = 'uploads/cases/thumbs/';
					$fullpath = storage_path('app/public/').$thumbs_path;
					$thumb = Image::make($file->getRealPath());
					$ext = $file->getClientOriginalExtension();
					$filename = Str::random(40).'.'.$ext;
					$thumb_filepath = $thumbs_path.$filename;
					
					if(!File::exists($fullpath)) 
						File::makeDirectory($fullpath, 0777, true, true);

					if ($thumb->fit(360, 244)->save($fullpath.$filename))
					{
						@unlink($stored_thumb);
						$case->thumbnail = $thumb_filepath;
					}
				}				
			}
			
			if (isset($request->cliente['id'])) 
			{
				$cliente = Clientes::find($request->cliente['id']);
				$case->cliente()->associate($cliente);
			}

			if ($case->save()) 
			{
				$message = 'Registro alterado com sucesso!';
				$classe = 'alert-success';
			}

			$cases = Cases::with('cliente')->get();

			return response()->json(['cases' => $cases, 'message' => $message, 'classe' => $classe]);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Cases  $cases
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Cases $cases, $id)
	{
		$message = 'Não foi possível excluir case!';
		$case = $cases::find($id);
		$stored_file = public_path('storage/').$case->filepath;
		$stored_thumb = public_path('storage/').$case->thumbnail;
		if ($case->delete())
		{
			@unlink($stored_file);
			@unlink($stored_thumb);
			$message = 'Case excluído com sucesso!';
		}

		$cases = Cases::with('cliente')->get();

		return response()->json(['cases' => $cases, 'message' => $message]);
	}
}
