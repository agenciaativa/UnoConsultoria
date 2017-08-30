angular.module('unoApp.states', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
		//$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'partials/home.html',
				controller: 'homeController'
			})
			.state('empresa', {
				url: '/empresa',
				templateUrl: 'partials/empresa.html',
				controller: 'empresaController'
			})
			.state('servicos-solucoes', {
				url: '/servicos-solucoes',
				templateUrl: 'partials/servicos-solucoes.html',
				controller: 'servicosController'
			})
			.state('clientes', {
				url: '/clientes',
				templateUrl: 'partials/clientes.html',
				controller: 'clientesController'
			})
			.state('cases', {
				url: '/cases',
				templateUrl: 'partials/cases.html',
				controller: 'casesController'
			})
			.state('detalhes', {
				url: '/cases/:id',
				templateUrl: 'partials/case-detalhes.html',
				controller: 'infocasesController'
			})

			.state('fale-conosco', {
				url: '/fale-conosco',
				templateUrl: 'partials/fale-conosco.html',
				controller: 'contactController'
			})

			.state('blog', {
				url: '/blog',
				templateUrl: 'partials/blog.html',
				controller: 'blogController'
			})

			.state('blogdetalhes', {
				url: '/blog/:slug',
				resolve:{
					id:function ($stateParams) {
						return $stateParams.id;
                    }
				},
				params: {
					id:null
				},
				templateUrl: 'partials/blog-detail.html',
				controller: 'infoblogController'
			})
});