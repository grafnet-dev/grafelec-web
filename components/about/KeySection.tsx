"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, TrendingUp, Award } from "lucide-react"

export default function KeyFiguresSection() {
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#1459a6]">Chiffres Clés</h2>
          <p className="text-gray-700">
            Des résultats qui témoignent de notre engagement envers {"l'excellence"} et la satisfaction client.
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
  )
}