var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var flock = require('flocking');

//db
var User = require('./user.js');

mongoose.connect('mongodb://localhost/users', function(err){
  if(!err) {
    console.log('mongoose is connected');
  } else {
    console.log(err);
  }
});

// routing

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// app.get(path.join(__dirname, '../public', 'duet.html'), function(req, res) {
//     res.sendFile(path.join(__dirname, '../public', 'duet.html'));
// });

// var router = require('./routes/routes.js');
// app.use('*', router);

app.use(express.static(path.join(__dirname, '../public')));

var users = [];

io.on('connection', function(socket) {

    socket.on('newUser', function(id){
        // User.create({ id: id });
        users.push(id);
        io.emit('newUser', id);
        io.emit('activeUsers', users);
        console.log('id: ', id);
    });
    
    socket.on('activeUsers', function(users){
      io.emit('activeUsers', users);
    });

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
      });

      socket.on('noteOn', function(data){
        io.emit('noteOn', data);
      });

      socket.on('inst', function(inst) {
          io.emit('inst', inst);
        });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

// chatroom ids //

var jwt = require('jsonwebtoken');
var verified_id = '1234';

app.post('/api', function (req, res) {
  console.log(req.body.chatId);
  if(req.body.chatId === verified_id){
  //  res.sendFile(path.join(__dirname, '../public', 'duet.html'));
    res.json({token: '5678', verified:true});
   }
});


http.listen(3000, "0.0.0.0", function() {
    console.log('listening on *:3000');
});
