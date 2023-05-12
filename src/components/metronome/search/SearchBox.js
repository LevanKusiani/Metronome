import SearchResultElement from "./SearchResultElement.js";
import { getTrackDetails } from "../../../clients/spotifyApiClient";
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
    const response = await getTrackDetails(id);

    if (response) {
      setControl((prevState) => {
        return {
          ...prevState,
          tempo: Math.trunc(response.audio_features[0].tempo),
        };
      });
    } else {
      //TODO: implement a proper error mechanism
    }
  };

  const previewHandler = (id, src) => {
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
  };

  const createItems = () => {
    if (!items || items.length === 0) {
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
      return items.map((item, index) => (
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

  const dropdownIsVisible = isActive && items.length > 0;

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
