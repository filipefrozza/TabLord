angular.module('tablord')
	.controller('salas', function($scope){
		socket.emit('buscar_salas');

		$scope.criarSala = function(sala){
			socket.emit('criar_sala', JSON.stringify(sala));
		};

		socket.on('atualizar_salas', function(salas){
			salas = JSON.parse(salas);

			$scope.salas = salas;
		});
	});