import "./Tempo.css";
import angleLeft from "../../assets/images/angle-left-solid.svg";
import anglesLeft from "../../assets/images/angles-left-solid.svg";
import angleRight from "../../assets/images/angle-right-solid.svg";
import anglesRight from "../../assets/images/angles-right-solid.svg";

const Tempo = ({tempo, onWheelScroll, onButtonClick}) => {
  return (
    <div className="bpm-container">
      <div className="bpm-buttons">
        <img src={anglesLeft} onClick={() => onButtonClick(-10)} alt="-10" />
        <img src={angleLeft} onClick={() => onButtonClick(-1)} alt="-1" />
      </div>
      <div className="bpm">
        <h1 id="tempo-val" onWheel={(event) => onWheelScroll(1, event)}>{tempo}</h1>
        <p>BPM</p>
      </div>
      <div className="bpm-buttons">
        <img src={angleRight} onClick={() => onButtonClick(1)} alt="+1" />
        <img src={anglesRight} onClick={() => onButtonClick(10)} alt="+10" />
      </div>
    </div>
  );
};

export default Tempo;
