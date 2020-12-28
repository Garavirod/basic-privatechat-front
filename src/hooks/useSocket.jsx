import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {
    
    const [socket, setSocket] = useState(null);
    const [ online, setOnline ] = useState(false);


    // Connect and disconnect manually

    const disconnectSocket = useCallback( ()=>{
        socket?.disconnect();
    }, [socket]);

    const connectSocket = useCallback( ()=>{

        const token = localStorage.getItem('tokenChat');

        const tempSocket = io.connect( serverPath, {
            transports: ['websocket'], //It always matain connection
            autoConnect:true, //It always creates a new connect when it be called.
            forceNew:true,
            query:{ //By url 
                'x-token':token
            }
        } );
        setSocket(tempSocket);
    }, [serverPath]);



    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        socket,
        connectSocket,
        disconnectSocket,
        online
    }
}