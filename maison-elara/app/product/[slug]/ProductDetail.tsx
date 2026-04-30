'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cart'
import { Product } from '@/lib/products'
import { ProductCard } from '@/components/ui/ProductCard'
import { formatNaira } from '@/lib/paystack'

interface Props {
  product: Product
  related: Product[]
}

export function ProductDetail({ product, related }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem, openCart } = useCartStore()

  function handleAddToCart() {
    addItem(product, selectedSize, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  function handleBuyNow() {
    addItem(product, selectedSize, qty)
    openCart()
  }

  return (
    <>
      <div className="grid grid-cols-2 min-h-[85vh] bg-obsidian">
        {/* Image panel */}
        <div className={`${product.bgClass} flex items-center justify-center sticky top-[73px] h-[calc(100vh-73px)] relative overflow-hidden`}>
          <span className="text-[9rem] animate-float">{product.emoji}</span>
          {/* Decorative ring */}
          <div className="absolute inset-16 border border-white/10 rounded-full animate-spin-slow pointer-events-none" />
          <div className="absolute inset-32 border border-white/5 rounded-full animate-counter-spin pointer-events-none" />
        </div>

        {/* Info panel */}
        <div className="px-14 py-16 bg-charcoal">
          <p className="section-tag opacity-0 animate-fade-up">{product.subtitle}</p>

          <h1 className="font-serif text-[3rem] font-bold leading-[1.1] mb-2 text-pearl opacity-0 animate-fade-up delay-100">
            {product.name}
          </h1>
          <p className="text-[13px] text-mist mb-6 opacity-0 animate-fade-up delay-200">{product.origin}</p>

          <div className="font-serif text-[2rem] font-bold mb-8 text-gold opacity-0 animate-fade-up delay-200">
            {product.originalPrice && (
              <span className="text-[1.3rem] line-through text-mist/50 font-normal mr-3">
                {formatNaira(product.originalPrice)}
              </span>
            )}
            {formatNaira(product.price)}
          </div>

          {/* Size */}
          <p className="form-label mb-3 opacity-0 animate-fade-up delay-300">Select Size</p>
          <div className="flex gap-3 mb-8 opacity-0 animate-fade-up delay-300">
            {product.sizes.map((s) => (
              <button key={s} onClick={() => setSelectedSize(s)}
                      className={`w-11 h-11 text-[12px] font-sans transition-all rounded-sm cursor-pointer border font-medium ${
                        selectedSize === s
                          ? 'bg-gold text-obsidian border-gold'
                          : 'bg-transparent text-pearl border-gold/20 hover:border-gold hover:text-gold'
                      }`}>
                {s}
              </button>
            ))}
          </div>

          {/* Qty */}
          <p className="form-label mb-3 opacity-0 animate-fade-up delay-400">Quantity</p>
          <div className="flex items-center gap-3 mb-8 opacity-0 animate-fade-up delay-400">
            <button onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 border border-gold/20 rounded-sm text-base hover:bg-gold hover:text-obsidian hover:border-gold transition-all bg-transparent cursor-pointer text-pearl">−</button>
            <span className="text-base font-semibold w-8 text-center text-pearl">{qty}</span>
            <button onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 border border-gold/20 rounded-sm text-base hover:bg-gold hover:text-obsidian hover:border-gold transition-all bg-transparent cursor-pointer text-pearl">+</button>
          </div>

          {/* CTAs */}
          <div className="space-y-3 opacity-0 animate-fade-up delay-500">
            <button onClick={handleAddToCart}
                    className={`w-full py-4 text-[12px] tracking-[0.1em] uppercase rounded-sm border-none cursor-pointer transition-all font-sans font-medium ${
                      added ? 'bg-green-600 text-white' : 'bg-gold text-obsidian hover:bg-gold-light'
                    }`}>
              {added ? '✓ Added to Bag' : 'Add to Bag'}
            </button>
            <button onClick={handleBuyNow}
                    className="w-full py-4 bg-transparent text-pearl text-[12px] tracking-[0.1em] uppercase rounded-sm border border-gold/30 cursor-pointer hover:border-gold hover:text-gold transition-all font-sans font-medium">
              Buy Now — Pay with Paystack
            </button>
          </div>

          {/* Description */}
          <div className="border-t border-gold/10 pt-6 mt-8 opacity-0 animate-fade-up delay-600">
            <p className="text-[14px] text-pearl/60 leading-[1.9] mb-4">{product.description}</p>
            <ul className="space-y-2">
              {product.details.map((d) => (
                <li key={d} className="text-[13px] text-mist flex gap-2">
                  <span className="text-gold">—</span>{d}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 bg-gold/8 border border-gold/15 rounded p-4 text-[13px] text-gold/70 leading-[1.7] opacity-0 animate-fade-up delay-700">
            🔒 Secured by Paystack · Free shipping over ₦160,000 · 30-day returns
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="py-20 px-10 bg-graphite">
        <div className="text-center mb-12">
          <span className="section-tag">You May Also Like</span>
          <h2 className="font-serif text-[2rem] font-bold text-pearl mt-1">
            Complete the <em className="italic text-gold">look</em>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </>
  )
}
