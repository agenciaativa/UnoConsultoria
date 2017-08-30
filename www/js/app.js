'use strict';

angular.module('unoApp', ['unoApp.states', 'unoApp.service', 'unoApp.factories', 'unoApp.controllers', 'unoApp.directives', 'unoApp.filters'])

	.run(['$rootScope', '$http', 'APIService', 'dataFactory', function($rootScope, $http, APIService, dataFactory) {
		var storage = 'http://localhost:8000/uno/storage/';
		$rootScope.api = 'http://localhost:8000/api/v1/';
		$rootScope.config = {};
		$rootScope.message = {};

		dataFactory.getAll('config')
			.then(function (response) {
				var result = response.data;
				if (result.config.length > 0) {
					$rootScope.config = result.config[0];
				
					if ('undefined' != typeof $rootScope.config.logo_filepath)
						$rootScope.imgLogo = storage + $rootScope.config.logo_filepath;
				}
			}, function (error) {
				$rootScope.message = 'Não foi possível carregar as configurações: ' + error.statusText;
			});
	}]);
