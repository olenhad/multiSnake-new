var events = require("./events");
function collisionEngine(gameObjects){
	//console.log("entering collisionEngine");
	for(var index in gameObjects){
		if(gameObjects[index].hasOwnProperty('entity')){
		try{

			if(gameObjects[index].entity.subClass==="Snake"){
		
			if(selfCollision(gameObjects[index])===true){
				console.log("selfCollision");
				events.selfCollisionEvent(gameObjects[index],gameObjects);

			}
			else if(selfCollision(gameObjects[index])===false){
				//console.log("no self collision");
			}

			
		}
		}
		catch(e){
			console.log(e);
		}
	
		for(var index2 in gameObjects){
			
			if(gameObjects[index2].hasOwnProperty('entity')){

			try{
			
			
				if(gameObjects[index].entity.subClass==="Snake" && gameObjects[index2].entity.subClass==="Snake"){
					
					if((index != index2) && (mutualCollision(gameObjects[index],gameObjects[index2])===true || mutualCollision(gameObjects[index2],gameObjects[index])===true )){
						events.mutualCollisionEvent(gameObjects[index],gameObjects[index2],gameObjects);
											console.log("Mutal collision");
					}

				}
				else if(gameObjects[index].entity.subClass==="Food" && gameObjects[index2].entity.subClass==="Snake"){
					
					if(foodCollision(gameObjects[index],gameObjects[index2])===true){
						console.log("food collision 1");
						events.foodCollisionEvent(gameObjects[index],gameObjects[index2],gameObjects);
					}
					
				}
				else if(gameObjects[index2].entity.subClass==="Food" && gameObjects[index].entity.subClass==="Snake"){
					//foodCollisionEvent(gameObjects[index2],gameObjects[index] );
					if(foodCollision(gameObjects[index2],gameObjects[index])===true){
						console.log("food collision 2");
						events.foodCollisionEvent(gameObjects[index2],gameObjects[index] );
					}
				}
			}
			catch(e){
				console.log(e);
			}
				//console.log(" abstractFullCollision");
			
			

		}
		}
	}

	}
	
	
	return gameObjects;
}

function foodCollision(food,snake){
		var collision = false;
	//console.log("entering foodCollision");

	var lIndex=snake.entity.posSet.length-1
	for(var i=0; i<food.entity.posSet.length;i++){
		if(snake.entity.posSet[lIndex].x+snake.entity.posSet[lIndex].w > food.entity.posSet[i].x && snake.entity.posSet[lIndex].x< food.entity.posSet[i].x +food.entity.posSet[i].w ){
			if(snake.entity.posSet[lIndex].y +snake.entity.posSet[lIndex].h > food.entity.posSet[i].y && snake.entity.posSet[lIndex].y < food.entity.posSet[i].y+food.entity.posSet[i].h ){
				return true;
			}
		}
	}

	return collision;
}
function mutualCollision(snake1,snake2){
	var collision = false;
	var lIndex=snake1.entity.posSet.length-1
	for(var i=0; i<snake2.entity.posSet.length;i++){
		if(snake1.entity.posSet[lIndex].x+snake1.entity.posSet[lIndex].w > snake2.entity.posSet[i].x && snake1.entity.posSet[lIndex].x< snake2.entity.posSet[i].x +snake2.entity.posSet[i].w ){
			if(snake1.entity.posSet[lIndex].y +snake1.entity.posSet[lIndex].h > snake2.entity.posSet[i].y && snake1.entity.posSet[lIndex].y < snake2.entity.posSet[i].y+snake2.entity.posSet[i].h ){
				return true;
			}
		}
	}

	return collision;
}
function abstractFullCollision(entity1,entity2){
	var collision = false;
	for(var i in entity1.posSet){
		for(var j in entity2.posSet){
			if(entity1.posSet[i].x+entity1.posSet[i].w > entity2.posSet[j].x && entity1.posSet[i].x < entity2.posSet[j].x+entity2.posSet[j].w){
				if(entity1.posSet[i].y+entity1.posSet[i].h > entity2.posSet[j].y && entity1.posSet[i].y < entity2.posSet[j].y+entity2.posSet[j].h){
					return true;
				}
			}
		}
	}
	return collision;
}
function selfCollision(snake){
	var collision = false;
//	console.log("entering selfCollision");

	var lIndex=snake.entity.posSet.length-1
	for(var i=0; i<snake.entity.posSet.length-1;i++){
		if(snake.entity.posSet[lIndex].x+snake.entity.posSet[lIndex].w > snake.entity.posSet[i].x && snake.entity.posSet[lIndex].x< snake.entity.posSet[i].x +snake.entity.posSet[i].w ){
			if(snake.entity.posSet[lIndex].y +snake.entity.posSet[lIndex].h > snake.entity.posSet[i].y && snake.entity.posSet[lIndex].y < snake.entity.posSet[i].y+snake.entity.posSet[i].h ){
				return true;
			}
		}
	}

	return collision;

}


exports.collisionEngine = collisionEngine;


