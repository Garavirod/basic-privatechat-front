import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'
import { AuthContext } from '../auth/AuthContext';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
    const {auth} = useContext( AuthContext );
    // Socket instance
    const { 
        socket, 
        online, 
        connectSocket, 
        disconnectSocket 
    } = useSocket('http://localhost:5000');

    // Connect when user is logged
    useEffect(()=>{
        if(auth.logged){
            connectSocket();
        }        
    },[auth, connectSocket]);

    // Disconnect when user is not logged
    useEffect(()=>{
        if(!auth.logged){
            disconnectSocket();
        }        
    },[auth, disconnectSocket]);
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}