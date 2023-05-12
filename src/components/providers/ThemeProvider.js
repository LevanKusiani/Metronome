import { useState } from "react";
import { ThemeContext } from "../../context/appContext";

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;