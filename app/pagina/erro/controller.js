angular.module('tablord')
	.controller('erro', function($scope, $routeParams){
		$scope.erro = $routeParams.erro;
	});