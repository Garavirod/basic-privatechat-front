import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

export const SendMessage = () => {

  const [message, setMessage] = useState('');
  const {socket} = useContext(SocketContext);
  const {auth} = useContext(AuthContext);
  const {chatState} = useContext(ChatContext);

  const handleChange = ({target}) => {
    setMessage(target.value);
  }

  const onSubmitMessage = (event) =>{
    event.preventDefault();
    if(message !== ''){
      console.log(message);
      setMessage('');
      socket.emit('personal-message', {
        from:auth.uid,
        to: chatState.activeChat,
        message: message
        
      });


    }
  }

  return (
    <form onSubmit={onSubmitMessage}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input 
            type="text" 
            className="write_msg" 
            placeholder="Mensaje..." 
            value={message}
            name="message"
            onChange={ handleChange }
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
