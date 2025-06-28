// src/lib/session.ts
import { NextResponse } from 'next/server'

export const setSession = (userId: string) => {
  const res = NextResponse.json({ message: 'Session set' })
  res.cookies.set('session_user', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
  return res
}

export const clearSession = () => {
  const res = NextResponse.json({ message: 'Session cleared' })
  res.cookies.delete('session_user')
  return res
}
