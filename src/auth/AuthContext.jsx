import { createContext, useCallback, useState } from "react";
import { fetchNoToken } from "../helpers/fetch";

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


    const login = async (email, password) => {
        const response = await fetchNoToken('login', {email, password}, 'POST' );

        // Save on localstorage if credentials are correct
        if(response.ok){
            localStorage.setItem('tokenChat', response.token);
            const user = response.user;
            setAuth({
                uid: user.uid,
                cheking: false,
                logged: true,
                userName: user.name,
                email: user.email
            })
        }    
        
        return response.ok;
    }

    const register = async (name, email, password) => {
        const response = await fetchNoToken('login/new-user', { name, email, password }, 'POST');
        if(response.ok !== false){//undefinied
            localStorage.setItem('tokenChat', response.token);
            const user = response.user;
            setAuth({
                uid: user.uid,
                cheking: false,
                logged: true,
                userName: user.name,
                email: user.email
            })
        }
        return response.ok;        
    }

    const verifyToken = useCallback( ()=> {

    }, [] );

    const logout = () => {

    }

    return (
        <AuthContext.Provider
            value={{
                auth,
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
