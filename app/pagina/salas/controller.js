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

        socket.on('forcar_entrada', function(m){
            m = JSON.parse(m);
            if(m.erro){
                alert(m.erro);
            }else{
                $scope.selecionarSala(m,$scope.you);
                $scope.aplicar();
            }
        });

        $scope.selecionarSala = function(s, you){
            console.log(s);
            socket.emit('sala_conectar', JSON.stringify({sala: s.index, login: you.login}));
        };

        socket.on('sala_conectado', function(m){
            m = JSON.parse(m);
            console.log(m);
            if(m.erro){
                alert(m.erro);
            }else{
                $scope.selSala = m;
                $scope.selSala.mensagens = [];
                $scope.aplicar();
            }
        });

        socket.on('sala_mensagem_atualizar', function(m){
            console.log(m);
            if(m != 'false'){
                $scope.selSala.mensagens.push(JSON.parse(m));
                $scope.aplicar();
            }else{
                alert('deu merda');
            }
        });

        $scope.enviarMensagem = function(m, you, sala){
            // console.log($scope.mensagem);
            delete $scope.mensagem;
            socket.emit('sala_mensagem', JSON.stringify({sala: sala.index, mensagem:{player: you.login, mensagem: m}}));
            socket.on('sala_mensagem', function(m){
                if(m=='false'){
                    alert('não foi possível enviar mensagem');
                }
            });
            $scope.aplicar();
        };

        $scope.sairSala = function(s, you){
            socket.emit('sala_sair', JSON.stringify({sala:s.index, player:you.login}));
        };

        socket.on('sala_saiu' , function(m){
            delete $scope.you.sala;
            delete $scope.selSala;
            socket.emit('buscar_salas');
            $scope.aplicar();
        });

		socket.on('atualizar_salas', function(salas){
			salas = JSON.parse(salas);

			$scope.salas = salas;
            $scope.aplicar();
		});

        socket.on('checar_adversario', function(m){
            socket.emit('checar_adversario',m);
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