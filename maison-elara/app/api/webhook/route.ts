import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// ─── Paystack Webhook Handler ─────────────────────────────────────────────────
// Set your webhook URL in the Paystack dashboard:
//   https://dashboard.paystack.com → Settings → API Keys & Webhooks
//   Webhook URL: https://yourdomain.com/api/webhook

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-paystack-signature')

  // Verify webhook signature
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex')

  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(body)

  switch (event.event) {
    case 'charge.success': {
      const { reference, amount, customer, metadata } = event.data
      // ✅ Payment successful — fulfil order
      // - Save to database with reference, amount, customer email
      // - Send order confirmation email
      // - Decrement inventory
      console.log('Payment successful:', reference, customer.email, amount)
      break
    }

    case 'charge.failed': {
      const { reference, customer } = event.data
      // ❌ Payment failed — notify customer or log
      console.log('Payment failed:', reference, customer.email)
      break
    }

    case 'refund.processed': {
      // Handle refund
      console.log('Refund processed:', event.data.transaction_reference)
      break
    }

    default:
      console.log('Unhandled Paystack event:', event.event)
  }

  return NextResponse.json({ received: true })
}
