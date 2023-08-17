import React, { useState, useEffect } from 'react';

function MessageFeed() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://172.23.4.80/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

const sendMessage = async () => {
  try {
    const response = await fetch('http://172.23.4.80/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: message })
    });


    if (response.ok) {
      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
      setMessage('');
    } else {
      console.error('Error sending message:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const clearMessages = async () => {
  try {
    const response = await fetch('http://172.23.4.80/api/messages/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setMessages([]); // Clear the messages locally
    } else {
      console.error('Failed to clear messages');
    }
  } catch (error) {
    console.error('Error clearing messages:', error);
  }
};

useEffect(() => {
  fetchMessages();

  const interval = setInterval(fetchMessages, 2000);

  return () => clearInterval(interval)
}, []);

return (
    <div>
      <div>
        {/* <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        /> */}
        {/* <button onClick={sendMessage}>Send Message</button> */}
        <button onClick={fetchMessages}> Reload Messages</button>
        <button onClick={clearMessages}> Clear Messages</button>
      </div>
      <div>
        <h2>Message Feed</h2>
        <ul>
        {messages.slice().reverse().map((msg) => (
            <li key={msg.id}>
              <p>{msg.content}</p>
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default MessageFeed;