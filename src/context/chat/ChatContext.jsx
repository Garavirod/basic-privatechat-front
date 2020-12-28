import { createContext, useReducer } from "react";
import { ChatReducer } from "./ChatReducer";

export const ChatContext = createContext();

const iniialState = {
    uid:'',
    activeChat:null, //User wich message want to be sent
    users:[], //users bdd list
    messages:[] //choosen chat
};


export const ChatProvider = ({children}) =>{

    const [chatState,dispatch] = useReducer(ChatReducer,iniialState);

    return(
        <ChatContext.Provider 
            value={{chatState,dispatch}}
        >
            {children}
        </ChatContext.Provider>

    )
}