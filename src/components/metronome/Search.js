import { useState } from "react";
import styles from "./Search.module.css";

const localData = [
  { id: 1, band: "Red hot chili peppers", song: "charlie", bpm: 106 },
  { id: 2, band: "Interpol", song: "obstacle 1", bpm: 90 },
  { id: 3, band: "The Beatles", song: "Here comes the sun", bpm: 67 },
];

const Search = () => {
  const [dataList, setDataList] = useState([]);
  
  const createItems = (data) => {
    let list = [];

    data.forEach((element) => {
      list.push(<div key={Math.random().toString()}>{element.band} - {element.song}</div>);
    });

    return list;
  };

  const searchHandler = (e) => {
    const query = e.target.value.trim();

    if (query.length > 0) {
      setDataList(localData.filter((item) => 
        item.song.toLowerCase().includes(query.toLowerCase()) ||
        item.band.toLowerCase().includes(query.toLowerCase())));

      document
        .getElementById("search-block")
        .classList.add(`${styles["active-dropdown"]}`);
    } else {
      document
        .getElementById("search-block")
        .classList.remove(`${styles["active-dropdown"]}`);
    }
  };

  return (
    <div className={`${styles["dropdown-content"]}`}>
      <input type="text" placeholder="Search.." onKeyUp={searchHandler} />
      <div id="search-block" className={`${styles["search-options"]}`}>
        {createItems(dataList)}
      </div>
    </div>
  );
};

export default Search;
