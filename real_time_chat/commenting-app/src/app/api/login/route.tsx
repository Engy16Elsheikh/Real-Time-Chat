
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import { setSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  await connectDB()
  const { email, password } = await req.json()

  const user = await User.findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  setSession(user._id.toString())

  return NextResponse.json({ message: 'Login successful' })
}
