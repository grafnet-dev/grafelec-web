import { useState } from "react"
import { Article } from "@/lib/types/articles"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArticleGrid } from "./ArticleGrid"
import { EmptyArticles } from "./EmptyArticles"

interface ArticlesContentProps {
  articles: Article[]
  filteredArticles: Article[]
  resetFilters: () => void
}

export function ArticlesContent({ articles, filteredArticles, resetFilters }: ArticlesContentProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeTab, setActiveTab] = useState("tous");
  
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setVisibleCount(4); // Réinitialiser le nombre d'articles visibles lors du changement d'onglet
  };

  return (
    <div className="w-full lg:w-3/4 px-4 sm:px-6 lg:px-0">
      <div className="mb-8">
        <Tabs defaultValue="tous" className="w-full" onValueChange={handleTabChange}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="mb-4 sm:mb-6 flex flex-nowrap min-w-fit">
              <TabsTrigger value="tous" className="text-sm sm:text-base whitespace-nowrap">Tous les articles</TabsTrigger>
              <TabsTrigger value="recents" className="text-sm sm:text-base whitespace-nowrap">Les plus récents</TabsTrigger>
              <TabsTrigger value="populaires" className="text-sm sm:text-base whitespace-nowrap">Les plus populaires</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tous" className="mt-0">
            {filteredArticles.length > 0 ? (
              <ArticleGrid articles={filteredArticles.slice(0, visibleCount)} />
            ) : (
              <EmptyArticles onReset={resetFilters} />
            )}
          </TabsContent>

          <TabsContent value="recents" className="mt-0">
            <ArticleGrid articles={
              [...articles]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, visibleCount)
            } />
          </TabsContent>

          <TabsContent value="populaires" className="mt-0">
            <ArticleGrid 
              articles={
                // Comme il n'y a pas de champ "popularity", on utilise une sélection aléatoire comme dans le code original
                [...articles]
                  .sort(() => 0.5 - Math.random())
                  .slice(0, visibleCount)
              } 
            />
          </TabsContent>
        </Tabs>
      </div>

      {((activeTab === "tous" && filteredArticles.length > visibleCount) || 
        (activeTab !== "tous" && articles.length > visibleCount)) && (
        <div className="text-center mt-8 mb-12">
          <Button 
            variant="outline" 
            className="border-[#1459a6] text-[#1459a6] hover:bg-blue-50"
            onClick={handleLoadMore}
          >
           {" Voir plus d'articles"}
          </Button>
        </div>
      )}
    </div>
  )
}