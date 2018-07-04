var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//その他関数とか変数とか
/* ---------------------------------------------------*/
var pl = 0;
	
/* ---------------------------------------------------*/

app.get('/', function(req, res){
  res.sendFile(__dirname + '/main.html');
  
});

io.on('connection', function(socket){
  console.log('\n----------------\na user connected\n----------------\n');
  pl++;
  io.emit("sankatyuu", pl);
  
  
  socket.on('disconnect', function(){
    console.log('\n*****************\nuser disconnected\n*****************\n');
	pl--;
	io.emit("sankatyuu", pl);
	
  });
  
  socket.on('update', function () {
	io.emit('update');
	
  });
  
  socket.on('imAdmin', function () {
	Ad++;
	
  });
  
  socket.on('okAdmin', function () {
	io.emit('closeAdmin');
	
  });
  
  socket.on('chat message', function(msg) {
  	console.log("message received");
	io.emit("receive_messe", msg);
	console.log("sended");
	
  });
  
  socket.on('sendurl', function(url) {
    console.log("Received an url: " + url);
	io.emit("receiveurl", url);
	
  });
  
  socket.on('sync_playerStart', function() {
	  io.emit("sync_adminStart");
	  
  });
  
  socket.on('sync_admin', function(dat) {
	  io.emit("sync_player", dat);
	  
  });
  
  socket.on('skip', function () {
	  io.emit('skip');
  
  });
  
});

//サーバーをホストする部分
http.listen(3000, function(){
  console.log('listening on *:3000\n');
  
});