angular.module('ativaApp.directives', [])
	.directive('ngFileSelect',function() {
		return {
			link: function($scope, el) {
				el.bind('change', function(e) {
					$scope.file = (e.srcElement || e.target).files[0];
					$scope.getFile();
					$scope.errorMsg.file = [];
				});
			}
		}
	})
	.directive('checkField',function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				scope.$watch(attrs.ngModel, function(v) {
					if (v && v.length > 0) {
						element[0].style = 'border-color: #d2d6de';
						if (scope.errorMsg)
							scope.errorMsg[attrs.id] = undefined;
						
						if ("undefined" == typeof scope.errorMsg.lat && "undefined" == typeof scope.errorMsg.lon)
							scope.errorMsg.localization = undefined;
						
					} else {
						element[0].style = '';
					}
				});
			}
		}
	})
	.directive('ckeditor', ['$timeout', function($timeout) {
		return {
			require: '?ngModel',
			link: function(scope, elm, attr, ngModel) {
				var editor, updateModel;

				if (scope.options)
					var editor = CKEDITOR.replace(elm[0], scope.options);
				else
					var editor = CKEDITOR.replace(elm[0]);

				if (!ngModel) return;

				editor.on('instanceReady', function() {
					return editor.setData(ngModel.$viewValue);
				});
	
				updateModel = function() {
					if (editor.getData()) {
						if (scope.errorMsg)
					 		scope.errorMsg[attr.id] = undefined;
					}

					$timeout(function() {
						return scope.$apply(function() {
							return ngModel.$setViewValue(editor.getData());
						});
					});
				};

				editor.on('change', updateModel);
				//editor.on('dataReady', updateModel);
				editor.on('key', updateModel);
				editor.on('paste', updateModel);
				editor.on('selectionChange', updateModel);

				return ngModel.$render = function() {
					return editor.setData(ngModel.$viewValue);
				};
			}
		};
	}]);
