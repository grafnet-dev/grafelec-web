"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

import { Partner, fadeIn, staggerContainer } from "@/lib/data/partners"

interface AllPartnersProps {
  partners: Partner[]
}

const AllPartners: React.FC<AllPartnersProps> = ({ partners }) => {
  const [selectedCategory] = useState("Tous")

  // Filtrer les partenaires
  const filteredPartners = partners.filter((partner) => {
    return selectedCategory === "Tous" || partner.category === selectedCategory
  })

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#1459a6]">Tous Nos Partenaires</h2>

        {/* Ajout du filtre par catégories 
        <div className="mb-10 flex justify-center">
          <Tabs 
            defaultValue="Tous" 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
            className="w-full max-w-4xl overflow-x-auto"
          >
            <TabsList className="flex flex-wrap justify-center">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="min-w-fit">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
*/}
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
                className="inline-flex items-center text-[#1459a6] hover:underline"
              >
                Visiter le site <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AllPartners