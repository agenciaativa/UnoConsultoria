angular.module('unoAppView.states', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		var onlyOnePage = ['$q', '$location', '$state', '$injector', function($q, $location, $state, $injector) {
			var deferred = $q.defer();
			var $rootScope = $injector.get('$rootScope');
			var storage = JSON.parse(sessionStorage['viewData']);
			var state = $location.path().replace('/', '');
			$rootScope.state = storage.state;
			if (state == $rootScope.state)
				deferred.resolve();
			else
				$location.path('/' + $rootScope.state);			

			return deferred.promise;
		}];

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'partials/home.html',
				controller: 'homeController',
				resolve: {
					onlyOnePage: onlyOnePage
				}
			})
			.state('empresa', {
				url: '/empresa',
				templateUrl: 'partials/empresa.html',
				controller: 'empresaController',
				resolve: {
					onlyOnePage: onlyOnePage
				}
			})
			.state('servicos-solucoes', {
				url: '/servicos-solucoes',
				templateUrl: 'partials/servicos-solucoes.html',
				controller: 'servicosController',
				resolve: {
					onlyOnePage: onlyOnePage
				}
			})
			.state('clientes', {
				url: '/clientes',
				templateUrl: 'partials/clientes.html',
				controller: 'clientesController',
				resolve: {
					onlyOnePage: onlyOnePage
				}
			})
			.state('cases', {
				url: '/cases',
				templateUrl: 'partials/cases.html',
				controller: 'casesController',
				resolve: {
					onlyOnePage: onlyOnePage
				}
			})
			.state('case', {
				url: '/case',
				templateUrl: 'partials/case-detalhes.html',
				resolve: {
					onlyOnePage: onlyOnePage
				},
				controller: 'infocasesController'
			})
			.state('blog', {
				url: '/blog',
				templateUrl: 'partials/blog-detail.html',
				controller: 'blogController'
			});

			$urlRouterProvider
				.otherwise('/home');
	}])