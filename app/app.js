angular.module('tablord',['ngRoute', 'ngCookies', 'oc.lazyLoad']);

angular.module('tablord')
	.config(function($routeProvider, $locationProvider){
		$locationProvider.hashPrefix('');
		$routeProvider
			.when('/', {
				templateUrl: 'app/index.html'
			})
			.when('/tabela', {
				templateUrl: 'app/pagina/tabela/',
				controller: 'tabela',
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
						return $ocLazyLoad.load('app/pagina/tabela/controller.js');
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

socket = null; //io.connect('http://localhost:666');