import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://engyelsheikh16:nodejs_123@learn-mongo-db.awaze.mongodb.net/chat_app';

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'chat_app', 
    }).then((conn) => conn);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
