import { NextRequest, NextResponse } from 'next/server'
import { CartItem } from '@/lib/cart'

export async function POST(req: NextRequest) {
  try {
    const { reference, items }: { reference: string; items: CartItem[] } = await req.json()

    if (!reference) {
      return NextResponse.json({ error: 'No payment reference provided' }, { status: 400 })
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    // Verify the payment reference with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    // Check Paystack confirmed the payment
    if (!data.status || data.data?.status !== 'success') {
      console.error('Paystack verification failed:', data)
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }

    // Double-check the amount paid matches the cart total (security)
    const expectedNGN = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity * 1600,
      0
    )
    const expectedKobo = Math.round(expectedNGN * 100)
    const paidKobo = data.data.amount

    if (paidKobo < expectedKobo) {
      console.error(`Amount mismatch — expected: ${expectedKobo}, paid: ${paidKobo}`)
      return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 })
    }

    // ✅ Payment verified — fulfil the order here:
    // - Save order to your database (Supabase, PlanetScale, etc.)
    // - Send confirmation email (Resend, Postmark, etc.)
    // - Update inventory
    console.log('Order confirmed:', {
      reference,
      customer: data.data.customer.email,
      amount: `₦${(paidKobo / 100).toLocaleString()}`,
      items: items.map(i => `${i.product.name} (${i.size}) x${i.quantity}`),
    })

    return NextResponse.json({
      success: true,
      orderId: `ELV-${Date.now()}`,
      reference,
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}