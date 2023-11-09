import { useContext, useState } from "react";
import Login from "./Login";
import Popup from "../Popup";
import { AuthContext, ThemeContext } from "../../../context/appContext";
import styles from "./Auth.module.css";

const Auth = () => {
  const { isAuthenticated, userInfo } =
    useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownShown, setisDropdownShown] = useState(false);

  const handleComponentToggle = () => {
    console.log("Button clicked!");
  };

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  const profileClickHandler = (e) => {
    setisDropdownShown(true);
  };

  const renderComponent = () => {
    if (isAuthenticated) {
      return (
        <div className={styles.dropdown}>
          <button
            onClick={profileClickHandler}
            className={`${styles["auth-button"]}
            ${theme === "dark" && styles.dark}`}
          >
            {userInfo.name}
          </button>
          <div
            className={`${styles["dropdown-content"]} 
            ${isDropdownShown && styles.show}
            ${theme === "dark" && styles.dark}`}
          >
            <a href="#home">Log out</a>
            <a href="#about">Change theme</a>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <button className={`${styles["auth-button"]}
          ${theme === "dark" && styles.dark}`} onClick={openHandler}>
            Sign In
          </button>
          <Popup isOpen={isOpen} onClose={closeHandler}>
            <Login
              onHandleClick={handleComponentToggle}
              onClose={closeHandler}
            />
          </Popup>
        </>
      );
    }
  };

  return <div>{renderComponent()}</div>;
};

export default Auth;
