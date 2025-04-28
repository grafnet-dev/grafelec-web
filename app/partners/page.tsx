"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Award, Shield, Zap } from "lucide-react"

// Partenaires fictifs
const partners = [
  {
    id: 1,
    name: "ElectroPro",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Électricité",
    description: "Leader mondial dans la fabrication de matériel électrique haute performance.",
    featured: true,
    website: "https://example.com",
  },
  {
    id: 2,
    name: "SmartTech",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Smart Building",
    description: "Solutions innovantes pour la gestion intelligente des bâtiments et l'automatisation.",
    featured: true,
    website: "https://example.com",
  },
  {
    id: 3,
    name: "SolarPower",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Énergie Renouvelable",
    description: "Spécialiste des solutions photovoltaïques et de stockage d'énergie.",
    featured: true,
    website: "https://example.com",
  },
  {
    id: 4,
    name: "SecureNet",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Sécurité",
    description: "Expert en solutions de sécurité et vidéosurveillance pour entreprises et particuliers.",
    featured: false,
    website: "https://example.com",
  },
  {
    id: 5,
    name: "NetConnect",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Réseaux",
    description: "Équipements réseau haute performance pour infrastructures critiques.",
    featured: false,
    website: "https://example.com",
  },
  {
    id: 6,
    name: "CoolSystems",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Climatisation",
    description: "Solutions de climatisation et traitement d'air écoénergétiques.",
    featured: false,
    website: "https://example.com",
  },
  {
    id: 7,
    name: "DataCenter Pro",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Équipements Industriels",
    description: "Infrastructures complètes pour datacenters et environnements industriels.",
    featured: false,
    website: "https://example.com",
  },
  {
    id: 8,
    name: "MedTech Solutions",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Équipements Biomédicaux",
    description: "Équipements médicaux de pointe et solutions informatiques pour le secteur de la santé.",
    featured: false,
    website: "https://example.com",
  },
  {
    id: 9,
    name: "ElectroComponents",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Électronique",
    description: "Composants électroniques de haute qualité pour applications industrielles et grand public.",
    featured: false,
    website: "https://example.com",
  },
  {
    id: 10,
    name: "IoT Connect",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Électronique",
    description: "Capteurs et solutions IoT pour l'industrie 4.0 et les villes intelligentes.",
    featured: false,
    website: "https://example.com",
  },
  {
    id: 11,
    name: "EcoEnergy",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Énergie Renouvelable",
    description: "Solutions complètes pour la transition énergétique et la mobilité électrique.",
    featured: false,
    website: "https://example.com",
  },
  {
    id: 12,
    name: "BuildingSmart",
    logo: "/placeholder.svg?height=200&width=200",
    category: "Smart Building",
    description: "Systèmes de gestion technique des bâtiments et solutions d'efficacité énergétique.",
    featured: false,
    website: "https://example.com",
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
  "Climatisation",
  "Équipements Industriels",
  "Équipements Biomédicaux",
]

export default function PartnersPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  // Filtrer les partenaires
  const filteredPartners = partners.filter((partner) => {
    return selectedCategory === "Tous" || partner.category === selectedCategory
  })

  // Partenaires en vedette
  const featuredPartners = partners.filter((partner) => partner.featured)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1459a5] to-[#1459a6] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Partenaires</h1>
            <p className="text-xl">
              Découvrez les entreprises de confiance avec lesquelles nous collaborons pour vous offrir les meilleures
              solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#1459a6]">Partenaires Principaux</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPartners.map((partner) => (
              <motion.div
                key={partner.id}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-8 flex justify-center items-center h-48 bg-gray-50">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={150}
                    height={150}
                    className="object-contain max-h-32"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#1459a6]">{partner.name}</h3>
                  <p className="text-sm text-[#be321d] font-medium mb-3">{partner.category}</p>
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1459a6] hover:underline"
                  >
                    Visiter le site <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#1459a6]">Tous Nos Partenaires</h2>

          <Tabs
            defaultValue="Tous"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full mb-12"
          >
            <TabsList className="flex flex-wrap justify-center mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="m-1">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredPartners.map((partner) => (
              <motion.div
                key={partner.id}
                variants={fadeIn}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center group"
              >
                <div className="mb-4 h-24 flex items-center justify-center">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={100}
                    height={100}
                    className="object-contain max-h-20 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1 text-[#1459a6]">{partner.name}</h3>
                <p className="text-xs text-[#be321d] font-medium mb-2">{partner.category}</p>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-[#1459a6] mt-auto inline-flex items-center"
                >
                  En savoir plus <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1459a6]">Les Avantages de Nos Partenariats</h2>
            <p className="text-gray-600">
              Nos partenariats stratégiques nous permettent de vous offrir des solutions complètes et innovantes, avec
              un service de qualité supérieure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="bg-[#1459a6]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-[#1459a6]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1459a6]">Qualité Garantie</h3>
              <p className="text-gray-600">
                Nous sélectionnons rigoureusement nos partenaires pour vous garantir des produits et services de la plus
                haute qualité, conformes aux normes les plus strictes.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="bg-[#1459a6]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-[#1459a6]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1459a6]">Innovation Continue</h3>
              <p className="text-gray-600">
                Nos partenariats avec des leaders technologiques nous permettent d'être à la pointe de l'innovation et
                de vous proposer les solutions les plus avancées.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="bg-[#1459a6]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-[#1459a6]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1459a6]">Support Expert</h3>
              <p className="text-gray-600">
                Grâce à nos partenariats, nous bénéficions de formations et certifications qui nous permettent de vous
                offrir un support technique expert et réactif.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-20 bg-[#1459a6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Devenez Notre Partenaire</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Vous êtes un fabricant ou un fournisseur de solutions technologiques ? Rejoignez notre réseau de partenaires
            et développons ensemble de nouvelles opportunités.
          </p>
          <Button className="bg-white text-[#1459a6] hover:bg-white/90">Nous Contacter</Button>
        </div>
      </section>
    </div>
  )
}
