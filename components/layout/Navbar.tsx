'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { useCartStore } from '@/lib/cart'

export function Navbar() {
  const { isSignedIn } = useUser()
  const totalItems = useCartStore((s) => s.totalItems())
  const openCart   = useCartStore((s) => s.openCart)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center justify-between px-10 py-5 sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-obsidian/95 backdrop-blur-md border-b border-white/5 shadow-[0_4px_40px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-serif text-xl font-bold tracking-[0.08em] text-pearl group-hover:text-gold transition-colors duration-300">
            EL'S VISION
          </span>
          <span className="text-[9px] tracking-[0.3em] text-gold/60 uppercase font-sans">
            Luxury Fashion
          </span>
        </Link>

        {/* Nav links */}
        <ul className="flex gap-8 list-none">
          {[
            { href: '/shop',  label: 'Collection' },
            { href: '/about', label: 'Our Story'  },
            { href: '/',      label: 'Journal'    },
            { href: '/',      label: 'Contact'    },
          ].map(({ href, label }) => (
            <li key={label}>
              <Link
                href={href}
                className="relative text-[13px] text-pearl/60 hover:text-pearl transition-colors duration-300 tracking-[0.06em] group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-5">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="flex gap-3">
              <SignInButton mode="modal">
                <button className="text-[12px] font-sans border border-white/20 px-4 py-2 rounded-sm text-pearl/70 hover:border-gold hover:text-gold transition-all duration-300">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-[12px] font-sans bg-gold text-obsidian px-4 py-2 rounded-sm hover:bg-gold-light transition-all duration-300 font-medium">
                  Join
                </button>
              </SignUpButton>
            </div>
          )}

          <button
            onClick={openCart}
            className="relative bg-transparent border-none cursor-pointer text-pearl/60 hover:text-gold transition-colors duration-300 text-lg p-1"
            aria-label="Open cart"
          >
            🛍
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 bg-gold text-obsidian text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>
    </>
  )
}
