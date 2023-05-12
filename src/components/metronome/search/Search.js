import { useCallback, useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import { searchTracks } from "../../../clients/spotifyApiClient";
import SearchBox from "./SearchBox";
import styles from "./Search.module.css";
import { ThemeContext } from "../../../context/appContext";

const Search = () => {
  const [dataList, setDataList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
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

    if (query.length > 0) {
      const tracksResponse = await searchTracks(query);

      if (tracksResponse) {
        setDataList(tracksResponse.tracks.items);
      } else {
        //TODO: implement a proper error mechanism
      }
    } else {
      setDataList([]);
    }
  };

  const focusHandler = () => {
    setIsSearching(true);
  };

  const debouncedSearchHandler = debounce(searchHandler, 1000);

  return (
    <div id="search-container" className={`${styles["dropdown-content"]}`}>
      <input
        id="track-searcher"
        className={`${styles.searchbar} ${theme === "dark" && styles.dark}`}
        type="text"
        placeholder="Search.."
        onFocus={focusHandler}
        onKeyUp={debouncedSearchHandler}
      />
      <SearchBox isActive={isSearching} items={dataList} />
    </div>
  );
};

export default Search;
