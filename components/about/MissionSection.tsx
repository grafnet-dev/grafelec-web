"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function MissionVisionSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
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
              clients, tout en contribuant à un avenir plus efficace et respectueux de {"l'environnement"}.
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
              constamment les limites de {"l'innovation"} pour créer un monde plus connecté et durable.
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
  )
}