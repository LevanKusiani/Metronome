import { useCallback, useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import { searchTracks } from "../../../clients/apiClient";
import SearchBox from "./SearchBox";
import styles from "./Search.module.css";
import { ThemeContext } from "../../../context/appContext";
import { METRONOME_CONFIG, UI_CONFIG } from "../../../constants/metronomeConfig";

const Search = () => {
  const [dataList, setDataList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleMouseClick = useCallback(
    (e) => {
      const isInSearch = !Boolean(e.target.closest("#search-container"));
      const isInThemeSwitch = !Boolean(e.target.closest("#theme-changer"));

      if (
        Boolean(e.target.closest("[class*='element-container']")) &&
        !Boolean(e.target.closest("[class*='preview']"))
      ) {
        setIsSearching(false);
      }
      if (isSearching && (!e.target || (isInSearch && isInThemeSwitch))) {
        setIsSearching(false);
      }
    },
    [isSearching]
  );

  useEffect(() => {
    document.addEventListener("click", handleMouseClick);
    return () => {
      document.removeEventListener("click", handleMouseClick);
    };
  }, [handleMouseClick]);

  const searchHandler = async (e) => {
    const query = e.target.value.trim();
    setError(null);

    if (query.length > 0) {
      setIsLoading(true);
      try {
        const tracksResponse = await searchTracks(query);

        if (tracksResponse && tracksResponse.search) {
          // Check if search contains an error
          if (tracksResponse.search.error) {
            setError("No tracks found. Please try a different song name.");
            setDataList([]);
          } else if (Array.isArray(tracksResponse.search)) {
            setDataList(tracksResponse.search);
          } else {
            setError("No tracks found. Please try a different song name.");
            setDataList([]);
          }
        } else if (tracksResponse && Array.isArray(tracksResponse)) {
          setDataList(tracksResponse);
        } else {
          setError("No tracks found. Please try a different song name.");
          setDataList([]);
        }
      } catch (err) {
        setError("Failed to search tracks. Please check your connection and try again.");
        setDataList([]);
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setDataList([]);
      setIsLoading(false);
    }
  };

  const focusHandler = () => {
    setIsSearching(true);
  };

  const debouncedSearchHandler = debounce(searchHandler, METRONOME_CONFIG.SEARCH_DEBOUNCE_DELAY);

  return (
    <div id="search-container" className={`${styles["dropdown-content"]}`}>
      <input
        id={UI_CONFIG.SEARCH_INPUT_ID}
        className={`${styles.searchbar} ${theme === "dark" && styles.dark}`}
        type="text"
        placeholder="Search tracks..."
        onFocus={focusHandler}
        onKeyUp={debouncedSearchHandler}
        disabled={isLoading}
      />
      <SearchBox isActive={isSearching} items={dataList} />
      {error && (
        <div className={`${styles.error} ${theme === "dark" && styles.dark}`}>
          {error}
        </div>
      )}
      {isLoading && (
        <div className={`${styles.loading} ${theme === "dark" && styles.dark}`}>
          Searching...
        </div>
      )}
    </div>
  );
};

export default Search;
