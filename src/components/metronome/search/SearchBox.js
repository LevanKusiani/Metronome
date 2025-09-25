import SearchResultElement from "./SearchResultElement.js";
// No API calls needed - using BPM directly from search results
import { useContext, useEffect } from "react";

import styles from "./SearchBox.module.css";
import { ControlContext, ThemeContext } from "../../../context/appContext.js";

const SearchBox = ({ isActive, items }) => {
  const { setControl } = useContext(ControlContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const thumbColor = theme === 'dark' ? '#444' : '#ccc';
    const trackColor = theme === 'dark' ? '#222' : '#aaa';
    document.documentElement.style.setProperty('--scrollbar-thumb-color', thumbColor);
    document.documentElement.style.setProperty('--scrollbar-track-color', trackColor);
  }, [theme]);

  const selectHandler = (trackInfo) => {
    // Use the BPM directly from the track data - no API call needed
    if (trackInfo && trackInfo.tempo) {
      const newTempo = parseInt(trackInfo.tempo);
      setControl((prevState) => {
        return {
          ...prevState,
          tempo: newTempo,
        };
      });
      
      // Optional: Show a brief success message
      console.log(`Metronome tempo set to ${newTempo} BPM for "${trackInfo.title}" by ${trackInfo.artist?.name || trackInfo.artist}`);
    } else {
      console.error("No tempo data available for this track");
    }
  };

  // Preview functionality removed - GetSongBPM doesn't provide audio previews
  // All clicks now directly set the BPM via selectHandler

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
          trackInfo={item}
          onSelect={selectHandler}
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
      } ${theme === "dark" && styles.dark}`}
    >
      {createItems()}
    </div>
  );
};

export default SearchBox;
