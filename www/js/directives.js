angular.module('unoApp.directives', [])
	.directive('script', function() {
		return {
			restrict: 'E',
			scope: false,
			link: function(scope, elem, attr) {
				if (attr.type === 'text/javascript-lazy') {
					var s = document.createElement("script");
					s.type = "text/javascript";                
					var src = elem.attr('src');
					
					if (src !== undefined) {
						s.src = src;
					} else {
						var code = elem.text();
						s.text = code;
					}

					document.head.appendChild(s);
					elem.remove();
				}
			}
		};
	})
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
	});