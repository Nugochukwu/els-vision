import { loadStripe } from '@stripe/stripe-js'

// Singleton — avoids loading Stripe multiple times
let stripePromise: ReturnType<typeof loadStripe>

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    )
  }
  return stripePromise
}

// ─── Server-side Stripe instance ─────────────────────────────────────────────
// Import this only in API routes / server components — never in client code
// Usage:
//   import { stripe } from '@/lib/stripe-server'
//   const session = await stripe.checkout.sessions.create({ ... })

export function getStripeServer() {
  // Dynamic import to ensure this never runs client-side
  const Stripe = require('stripe')
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
  })
}
