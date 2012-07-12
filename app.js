var express = require('express');
var app = express.createServer();
var io = require("socket.io").listen(app);
var models = require("./Game/models");
var constants = require("./Game/constants");
//var collisions = require("./Game/collisions");
var events = require("./Game/events");
var main = require("./Game/main")


app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.get('/',function(req,res){
	res.redirect('/snake.html');
});
var nicknames = {};
var gameObjects = new models.GameObjectsModel();
io.set('log level', 1);
io.sockets.on('connection',function(socket){
	socket.on('startGame',function(callback){
		if(gameObjects.length() <= 1){
		var updateStateID = setInterval(function(){gameObjects = main.updateGameStates(gameObjects)},constants.GAME_SPEED);
	}

		var t_res = main.newSnake(gameObjects);
		gameObjects = t_res["gameObjects"];
		socket.broadcast.emit('gameObjects',gameObjects);
		callback(gameObjects,t_res["ID"]);
	});
	socket.on('recieveState',function(data){
		try{
			//console.log(JSON.stringify(data));
			gameObjects[data["id"]].state = data.state;
			//console.log(JSON.stringify(gameObjects));
		}catch(e){
			console.log(e);
		}
		socket.emit('gameObjects',gameObjects);
	});
	socket.on('client message',function(msg){
    socket.broadcast.emit('client message',socket.nickname,msg);
   });
   socket.on('nickname',function(nick, nameCheck){
    if(nicknames[nick]){
      nameCheck(false);
    } else{
      nameCheck(true);
      nicknames[nick] = socket.nickname = nick;
      socket.broadcast.emit("announcement",nick+' joined the room');
      io.sockets.emit('nicknames',nicknames);
    }
   });
   
   socket.on('disconnect',function(){
    if(!socket.nickname) return;
    delete nicknames[socket.nickname];
    gameObjects= main.exitSnake(gameObjects,socket.nickname);
    socket.broadcast.emit('announcement', socket.nickname+ 'disconnected');
    socket.broadcast.emit('nicknames',nicknames);
   });

});
app.listen(process.env.PORT || 3000);