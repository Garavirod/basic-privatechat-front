import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchToken } from "../helpers/fetch";
import { scrollBottom } from "../helpers/scrollMessages";
import { types } from '../types/types';

export const SideBarChatItem = (props) => {
  const {user} = props;
  const { chatState, dispatch } = useContext( ChatContext );
  // Opens chat box 
  const openChatBox = async () => {
    dispatch({
      type: types.activeChat,
      payload: user.uid
    })
    // Load messages
    const resp = await fetchToken(`messages/${ user.uid }`); //user is user clicked
    dispatch({
      type: types.loadMessages,
      payload: resp.mes
    });

    // Move scroll
    scrollBottom('messages');

  }

  return (
    <div className={`chat_list ${user.uid === chatState.activeChat && 'active_chat'}`} 
      onClick={openChatBox}>
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>
          {
            (user.online)?
            <span className="text-success">Online</span>
            :
            <span className="text-danger">Offline</span>
          }
        </div>
      </div>
    </div>
  );
};
