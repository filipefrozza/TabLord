exports.data = {
	tela: 'pause',
	vez: '0',
	adversario: "",
	grid: [['0','0','0'],['0','0','0'],['0','0','0']],
	l: [],
	c: [],
	d: [],
	start: false,
	vencedor: null,
	bot: false
};

exports.calcularJogada = function(x,y){
	if(game.vez != '1'){
		return false;
	}
	var obj = game.calcularObjeto(x,y);
	//nessa parte, o jogo deve mandar via socket, e receber a informação se a jogada é válida
	if(obj){
		if(game.grid[obj.y][obj.x] == '0'){
			game.gravarJogada(obj.x,obj.y,'1');
			if(game.calcularVitoria()){
				game.tela = 'final';
			}else{
				game.vez = '2';
				if(game.bot){
					game.jogadaBot();
				}
			}
			return true;
		}else{
			return false;
		}
	}
	return false;
};

exports.jogadaBot = function(){
	if(game.vez != '2'){
		return false;
	}
	var i = 1;
	var j = 1;
	if(game.l[0].indexOf('0') != -1 && (game.l[0].indexOf('11') !== -1 || game.l[0].indexOf('22') !== -1)){
		i = 0;
		j = game.l[0].indexOf('0');
	}else if(game.l[1].indexOf('0') != -1 && (game.l[1].indexOf('11') !== -1 || game.l[1].indexOf('22') !== -1)){
		i = 1;
		j = game.l[1].indexOf('0');
	}else if(game.l[2].indexOf('0') != -1 && (game.l[2].indexOf('11') !== -1 || game.l[2].indexOf('22') !== -1)){
		i = 2;
		j = game.l[2].indexOf('0');
	}else if(game.c[0].indexOf('0') != -1 && (game.c[0].indexOf('11') !== -1 || game.c[0].indexOf('22') !== -1)){
		i = game.c[0].indexOf('0');
		j = 0;
	}else if(game.c[1].indexOf('0') != -1 && (game.c[1].indexOf('11') !== -1 || game.c[1].indexOf('22') !== -1)){
		i = game.c[1].indexOf('0');
		j = 1;
	}else if(game.c[2].indexOf('0') != -1 && (game.c[2].indexOf('11') !== -1 || game.c[2].indexOf('22') !== -1)){
		i = game.c[2].indexOf('0');
		j = 2;
	}else if(game.d[0].indexOf('0') != -1 && (game.d[0].indexOf('11') !== -1 || game.d[0].indexOf('22') !== -1)){
		i = game.d[0].indexOf('0');
		j = i;
	}else if(game.d[1].indexOf('0') != -1 && (game.d[1].indexOf('11') !== -1 || game.d[1].indexOf('22') !== -1)){
		i = game.d[0].indexOf('0');
		j = 2 - game.d[0].indexOf('0');
	}else{
		if(game.l[0] == '111' && game.l[1] == '111' && game.l[2] == '111'){
			return false;
		}
		var count = 0;
		while(game.grid[i][j]!='0' && count < 1000){
			i = ~~(Math.random()*3);
			j = ~~(Math.random()*3);
			count++;
		}
	}

	console.log(i,j);
	if(game.grid[i][j]){
		game.gravarJogada(j,i,'2');
	}else{
		console.log("Não existe a posição ",i,j);
	}
	if(game.calcularVitoria()){
		game.tela = 'final';
	}
	game.vez = '1';
};

exports.calcularVitoria = function(){
	if(game.l.includes('111') || game.c.includes('111') || game.d.includes('111')){
		game.vencedor = '1';
	}else if(game.l.includes('222') || game.c.includes('222') || game.d.includes('222')){
		game.vencedor = '2';
	}else if(
		game.l[0].indexOf('0') == -1 &&
		game.l[1].indexOf('0') == -1 &&
		game.l[2].indexOf('0') == -1 &&
		game.c[0].indexOf('0') == -1 &&
		game.c[1].indexOf('0') == -1 &&
		game.c[2].indexOf('0') == -1 &&
		game.d[0].indexOf('0') == -1 &&
		game.d[1].indexOf('0') == -1
	){
		game.vencedor = 0
	}else{
		return false;
	}
	return true;
};

exports.checarAdversario = function(sala, player){
	for(i in sala.integrantes){
		if(sala.integrantes[i] != player.login){
			game.adversario = sala.integrantes[i];
			console.log('tem adversário');
		}
	}
};