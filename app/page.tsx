import Link from 'next/link'
import { ProductCard } from '@/components/ui/ProductCard'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/ui/CartDrawer'
import { products } from '@/lib/products'
import chubiImage from '../public/assets/images/chubi1.png'

const featured = products.slice(0, 3)
const rest = products.slice(3, 6)

const marqueeItems = [
  'SUSTAINABLE',
  'ETHICAL',
  'TIMELESS',
  'LUXURY',
  'CURATED',
  'Stylish',
  'Unique',
  'Artistic',
  
]

export default function HomePage() {
  return (
    <>
      <CartDrawer />

      {/* Hero */}
      <section className="grid grid-cols-2 min-h-[90vh]">
          <div className="flex flex-col justify-center px-16 py-20 bg-ink">
            <p className="section-tag">New Collection — Summer 2026</p>
            <h1 className="font-serif text-[4rem] font-light text-white leading-[1.1] mb-6">
              Dress with <em className="italic text-warm">Intent</em>
            </h1>
            
            <div className="flex gap-4">
              <Link href="/shop" className="btn-primary">
                Explore Collection
              </Link>
              <Link href="/about" className="btn-ghost">
                Our Vision
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#16090B] to-[#000000] flex items-center justify-center">
            <img src={chubiImage.src} alt="Chubi" className="w-full h-full object-cover" />
          </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-warm py-4">
        <div className="marquee-inner flex gap-12 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6">
              <span className="text-[11px] tracking-[0.12em] text-white/90 uppercase">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/50 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* Featured products */}
      <section className="py-20 px-10">
        <div className="text-center mb-12">
          <p className="section-tag">Curated Picks</p>
          <h2 className="font-serif text-[2.5rem] font-light">
            Featured <em className="italic">this season</em>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="bg-ink py-20 px-10 grid grid-cols-2 gap-16 items-center">
        <div className="text-white">
          <p className="section-tag">Our Philosophy</p>
          <h2 className="font-serif text-[2.5rem] font-light leading-[1.2] mb-5">
            Fashion that <em className="italic text-warm">endures</em>
          </h2>
          <p className="text-[14px] text-[#9B9590] leading-[1.9] mb-8">
            We believe in slow fashion — pieces designed to be worn for years,
            not seasons. Every garment is ethically made from sustainably
            sourced materials, with full traceability from farm to wardrobe.
          </p>
          <div className="flex gap-12">
            {[
              { num: '0+', label: 'Years in business' },
              { num: '0%', label: 'Ethical production' },
              { num: '0k', label: 'Happy customers' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-serif text-3xl text-warm font-light">
                  {num}
                </div>
                <div className="text-[11px] text-[#6B655D] tracking-[0.06em] mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '🌱', label: 'Organic Materials' },
            { icon: '✊', label: 'Fair Wages' },
            { icon: '♻️', label: 'Zero Waste' },
            { icon: '🚢', label: 'Carbon Neutral' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="bg-warm/15 rounded-lg flex flex-col items-center justify-center p-8 gap-2 aspect-square"
            >
              <span className="text-3xl">{icon}</span>
              <span className="text-[11px] text-white/60 tracking-[0.06em] text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* More products */}
      
      <section className="py-20 px-10 bg-white">
        <div className="text-center mb-12">
          <p className="section-tag">The Full Range</p>
          <h2 className="font-serif text-[2.5rem] font-light">
            Shop the <em className="italic">Collection</em>
          </h2>
        </div>
       
        <div className="text-center mt-12">
          <Link href="/shop" className="btn-outline">
            View All Products
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
