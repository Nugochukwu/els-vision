import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="product-card card-hover block group opacity-0 animate-fade-up ...">

      <div className="aspect-[3/4] rounded relative overflow-hidden mb-4 border-shimmer">

        {/* Image — fills the card */}
        <Image
  src={product.image}
  alt={product.name}
  fill
  className="object-cover transition-transform duration-700 group-hover:scale-105"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"  // ← tells Next.js to serve smaller images on mobile
  quality={80}       // ← reduces file size with minimal visual difference
  placeholder="blur" // ← shows a blur while loading instead of blank space
  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
/>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {product.badge && (
          <div className="absolute top-3 left-3 bg-gold text-obsidian text-[10px] tracking-[0.08em] px-2.5 py-1 rounded-sm font-semibold z-10">
            {product.badge}
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-pearl text-obsidian text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap font-medium z-10">
          Quick View →
        </div>
      </div>

      {/* Text below card stays the same */}
      <div className="font-serif text-[1.15rem] ...">
        {product.name}
      </div>
      ...
    </Link>
  )
}