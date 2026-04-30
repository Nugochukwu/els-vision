import Link from 'next/link'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const delays = ['delay-100','delay-200','delay-300','delay-400','delay-500','delay-600']
  const delay = delays[index % delays.length]

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`product-card card-hover block group opacity-0 animate-fade-up ${delay}`}
    >
      {/* Image area */}
      <div className={`${product.bgClass} aspect-[3/4] rounded flex items-center justify-center relative overflow-hidden mb-4 border-shimmer`}>
        <span className="text-6xl transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6 inline-block">
          {product.emoji}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {product.badge && (
          <div className="absolute top-3 left-3 bg-gold text-obsidian text-[10px] tracking-[0.08em] px-2.5 py-1 rounded-sm font-semibold">
            {product.badge}
          </div>
        )}

        {/* Quick view label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-pearl text-obsidian text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap font-medium">
          Quick View →
        </div>
      </div>

      <div className="font-serif text-[1.15rem] font-medium text-pearl group-hover:text-gold transition-colors duration-300 mb-1">
        {product.name}
      </div>
      <div className="text-[12px] text-mist mb-2">{product.subtitle}</div>
      <div className="text-[14px] font-medium text-pearl">
        {product.originalPrice && (
          <span className="line-through text-mist font-normal mr-1.5">
            ₦{(product.originalPrice * 1600).toLocaleString()}
          </span>
        )}
        ₦{(product.price * 1600).toLocaleString()}
      </div>
    </Link>
  )
}
