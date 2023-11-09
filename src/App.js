import { useContext, useEffect, useState } from "react";
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
import Auth from "./components/UI/auth/Auth";

function App() {
  const {theme} = useContext(ThemeContext);
  
  useEffect(() => {
    initialize();
  }, []);

  return (
    <ControlProvider>
      <div className={`Page ${(theme === "dark") && "Dark"}`}>
        <div className="header">
          <div className="empty-container"></div>
          <Search />
          <Auth />
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
        <div className="footer">
          <Switch />
        </div>
      </div>
    </ControlProvider>
  );
}

export default App;
