import { useState, useEffect } from "react";
import { play, updateParams, stop } from "./scripts/myTimer";

import Playback from "./components/metronome/Playback";
import Tempo from "./components/metronome/Tempo";
import Beat from "./components/metronome/Beat";
import Switch from "./components/UI/Switch";

import "./App.css";

function App() {
  //state
  const [appState, setAppState] = useState({
    tempo: 100,
    beat: 4,
    play: "Start",
    isPlaying: false,
    isDark: false,
  });

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, true);
  }, []);

  useEffect(() => {
    updateParams(appState.tempo, appState.beat);
  }, [appState.tempo, appState.beat]);

  const keyDownHandler = (e) => {
    //if (e.key === " ")
    //playbackHandler();
  };

  const playbackHandler = () => {
    if (appState.play === "Start") {
      updateParams(appState.tempo, appState.beat);
      play();
      setAppState((prevState) => {
        return { ...prevState, play: "Stop", isPlaying: true };
      });
    } else {
      stop();
      setAppState((prevState) => {
        return { ...prevState, play: "Start", isPlaying: false };
      });
    }
  };

  const tempoWheelHandler = (val, e) => {
    if (e.deltaY < 0) {
      setAppState((prevState) => {
        return {
          ...prevState,
          tempo:
            prevState.tempo < 240 ? prevState.tempo + val : prevState.tempo,
        };
      });
    } else
      setAppState((prevState) => {
        return {
          ...prevState,
          tempo: prevState.tempo > 40 ? prevState.tempo - val : prevState.tempo,
        };
      });
  };

  const tempoClickHandler = (val) => {
    if (appState.tempo + val <= 240 && appState.tempo + val >= 40)
      setAppState((prevState) => {
        return { ...prevState, tempo: prevState.tempo + val };
      });
  };

  const beatWheelHandler = (e) => {
    if (e.deltaY < 0)
      setAppState((prevState) => {
        return {
          ...prevState,
          beat: prevState.beat < 8 ? prevState.beat + 1 : prevState.beat,
        };
      });
    else
      setAppState((prevState) => {
        return {
          ...prevState,
          beat: prevState.beat > 2 ? prevState.beat - 1 : prevState.beat,
        };
      });
  };

  const switchHandler = (val) => {
    setAppState((prevState) => {
      return { ...prevState, isDark: val };
    });
  };

  return (
    <div className={`Page ${appState.isDark && "Dark"}`}>
      <div className="Header">
        <Switch isDark={appState.isDark} onSwitch={switchHandler} />
      </div>
      <div className={`App ${appState.isDark && "Dark"}`}>
        <div className="App-content">
          <Playback
            play={appState.play}
            onButtonClick={playbackHandler}
            isDark={appState.isDark} />
          <Tempo
            tempo={appState.tempo}
            onWheelScroll={tempoWheelHandler}
            onButtonClick={tempoClickHandler}
          />
          <Beat
            beat={appState.beat}
            onWheelScroll={beatWheelHandler}
            isDark={appState.isDark} />
        </div>
      </div>
    </div>
  );
}

export default App;
