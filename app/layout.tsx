import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Playfair_Display, Outfit } from 'next/font/google'
import '../styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { Urbanist  } from 'next/font/google'

const urbanist = Urbanist ({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-urbanist',
})

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
  title: "El's Vision — Luxury Fashion",
  description: "Where vision meets elegance. Curated luxury pieces designed for those who dare to be seen.",
  openGraph: {
    title: "El's Vision",
    description: "Where vision meets elegance.",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${outfit.variable} ${playfair.variable} ${urbanist.variable}`}>
        <body>
          <CursorGlow />
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
