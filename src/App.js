import { useContext, useEffect } from "react";
import { initialize } from "./scripts/metronome";

import Playback from "./components/metronome/playback/Playback";
import Switch from "./components/UI/Switch";
import Search from "./components/metronome/search/Search";

import "./App.css";
import ControlProvider from "./components/providers/ControlProvider";
import Controller from "./components/metronome/controls/Controller";
import Tempo from "./components/metronome/controls/Tempo";
import Beat from "./components/metronome/controls/Beat";
import { ThemeContext } from "./context/appContext";

function App() {
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <ControlProvider>
      <div className={`Page ${(theme === "dark") && "Dark"}`}>
        <div className="Header">
          <div className="empty-container"></div>
          <Search />
          <Switch />
        </div>
        <div className={`App ${(theme === "dark") && "Dark"}`}>
          <div className="App-content">
            <Playback />
            <Controller>
              <Tempo />
              <Beat />
            </Controller>
          </div>
        </div>
      </div>
    </ControlProvider>
  );
}

export default App;
