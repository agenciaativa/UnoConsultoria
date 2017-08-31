angular.module('unoApp.service', [])
	.service('APIService', function($rootScope, $http, $q) {
		
		this.sendMail = function(formData) {
			var deferred = $q.defer();

			$http({
				url		: 'http://api.unogestaodesaude.com.br/api/v1/sendmail',
				method	: 'POST',
				data    : formData,
				headers	: { 
					'Content-Type'	:	'application/x-www-form-urlencoded' 
				}
			})
			.then(function(res) {
				deferred.resolve(res.data);
			}, function(err) {
				deferred.reject(err.data);
			});

			return deferred.promise;
		}

		this.saveNews = function(data) {
			return $http.post($rootScope.api + 'news', data);
		}
	});