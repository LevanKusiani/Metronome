import { useContext } from "react";
import styles from "./EmptyContainer.module.css";
import { ThemeContext } from "../../context/appContext";

const EmptyContainer = ({ message }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles["search-empty"]} ${theme === "dark" && styles.dark}`}
    >
      <h5>{message}</h5>
    </div>
  );
};

export default EmptyContainer;