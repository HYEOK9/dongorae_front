import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

const lightTheme = {
    baseColor: '#F2F3F5',
    bgColor: '#FFFFFF',
    textColor: '#1a1a1a',
    subTextColor: '#8fa2ff',
    borderColor: '',
    pointColor: '#5772F5'
}

const darkTheme = {
    baseColor: '#1E1F21',
    bgColor: '#292A2D',
    textColor: '#FFFFFF',
    subTextColor: '#9e9e9e',
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

    useEffect(()=>{
        const initialTheme = window?.localStorage.getItem("theme") || 'light';
        setThemeMode(initialTheme);
    })

  
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
            window.localStorage.theme = 'dark';
        }
        else {
            setThemeMode("light")
            window.localStorage.theme = 'light';
        };
        
    }, [themeMode]);
  
  return { themeMode, toggleTheme, themeColorset};
}
