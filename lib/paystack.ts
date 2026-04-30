// ─── Paystack client-side helper ─────────────────────────────────────────────
// Paystack works by loading their inline JS popup — no SDK install needed.
// The public key is safe to expose in the browser.

export const PAYSTACK_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ''

export interface PaystackConfig {
  email: string
  amount: number        // In kobo (NGN) or cents (USD) — multiply by 100
  currency?: string     // 'NGN' | 'USD' | 'GHS' | 'ZAR' | 'KES'
  reference: string
  metadata?: Record<string, unknown>
  onSuccess: (response: PaystackResponse) => void
  onClose: () => void
}

export interface PaystackResponse {
  reference: string
  status: string
  trans: string
  transaction: string
  message: string
  trxref: string
}

// Generate a unique transaction reference
export function generateReference(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return `ELV-${timestamp}-${random}`.toUpperCase()
}

// Loads the Paystack inline script dynamically (once)
export function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve()
    if ((window as any).PaystackPop) return resolve()

    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Paystack script'))
    document.head.appendChild(script)
  })
}

// Open the Paystack payment modal
export function openPaystackPopup(config: PaystackConfig): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await loadPaystackScript()
    } catch (err) {
      return reject(err)
    }

    const PaystackPop = (window as any).PaystackPop

    if (!PaystackPop) {
      return reject(new Error('Paystack failed to load'))
    }

    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: config.email,
      amount: Math.round(config.amount * 100),
      currency: config.currency || 'NGN',
      ref: config.reference,
      metadata: config.metadata,
      callback: (response: PaystackResponse) => {
        config.onSuccess(response)
        resolve()
      },
      onClose: () => {
        config.onClose()
        resolve() // ← resolves instead of rejecting so closing isn't treated as an error
      },
    })

    handler.openIframe()
  })
}