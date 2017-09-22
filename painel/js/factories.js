(function (module) {
	 
	var fileReader = function ($q, $log, $rootScope) {
 
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
				$rootScope.$broadcast("fileProgress",
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
				   ['$q', '$log', '$rootScope', fileReader]);


	// -----------------------------------------------------------------//
	// -----------------------------------------------------------------//


	var imageReader = function($q) {

		var blobImage = function(base64_image) {
			var byteString = atob(base64_image.split(',')[1]);
			var mimeString = base64_image.split(',')[0].split(':')[1].split(';')[0];
			var ab = new ArrayBuffer(byteString.length);
			var ia = new Uint8Array(ab);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			var blob = new Blob([ab], {type: mimeString});
			var blobUrl = URL.createObjectURL(blob);
			return blobUrl;
		};

		var onLoad = function(image, deferred, scope, file, size = 250) {
			return function () {
				//var size = 250;
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext("2d");
				var data;
				canvas.width = size;
				canvas.height = size;
				var hRatio = (canvas.width*2) / image.width;
				var vRatio = (canvas.height*2) / image.height;
				var ratio = Math.min( hRatio, vRatio );
				var center_x = (canvas.width - image.width*ratio) / 2;
				var center_y = (canvas.height - image.height*ratio) / 2;
				ctx.drawImage(image, 0, 0, image.width, image.height, center_x, center_y, image.width*ratio, image.height*ratio);
				//data = ctx.getImageData(0,0,size,size);
				//var compositeOperation = ctx.globalCompositeOperation;
				//ctx.globalCompositeOperation = "destination-over";
				//ctx.fillStyle = 'rgb(255,255,255)';
				//ctx.fillRect(0,0,size,size);
				var dataURL = canvas.toDataURL("image/png");
				ctx.clearRect(0,0,size,size);
				//ctx.globalCompositeOperation = compositeOperation;
				var blobURL = blobImage(dataURL);
				scope.$apply(function () {
					deferred.resolve({
						filepath: image.src,
						thumbnail: blobURL,
						file: file
					});
				});
			};
		};

		var getImage = function(deferred, scope, file) {
			var image = new Image();
			image.onload = onLoad(image, deferred, scope, file);
			return image;
		};

		var readBlob = function(item, scope, file) {
			var deferred = $q.defer();

			var image = getImage(deferred, scope, file);
			image.src = item;

			return deferred.promise;
		};

		return {
			readBlob: readBlob
		};
	};

	module.factory('imageReader',
				   ['$q', imageReader]);


	// -----------------------------------------------------------------//
	// -----------------------------------------------------------------//


	var dataFactory = function($http, $rootScope) {
		
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