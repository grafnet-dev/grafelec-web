import { Article } from "@/lib/types/articles"
import { ArticleGrid } from "./ArticleGrid"

interface FeaturedArticlesProps {
  articles: Article[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const featuredArticles = articles.filter(article => article.featured)
  
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl font-bold mb-10 text-[#1459a6] flex justify-center">Articles en Vedette</h2>
        <ArticleGrid articles={featuredArticles} variant="featured" columns={3} />
      </div>
    </section>
  )
}