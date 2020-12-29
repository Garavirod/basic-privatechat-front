import React from "react";
import { hourMonthMoment } from "../helpers/timeMessage";

export const OutgoingMessage = ( props ) => {
  const { message:msg } = props;
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{msg.message}</p>
        <span className="time_date"> { hourMonthMoment(msg.createdAt) } </span>
      </div>
    </div>
  );
};
