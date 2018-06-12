Teste = {
	tela: 'pause',
	vez: '0',
	jogadores: [],
	grid: [[0,0,0],[0,0,0],[0,0,0]],
	you: '1',
	start: false,
	desenharGrade: function(){
		CONTEXT.moveTo(300,50);
		CONTEXT.lineTo(300,350);
		CONTEXT.stroke();
		CONTEXT.moveTo(400,50);
		CONTEXT.lineTo(400,350);
		CONTEXT.stroke();
		CONTEXT.moveTo(200,150);
		CONTEXT.lineTo(500,150);
		CONTEXT.stroke();
		CONTEXT.moveTo(200,250);
		CONTEXT.lineTo(500,250);
		CONTEXT.stroke();
	},
	desenharObjetos: function(){
		CONTEXT.font = "50px Verdana";
		Teste.grid.forEach(function(e,i,a){
			e.forEach(function(e,j,a){
				if(e==1){
					CONTEXT.fillText("○",235+j*100,110+i*100);
				}else if(e==2){
					CONTEXT.fillText("x",235+j*100,110+i*100);
				}
			});
		});
	},
	desenharPause: function(){
		CONTEXT.font = "50px Verdana";
		CONTEXT.fillText("Aguarde um jogador",100,200);
	},
	desenharVez: function(){
		if(Teste.vez == '1'){
			CONTEXT.font = "18px Verdana";
			CONTEXT.fillText("Sua vez",313,20);
		}
	},
	calcularObjeto: function(x,y){
		var objX = ~~((x-200)/100);
		var objY = ~~((y-50)/100);
		if(objX>2 || objY>2 || x<200 || y<50){
			return false;
		}else{
			return {x: objX, y: objY};
		}
	},
	calcularJogada: function(x,y){
		if(Teste.vez != '1'){
			return false;
		}
		var obj = Teste.calcularObjeto(x,y);
		//nessa parte, o jogo deve mandar via socket, e receber a informação se a jogada é válida
		if(obj){
			if(Teste.grid[obj.y][obj.x] == '0'){
				Teste.grid[obj.y][obj.x] = '1';
				Teste.vez = '2';
				return true;
			}else{
				return false;
			}
		}
		return false;
	},
	iniciar: function(){
		MOUSE_EVENTS['jogo_da_velha'] = function(x,y){
			Teste.calcularJogada(x,y);
		}
	},
	desenhar: function(){
		if(Teste.tela == 'pause'){
			Teste.desenharPause();
		}else{
			Teste.desenharVez();
			Teste.desenharGrade();
			Teste.desenharObjetos();
		}
	}
};