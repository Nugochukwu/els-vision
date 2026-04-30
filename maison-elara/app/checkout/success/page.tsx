import Link from 'next/link'

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { ref?: string }
}) {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center text-center px-10 relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] border border-gold/8 rounded-full animate-spin-slow" />
        <div className="absolute w-[400px] h-[400px] border border-gold/12 rounded-full animate-counter-spin" />
        <div className="absolute w-[200px] h-[200px] bg-gold/5 rounded-full animate-pulse-glow" />
      </div>

      <div className="relative z-10 opacity-0 animate-fade-up">
        <div className="text-7xl mb-6 animate-float">🎉</div>
        <h1 className="font-serif text-5xl font-bold text-pearl mb-4">
          Order <em className="italic text-gold">Confirmed!</em>
        </h1>
        <p className="text-mist text-[14px] leading-[1.9] max-w-md mb-3">
          Thank you for shopping with El&apos;s Vision. Your order has been confirmed
          and you&apos;ll receive a confirmation email shortly.
        </p>
        {searchParams.ref && (
          <p className="text-[12px] text-gold/60 mb-8 font-mono">
            Reference: {searchParams.ref}
          </p>
        )}
        <div className="flex gap-4 justify-center opacity-0 animate-fade-up delay-200">
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
          <Link href="/account/orders" className="btn-ghost">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  )
}
