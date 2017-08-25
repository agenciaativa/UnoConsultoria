(function (module) {

	var dataFactory = function($http, $rootScope) {
		var dataFactory = {};

		var getAll = function(model) {
			return $http.get($rootScope.api + model, { cache: true});
		}

		return {
			getAll: getAll
		};
	};

	module.factory('dataFactory',
					['$http', '$rootScope', dataFactory]);
 
}(angular.module('unoApp.factories', [])));