import Link from 'next/link'

const links = {
  Shop: [
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Clothing', href: '/shop?filter=clothing' },
    { label: 'Accessories', href: '/shop?filter=accessories' },
    { label: 'Sale', href: '/shop?filter=sale' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Press', href: '/press' },
    { label: 'Careers', href: '/careers' },
  ],
  Support: [
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/10 pt-16 pb-8 px-10 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-4 gap-10 mb-12 relative">
        <div>
          <div className="font-serif text-2xl font-bold mb-1">
            <span className="text-gold">El&apos;s</span>{' '}
            <span className="text-pearl">Vision</span>
          </div>
          <p className="text-[13px] text-mist leading-relaxed mt-3">
            Where style meets vision.
            <br />
            Premium fashion for those who
            <br />
            see the world differently.
          </p>
          <div className="flex gap-3 mt-5">
            {['IG', 'TW', 'TK'].map((s) => (
              <div key={s} className="w-8 h-8 border border-gold/20 rounded-sm flex items-center justify-center text-[10px] text-gold/60 hover:border-gold hover:text-gold transition-all cursor-pointer">
                {s}
              </div>
            ))}
          </div>
        </div>

        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <div className="text-[11px] tracking-widest text-gold uppercase mb-4">{heading}</div>
            <ul className="space-y-2.5">
              {items.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-mist hover:text-pearl transition-colors underline-grow">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gold/10 pt-6 flex justify-between items-center relative">
        <p className="text-[12px] text-mist/50">
          © {new Date().getFullYear()} El&apos;s Vision. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
            <Link key={item} href="#" className="text-[12px] text-mist/50 hover:text-gold transition-colors">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
