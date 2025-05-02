// components/blog/EmptyArticles.tsx
import { Button } from "@/components/ui/button"

interface EmptyArticlesProps {
  onReset: () => void
}

export function EmptyArticles({ onReset }: EmptyArticlesProps) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-md">
      <p className="text-lg text-gray-600 mb-4">
        Aucun article ne correspond à vos critères de recherche.
      </p>
      <Button variant="outline" onClick={onReset}>
        Réinitialiser les filtres
      </Button>
    </div>
  )
}