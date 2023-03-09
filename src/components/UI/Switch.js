import styles from "./Switch.module.css";

const Switch = (props) => {
    const clickHandler = () => {
        props.onSwitch(!props.isDark);
    }

  return (
    <label className={`${styles.switch}`}>
      <input type="checkbox" onClick={clickHandler} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default Switch;
