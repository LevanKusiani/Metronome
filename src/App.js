import { useState, useEffect } from "react";
import { initialize } from "./scripts/metronome";

import Playback from "./components/metronome/playback/Playback";
import Switch from "./components/UI/Switch";
import Search from "./components/metronome/search/Search";

import "./App.css";
import ControlProvider from "./components/providers/ControlProvider";
import Controller from "./components/metronome/controls/Controller";
import Tempo from "./components/metronome/controls/Tempo";
import Beat from "./components/metronome/controls/Beat";

function App() {
  //state
  const [appState, setAppState] = useState({
    isDark: false
  });

  useEffect(() => {
    initialize();
  }, []);

  const switchHandler = (val) => {
    setAppState((prevState) => {
      return { ...prevState, isDark: val };
    });
  };

  return (
    <ControlProvider>
      <div className={`Page ${appState.isDark && "Dark"}`}>
        <div className="Header">
          <div className="empty-container"></div>
          <Search />
          <Switch isDark={appState.isDark} onSwitch={switchHandler} />
        </div>
        <div className={`App ${appState.isDark && "Dark"}`}>
          <div className="App-content">
            <Playback
              isDark={appState.isDark}
            />
            <Controller>
              <Tempo
                isDark={appState.isDark}
              />
              <Beat
                isDark={appState.isDark}
              />
            </Controller>
          </div>
        </div>
      </div>
    </ControlProvider>
  );
}

export default App;
