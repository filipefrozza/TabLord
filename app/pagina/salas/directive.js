angular.module('tablord')
	.directive('salas',function(){
		return {
			restrict: 'AE',
			scope: true,
			controller: 'salas',
			templateUrl: 'app/modulos/salas/template.html'
		}
	});