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

    soundLowArrayBuffer
      .then((buffer) => {
        audioContext.decodeAudioData(buffer, function (buffer) {
          soundLowBuffer = buffer;
        });
      })
      .catch(() => {
        console.warn("failed to load low tick sound.");
      });

    soundHighArrayBuffer
      .then((buffer) => {
        audioContext.decodeAudioData(buffer, function (buffer) {
          soundHighBuffer = buffer;

          soundsLoaded = true;
        });
      })
      .catch(() => {
        console.warn("failed to load high tick sound.");
      });
  } else {
    audioContext.resume();
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
  audioContext.suspend();
  beatCtr = 0;
  clear();

  worker.postMessage({
    command: "stop",
  });
}

function scheduler() {
  while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
    scheduleNote(beatCtr, nextNoteTime);
    countNextNoteTime();
  }
}

function scheduleNote(beatNumber, time) {
  //Playing sounds using Audio Buffer
  const source = audioContext.createBufferSource();

  if (beatNumber % currentBeat === 0) {
    source.buffer = soundHighBuffer;
  } else {
    source.buffer = soundLowBuffer;
  }

  source.connect(audioContext.destination);

  source.start(time);
  // source.stop(time + noteLength);

  flickerBeatTile(beatNumber, noteLength);
}

function countNextNoteTime() {
  var secondsPerBeat = 60.0 / tempo;

  nextNoteTime += secondsPerBeat;
  beatCtr = (beatCtr + 1) % currentBeat;
}

export { initialize, play, updateParams, stop, scheduler };
