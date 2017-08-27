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
	}])

	.controller('empresaController', ['$state', '$rootScope', '$scope', '$window', 'fileReader', 'dataFactory', 'Upload', function($state, $rootScope, $scope, $window, fileReader, dataFactory, Upload) {
		var state = $state.current.name;
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

					file.upload.then(function (response) {
						var result = response.data;
						$scope.empresa = result.item;
						$scope.errorMsg = {};
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = result.classe;
						$rootScope.scrollTop();
						$rootScope.showMessage();
						empresaForm.reset();
						$('.image-view img').attr('src', '');
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					console.log($scope.empresa);
					dataFactory.updateItem($scope.empresa, 'empresa')
						.then(function (response) {
							var result = response.data;
							$scope.empresa = result.item;
							$scope.errorMsg = {};
							$scope.imageSrc = null;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;
							$rootScope.scrollTop();
							$rootScope.showMessage();
							empresaForm.reset();
							$('.image-view img').attr('src', '');
							console.log(result);
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
						/*{
							text_empresa: $scope.empresa.text_empresa,
							text_empresa2: $scope.empresa.text_empresa2,
							file: file
						}*/
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.empresa = result.item;
						$scope.errorMsg = {};
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
						empresaForm.reset();
						$('.image-view img').attr('src', '');
					}, function (error) {
						if (error.data && "undefined" != typeof error.data) {
							var result = error.data;
							$scope.errorMsg = result;
						}
					});
				} else {
					$scope.errorMsg.file = ['Campo obrigatório'];
					if (($scope.empresa.text_empresa == "") || ("undefined" == typeof $scope.empresa.text_empresa))
						$scope.errorMsg.text_empresa = ['Campo obrigatório'];

					if (($scope.empresa.text_empresa2 == "") || ("undefined" == typeof $scope.empresa.text_empresa2))
						$scope.errorMsg.text_empresa2 = ['Campo obrigatório'];
				}
			}
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
					console.log($scope.servico);
					dataFactory.updateItem($scope.servico, 'servicos')
						.then(function (response) {
							var result = response.data;
							$scope.servicos = result.servicos;
							$scope.errorMsg = {};
							$scope.servico = {};
							$scope.servico.position = result.next;
							$scope.imageSrc = null;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;
							$rootScope.scrollTop();
							$rootScope.showMessage();
							servicoForm.reset();
							$('.image-view img').attr('src', '');
							console.log(result);
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
			var storage = 'http://localhost:8000/storage/';
			var image_url = storage + servico.image_item_path;
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
			$scope.imageSrc = null;
			$('.image-view img').attr('src', '');
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
						console.log(result);
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
						console.log(result);
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
					file.upload = Upload.upload({
						url: $rootScope.api + 'clientes/' + $scope.cliente.id,
						data: {
							id: $scope.cliente.id,
							title_client: $scope.cliente.title_client,
							image_client_path: $scope.cliente.image_client_path,
							_method: 'PUT',
							file: file
						}
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.clientes = result.clientes;
						$scope.errorMsg = {};
						$scope.cliente = {};
						$scope.imageSrc = null;
						$rootScope.message = result.message;
						$rootScope.classe = result.classe;//'alert-success';
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
					console.log($scope.cliente);
					dataFactory.updateItem($scope.cliente, 'clientes')
						.then(function (response) {
							var result = response.data;
							$scope.clientes = result.clientes;
							$scope.errorMsg = {};
							$scope.cliente = {};
							$scope.imageSrc = null;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;//'alert-success';
							$rootScope.scrollTop();
							$rootScope.showMessage();
							clienteForm.reset();
							$('.image-view img').attr('src', '');
							console.log(result);
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
					file.upload = Upload.upload({
						url: $rootScope.api + 'clientes',
						method: 'POST',
						data: {
							title_client: $scope.cliente.title_client,
							file: file
						}
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.clientes = result.clientes;
						$scope.errorMsg = {};
						$scope.cliente = {};
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
			var storage = 'http://localhost:8000/storage/';
			var image_url = storage + cliente.image_client_path;
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
	}])

	.controller('casesController', ['$state', '$rootScope', '$scope', '$window', 'fileReader', 'dataFactory', 'Upload', function($state, $rootScope, $scope, $window, fileReader, dataFactory, Upload) {
		var state = $state.current.name;
		$rootScope.state = 'app.home';
		$rootScope.sub = state;
		$rootScope.title = $rootScope.active_page = 'Cases';
		$rootScope.message = '';
		$rootScope.classe = '';

		$scope.cases = {};
		$scope.case_text = {};
		$scope.errorMsg = {};

		$scope.options = {
			resize_enabled: false,
			height: 216,
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

		$scope.editCase = function(item) {
			$scope.case = item;
			$scope.errorMsg = {};
			var storage = 'http://localhost:8000/storage/';
			var image_url = storage + item.image_client_path;
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
	}])

/*	.controller('contatoController', ['$state', '$rootScope', '$scope', '$window', 'dataFactory', function($state, $rootScope, $scope, $window, dataFactory) {
		var state = $state.current.name;
		$rootScope.state = 'app.home';
		$rootScope.sub = state;
		$rootScope.title = $rootScope.active_page = 'Fale Conosco';
		$rootScope.message = '';
		$rootScope.classe = '';

		$scope.contatos = {};
		$scope.contato = {};
		$scope.errorMsg = {};

		$scope.init = function() {
			dataFactory.getAll('contato')
				.then(function(response) {
					var result = response.data;
					$scope.contatos = result.contatos;
				}, function (error) {
					$rootScope.message = 'Não foi possível carregar assuntos: ' + error.statusText;
					$rootScope.classe = 'alert-danger';
					$rootScope.scrollTop();
					$rootScope.showMessage();
				});
		}

		$scope.init();

		$scope.submitForm = function() {
			if ($scope.contato && "undefined" != typeof $scope.contato.id) {
				dataFactory.updateItem($scope.contato, 'contato')
					.then(function (response) {
						var result = response.data;
						$scope.contato = {};
						$scope.errorMsg = {};
						$scope.contatos = result.contatos;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
						contatoForm.reset();
					}, function (error) {
						$scope.message = 'Não foi possível alterar o registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
					});
			} else {
				if ($scope.contato.subject) {
					dataFactory.insertItem($scope.contato, 'contato')
						.then(function (response) {
							var result = response.data;
							$scope.contato = {};
							$scope.errorMsg = {};
							$scope.contatos = result.contatos;
							$rootScope.message = result.message;
							$rootScope.classe = 'alert-success';
							$rootScope.scrollTop();
							$rootScope.showMessage();
							contatoForm.reset();
						}, function (error) {
							$scope.message = 'Não foi possível inserir o registro: ' + error.statusText;
							$rootScope.classe = 'alert-danger';
						});
				} else {
					$scope.errorMsg.subject = ['Campo obrigatório'];
				}
			}
		};

		$scope.editContato = function(contato) {
			$scope.contato = contato;
			$scope.errorMsg = {};
		};

		$scope.deleteContato = function(contato) {
			$scope.contato = {};

			var confirm = $window.confirm('Deseja mesmo excluir esse item?');

			if (confirm) {
				dataFactory.deleteItem(contato, 'contato')
					.then(function (response) {
						var result = response.data;
						$scope.contato = {};
						$scope.errorMsg = {};
						$scope.contatos = result.contatos;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
					}, function (error) {
						$rootScope.message = 'Não foi possível excluir o registro: ' + error.statusText;
						$rootScope.classe = 'alert-danger';
					});
			}
		};
	}])*/

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
					file.upload = Upload.upload({
						url: $rootScope.api + 'banners/' + $scope.banner.id,
						data: {
							id: $scope.banner.id,
							name: $scope.banner.name,
							description: $scope.banner.description,
							filepath: $scope.banner.filepath,
							_method: 'PUT',
							file: file
						}
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.banners = result.banners;
						$scope.errorMsg = {};
						$scope.banner = {};
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
					file.upload = Upload.upload({
						url: $rootScope.api + 'banners',
						method: 'POST',
						data: {
							name: $scope.banner.name,
							description: $scope.banner.description,
							file: file
						}
					});

					file.upload.then(function (response) {
						var result = response.data;
						$scope.banners = result.banners;
						$scope.errorMsg = {};
						$scope.banner = {};
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
			var storage = 'http://localhost:8000/storage/';
			var image_url = storage + banner.filepath;
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

	.controller('newsletterController', ['$state', '$rootScope', '$scope', '$window', 'dataFactory', function($state, $rootScope, $scope, $window, dataFactory) {
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
	}])

	.controller('configController', ['$state', '$rootScope', '$scope', '$window', 'fileReader', 'dataFactory', 'Upload', function($state, $rootScope, $scope, $window, fileReader, dataFactory, Upload) {
		var storage = 'http://localhost:8000/storage/';
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
						$scope.imageSrc = storage + $scope.config.logo_filepath;
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
						$scope.imageSrc = storage + $scope.config.logo_filepath;
						$rootScope.message = result.message;
						$rootScope.classe = result.classe;
						$rootScope.scrollTop();
						$rootScope.showMessage();
						// $('.image-view img').attr('src', '');
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
							$scope.imageSrc = storage + $scope.config.logo_filepath;
							$rootScope.message = result.message;
							$rootScope.classe = result.classe;
							$rootScope.scrollTop();
							$rootScope.showMessage();
							// $('.image-view img').attr('src', '');
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
						$scope.imageSrc = storage + $scope.config.logo_filepath;
						$rootScope.message = result.message;
						$rootScope.classe = 'alert-success';
						$rootScope.scrollTop();
						$rootScope.showMessage();
						// $('.image-view img').attr('src', '');
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