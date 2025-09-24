import { useContext } from "react";
import styles from "./SearchResultElement.module.css";
import { ThemeContext } from "../../../context/appContext";

const SearchResultElement = ({
  elementId,
  trackInfo,
  onSelect,
}) => {
  const { theme } = useContext(ThemeContext);

  const clickHandler = () => {
    onSelect(trackInfo);
  };

  return (
    <div
      className={`${styles["element-container"]} ${
        theme === "dark" && styles.dark
      }`}
      onClick={() => clickHandler()}
    >
      <div className={`${styles["album-logo"]}`}>
        <div className={styles["bpm-indicator"]}>
          <span>{trackInfo.tempo || 'N/A'}</span>
          <small>BPM</small>
        </div>
      </div>
      <div
        className={`${styles["track-info"]} ${theme === "dark" && styles.dark}`}
      >
        <h4>{trackInfo.title || trackInfo.name}</h4>
        <p>{trackInfo.artist?.name || trackInfo.artist}</p>
        {trackInfo.album?.title && (
          <p className={styles.album}>Album: {trackInfo.album.title}</p>
        )}
        <div className={styles.musicalInfo}>
          {trackInfo.tempo && (
            <span className={styles.tempo}>BPM: {trackInfo.tempo}</span>
          )}
          {trackInfo.time_sig && (
            <span className={styles.timeSig}>Time: {trackInfo.time_sig}</span>
          )}
          {trackInfo.key_of && (
            <span className={styles.keyOf}>Key: {trackInfo.key_of}</span>
          )}
        </div>
      </div>
      { /* <div className={`${styles.preview} ${theme === "dark" && styles.dark}`}>
        <button onClick={(e) => previewHandler(e)}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default SearchResultElement;
