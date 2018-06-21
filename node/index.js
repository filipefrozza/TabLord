var app = require('express')();
var http = require('http').Server(app);
io = require('socket.io')(http);
crypto = require('crypto');
MD5 = function(a){
	return crypto.createHash('md5').update('frozza'+a+'frozza').digest("hex");
};
var db_config = exports.config = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tablord'
};
var mysql = require('mysql2');
db_connection = mysql.createConnection(db_config);

db_connection.connect();

app.get('/', function(req, res){
	res.send(JSON.stringify({}));
});

http.listen(666, function(){
	console.log('lerigou');
});

salas = require('./modulos/salas/');
contas = require('./modulos/contas/');
players = [];

io.on('connection', function(socket){
	game = require('./modulos/games/jogo_da_velha/');
	player = {};
	salas.iniciar(socket, player);
	contas.iniciar(socket, player);
});