'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useCartStore } from '@/lib/cart'
import { Footer } from '@/components/layout/Footer'
import { generateReference, openPaystackPopup, usdToKobo, formatNaira } from '@/lib/paystack'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore()
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const tax = subtotal() * 0.075
  const shipping = subtotal() >= 100 ? 0 : 15
  const total = subtotal() + tax + shipping

  async function handleCheckout() {
    if (!user?.primaryEmailAddress?.emailAddress) {
      alert('Please sign in to continue checkout.')
      return
    }

    setLoading(true)
    const reference = generateReference()

    openPaystackPopup({
      email: user.primaryEmailAddress.emailAddress,
      amount: usdToKobo(total),
      reference,
      currency: 'NGN',
      metadata: {
        items: items.map(i => ({ name: i.product.name, size: i.size, qty: i.quantity })),
        customer_name: user.fullName,
      },
      onSuccess: async (ref) => {
        // Verify server-side
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: ref, items }),
        })
        const data = await res.json()
        if (data.success) {
          clearCart()
          router.push(`/checkout/success?ref=${ref}`)
        } else {
          alert('Payment verification failed. Please contact support.')
        }
        setLoading(false)
      },
      onClose: () => {
        setLoading(false)
      },
    })
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-10 bg-obsidian">
        <div className="text-7xl mb-6 animate-float">🛍</div>
        <h1 className="font-serif text-4xl text-pearl mb-3">Your bag is empty</h1>
        <p className="text-mist mb-8 text-[14px]">Start adding some beautiful pieces.</p>
        <button onClick={() => router.push('/shop')} className="btn-primary">
          Shop the Collection
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Load Paystack inline script */}
      <script src="https://js.paystack.co/v1/inline.js" async />

      <div className="min-h-screen bg-obsidian py-12 px-10">
        <div className="max-w-[960px] mx-auto">
          <h1 className="font-serif text-4xl font-bold text-pearl mb-2 opacity-0 animate-fade-up">
            Your Bag
          </h1>
          <p className="text-mist text-sm mb-10 opacity-0 animate-fade-up delay-100">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>

          <div className="grid grid-cols-[1fr_360px] gap-10">
            {/* Items */}
            <div>
              {items.map((item, i) => (
                <div key={`${item.product.id}-${item.size}`}
                     className="flex gap-5 py-6 border-b border-gold/10 opacity-0 animate-fade-up"
                     style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`${item.product.bgClass} w-24 h-28 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 border-shimmer`}>
                    {item.product.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-lg text-pearl">{item.product.name}</p>
                    <p className="text-[12px] text-mist mt-1">Size: {item.size}</p>
                    <p className="text-[14px] font-semibold mt-1 text-gold">{formatNaira(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="w-8 h-8 border border-gold/20 rounded-sm text-sm hover:bg-gold hover:text-obsidian transition-all bg-transparent cursor-pointer text-pearl">−</button>
                      <span className="text-sm font-medium w-6 text-center text-pearl">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="w-8 h-8 border border-gold/20 rounded-sm text-sm hover:bg-gold hover:text-obsidian transition-all bg-transparent cursor-pointer text-pearl">+</button>
                      <button onClick={() => removeItem(item.product.id, item.size)}
                              className="ml-3 text-[11px] text-mist underline cursor-pointer hover:text-gold bg-transparent border-none">Remove</button>
                    </div>
                  </div>
                  <div className="text-right font-semibold text-[14px] text-pearl">
                    {formatNaira(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}

              <button onClick={clearCart}
                      className="mt-5 text-[12px] text-mist underline cursor-pointer hover:text-gold bg-transparent border-none">
                Clear bag
              </button>
            </div>

            {/* Summary */}
            <div className="opacity-0 animate-slide-right delay-200">
              <div className="bg-charcoal border-shimmer rounded-xl p-6 sticky top-24">
                <h2 className="font-serif text-xl text-pearl mb-6">Order Summary</h2>

                <div className="space-y-3 text-[13px] text-mist mb-4">
                  <div className="flex justify-between"><span>Subtotal</span><span className="text-pearl">{formatNaira(subtotal())}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span className="text-pearl">{shipping === 0 ? 'Free' : formatNaira(shipping)}</span></div>
                  <div className="flex justify-between"><span>VAT (7.5%)</span><span className="text-pearl">{formatNaira(tax)}</span></div>
                </div>

                <div className="border-t border-gold/10 my-4" />

                <div className="flex justify-between font-semibold text-[16px] mb-6 text-pearl">
                  <span>Total</span>
                  <span className="text-gold text-xl font-bold">{formatNaira(total)}</span>
                </div>

                <button onClick={handleCheckout} disabled={loading}
                        className="btn-primary w-full justify-center mb-4 text-[12px] disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin inline-block" />
                      Processing...
                    </span>
                  ) : (
                    'Pay with Paystack'
                  )}
                </button>

                <div className="text-center">
                  <p className="text-[11px] text-mist mb-1">🔒 Secured by Paystack</p>
                  <div className="flex justify-center gap-2 mt-2">
                    {['Visa', 'Mastercard', 'Verve', 'Bank Transfer'].map(m => (
                      <span key={m} className="text-[10px] border border-gold/15 text-mist px-2 py-0.5 rounded-sm">{m}</span>
                    ))}
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mt-4 bg-gold/10 border border-gold/20 rounded p-3 text-[12px] text-gold text-center">
                    Add {formatNaira(100 - subtotal())} more for free shipping
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
