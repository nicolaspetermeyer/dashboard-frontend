import { useEffect, useState } from "react";
import "../App.css";

const LiveStream = () => {
  //const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3002");
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
