'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/ui/ProductCard'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/ui/CartDrawer'
import { products } from '@/lib/products'

const filters = ['All', 'Clothing', 'Knitwear', 'Accessories', 'Sale']

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  // In a real app, filter would query your database/API
  const filtered =
    activeFilter === 'All'
      ? products
      : activeFilter === 'Sale'
      ? products.filter((p) => p.originalPrice)
      : products

  return (
    <>
      <CartDrawer />

      {/* Header */}
      <div className="bg-white border-b border-border px-10 py-8 flex justify-between items-center sticky top-[73px] z-40">
        <h1 className="font-serif text-3xl font-light">The Collection</h1>
        <div className="flex gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-[12px] font-sans px-4 py-2 border rounded-sm transition-all tracking-[0.04em] cursor-pointer ${
                activeFilter === f
                  ? 'bg-ink text-white border-ink'
                  : 'bg-transparent text-muted border-border hover:bg-ink hover:text-white hover:border-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-10 py-12">
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
