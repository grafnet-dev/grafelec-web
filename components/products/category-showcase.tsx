import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function CategoryShowcase() {
  const featuredCategories = ["Énergie Renouvelable", "Smart Building", "Sécurité", "Réseaux"]
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#1459a6]">Nos Catégories Phares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
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
  )
}