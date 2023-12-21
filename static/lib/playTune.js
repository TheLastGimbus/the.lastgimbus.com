// this was manually downloaded and fixed by me from
// https://github.com/hackclub/sprig/blob/cea0113b43329f794818aa4831dc9f3b7ebab0a9/engine/playTune.js
/*
song form

[
  [duration, instrument, pitch, duration, ...],


]
*/


const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const volGain = audioCtx.createGain();
volGain.connect(audioCtx.destination);

let _mute = false;
const mute = {
    get current() {
        return _mute;
    }, set current(value) {
        _mute = value;
        volGain.gain.value = 1 - _mute;
    }
};

const sleep = async (duration) => new Promise(_ => setTimeout(_, duration))

const INSTRUMENTS = ["sine", "triangle", "square", "sawtooth"];

async function playTuneHelper(tune, number, playingRef) {
    for (let i = 0; i < tune.length * number; i++) {
        const index = i % tune.length;
        if (!playingRef.playing) break;
        const noteSet = tune[index];
        const sleepTime = noteSet[0];
        for (let j = 1; j < noteSet.length; j += 3) {
            const instrument = noteSet[j];
            const note = noteSet[j + 1];
            const duration = noteSet[j + 2];

            const f = typeof note === "string" ? tones[note.toUpperCase()] : 2 ** ((note - 69) / 12) * 440;

            if (INSTRUMENTS.includes(instrument) && f !== undefined) playFrequency(f, duration, instrument)
        }
        await sleep(sleepTime);
    }
}

function playTune(tune, number = 1) {
    let playingRef = {playing: true};

    playTuneHelper(tune, number, playingRef);

    return {
        end() {
            playingRef.playing = false;
        }, isPlaying() {
            return playingRef.playing;
        },
    };
}

function playFrequency(frequency, duration, instrument) {
    const osc = audioCtx.createOscillator()
    const rampGain = audioCtx.createGain()

    osc.connect(rampGain)
    rampGain.connect(volGain)

    osc.frequency.value = frequency;
    osc.type = instrument ?? 'sine';
    osc.start();

    const endTime = audioCtx.currentTime + duration * 2 / 1000;
    osc.stop(endTime)

    rampGain.gain.setValueAtTime(0, audioCtx.currentTime);
    rampGain.gain.linearRampToValueAtTime(.2, audioCtx.currentTime + duration / 5 / 1000);
    rampGain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration / 1000)
    rampGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration * 2 / 1000) // does this ramp from the last ramp

    osc.onended = () => {
        osc.disconnect();
        rampGain.disconnect();
    };
}

// Syntax:
// 500: 64.4~500 + c5~1000
// [500, "sine", 64.4, 500, "sine", "c5", 1000]
// Comma between each tune element. Whitespace ignored.

