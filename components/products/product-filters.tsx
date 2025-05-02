import { categories } from "@/lib/data/products"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

interface ProductFiltersProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  
}: ProductFiltersProps) {
  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-[#1459a6]">Filtres</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Catégories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-2 py-1.5 rounded-md transition-colors ${
                    selectedCategory === category
                      ? "bg-[#1459a6]/10 text-[#1459a6] font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filtres</SheetTitle>
              <SheetDescription>Affinez votre recherche de produits</SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <div className="mb-6">
                <h3 className="font-medium mb-3">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-2 py-1.5 rounded-md transition-colors ${
                        selectedCategory === category
                          ? "bg-[#1459a6]/10 text-[#1459a6] font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export function ActiveFilters({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: ProductFiltersProps) {
  if (selectedCategory === "Tous les produits" && !searchQuery) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {selectedCategory !== "Tous les produits" && (
        <Badge variant="secondary" className="flex items-center gap-1">
          {selectedCategory}
          <button onClick={() => setSelectedCategory("Tous les produits")}>×</button>
        </Badge>
      )}
      {searchQuery && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Recherche: {searchQuery}
          <button onClick={() => setSearchQuery("")}>×</button>
        </Badge>
      )}
    </div>
  )
}