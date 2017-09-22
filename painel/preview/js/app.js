angular
	.module('unoAppView', ['ui.router', 'unoAppView.factories', 'unoAppView.states', 'unoAppView.controllers'])
	
	.run(['$rootScope', '$http', 'dataFactory', function($rootScope, $http, dataFactory) {
		var storage = 'http://localhost:8000/storage/';
		$rootScope.socials = [];
		dataFactory.getAll('config')
			.then(function (response) {
				var result = response.data;
				if (result.config.length > 0) {
					$rootScope.config = result.config[0];
				
					if ($rootScope.config.logo_filepath && 'undefined' != typeof $rootScope.config.logo_filepath)
						$rootScope.imgLogo =  storage + $rootScope.config.logo_filepath;

					if ($rootScope.config.facebook) {
						$rootScope.socials.push({
							name: 'facebook',
							link: $rootScope.config.facebook
						});
					}

					if ($rootScope.config.instagram) {
						$rootScope.socials.push({
							name: 'instagram',
							link: $rootScope.config.instagram
						});
					}
					
					if ($rootScope.config.linkedin) {
						$rootScope.socials.push({
							name: 'linkedin',
							link: $rootScope.config.linkedin
						});
					}
				}
			}, function (error) {
				$rootScope.config = null;
			});
	}])

	.directive('loadedImg', function(){
		return {
			restrict: 'E',
			scope: {
				isrc: '=',
				ititle: '=',
				onloadimg: '&'
			},
			replace: true,
			template: '<img ng-src="{{isrc}}" title="{{ititle}}" class="none"/>',
			link: function(scope, ele, attr){
				ele.on('load', function(){
					ele.removeClass('none');
					scope.onloadimg();
				});
			}
		};
	})
	
	.filter('customPhone', function() {
		var RegExp, match;

		return function(phone, type) {
			if (phone && typeof phone != 'undefined') {
				switch(type) {
					case 'ddd' :
						RegExp = /(\(\d{2}\))/gi;
						break;				
					case 'phone':
						RegExp = /[^(\(?\d{2}\)?)\s]?(\d{4,5})-(\d{4})/gi;
						break;
					default:
						RegExp = /(\(?\d{2}\)?)\s?(\d{4,5})-(\d{4})/gi;
						break;
				}

				match = RegExp.exec(phone);
				return match[0];
			}
		}
	})

	.filter('slice', function() {
		return function(arr, start, end) {
			return (arr || []).slice(start, end);
		};
	})

	.filter('offset', function() {
		return function(input, start) {
			start = parseInt(start, 10);
			return input.slice(start);
		};
	})
	.config(['$compileProvider', function($compileProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|local|data|blob):/);
	}])