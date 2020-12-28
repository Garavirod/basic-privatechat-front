import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SideBarChatItem } from "./SideBarChatItem";

export const SideBar = () => {
  const { chatState } = useContext( ChatContext );
  const { auth } = useContext( AuthContext );
  return (
    <div className="inbox_chat">    
        {
            chatState.users.filter((u)=> u.uid !== auth.uid).map( (item) => <SideBarChatItem 
            user={item}
            key={item.uid} /> )
        }        
      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};
