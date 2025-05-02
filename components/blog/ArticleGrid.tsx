// components/blog/ArticleGrid.tsx
import { Article } from "@/lib/types/articles"
import { ArticleCard } from "./ArticleCard"

interface ArticleGridProps {
  articles: Article[]
  variant?: "featured" | "compact"
  columns?: number
}

export function ArticleGrid({ articles, variant = "compact", columns = 2 }: ArticleGridProps) {
  return (
    <div className={`grid md:grid-cols-${columns} gap-8`}>
      {articles.map((article) => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          variant={variant}
        />
      ))}
    </div>
  )
}
