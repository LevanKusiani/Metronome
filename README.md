## Metronome ⏲🎶 [In progress ⚙]


This is my first React JS app for a simple metronome.

At this moment it consists of playback, the ability to change tempo and beat count, searching tracks and updating tempo based on the results and manage the page color theme.

To share my thoughts of the project process, I started by creating a simple UI for playing a click sequence, while updating the components on the page.
the component part went somewhat smoothly, while I was testing out new React functionalities and capabilities, but the problem arose with the sequencer itself.

At first I searched the functionalities that Javascript had to execute some code with delays, and the first things I saw were _setTimeout_() and _setInterval_().
I implemented the sequencer using these functions and I instantly noticed that something was really off. Since the Javascript runtime is single threaded, and everything
that occured on the webpage went into the same _event queue_, it was easily noticable that the sequence is delayed/stuttered with random intervals and kept getting worse
and worse. So after investigating the runtime of Javascript I tried all sorts of things regarding the scheduling, but it was clear that this won't do the job, because
at any moment layout, event or any other runtime operation bould mess everything up.

At this moment I tried to figure out if there is a way to execute my functions on _other_ thread, and when browsing async Javascript articles, I stumbled upon _Web Workers_.
Understanding that _setTimeout_()/_setInterval_() delays were the _*minimal*_ time intervals after which the functions would be called, Ithought about an empty queue where nothing
else would come in their way. While starting to solve the problem of threading, I still had issues with time precision, because the Javascript Date provider representes miliseconds.
But during this investigation, I found yet another resource, and it was exactly what I was looking for.

There is a fantastic topic about audio sequencing by [Chris Wilson](https://twitter.com/cwilso) in which he mentioned the _Web Audio API_ and _Web Workers_ combination.
Using this API I get both the thread freedom and time precision. In order not to get into the details, I will link all the resources down below.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

- ⏯ Play/Pause the metronome either by clicking on the button or pressing "_Space_";
- 🚄 Change tempo at any moment either by using "**<<**" and "**>>**" buttons or hovering over the tempo value and using mouse scroll. The available range is **40-240**;
- 🔄 Change beat count value, available values being **2-8**;
- 🔎 Search for tracks and change BPM on fly;
- ☯ Set the preferable color scheme;

## Installation

npm install

## Usage

npm start

## Acknowledgments

- [Topic about Web Audio API by CHris Wilson](https://web.dev/audio-scheduling/)
- [Web Audio API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
