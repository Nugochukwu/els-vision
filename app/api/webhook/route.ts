import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe'
import Stripe from 'stripe'

// Required to read the raw request body for signature verification
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const stripe = getStripeServer()
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // ─── Handle events ─────────────────────────────────────────────────────
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      // ✅ Payment confirmed — fulfil the order here:
      // - Save order to your database
      // - Send confirmation email (Resend, Postmark, etc.)
      // - Update inventory
      // - Trigger shipping workflow
      console.log('Order confirmed:', session.id)
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      // ❌ Payment failed — notify the customer or retry logic
      console.log('Payment failed:', paymentIntent.id)
      break
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      // If you add subscriptions (e.g. loyalty membership) handle here
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
