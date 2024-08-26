import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Update this URL to the URL of your deployed Express server
// const socket = io('https://nodejs-production-9f78.up.railway.app'); 
const socket = io('http://localhost:3000'); 

const ChatApp = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  
  useEffect(() => {
    socket.on('message', ({ roomId, username, message }) => {
      setChat(prevChat => [...prevChat, { roomId, username, message }]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const joinRoom = () => {
    socket.emit('joinRoom', roomId, username);
  };

  const leaveRoom = () => {
    socket.emit('leaveRoom', roomId, username);
  };

  const sendMessage = () => {
    socket.emit('sendMessage', { roomId, username, message });
    setMessage('');
  };

  return (
    <div>
      <span>Chat Room</span>
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={leaveRoom}>Leave Room</button>
      <div>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div>
        <span>Chat Messages</span>
        {chat.map((chatMessage, index) => (
          <div key={index}>
            <strong>{chatMessage.username}:</strong> {chatMessage.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatApp;
