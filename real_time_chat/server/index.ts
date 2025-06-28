import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from './lib/db';
import { Message } from './models/Message';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const onlineUsers: Record<string, Set<string>> = {};

(async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    io.on('connection', (socket) => {
      console.log('🟢 Connected:', socket.id);

      socket.on('join-room', async ({ room, username }) => {
        socket.data.username = username;
        socket.data.room = room;
        socket.join(room);

        if (!onlineUsers[room]) onlineUsers[room] = new Set();
        onlineUsers[room].add(username);

        io.to(room).emit('online-users', Array.from(onlineUsers[room]));
        console.log(`👤 ${username} joined room: ${room}`);

        try {
          const messages = await Message.find({ room }).sort({ createdAt: 1 }).limit(100);
          socket.emit('room-history', messages);
        } catch (err) {
          console.error('❌ Fetch failed:', err);
        }
      });

      socket.on('chat-message', async ({ room, message }) => {
        try {
          const msgDoc = await Message.create({
            room,
            username: socket.data.username,
            message,
          });

          console.log('✅ Saved:', msgDoc);

          io.to(room).emit('chat-message', {
            username: msgDoc.username,
            message: msgDoc.message,
            timestamp: msgDoc.createdAt,
          });
        } catch (err) {
          console.error('❌ Failed to save message:', err);
        }
      });

      socket.on('typing', ({ room }) => {
        socket.to(room).emit('typing', { username: socket.data.username });
      });

      socket.on('disconnect', () => {
        const room = socket.data.room;
        const username = socket.data.username;

        if (room && username && onlineUsers[room]) {
          onlineUsers[room].delete(username);
          if (onlineUsers[room].size === 0) delete onlineUsers[room];
          else io.to(room).emit('online-users', Array.from(onlineUsers[room]));
        }

        console.log('🔴 Disconnected:', socket.id);
      });
    });

    server.listen(3001, () => {
      console.log('🚀 Server running at http://localhost:3001');
    });

  } catch (err) {
    console.error('❌ Connection error:', err);
  }
})();
