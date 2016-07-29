var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var flock = require('flocking');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', function(socket) {
    //socket.broadcast.emit('hi');
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
      });

      socket.on('midi', function(freq){
        io.emit('midi', freq);
      });
      
      socket.on('inst', function(inst) {
            //  $('#messages').append($('<li>').text(msg));
          io.emit('inst', inst);
        });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, "0.0.0.0", function() {
    console.log('listening on *:3000');
});
