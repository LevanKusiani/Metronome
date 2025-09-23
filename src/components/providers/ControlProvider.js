import { useState } from "react";
import { ControlContext } from "../../context/appContext";
import { METRONOME_CONFIG } from "../../constants/metronomeConfig";

const ControlProvider = ({ children }) => {
  const [control, setControl] = useState({
    tempo: METRONOME_CONFIG.DEFAULT_TEMPO,
    beat: METRONOME_CONFIG.DEFAULT_BEATS
  });

  return (
    <ControlContext.Provider value={{ control, setControl }}>
        {children}
    </ControlContext.Provider>
  );
};

export default ControlProvider;