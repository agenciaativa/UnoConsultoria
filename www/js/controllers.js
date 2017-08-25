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

		/*$scope.init = function() {
			getConfig();
		};

		var getConfig = function() {
			$scope.message = {};
			dataFactory.getAll('config')
				.then(function (response) {
					var result = response.data;
					$scope.config = result.config[0];
				}, function (error) {
					$scope.message = 'Não foi possível carregar as configurações: ' + error.statusText;
				});
		};*/

		/*$scope.$on('$viewContentLoaded', function() {
			initMap();
		});*/

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
					$scope.clientes.clientes = result.clientes;
					
					if ($scope.clientes.clientes.length > 0)
						$scope.clientes.text = $sce.trustAsHtml($scope.clientes.text.text_clients);
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

	.controller('blogController', function($state, $rootScope, $scope, $stateParams) {
		$rootScope.state = $state.current.name;
	})

	.controller('casesController', function($state, $rootScope, $scope, $stateParams) {
		$rootScope.state = $state.current.name;
	})

	.controller('infocasesController', function($state, $scope, $stateParams, $sce) {
		$scope.caseID = $stateParams.id;
		$scope.cases = [{
			title: 'SANTA CASA DE PRESIDENTE EPITÁCIO',
			html: $sce.trustAsHtml('<p>Por solicitação da Prefeitura Municipal da Estância Turística de Presidente Epitácio, a UNO GESTÃO DE SAÚDE foi convidada para elaborar um processo de Precificação dos Serviços prestados pelo Pronto Socorro da Santa Casa de Misericórdia de Presidente Epitácio.</p>' + 
				'<p>A UNO disponibilizou para a realização deste trabalho profissionais especializados em Gestão Financeira com formação em ECONOMIA e em Assessoria Técnica Assistencial com formação em MEDICINA.</p>' +
				'<p>Através de uma metodologia baseada no conceito de custos por absorção, fizemos uma análise técnica e econômico-financeira desta Unidade de Saúde.</p>' +
				'<p>Diante das informações disponibilizadas pela administração do Hospital, fizemos um levantamento detalhado de todos os departamentos e serviços prestados. Desta maneira, dividimos a Unidade em três grupos de centros de custos:</p>' +
				'<div class="featured-box row"><div class="featured-item col-md-8 col-md-offset-2"><span>1. ADMINISTRATIVO:</span> Correspondem às unidades de natureza administrativa, os custos gerados por estes centros de custos envolvem a administração ( normalmente burocrática) das atividades do hospital. São: Administração Geral, Financeiro, Recursos Humanos, Faturamento e etc.;</div>' +
				'<div class="featured-item col-md-8 col-md-offset-2"><span>2. APOIO OU AUXILIAR:</span> Correspondem aos serviços de apoio do hospital, são geradores de custos com objetivo de fornecer suporte aos centros produtivos. À saber: SND (Serviço de Nutrição e Dietética, Lavanderia, SHL ( Serviço de Higiene e Limpeza), Manutenção, SAME (Serviço de Arquivo Médico e Estatística) e etc.;</div>' +
				'<div class="featured-item col-md-8 col-md-offset-2"><span>3. PRODUTIVO:</span> Correspondem aos centros geradores de serviços finais ao paciente, tais como: Ambulatórios, Enfermarias, Pronto Socorro, Laboratórios e Serviços de Diagnósticos por Imagem.</div>' + 
				'<div class="featured-item col-md-8 col-md-offset-2">Cada grupo é composto por departamentos, denominados centros de custos, que são caracterizados de acordo com o perfil de serviço prestado em favor da Santa Casa de Presidente Epitácio.</div></div>' +
				'<p>Assim, diante desta complexa composição de serviços foi possível identificar o custo efetivo do Pronto Socorro da Santa Casa, cuja operação representa uma fatia de extrema importância em toda a conjuntura hospitalar.</p>' +
				'<p>Este tipo de serviço prestado pela UNO GESTÃO DE SAÚDE, pode ser caracterizado como AUDITORIA, visto que avalia em diversas esferas, principalmente de valores monetários a estrutura operacional e instalada dos serviços médico-hospitalares.</p>' +
				'<p>O objetivo deste trabalho resumiu-se na necessidade vislumbrada pela administração pública do município de Presidente Epitácio em identificar o custo efetivo dos serviços de Pronto Atendimento prestados pela Santa Casa, em vista de garantir o subsidio financeiro para a continuidade dos atendimentos.</p>' +
				'<p>Portanto, os Relatórios Gerenciais apresentados estão de acordo com as mais modernas e transparentes ferramentas de Gestão de Custos Hospitalares utilizadas no mercado de Administração em Saúde no Brasil.</p>')
		},
		{
			title: 'SANTA CASA DE TUPI PAULISTA',
			html: $sce.trustAsHtml('<p>Em virtude de transição ocorrida na Diretoria da Irmandade da Santa Casa de Tupi Paulista, a Uno Gestão de Saúde foi convidada para elaborar um processo de auditoria nos custos dos serviços prestados pela Santa Casa de Misericórdia de Tupi Paulista.</p>' +
				'<p>A Uno disponibilizou para a realização deste trabalho o profissional especializado em gestão financeira com formação em economia.</p>' +
				'<p>Através de uma metodologia baseada no conceito de custos por absorção, realizamos uma análise econômico-financeira desta unidade de saúde.</p>' +
				'<p>Diante das informações disponibilizadas pela administração do hospital, fizemos um levantamento detalhado de todos os departamentos e serviços prestados. Desta maneira, dividimos a unidade em três grupos de centros de custos:</p>' +
				'<div class="featured-box row"><div class="featured-item col-md-8 col-md-offset-2"><span>1. ADMINISTRATIVO:</span> Correspondem às unidades de natureza administrativa, os custos gerados por estes centros de custos envolvem a administração, normalmente burocrática, das atividades do hospital. Por exemplo administração geral, financeiro, recursos humanos, faturamento e etc.;</div>' +
				'<div class="featured-item col-md-8 col-md-offset-2"><span>2. APOIO OU AUXILIAR:</span> Correspondem aos serviços de apoio do hospital, são geradores de custos com objetivo de fornecer suporte aos centros produtivos, como o SND (Serviço de Nutrição e Dietética), lavanderia, SHL (Serviço de Higiene e Limpeza), manutenção, SAME (Serviço de Arquivo Médico e Estatística) e etc.;</div>' +			 
				'<div class="featured-item col-md-8 col-md-offset-2"><span>3. PRODUTIVO:</span> Correspondem aos centros geradores de serviços finais ao paciente, tais como ambulatórios, enfermarias, pronto socorro, laboratórios e serviços de diagnósticos por imagem.</div>' +
				'<div class="featured-item col-md-8 col-md-offset-2 solid-bgcolor">Cada grupo é composto por departamentos, denominados centros de custos, que são caracterizados de acordo com o perfil de serviço prestado em favor da Santa Casa de Tupi Paulista.</div></div>' +
				'<p>Assim, diante desta complexa composição de serviços procedemos com a implantação de uma moderna e confiável gestão de custos utilizados nos hospitais de maior referência no mercado de saúde espalhados pelo Brasil.</p>' +
				'<p>Este tipo de serviço prestado pela Uno Gestão de Saúde pode ser caracterizado como assessoria, visto que é feita avaliação em diversas esferas, principalmente de valores monetários a estrutura operacional e instalada dos serviços médico-hospitalares. Porém, as intervenções junto aos profissionais da área são feitas de maneira educativa, de forma a garantir a constituição de uma cultura voltada a identificação e controle dos custos levantados por cada centro de custo do Hospital.</p>' +
				'<p>O objetivo deste trabalho resumiu-se na necessidade administrativa da Diretoria da Santa Casa em identificar, controlar e promover medidas estratégicas que possibilitem a continuidade dos serviços prestados, porém com prioridades gerenciais que garantam a qualidade no atendimento.</p>' + 
				'<p>Portanto, a política de custos garante ao gestor hospitalar segurança nas tomadas de decisões, visto que os custos de todos os serviços prestados pela unidade de saúde podem ser facilmente identificados. Desta maneira, é possível analisar quais os serviços e departamentos com condições evidentes de produzir resultados satisfatórios ou promover prejuízos para o negócio.</p>')
		}];
	})

	.controller('infoblogController', function($state, $scope, $stateParams, $sce) {
		$scope.blogID = $stateParams.id;
		$scope.blog = [{
			title: 'SANTA CASA DE PRESIDENTE EPITÁCIO',
			html: $sce.trustAsHtml('<p>Em virtude de transição ocorrida na Diretoria da Irmandade da Santa Casa de Tupi Paulista, a Uno Gestão de Saúde foi convidada para elaborar um processo de auditoria nos custos dos serviços prestados pela Santa Casa de Misericórdia de Tupi Paulista.</p>' +
				'<p>A Uno disponibilizou para a realização deste trabalho o profissional especializado em gestão financeira com formação em economia.</p>' +
				'<p>Através de uma metodologia baseada no conceito de custos por absorção, realizamos uma análise econômico-financeira desta unidade de saúde.</p>' +
				'<p>Em virtude de transição ocorrida na Diretoria da Irmandade da Santa Casa de Tupi Paulista, a Uno Gestão de Saúde foi convidada para elaborar um processo de auditoria nos custos dos serviços prestados pela Santa Casa de Misericórdia de Tupi Paulista.</p>' +
				'<p>A Uno disponibilizou para a realização deste trabalho o profissional especializado em gestão financeira com formação em economia.</p>' +
				'<p>Através de uma metodologia baseada no conceito de custos por absorção, realizamos uma análise econômico-financeira desta unidade de saúde.</p>')
		},
			{
				title: 'SANTA CASA DE TUPI PAULISTA',
				html: $sce.trustAsHtml('')
			}];
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