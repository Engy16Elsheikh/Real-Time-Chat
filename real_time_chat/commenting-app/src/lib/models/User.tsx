// src/lib/models/User.ts
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
})

export default mongoose.models.User || mongoose.model('User', userSchema)
