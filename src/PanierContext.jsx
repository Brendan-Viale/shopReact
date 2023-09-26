import { useState } from "react";
import { createContext } from "react";

export const GlobalContext = createContext(null);

const PanierContext = ({children}) => {
    
    const [data, setData] = useState({
        theme : "light",
        nbProducts : 0,
        listProducts : []
    });

    return (
        <GlobalContext.Provider value={{data,setData}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default PanierContext;