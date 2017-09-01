'use strict';

angular.module('ativaApp', ['ui.router', 'satellizer', 'ativaApp.states', 'ativaApp.base', 'ativaApp.controllers', 'ativaApp.factories', 'ativaApp.directives'])

	.config(['$urlRouterProvider', '$qProvider', '$authProvider', function($urlRouterProvider, $qProvider, $authProvider) {
		// Satellizer configuration that specifies which API
		// route the JWT should be retrieved from
		$authProvider.loginUrl = 'http://localhost:8000/api/v1/user/login';

		// Redirect to the auth state if any other states
		// are requested other than users
		$urlRouterProvider
			.otherwise('/login');

		/*$urlRouterProvider
			.otherwise('/app');*/

		$qProvider.errorOnUnhandledRejections(false);
	}])

	.run(['$anchorScroll', '$rootScope', '$timeout', function($anchorScroll, $rootScope, $timeout) {
		$rootScope.hide = true;
		$rootScope.api = 'http://localhost:8000/api/v1/';

		$rootScope.scrollTop = function() {
			$anchorScroll();
		};

		$rootScope.showMessage = function() {
			$rootScope.hide = false;
			$timeout(function(){
				$rootScope.hide = true;
			}, 2500);
		};
	}]);


//, ['unoApp.service', 'unoApp.controllers', 'unoApp.directives']);
