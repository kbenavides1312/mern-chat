import {createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({Children}){
const[username, setUsername] = useState(null);
const [id, setId] = useState(null);
    return(
        <UserContext.Provider value={{username, setUsername, id, setId}}>
            {Children}
        </UserContext.Provider>
    );
} 