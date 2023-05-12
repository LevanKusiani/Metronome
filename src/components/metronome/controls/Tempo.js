import { useContext } from "react";
import styles from "./Tempo.module.css";
import { ControlContext, ThemeContext } from "../../../context/appContext";

const Tempo = () => {
  const { control, setControl } = useContext(ControlContext);
  const { theme } = useContext(ThemeContext);

  const tempoWheelHandler = (val, e) => {
    if (e.deltaY < 0) {
      setControl((prevState) => {
        return {
          ...prevState,
          tempo:
            prevState.tempo < 240 ? prevState.tempo + val : prevState.tempo,
        };
      });
    } else {
      setControl((prevState) => {
        return {
          ...prevState,
          tempo: prevState.tempo > 40 ? prevState.tempo - val : prevState.tempo,
        };
      });
    }
  };

  const tempoClickHandler = (val) => {
    if (control.tempo + val <= 240 && control.tempo + val >= 40)
      setControl((prevState) => {
        return {
          ...prevState,
          tempo: prevState.tempo + val,
        };
      });
  };

  return (
    <div className={`${styles["bpm-container"]}`}>
      <div className={`${styles["bpm-buttons"]} ${(theme === "dark") && styles.dark}`}>
        <svg
          viewBox="0 0 448 512"
          onClick={() => tempoClickHandler(-10)}
          alt="-10"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L269.3 256 406.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
        </svg>
        <svg
          viewBox="0 0 256 512"
          onClick={() => tempoClickHandler(-1)}
          alt="-1"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </div>
      <div className={`${styles.bpm}`}>
        <h1 id="tempo-val" onWheel={(event) => tempoWheelHandler(1, event)}>
          {control.tempo}
        </h1>
        <p>BPM</p>
      </div>
      <div className={`${styles["bpm-buttons"]} ${(theme === "dark") && styles.dark}`}>
        <svg
          viewBox="0 0 256 512"
          onClick={() => tempoClickHandler(1)}
          alt="+1"
        >
          <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
        </svg>
        <svg
          viewBox="0 0 448 512"
          onClick={() => tempoClickHandler(10)}
          alt="+10"
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L370.7 256 233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L178.7 256 41.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
        </svg>
      </div>
    </div>
  );
};

export default Tempo;
