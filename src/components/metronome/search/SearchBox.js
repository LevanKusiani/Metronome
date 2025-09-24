import SearchResultElement from "./SearchResultElement.js";
import { getTrackDetails } from "../../../clients/apiClient";
import { useContext, useEffect, useRef, useState } from "react";

import styles from "./SearchBox.module.css";
import { ControlContext, ThemeContext } from "../../../context/appContext.js";

const SearchBox = ({ isActive, items }) => {
  const { setControl } = useContext(ControlContext);
  const { theme } = useContext(ThemeContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [trackId, setTrackId] = useState(null);
  const audio = useRef(null);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (!isActive) {
      if (audio.current) {
        audio.current.pause();
      }
    }
  }, [isActive]);

  useEffect(() => {
    const thumbColor = theme === 'dark' ? '#444' : '#ccc';
    const trackColor = theme === 'dark' ? '#222' : '#aaa';
    document.documentElement.style.setProperty('--scrollbar-thumb-color', thumbColor);
    document.documentElement.style.setProperty('--scrollbar-track-color', trackColor);
  }, [theme]);

  const playAudio = (src) => {
    audio.current = new Audio(src);
    audio.current.volume = 0.3;
    audio.current.play();

    timeoutId.current = setTimeout(() => {
      audio.current.pause();
      setTrackId(null);
      setIsPlaying(false);
    }, 29000);
  };

  const selectHandler = async (id) => {
    try {
      const response = await getTrackDetails(id);

      if (response && response.tempo) {
        setControl((prevState) => {
          return {
            ...prevState,
            tempo: Math.trunc(response.tempo),
          };
        });
      } else {
        console.error("No tempo data available for this track");
      }
    } catch (error) {
      console.error("Error getting track details:", error);
    }
  };

  const previewHandler = (id, src) => {
    // GetSongBPM doesn't provide audio previews, so we'll just select the track
    if (src) {
      if (!isPlaying) {
        playAudio(src);
        setTrackId(id);
        setIsPlaying(true);
      } else {
        if (audio) {
          audio.current.pause();

          if (trackId !== null && trackId !== id) {
            setTrackId(id);
            playAudio(src);
          } else {
            setIsPlaying(false);
            clearTimeout(timeoutId);
          }
        }
      }
    } else {
      // No preview available, just select the track
      selectHandler(id);
    }
  };

  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];

  const createItems = () => {
    if (safeItems.length === 0) {
      return (
        <div
          className={`${styles["search-empty"]} ${
            theme === "dark" && styles.dark
          }`}
        >
          <h5>No tracks found :(</h5>
        </div>
      );
    } else {
      return safeItems.map((item, index) => (
        <SearchResultElement
          key={item.id}
          elementId={index}
          playingTrackId={trackId}
          isPlaying={isPlaying}
          trackInfo={item}
          onSelect={selectHandler}
          onPreview={previewHandler}
        />
      ));
    }
  };

  const dropdownIsVisible = isActive && safeItems.length > 0;

  return (
    <div
      id="search-block"
      className={`${styles["search-options"]} ${
        dropdownIsVisible && styles["active-dropdown"]
      }`}
    >
      {createItems()}
    </div>
  );
};

export default SearchBox;
