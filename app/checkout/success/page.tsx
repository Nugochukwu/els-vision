import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-10">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="font-serif text-4xl font-light mb-4">
        Thank you for your order
      </h1>
      <p className="text-muted text-[14px] leading-[1.9] max-w-md mb-8">
        Your order has been confirmed. You'll receive a confirmation email
        shortly with your order details and tracking information.
      </p>
      <Link href="/shop" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  )
}
