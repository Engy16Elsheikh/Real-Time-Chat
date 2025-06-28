
import './globals.css'
import { LogoutButton } from '@/components/logoutButton'
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-[#7f7fd5] via-[#86a8e7] to-[#91eae4] min-h-screen">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
