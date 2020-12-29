import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { types } from '../types/types';

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

    const { dispatch } = useContext(ChatContext);

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


    // hear all users's changes
    useEffect(()=>{
        socket?.on('lista-users', (users)=>{
            dispatch({
                type: types.usersLoadded,
                payload:users,
            })
        });
    },[socket, dispatch]);

    // Here personal messages
    useEffect(()=>{
        socket?.on('personal-message', (message)=>{            
            // dispatch action
            dispatch({
                type: types.newMessage,
                payload: message
            });
            // Dispatch de person
            // Move scroll to the end
        });
    },[socket, dispatch]);


    

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}