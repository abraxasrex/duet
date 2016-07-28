var socket = io();
var enviro = flock.init();
var synth;

$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
    if (msg == "play") {
        synth = flock.synth({
            synthDef: {
                id: 'carrier',
                ugen: "flock.ugen.sinOsc",
                inputs: {
                  freq: 440
                },
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

socket.on('midi', function(freq){
    $('#messages').append($('<li>').text(freq));
    synth.set("carrier.freq", freq);

});


enviro.start();
