CANVAS_CLICK_X = -1;
CANVAS_CLICK_Y = -1;
ESQUERDA = 1;
DIREITA = 2;
CIMA = 3;
BAIXO = 0;
DIRECAO = 'cima';
MOV_X = 0;
MOV_Y = 0;
BLOQUEADO = false;
CLICOU = false;
CANVAS = null;
CONTEXT = null;
PERSONAGEM = null;
INTERVALO = 80;
ULTIMO_TEMPO = null;
ULTIMO_TEMPO2 = null;
INICIO_DE_JOGO = 0;
TEMPO_DE_JOGO = 0;
AGORA = null;
// TELA = 'menuprincipal';

MUDO = true;
VOLUME = 1;

$('#game').ready(function(){
	CANVAS = document.getElementById('game');
	CONTEXT = CANVAS.getContext('2d');
	CANVAS.addEventListener("mousedown",function(evt){cliqueMouse(CANVAS,evt);}, false);
	CANVAS.addEventListener("mouseup",function(evt){soltouMouse();}, false);
	gameLoop();
});