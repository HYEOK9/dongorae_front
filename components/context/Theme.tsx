import React, { createContext, useContext, useState, useCallback } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

const lightTheme = {
    baseColor: '#F2F3F5',
    bgColor: '#FFFFFF',
    textColor: '#1a1a1a',
    borderColor: '',
    pointColor: '#5772F5'
}

const darkTheme = {
    baseColor: '',
    bgColor: '',
    textColor: '',
    borderColor: '',
    pointColor: ''
}
type propType = {
    children: React.ReactNode;
};

const ThemeContext = createContext({
    themeMode: 'light',
    setThemeMode: (themeMode: string) => {}
});

export const ThemeProvider = ({children}: propType) => {
    const [themeMode, setThemeMode] = useState('light');
    const themeObject = themeMode === 'light' ? lightTheme : darkTheme;
  
    return(
      <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
        <StyledProvider theme={themeObject}>
          { children }
        </StyledProvider>      
      </ThemeContext.Provider>
    )
  }
  
export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    const { themeMode, setThemeMode } = context;

    const toggleTheme = useCallback(() => {
        if (themeMode === "light") {
        setThemeMode("dark");
        }
        else {
        setThemeMode("light")
        };
        console.log(themeMode);
        
    }, [themeMode]);
  
  return [ themeMode, toggleTheme];
}
