angular.module('tablord')
	.directive('gameApp', function($ocLazyLoad){
		return {
			templateUrl: 'game/template.html',
			restrict: 'AE',
			link: function(){
				$ocLazyLoad.load(['game/js/game.js','game/js/controladores/reset.js','game/js/teste1/teste.js', 'game/js/controladores/domousedown.js', 'game/js/controladores/start.js']);
			}
		}
	});