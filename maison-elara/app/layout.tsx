import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Playfair_Display, Outfit } from 'next/font/google'
import '../styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "El's Vision — Where Style Meets Vision",
  description: "Curated fashion pieces designed for those who see the world differently. Premium quality, ethically made.",
  openGraph: {
    title: "El's Vision",
    description: "Where Style Meets Vision",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
        <body>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
