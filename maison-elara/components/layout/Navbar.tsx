'use client'

import Link from 'next/link'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { useCartStore } from '@/lib/cart'
import { useState, useEffect } from 'react'

export function Navbar() {
  const { isSignedIn } = useUser()
  const totalItems = useCartStore((s) => s.totalItems())
  const openCart = useCartStore((s) => s.openCart)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`flex items-center justify-between px-10 py-5 sticky top-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-obsidian/95 backdrop-blur-md border-b border-gold/10 py-4'
        : 'bg-transparent'
    }`}>
      {/* Logo */}
      <Link href="/" className="font-serif text-2xl font-bold tracking-[0.04em] text-pearl group">
        <span className="text-gold transition-all duration-300 group-hover:text-gold-light">El&apos;s</span>
        <span className="ml-2 transition-all duration-300">Vision</span>
      </Link>

      {/* Nav links */}
      <ul className="flex gap-8 list-none">
        {[
          { href: '/shop', label: 'Shop' },
          { href: '/about', label: 'About' },
          { href: '/journal', label: 'Journal' },
          { href: '/contact', label: 'Contact' },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-[13px] text-pearl/60 hover:text-gold transition-colors tracking-[0.06em] underline-grow">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div className="flex gap-3">
            <SignInButton mode="modal">
              <button className="text-[12px] font-sans border border-pearl/20 px-4 py-2 rounded-sm text-pearl/70 hover:text-gold hover:border-gold transition-all duration-300">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn-primary text-[11px] px-5 py-2">
                Join
              </button>
            </SignUpButton>
          </div>
        )}

        <button
          onClick={openCart}
          className="relative bg-transparent border-none cursor-pointer text-pearl/60 hover:text-gold transition-colors text-lg p-1"
          aria-label="Open cart"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-gold text-obsidian text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold animate-pulse-glow">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
