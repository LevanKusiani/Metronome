import { useContext } from "react";
import styles from "./Popup.module.css";
import { ThemeContext } from "../../context/appContext";

const Popup = ({ isOpen, onClose, children }) => {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={`${styles.backdrop} ${isOpen ? styles.open : ''}`} onClick={onClose}></div>
      <div className={`${styles.popup} ${theme === "dark" && styles.dark}`}>
        <div className={`${styles["popup-content"]}`}>{children}</div>
        <svg className={`${styles["popup-close"]} ${theme === "dark" && styles.dark}`} onClick={onClose}  viewBox="-10 -10 50 50" width="40px" height="40px"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
      </div>
    </>
  );
};

export default Popup;
