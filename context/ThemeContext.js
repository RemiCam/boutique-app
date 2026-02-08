import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const lightTheme = {
  background: '#f0f9ff',
  cardBackground: '#ffffff',
  text: '#003366',
  textSecondary: '#555',
  primary: '#003366',
  secondary: '#005580',
  error: '#ff0000',
};

export const darkTheme = {
  background: '#1a1a2e',
  cardBackground: '#16213e',
  text: '#e9f5f9',
  textSecondary: '#a0c4d4',
  primary: '#4a90e2',
  secondary: '#6db3f2',
  error: '#ff6b6b',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);