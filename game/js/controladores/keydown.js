function setarKeyDown(){
		$(document).keydown(function(evt){
					    // console.log("keydown");
					if(!EVENTO_TECLA && !EVENTO_TOQUE && !EM_CENA){
					    switch(evt.which){
					  	case 37:
						  		if(TELA=='ingamemenu'){

						  		}else if(TELA=='gameloop'){
						  			DIRECAO = 'esquerda';
					  				SPRITE_PERSONAGEM.parado = 0;
					  			}
					  		break;
					  	case 38:
					  			if(TELA=='ingamemenu'){
						  			MUDAR_SUBMENU = -1;	
									MENU.subitem=-1;
									MENU.submissao=-1;
						  		}else if(TELA=='gameloop'){
					  				DIRECAO = 'cima';
					  				SPRITE_PERSONAGEM.parado = 0;
					  			}
					  		break;
					  	case 39:
					  			if(TELA=='ingamemenu'){
						  			
						  		}else if(TELA=='gameloop'){
					  				DIRECAO = 'direita';
					  				SPRITE_PERSONAGEM.parado = 0;
					  			}
					  		break;
					  	case 40:
					  			if(TELA=='ingamemenu'){
						  			MUDAR_SUBMENU = 1;	
									MENU.subitem=-1;
									MENU.submissao=-1;
						  		}else if(TELA=='gameloop'){
					  				DIRECAO='baixo';
					  				SPRITE_PERSONAGEM.parado = 0;
					  			}
					  		break;
						case 32:
							if(TELA=="gameloop"){
								EVENTO_TECLA=true;
								console.log("apertou espaço");
							}
							break;
						case 27:
								TECLA_ESCAPE=true;
							break;
					  	}
					  	SPRITE_PERSONAGEM.linha = eval(DIRECAO.toUpperCase());
					}else{
					  	if(evt.which == 32){
					  		PULAR_MENSAGEM=true;
					 	}else if(TELA=='animacaointro' && evt.which==27){
					 		TECLA_ESCAPE=true;
					 	}
					}
					  // console.log(DIRECAO);
					});
	     $(document).keyup(function(evt){
	     	if(!EVENTO_TECLA && !EVENTO_TOQUE){
		     	if((evt.which == 37 && DIRECAO=='esquerda')||(evt.which == 38 && DIRECAO=='cima')||(evt.which==39 && DIRECAO=='direita')||(evt.which == 40 && DIRECAO=='baixo')){
		     			SPRITE_PERSONAGEM.parado = 1;
						SPRITE_PERSONAGEM.coluna = 0;
		     	}
		    }
		     	// console.log(DIRECAO+" "+SPRITE_PERSONAGEM.parado);
	     });
	 }