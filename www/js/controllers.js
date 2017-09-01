angular.module('unoApp.controllers', [])
	.controller('homeController', function($state, $rootScope, $scope, $sce, $q, $location, $anchorScroll, dataFactory) {
		$rootScope.state = $state.current.name;
		$scope.home = [];
		$scope.imgpaths = [];

		$scope.init = function() {
			getHome();
			getServicos();
			getClientes();
		};

		var getHome = function() {
			$scope.message = {};
			dataFactory.getAll('home')
				.then(function (response) {
					var result = response.data;
					$scope.home = result.items;
					if ($scope.home) {
						$scope.home.text1 = $sce.trustAsHtml($scope.home.text1);
						$scope.home.header_text2 = $sce.trustAsHtml($scope.home.header_text2);
						$scope.home.footer_text2 = $sce.trustAsHtml($scope.home.footer_text2);
					}
				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		var getServicos = function() {
			$scope.servicos = [];
			$scope.message = {};
			dataFactory.getAll('servicos')
				.then(function (response) {
					var result = response.data;
					angular.forEach(result.servicos, function(value, key) {
						value.image2 = $sce.trustAsHtml(value.image2);
						this.push(value);
					}, $scope.servicos);
				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		var getClientes = function() {
			var imp = 'http://localhost:8000/storage/';
			var deferred;
			var dArr = [];
			var imgpaths = [];
			$scope.message = {};

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

				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		$scope.init();

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

		$scope.linkTo = function(id, obj) {
			$location.url(id);
			$location.hash(obj.link);
			$anchorScroll();
		};
	})

	.controller('empresaController', function($state, $rootScope, $scope, $sce, $q, dataFactory) {
		$rootScope.state = $state.current.name;
		$scope.empresa = [];

		$scope.init = function() {
			$scope.message = {};
			dataFactory.getAll('empresa')
				.then(function (response) {
					var result = response.data;
					$scope.empresa = result.item;
					$scope.empresa.text_empresa = $sce.trustAsHtml($scope.empresa.text_empresa);
					$scope.empresa.text_empresa2 = $sce.trustAsHtml($scope.empresa.text_empresa2);
				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		$scope.init();
	})

	.controller('contactController', function($state, $rootScope, $scope, $http, $timeout, APIService, dataFactory) {
		$rootScope.state = $state.current.name;

		$rootScope.$watch('config', function() { 
			if ('undefined' != typeof $rootScope.config.id) {
				$scope.config = $rootScope.config;
				$timeout(function() {
					initMap();
				});
			}
		}, true);

		$scope.message = {};

		function initMap() {
			var map;
			var position = { lat: parseFloat($scope.config.lat), lng: parseFloat($scope.config.lon) };
			map = new google.maps.Map(document.getElementById('address-map'), {
				center: position,
				zoom: 18
			});
			var marker = new google.maps.Marker({
				position: position,
				map: map
			});
		}

		$scope.sendMail = function() {
			$scope.mensagem = {};
			APIService.sendMail($scope.formData)
			.then((res) => {
				$scope.mensagem.classe = res.classe;
				$scope.mensagem.texto= res.texto;
			}, (err) => {
				$scope.mensagem.classe = 'danger';
				$scope.mensagem.texto = 'Ocorreu um erro! Tente novamente mais tarde.';
			});
		};
	})

	.controller('clientesController', function($state, $rootScope, $scope, $http, $sce, dataFactory) {
		$rootScope.state = $state.current.name;
		$scope.clientes = {};

		$scope.init = function() {
			getClientes();
		}

		var getClientes = function() {
			$scope.message = {};
			dataFactory.getAll('cliente')
				.then(function (response) {
					var result = response.data;
					$scope.clientes = result.clientes;
					$scope.text = result.text;
					if ('undefined' != typeof $scope.text)
						$scope.text.text_clients = $sce.trustAsHtml($scope.text.text_clients);
				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		$scope.init();
	})

	.controller('servicosController', function($state, $rootScope, $scope, $http, $sce, dataFactory) {
		$rootScope.state = $state.current.name;
		$scope.servicos = [];

		$scope.init = function() {
			getServicos();
		}

		var getServicos = function() {
			var imp = 'http://localhost:8000/storage/';
			$scope.message = {};
			
			dataFactory.getAll('servicos')
				.then(function (response) {
					var result = response.data;
					angular.forEach(result.servicos, function(value, key) {
						value.text_item = $sce.trustAsHtml(value.text_item);
						value.image2 = $sce.trustAsHtml(value.image2);
						this.push(value);
					}, $scope.servicos);
				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		$scope.init();
	})

	.controller('blogController', function($state, $rootScope, $scope, $http, $sce, dataFactory) {
		$rootScope.state = $state.current.name;
		$scope.blog = [];

		$scope.init = function() {
			getBlog();
		}

		var getBlog = function() {
			$scope.message = {};
			dataFactory.getAll('blog')
				.then(function (response) {
					var result = response.data;
					angular.forEach(result.blog, function(value, key) {
						var data = new Date(value.date_publish);
						var data_post = new Date();
						value.date_publish = data;
						if (value.date_publish <= data_post) {
							value.user = $sce.trustAsHtml(value.user);
							value.image_client_path = $sce.trustAsHtml(value.image_client_path);
							value.resume = $sce.trustAsHtml(value.resume);
							value.description = $sce.trustAsHtml(value.description);
							value.title_client = $sce.trustAsHtml(value.title_client);
							value.title_tags = $sce.trustAsHtml(value.title_tags);
							value.slug = $sce.trustAsHtml(value.slug);
							this.push(value);
						}
					}, $scope.blog);
				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		$scope.init();

		$scope.itemsPerPage = 5;
		$scope.currentPage = 0;

		$scope.prevPage = function() {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.prevPageDisabled = function() {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.pageCount = function() {
			return Math.ceil($scope.blog.length/$scope.itemsPerPage)-1;
		};

		$scope.nextPage = function() {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};

		$scope.nextPageDisabled = function() {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};
	})

	.controller('casesController', function($state, $rootScope, $scope, $stateParams, $sce, dataFactory) {
		$rootScope.state = $state.current.name;

		$scope.case_text = {};
		$scope.cases = [];
		$scope.message = {};

		$scope.init = function() {
			dataFactory.getAll('case')
				.then(function (response) {
					var result = response.data;
					$scope.case_text = result.text;
					angular.forEach(result.cases, function(value, key){
						value.description = $sce.trustAsHtml(value.description);
						this.push(value);
					}, $scope.cases);
				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		$scope.init();
	})

	.controller('infocasesController', function($state, $rootScope, $scope, $stateParams, $sce, $anchorScroll, dataFactory) {
		$rootScope.state = 'cases';
		$scope.case = {};
		$scope.message = {};
		var param = $stateParams.id;
		
		if (!param)
			param = $stateParams.slug;

		$scope.init = function() {
			$anchorScroll();
			dataFactory.getOne(param, 'cases')
				.then(function (response) {
					var result = response.data;
					$scope.case = result.case;
					$scope.case.text = $sce.trustAsHtml($scope.case.text);				
				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		$scope.init();
	})

	.controller('infoblogController', function($state, $scope, $stateParams, $sce, dataFactory) {
		$scope.blogID = $stateParams.id;

		$scope.blog = [];

		$scope.init = function() {
			getBlog();
		}

		var getBlog = function() {
			$scope.message = {};
			dataFactory.getAll('blog')
				.then(function (response) {
					var result = response.data;
					angular.forEach(result.blog, function(value, key) {
						value.idpost = value.id;
						if(value.slug == $stateParams.slug ) {
							value.user = $sce.trustAsHtml(value.user);
							value.image_client_path = $sce.trustAsHtml(value.image_client_path);
							value.resume = $sce.trustAsHtml(value.resume);
							value.description = $sce.trustAsHtml(value.description);
							value.title_client = $sce.trustAsHtml(value.title_client);
							value.title_tags = $sce.trustAsHtml(value.title_tags);
							value.slug = $sce.trustAsHtml(value.slug);
							var data = new Date($sce.trustAsHtml(value.date_publish));
							value.date_publish = data;
							this.push(value);
						}
					}, $scope.blog);
				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		$scope.init();
	})

	.controller('newsController', function($scope, APIService) {
		$scope.mensagem = {};
		$scope.errorMsg = {};

		$scope.saveNews = function() {
			APIService.saveNews($scope.news)
			.then((response) => {
				var result = response.data
				$scope.mensagem.texto = result.message;
				$scope.mensagem.classe = result.classe;
				$scope.errorMsg = {};
			}, (error) => {
				if (error.data && "undefined" != typeof error.data) {
					var result = error.data;
					$scope.errorMsg = result;
				}
			});
		};
	})

	.controller('bannersController', function($scope, $sce, dataFactory) {
		$scope.banners = [];
		$scope.message = {};

		$scope.init = function() {
			dataFactory.getAll('banners')
				.then(function (response) {
					var result = response.data;
					angular.forEach(result.banners, function(value, key) {
						value.description = $sce.trustAsHtml(value.description);
						this.push(value);
					}, $scope.banners);
				}, function (error) {
					$scope.message = 'Não foi possível carregar registro: ' + error.statusText;
				});
		};

		$scope.init();
	})

	.controller('infoController', function($scope, $rootScope) {
		$scope.socials = [];
		$scope.errorMsg = {};

		$rootScope.$watch('config', function() { 
			if ('undefined' != typeof $rootScope.config.id) {
				$scope.config = $rootScope.config;
				
				if ($scope.config.facebook) {
					$scope.socials.push({
						name: 'facebook',
						link: $scope.config.facebook
					});
				}

				if ($scope.config.instagram) {
					$scope.socials.push({
						name: 'instagram',
						link: $scope.config.instagram
					});
				}
				
				if ($scope.config.linkedin) {
					$scope.socials.push({
						name: 'linkedin',
						link: $scope.config.linkedin
					});
				}
			}
		}, true);
	})