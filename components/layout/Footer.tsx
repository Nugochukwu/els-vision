import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-smoke border-t border-white/5 pt-16 pb-8 px-10">
      <div className="grid grid-cols-4 gap-10 mb-12">
        <div>
          <div className="font-serif text-2xl font-bold text-pearl mb-1">EL'S VISION</div>
          <div className="text-[10px] tracking-[0.3em] text-gold/60 uppercase mb-4">Luxury Fashion</div>
          <p className="text-[13px] text-pearl/40 leading-relaxed">
            Where vision meets elegance.<br />
            Curated for those who dare to be seen.
          </p>
        </div>
        {[
          { heading: 'Shop', items: [{ l: 'New Arrivals', h: '/shop' }, { l: 'All Pieces', h: '/shop' }, { l: 'Accessories', h: '/shop' }, { l: 'Sale', h: '/shop' }] },
          { heading: 'Brand',  items: [{ l: 'About Us', h: '/about' }, { l: 'Sustainability', h: '/' }, { l: 'Press', h: '/' }, { l: 'Careers', h: '/' }] },
          { heading: 'Support', items: [{ l: 'Shipping', h: '/' }, { l: 'Returns', h: '/' }, { l: 'FAQ', h: '/' }, { l: 'Contact', h: '/' }] },
        ].map(({ heading, items }) => (
          <div key={heading}>
            <div className="text-[11px] tracking-widest text-gold uppercase mb-4 font-medium">{heading}</div>
            <ul className="space-y-2">
              {items.map(({ l, h }) => (
                <li key={l}>
                  <Link href={h} className="text-[13px] text-pearl/40 hover:text-pearl transition-colors duration-300">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 pt-6 flex justify-between items-center">
        <p className="text-[12px] text-pearl/20">© {new Date().getFullYear()} El's Vision. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Cookies'].map((t) => (
            <Link key={t} href="/" className="text-[12px] text-pearl/20 hover:text-pearl/60 transition-colors">{t}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
