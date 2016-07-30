var instrumentDefs = {
    sine: {
        synthDef: {
            id: 'carrier',
            // addToEnvironment: false,
            ugen: "flock.ugen.sinOsc",
            freq: 440,
            mul: 0.25
        }
    },
    customSine: {
        synthDef: {
            id: "carrier",
            ugen: "flock.ugen.sinOsc",
            freq: 440
        },
        mul: {
            ugen: "flock.ugen.asr",
            freq: 440,
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

    },
    saw: {
        synthDef: {
                      id: 'carrier',
            ugen: "flock.ugen.saw",
            freq: 440,
        }

    },
    square: {
        synthDef: {
                      id: 'carrier',
            ugen: "flock.ugen.square",
            freq: 440,
        }
    },
    triangle: {
        synthDef: {
                      id: 'carrier',
            ugen: "flock.ugen.tri",
            freq: 440,
        }
    }
}
