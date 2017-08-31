(function (module) {
	 
	var fileReader = function ($q, $log) {
 
		var onLoad = function(reader, deferred, scope) {
			return function () {
				scope.$apply(function () {
					deferred.resolve(reader.result);
				});
			};
		};
 
		var onError = function (reader, deferred, scope) {
			return function () {
				scope.$apply(function () {
					deferred.reject(reader.result);
				});
			};
		};
 
		var onProgress = function(reader, scope) {
			return function (event) {
				scope.$broadcast("fileProgress",
					{
						total: event.total,
						loaded: event.loaded
					});
			};
		};

		var getReader = function(deferred, scope) {
			var reader = new FileReader();
			reader.onload = onLoad(reader, deferred, scope);
			reader.onerror = onError(reader, deferred, scope);
			reader.onprogress = onProgress(reader, scope);
			return reader;
		};
 
		var readAsDataURL = function (file, scope) {
			var deferred = $q.defer();
			 
			var reader = getReader(deferred, scope);         
			reader.readAsDataURL(file);
			 
			return deferred.promise;
		};
 
		return {
			readAsDataUrl: readAsDataURL  
		};
	};
 
	module.factory('fileReader',
				   ['$q', '$log', fileReader]);

	var dataFactory = function($http, $rootScope) {
		var dataFactory = {};

		var getAll = function(model) {
			return $http.get($rootScope.api + model);
		}

		var insertItem = function(data, model) {
			return $http.post($rootScope.api + model, data);
		};

		var updateItem = function(data, model) {
			return $http.put($rootScope.api + model + '/' + data.id, data);
		};

		var deleteItem = function(data, model) {
			return $http.delete($rootScope.api + model + '/' + data.id);
		};

		return {
			getAll: getAll,
			insertItem: insertItem,
			updateItem: updateItem,
			deleteItem: deleteItem
		};
	};

	module.factory('dataFactory',
					['$http', '$rootScope', dataFactory]);
 
}(angular.module('ativaApp.factories', [])));