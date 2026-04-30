'use client'

import { useCartStore } from '@/lib/cart'
import { useRouter } from 'next/navigation'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCartStore()
  const router = useRouter()

  const tax = subtotal() * 0.08
  const shipping = subtotal() >= 150 ? 0 : 12
  const total = subtotal() + tax + shipping

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-xl font-light">
            Your Bag ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="text-muted hover:text-ink transition-colors bg-transparent border-none cursor-pointer text-lg"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4">🛍</div>
              <p className="font-serif text-xl font-light mb-2">Your bag is empty</p>
              <p className="text-sm text-muted">Add some beautiful pieces</p>
              <button
                onClick={() => { closeCart(); router.push('/shop') }}
                className="btn-primary mt-6 text-xs"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 py-4 border-b border-border"
                >
                  {/* Product image */}
                  <div
                    className={`${item.product.bgClass} w-20 h-24 rounded flex items-center justify-center text-2xl flex-shrink-0`}
                  >
                    {item.product.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-black text-base">{item.product.name}</p>
                    <p className="text-[12px] text-muted mt-0.5">
                      Size: {item.size}
                    </p>
                    <p className="text-[13px] text-black font-medium mt-1">
                      ${item.product.price}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity - 1)
                        }
                        className="w-7 h-7 border border-border rounded-sm text-sm hover:bg-ink hover:text-white transition-all bg-transparent cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity + 1)
                        }
                        className="w-7 h-7 border border-border rounded-sm text-sm hover:bg-ink hover:text-white transition-all bg-transparent cursor-pointer"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="ml-2 text-[11px] text-muted underline cursor-pointer hover:text-ink bg-transparent border-none"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary + checkout */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border bg-cream">
            <div className="space-y-2 mb-4 text-[13px] text-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between font-medium text-[15px] text-black mb-5 pt-3 border-t border-border">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => { closeCart(); router.push('/cart') }}
              className="w-full py-4 bg-warm text-black text-[12px] tracking-widest uppercase rounded-sm hover:bg-warm-dark transition-all cursor-pointer hover:border-b mb-2"
            >
              Checkout
            </button>
            <p className="text-[11px] text-muted text-center">
              🔒 Secure checkout · Stripe · Apple Pay · PayPal
            </p>
          </div>
        )}
      </div>
    </>
  )
}
