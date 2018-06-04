angular.module('tablord')
	.controller('salas', function($scope, $rootScope){
		function conectar(){
            if(!$rootScope.user){
                window.location.href = "#/";
            }else{
                socket.emit('conectar',JSON.stringify($rootScope.user));
            }
        };

        conectar();

        socket.on('conectado', function(r){
            if(r == 'false'){
                alert('nick já está em uso');
                window.location.href = "#/";
                // conectar();
            }else{
                socket.emit('buscar_salas');
                $scope.you = $rootScope.user;
                $scope.aplicar();
            }
        });

        socket.on('sala_criada', function(m){
            m = JSON.parse(m);
            if(m.erro){
                alert(m.erro);
            }else{
                $scope.salas = m;
                $scope.aplicar();
            }
        });

		$scope.criarSala = function(sala){
			socket.emit('criar_sala', JSON.stringify(sala));
			delete $scope.cadSala;
			$scope.aplicar();
		};

		socket.on('atualizar_salas', function(salas){
			salas = JSON.parse(salas);

			$scope.salas = salas;
		});

		$scope.aplicar = function(){
            setTimeout(function(){$scope.$apply();},50);
        };

        window.onbeforeunload = confirmExit;
        function confirmExit() {
            console.log('saindo');
            socket.emit('disconnected',JSON.stringify($scope.you));
        }
	});