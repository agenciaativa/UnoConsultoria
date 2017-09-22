angular.module('ativaApp.controllers', ['ngFileUpload'])
	.controller('sidebarController', ['$scope', function($scope) {
		$scope.$on('$viewContentLoaded', function() {
			var $layout = $('body').data('lte.layout');
			"undefined" != typeof $layout && $layout.activate();
			$('[data-widget="tree"]').tree();
		});
	}])

	.controller('homeController', ['$state', '$rootScope', '$scope', 'dataFactory', function($state, $rootScope, $scope, dataFactory) {
		var state = $state.current.name;
		$rootScope.state = 'app.home';
		$rootScope.sub = state;
		$rootScope.title = $rootScope.active_page = 'Home';
		$rootScope.message = '';
		$rootScope.classe = '';

		$scope.home = {};

		$scope.init = function() {
			dataFactory.getAll('home')
				.then(function (response) {
					var result = response.data;
					$scope.home = result.items;
				}, function (error) {
					$rootScope.message = 'Não foi possível carregar registro: ' + error.statusText;
					console.log(error.statusText);
				});
		};

		$scope.init();

		$scope.submitForm = function() {
			if ($scope.home && "undefined" != typeof $scope.home.id) {
				dataFactory.updateItem($scope.home, 'home')
					.then(function (response) {
						var result = response.data;
						$scope.home = result.items;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						$scope.message = 'Não foi possível alterar o registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
					});
			} else {
				dataFactory.insertItem($scope.home, 'home')
					.then(function (response) {
						var result = response.data;
						$scope.home = result.items;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						$scope.message = 'Não foi possível inserir o registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
					});
			}
		};

		$scope.preview = function() {
			var sendData = {};
			sendData.state = 'home';
			sendData.home = $scope.home;
			sessionStorage['viewData'] = angular.copy(JSON.stringify(sendData));
			window.open('preview/', '_blank');
		};
	}])

	.controller('empresaController', ['$state', '$rootScope', '$scope', '$window', 'fileReader', 'dataFactory', 'Upload', function($state, $rootScope, $scope, $window, fileReader, dataFactory, Upload) {
		var state = $state.current.name;
		// var storage = 'http://localhost:8000/storage/';
		$rootScope.state = 'app.home';
		$rootScope.sub = state;
		$rootScope.title = $rootScope.active_page = 'A Empresa';
		$rootScope.message = '';
		$rootScope.classe = '';
		$scope.options = {
			resize_enabled: false,
			height: 290
		};

		$scope.empresa = {};
		$scope.errorMsg = {};

		$scope.init = function() {
			dataFactory.getAll('empresa')
				.then(function (response) {
					var result = response.data;
					$scope.empresa = result.item;
					if ($scope.empresa.background_image_path)
						$scope.imageSrc = $rootScope.storage + $scope.empresa.background_image_path;
				}, function (error) {
					$rootScope.message = 'Não foi possível carregar registro: ' + error.statusText;
					$rootScope.classe = 'alert-danger';
					$rootScope.scrollTop();
					$rootScope.showMessage();
				});
		};

		$scope.init();

		$scope.getFile = function () {
			fileReader.readAsDataUrl($scope.file, $scope)
			.then(function(result) {
				$scope.imageSrc = result;
			});
		};

		$scope.submitForm = function() {
			var file = $scope.file;
			// UPDATE
			if ($scope.empresa && "undefined" != typeof $scope.empresa.id) {
				if (file) {
					$scope.empresa.file = file;
					$scope.empresa._method = 'PUT';
					file.upload = Upload.upload({
						url: $rootScope.api + 'empresa/' + $scope.empresa.id,
						data: $scope.empresa
					});

					file.upload
						.then(function (response) {
							var result = response.data;
							$scope.empresa = result.item;
							$scope.errorMsg = {};
							$scope.file = null;
							$scope.imageSrc = $rootScope.storage + $scope.empresa.background_image_path;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;
							$rootScope.scrollTop();
							$rootScope.showMessage();
							empresaForm.reset();
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					dataFactory.updateItem($scope.empresa, 'empresa')
						.then(function (response) {
							var result = response.data;
							$scope.empresa = result.item;
							$scope.errorMsg = {};
							$scope.file = null;
							$scope.imageSrc = $rootScope + $scope.empresa.background_image_path;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;
							$rootScope.scrollTop();
							$rootScope.showMessage();
							empresaForm.reset();
						}, function (error) {
							if (error.data && "undefined" != typeof error.data) {
								var result = error.data;
								$scope.errorMsg = result;
							}
						});
				}
			} else {
				// INSERT
				if (file && $scope.empresa && "undefined" != typeof $scope.empresa.text_empresa && "undefined" != typeof $scope.empresa.text_empresa2) {
					$scope.empresa.file = file;
					file.upload = Upload.upload({
						url: $rootScope.api + 'empresa',
						method: 'POST',
						data: $scope.empresa
					});
					file.upload
						.then(function (response) {
							var result = response.data;
							$scope.empresa = result.item;
							$scope.errorMsg = {};
							$scope.file = null;
							$rootScope.message = result.message;
							$rootScope.classe = 'alert-success';
							$rootScope.scrollTop();
							$rootScope.showMessage();
							empresaForm.reset();
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					if (!file)
						$scope.errorMsg.file = ['Campo obrigatório'];

					if (($scope.empresa.text_empresa == "") || ("undefined" == typeof $scope.empresa.text_empresa))
						$scope.errorMsg.text_empresa = ['Campo obrigatório'];

					if (($scope.empresa.text_empresa2 == "") || ("undefined" == typeof $scope.empresa.text_empresa2))
						$scope.errorMsg.text_empresa2 = ['Campo obrigatório'];
				}
			}
		};

		$scope.preview = function() {
			var sendData = {};
			sendData.state = 'empresa';
			sendData.empresa = $scope.empresa;
			sessionStorage['viewData'] = angular.copy(JSON.stringify(sendData));
			window.open('preview/', '_blank');
		};
	}])

	.controller('servicosController', ['$state', '$rootScope', '$scope', '$window', 'fileReader', 'dataFactory', 'Upload', function($state, $rootScope, $scope, $window, fileReader, dataFactory, Upload) {
		var state = $state.current.name;
		$rootScope.state = 'app.home';
		$rootScope.sub = state;
		$rootScope.title = $rootScope.active_page = 'Serviços e Soluções';
		$rootScope.message = '';
		$rootScope.classe = '';

		$scope.options = {
			resize_enabled: false,
			height: 202
		};

		$scope.servicos = {};
		$scope.servico = {};
		$scope.errorMsg = {};
		$scope.next = 1;

		$scope.getFile = function () {
			if ($scope.file) {
				fileReader.readAsDataUrl($scope.file, $scope)
					.then(function(result) {
						$scope.imageSrc = result;
					});
			}
		};

		$scope.init = function() {
			dataFactory.getAll('servicos')
				.then(function (response) {
					var result = response.data;
					$scope.servicos = result.servicos;
					$scope.servico.position = result.next;
					$scope.next = result.next;
				}, function (error) {
					$rootScope.message = 'Não foi possível carregar registro: ' + error.statusText;
					$rootScope.classe = 'alert-danger';
					$rootScope.scrollTop();
					$rootScope.showMessage();
				});
		};

		$scope.init();

		$scope.saveServico = function() {
			var file = $scope.file;
			// UPDATE
			if ($scope.servico && "undefined" != typeof $scope.servico.id) {
				if (file) {
					$scope.servico.file = file;
					$scope.servico._method = 'PUT';
					file.upload = Upload.upload({
						url: $rootScope.api + 'servicos/' + $scope.servico.id,
						data: $scope.servico
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.servicos = result.servicos;
						$scope.errorMsg = {};
						$scope.servico = {};
						$scope.servico.position = result.next;
						$scope.file = null;
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = result.classe;
						$rootScope.scrollTop();
						$rootScope.showMessage();
						servicoForm.reset();
						$('.image-view img').attr('src', '');
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					dataFactory.updateItem($scope.servico, 'servicos')
						.then(function (response) {
							var result = response.data;
							$scope.servicos = result.servicos;
							$scope.errorMsg = {};
							$scope.servico = {};
							$scope.servico.position = result.next;
							$scope.file = null;
							$scope.imageSrc = null;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;
							$rootScope.scrollTop();
							$rootScope.showMessage();
							servicoForm.reset();
							$('.image-view img').attr('src', '');
						}, function (error) {
							if (error.data && "undefined" != typeof error.data) {
								var result = error.data;
								$scope.errorMsg = result;
							}
						});
				}
			} else {
				// INSERT
				if (file && ($scope.servico && "undefined" != typeof $scope.servico.title_item && $scope.servico.text_item != '') ) {
					$scope.servico.file = file;
					file.upload = Upload.upload({
						url: $rootScope.api + 'servicos',
						method: 'POST',
						data: $scope.servico
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.servicos = result.servicos;
						$scope.errorMsg = {};
						$scope.servico = {};
						$scope.servico.position = result.next;
						$scope.file = null;
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
						servicoForm.reset();
						$('.image-view img').attr('src', '');
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					if (!file)
						$scope.errorMsg.file = ['Campo obrigatório'];

					if (($scope.servico.title_item == "") || ("undefined" == typeof $scope.servico.title_item))
						$scope.errorMsg.title_item = ['Campo obrigatório'];

					if (($scope.servico.text_item == "") || ("undefined" == typeof $scope.servico.text_item))
						$scope.errorMsg.text_item = ['Campo obrigatório'];
				}
			}
		};

		$scope.editServico = function(servico) {
			$scope.servico = servico;
			$scope.errorMsg = {};
			// var storage = 'http://localhost:8000/storage/';
			var image_url = $rootScope.storage + servico.image_item_path;
			$scope.imageSrc = image_url;
		};

		$scope.deleteServico = function(servico) {
			$scope.servico = {};
			$scope.imageSrc = null;
			$('.image-view img').attr('src', '');

			var confirm = $window.confirm('Deseja mesmo excluir esse item?');

			if (confirm) {
				dataFactory.deleteItem(servico, 'servicos')
					.then(function (response) {
						var result = response.data;
						$rootScope.message = result.message;
						$scope.servicos = result.servicos;
						$scope.servico.position = result.next;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						$rootScope.message = 'Não foi possível excluir o registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
					});
			}
		};

		$scope.resetForm = function() {
			$scope.servico = {};
			$scope.servico.position = $scope.next;
			$scope.errorMsg = {};
			$scope.file = null;
			$scope.imageSrc = null;
			$('.image-view img').attr('src', '');
		};

		$scope.preview = function() {
			var sendData = {};
			sendData.state = 'servicos-solucoes';
			sendData.servico = $scope.servico;
			sendData.servicos = $scope.servicos;
			sendData.imageSrc = $scope.imageSrc;
			sessionStorage['viewData'] = angular.copy(JSON.stringify(sendData));
			window.open('preview/', '_blank');
		};
	}])

	.controller('clientesController', ['$state', '$rootScope', '$scope', '$window', 'fileReader', 'dataFactory', 'Upload', function($state, $rootScope, $scope, $window, fileReader, dataFactory, Upload) {
		var state = $state.current.name;
		$rootScope.state = 'app.home';
		$rootScope.sub = state;
		$rootScope.title = $rootScope.active_page = 'Clientes';
		$rootScope.message = '';
		$rootScope.classe = '';
		
		$scope.cliente_text = {};
		$scope.clientes = {};
		$scope.cliente = {};
		$scope.errorMsg = {};

		$scope.file = null;

		$scope.getFile = function () {
			fileReader.readAsDataUrl($scope.file, $scope)
				.then(function(result) {
					$scope.imageSrc = result;
				});
		};

		$scope.init = function() {
			dataFactory.getAll('cliente')
				.then(function (response) {
					var result = response.data;
					$scope.cliente_text = result.text;
					$scope.clientes = result.clientes;
				}, function (error) {
					$rootScope.message = 'Não foi possível carregar registro: ' + error.statusText;
					$rootScope.classe = 'alert-danger';
					$rootScope.scrollTop();
					$rootScope.showMessage();
				});
		};

		$scope.init();

		$scope.saveClienteText = function() {
			if (($scope.cliente_text != null) && ("undefined" != typeof $scope.cliente_text.id)) {
				dataFactory.updateItem($scope.cliente_text, 'cliente')
					.then(function (response) {
						var result = response.data;
						$scope.cliente_text = result.text;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						$rootScope.message = 'Não foi possível alterar o registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					});
			} else {
				dataFactory.insertItem($scope.cliente_text, 'cliente')
					.then(function (response) {
						var result = response.data;
						$scope.cliente_text = result.text;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						$rootScope.message = 'Não foi possível inserir o registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					});
			}
		};

		$scope.saveCliente = function() {
			var file = $scope.file;
			// UPDATE
			if ($scope.cliente && "undefined" != typeof $scope.cliente.id) {
				if (file) {
					$scope.cliente.file = file;
					$scope.cliente._method = 'PUT';
					file.upload = Upload.upload({
						url: $rootScope.api + 'clientes/' + $scope.cliente.id,
						data: $scope.cliente
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.clientes = result.clientes;
						$scope.errorMsg = {};
						$scope.cliente = {};
						$scope.file = null;
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = result.classe;
						$rootScope.scrollTop();
						$rootScope.showMessage();
						clienteForm.reset();
						$('.image-view img').attr('src', '');
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					dataFactory.updateItem($scope.cliente, 'clientes')
						.then(function (response) {
							var result = response.data;
							$scope.clientes = result.clientes;
							$scope.errorMsg = {};
							$scope.cliente = {};
							$scope.file = null;
							$scope.imageSrc = null;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;
							$rootScope.scrollTop();
							$rootScope.showMessage();
							clienteForm.reset();
							$('.image-view img').attr('src', '');
						}, function (error) {
							if (error.data && "undefined" != typeof error.data) {
								var result = error.data;
								$scope.errorMsg = result;
							}
						});
				}
			} else {
				// INSERT
				if (file && ($scope.cliente && "undefined" != typeof $scope.cliente.title_client) ) {
					$scope.cliente.file = file;
					file.upload = Upload.upload({
						url: $rootScope.api + 'clientes',
						method: 'POST',
						data: $scope.cliente
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.clientes = result.clientes;
						$scope.errorMsg = {};
						$scope.cliente = {};
						$scope.file = null;
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
						clienteForm.reset();
						$('.image-view img').attr('src', '');
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					$scope.errorMsg.file = ['Campo obrigatório'];
					if ("undefined" == typeof $scope.cliente.title_client)
						$scope.errorMsg.title_client = ['Campo obrigatório'];
				}
			}
		};

		$scope.editCliente = function(cliente) {
			$scope.cliente = cliente;
			$scope.errorMsg = {};
			// var storage = 'http://localhost:8000/storage/';
			var image_url = $rootScope.storage + cliente.image_client_path;
			$scope.imageSrc = image_url;
		};

		$scope.deleteCliente = function(cliente) {
			$scope.cliente = {};
			$scope.imageSrc = null;
			$('.image-view img').attr('src', '');

			var confirm = $window.confirm('Deseja mesmo excluir esse item?');

			if (confirm) {
				dataFactory.deleteItem(cliente, 'clientes')
					.then(function (response) {
						var result = response.data;
						$rootScope.message = result.message;
						$scope.clientes = result.clientes;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						$rootScope.message = 'Não foi possível excluir o registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
					});
			}
		};

		$scope.preview = function() {
			var sendData = {};
			sendData.state = 'clientes';
			sendData.cliente_text = $scope.cliente_text;
			sendData.cliente = $scope.cliente;
			sendData.clientes = $scope.clientes;
			sendData.imageSrc = $scope.imageSrc;
			sessionStorage['viewData'] = angular.copy(JSON.stringify(sendData));
			window.open('preview/', '_blank');
		};
	}])

	.controller('casesController', ['$state', '$rootScope', '$scope', '$window', 'fileReader', 'dataFactory', 'Upload', function($state, $rootScope, $scope, $window, fileReader, dataFactory, Upload) {
		var state = $state.current.name;
		$rootScope.state = 'app.home';
		$rootScope.sub = state;
		$rootScope.title = $rootScope.active_page = 'Cases';
		$rootScope.message = '';
		$rootScope.classe = '';

		$scope.case_text = {};
		$scope.case = {};
		$scope.cases = {};
		$scope.clientes = {};
		$scope.errorMsg = {};

		$scope.options = {
			resize_enabled: false,
			height: 300,
			format_div: { name: 'Caixa de Texto', element: 'div' },
			format_tags: 'p;span;h1;h2;h3;div',
			stylesSet: 'custom'
		};

		$scope.init = function() {
			dataFactory.getAll('case')
				.then(function (response) {
					var result = response.data;
					$scope.case_text = result.text;
					$scope.cases = result.cases;
				}, function (error) {
					$rootScope.message = 'Não foi possível carregar registro: ' + error.statusText;
					$rootScope.classe = 'alert-danger';
					$rootScope.scrollTop();
					$rootScope.showMessage();
				});
		};

		$scope.init();

		$scope.getFile = function () {
			fileReader.readAsDataUrl($scope.file, $scope)
			.then(function(result) {
				$scope.imageSrc = result;
			});
		};

		$scope.saveCaseText = function() {
			// UPDATE
			if (($scope.case_text != null) && ("undefined" != typeof $scope.case_text.id)) {
				dataFactory.updateItem($scope.case_text, 'case')
					.then(function (response) {
						var result = response.data;
						$scope.case_text = result.text;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
			} else {
			// INSERT
				if ($scope.case_text) {
					dataFactory.insertItem($scope.case_text, 'case')
						.then(function (response) {
							var result = response.data;
							$scope.case_text = result.text;
							$rootScope.message = result.message;
							$rootScope.classe = 'alert-success';
							$rootScope.scrollTop();
							$rootScope.showMessage();
							console.log(result);
						}, function (error) {
							if (error.data && "undefined" != typeof error.data) {
								var result = error.data;
								$scope.errorMsg = result;
							}
						});
				} else {
					if ($scope.case_text) {
						if ("undefined" == typeof $scope.case_text.title)
							$scope.errorMsg.title = ['Campo obrigatório'];

						if ("undefined" == typeof $scope.case_text.subtitle)
							$scope.errorMsg.subtitle = ['Campo obrigatório'];
					} else {
						$scope.errorMsg.title = ['Campo obrigatório'];
						$scope.errorMsg.subtitle = ['Campo obrigatório'];
					}
				}
			}
		};

		$scope.saveCase = function() {
			var file = $scope.file;
			
			// UPDATE
			if ($scope.case && "undefined" != typeof $scope.case.id) {
				if (file) {
					$scope.case.file = file;
					$scope.case._method = 'PUT';
					file.upload = Upload.upload({
						url: $rootScope.api + 'cases/' + $scope.case.id,
						data: $scope.case
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.cases = result.cases;
						$scope.errorMsg = {};
						$scope.case = {};
						$scope.file = null;
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = result.classe;
						$rootScope.scrollTop();
						$rootScope.showMessage();
						casesForm.reset();
						$('.image-view img').attr('src', '');
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					dataFactory.updateItem($scope.case, 'cases')
						.then(function (response) {
							var result = response.data;
							$scope.cases = result.cases;
							$scope.errorMsg = {};
							$scope.case = {};
							$scope.file = null;
							$scope.imageSrc = null;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;
							$rootScope.scrollTop();
							$rootScope.showMessage();
							casesForm.reset();
							$('.image-view img').attr('src', '');
						}, function (error) {
							if (error.data && "undefined" != typeof error.data) {
								var result = error.data;
								$scope.errorMsg = result;
							}
						});
				}
			} else {
				// INSERT
				if (file && ($scope.case && "undefined" != typeof $scope.case.title && $scope.case.text != '' && $scope.case.description != '') ) {
					$scope.case.file = file;
					file.upload = Upload.upload({
						url: $rootScope.api + 'cases',
						method: 'POST',
						data: $scope.case
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.cases = result.cases;
						$scope.errorMsg = {};
						$scope.case = {};
						$scope.file = null;
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
						casesForm.reset();
						$('.image-view img').attr('src', '');
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					if (!file)
						$scope.errorMsg.file = ['Campo obrigatório'];

					if (($scope.case.title == "") || ("undefined" == typeof $scope.case.title))
						$scope.errorMsg.title = ['Campo obrigatório'];

					if (($scope.case.description == "") || ("undefined" == typeof $scope.case.description))
						$scope.errorMsg.description = ['Campo obrigatório'];

					if (($scope.case.text == "") || ("undefined" == typeof $scope.case.text))
						$scope.errorMsg.text = ['Campo obrigatório'];
				}
			}
		};

		$scope.editCase = function(item) {
			$scope.case = item;
			$scope.errorMsg = {};
			// var storage = 'http://localhost:8000/storage/';
			var image_url = $rootScope.storage + item.filepath;
			$scope.imageSrc = image_url;
		};

		$scope.deleteCase = function(item) {
			$scope.case = {};
			$scope.imageSrc = null;
			$('.image-view img').attr('src', '');

			var confirm = $window.confirm('Deseja mesmo excluir esse item?');

			if (confirm) {
				dataFactory.deleteItem(item, 'cases')
					.then(function (response) {
						var result = response.data;
						$rootScope.message = result.message;
						$scope.cases = result.cases;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						$rootScope.message = 'Não foi possível excluir o registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
					});
			}
		};

		$scope.getClientes = function() {
			if (!$scope.clientes.length) {
				dataFactory.getAll('clientes')
					.then(function (response) {
						var result = response.data;
						$scope.clientes = result.clientes;
					}, function (error) {
						$rootScope.message = 'Não foi possível carregar registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					});
			}
		};

		$scope.selectCliente = function(cliente) {
			$scope.case.cliente = cliente;
		};

		$scope.preview = function() {
			var sendData = {};
			sendData.state = 'cases';
			sendData.case_text = $scope.case_text;
			sendData.case = $scope.case;
			sendData.cases = $scope.cases;
			sendData.imageSrc = $scope.imageSrc;
			sessionStorage['viewData'] = angular.copy(JSON.stringify(sendData));
			window.open('preview/', '_blank');
		};

		$scope.previewCase = function() {
			var sendData = {};
			sendData.state = 'case';
			sendData.case = $scope.case;
			sendData.imageSrc = $scope.imageSrc;
			sessionStorage['viewData'] = angular.copy(JSON.stringify(sendData));
			window.open('preview/', '_blank');
		};
	}])

	.controller('bannersController', ['$state', '$rootScope', '$scope', '$window', 'fileReader', 'dataFactory', 'Upload', function($state, $rootScope, $scope, $window, fileReader, dataFactory, Upload) {
		var state = $state.current.name;
		$rootScope.state = $rootScope.sub = state;
		$rootScope.title = $rootScope.active_page = 'Banners';
		$rootScope.message = '';
		$rootScope.classe = '';
		$scope.options = {
			resize_enabled: false,
			height: 180
		};

		$scope.banners = {};
		$scope.banner = {};
		$scope.errorMsg = {};

		$scope.getFile = function () {
			fileReader.readAsDataUrl($scope.file, $scope)
			.then(function(result) {
				$scope.imageSrc = result;
			});
		};

		$scope.init = function() {
			dataFactory.getAll('banners')
				.then(function (response) {
					var result = response.data;
					$scope.banners = result.banners;
				}, function (error) {
					$rootScope.message = 'Não foi possível carregar registro: ' + error.statusText;
					$rootScope.classe = 'alert-danger';
					$rootScope.scrollTop();
					$rootScope.showMessage();
				});
		};

		$scope.init();

		$scope.saveBanner = function() {
			var file = $scope.file;
			// UPDATE
			if ($scope.banner && "undefined" != typeof $scope.banner.id) {
				if (file) {
					$scope.banner.file = file;
					$scope.banner._method = 'PUT';
					file.upload = Upload.upload({
						url: $rootScope.api + 'banners/' + $scope.banner.id,
						data: $scope.banner
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.banners = result.banners;
						$scope.errorMsg = {};
						$scope.banner = {};
						$scope.file = null;
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = result.classe;
						$rootScope.scrollTop();
						$rootScope.showMessage();
						bannerForm.reset();
						$('.image-view img').attr('src', '');
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					dataFactory.updateItem($scope.banner, 'banners')
						.then(function (response) {
							var result = response.data;
							$scope.banners = result.banners;
							$scope.errorMsg = {};
							$scope.banner = {};
							$scope.file = null;
							$scope.imageSrc = null;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;
							$rootScope.scrollTop();
							$rootScope.showMessage();
							bannerForm.reset();
							$('.image-view img').attr('src', '');
						}, function (error) {
							if (error.data && "undefined" != typeof error.data) {
								var result = error.data;
								$scope.errorMsg = result;
							}
						});
				}
			} else {
				// INSERT
				if (file && ($scope.banner && $scope.banner.name != '') ) {
					$scope.banner.file = file;
					file.upload = Upload.upload({
						url: $rootScope.api + 'banners',
						method: 'POST',
						data: $scope.banner
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.banners = result.banners;
						$scope.errorMsg = {};
						$scope.banner = {};
						$scope.file = null;
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
						bannerForm.reset();
						$('.image-view img').attr('src', '');
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					$scope.errorMsg.file = ['Campo obrigatório'];
					if (($scope.banner.name == "") || ("undefined" == typeof $scope.banner.name))
						$scope.errorMsg.name = ['Campo obrigatório'];
				}
			}
		};

		$scope.editBanner = function(banner) {
			$scope.banner = banner;
			$scope.errorMsg = {};
			// var storage = 'http://localhost:8000/storage/';
			var image_url = $rootScope.storage + banner.filepath;
			$scope.imageSrc = image_url;
		};

		$scope.deleteBanner = function(banner) {
			var confirm = $window.confirm('Deseja mesmo excluir esse item?');

			if (confirm) {
				dataFactory.deleteItem(banner, 'banners')
					.then(function (response) {
						var result = response.data;
						$scope.banners = result.banners;
						$scope.banner = {};
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
						$('.image-view img').attr('src', '');
					}, function (error) {
						$rootScope.message = 'Não foi possível excluir o registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
					});
			}
		};
	}])

	.controller('newsletterController', ['$state', '$rootScope', '$scope', '$window', '$timeout', 'dataFactory', function($state, $rootScope, $scope, $window, $timeout, dataFactory) {
		var state = $state.current.name;
		$rootScope.state = $rootScope.sub = state;
		$rootScope.title = $rootScope.active_page = 'Newsletters';
		$rootScope.message = '';
		$rootScope.classe = '';

		$scope.news = [];
		$scope.errorMsg = {};

		$scope.init = function() {
			dataFactory.getAll('news')
				.then(function (response) {
					var result = response.data;
					$scope.news = result.news;
				}, function (error) {
					$rootScope.message = 'Não foi possível carregar lista de e-mails: ' + error.statusText;
					$rootScope.classe = 'alert-danger';
					$rootScope.scrollTop();
					$rootScope.showMessage();
				});
		};

		$scope.init();

		$scope.deleteEmail = function(email) {
			var confirm = $window.confirm('Deseja mesmo excluir esse item?');

			if (confirm) {
				dataFactory.deleteItem(email, 'news')
					.then(function (response) {
						var result = response.data;
						$scope.news = result.news;					
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						$rootScope.message = 'Não foi possível excluir o item: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
					});
			}
		};

		$scope.exportarCSV = function() {
			var exportWindow = $window.open($rootScope.api + 'export/csv', '_blank');
			/*$timeout(function() {
				exportWindow.close();
			}, 3000);*/
		};
	}])

	.controller('configController', ['$state', '$rootScope', '$scope', '$window', 'fileReader', 'dataFactory', 'Upload', function($state, $rootScope, $scope, $window, fileReader, dataFactory, Upload) {
		// var storage = 'http://localhost:8000/storage/';
		var state = $state.current.name;
		$rootScope.state = $rootScope.sub = state;
		$rootScope.title = $rootScope.active_page = 'Configurações Gerais';
		$rootScope.message = '';
		$rootScope.classe = '';

		$scope.config = {};
		$scope.errorMsg = {};

		$scope.getFile = function () {
			fileReader.readAsDataUrl($scope.file, $scope)
			.then(function(result) {
				$scope.imageSrc = result;
			});
		};

		$scope.init = function() {
			dataFactory.getAll('config')
				.then(function (response) {
					var result = response.data;
					if (result.config.length) {
						$scope.config = result.config[0];
						$scope.imageSrc = $rootScope.storage + $scope.config.logo_filepath;
					}
				}, function (error) {
					$rootScope.message = 'Não foi possível carregar configurações: ' + error.statusText;
					$rootScope.classe = 'alert-danger';
					$rootScope.scrollTop();
					$rootScope.showMessage();
				});
		};

		$scope.init();

		$scope.saveConfig = function() {
			var file = $scope.file;
			// UPDATE
			if ($scope.config && "undefined" != typeof $scope.config.id) {
				if (file) {
					$scope.config.file = file;
					$scope.config._method = 'PUT';
					file.upload = Upload.upload({
						url: $rootScope.api + 'config/' + $scope.config.id,
						data: $scope.config
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.config = result.config[0];
						$scope.errorMsg = {};
						$scope.file = null;
						$scope.imageSrc = $rootScope + $scope.config.logo_filepath;
						$rootScope.message = result.message;
						$rootScope.classe = result.classe;
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					dataFactory.updateItem($scope.config, 'config')
						.then(function (response) {
							var result = response.data;
							$scope.config = result.config[0];
							$scope.errorMsg = {};
							$scope.file = null;
							$scope.imageSrc = $rootScope.storage + $scope.config.logo_filepath;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;
							$rootScope.scrollTop();
							$rootScope.showMessage();
						}, function (error) {
							if (error.data && "undefined" != typeof error.data) {
								var result = error.data;
								$scope.errorMsg = result;
							}
						});
				}
			} else {
				// INSERT
				if (file && $scope.config) {
					$scope.config.file = file;
					file.upload = Upload.upload({
						url: $rootScope.api + 'config',
						method: 'POST',
						data: $scope.config
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.config = result.config[0];
						$scope.errorMsg = {};
						$scope.file = null;
						$scope.imageSrc = $rootScope.storage + $scope.config.logo_filepath;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							
							if ("undefined" != typeof result.lat || "undefined" != typeof result.lon)
								result.localization = ['Campo obrigatório'];

							$scope.errorMsg = result;
						}
					});
				} else {
					$scope.errorMsg.file = ['Campo obrigatório'];

					if ("undefined" == typeof $scope.config.sender)
						$scope.errorMsg.sender = ['Campo obrigatório'];

					if ("undefined" == typeof $scope.config.address)
						$scope.errorMsg.address = ['Campo obrigatório'];

					if ("undefined" == typeof $scope.config.phone)
						$scope.errorMsg.phone = ['Campo obrigatório'];

					if ("undefined" == typeof $scope.config.lat || $scope.config.lat == '') {
						$scope.errorMsg.lat = ['Campo obrigatório'];
						$scope.errorMsg.localization = ['Campo obrigatório'];
					}

					if ("undefined" == typeof $scope.config.lon || $scope.config.lon == '') {
						$scope.errorMsg.lon = ['Campo obrigatório'];
						$scope.errorMsg.localization = ['Campo obrigatório'];
					}
				}
			}
		};

		$scope.$on('$viewContentLoaded', function() {
			$('[data-mask]').inputmask({mask: ['(99) 9999-9999', '(99) 99999-9999']});
        });
	}])

    .controller('blogController', ['$state', '$rootScope', '$scope', '$window', '$filter', '$q', 'fileReader', 'imageReader', 'dataFactory', 'Upload', function($state, $rootScope, $scope, $window, $filter, $q, fileReader, imageReader, dataFactory, Upload) {
        var state = $state.current.name;
        // var storage = 'http://localhost:8000/storage/';
        $rootScope.state = 'app.home';
        $rootScope.sub = state;
        $rootScope.title = $rootScope.active_page = 'Blog';
        $rootScope.message = '';
        $rootScope.classe = '';

        $scope.blog_text = {};
        $scope.blogs = {};
        $scope.blog = {};
        $scope.errorMsg = {};
		$scope.gallery = [];
        $scope.options = {
			height: 295,
			resize_minHeight: 400,
		};

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
        };

        $scope.getFiles = function () {
        	var deferred;
        	var dArr = [];
        	var gallery = [];
        	var id = 1;
        	var add = true;
        	angular.forEach($scope.files, function(item, index){
        		var promise;
        		if (arrayObjectIndexOf_File($scope.gallery, item) == -1) {
	        		promise = fileReader.readAsDataUrl(item, $scope).then((result) => imageReader.readBlob(result, $scope, item));
					dArr.push(promise);
				}
			});

			$q.all(dArr)
				.then((values) => {
					for (var i = 0; i < values.length; i++) {
						var id = 1;
						if ($scope.gallery.length > 0) 
	        				id = Math.max.apply(Math, $scope.gallery.map(function(o){ return o.id })) + 1;

						$scope.gallery.push(
							{
								id: id,
								filepath: values[i].filepath,
								thumbnail: values[i].thumbnail,
								file: values[i].file
							}
						);
					}
				});
		};

        $scope.init = function() {
            dataFactory.getAll('blog')
                .then(function (response) {
                    var result = response.data;
                    $scope.title_client = result.title_client;
                    $scope.blog = result.blog;
                }, function (error) {
                    $rootScope.message = 'Não foi possível carregar registro: ' + error.statusText;
                    $rootScope.classe = 'alert-danger';
                    $rootScope.scrollTop();
                    $rootScope.showMessage();
                });
        };

		$scope.saveBlogText = function() {
            if (($scope.blog_text != null) && ("undefined" != typeof $scope.blog_text.id)) {
                dataFactory.updateItem($scope.blog_text, 'blog')
                    .then(function (response) {
                        var result = response.data;
                        $scope.blog_text = result.blog_text;
                        $rootScope.message = result.message;
                        $rootScope.classe = 'alert-success';
                        $rootScope.scrollTop();
                        $rootScope.showMessage();
                    }, function (error) {
                        $rootScope.message = 'Não foi possível alterar o registro: ' + error.statusText;
                        $rootScope.classe = 'alert-danger';
                        $rootScope.scrollTop();
                        $rootScope.showMessage();
                    });
            } else {
                dataFactory.insertItem($scope.blog_text, 'blog')
                    .then(function (response) {
                        var result = response.data;
                        $scope.blog_text = result.blog_text;
                        $rootScope.message = result.message;
                        $rootScope.classe = 'alert-success';
                        $rootScope.scrollTop();
                        $rootScope.showMessage();
                    }, function (error) {
                        $rootScope.message = 'Não foi possível inserir o registro: ' + error.statusText;
                        $rootScope.classe = 'alert-danger';
                        $rootScope.scrollTop();
                        $rootScope.showMessage();
                    });
            }
        };

        $scope.saveBlog = function() {
            var file = $scope.file;
            var files = $scope.files;
            // UPDATE
            if ($scope.blogs && "undefined" != typeof $scope.blogs.id) {
                if (file) {
                    $scope.blogs.file = file;
                    $scope.blogs.files = (files.length) ? files : [];
                    $scope.blogs._method = 'PUT';

                    file.upload = Upload.upload({
                        url: $rootScope.api + 'blog/' + $scope.blogs.id,
                        data: $scope.blogs
                    });

                    file.upload.then(function (response) {
                        var result = response.data;
                        $scope.blog = result.blog;
                        $scope.errorMsg = {};
                        $scope.blogs = {};
                        $scope.file = null;
                        $scope.files = null;
                        $scope.gallery = null;
                        $scope.imageSrc = null;
                        $rootScope.message = result.message;
                        $rootScope.classe = result.classe;
                        $rootScope.scrollTop();
                        $rootScope.showMessage();
                        blogForm.reset();
                        $('.image-view img').attr('src', '');
                    }, function (error) {
                        if (error.data && "undefined" != typeof error.data) {
                            var result = error.data;
                            $scope.errorMsg = result;
                        }
                    });
                } else {
                	if (files.length) {
                		$scope.blogs.files = files;
                		$scope.blogs._method = 'PUT';
	                    Upload.upload({
	                        url: $rootScope.api + 'blog/' + $scope.blogs.id,
	                        data: $scope.blogs
	                    }).then(function (response) {
	                        var result = response.data;
	                        $scope.blog = result.blog;
	                        $scope.errorMsg = {};
	                        $scope.blogs = {};
	                        $scope.file = null;
	                        $scope.files = null;
	                        $scope.gallery = null;
	                        $scope.imageSrc = null;
	                        $rootScope.message = result.message;
	                        $rootScope.classe = result.classe;
	                        $rootScope.scrollTop();
	                        $rootScope.showMessage();
	                        blogForm.reset();
	                        $('.image-view img').attr('src', '');
	                    }, function (error) {
	                        if (error.data && "undefined" != typeof error.data) {
	                            var result = error.data;
	                            $scope.errorMsg = result;
	                        }
	                    });
                	} else {
						dataFactory.updateItem($scope.blogs, 'blog')
							.then(function (response) {
								var result = response.data;
								$scope.blog = result.blog;
								$scope.errorMsg = {};
								$scope.blogs = {};
								$scope.file = null;
								$scope.files = null;
	                        	$scope.gallery = null;
								$scope.imageSrc = null;
								$rootScope.message = result.message;
								$rootScope.classe = result.classe;
								$rootScope.scrollTop();
								$rootScope.showMessage();
								blogForm.reset();
								$('.image-view img').attr('src', '');
							}, function (error) {
								if (error.data && "undefined" != typeof error.data) {
									var result = error.data;
									$scope.errorMsg = result;
								}
							});
                	}
                }
            } else {
                // INSERT
                if (file && ($scope.blogs && "undefined" != typeof $scope.blogs.title_client) ) {
                	$scope.blogs.files = (files.length) ? files : [];
                    file.upload = Upload.upload({
                        url: $rootScope.api + 'blog',
                        method: 'POST',
                        data: {
                            title_client: $scope.blogs.title_client,
                            title_tags: $scope.blogs.title_tags,
							image_client_path: file,
							description: $scope.blogs.description,
							status: '1',
                            date_publish: $scope.blogs.date_publish
                        }
                    });

                    file.upload.then(function (response) {
                        var result = response.data;
                        $scope.blog = result.blog;
                        $scope.errorMsg = {};
                        $scope.blogs = {};
                        $scope.file = null;
                        $scope.files = null;
                        $scope.gallery = null;
                        $scope.imageSrc = null;
                        $rootScope.message = result.message;
                        $rootScope.classe = 'alert-success';
                        $rootScope.scrollTop();
                        $rootScope.showMessage();
                        blogForm.reset();
                        $('.image-view img').attr('src', '');
                    }, function (error) {
                        if (error.data && "undefined" != typeof error.data) {
                            var result = error.data;
                            $scope.errorMsg = result;
                        }
                    });
                } else {
                    $scope.errorMsg.file = ['Campo obrigatório'];
                    if ("undefined" == typeof $scope.blog.title_client)
                        $scope.errorMsg.title_client = ['Campo obrigatório'];
                }
            }
        };

        $scope.editBlog = function(blogs) {
            if ("undefined" == typeof blogs.date_publish_fixed)
            	blogs.date_publish_fixed = blogs.date_publish;

            var image_url = $rootScope.storage + blogs.image_client_path;
            var d = new Date(blogs.date_publish_fixed);
            blogs.date_publish = $filter('date')(d, 'dd/MM/yyyy');
            $scope.errorMsg = {};
            $scope.imageSrc = image_url;
        	$scope.blogs = blogs;
        	$scope.gallery = blogs.gallery.map(
        		function(val) { 
        			return {
        				'id' : val.id,
        				'filepath' : blobImageURL(val.filepath),
        				'thumbnail': blobImageURL(val.thumbnail) 
        			}
        		}
        	);
        };

        $scope.deleteBlog = function(blogs) {
            $scope.blogs = {};
            $scope.imageSrc = null;
            $('.image-view img').attr('src', '');

            var confirm = $window.confirm('Deseja mesmo excluir esse post?');

            if (confirm) {
                dataFactory.deleteItem(blogs, 'blog')
                    .then(function (response) {
                        var result = response.data;
                        $rootScope.message = result.message;
                        $scope.blog = result.blog;
                        $rootScope.classe = 'alert-success';
                        $rootScope.scrollTop();
                        $rootScope.showMessage();
                    }, function (error) {
                        $rootScope.message = 'Não foi possível excluir o registro: ' + error.statusText;
                        $rootScope.classe = 'alert-danger';
                    });
            }
        };

        $scope.preview = function() {
			var sendData = {};
			sendData.state = 'blog';
			sendData.blog = $scope.blogs;
			sendData.blogs = $scope.blog;
			sendData.imageSrc = $scope.imageSrc;
			console.log($scope.gallery);
			sendData.gallery = $scope.gallery.map(
				function(val) {
					if (val.filepath)
						return {
							id: val.id,
							filepath: blobImage(val.filepath),
							thumbnail: val.thumbnail
						}
				}
			);
			sessionStorage['viewData'] = angular.copy(JSON.stringify(sendData));
			window.open('preview/', '_blank');
		};

		$scope.removeFile = function (item) {
			var index = $scope.gallery.indexOf(item);
			$scope.gallery.splice(index, 1);
		};

		var arrayObjectIndexOf_File = function (arr, obj) {
			for (var i = 0; i < arr.length; i++) {
				if (angular.equals(arr[i].file, obj)) {
					return i;
				}
			}
			return -1;
		};

		var blobImageURL = function(url) {
			if (url) {
				var image = new Image();
				var ext = url.split('.')[1];
				var mimeType;
				switch (ext) {
					case 'png':
						mimeType = 'image/png';
						break;
					default:
						mimeType = 'image/jpeg';
						break;
				}
				var onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.naturalWidth;
					canvas.height = image.naturalHeight;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(image, 0, 0);
					var dataURL = canvas.toDataURL("image/png");
					var blobURL = blobImage(dataURL);
					ctx.clearRect(0,0,canvas.width,canvas.height);
					$(canvas).remove();
					return blobURL;
				}
				image.setAttribute('crossOrigin', 'anonymous');
				image.onload = onload;
				image.src = $rootScope.storage + url;
			}
		};
		
		var blobImage = function(base64_image) {
			if (base64_image) {
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
			}
		};

        $scope.$on('$viewContentLoaded', function() {
            // $('[data-mask]').inputmask({mask: ['99/99/9999', '99/99/9999']});
            $('.date').datepicker({
				format: "dd/mm/yyyy",
				language: "pt-BR",
				autoclose: true,
				todayHighlight: true,
			});
        });

        $scope.init();
    }])

	.controller('loginController', ['$state', '$rootScope', '$scope', '$auth', function($state, $rootScope, $scope, $auth) {
        $rootScope.state = 'login';

		$scope.login = function() {
			var credentials = {
				name: $scope.user.name,
				password: $scope.user.password,
			}
			$auth
				.login(credentials)
				.then(function (response) {
					var token = response.data.token;
					$auth.setToken(token);
					$state.go('app.home');
				})
				.catch(function (response) {
			        console.log("error response", response);
		      	});
		};
	}])