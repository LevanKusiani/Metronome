import styles from "./Beat.module.css";
import "./BeatAnimation.css";

const Beat = ({ beat, isDark, onWheelScroll }) => {
  const createItems = (val) => {
    let list = [];

    for (let i = 0; i < 8; i++) {
        if(i < val){
            list.push(<div
              key={Math.random().toString()}
              className={`${styles['beat-step']} ${isDark && styles.dark}`}></div>);
        }
        else{
            list.push(<div
              key={Math.random().toString()}
              className={`${styles['beat-step-disabled']} ${isDark && styles.dark}`}></div>);
        }
    //   const clsName = "beat-step" + (i < val ? "" : "-disabled");
    //   list.push(<div className={`${clsName} ${isDark && styles.dark}`}></div>);
    }

    return list;
  };

  return (
    <div>
      <div className={`${styles.beat}`}>
        <h1 onWheel={(event) => onWheelScroll(event)}>{beat}</h1>
      </div>
      <div
        id="beat-board"
        onWheel={(event) => onWheelScroll(event)}
        className={`${styles["beat-container"]}`}
      >
        {createItems(beat)}
      </div>
    </div>
  );
};

export default Beat;
