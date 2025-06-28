import mongoose, { Schema, model, models } from 'mongoose';

const messageSchema = new Schema({
  room: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
}, {
  timestamps: true,
});

export const Message = models.Message || model('Message', messageSchema);
