import { useState } from "react";
import { ThemeContext } from "../../context/appContext";
import { METRONOME_CONFIG } from "../../constants/metronomeConfig";

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem(METRONOME_CONFIG.THEME_STORAGE_KEY) ?? METRONOME_CONFIG.DEFAULT_THEME);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    
    localStorage.setItem(METRONOME_CONFIG.THEME_STORAGE_KEY, newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;