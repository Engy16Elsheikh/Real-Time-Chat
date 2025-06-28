'use client'
import { usePathname } from 'next/navigation'
import { LogoutButton } from './logoutButton'

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isAuthPage = pathname === '/' || pathname === '/sign_up'

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && (
        <nav className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-lg font-semibold text-indigo-600">Realtime Chat</h1>
          <LogoutButton />
        </nav>
      )}
      <main className="flex-1 flex items-center justify-center">{children}</main>
    </div>
  )
}
