import { Product } from "@/lib/data/products"
import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"

interface ProductGridProps {
  products: Product[]
  resetFilters: () => void
}

export default function ProductGrid({ products, resetFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Aucun produit ne correspond à vos critères de recherche.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={resetFilters}
        >
          Réinitialiser les filtres
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}