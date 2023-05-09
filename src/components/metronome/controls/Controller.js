import { useContext, useEffect } from "react";
import { updateParams } from "../../../scripts/metronome";
import { ControlContext } from "../../../context/controlContext";

const Controller = ({ children }) => {
  const { control } = useContext(ControlContext);

  useEffect(() => {
    updateParams(control.tempo, control.beat);
  }, [control.tempo, control.beat]);

  return <>{children}</>;
};

export default Controller;
