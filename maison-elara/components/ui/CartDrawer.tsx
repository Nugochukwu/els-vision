'use client'

import { useCartStore } from '@/lib/cart'
import { useRouter } from 'next/navigation'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore()
  const router = useRouter()

  const tax = subtotal() * 0.075
  const shipping = subtotal() >= 100 ? 0 : 15
  const total = subtotal() + tax + shipping

  // Convert to Naira (approx)
  const toNaira = (usd: number) => Math.round(usd * 1600).toLocaleString()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-obsidian/70 backdrop-blur-sm z-50" onClick={closeCart} />

      <div className="fixed right-0 top-0 h-full w-[420px] bg-charcoal z-50 flex flex-col border-l border-gold/10"
           style={{ animation: 'slide-right 0.35s ease forwards' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
          <h2 className="font-serif text-xl text-pearl">
            Your Bag <span className="text-gold text-base">({items.length})</span>
          </h2>
          <button onClick={closeCart} className="text-mist hover:text-gold transition-colors bg-transparent border-none cursor-pointer text-xl leading-none">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4 animate-float">🛍</div>
              <p className="font-serif text-xl text-pearl mb-2">Your bag is empty</p>
              <p className="text-sm text-mist mb-6">Discover something beautiful</p>
              <button onClick={() => { closeCart(); router.push('/shop') }} className="btn-primary text-xs">
                Shop Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={`${item.product.id}-${item.size}`}
                     className="flex gap-4 py-4 border-b border-gold/10 opacity-0 animate-fade-up"
                     style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className={`${item.product.bgClass} w-20 h-24 rounded flex items-center justify-center text-2xl flex-shrink-0`}>
                    {item.product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-base text-pearl">{item.product.name}</p>
                    <p className="text-[12px] text-mist mt-0.5">Size: {item.size}</p>
                    <p className="text-[13px] font-medium mt-1 text-gold">₦{toNaira(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="w-7 h-7 border border-gold/20 rounded-sm text-sm hover:bg-gold hover:text-obsidian transition-all bg-transparent cursor-pointer text-pearl">−</button>
                      <span className="text-sm font-medium w-4 text-center text-pearl">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="w-7 h-7 border border-gold/20 rounded-sm text-sm hover:bg-gold hover:text-obsidian transition-all bg-transparent cursor-pointer text-pearl">+</button>
                      <button onClick={() => removeItem(item.product.id, item.size)}
                              className="ml-2 text-[11px] text-mist underline cursor-pointer hover:text-gold bg-transparent border-none">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gold/10 bg-graphite">
            <div className="space-y-2 mb-4 text-[13px] text-mist">
              <div className="flex justify-between"><span>Subtotal</span><span>₦{toNaira(subtotal())}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₦${toNaira(shipping)}`}</span></div>
              <div className="flex justify-between"><span>VAT (7.5%)</span><span>₦{toNaira(tax)}</span></div>
            </div>
            <div className="flex justify-between font-semibold text-[15px] mb-5 pt-3 border-t border-gold/10 text-pearl">
              <span>Total</span><span className="text-gold">₦{toNaira(total)}</span>
            </div>
            <button onClick={() => { closeCart(); router.push('/cart') }}
                    className="btn-primary w-full justify-center mb-3 text-[12px]">
              Proceed to Checkout
            </button>
            <p className="text-[11px] text-mist text-center">🔒 Secured by Paystack</p>
          </div>
        )}
      </div>
    </>
  )
}
