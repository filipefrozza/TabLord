Reset = {
	texto: function(){
		CONTEXT.font = '12px Verdana';
	},
	cor: function(){
		CONTEXT.fillStyle = 'black';
		CONTEXT.strokeStyle = 'black';
	},
	all: function(){
		Reset.texto();
		Reset.cor();
	}
};