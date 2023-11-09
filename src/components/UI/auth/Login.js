import { useContext, useReducer, useState } from "react";
import styles from "./Login.module.css";
import { AuthContext, ThemeContext } from "../../../context/appContext";

const initialState = {
  email: "",
  password: "",
};

function formReducer(state, action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

const Login = ({ onHandleClick, onClose }) => {
  const { isAuthenticated, loginUser, logoutUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [responseError, setResponseError] = useState({
    isShown: false,
    message: null,
  });
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const handleClick = () => {
    onHandleClick(true);
  };

  const handleFieldChange = (field, value) => {
    if (value) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    } else {
      const [firstChar, ...rest] = field;
      const fieldName = firstChar.toUpperCase() + rest.join("");

      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `${fieldName} is required`,
      }));
    }

    dispatch({ field, value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    const errors = {};
    const passwordError = validatePassword(formState.password);

    if (formState.email === "") {
      errors.email = "Email is required";
    }

    if (passwordError && passwordError.length > 0) {
      errors.password = passwordError;
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const loginResponse = await loginUser(
        formState.email,
        formState.password
      );

      if (!loginResponse.success) {
        setResponseError({ isShown: true, message: loginResponse.message });

        return;
      }

      onClose();
      setResponseError({ isShown: false, message: null });
      dispatch({ field: "email", value: "" });
      dispatch({ field: "password", value: "" });
    }
  };

  const validatePassword = (value) => {
    if (value === "") {
      return "Password is required";
    } else if (value.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    return null;
  };

  return (
    <div className={styles.login}>
      <h2
        className={`${styles["login-header"]} ${
          theme === "dark" && styles.dark
        }`}
      >
        Sign into your account
      </h2>
      {responseError.isShown && (
        <span className={styles["error-message"]}>{responseError.message}</span>
      )}
      <form
        className={`${styles["login-form"]} ${theme === "dark" && styles.dark}`}
        onSubmit={handleSubmit}
      >
        <div
          className={`${styles["form-field"]} ${
            theme === "dark" && styles.dark
          }`}
        >
          <input
            className={`${styles.input}
              ${theme === "dark" && styles.dark}
              ${validationErrors.email ? styles["input-error"] : ""}`}
            type="email"
            placeholder="Enter your Email"
            value={formState.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />
          {validationErrors.email && (
            <span className={styles["error-message"]}>
              {validationErrors.email}
            </span>
          )}
        </div>
        <div className={styles["form-field"]}>
          <input
            className={`${styles.input}
              ${theme === "dark" && styles.dark}
              ${validationErrors.password ? styles["input-error"] : ""}`}
            type="password"
            placeholder="Enter your Password"
            value={formState.password}
            minLength="8"
            onChange={(e) => handleFieldChange("password", e.target.value)}
          />
          {validationErrors.password && (
            <span className={styles["error-message"]}>
              {validationErrors.password}
            </span>
          )}
        </div>
        <button
          className={`${styles["submit-button"]} ${
            theme === "dark" && styles.dark
          }`}
          type="submit"
        >
          Sign In
        </button>
        <p
          className={`${styles["extra-info"]} ${
            theme === "dark" && styles.dark
          }`}
        >
          Not a member yet?{" "}
          <span className={styles["link-text"]} onClick={handleClick}>
            Sign Up.
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
