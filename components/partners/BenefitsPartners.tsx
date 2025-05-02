"use client"


import { motion } from "framer-motion"
import { Award, Shield, Zap } from "lucide-react"
import { fadeIn } from "@/lib/data/partners"

const benefits = [
  {
    id: 1,
    title: "Qualité Garantie",
    description: "Nous sélectionnons rigoureusement nos partenaires pour vous garantir des produits et services de la plus haute qualité, conformes aux normes les plus strictes.",
    icon: Award,
  },
  {
    id: 2,
    title: "Innovation Continue",
    description: "Nos partenariats avec des leaders technologiques nous permettent d'être à la pointe de l'innovation et de vous proposer les solutions les plus avancées.",
    icon: Zap,
  },
  {
    id: 3,
    title: "Support Expert",
    description: "Grâce à nos partenariats, nous bénéficions de formations et certifications qui nous permettent de vous offrir un support technique expert et réactif.",
    icon: Shield,
  },
]

const PartnershipBenefits: React.FC = () => {
  return (
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
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            
            return (
              <motion.div
                key={benefit.id}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <div className="bg-[#1459a6]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8 text-[#1459a6]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#1459a6]">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PartnershipBenefits