var socket = io();
var enviro = flock.init();
var synth;

$('form').submit(function() {

    if ($('#m').val().indexOf("inst") != -1) {
        var valArr = $('#m').val().split(' ');
        var inst = valArr[valArr.length - 1];
        socket.emit('inst', inst);
    }

    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});

socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));

});

socket.on('inst', function(msg) {

    if (instrumentDefs[msg] != undefined) {
        console.log("inst found");
        console.log(instrumentDefs[msg]);

        var instrument = instrumentDefs[msg];
        var synth = flock.synth(instrument);

    } else {
        console.log("undefined!");

    }

});


socket.on('midi', function(freq) {
    $('#messages').append($('<li>').text(freq));
    synth.set("carrier.freq", freq);

});


enviro.start();
