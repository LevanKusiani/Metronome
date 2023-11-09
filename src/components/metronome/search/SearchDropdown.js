import React from "react";
import styles from "./SearchDropdown.module.css";

const SearchDropdown = ({ isDropdownVisible, children }) => {
  return (
    <div
      id="search-block"
      className={`${styles["search-options"]} ${
        isDropdownVisible && styles["active-dropdown"]
      }`}
    >
      {children}
    </div>
  );
};

export default SearchDropdown;
