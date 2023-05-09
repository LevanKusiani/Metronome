import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { searchTracks } from "../../../clients/spotifyApiClient";
import SearchBox from "./SearchBox";
import styles from "./Search.module.css";

const Search = () => {
  const [dataList, setDataList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleMouseClick = useCallback((e) => {
    if((Boolean(e.target.closest("[class*='element-container']")) && !Boolean(e.target.closest("[class*='preview']")))){
      setIsSearching(false);
    }
    if (isSearching && (!e.target || !Boolean(e.target.closest("#search-container")))) {
      setIsSearching(false);
    }
  }, [isSearching]);

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

      if(tracksResponse){
        setDataList(tracksResponse.tracks.items);
      }else{
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
        className={`${styles.searchbar}`}
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
