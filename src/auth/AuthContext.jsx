import { createContext, useCallback, useState } from "react";

export const AuthContext =  createContext();


const initialState = {
    uid: null,
    cheking: true,
    logged: false,
    userName: null,
    email: null
}

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(initialState);


    const login = () => {

    }

    const register = () => {

    }

    const verifyToken = useCallback( ()=> {

    }, [] );

    const logout = () => {

    }

    return (
        <AuthContext.Provider
            value={{
                login,
                register,
                verifyToken ,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
