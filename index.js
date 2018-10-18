var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


let names = ['Osman', 'Necmi', 'Haydar', 'Hebelek', 'Çükübik', 'Fikibok'];
let assignedNames = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  const id = socket.id;
  console.log(`${id} connected !`);
  const name = names.pop();
  assignedNames[id] = name;
  console.log(`${id} is know aka ${name}`);

socket.on('chat message', function(msg){
    const name = assignedNames[id]
    io.emit('chat message', {id, name, msg});
    console.log(`${name} typed: "${msg}"`);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
