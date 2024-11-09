import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"], 
  withCredentials: true
});

const Chat = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const currentUserId = state?.currentUserId;
  const recipientId = state?.recipientId;

  useEffect(() => {
    if (!currentUserId || !recipientId) {
      console.error("Chat component missing required state data");
      navigate('/');
    }
  }, [currentUserId, recipientId, navigate]);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch chat history
  useEffect(() => {
    if (!currentUserId || !recipientId) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/messages/${currentUserId}/${recipientId}`,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMessages(Array.isArray(data) ? data : []);
        } else {
          console.error("Failed to fetch messages:", response.statusText);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [currentUserId, recipientId]);

  //to display new messages in the moment
   useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      if (
        (newMessage.senderId === currentUserId && newMessage.recipientId === recipientId) ||
        (newMessage.senderId === recipientId && newMessage.recipientId === currentUserId)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [currentUserId, recipientId]);

  //to send messages
  const sendMessage = (content) => {
    const senderId = localStorage.getItem("userId");
    
    if (!senderId || !recipientId) {
      console.error("Invalid sender or recipient ID");
      return;
    }

    const messageData = {
      senderId,
      recipientId,
      content,
      timestamp: new Date().toISOString(),
    };

    // Emit the message using socket
    socket.emit("send_message", messageData);
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.senderId === currentUserId ? 'Me' : 'Them'}:</b> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage(message)}
        placeholder="Type a message..."
      />
      <button onClick={() => sendMessage(message)}>Send</button>
    </div>
  );
};

export default Chat;

