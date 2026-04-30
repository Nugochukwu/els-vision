import { NextRequest, NextResponse } from 'next/server'

// Verifies a Paystack transaction server-side after the popup closes
// Call this from the client after onSuccess fires to confirm the payment
export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json()

    if (!reference) {
      return NextResponse.json({ error: 'Missing reference' }, { status: 400 })
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json(
        { error: 'Paystack secret key not configured' },
        { status: 500 }
      )
    }

    // Verify the transaction with Paystack's API
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await res.json()

    if (!res.ok || data.data?.status !== 'success') {
      return NextResponse.json(
        { error: 'Payment verification failed', details: data },
        { status: 400 }
      )
    }

    // ✅ Payment verified — fulfil the order here:
    // - Save order to your database
    // - Send confirmation email
    // - Update inventory
    // - Trigger shipping workflow
    const transaction = data.data

    return NextResponse.json({
      success: true,
      reference: transaction.reference,
      amount: transaction.amount / 100, // Convert back from kobo
      currency: transaction.currency,
      customer: transaction.customer,
    })
  } catch (error) {
    console.error('Paystack verification error:', error)
    return NextResponse.json(
      { error: 'Verification request failed' },
      { status: 500 }
    )
  }
}
