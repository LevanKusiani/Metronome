import { useContext } from "react";
import styles from "./SearchResultElement.module.css";
import { ThemeContext } from "../../../context/appContext";

const SearchResultElement = ({
  elementId,
  playingTrackId,
  isPlaying,
  trackInfo,
  onSelect,
  onPreview,
}) => {
  const { theme } = useContext(ThemeContext);

  const clickHandler = () => {
    onSelect(trackInfo.tempo);
  };

  const previewHandler = (e) => {
    e.stopPropagation();

    onPreview(elementId, trackInfo.previewUrl);
  };

  return (
    <div
      className={`${styles["element-container"]} ${
        theme === "dark" && styles.dark
      }`}
      onClick={() => clickHandler()}
    >
      <div className={`${styles["album-logo"]}`}>
        <img src={trackInfo.imageUrl} alt={trackInfo.albumName} />
      </div>
      <div
        className={`${styles["track-info"]} ${theme === "dark" && styles.dark}`}
      >
        <h4>{trackInfo.name}</h4>
        <p>{trackInfo.artistName}</p>
        {/* <p>{trackInfo.album.name}</p> */}
      </div>
      <div className={`${styles.preview} ${theme === "dark" && styles.dark}`}>
        <button onClick={(e) => previewHandler(e)}>
          {isPlaying && elementId === playingTrackId ? (
            <svg viewBox="0 0 32 32">
              <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h16.128q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-16.128q-0.832 0-1.44 0.576t-0.576 1.44v16.16z"></path>
            </svg>
          ) : (
            <svg viewBox="0 0 384 512" transform="translate(1.5, 0)">
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchResultElement;
