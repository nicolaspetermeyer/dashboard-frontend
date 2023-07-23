import { useEffect, useState } from "react";
import MessageContainer from "./MessageContainer";
import "../App.css";

const MessageStream = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    const eventSource = new EventSource("http://localhost:3001/mock");
=======
    //const eventSource = new EventSource('http://localhost:3001/messages');
    const eventSource = new EventSource("http://localhost:3500/data");
>>>>>>> a5899e5466758f2f5f03f2c5a797933c4ee658e5
    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div className="message-stream">
      <h2>Nachrichten</h2>
      <ul>
        {messages.map((message, index) => (
          <li>
            <MessageContainer
              key={index}
              title={`Message ${index + 1}`}
              message={message}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageStream;
