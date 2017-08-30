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
	
	Route::post('/sendmail', 'EmailController@send');

	Route::apiResource('banners', 'BannerController');

	Route::apiResource('case', 'CaseController');

	Route::apiResource('cases', 'CasesController');

	Route::apiResource('cliente', 'ClienteController');
	
	Route::apiResource('clientes', 'ClientesController');

	Route::apiResource('config', 'ConfigController');

	Route::apiResource('contato', 'ContatoController');

	Route::apiResource('empresa', 'EmpresaController');

	Route::apiResource('home', 'HomeController');

	Route::apiResource('news', 'NewsletterController');

	Route::apiResource('servicos', 'ServicosController');

    Route::apiResource('blog', 'BlogController');

});