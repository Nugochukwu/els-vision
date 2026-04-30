'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/cart'
import { Footer } from '@/components/layout/Footer'
import { generateReference, openPaystackPopup } from '@/lib/paystack'

export default function CartPage() {
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // ← destructure removeItem and updateQuantity — they were missing
  const { items, clearCart, subtotal, removeItem, updateQuantity } = useCartStore()

  const tax = subtotal() * 0.075
  const shipping = subtotal() >= 100 ? 0 : 15
  const total = subtotal() + tax + shipping

  // Naira formatting helper
  const toNGN = (usd: number) => `₦${(usd * 1600).toLocaleString()}`

  async function handleCheckout() {
    if (!user?.primaryEmailAddress?.emailAddress) {
      alert('Please sign in to continue.')
      return
    }

    setLoading(true)
    const reference = generateReference()

    try {
      await openPaystackPopup({
        email: user.primaryEmailAddress.emailAddress,
        amount: total * 1600, // USD → NGN (kobo conversion handled inside lib)
        currency: 'NGN',
        reference,
        metadata: {
          customer_name: user.fullName ?? '',
          items: items.map(i => ({
            name: i.product.name,
            size: i.size,
            qty: i.quantity,
          })),
        },
        onSuccess: async (response) => {
          const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: response.reference, items }),
          })
          const data = await res.json()

          if (data.success) {
            clearCart()
            router.push(`/checkout/success?ref=${response.reference}`)
          } else {
            alert('Payment verification failed. Please contact support.')
            setLoading(false)
          }
        },
        onClose: () => {
          setLoading(false)
        },
      })
    } catch (err) {
      console.error('Paystack error:', err)
      alert('Could not load payment window. Please check your connection.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-10">
        <div className="text-6xl mb-6">🛍</div>
        <h1 className="font-serif text-xl font-light mb-3">Your bag is empty</h1>
        <p className="text-mist mb-8">Add some beautiful pieces to get started.</p>
        <button onClick={() => router.push('/shop')} className="btn-primary">
          Shop Now
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-[900px] mx-auto px-10 py-12">
        <h1 className="font-serif text-3xl font-light mb-8 text-pearl">
          Your Bag ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-[1fr_340px] gap-10">
          {/* Items */}
          <div>
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-5 py-5 border-b border-gold/10"
              >
                <div className={`${item.product.bgClass} w-20 h-24 rounded flex items-center justify-center text-3xl flex-shrink-0`}>
                  {item.product.emoji}
                </div>

                <div className="flex-1">
                  <p className="font-serif text-lg text-pearl">{item.product.name}</p>
                  <p className="text-[12px] text-mist mt-0.5">Size: {item.size}</p>
                  <p className="text-[14px] font-medium mt-1 text-gold">
                    {toNGN(item.product.price)}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 border border-gold/20 rounded-sm text-sm hover:bg-gold hover:text-obsidian transition-all bg-transparent cursor-pointer text-pearl"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-5 text-center text-pearl">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 border border-gold/20 rounded-sm text-sm hover:bg-gold hover:text-obsidian transition-all bg-transparent cursor-pointer text-pearl"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="ml-2 text-[11px] text-mist underline cursor-pointer hover:text-gold bg-transparent border-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right font-medium text-[14px] text-pearl">
                  {toNGN(item.product.price * item.quantity)}
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="mt-4 text-[12px] text-mist underline cursor-pointer hover:text-gold bg-transparent border-none"
            >
              Clear bag
            </button>
          </div>

          {/* Order summary */}
          <div className="bg-charcoal border border-gold/10 rounded-lg p-6 sticky top-[90px] h-fit">
            <h2 className="font-serif text-xl font-light mb-5 text-pearl">Order Summary</h2>

            <div className="space-y-3 text-[13px] text-mist">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-pearl">{toNGN(subtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-pearl">{shipping === 0 ? 'Free' : toNGN(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (7.5%)</span>
                <span className="text-pearl">{toNGN(tax)}</span>
              </div>
            </div>

            <hr className="my-4 border-gold/10" />

            <div className="flex justify-between font-semibold text-[15px] mb-6 text-pearl">
              <span>Total</span>
              <span className="text-gold text-lg">{toNGN(total)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 bg-gold text-obsidian text-[12px] tracking-widest uppercase rounded-sm hover:bg-gold-light transition-all cursor-pointer border-none font-sans font-semibold mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin inline-block" />
                  Opening payment...
                </span>
              ) : (
                `Pay ${toNGN(total)} with Paystack`
              )}
            </button>

            <p className="text-[11px] text-mist text-center leading-[1.7]">
              🔒 Secured by Paystack · Visa · Mastercard · Verve
            </p>

            {shipping > 0 && (
              <div className="mt-4 bg-gold/10 border border-gold/20 rounded p-3 text-[12px] text-gold text-center">
                Add {toNGN(100 - subtotal())} more for free shipping
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}