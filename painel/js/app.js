'use strict';

angular.module('ativaApp', ['ui.router', 'satellizer', 'ativaApp.states', 'ativaApp.base', 'ativaApp.controllers', 'ativaApp.factories', 'ativaApp.directives'])

	.config(['$stateProvider', '$urlRouterProvider', '$qProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $qProvider, $authProvider) {
		// Satellizer configuration that specifies which API
		// route the JWT should be retrieved from
		$authProvider.loginUrl = 'http://localhost:8000/api/v1/user/login';

		$qProvider.errorOnUnhandledRejections(false);
	}])

	.run(['$anchorScroll', '$rootScope', '$state', '$auth', '$timeout', function($anchorScroll, $rootScope, $state, $auth, $timeout) {
		$rootScope.hide = true;
		$rootScope.api = 'http://localhost:8000/api/v1/';
		$rootScope.storage = 'http://localhost:8000/storage/';

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
