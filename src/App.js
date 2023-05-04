import { useState, useEffect, useCallback } from "react";
import { initialize, play, updateParams, stop } from "./scripts/metronome";

import Playback from "./components/metronome/Playback";
import Tempo from "./components/metronome/Tempo";
import Beat from "./components/metronome/Beat";
import Switch from "./components/UI/Switch";
import Search from "./components/metronome/Search";

import "./App.css";

function App() {
  //state
  const [appState, setAppState] = useState({
    tempo: 100,
    beat: 4,
    isPlaying: false,
    isDark: false,
  });

  useEffect(() => {
    initialize();
  }, []);
  
  const playbackHandler = useCallback(() => {
    if (!appState.isPlaying) {
      updateParams(appState.tempo, appState.beat);
      play();
      
      setAppState((prevState) => {
        return { ...prevState, isPlaying: true };
      });
    } else {
      stop();
      
      setAppState((prevState) => {
        return { ...prevState, isPlaying: false };
      });
    }
  }, [appState.isPlaying, appState.tempo, appState.beat]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 32) {
        playbackHandler();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playbackHandler]);

  useEffect(() => {
    updateParams(appState.tempo, appState.beat);
  }, [appState.tempo, appState.beat]);

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
        <Search />
        <Switch isDark={appState.isDark} onSwitch={switchHandler} />
      </div>
      <div className={`App ${appState.isDark && "Dark"}`}>
        <div className="App-content">
          <Playback
            isPlaying={appState.isPlaying}
            onButtonClick={playbackHandler}
            isDark={appState.isDark}
          />
          <Tempo
            tempo={appState.tempo}
            isDark={appState.isDark}
            onWheelScroll={tempoWheelHandler}
            onButtonClick={tempoClickHandler}
          />
          <Beat
            beat={appState.beat}
            onWheelScroll={beatWheelHandler}
            isDark={appState.isDark}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
