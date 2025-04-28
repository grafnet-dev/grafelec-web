"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Filter, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

// Catégories de produits
const categories = [
  "Tous les produits",
  "Électricité",
  "Électronique",
  "Smart Building",
  "Énergie Renouvelable",
  "Réseaux",
  "Sécurité",
  "Climatisation",
  "Équipements Industriels",
  "Équipements Biomédicaux",
]

// Produits fictifs
const products = [
  {
    id: 1,
    name: "Panneau solaire haute performance",
    category: "Énergie Renouvelable",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Panneau solaire 300W avec rendement optimisé pour toutes conditions météorologiques.",
    inStock: true,
    rating: 4.8,
    featured: true,
  },
  {
    id: 2,
    name: "Caméra de surveillance IP HD",
    category: "Sécurité",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Caméra IP 4K avec vision nocturne et détection de mouvement avancée.",
    inStock: true,
    rating: 4.6,
    featured: false,
  },
  {
    id: 3,
    name: "Contrôleur domotique centralisé",
    category: "Smart Building",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Contrôleur compatible avec tous les principaux protocoles domotiques du marché.",
    inStock: true,
    rating: 4.7,
    featured: true,
  },
  {
    id: 4,
    name: "Switch réseau manageable 24 ports",
    category: "Réseaux",
    price: 349.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Switch Gigabit avec fonctionnalités avancées de gestion et sécurité.",
    inStock: false,
    rating: 4.9,
    featured: false,
  },
  {
    id: 5,
    name: "Climatiseur inverter basse consommation",
    category: "Climatisation",
    price: 599.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Climatiseur avec technologie inverter pour une efficacité énergétique maximale.",
    inStock: true,
    rating: 4.5,
    featured: true,
  },
  {
    id: 6,
    name: "Tableau électrique intelligent",
    category: "Électricité",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Tableau électrique avec monitoring de consommation et protection avancée.",
    inStock: true,
    rating: 4.7,
    featured: false,
  },
  {
    id: 7,
    name: "Kit de développement IoT",
    category: "Électronique",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Kit complet pour développer vos projets IoT avec capteurs et modules de communication.",
    inStock: true,
    rating: 4.4,
    featured: false,
  },
  {
    id: 8,
    name: "Onduleur industriel 5kVA",
    category: "Équipements Industriels",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Onduleur haute capacité pour applications industrielles critiques.",
    inStock: true,
    rating: 4.9,
    featured: true,
  },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous les produits")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [sortBy, setSortBy] = useState("featured")
  const [cartItems, setCartItems] = useState<number[]>([])

  // Filtrer les produits
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Tous les produits" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesCategory && matchesSearch && matchesPrice
  })

  // Trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price
    if (sortBy === "price-desc") return b.price - a.price
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "rating") return b.rating - a.rating
    // Par défaut, trier par featured
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  })

  // Ajouter au panier
  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId])
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1459a5] to-[#1459a6] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre Boutique</h1>
            <p className="text-xl">
              Découvrez notre sélection d'équipements et de solutions technologiques de haute qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filtres pour desktop */}
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

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Prix</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1500]}
                      max={1500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Disponibilité</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#1459a6]" />
                      <span className="ml-2">En stock uniquement</span>
                    </label>
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
                            onClick={() => {
                              setSelectedCategory(category)
                              // Fermer le sheet après sélection sur mobile
                            }}
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

                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Prix</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 1500]}
                          max={1500}
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="mb-4"
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span>{priceRange[0]}€</span>
                          <span>{priceRange[1]}€</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Disponibilité</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-[#1459a6]" />
                          <span className="ml-2">En stock uniquement</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Sort */}
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
                    <SelectItem value="featured">En vedette</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="name">Nom</SelectItem>
                    <SelectItem value="rating">Évaluation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              {(selectedCategory !== "Tous les produits" ||
                searchQuery ||
                priceRange[0] > 0 ||
                priceRange[1] < 1500) && (
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
                  {(priceRange[0] > 0 || priceRange[1] < 1500) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Prix: {priceRange[0]}€ - {priceRange[1]}€
                      <button onClick={() => setPriceRange([0, 1500])}>×</button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    >
                      <div className="relative h-48 bg-gray-100">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain p-4"
                        />
                        {product.featured && (
                          <div className="absolute top-2 left-2 bg-[#be321d] text-white text-xs font-bold px-2 py-1 rounded">
                            Populaire
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="mb-2">
                          <span className="text-sm text-gray-500">{product.category}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-[#1459a6]">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xl font-bold">{product.price.toFixed(2)}€</span>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                            {product.inStock ? "En stock" : "Rupture de stock"}
                          </span>
                          <Button
                            onClick={() => addToCart(product.id)}
                            disabled={!product.inStock}
                            className="bg-[#1459a6] hover:bg-[#1459a6]/90"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">Aucun produit ne correspond à vos critères de recherche.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory("Tous les produits")
                      setSearchQuery("")
                      setPriceRange([0, 1500])
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#1459a6]">Nos Catégories Phares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Énergie Renouvelable", "Smart Building", "Sécurité", "Réseaux"].map((category) => (
              <motion.div
                key={category}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative rounded-lg overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt={category}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-bold text-white mb-2">{category}</h3>
                  <p className="text-white/80 text-sm mb-4">Découvrez notre gamme de produits</p>
                  <button className="text-white font-medium flex items-center text-sm group-hover:underline">
                    Explorer <ChevronDown className="h-4 w-4 ml-1 rotate-270" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#1459a6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Restez informé de nos nouveaux produits</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir en avant-première nos offres spéciales et nouveautés.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              className="bg-white/10 text-white placeholder:text-white/60 border-white/20"
            />
            <Button className="bg-white text-[#1459a6] hover:bg-white/90">S'inscrire</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

