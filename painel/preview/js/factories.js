angular.module('unoAppView.factories', [])
	.factory('dataFactory', ['$http' ,function($http) {
		var api = 'http://localhost:8000/api/v1/';
		
		var getAll = function(model) {
			return $http.get(api + model, { cache: true});
		};

		var slug = function(slug) {
			return $http.post(api + 'helper/slug', slug);
		};
		
		return {
			getAll: getAll,
			slug: slug
		};
	}])
	.factory('imageReader', ['$q' ,function($q) {

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

		var onLoad = function(image, deferred, scope) {
			return function () {
				var size = 250;
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
				data = ctx.getImageData(0,0,size,size);
				var compositeOperation = ctx.globalCompositeOperation;
				ctx.globalCompositeOperation = "destination-over";
				ctx.fillStyle = 'rgb(255,255,255)';
				ctx.fillRect(0,0,size,size);
				var dataURL = canvas.toDataURL("image/jpeg");
				ctx.clearRect(0,0,size,size);
				ctx.globalCompositeOperation = compositeOperation;
				var blobURL = blobImage(dataURL);
				scope.$apply(function () {
					deferred.resolve(
						{
							old: image.src,
							new: blobURL
						}
					);
				});
			};
		};

		var getImage = function(deferred, scope) {
			var image = new Image();
			image.onload = onLoad(image, deferred, scope);
			return image;
		};

		var readBlob = function(item, scope) {
			var deferred = $q.defer();

			var image = getImage(deferred, scope);
			image.src = item;

			return deferred.promise;
		};

		return {
			readBlob: readBlob
		};
	}])