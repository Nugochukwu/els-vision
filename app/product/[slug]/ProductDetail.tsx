'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cart'
import { Product } from '@/lib/products'
import { ProductCard } from '@/components/ui/ProductCard'
import Image from 'next/image'

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
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    addItem(product, selectedSize, qty)
    openCart()
  }

  return (
    <>
      <div className="grid grid-cols-2 min-h-[85vh]">
        {/* Image */}
        <div
          className={`${product.bgClass} flex items-center justify-center sticky top-[73px] h-[calc(100vh-73px)]`}
        >
          <div className="relative w-full h-full">
  <Image
    src={product.image}
    alt={product.name}
    fill
    className="object-cover"
    priority  // ← preloads the image since it's above the fold
    sizes="50vw"
  />
</div>
        </div>

        {/* Info */}
        <div className="px-12 py-16">
          <p className="text-[11px] tracking-[0.12em] text-warm uppercase mb-4">
            {product.subtitle}
          </p>
          <h1 className="font-serif text-[2.5rem] font-light leading-[1.2] mb-2">
            {product.name}
          </h1>
          <p className="text-[14px] text-muted mb-6">{product.origin}</p>

          <div className="font-serif text-[1.75rem] font-light mb-8">
            {product.originalPrice && (
              <span className="text-[1.2rem] line-through text-muted font-light mr-3">
                ${product.originalPrice}
              </span>
            )}
            ${product.price}
          </div>

          {/* Size */}
          <p className="form-label mb-3">Size</p>
          <div className="flex gap-3 mb-8">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`w-11 h-11 border text-[12px] font-sans transition-all rounded-sm cursor-pointer ${
                  selectedSize === s
                    ? 'bg-ink text-white border-ink'
                    : 'bg-transparent text-ink border-border hover:bg-ink hover:text-white hover:border-ink'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Qty */}
          <p className="form-label mb-3">Quantity</p>
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-9 h-9 border border-border rounded-sm text-base hover:bg-ink hover:text-white hover:border-ink transition-all bg-transparent cursor-pointer"
            >
              −
            </button>
            <span className="text-base font-medium w-6 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-9 h-9 border border-border rounded-sm text-base hover:bg-ink hover:text-white hover:border-ink transition-all bg-transparent cursor-pointer"
            >
              +
            </button>
          </div>

          {/* CTAs */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 text-[12px] tracking-[0.1em] uppercase rounded-sm border-none cursor-pointer transition-all mb-3 font-sans ${
              added
                ? 'bg-green-700 text-white'
                : 'bg-ink text-white hover:bg-warm'
            }`}
          >
            {added ? '✓ Added to Bag' : 'Add to Bag'}
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full py-4 bg-warm text-white text-[12px] tracking-[0.1em] uppercase rounded-sm border-none cursor-pointer hover:bg-warm-dark transition-all font-sans"
          >
            Buy Now
          </button>

          {/* Description */}
          <div className="border-t border-border pt-6 mt-8">
            <p className="text-[14px] text-muted leading-[1.9] mb-4">
              {product.description}
            </p>
            <ul className="space-y-1">
              {product.details.map((d) => (
                <li key={d} className="text-[13px] text-muted flex gap-2">
                  <span className="text-warm">—</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping note */}
          <div className="mt-8 bg-warm-light border border-warm/30 rounded p-4 text-[13px] text-warm-dark leading-[1.7]">
            🚚 Free shipping on orders over $150 · Free 30-day returns · Lifetime repair guarantee
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className="py-20 px-10 bg-white">
        <div className="text-center mb-12">
          <p className="section-tag">You May Also Like</p>
          <h2 className="font-serif text-[2rem] font-light">
            Complete the <em className="italic">look</em>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  )
}
