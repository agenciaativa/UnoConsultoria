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
|
|--------------------------------------------------------------------------
| PREFIX => /api ->	http://api.unogestaodesaude.com.br/api
| MIDDLEWARE => CORS
|--------------------------------------------------------------------------
*/

Route::group(['middleware' => ['cors'] ], function() {
	
	/*
	|--------------------------------------------------------------------------
	| PREFIX => /api ->	http://api.unogestaodesaude.com.br/api
	| MIDDLEWARE => CORS + JWTAuth
	|--------------------------------------------------------------------------
	*/

	//Route::group(['middleware' => ['jwt.auth'] ], function() {
		
		/*
		|--------------------------------------------------------------------------
		| PREFIX => /clear -> http://api.unogestaodesaude.com.br/api/clear
		| MIDDLEWARE => CORS + JWTAuth
		|--------------------------------------------------------------------------
		| CACHE / CONFIG / ROUTE / VIEW -> CLEAR ROUTES
		|--------------------------------------------------------------------------
		| 
		| Here is where we can clear routes, views and configs cache.
		| It's necessary be logged with a valid token to access these routes.
		|
		*/
		
		Route::group(['prefix' => '/clear'], function() {
			Route::get('/cache', function() {
				$exitCode = Artisan::call('cache:clear');
				return response()->json(['message' => '<h1>Cache facade value cleared</h1>']);;
			});
			Route::get('/route', function() {
				$exitCode = Artisan::call('route:clear');
				return response()->json(['message' => '<h1>Route cache cleared</h1>']);
			});
			Route::get('/view', function() {
				$exitCode = Artisan::call('view:clear');
				return response()->json(['message' => '<h1>View cache cleared</h1>']);
			});
		});
		
		/*
		|--------------------------------------------------------------------------
		| PREFIX => /cache -> http://api.unogestaodesaude.com.br/api/cache
		| MIDDLEWARE => CORS + JWTAuth
		|--------------------------------------------------------------------------
		| CACHE / CONFIG / ROUTE / VIEW -> CACHE
		|--------------------------------------------------------------------------
		| 
		| Here is where we can cache routes, views and configs.
		| It's necessary be logged with a valid token to access these routes.
		|
		*/

		Route::group(['prefix' => '/cache'], function() {
			Route::get('/route', function() {
				$exitCode = Artisan::call('route:cache');
				return response()->json(['message' => '<h1>Routes cached</h1>']);
			});
			Route::get('/config', function() {
				$exitCode = Artisan::call('config:cache');
				return response()->json(['message' => '<h1>Clear Config cleared</h1>']);
			});
		});
		
		/*
		|--------------------------------------------------------------------------
		| OPTIMIZE API
		| MIDDLEWARE => CORS + JWTAuth
		|--------------------------------------------------------------------------
		| 
		| Here is where we can optimize our api.
		| It's necessary be logged with a valid token to access these routes.
		|
		*/

		Route::get('/optimize', function() {
			$exitCode = Artisan::call('optimize');
			return response()->json(['message' => '<h1>Reoptimized class loader</h1>']);
		});
		
		/*
		|--------------------------------------------------------------------------
		| STORAGE LINK
		| MIDDLEWARE => CORS + JWTAuth
		|--------------------------------------------------------------------------
		| 
		| Here is where we can create our public storage link.
		| It's necessary be logged with a valid token to access these routes.
		|
		*/

		Route::get('/storage-link', function() {
			$exitCode = Artisan::call('storage:link');
			return response()->json(['message' => '<h1>Storage link created</h1>']);
		});

	//});
	
	/*
	|--------------------------------------------------------------------------
	| PREFIX => /v1 -> http://api.unogestaodesaude.com.br/api/v1
	| MIDDLEWARE => CORS
	|--------------------------------------------------------------------------
	| API (GET) CORE ROUTES
	|--------------------------------------------------------------------------
	| 
	| Here is where we can access all our public data from API.
	| It's not necessary be logged to access these routes.
	|
	*/
	Route::group(['prefix' => '/v1'], function() {
		// Register a new user
		Route::post('user/register', 'AuthController@register');
		// Login
		Route::post('user/login', 'AuthController@login');
		// Logout
		Route::post('user/logout', 'AuthController@logout');
		// Send contact email
		Route::post('/sendmail', 'EmailController@send');
		// GET Banners
		Route::apiResource('banners', 'BannerController', ['only' => 'index']);
		// GET Case Text
		Route::apiResource('case', 'CaseController', ['only' => 'index']);
		// GET Cases
		Route::apiResource('cases', 'CasesController', ['only' => ['index', 'show']]);
		// GET Cliente Text
		Route::apiResource('cliente', 'ClienteController', ['only' => 'index']);
		// GET Clientes
		Route::apiResource('clientes', 'ClientesController', ['only' => 'index']);
		// GET Configs
		Route::apiResource('config', 'ConfigController', ['only' => 'index']);
		// GET Contato
		Route::apiResource('contato', 'ContatoController', ['only' => 'index']);
		// GET Empresa
		Route::apiResource('empresa', 'EmpresaController', ['only' => 'index']);
		// GET Home
		Route::apiResource('home', 'HomeController', ['only' => 'index']);
		// POST Newsletter
		Route::apiResource('news', 'NewsletterController', ['only' => ['store', 'update']]);
		// GET Servicos
		Route::apiResource('servicos', 'ServicosController', ['only' => 'index']);
		// GET Blog
		Route::apiResource('blog', 'BlogController', ['only' => 'index']);
		
		/*
		|--------------------------------------------------------------------------
		| PREFIX => /v1 -> http://api.unogestaodesaude.com.br/api/v1
		| MIDDLEWARES => [CORS, JWTAuth]
		|--------------------------------------------------------------------------
		| API CORE ROUTES -> SHOW, STORE, UPDATE, DESTROY
		|--------------------------------------------------------------------------
		| 
		| Here is where we can access all our public data from API.
		| It's not necessary be logged to access these routes.
		|
		*/

		Route::group(['middleware' => ['jwt.auth'] ], function() {
			// Banners RESOURCE
			Route::apiResource('banners', 'BannerController', 
				['only' => ['show', 'store', 'update', 'destroy']]);

			// Case Text RESOURCE
			Route::apiResource('case', 'CaseController', 
				['only' => ['show', 'store', 'update', 'destroy']]);

			// Cases RESOURCE
			Route::apiResource('cases', 'CasesController', 
				['only' => ['store', 'update', 'destroy']]);

			// Cliente Text RESOURCE
			Route::apiResource('cliente', 'ClienteController', 
				['only' => ['show', 'store', 'update', 'destroy']]);

			// Clientes RESOURCE
			Route::apiResource('clientes', 'ClientesController', 
				['only' => ['show', 'store', 'update', 'destroy']]);

			// Config RESOURCE
			Route::apiResource('config', 'ConfigController', 
				['only' => ['show', 'store', 'update', 'destroy']]);

			// Contato RESOURCE
			Route::apiResource('contato', 'ContatoController', 
				['only' => ['show', 'store', 'update', 'destroy']]);

			// Empresa RESOURCE
			Route::apiResource('empresa', 'EmpresaController', 
				['only' => ['show', 'store', 'update', 'destroy']]);

			// Home RESOURCE
			Route::apiResource('home', 'HomeController', 
				['only' => ['show', 'store', 'update', 'destroy']]);

			// News RESOURCE
			Route::apiResource('news', 'NewsletterController', 
				['only' => ['index', 'show','destroy']]);

			// Servicos RESOURCE
			Route::apiResource('servicos', 'ServicosController', 
				['only' => ['show', 'store', 'update', 'destroy']]);

			// Blog RESOURCE
			Route::apiResource('blog', 'BlogController', 
				['only' => ['show', 'store', 'update', 'destroy']]);
		});
	});
});