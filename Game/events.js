var models = require("./models");
var constants = require("./constants");

function foodCollisionEvent(food,snake,gameObjects){
	lengthenSnake(snake);
	snake.score++;
  if(numFood(gameObjects) <= numSnakes(gameObjects)){
    food.entity.posSet[0].x=Math.floor(Math.random()*390);
  food.entity.posSet[0].y=Math.floor(Math.random()*390);
} else{

  delete gameObjects[food.entity.ID];
  delete food;
  console.log('food deleted')
}
	
	//delete gameObjects[food.entity.ID];
	console.log(snake+"ate"+food);

}
function selfCollisionEvent(snake,gameObjects){
	delete gameObjects[snake.entity.ID];
  

	console.log("self collision, deleted "+snake);


}
function mutualCollisionEvent(snake1,snake2,gameObjects){
	delete gameObjects[snake1.entity.ID];
	delete gameObjects[snake2.entity.ID];

	console.log("mutualCollisionEvent, deleted "+snake1+snake2);
}
function lengthenSnake(snake){
	try{
	var t_LastIndex = snake.entity.posSet.length-1;
	var t_Rect = new models.Rect(snake.entity.posSet[t_LastIndex].x,snake.entity.posSet[t_LastIndex].y,snake.entity.posSet[t_LastIndex].w,snake.entity.posSet[t_LastIndex].h);
	switch(snake.state){
		case "up":
		t_Rect.y-=constants.LENGTH_DELTA;
		break;
		case "down":
		t_Rect.y+=constants.LENGTH_DELTA;
		break;
		case "right":
		t_Rect.x+=constants.LENGTH_DELTA;
		break;
		case "left":
		t_Rect.x-=constants.LENGTH_DELTA;
		break;
	}
	snake.entity.posSet.push(t_Rect);

	}
	catch(e){
		console.log(e);
	}
	return snake;

}
function updateSnake(snake){
        var copyPath = new Array(snake.entity.posSet.length);
        for(var i=0;i<snake.entity.posSet.length;i++){

          copyPath[i] = new models.Rect(snake.entity.posSet[i].x,snake.entity.posSet[i].y,snake.entity.posSet[i].w,snake.entity.posSet[i].h);
        }
        for(var i=0;i<snake.entity.posSet.length-1;i++){
        snake.entity.posSet[i].y = copyPath[i+1].y;
        snake.entity.posSet[i].x = copyPath[i+1].x;
      }
      //console.log("entering switch with "+snake.state);
      switch(snake.state){
      	case "up":
      	snake.entity.posSet[snake.entity.posSet.length-1].y -=constants.SNAKE_DELTA;
      	//console.log("going up");
      	break;
      	case "down":
      	snake.entity.posSet[snake.entity.posSet.length-1].y +=constants.SNAKE_DELTA;
      	break;
      	case "right":
      	snake.entity.posSet[snake.entity.posSet.length-1].x +=constants.SNAKE_DELTA;
      	break;
      	case "left":
      	snake.entity.posSet[snake.entity.posSet.length-1].x -=constants.SNAKE_DELTA;
      	break;
      }
      snake = boundaryCheck(snake);
      return snake;
    };
    
        function boundaryCheck(snake){
      if(snake.entity.posSet[snake.entity.posSet.length-1].y < 0 ){
        snake.entity.posSet[snake.entity.posSet.length-1].y = constants.BOARD_SIZE; 
      }
       else if(snake.entity.posSet[snake.entity.posSet.length-1].x < 0 ){
        snake.entity.posSet[snake.entity.posSet.length-1].x = constants.BOARD_SIZE; 
      }
      else{
        snake.entity.posSet[snake.entity.posSet.length-1].x=  snake.entity.posSet[snake.entity.posSet.length-1].x%constants.BOARD_SIZE;
       snake.entity.posSet[snake.entity.posSet.length-1].y=  snake.entity.posSet[snake.entity.posSet.length-1].y%constants.BOARD_SIZE;
      }
      return snake;      

    };
function numSnakes(gameObjects){
  count = 0;
  for(var i in gameObjects){
    if(gameObjects[i].hasOwnProperty('entity')){
      if(gameObjects[i].entity.subClass === "Snake"){
        count++;
      }
    }
  }
  return count;
}
function numFood(gameObjects){
  count = 0;
  for(var i in gameObjects){
    if(gameObjects[i].hasOwnProperty('entity')){
      if(gameObjects[i].entity.subClass === "Food"){
        count++;
      }
    }
  }
  return count;
}      
exports.updateSnake = updateSnake;
exports.foodCollisionEvent = foodCollisionEvent;
exports.selfCollisionEvent = selfCollisionEvent;
exports.mutualCollisionEvent = mutualCollisionEvent;
exports.lengthenSnake = lengthenSnake;