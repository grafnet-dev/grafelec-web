// components/blog/ArticlesSidebar.tsx

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ArticlesSidebarProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function ArticlesSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}: ArticlesSidebarProps) {
  return (
    <div className="lg:w-1/4">
      <div className="sticky top-24">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold mb-4 text-[#1459a6]">Rechercher</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher un article..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold mb-4 text-[#1459a6]">Catégories</h3>
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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 text-[#1459a6]">Newsletter</h3>
          <p className="text-gray-600 text-sm mb-4">
            Abonnez-vous pour recevoir nos derniers articles et actualités.
          </p>
          <Input type="email" placeholder="Votre email" className="mb-3" />
          <Button className="w-full bg-[#1459a6] hover:bg-[#1459a6]/90">Abonnement</Button>
        </div>
      </div>
    </div>
  )
}