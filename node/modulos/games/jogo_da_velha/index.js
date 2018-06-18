exports.data = {
	tela: 'pause',
	vez: '0',
	adversario: "Teste",
	grid: [['0','0','0'],['0','0','0'],['0','0','0']],
	l: [],
	c: [],
	d: [],
	start: false,
	vencedor: null,
	tipo: null
};

exports.calcularJogada = function(x,y){
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
};

exports.jogadaBot = function(){
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
};

exports.calcularVitoria = function(){
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
};
