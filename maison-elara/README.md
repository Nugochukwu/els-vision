# El's Vision — E-commerce Storefront

A production-ready Next.js 14 e-commerce storefront with Clerk authentication and Paystack payments. Dark luxury aesthetic with rich animations.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Authentication | Clerk |
| Payments | Paystack (inline popup) |
| State (cart) | Zustand (persisted to localStorage) |
| Fonts | Playfair Display + Outfit |

---

## Quick Start

```bash
unzip els-vision.zip
cd els-vision
npm install
cp .env.local.example .env.local
# Fill in your Clerk + Paystack keys (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
els-vision/
├── app/
│   ├── layout.tsx                    # Root layout — ClerkProvider + fonts
│   ├── page.tsx                      # Home page (animated hero, products, newsletter)
│   ├── about/page.tsx                # About page (story, values, team)
│   ├── shop/page.tsx                 # Filterable shop grid
│   ├── product/[slug]/
│   │   ├── page.tsx                  # Server component — generateStaticParams
│   │   └── ProductDetail.tsx         # Client component — size, qty, add to cart
│   ├── cart/page.tsx                 # Cart + Paystack checkout trigger
│   ├── checkout/success/page.tsx     # Post-payment confirmation
│   └── api/
│       ├── checkout/route.ts         # POST — verifies Paystack payment server-side
│       └── webhook/route.ts          # POST — handles Paystack webhook events
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Sticky nav with scroll effect + Clerk auth
│   │   └── Footer.tsx
│   └── ui/
│       ├── ProductCard.tsx           # Animated product card with hover effects
│       └── CartDrawer.tsx            # Slide-in cart drawer
├── lib/
│   ├── products.ts                   # Product data + types
│   ├── cart.ts                       # Zustand cart store
│   └── paystack.ts                   # Paystack helpers (reference, kobo conversion)
├── styles/globals.css                # Tailwind + all animation keyframes
└── .env.local.example
```

---

## Authentication — Clerk Setup

1. Create a free account at [clerk.com](https://clerk.com)
2. Create a new application
3. Go to **API Keys** and copy your keys into `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

4. Enable OAuth providers (Google, Apple etc.) under **User & Authentication → Social Connections**

### Protected routes

Edit `middleware.ts` to add any routes that require sign-in:

```ts
const isProtectedRoute = createRouteMatcher([
  '/account(.*)',
  '/orders(.*)',
])
```

---

## Payments — Paystack Setup

### How it works

```
User clicks "Pay with Paystack"
  → Paystack inline popup opens (client-side, no redirect)
  → User enters card / bank transfer details
  → On success → POST /api/checkout with reference
  → Server verifies reference with Paystack API
  → Order confirmed → redirect to /checkout/success
  → Paystack fires webhook → POST /api/webhook
  → Webhook fulfils the order (save to DB, send email, etc.)
```

### Setup

1. Create a free account at [paystack.com](https://paystack.com)
2. Go to **Settings → API Keys & Webhooks**
3. Copy your keys into `.env.local`:

```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...
```

4. The Paystack inline script loads automatically on the cart page via `<script src="https://js.paystack.co/v1/inline.js" />`

### Currency

Prices are stored in USD and converted to Naira at checkout using the `USD_TO_NGN` rate in `lib/paystack.ts`. Update this rate as needed:

```ts
// lib/paystack.ts
export const USD_TO_NGN = 1600
```

To price natively in Naira, update `lib/products.ts` to store `price` in Naira directly and remove the conversion.

### Webhook setup (production)

1. In Paystack dashboard → **Settings → API Keys & Webhooks**
2. Set webhook URL: `https://yourdomain.com/api/webhook`
3. The webhook handler in `app/api/webhook/route.ts` verifies the HMAC signature and handles:
   - `charge.success` — fulfil the order
   - `charge.failed` — notify customer
   - `refund.processed` — handle refund

### Supported payment methods

Paystack supports cards (Visa, Mastercard, Verve), bank transfer, USSD, and mobile money — all handled automatically by the popup. No extra config needed.

---

## Animations

All animations are defined in `styles/globals.css` and applied via Tailwind utility classes:

| Class | Effect |
|---|---|
| `animate-fade-up` | Fade in + slide up |
| `animate-fade-in` | Fade in only |
| `animate-slide-left` | Slide in from left |
| `animate-slide-right` | Slide in from right |
| `animate-float` | Gentle floating loop |
| `animate-spin-slow` | Slow clockwise rotation |
| `animate-counter-spin` | Slow counter-clockwise rotation |
| `animate-pulse-glow` | Pulsing gold glow |
| `card-hover` | Lift + shadow on hover |
| `border-shimmer` | Gold border brightens on hover |
| `underline-grow` | Underline grows on hover |
| `delay-100` to `delay-700` | Stagger animation delays |

---

## Deployment

### Vercel (recommended — free tier works perfectly)

```bash
npm install -g vercel
vercel
```

Add all environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Required production env vars

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
PAYSTACK_SECRET_KEY
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## Next Steps

- [ ] Add a database (Supabase) to persist orders after Paystack webhook fires
- [ ] Connect a CMS (Sanity) for product management without editing code
- [ ] Add real product images (Cloudinary / Uploadthing)
- [ ] Set up email confirmations (Resend)
- [ ] Add wishlists (requires auth + database)
- [ ] Implement inventory management
