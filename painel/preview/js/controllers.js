angular.module('unoAppView.controllers', [])
	.controller('empresaController', ['$rootScope', '$scope', '$sce', function($rootScope, $scope, $sce) {
		var parsed = JSON.parse(sessionStorage['viewData']);
		$rootScope.state = parsed.state;
		parsed.empresa.text_empresa = $sce.trustAsHtml(parsed.empresa.text_empresa);
		parsed.empresa.text_empresa2 = $sce.trustAsHtml(parsed.empresa.text_empresa2);
		$scope.getData = parsed;
	}])

	.controller('homeController', ['$rootScope', '$scope', '$sce', '$q', 'dataFactory', function($rootScope, $scope, $sce, $q, dataFactory) {
		var parsed = JSON.parse(sessionStorage['viewData']);
		$rootScope.state = parsed.state;
		parsed.home.footer_text2 = $sce.trustAsHtml(parsed.home.footer_text2);
		parsed.home.header_text2 = $sce.trustAsHtml(parsed.home.header_text2);
		parsed.home.text1 = $sce.trustAsHtml(parsed.home.text1);
		$scope.getData = parsed;

		var getServicos = function() {
			$scope.servicos = [];
			dataFactory.getAll('servicos')
				.then(function (response) {
					var result = response.data;
					angular.forEach(result.servicos, function(value, key) {
						value.image2 = $sce.trustAsHtml(value.image2);
						this.push(value);
					}, $scope.servicos);
				});
		};

		var getClientes = function() {
			var imp = 'http://localhost:8000/storage/';
			var deferred;
			var dArr = [];
			var imgpaths = [];

			dataFactory.getAll('clientes')
				.then(function (response) {
					var result = response.data;
					angular.forEach(result.clientes, function(value, key){
						deferred = $q.defer();
						imgpaths.push({
							path: imp + value.image_client_path,
							title: value.title_client,
							case: value.case,
							callback: deferred.resolve
						});
						dArr.push(deferred.promise);
					});

					$scope.imgpaths = imgpaths;

					$q.all(dArr).then(function() {
						img_slider();
					});
				});
		};

		var img_slider = function() {
			var $slider = $('.clients-slider');
			$slider.slick({
				infinite: true,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 1,
				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><img src="./img/home/slide-left.png" /></button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><img src="./img/home/slide-right.png" /></button>',
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true
					}
				}
				]
			});
			$slider.find(".slick-slide").height("auto");
			$slider.slick('setOption','', '', true);
		};

		$scope.init = function() {
			getServicos();
			getClientes();
		};

		$scope.init();
	}])

	.controller('blogController', ['$rootScope', '$scope', '$sce', '$q', '$timeout', 'imageReader', function($rootScope, $scope, $sce, $q, $timeout, imageReader) {
		$scope.gallery = [];
		var parsed = JSON.parse(sessionStorage['viewData']);
		$rootScope.state = parsed.state;
		parsed.blog.description = $sce.trustAsHtml(parsed.blog.description);

		//resizeCrop();
		
		if (parsed.blog.date_publish) {
			var date_split = parsed.blog.date_publish.split('/');
			var date_publish = new Date(date_split[2] + '-' + date_split[1] + '-' + date_split[0] + ' 00:00:00');
			parsed.blog.date_publish = date_publish;
		}

		$scope.getData = parsed;

		var img_slider = function() {
			var $slider = $('.gallery-slider');
			$slider.slick({
				infinite: true,
				speed: 100,
				slidesToShow: 3,
				slidesToScroll: 1,
				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><img src="./img/home/slide-left.png" /></button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><img src="./img/home/slide-right.png" /></button>',
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true
					}
				}
				]
			});
			$slider.find(".slick-slide").height("auto");
			$slider.slick('setOption','', '', true);
		};

		/*function resizeCrop() {
			var dArr = [];
			var defer;
			angular.forEach(parsed.gallery, function(item){
				var defer = $q.defer();
				defer.resolve(
					imageReader.readBlob(item, $scope)
						.then((result) => {
							$scope.gallery.push(result);
						})
				);
				dArr.push(defer.promise);
			});

			$q.all(dArr).then(
				(values) => {
					$timeout(function() {
						var $lg = $('#lightgallery');
						$lg.lightGallery();
						$('#lightgallery .image').on('click', function() {
							var index = $(this).data('index') || 0;
							var lg_index = $lg.data('lightGallery').index;
							if (lg_index < 0) {
								$lg.data('lightGallery').index = index;
								$lg.data('lightGallery').slide(index);
							}
						});
						img_slider();
					})
				});
		};*/
		$scope.$on('$viewContentLoaded', function() {
			$(document).ready(function() {
				var $lg = $('#lightgallery');
				$lg.lightGallery();
				$('#lightgallery .image').on('click', function() {
					var index = $(this).data('index') || 0;
					var lg_index = $lg.data('lightGallery').index;
					if (lg_index < 0) {
						$lg.data('lightGallery').index = index;
						$lg.data('lightGallery').slide(index);
					}
				});
				img_slider();
			})
		});
	}])

	.controller('casesController', ['$rootScope', '$scope', '$sce', function($rootScope, $scope, $sce) {
		var parsed = JSON.parse(sessionStorage['viewData']);
		$rootScope.state = parsed.state;
		parsed.case.description = $sce.trustAsHtml(parsed.case.description);
		angular.forEach(parsed.cases, function(value, key){
			value.description = $sce.trustAsHtml(value.description);
		});
		$scope.getData = parsed;
	}])

	.controller('clientesController', ['$rootScope', '$scope', '$sce', function($rootScope, $scope, $sce) {
		var parsed = JSON.parse(sessionStorage['viewData']);
		$rootScope.state = parsed.state;
		parsed.cliente_text.text_clients = $sce.trustAsHtml(parsed.cliente_text.text_clients);
		$scope.getData = parsed;
	}])

	.controller('servicosController', ['$rootScope', '$scope', '$sce', '$location', '$anchorScroll', function($rootScope, $scope, $sce, $location, $anchorScroll) {
		var parsed = JSON.parse(sessionStorage['viewData']);
		$rootScope.state = parsed.state;
		parsed.servico.text_item = $sce.trustAsHtml(parsed.servico.text_item);
		angular.forEach(parsed.servicos, function(value, key){
			value.text_item = $sce.trustAsHtml(value.text_item);
		});
		$scope.getData = parsed;

		$scope.$on('$viewContentLoaded', function() {
			var hash = '';
			var servico = $scope.getData.servico;
			if ('undefined' == typeof servico.id) {
				if (servico.text_item || servico.title_item)
					hash = 'view';
			}
			else
				hash = servico.link;

			$location.hash(hash);
			$anchorScroll();
		});
	}])

	.controller('infocasesController', ['$rootScope', '$scope', '$sce', function($rootScope, $scope, $sce) {
		var parsed = JSON.parse(sessionStorage['viewData']);
		$rootScope.state = parsed.state;
		parsed.case.text = $sce.trustAsHtml(parsed.case.text);
		$scope.getData = parsed;
	}])
	