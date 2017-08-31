'use strict';

(function() {
	function config($stateProvider) {
		$stateProvider
			.state('app.home', {
				url: '/app',
				templateUrl: 'partials/home.html',
				controller: 'homeController'
			})
			.state('app.empresa', {
				url: '/empresa',
				templateUrl: 'partials/empresa.html',
				controller: 'empresaController'
			})
			.state('app.servicos-solucoes', {
				url: '/servicos-solucoes',
				templateUrl: 'partials/servicos-solucoes.html',
				controller: 'servicosController'
			})
			.state('app.clientes', {
				url: '/clientes',
				templateUrl: 'partials/clientes.html',
				controller: 'clientesController'
			})
			.state('app.cases', {
				url: '/cases',
				templateUrl: 'partials/cases.html',
				controller: 'casesController'
			})
			/*.state('app.fale-conosco', {
				url: '/fale-conosco',
				templateUrl: 'partials/fale-conosco.html',
				controller: 'contatoController'
			})*/
			.state('app.banners', {
				url: '/banners',
				templateUrl: 'partials/banners.html',
				controller: 'bannersController'
			})
			.state('app.newsletter', {
				url: '/newsletter',
				templateUrl: 'partials/newsletter.html',
				controller: 'newsletterController'
			})
			.state('app.configuracoes', {
				url: '/configuracoes',
				templateUrl: 'partials/configuracoes.html',
				controller: 'configController'
			})

            .state('app.blog', {
                url: '/blog',
                templateUrl: 'partials/blog.html',
                controller: 'blogController'
            })
	};

	config.$inject = ['$stateProvider'];

	angular.module('ativaApp.states', [])

		.config(config);
})();

/*
angular.module('ativaApp.states', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/app');

	$stateProvider
		.state('app.home', {
			url: '/home',
			templateUrl: 'partials/home.html',
			controller: 'homeController'
		})
		.state('app.empresa', {
			url: '/empresa',
			templateUrl: 'partials/empresa.html',
			controller: 'homeController'
		})
		.state('app.servicos-solucoes', {
			url: '/servicos-solucoes',
			templateUrl: 'partials/servicos-solucoes.html',
			controller: 'homeController'
		})
		.state('app.clientes', {
			url: '/clientes',
			templateUrl: 'partials/clientes.html',
			controller: 'homeController'
		})
		.state('app.cases', {
			url: '/cases',
			templateUrl: 'partials/cases.html',
			controller: 'homeController'
		})
		.state('app.fale-conosco', {
			url: '/fale-conosco',
			templateUrl: 'partials/fale-conosco.html',
			controller: 'homeController'
		})
		.state('app.banners', {
			url: '/banners',
			templateUrl: 'partials/banners.html',
			controller: 'homeController'
		})
		.state('app.newsletter', {
			url: '/newsletter',
			templateUrl: 'partials/newsletter.html',
			controller: 'homeController'
		})
		.state('app.configuracoes', {
			url: '/configuracoes',
			templateUrl: 'partials/fale-conosco.html',
			controller: 'homeController'
		})
});*/