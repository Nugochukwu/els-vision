export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  image: string
  emoji?: string
  bgClass: string
  accentColor: string
  sizes: string[]
  badge?: string
  description: string
  details: string[]
  origin: string
}

export const products: Product[] = [
  {
    id: '1', slug: 'obsidian-wrap-coat',
    name: 'EL', subtitle: 'Signature Outerwear',
    image: '/assets/images/chubi2.png',
    price: 285, emoji: '🧥',
    bgClass: 'bg-gradient-to-br from-[#1A1A2E] to-[#16213E]',
    accentColor: '#D4AF37',
    sizes: ['XS','S','M','L','XL'], badge: 'New',
    description: 'A commanding wrap coat cut from double-faced wool. Sculpted lapels, a sweeping silhouette, and a weighted hem that moves with intention.',
    details: ['100% double-faced virgin wool','Dry clean only','Oversized fit — size down for structured look','Interior hook-and-bar closure'],
    origin: 'Handcrafted in Milan, Italy',
  },
  {
    id: '2', slug: 'ivory-cashmere-turtleneck',
    name: 'EL', subtitle: 'Essential Luxury',
    image: '/assets/images/chubi3.png',
    price: 195, originalPrice: 240, emoji: '🧶',
    bgClass: 'bg-gradient-to-br from-[#2A2020] to-[#3D2B2B]',
    accentColor: '#E8CC5A',
    sizes: ['XS','S','M','L'], 
    description: 'Grade A Mongolian cashmere, spun to an impossibly fine gauge. Gets softer with every wear.',
    details: ['100% Grade A Mongolian cashmere','Hand wash cold, dry flat','True to size','4 colourways available'],
    origin: 'Woven in Florence, Italy',
  },
  {
    id: '3', slug: 'noir-wide-leg-trousers',
    name: 'Noir Wide-Leg Trousers', subtitle: 'Power Tailoring',
    image: '/assets/images/chubi4.png',
    price: 165, emoji: '👖',
    bgClass: 'bg-gradient-to-br from-[#0D1B2A] to-[#1B2838]',
    accentColor: '#D4AF37',
    sizes: ['XS','S','M','L','XL'],
    description: 'Wide-leg trousers cut from a Japanese wool-blend. The kind of trouser that makes a room notice.',
    details: ['70% wool, 30% recycled poly','Dry clean only','High-rise, wide leg','Side zip with hook-and-bar'],
    origin: 'Tailored in Barcelona, Spain',
  },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}
