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
	if(exports.data.vez != '1'){
		return false;
	}
	var obj = game.calcularObjeto(x,y);
	//nessa parte, o jogo deve mandar via socket, e receber a informação se a jogada é válida
	if(obj){
		if(exports.data.grid[obj.y][obj.x] == '0'){
			exports.gravarJogada(obj.x,obj.y,'1');
			if(exports.calcularVitoria()){
				exports.data.tela = 'final';
			}else{
				exports.data.vez = '2';
				if(exports.data.bot){
					exports.jogadaBot();
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
	if(exports.data.vez != '2'){
		return false;
	}
	var i = 1;
	var j = 1;
	if(exports.data.l[0].indexOf('0') != -1 && (exports.data.l[0].indexOf('11') !== -1 || exports.data.l[0].indexOf('22') !== -1)){
		i = 0;
		j = exports.data.l[0].indexOf('0');
	}else if(exports.data.l[1].indexOf('0') != -1 && (exports.data.l[1].indexOf('11') !== -1 || exports.data.l[1].indexOf('22') !== -1)){
		i = 1;
		j = exports.data.l[1].indexOf('0');
	}else if(exports.data.l[2].indexOf('0') != -1 && (exports.data.l[2].indexOf('11') !== -1 || exports.data.l[2].indexOf('22') !== -1)){
		i = 2;
		j = exports.data.l[2].indexOf('0');
	}else if(exports.data.c[0].indexOf('0') != -1 && (exports.data.c[0].indexOf('11') !== -1 || exports.data.c[0].indexOf('22') !== -1)){
		i = exports.data.c[0].indexOf('0');
		j = 0;
	}else if(exports.data.c[1].indexOf('0') != -1 && (exports.data.c[1].indexOf('11') !== -1 || exports.data.c[1].indexOf('22') !== -1)){
		i = exports.data.c[1].indexOf('0');
		j = 1;
	}else if(exports.data.c[2].indexOf('0') != -1 && (exports.data.c[2].indexOf('11') !== -1 || exports.data.c[2].indexOf('22') !== -1)){
		i = exports.data.c[2].indexOf('0');
		j = 2;
	}else if(exports.data.d[0].indexOf('0') != -1 && (exports.data.d[0].indexOf('11') !== -1 || exports.data.d[0].indexOf('22') !== -1)){
		i = exports.data.d[0].indexOf('0');
		j = i;
	}else if(exports.data.d[1].indexOf('0') != -1 && (exports.data.d[1].indexOf('11') !== -1 || exports.data.d[1].indexOf('22') !== -1)){
		i = exports.data.d[0].indexOf('0');
		j = 2 - exports.data.d[0].indexOf('0');
	}else{
		if(exports.data.l[0] == '111' && exports.data.l[1] == '111' && exports.data.l[2] == '111'){
			return false;
		}
		var count = 0;
		while(exports.data.grid[i][j]!='0' && count < 1000){
			i = ~~(Math.random()*3);
			j = ~~(Math.random()*3);
			count++;
		}
	}

	console.log(i,j);
	if(exports.data.grid[i][j]){
		exports.gravarJogada(j,i,'2');
	}else{
		console.log("Não existe a posição ",i,j);
	}
	if(exports.calcularVitoria()){
		exports.data.tela = 'final';
	}
	exports.data.vez = '1';
};

exports.calcularVitoria = function(){
	if(exports.data.l.includes('111') || exports.data.c.includes('111') || exports.data.d.includes('111')){
		exports.data.vencedor = '1';
	}else if(exports.data.l.includes('222') || exports.data.c.includes('222') || exports.data.d.includes('222')){
		exports.data.vencedor = '2';
	}else if(
		exports.data.l[0].indexOf('0') == -1 &&
		exports.data.l[1].indexOf('0') == -1 &&
		exports.data.l[2].indexOf('0') == -1 &&
		exports.data.c[0].indexOf('0') == -1 &&
		exports.data.c[1].indexOf('0') == -1 &&
		exports.data.c[2].indexOf('0') == -1 &&
		exports.data.d[0].indexOf('0') == -1 &&
		exports.data.d[1].indexOf('0') == -1
	){
		exports.data.vencedor = 0
	}else{
		return false;
	}
	return true;
};

exports.checarAdversario = function(sala, player){
	for(i in sala.integrantes){
		if(sala.integrantes[i] != player.login){
			exports.data.adversario = sala.integrantes[i];
			console.log('tem adversário');
		}
	}
};

exports.iniciar = function(){
	exports.data.tela = 'game';
	exports.data.vez = ~~(Math.random()*2)?'1':'2';
};