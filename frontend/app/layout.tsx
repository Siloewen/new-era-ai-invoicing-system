import type { Metadata } from 'next'
import { QueryProvider } from '../components/providers/QueryProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'New Era AI - Invoicing System',
  description: 'Professional invoicing system for automated client billing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}