var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var flock = require('flocking');

app.get('/', function(req, res) {
    //  res.sendFile(__dirname + '../public/index.html');
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', function(socket) {
    socket.broadcast.emit('hi');
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
        if (msg == "play") {
            var synth = flock.synth({
                synthDef: {
                    ugen: "flock.ugen.sinOsc",
                    freq: 440,
                    mul: {
                        ugen: "flock.ugen.asr",
                        start: 0.0,
                        attack: 0.25,
                        sustain: 0.25,
                        release: 1.0,
                        gate: {
                            ugen: "flock.ugen.impulse",
                            rate: "control",
                            freq: 0.75,
                            phase: 1.0
                        }
                    }
                }
            });
            flock.enviro.shared.play();
        } else if (msg == "stop") {
          io.emit('chat message', 'got it');
            flock.enviro.shared.stop();
        }
    });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, "0.0.0.0", function() {
    console.log('listening on *:3000');
});
