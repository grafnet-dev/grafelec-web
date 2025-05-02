// components/blog/ArticlesSection.tsx
import { useState, useEffect } from "react"
import { Article } from "@/lib/types/articles"
import { ArticlesSidebar } from "./ArticleSideBar"
import { ArticlesContent } from "./ArticlesContent"

interface ArticlesSectionProps {
  articles: Article[]
  categories: string[]
}

export function ArticlesSection({ articles, categories }: ArticlesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredArticles, setFilteredArticles] = useState(articles)

  // Filtrer les articles quand les critères changent
  useEffect(() => {
    const filtered = articles.filter((article) => {
      const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
    
    setFilteredArticles(filtered)
  }, [articles, selectedCategory, searchQuery])

  const resetFilters = () => {
    setSelectedCategory("Tous")
    setSearchQuery("")
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <ArticlesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <ArticlesContent 
            articles={articles}
            filteredArticles={filteredArticles}
            resetFilters={resetFilters}
          />
        </div>
      </div>
    </section>
  )
}