"use client"


import { FeaturedArticles } from "@/components/blog/FeaturedArticle"
import { ArticlesSection } from "@/components/blog/ArticlesSection"
import { CTASection } from "@/components/blog/CTASection"
import { articles } from "@/lib/data/articles"
import { categories } from "@/lib/data/products"
import Image from "next/image";

export default function BlogPage() {
  return (
    <div className="pt-20">
    {/* Hero Section with Background Image */}
              <section className="relative py-50 ">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/blog.jpg"
                    alt="Hero background"
                    fill
                    className="object-cover brightness-50 "
                    priority
                  />
                </div>
                {/* Content overlaid on the image */}
                <div className="container mx-auto px-4 relative z-10">
                  <div className="max-w-3xl mx-auto text-center text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre Blog Technique</h1>
                  <p className="text-xl">
            Découvrez nos articles, guides et actualités sur les dernières innovations technologiques.
          </p>
                  </div>
                </div>
              </section>

      <FeaturedArticles articles={articles} />
      <ArticlesSection articles={articles} categories={categories} />
      <CTASection />
    </div>
  )
}