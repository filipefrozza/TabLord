angular.module('tablord',['ngRoute', 'ngCookies', 'oc.lazyLoad']);

angular.module('tablord')
	.config(function($routeProvider, $locationProvider){
		$locationProvider.hashPrefix('');
		$routeProvider
			.when('/', {
				templateUrl: 'app/index.html'
			})
			.when('/salas/', {
				templateUrl: 'app/pagina/salas/',
				controller: 'salas',
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load('app/pagina/salas/controller.js');
					}]
				}
			})
			.when('/erro/:erro', {
				templateUrl: 'app/pagina/erro/',
				controller: 'erro',
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load('app/pagina/erro/controller.js');
					}]
				}
			})
			.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode({
			enabled: false,
			requireBase: false
		});
	})
	.controller('main', function($scope, $rootScope){

	});

socket = io.connect('http://localhost:666');

if(!window.location.hash.match(/\#\/erro.+/gi)){
	socket.on('connect_error', (error) => {
	  	window.location.href="#/erro/Erro ao conectar no servidor";
	});
	socket.on('connect_timeout', (timeout) => {
	  	window.location.href="#/erro/Desconectou do servidor";
	});
}

socket.on('reconnect', (attemptNumber) => {
  console.log("conseguiu reconectar na tentativa "+attemptNumber);
});