import { useState } from "react";
import { AuthContext } from "../../context/appContext";
import { login } from "../../clients/easyApiClient";
import jwtDecode from "jwt-decode";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const loginUser = async (email, password) => {
    try {
      const loginResponse = await login(email, password);

      if (!loginResponse.success) {
        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      const decodedToken = jwtDecode(loginResponse.token);

      setUserInfo({
        email: decodedToken.email,
        name: decodedToken.name,
      });

      setIsAuthenticated(true);

      return {
        success: true,
        message: "Authenticated successfully!",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("AuthToken");
    setUserInfo(null);

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userInfo, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
