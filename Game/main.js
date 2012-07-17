var collisions = require("./collisions");
var events = require("./events");
var constants = require("./constants");
var models = require("./models");
function updateGameStates(gameObjects){
	//console.log("entering updateGameStates")
	for(var index in gameObjects){
		if (gameObjects[index].hasOwnProperty('entity')){
		try{
			if(gameObjects[index].entity.subClass=="Snake"){
				gameObjects[index] = events.updateSnake(gameObjects[index]);
			}

		}
		catch(e){
			console.log(e+'updateGameStates');
		}
	}
	}
	return (collisions.collisionEngine(gameObjects));
}

function newSnake(gameObjects,nick){
	
	//console.log(nick);
	var snake = new models.Snake(gameObjects.idGenerator(),1,constants.INIT_CORD_X*gameObjects.length(),constants.INIT_CORD_Y*gameObjects.length());
	snake.nick = nick;
	gameObjects[snake.entity.ID]= snake;
	gameObjects = generateFood(gameObjects);
	console.log(JSON.stringify(gameObjects));
	var res = {}
	res["gameObjects"] = gameObjects;
	res["ID"] = snake.entity.ID
	return res;
}
function generateFood(gameObjects){
	var t_x=Math.floor(Math.random()*390);
  	var t_y=Math.floor(Math.random()*390);
  	var t_Food = new models.FoodSingle(gameObjects.idGenerator(),t_x,t_y,10);
  	gameObjects[t_Food.entity.ID] = t_Food;
  	return gameObjects;
}
function exitSnake(gameObjects,id){
	delete gameObjects[id];
	console.log(id+"deleted");
	return gameObjects;
}
exports.updateGameStates = updateGameStates;
exports.newSnake = newSnake;
exports.generateFood = generateFood;
exports.exitSnake = exitSnake;