exports.iniciar = function(socket, player){
  socket.on('logar',function(usuario){
    usuario = JSON.parse(usuario);
    db_connection.query("select login, nome from usuario where login='"+usuario.login+"' and senha='"+crypto.createHash('md5').update('frozza'+usuario.senha+'frozza').digest("hex")+"'", function(err, rows, fields){
      if(err){
        console.log('deu erro' + err);
        socket.emit('logou_erro','Não foi possível logar: '+err);
        throw err;
        return;
      }
      if(rows[0]){
        console.log(rows[0].nome+" acabou de logar");
        socket.emit('logou',rows[0].nome+" entrou!");
        var auth = crypto.createHash('md5').update(""+~~(Math.random()*100000)).digest("hex");
        db_connection.execute("UPDATE usuario SET auth=? WHERE login=?",[auth,usuario.login],function(err,res){
          if(err) throw err;
          player = rows[0];
          socket.emit('retorno_auth',JSON.stringify({auth: auth, nome: rows[0].nome}));
          console.log("gerou auth "+auth);
        });
      }else{
        socket.emit('logou_erro','Usuário/Senha incorreto');
      }
    });
  });

  socket.on('cadastrar', function(usuario){
    usuario = JSON.parse(usuario);
    db_connection.execute("INSERT INTO usuario(login,senha,auth,nome) VALUES(?,?,'',?);",[usuario.login,MD5(usuario.senha),usuario.nome],function(err,res){
      if(err) throw err;

      if(res.affectedRows)
        socket.emit('cadastro','true');
      else
        socket.emit('cadastrar','false');
    });
  });

  socket.on('disconnected',function(m){
    m = JSON.parse(m);
    if(!players[m.player])
      return false;
    io.emit('disconnection',JSON.stringify(m));
    delete players[m.player];
    console.log(m.player," se desconectou");
  });
};