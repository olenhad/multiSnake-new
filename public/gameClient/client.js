	
var g={};
g.RENDER_RATE = 25;

socket.on('gameObjects',function(gameObjects){
	g.gameObjects = gameObjects;
  
	socket.emit('recieveState',{id:g.ID,state:g.state});
});

function startGame(){
		socket.emit('startGame',function(gameObjects,ID){
      g.ID = ID
			g.gameObjects = gameObjects;
			
      g.state = "up";
			var renderID = setInterval(function(){ render(g.gameObjects);},g.RENDER_RATE);
      addListeners();
		});
};
function addListeners(){
document.addEventListener('keydown',function(event){
    	
   switch(event.keyCode){

      case 65:
        //moveLeft();
        //console.log("left");
        if(g.state!="right")
        g.state="left";
        break;
      case 87:
      	//moveUp();
        if(g.state!="down")
        g.state="up";
        break;
      case 68:
       // moveRight();
       if(g.state!="left")
       g.state="right";
        break;
      case 83:
       // moveDown();
       if(g.state!="up"){
        g.state="down";
        
       }
        break;
      
    }
    
    socket.emit('recieveState',{id:g.ID,state:g.state});
 

   });
};
function render(gameObjects){
		var canvas = document.getElementById("canvas");
    	var ctx = canvas.getContext("2d");
    	ctx.clearRect(0,0,400,400);
    	for( var index in gameObjects){
    		if(gameObjects[index]!=null){


    		ctx.fillStyle = gameObjects[index].entity.colorString;
    		for(var i in gameObjects[index].entity.posSet){
    			var trect =gameObjects[index].entity.posSet[i];
    			ctx.fillRect(trect.x,trect.y,trect.w,trect.h);
    		}
    	}
    	}
	}; 