'use client'

import { useState } from "react"
import { products } from "@/lib/data/products"
import { ProductFilters, ActiveFilters } from "@/components/products/product-filters"
import SearchSort from "@/components/products/search-sort"
import ProductGrid from "@/components/products/product-grid"
import CategoryShowcase from "@/components/products/category-showcase"
import Newsletter from "@/components/products/newsletter"
import Image from "next/image"
import TawkToChat from "@/components/TawkToChat" // Importer le composant TawkToChat

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous les produits")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")

  // Filtrer les produits
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Tous les produits" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "category") return a.category.localeCompare(b.category)
    return 0
  })

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSelectedCategory("Tous les produits")
    setSearchQuery("")
  }

  return (
    <div className="pt-20">
      {/* Ajouter le composant TawkToChat */}
      <TawkToChat />
      
      {/* Hero Section with Background Image */}
      <section className="relative py-50">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/electrical-tools.jpg" 
            alt="Hero background" 
            fill 
            className="object-cover brightness-50" 
            priority
          />
        </div>
        
        {/* Content overlaid on the image */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Produits</h1>
            <p className="text-xl">
              Découvrez notre sélection {"d'équipements"} et de solutions technologiques de haute qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <ProductFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Sort */}
              <SearchSort
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {/* Active Filters */}
              <ActiveFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {/* Products Grid */}
              <ProductGrid products={sortedProducts} resetFilters={resetFilters} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <CategoryShowcase />

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}