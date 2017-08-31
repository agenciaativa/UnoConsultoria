(function (module) {

	var dataFactory = function($http, $rootScope) {
		var dataFactory = {};

		var getAll = function(model) {
			return $http.get($rootScope.api + model, { cache: true});
		};

		var getOne = function(id, model) {
			return $http.get($rootScope.api + model + '/' + id, { cache: true });
		};
		return {
			getAll: getAll,
			getOne: getOne
		};
	};

	module.factory('dataFactory',
					['$http', '$rootScope', dataFactory]);
 
}(angular.module('unoApp.factories', [])));