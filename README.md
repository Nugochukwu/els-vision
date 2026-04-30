# Maison Elara — E-commerce Storefront

A production-ready Next.js 14 e-commerce site with Clerk authentication and Stripe payments.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Authentication | Clerk |
| Payments | Stripe |
| State (cart) | Zustand (persisted to localStorage) |
| Fonts | Cormorant Garamond + DM Sans |

---

## Project Structure

```
maison-elara/
├── app/
│   ├── layout.tsx              # Root layout — ClerkProvider + fonts
│   ├── page.tsx                # Home page
│   ├── about/page.tsx          # About page
│   ├── shop/page.tsx           # Shop / product grid
│   ├── product/[slug]/page.tsx # Product detail page
│   ├── cart/page.tsx           # Cart + checkout trigger
│   ├── checkout/
│   │   └── success/page.tsx    # Post-payment success page
│   └── api/
│       ├── checkout/route.ts   # POST — creates Stripe Checkout session
│       └── webhook/route.ts    # POST — handles Stripe webhook events
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav with Clerk auth buttons
│   │   └── Footer.tsx          # Footer with link columns
│   └── ui/
│       ├── ProductCard.tsx     # Reusable product card
│       └── CartDrawer.tsx      # Slide-in cart drawer
├── lib/
│   ├── products.ts             # Product data + types
│   ├── cart.ts                 # Zustand cart store
│   └── stripe.ts               # Stripe client/server helpers
├── styles/
│   └── globals.css             # Tailwind + global styles
├── middleware.ts               # Clerk route protection
└── .env.local.example          # Environment variable template
```

---

## Quick Start

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Then fill in your keys (see sections below).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Authentication — Clerk Setup

Clerk handles sign-up, sign-in, OAuth (Google, Apple, GitHub, etc.), and session management.

### Steps

1. Create a free account at [clerk.com](https://clerk.com)
2. Create a new application
3. In your Clerk dashboard, go to **API Keys**
4. Copy your keys into `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

5. In the Clerk dashboard, enable the OAuth providers you want (Google, Apple, etc.) under **User & Authentication → Social Connections**

### Protected routes

Routes listed in `middleware.ts` require sign-in:

```ts
const isProtectedRoute = createRouteMatcher([
  '/account(.*)',
  '/orders(.*)',
  '/wishlist(.*)',
])
```

Add any route you want to lock behind auth.

### Using auth in server components

```ts
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function AccountPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const user = await currentUser()
  return <div>Hello, {user?.firstName}</div>
}
```

---

## Payments — Stripe Setup

### Steps

1. Create a free account at [stripe.com](https://stripe.com)
2. In your Stripe dashboard, go to **Developers → API keys**
3. Copy your keys into `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### How checkout works

```
User clicks "Checkout"
  → POST /api/checkout with cart items
  → Server creates Stripe Checkout session
  → Returns session URL
  → User redirected to Stripe's hosted checkout page
  → On success → redirected to /checkout/success
  → Stripe fires webhook → POST /api/webhook
  → Webhook handler fulfils the order
```

### Webhook setup (local development)

Install the Stripe CLI:

```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

Copy the webhook signing secret it gives you into `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Webhook setup (production)

1. In Stripe dashboard → **Developers → Webhooks**
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select events: `checkout.session.completed`, `payment_intent.payment_failed`
4. Copy the signing secret into your production environment variables

### Supported payment methods

Edit `app/api/checkout/route.ts` to add more:

```ts
payment_method_types: ['card', 'apple_pay', 'google_pay', 'klarna', 'affirm'],
```

---

## Adding Products

Edit `lib/products.ts`. Each product needs:

```ts
{
  id: 'unique-id',
  slug: 'url-slug',           // Used in /product/[slug]
  name: 'Product Name',
  subtitle: 'Category',
  price: 195,                 // In dollars
  originalPrice: 240,         // Optional — shows strikethrough
  emoji: '🧥',               // Replace with real images
  bgClass: 'bg-gradient-to-br from-[#E8DDD0] to-[#D4C4B0]',
  sizes: ['XS', 'S', 'M', 'L'],
  badge: 'New',               // Optional — shows on card
  description: '...',
  details: ['Material...'],
  origin: 'Made in Portugal',
}
```

### Replacing emojis with real images

Replace the `<span>` emoji in `ProductCard.tsx` with Next.js `<Image>`:

```tsx
import Image from 'next/image'

<Image
  src={product.imageUrl}
  alt={product.name}
  fill
  className="object-cover"
/>
```

---

## Alternative Payment Providers

### Paystack (Nigeria / Africa)

```bash
npm install @paystack/inline-js
```

```ts
// In your cart page
const handler = PaystackPop.setup({
  key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  email: user.emailAddresses[0].emailAddress,
  amount: total * 100, // kobo
  currency: 'NGN',
  callback: (response) => {
    // Verify on server, then fulfil order
  },
})
handler.openIframe()
```

### Flutterwave

```bash
npm install flutterwave-react-v3
```

```tsx
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'

const config = {
  public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY,
  tx_ref: Date.now().toString(),
  amount: total,
  currency: 'USD',
  payment_options: 'card,mobilemoney,ussd',
  customer: { email: user.email, name: user.name },
}
```

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Add all environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Environment variables needed in production

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## Next Steps

- [ ] Add a database (Supabase / PlanetScale / MongoDB) to persist orders
- [ ] Connect a CMS (Sanity / Contentful) for product management
- [ ] Add product images via Cloudinary or Uploadthing
- [ ] Set up transactional emails (Resend / Postmark)
- [ ] Add a wishlist feature (requires auth + database)
- [ ] Implement inventory management
- [ ] Add product search and filtering
- [ ] Set up analytics (Vercel Analytics / Posthog)
