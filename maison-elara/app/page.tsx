import Link from 'next/link'
import { ProductCard } from '@/components/ui/ProductCard'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/ui/CartDrawer'
import { products } from '@/lib/products'

const featured = products.slice(0, 3)
const rest = products.slice(3, 6)

const marqueeItems = [
  "Free shipping over ₦160,000",
  "Premium quality guaranteed",
  "Ethically made",
  "30-day returns",
  "Secured by Paystack",
  "New collection live",
]

export default function HomePage() {
  return (
    <>
      <CartDrawer />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-obsidian -mt-[73px] pt-[73px]">
        {/* Background decorative rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none">
          <div className="absolute inset-0 border border-gold/8 rounded-full animate-spin-slow" />
          <div className="absolute inset-[60px] border border-gold/12 rounded-full animate-counter-spin" />
          <div className="absolute inset-[120px] border border-gold/18 rounded-full animate-spin-slow" style={{ animationDuration: '14s' }} />
          <div className="absolute inset-[180px] bg-gold/5 rounded-full animate-pulse-glow" />
        </div>

        {/* Gold radial glow left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-16 max-w-3xl">
          <div className="opacity-0 animate-fade-up delay-100">
            <span className="section-tag">New Collection — 2025</span>
          </div>

          <h1 className="font-serif text-[5.5rem] font-bold leading-[0.95] text-pearl mb-8 opacity-0 animate-fade-up delay-200">
            Where<br />
            <em className="italic text-gold">Style</em><br />
            Meets Vision
          </h1>

          <p className="text-[15px] text-pearl/60 leading-[1.9] mb-10 max-w-[420px] opacity-0 animate-fade-up delay-300">
            Curated fashion pieces for those who see the world differently.
            Premium quality, ethically sourced, designed to turn heads.
          </p>

          <div className="flex gap-4 opacity-0 animate-fade-up delay-400">
            <Link href="/shop" className="btn-primary">
              Explore Collection
            </Link>
            <Link href="/about" className="btn-ghost">
              Our Story
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex gap-10 mt-16 opacity-0 animate-fade-up delay-500">
            {[
              { num: '500+', label: 'Pieces' },
              { num: '12k+', label: 'Customers' },
              { num: '4.9★', label: 'Rating' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-serif text-2xl font-bold text-gold">{num}</div>
                <div className="text-[11px] text-mist tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating product preview cards */}
        <div className="absolute right-24 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-0 animate-slide-right delay-500">
          {featured.slice(0, 2).map((p, i) => (
            <div key={p.id}
                 className={`${p.bgClass} w-36 h-44 rounded-lg flex items-center justify-center text-4xl border-shimmer card-hover`}
                 style={{ animationDelay: `${0.5 + i * 0.15}s` }}>
              {p.emoji}
            </div>
          ))}
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────── */}
      <div className="overflow-hidden bg-gold py-3.5">
        <div className="marquee-inner flex gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6">
              <span className="text-[11px] tracking-[0.14em] text-obsidian/80 uppercase font-medium">{item}</span>
              <span className="w-1 h-1 rounded-full bg-obsidian/30 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured products ─────────────────────────── */}
      <section className="py-24 px-10 bg-charcoal">
        <div className="text-center mb-14">
          <span className="section-tag opacity-0 animate-fade-up">Curated Picks</span>
          <h2 className="font-serif text-[3rem] font-bold text-pearl mt-1 opacity-0 animate-fade-up delay-100">
            Featured <em className="italic text-gold">this season</em>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* ── About strip ───────────────────────────────── */}
      <section className="bg-obsidian py-24 px-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/8 rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-16 items-center relative max-w-6xl mx-auto">
          <div className="opacity-0 animate-slide-left">
            <span className="section-tag">Our Philosophy</span>
            <h2 className="font-serif text-[3rem] font-bold leading-[1.1] mb-6 text-pearl mt-1">
              Fashion that <em className="italic text-gold">defines</em> you
            </h2>
            <p className="text-[14px] text-pearl/50 leading-[1.9] mb-10">
              At El&apos;s Vision, we curate pieces that don&apos;t just follow trends —
              they set them. Every garment is chosen with intention, sourced
              ethically, and built to elevate your presence.
            </p>
            <div className="flex gap-12">
              {[
                { num: '5+', label: 'Years of vision' },
                { num: '100%', label: 'Quality assured' },
                { num: '12k', label: 'Style icons' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="font-serif text-3xl font-bold text-gold">{num}</div>
                  <div className="text-[11px] text-mist tracking-[0.06em] mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 opacity-0 animate-slide-right">
            {[
              { icon: '✨', label: 'Premium Quality' },
              { icon: '🌍', label: 'Ethically Sourced' },
              { icon: '🎯', label: 'Bold Designs' },
              { icon: '♻️', label: 'Sustainable' },
            ].map(({ icon, label }, i) => (
              <div key={label}
                   className="border-shimmer bg-graphite rounded-lg flex flex-col items-center justify-center p-8 gap-3 aspect-square card-hover"
                   style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="text-3xl animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{icon}</span>
                <span className="text-[11px] text-pearl/50 tracking-[0.08em] text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── More products ─────────────────────────────── */}
      <section className="py-24 px-10 bg-graphite">
        <div className="text-center mb-14">
          <span className="section-tag">The Full Range</span>
          <h2 className="font-serif text-[3rem] font-bold text-pearl mt-1">
            Shop the <em className="italic text-gold">Collection</em>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {rest.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="text-center mt-14">
          <Link href="/shop" className="btn-outline">
            View All Pieces →
          </Link>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────── */}
      <section className="py-20 px-10 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-xl mx-auto text-center relative">
          <span className="section-tag">Stay in the loop</span>
          <h2 className="font-serif text-[2.5rem] font-bold text-pearl mt-1 mb-4">
            Get early access to <em className="italic text-gold">new drops</em>
          </h2>
          <p className="text-pearl/50 text-[14px] mb-8 leading-[1.8]">
            Join 12,000+ style icons who get first access to new collections, exclusive discounts, and style guides.
          </p>
          <div className="flex gap-3">
            <input type="email" placeholder="your@email.com" className="form-input flex-1" />
            <button className="btn-primary whitespace-nowrap">Join the vision</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
