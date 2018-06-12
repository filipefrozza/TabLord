function cliqueMouse(canvas,event){
	var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
  
    // return relative mouse position
    CANVAS_CLICK_X = event.clientX - left + window.pageXOffset;
    CANVAS_CLICK_Y = event.clientY - top + window.pageYOffset;

	// CANVAS_CLICK_X = event.pageX;
	// CANVAS_CLICK_Y = event.pageY;
	CLICOU = true;
	console.log("Clique{x:"+CANVAS_CLICK_X+",y:"+CANVAS_CLICK_Y+"}");
    $.each(MOUSE_EVENTS,function(i,e){
        e(CANVAS_CLICK_X,CANVAS_CLICK_Y);
    });
}

function soltouMouse(){
    CLICOU = false;
}

MOUSE_EVENTS = {};