import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/lib/products'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/ui/CartDrawer'
import { ProductDetail } from './ProductDetail'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — El's Vision`,
    description: product.description,
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <>
      <CartDrawer />
      <ProductDetail product={product} related={related} />
      <Footer />
    </>
  )
}
