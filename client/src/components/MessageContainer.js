import React from "react";

function MessageContainer(props) {
  return (
    <div className="message-container">
      <h3>{props.title}</h3>
      <p>{props.message}</p>
    </div>
  );
}

export default MessageContainer;