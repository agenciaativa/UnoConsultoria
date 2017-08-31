<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfigRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'sender' => 'required|email',
			'phone' => 'required',
			'address' => 'required',
			'lat' => 'required',
			'lon' => 'required',
			'file' => 'required|image|mimes:jpeg,jpg,png,svg|max:1024'
		];
	}

	/**
	 * Determine the messages rules that apply to the request.
	 *
	 * @return array
	 */
	public function messages()
	{
		return [
			'required' => 'Campo obrigatório',
			'image' => 'Arquivo não suportado',
			'mimes' => 'Extensão de arquivo inválida',
			'max' => 'Imagem excedeu o limite de tamanho',
			'dimensions' => 'Dimensões inválidas da imagem',
			'uploaded' => 'Falha ao enviar imagem',
			'email' => 'E-Mail inválido',
		];
	}

	/**
	 * Get the proper failed validation response for the request.
	 *
	 * @param  array  $errors
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function wantsJson()
	{
		return true;
	}
}
