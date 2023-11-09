import { useContext } from "react";
import styles from "./Switch.module.css";
import { ThemeContext } from "../../context/appContext";

const Switch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const clickHandler = () => {
    toggleTheme();
  };

  return (
    <div className={`${styles.main}`}>
      <label id="theme-changer" className={`${styles.switch}`}>
      <input
        type="checkbox"
        defaultChecked={theme === "dark" ? true : false}
        onClick={clickHandler}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
    </div>
  );
};

export default Switch;
