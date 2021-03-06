<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CaseRequest extends FormRequest
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
		return [ 'title' => 'required', 'subtitle' => 'required' ];
	}

	/**
	 * Determine the messages rules that apply to the request.
	 *
	 * @return array
	 */
	public function messages()
	{
		return [ 'required' => 'Campo obrigatório' ];
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
