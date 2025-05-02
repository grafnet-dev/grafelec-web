import { Article } from "@/lib/types/articles"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { fadeIn } from "@/lib/types/fadeIn"

interface ArticleCardProps {
  article: Article
  variant?: "featured" | "compact"
}

export function ArticleCard({ article, variant = "compact" }: ArticleCardProps) {
  const isFeatured = variant === "featured"
  
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`group bg-white rounded-lg shadow-md overflow-hidden ${isFeatured ? "hover:shadow-lg transition-shadow" : ""}`}
    >
      <Link href={`/blog/${article.id}`} className="block">
        <div className={`relative ${isFeatured ? "h-48" : "h-48"} overflow-hidden`}>
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-[#be321d]">{article.category}</Badge>
          </div>
        </div>
        <div className="p-6">
          <h3 className={`${isFeatured ? "text-lg" : "text-xl"} font-bold mb-2 group-hover:text-[#1459a6] transition-colors line-clamp-2`}>
            {article.title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-3">
            {isFeatured && (
              <>
                <User className="h-4 w-4 mr-1" />
                <span className="mr-4">{article.author}</span>
              </>
            )}
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{article.date}</span>
         {/*   <Clock className="h-4 w-4 mr-1" />
            <span>{article.readTime} de lecture</span>
            * */}
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
         {/**
          * <div className="flex items-center text-[#1459a6] font-medium">
            Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
          </div>
          */} 
        </div>
      </Link>
    </motion.div>
  )
}