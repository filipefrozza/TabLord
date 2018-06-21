function gameLoop() {
	//fundo
	AGORA = new Date().getTime();
	AGORA2 = new Date().getTime();



      // Se ainda não tem último tempo medido
      if (ULTIMO_TEMPO==null) ULTIMO_TEMPO = AGORA;

      // Verificação da mudança de coluna
      if (AGORA - ULTIMO_TEMPO >= INTERVALO) {
		CONTEXT.clearRect(0, 0, CONTEXT.canvas.width,CONTEXT.canvas.height);
		
		if(!Teste.start){
			Teste.iniciar();
		}
		Teste.desenhar();
		// Teste.grid = [[0,1,2],[1,2,1],[0,0,1]];
		Reset.all();
		ULTIMO_TEMPO = AGORA;
	 }

	 // Se ainda não tem último tempo medido
      if (ULTIMO_TEMPO2==null) ULTIMO_TEMPO2 = AGORA2;

      // Verificação da mudança de coluna
	 if(AGORA2 - ULTIMO_TEMPO2 >= 5000){

	 	ULTIMO_TEMPO2 = AGORA2;
	 }


	TEMPO_DE_JOGO = AGORA-INICIO_DE_JOGO; 
	// console.log("game loop");
	// if(TELA=='gameloop'){
		// console.log("game loop");
		requestAnimationFrame(gameLoop);
	// }
}