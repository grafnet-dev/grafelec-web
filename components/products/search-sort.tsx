import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchSortProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: string
  setSortBy: (value: string) => void
}

export default function SearchSort({ searchQuery, setSearchQuery, sortBy, setSortBy }: SearchSortProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher un produit..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="category">Catégorie</SelectItem>
          <SelectItem value="name">Nom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}