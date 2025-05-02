"use client"

import { Button } from "@/components/ui/button"

export default function CareersCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#1459a5] to-[#1459a6] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Prêt à Rejoindre Notre Équipe ?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          {" Découvrez comment vous pouvez contribuer à notre mission et développer votre carrière au sein d'une"}
          {" entreprise innovante et dynamique."}
          
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#1459a6]"
            onClick={() => {
              const element = document.getElementById("job-openings")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            {" Voir nos offres d'emploi"}
           
          </Button>
        </div>
      </div>
    </section>
  )
}