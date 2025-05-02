"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { teamMembers } from "../../lib/data/team"

export default function TeamSection() {
  // Fonction pour gérer les erreurs de chargement d'image
  
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
          <h2 className="text-3xl font-bold mb-6 text-[#1459a6]">Notre Équipe</h2>
          <p className="text-gray-700">   
            {" Certains de nos experts passionnés et dédiés à l'innovation technologique et à la satisfaction client."}
          </p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative h-96 w-full">
                <Image
                  src={member.image}
                  alt={`Membre de l'équipe - ${member.name}`}
                  fill
                  className="object-cover"
                  
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-[#1459a6]">{member.name}</h3>
                <p className="text-[#be321d] mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}