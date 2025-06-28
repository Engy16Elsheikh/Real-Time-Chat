'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useParams, useSearchParams } from 'next/navigation';

const socket = io('http://localhost:3001');

export default function ChatRoomPage() {
  const { roomName } = useParams() as { roomName: string };
  const searchParams = useSearchParams();
  const username = searchParams.get('username') || 'Anonymous';

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!roomName) return;

    socket.emit('join-room', { room: roomName, username });

    socket.on('room-history', (history: { username: string, message: string }[]) => {
      setMessages(history);
    });

    socket.on('chat-message', ({ username, message }) => {
      setMessages((prev) => [...prev, { username, message }]);
    });

    socket.on('typing', ({ username }) => {
      setTypingUser(username);
      const timeout = setTimeout(() => setTypingUser(null), 2000);
      return () => clearTimeout(timeout);
    });

    socket.on('online-users', (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('room-history');
      socket.off('chat-message');
      socket.off('typing');
      socket.off('online-users');
    };
  }, [roomName]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat-message', { room: roomName, message });
      setMessage('');
    }
  };

  const handleTyping = () => {
    socket.emit('typing', { room: roomName });
  };
return (
  <div className="chat-container">
    <div className="chat-main">
      <div className="chat-header">
        <h2>Room: {roomName}</h2>
        <p>Logged in as: {username}</p>
        <p>Online: {onlineUsers.join(', ')}</p>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.username === username ? 'sent' : 'received'}`}
          >
            {msg.username !== username && (
              <div className="text-sm font-semibold mb-1">{msg.username}</div>
            )}
            {msg.message}
          </div>
        ))}
        {typingUser && typingUser !== username && (
          <div className="message received text-sm italic text-gray-500">
            {typingUser} is typing...
          </div>
        )}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          disabled={!message.trim()}
        >
          Send
        </button>
      </div>
    </div>
  </div>
);

}

