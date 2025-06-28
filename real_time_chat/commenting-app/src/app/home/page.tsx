'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const joinRoom = () => {
    if (!roomName.trim() || !username.trim()) {
      return alert('Enter room name and username');
    }
    router.push(`/chat/${roomName}?username=${username}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2"
        placeholder="Username"
      />
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="border p-2"
        placeholder="Room Name"
      />
      <button
        onClick={joinRoom}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Join Chat Room
      </button>
    </div>
  );
}
