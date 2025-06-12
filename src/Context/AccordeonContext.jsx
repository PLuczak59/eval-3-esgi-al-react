import { createContext, useState } from 'react';

export const AccordeonContext = createContext();

export const AccordeonContextProvider = 
({children}) => {
    const [isActive, setisActive] = useState(false);



    return (
        <AccordeonContextProvider.Provider value={{ isActive, setisActive }}>
            {children}
        </AccordeonContextProvider.Provider>
    )
}