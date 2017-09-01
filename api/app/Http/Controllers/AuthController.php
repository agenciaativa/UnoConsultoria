<?php

namespace App\Http\Controllers;

use Validator;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuthExceptions\JWTException;

class AuthController extends Controller
{
	public function index()
	{
		// TODO: show users
	}    

	public function login(Request $request)
	{

		$rules = [
			'name' => 'required',
			'password' => 'required',
		];

		$input = $request->only('name', 'password');

		$messages = [
			'required' => 'Campo obrigatório'
		];
		
		$validator = Validator::make($input, $rules, $messages);

		if ($validator->fails()) 
		{
			$error = $validator->messages()->toJson();
			return response()->json(['success'=> false, 'error'=> $error]);
		}
		$credentials = [
			'name' => $request->name,
			'password' => $request->password
		];

		try {
			// attempt to verify the credentials and create a token for the user
			if (! $token = JWTAuth::attempt($credentials)) {
				return response()->json(['success' => false, 'error' => 'Usuário ou senha incorreto!'], 401);
			}
		} catch (JWTException $e) {
			// something went wrong whilst attempting to encode the token
			return response()->json(['success' => false, 'error' => 'could_not_create_token'], 500);
		}
		// all good so return the token
		return response()->json(['success' => true, 'token' => $token]);
	}

	/**
	 * Log out
	 * Invalidate the token, so user cannot use it anymore
	 * They have to relogin to get a new token
	 *
	 * @param Request $request
	 */
	public function logout(Request $request) 
	{
		$this->validate($request, ['token' => 'required']);
		try {
			JWTAuth::invalidate($request->input('token'));
			return response()->json(['success' => true]);
		} catch (JWTException $e) {
			// something went wrong whilst attempting to encode the token
			return response()->json(['success' => false, 'error' => 'Falha ao deslogar. Por favor, tente novamente!'], 500);
		}
	}

	public function show(Request $request){
		$user = JWTAuth::toUser($request->token);
		return response()->json(['user' => $user]);
	}

	public function register(Request $request){
        $user = User::create([
          'name' => $request->get('name'),
          'email' => $request->get('email'),
          'password' => bcrypt($request->get('password'))
        ]);
        return response()->json(['status' => true, 'message' => 'Usuário criado com sucesso!']);
    }

}