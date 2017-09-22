<?php

namespace App\Http\Controllers;

use Storage;
use Validator;
use App\Banner;
use App\Http\Requests\BannersRequest;
use Illuminate\Http\Request;

class BannerController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$banners = Banner::all();
		return response()->json(['banners' => $banners, 'message' => '']);
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
	public function store(BannersRequest $request)
	{
		$message = 'Não foi possível inserir o banner!';
		$filepath = upload_file($request->file, 'uploads/banners');
		$input = [
			'name' => $request->name,
			'description' => $request->description,
			'filepath' => $filepath
		];
		if (Banner::create($input)) 
			$message = 'Banner inserido com sucesso!';

		$banners = Banner::all();

		return response()->json(['banners' => $banners, 'message' => $message]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Banner  $banner
	 * @return \Illuminate\Http\Response
	 */
	public function show(Banner $banner)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Banner  $banner
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Banner $banner)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Banner  $banner
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		$input = $request->all();

		$rules = array(
			'name'  => 'required',
		);

		$messages = [
			'required' => 'Campo obrigatório',
		];

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, [
			'name' => 'required'
		], $messages);

		$message = 'Não foi possível alterar o banner!';
		$classe = 'alert-danger';

		if ($validator->fails()) 
		{
			$banners = Banner::all();

			return response()->json(['banners' => $banners, 'message' => $validator->errors()->first(), 'classe' => $classe]);
		} 
		else 
		{
			$banner = Banner::find($id);
			$banner->name = $input['name'];
			$banner->description = $input['description'];
			
			if ($file = $request->file('file')) {
				$stored_file = public_path('storage/').$banner->filepath;
				$banner->filepath = upload_file($file, 'uploads/banners', $stored_file);
			}

			if ($banner->save()) 
			{
				$message = 'Banner alterado com sucesso!';
				$classe = 'alert-success';
			}

			$banners = Banner::all();

			return response()->json(['banners' => $banners, 'message' => $message, 'classe' => $classe]);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Banner  $banner
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		$message = 'Não foi possível excluir o banner!';
		$banner = Banner::find($id);
		$stored_file = public_path('storage/').$banner->filepath;
		if ($banner->delete())
		{
			@unlink($stored_file);
			$message = 'Banner excluído com sucesso!';
		}

		$banners = Banner::all();

		return response()->json(['banners' => $banners, 'message' => $message]);
	}
}
