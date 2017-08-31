'use strict';

angular.module('ativaApp', ['ui.router', 'ativaApp.states', 'ativaApp.base', 'ativaApp.controllers', 'ativaApp.factories', 'ativaApp.directives'])

	.config(['$urlRouterProvider', '$qProvider', function($urlRouterProvider, $qProvider) {
		$urlRouterProvider
			.otherwise('/app');

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
