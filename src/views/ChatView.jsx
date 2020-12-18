import React from "react";
import { InboxPeople } from "../components/InboxPeople";
import { Message } from "../components/Messages";
// css
import "../css/chat.css";

export const ChatView = () => {
  return (
    <div>
      <div className="messaging">
        <div className="inbox_msg">
          <InboxPeople />
          <Message/>
        </div>
      </div>
    </div>
  );
};
