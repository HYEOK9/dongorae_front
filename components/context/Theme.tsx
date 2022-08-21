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
    baseColor: '#1E1F21',
    bgColor: '#292A2D',
    textColor: '#FFFFFF',
    borderColor: '',
    pointColor: '#5772F5'
}

type propType = {
    children: React.ReactNode;
};

const ThemeContext = createContext({
    themeMode: 'light',
    setThemeMode: (themeMode: string) => {},
    themeColorset: null,
});

export const ThemeProvider = ({children}: propType) => {
    const [themeMode, setThemeMode] = useState('light');
    const themeColorset = themeMode === 'light' ? lightTheme : darkTheme;
  
    return(
      <ThemeContext.Provider value={{ themeMode, setThemeMode}}>
        <StyledProvider theme={themeColorset}>
          { children }
        </StyledProvider>      
      </ThemeContext.Provider>
    )
  }
  
export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    const { themeMode, setThemeMode } = context;
    const themeColorset = themeMode === 'light' ? lightTheme : darkTheme;

    const toggleTheme = useCallback(() => {
        if (themeMode === "light") {
        setThemeMode("dark");
        }
        else {
        setThemeMode("light")
        };
        console.log(themeMode);
        
    }, [themeMode]);
  
  return { themeMode, toggleTheme, themeColorset};
}
