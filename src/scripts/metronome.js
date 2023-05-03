import soundLow from "../assets/Audio/Metronome/mtr-low.wav";
import soundHigh from "../assets/Audio/Metronome/mtr-hi.wav";
import { flickerBeatTile, clear } from "./animator.js";

let worker;
let currentBeat;
let beatCtr = 0;
let soundsLoaded = false;
let soundLowArrayBuffer;
let soundHighArrayBuffer;
let soundLowBuffer;
let soundHighBuffer;

let audioContext;

let unlocked = false;
let tempo = 120.0;
let lookahead = 25.0; //in milliseconds
let scheduleAheadTime = 0.1; //in seconds
let nextNoteTime = 0.0;
let noteLength = 0.05; //in seconds

function initialize() {
  loadSounds();

  worker = new window.Worker(new URL("./metronomeWorker.js", import.meta.url));

  worker.postMessage({ interval: lookahead });

  worker.onmessage = (event) => {
    if (event.data === "tick") {
      scheduler();
    } else console.log("message: " + event.data);
  };

  return () => {
    console.log("terminating worker...");
    worker.terminate();
  };
}

function loadSounds() {
  fetch(soundLow, {
    headers: {
      "Content-Type": "audio/x-wav",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => (soundLowArrayBuffer = response.arrayBuffer()))
    .then(() => {
      fetch(soundHigh, {
        headers: {
          "Content-Type": "audio/x-wav",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => (soundHighArrayBuffer = response.arrayBuffer()));
    })
    .catch((error) => console.error(error));
}

function play() {
  if (!audioContext) {
    audioContext = new AudioContext();

    soundLowArrayBuffer.then((buffer) => {
      audioContext.decodeAudioData(buffer, function (buffer) {
        soundLowBuffer = buffer;
      });
    }).catch(() => { console.warn("failed to load low tick sound.") });

    soundHighArrayBuffer.then((buffer) => {
      audioContext.decodeAudioData(buffer, function (buffer) {
        soundHighBuffer = buffer;

        soundsLoaded = true;
      });
    }).catch(() => { console.warn("failed to load high tick sound.") });
  }

  if (!unlocked) {
    const buffer = audioContext.createBuffer(1, 1, 22050);
    const node = audioContext.createBufferSource();
    node.buffer = buffer;
    node.start(0);
    unlocked = true;
  }

  worker.postMessage({
    command: "play",
  });
}

function updateParams(newTempo, beat) {
  tempo = newTempo;
  currentBeat = beat;
}

function stop() {
  beatCtr = 0;
  clearBeatBoard();
  //clear();

  worker.postMessage({
    command: "stop",
  });
}

function scheduler() {
  //TODO: resolve the pause/play bug

  while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
    scheduleNote(beatCtr, nextNoteTime);
    countNextNoteTime();
  }
}

function scheduleNote(beatNumber, time) {
  //TODO: refactor this scheduler

  //Playing sounds using Audio Buffer
  if(soundsLoaded){
    const source = audioContext.createBufferSource();

    if (beatNumber % currentBeat === 0){
      source.buffer = soundHighBuffer;
    }
    else{
      source.buffer = soundLowBuffer;
    }
  
    source.connect(audioContext.destination);
  
    source.start(time);
    source.stop(time + noteLength);
    
    flickerBeatElement();
    // flickerBeatTile(beatNumber, noteLength);
  }
  else{
    // Playing sounds using Oscillator
    var osc = audioContext.createOscillator();
    osc.connect(audioContext.destination);

    if (beatNumber % currentBeat === 0)
      osc.frequency.value = 440.0;
    else
      osc.frequency.value = 220.0;

    osc.start(time);
    osc.stop(time + noteLength);
  }
}

function countNextNoteTime() {
  var secondsPerBeat = 60.0 / tempo;

  nextNoteTime += secondsPerBeat;
  beatCtr = (beatCtr + 1) % currentBeat;
}

function flickerBeatElement() {
  console.log("flickering: " + beatCtr + ", " + noteLength);

  document
    .querySelector("#beat-board")
    .childNodes[beatCtr].classList.add("flicker");

  setTimeout(() => {
    document
      .querySelector("#beat-board")
      .childNodes[beatCtr].classList.remove("flicker");
  }, noteLength);
}

function clearBeatBoard() {
  Array.from(document.querySelector("#beat-board").childNodes).forEach((x) =>
    x.classList.remove("flicker")
  );
}

export { initialize, play, updateParams, stop, scheduler };
