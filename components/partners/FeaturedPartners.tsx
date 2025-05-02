"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Partner, fadeIn } from "@/lib/data/partners"

interface FeaturedPartnersProps {
  partners: Partner[]
}

const FeaturedPartners: React.FC<FeaturedPartnersProps> = ({ partners }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#1459a6]">Partenaires Principaux</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner) => (
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
  )
}

export default FeaturedPartners