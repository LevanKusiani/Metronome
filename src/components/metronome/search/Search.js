import { useCallback, useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import SearchBox from "./SearchBox";
import styles from "./Search.module.css";
import { AuthContext, ThemeContext } from "../../../context/appContext";
import { getTrackDetails } from "../../../clients/easyApiClient";
import SearchDropdown from "./SearchDropdown";
import EmptyContainer from "../../UI/EmptyContainer";

const Search = () => {
  const [dataList, setDataList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);

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
    setErrorMessage(null);

    if (query.length > 0) {
      try {
        const tracksResponse = await getTrackDetails(query);

        if (tracksResponse) {
          setDataList(tracksResponse);
        } else {
          setErrorMessage("Failed to load track details");
          setDataList([]);
        }
      } catch (error) {
        setErrorMessage("Something went wrong");
        setDataList([]);
      }
    } else {
      setDataList([]);
    }
  };

  const focusHandler = () => {
    setIsSearching(true);
  };

  const renderComponent = () => {
    const dropdownIsVisible =
      isSearching && (dataList.length > 0 || errorMessage?.length > 0);

    if (errorMessage) {
      return (
        <SearchDropdown isDropdownVisible={dropdownIsVisible}>
          <EmptyContainer message={errorMessage} />
        </SearchDropdown>
      );
    } else {
      return (
        <SearchDropdown isDropdownVisible={dropdownIsVisible}>
          <SearchBox
            isActive={isSearching}
            items={dataList}
          />
        </SearchDropdown>
      );
    }
  };

  const debouncedSearchHandler = debounce(searchHandler, 1000);

  return (
    <div id="search-container" className={`${styles["dropdown-content"]}`}>
      <input
        id="track-searcher"
        className={`${styles.searchbar} ${theme === "dark" && styles.dark}`}
        disabled={!isAuthenticated}
        type="text"
        placeholder="Search.."
        onFocus={focusHandler}
        onKeyUp={debouncedSearchHandler}
      />
      {renderComponent()}
    </div>
  );
};

export default Search;
