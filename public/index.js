var socket = io();
var current_users = [];
var enviro = flock.init();
var userInst = instrumentDefs["customSine"];

var userId = parseInt(Math.floor(Math.random() * 9999));
socket.emit('newUser', userId);

socket.on('newUser', function(id) {
    console.log('a new user approaches!');
    current_users.push(id);
    current_users.forEach(function(id) {
        $('#users').append('<li>' + id + '</li>');
    });
});

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

// socket.on('inst', function(msg) {
//
//     if (instrumentDefs[msg] != undefined) {
//         console.log("inst found");
//
//         userInst = instrumentDefs[msg];
//         console.log("Instrument is now: " + msg);
//
//     } else {
//         console.log("undefined!");
//
//     }
//
// });


socket.on('midi', function(freq) {
    $('#messages').append($('<li>').text(freq));

    synth.set("carrier.freq", parseInt(freq));
});

socket.on('noteOn', function(noteOn) {
  console.log(noteOn);
    var notePitch = noteOn.MIDIdata[1];
    var noteVel = noteOn.MIDIdata[2];

    // $('#messages').append($('<li>').text("Pitch: " + notePitch + " , Velocity: " + noteVel));
    console.log(noteOn.inst);
    if (noteVel != 0) {
        var synth = flock.synth(instrumentDefs[noteOn.inst]);
        synth.set('carrier.freq', flock.midiFreq(notePitch));
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
$(".instbutton").click(function(e) {


    var inst = {userId: userId, inst: e.target.id}
    socket.emit('inst', inst);
    console.log(inst);
});


enviro.start();
