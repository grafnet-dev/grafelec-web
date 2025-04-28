"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle, Users, TrendingUp, Award } from "lucide-react"

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const stats = [
    { icon: <Users className="h-8 w-8 text-[#be321d]" />, value: "50+", label: "Experts" },
    { icon: <TrendingUp className="h-8 w-8 text-[#be321d]" />, value: "500+", label: "Projets réalisés" },
    { icon: <Award className="h-8 w-8 text-[#be321d]" />, value: "15+", label: "Années d'expérience" },
    { icon: <CheckCircle className="h-8 w-8 text-[#be321d]" />, value: "98%", label: "Clients satisfaits" },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section with Background Image */}
      <section className="relative py-40">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/intercultural.jpg" 
            alt="Hero background" 
            fill 
            className="object-cover brightness-50" 
            priority
          />
        </div>
        
        {/* Content overlaid on the image */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos de Nous</h1>
            <p className="text-xl">
              Découvrez notre histoire, notre mission et notre équipe d'experts dédiés à l'innovation technologique.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Image
                src="/equipe.png"
                alt="Notre histoire"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6 text-[#1459a6]">Notre Histoire</h2>
              <p className="text-gray-700 mb-4">
                Fondée en 2025, Grafelec est née de la vision de créer une entreprise capable de fournir des
                solutions technologiques complètes et innovantes dans le domaine de l'électricité et de l'électronique.
              </p>
              <p className="text-gray-700 mb-4">
                Au fil des années, nous avons élargi notre expertise pour couvrir un large éventail de domaines
                technologiques, de l'énergie renouvelable aux solutions de smart building, en passant par les réseaux et
                la sécurité.
              </p>
              <p className="text-gray-700">
                Aujourd'hui, nous sommes fiers d'être un acteur majeur dans le secteur des solutions électriques et
                technologiques, avec une présence nationale et des partenariats internationaux.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1459a6]">Notre Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#be321d]">Notre Mission</h3>
              <p className="text-gray-700 mb-4">
                Fournir des solutions technologiques innovantes et durables qui répondent aux besoins spécifiques de nos
                clients, tout en contribuant à un avenir plus efficace et respectueux de l'environnement.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#be321d] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Excellence technique dans tous nos projets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#be321d] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Service client personnalisé et réactif</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#be321d] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Solutions adaptées aux besoins spécifiques</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#be321d]">Notre Vision</h3>
              <p className="text-gray-700 mb-4">
                Devenir le leader de référence dans le domaine des solutions technologiques intégrées, en repoussant
                constamment les limites de l'innovation pour créer un monde plus connecté et durable.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#be321d] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Innovation continue dans nos produits et services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#be321d] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Développement durable et responsabilité environnementale</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#be321d] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Expansion internationale avec des partenariats stratégiques</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Figures */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1459a6]">Chiffres Clés</h2>
            <p className="text-gray-700">
              Des résultats qui témoignent de notre engagement envers l'excellence et la satisfaction client.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-center"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-[#1459a6] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1459a6]">Notre Équipe</h2>
            <p className="text-gray-700">
              Des experts passionnés et dédiés à l'innovation technologique et à la satisfaction client.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt={`Membre de l'équipe ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Jean Dupont</h3>
                  <p className="text-[#be321d] mb-4">Directeur Technique</p>
                  <p className="text-gray-600">
                    Expert en solutions électriques avec plus de 10 ans d'expérience dans le secteur.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}