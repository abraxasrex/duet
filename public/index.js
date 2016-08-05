var socket = io();
var enviro = flock.init();
var userInst = instrumentDefs["customSine"];


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

$('#midi').submit(function() {
    socket.emit('midi', $('#m2').val());
    $('#m2').val('');
    return false;
});

socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
    if (msg == "play") {
        flock.enviro.shared.play();
    } else if (msg == "stop") {
        socket.emit('chat message', 'stopping enviro');
        flock.enviro.shared.stop();
    }

});

socket.on('inst', function(msg) {

    if (instrumentDefs[msg] != undefined) {
        console.log("inst found");

        userInst = instrumentDefs[msg];
        console.log("Instrument is now: " + msg);

    } else {
        console.log("undefined!");

    }

});


socket.on('midi', function(freq) {
    $('#messages').append($('<li>').text(freq));

    synth.set("carrier.freq", parseInt(freq));
});

socket.on('noteOn', function(data) {

    var notePitch = data[1];
    var noteVel = data[2];

    // $('#messages').append($('<li>').text("Pitch: " + notePitch + " , Velocity: " + noteVel));

    if (noteVel != 0) {
        var synth = flock.synth(userInst);
        synth.set('carrier.freq', flock.midiFreq(data[1]));
        // enviro.tail(synth);
        setTimeout(function() {

            synth.pause();
        }, 1200);
        // noteID = synth.id;
        // userSynths.push(synth);
        // } else {
        //     setTimeout(function() {
        //         for (synth in userSynths) {
        //           if (userSynths[synth].id == noteID){
        //             userSynths[synth].pause();
        //             }
        //
        //         }
        //
        //
        //     }, 1200);
    }

});


//Inst choice
$(".instbutton").click(function(e){
  var inst = e.target.id;
  console.log(inst);
  socket.emit('inst', inst);
})


enviro.start();
