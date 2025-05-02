"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function StorySection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
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
              
              {"Fondée en 2025, Grafelec est née de la vision de créer une entreprise capable de fournir des"}
              {"solutions technologiques complètes et innovantes dans le domaine de l'électricité et de l'électronique."}
            </p>
            <p className="text-gray-700 mb-4">
              
              {"Au fil des années, nous avons élargi notre expertise pour couvrir un large éventail de domaines"}
              {" technologiques, de l'énergie renouvelable aux solutions de smart building, en passant par les réseaux et la sécurité."}
            </p>
            <p className="text-gray-700">
            {" Aujourd'hui, nous sommes fiers d'être un acteur majeur dans le secteur des solutions électriques et"}
              {"technologiques, avec une présence nationale et des partenariats internationaux."}
              
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}