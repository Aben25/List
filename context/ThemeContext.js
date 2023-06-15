import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const lightTheme = {
        colors: {
          background: '#ffffff',
          primary: '#000000',
          secondary: '#7f8c8d',
          textOnPrimary: '#ffffff',
          textOnSecondary: '#000000',
          black: '#000000',
          white: '#ffffff',
        },
        fonts: {
          regular: 'Arial, sans-serif',
          bold: 'Arial Bold, sans-serif',
        },
        switch: {
            color: '#000000',
            backgroundColor: '#ffffff',
        },
      };
    
      const darkTheme = {
        colors: {
          background: '#000000',
          primary: '#ffffff',
          secondary: '#ecf0f1',
          textOnPrimary: '#000000',
          textOnSecondary: '#ffffff',
        },
        fonts: {
          regular: 'Arial, sans-serif',
          bold: 'Arial Bold, sans-serif',
        },
        switch: {
            color: '#ffffff',
            backgroundColor: '#000000',
        },
    
      };

export const ThemeProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  
  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme: isLightTheme ? lightTheme : darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

