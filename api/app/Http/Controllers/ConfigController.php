<?php

namespace App\Http\Controllers;

use Storage;
use Validator;
use App\Config;
use App\Http\Requests\ConfigRequest;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$config = Config::all();
		return response()->json(['config' => $config, 'message' => '']);
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
	public function store(ConfigRequest $request)
	{
		$message = 'Não foi possível salvar o registro!';
		$ext = $request->file->getClientOriginalExtension();
		$filepath = upload_file($request->file, 'uploads/images', null, 'logo.'.$ext);
		$input = [
			'sender' => $request->sender,
			'phone' => $request->phone,
			'address' => $request->address,
			'lat' => $request->lat,
			'lon' => $request->lon,
			'logo_filepath' => $filepath,
			'facebook' => $request->facebook ?? '',
			'instagram' => $request->instagram ?? '',
			'linkedin' => $request->linkedin ?? '',
			'twitter' => $request->twitter ?? ''
		];
		if (Config::create($input)) 
			$message = 'Configurações salvas com sucesso!';

		$config = Config::all();

		return response()->json(['config' => $config, 'message' => $message]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Config  $config
	 * @return \Illuminate\Http\Response
	 */
	public function show(Config $config)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Config  $config
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Config $config)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Config  $config
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		$input = $request->all();

		$rules = array(
			'sender' => 'required|email',
			'phone' => 'required',
			'address' => 'required',
			'lat' => 'required',
			'lon' => 'required'
		);

		$messages = [
			'required' => 'Campo obrigatório',
			'email' => 'E-Mail inválido'
		];

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, [
			'sender' => 'required|email',
			'phone' => 'required',
			'address' => 'required',
			'lat' => 'required',
			'lon' => 'required'
		], $messages);

		$message = 'Não foi possível alterar o registro!';
		$classe = 'alert-danger';

		if ($validator->fails()) 
		{
			$config = Config::all();

			return response()->json(['config' => $config, 'message' => $validator->errors()->first(), 'classe' => $classe]);
		} 
		else 
		{
			$config = Config::first();
			$config->sender = $input['sender'];
			$config->phone = $input['phone'];
			$config->address = $input['address'];
			$config->lat = $input['lat'];
			$config->lon = $input['lon'];
			$config->banner_count = $input['banner_count'];
			$config->facebook = $input['facebook'] ?? '';
			$config->instagram = $input['instagram'] ?? '';
			$config->linkedin = $input['linkedin'] ?? '';
			$config->twitter = $input['twitter'] ?? '';

			if ($file = $request->file('file'))
			{
				$stored_file = public_path('storage/').$config->logo_filepath;
				$ext = $file->getClientOriginalExtension();
				$config->logo_filepath = upload_file($file, 'uploads/images', $stored_file, 'logo.'.$ext);
			}

			if ($config->save()) 
			{
				$message = 'Configurações alteradas com sucesso!';
				$classe = 'alert-success';
			}

			$config = Config::all();

			return response()->json(['config' => $config, 'message' => $message, 'classe' => $classe]);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Config  $config
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Config $config)
	{
		//
	}
}
