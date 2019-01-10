Teste = {
	tela: 'pause',
	vez: '0',
	adversario: "Teste",
	grid: [['0','0','0'],['0','0','0'],['0','0','0']],
	l: [],
	c: [],
	d: [],
	start: false,
	vencedor: null,
	bot: false,
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
	desenharFinal: function(){
		CONTEXT.fillStyle = 'rgba(255,255,255,0.5)';
		CONTEXT.fillRect(0,0,700,400);
		CONTEXT.fillStyle = 'black';
		CONTEXT.font = "50px Verdana";
		if(Teste.vencedor == '1'){
			CONTEXT.fillText("Você Venceu!",200,200);	
		}else if(Teste.vencedor == '2'){
			CONTEXT.fillText("Você Perdeu!",200,200);
		}else{
			CONTEXT.fillText("Empatou!",230,200);
		}
		CONTEXT.font = "30px Verdana";
		CONTEXT.fillText("Clique para jogar novamente", 150, 300);
		MOUSE_EVENTS['jogar_novamente'] = function(){
			Teste.tela = 'game';
			Teste.vez = '1';
			Teste.grid = [['0','0','0'],['0','0','0'],['0','0','0']];
			delete MOUSE_EVENTS['jogar_novamente'];
		};
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
	gravarJogada: function(x,y,v){
		Teste.grid[y][x] = v;
		Teste.l = [];
		Teste.c = [];
		Teste.d = [];
		var grid = Teste.grid;
		Teste.l.push(grid[0][0]+grid[0][1]+grid[0][2]);
		Teste.l.push(grid[1][0]+grid[1][1]+grid[1][2]);
		Teste.l.push(grid[2][0]+grid[2][1]+grid[2][2]);
		Teste.c.push(grid[0][0]+grid[1][0]+grid[2][0]);
		Teste.c.push(grid[0][1]+grid[1][1]+grid[2][1]);
		Teste.c.push(grid[0][2]+grid[1][2]+grid[2][2]);
		Teste.d.push(grid[0][0]+grid[1][1]+grid[2][2]);
		Teste.d.push(grid[0][2]+grid[1][1]+grid[2][0]);
	},
	calcularJogada: function(x,y){
		if(Teste.vez != '1'){
			return false;
		}
		var obj = Teste.calcularObjeto(x,y);
		//nessa parte, o jogo deve mandar via socket, e receber a informação se a jogada é válida
		if(obj){
			if(Teste.grid[obj.y][obj.x] == '0'){
				Teste.gravarJogada(obj.x,obj.y,'1');
				if(Teste.calcularVitoria()){
					Teste.tela = 'final';
				}else{
					Teste.vez = '2';
					// Teste.jogadaBot();
				}
				return true;
			}else{
				return false;
			}
		}
		return false;
	},
	jogadaBot: function(){
		if(Teste.vez != '2'){
			return false;
		}
		var i = 1;
		var j = 1;
		if(Teste.l[0].indexOf('0') != -1 && (Teste.l[0].indexOf('11') !== -1 || Teste.l[0].indexOf('22') !== -1)){
			i = 0;
			j = Teste.l[0].indexOf('0');
		}else if(Teste.l[1].indexOf('0') != -1 && (Teste.l[1].indexOf('11') !== -1 || Teste.l[1].indexOf('22') !== -1)){
			i = 1;
			j = Teste.l[1].indexOf('0');
		}else if(Teste.l[2].indexOf('0') != -1 && (Teste.l[2].indexOf('11') !== -1 || Teste.l[2].indexOf('22') !== -1)){
			i = 2;
			j = Teste.l[2].indexOf('0');
		}else if(Teste.c[0].indexOf('0') != -1 && (Teste.c[0].indexOf('11') !== -1 || Teste.c[0].indexOf('22') !== -1)){
			i = Teste.c[0].indexOf('0');
			j = 0;
		}else if(Teste.c[1].indexOf('0') != -1 && (Teste.c[1].indexOf('11') !== -1 || Teste.c[1].indexOf('22') !== -1)){
			i = Teste.c[1].indexOf('0');
			j = 1;
		}else if(Teste.c[2].indexOf('0') != -1 && (Teste.c[2].indexOf('11') !== -1 || Teste.c[2].indexOf('22') !== -1)){
			i = Teste.c[2].indexOf('0');
			j = 2;
		}else if(Teste.d[0].indexOf('0') != -1 && (Teste.d[0].indexOf('11') !== -1 || Teste.d[0].indexOf('22') !== -1)){
			i = Teste.d[0].indexOf('0');
			j = i;
		}else if(Teste.d[1].indexOf('0') != -1 && (Teste.d[1].indexOf('11') !== -1 || Teste.d[1].indexOf('22') !== -1)){
			i = Teste.d[0].indexOf('0');
			j = 2 - Teste.d[0].indexOf('0');
		}else{
			if(Teste.l[0] == '111' && Teste.l[1] == '111' && Teste.l[2] == '111'){
				return false;
			}
			var count = 0;
			while(Teste.grid[i][j]!='0' && count < 1000){
				i = ~~(Math.random()*3);
				j = ~~(Math.random()*3);
				count++;
			}
		}

		console.log(i,j);
		if(Teste.grid[i][j]){
			Teste.gravarJogada(j,i,'2');
		}else{
			console.log("Não existe a posição ",i,j);
		}
		if(Teste.calcularVitoria()){
			Teste.tela = 'final';
		}
		Teste.vez = '1';
	},
	calcularVitoria: function(){
		if(Teste.l.includes('111') || Teste.c.includes('111') || Teste.d.includes('111')){
			Teste.vencedor = '1';
		}else if(Teste.l.includes('222') || Teste.c.includes('222') || Teste.d.includes('222')){
			Teste.vencedor = '2';
		}else if(
			Teste.l[0].indexOf('0') == -1 &&
			Teste.l[1].indexOf('0') == -1 &&
			Teste.l[2].indexOf('0') == -1 &&
			Teste.c[0].indexOf('0') == -1 &&
			Teste.c[1].indexOf('0') == -1 &&
			Teste.c[2].indexOf('0') == -1 &&
			Teste.d[0].indexOf('0') == -1 &&
			Teste.d[1].indexOf('0') == -1
		){
			Teste.vencedor = 0
		}else{
			return false;
		}
		return true;
	},
	iniciar: function(bot){
		MOUSE_EVENTS['jogo_da_velha'] = function(x,y){
			Teste.calcularJogada(x,y);
		}
		if(bot){
			Teste.vez = '1';
			Teste.tela = 'game';
		}
		Teste.start = true;
	},
	desenhar: function(){
		if(Teste.tela == 'pause'){
			Teste.desenharPause();
		}else if(Teste.tela == 'game'){
			Teste.desenharVez();
			Teste.desenharGrade();
			Teste.desenharObjetos();
		}else if(Teste.tela == 'final'){
			Teste.desenharGrade();
			Teste.desenharObjetos();
			Teste.desenharFinal();
		}
	}
};

socket.on('atualizar_jogo', function(m){
	m = JSON.parse(m);
	Teste.tela = m.tela,
	Teste.vez = m.vez,
	Teste.adversario = m.adversario,
	Teste.grid = m.grid,
	Teste.l = m.l,
	Teste.c = m.c,
	Teste.d = m.d,
	Teste.start = m.start,
	Teste.vencedor = m.vencedor,
	Teste.bot = m.bot;
	console.log(m);
});
