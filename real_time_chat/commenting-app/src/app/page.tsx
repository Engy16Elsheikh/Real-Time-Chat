'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push('/home')
    } else {
      const data = await res.json()
      alert(data.error || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl mb-4 font-bold">Login</h1>
      <form onSubmit={handleLogin}>
        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full px-5 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full px-5 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
/>

<button
  type="submit"
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-full shadow-md transition-all"
>
  Login
</button>

      </form>
      <p className="mt-4 text-sm">
        Don't have an account?{' '}
        <Link href="/sign_up" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  )
}
