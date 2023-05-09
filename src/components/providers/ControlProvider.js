import { useState } from "react";
import { ControlContext } from "../../context/controlContext";

const ControlProvider = ({ children }) => {
  const [control, setControl] = useState({
    tempo: 100,
    beat: 4
  });

  return (
    <ControlContext.Provider value={{ control, setControl }}>
        {children}
    </ControlContext.Provider>
  );
};

export default ControlProvider;