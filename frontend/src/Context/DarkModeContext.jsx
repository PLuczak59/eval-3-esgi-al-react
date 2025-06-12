import { createContext, useState } from 'react';

export const DarkModeContext = createContext();

export const DarkModeContextProvider = 
({children}) => {
    let config = localStorage.getItem('darkmode');
    const [darkMode, setDarkMode] = useState(config && config === 'true' ? true : false);

    function updateDarkMode(value) {
        setDarkMode(value);
        localStorage.setItem('darkmode', value);
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode: updateDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}