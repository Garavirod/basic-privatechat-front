import { createContext, useCallback, useState } from "react";
import { fetchNoToken, fetchToken } from "../helpers/fetch";

export const AuthContext =  createContext();


const initialState = {
    uid: null,
    checking: true,
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
                checking: false,
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
                checking: false,
                logged: true,
                userName: user.name,
                email: user.email
            })
        }
        return response.ok;        
    }

    const verifyToken = useCallback( async ()=> {
        const token = localStorage.getItem('tokenChat') || null;
        // If there not exist token on local storage
        if(token === null){
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                userName: null,
                email: null
            })

            return false;
        }
        
        // Verify if token is still valid
        const response = await fetchToken('login/renew');
        console.log(response);

        if(response.ok !== false){
            localStorage.setItem('tokenChat', response.token);
            const user = response.user;
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                userName: user.name,
                email: user.email
            });
            console.log('Logged!');
            return true;  
        }else{
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                userName: null,
                email: null
            })

            return false;
        }
        
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
