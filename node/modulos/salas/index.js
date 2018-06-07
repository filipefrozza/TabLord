exports.data = {
  // 'iniciantes': {
  //   nome: 'Iniciantes',
  //   integrantes: {},
  //   index: 'iniciantes',
  //   lider: {},
  //   quantidade: 0
  // }
};

exports.criarSala = function(sala, player){
	var index = sala.nome.toLowerCase().replace(' ','-');
	if(this.data[index])
		return false;
	this.data[index] = {
		nome: sala.nome,
		integrantes: {},
		index: index,
		lider: player.nome,
		quantidade: 0,
		regras: sala.regras,
		limite: sala.limite
	};
	// this.data[index].integrantes[player.index] = player;
	return true;
};

exports.iniciar = function(socket, player){
	socket.on('conectar',function(m){
		m = JSON.parse(m);
	    if(!players[m.login]){
			players[m.login] = {nome: m.nome, sala: null, index: m.login};
	    	// io.emit('conectado',m);
	    	console.log(m.nome, " se conectou");
	    }
	    socket.emit('conectado','true');
	});

	socket.on('sala_conectar',function(m){
		m = JSON.parse(m);
	    console.log(m.login, "tentando se conectar a sala "+m.sala);
	    if(salas.data[m.sala]){
		    if(salas.data[m.sala].quantidade >= 4){
		    	socket.emit('sala_conectado', JSON.stringify({erro: "Sala lotada"}));
		    	console.log(m.login, ", a sala estava lotada");
		    }else if(salas.data[m.sala].integrantes[m.login]){
		    	socket.emit('sala_conectado', JSON.stringify({erro: "Já está nessa sala"}));
		    	console.log(m.login, "já estava conectado a sala");
		    }else{
		      	salas.data[m.sala].integrantes[m.login] = m;
		      	salas.data[m.sala].quantidade++;
		      	// salas['iniciantes'].mensagens.push();
		      	socket.join(m.sala);
		      	io.to(m.sala).emit('sala_conectou', JSON.stringify(salas.data[m.sala].integrantes));
		      	io.emit('sala_alterada','');
		      	// rsala = Object.assign({}, salas.data[m.sala]);
		      	// delete rsala.mensagens;
		      	socket.emit('sala_conectado', JSON.stringify(salas.data[m.sala]));
		      	io.emit('atualizar_salas', JSON.stringify(salas.data));
		      	io.to(m.sala).emit('sala_mensagem_atualizar', JSON.stringify({player: 'Sistema', mensagem: m.login+" entrou na sala"}));
		    }
		}else{
			socket.emit('sala_conectado', JSON.stringify({erro: "A sala não existe mais"}));
		}
	});

	socket.on('buscar_salas', function(m){
		socket.emit('atualizar_salas', JSON.stringify(salas.data));
	});

	socket.on('sala_mensagem', function(m){
	    m = JSON.parse(m);
	    if(!salas.data[m.sala].integrantes[m.mensagem.player]){
	      	socket.emit('sala_mensagem', 'false');
	    }else{
	      	io.to(m.sala).emit('sala_mensagem_atualizar', JSON.stringify(m.mensagem));
	    }
	});

	socket.on('sala_sair', function(m){
		console.log(m);
		m = JSON.parse(m);
		if(!salas.data[m.sala].integrantes[m.player]){
			socket.emit('sala_sair', 'false');
		}else{
			socket.leave(m.sala);
			delete salas.data[m.sala].integrantes[m.player];
			salas.data[m.sala].quantidade--;
			io.to(m.sala).emit('sala_conectou', JSON.stringify(salas.data[m.sala].integrantes));
			if(salas.data[m.sala].quantidade==0) delete salas.data[m.sala];
			socket.emit('sala_saiu', 'true');
			io.emit('atualizar_salas', JSON.stringify(salas.data));
			io.to(m.sala).emit('sala_mensagem_atualizar', JSON.stringify({player: 'Sistema', mensagem: m.player+" saiu da sala"}));
		}
	});

	socket.on('disconnection', function(m){
		if(m.sala){
	    	delete salas.data[m.sala].integrantes[m.player];
	    	salas.data[m.sala].quantidade--;
	    	if(salas.data[m.sala].quantidade==0) delete salas.data[m.sala];
	    	io.emit('atualizar_salas', JSON.stringify(salas.data));
	    	delete players[m.index];
	    }
	});

	socket.on('criar_sala', function(m){
		m = JSON.parse(m);
		var index = m.nome.toLowerCase().replace(' ','-');
		if(salas.criarSala(m, player)){
			io.emit('sala_criada', JSON.stringify(salas.data));
			socket.emit('forcar_entrada', JSON.stringify(salas.data[index]));
		}else{
			socket.emit('sala_criada', JSON.stringify({erro: 'Já existe'}));
		}
	});
};