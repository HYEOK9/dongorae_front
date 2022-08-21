import React from "react";

import { useTheme } from "../../context/Theme"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ThemeMode = () => {
    const [themeMode, toggleTheme] = useTheme();

    const themeHandler = () => {
        toggleTheme();
        console.log(themeMode);
    }

    console.log(themeMode);
    return (
        <>
        { themeMode === 'light' ? 
                        <LightModeIcon fontSize={"large"}
                                    onClick={() => {themeHandler()}}/> 
                        : <DarkModeIcon fontSize={"large"}
                                    onClick={() => {themeHandler()}}/>}
        </>
    )
}

export default ThemeMode;

