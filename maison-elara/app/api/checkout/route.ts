import { NextRequest, NextResponse } from 'next/server'
import { CartItem } from '@/lib/cart'
import { usdToKobo } from '@/lib/paystack'

// ─── Verify Paystack payment (called after popup success) ────────────────────
// Paystack flow:
//   1. Client opens popup with public key + amount
//   2. User pays → Paystack calls onSuccess(reference)
//   3. Client POSTs reference to this endpoint
//   4. Server verifies with Paystack API using secret key
//   5. Server fulfils the order

export async function POST(req: NextRequest) {
  try {
    const { reference, items }: { reference: string; items: CartItem[] } = await req.json()

    if (!reference) {
      return NextResponse.json({ error: 'No payment reference provided' }, { status: 400 })
    }

    // Verify with Paystack API
    const verify = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await verify.json()

    if (!data.status || data.data?.status !== 'success') {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    // Double-check amount matches cart total (security)
    const expectedKobo = items.reduce(
      (acc, item) => acc + usdToKobo(item.product.price) * item.quantity,
      0
    )
    const paidKobo = data.data.amount

    if (paidKobo < expectedKobo) {
      return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 })
    }

    // ✅ Payment verified — fulfil the order here:
    // - Save order to database (Supabase, PlanetScale, etc.)
    // - Send confirmation email (Resend, Postmark, etc.)
    // - Update inventory
    // - Trigger shipping workflow

    return NextResponse.json({
      success: true,
      orderId: `ORD-${Date.now()}`,
      reference,
    })
  } catch (error) {
    console.error('Paystack verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
