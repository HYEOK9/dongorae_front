import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

const commonTheme = {
  pointColor: '#5772F5',
}


const lightTheme = {
    ...commonTheme,
    baseColor: '#F2F3F5',
    bgColor: '#FFFFFF',
    textColor: '#1a1a1a',
    subTextColor: '#8fa2ff',
    pTextColor: '#2b2b2b',
    borderColor: '',
    subPointColor: '#c9d3ff'
}

const darkTheme = {
    ...commonTheme,
    baseColor: '#1E1F21',
    bgColor: '#292A2D',
    textColor: '#e8eaed',
    subTextColor: '#9e9e9e',
    pTextColor: '#cccccc',
    borderColor: '',
    subPointColor: '#1E1F21'
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
