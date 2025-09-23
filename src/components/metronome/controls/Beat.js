import { useContext } from "react";
import styles from "./Beat.module.css";
import "./BeatAnimation.css";
import { ControlContext, ThemeContext } from "../../../context/appContext";
import { METRONOME_CONFIG, UI_CONFIG } from "../../../constants/metronomeConfig";

const Beat = () => {
  const { control, setControl } = useContext(ControlContext);
  const { theme } = useContext(ThemeContext);

  const beatWheelHandler = (e) => {
    if (e.deltaY < 0)
      setControl((prevState) => {
        return {
          ...prevState,
          beat: prevState.beat < METRONOME_CONFIG.MAX_BEATS ? prevState.beat + 1 : prevState.beat,
        };
      });
    else
      setControl((prevState) => {
        return {
          ...prevState,
          beat: prevState.beat > METRONOME_CONFIG.MIN_BEATS ? prevState.beat - 1 : prevState.beat,
        };
      });
  };

  const createItems = () => {
    let list = [];

    for (let i = 0; i < UI_CONFIG.MAX_BEAT_STEPS; i++) {
      if (i < control.beat) {
        list.push(
          <div
            key={`beat-active-${i}`}
            className={`${styles["beat-step"]} ${(theme === "dark") && styles.dark}`}
          ></div>
        );
      } else {
        list.push(
          <div
            key={`beat-inactive-${i}`}
            className={`${styles["beat-step-disabled"]} ${(theme === "dark") && styles.dark}`}
          ></div>
        );
      }
    }

    return list;
  };

  return (
    <div>
      <div className={`${styles.beat}`}>
        <h1 onWheel={(event) => beatWheelHandler(event)}>{control.beat}</h1>
      </div>
      <div
        id="beat-board"
        onWheel={(event) => beatWheelHandler(event)}
        className={`${styles["beat-container"]}`}
      >
        {createItems()}
      </div>
    </div>
  );
};

export default Beat;
