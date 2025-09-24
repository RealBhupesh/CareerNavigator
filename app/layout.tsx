import type { Metadata } from 'next'
import './globals.css'

export const metadata = {
  title: 'Anushka Career Navigator',
  description: 'Next.js + Flask backend',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
