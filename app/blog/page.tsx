"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Articles fictifs
const articles = [
  {
    id: 1,
    title: "Les dernières innovations en matière de panneaux solaires",
    excerpt:
      "Découvrez les avancées technologiques qui révolutionnent l'efficacité des panneaux solaires et réduisent leur coût.",
    content: "",
    category: "Énergie Renouvelable",
    author: "Jean Dupont",
    date: "15 avril 2023",
    readTime: "8 min",
    image: "/placeholder.svg?height=600&width=800",
    featured: true,
  },
  {
    id: 2,
    title: "Comment sécuriser efficacement votre réseau d'entreprise",
    excerpt:
      "Un guide complet sur les meilleures pratiques pour protéger votre infrastructure réseau contre les cyberattaques.",
    content: "",
    category: "Sécurité",
    author: "Marie Martin",
    date: "28 mars 2023",
    readTime: "12 min",
    image: "/placeholder.svg?height=600&width=800",
    featured: true,
  },
  {
    id: 3,
    title: "L'impact de l'IA sur la gestion technique des bâtiments",
    excerpt:
      "L'intelligence artificielle transforme la façon dont nous gérons les bâtiments. Voici comment en tirer parti.",
    content: "",
    category: "Smart Building",
    author: "Thomas Bernard",
    date: "10 mars 2023",
    readTime: "10 min",
    image: "/placeholder.svg?height=600&width=800",
    featured: false,
  },
  {
    id: 4,
    title: "Optimiser la consommation énergétique de votre datacenter",
    excerpt: "Stratégies et technologies pour réduire l'empreinte carbone de vos infrastructures informatiques.",
    content: "",
    category: "Équipements Industriels",
    author: "Sophie Dubois",
    date: "22 février 2023",
    readTime: "15 min",
    image: "/placeholder.svg?height=600&width=800",
    featured: false,
  },
  {
    id: 5,
    title: "Les meilleures pratiques pour l'installation de bornes de recharge",
    excerpt: "Guide technique pour une installation optimale de bornes de recharge pour véhicules électriques.",
    content: "",
    category: "Énergie Renouvelable",
    author: "Pierre Lambert",
    date: "5 février 2023",
    readTime: "9 min",
    image: "/placeholder.svg?height=600&width=800",
    featured: false,
  },
  {
    id: 6,
    title: "Comprendre les normes électriques NF C 15-100",
    excerpt:
      "Tout ce que vous devez savoir sur les dernières mises à jour des normes électriques pour les installations résidentielles.",
    content: "",
    category: "Électricité",
    author: "Lucie Moreau",
    date: "18 janvier 2023",
    readTime: "11 min",
    image: "/placeholder.svg?height=600&width=800",
    featured: false,
  },
]

// Catégories
const categories = [
  "Tous",
  "Électricité",
  "Électronique",
  "Smart Building",
  "Énergie Renouvelable",
  "Réseaux",
  "Sécurité",
  "Équipements Industriels",
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [searchQuery, setSearchQuery] = useState("")

  // Filtrer les articles
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Articles en vedette
  const featuredArticles = articles.filter((article) => article.featured)

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre Blog Technique</h1>
            <p className="text-xl">
              Découvrez nos articles, guides et actualités sur les dernières innovations technologiques.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-[#1459a6]">Articles en Vedette</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/blog/${article.id}`} className="block">
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#be321d]">{article.category}</Badge>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#1459a6] transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{article.author}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{article.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.readTime} de lecture</span>
                  </div>
                  <p className="text-gray-600">{article.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
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
                  <Button className="w-full bg-[#1459a6] hover:bg-[#1459a6]/90">S'abonner</Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="mb-8">
                <Tabs defaultValue="tous" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="tous">Tous les articles</TabsTrigger>
                    <TabsTrigger value="recents">Les plus récents</TabsTrigger>
                    <TabsTrigger value="populaires">Les plus populaires</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tous" className="mt-0">
                    {filteredArticles.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-8">
                        {filteredArticles.map((article) => (
                          <motion.div
                            key={article.id}
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white rounded-lg shadow-md overflow-hidden group"
                          >
                            <Link href={`/blog/${article.id}`} className="block">
                              <div className="relative h-48">
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
                                <h3 className="text-xl font-bold mb-2 group-hover:text-[#1459a6] transition-colors">
                                  {article.title}
                                </h3>
                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span className="mr-4">{article.date}</span>
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{article.readTime} de lecture</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                                <div className="flex items-center text-[#1459a6] font-medium">
                                  Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <p className="text-lg text-gray-600 mb-4">
                          Aucun article ne correspond à vos critères de recherche.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedCategory("Tous")
                            setSearchQuery("")
                          }}
                        >
                          Réinitialiser les filtres
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="recents" className="mt-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      {articles.slice(0, 4).map((article) => (
                        <motion.div
                          key={article.id}
                          variants={fadeIn}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="bg-white rounded-lg shadow-md overflow-hidden group"
                        >
                          <Link href={`/blog/${article.id}`} className="block">
                            <div className="relative h-48">
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
                              <h3 className="text-xl font-bold mb-2 group-hover:text-[#1459a6] transition-colors">
                                {article.title}
                              </h3>
                              <div className="flex items-center text-gray-500 text-sm mb-3">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="mr-4">{article.date}</span>
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{article.readTime} de lecture</span>
                              </div>
                              <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                              <div className="flex items-center text-[#1459a6] font-medium">
                                Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="populaires" className="mt-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      {[...articles]
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 4)
                        .map((article) => (
                          <motion.div
                            key={article.id}
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white rounded-lg shadow-md overflow-hidden group"
                          >
                            <Link href={`/blog/${article.id}`} className="block">
                              <div className="relative h-48">
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
                                <h3 className="text-xl font-bold mb-2 group-hover:text-[#1459a6] transition-colors">
                                  {article.title}
                                </h3>
                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span className="mr-4">{article.date}</span>
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{article.readTime} de lecture</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                                <div className="flex items-center text-[#1459a6] font-medium">
                                  Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {filteredArticles.length > 4 && (
                <div className="text-center mt-8">
                  <Button variant="outline" className="border-[#1459a6] text-[#1459a6]">
                    Voir plus d'articles
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1459a6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Vous avez des questions techniques ?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Nos experts sont disponibles pour vous aider à trouver les meilleures solutions pour vos projets.
          </p>
          <Button className="bg-white text-[#1459a6] hover:bg-white/90">Contactez-nous</Button>
        </div>
      </section>
    </div>
  )
}

