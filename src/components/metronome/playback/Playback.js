import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./Playback.module.css";
import { play, updateParams, stop } from "../../../scripts/metronome";
import { ControlContext, ThemeContext } from "../../../context/appContext";
import { UI_CONFIG } from "../../../constants/metronomeConfig";

const Playback = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { control } = useContext(ControlContext);
  const { theme } = useContext(ThemeContext);

  const playbackHandler = useCallback(() => {
    if (!isPlaying) {
      updateParams(control.tempo, control.beat);
      play();

      setIsPlaying(true);
    } else {
      stop();

      setIsPlaying(false);
    }
  }, [isPlaying, control.tempo, control.beat]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === UI_CONFIG.SPACE_KEY_CODE) {
        const activeElement = document.activeElement;

        if (activeElement.id !== UI_CONFIG.SEARCH_INPUT_ID) {
          playbackHandler();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playbackHandler]);

  return (
    <div>
      <button
        className={`${styles.playback} ${(theme === "dark") && styles.dark}`}
        onClick={playbackHandler}
      >
        {isPlaying ? (
          <svg viewBox="0 0 320 512">
            <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
          </svg>
        ) : (
          <svg viewBox="0 0 384 512" transform="translate(10, 0)">
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Playback;
