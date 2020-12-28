import React, { useContext } from "react";
import { ChatSelct } from "../components/ChatSelect";
import { InboxPeople } from "../components/InboxPeople";
import { Message } from "../components/Messages";
import { ChatContext } from "../context/chat/ChatContext";
// css
import "../css/chat.css";

export const ChatView = () => {
  const { chatState } = useContext(ChatContext);
  return (
    <div>
      <div className="messaging">
        <div className="inbox_msg">
          <InboxPeople/>
          {
            (chatState.activeChat)              
            ?<Message />
            :<ChatSelct/>
          }
        </div>
      </div>
    </div>
  );
};
