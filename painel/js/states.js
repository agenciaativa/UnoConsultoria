'use strict';

(function() {
	function config($stateProvider, $urlRouterProvider) {

		/**
		* Helper auth functions
		*/
		var skipIfLoggedIn = ['$q', '$location', '$auth', function($q, $location, $auth) {
			var deferred = $q.defer();
			
			if ($auth.isAuthenticated()) {
				$location.path('/home');
			} else {
				deferred.resolve();
			}

			return deferred.promise;
		}];

		var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
			var deferred = $q.defer();

			if ($auth.isAuthenticated()) {
				deferred.resolve();
			} else {
				$location.path('/login');
			}

			return deferred.promise;
		}];

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'partials/login.html',
				controller: 'loginController',
				resolve: {
					skipIfLoggedIn: skipIfLoggedIn
				}
			})
			.state('app.home', {
				url: '/home',
				templateUrl: 'partials/home.html',
				controller: 'homeController',
				resolve: {
					loginRequired: loginRequired
				}
			})
			.state('app.empresa', {
				url: '/empresa',
				templateUrl: 'partials/empresa.html',
				controller: 'empresaController',
				resolve: {
					loginRequired: loginRequired
				}
			})
			.state('app.servicos-solucoes', {
				url: '/servicos-solucoes',
				templateUrl: 'partials/servicos-solucoes.html',
				controller: 'servicosController',
				resolve: {
					loginRequired: loginRequired
				}
			})
			.state('app.clientes', {
				url: '/clientes',
				templateUrl: 'partials/clientes.html',
				controller: 'clientesController',
				resolve: {
					loginRequired: loginRequired
				}
			})
			.state('app.cases', {
				url: '/cases',
				templateUrl: 'partials/cases.html',
				controller: 'casesController',
				resolve: {
					loginRequired: loginRequired
				}
			})
			/*.state('app.fale-conosco', {
				url: '/fale-conosco',
				templateUrl: 'partials/fale-conosco.html',
				controller: 'contatoController'
			})*/
			.state('app.banners', {
				url: '/banners',
				templateUrl: 'partials/banners.html',
				controller: 'bannersController',
				resolve: {
					loginRequired: loginRequired
				}
			})
			.state('app.newsletter', {
				url: '/newsletter',
				templateUrl: 'partials/newsletter.html',
				controller: 'newsletterController',
				resolve: {
					loginRequired: loginRequired
				}
			})
			.state('app.configuracoes', {
				url: '/configuracoes',
				templateUrl: 'partials/configuracoes.html',
				controller: 'configController',
				resolve: {
					loginRequired: loginRequired
				}
			})

			.state('app.blog', {
				url: '/blog',
				templateUrl: 'partials/blog.html',
				controller: 'blogController',
				resolve: {
					loginRequired: loginRequired
				}
			});

			$urlRouterProvider
				.otherwise('/login');
	};

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	angular.module('ativaApp.states', [])

		.config(config);
})();