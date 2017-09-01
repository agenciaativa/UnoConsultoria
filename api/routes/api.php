<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::group(['middleware' => ['cors'], 'prefix' => '/v1'], function() {

	Route::post('user/register', 'AuthController@register');

	Route::post('user/login', 'AuthController@login');

	Route::post('user/logout', 'AuthController@logout');

	Route::post('/sendmail', 'EmailController@send');

	Route::apiResource('banners', 'BannerController', ['only' => 'index']);

	Route::apiResource('case', 'CaseController', ['only' => 'index']);

	Route::apiResource('cases', 'CasesController', ['only' => [
		'index', 'show'
	]]);

	Route::apiResource('cliente', 'ClienteController', ['only' => 'index']);
	
	Route::apiResource('clientes', 'ClientesController', ['only' => 'index']);

	Route::apiResource('config', 'ConfigController', ['only' => 'index']);

	Route::apiResource('contato', 'ContatoController', ['only' => 'index']);

	Route::apiResource('empresa', 'EmpresaController', ['only' => 'index']);

	Route::apiResource('home', 'HomeController', ['only' => 'index']);

	Route::apiResource('news', 'NewsletterController', ['only' => [
		'store', 'update'
	]]);

	Route::apiResource('servicos', 'ServicosController', ['only' => 'index']);

    Route::apiResource('blog', 'BlogController', ['only' => 'index']);

});

Route::group(['middleware' => ['cors', 'jwt.auth'], 'prefix' => '/v1'], function() {

	Route::get('/user', 'AuthController@show');

});

Route::group(['middleware' => ['cors', 'jwt.auth'], 'prefix' => '/v1'], function() {
	

	Route::apiResource('banners', 'BannerController', ['only' => [
		'show', 'store', 'update', 'destroy'
	]]);

	Route::apiResource('case', 'CaseController', ['only' => [
		'show', 'store', 'update', 'destroy'
	]]);

	Route::apiResource('cases', 'CasesController', ['only' => [
		'store', 'update', 'destroy'
	]]);

	Route::apiResource('cliente', 'ClienteController', ['only' => [
		'show', 'store', 'update', 'destroy'
	]]);
	
	Route::apiResource('clientes', 'ClientesController', ['only' => [
		'show', 'store', 'update', 'destroy'
	]]);

	Route::apiResource('config', 'ConfigController', ['only' => [
		'show', 'store', 'update', 'destroy'
	]]);

	Route::apiResource('contato', 'ContatoController', ['only' => [
		'show', 'store', 'update', 'destroy'
	]]);

	Route::apiResource('empresa', 'EmpresaController', ['only' => [
		'show', 'store', 'update', 'destroy'
	]]);

	Route::apiResource('home', 'HomeController', ['only' => [
		'show', 'store', 'update', 'destroy'
	]]);

	Route::apiResource('news', 'NewsletterController', ['only' => [
		'index', 'show','destroy'
	]]);

	Route::apiResource('servicos', 'ServicosController', ['only' => [
		'show', 'store', 'update', 'destroy'
	]]);

    Route::apiResource('blog', 'BlogController', ['only' => [
		'show', 'store', 'update', 'destroy'
	]]);

});