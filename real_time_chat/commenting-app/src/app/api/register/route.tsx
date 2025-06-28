// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import { setSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  await connectDB()
  const { firstName, lastName, email, password } = await req.json()

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ firstName, lastName, email, password: hashedPassword })

  setSession(user._id.toString())

  return NextResponse.json({ message: 'Registered successfully' })
}
