var socket = io();
var enviro = flock.init();
var synth;

$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});

socket.on('sendSynth', function(msg){
  synth = flock.synth({ synthDef:msg });
});


enviro.start();
