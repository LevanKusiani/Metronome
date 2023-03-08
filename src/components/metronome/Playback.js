import "./Playback.css";

const Playback = ({play, onButtonClick}) => {
  return (
    <div>
      <button onClick={onButtonClick}>{play}</button>
    </div>
  );
};

export default Playback;
