import soundLow from "../assets/Audio/Metronome/mtr-low.wav";
import soundHigh from "../assets/Audio/Metronome/mtr-hi.wav";

let timer; // reference to the setTimeout invocation
let currentBpm;
let currentBeat;
let beatCtr = 0;

function play() {
  if (beatCtr % currentBeat === 0) {
    new Audio(soundHigh).play();
  } else {
    new Audio(soundLow).play();
  }

  beatCtr = (beatCtr + 1) % currentBeat;

  console.log("bpm: " + currentBpm);
  timer = setTimeout(() => {
    play();
  }, currentBpm);
}

function updateParams(tempo, beat) {
  console.log(`entered timer update: ${tempo}, ${beat}`);

  currentBpm = (60 / tempo) * 1000; //tempo;
  currentBeat = beat;
}

function stop() {
  if (timer !== undefined) {
    clearTimeout(timer);
    timer = undefined;
  }
}

export { play, updateParams, stop };
