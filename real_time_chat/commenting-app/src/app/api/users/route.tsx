import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export async function GET() {
  await connectDB()
  const users = await User.find({}, '_id email firstName lastName')
  return NextResponse.json(users)
}
