export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  emoji: string
  bgClass: string
  sizes: string[]
  badge?: string
  description: string
  details: string[]
  origin: string
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'linen-wrap-coat',
    name: 'Linen Wrap Coat',
    subtitle: 'Autumn Essential',
    price: 285,
    emoji: '🧥',
    bgClass: 'bg-gradient-to-br from-[#E8DDD0] to-[#D4C4B0]',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'New',
    description: 'A relaxed, fluid wrap coat in premium stonewashed linen. Naturally temperature-regulating, this piece transitions effortlessly from early autumn into winter when layered.',
    details: ['100% organic linen', 'Dry clean or gentle machine wash cold', 'Model is 5\'9" wearing size M', 'True to size — we recommend sizing up for a more relaxed fit'],
    origin: 'Ethically made in Porto, Portugal',
  },
  {
    id: '2',
    slug: 'cashmere-turtleneck',
    name: 'Cashmere Turtleneck',
    subtitle: 'Classic Knit',
    price: 195,
    originalPrice: 240,
    emoji: '🧶',
    bgClass: 'bg-gradient-to-br from-[#D0D8E8] to-[#B0BFD4]',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'The definitive cashmere turtleneck. Spun from Grade A Mongolian cashmere, this piece gets softer with every wear and age beautifully over years.',
    details: ['100% Grade A Mongolian cashmere', 'Hand wash cold, dry flat', 'Fits true to size', 'Available in 4 seasonal colourways'],
    origin: 'Ethically made in Florence, Italy',
  },
  {
    id: '3',
    slug: 'wide-leg-trousers',
    name: 'Wide-Leg Trousers',
    subtitle: 'Tailored Basics',
    price: 165,
    emoji: '👖',
    bgClass: 'bg-gradient-to-br from-[#D0E8D4] to-[#B0D4B8]',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Impeccably tailored wide-leg trousers cut from a wool-blend fabric that drapes beautifully and holds its shape all day. The modern wardrobe essential.',
    details: ['70% wool, 30% recycled polyester', 'Dry clean only', 'High-rise fit with a wide leg', 'Side zip closure with hook-and-bar'],
    origin: 'Ethically made in Barcelona, Spain',
  },
  {
    id: '4',
    slug: 'merino-knit-dress',
    name: 'Merino Knit Dress',
    subtitle: 'Effortless All-Day',
    price: 225,
    emoji: '👗',
    bgClass: 'bg-gradient-to-br from-[#E8D0D0] to-[#D4B0B0]',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Bestseller',
    description: 'Our most loved piece. This midi-length knit dress in fine merino wool is naturally temperature-regulating, wrinkle-resistant, and requires virtually no care.',
    details: ['100% extra-fine merino wool', 'Machine wash cold, lay flat to dry', 'Model is 5\'8" wearing size S', 'Midi length hits just below the knee'],
    origin: 'Ethically made in Porto, Portugal',
  },
  {
    id: '5',
    slug: 'silk-camisole',
    name: 'Silk Camisole',
    subtitle: 'Foundation Piece',
    price: 120,
    emoji: '👚',
    bgClass: 'bg-gradient-to-br from-[#E8E8D0] to-[#D4D4B0]',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A pure silk camisole that works as a foundation layer or a statement piece on its own. Cut on the bias for a fluid, flattering drape.',
    details: ['100% mulberry silk, 19 momme', 'Hand wash cold or dry clean', 'Adjustable spaghetti straps', 'Bias cut for fluid drape'],
    origin: 'Ethically made in Como, Italy',
  },
  {
    id: '6',
    slug: 'structured-tote',
    name: 'Structured Tote',
    subtitle: 'Carry Everything',
    price: 185,
    emoji: '👜',
    bgClass: 'bg-gradient-to-br from-[#D8D0E8] to-[#C4B0D4]',
    sizes: ['One Size'],
    description: 'A full-grain leather tote built to last decades. Structured enough to stand on its own, spacious enough to carry your entire life, beautiful enough to want to.',
    details: ['Full-grain vegetable-tanned leather', 'Unlined to reduce weight', '40cm W × 30cm H × 12cm D', 'Internal zip pocket + 2 slip pockets'],
    origin: 'Handmade in Tuscany, Italy',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}
