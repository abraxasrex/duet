if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    console.log('MIDI Access Object', midiAccess);

    midi = midiAccess;
    var inputs = midi.inputs.values();
    //loop over all avail inputs and listen for MIDI
    for (var input = inputs.next(); input&& !input.done; input = inputs.next()) {
      input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(e) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

function onMIDIMessage(message) {
  data = message.data;
  console.log('MIDI data ', data);
    socket.emit('noteOn', data);
}
