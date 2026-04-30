// ─── Paystack Client Helper ──────────────────────────────────────────────────
// Paystack works differently from Stripe — the popup is initiated client-side
// using their inline JS library, then verified server-side via the API.

export interface PaystackConfig {
  email: string
  amount: number        // In KOBO (Naira × 100)
  currency?: string     // Default: NGN
  reference: string     // Unique per transaction
  metadata?: Record<string, unknown>
  onSuccess: (reference: string) => void
  onClose: () => void
}

// Generate a unique transaction reference
export function generateReference(): string {
  return `EVS-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
}

// USD to Naira conversion (update this rate as needed)
export const USD_TO_NGN = 1600

export function usdToKobo(usd: number): number {
  return Math.round(usd * USD_TO_NGN * 100)
}

export function formatNaira(usd: number): string {
  return `₦${(usd * USD_TO_NGN).toLocaleString()}`
}

// Initialise the Paystack popup (called client-side)
// Requires the Paystack inline script to be loaded in _document or via Script component
export function openPaystackPopup(config: PaystackConfig) {
  if (typeof window === 'undefined') return

  // @ts-ignore — PaystackPop is injected by the Paystack script
  const handler = window.PaystackPop?.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email: config.email,
    amount: config.amount,
    currency: config.currency ?? 'NGN',
    ref: config.reference,
    metadata: config.metadata,
    callback: (response: { reference: string }) => {
      config.onSuccess(response.reference)
    },
    onClose: config.onClose,
  })

  handler?.openIframe()
}
