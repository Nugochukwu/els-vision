'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/ui/ProductCard'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/ui/CartDrawer'
import { products } from '@/lib/products'

const filters = ['All', 'Clothing', 'Knitwear', 'Accessories', 'Sale']

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All' ? products :
    activeFilter === 'Sale' ? products.filter((p) => p.originalPrice) :
    products

  return (
    <>
      <CartDrawer />

      {/* Header */}
      <div className="bg-charcoal border-b border-gold/10 px-10 py-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[300px] h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
        <h1 className="font-serif text-[3.5rem] font-bold text-pearl opacity-0 animate-slide-left">
          The <em className="italic text-gold">Collection</em>
        </h1>
        <p className="text-mist text-[13px] mt-2 mb-6 opacity-0 animate-fade-up delay-100">
          {products.length} pieces, all curated by El
        </p>
        <div className="flex gap-3 opacity-0 animate-fade-up delay-200">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
                    className={`text-[12px] font-sans px-5 py-2 border rounded-sm transition-all tracking-[0.06em] cursor-pointer font-medium ${
                      activeFilter === f
                        ? 'bg-gold text-obsidian border-gold'
                        : 'bg-transparent text-mist border-gold/15 hover:border-gold hover:text-gold'
                    }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-10 py-14 bg-obsidian">
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
