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
    },
    moog: {
    synthDef: {
      id:'mod3',
      ugen: "flock.ugen.filter.moog",
      cutoff: {
             id:'mod1',
             ugen: "flock.ugen.sinOsc",
             freq: 1/4,
             mul: 5000,
             add: 7000
         },
      resonance: {
             id:'mod2',
             ugen: "flock.ugen.sinOsc",
             freq: 1/2,
             mul: 1.5,
             add: 1.5
         },
      source: {
             ugen: "flock.ugen.lfSaw",
             id:"carrier"
         },
      mul: 0.5
    }
  },
  granny: {
    synthDef: {
      id:'gran',
      ugen: "flock.ugen.granulator",
      numGrains: 20,
      grainDur: 0.5,
      delayDur: 1/4,
      mul: 0.5,
      source: {
        id:'carrier',
          ugen: "flock.ugen.lfSaw",
          mul: 0.5
      }
    }
  }
}
