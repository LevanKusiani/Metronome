import styles from "./Playback.module.css";

const Playback = ({play, isDark, onButtonClick}) => {
  return (
    <div>
      <button
        className={`${styles.playback} ${isDark && styles.dark}`}
        onClick={onButtonClick}>{play}</button>
    </div>
  );
};

export default Playback;
