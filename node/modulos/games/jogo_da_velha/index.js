exports.data = {
	tela: 'pause',
	vez: -1,
	participantes: [],
	grid: [['0','0','0'],['0','0','0'],['0','0','0']],
	l: [],
	c: [],
	d: [],
	start: false,
	vencedor: null,
	bot: false,
	sala: null
};

exports.calcularJogada = function(x,y,player){
	if(exports.participantes[exports.data.vez] != player.login){
		return false;
	}
	var obj = game.calcularObjeto(x,y);
	//nessa parte, o jogo deve mandar via socket, e receber a informação se a jogada é válida
	if(obj){
		if(exports.data.grid[obj.y][obj.x] == '0'){
			exports.gravarJogada(obj.x,obj.y,exports.data.vez);
			if(exports.calcularVitoria()){
				exports.data.tela = 'final';
			}else{
				exports.data.vez++;
				if(exports.data.vez == exports.data.participantes.length){
					exports.data.vez = 0;
				}
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
	if(exports.participantes[exports.data.vez] != 'bot'){
		return false;
	}
	var i = 1;
	var j = 1;
	if(exports.data.l[0].indexOf('0') != -1 && (exports.data.l[0].indexOf('00') !== -1 || exports.data.l[0].indexOf('11') !== -1)){
		i = 0;
		j = exports.data.l[0].indexOf('0');
	}else if(exports.data.l[1].indexOf('0') != -1 && (exports.data.l[1].indexOf('00') !== -1 || exports.data.l[1].indexOf('11') !== -1)){
		i = 1;
		j = exports.data.l[1].indexOf('0');
	}else if(exports.data.l[2].indexOf('0') != -1 && (exports.data.l[2].indexOf('00') !== -1 || exports.data.l[2].indexOf('11') !== -1)){
		i = 2;
		j = exports.data.l[2].indexOf('0');
	}else if(exports.data.c[0].indexOf('0') != -1 && (exports.data.c[0].indexOf('00') !== -1 || exports.data.c[0].indexOf('11') !== -1)){
		i = exports.data.c[0].indexOf('0');
		j = 0;
	}else if(exports.data.c[1].indexOf('0') != -1 && (exports.data.c[1].indexOf('00') !== -1 || exports.data.c[1].indexOf('11') !== -1)){
		i = exports.data.c[1].indexOf('0');
		j = 1;
	}else if(exports.data.c[2].indexOf('0') != -1 && (exports.data.c[2].indexOf('00') !== -1 || exports.data.c[2].indexOf('11') !== -1)){
		i = exports.data.c[2].indexOf('0');
		j = 2;
	}else if(exports.data.d[0].indexOf('0') != -1 && (exports.data.d[0].indexOf('00') !== -1 || exports.data.d[0].indexOf('11') !== -1)){
		i = exports.data.d[0].indexOf('0');
		j = i;
	}else if(exports.data.d[1].indexOf('0') != -1 && (exports.data.d[1].indexOf('00') !== -1 || exports.data.d[1].indexOf('11') !== -1)){
		i = exports.data.d[0].indexOf('0');
		j = 2 - exports.data.d[0].indexOf('0');
	}else{
		if(exports.data.l[0] == '000' && exports.data.l[1] == '000' && exports.data.l[2] == '000'){
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
		exports.gravarJogada(j,i,exports.data.vez);
	}else{
		console.log("Não existe a posição ",i,j);
	}
	if(exports.calcularVitoria()){
		exports.data.tela = 'final';
	}
	exports.data.vez++;
	if(exports.data.vez == exports.data.participantes.length){
		exports.data.vez = 0;
	}
};

exports.calcularVitoria = function(){
	if(exports.data.l.includes('000') || exports.data.c.includes('000') || exports.data.d.includes('000')){
		exports.data.vencedor = 0;
	}else if(exports.data.l.includes('111') || exports.data.c.includes('111') || exports.data.d.includes('111')){
		exports.data.vencedor = 1;
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
		exports.data.vencedor = -1
	}else{
		return false;
	}
	exports.atualizar();
	return true;
};

exports.checarAdversario = function(sala, player){
	for(i in sala.integrantes){
		if(sala.integrantes[i] != player.login){
			exports.data.participantes = sala.integrantes;
			console.log('tem adversário');
			console.log(exports.data.participantes);
			exports.data.sala = sala.index;
		}
	}
};

function gravarJogada(x,y,v){
		exports.data.grid[y][x] = v+'';
		exports.data.l = [];
		exports.data.c = [];
		exports.data.d = [];
		var grid = exports.data.grid;
		exports.data.l.push(grid[0][0]+grid[0][1]+grid[0][2]);
		exports.data.l.push(grid[1][0]+grid[1][1]+grid[1][2]);
		exports.data.l.push(grid[2][0]+grid[2][1]+grid[2][2]);
		exports.data.c.push(grid[0][0]+grid[1][0]+grid[2][0]);
		exports.data.c.push(grid[0][1]+grid[1][1]+grid[2][1]);
		exports.data.c.push(grid[0][2]+grid[1][2]+grid[2][2]);
		exports.data.d.push(grid[0][0]+grid[1][1]+grid[2][2]);
		exports.data.d.push(grid[0][2]+grid[1][1]+grid[2][0]);
		console.log(exports.data.participates[v]+" jogou em "+x+","+y);
		exports.atualizar();
};

exports.iniciar = function(){
	exports.data.tela = 'game';
	exports.data.vez = ~~(Math.random()*exports.data.participantes.length);
	console.log("jogo iniciado com a vez "+exports.data.vez);
	exports.atualizar();
};

exports.atualizar = function(){
	io.to(exports.data.sala).emit('atualizar_jogo',JSON.stringify(exports.data));
};