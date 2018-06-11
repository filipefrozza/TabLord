angular.module('tablord')
	.directive('gameApp', function(){
		return {
			templateUrl: 'game/template.html',
			restrict: 'AE'
		}
	});